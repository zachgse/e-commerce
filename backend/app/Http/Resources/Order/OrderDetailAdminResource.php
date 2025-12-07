<?php

namespace App\Http\Resources\Order;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderDetailAdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "reference_number" => $this->reference_number,
            "customer" => $this->user->name,
            "address" => "Lorem ipsum",
            "order_amount" => $this->payment->order_amount,
            "order_status" => $this->status,
            "payment_status" => $this->payment->status,
            "order_placed_at" => $this->created_at->format("M d, Y"),
            "order_shipped_at" => $this->shipped_at ? ($this->shipped_at)->format("M d, Y") : null,
            "order_received_at" => $this->received_at ? ($this->received_at)->format("M d, Y") : null,
        ];
    }
}
