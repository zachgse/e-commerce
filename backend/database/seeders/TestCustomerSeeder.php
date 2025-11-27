<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\{User};

class TestCustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customer = User::create([
            'username' => 'zachy2700',
            'name' => 'Zach Estrella',
            'email' => 'zachestrella@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('admin'),
            'status' => 'active'
        ]);

        $customer->assignRole('customer');
    }
}
