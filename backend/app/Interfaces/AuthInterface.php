<?php

namespace App\Interfaces;

use App\Models\User;

interface AuthInterface
{
    public function findByEmail(string $email) : ?User;
}