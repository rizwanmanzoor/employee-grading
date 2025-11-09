<?php

namespace App\Http\Controllers;

// use App\Models\User;
// use App\Models\Employee;
// use Illuminate\Support\Str;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Hash;
// use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportController extends Controller
{
    /**
     * Read Excel file from storage/app/uploads and import to users & employees tables.
     *
     * @param string $filename  // relative to storage/app/uploads, e.g. 'employees.xlsx'
     * @return \Illuminate\Http\JsonResponse
     */
    //     public function importFromUploads($filename)
    //     {

    //         try {
    //             $path = storage_path('app/uploads/employees.xlsx');

    //             // ✅ STEP 1: Check file exists
    //             if (!file_exists($path)) {
    //                 dd("File NOT found at: " . $path);
    //             }

    //             // ✅ STEP 2: Load Excel
    //             $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($path);

    //             // ✅ STEP 3: Get sheet
    //             $sheet = $spreadsheet->getActiveSheet();

    //             // ✅ STEP 4: Convert rows to array
    //             $rows = $sheet->toArray(null, true, true, true);

    //             for ($i = 2; $i <= count($rows); $i++) {

    //                 $emp_no     = $rows[$i]['A'] ?? null;
    //                 $name       = $rows[$i]['B'] ?? null;
    //                 $email      = $rows[$i]['C'] ?? null;
    //                 $designation = $rows[$i]['D'] ?? null;

    //                 if (empty($email) && !empty($name)) {
    //                     $email = strtolower(str_replace(' ', '', $name)) . '@gmail.com';
    //                 }

    //                 $user = User::firstOrCreate(
    //                     ['email' => $email],
    //                     [
    //                         'name' => $name,
    //                         'password' => bcrypt('123456')
    //                     ]
    //                 );
    //                 $user->assignRole('employee');

    //                 Employee::updateOrCreate(
    //                     ['employee_no' => $emp_no],
    //                     [
    //                         'user_id' => $user->id,
    //                         'name' => $name,
    //                         'designation' => $designation
    //                     ]
    //                 );
    //             }
    //         } catch (\Exception $e) {
    //             dd("Error: " . $e->getMessage());
    //         }
    //     }
}
