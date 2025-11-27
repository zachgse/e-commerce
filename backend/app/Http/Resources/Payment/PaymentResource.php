<?php

namespace App\Http\Resources\Payment;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            "status" => $this->payment->status,
            "is_payment_session_expired" => $this->is_payment_expired
        ];
    }
}
