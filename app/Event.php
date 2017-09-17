<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'title', 'start', 'end', 'location', 'eventType', 'description', 'link', 'contact', 'approved'
  ];
  
  public function user()
  {
    return $this->belongsTo('App\User');
  }
}
