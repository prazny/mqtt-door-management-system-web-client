<?php

namespace App\Jobs;

use App\Models\Door;
use App\Services\MqttService\MqttPublisherService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ChangeDoorStateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private MqttPublisherService $mqttPublisher;
    private Door $door;
    private bool $open;
    private int $time;
    private string $info;

    public function __construct(Door $door, bool $open, int $time, string $info)
    {
        $this->mqttPublisher = new MqttPublisherService();
        $this->door = $door;
        $this->open = $open;
        $this->time = $time;
        $this->info = $info;
    }

    public function handle()
    {
        $this->mqttPublisher->changeDoorState(
            $this->door,
            $this->open,
            $this->time,
            $this->info);
    }
}
