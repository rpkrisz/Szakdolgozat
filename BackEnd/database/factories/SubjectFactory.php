<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
  private $courseTypes = ["Lecture", "Practice", "Lecture & Practice"];
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

      $pointsFor2 = round($pointsFor2 / 100 * $maxScore);
      $pointsFor3 = round($pointsFor3 / 100 * $maxScore);
      $pointsFor4 = round($pointsFor4 / 100 * $maxScore);
      $pointsFor5 = round($pointsFor5 / 100 * $maxScore);
    }

    $isGraded = fake()->boolean();
    $grade = 1;
    foreach ([$pointsFor2, $pointsFor3, $pointsFor4, $pointsFor5] as $gradeLimit) {
      if ($gradeLimit > ($sumScores /  $maxScore)) $grade = $grade + 1;
    }

    return [
      'name' => fake()->word(),
      'course_type' => fake()->randomElement($this->courseTypes),
      'credit' => fake()->numberBetween(1, 7),
      'notes' => fake()->sentence(),
      'is_graded' => $isGraded,
      'grade' => $isGraded ? $grade : 1,

      'midterm_score' => $midterms,
      'quiz_score' => $quizes,
      'assignment_score' => $assignments,
      'exam_score' => $exams,
      'homework_score' => $homeWorks,
      'bonus_point_score' => $bonusPoints,
      'sum_scores' => $sumScores,
      'max_score' => $maxScore,

      'course_placement' => fake()->word(),
      'mark_conditions' => fake()->word(4),
      'scores' => fake()->word(3),
      'bonus_exercise' => fake()->word(2),
      'mark' => fake()->word(),
      'exam_type' => fake()->word(),
      'readings' => fake()->words(3, true),
      'absences' => fake()->numberBetween(0, 5),
      'programing_language' => fake()->word(),
      'course_page' => fake()->url(),
      'weekly_time_consumption' => fake()->randomElement($this->weeklyTimeConsumptions),
      'points_for_2' => $pointsFor2,
      'points_for_3' => $pointsFor3,
      'points_for_4' => $pointsFor4,
      'points_for_5' => $pointsFor5,
      'is_percentage' => $isPercentage,
    ];
  }
}
