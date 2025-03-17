<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSemesterRequest extends FormRequest
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
            //
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'grade_point_average' => $this->gradePointAverage,
            'credit_index' => $this->creditIndex,
            'corrected_credit_index' => $this->correctedCreditIndex,
            'registered_credit' => $this->registeredCredit,
            'passeed_credit' => $this->passeedCredit,
            'completion_rate' => $this->completionRate,
        ]);
    }
}
