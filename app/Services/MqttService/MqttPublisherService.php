<?php

namespace App\Services\MqttService;

use App\Models\Door;
use PhpMqtt\Client\Facades\MQTT;

class MqttPublisherService
{
    public function changeDoorState(Door $door, bool $open, int $time, string $info) {
        $message = json_encode([
            'status' => $open ? 'open' : 'close',
            'in_seconds' => $time,
            'message' => $info,
        ]);


        MQTT::publish("dm/door/{$door->slug}/changeState", $message, true);
    }

    public function changeBuzzerState(Door $door, bool $isBuzz, int $inSeconds, string $info) {
        $message = json_encode([
            'status' => $isBuzz,
            'in_seconds' => $inSeconds,
            'message' => $info,
        ]);
        MQTT::publish("dm/door/{$door->slug}/buzzer", $message, true);
    }

}
