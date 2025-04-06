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
            'first_name' => 'Krisztián',
            'last_name' => 'Réthey-Prikkel',
            'nick_name' => 'Krisz',
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


        foreach ($semesters as $semester) {
            $subjects = Subject::factory(3)
                ->for($uni)
                ->for($semester)
                ->for($me)
                ->create(['semester_id' => $semester->id, 'user_id' => $me->id]);

            foreach ($subjects as $subject) {
                Task::factory(3)
                    ->for($uni)
                    ->for($semester)
                    ->for($subject)
                    ->for($me)
                    ->create(['subject_id' => $subject->id, 'user_id' => $me->id]);
            }
            $semester->update();
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

        $uni->update([
            'curr_semesterID' => $semester->id,
        ]);

        Subject::factory()
            ->for($uni)
            ->for($semester)
            ->for($me)
            ->create([
                "name" => "Nummod EA",
                "credit" => 2,
                "course_type" => "Tutorial",
                "is_graded" => false,
                "is_percentage" => false
            ]);

        Subject::factory()
            ->for($uni)
            ->for($semester)
            ->for($me)
            ->create([
                "name" => "Nummod GY",
                "credit" => 3,
                "course_type" => "Tutorial",
                "is_graded" => false,
                "is_percentage" => false
            ]);

        Subject::factory()
            ->for($uni)
            ->for($semester)
            ->for($me)
            ->create([
                "name" => "SzámElm",
                "credit" => 2,
                "course_type" => "Tutorial",
                "is_graded" => false,
                "is_percentage" => false
            ]);

        Subject::factory()
            ->for($uni)
            ->for($semester)
            ->for($me)
            ->create([
                "name" => "Szakdolgozat",
                "credit" => 20,
                "course_type" => "Tutorial",
                "is_graded" => false,
                "is_percentage" => false
            ]);


        $semester->update();
    }
}
