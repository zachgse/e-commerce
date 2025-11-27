<?php

namespace App\Http\Controllers;

use Illuminate\Http\{Request,JsonResponse};
use App\Exceptions\NotFoundException;
use App\Traits\ApiResponseTrait;
use App\Services\{PaymentService,OrderService};
use App\Http\Requests\CheckoutRequest;
use App\Http\Resources\Payment\PaymentResource;

class PaymentController extends Controller
{
    use ApiResponseTrait;

    public function __construct(protected PaymentService $paymentService,protected OrderService $orderService)
    {
    }

    public function create(CheckoutRequest $request) : JsonResponse
    {
        try {
            $data = $this->paymentService->createPaymentCheckout($request->validated());
            return $this->successResponse($data,200,"Redirecting to payment gateway");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function webhook(Request $request) : void
    {
        $this->paymentService->webhook($request->all());
        //refator this should just call paymentservice in general dont return anything!
        // \Log::info('Payment webhook received:', $request->all());
        // $data = $this->paymentService->webhook($request->all());
        // pass data.attributes
        // return response()->json($request->all()); 
    }

    public function getPaymentByReferenceNumber(string $referenceNumber) : JsonResponse //rename to show
    {
        try {
            $data = new PaymentResource($this->orderService->getOrderByReferenceNumber($referenceNumber));
            return $this->successResponse($data,200,"Payment status of order with reference number ${referenceNumber}");
        } catch (NotFoundException $e) {
           return $this->errorResponse($e->getCode(),$e->getMessage()); 
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }
}
