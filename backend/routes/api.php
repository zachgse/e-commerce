<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{AdminController,AuthController,ProductController,CartController,PaymentController,OrderController,RatingController};

Route::group(['prefix'=>'auth','as'=>'auth.'], function() {
    Route::post('register',[AuthController::class,'register']);
    Route::post('login',[AuthController::class,'login']); 

    Route::middleware('auth:sanctum')->group(function () { //this middleware provides token gen and way to know the user
        Route::post('logout',[AuthController::class,'logout']);
        Route::get('me',[AuthController::class,'check_user']);
        Route::post('resend',[AuthController::class,'resend_otp']);
        Route::post('validate_otp',[AuthController::class,'validate_otp']);
    });
});

Route::post('webhook',[PaymentController::class,'webhook']);

Route::group(['prefix'=>'products','as'=>'products.'], function() {
    Route::get('',[ProductController::class,'index']);
    Route::get('search',[ProductController::class,'search']);
    Route::get('{slug}',[ProductController::class,'show']);
});

Route::group(['middleware'=>['auth:sanctum','email_verify']], function() {
    Route::group(['prefix'=>'cart','as'=>'cart.'], function() {
        Route::get('',[CartController::class,'index']);
        Route::post('update',[CartController::class,'update']);
    });

    Route::group(['prefix'=>'payments','as'=>'payments.'], function() {
        Route::post('checkout',[PaymentController::class,'create']);
        Route::get('{reference_number?}',[PaymentController::class,'getPaymentByReferenceNumber']);
    });

    Route::group(['prefix'=>'user','as'=>'user.'], function() {
        Route::group(['prefix'=>'orders','as'=>'orders.'], function() {
            Route::get('',[OrderController::class,'index']);
            Route::get('{reference_number?}',[OrderController::class,'show']);
            Route::put('{reference_number?}',[OrderController::class,'update']);
        });
        
        Route::group(['prefix'=>'rating','as'=>'rating.'], function() {
            Route::post('',[RatingController::class,'create']);
        });
    });

    Route::group(['middleware'=>'permission:manage_dashboard','prefix'=>'admin','as'=>'admin.'], function() {
        Route::group(['prefix'=>'dashboard','as'=>'dashboard.'], function() {
            Route::get('',[AdminController::class,'index']);
            Route::get('chart',[AdminController::class,'chart']);
            Route::get('products',[AdminController::class,'productStats']);
            Route::get('transactions',[AdminController::class,'transactionStats']);
        });

        Route::group(['prefix'=>'products','as'=>'products.'], function() {
            Route::get('',[AdminController::class,'products']);
            Route::post('',[ProductController::class,'store']);
            Route::post('{slug?}',[ProductController::class,'update_info']);
            Route::patch('{slug?}',[ProductController::class,'update_status']); 
        });
        
        Route::group(['prefix'=>'orders','as'=>'orders.'], function() {
            Route::get('',[AdminController::class,'orders']);
            Route::get('{referenceNumber?}',[AdminController::class,'orderDetails']);
            Route::put('{referenceNumber?}',[AdminController::class,'orderStatus']);
        });
        
        Route::group(['prefix'=>'payments','as'=>'payments.'], function() {
            Route::get('',[AdminController::class,'payments']);
            Route::get('{referenceNumber?}',[AdminController::class,'paymentDetails']);
        });
    });
});




