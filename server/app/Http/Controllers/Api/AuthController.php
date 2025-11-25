<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Employee;
use App\Mail\SendOtpMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username'    => 'required',
            'password' => 'required'
        ]);

        // Check if input is email or username
        $loginType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';


        if (!Auth::attempt([$loginType => $request->username, 'password' => $request->password])) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user = Auth::user()->load('employee', 'roles');

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    }
    public function logout()
    {
        auth()->logout();
        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    public function changePassword(Request $request)
    {
        try {
            // 🔹 Validate input
            $validated = $request->validate([
                'id' => 'required|integer|exists:employees,id',
                'password' => 'required|string|min:6',
            ]);

            // 🔹 Find the employee
            $employee = Employee::find($validated['id']);

            // 🔹 If employee has a user record (common in setups with user table)
            if (!$employee || !$employee->user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User account not found for this employee.',
                ], 404);
            }

            // 🔹 Update the password
            $employee->user->password = bcrypt($validated['password']);
            $employee->user->save();

            return response()->json([
                'success' => true,
                'message' => 'Password changed successfully.',
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function sendOtp(Request $request)
    {
        $request->validate([
            'username' => 'required'
        ]);

        try {
        // find user by email or username
        $loginType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $user = User::where($loginType, $request->username)->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        // -----------------------------
        // Generate OTP (YOUR LOGIC FIXED)
        // -----------------------------
        $baseString = $user->id . config('app.key') . time(); // time() ensures OTP always changes

        $hash = crc32($baseString);

        // Make sure number is positive
        if ($hash < 0) {
            $hash = $hash * -1;
        }

        // Convert to 6-digit OTP padded with zeros
        $otp = str_pad($hash % 1000000, 6, '0', STR_PAD_LEFT);
        // Saudi Time (Asia/Riyadh)
        $expiry = now()->timezone('Asia/Riyadh')->addMinutes(5);
        // save otp and expiry
        $user->otp = $otp;
        $user->otp_expires_at = $expiry;
        $user->save();

        // send email
        Mail::to($user->email)->send(new SendOtpMail($otp, $user->name));

        return response()->json([
            'status' => true,
            'message' => 'OTP sent to your email'
        ]);

        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong: ' . $e->getMessage(),
            ], 500);
        }
    }


    public function verifyOtp(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'otp' => 'required'
        ]);

        try {
            $loginType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

            $user = User::where($loginType, $request->username)->first();

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found'
                ], 404);
            }

            if ($user->otp !== $request->otp) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid OTP'
                ], 401);
            }

            // Use Saudi Arabia timezone for expiry check
            $saudiNow = now()->timezone('Asia/Riyadh');

            if ($saudiNow->greaterThan($user->otp_expires_at)) {
                return response()->json([
                    'status' => false,
                    'message' => 'OTP has been expired'
                ], 401);
            }

            // OTP verified — load relations
            $user->load('employee', 'roles');
            
            // OTP correct => login user
            $token = $user->createToken('api_token')->plainTextToken;

            // clear OTP so it can't be reused
            $user->otp = null;
            $user->otp_expires_at = null;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'token' => $token,
                'user' => $user
            ]);

        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function resendOtp(Request $request)
    {
        $request->validate([
            'username' => 'required'
        ]);

        try{
            $loginType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
            $user = User::where($loginType, $request->username)->first();

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not found'
                ], 404);
            }

            // Saudi time now
            $saudiNow = now()->timezone('Asia/Riyadh');

        // ✅ Convert to Carbon instance (IMPORTANT)
            $otpExpiresAt = $user->otp_expires_at 
                ? Carbon::parse($user->otp_expires_at)->timezone('Asia/Riyadh')
                : null;

            // Prevent spamming → allow resend only after 60 sec
            if ($otpExpiresAt && $otpExpiresAt->subMinutes(4)->greaterThan($saudiNow)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Please wait before requesting another OTP'
                ], 429);
            }

            // Generate new OTP (6-digit, padded)
            $baseString = $user->id . config('app.key') . time();
            $hash = crc32($baseString);
            if ($hash < 0) $hash = $hash * -1;
            $otp = str_pad($hash % 1000000, 6, '0', STR_PAD_LEFT);

            // Save OTP and expiry in Saudi time
            $user->otp = $otp;
            $user->otp_expires_at = $saudiNow->copy()->addMinutes(5);
            $user->save();

            // Send email
            Mail::to($user->email)->send(new SendOtpMail($otp, $user->name));

            return response()->json([
                'status' => true,
                'message' => 'A new OTP has been sent to your email'
            ]);

        } catch (\Exception $e) {
            Log::info($e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong: ' . $e->getMessage(),
            ], 500);
        }
    }

}
