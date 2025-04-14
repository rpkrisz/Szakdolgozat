<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return             [
            'email' => ['required', 'email', 'unique:users'],
            'first_name' => ['required'],
            'last_name' => ['required'],
            'nick_name' => ['present'],
            'password' => ['required', 'same:password_confirmation']
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'first_name' => $this->firstName,
            'last_name' => $this->lastName,
            'nick_name' => $this->nickName,
            'password_confirmation' => $this->passwordConfirmation,
        ]);
    }

    protected function passedValidation()
    {
        $this->merge([
            'bcrypted_password' => bcrypt($this->password)
        ]);
    }
}
