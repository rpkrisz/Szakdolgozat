<?php

namespace App\Http\Controllers;

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
            'data' => $tasks
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
                'dueDate' => ['required'],
                'weight' => ['required'],
                'type' => ['required'],
                'taskPage' => ['required'],
                'subject_id' => ['required'],
            ]
        );


        $user = Auth::user();
        $subject = $user->subjects()->find($validatedData["subject_id"]);

        if (!$subject) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Subject does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $validatedData["score"] = 0;
        $validatedData["state"] = "inwork";

        $task = Task::factory()
            ->for($subject)
            ->for($user)
            ->create($validatedData);


        return response()->json([
            'success' => true,
            'message' => 'Task created successfully',
            'data' => $task,
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
            'data' => $task,
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
    public function update(Request $request, Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Task does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $validated = $request->validate([
            'name' => 'required|string',
            'dueDate' => 'required|string',
            'weight' => 'required|integer',
            'type' => 'required|string',
            'taskPage' => 'required|string',
            'state' => 'required|string',
            'score' => 'required|integer|min:0',
        ]);

        $task->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully',
            'data' => $task,
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
        $subject = $task->subject()->get();

        return response()->json([
            'success' => true,
            'message' => "Task's subject",
            'data' => $subject,
        ]);
    }
}
