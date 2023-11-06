<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tube>
 */
class TubeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'gas_id' => $this->faker->numberBetween(1, 10),
            'size' => $this->faker->numberBetween(0, 1)*5+1,
            'status' => $this->faker->word(),
        ];
    }
}