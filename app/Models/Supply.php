<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Supply extends Model
{
    use HasFactory;

    protected $guarded = [
        'id'
    ];

    /**
 * Get the user that owns the Supply
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function supplier(): BelongsTo{
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function tube(): BelongsTo{
        return $this->belongsTo(Tube::class, 'tube_id');
    }

    
}