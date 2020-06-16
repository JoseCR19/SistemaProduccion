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
class Sincronizar extends Controller
{

    function listar_cliente(Request $request){
        
        $id="01";
        $documentos=[];
        $clientes_mimco=Clientes::all();
        //dd($clientes_mimco);

        $acti_usua="jose_castillo";
        $estado="ACT";
        date_default_timezone_set('America/Lima'); 
        $documentos=DB::connection('sqlsrv')->select('exec sp_listar_cliente_sispro ?',array($id));
        dd($documentos);
        
        //dd($id);
        if($documentos>0)
        {

            //dd($documentos);
            /*foreach ($documentos as $list) {
                $answer[]=['varIdCliSql'=>$list->CodCli,'varRazClie'=>$list->RazCli,'varRucClie'=>$list->RucCli];
            }*/
            for($i=0;$i< count($documentos);$i++){
               $prueba=$documentos[$i]['CodCli'];

              }
              
            dd($prueba);
        }else{
            
        }
        
        //dd($documentos);
    }

}