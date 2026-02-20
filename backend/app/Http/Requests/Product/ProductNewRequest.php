<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\RequestManager;

class ProductNewRequest extends RequestManager
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ];
    }

    public function messages(): array 
    {
        return [
            'required' => 'Field is required',
        ];
    }
}
