<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'price' => (float)($this->price),
            'stock' => $this->stock,
            'thumbnail_image' => $this?->thumbnail_image?->file_path,
            'collection_images' => $this?->collection_images,
            'reviews' => $this?->reviews
        ];
    }
}
