<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservahorasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservahoras', function (Blueprint $table) {
            
            $table->date("fecha");
            $table->foreignId("horario_id");
            $table->string("codigo_pista");
            $table->foreignId("reserva_id");

            
            $table->foreign('reserva_id')->references('id')->on('reservas');
            $table->foreign('horario_id')->references('id')->on('horarios');

            $table->primary(["fecha","horario_id","codigo_pista"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservahoras');
    }
}
