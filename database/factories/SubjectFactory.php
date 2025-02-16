<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    private $courseTypes = ["Lecture", "Tutorial", "Lecture & Tutorial"];
    private $weeklyTimeConsumptions = [45, 90, 60];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Scores
        $midterms = fake()->numberBetween(0, 60);
        $quizes = fake()->numberBetween(0, 10);
        $assignments = fake()->numberBetween(0, 30);
        $exams = fake()->numberBetween(0, 30);
        $homeWorks = fake()->numberBetween(0, 10);
        $bonusPoints = fake()->numberBetween(0, 5);
        $sumScores = $midterms + $quizes + $assignments + $exams + $homeWorks + $bonusPoints;
        $maxScore = fake()->numberBetween(80, 150);

        // Grading
        $pointsFor2 = fake()->numberBetween(30, 50);
        $pointsFor3 = fake()->numberBetween(50, 60);
        $pointsFor4 = fake()->numberBetween(60, 80);
        $pointsFor5 = fake()->numberBetween(80, 100);
        $isPercentage = fake()->boolean();
        if (!$isPercentage) {

            $pointsFor2 = $pointsFor2 / 100 * $maxScore;
            $pointsFor3 = $pointsFor3 / 100 * $maxScore;
            $pointsFor4 = $pointsFor4 / 100 * $maxScore;
            $pointsFor5 = $pointsFor5 / 100 * $maxScore;
        }

        $isGraded = fake()->boolean();
        $grade = 1;
        foreach ([$pointsFor2, $pointsFor3, $pointsFor4, $pointsFor5] as $gradeLimit) {
            if ($gradeLimit > ($sumScores /  $maxScore)) $grade = $grade + 1;
        }

        return [
            'name' => fake()->word(),
            'courseType' => fake()->randomElement($this->courseTypes),
            'credit' => fake()->numberBetween(1, 7),
            'notes' => fake()->sentence(),
            'isGraded' => fake()->boolean(),
            'grade' => $isGraded ? $grade : 1,

            'midterms' => $midterms,
            'quizes' => $quizes,
            'assignments' => $assignments,
            'exams' => $exams,
            'homeWorks' => $homeWorks,
            'bonusPoints' => $bonusPoints,
            'sumScores' => $sumScores,
            'maxScore' => $maxScore,

            'coursePlacement' => fake()->word(),
            'markConditions' => fake()->sentence(),
            'scores' => fake()->sentence(),
            'bonusExercise' => fake()->sentence(),
            'mark' => fake()->word(),
            'examType' => fake()->word(),
            'readings' => fake()->words(3, true),
            'absences' => fake()->numberBetween(0, 5),
            'programingLanguage' => fake()->word(),
            'coursePage' => fake()->url(),
            'weeklyTimeConsumption' => fake()->randomElement($this->weeklyTimeConsumptions),
            'pointsFor2' => $pointsFor2,
            'pointsFor3' => $pointsFor3,
            'pointsFor4' => $pointsFor4,
            'pointsFor5' => $pointsFor5,
            'isPercentage' => $isPercentage,
        ];
    }
}
