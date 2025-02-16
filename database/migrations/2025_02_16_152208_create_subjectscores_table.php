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
        Schema::create('subjectscores', function (Blueprint $table) {
            $table->id();
            $table->integer('midterms');
            $table->integer('quizes');
            $table->integer('assignments');
            $table->integer('exams');
            $table->integer('homeWorks');
            $table->integer('bonusPoints');
            $table->integer('sumScores');
            $table->integer('maxScore');

            $table->unsignedBigInteger('subject_id');
            $table->foreign('subject_id')->references('id')->on('subject')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjectscores');
    }
};
