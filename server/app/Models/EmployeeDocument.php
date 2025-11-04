<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeDocument extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function activity()
    {
        return $this->belongsTo(EmployeeActivity::class, 'employee_activity_id');
    }
}
