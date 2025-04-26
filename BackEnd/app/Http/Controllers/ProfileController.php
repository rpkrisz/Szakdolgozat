<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function index()
    {
        $user = Auth::user();

        $universities  = $user->universities()->get();

        $unidata = [];
        foreach ($universities as $uni) {
            $unidata[] = [
                'id' => $uni->id,
                'semester' => $uni->curr_semester,
                'semesterID' => $uni->curr_semesterID,
                'semesterStart' => $uni->curr_semester_fst_day
            ];
        }

        return response()->json([
            'succes' => true,
            'message' => 'User',
            'user' => new UserResource($user),
            'data' => $unidata,
        ]);
    }



    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return response()->json([
            'succes' => true,
            'message' => 'Succesful profile update',
            'user' => new UserResource($request->user()),
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully',
            'data' => new UserResource($user),
        ]);
    }
}
