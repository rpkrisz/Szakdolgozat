<?php

namespace Database\Seeders;

use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SubjectController;
use App\Models\Semester;
use App\Models\Subject;
use App\Models\Task;
use App\Models\University;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestUserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $SemesterController = app(SemesterController::class);
        $SubjectController = app(SubjectController::class);

        $me = User::factory()->create([
            'first_name' => 'Felhaszáló',
            'last_name' => 'Teszt',
            'nick_name' => 'User',
            'email' => 'user@test.com',
        ]);

        $uni = University::factory()
            ->for($me)
            ->create([
                'name' => 'Eötvös Loránd Tudományegyetem',
                'nick_name' => 'ELTE',
                'faculty' => 'Informatikai kar',
                'major' => 'Programtervező informatikus',
                'degree_level' => 'BA/BSc',
                'semesters_count' => 6,
                'curr_semester' => 6,
                'curr_semesterID' => 6,
                'curr_semester_fst_day' => '2025-02-10',
                'specialisation' => 'Szoftverfejlesztő',
                'user_id' => $me->id,
            ]);


        $semesters = [];
        for ($i = 0; $i < $uni->curr_semester - 1; $i++) {
            $name = "Semester" . " " . $i + 1;
            $semesters[$i] = Semester::factory()
                ->for($uni)
                ->for($me)
                ->create(['name' => $name, 'university_id' => $uni->id, 'user_id' => $me->id]);
        }

        $semester = Semester::factory()
            ->for($uni)
            ->for($me)
            ->create([
                'name' => "Semester 6",
                'average' => '5',
                'weighted_average' => '5',
                'credit_index' => '5',
                'corrected_credit_index' => '5',
                'registered_credit' => '20',
                'passed_credit' => '20',
                'completion_rate' => '100',
                'university_id' => $uni->id,
                'user_id' => $me->id
            ]);

        $uni->update([
            'curr_semesterID' => $semester->id,
        ]);

        Subject::factory()
            ->for($uni)
            ->for($semester)
            ->for($me)
            ->create([
                "name" => "Szakdolgozat",
                "credit" => 20,
                "course_type" => "Practice",
                "weekly_time_consumption" => 180,
                "is_graded" => false,
                'max_score' => 30,
                'points_for_2' => 15,
                'points_for_3' => 19,
                'points_for_4' => 23,
                'points_for_5' => 27,
                "is_percentage" => false

            ]);

        foreach ($semester->subjects as $subject) {
            $SubjectController->calculateScores($subject);
            $grade = 1;
            if ($subject->is_graded) {
                foreach ([$subject->points_for_2, $subject->points_for_3, $subject->points_for_4, $subject->points_for_5] as $gradeLimit) {
                    if ($gradeLimit > ($subject->sum_scores /  $subject->max_score)) $grade = $grade + 1;
                }
            }
            $subject->update(["grade" => $grade]);
        }

        $SemesterController->semesterStatisticUpdate($semester);
    }
}
