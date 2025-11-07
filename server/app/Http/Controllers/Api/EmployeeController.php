<?php

namespace App\Http\Controllers\Api;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\EmployeeActivity;
use App\Models\EmployeeDocument;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class EmployeeController extends Controller
{
    public function submit(Request $request)
    {
        Log::info($request->all());
        // dd($request->all());
        $request->validate([
            'name'                        => 'required|string',
            'designation'                 => 'nullable|string',
            'education_score'             => 'nullable|numeric',
            'tech_certificate_score'      => 'nullable|numeric',
            'online_certificate_score'    => 'nullable|numeric',
            'experience_external_score'   => 'nullable|numeric',
            'experience_management_score' => 'nullable|numeric',
            'experience_internal_score'   => 'nullable|numeric',
            'english_score'               => 'nullable|numeric',
            'total_score'                 => 'nullable|numeric',
            'grade'                       => 'nullable|string',
            'insurance_bracket'           => 'nullable|string',
            'bonus'                       => 'nullable|string',
            'off_days'                    => 'nullable|string',
            'education_files.*'           => 'nullable|file|max: 4096',
            'certificate_files.*'         => 'nullable|file|max: 4096',
            'excl_management_files.*'     => 'nullable|file|max: 4096',
            'management_files.*'          => 'nullable|file|max: 4096',
        ]);

        DB::beginTransaction();
        try {
            // ✅ 1) Update/Insert latest in employees table
            $employee = Employee::updateOrCreate(
                ['user_id' => auth()->id()],
                [
                    'name'                        => $request->name,
                    'designation'                 => $request->designation,
                    'education'                   => $request->education,
                    'education_score'             => $request->education_score,
                    'tech_certificate'            => $request->tech_certificate,
                    'tech_certificate_score'      => $request->tech_certificate_score,
                    'online_certificate'          => $request->online_certificate,
                    'online_certificate_score'    => $request->online_certificate_score,
                    'experience_external'         => $request->experience_external,
                    'experience_external_score'   => $request->experience_external_score,
                    'experience_management'       => $request->experience_management,
                    'experience_management_score' => $request->experience_management_score,
                    'experience_internal'         => $request->experience_internal,
                    'experience_internal_score'   => $request->experience_internal_score,
                    'english'                     => $request->english,
                    'english_score'               => $request->english_score,
                    'total_score'                 => $request->total_score,
                    'grade'                       => $request->grade,
                    'insurance_bracket'           => $request->insurance_bracket,
                    'bonus'                       => $request->bonus,
                    'off_days'                    => $request->off_days
                ]
            );

            // ✅ 2) Insert history into employee_activities
            $activity = EmployeeActivity::create([
                'employee_id'                 => $employee->id,
                'name'                        => $request->name,
                'designation'                 => $request->designation,
                'education'                   => $request->education,
                'education_score'             => $request->education_score,
                'tech_certificate'            => $request->tech_certificate,
                'tech_certificate_score'      => $request->tech_certificate_score,
                'online_certificate'          => $request->online_certificate,
                'online_certificate_score'    => $request->online_certificate_score,
                'experience_external'         => $request->experience_external,
                'experience_external_score'   => $request->experience_external_score,
                'experience_management'       => $request->experience_management,
                'experience_management_score' => $request->experience_management_score,
                'experience_internal'         => $request->experience_internal,
                'experience_internal_score'   => $request->experience_internal_score,
                'english'                     => $request->english,
                'english_score'               => $request->english_score,
                'total_score'                 => $request->total_score,
                'grade'                       => $request->grade,
                'insurance_bracket'           => $request->insurance_bracket,
                'bonus'                       => $request->bonus,
                'off_days'                    => $request->off_days,
            ]);

            $categories = [
                'education_files'       => 'education',
                'certificate_files'     => 'certificate',
                'excl_management_files' => 'excl_management',
                'management_files'      => 'experience_management',
            ];

            foreach ($categories as $inputName => $type) {
                if ($request->hasFile($inputName)) {

                    // ✅ Upload files using helper
                    $uploadedFiles = uploadEmployeeFiles(
                        $request->file($inputName),
                        $employee->id,
                        $type
                    );

                    // ✅ Save info to DB
                    foreach ($uploadedFiles as $fileInfo) {
                        EmployeeDocument::create([
                            'employee_activity_id' => $activity->id,
                            'submission_type'      => $type,
                            'file_path'            => $fileInfo['file_path'],      // stored path
                            'file_type'            => $fileInfo['file_extension'], // extension
                        ]);
                    }
                }
            }
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Record submitted successfully'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    //Employee latest record (only latest data)
    public function latest()
    {
        $employee = Employee::where('user_id', auth()->id())->first();

        if (!$employee) {
            return response()->json([
                'success' => false,
                'message' => 'No record found',
                'data' => []
            ], 404);
        }


        $latestActivity = $employee->activities()->orderBy('id', 'DESC')->first();

        if (!$latestActivity) {
            $data = [
                'employee' => $employee,
                'documents' => []
            ];
            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Record found'
            ]);
        }


        $documents = EmployeeDocument::where('employee_activity_id', $latestActivity->id)
            ->orderBy('id', 'DESC')
            ->get()
            ->groupBy('submission_type');

        $data = [
            'employee' => $employee,
            // 'latest_activity_id' => $latestActivity->id,
            'documents' => $documents
        ];
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Record found'
        ]);
    }

    // ✅ 5. Admin - employee history list
    public function history() // for admin
    {
        $history = Employee::select('id', 'name', 'designation')
            ->withCount('activities') // ← counts employee_activities
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $history,
            'message' => 'Record found'
        ], 200);
    }
}
