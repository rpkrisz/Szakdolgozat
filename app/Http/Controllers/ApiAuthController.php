<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ApiAuthController extends Controller
{
    public function register(RegisterRequest $request)
    {

        $validatedData = $request->validationData();

        // create new user
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'nick_name' => $validatedData['nick_name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['bcrypted_password']
        ]);

        // login to the new profile
        if (Auth::attempt([
            'email' => $validatedData['email'],
            'password' => $validatedData['password']
        ])) {
            $user = Auth::user();
            $token = $user->createToken('API_Token')->plainTextToken;
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
                'message' => 'Succesfull registration',
                'token' => $token,
                'user' => new UserResource($user),
                'data' => $unidata,
            ]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt([
            'email' => $request->email,
            'password' => $request->password
        ])) {
            $user = Auth::user();
            $token = $user->createToken('API_Token')->plainTextToken;
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
                'message' => 'Succesful login',
                'token' => $token,
                'user' => new UserResource($user),
                'data' => $unidata,
            ]);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'succes' => true,
            'message' => 'Succesful log off'
        ]);
    }
}
