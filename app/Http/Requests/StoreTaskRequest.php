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
            'weight' => ['present', 'integer'],
            'type' => ['required', Rule::in(["midterm", "quiz", "assignment", "exam", "homework", "bonusPoint"])],
            'task_page' => ['present'],
            'description' => ['present', 'max:250'],
            'university_id' => ['required'],
            'semester_id' => ['required'],
            'subject_id' => ['required'],
            'stage' => ['required', Rule::in(["inprogress"])],
            'score' => ['required', 'numeric'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'stage' => 'inprogress',
            'score' => 0,
            'due_date' => $this->dueDate,
            'task_page' => $this->taskPage,
            'university_id' => $this->universityID,
            'semester_id' => $this->semesterID,
            'subject_id' => $this->subjectID
        ]);
    }
}
