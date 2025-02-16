<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subjectdetail extends Model
{
    /** @use HasFactory<\Database\Factories\SubjectdetailFactory> */
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable =  [
        'coursePlacement',
        'markConditions',
        'scores',
        'bonusExercise',
        'mark',
        'examType',
        'readings',
        'absences',
        'programingLanguage',
        'coursePage',
        'weeklyTimeConsumption',
        'maxPoint',
        'pointsFor2',
        'pointsFor3',
        'pointsFor4',
        'pointsFor5',
        'isPercentage',
        'subject_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [

            'weeklyTimeConsumption' => 'integer',
            'maxPoint' => 'integer',
            'pointsFor2' => 'integer',
            'pointsFor3' => 'integer',
            'pointsFor4' => 'integer',
            'pointsFor5' => 'integer',
            'isPercentage' => 'boolean',
            'subject_id' => 'integer',

        ];
    }

    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }
}
