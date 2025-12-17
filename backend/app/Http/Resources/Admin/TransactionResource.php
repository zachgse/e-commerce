<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'reference_number' => $this->order->reference_number,
            'order_amount' => $this->order_amount,
            'created_at' => $this->created_at->format("M d, Y")
        ];
    }
}
