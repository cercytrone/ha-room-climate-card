<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/** Einfache Schlüssel/Wert-Einstellungen, die in der Oberfläche geändert werden können. */
class Setting extends Model
{
    protected $primaryKey = 'key';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = ['key', 'value'];

    private static array $cache = [];

    public static function get(string $key, mixed $default = null): mixed
    {
        if (! array_key_exists($key, self::$cache)) {
            try {
                self::$cache[$key] = static::query()->find($key)?->value;
            } catch (\Throwable) {
                return $default;
            }
        }

        return self::$cache[$key] ?? $default;
    }

    public static function put(string $key, mixed $value): void
    {
        static::query()->updateOrCreate(['key' => $key], ['value' => $value === null ? null : (string) $value]);
        self::$cache[$key] = $value === null ? null : (string) $value;
    }

    public static function flushCache(): void
    {
        self::$cache = [];
    }
}
