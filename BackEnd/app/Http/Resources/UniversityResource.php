<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UniversityResource extends JsonResource
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
            'name' => $this->name,
            'nickName' => $this->nick_name,
            'faculty' => $this->faculty,
            'major' => $this->major,
            'degreeLevel' => $this->degree_level,
            'semestersCount' => $this->semesters_count,
            'currSemester' => $this->curr_semester,
            'currSemesterID' => $this->curr_semesterID,
            'currSemFstDay' => $this->curr_semester_fst_day,
            'specialisation' => $this->specialisation,
            'userID' => $this->user_id,
        ];
    }
}
