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

class PersonalSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $SemesterController = app(SemesterController::class);
        $SubjectController = app(SubjectController::class);

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
        for ($i = 0; $i < $uni->curr_semester; $i++) {
            $name = "Semester" . " " . $i + 1;
            $semesters[$i] = Semester::factory()
                ->for($uni)
                ->for($me)
                ->create(['name' => $name, 'university_id' => $uni->id, 'user_id' => $me->id]);
        }

        $uni->update([
            'curr_semesterID' => $semesters[5]->id,
        ]);

        // foreach ($semesters as $semester) {
        //     $subjects = Subject::factory(5)
        //         ->for($uni)
        //         ->for($semester)
        //         ->for($me)
        //         ->create(['semester_id' => $semester->id, 'user_id' => $me->id]);

        //     foreach ($subjects as $subject) {
        //         Task::factory(2)
        //             ->for($uni)
        //             ->for($semester)
        //             ->for($subject)
        //             ->for($me)
        //             ->create(['subject_id' => $subject->id, 'user_id' => $me->id]);


        //         $SubjectController->calculateScores($subject);
        //         $grade = 1;
        //         if ($subject->is_graded) {
        //             foreach ([$subject->points_for_2, $subject->points_for_3, $subject->points_for_4, $subject->points_for_5] as $gradeLimit) {
        //                 if ($gradeLimit > ($subject->sum_scores /  $subject->max_score)) $grade = $grade + 1;
        //             }
        //         }
        //         $subject->update(['grade' => $grade]);
        //     }
        //     $SemesterController->semesterStatisticUpdate($semester);
        // }

        // $semester = Semester::factory()
        //     ->for($uni)
        //     ->for($me)
        //     ->create([
        //         'name' => "Semester 6",
        //         'average' => '5',
        //         'weighted_average' => '5',
        //         'credit_index' => '5',
        //         'corrected_credit_index' => '5',
        //         'registered_credit' => '27',
        //         'passed_credit' => '27',
        //         'completion_rate' => '100',
        //         'university_id' => $uni->id,
        //         'user_id' => $me->id
        //     ]);

        // $uni->update([
        //     'curr_semesterID' => $semester->id,
        // ]);



        // Subject::factory()
        //     ->for($uni)
        //     ->for($semester)
        //     ->for($me)
        //     ->create([
        //         "name" => "Nummod EA",
        //         "credit" => 2,
        //         "course_type" => "Practice",
        //         "weekly_time_consumption" => 90,
        //         "is_graded" => false,
        //         "is_percentage" => false
        //     ]);

        // Subject::factory()
        //     ->for($uni)
        //     ->for($semester)
        //     ->for($me)
        //     ->create([
        //         "name" => "Nummod GY",
        //         "credit" => 3,
        //         "course_type" => "Practice",
        //         "weekly_time_consumption" => 90,
        //         "is_graded" => false,
        //         "is_percentage" => false
        //     ]);

        // Subject::factory()
        //     ->for($uni)
        //     ->for($semester)
        //     ->for($me)
        //     ->create([
        //         "name" => "SzámElm II",
        //         "credit" => 2,
        //         "course_type" => "Practice",
        //         "weekly_time_consumption" => 10,
        //         "is_graded" => false,
        //         "is_percentage" => false
        //     ]);

        // Subject::factory()
        //     ->for($uni)
        //     ->for($semester)
        //     ->for($me)
        //     ->create([
        //         "name" => "Szakdolgozat",
        //         "credit" => 20,
        //         "course_type" => "Practice",
        //         "weekly_time_consumption" => 180,
        //         "is_graded" => false,
        //         'max_score' => 30,
        //         'points_for_2' => 15,
        //         'points_for_3' => 19,
        //         'points_for_4' => 23,
        //         'points_for_5' => 27,
        //         "is_percentage" => false
        //     ]);

        // foreach ($semester->subjects as $subject) {
        //     $SubjectController->calculateScores($subject);
        //     $grade = 1;
        //     if ($subject->is_graded) {
        //         foreach ([$subject->points_for_2, $subject->points_for_3, $subject->points_for_4, $subject->points_for_5] as $gradeLimit) {
        //             if ($gradeLimit > ($subject->sum_scores /  $subject->max_score)) $grade = $grade + 1;
        //         }
        //     }
        //     $subject->update(["grade" => $grade]);
        // }

        // $SemesterController->semesterStatisticUpdate($semester);

        $semester = Semester::factory()
            ->for($uni)
            ->for($me)
            ->create([
                'name' => "Kreditelismerés",
                'average' => '5',
                'weighted_average' => '5',
                'credit_index' => '5',
                'corrected_credit_index' => '5',
                'registered_credit' => '9',
                'passed_credit' => '9',
                'completion_rate' => '100',
                'university_id' => $uni->id,
                'user_id' => $me->id
            ]);



        $subjects = [
            ['sub' => ['name' => 'A számításelmélet alapjai II. Ea', 'credit' => 2, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 6],
            ['sub' => ['name' => 'Numerikus módszerek Ea', 'credit' => 2, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 6],
            ['sub' => ['name' => 'Numerikus módszerek Gy', 'credit' => 3, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 6],
            ['sub' => ['name' => 'Szakdolgozati konzultáció (Proginf BSc 2018)', 'credit' => 20, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 6],
            ['sub' => ['name' => 'A számításelmélet alapjai II. Ea', 'credit' => 2, 'grade' => 1, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'A számításelmélet alapjai II. Gy', 'credit' => 3, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'Adatbázisok II. Ea', 'credit' => 2, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'Adatbázisok II. Gy', 'credit' => 3, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'Big Data architektúrák és elemző módszerek Ea', 'credit' => 2, 'grade' => 1, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'Big Data architektúrák és elemző módszerek Gy', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'Full stack webprogramozás Gy', 'credit' => 3, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'Mesterséges intelligencia Ea', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'Telekommunikációs hálózatok Ea', 'credit' => 2, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 5],
            ['sub' => ['name' => 'A számításelmélet alapjai I. Ea', 'credit' => 2, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'A számításelmélet alapjai I. Gy', 'credit' => 3, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Adatbázisok I. Ea', 'credit' => 2, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Adatbázisok I. Gy', 'credit' => 2, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Analízis II. Ea (F)', 'credit' => 2, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Analízis II. Gy (F)', 'credit' => 3, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Kliensoldali webprogramozás Ea+Gy', 'credit' => 4, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Konkurens programozás Ea+Gy', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Operációs rendszerek Ea+Gy', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Python', 'credit' => 5, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Szerveroldali webprogramozás Ea+Gy', 'credit' => 4, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Szoftvertechnológia Ea+GY (F)', 'credit' => 5, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Telekommunikációs hálózatok Ea', 'credit' => 2, 'grade' => 1, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Telekommunikációs hálózatok Gy', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 4],
            ['sub' => ['name' => 'Algoritmusok és adatszerkezetek II. Ea', 'credit' => 2, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Algoritmusok és adatszerkezetek II Gy', 'credit' => 3, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Analízis I. Ea', 'credit' => 2, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Diszkrét modellek alkalmazásai Gy', 'credit' => 3, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Logika Ea', 'credit' => 2, 'grade' => 1, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Logika Gy', 'credit' => 3, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Programozáselmélet Ea', 'credit' => 2, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Programozáselmélet Gy', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Programozási nyelvek Ea+Gy', 'credit' => 6, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Programozási technológia Ea+Gy', 'credit' => 5, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Webprogramozás Ea+Gy', 'credit' => 4, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 3],
            ['sub' => ['name' => 'Algoritmusok és adatszerkezetek I. Ea', 'credit' => 2, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Algoritmusok és adatszerkezetek I Gy', 'credit' => 3, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Analízis I. Ea', 'credit' => 2, 'grade' => 1, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Analízis I. Gy', 'credit' => 3, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Diszkrét matematika I Ea', 'credit' => 2, 'grade' => 2, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Diszkrét matematika I. Gy', 'credit' => 3, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Imperatív programozás EA+GY', 'credit' => 5, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Objektumelvű programozás Ea+Gy', 'credit' => 6, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Web-fejlesztés Ea+Gy', 'credit' => 3, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 2],
            ['sub' => ['name' => 'Egyetemi alapozó és tanulásmódszertani kurzus', 'credit' => 1, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 1],
            ['sub' => ['name' => 'Funkcionális programozás EA+GY', 'credit' => 5, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 1],
            ['sub' => ['name' => 'Imperatív programozás EA+GY', 'credit' => 5, 'grade' => 1, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 1],
            ['sub' => ['name' => 'Jogi ismeretek Ea', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 1],
            ['sub' => ['name' => 'Matematikai alapok GY.', 'credit' => 4, 'grade' => 3, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 1],
            ['sub' => ['name' => 'Programozás EA+GY', 'credit' => 6, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 1],
            ['sub' => ['name' => 'Számítógépes rendszerek EA+GY', 'credit' => 5, 'grade' => 4, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 1],
            ['sub' => ['name' => 'Szabadon választható tárgy', 'credit' => 4, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 7],
            ['sub' => ['name' => 'Valószínűségszámítás és statisztika Gy (F)', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 7],
            ['sub' => ['name' => 'Innovatív vállalkozás menedzsment EA+GY', 'credit' => 3, 'grade' => 5, 'course_type' => 'Lecture & Practice', 'weekly_time_consumption' => 90, 'is_graded' => true, 'is_percentage' => false], 'semm' => 7],
        ];




        foreach ($subjects as $sub) {

            $semester = Semester::find($sub['semm']);
            $subject = new Subject($sub['sub']);
            $subject->semester()->associate($semester);
            $subject->university()->associate($uni);
            $subject->user()->associate($me);

            $subject->save();
        }



        // $tasks = [
        //     ['weight' => 100, 'type' => 'assignment', 'name' => 'Backend Konzi', 'due_date' => '2025-03-05', 'stage' => 'done'],
        //     ['weight' => 100, 'type' => 'assignment', 'name' => 'Konzi', 'due_date' => '2025-03-19', 'stage' => 'done'],
        //     ['weight' => 100, 'type' => 'assignment', 'name' => 'Frontend Konzi', 'due_date' => '2025-04-09', 'stage' => 'done'],
        //     ['weight' => 100, 'type' => 'assignment', 'name' => 'Dokumentáció Konzi', 'due_date' => '2025-04-25', 'stage' => 'done'],
        //     ['weight' => 100, 'type' => 'assignment', 'name' => 'Leadás', 'due_date' => '2025-05-01', 'stage' => 'graded'],
        //     ['weight' => 100, 'type' => 'assignment', 'name' => 'Védés', 'due_date' => '2025-06-30', 'stage' => 'inprogress'],
        // ];


        // foreach ($tasks as $task) {

        //     $semester = Semester::find(6);
        //     $subject = Subject::find(4);
        //     $newTask = new Task($task);
        //     $newTask->semester()->associate($semester);
        //     $newTask->university()->associate($uni);
        //     $newTask->user()->associate($me);
        //     $newTask->subject()->associate($subject);

        //     $newTask->save();
        // }
    }
}
