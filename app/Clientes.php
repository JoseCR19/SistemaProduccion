<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Clientes extends Model 
{
  protected $connection='mysql';
  public $timestamps = false;
  protected $table = 'cliente';
  protected $primaryKey = 'intIdClie';
  protected $fillable = [
      'varIdCliesql',
      'varRucClie',
      'varRazClie',
      'acti_usua',
      'acti_hora',
      'varEstaClie',
      'usua_modi',
      'hora_modi'
  ];
}