<?php

namespace App\Exceptions;

use Exception;

class InvalidCartQuantityException extends Exception
{
    public function render($request)
    {
        return response()->json([
            'status' => 'error',
            'msg' => 'The requested quantity exceeds available stock.',
        ], 400);
    }
}
