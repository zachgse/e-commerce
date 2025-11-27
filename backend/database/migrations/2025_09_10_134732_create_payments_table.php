<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('order_id')->constrained();
            $table->string('payment_intent_id');
            $table->string('client_key_id');
            $table->unsignedDecimal('order_amount',$precision=10,$scale=2);
            $table->unsignedDecimal('shipping_amount',$precision=10,$scale=2);
            $table->string('status')->default('pending'); //payment status
            $table->timestamps();
            $table->dateTime('payment_session_expiry_at')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
