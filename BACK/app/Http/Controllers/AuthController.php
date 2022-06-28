<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use App\Models\User;
use App\Models\Reserva;


use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
   
    public function index () {

        $users=User::all();
        return response()->json($users);

    }
    
    public function register(Request $request) {
        
        $data = $request->only('nombre','apellidos', 'email', 'password','tipo');
        $validator = Validator::make($data, [
            'nombre' => 'required|string|max:50',
            'apellidos' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:50',
            'tipo'=>'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' =>
            $validator->messages()], 400);
        } 

        $activo=0;

        $user = User::create([
            'nombre' => $request->nombre,
            'apellidos' =>$request->apellidos,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'tipo'=>$request->tipo,
            'activo'=>$activo,
        ]);


        return response()->json(
         'creado');
    }

    public function eliminarUS($id) {

        $usurario=User::find($id);

        if (!$usurario)  {
            return response()->json("NOEXISTE");
        }

        $reservas=Reserva::where("user_id",$id)->first();

        if ($reservas) {
            return response()->json("RESERVAS");

        }

        $usurario->delete();

        return response()->json("OK");

    }



    public function authenticate(Request $request) {

    $credentials = $request->only('email', 'password');

    $validator = Validator::make($credentials, [
        'email' => 'required|email',
        'password' => 'required|string|min:6|max:50'
    ]);

    if ($validator->fails()) {
        return response()->json(["success"=>"errod"], 200);
    }

    try {
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(["success"=>"errod"]);
        }
    } catch (JWTException $e) {
        return response()->json([
        'message' => 'Error chungo',
        ], 500);
    }
    
    return response()->json([
    'success' => true,
    'token' => $token,
    'user' => Auth::user()
    ]);

    
    }
    //función que utilizamos para comprobar que el usuario está logueado y puedo continuar
    public function continuar(Request $request) {

        $token = $request->header('Authorization');
        if($token != '') {
            $this->user = JWTAuth::parseToken()->authenticate();
            return response()->json(["status"=>$this->user->id]);

        } else {
            return response()->json(["status"=>"No"]);

        }

    }
    
    public function update(Request $request) {

        $datos = $request->only('nombre', 'apellidos','email','tipo');
        
        $validator = Validator::make($datos, [
            'email' => 'required|email',
            'nombre' => 'required|string',
            'apellidos' => 'required|string',
            'tipo' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json("errorDATOS");
        }

        $email2=user::where("email","=",$request->email)->first();
        if ($email2) {
            return response()->json("NO3");
        }

        $usuario=User::find($request->id);

        $usuario->nombre=$request->nombre;
        $usuario->apellidos=$request->apellidos;
        $usuario->email=$request->email;
        $usuario->tipo=$request->tipo;

        $usuario->save();

        return response()->json("OK");

    }
    
    
    
    public function logout(Request $request) {
    $validator = Validator::make($request->only('token'), [
    'token' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json(['error' =>
        $validator->messages()], 400);
    }
        try {
                JWTAuth::invalidate($request->token);
                return response()->json([
                'success' => true,
                'message' => 'Usuario desconectado'
                ]);
        } catch (JWTException $exception) {
                return response()->json([
                'success' => false,
                'message' => 'Error'
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
        
        
        
    public function getUser(Request $request) {
        
        $this->validate($request, [
        'token' => 'required'
        ]);

        $user = JWTAuth::authenticate($request->token);

        if(!$user)
        return response()->json([
        'message' => 'Token invalido / token expirado',
        ], 401);

        return response()->json(['user' => $user]);
    }

    //función para obtener un usuario que queramos
    public function unUsuario ($id) {

        $user=User::find($id);
        return response()->json( $user);

    }
    //función que no se utiliza
    public function verificacionEmail (Request $request) {

        $email=User::where("email", $request->email)->first();

        if ($email) {
            return response()->json("existe");
        }

        $validator = Validator::make($request->only('email'), [
            'email' => 'email',
           
        ]);

        if ($validator->fails()) {
            return response()->json("formato");
        }

        return response()->json("OK");


       /* $emailEncode = urlencode($request->email);
        $tokenEncode = urlencode($request->password);
            
        $textoEmail = "
            Hola!\n
            Gracias por registrate en nuestro club deportivo.\n
            Para activar la cuenta entra en el siguiente enlace:\n
            http://http://localhost:4200/verificacion/$emailEncode/$tokenEncode
            ";

        mail("manuellara@gmail.com", "Activa tu cuenta", $textoEmail, $headers);
        */

    }
}
