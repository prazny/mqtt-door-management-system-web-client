<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDoorRequest;
use App\Http\Requests\UpdateDoorRequest;
use App\Models\Door;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use PhpMqtt\Client\Facades\MQTT;

class DoorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Door/Index', ['doors' => Door::all()]);
    }

    public function show()
    {

    }

    public function create(): Response
    {
        return Inertia::render('Door/Create');
    }

    public function store(StoreDoorRequest $request): RedirectResponse
    {
        Door::create(
            $request->validated()
        );

        return Redirect::route('doors.index');
    }

    public function edit(Door $door): Response
    {
        return Inertia::render('Door/Edit', ['door' => $door]);
    }

    public function update(UpdateDoorRequest $request, Door $door): RedirectResponse
    {
        $door->update($request->validated());

        return Redirect::route('doors.index');
    }

    public function destroy( Door $door): RedirectResponse
    {
        $door->delete();

        return Redirect::route('doors.index');
    }

}
