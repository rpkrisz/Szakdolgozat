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

        $semesters = Semester::factory($uni->currSemester - 1)
            ->for($uni)
            ->for($me)
            ->create(['university_id' => $uni->id, 'user_id' => $me->id]);

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
        
        // $subjects = Subject::factory()
        //     ->for($semester)
        //     ->for($me)
        //     ->create([
        //         'name' => '',
        //         'courseType' => '',
        //         'credit' => '',
        //         'notes' => '',
        //         'isGraded' => '',
        //         'grade' => '',
        //         'midterms' => '',
        //         'quizes' => '',
        //         'assignments' => '',
        //         'exams' => '',
        //         'homeWorks' => '',
        //         'bonusPoints' => '',
        //         'sumScores' => '',
        //         'maxScore' => '',
        //         'coursePlacement' => '',
        //         'markConditions' => '',
        //         'scores' => '',
        //         'bonusExercise' => '',
        //         'mark' => '',
        //         'examType' => '',
        //         'readings' => '',
        //         'absences' => '',
        //         'programingLanguage' => '',
        //         'coursePage' => '',
        //         'weeklyTimeConsumption' => '',
        //         'pointsFor2' => '',
        //         'pointsFor3' => '',
        //         'pointsFor4' => '',
        //         'pointsFor5' => '',
        //         'isPercentage' => '',
        //         'semester_id' => $semester->id,
        //         'user_id' => $me->id
        //     ]);
    }
}
