<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\AuthRepository;
use Illuminate\Auth\AuthenticationException;
use App\Http\Resources\Auth\AuthResource;
use Auth;

class AuthService 
{
    public function __construct(protected AuthRepository $authRepository)
    {
    }

    public function dashboard(int $year)
    {
        return $this->authRepository->getDashboard($year);
    }

    public function authenticate(array $credentials) : array
    {
        if (!Auth::attempt($credentials)){
            throw new AuthenticationException('Invalid Credentials');
        }

        $user = Auth::user();

        return [
            'user' => new AuthResource($user),
            'token' => $user->createToken('ecommerce')->plainTextToken
        ];
    }

    public function logout($user) : void 
    {
        if (!$user){
            throw new AuthenticationException('Unauthorized');
        }     
        $user->tokens()->delete();
    }

    public function getUser(string $email) : ?User
    {
        $user = $this->authRepository->findByEmail($email);
        if (!$user) return null; //throw error
        return $user;
    }

}