<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = [
        'id'
    ];

    public function customer(): BelongsTo{
        return $this->belongsTo(Customer::class);
    }

    public function tubeSubmitted(): BelongsTo{
        return $this->belongsTo(Tube::class, 'tube_submitted');
    }
    
    public function tubeTaken(): BelongsTo{
        return $this->belongsTo(Tube::class, 'tube_taken');
    }
}