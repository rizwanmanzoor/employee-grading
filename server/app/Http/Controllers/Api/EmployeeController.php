<?php

namespace App\Http\Controllers\Api;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\EmployeeActivity;
use App\Models\EmployeeDocument;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

use App\Exports\EmployeesExport;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeController extends Controller
{
    public function submit(Request $request)
    {
        // Log::info($request->all());

        $steps = $request->all();

        // selectedOption ko alag handle karo
        $selectedOption = $steps['landing_gateway'] ?? null;

        // Log::info($selectedOption);
        // remove it from steps before looping
        unset($steps['landing_gateway']);

        DB::beginTransaction();

        // $validateEmployee = Employee::where('user_id', auth()->id())
        //     ->where('application_gateway', 'grading')->first();
        // if ($validateEmployee) {
        //     return response()->json([
        //         'success' => false,
        //         'error' => "You have already submitted your final application. If you want to reapply, please contact HR."
        //     ], 400);
        // }

        try {
            // Extract data from steps safely
            $educationStep = $steps['step1'] ?? [];
            $certificateStep = $steps['step2'] ?? [];
            $externalStep = $steps['step3'] ?? [];
            $managementStep = $steps['step4'] ?? [];
            $englishStep = $steps['step5'] ?? [];
            $internalStep = $steps['step6'] ?? [];
            $internalManagementStep = $steps['step7'] ?? [];

            Log::info([
                'education'                   => $educationStep['education'] ?? null,
                'education_verified'          => $educationStep['verifiedSelected'] ?? "unverified",
                'education_relevant'          => $educationStep['relevantSelected'] ?? "irrelevant",

                // Certification
                'certificate_low'        => $certificateStep['low'] ?? null,
                'certificate_medium'     => $certificateStep['medium'] ?? null,
                'certificate_high'       => $certificateStep['high'] ?? null,

                'certificate_verified'   => $certificateStep['verifiedSelected'] ?? "unverified",
                'certificate_relevant'   => $certificateStep['relevantSelected'] ?? "irrelevant",

                // Experience - External (Excl Management)
                'experience_external'   => $externalStep['value'] ?? null,
                'experience_external_verified' => $externalStep['verifiedSelected'] ?? "unverified",

                // Experience external   - Management
                'experience_management' => $managementStep['value'] ?? null,
                'experience_management_verified' => $managementStep['verifiedSelected'] ?? "unverified",
                'experience_management_relevant' => $managementStep['relevantSelected'] ?? "irrelevant",


                // English
                'english'               => $englishStep['value'] ?? null,

                // Experience - Internal (Excl Management)
                'experience_internal'   => $internalStep['value'] ?? null,

                // Experience - Internal Management
                'experience_internal_management' => $internalManagementStep['experience'] ?? null,
                'experience_internal_management_verified' => $internalManagementStep['verifiedSelected'] ?? "unverified",
            ]);

            // Create or update employee record
            $employee = Employee::updateOrCreate(
                ['user_id' => auth()->id()],
                [
                    'name'                        => auth()->user()->name ?? 'N/A',
                    // 'designation'                 => $request->designation ?? null,

                    // Education
                    'education'                   => $educationStep['education'] ?? null,
                    'education_verified'          => $educationStep['verifiedSelected'] ?? "unverified",
                    'education_relevant'          => $educationStep['relevantSelected'] ?? "irrelevant",

                    // Certification
                    'certificate_low'        => $certificateStep['low'] ?? null,
                    'certificate_medium'     => $certificateStep['medium'] ?? null,
                    'certificate_high'       => $certificateStep['high'] ?? null,

                    'certificate_verified'   => $certificateStep['verifiedSelected'] ?? "unverified",
                    'certificate_relevant'   => $certificateStep['relevantSelected'] ?? "irrelevant",

                    // Experience - External (Excl Management)
                    'experience_external'   => $externalStep['value'] ?? null,
                    'experience_external_verified' => $externalStep['verifiedSelected'] ?? "unverified",

                    // Experience external   - Management
                    'experience_management' => $managementStep['value'] ?? null,
                    'experience_management_verified' => $managementStep['verifiedSelected'] ?? "unverified",
                    'experience_management_relevant' => $managementStep['relevantSelected'] ?? "irrelevant",


                    // English
                    'english'               => $englishStep['value'] ?? null,

                    // Experience - Internal (Excl Management)
                    'experience_internal'   => $internalStep['value'] ?? null,

                    // Experience - Internal Management
                    'experience_internal_management' => $internalManagementStep['experience'] ?? null,
                    'experience_internal_management_verified' => $internalManagementStep['verifiedSelected'] ?? "unverified",
                    'application_gateway' => $selectedOption
                ]
            );

            // education score calculation

            $EducationScore = calculateEducationScore($employee->education, $employee->education_verified, $employee->education_relevant);

            $certificateLowScore       = calculateCertificateScore('low', $employee->certificate_low, $employee->certificate_verified, $employee->certificate_relevant);
            $certificateMediumScore    = calculateCertificateScore('medium', $employee->certificate_medium, $employee->certificate_verified, $employee->certificate_relevant);
            $certificateHighScore      = calculateCertificateScore('high', $employee->certificate_high, $employee->certificate_verified, $employee->certificate_relevant);

            $externalExperienceScore   = calculateExternalExperienceScore($employee->experience_external);

            $managementExperienceScore = calculateManagementExperienceScore($employee->experience_management);

            $englishScore              = calculateEnglishScore($employee->english);


            $employee->education_score             = $EducationScore['score'];
            $employee->certificate_low_score       = $certificateLowScore['score'];
            $employee->certificate_medium_score    = $certificateMediumScore['score'];
            $employee->certificate_high_score      = $certificateHighScore['score'];

            $employee->experience_external_score   = $externalExperienceScore['score'];
            $employee->experience_management_score = $managementExperienceScore['score'];

            $employee->english_score                = $englishScore['score'];


            $employee->save();

            // Log activity history
            $activity = EmployeeActivity::create([
                'employee_id'                             => $employee->id,
                'name'                                    => $employee->name,
                'employee_no'                             => $employee->employee_no,
                'designation'                             => $employee->designation,

                'education'                               => $employee->education,
                'education_verified'                      => $employee->education_verified,
                'education_relevant'                      => $employee->education_relevant,

                'certificate_low'                         => $employee->certificate_low,
                'certificate_medium'                      => $employee->certificate_medium,
                'certificate_high'                        => $employee->certificate_high,
                'certificate_verified'                    => $employee->certificate_verified,
                'certificate_relevant'                    => $employee->certificate_relevant,

                'experience_external'                     => $employee->experience_external,
                'experience_external_verified'            => $employee->experience_external_verified,

                'experience_management'                   => $employee->experience_management,
                'experience_management_verified'          => $employee->experience_management_verified,
                'experience_management_relevant'          => $employee->experience_management_relevant,

                'english'                                 => $employee->english,
                'experience_internal'                     => $employee->experience_internal,
                'experience_internal_management'          => $employee->experience_internal_management,
                'experience_internal_management_verified' => $employee->experience_internal_management_verified,
                'application_gateway'                     => $selectedOption
            ]);

            // Map steps to document types for file uploads
            $categories = [
                'step1' => 'education',
                'step2' => 'certificate',
                'step3' => 'experience_external',
                'step4' => 'experience_management',
                'step6' => 'experience_internal',
                'step7' => 'experience_internal_management',
            ];

            // Loop through steps
            foreach ($steps as $stepKey => $stepData) {

                // Save non-file data to DB or activity (optional)
                foreach ($stepData as $field => $value) {
                    if ($field !== 'files') {
                    }
                }

                // Handle files if step is in categories
                if (isset($categories[$stepKey]) && isset($stepData['files']) && is_array($stepData['files'])) {
                    $type = $categories[$stepKey];
                    $files = $stepData['files']; // UploadedFile objects from FormData

                    $uploadedFiles = uploadEmployeeFiles($files, $employee->id, $type);

                    // Save uploaded files to DB
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
                'message' => 'Record submitted successfully',
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Submit error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // public function submit(Request $request)
    // {
    //     Log::info($request->all());
    //     // dd($request->all());
    //     $request->validate([
    //         'name'                        => 'required|string',
    //         'designation'                 => 'nullable|string',
    //         'education_score'             => 'nullable|numeric',
    //         'tech_certificate_score'      => 'nullable|numeric',
    //         'online_certificate_score'    => 'nullable|numeric',
    //         'experience_external_score'   => 'nullable|numeric',
    //         'experience_management_score' => 'nullable|numeric',
    //         'experience_internal_score'   => 'nullable|numeric',
    //         'english_score'               => 'nullable|numeric',
    //         'total_score'                 => 'nullable|numeric',
    //         'grade'                       => 'nullable|string',
    //         'insurance_bracket'           => 'nullable|string',
    //         'bonus'                       => 'nullable|string',
    //         'off_days'                    => 'nullable|string',
    //         'education_files.*'           => 'nullable|file|max: 4096',
    //         'certificate_files.*'         => 'nullable|file|max: 4096',
    //         'excl_management_files.*'     => 'nullable|file|max: 4096',
    //         'management_files.*'          => 'nullable|file|max: 4096',
    //     ]);

    //     DB::beginTransaction();
    //     try {
    //         // ✅ 1) Update/Insert latest in employees table
    //         $employee = Employee::updateOrCreate(
    //             ['user_id' => auth()->id()],
    //             [
    //                 'name'                        => $request->name,
    //                 'designation'                 => $request->designation,
    //                 'education'                   => $request->education,
    //                 'education_score'             => $request->education_score,
    //                 'tech_certificate'            => $request->tech_certificate,
    //                 'tech_certificate_score'      => $request->tech_certificate_score,
    //                 'online_certificate'          => $request->online_certificate,
    //                 'online_certificate_score'    => $request->online_certificate_score,
    //                 'experience_external'         => $request->experience_external,
    //                 'experience_external_score'   => $request->experience_external_score,
    //                 'experience_management'       => $request->experience_management,
    //                 'experience_management_score' => $request->experience_management_score,
    //                 'experience_internal'         => $request->experience_internal,
    //                 'experience_internal_score'   => $request->experience_internal_score,
    //                 'english'                     => $request->english,
    //                 'english_score'               => $request->english_score,
    //                 'total_score'                 => $request->total_score,
    //                 'grade'                       => $request->grade,
    //                 'insurance_bracket'           => $request->insurance_bracket,
    //                 'bonus'                       => $request->bonus,
    //                 'off_days'                    => $request->off_days
    //             ]
    //         );

    //         // ✅ 2) Insert history into employee_activities
    //         $activity = EmployeeActivity::create([
    //             'employee_id'                 => $employee->id,
    //             'name'                        => $request->name,
    //             'designation'                 => $request->designation,
    //             'education'                   => $request->education,
    //             'education_score'             => $request->education_score,
    //             'tech_certificate'            => $request->tech_certificate,
    //             'tech_certificate_score'      => $request->tech_certificate_score,
    //             'online_certificate'          => $request->online_certificate,
    //             'online_certificate_score'    => $request->online_certificate_score,
    //             'experience_external'         => $request->experience_external,
    //             'experience_external_score'   => $request->experience_external_score,
    //             'experience_management'       => $request->experience_management,
    //             'experience_management_score' => $request->experience_management_score,
    //             'experience_internal'         => $request->experience_internal,
    //             'experience_internal_score'   => $request->experience_internal_score,
    //             'english'                     => $request->english,
    //             'english_score'               => $request->english_score,
    //             'total_score'                 => $request->total_score,
    //             'grade'                       => $request->grade,
    //             'insurance_bracket'           => $request->insurance_bracket,
    //             'bonus'                       => $request->bonus,
    //             'off_days'                    => $request->off_days,
    //         ]);

    //         $categories = [
    //             'education_files'       => 'education',
    //             'certificate_files'     => 'certificate',
    //             'excl_management_files' => 'excl_management',
    //             'management_files'      => 'experience_management',
    //         ];

    // foreach ($categories as $inputName => $type) {
    //     if ($request->hasFile($inputName)) {

    //         // ✅ Upload files using helper
    //         $uploadedFiles = uploadEmployeeFiles(
    //             $request->file($inputName),
    //             $employee->id,
    //             $type
    //         );

    //         // ✅ Save info to DB
    //         foreach ($uploadedFiles as $fileInfo) {
    //             EmployeeDocument::create([
    //                 'employee_activity_id' => $activity->id,
    //                 'submission_type'      => $type,
    //                 'file_path'            => $fileInfo['file_path'],      // stored path
    //                 'file_type'            => $fileInfo['file_extension'], // extension
    //             ]);
    //         }
    //     }
    // }
    //         DB::commit();
    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Record submitted successfully'
    //         ], 200);
    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         return response()->json([
    //             'success' => false,
    //             'message' => $e->getMessage()
    //         ], 500);
    //     }
    // }

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
        $history = Employee::select('id', 'name', 'designation', 'user_id')
            ->with(['user:id,username,email'])
            ->withCount('activities') // ← counts employee_activities
            ->orderBy('name', 'ASC')
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $history,
            'message' => 'Record found'
        ], 200);
    }

    public function scores(Request $request)
    {
        try {
            $employee = Employee::where('user_id', auth()->id())->first();
            $calculateScores = CalculateScores($employee);

            $data = [
                'employee' => $employee,
                'calculateScores' => $calculateScores
            ];
            return response()->json([
                'success' => true,
                'data'    => $data,
                'message' => 'Record found'
            ], 200);
        } catch (\Exception $e) {
            Log::info($e);
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
    public function export(Request $request)
    {
        // Optional: add auth checks here if needed, e.g. $this->authorize('export', EmployeeActivity::class);

        // Filename can be dynamic if you like
        return Excel::download(new EmployeesExport, 'employees.xlsx');
    }
}
