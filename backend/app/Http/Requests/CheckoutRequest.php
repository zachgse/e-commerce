<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // "email" => 'required',
            // 'name' => 'required',
            // 'line1' => 'required',
            // 'line2' => 'optional',
            // 'city' => 'required',
            // 'state' => 'required',
            // 'postal_code' => 'required',
            // 'phone' => 'required',
            // 'cart' => 'required'
            "user_info" => 'required',
            "cart_info" => 'required',
        ];
    }

    public function messages(): array 
    {
        return [
            'required' => 'Field is required'
        ];
    }
}
