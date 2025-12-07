<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Payment;

interface PaymentInterface
{    
    public function getAllPayments(array $params);
    
    public function create(int $orderId, string $paymentIntentId,string $clientKeyId,
                            float $subTotal,float $shippingFee) : Payment;

    public function findByOrderId(int $orderId) : ?Payment;

    public function update(Payment $payment,string $status) : Payment;
}