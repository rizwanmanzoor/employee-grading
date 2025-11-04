<?php

use Illuminate\Support\Facades\Storage;

if (!function_exists('greeting')) {
    function greeting($name)
    {
        return "Hello, " . $name;
    }
}


if (!function_exists('uploadEmployeeFiles')) {

    /**
     * Upload employee files into:
     * storage/app/public/employees/{EMPLOYEE_ID}/{CATEGORY}/
     *
     * @param object $files  // request()->file('input')
     * @param int $employeeId
     * @param string $categoryName
     * @return array
     */
    function uploadEmployeeFiles($files, $employeeId, $categoryName)
    {
        $uploadedFiles = [];

        if (!$files) {
            return $uploadedFiles;
        }

        foreach ($files as $file) {

            // Folder path: /employees/5/education/
            $path = "employees/{$employeeId}/{$categoryName}";

            // ✅ Ensure directory exists (works on live server too)
            if (!Storage::disk('public')->exists($path)) {
                Storage::disk('public')->makeDirectory($path, 0775, true);
            }

            // ✅ unique filename (avoid overwrite)
            $filename = time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();

            // ✅ Actually upload
            $storedFilePath = $file->storeAs($path, $filename, 'public');

            // ✅ collect details for DB
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
