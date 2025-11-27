<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\Models\Order;

class PaymentNotification implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;
    public $status;

    /**
     * Create a new event instance.
     */
    public function __construct(Order $order,string $status)
    {
        $this->order = $order;
        $this->status = $status;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        \Log::info("Broadcasting");
        \Log::info("on channel payment ".$this->order->reference_number);
        \Log::info("on order object id ".$this->order->id);
        \Log::info("with status of ".$this->status);
        return [
            new Channel('payment.' . $this->order->reference_number)
        ];
    }

    public function broadcastAs() 
    {
        return "payment_notification";
    }

    public function broadcastWith()
    {
        return [
            'payment_status' => $this->status
        ];
    }
}
