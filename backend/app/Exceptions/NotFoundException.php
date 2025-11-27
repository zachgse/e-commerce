<?php

namespace App\Exceptions;

use Exception;

class NotFoundException extends Exception 
{
    protected string $errorMessage;
    protected $code;

    public function __construct(string $message = "Not Found",$code = 404)
    {
        parent::__construct($message);
        $this->errorMessage = $message;
        $this->code = $code;
    }

    public function render($request)
    {
        return response()->json([
            'status' => false,
            'status_code' => strtoupper(str_replace(" ", "_", $this->errorMessage)),
            'message' => $this->errorMessage,
        ], $this->code);
    }
}