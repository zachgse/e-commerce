<?php

namespace App\Services;

use App\Repositories\RatingRepository;
use App\Services\{OrderService,ProductService};
use App\Models\{Order,User,Product};

class RatingService
{
    public function __construct(
            protected RatingRepository $ratingRepository,
            protected OrderService $orderService,
            protected ProductService $productService
        )
    {}

    public function createRatingForProduct(User $user,array $data)
    {
        /*
        fields: ref number, product slug, rate,description
        */
        $order = $this->orderService->getOrderByReferenceNumber($data['referenceNumber']);
        $product = $this->productService->getProductBySlug($data['slug']);
        $orderedProductQuantity = $this->validateOrderItems($order,$product);

        $rating = $this->ratingRepository->create($user,$data,$order,$product,$orderedProductQuantity);
        return $rating;
    }

    private function validateOrderItems(Order $order,Product $product)
    {
        if ($order->status != "delivered") return; //throw validation exception 
        // can also put to custom validator the order checking

        //product checking should be here
        $orderItems = collect(json_decode($order->details))->keyBy('id');
        $exist = $orderItems->get($product->id);
        if (!$exist) return; //throw validation
        return $exist->quantity;
    }
}