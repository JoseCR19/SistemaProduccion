<?php

namespace App\Http\Controllers;

use App\Clientes;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use PHPUnit\Framework\Constraint\Count;

class Especificacion extends Controller {

    public function list_Especificacion() {

        return view('Especificacion.Especificacion');
    }

}

