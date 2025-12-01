<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
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

    public function allAdmin() 
    {
        return Product::paginate(1);
    }

    public function search(string $keyword=null,string $mode=null,string $sortBy=null)
    {
        if (!$keyword) return;
        $query = Product::query()->where('name','LIKE',"%".$keyword."%");
        
        if ($mode == "full") {
            $query->with('thumbnail_image')
                ->select(["name","slug","price"]);
        } else {
            $query->select(["name"]);
        }

        $validSortValues = ["asc","desc",""];

        if ($sortBy && in_array($sortBy,$validSortValues)) {
            $query = $query->orderBy("price",$sortBy);
        } 

        return $mode == "full" ? $query->paginate(config('app.items_per_page')) : $query->get();
    }

    private function generateSlug(string $name) : string
    {
        $cleanedInput = strtolower($name);
        $slug = str_replace(" ","-",$cleanedInput);
        $exist = Product::where('name',$name)->get();
        if (count($exist) > 0){
            $count = $exist->count();
            $slug = $slug . "-" . $count++;
        }
        return $slug;
    }

    public function create(array $data) : Product
    {
        $product = new Product();
        $product->name = $data['name'];
        $product->slug = $this->generateSlug($data['name']);
        $product->description = $data['description'];
        $product->price = $data['price'];
        $product->stock = $data['stock'];
        $product->status = $data['stock'] ? 'active' : 'inactive';
        $product->save();
        return $product;
    }

    public function find(int $productId) : ?Product
    {
        return Product::find($productId);
    }

    public function findBySlug(string $slug) : ?Product
    {
        return Product::where('slug',$slug)->first();
    }

    public function updateInfo(Product $product,array $data) : ?Product
    {
        $test = $data['name'] ?? null;
        $product->name = $data['name'] ?? $product->name;
        $product->slug =  isset($data['name']) ? $this->create_slug($data['name']) : $product->slug;
        $product->description = $data['description'] ?? $product->desription;
        $product->price = $data['price'] ?? $product->price;
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

    public function upload(Product $product, array $data) : ProductImage
    {
        $product_image = new ProductImage();
        $product_image->product_id = $product->id;
        $product_image->file_path = $data['url'];
        $product_image->original_name = $data['original_name'];
        $product_image->type = $data['type'];
        $product_image->save();
        return $product_image;
    }
}