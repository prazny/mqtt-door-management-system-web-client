<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'string|max:50|unique:employees,first_name,'.$this->employee->id,
            'last_name' => 'string|max:50|unique:employees,last_name,'.$this->employee->id,
            'entry_allowance' => 'array|required',
            'exit_allowance' => 'array|required',
        ];
    }
}
