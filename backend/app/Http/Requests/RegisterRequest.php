<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\RequestManager;

class RegisterRequest extends RequestManager
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('id') ?: 0;
        return [
            "username" => "required|unique_username:{$id}",
            "name" => "required",
            "email" => "required|unique_email:{$id}",
            "password" => "required"
        ];
    }

    public function message(): array
    {
        return [
            "required" => "Field is required",
            "username.unique_username" => "Username already exists",
            "email.unique_email" => "Email already exists"
        ];
    }
}
