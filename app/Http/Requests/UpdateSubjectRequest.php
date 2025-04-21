<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSubjectRequest extends FormRequest
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
      'name' => ['required', 'string'],
      'course_type' => ['required', 'string', Rule::in("Lecture", "Practice", "Lecture & Practice")],
      'credit' => ['required', 'integer'],
      'notes' => ['present'],
      'is_graded' => ['required', 'boolean'],
      'grade' => ['required', 'integer'],
      'max_score' => ['required', 'integer'],
      'course_placement' => ['required', 'string'],
      'mark_conditions' => ['required', 'string'],
      'scores' => ['required', 'string'],
      'bonus_exercise' => ['required', 'string'],
      'mark' => ['required', 'string'],
      'exam_type' => ['required', 'string'],
      'readings' => ['required', 'string'],
      'absences' => ['required', 'integer'],
      'programing_language' => ['required', 'string'],
      'course_page' => ['required', 'string', 'url'],
      'weekly_time_consumption' => ['required', 'integer'],
      'points_for_2' => ['required', 'integer'],
      'points_for_3' => ['required', 'integer'],
      'points_for_4' => ['required', 'integer'],
      'points_for_5' => ['required', 'integer'],
      'is_percentage' => ['required', "boolean"],
    ];
  }


  protected function prepareForValidation()
  {
    $this->merge([
      "course_type" => $this->courseType,
      "is_graded" => $this->isGraded,
      "max_score" => $this->maxScore,
      "course_placement" => $this->coursePlacement,
      "mark_conditions" => $this->markConditions,
      "bonus_exercise" => $this->bonusExercise,
      "exam_type" => $this->examType,
      "programing_language" => $this->programingLanguage,
      "course_page" => $this->coursePage,
      "weekly_time_consumption" => $this->weeklyTimeConsumption,
      "points_for_2" => $this->pointsFor2,
      "points_for_3" => $this->pointsFor3,
      "points_for_4" => $this->pointsFor4,
      "points_for_5" => $this->pointsFor5,
      "is_percentage" => $this->isPercentage,
    ]);
  }
}
