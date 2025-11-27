<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
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
            'price' => (float)($this->price),
            'thumbnail_image' => $this?->thumbnail_image?->file_path,
            'average_rating' => (float)($this?->average_rating) 
        ];
    }
}
