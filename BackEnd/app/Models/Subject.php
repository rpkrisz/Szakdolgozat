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
        // subject //
        'name',
        'course_type',
        'credit',
        'notes',
        'is_graded',
        'grade',

        // scores //
        'midterm_score',
        'quiz_score',
        'assignment_score',
        'exam_score',
        'homework_score',
        'bonus_point_score',
        'sum_scores',

        // details //
        'max_score',
        'course_placement',
        'mark_conditions',
        'scores',
        'bonus_exercise',
        'mark',
        'exam_type',
        'readings',
        'absences',
        'programing_language',
        'course_page',
        'weekly_time_consumption',
        'points_for_2',
        'points_for_3',
        'points_for_4',
        'points_for_5',
        'is_percentage',

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
            'is_graded' => 'boolean',
            'grade' => 'integer',

            // scores //
            'midterm_score' => 'float',
            'quiz_score' => 'float',
            'assignment_score' => 'float',
            'exam_score' => 'float',
            'homework_score' => 'float',
            'bonus_point_score' => 'float',
            'sum_scores' => 'float',
            'max_score' => 'float',

            // details //
            'weekly_time_consumption' => 'integer',
            'maxPoint' => 'integer',
            'points_for_2' => 'integer',
            'points_for_3' => 'integer',
            'points_for_4' => 'integer',
            'points_for_5' => 'integer',
            'is_percentage' => 'boolean',
            'semester_id' => 'integer',
            'university_id' => 'integer',
            'user_id' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function university(): BelongsTo
    {
        return $this->belongsTo(University::class);
    }

    public function semester(): BelongsTo
    {
        return $this->belongsTo(Semester::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
