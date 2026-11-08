<?php

namespace App\Services\Http;

/**
 * Abruf fremder Webseiten mit SSRF-Schutz:
 * - nur http/https und erlaubte Ports, keine Zugangsdaten in der URL
 * - DNS-Auflösung und Prüfung ALLER Adressen gegen interne/reservierte Netze
 * - Verbindung nur zur geprüften IP (kein DNS-Rebinding)
 * - Weiterleitungen werden einzeln erneut geprüft und sind begrenzt
 * - Zeit- und Größenlimits deutlich unter max_execution_time (180 s)
 */
class SafeHttpClient
{
    public function __construct(
        private readonly Transport $transport,
        private readonly HostResolver $resolver,
    ) {}

    /**
     * @return array{url: string, status: int, content_type: string, body: string}
     *
     * @throws FetchException
     */
    public function get(string $url, ?int $maxBytes = null, ?string $accept = null): array
    {
        $cfg = config('rezepte.import');
        $maxBytes ??= $cfg['max_html_bytes'];
        $deadline = microtime(true) + $cfg['timeout'];
        $current = $url;

        for ($i = 0; $i <= $cfg['max_redirects']; $i++) {
            [$host, $port] = $this->validateUrl($current);
            $ip = $this->resolveSafe($host);
            $remaining = (int) ceil($deadline - microtime(true));
            if ($remaining <= 0) {
                throw new FetchException('Die Webseite hat nicht rechtzeitig geantwortet (Zeitüberschreitung).');
            }
            $response = $this->transport->request($current, $host, $port, $ip, $maxBytes, [
                'connect_timeout' => min($cfg['connect_timeout'], $remaining),
                'timeout' => $remaining,
                'user_agent' => $cfg['user_agent'],
                'accept' => $accept,
                'use_env_proxy' => $cfg['use_env_proxy'] ?? false,
            ]);
            $status = $response['status'];
            if (in_array($status, [301, 302, 303, 307, 308], true)) {
                $location = $response['headers']['location'] ?? null;
                if (! $location) {
                    throw new FetchException('Die Webseite leitet weiter, nennt aber kein Ziel.');
                }
                $current = self::resolveRelative($current, $location);

                continue;
            }
            if ($status === 401 || $status === 403) {
                throw new FetchException('Die Webseite verweigert den Zugriff (HTTP '.$status.'). Inhalte hinter Anmeldungen oder Bezahlschranken können nicht importiert werden.');
            }
            if ($status === 404 || $status === 410) {
                throw new FetchException('Die Seite wurde nicht gefunden (HTTP '.$status.'). Bitte die Adresse prüfen.');
            }
            if ($status === 429) {
                throw new FetchException('Die Webseite begrenzt gerade die Anzahl der Abrufe (HTTP 429). Bitte später erneut versuchen.');
            }
            if ($status < 200 || $status >= 300) {
                throw new FetchException('Die Webseite hat mit einem Fehler geantwortet (HTTP '.$status.').');
            }

            return [
                'url' => $current,
                'status' => $status,
                'content_type' => strtolower($response['headers']['content-type'] ?? ''),
                'body' => $response['body'],
            ];
        }

        throw new FetchException('Zu viele Weiterleitungen (mehr als '.$cfg['max_redirects'].').');
    }

    /** @return array{0: string, 1: int} [host, port] */
    public function validateUrl(string $url): array
    {
        if (strlen($url) > 2048) {
            throw new FetchException('Die Adresse ist zu lang.');
        }
        $parts = parse_url($url);
        if ($parts === false || empty($parts['scheme']) || empty($parts['host'])) {
            throw new FetchException('Bitte eine vollständige Adresse angeben, die mit https:// oder http:// beginnt.');
        }
        $scheme = strtolower($parts['scheme']);
        if (! in_array($scheme, ['http', 'https'], true)) {
            throw new FetchException('Es werden nur Adressen mit http:// oder https:// unterstützt.');
        }
        if (isset($parts['user']) || isset($parts['pass'])) {
            throw new FetchException('Adressen mit eingebetteten Zugangsdaten werden nicht unterstützt.');
        }
        $port = (int) ($parts['port'] ?? ($scheme === 'https' ? 443 : 80));
        if (! in_array($port, config('rezepte.import.allowed_ports'), true)) {
            throw new FetchException('Dieser Port ist für den Import nicht erlaubt.');
        }
        $host = strtolower(trim($parts['host'], '[]'));
        if ($host === 'localhost' || str_ends_with($host, '.localhost') || str_ends_with($host, '.local') || str_ends_with($host, '.internal') || ! str_contains($host, '.') && ! filter_var($host, FILTER_VALIDATE_IP)) {
            throw new FetchException('Interne oder lokale Adressen können nicht abgerufen werden.');
        }

        return [$host, $port];
    }

    private function resolveSafe(string $host): string
    {
        $ips = $this->resolver->resolve($host);
        if ($ips === []) {
            throw new FetchException('Der Servername „'.$host.'“ konnte nicht aufgelöst werden. Bitte die Adresse prüfen.');
        }
        foreach ($ips as $ip) {
            if (! IpGuard::isPublic($ip)) {
                throw new FetchException('Interne oder reservierte Netzwerkadressen können nicht abgerufen werden.');
            }
        }
        // IPv4 bevorzugen (auf Shared Hosting zuverlässiger)
        foreach ($ips as $ip) {
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
                return $ip;
            }
        }

        return $ips[0];
    }

    public static function resolveRelative(string $base, string $location): string
    {
        if (preg_match('#^[a-z][a-z0-9+.-]*:#i', $location)) {
            return $location;
        }
        $b = parse_url($base);
        $scheme = $b['scheme'] ?? 'https';
        $authority = $b['host'].(isset($b['port']) ? ':'.$b['port'] : '');
        if (str_starts_with($location, '//')) {
            return $scheme.':'.$location;
        }
        if (str_starts_with($location, '/')) {
            return $scheme.'://'.$authority.$location;
        }
        $path = $b['path'] ?? '/';
        $dir = str_ends_with($path, '/') ? $path : (dirname($path) === '\\' || dirname($path) === '.' ? '/' : rtrim(dirname($path), '/').'/');
        if (str_starts_with($location, '?')) {
            return $scheme.'://'.$authority.$path.$location;
        }
        $full = $dir.$location;
        // ./ und ../ auflösen
        $segments = [];
        foreach (explode('/', $full) as $seg) {
            if ($seg === '..') {
                array_pop($segments);
            } elseif ($seg !== '.') {
                $segments[] = $seg;
            }
        }

        return $scheme.'://'.$authority.implode('/', $segments);
    }
}
