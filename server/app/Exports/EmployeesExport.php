<?php

namespace App\Exports;

use App\Models\Employee;
use App\Models\EmployeeActivity;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class EmployeesExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    // public function collection()
    // {
    //     // Ensure calculations are updated before exporting
    //     $employees = EmployeeActivity::get();



    //     foreach ($employees as $employee) {

    //         $data = calculateScores($employee); // 👈 your helper function

    //         Log::info($data);
    //         // ✅ Set calculated scores to dynamic fields
    //         // $employee->education_grade = $data['education']['grade'];
    //         $employee->education_score = $data['education']['score'];

    //         $employee->certificate_low_score = $data['certifications']['low'];
    //         $employee->certificate_medium_score = $data['certifications']['medium'];
    //         $employee->certificate_high_score = $data['certifications']['high'];

    //         // $employee->external_grade = $data['external_experience']['grade'];
    //         $employee->experience_external_score = $data['external_experience']['score'];

    //         // $employee->management_grade = $data['management']['grade'];
    //         $employee->management_management_score = $data['management']['score'];

    //         // $employee->english_grade = $data['english']['grade'];
    //         $employee->english_score = $data['english']['score'];

    //         // ✅ Total
    //         // $employee->total_grade = $data['total']['grade'];
    //         $employee->total_score = $data['total']['score'];

    //         // ✅ Rewards
    //         $employee->insurance_bracket = $data['rewards']['insurance'];
    //         $employee->bonus = $data['rewards']['bonus'];
    //         $employee->days_off = $data['rewards']['days_off'];

    //         // ✅ Recommended Designation
    //         // $employee->designation_main = $data['recommended_designation']['main'];
    //         // $employee->designation_sub = $data['recommended_designation']['sub'];
    //     }
    //     // Log::info($employees);

    //     return $employees;
    // }

    public function collection()
    {
        // eager load related employee if you have that relation
        return EmployeeActivity::with('employee')->get();
    }

    public function map($activity): array
    {
        // Try to call your existing helper that calculates scores for an activity.
        // Assumes calculateScores($activity) returns an array like:
        // ['education'=>['grade'=>..., 'score'=>...], 'certifications'=>['low'=>..., 'medium'=>..., 'high'=>...], 'external_experience'=>['score'=>...], 'management'=>['score'=>...], 'english'=>['score'=>...], 'total'=>['score'=>...], 'rewards'=>['insurance'=>..., 'bonus'=>..., 'days_off'=>...], 'recommended_designation'=>...]
        $data = function_exists('calculateScores') ? calculateScores($activity) : [];

        return [
            $activity->id ?? '',
            $activity->employee->name ?? '',
            $activity->employee->designation ?? '',
            $activity->education ?? '',
            $data['education']['score'] ?? 0,
            $activity->certificate_high ? 'High ' . $activity->certificate_high : ($activity->certificate_medium ? 'Medium ' . $activity->certificate_medium : 'Low ' . $activity->certificate_low),
            $data['certifications']['high']
                ?? $data['certifications']['medium']
                ?? $data['certifications']['low']
                ?? 0,
            $activity->experience_external ?? '',
            $data['external_experience']['score'] ?? 0,
            $activity->experience_management ?? '',
            $data['management']['score'] ?? 0,
            $activity->english ?? '',
            $data['english']['score'] ?? 0,
            $data['total']['score'] ?? 0,
            'Grade ' . $data['recommended_designation']['grade'] ?? '',
            $data['rewards']['insurance'] ?? '',
            $data['rewards']['bonus'] ?? '',
            $data['rewards']['days_off'] ?? '',
        ];
    }
    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Role',
            'Education',
            'Score',
            'Certificate',
            'Score',
            'Experience - External',
            'Score',
            'Experience - Management',
            'Score',
            'English',
            'Score',
            'Total Score',
            'Grade',
            'Insurance bracket',
            'Bonus',
            'Off days',
        ];
    }
}
