<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

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

}
