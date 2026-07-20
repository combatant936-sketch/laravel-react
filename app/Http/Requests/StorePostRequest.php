<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            "title"=>"required|string|max:255",
            "content"=>"required|string",
            "category_id"=>"required|exists:categories,id",
            "thumbnail"=>"required|file|mimes:jpg,jpeg,png|max:2048",
        ];
    }

     public function attributes(): array
    {
        return [
            "category_id"=>"category",
        ];
    }
}
