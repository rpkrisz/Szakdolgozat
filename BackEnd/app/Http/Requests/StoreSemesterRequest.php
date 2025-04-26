<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSemesterRequest extends FormRequest
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

    protected function passedValidation(): void
    {
        $this->merge([
            'name' => $this->name,
            'average' => $this->average,
            'weighted_average' => $this->weightedAverage,
            'credit_index' => $this->creditIndex,
            'corrected_credit_index' => $this->correctedCreditIndex,
            'registered_credit' => $this->registeredCredit,
            'passed_credit' => $this->passedCredit,
            'completion_rate' => $this->completionRate,
        ]);
    }
}
