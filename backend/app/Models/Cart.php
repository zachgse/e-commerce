<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cart extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'contents',
    ];

    protected $casts = [
        'contents' => 'json'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
