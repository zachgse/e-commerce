<?php

namespace App\Http\Controllers;

use Illuminate\Http\{Request,JsonResponse};
use Illuminate\Auth\AuthenticationException;
use App\Traits\ApiResponseTrait;
use App\Services\CartService;
use App\Http\Requests\Cart\CartRequest;

class CartController extends Controller
{
    use ApiResponseTrait;

    public function __construct(protected CartService $cartService)
    {
    }

    public function index(Request $request) : JsonResponse
    {
        try {
            $data = $this->cartService->getUserCart($request->user());
            return $this->successResponse($data,200,"User cart information");
        } catch (AuthenticationException $e){
            return $this->errorResponse(401,$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function update(Request $request,CartRequest $cartRequest) : JsonResponse
    {
        try {
            $data = $this->cartService->updateUserCart($request->user(),$cartRequest->validated());
            return $this->successResponse($data,200,"User cart updated");
        } catch (AuthenticationException $e){
            return $this->errorResponse(401,$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }
}
