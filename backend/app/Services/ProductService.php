<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;    
use Illuminate\Http\UploadedFile;
use App\Repositories\ProductRepository;
use App\Services\ImageUploader;
use App\Models\Product;
use App\Exceptions\NotFoundException;

class ProductService
{
    public function __construct(protected ProductRepository $productRepository, protected ImageUploader $imageUploader)
    {
    }

    public function getProducts() : Collection
    {
        return $this->productRepository->all();
    }

    public function getProductsAdmin(array $params)
    {
        return $this->productRepository->allAdmin($params);
    }

    public function searchProducts(string $keyword = null,string $mode = null,string $sortBy = null) 
    {
        return $this->productRepository->search($keyword,$mode,$sortBy);
    }

    public function createProduct(array $data) : Product
    {
        return $this->productRepository->create($data);
    }

    public function getProduct(int $productId) : ?Product //make by id
    {
        $product = $this->productRepository->find($productId);
        if (!$product) throw new NotFoundException('Product not found');
        return $product;
    }

    public function getProductBySlug(string $slug) : ?Product
    {
        $product = $this->productRepository->findBySlug($slug);
        if (!$product) throw new NotFoundException('Product not found');
        return $product;
    }

    public function updateProductInfo(string $slug,array $data) 
    {
        $product = $this->getProductBySlug($slug);
        $product = $this->productRepository->updateInfo($product,$data);
        if (isset($data['image'])) {
            $this->uploadProductImage($product,$data['image']);
        }
        return; 
    }

    public function updateProductStock(string $slug,int $quantity) : ?Product
    {
        $product = $this->getProductBySlug($slug);
        return $this->productRepository->updateStock($product,$quantity);
    }
    
    public function updateProductTotalSold(string $slug,int $quantity) : ?Product
    {
        $product = $this->getProductBySlug($slug);
        return $this->productRepository->updateTotalSold($product,$quantity);    
    }

    public function updateProductStatus(string $slug) : ?Product
    {
        $product = $this->getProductBySlug($slug);
        return $this->productRepository->updateStatus($product);
    }

    public function uploadProductImage(Product $product,UploadedFile $file)
    {
        $slug = $product->slug;
        $image = $this->imageUploader->upload($file,"uploads/product/${slug}/");
        $this->productRepository->uploadImage($product->id,$image);
    }
}