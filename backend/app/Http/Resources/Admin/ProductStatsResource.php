<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductStatsResource extends JsonResource
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
            'image' => $this?->thumbnail_image?->file_path,
            'avg_rating' => (float) $this->average_rating ?? 0,
            'total_sold' => $this->total_sold,
            'stock' => $this->stock
        ];
    }
}
