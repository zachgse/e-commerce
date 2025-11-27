<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

use Illuminate\Http\Exceptions\HttpResponseException;

class RequestManager extends FormRequest
{
    public function input($key = null, $default = null)
    {
        $input = $this->getInputSource()->all();

        return data_get($input, $key, $default);
    }
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Override Illuminate\Foundation\Http\FormRequest@response method
     *
     * @return Illuminate\Routing\Redirector
     */
    //overridden from FormRequest
    protected function failedValidation(Validator $validator)
    {
		$_response = [
			'msg' => "Incomplete or invalid input",
			'status' => FALSE,
			'status_code' => "INVALID_DATA",
			'errors' => $validator->errors(),
		];

		throw new HttpResponseException(response()->json($_response, 422));
    }
}
