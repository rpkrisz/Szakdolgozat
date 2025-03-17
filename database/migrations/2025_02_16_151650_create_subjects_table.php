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
            $table->string('course_type');
            $table->integer('credit');
            $table->string('notes');
            $table->boolean('is_graded')->default(false);
            $table->integer('grade');

            // Scores
            $table->float('midterms')->default(0);
            $table->float('quizes')->default(0);
            $table->float('assignments')->default(0);
            $table->float('exams')->default(0);
            $table->float('homeworks')->default(0);
            $table->float('bonus_points')->default(0);
            $table->float('sum_scores')->default(0);
            $table->float('max_score');

            // Details
            $table->string('course_placement');
            $table->string('mark_conditions');
            $table->string('scores');
            $table->string('bonus_exercise');
            $table->string('mark');
            $table->string('exam_type');
            $table->string('readings');
            $table->integer('absences');
            $table->string('programing_language');
            $table->string('course_page');
            $table->integer('weekly_time_consumption');
            $table->integer('points_for_2');
            $table->integer('points_for_3');
            $table->integer('points_for_4');
            $table->integer('points_for_5');
            $table->boolean('is_percentage')->default(false);

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
