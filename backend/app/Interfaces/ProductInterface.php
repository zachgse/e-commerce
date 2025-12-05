<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Product;

interface ProductInterface 
{
    public function all() : Collection;
    public function allAdmin(array $params);
    public function search(string $keyword=null,string $mode=null,string $price=null);
    public function findById(int $productId) : ?Product;
    public function findBySlug(string $slug) : ?Product;
    public function save(array $data,Product $product = null) : Product;
    public function updateStock(Product $product,int $quantity) : ?Product;
    public function updateTotalSold(Product $product,int $quantity) : ?Product;
    public function updateStatus(Product $product) : ?Product;
    public function uploadImage(int $id, array $data); 
}