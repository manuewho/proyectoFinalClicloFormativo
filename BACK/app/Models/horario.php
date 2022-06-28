<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class horario extends Model
{

    public $timestamps = false;


    protected $fillable = [
        'hora',
        'codigo'
    ];

    public function reservahora()
    {
        return $this->hasMany(Reservahora::class);
    }
}
