<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use App\Services\CustomValidator;
use App\Interfaces\{ProductInterface,AuthInterface,CartInterface,OrderInterface,PaymentInterface,RatingInterface,DashboardInterface};
use App\Repositories\{ProductRepository,AuthRepository,CartRepository,OrderRepository,PaymentRepository,RatingRepository,DashboardRepository};

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(ProductInterface::class,ProductRepository::class);
        $this->app->bind(AuthInterface::class,AuthRepository::class);
        $this->app->bind(CartInterface::class,CartRepository::class);
        $this->app->bind(OrderInterface::class,OrderRepository::class);
        $this->app->bind(PaymentInterface::class,PaymentRepository::class);
        $this->app->bind(RatingInterface::class,RatingRepository::class);
        $this->app->bind(DashboardInterface::class,DashboardRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Validator::resolver(function ($translator,$data,$rules,$messages,$attributes) {
            return new CustomValidator($translator,$data,$rules,$messages,$attributes);
        });
    }
}
