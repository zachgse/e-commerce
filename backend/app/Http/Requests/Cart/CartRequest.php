<?php

namespace App\Http\Requests\Cart;

use App\Http\Requests\RequestManager;

class CartRequest extends RequestManager
{
    public function rules() : array
    {
        return [
            'cart' => ['required', 'array'],   // cart must be an array

            // Each item inside the cart[]
            'cart.*.quantity' => ['required', 'integer', 'min:1'],
            'cart.*.slug' => 'required',
        ];
    }

    public function messages() : array
    {
        return [
            'required' => 'This field is required.',
            'array' => 'Invalid format; expected an array.',
            'numeric' => 'This value must be a number.',
            'integer' => 'This value must be an integer.',
            'min' => 'Value is too small.'
        ];
    }
}