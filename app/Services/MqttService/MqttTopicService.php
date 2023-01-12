<?php

namespace App\Services\MqttService;

class MqttTopicService
{
    public function getDoorSlug($topic): string
    {
        $subTopic = substr($topic, strpos($topic, "dm/door/") + 8);
        return substr($subTopic, 0, strpos($subTopic, "/"));
    }

}
