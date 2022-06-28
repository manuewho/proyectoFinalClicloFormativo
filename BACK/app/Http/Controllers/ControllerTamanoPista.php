<?php

namespace App\Http\Controllers;
 
use App\Models\Tamanopista;
use Illuminate\Http\Request;
use JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class ControllerTamanoPista extends Controller
{

    public function __construct(Request $request) {
        $token = $request->header('Authorization');
        if($token != '') {
            $this->user = JWTAuth::parseToken()->authenticate();

        }
    }


    public function index () {

        $tamanos=Tamanopista::all();
        return response()->json($tamanos);
    }

    public function store (Request $request) {

        if ($this->user->tipo!=1) {
            return response()->json(['error' =>
            "Sólo un usuario administrador puede añadir tamaños nuevos de pista"], 401);
        }

        $data=$request->only(
            'tamano'
        );

        $validator = Validator::make($data, [
            'tamano' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' =>
            $validator->messages()], 400);
        }

        $tamanoNuevo=Tamanopista::create([
            'tamano'=> $request->tamano
        ]);

        return response()->json([
            'message' => 'OK',
        ], Response::HTTP_OK);

    }

    public function destroy ($id) {

        if ($this->user->tipo!=1) {
            return response()->json(['error' =>
            "Sólo un usuario administrador puede borrar tamaños de pista"], 401);
        }

        $busqueda=Tamanopista::find($id);
        
        if  (!$busqueda) {
            return response()->json([
                'error' =>"Este tamaño no existe"], 400);
        } else {
            $busqueda->delete();
            return response()->json([
                'mensaje' =>"OK"], 200);
        }

    }
}
