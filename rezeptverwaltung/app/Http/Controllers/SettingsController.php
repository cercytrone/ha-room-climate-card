<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\TaskRun;
use App\Services\Backup\BackupService;
use App\Services\SystemCheck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class SettingsController extends Controller
{
    public function index(Request $request, BackupService $backups)
    {
        return view('settings.index', [
            'user' => $request->user(),
            'backups' => $backups->list(),
            'runs' => TaskRun::query()->orderByDesc('started_at')->limit(20)->get(),
            'settings' => [
                'default_view' => Setting::get('default_view', 'karten'),
                'backup_enabled' => Setting::get('backup_enabled', '1') === '1',
                'backup_keep' => (int) Setting::get('backup_keep', config('rezepte.backup.keep')),
                'backup_max_age_days' => (int) Setting::get('backup_max_age_days', config('rezepte.backup.max_age_days')),
            ],
            'mailEnabled' => config('mail.default') === 'smtp',
        ]);
    }

    public function updateAccount(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
        ], [], ['name' => 'Name', 'email' => 'E-Mail-Adresse']);
        $user->update(['name' => $data['name'], 'email' => mb_strtolower($data['email'])]);

        return back()->with('status', 'Konto gespeichert.');
    }

    public function updatePassword(Request $request)
    {
        $data = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::defaults()],
        ], [], ['current_password' => 'Aktuelles Passwort', 'password' => 'Neues Passwort']);
        $user = $request->user();
        $user->forceFill(['password' => $data['password'], 'remember_token' => Str::random(60)])->save();
        // Andere Sitzungen beenden
        DB::table('sessions')->where('user_id', $user->id)->where('id', '!=', $request->session()->getId())->delete();

        return back()->with('status', 'Passwort geändert. Andere Sitzungen wurden abgemeldet.');
    }

    public function updateDisplay(Request $request)
    {
        $data = $request->validate(['default_view' => ['required', Rule::in(['karten', 'liste'])]]);
        Setting::put('default_view', $data['default_view']);

        return back()->with('status', 'Darstellung gespeichert.');
    }

    public function updateBackup(Request $request)
    {
        $data = $request->validate([
            'backup_enabled' => ['nullable', 'boolean'],
            'backup_keep' => ['required', 'integer', 'between:1,365'],
            'backup_max_age_days' => ['required', 'integer', 'between:0,3650'],
        ], [], ['backup_keep' => 'Anzahl aufbewahrter Sicherungen', 'backup_max_age_days' => 'Maximales Alter']);
        Setting::put('backup_enabled', $request->boolean('backup_enabled') ? '1' : '0');
        Setting::put('backup_keep', $data['backup_keep']);
        Setting::put('backup_max_age_days', $data['backup_max_age_days']);

        return back()->with('status', 'Sicherungseinstellungen gespeichert.');
    }

    public function system(Request $request, SystemCheck $check)
    {
        return view('settings.system', ['rows' => $check->run($request)]);
    }
}
