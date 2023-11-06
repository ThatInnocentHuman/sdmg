<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => $this->faker->numberBetween(1, 20),
            'tube_submitted' => $this->faker->numberBetween(1, 20),
            'tube_taken' => $this->faker->numberBetween(1, 20),
            'price' => $this->faker->numberBetween(1, 100)*1000,
        ];
    }
}