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
            $table->string('notes')->nullable();
            $table->boolean('is_graded')->default(false);
            $table->integer('grade')->nullable()->default(1);

            // Scores
            $table->float('midterm_score')->nullable()->default(0);
            $table->float('quiz_score')->nullable()->default(0);
            $table->float('assignment_score')->nullable()->default(0);
            $table->float('exam_score')->nullable()->default(0);
            $table->float('homework_score')->nullable()->default(0);
            $table->float('bonus_point_score')->nullable()->default(0);
            $table->float('sum_scores')->nullable()->default(0);
            $table->float('max_score')->nullable()->default(0);

            // Details
            $table->string('course_placement')->nullable();
            $table->string('mark_conditions')->nullable();
            $table->string('scores')->nullable();
            $table->string('bonus_exercise')->nullable();
            $table->string('mark')->nullable();
            $table->string('exam_type')->nullable();
            $table->string('readings')->nullable();
            $table->integer('absences')->nullable()->default(0);
            $table->string('programing_language')->nullable();
            $table->string('course_page')->nullable();
            $table->integer('weekly_time_consumption')->nullable()->default(0);
            $table->integer('points_for_2')->nullable()->default(0);
            $table->integer('points_for_3')->nullable()->default(0);
            $table->integer('points_for_4')->nullable()->default(0);
            $table->integer('points_for_5')->nullable()->default(0);
            $table->boolean('is_percentage')->default(false);

            $table->unsignedBigInteger('semester_id');
            $table->foreign('semester_id')->references('id')->on('semesters')->onDelete('cascade');
            $table->unsignedBigInteger('university_id');
            $table->foreign('university_id')->references('id')->on('universities')->onDelete('cascade');
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
