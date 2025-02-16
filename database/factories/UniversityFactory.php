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
            'nickName' => $cityFst . "U",
            'faculty' => fake()->word() . " " . "faculty",
            'major' => fake()->jobTitle(),
            'degreeLevel' => fake()->randomElement($this->levles),
            'semestersCount' => $semesterCount,
            'currSemester' => fake()->numberBetween(1, $semesterCount),
            'currSemFstDay' => fake()->date(),
            'specialisation' => fake()->word(),
        ];
    }
}
