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
//este es mi contolador TipoEtapa_Pintura
class TipoEtapa_Pintura extends Controller
{
//funcion del controlador list_tipoetapa_pintura
    public function  list_tipoetapa_pintura()
    {
        return view('TipoEtapa_Pintura.TipoEtapa_Pintura');
    }

}