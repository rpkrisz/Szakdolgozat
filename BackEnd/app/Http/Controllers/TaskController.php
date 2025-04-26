<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\SemesterResource;
use App\Http\Resources\SubjectResource;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UniversityResource;
use App\Models\Task;
use DateTime;
use DateTimeImmutable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Stringable;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Auth::user()->tasks()->orderby('due_date', 'asc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Tasks',
            'data' => [$this->maxTasksPerMonth($tasks), new TaskCollection($tasks)],
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
        $semester = $user->semesters()->find($request->semester_id);
        $university = $user->universities()->find($request->university_id);

        if (!$subject || !$semester || !$university) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. An id does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $task = new Task($request->validated());

        $task->subject()->associate($subject);
        $task->semester()->associate($semester);
        $task->university()->associate($university);
        $task->user()->associate($user);

        $task->save();

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

    public function getTaskNames()
    {

        $tasks = Auth::user()->tasks()->get();

        $names = [];
        foreach ($tasks as $task) {
            $names[] = [
                'id' => $task->id,
                'name' => $task->name,
                'universityID' => $task->university_id,
                'semesterID' => $task->semester_id,
                'subjectID' => $task->subject_id,
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Task names',
            'data' => $names
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

    public function getUrgentTasks()
    {

        $tasks = Auth::user()->tasks()
            ->where('due_date', '>=', new DateTime())
            ->where('due_date', '<=', new DateTime('+2 week'))
            ->orderby('due_date', 'asc')
            ->get();

        $nearTasks = $tasks->whereNotIn(
            'type',
            ['exam', 'midterm', 'assignment']
        );

        $bigTasks = $tasks->whereIn(
            'type',
            ['exam', 'midterm', 'assignment']
        );



        return response()->json([
            'success' => true,
            'message' => 'Tasks',
            'data' => [$this->countTasksPerMonth($tasks), new TaskCollection($nearTasks), new TaskCollection($bigTasks)],
        ]);
    }


    private function countTasksPerMonth($tasks)
    {
        $tasksPerMonth = [
            "01" => 0,
            "02" => 0,
            "03" => 0,
            "04" => 0,
            "05" => 0,
            "06" => 0,
            "07" => 0,
            "08" => 0,
            "09" => 0,
            "10" => 0,
            "11" => 0,
            "12" => 0,
        ];

        foreach ($tasks as  $task) {
            $date = new DateTimeImmutable($task->due_date);
            $month = $date->format('m');
            $tasksPerMonth[$month] = $tasksPerMonth[$month]  + 1;
        }
        return $tasksPerMonth;
    }


    public function maxTasksPerMonth($tasks)
    {

        $maxTasksPerMonth = [
            "01" => 0,
            "02" => 0,
            "03" => 0,
            "04" => 0,
            "05" => 0,
            "06" => 0,
            "07" => 0,
            "08" => 0,
            "09" => 0,
            "10" => 0,
            "11" => 0,
            "12" => 0,
        ];

        if (is_null($tasks)) return $maxTasksPerMonth;

        $taskgroups = [];

        foreach ($tasks as $task) {
            $taskgroups[$task->subject_id][] = $task;
        }

        foreach ($taskgroups as $group) {
            $newCounts = $this->countTasksPerMonth($group);
            foreach ($newCounts as $month => $value) {
                if ($maxTasksPerMonth[$month] < $value) {
                    $maxTasksPerMonth[$month] = $value;
                }
            }
        }

        return $maxTasksPerMonth;
    }
}
