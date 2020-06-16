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
class Pivot extends Controller
{

    public function listar_ot_pivot()
    {
        return view('Lista_OT_Pivot.lista_ot_pivot');
    }

}