<?php

namespace App\Models;

use App\Enum\DoorType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Door extends Model
{
    use HasFactory, HasSlug;
    protected $fillable = ['name', 'type'];
    protected $guarded = ['temperature', 'slug'];
    protected $casts = [
        'type' => DoorType::class,
    ];

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
}
