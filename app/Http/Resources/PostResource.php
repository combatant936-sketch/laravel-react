<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=>$this->id,
            "title"=>$this->title,
            "content"=>substr($this->content,0,100),
            "created_at"=>$this->created_at->toDateTimeString(),
            "category_id"=>$this->category->id,
            "category"=>[
                "id"=>$this->category->id,
                "name"=>$this->category->name
            ]
        ];
    }
}
