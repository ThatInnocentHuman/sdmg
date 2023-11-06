<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Gas extends Model
{
    use HasFactory;
    protected $guarded = [
        'id',
    ];

    public function tubes(): HasMany{
        return $this->hasMany(Tube::class);
    }
    
    public function scopeFilter($query, array $filters){
        $query->when($filters['search'] ?? false , function($query, $search){
            return $query->where(function ($query) use ($search){ 
                $query->where('name', 'like', '%'. $search. '%' ); 
            });
        });
    }

}