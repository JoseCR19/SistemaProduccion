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

class Galvanizado extends Controller {

    public function listar_galvanizado() {
        return view('Galvanizado.lista_galvanizado');
    }

    public function reporte_galvanizado() {
        return view('Reporte_Galvanizado.reporte_galvanizado');
    }

    public function pdf_galvanizado($usuario, $unidad, $sema_inicio, $sema_fin,$label_unidad) {

      //  dd($usuario, $unidad, $sema_inicio, $sema_fin);

        $pdf_galvanizado_detalle = [
            'dateFechIngr' => intval($sema_inicio),
            'dateFechSali' => intval($sema_fin),
            'tipo_reporte' => $unidad
        ];
        $url = "http://localhost/GestionReportes/public/index.php/reporte_galvanizado_turno";
        $ch5 = curl_init($url);

        curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch5, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch5, CURLOPT_POST, true);
        curl_setopt($ch5, CURLOPT_POSTFIELDS, $pdf_galvanizado_detalle);
        $data = curl_exec($ch5);
        $datos_array = json_decode($data, true);
        $array_temp = $datos_array['data'];
       //dd($array_temp);
        

        date_default_timezone_set('America/Lima');
        $current_date = date('Y/m/d H:i:s');

        $html = PDF::loadView('Galvanizado/pdf_galvanizado', ['user' => $usuario,'tipo_reporte'=>$label_unidad, 'detalle' => $array_temp,'fecha_hoy'=>$current_date])->setPaper('a4', 'landscape');
        //dd($html);
        $html->setOptions(['margin-top' => 0, 'margin-right' => 0, 'margin-bottom' => 0, 'margin-left' => 0, 'footer-center' => 'Pagina [page] de [toPage]']);


        return $html->download($usuario . '.pdf');
    }
    
    
    public function insp_galvanizado(){
        return view('Inspeccion_Galvanizado.insp_galv');
        
    }
    
    public function reporte_insp_galvanizado(){
         return view('Reporte_Inspeccion_Galv.reporte_insp_galva');
    }
}
