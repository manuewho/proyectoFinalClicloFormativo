<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerReservas;
use App\Http\Controllers\ControllerHorarios;
use App\Http\Controllers\ControllerPista;
use App\Http\Controllers\ControllerTamanoPista;
use App\Http\Controllers\ControllerTiposPista;

use App\Http\Controllers\CheckoutController;

use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('Tindex', [ControllerTiposPista::class,'index']);
Route::get('Tamindex', [ControllerTamanoPista::class,'index']);
Route::get('Pindex', [ControllerPista::class,'index']);

Route::get('Hindex', [ControllerHorarios::class,'index']);
Route::get('Hindex2', [ControllerHorarios::class,'index2']);

Route::get('Rindex', [ControllerReservas::class,'index']); 

Route::get('Pindex/{id}', [ControllerPista::class,'unaPista']);
Route::get('Uindex/{id}', [AuthController::class,'unUsuario']);

Route::get('FechaHindex/{fecha}/{pista}', [ControllerReservas::class,'indexHorasF']);
Route::get('prueba/{fecha}/{fecha2}/{PISTA}', [ControllerReservas::class,'diasCompletos']);

Route::get("limpiarReservas", [ControllerReservas::class, "eliminarAntiguo"]);


Route::post('login', [AuthController::class, 'authenticate']);
Route::post('registro', [AuthController::class, 'register']);
Route::post('verificarEmail', [AuthController::class, 'verificacionEmail']);
Route::post('get-user', [AuthController::class, 'getUser']);


Route::group(['middleware' => ['jwt.verify']], function() {

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('logueado', [AuthController::class, 'continuar']);

    Route::get('index', [AuthController::class, 'index']);

    Route::get('eliminar/{id}', [AuthController::class, 'eliminarUS']);

    Route::post('update', [AuthController::class, 'update']);

    Route::get('uno/{id}', [AuthController::class, 'unUsuario']);


    //Route::resource("pistas", ControllerPista::class);

    Route::get('pistas/{id}', [ControllerPista::class,'destroy']);
    Route::post('pistas', [ControllerPista::class,'store']);
    Route::post('pistasM/{id}', [ControllerPista::class,'update']);


    //Route::resource("tipos", ControllerTiposPista::class);

    //Route::resource("tamanos", ControllerTamanoPista::class);

    Route::get('reservas/{id}', [ControllerReservas::class,'destroy']);
    Route::get('reservas', [ControllerReservas::class,'index']);
    Route::post('reservas', [ControllerReservas::class,'store']);

    //Route::resource("reservas", ControllerReservas::class);

    Route::get("activarHoras/{id}", [ControllerHorarios::class, "activar"]);

    Route::get("desactivarHoras/{id}", [ControllerHorarios::class, "desactivar"]);


    Route::post("horasprecio", [ControllerReservas::class, "horasPrecios"]);

    


    Route::get("unaReserva/{id}", [ControllerReservas::class, "unaReserva"]);
    Route::get("cancelR/{id}", [ControllerReservas::class, "pagoError"]);

    
    
});

Route::middleware(["cors"])->group(function () {
    Route::post("checkout", [CheckoutController::class, "charge"]);
});
    