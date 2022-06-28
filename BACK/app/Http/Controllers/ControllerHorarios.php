<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Horario;
use App\Models\Reservahora;
use JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class ControllerHorarios extends Controller
{

    public function __construct(Request $request) {
        $token = $request->header('Authorization');
        if($token != '')
        $this->user = JWTAuth::parseToken()->authenticate();
    }
    //obtenemos todos los horarios
    public function index () {

        $horas=Horario::get();

        return response()->json($horas);
    }
    //obtenemos solo los horarios que están activos
    public function index2 () {

        $horas=Horario::where("activo", "=", 1)->get();

        return response()->json($horas);
    }

    //activamos horario para que se pueda reservar
    public function activar ($id) {

        if ($this->user->tipo!=1) {
            return response()->json(['error' =>
            "Sólo un usuario administrador puede añadir nuevos horarios"]);
        }

        $hora=Horario::find($id);
        $hora->activo=1;
        $hora->save();

        return response()->json("OK");

    }
    //desactivamos horario para que no se pueda reservar
    public function desactivar ($id) {

        if ($this->user->tipo!=1) {
            return response()->json(['error' =>
            "Sólo un usuario administrador puede desactivar horarios"]);
        }
        
        $hora=Horario::find($id);
        $hora->activo=0;
        $hora->save();

        return response()->json("OK");
        

    }

}
