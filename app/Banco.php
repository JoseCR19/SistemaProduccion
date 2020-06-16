<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Banco extends Model 
{
  protected $connection='sqlsrv';
  public $timestamps = false;
  protected $table = 'Banco';
  protected $primaryKey = 'Codigo';
  protected $fillable = [
      'Codigo',
      'CodEnt',
      'varRazClie',
      'Moneda'
  ];
}