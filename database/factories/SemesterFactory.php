<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Semester>
 */
class SemesterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $registeredCredit = fake()->numberBetween(25, 35);
        $passeedCredit = fake()->numberBetween($registeredCredit - 5, $registeredCredit);
        return [
            'name' => "Semester" . " " . fake()->numberBetween(1, 8),
            'average' => fake()->randomFloat(2, 1, 5),
            'grade_point_average' => fake()->randomFloat(2, 1, 5),
            'credit_index' => fake()->randomFloat(2, 1, 5),
            'corrected_credit_index' => fake()->randomFloat(2, 1, 5),
            'registered_credit' => $registeredCredit,
            'passeed_credit' => $passeedCredit,
            'completion_rate' => $passeedCredit / $registeredCredit,
        ];
    }
}
