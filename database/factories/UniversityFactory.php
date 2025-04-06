<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use function PHPSTORM_META\map;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\University>
 */
class UniversityFactory extends Factory
{
    private $levles = ["BA/BSc", "MA/MSc"];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $city = fake()->city();
        $words = explode(" ", $city);
        $cityFst = "";
        foreach ($words as $word) {
            $cityFst = $cityFst . $word[0];
        }
        $uniName = "$city University";
        $semesterCount = fake()->numberBetween(6, 8);
        return [
            'name' => $uniName,
            'nick_name' => $cityFst . "U",
            'faculty' => fake()->word() . " " . "faculty",
            'major' => fake()->jobTitle(),
            'degree_level' => fake()->randomElement($this->levles),
            'semesters_count' => $semesterCount,
            'curr_semester' => fake()->numberBetween(1, $semesterCount),
            'curr_semesterID' => fake()->numberBetween(1, 2147483647),
            'curr_semester_fst_day' => fake()->date(),
            'specialisation' => fake()->word(),
        ];
    }
}
