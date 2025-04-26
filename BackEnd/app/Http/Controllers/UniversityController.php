<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUniversityRequest;
use App\Http\Requests\UpdateUniversityRequest;
use App\Http\Resources\SemesterCollection;
use App\Http\Resources\SemesterResource;
use App\Http\Resources\SubjectCollection;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\UniversityCollection;
use App\Http\Resources\UniversityResource;
use App\Models\Semester;
use App\Models\University;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

use function Pest\Laravel\delete;

class UniversityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $universities = Auth::user()->universities()->get();

        return response()->json([
            'success' => true,
            'message' => 'Universities',
            'data' => new UniversityCollection($universities)
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
    public function store(StoreUniversityRequest $request)
    {

        $user = Auth::user();
        $university = new University($request->validated());
        $university->user()->associate($user);
        $university->curr_semesterID =  0;
        $university->save();

        $semesters = [];
        for ($i = 1; $i <= $university->semesters_count; $i++) {
            $name = "Semester" . " " . $i;

            $semester = new Semester([
                'name' => $name,
                'average' => 0,
                'weighted_average' => 0,
                'credit_index' => 0,
                'corrected_credit_index' => 0,
                'registered_credit' => 0,
                'passed_credit' => 0,
                'completion_rate' => 0,
                'university_id' => $university->id,
                'user_id' => $user->id,
            ]);

            $semester->university()->associate($university);
            $semester->user()->associate($user);

            $semester->save();
            $semesters[] = $semester;
        }

        $university->curr_semesterID =  $semesters[$university->curr_semester - 1]->id;
        $university->save();

        return response()->json([
            'success' => true,
            'message' => 'University created successfully',
            'data' => [
                "University" => new UniversityResource($university),
                "Semesters" => new SemesterCollection($semesters)
            ],
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(University $university)
    {

        if ($university->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'success' => true,
            'message' => 'University',
            'data' => new UniversityResource($university),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(University $university)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUniversityRequest $request, University $university)
    {

        if ($university->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $university->update($request->validated());

        $university->update([
            'curr_semesterID' =>  $university->semesters[$university->curr_semester - 1]->id
        ]);

        return response()->json([
            'success' => true,
            'message' => 'University updated successfully',
            'data' => new UniversityResource($university),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(University $university)
    {
        if ($university->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $university->delete();

        return response()->json([
            'success' => true,
            'message' => 'University deleted successfully',
            'data' => new UniversityResource($university),
        ]);
    }

    /**
     * Display a listing of the universities names.
     */
    public function getUniversitiesNames()
    {

        $universities = Auth::user()->universities()->get();

        $names = [];
        foreach ($universities as $university) {
            $names[] = [
                'id' => $university->id,
                'name' => $university->name,
                'nickName' => $university->nick_name
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'University names',
            'data' => $names
        ]);
    }

    /**
     * Display the specified university names.
     */
    public function getUniversityNamesById(string $id)
    {
        $university = Auth::user()->universities()->find($id);

        if (!$university || $university->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'success' => true,
            'message' => 'University names',
            'data' => [
                'id' => $university->id,
                'name' => $university->name,
                'nickName' => $university->nick_name
            ]
        ]);
    }

    public function getSemesters($id)
    {
        $university = Auth::user()->universities()->find($id);
        if (!$university) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "University's semesters",
            'data' => new SemesterCollection($university->semesters),
        ]);
    }

    public function getSubjects($id)
    {
        $university = Auth::user()->universities()->find($id);
        if (!$university) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "University's subjects",
            'data' => new SubjectCollection($university->subjects),
        ]);
    }

    public function getTasks($id)
    {
        $university = Auth::user()->semesters()->find($id);
        if (!$university) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        $tasks = $university->tasks->sortBy('due_date', 0);
        $TaskController = app(TaskController::class);

        return response()->json([
            'success' => true,
            'message' => "University's tasks",
            'data' => [$TaskController->maxTasksPerMonth($tasks), new TaskCollection($tasks)],
        ]);
    }
}
