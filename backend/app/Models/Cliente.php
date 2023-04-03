<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
  use HasFactory;

  protected $table = 'tbl_clientes';

  protected $fillable = [
    'nombre',
    'apellidos',
    'edad',
    'sueldo',
  ];

  public $timestamps = false;
}
