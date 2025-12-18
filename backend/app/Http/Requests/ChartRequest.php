<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChartRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'module' => 'required|in:orders,payments',
            'year' => 'nullable'
        ];
    }

    public function messages():array
    {
        return [
            'required' => 'Field is required.',
            'module.in' => "Only modules named 'orders and payments' is allowed."
        ];
    }
}
