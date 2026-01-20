<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{env('APP_NAME')}} - @yield('title')</title>

    <style>
        body {
            font-family: "Calibri", sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        table {
            margin: auto;
        }   
    </style>
</head>
<body>
    <table style="width:500px; border:1px solid #323232; padding:15px;">
        @yield('content')
        <tr>
            <td>
                If you have any inquiries, please feel free to contact us through
            </td>
        </tr>
        <tr>
            <td>
                Regards, <br /> {{env('APP_NAME')}} Team
            </td>
        </tr>
        <tfoot>
            <td>
                &copy; {{ date('Y') }} {{env('APP_NAME')}} <br/> All Rights Reserved.
            </td>
        </tfoot>
    </table>
</body>
</html>