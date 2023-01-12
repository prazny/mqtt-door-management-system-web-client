<?php

namespace App\Console\Commands;

use App\Services\MqttService\MqttSubscriberService;
use App\Services\MqttService\MqttTopicService;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use PhpMqtt\Client\Facades\MQTT;

class SubscribeMqtt extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mqtt:subscribe {topic} {payload}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Subscribe mqtt.';

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        $topicService = new MqttTopicService();
        $mqttSubscriberService = new MqttSubscriberService();

        $topic = base64_decode($this->argument('topic'));
        $payload = base64_decode($this->argument('payload'));
        $data = json_decode($payload, true);
        try {
            if (preg_match('/^dm\/door\//', $topic)) {
                if (str_ends_with($topic, 'touchCard')) {
                    $mqttSubscriberService->readCard($topicService->getDoorSlug($topic), $data['card_uuid']);
                } elseif (str_ends_with($topic, 'temperature')) {
                    $mqttSubscriberService->readTemperature($topicService->getDoorSlug($topic), $data['temperature']);
                }
            }
        } catch (Exception $e) {
            Log::warning($e);
        }

    }
}
