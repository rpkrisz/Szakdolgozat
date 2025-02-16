<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subjectscore>
 */
class SubjectscoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $midterms = fake()->numberBetween(10, 60);
        $quizes = fake()->numberBetween(5, 10);
        $assignments = fake()->numberBetween(20, 30);
        $exams = fake()->numberBetween(10, 30);
        $homeWorks = fake()->numberBetween(1, 10);
        $bonusPoints = fake()->numberBetween(2, 5);
        $sumScores = $midterms + $quizes + $assignments + $exams + $homeWorks + $bonusPoints;

        return [
            'midterms' => $midterms,
            'quizes' => $quizes,
            'assignments' => $assignments,
            'exams' => $exams,
            'homeWorks' => $homeWorks,
            'bonusPoints' => $bonusPoints,
            'sumScores' => $sumScores,
            'maxScore' => fake()->numberBetween(10, 150),
        ];
    }
}
