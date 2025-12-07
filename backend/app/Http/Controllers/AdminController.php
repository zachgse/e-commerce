<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\{ProductService,OrderService,PaymentService};
use App\Traits\ApiResponseTrait;
use App\Http\Resources\Product\ProductAdminResource;
use App\Http\Resources\Order\{OrderAdminResource,OrderDetailAdminResource};
use App\Http\Resources\Payment\{PaymentAdminResource,PaymentDetailAdminResource};

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
            $data = ProductAdminResource::collection($this->productService->getProductsAdmin($request->all()));
            return $this->paginatedResponse($data,200,"List of products");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function orders(Request $request)
    {
        try {
            $data = OrderAdminResource::collection($this->orderService->getOrders($request->all()));
            return $this->paginatedResponse($data,200,"List of orders");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function orderDetails(Request $request, string $referenceNumber = null)
    {
        try {
            $data = new OrderDetailAdminResource($this->orderService->getOrderByReferenceNumber($referenceNumber));
            return $this->successResponse($data,200,"Order details of ref number ${referenceNumber}");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function orderStatus(Request $request,string $referenceNumber=null)
    {
        try {
            $data = $this->orderService->updateOrder($referenceNumber,"shipped");
            return $this->successResponse($data,200,"Order status has been updated");
        } catch (\Exception $e){
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function payments(Request $request)
    {
        try {
            $data = PaymentAdminResource::collection($this->paymentService->getPayments($request->all()));
            return $this->paginatedResponse($data,200,"List of payments");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }      
    }

    public function paymentDetails(string $referenceNumber = null){
        try {
            $data = new PaymentDetailAdminResource($this->paymentService->getPaymentDetails($referenceNumber));
            return $this->paginatedResponse($data,200,"Payment details for reference # ${referenceNumber}");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }  
    }
}
