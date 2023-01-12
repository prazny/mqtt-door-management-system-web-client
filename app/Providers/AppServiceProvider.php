<?php

namespace App\Providers;

use App\Jobs\MqttSubscriberJob;
use Illuminate\Support\ServiceProvider;
use PhpMqtt\Client\Facades\MQTT;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bindMethod([MqttSubscriberJob::class, 'handle'], function ($job, $app) {
            return $job->handle($app->make(MQTT::class));
        });
    }
}
