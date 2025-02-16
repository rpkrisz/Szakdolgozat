<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
        'semester',
        'notes',
        'isGraded',
        'grade',
        'score_id',
        'details_id',
        'semester_id',
        'user_id',
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
            'semester' => 'integer',
            'isGraded' => 'boolrean',
            'grade' => 'integer',
            'score_id' => 'integer',
            'details_id' => 'integer',
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

    public function subjectdetail(): BelongsTo
    {
        return $this->belongsTo(Subjectdetail::class);
    }

    public function subjectscore(): BelongsTo
    {
        return $this->belongsTo(Subjectscore::class);
    }
}
