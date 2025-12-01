<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\OrderInterface;
use App\Models\{Order,Payment,User};

use Str;

class OrderRepository implements OrderInterface
{
    public function getAllOrders() : Collection
    {
        return Order::all();
    }

    public function referenceNumber() : string
    {
        $referenceNumber = "";
        do {
            $referenceNumber = Str::upper(Str::random(8));
        } while (Order::where('reference_number',$referenceNumber)->exists());

        return $referenceNumber;
    }

    public function create(int $userId,string $referenceNumber,array $cart) : Order
    {
        $order = new Order();
        $order->user_id = $userId;
        $order->reference_number = $referenceNumber;
        $order->details = json_encode($cart);
        $order->save();
        return $order;
    }

    public function findByReferenceNumber(string $referenceNumber) : ?Order
    {
        return Order::where('reference_number',$referenceNumber)->first();
    }

    public function update(Order $order,string $status) : Order
    {
        $order->status = $status;
        if ($status == "delivered") $order->received_at = now();
        $order->save();
        return $order;
    }

    public function getUserOrders(User $user) 
    {
        $orders = $user->orders->where('deleted_at',null);
        return $orders;
    }
}