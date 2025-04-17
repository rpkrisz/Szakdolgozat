<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    private $types = ["midterm", "quiz", "assignment", "exam", "homework", "bonus_point"];
    private $taskStages = ["inprogress", "done", "graded", "faild"];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $taskStage = fake()->randomElement($this->taskStages);

        return [
            'name' => fake()->word(),
            'due_date' => fake()->date(),
            'weight' => fake()->numberBetween(0, 10) * 10,
            'type' => fake()->randomElement($this->types),
            'task_page' => fake()->url(),
            'description' => fake()->sentence(),
            'stage' => $taskStage,
            'score' => ($taskStage == "graded" || $taskStage ==  "faild") ? fake()->numberBetween(0, 30) : 0,
        ];
    }
}
