<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImportQueueItem extends Model
{
    public const STATUS_LABELS = [
        'pending' => 'Wartet',
        'processing' => 'In Bearbeitung',
        'ready' => 'Bereit zur Prüfung',
        'failed' => 'Fehlgeschlagen',
        'saved' => 'Gespeichert',
    ];

    protected $fillable = ['user_id', 'url', 'status', 'attempts', 'payload', 'error', 'recipe_id', 'locked_until'];

    protected function casts(): array
    {
        return ['payload' => 'array', 'locked_until' => 'datetime'];
    }
}
