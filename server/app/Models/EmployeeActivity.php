<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeActivity extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function documents()
    {
        return $this->hasMany(EmployeeDocument::class);
    }
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
