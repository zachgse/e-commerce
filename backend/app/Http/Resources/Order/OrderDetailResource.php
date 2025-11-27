<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Str;
class OrderDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'reference_number' => $this->reference_number,
            'items' => $this->format_order_items,
            'order_amount' => $this->payment->order_amount,
            'shipping_amount' => $this->payment->shipping_amount,
            'total_amount' => $this->payment->order_amount + $this->payment->shipping_amount,
            'shipping_status' => Str::title($this->status),
            'payment_status' => $this->payment->status,
            'order_placed_at' => ($this->created_at)->format("M d, Y"),
            'order_shipped_at' => $this->shipped_at ? ($this->shipped_at)->format("M d, Y") : null,
            'order_received_at' => $this->received_at ? ($this->received_at)->format("M d, Y") : null,
        ];
    }
}
