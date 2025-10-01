<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    /**
     * Les attributs qui peuvent être assignés en masse
     */
    protected $fillable = [
        'model',
        'year',
        'km',
        'price',
        'image'
    ];

    /**
     * Les attributs qui doivent être castés
     */
    protected $casts = [
        'year' => 'integer',
        'km' => 'integer',
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Accessor pour l'image
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return 'https://via.placeholder.com/400x200/cccccc/ffffff?text=No+Image';
        }
        
        // Si c'est déjà une URL complète
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            return $this->image;
        }
        
        // Sinon construire l'URL
        return asset('storage/cars/' . $this->image);
    }
}
