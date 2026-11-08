<?php

namespace App\Models;

use App\Support\Markdown;
use Illuminate\Database\Eloquent\Model;

class RecipeStep extends Model
{
    public $timestamps = false;

    protected $fillable = ['recipe_id', 'position', 'body'];

    public function html(): string
    {
        return Markdown::toHtml($this->body);
    }
}
