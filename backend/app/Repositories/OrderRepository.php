<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use App\Interfaces\OrderInterface;
use App\Models\{Order,Payment,User};
use Str;

class OrderRepository implements OrderInterface
{
    public function getAllOrders(array $params)
    {
        $query = Order::query();
        
        if (isset($params['keyword'])){
            $query->where('reference_number',$params['keyword'])
                ->orWhereHas('user', function ($q) use ($params) {
                    $q->where('name','LIKE',"%" . $params['keyword'] . "%");
                });
        }

        if (isset($params['sortBy']) && isset($params['sortOrder'])) {    
            $sortOrder = $params['sortOrder'] == "false" ? "asc" : "desc";
        
            if ($params['sortBy'] == "order_amount") {
                $query->withSum('payment','order_amount')
                        ->orderBy('payment_sum_order_amount',$sortOrder);
            }

            if ($params['sortBy'] == "order_placed_at") {
                $query->orderBy('created_at',$sortOrder);
            }
        } else {
            $query->orderBy('created_at','DESC');
        }

        if (isset($params['filterBy']) && isset($params['filterValue'])) {
            if ($params['filterBy'] == "order_status"){
                $query->where('status',$params['filterValue']);
            }
            
            if ($params['filterBy'] == "payment_status"){
                $query->whereHas('payment', function($q) use ($params) {
                    $q->where('status',$params['filterValue']);
                });
            }
        }

        return $query->paginate(config("app.items_per_page"));
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
        if ($status == "shipped") $order->shipped_at = now();
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