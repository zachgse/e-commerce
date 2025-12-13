<?php

namespace App\Interfaces;

use App\Models\User;

interface AuthInterface
{
    public function getDashboard(int $year);
    public function findByEmail(string $email) : ?User;
}