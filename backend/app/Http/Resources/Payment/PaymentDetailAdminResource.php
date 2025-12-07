<?php

namespace App\Http\Resources\Payment;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentDetailAdminResource extends JsonResource
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
            "payment_intent_id" => $this->payment->payment_intent_id,
            "client_key_id" => $this->payment->client_key_id,
            "order_amount" => $this->payment->order_amount,
            "status" => $this->payment->status,
            "created_at" => $this->payment->created_at->format("M d, Y"),
            "updated_at" => $this->payment->updated_at ? ($this->payment->updated_at)->format("M d, Y") : null
        ];
    }
}
