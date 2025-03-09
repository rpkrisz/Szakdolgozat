<?php

use App\Http\Controllers\ApiAuth;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Controller;
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
    return "Hello, this the Task Manager API!";
});

Route::post('/register', [ApiAuth::class, 'register']);
Route::post('/login', [ApiAuth::class, 'login']);
Route::middleware(['auth:sanctum'])->delete('/logout', [ApiAuth::class, 'logout']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware(['auth:sanctum']);





Route::middleware(['auth:sanctum'])->group(
    function () {
        // Universities
        Route::get('universities/names', [UniversityController::class, 'getUniversitiesNames']);
        Route::get('universities/names/{id}', [UniversityController::class, 'getUniversityNamesById']);
        Route::get('universities/{id}/semesters', [UniversityController::class, 'getSemesters']);

        // Semesters
        Route::get('semesters/{id}/subjects', [SemesterController::class, 'getSubjects']);
        Route::get('semesters/{id}/university', [SemesterController::class, 'getUniversity']);

        // Subject
        Route::get('subjects/{id}/semester', [SubjectController::class, 'getSemester']);
        Route::get('subjects/{id}/tasks', [SubjectController::class, 'getTasks']);

        // Task
        Route::get('tasks/{id}/subject', [TaskController::class, 'getSubject']);
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
