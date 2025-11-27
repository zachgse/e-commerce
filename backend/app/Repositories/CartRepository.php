<?php

namespace App\Repositories;

use App\Interfaces\CartInterface;
use App\Models\{Cart,User};

class CartRepository implements CartInterface
{
    public function fetchCart(User $user) 
    {
        $cart = Cart::where('user_id',$user->id)->first();
        if (!$cart) return null;
        return $cart;    
    }

    public function save(User $user,array $data) : Cart
    {
        $cart = Cart::where('user_id',$user->id)->first();

        if (!$cart){
            $cart = new Cart();
            $cart->user_id = $user->id;
        }
        
        $cart->contents = $data['cart']; 
        $cart->save();

        return $cart;
    }
}