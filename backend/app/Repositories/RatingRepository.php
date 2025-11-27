<?php

namespace App\Repositories;

use App\Interfaces\RatingInterface;
use App\Models\{User,Rating,Order,Product};

class RatingRepository implements RatingInterface
{
    public function create(User $user,array $data,Order $order,Product $product,int $quantity) : Rating
    {
        $rating = new Rating();
        $rating->user_id = $user->id;
        $rating->order_id = $order->id;
        $rating->product_id = $product->id;
        $rating->ordered_quantity = $quantity;
        $rating->rate = $data['rating'];
        $rating->description = $data['description'];
        $rating->save();
        return $rating;
    }
}