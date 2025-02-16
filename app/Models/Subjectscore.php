<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subjectscore extends Model
{
    /** @use HasFactory<\Database\Factories\SubjectscoreFactory> */
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable =  [
        'midterms',
        'quizes',
        'assignments',
        'exams',
        'homeWorks',
        'bonusPoints',
        'sumScores',
        'maxScore',
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
            'midterms' => 'integer',
            'quizes' => 'integer',
            'assignments' => 'integer',
            'exams' => 'integer',
            'homeWorks' => 'integer',
            'bonusPoints' => 'integer',
            'sumScores' => 'integer',
            'maxScore' => 'integer',
        ];
    }

    // public function subject(): BelongsTo
    // {
    //     return $this->belongsTo(Subject::class);
    // }

}
