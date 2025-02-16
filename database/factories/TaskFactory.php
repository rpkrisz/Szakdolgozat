<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    private $types = ["midterm", "quiz", "assignment", "exam", "homeWork", "bonusPoint"];
    private $taskStates = ["inwork" , "done" , "graded" , "faild"];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $taskState = fake()->randomElement($this->taskStates);

        return [
            'name' => fake()->word(),
            'dueDate' => fake()->date(),
            'weight' => fake()->numberBetween(0, 10),
            'type' => fake()->randomElement($this->types),
            'taskPage' => fake()->url(),
            'state' => $taskState,
            'score' => ($taskState == "graded" || $taskState ==  "faild") ? fake()->numberBetween(0, 30) : 0,
        ];
    }
}
