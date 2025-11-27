<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RatingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "referenceNumber" => 'required',
            "slug" => 'required',
            "rating" => 'required',
            "description" => 'required'
        ];
    }

    public function messages(): array 
    {
        return [
            "required" => "Field is required"
        ];
    }
}
