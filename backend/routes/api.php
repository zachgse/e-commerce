<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;

//auth
Route::group(['prefix'=>'auth','as'=>'auth.','namespace'=>'App\Http\Controllers'], function() {
    Route::post('/register',['as'=>'register','uses'=>'AuthController@register']);
    Route::post('/login', 'AuthController@login'); //add guest middleware

    Route::middleware('auth:sanctum')->group(function () { //this middleware provides token gen and way to know the user
        Route::post('/logout', 'AuthController@logout');
        Route::get('/me', 'AuthController@check_user');
    });
});

//public product
//transform these to rest type naming convention 
//remove update keywords, remove create just make it as / etc etc...
Route::group(['prefix'=>'products','as'=>'products.','namespace'=>'App\Http\Controllers'], function() {
    Route::get('/',['as'=>'index','uses'=>'ProductController@index']);
    
    Route::get('/search', ['as'=>'search','uses'=>'ProductController@search']);

    //everything below is in admin
    Route::post('/',['as'=>'create','uses'=>'ProductController@store']);

    Route::get('{slug}',['as'=>'show','uses'=>'ProductController@show']);
    Route::post('{slug?}',['as'=>'update-info','uses'=>'ProductController@update_info']);
    // Route::patch('{slug?}/update-stock',['as'=>'update-stock','uses'=>'ProductController@update_stock']);
    Route::patch('{slug?}',['as'=>'update-status','uses'=>'ProductController@update_status']);
    Route::post('{slug?}/upload-image',['as'=>'upload-image','uses'=>'ProductController@upload_image']);
});

//auth routes
Route::group(['middleware'=>'auth:sanctum'], function() {
    //belongs to admin group
    Route::group(['prefix'=>'products','as'=>'products.','namespace'=>'App\Http\Controllers', 'middleware'=>'role:admin'], function() { 

    });

    Route::group(['prefix'=>'cart','as'=>'cart.','namespace'=>'App\Http\Controllers'], function() {
        Route::get('/',['as'=>'fetch','uses'=>'CartController@index']);
        Route::post('update',['as'=>'update','uses'=>'CartController@update']);
    });

    //update prefix to checkout
    Route::group(['prefix'=>'order','as'=>'order.','namespace'=>'App\Http\Controllers'], function() { //change to payment group
        Route::post('checkout',['as'=>'checkout','uses'=>'PaymentController@create']);
    });

    // Route::group(['prefix'=>'payment','as'=>'payment.','namespace'=>'App\Http\Controllers'], function() {
      
    // });

    Route::group(['prefix'=>'user','as'=>'user.','namespace'=>'App\Http\Controllers'], function() {
        Route::group(['prefix'=>'order','as'=>'order.'], function() {
            Route::get('/',['as'=>'index','uses'=>'OrderController@index']);
            Route::get('/{reference_number?}',['as'=>'show','uses'=>'OrderController@show']);
            Route::put('/{reference_number?}',['as'=>'update','uses'=>'OrderController@update']);
        });
        
        Route::group(['prefix'=>'rating','as'=>'rating.'], function() {
            Route::post('/',['as'=>'create','uses'=>'RatingController@create']);
        });
    });

    Route::group(['prefix'=>'admin','as'=>'admin.'], function() {
        Route::group(['prefix'=>'chart','as'=>'chart.'], function() {
            Route::get('orders',[AdminController::class,'orderChart']);
            Route::get('users',[AdminController::class,'userChart']);
        });

        Route::get('',[AdminController::class,'index']);

        Route::get('products',[AdminController::class,'products']);
        
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

Route::group(['prefix'=>'payment','as'=>'payment.','namespace'=>'App\Http\Controllers'], function () {
    // Route::post('checkout',['as'=>'checkout','uses'=>'PaymentController@create']);
    Route::post('webhook',['as'=>'webhook','uses'=>'PaymentController@webhook']);
    Route::get('check-status/{reference_number?}',['as'=>'check-status','uses'=>'PaymentController@getPaymentByReferenceNumber']);
});


