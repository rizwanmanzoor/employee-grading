<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
    <style>
        body {
            background: #eef1f7;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Arial, sans-serif;
        }

        .container {
            max-width: 520px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #343a40, #596169);
            padding: 25px;
            text-align: center;
            color: #fff;
        }

        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 600;
        }

        .content {
            padding: 30px;
            color: #333;
        }

        .content p {
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 18px;
        }

        .otp-box {
            text-align: center;
            background: #f2f6ff;
            padding: 18px 0;
            border-radius: 12px;
            border: 1px dashed #343a40;
            margin: 25px 0;
        }

        .otp-box span {
            font-size: 38px;
            font-weight: 700;
            color: #343a40;
            letter-spacing: 4px;
        }

        .footer {
            background: #f7f7f7;
            padding: 18px;
            text-align: center;
            font-size: 13px;
            color: #666;
        }
    </style>
</head>

<body>

<div class="container">
    <div class="header">
        <h1>Your OTP Code</h1>
    </div>

    <div class="content">
        <p>Hello <b>{{ $username }}</b>,</p>
        <p>We received a request to verify your login. Please use the OTP code below:</p>

        <div class="otp-box">
            <span>{{ $otp }}</span>
        </div>

        <p>This code will expire in <b>5 minutes</b>. If you didn’t request this, you can safely ignore this email.</p>
        <p>Regards,<br><b>Support Team</b></p>
    </div>

    <div class="footer">
        © {{ date('Y') }} Nox Group. All rights reserved.
    </div>
</div>

</body>
</html>
