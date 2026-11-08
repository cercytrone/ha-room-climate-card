<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

/**
 * Sichere Ersteinrichtung: legt ein Benutzerkonto an. Das Passwort wird verdeckt
 * abgefragt und nie im Quellcode, in Logs oder in der Shell-Historie gespeichert.
 */
class CreateUser extends Command
{
    protected $signature = 'rezepte:benutzer-anlegen {--name= : Anzeigename} {--email= : Anmelde-E-Mail} {--weiterer : Weiteres Konto anlegen, obwohl bereits eines existiert}';

    protected $description = 'Legt ein Benutzerkonto an (Passwort wird verdeckt abgefragt)';

    public function handle(): int
    {
        if (User::query()->exists() && ! $this->option('weiterer')) {
            $this->error('Es existiert bereits ein Benutzerkonto. Für ein weiteres Konto --weiterer angeben; Passwort ändern: php artisan rezepte:passwort-setzen <E-Mail>');

            return self::FAILURE;
        }
        $name = $this->option('name') ?: $this->ask('Name');
        $email = $this->option('email') ?: $this->ask('E-Mail-Adresse (Anmeldename)');
        $password = $this->secret('Passwort (mind. 12 Zeichen, Eingabe unsichtbar)');
        $confirm = $this->secret('Passwort wiederholen');

        $v = Validator::make(
            ['name' => $name, 'email' => $email, 'password' => $password, 'password_confirmation' => $confirm],
            ['name' => ['required', 'string', 'max:255'], 'email' => ['required', 'email', 'max:255', 'unique:users,email'], 'password' => ['required', 'confirmed', Password::min(12)]]
        );
        if ($v->fails()) {
            foreach ($v->errors()->all() as $e) {
                $this->error($e);
            }

            return self::FAILURE;
        }
        User::create(['name' => $name, 'email' => mb_strtolower($email), 'password' => $password]);
        $this->info('Benutzerkonto angelegt. Anmeldung jetzt im Browser möglich.');

        return self::SUCCESS;
    }
}
