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
            'name' => "Semester"." ".fake()->numberBetween(1,8),
            'average' => fake()->randomFloat(2,1,5),
            'gradePointAverage' => fake()->randomFloat(2, 1, 5),
            'creditIndex' => fake()->randomFloat(2, 1, 5),
            'correctedCreditIndex' => fake()->randomFloat(2, 1, 5),
            'registeredCredit' => $registeredCredit,
            'passeedCredit' => $passeedCredit,
            'completionRate' => $passeedCredit / $registeredCredit,
        ];
    }
}
