<?php

namespace App\Services\Http;

/**
 * cURL-Transport: verbindet ausschließlich mit der zuvor geprüften IP (CURLOPT_RESOLVE,
 * Schutz vor DNS-Rebinding), folgt keinen Weiterleitungen und bricht ab, sobald die
 * maximale Antwortgröße oder die Zeitgrenze überschritten wird.
 */
class CurlTransport implements Transport
{
    public function request(string $url, string $host, int $port, string $pinnedIp, int $maxBytes, array $options): array
    {
        if (! function_exists('curl_init')) {
            throw new FetchException('Die PHP-Erweiterung „curl“ ist nicht verfügbar.');
        }
        $ch = curl_init();
        $body = '';
        $headers = [];
        $tooLarge = false;
        $ipForResolve = str_contains($pinnedIp, ':') ? '['.$pinnedIp.']' : $pinnedIp;

        $opts = [
            CURLOPT_URL => $url,
            CURLOPT_RESOLVE => [$host.':'.$port.':'.$ipForResolve],
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS,
            CURLOPT_CONNECTTIMEOUT => $options['connect_timeout'],
            CURLOPT_TIMEOUT => $options['timeout'],
            CURLOPT_USERAGENT => $options['user_agent'],
            CURLOPT_HTTPHEADER => [
                'Accept: '.($options['accept'] ?? 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5'),
                'Accept-Language: de-DE,de;q=0.9,en;q=0.6',
            ],
            CURLOPT_ENCODING => '', // gzip/deflate akzeptieren
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_HEADERFUNCTION => function ($ch, string $line) use (&$headers): int {
                $parts = explode(':', $line, 2);
                if (count($parts) === 2) {
                    $headers[strtolower(trim($parts[0]))] = trim($parts[1]);
                }

                return strlen($line);
            },
            CURLOPT_WRITEFUNCTION => function ($ch, string $chunk) use (&$body, &$tooLarge, $maxBytes): int {
                if (strlen($body) + strlen($chunk) > $maxBytes) {
                    $tooLarge = true;

                    return 0; // Abbruch
                }
                $body .= $chunk;

                return strlen($chunk);
            },
        ];
        if (! ($options['use_env_proxy'] ?? false)) {
            $opts[CURLOPT_PROXY] = '';
            $opts[CURLOPT_NOPROXY] = '*';
        }
        curl_setopt_array($ch, $opts);
        $ok = curl_exec($ch);
        $errno = curl_errno($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        curl_close($ch);

        if ($tooLarge) {
            throw new FetchException(sprintf('Die Antwort der Webseite ist zu groß (mehr als %d MB).', (int) ceil($maxBytes / 1048576)));
        }
        if ($ok === false || $errno !== 0) {
            throw new FetchException(match ($errno) {
                CURLE_OPERATION_TIMEDOUT => 'Die Webseite hat nicht rechtzeitig geantwortet (Zeitüberschreitung).',
                CURLE_COULDNT_CONNECT => 'Es konnte keine Verbindung zur Webseite hergestellt werden.',
                CURLE_SSL_CACERT, CURLE_SSL_CONNECT_ERROR, 60 => 'Die sichere Verbindung (HTTPS) zur Webseite ist fehlgeschlagen.',
                default => 'Die Webseite konnte nicht abgerufen werden (Fehler '.$errno.').',
            });
        }

        return ['status' => $status, 'headers' => $headers, 'body' => $body];
    }
}
