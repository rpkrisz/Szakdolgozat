<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTaskRequest extends FormRequest
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
            'due_date' => ['required'],
            'weight' => ['required'],
            'type' => ['required', Rule::in(["midterm", "quiz", "assignment", "exam", "homework", "bonusPoint"])],
            'task_page' => ['present', 'nullable'],
            'description' => ['present',  'max:250'],
            'stage' => ['required', 'string', Rule::in(["inprogress", "done", "graded", "faild"])],
            'score' => ['present', 'numeric', 'min:0'],
        ];
    }



    protected function prepareForValidation()
    {
        $this->merge([
            'due_date' => $this->dueDate,
            'task_page' => $this->taskPage,
        ]);
    }
}
