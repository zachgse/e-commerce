<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function thumbnail_image()
    {
        return $this->hasOne(ProductImage::class)->where('type','thumbnail');
    }

    public function collection_images()
    {
        return $this->hasMany(ProductImage::class)->where('type','collection')->select('file_path');
    }

    public function reviews()
    {
        return $this->hasMany(Rating::class);
    }

    public function getAverageRatingAttribute()
    {
        return Rating::where('product_id',$this->id)->avg('rate');
    }

    public function getReviewsInfoAttribute(){
        return Rating::with(['user:id,name'])
                    ->where('product_id', $this->id)
                    ->get(['rate', 'ordered_quantity', 'description', 'created_at', 'user_id'])
                    ->map(fn ($rating) => [
                        "name" => $rating->user->name,
                        "rate" => $rating->rate,
                        "quantity" => $rating->ordered_quantity,
                        "description" => $rating->description,
                        "date" => $rating->created_at->format("M d, Y")
                    ]);
    }
}
