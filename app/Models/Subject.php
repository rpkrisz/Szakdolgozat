<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Subject extends Model
{
    /** @use HasFactory<\Database\Factories\SubjectFactory> */
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable =  [
        'name',
        'courseType',
        'credit',
        'notes',
        'isGraded',
        'grade',
        'midterms',
        'quizes',
        'assignments',
        'exams',
        'homeWorks',
        'bonusPoints',
        'sumScores',
        'maxScore',
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
        'pointsFor2',
        'pointsFor3',
        'pointsFor4',
        'pointsFor5',
        'isPercentage',

    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [

            'credit' => 'integer',
            'isGraded' => 'boolean',
            'grade' => 'integer',

            'midterms' => 'integer',
            'quizes' => 'integer',
            'assignments' => 'integer',
            'exams' => 'integer',
            'homeWorks' => 'integer',
            'bonusPoints' => 'integer',
            'sumScores' => 'integer',
            'maxScore' => 'integer',

            'weeklyTimeConsumption' => 'integer',
            'maxPoint' => 'integer',
            'pointsFor2' => 'integer',
            'pointsFor3' => 'integer',
            'pointsFor4' => 'integer',
            'pointsFor5' => 'integer',
            'isPercentage' => 'boolean',
            'semester_id' => 'integer',
            'user_id' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    // public function subjectdetail(): HasOne
    // {
    //     return $this->hasOne(Subjectdetail::class);
    // }

    // public function subjectscore(): HasOne
    // {
    //     return $this->hasOne(Subjectscore::class);
    // }
}
