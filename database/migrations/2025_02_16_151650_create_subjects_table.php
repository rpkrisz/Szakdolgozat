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
            $table->string('notes');
            $table->boolean('isGraded')->default(false);
            $table->integer('grade');

            // Scores
            $table->integer('midterms')->default(0);
            $table->integer('quizes')->default(0);
            $table->integer('assignments')->default(0);
            $table->integer('exams')->default(0);
            $table->integer('homeWorks')->default(0);
            $table->integer('bonusPoints')->default(0);
            $table->integer('sumScores')->default(0);
            $table->integer('maxScore');

            // Details
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
            $table->boolean('isPercentage')->default(false);

            // $table->unsignedBigInteger('score_id')->nullable();
            // $table->foreign('score_id')->references('id')->on('scores')->onDelete('cascade');
            // $table->unsignedBigInteger('details_id')->nullable();
            // $table->foreign('details_id')->references('id')->on('details')->onDelete('cascade');

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
