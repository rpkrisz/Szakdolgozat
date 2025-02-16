<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('courseType');
            $table->integer('credit');
            $table->integer('semester');
            $table->string('notes');
            $table->boolean('isGraded')->default(false);
            $table->integer('grade');

            $table->unsignedBigInteger('score_id');
            $table->foreign('score_id')->references('id')->on('scores')->onDelete('cascade');
            $table->unsignedBigInteger('details_id');
            $table->foreign('details_id')->references('id')->on('details')->onDelete('cascade');
            $table->unsignedBigInteger('semester_id');
            $table->foreign('semester_id')->references('id')->on('semesters')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
