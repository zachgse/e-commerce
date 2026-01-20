<?php

namespace App\Interfaces;

interface AuthInterface
{
    public function otp(int $userId);
    public function validate(int $userId,string $otp);
    public function register(array $data);
    public function getDashboard(int $year);
    public function findByEmail(string $email);
}