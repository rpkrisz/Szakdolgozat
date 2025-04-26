<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUniversityRequest extends FormRequest
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
        return [
            'name' => ['required'],
            'nick_name' => ['required', 'min:2', 'max:5'],
            'faculty' => ['required'],
            'major' => ['required'],
            'degree_level' => ['required', Rule::in(['BA/BSc', 'MA/MSc'])],
            'semesters_count' => ['required', 'integer'],
            'curr_semester' => ['required', 'integer'],
            'curr_semester_fst_day' => ['required'],
            'specialisation' => ['required'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'nick_name' => $this->nickName,
            'degree_level' => $this->degreeLevel,
            'semesters_count' => $this->semestersCount,
            'curr_semester' => $this->currSemester,
            'curr_semester_fst_day' => $this->currSemFstDay,
        ]);
    }
}
