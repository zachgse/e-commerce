@extends('email')

@section('title')
One Time Password
@endsection

@section('content')
<tr>
    <td>Hello {{$name}}</td>
</tr>
<tr>
    <td>Thank you for joining us. Here is your OTP (One Time Password) for email verification:</td>
</tr>
<tr>
    <td>
        <p style="font-size: 20px;"><b>{{$otp->code}}</b></p>
    </td>
</tr>
@endsection