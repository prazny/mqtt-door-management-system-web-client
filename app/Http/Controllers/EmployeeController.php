<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Employee/Index', ['employees' => Employee::all()]);
    }

    public function show()
    {

    }

    public function create(): Response
    {
        return Inertia::render('Employee/Create');
    }

    public function store(StoreEmployeeRequest $request): RedirectResponse
    {
        Employee::create(
            $request->validated()
        );

        return Redirect::route('employees.index');
    }

    public function edit(Employee $employee): Response
    {
        return Inertia::render('Employee/Edit', ['employee' => $employee]);
    }

    public function update(UpdateEmployeeRequest $request, Employee $employee): RedirectResponse
    {
        $fields = $request->validated();
        Log::warning(json_encode($fields['exit_allowance']));
        $employee->update($request->validated());

        return Redirect::route('employees.index');
    }

    public function destroy( Employee $employee): RedirectResponse
    {
        $employee->delete();

        return Redirect::route('employees.index');
    }
}
