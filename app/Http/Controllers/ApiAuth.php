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
                'name' => ['required'],
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
            'name' => $validatedData['name'],
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

            return response()->json([
                'succes' => true,
                'message' => 'Sikeres regisztráció',
                'token' => $token,
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

            return response()->json([
                'succes' => true,
                'message' => 'Sikeres bejelentkezés',
                'token' => $token,
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
