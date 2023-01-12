<?php

namespace App\Models;

use App\Enum\DoorType;
use App\Enum\EmployeeStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'card_uuid', 'entry_allowance', 'exit_allowance', 'status'];
    protected $guarded = ['status'];
    protected $appends = ['full_name'];
    protected $casts = [
        'entry_allowance' => 'array',
        'exit_allowance' => 'array',
        'status' => EmployeeStatus::class,
    ];

    public function checkIfEmployeeCanPass(DoorType $doorType): bool
    {
        $employeeStatus = $this->status;

        if ($doorType == DoorType::EXIT) $ranges = $this->exit_allowance;
        else $ranges = $this->entry_allowance;
        if (!isset($ranges[0])) return false;

        date_default_timezone_set('Europe/Warsaw');
        $current_hour_float = date("H:i");

        foreach ($ranges as $range) {
            $min = hours_tofloat($range['min']);
            $max = hours_tofloat($range['max']);
            if ($current_hour_float > $min && $current_hour_float < $max) return true;
        }


        return false;

    }

    public function getFullNameAttribute(): string
    {
        return $this->first_name . " " . $this->last_name;
    }
}
