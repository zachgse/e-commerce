<?php

namespace App\Repositories;

use App\Interfaces\AuthInterface;

use App\Models\{User,OTP};

use Auth,Str;

class AuthRepository implements AuthInterface
{
    public function otp(int $userId)
    {
        $exists = OTP::where('user_id',$userId)->first();
        if ($exists){
            $exists->delete();
        }
        $otp = new OTP();
        $otp->user_id = $userId;
        $otp->code = Str::upper(Str::random(6));
        $otp->save();
        return $otp;
    }

    public function validate(int $userId,string $otp)
    {
        $code = OTP::where('user_id',$userId)->first();
        if ($code->code != $otp) return false;
        $user = User::find($userId);
        $user->email_verified_at = now();
        $user->save();
        $code->delete();
        return true;
    }

    public function register(array $data)
    {
        $user = new User();
        $user->username = $data['username'];
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = bcrypt($data['password']);
        $user->save();
        return $user;
    }

    public function getDashboard(int $year) 
    {
        $years = User::selectRaw('DISTINCT(YEAR(created_at)) as year')->get();
        $users = User::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
                            ->whereYear('created_at',$year)
                            ->groupBy('month')
                            ->orderBy('month')
                            ->get();

        $months = array_fill(1, 12, 0);
    
        foreach ($users as $user){
            $months[$user->month] = $user->total;
        }
        
        return [
            'yearsAvailable' => $years,
            'dataForSelectedYear' =>  $months
        ];
    }

    public function findByEmail(string $email)
    {
        $user = User::where('email',$email)->first();
        if (!$user) return null;
        return $user;
    }
}