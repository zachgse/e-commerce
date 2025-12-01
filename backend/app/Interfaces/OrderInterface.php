<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use App\Models\{Order,User};

interface OrderInterface 
{
    public function getAllOrders() : Collection;
    
    public function referenceNumber() : string;
    
    public function create(int $userId,
                                string $referenceNumber,
                                array $cart) : Order;
                                
    public function findByReferenceNumber(string $referenceNumber) : ?Order;

    public function update(Order $order,string $status) : Order;

    public function getUserOrders(User $user);
}