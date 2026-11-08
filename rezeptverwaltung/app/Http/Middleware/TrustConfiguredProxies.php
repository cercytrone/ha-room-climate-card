<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies;
use Illuminate\Http\Request;

/**
 * Vertraut X-Forwarded-*-Headern nur, wenn die Anfrage von einer in TRUSTED_PROXIES
 * ausdrücklich genannten Adresse kommt. Ein pauschales "*" wird ignoriert.
 */
class TrustConfiguredProxies extends TrustProxies
{
    protected function proxies()
    {
        $list = array_filter(array_map('trim', explode(',', (string) config('rezepte.trusted_proxies', ''))));

        return array_values(array_filter($list, fn ($p) => $p !== '*' && $p !== '**')) ?: null;
    }

    protected function headers()
    {
        return Request::HEADER_X_FORWARDED_FOR | Request::HEADER_X_FORWARDED_HOST | Request::HEADER_X_FORWARDED_PORT | Request::HEADER_X_FORWARDED_PROTO;
    }
}
