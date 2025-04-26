<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSubjectRequest extends FormRequest
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
      'notes' => ['string', 'nullable'],
      'is_graded' => ['required', 'boolean'],
      'grade' => ['integer'],
      'max_score' => ['integer', 'nullable'],
      'course_placement' => ['string', 'nullable'],
      'mark_conditions' => ['string', 'nullable'],
      'scores' => ['string', 'nullable'],
      'bonus_exercise' => ['string', 'nullable'],
      'mark' => ['string', 'nullable'],
      'exam_type' => ['string', 'nullable'],
      'readings' => ['string', 'nullable'],
      'absences' => ['integer', 'nullable'],
      'programing_language' => ['string', 'nullable'],
      'course_page' => ['string', 'url', 'nullable'],
      'weekly_time_consumption' => ['integer', 'nullable'],
      'points_for_2' => ['integer', 'nullable'],
      'points_for_3' => ['integer', 'nullable'],
      'points_for_4' => ['integer', 'nullable'],
      'points_for_5' => ['integer', 'nullable'],
      'is_percentage' => ["boolean"],
      'semester_id' => ['required'],
      'university_id' => ['required'],
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
      "semester_id" => $this->semesterID,
      "university_id" => $this->universityID,
    ]);
  }
}
