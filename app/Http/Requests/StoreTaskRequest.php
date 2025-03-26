<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTaskRequest extends FormRequest
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
            'weight' => ['required', 'integer'],
            'type' => ['required', Rule::in(["midterm", "quiz", "assignment", "exam", "homework", "bonusPoint"])],
            'task_page' => ['required'],
            'university_id' => ['required'],
            'semester_id' => ['required'],
            'subject_id' => ['required'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'due_date' => $this->dueDate,
            'task_page' => $this->taskPage,
            'university_id' => $this->universityID,
            'semester_id' => $this->semesterID,
            'subject_id' => $this->subjectID
        ]);
    }

    protected function passedValidation(): void
    {
        $this->merge([
            'state' => 'inwork',
            'score' => 0
        ]);
    }
}
