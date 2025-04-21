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
    $passedCredit = fake()->numberBetween($registeredCredit - 5, $registeredCredit);
    return [
      'name' => "Semester" . " " . fake()->numberBetween(1, 8),
      'average' => fake()->randomFloat(2, 1, 5),
      'weighted_average' => fake()->randomFloat(2, 1, 5),
      'credit_index' => fake()->randomFloat(2, 1, 5),
      'corrected_credit_index' => fake()->randomFloat(2, 1, 5),
      'registered_credit' => $registeredCredit,
      'passed_credit' => $passedCredit,
      'completion_rate' => $passedCredit / $registeredCredit,
    ];
  }
}
