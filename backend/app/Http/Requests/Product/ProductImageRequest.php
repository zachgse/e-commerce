<?php

namespace App\Http\Requests\Product;

use App\Http\Requests\RequestManager;

class ProductImageRequest extends RequestManager
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {        
        //refactor soon
        if ($this->type == "thumbnail") {
            $rules = [
                'type' => 'required|in:thumbnail,collection',
                'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            ];
        } else {
            $rules = [
                'type' => 'required|in:thumbnail,collection',
                'image' => 'required|array|min:1|max:4',
                'image.*' => 'required|image|mimes:jpeg,png,jpg|max:2048', 
            ];
        }
        
        return $rules;
    }

    public function messages(): array 
    {
        return [
            'type.required' => 'Please specify type of image',
            'type.in' => 'Only thumbnail/collection type of image is allowed',
            'image.required' => 'Please upload at least one image.',
            'image.*.required' => 'Each image file is required.',
            'image.*.image' => 'Each file must be a valid image.'
            //refactor soon add image min max messages
        ];
    }
}
