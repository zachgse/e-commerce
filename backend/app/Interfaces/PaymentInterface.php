<?php

namespace App\Interfaces;

use App\Models\Payment;

interface PaymentInterface
{    
    public function create(int $orderId, string $paymentIntentId,string $clientKeyId,
                            float $subTotal,float $shippingFee) : Payment;

    public function findByOrderId(int $orderId) : ?Payment;

    public function update(Payment $payment,string $status) : Payment;
}