<?php

use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UniversityController;
use App\Models\Task;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Test
Route::get('/', function () {
  return response()->json([
    "message" =>
    "Hello, this the Task Manager API!"
  ]);
});

Route::post('/register', [ApiAuthController::class, 'register']);
Route::post('/login', [ApiAuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->delete('/logout', [ApiAuthController::class, 'logout']);




Route::resource('users', ProfileController::class)->middleware(['auth:sanctum']);



Route::middleware(['auth:sanctum'])->group(
  function () {
    //User
    Route::put('profile/{id}', [ProfileController::class, 'update']);

    // Universities
    Route::get('universities/names', [UniversityController::class, 'getUniversitiesNames']);
    Route::get('universities/names/{id}', [UniversityController::class, 'getUniversityNamesById']);
    Route::get('universities/{id}/semesters', [UniversityController::class, 'getSemesters']);
    Route::get('universities/{id}/subjects', [UniversityController::class, 'getSubjects']);
    Route::get('universities/{id}/tasks', [UniversityController::class, 'getTasks']);

    // Semesters
    Route::get('semesters/names', [SemesterController::class, 'getSemesterNames']);
    Route::get('semesters/{id}/university', [SemesterController::class, 'getUniversity']);
    Route::get('semesters/{id}/subjects', [SemesterController::class, 'getSubjects']);
    Route::get('semesters/{id}/tasks', [SemesterController::class, 'getTasks']);

    // Subject
    Route::get('subjects/names', [SubjectController::class, 'getSubjectNames']);
    Route::get('subjects/{id}/university', [SubjectController::class, 'getUniversity']);
    Route::get('subjects/{id}/semester', [SubjectController::class, 'getSemester']);
    Route::get('subjects/{id}/tasks', [SubjectController::class, 'getTasks']);

    // Task
    Route::get('tasks/names', [TaskController::class, 'getTaskNames']);
    Route::get('tasks/{id}/university', [TaskController::class, 'getUniversity']);
    Route::get('tasks/{id}/semester', [TaskController::class, 'getSemester']);
    Route::get('tasks/{id}/subject', [TaskController::class, 'getSubject']);
    Route::get('tasks/urgent', [TaskController::class, 'getUrgentTasks']);
  }
);



Route::middleware(['auth:sanctum'])->group(
  function () {
    Route::resource('universities', UniversityController::class);
    Route::resource('semesters', SemesterController::class);
    Route::resource('subjects', SubjectController::class);
    Route::resource('tasks', TaskController::class);
  }
);
