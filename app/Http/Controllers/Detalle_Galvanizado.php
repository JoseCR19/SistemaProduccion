<?php

namespace App\Http\Controllers;

use App\Clientes;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use PHPUnit\Framework\Constraint\Count;



ini_set("max_execution_time", 120);

class Detalle_Galvanizado extends Controller
{
//funcion del controlador list_tipoetapa_pintura
    public function  listar_Detalle_Galvanizado()
    {
        return view('Detalle_Galvanizado.detalle_galvanizado');
    }

}