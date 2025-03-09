<?php

namespace App\Http\Controllers;

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
            'data' => $subjects
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

        $validatedData = $request->validate(
            [
                'name' => ['required'],
                'courseType' => ['required'],
                'credit' => ['required'],
                'notes' => ['required'],
                'isGraded' => ['required'],
                'grade' => ['required'],
                'maxScore' => ['required'],
                'coursePlacement' => ['required'],
                'markConditions' => ['required'],
                'scores' => ['required'],
                'bonusExercise' => ['required'],
                'mark' => ['required'],
                'examType' => ['required'],
                'readings' => ['required'],
                'absences' => ['required'],
                'programingLanguage' => ['required'],
                'coursePage' => ['required'],
                'weeklyTimeConsumption' => ['required'],
                'pointsFor2' => ['required'],
                'pointsFor3' => ['required'],
                'pointsFor4' => ['required'],
                'pointsFor5' => ['required'],
                'isPercentage' => ['required'],
                'semester_id' => ['required'],

            ]
        );


        $semester = Auth::user()->semesters()->find($validatedData['semester_id']);

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
            ->create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Subject created successfully',
            'data' => $subject,
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
            'data' => $subject,
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
    public function update(Request $request, Subject $subject)
    {
        if ($subject->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $validatedData = $request->validate(
            [
                'name' => ['required'],
                'courseType' => ['required'],
                'credit' => ['required'],
                'notes' => ['required'],
                'isGraded' => ['required'],
                'grade' => ['required'],
                'maxScore' => ['required'],
                'coursePlacement' => ['required'],
                'markConditions' => ['required'],
                'scores' => ['required'],
                'bonusExercise' => ['required'],
                'mark' => ['required'],
                'examType' => ['required'],
                'readings' => ['required'],
                'absences' => ['required'],
                'programingLanguage' => ['required'],
                'coursePage' => ['required'],
                'weeklyTimeConsumption' => ['required'],
                'pointsFor2' => ['required'],
                'pointsFor3' => ['required'],
                'pointsFor4' => ['required'],
                'pointsFor5' => ['required'],
                'isPercentage' => ['required'],
            ]
        );

        $subject->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Subject updated successfully',
            'data' => $subject,
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
            'data' => $semester,
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
            'data' => $tasks,
        ]);
    }
}
