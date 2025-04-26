<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            'dueDate' => $this->due_date,
            'weight' => $this->weight,
            'type' => $this->type,
            'taskPage' => $this->task_page,
            'description' => $this->description,
            'stage' => $this->stage,
            'score' => $this->score,
            'universityID' => $this->university_id,
            "semesterID" => $this->semester_id,
            'subjectID' => $this->subject_id
        ];
    }
}
