<?php

namespace App\Services;

use Illuminate\Validation\Validator;

use App\Models\{User,Product};

class CustomValidator extends Validator 
{
    public function validateUniqueUsername($attribute,$value,$parameters)
    {
        //parameters are passed into request
        //common approach is validation_name:{id},type/model > unique_username:{id},user
        //value is the actual value passed 
        //attribute?? 
        $id = $parameters[0] ?? 0;

        return User::whereNot('id',$id)
                    ->where('username',$value)
                    ->where('status','active')
                    ->count() ? FALSE : TRUE;
    }

    public function validateUniqueEmail($attribute,$value,$parameters)
    {
        $id = $parameters[0] ?? 0;

        return User::whereNot('id')
                    ->where('email',$value)
                    ->where('status','active')
                    ->count() ? FALSE : TRUE;
    }
}