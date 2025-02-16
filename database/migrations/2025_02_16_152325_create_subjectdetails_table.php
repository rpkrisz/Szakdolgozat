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
        Schema::create('subjectdetails', function (Blueprint $table) {
            $table->id();

            $table->string('coursePlacement');
            $table->string('markConditions');
            $table->string('scores');
            $table->string('bonusExercise');
            $table->string('mark');
            $table->string('examType');
            $table->string('readings');
            $table->integer('absences');
            $table->string('programingLanguage');
            $table->string('coursePage');
            $table->integer('weeklyTimeConsumption');
            $table->integer('pointsFor2');
            $table->integer('pointsFor3');
            $table->integer('pointsFor4');
            $table->integer('pointsFor5');
            $table->integer('maxPoint');
            $table->boolean('isPercentage')->default(false);

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
        Schema::dropIfExists('subjectdetails');
    }
};
