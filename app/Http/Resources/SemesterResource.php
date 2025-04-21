<?php

namespace App\Http\Resources;

use App\Http\Controllers\SemesterController;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SemesterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        $SemesterController = app(SemesterController::class);
        $SemesterController->semesterStatisticUpdate($this);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'average' => $this->average,
            'weightedAverage' => $this->weighted_average,
            'creditIndex' => $this->credit_index,
            'correctedCreditIndex' => $this->corrected_credit_index,
            'registeredCredit' => $this->registered_credit,
            'passedCredit' => $this->passed_credit,
            'completionRate' => $this->completion_rate,
            'universityID' => $this->university_id,
            'userID' => $this->user_id
        ];
    }
}
