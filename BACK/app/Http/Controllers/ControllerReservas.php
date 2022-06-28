<?php

namespace App\Http\Controllers;
use App\Models\Reserva;
use App\Models\Horario;
use App\Models\Reservahora;
use App\Models\User;


use Illuminate\Http\Request;
use JWTAuth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ControllerReservas extends Controller
{

    public function __construct(Request $request) {
        $token = $request->header('Authorization');
        if($token != '')
        $this->user = JWTAuth::parseToken()->authenticate();
    }


    public function index () {

        $arrayHoras=[];
        $arrayHoras2=[];

        $reservas=Reserva::with("reservahoras")->get();
        foreach ($reservas as $res) {
           
            foreach ($res["reservahoras"] as $hora) {

                $arrayHoras[$res["id"]]["fecha"]=$hora["fecha"];
                $arrayHoras[$res["id"]]["user"]=$res["user_id"];
                

                $nombre=User::where('id',$res["user_id"])->first("nombre");
                $apellidos=User::where('id',$res["user_id"])->first("apellidos");

                $arrayHoras[$res["id"]]["nombre"]=$nombre->nombre;
                $arrayHoras[$res["id"]]["apellidos"]=$apellidos->apellidos;

                $arrayHoras[$res["id"]]["codigoP"]=$hora["codigo_pista"];

                    $horarios=Horario::find($hora["horario_id"]);
                
                $arrayHoras[$res["id"]]["horita"][]=array("hora"=>$horarios["hora"], "id"=>$hora["idR"]);
               
            }  
        }
        return response()->json($arrayHoras);
    }
    //función que comprueba si hay reservas para una pista y fecha concreta
    //si las hay, devuelve las horas que están ya reservadas para poder bloquearlas
    public function indexHorasF ($fecha, $pista) {

        $fecha=Reservahora::where([["fecha","=",$fecha],["codigo_pista","=",$pista]])->get();
        
        if (count($fecha)==0) {
            return response()->json(['LIBRE'], 200);
        }

        $horasId=[];
        foreach ($fecha as $fe) {
            $horaId[]=$fe["horario_id"];
        }

        return response()->json($horaId);

    }

    //función que chequea si hay registros de reservas previas a la fecha actual y las borra
    public function eliminarAntiguo () {

        $hoy=Carbon::today();

        $dias=Reservahora::get();
        
        foreach ($dias as $value) {

            $fecha=Carbon::createFromFormat('Y-m-d', $value->fecha);
            
            if ($fecha->isPast()) {

                $eliminarR=Reservahora::where("idR", '=', $value->idR)->delete();

            }


        }
        
        return response()->json("OK");
        

    }

    //devuelve fechas en las que todas sus horas activas están ya reservadas para bloquear el día en el calendario
    public function diasCompletos ($fechaI,  $fechaF, $pista) {

        $fe=Carbon::createFromFormat('Y-m-d', $fechaI);
        $fe2=Carbon::createFromFormat('Y-m-d', $fechaF);
        $ArrayDiasCompletos=[];

        $dias=$fe2->diffInDays($fe);
        $diasImpresos=Horario::where("activo", "=", 1)->get();
        
        
        for ($i=0; $i<$dias; $i++) {
            
            $condition=Carbon::parse($fe)->format('Y-m-d');
            
            

            $comprobacionDia=Reservahora::where([["fecha","=",$condition],["codigo_pista","=",$pista]])->get();
            
               
                if ($comprobacionDia->count()>=$diasImpresos->count()){
                    $ArrayDiasCompletos[]=$condition;
                }
        
            $fe->addDays(1);
        }

        return response()->json($ArrayDiasCompletos);


    }


    public function store (Request $request) {

        $data=$request->only(
            'fecha',
            'usuario',
            'codigoPista'
            
        );
        
        $validator = Validator::make($data, [
            'fecha'=> 'required|after:' . date('Y-m-d') . '|date_format:Y-m-d',
            'usuario'=> 'required|numeric',
            'codigoPista'=>'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' =>
            $validator->messages()], 400);
        }

        DB::transaction(function() use ($request) {

        $reservaNueva=Reserva::create([
            'user_id'=>$request->usuario,
        ]);

            foreach ($request->hora as $horas) {
                
                $horaId=Horario::where("hora","=",$horas)->first("id");
            
                try {
                    $horasReservas=Reservahora::create([
                        'fecha'=>$request->fecha,
                        'reserva_id'=>$reservaNueva->id,
                        'codigo_pista'=>$request->codigoPista,
                        'horario_id'=>$horaId["id"]
                    ]);

                } catch (Exception $e) {
                    return response()->json([
                        'message' => "no"
                    ]);
                }
            }
        });

        
        $idReserva=DB::table("reservas")->latest()->first();



        return response()->json([
            'message' => 'OK' ,'id'=>$idReserva->id
        ]);
    } 


    public function destroy ($id) {

        $reservaHoras=Reservahora::where("idR","=",$id)->first();

        if (!$reservaHoras) {
            return response()->json(['error' =>
            "La reserva no existe"]);
        }

       
        $idReserva=$reservaHoras->reserva_id;
        $usuario=Reserva::find($idReserva);

        if ($this->user->id!=$usuario->user_id && $this->user->tipo!=1) {
            return response()->json(['error' =>
            "Sólo un usuario administrador o el usuario que hizo la reserva puede borrar una reserva"]);
        }

        $reservaHoras=Reservahora::where("idR","=",$id)->delete();

        $reservaHoras=Reservahora::where("reserva_id","=",$idReserva)->get();
        //si ya no quedan horas reservadas en la reserva correspondiente, la borra también
        if (count($reservaHoras)==0) {

            $reserva=Reserva::find($idReserva);
            $reserva->delete();
        }
        
        return response()->json("OK");

    }
    //función que devuelve cada hora con su precio correspondiente en función de su código (mañana o tarde)
    public function horasPrecios (Request $request) {

        $horasPrecio=[];

        foreach ($request->horas as $hora) {
            $ho=Horario::where("hora","=",$hora)->first("codigo");
        
            if ($ho->codigo=='ME') {
               
                $horasPrecio[]=['p'=>10, 'h'=>$hora];
            } else if ($ho->codigo=='TE') {
                $horasPrecio[]=['p'=>12, 'h'=>$hora];
            }
        }

        return response()->json($horasPrecio);
        
    }
 
}
