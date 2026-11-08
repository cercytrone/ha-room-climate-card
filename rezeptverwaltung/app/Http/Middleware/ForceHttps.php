<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Leitet HTTP auf HTTPS um, wenn FORCE_HTTPS=true. Voraussetzung: HTTPS wird korrekt
 * erkannt (direkt oder über TRUSTED_PROXIES), sonst entstünde eine Umleitungsschleife.
 * Bevorzugt sollte die Weiterleitung im Hosting-Panel aktiviert werden.
 */
class ForceHttps
{
    public function handle(Request $request, Closure $next): Response
    {
        if (config('rezepte.force_https') && ! $request->isSecure() && app()->environment('production')
            && in_array($request->getMethod(), ['GET', 'HEAD'], true)) {
            return redirect()->secure($request->getRequestUri(), 301);
        }

        return $next($request);
    }
}
