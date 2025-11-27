<?php

namespace App\Http\Controllers;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use App\Traits\ApiResponseTrait;
use App\Services\OrderService;
use App\Http\Resources\Order\{OrderListResource,OrderDetailResource};

class OrderController extends Controller
{
    use ApiResponseTrait;

    public function __construct(protected OrderService $orderService)
    {}

    public function index(Request $request)
    {
        try {
            $orders = $this->orderService->getListUserOrders($request->user());
            return $this->successResponse(OrderListResource::collection($orders),200,"List of User Orders");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function show(Request $request,string $referenceNumber)
    {
        try {
            $order = $this->orderService->getSingleUserOrder($request->user(),$referenceNumber);
            return $this->successResponse(new OrderDetailResource($order),200,"Order details of order # " . $referenceNumber);
        } catch (AuthenticationException $e) {
            return $this->errorResponse(401,$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }     
    }

    public function update(Request $request,string $referenceNumber)
    {
        try {
            $order = $this->orderService->updateOrder($referenceNumber,"delivered");
            return $this->successResponse(new OrderDetailResource($order),200,"Order status of reference # " . $referenceNumber . " has been delivered.");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }       
    }
}
