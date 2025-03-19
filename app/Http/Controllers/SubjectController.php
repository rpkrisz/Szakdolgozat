<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\SemesterResource;
use App\Http\Resources\SubjectCollection;
use App\Http\Resources\SubjectResource;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

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
        $semester = Auth::user()->semesters()->find($request->semester_id);

        if (!$semester) {
            return response()->json([
                'success' => false,
                'message' => 'Subject not created',
            ], Response::HTTP_BAD_REQUEST);
        }

        $user = Auth::user();

        $subject = Subject::factory()
            ->for($semester)
            ->for($user)
            ->create($request->validated());

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


    public function getSemester($id)
    {
        $subject = Auth::user()->subjects()->find($id);
        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Subject does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $semester = $subject->semester()->get();

        return response()->json([
            'success' => true,
            'message' => "Subject's semester",
            'data' => new SemesterResource($semester),
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

        $tasks = $subject->tasks()->get();

        return response()->json([
            'success' => true,
            'message' => "Subject's tasks",
            'data' => new TaskCollection($tasks),
        ]);
    }
}
