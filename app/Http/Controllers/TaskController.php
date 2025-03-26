<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\SemesterResource;
use App\Http\Resources\SubjectResource;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UniversityResource;
use App\Models\Subject;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Auth::user()->tasks()->get();

        return response()->json([
            'success' => true,
            'message' => 'Tasks',
            'data' => new TaskCollection($tasks),
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
    public function store(StoreTaskRequest $request)
    {


        $user = Auth::user();
        $subject = $user->subjects()->find($request->subject_id);

        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Subject does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $task = Task::factory()
            ->for($subject)
            ->for($user)
            ->create($request->validated());


        return response()->json([
            'success' => true,
            'message' => 'Task created successfully',
            'data' => new TaskResource($task),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Task does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        return response()->json([
            'success' => true,
            'message' => 'Task',
            'data' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Task does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $task->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully',
            'data' => new TaskResource($task),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Task does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $task->delete();

        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully',
            'data' => new TaskResource($task),
        ]);
    }

    public function getUniversity($id)
    {
        $task = Auth::user()->tasks()->find($id);
        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Task does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "Task university",
            'data' => new UniversityResource($task->university),
        ]);
    }

    public function getSemester($id)
    {
        $task = Auth::user()->tasks()->find($id);
        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Task does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "Task's semester",
            'data' => new SemesterResource($task->semester),
        ]);
    }

    public function getSubject($id)
    {
        $task = Auth::user()->tasks()->find($id);
        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Task does not belong to the authenticated user.',
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'success' => true,
            'message' => "Task's subject",
            'data' => new SubjectResource($task->subject),
        ]);
    }
}
