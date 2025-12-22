<?php

namespace App\Http\Controllers;

use Illuminate\Http\{Request,JsonResponse};
use App\Exceptions\NotFoundException;
use App\Traits\ApiResponseTrait;
use App\Services\ProductService;
use App\Http\Requests\Product\{ProductNewRequest,ProductInfoRequest,ProductStockRequest,ProductImageRequest};
use App\Http\Resources\Product\{ProductListResource,ProductShowResource};

use Str;

class ProductController extends Controller
{
    use ApiResponseTrait;

    public function __construct(protected ProductService $productService)
    {
    }

    public function index() : JsonResponse
    {
        try {
            $products = ProductListResource::collection($this->productService->getProducts());
            return $this->successResponse($products,200,'List of Products.');
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function search(Request $request) : JsonResponse 
    {
        try {  
            $keyword = $request->get('keyword') ?? null;
            $mode = $request->get('mode') ?? null;
            $sortBy = Str::lower($request->get('sortBy')) ?? null;
            $products = $this->productService->searchProducts($keyword,$mode,$sortBy);
            return $mode == "full"
                ? $this->paginatedResponse(ProductListResource::collection($products),200,'Search results for keyword '. $keyword) 
                : $this->successResponse($products,200,'Search results for keyword '. $keyword);
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function featured_products() : JsonResponse
    {
        // cached 
    }

    public function store(ProductNewRequest $request) : JsonResponse
    {
        try {
            $product = $this->productService->createProduct($request->validated());
            return $this->successResponse($product,201,'Product has been created.');
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function show(string $slug) : JsonResponse
    {
        try {
            $product = new ProductShowResource($this->productService->getProductBySlug($slug));
            return $this->successResponse($product,200,'Product view');
        } catch (NotFoundException $e) {
            return $this->errorResponse($e->getCode(),$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function update_info(ProductInfoRequest $request, string $slug) : JsonResponse
    {
        try {
            $this->productService->updateProductInfo($slug,$request->validated());
            return $this->successResponse([],200,'Product has been updated');
        } catch (NotFoundException $e) {
            return $this->errorResponse($e->getCode(),$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function update_status(string $slug) : JsonResponse
    {
        try {
            $product = $this->productService->updateProductStatus($slug);
            return $this->successResponse($product,200,'Product status has been updated');
        } catch (NotFoundException $e) {
            return $this->errorResponse($e->getCode(),$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }
}
