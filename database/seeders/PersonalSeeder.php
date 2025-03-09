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
                'nickName' => 'ELTE',
                'faculty' => 'Informatikai kar',
                'major' => 'Programtervező informatikus',
                'degreeLevel' => 'BA/BSc',
                'semestersCount' => 6,
                'currSemester' => 6,
                'currSemFstDay' => '2025-02-10',
                'specialisation' => 'Szoftverfejlesztő',
                'user_id' => $me->id,
            ]);


        $semesters = [];
        for ($i = 0; $i < $uni->currSemester - 1; $i++) {
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
                'gradePointAverage' => '5',
                'creditIndex' => '5',
                'correctedCreditIndex' => '5',
                'registeredCredit' => '27',
                'passeedCredit' => '27',
                'completionRate' => '100',
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
                'courseType' => '',
                'credit' => 3,
                'notes' => '',
                'isGraded' => false,
                'grade' => 1,
                'midterms' => 0,
                'quizes' => 0,
                'assignments' => 0,
                'exams' => 0,
                'homeWorks' => 0,
                'bonusPoints' => 0,
                'sumScores' => 0,
                'maxScore' => 0,
                'coursePlacement' => '',
                'markConditions' => '',
                'scores' => '',
                'bonusExercise' => '',
                'mark' => '',
                'examType' => '',
                'readings' => '',
                'absences' => 0,
                'programingLanguage' => '',
                'coursePage' => '',
                'weeklyTimeConsumption' => 0,
                'pointsFor2' => 0,
                'pointsFor3' => 0,
                'pointsFor4' => 0,
                'pointsFor5' => 0,
                'isPercentage' => false,
                'semester_id' => $semester->id,
                'user_id' => $me->id
            ]);
    }
}
