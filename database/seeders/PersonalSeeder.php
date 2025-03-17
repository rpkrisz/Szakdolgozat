<?php

namespace Database\Seeders;

use App\Models\Semester;
use App\Models\Subject;
use App\Models\Task;
use App\Models\University;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonalSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $me = User::factory()->create([
            'name' => 'Krisz',
            'email' => 'rp.krisz123@gmail.com',
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


        foreach ($semesters as $semester) {
            $subjects = Subject::factory(3)
                ->for($semester)
                ->for($me)
                ->create(['semester_id' => $semester->id, 'user_id' => $me->id]);

            foreach ($subjects as $subject) {
                Task::factory(3)
                    ->for($subject)
                    ->for($me)
                    ->create(['subject_id' => $subject->id, 'user_id' => $me->id]);
            }
        }

        $semester = Semester::factory()
            ->for($uni)
            ->for($me)
            ->create([
                'name' => "Semester 6",
                'average' => '5',
                'grade_point_average' => '5',
                'credit_index' => '5',
                'corrected_credit_index' => '5',
                'registered_credit' => '27',
                'passeed_credit' => '27',
                'completion_rate' => '100',
                'university_id' => $uni->id,
                'user_id' => $me->id
            ]);

        $subjects = Subject::factory(3)
            ->for($semester)
            ->for($me)
            ->create(['semester_id' => $semester->id, 'user_id' => $me->id]);

        foreach ($subjects as $subject) {
            Task::factory(3)
                ->for($subject)
                ->for($me)
                ->create(['subject_id' => $subject->id, 'user_id' => $me->id]);
        }

        $subjects = Subject::factory()
            ->for($semester)
            ->for($me)
            ->create([
                'name' => 'Nummod/SzamElmII',
                'course_type' => '',
                'credit' => 3,
                'notes' => '',
                'is_graded' => false,
                'grade' => 1,
                'midterms' => 0,
                'quizes' => 0,
                'assignments' => 0,
                'exams' => 0,
                'homeworks' => 0,
                'bonus_points' => 0,
                'sum_scores' => 0,
                'max_score' => 0,
                'course_placement' => '',
                'mark_conditions' => '',
                'scores' => '',
                'bonus_exercise' => '',
                'mark' => '',
                'exam_type' => '',
                'readings' => '',
                'absences' => 0,
                'programing_language' => '',
                'course_page' => '',
                'weekly_time_consumption' => 0,
                'points_for_2' => 0,
                'points_for_3' => 0,
                'points_for_4' => 0,
                'points_for_5' => 0,
                'is_percentage' => false,
                'semester_id' => $semester->id,
                'user_id' => $me->id
            ]);
    }
}
