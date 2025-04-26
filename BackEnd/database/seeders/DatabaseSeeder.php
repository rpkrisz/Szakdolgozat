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

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $SemesterController = app(SemesterController::class);
        $SubjectController = app(SubjectController::class);

        $this->call([
            PersonalSeeder::class,
            TestUserSeeder::class,
        ]);

        $users = User::factory(5)->create();


        foreach ($users as $student) {
            $uni = University::factory()
                ->for($student)
                ->create();

            $semesters = [];
            for ($i = 0; $i < $uni->semesters_count; $i++) {
                $name = "Semester" . " " . $i + 1;
                $semesters[$i] = Semester::factory()
                    ->for($uni)
                    ->for($student)
                    ->create(['name' => $name, 'university_id' => $uni->id, 'user_id' => $student->id]);
            }

            foreach ($semesters as $semester) {
                $subjects = Subject::factory(3)
                    ->for($uni)
                    ->for($semester)
                    ->for($student)
                    ->create(['semester_id' => $semester->id, 'user_id' => $student->id]);

                foreach ($subjects as $subject) {
                    Task::factory(3)
                        ->for($uni)
                        ->for($semester)
                        ->for($subject)
                        ->for($student)
                        ->create(['subject_id' => $subject->id, 'user_id' => $student->id]);

                    $SubjectController->calculateScores($subject);
                    $grade = 1;
                    if ($subject->is_graded) {
                        foreach ([$subject->points_for_2, $subject->points_for_3, $subject->points_for_4, $subject->points_for_5] as $gradeLimit) {
                            if ($gradeLimit > ($subject->sum_scores /  $subject->max_score)) $grade = $grade + 1;
                        }
                    }
                    $subject->update(['grade' => $grade]);
                }
                $SemesterController->semesterStatisticUpdate($semester);
            }
        }
    }
}
