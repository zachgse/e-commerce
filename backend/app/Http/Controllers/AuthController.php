<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use App\Traits\ApiResponseTrait;
use Illuminate\Auth\AuthenticationException;

use Illuminate\Http\Request;
use App\Models\{User};
use App\Http\Requests\{RegisterRequest,LoginRequest};

use DB,Auth;

class AuthController extends Controller
{
    use ApiResponseTrait;
    public function __construct(protected AuthService $authService)
    {
    }

    public function register(RegisterRequest $request)
    {
        try {
            $data = $this->authService->register($request->validated());
            return $this->successResponse($data,201,"Registration Successful");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }      
    }

    public function resend_otp(Request $request)
    {
        try {
            $data = $this->authService->resendOtp($request->user());
            return $this->successResponse($data,200,"OTP has been resent");
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }        
    }

    public function validate_otp(Request $request)
    {
        try {
            $data = $this->authService->validateOtp($request->user(),$request->get('otp'));
            return $this->successResponse($data,200,$data);
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }  
    }

    public function login(LoginRequest $request)
    {   
        try {
            $data = $this->authService->authenticate($request->validated());
            return $this->successResponse($data,200,"Login Successful");
        } catch (AuthenticationException $e){
            return $this->errorResponse(401,$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,$e->getMessage());
        }
    }

    public function check_user(Request $request)
    {
        try {
            $data = $this->authService->getUser($request->user());
            return $this->successResponse($data,200,"User information");
        } catch (AuthenticationException $e){
            return $this->errorResponse(401,$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,"Server error");
        }
    }

    public function logout(Request $request)
    {
        try {
            $this->authService->logout($request->user());
            return $this->successResponse("",200,'Logout Successful');
        } catch (AuthenticationException $e){
            return $this->errorResponse(401,$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,"Server error");
        }
    }
}
