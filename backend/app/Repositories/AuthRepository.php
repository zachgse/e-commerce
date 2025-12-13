<?php

namespace App\Repositories;

use App\Interfaces\AuthInterface;

use App\Models\User;

use Auth;

class AuthRepository implements AuthInterface
{
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

    public function findByEmail(string $email) : ?User
    {
        $user = User::where('email',$email)->first();
        if (!$user) return null;
        return $user;
    }
}