<?php

namespace Tests\Support;

use App\Services\Http\FetchException;
use App\Services\Http\Transport;

/** Simuliertes Internet für Importtests: URL => Antwort, Host => IP. */
class FakeHttp implements Transport
{
    /** @var array<string, array{status: int, headers: array<string,string>, body: string}> */
    public array $responses = [];

    /** @var array<int, array{url: string, ip: string}> */
    public array $requests = [];

    public function request(string $url, string $host, int $port, string $pinnedIp, int $maxBytes, array $options): array
    {
        $this->requests[] = ['url' => $url, 'ip' => $pinnedIp];
        if (! isset($this->responses[$url])) {
            throw new FetchException('Es konnte keine Verbindung zur Webseite hergestellt werden.');
        }
        $r = $this->responses[$url];
        if (strlen($r['body']) > $maxBytes) {
            throw new FetchException('Die Antwort der Webseite ist zu groß.');
        }

        return $r;
    }

    public function html(string $url, string $body, int $status = 200): void
    {
        $this->responses[$url] = ['status' => $status, 'headers' => ['content-type' => 'text/html; charset=utf-8'], 'body' => $body];
    }
}
