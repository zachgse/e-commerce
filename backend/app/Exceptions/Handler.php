<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request,Throwable $exception)
    {
        switch(get_class($exception)){
            case "Illuminate\Validation\ValidationException":
                goto ignore_error;
                break;
            case "Predis\Connection\Resource\Exception\StreamInitException":
                $response = [
                    "msg"         => "Redis Connection Error.",
                    "status"      => false,
                    'status_code' => "REDIS_CONNECTION_ERROR",
                ];
                $response_code = 500;
                break;
            case "Illuminate\Database\Eloquent\ModelNotFoundException":
                $response = [
                    "msg" => "Not found",
                    'status' => false,
                    'status_code' => 'NOT_FOUND'
                ];
                $response_code = 404;
                break;
            default:
                goto ignore_error;
                break;
        }

        return response()->json($response,$response_code);

        ignore_error:
        return parent::render($request,$exception);
    }
}
