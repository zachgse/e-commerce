<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->name(),
            "slug" => fake()->name(),
            "description" => fake()->sentence(),
            "stock" => fake()->numberBetween(1,30),
            "price" => fake()->numberBetween(100,50000),
            "status" => "active",
        ];
    }
}
