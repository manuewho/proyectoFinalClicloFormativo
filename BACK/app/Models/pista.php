<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pista extends Model
{

    public $timestamps = false;

    protected $fillable = [
        'numeracion',
        'exterior',
        'tipopista_id',
        'tamanopista_id',
        'iluminacion',
        'valoracion',
        'imagen'
    ];

    public function tipopista ()
    {
        return $this->belongsTo(Tipopista::class);
    }
    public function tamanopista ()
    {
        return $this->belongsTo(Tamanopista::class);
    }
}
