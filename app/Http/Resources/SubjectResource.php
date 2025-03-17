<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            "name" => $this->name,
            "courseType" => $this->course_type,
            "credit" => $this->credit,
            "notes" => $this->notes,
            "isGraded" => $this->is_graded,
            "grade" => $this->grade,
            "midterms" => $this->midterms,
            "quizes" => $this->quizes,
            "assignments" => $this->assignments,
            "exams" => $this->exams,
            "homeWorks" => $this->homeworks,
            "bonusPoints" => $this->bonus_points,
            "sumScores" => $this->sum_scores,
            "maxScore" => $this->max_score,
            "coursePlacement" => $this->course_placement,
            "markConditions" => $this->mark_conditions,
            "scores" => $this->scores,
            "bonusExercise" => $this->bonus_exercise,
            "mark" => $this->mark,
            "examType" => $this->exam_type,
            "readings" => $this->readings,
            "absences" => $this->absences,
            "programingLanguage" => $this->programing_language,
            "coursePage" => $this->course_page,
            "weeklyTimeConsumption" => $this->weekly_time_consumption,
            "pointsFor2" => $this->points_for_2,
            "pointsFor3" => $this->points_for_3,
            "pointsFor4" => $this->points_for_4,
            "pointsFor5" => $this->points_for_5,
            "isPercentage" => $this->is_percentage,
            "semesterID" => $this->semester_id,
            "userID" => $this->user_id,
        ];
    }
}
