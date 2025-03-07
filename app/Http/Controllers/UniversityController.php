<?php

namespace App\Http\Controllers;

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
        return response()->json(["universities" => $universities]);
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
                'nickName' => ['required', 'min:2', 'max:5'],
                'faculty' => ['required'],
                'major' => ['required'],
                'degreeLevel' => ['required', Rule::in(['BA/BSc', 'MA/MSc'])],
                'semestersCount' => ['required', 'integer'],
                'currSemester' => ['required', 'integer'],
                'currSemFstDay' => ['required'],
                'specialisation' => ['required'],
            ]
        );

        $user = Auth::user();
        $university = University::factory()->for($user)->create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'University created successfully',
            'data' => $university,
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


        return response()->json(['university' => $university]);
        // return Inertia::render('University', ['university' => $university]);
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
    public function update(Request $request, University $university)
    {

        if ($university->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. University does not belong to the authenticated user.',
            ], Response::HTTP_FORBIDDEN);
        }

        $validatedData = $request->validate(
            [
                'name' => ['required'],
                'nickName' => ['required', 'min:2', 'max:5'],
                'faculty' => ['required'],
                'major' => ['required'],
                'degreeLevel' => ['required', Rule::in(['BA/BSc', 'MA/MSc'])],
                'semestersCount' => ['required', 'integer'],
                'currSemester' => ['required', 'integer'],
                'currSemFstDay' => ['required'],
                'specialisation' => ['required'],
            ]
        );

        $university->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'University updated successfully',
            'data' => $university,
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
        ], Response::HTTP_NO_CONTENT);
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
                'nickName' => $university->nickName
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
                'nickName' => $university->nickName
            ]
        ]);
    }
}
