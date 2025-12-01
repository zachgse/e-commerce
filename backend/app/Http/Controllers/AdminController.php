<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\{ProductService,OrderService,PaymentService};
use App\Traits\ApiResponseTrait;
use App\Http\Resources\Product\ProductAdminResource;

class AdminController extends Controller
{
    use ApiResponseTrait;

    public function __construct(protected ProductService $productService,
                                protected OrderService $orderService,
                                protected PaymentService $paymentService)
    {
    }

    public function products(Request $request)
    {
        try {
            // dd($request->all());
            $data = ProductAdminResource::collection($this->productService->getProductsAdmin($request->all()));
            return $this->paginatedResponse($data,200,"List of products");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function orders()
    {
        try {
            $data = $this->orderService->getOrders();
            return $this->successResponse($data,200,"List of orders");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function payments()
    {
        try {
            $data = $this->paymentService->getPayments();
            return $this->successResponse($data,200,"List of payments");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }      
    }
}
