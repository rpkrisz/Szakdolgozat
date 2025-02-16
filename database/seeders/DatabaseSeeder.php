<?php

namespace Database\Seeders;

use App\Models\Semester;
use App\Models\Subject;
use App\Models\Task;
use App\Models\University;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $users = User::factory(5)->create();


        foreach ($users as $student) {
            $uni = University::factory()
                ->for($student)
                ->create(['user_id' => $student->id]);

            $semesters = Semester::factory($uni->currSemester)
                ->for($uni)
                ->for($student)
                ->create(['university_id' => $uni->id, 'user_id' => $student->id]);

            foreach ($semesters as $semester) {
                $subjects = Subject::factory(3)
                    ->for($semester)
                    ->for($student)
                    ->create(['semester_id' => $semester->id, 'user_id' => $student->id]);

                foreach ($subjects as $subject) {
                    Task::factory(3)
                        ->for($subject)
                        ->for($student)
                        ->create(['subject_id' => $subject->id, 'user_id' => $student->id]);
                }
            }
        }

        $this->call([
            PersonalSeeder::class,
        ]);
    }
}
