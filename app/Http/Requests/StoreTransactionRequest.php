<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required|numeric|exists:App\Models\Customer,id',
            'tube_submitted' => 'required|numeric|exists:App\Models\Tube,id',
            'tube_taken' => 'required|numeric|exists:App\Models\Tube,id',
            'price' => 'required|numeric',
        ];
    }
}