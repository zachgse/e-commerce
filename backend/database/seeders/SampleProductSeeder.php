<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Product};

class SampleProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Iphone 13',
                'slug' => 'iphone_13',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida.',
                'price' => '40000.00',
                'stock' => 30,
                'status' => 'active',
            ],
            [
                'name' => 'Polo Shirt',
                'slug' => 'polo_shirt',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida.',
                'stock' => 8,
                'price' => '1000.00',
                'status' => 'active',
            ],
            [
                'name' => 'Sweat Pants',
                'slug' => 'sweat_pants',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida.',
                'stock' => 5,
                'price' => '1000.35',
                'status' => 'active',
            ],
            [
                'name' => 'Keyboard',
                'slug' => 'keyboard',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida.',
                'stock' => 3,
                'price' => '2995.00',
                'status' => 'active',
            ],
            [
                'name' => 'Gaming Chair',
                'slug' => 'gaming_chair',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas gravida.',
                'stock' => 1,
                'price' => '6500',
                'status' => 'active',
            ]
        ];


        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
