<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\RequestManager;

class ProductStockRequest extends RequestManager
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'stock' => 'required'
        ];
    }

    public function messages(): array 
    {
        return [
            'required' => 'Field is required',
        ];
    }
}
