<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subjectdetail>
 */
class SubjectdetailFactory extends Factory
{
    private $weeklyTimeConsumptions = [45,90,60];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $maxPoint = fake()->numberBetween(30, 50);
        $pointsFor2 = fake()->numberBetween(30, 50);
        $pointsFor3 = fake()->numberBetween($pointsFor2, 60);
        $pointsFor4 = fake()->numberBetween($pointsFor3, 80);
        $pointsFor5 = fake()->numberBetween($pointsFor4, 100);
        $isPercentage = fake()->boolean();
        if (!$isPercentage) {

            $pointsFor2 = $pointsFor2 / 100 * $maxPoint;
            $pointsFor3 = $pointsFor3 / 100 * $maxPoint;
            $pointsFor4 = $pointsFor4 / 100 * $maxPoint;
            $pointsFor5 = $pointsFor5 / 100 * $maxPoint;
        }
        return [
            'coursePlacement' => fake()->word(),
            'markConditions' => fake()->sentence(),
            'scores' => fake()->sentence(),
            'bonusExercise' => fake()->sentence(),
            'mark' => fake()->word(),
            'examType' => fake()->word(),
            'readings' => fake()->words(3,true),
            'absences' => fake()->numberBetween(0,5),
            'programingLanguage' => fake()->word(),
            'coursePage' => fake()->url(),
            'weeklyTimeConsumption' => fake()->randomElement($this->weeklyTimeConsumptions),
            'maxPoint' => $maxPoint,
            'pointsFor2' => $pointsFor2,
            'pointsFor3' => $pointsFor3,
            'pointsFor4' => $pointsFor4,
            'pointsFor5' => $pointsFor5,
            'isPercentage' => $isPercentage,
        ];
    }
}
