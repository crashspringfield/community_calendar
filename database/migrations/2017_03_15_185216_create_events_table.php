<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
          $table->increments('id');
          $table->string('title');
          $table->string('start');
          $table->string('end');
          $table->string('location');
          $table->string('eventType');
          $table->text('description');
          $table->string('link');
          $table->string('contact');
          $table->string('userEmail');
          $table->boolean('approved');
          $table->integer('user_id');
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('events');
    }
}
