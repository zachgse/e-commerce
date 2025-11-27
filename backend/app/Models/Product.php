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
}
