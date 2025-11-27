<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{User};

class AdminAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate([
            'username' => 'master_admin',
            'name' => 'Master Admin',
            'email' => 'master_admin@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('admin'),
            'status' => 'active'
        ]);

        $user->assignRole('admin');
    }
}
