<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class SetPassword extends Command
{
    protected $signature = 'rezepte:passwort-setzen {email}';

    protected $description = 'Setzt das Passwort eines Kontos neu (z. B. bei vergessenem Passwort) und beendet alle Sitzungen';

    public function handle(): int
    {
        $user = User::query()->where('email', mb_strtolower($this->argument('email')))->first();
        if (! $user) {
            $this->error('Kein Konto mit dieser E-Mail-Adresse gefunden.');

            return self::FAILURE;
        }
        $password = $this->secret('Neues Passwort (mind. 12 Zeichen)');
        $confirm = $this->secret('Passwort wiederholen');
        $v = Validator::make(['password' => $password, 'password_confirmation' => $confirm], ['password' => ['required', 'confirmed', Password::min(12)]]);
        if ($v->fails()) {
            $this->error($v->errors()->first());

            return self::FAILURE;
        }
        $user->forceFill(['password' => $password, 'remember_token' => null])->save();
        DB::table('sessions')->where('user_id', $user->id)->delete();
        $this->info('Passwort geändert. Alle bestehenden Sitzungen wurden beendet.');

        return self::SUCCESS;
    }
}
