<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservahora extends Model
{

    public $timestamps = false;


    protected $fillable = [
        'fecha',
        'codigo_pista',
        'reserva_id',
        'horario_id'
    ];

    public function horarios()
    {
        return $this->hasMany(Horario::class);
    }

    public function reservas()
    {
        return $this->hasMany(Reserva::class);
    }

}
