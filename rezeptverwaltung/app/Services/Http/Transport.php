<?php

namespace App\Services\Http;

/** Führt genau EINE HTTP-Anfrage aus (ohne Weiterleitungen zu folgen). */
interface Transport
{
    /**
     * @param  string  $pinnedIp  Bereits geprüfte IP-Adresse, mit der verbunden werden MUSS.
     * @return array{status: int, headers: array<string, string>, body: string}
     *
     * @throws FetchException
     */
    public function request(string $url, string $host, int $port, string $pinnedIp, int $maxBytes, array $options): array;
}
