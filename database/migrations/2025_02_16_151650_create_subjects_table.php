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
            $table->integer('grade')->nullable();

            // Scores
            $table->float('midterms')->nullable()->default(0);
            $table->float('quizes')->nullable()->default(0);
            $table->float('assignments')->nullable()->default(0);
            $table->float('exams')->nullable()->default(0);
            $table->float('homeworks')->nullable()->default(0);
            $table->float('bonus_points')->nullable()->default(0);
            $table->float('sum_scores')->nullable()->default(0);
            $table->float('max_score')->nullable()->nullable();

            // Details
            $table->string('course_placement')->nullable()->default("");
            $table->string('mark_conditions')->nullable()->default("");
            $table->string('scores')->nullable()->default("");
            $table->string('bonus_exercise')->nullable()->default("");
            $table->string('mark')->nullable()->default("");
            $table->string('exam_type')->nullable()->default("");
            $table->string('readings')->nullable()->default("");
            $table->integer('absences')->nullable();
            $table->string('programing_language')->nullable();
            $table->string('course_page')->nullable();
            $table->integer('weekly_time_consumption')->nullable();
            $table->integer('points_for_2')->nullable();
            $table->integer('points_for_3')->nullable();
            $table->integer('points_for_4')->nullable();
            $table->integer('points_for_5')->nullable();
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
