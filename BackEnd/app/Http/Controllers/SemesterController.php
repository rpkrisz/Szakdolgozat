<?php

namespace App\Http\Controllers;

use App\Http\Resources\SemesterCollection;
use App\Http\Resources\SemesterResource;
use App\Http\Resources\SubjectCollection;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\UniversityResource;
use App\Models\Semester;
use App\Models\Subject;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $semesters = Auth::user()->semesters()->get();

        return response()->json([
            'success' => true,
            'message' => 'Semesters',
            'data' => new SemesterCollection($semesters)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        return response()->json([
            'success' => false,
            'message' => 'Semester development'
        ], Response::HTTP_NOT_IMPLEMENTED);
    }

    /**
     * Display the specified resource.
     */
    public function show(Semester $semester)
    {
        if ($semester->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Semester does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'success' => true,
            'message' => 'Semester',
            'data' => new SemesterResource($semester),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Semester $semester)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Semester $semester)
    {

        // $old = unserialize(serialize($semester));

        return response()->json([
            'success' => true,
            'message' => 'Semester updated successfully',
            'data' => new SemesterResource($semester),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Semester $semester)
    {
        if ($semester->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Semester does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $semester->delete();

        return response()->json([
            'success' => true,
            'message' => 'Semester deleted successfully',
            'data' => new SemesterResource($semester),
        ]);
    }

    public function getSemesterNames()
    {

        $semesters = Auth::user()->semesters()->get();

        $names = [];
        foreach ($semesters as $semester) {
            $names[] = [
                'id' => $semester->id,
                'name' => $semester->name,
                'universityID' => $semester->university_id,
            ];
        }
        sort($names);

        return response()->json([
            'success' => true,
            'message' => 'Semesters name',
            'data' => $names
        ]);
    }

    public function getUniversity($id)
    {
        $semester = Auth::user()->semesters()->find($id);
        if (!$semester) {
            return response()->json([
                'success' => false,
                'message' => "Semester university",
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "Semester university",
            'data' => new UniversityResource($semester->university),
        ]);
    }

    public function getSubjects($id)
    {
        $semester = Auth::user()->semesters()->find($id);
        if (!$semester) {
            return response()->json([
                'success' => false,
                'message' => "Semester's subjects",
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "Semester's subjects",
            'data' => new SubjectCollection($semester->subjects),
        ]);
    }

    public function getTasks($id)
    {
        $semester = Auth::user()->semesters()->find($id);
        if (!$semester) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Semester does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $tasks = $semester->tasks->sortBy('due_date', 0);
        $TaskController = app(TaskController::class);

        return response()->json([
            'success' => true,
            'message' => "Semester's tasks",
            'data' => [$TaskController->maxTasksPerMonth($tasks), new TaskCollection($tasks)],
        ]);
    }

    public function semesterStatisticUpdate($semester)
    {
        $semesterSubjects = $semester->subjects()->get();

        $semester->average =  round($this->getAVG($semesterSubjects), 2);
        $semester->weighted_average =  round($this->getWAVG($semesterSubjects), 2);
        $semester->credit_index =  round($this->getCI($semesterSubjects), 2);
        $semester->corrected_credit_index =  round($this->getCCI($semesterSubjects), 2);


        $semester->registered_credit =  $this->sumCredits($semesterSubjects);
        $semester->passed_credit = $this->getPassedCredits($semesterSubjects);
        $semester->completion_rate = round($this->getCompletionRate($semester)  * 100, 2);


        $newSemester = [
            "average" =>  round($this->getAVG($semesterSubjects), 2),
            "weighted_average" =>  round($this->getWAVG($semesterSubjects), 2),
            "credit_index" =>  round($this->getCI($semesterSubjects), 2),
            "corrected_credit_index" =>  round($this->getCCI($semesterSubjects), 2),
            "registered_credit" =>  $this->sumCredits($semesterSubjects),
            "passed_credit" => $this->getPassedCredits($semesterSubjects),
            "completion_rate" => round($this->getCompletionRate($semester)  * 100, 2),
        ];

        $semester->update($newSemester);
    }

    private function sumCredits($subjects)
    {
        $sum = 0;
        foreach ($subjects as $subject) {
            $sum += $subject->credit;
        }
        return $sum;
    }

    private function sumOfWeightedCredits($subjects)
    {
        $sum = 0;
        foreach ($subjects as $subject) {
            $sum += $subject->credit * $subject->grade;
        }
        return $sum;
    }

    private function getPassedSubjects($subjects)
    {
        return $subjects->where('grade', '>', 1);
    }

    public function getPassedCredits($subjects)
    {
        return $this->sumCredits($this->getPassedSubjects($subjects));
    }

    private function getCompletionRate($semester)
    {
        if ($semester->passed_credit == 0 || $semester->registered_credit == 0) return 0;
        return ($semester->passed_credit / $semester->registered_credit);
    }

    private function average($semesterSubjects, int $numOfSemesterSubjects)
    {
        if ($numOfSemesterSubjects == 0) return 0;

        $sumGrades = 0;
        foreach ($semesterSubjects as $subject) {
            $sumGrades += $subject->grade;
        }

        return  $sumGrades / $numOfSemesterSubjects;
    }

    public function getAVG($semesterSubjects)
    {
        $filteredSubjects = $this->getPassedSubjects($semesterSubjects);
        $numOfSemesterSubjects = $filteredSubjects->count();
        return round($this->average($filteredSubjects, $numOfSemesterSubjects), 2);
    }

    public function getWAVG($semesterSubjects)
    {
        $registered_credits = $this->sumCredits($semesterSubjects);
        $sumOfPassedWeightedCredits = $this->sumOfWeightedCredits($this->getPassedSubjects($semesterSubjects));
        if ($sumOfPassedWeightedCredits == 0 || $registered_credits == 0) return 0;

        return round($sumOfPassedWeightedCredits / $registered_credits, 2);
    }

    public function getCI($semesterSubjects)
    {
        $sumOfPassedWeightedCredits = $this->sumOfWeightedCredits($this->getPassedSubjects($semesterSubjects));
        if ($sumOfPassedWeightedCredits === 0) return 0;
        return round($sumOfPassedWeightedCredits / 30, 2);
    }

    public function getCCI($semesterSubjects)
    {
        $CI = $this->getCI($semesterSubjects);
        $passedCredits = $this->getPassedCredits($this->getPassedSubjects($semesterSubjects));
        $registered_credits = $this->sumCredits($semesterSubjects);
        if ($passedCredits === 0 || $CI === 0) return 0;
        return round(($CI * $passedCredits) / $registered_credits, 2);
    }
}
