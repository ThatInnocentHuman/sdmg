<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Tube extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function transactionTubeSubmitted(): HasOne{
        return $this->hasOne(Transaction::class, 'tube_submitted');
    }
    
    public function transactionTubeTaken(): HasOne{
        return $this->hasOne(Transaction::class, 'tube_submitted');
    }

    public function gas(): BelongsTo{
        return $this->belongsTo(Gas::class);
    }
}