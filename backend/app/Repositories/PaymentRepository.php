<?php

namespace App\Repositories;

use App\Interfaces\PaymentInterface;
use App\Models\Payment;

class PaymentRepository implements PaymentInterface
{
    public function create(int $orderId, string $paymentIntentId,string $clientKeyId,
                                float $subTotal,float $shippingFee) : Payment 
    {
        $payment = new Payment();
        $payment->order_id = $orderId;
        $payment->payment_intent_id = $paymentIntentId;
        $payment->client_key_id = $clientKeyId;
        $payment->order_amount = ($subTotal / 100) - $shippingFee;
        $payment->shipping_amount = $shippingFee;
        $payment->save(); 
        return $payment;    
    }

    public function findByOrderId(int $orderId) : ?Payment 
    {
        return Payment::where('order_id',$orderId)->first();
    }

    public function update(Payment $payment,string $status) : Payment
    {
        $payment->payment_session_expiry_at = now()->addMinutes(15);
        $payment->status = $status;
        $payment->save();
        return $payment;
    }
}