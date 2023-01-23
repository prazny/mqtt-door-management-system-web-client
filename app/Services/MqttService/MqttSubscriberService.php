<?php

namespace App\Services\MqttService;

use App\Enum\DoorType;
use App\Enum\EmployeeStatus;
use App\Jobs\ChangeBuzzerStateJob;
use App\Jobs\ChangeDoorStateJob;
use App\Models\Door;
use App\Models\Employee;

class MqttSubscriberService
{
    public MqttPublisherService $publisher;
    protected int $fireTemp = 20;

    public function __construct()
    {
        $this->publisher = new MqttPublisherService();
    }

    public function readTemperature(string $doorUuid, float $temperature): void
    {
        $door = Door::where('slug', $doorUuid)->firstOrFail();

        if($temperature >= $this->fireTemp) {
            ChangeDoorStateJob::dispatch($door, true, 0, "FIRE FIRE FIRE!1111!!11!");
            ChangeBuzzerStateJob::dispatch($door, true, 0, "FIRE FIRE FIRE");
        }

        if($temperature < $this->fireTemp && $door->temperature >= $this->fireTemp) {
            ChangeDoorStateJob::dispatch($door, false, 0, "UFF...");
            ChangeBuzzerStateJob::dispatch($door, false, 0, "UFF...");
        }

        $door->temperature = $temperature;
        $door->save();
    }

    public function readCard(string $doorSlug, string $cardUuid)
    {
        $door = Door::where('slug', $doorSlug)->first();
        $employee = Employee::where('card_uuid', $cardUuid)->first();


        if ($employee) {
            # wrong door
            if (
                ($door->type == DoorType::EXIT && $employee->status == EmployeeStatus::OUTSIDE) ||
                ($door->type == DoorType::ENTRANCE && $employee->status == EmployeeStatus::INSIDE)
            ) {
                ChangeDoorStateJob::dispatch($door, false, 10, "You can't do that bro. Why are you here? Use another door.");
                return;
            }

            $canPass = $employee->checkIfEmployeeCanPass($door->type);

            if ($canPass || ($door->type == DoorType::EXIT && $door->temperature >= $this->fireTemp)) {
                $message = $door->type == DoorType::EXIT ? "Goodbye {$employee->full_name}" : "Hello {$employee->full_name}!";
                ChangeDoorStateJob::dispatch($door, true, 3, $message);
                //ChangeBuzzerStateJob::dispatch($door, true, 3, $message);
                activity()
                    ->performedOn($employee)
                    ->log("Employee used {$door->name} ({$door->type->value}).");
                $employee->status = getSecondEmployeeStatus($employee->status);
                $employee->save();


            } else {
                $message = $door->type == DoorType::EXIT ? "You can't do that bro... WORK!" : "You can't do that bro. Go home...";
                ChangeDoorStateJob::dispatch($door, false, 0, $message);
            }
        } else {
            #add new employee
            $employee = Employee::create(['card_uuid' => $cardUuid]);
            activity()
                ->performedOn($employee)
                ->log('Employee card registered');
            ChangeDoorStateJob::dispatch($door, false, 0, 'Employee has been successfully registered.')->onQueue('mqtt');
        }
        echo "after";

    }

}
