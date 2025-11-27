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
        DB::beginTransaction();
        try {
            $user = new User();
            $user->username = $request->input('username');
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = bcrypt($request->input('password'));
            $user->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            $this->response['message'] = $e->getMessage();
            $this->response_code = 500;
            goto callback;   
        }

        $this->response = [
            'status' => true,
            'status_code' => 'USER_REGISTER',
            'message' => 'Successfully registered.',
        ];
        $this->response_code = 201;

        callback:
        return response()->json($this->response,$this->response_code);
    }

    public function login(LoginRequest $request)
    {   
        try {
            $data = $this->authService->authenticate($request->validated());
            return $this->successResponse($data,200,"LOGIN_SUCCESSFUL","Login Successful");
        } catch (AuthenticationException $e){
            return $this->errorResponse(401,"INCORRECT_CREDENTIALS",$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,"SERVER_ERROR",$e->getMessage());
        }
    }

    public function check_user(Request $request)
    {
        try {
            $data = $this->authService->getUser($request->user());
            return $this->successResponse($data,200,"USER_INFO","User information");
        } catch (AuthenticationException $e){
            return $this->errorResponse(401,"UNAUTHORIZED",$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,"SERVER_ERROR","Server error");
        }
    }

    public function logout(Request $request)
    {
        try {
            $this->authService->logout($request->user());
            return $this->successResponse("",200,'LOGOUT_SUCCESSFUL','Logout Successful');
        } catch (AuthenticationException $e){
            return $this->errorResponse(401,"UNAUTHORIZED",$e->getMessage());
        } catch (\Exception $e) {
            return $this->errorResponse(500,"SERVER_ERROR","Server error");
        }
    }
}
