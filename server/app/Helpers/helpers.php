<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

if (!function_exists('greeting')) {
    function greeting($name)
    {
        return "Hello, " . $name;
    }
}


if (!function_exists('uploadEmployeeFiles')) {

    function uploadEmployeeFiles($files, $employeeId, $categoryName)
    {
        $uploadedFiles = [];

        if (!$files) {
            return $uploadedFiles;
        }

        foreach ($files as $file) {

            // Folder path: /employees/5/education/
            $path = "employees/{$employeeId}/{$categoryName}";

            // Ensure directory exists (works on live server too)
            if (!Storage::disk('public')->exists($path)) {
                Storage::disk('public')->makeDirectory($path, 0775, true);
            }

            // unique filename (avoid overwrite)
            $filename = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();

            // Actually upload
            $storedFilePath = $file->storeAs($path, $filename, 'public');

            // collect details for DB
            $uploadedFiles[] = [
                'file_name' => $filename,
                'original_name' => $file->getClientOriginalName(),
                'file_extension' => $file->getClientOriginalExtension(),
                'file_size' => $file->getSize(),
                'file_mime_type' => $file->getMimeType(),
                'file_path' => $storedFilePath, // storage path for DB
            ];
        }

        return $uploadedFiles;
    }
}

if (!function_exists('normalizeInput')) {
    function normalizeInput($value)
    {
        if (!$value) return null;
        return ucfirst(strtolower(trim($value)));
    }
}

if (!function_exists('calculateEducationScore')) {

    function calculateEducationScore($education, $verified, $relevant)
    {
        $grades     = config('constants.EDUCATION_GRADES');
        $weightage  = config('constants.WEIGHTAGE');
        $percentage = config('constants.PERCENTAGE');

        // Normalize input first-letter uppercase
        $education = ucfirst(strtolower($education));
        $verified  = ucfirst(strtolower($verified));
        $relevant  = ucfirst(strtolower($relevant));

        // Step 1: Education Grade
        $gradeValue = $grades[$education] ?? 0;

        // Max grade
        $maxGrade = max($grades);

        // Step 2: Verification %
        $verificationFactor = $percentage[$verified] ?? 0;

        // Log::info("gradeValue: $gradeValue, maxGrade: $maxGrade, verificationFactor: $verified");
        // Step 3: Relevant %
        $relevantFactor = $percentage[$relevant] ?? 0;

        // Education weightage 20%
        $eduWeight = $weightage['Education'];

        // Final Formula:
        // ((grade/max) * weightage * verification * relevant) * 100
        // Log::info("gradeValue: $gradeValue, maxGrade: $maxGrade, eduWeight: $eduWeight, verificationFactor: $verificationFactor, relevantFactor: $relevantFactor");

        $score = (($gradeValue / $maxGrade) * $eduWeight) * 100;

        return [
            'score' => round($score, 2), //weightage
            'grade' => $gradeValue
        ];
    }
}
if (!function_exists('calculateCertificateScore')) {

    function calculateCertificateScore($type, $number, $verified, $relevant)
    {
        // Log::info("type: $type, number: $number, verified: $verified, relevant: $relevant");
        $gradeMap  = config('constants.CERTIFICATE_GRADES');
        $weightage = config('constants.WEIGHTAGE')['Certificate']; // 0.20

        // Normalize input
        $type = ucfirst(strtolower($type));
        $number = (int) $number;

        // Validation
        if (!isset($gradeMap[$type][$number])) {
            return 0; // invalid value
        }

        // Selected value
        $selectedGrade = $gradeMap[$type][$number];

        // Max value inside that type
        $maxGrade = max($gradeMap['High']);

        // Log::info("type: $type, number: $number, selectedGrade: $selectedGrade, maxGrade: $maxGrade, weightage: $weightage");
        // Formula:
        // (selected / max) * weightage * 100
        $score = ($selectedGrade / $maxGrade) * $weightage * 100;

        return [
            'score' => round($score, 2),
            'grade' => $selectedGrade
        ];
    }
}
if (!function_exists('calculateExternalExperienceScore')) {

    function calculateExternalExperienceScore($years)
    {
        $gradeMap  = config('constants.EXTERNAL_EXPERIENCE_GRADES');
        $weightage = config('constants.WEIGHTAGE')['External experience']; // 0.20

        if ($years == 'None') {
            $years = 0;
        }
        $years = (int) $years;

        if (!isset($gradeMap[$years])) {
            return 0; // invalid or out of range
        }

        $selectedGrade = $gradeMap[$years];

        // Maximum possible grade is highest value in array (15)
        $maxGrade = max($gradeMap);
        Log::info("external");
        Log::info("selectedGrade: $selectedGrade, maxGrade: $maxGrade, weightage: $weightage");

        $score = ($selectedGrade / $maxGrade) * $weightage * 100;

        Log::info("score: $score");
        Log::info("grade: $selectedGrade");

        return [
            'score' => round($score, 2),
            'grade' => $selectedGrade
        ];
    }
}

if (!function_exists('calculateManagementExperienceScore')) {

    function calculateManagementExperienceScore($years)
    {
        $gradeMap  = config('constants.MANAGEMENT_EXPERIENCE_GRADES');
        $weightage = config('constants.WEIGHTAGE')['Management experience']; // 0.25

        if ($years == 'None') {
            $years = 0;
        }

        $years = (int) $years;

        if (!isset($gradeMap[$years])) {
            return 0; // invalid or out of range
        }

        $selectedGrade = $gradeMap[$years];

        // Max possible grade (20)
        $maxGrade = max($gradeMap);

        // Formula:
        // (selected / max) * weightage * 100
        $score = ($selectedGrade / $maxGrade) * $weightage * 100;

        return [
            'score' => round($score, 2),
            'grade' => $selectedGrade
        ];
    }
}
if (!function_exists('calculateEnglishScore')) {

    function calculateEnglishScore($level)
    {
        $gradeMap  = config('constants.ENGLISH_GRADES');
        $weightage = config('constants.WEIGHTAGE')['English']; // 0.15

        // Normalize input
        $level = ucfirst(strtolower($level));

        if (!isset($gradeMap[$level])) {
            return 0; // invalid input
        }

        $selectedGrade = $gradeMap[$level];

        $maxGrade = max($gradeMap);

        // Formula: (selected / max) * weightage * 100
        $score = ($selectedGrade / $maxGrade) * $weightage * 100;

        return [
            'score' => round($score, 2),
            'grade' => $selectedGrade
        ];
    }
}

if (!function_exists('CalculateScores')) {

    /**
     * Calculate final scores for an employee object
     * @param object $employee Employee object with all required fields
     * @return array $result
     */
    function CalculateScores($employee)
    {
        $result = [];
        $percentage = config('constants.PERCENTAGE');
        // -------------------------
        // Education Score
        // -------------------------
        if (isset($employee->education)) {

            $educationStep = calculateEducationScore($employee->education, $employee->education_verified, $employee->education_relevant);



            $educationVerified = normalizeInput($employee->education_verified);
            $educationRelevant = normalizeInput($employee->education_relevant);

            $verificationFactor = $percentage[$educationVerified] ?? 0;
            $relevantFactor = $percentage[normalizeInput($educationRelevant)] ?? 0;

            $result['education'] = [
                'grade'     => $educationStep['grade'],
                'score' => round($educationStep['score'] * $verificationFactor * $relevantFactor, 2)
            ];

            // Log::info("educationStep: $educationStep, verificationFactor: $verificationFactor, relevantFactor: $relevantFactor");
            // Log::info($result['education']);
        }

        // -------------------------
        // Certificate Score
        // -------------------------
        if (isset($employee->certificate_low)) {

            $certificateLowStep = calculateCertificateScore('low', $employee->certificate_low, $employee->certificate_verified, $employee->certificate_relevant);
            $certificateMediumStep = calculateCertificateScore('medium', $employee->certificate_medium, $employee->certificate_verified, $employee->certificate_relevant);
            $certificateHighStep = calculateCertificateScore('high', $employee->certificate_high, $employee->certificate_verified, $employee->certificate_relevant);

            // Log::info($certificateLowStep);
            $sumCertificates = $certificateLowStep['score'] + $certificateMediumStep['score'] + $certificateHighStep['score'];

            $certificateVerified = normalizeInput($employee->certificate_verified);
            $certificateRelevant = normalizeInput($employee->certificate_relevant);

            $verificationFactor = $percentage[$certificateVerified] ?? 0;
            $relevantFactor = $percentage[$certificateRelevant] ?? 0;

            $result['certifications'] = [
                'grade'     => $certificateLowStep['grade'] + $certificateMediumStep['grade'] + $certificateHighStep['grade'],
                'score' => round($sumCertificates * $verificationFactor * $relevantFactor, 2),

                'low' => $certificateLowStep['score'],
                'medium' => $certificateMediumStep['score'],
                'high' => $certificateHighStep['score']
            ];

            // Log::info("certificateLowStep: $certificateLowStep, certificateMediumStep: $certificateMediumStep, certificateHighStep: $certificateHighStep");
            // Log::info("certificateStep: $sumCertificates, verificationFactor: $verificationFactor, relevantFactor: $relevantFactor");
            // Log::info($result['certificate']);
        }

        // -------------------------
        // External Experience Score
        // -------------------------
        if (isset($employee->experience_external)) {

            $internalGrades = config('constants.INTERNAL_EXPERIENCE_GRADES');
            $years = $employee->experience_external;
            $internal = $employee->experience_internal;
            // Handle external
            if ($years == 'none') {
                $years = 0;
            }
            $years = (int) $years;
            // New Logic for Internal Experience
            $count = 0;

            if ($internal !== null && $internal !== 'none') {

                // Convert internal input to integer key
                $internalKey = (int) $internal;

                // Check if key exists in INTERNAL_EXPERIENCE_GRADES
                if (array_key_exists($internalKey, $internalGrades)) {

                    // Get grade mapped value
                    $gradeValue = $internalGrades[$internalKey];

                    // Log::info("gradeValue: $gradeValue");

                    // Round up if decimal point
                    // e.g. 1.5 → 2, 2.5 → 3, 3.5 → 4
                    $count = (int) ceil($gradeValue);
                }
            }

            $experienceExternal = calculateExternalExperienceScore($years + $count); //if internal is not null then count is 1 add in external years

            $experienceVerified = normalizeInput($employee->experience_external_verified);
            $verificationFactor = $percentage[$experienceVerified] ?? 0;

            $result['external_experience'] = [
                'grade'     => $experienceExternal['grade'],
                'score' => round($experienceExternal['score'] * $verificationFactor, 2)
            ];

            // Log::info(" years: $years, experienceExternal: $experienceExternal, verificationFactor: $verificationFactor");
            // Log::info($result['external_experience']);
        }

        // -------------------------
        // External Experience Management Score
        // -------------------------
        if (isset($employee->experience_management)) {


            $internalGrades = config('constants.INTERNAL_EXPERIENCE_GRADES');
            $years = $employee->experience_management;
            $internal = $employee->experience_internal_management;
            // Handle external
            if ($years == 'none') {
                $years = 0;
            }
            $years = (int) $years;
            // New Logic for Internal Experience
            $count = 0;

            if ($internal !== null && $internal !== 'none') {

                // Convert internal input to integer key
                $internalKey = (int) $internal;

                // Check if key exists in INTERNAL_EXPERIENCE_GRADES
                if (array_key_exists($internalKey, $internalGrades)) {

                    // Get grade mapped value
                    $gradeValue = $internalGrades[$internalKey];

                    // Log::info("gradeValue: $gradeValue");

                    // Round up if decimal point
                    // e.g. 1.5 → 2, 2.5 → 3, 3.5 → 4
                    $count = (int) ceil($gradeValue);
                }
            }

            $experienceExternalManagement = calculateManagementExperienceScore($years + $count); //if internal is not null then count is 1 add in external years

            $experienceVerified = normalizeInput($employee->experience_external_verified);
            $verificationFactor = $percentage[$experienceVerified] ?? 0;

            $result['management'] = [
                'grade'     => $experienceExternalManagement['grade'],
                'score' => round($experienceExternalManagement['score'] * $verificationFactor, 2)
            ];

            // Log::info(" years: $years, experienceExternalManagement: $experienceExternalManagement, verificationFactor: $verificationFactor");
            // Log::info($result['external_experience_management']);
        }

        // -------------------------
        // English Score
        // -------------------------
        if (isset($employee->english)) {

            $englishStep = calculateEnglishScore($employee->english);

            $result['english'] = [
                'grade'     => $englishStep['grade'],
                'score' => round($englishStep['score'], 2)
            ];
        }

        // ✅ Calculate Final Totals
        $totalGrade = 0;
        $totalScore = 0;

        foreach ($result as $item) {
            $totalGrade += $item['grade'] ?? 0;
            $totalScore += $item['score'] ?? 0;
        }

        // ✅ Add totals to response
        $result['total'] = [
            'grade' => round($totalGrade, 2),
            'score' => round($totalScore, 2)
        ];

        $grade = round($totalScore, 2);

        $result['rewards'] = [
            'insurance' => getInsuranceBracket($grade),
            'bonus'     => getBonusCategory($grade),
            'days_off'  => getDaysOff($grade),
        ];

        $result['recommended_designation'] = getRecommendedDesignation($result['total']['score']);


        // Log::info($result);

        return $result;
    }
}
if (!function_exists('getInsuranceBracket')) {

    function getInsuranceBracket($grade)
    {
        $levels = config('constants.INSURANCE_BRACKETS');

        $result = 'No Insurance';

        foreach ($levels as $name => $minGrade) {
            if ($grade >= $minGrade) {
                $result = $name;
            }
        }

        return $result;
    }
}
if (!function_exists('getBonusCategory')) {

    function getBonusCategory($grade)
    {
        if ($grade < 27) {
            return 'Not Eligible';
        }

        $levels = config('constants.BONUS_BRACKETS');
        $result = 'Not Eligible';

        foreach ($levels as $name => $minGrade) {
            if ($grade >= $minGrade) {
                $result = $name;
            }
        }

        return $result;
    }
}
if (!function_exists('getDaysOff')) {

    function getDaysOff($grade)
    {
        if ($grade < 66) {
            return 'Not Eligible';
        }

        $levels = config('constants.DAYSOFF_BRACKETS');
        $result = 'Not Eligible';

        foreach ($levels as $name => $minGrade) {
            if ($grade >= $minGrade) {
                $result = $name;
            }
        }

        return $result;
    }
}
if (!function_exists('getRecommendedDesignation')) {

    function getRecommendedDesignation($score)
    {
        $map = config('constants.DESIGNATIONS');

        // Sort keys descending, so highest match picked first
        krsort($map);

        foreach ($map as $minScore => $designation) {
            if ($score >= $minScore) {
                return [
                    'main' => $designation['main'],
                    'sub'  => $designation['sub'],
                    'grade' => $designation['grade']
                ];
            }
        }

        return [
            'main' => 'Not Eligible',
            'sub'  => null,
            'grade' => null
        ];
    }
}
