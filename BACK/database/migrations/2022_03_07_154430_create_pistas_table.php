<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePistasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pistas', function (Blueprint $table) {
            $table->id();
            $table->string("numeracion")->unique();
            $table->boolean("exterior");
            $table->foreignId("tipopista_id");
            $table->foreignId("tamanopista_id");
            $table->boolean("iluminacion");
            $table->integer("valoracion");

            $table->foreign('tipopista_id')->references('id')->on('tipopistas');
            $table->foreign('tamanopista_id')->references('id')->on('tamanopistas');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pistas');
    }
}
