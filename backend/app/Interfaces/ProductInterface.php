<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Product;

interface ProductInterface 
{
    public function all() : Collection;
    public function search(string $keyword=null,string $mode=null,string $price=null);
    public function create(array $data) : Product;
    public function find(int $productId) : ?Product;
    public function findBySlug(string $slug) : ?Product;
    public function updateInfo(Product $product,array $data) : ?Product;
    public function updateStock(Product $product,int $quantity) : ?Product;
    public function updateStatus(Product $product) : ?Product;
    public function upload(Product $product, array $data); 
}