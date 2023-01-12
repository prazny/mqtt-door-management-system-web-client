<?php

namespace App\Jobs;


use App\Models\Door;
use App\Services\MqttService\MqttPublisherService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;


class ChangeBuzzerStateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private MqttPublisherService $mqttPublisher;
    private $door;
    private bool $isBuzz;
    private int $time;
    private string $info;

    public function __construct(Door $door, bool $isBuzz, int $time,  string $info)
    {
        $this->mqttPublisher = new MqttPublisherService();
        $this->door = $door;
        $this->isBuzz = $isBuzz;
        $this->time = $time;
        $this->info = $info;
    }

    public function handle()
    {
        $this->mqttPublisher->changeBuzzerState(
            $this->door,
            $this->isBuzz,
            $this->time,
            $this->info);
    }
}
