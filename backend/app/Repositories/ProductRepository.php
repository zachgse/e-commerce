<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\UploadedFile;
use App\Interfaces\ProductInterface;
use App\Models\{Product,ProductImage};
use Cache;

class ProductRepository implements ProductInterface
{
    public function all() : Collection
    {
        // $products = Cache::remember('products',60, function() {
            return Product::all();
        // });

        // return $products;
    }

    public function allAdmin(array $params) 
    {
        $query = Product::query();

        if (isset($params['keyword'])){
            $query->where('name','LIKE',"%".$params['keyword']."%")
                ->where('slug','LIKE',"%".$params['keyword']."%");
        }

        if (isset($params['sortBy']) && isset($params['sortOrder'])) {
            $query->orderBy($params['sortBy'],$params['sortOrder'] == "false" ? 'asc' : 'desc');
        }

        if (isset($params['filterBy']) && isset($params['filterValue'])){
            $query->where($params['filterBy'],$params['filterValue']);
        }
        
        return $query->paginate(config('app.items_per_page'));
    }

    public function search(string $keyword=null,string $mode=null,string $sortBy=null)
    {
        if (!$keyword) return;
        $query = Product::query()->where('name','LIKE',"%".$keyword."%");
        
        if ($mode == "full") {
            $query->with('thumbnail_image')->select(["id","name","slug","price"]);
        } else {
            $query->select(["name"]);
        }

        $validSortValues = ["asc","desc",""];

        if ($sortBy && in_array($sortBy,$validSortValues)) {
            $query = $query->orderBy("price",$sortBy);
        } 

        return $mode == "full" ? $query->paginate(config('app.items_per_page')) : $query->get();
    }

    public function findById(int $productId) : ?Product
    {
        return Product::find($productId);
    }

    public function findBySlug(string $slug) : ?Product
    {
        return Product::where('slug',$slug)->first();
    }

    public function save(array $data,Product $product = null) : Product {
        if (!$product) {
            $product = new Product();
        }
        $product->name = $data['name'] ?? $product->name;
        $product->slug =  isset($data['name']) ? $this->generateSlug($data['name'],$product->id ?? 0) : $product->slug;
        $product->description = $data['description'] ?? $product->desription;
        $product->price = $data['price'] ?? $product->price;
        $product->stock = $data['stock'] ?? $product->stock;
        $product->status = $data['stock'] > 0 ? "active" : "inactive";
        $product->save();
        return $product;
    }

    public function updateStock(Product $product,int $quantity) : ?Product
    {
        $product->stock = $product->stock - $quantity;
        if ($product->stock == 0){
            $product->status = "inactive";
        }
        $product->save();
        return $product;
    }

    public function updateTotalSold(Product $product,int $quantity) : ?Product
    {
        $product->total_sold += $quantity;
        $product->save();
        return $product;
    }

    public function updateStatus(Product $product) : ?Product
    {
        $product->status = $product->status == 'active' ? 'inactive' : 'active';
        $product->save();
        return $product;
    }

    public function uploadImage(int $id, array $data) : ProductImage
    {
        $fileExist = ProductImage::where('product_id',$id)->first();
        if ($fileExist) {
            $fileExist->deleted_at = now();
            $fileExist->save();
        }
        $product_image = new ProductImage();
        $product_image->product_id = $id;
        $product_image->file_path = $data['url'];
        $product_image->original_name = $data['original_name'];
        $product_image->type = "thumbnail"; //remove type
        $product_image->save();
        return $product_image;
    }
    
    private function generateSlug(string $name,int $id = 0) : string
    {
        $cleanedInput = strtolower($name);
        $slug = str_replace(" ","-",$cleanedInput);
        $fileExist = Product::whereNot('id',$id)->where('name',$name)->get();
        if (count($fileExist) > 0){
            $count = $fileExist->count();
            $slug = $slug . "-" . $count++;
        }
        return $slug;
    }
}