<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ApiAuth extends Controller
{
    public function register(Request $request)
    {

        // validate formdata
        $validatedData = $request->validate(
            [
                'email' => ['required', 'email', 'unique:users'],
                'first_name' => ['required'],
                'last_name' => ['required'],
                'nick_name' => ['present'],
                'password' => ['required', 'same:password_confirmation']
            ],
            [
                'email.required' => 'Email cím megadása kötelező',
                'email.unique' => 'Ezzel az email címmel már létezik felhasználó',
                'email.email' => 'Érvénytelen email cím',
                'name.required' => 'Név megadása kötelező',
                'password.required' => 'Jelszó megadása kötelező',
                'password.same' => 'A jelszavak nem egyeznek'
            ]
        );

        // create new user
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'nick_name' => $validatedData['nick_name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password'])
        ]);

        // login to the new profile
        if (Auth::attempt([
            'email' => $validatedData['email'],
            'password' => $validatedData['password']
        ])) {
            $user = Auth::user();
            $token = $user->createToken('Bang_game API Token')->plainTextToken;
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
                'message' => 'Sikeres regisztráció',
                'token' => $token,
                'user' => $user,
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
                'message' => 'Sikeres bejelentkezés',
                'token' => $token,
                'user' => $user,
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
            'message' => 'Sikeres kijelentkezés'
        ]);
    }
}
