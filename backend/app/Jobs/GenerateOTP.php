<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\{User,OTP};
use App\Mail\OTPMail;
use Mail;

class GenerateOTP implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $user,public OTP $otp)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        \Log::info("i am sending email");
        Mail::to($this->user->email)
            ->send(new OTPMail($this->user,$this->otp));
    }
}
