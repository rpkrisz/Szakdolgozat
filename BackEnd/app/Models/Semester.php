<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semester extends Model
{
    /** @use HasFactory<\Database\Factories\SemesterFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable =  [
        'name',
        'average',
        'weighted_average',
        'credit_index',
        'corrected_credit_index',
        'registered_credit',
        'passed_credit',
        'completion_rate',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'average' => 'float',
            'weighted_average' => 'float',
            'credit_index' => 'float',
            'corrected_credit_index' => 'float',
            'registered_credit' => 'integer',
            'passed_credit' => 'integer',
            'completion_rate' => 'float',
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

    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
