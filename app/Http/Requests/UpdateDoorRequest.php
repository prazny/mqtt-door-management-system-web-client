<?php

namespace App\Http\Requests;

use App\Enum\DoorType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class UpdateDoorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(Request $request): array
    {
        return [
            'name' => 'unique:doors,name,' . $this->door->id,
            'type' => new Enum(DoorType::class),

        ];
    }
}
