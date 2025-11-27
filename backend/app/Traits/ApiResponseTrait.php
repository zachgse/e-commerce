<?php

namespace App\Traits;

use Str;

trait ApiResponseTrait 
{
    protected function successResponse($data=[],$status_code=200,$msg="Success Response")
    {
        return response()->json([
            'data' => $data,
            'status' => true,
            'status_code' => $this->generateStatusCodeKey($msg),
            'msg' => $msg
        ],$status_code);
    }

    protected function paginatedResponse($data=[],$status_code=200,$msg="Success Response")
    {
        
        $response = $data->additional([
            'status' => true,
            'status_code' => $this->generateStatusCodeKey($msg),
            'msg' => $msg
        ])->response()->getData(true);
        return response()->json($response,$status_code);
    }

    protected function errorResponse($status_code=400,$msg="Bad Request")
    {
        return response()->json([
            'status' => false,
            'status_code' => $this->generateStatusCodeKey($msg),
            'msg' => $msg
        ],$status_code);
    }    

    private function generateStatusCodeKey(string $msg)
    {
        return Str::upper(str_replace(" ","_",$msg));
    }
}