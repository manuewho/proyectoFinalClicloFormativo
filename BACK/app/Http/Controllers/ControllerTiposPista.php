<?php

namespace App\Http\Controllers;

use App\Models\Tipopista;
use Illuminate\Http\Request;
use JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;


class ControllerTiposPista extends Controller
{

    public function __construct(Request $request) {
        $token = $request->header('Authorization');
        if($token != '')
        $this->user = JWTAuth::parseToken()->authenticate();
    }


    public function index () {

        $tipos=Tipopista::all();
        return response()->json($tipos);
    }

    public function store (Request $request) {

        if ($this->user->tipo!=1) {
            return response()->json(['error' =>
            "Sólo un usuario administrador puede añadir tipos de pista"], 401);
        }

        $data=$request->only(
            'suelo'
        );

        $validator = Validator::make($data, [
            'suelo' => 'required|min:3|max:100|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' =>
            $validator->messages()], 400);
        }

        $tipoNuevo=Tipopista::create([
            'suelo'=> $request->suelo
        ]);

        return response()->json([
            'message' => 'OK',
        ], Response::HTTP_OK);

    }

    public function destroy ($id) {

        if ($this->user->tipo!=1) {
            return response()->json(['error' =>
            "Sólo un usuario administrador puede borrar tipos de pista"], 401);
        }

        $busqueda=Tipopista::find($id);
        
        if  (!$busqueda) {
            return response()->json([
                'error' =>"Este tipo no existe"], 400);
        } else {
            $busqueda->delete();
            return response()->json([
                'mensaje' =>"OK"], 200);
        }

    }

}
 