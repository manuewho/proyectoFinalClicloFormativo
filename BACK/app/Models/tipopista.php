<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tipopista extends Model
{

    public $timestamps = false;

    protected $fillable = [
        'suelo'
    ];

    public function pistas()
    {
        return $this->hasMany(Pista::class);
    }
}
