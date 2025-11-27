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
        $name = faker()->name();
        $slug = Str::lower($name);
        $slug = str_replace(" ","_");
        return [
            "name" => faker()->name(),
            "slug" => $slug,
            "description" => faker()->sentence(),
            "stock" => faker()->numberBetween(1,30),
            "status" => "active",
            "image_path" => "test",
            "image_directory" => "test",
            "image_filename" => "test"
        ];
    }
}
