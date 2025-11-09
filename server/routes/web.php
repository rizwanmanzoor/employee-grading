<?php

use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImportController;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/import-excel/{filename}', [ImportController::class, 'importFromUploads']);

// Route::get('/dashboard', function () {
//     $role = Role::where('name', 'employee')->first();

//     $users = User::get();

//     $userIds = [1, 2];

//     foreach ($users as $user) {
//         $user = User::where('id', $user->id)->where('id', '!=', 1)->where('id', '!=', 2)->first();
//         if ($user) {
//             $user->syncRoles([$role->name]); // replace existing roles with 'employee'
//             Log::info("User: " . $user->name . " has been assigned role: " . $role->name);
//         }
//     }
// });
