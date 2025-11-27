<?php

namespace App\Services;

use Illuminate\Auth\AuthenticationException;
use App\Services\ProductService;
use App\Repositories\CartRepository;
use App\Models\{User,Cart,Product,Order};

use Auth;

class CartService
{
    public function __construct(protected CartRepository $cartRepository,
                                protected ProductService $productService)
    {
        $this->products = $this->productService->getProducts();
    }

    public function getUserCart(User $user)
    {
        $cart = $this->cartRepository->fetchCart($user);
        return $cart ?? null;
    }

    public function saveUserCart(User $user,array $data)
    {
        $validatedCart = $this->validateCartProducts($data);
        return $this->cartRepository->save($user,$validatedCart);
    }

    private function validateCartProducts(Cart $cart)
    {
        $findProduct = collect($this->products)->keyBy('slug');
        return collect($cart->contents)->filter(function ($c) use ($findProduct) {
            $productItem = $findProduct->get($c['slug']);
            return $productItem && $productItem->status;
        })->map(function ($c) use ($findProduct) {
            $productItem = $findProduct->get($c['slug']);
            $c['quantity'] = min($c['quantity'], $productItem['stock']);
            return $c;
        })
        ->values()
        ->all();
    }

    public function formatCart(array $data,string $purpose) 
    {
        $findProduct = collect($this->products)->keyBy('slug');
        //use loop since this is validation
        $cartItems = collect($data['cart'])->map(function ($c) use ($findProduct,$purpose) {
            $productItem = $findProduct->get($c['slug']);
            if (!$productItem) return null; //throw exception
            if ($c['quantity'] > $productItem['stock']) return null; //throw exception

            switch($purpose) {
                case "checkout":
                    return [
                        "currency" => "PHP",
                        "name" => $productItem['name'],
                        "amount" => $productItem['price'] * 100,
                        "quantity" => $c['quantity']
                    ];
                    break;
                case "order":
                    return [
                        "id" => $productItem['id'],
                        "name" => $productItem['name'],
                        "price" => $productItem['price'],
                        "quantity" => $c['quantity'],
                        "subtotal" => $productItem['price'] * $c['quantity'],
                    ];
                    break;
                default:
                    break;
            }
        })
        ->filter()
        ->values()
        ->all();
        
        if ($purpose == "checkout"){
            $shippingFee = [
                "currency" => "PHP",
                "name" => "Shipping Fee",
                "amount" => $data['shipping_fee'] * 100,
                "quantity" => 1
            ];
            array_push($cartItems,$shippingFee);
        }

        return $cartItems;
    }

    public function updateUserCartUponCheckout(Order $order)
    {
        $cart = $order->user->cart;
        $findProduct = collect($this->products)->keyBy('slug');
        $orderItems = collect(json_decode($order->details))->keyBy('id');
        $updatedCart = collect($cart->contents)->map(function($c) use($findProduct,$orderItems) {
            $product = $findProduct->get($c['slug']);
            $orderItem = $orderItems->get($product->id);
            if (!$orderItem) return $c;
            $newQuantity = $c['quantity'] - $orderItem->quantity;
            if ($newQuantity > 0) {
                $c['quantity'] = $newQuantity;
                return $c;
            }
            return null;
        })
        ->filter()
        ->values()
        ->all();
        $data = ['cart' => $updatedCart];
        $this->cartRepository->save($order->user,$data);
    }
}