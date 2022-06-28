<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pista;
use App\Models\Reservahora;

use JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class ControllerPista extends Controller
{
    public function __construct(Request $request) {
        $token = $request->header('Authorization');
        if($token != '')
        $this->user = JWTAuth::parseToken()->authenticate();
    }

    public function index () {

        $pistas=Pista::all();
        return response()->json($pistas);
    }

    

    public function unaPista ($id) {

        $pista=Pista::find($id);
        return response()->json($pista);
    }

    public function store (Request $request) {

        if ($this->user->tipo!=1) {
            return response()->json("NO");
        }
        
        
        
        $data=$request->only(
            'numeracion',
            'exterior',
            'tipopista_id',
            'tamanopista_id',
            'iluminacion'
        );

        $validator = Validator::make($data, [
            'numeracion'=> 'required|min:1|max:100|string',
            'exterior'=> 'required|boolean',
            'tipopista_id'=> 'required|numeric',
            'tamanopista_id'=> 'required|numeric',
            'iluminacion'=> 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json("errord");
        }

        $pistaNumeracion=pista::where("numeracion","=",$request->numeracion)->first();
        if ($pistaNumeracion) {
            return response()->json("NO3");
        }

        $valoracion=3;
        $imagen='p1.png';

        $pistaNueva=Pista::create([
            'numeracion'=>$request->numeracion,
            'exterior'=>$request->exterior,
            'tipopista_id'=>$request->tipopista_id,
            'tamanopista_id'=>$request->tamanopista_id,
            'iluminacion'=>$request->iluminacion,
            'valoracion'=>$valoracion,
            'imagen'=>$imagen
        ]);

        return response()->json("OK");

    }

    public function update (Request $request, $id) {

        if ($this->user->tipo!=1) {
            return response()->json("NO1");
        }

        $pista=Pista::find($id);

        if (!$pista) {
            return response()->json("NO2");
        }

        $codigoPista=$pista->numeracion;
    
        $pistaNumeracion=pista::where("numeracion","=",$request->numeracion)->first();
        if ($pistaNumeracion) {
            return response()->json("NO3");
        }

        $data=$request->only(
            'numeracion',
            'exterior',
            'tipopista_id',
            'tamanopista_id',
            'iluminacion'
        );

        $validator = Validator::make($data, [
            'numeracion'=> 'required|min:1|max:100|string',
            'exterior'=> 'required|boolean',
            'tipopista_id'=> 'required|numeric',
            'tamanopista_id'=> 'required|numeric',
            'iluminacion'=> 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json("errord");
        }

        $valoracion=3;
        $imagen='p1.png';

        $pista->numeracion=$request->numeracion;
        $pista->exterior=$request->exterior;
        $pista->tipopista_id=$request->tipopista_id;
        $pista->tamanopista_id=$request->tamanopista_id;
        $pista->iluminacion=$request->iluminacion;
        $pista->valoracion=$valoracion;
        $pista->imagen=$imagen;
        $pista->save();

       
        $reservasHoras=Reservahora::where("codigo_pista","=", $codigoPista)->get();
    
        foreach ($reservasHoras as $value) {

            Reservahora::where("idR", "=", $value->idR)->update(["codigo_pista"=>$request->numeracion]);
        }


        return response()->json("OK");

    }

    public function destroy ($id) {

        if ($this->user->tipo!=1) {
            return response()->json("NO");
        }
        
        $busqueda=Pista::find($id);
        
        if  (!$busqueda) {
            return response()->json("NO");
        } 
        

        $reservas=Reservahora::where("codigo_pista",$busqueda->numeracion)->first();

        
        if (!$reservas) {
            $busqueda->delete();
            return response()->json("OK");
        }

        if ($reservas) {
            return response()->json("R");
        }

    }
}
