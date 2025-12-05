<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

use App\Repositories\PaymentRepository;
use App\Services\{AuthService,CartService,OrderService,ProductService};
use App\Events\PaymentNotification;

use Str;

class PaymentService
{
    public function __construct(
        protected AuthService $authService,
        protected CartService $cartService,
        protected OrderService $orderService,
        protected ProductService $productService,
        protected PaymentRepository $paymentRepository)
    {
    }

    public function getPayments()
    {
        return $this->paymentRepository->getAllPayments();
    }

    public function createPaymentCheckout(array $data) 
    {
        $userInfo = $data['user_info'];
        $user = $this->authService->getUser($userInfo['email']);
        $cartItems = $this->cartService->formatCart($data['cart_info'],"checkout");

        $referenceNumber = $this->orderService->createOrderReferenceNumber();
        $payload = $this->createPayload($userInfo,$cartItems,$referenceNumber); 
        
        $response = $this->generatePaymongoCheckout($payload);
        // data-attributes-payment_intent-attributes-amount 
        // cart_info - shipping_fee
        \Log::info("paymonggo response: ", $response);
        // return;
   
        $order = $this->orderService->createOrder(
                        $user->id,
                        $referenceNumber,
                        $this->cartService->formatCart($data['cart_info'],"order"));

        $payment = $this->paymentRepository->create(
                        $order->id,
                        $response['data']['attributes']['payment_intent']['id'],
                        $response['data']['attributes']['client_key'],
                        $response['data']['attributes']['payment_intent']['attributes']['amount'],
                        $data['cart_info']['shipping_fee']);
        
        $checkoutUrl = $response['data']['attributes']['checkout_url'];

        return $checkoutUrl;
    }

    public function webhook(array $data)
    {
        if (!$data) return; //return error
        \Log::info("webhook response:",$data);
        $type = $data['data']['attributes']['type'];
        $referenceNumber = $data['data']['attributes']['data']['attributes']['metadata']['reference_number'];
        
        switch ($type)
        {
            case "payment.paid": 
                $this->handlePaymentEvent($referenceNumber,'order placed','success');
                break;
            case "payment.failed":
                $this->handlePaymentEvent($referenceNumber,'pending payment','failed');
                break;
            default:
                break;
        }
    }

    private function createPayload(array $userInfo,array $cartItems,string $referenceNumber)
    {
        return [
            "data" => [
                "attributes" => [
                    "billing" => [
                        "name" => $userInfo['name'],
                        "email" => $userInfo['email'],
                        "phone" => $userInfo['phone'],
                        "address" => [
                            "line1" => $userInfo['line1'],
                            "line2" => $userInfo['line2'],
                            "city" => $userInfo['city'],
                            "state" => $userInfo['state'],
                            "postal_code" => $userInfo['postal'],
                        ]
                    ],
                    "line_items" => $cartItems,
                    "payment_method_types" => ["qrph","gcash","paymaya","card"],
                    "send_email_receipt" => true,
                    "show_description" => true,
                    "show_line_items" => true,
                    "cancel_url" => config('app.frontend_url'),
                    "reference_number" => $referenceNumber,
                    "success_url" => config('app.frontend_url'). "payment-confirmation/${referenceNumber}",
                    "description" => "Test Description",
                    "metadata" => [
                        "reference_number" => $referenceNumber,
                    ]
                ]
            ]
        ];
    }

    private function generatePaymongoCheckout($payload) 
    {
        return Http::withHeaders([
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Authorization' => config('app.paymongo_auth'),
        ])->post('https://api.paymongo.com/v1/checkout_sessions', $payload)->json();
    }

    private function handlePaymentEvent(string $referenceNumber,string $orderStatus,string $paymentStatus)
    {
        $order = $this->orderService->getOrderByReferenceNumber($referenceNumber);
        $payment = $this->paymentRepository->findByOrderId($order->id);
        if (!$payment) return; //refactor return not found exception 

        $this->orderService->updateOrder($referenceNumber,$orderStatus);
        $this->paymentRepository->update($payment,$paymentStatus);

        $this->cartService->updateUserCartUponCheckout($order);

        foreach(json_decode($order->details) as $orderItem) {
            $product = $this->productService->getProductById($orderItem->id);
            $this->productService->updateProductStock($product->slug,$orderItem->quantity);
            $this->productService->updateProductTotalSold($product->slug,$orderItem->quantity);
        }

        \Log::info("I am here near payment notifiation event");
        event(new PaymentNotification($order,$paymentStatus));
    }
}