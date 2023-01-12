<?php

namespace App\Services;
class TimeRangeService
{
    function hours_tofloat($val)
    {
        if (empty($val)) {
            return 0;
        }
        $parts = explode(':', $val);
        return $parts[0] + floor(($parts[1] / 60) * 100) / 100;
    }

}
