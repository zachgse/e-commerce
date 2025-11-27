<?php

namespace App\Interfaces;

use App\Models\{User,Order,Product,Rating};

interface RatingInterface
{
    public function create(User $user,array $data,Order $order,Product $product,int $quantity) : Rating;
}