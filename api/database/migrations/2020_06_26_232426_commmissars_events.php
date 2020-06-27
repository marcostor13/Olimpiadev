<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CommmissarsEvents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commissars_events', function (Blueprint $table) {
            $table->id();
            $table->integer('commissarid');
            $table->integer('eventid');           
            $table->string('task')->comment('Juez / Observador');           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commissars_events');
    }
}
