<?php

namespace App\Http\Controllers;

use App\Models\Semester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SemesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */ 
    public function index()
    {
        $semesters = Auth::user()->semesters()->get();
        return response()->json($semesters);
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
    public function show(Semester $semester)
    {
        if (!$semester || Auth::id() != $semester->user_id) {
            abort(404);
        }

        $subjects = $semester->subjects()->get();

        return Inertia::render('Semester', ['semester' => $semester, 'subjects' => $subjects]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Semester $semester)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Semester $semester)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Semester $semester)
    {
        if (!$semester || Auth::id() != $semester->user_id) {
            abort(404);
        }

        $semester->delete();
        return redirect()->route('dashboard');
    }
}
