<?php

namespace App\Repositories;

use App\Interfaces\AuthInterface;

use App\Models\User;

use Auth;

class AuthRepository implements AuthInterface
{
    public function findByEmail(string $email) : ?User
    {
        $user = User::where('email',$email)->first();
        if (!$user) return null;
        return $user;
    }
}