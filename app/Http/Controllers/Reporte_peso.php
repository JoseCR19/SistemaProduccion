<?php

namespace App\Http\Controllers;

use App\Clientes;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use PHPUnit\Framework\Constraint\Count;
use iio\libmergepdf\Merger;
use PDF;


ini_set("max_execution_time", 120);

class Reporte_Peso extends Controller {

    //repo_list_peso
    public function repo_list_peso(){
         return view('Reporte_Peso.reporte_peso');
    }
}
