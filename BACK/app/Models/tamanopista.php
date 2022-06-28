<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tamanopista extends Model
{

    public $timestamps = false;


    protected $fillable = [
       'tamano'
    ];

    public function pistas()
    {
        return $this->hasMany(Pista::class);
    }
}
