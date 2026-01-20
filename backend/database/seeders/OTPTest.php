<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\OTP;

class OTPTest extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OTP::create([
            'user_id' => 2,
            'code' => '123456'
        ]);
    }
}
