<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function show()
    {
        return view('auth.login', ['noUser' => ! User::query()->exists()]);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'max:1000'],
        ], [], ['email' => 'E-Mail-Adresse', 'password' => 'Passwort']);

        // Begrenzung: 5 Versuche je E-Mail+IP pro Minute, zusätzlich 20 je IP
        $key = Str::lower($data['email']).'|'.$request->ip();
        $ipKey = 'login-ip|'.$request->ip();
        if (RateLimiter::tooManyAttempts($key, 5) || RateLimiter::tooManyAttempts($ipKey, 20)) {
            $seconds = RateLimiter::tooManyAttempts($key, 5) ? RateLimiter::availableIn($key) : RateLimiter::availableIn($ipKey);
            throw ValidationException::withMessages([
                'email' => "Zu viele Anmeldeversuche. Bitte in {$seconds} Sekunden erneut versuchen.",
            ]);
        }

        if (! Auth::attempt(['email' => Str::lower($data['email']), 'password' => $data['password']], $request->boolean('remember'))) {
            RateLimiter::hit($key, 60);
            RateLimiter::hit($ipKey, 300);
            throw ValidationException::withMessages(['email' => 'E-Mail-Adresse oder Passwort ist nicht korrekt.']);
        }
        RateLimiter::clear($key);
        $request->session()->regenerate();

        return redirect()->intended(route('recipes.index'));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('status', 'Sie wurden abgemeldet.');
    }
}
