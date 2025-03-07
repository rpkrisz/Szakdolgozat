<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Auth::user()->tasks()->get();
        return response()->json($tasks);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if (!$task || Auth::id() != $task->user_id) {
            abort(404);
        }
        return response()->json(['task' => $task]);
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
        $validated = $request->validate([
            'name' => 'required|string',
            'dueDate' => 'required|string',
            'weight' => 'required|integer',
            'type' => 'required|string',
            'taskPage' => 'required|string',
            'state' => 'required|string',
            'score' => 'required|integer|min:0',
        ]);

        if (!$task || Auth::id() != $task->user_id) {
            abort(404);
        }

        $task->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if (!$task || Auth::id() != $task->user_id) {
            abort(404);
        }

        $task->delete();

        return redirect()->route('dashboard');
    }
}
