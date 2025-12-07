<?php

namespace App\Services;

use Illuminate\Auth\AuthenticationException;
use App\Repositories\OrderRepository;
use App\Exceptions\NotFoundException;
use App\Models\{Order,User};

class OrderService
{
    public function __construct(protected OrderRepository $orderRepository)
    {
    }

    public function getOrders(array $params)
    {
        return $this->orderRepository->getAllOrders($params);
    }

    public function createOrderReferenceNumber()
    {
        return $this->orderRepository->referenceNumber();
    }

    public function createOrder(int $userId,string $referenceNumber,array $cart)
    {
        return $this->orderRepository->create($userId,$referenceNumber,$cart);
    }

    public function getOrderByReferenceNumber(string $referenceNumber)
    {
        $order = $this->orderRepository->findByReferenceNumber($referenceNumber);
        if(!$order) throw new NotFoundException("Invalid reference number");
        return $order;
    }

    public function updateOrder(string $referenceNumber,string $orderStatus)
    {
        $order = $this->getOrderByReferenceNumber($referenceNumber);
        return $this->orderRepository->update($order,$orderStatus);
    }

    public function getListUserOrders(User $user)
    {
        return $this->orderRepository->getUserOrders($user);
    }

    public function getSingleUserOrder(User $user,string $referenceNumber)
    {
        $order = $this->getOrderByReferenceNumber($referenceNumber);
        if ($user->id != $order->user_id) throw new AuthenticationException('Unauthorized');
        return $order;
    }
}