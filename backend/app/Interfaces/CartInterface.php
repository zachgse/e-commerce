<?php

namespace App\Interfaces;

use App\Models\{Cart,User};

interface CartInterface
{
    public function fetchCart(User $user);
    public function save(User $user,array $data) : Cart; 
}