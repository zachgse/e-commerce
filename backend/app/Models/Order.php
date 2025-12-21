<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory;
    use SoftDeletes;
    
    protected $casts = [
        'timestamps' => 'datetime',
        'shipped_at' => 'datetime',
        'received_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class); 
    }

    public function getIsPaymentExpiredAttribute()
    {
        return $this->payment->payment_session_expiry_at 
                <= 
                now() 
                ? TRUE : FALSE;
    }

    public function getFormatOrderItemsAttribute()
    {
        $order = $this;
        $findProducts = collect(Product::all())->keyBy('id');
        return collect(json_decode($this->details))->map(function ($orderItem) use($findProducts,$order) {
            $product = $findProducts->get($orderItem->id);
            return [
                'slug' => $product->slug,
                'name' => $orderItem->name,
                'image' => $product?->thumbnail_image?->file_path,
                'price' => (float)$orderItem->price,
                'quantity' => $orderItem->quantity,
                'subtotal' => $orderItem->subtotal,
                'can_rate' => $this->productCanBeRated($order,$product->id)
            ];
        })
        ->filter()
        ->values()
        ->all();
    }

    private function productCanBeRated(Order $order,int $productId)
    {
        if ($order->status != "delivered") return false;
        $exists = Rating::where('order_id',$order->id)
                        ->where('product_id',$productId)
                        ->whereNULL('deleted_at')
                        ->exists();
        return $exists ? false : true;
    }
}
