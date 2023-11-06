<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tube_submitted' => $this->tube_submitted,
            'tube_taken' => $this->tube_taken,
            'created_at' => $this->created_at->format("Y m d H:i:s"),
        ];
    }
}