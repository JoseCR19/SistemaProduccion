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
class Maquina extends Controller
{

    public function  list_maqu()
    {
        return view('Maquina.maquina');
    }
    
    

}