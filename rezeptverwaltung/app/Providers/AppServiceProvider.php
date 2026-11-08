<?php

namespace App\Providers;

use App\Services\Http\CurlTransport;
use App\Services\Http\Transport;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(Transport::class, CurlTransport::class);
    }

    public function boot(): void
    {
        if (config('rezepte.force_https')) {
            URL::forceScheme('https');
        }

        Password::defaults(fn () => Password::min(12));

        RateLimiter::for('import', fn (Request $r) => Limit::perMinute(20)->by((string) $r->user()?->id));
        RateLimiter::for('mail', fn (Request $r) => Limit::perHour(20)->by((string) $r->user()?->id));
        RateLimiter::for('public', fn (Request $r) => Limit::perMinute(60)->by((string) $r->ip()));
        RateLimiter::for('uploads', fn (Request $r) => Limit::perMinute(30)->by((string) $r->user()?->id));
    }
}
