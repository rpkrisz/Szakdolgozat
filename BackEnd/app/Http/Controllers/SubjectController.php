<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\SemesterResource;
use App\Http\Resources\SubjectCollection;
use App\Http\Resources\SubjectResource;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\UniversityResource;
use App\Models\Subject;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\TaskController;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Auth::user()->subjects()->get();
        return response()->json([
            'success' => true,
            'message' => 'Subjects',
            'data' => new SubjectCollection($subjects),
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
    public function store(StoreSubjectRequest $request)
    {
        $user = Auth::user();

        $semester = Auth::user()->semesters()->find($request->semester_id);
        $university = $user->universities()->find($request->university_id);

        if (!$semester || !$university) {
            return response()->json([
                'success' => false,
                'message' => 'Subject not created',
            ], Response::HTTP_BAD_REQUEST);
        }

        $subject = new Subject($request->validated());

        $subject->semester()->associate($semester);
        $subject->university()->associate($university);
        $subject->user()->associate($user);

        $subject->save();

        return response()->json([
            'success' => true,
            'message' => 'Subject created successfully',
            'data' => new SubjectResource($subject),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subject $subject)
    {
        if ($subject->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Subject does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'success' => true,
            'message' => 'Subject',
            'data' => new SubjectResource($subject),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subject $subject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubjectRequest $request, Subject $subject)
    {
        if ($subject->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $subject->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Subject updated successfully',
            'data' => new SubjectResource($subject),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        if ($subject->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Subject does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $subject->delete();

        return response()->json([
            'success' => true,
            'message' => 'Subject deleted successfully',
            'data' => new SubjectResource($subject),
        ]);
    }

    public function getSubjectNames()
    {

        $subjects = Auth::user()->subjects()->get();

        $names = [];
        foreach ($subjects as $subject) {
            $names[] = [
                'id' => $subject->id,
                'name' => $subject->name,
                'universityID' => $subject->university_id,
                'semesterID' => $subject->semester_id,
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Subjects name',
            'data' => $names
        ]);
    }

    public function getUniversity($id)
    {
        $subject = Auth::user()->subjects()->find($id);
        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Subject does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "Semester university",
            'data' => new UniversityResource($subject->university),
        ]);
    }

    public function getSemester($id)
    {
        $subject = Auth::user()->subjects()->find($id);
        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Subject does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "Subject's semester",
            'data' => new SemesterResource($subject->semester),
        ]);
    }

    public function getTasks($id)
    {
        $subject = Auth::user()->subjects()->find($id);
        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Subject does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $tasks = $subject->tasks->sortBy('due_date', 0);
        $TaskController = app(TaskController::class);

        return response()->json([
            'success' => true,
            'message' => "Subject's tasks",
            'data' => [$TaskController->maxTasksPerMonth($tasks), new TaskCollection($tasks)],
        ]);
    }


    public function calculateScores($subject)
    {

        $scores = [
            'midterm_score' => 0,
            'quiz_score' => 0,
            'assignment_score' => 0,
            'exam_score' => 0,
            'homework_score' => 0,
            'bonus_point_score' => 0,
            'sum_scores' => 0,
        ];

        foreach ($subject->tasks as $task) {
            $score = round(($task->score * $task->weight) / 100, 2);
            $type = $task->type . '_score';
            $scores[$type] = $scores[$type] + $score;
            $scores['sum_scores'] = $scores['sum_scores'] + $score;
        }

        $subject->update($scores);
    }
}
