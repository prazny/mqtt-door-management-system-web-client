<?php
function hours_tofloat($val): float|int|string
{
    if (empty($val)) {
        return 0;
    }
    $parts = explode(':', $val);
    return $parts[0] + floor(($parts[1] / 60) * 100) / 100;
}

function getSecondEmployeeStatus(\App\Enum\EmployeeStatus $employeeStatus): \App\Enum\EmployeeStatus
{
    if($employeeStatus == \App\Enum\EmployeeStatus::INSIDE) return \App\Enum\EmployeeStatus::OUTSIDE;
    else return \App\Enum\EmployeeStatus::INSIDE;
}
