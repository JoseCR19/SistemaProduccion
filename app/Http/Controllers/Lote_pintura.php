<?php

namespace App\Http\Controllers;

use App\Clientes;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use PDF;
use iio\libmergepdf\Merger;
use PHPUnit\Framework\Constraint\Count;

ini_set("max_execution_time", 120);

class Lote_pintura extends Controller {

    public function list_lote_pintura() {
        return view('Lote_pintura.lista_Lote_pintura');
    }

    public function reportar_lote_pintura() {
        return view('Reportar_Pintura.lista_reportar_pintura');
    }

    public function pdf_idlotepintura($data, $user_conectado) {
        
         $data_lote = json_decode($data);
       
      //   dd($data_lote,$user_conectado);
        $pintura_detalle = [
            'intIdLotePintura' => $data_lote[0]->intIdLotePintura,
        ];
        $url = "http://localhost/GestionProyectos/public/index.php/list_detalle_pintura";
        $ch5 = curl_init($url);

        curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch5, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch5, CURLOPT_POST, true);
        curl_setopt($ch5, CURLOPT_POSTFIELDS, $pintura_detalle);
        $data_s = curl_exec($ch5);
        $datos_array = json_decode($data_s, true);
        $array_temp = $datos_array['data'];

       // dd($array_temp);
        
        date_default_timezone_set('America/Lima');
        $current_date = date('Y/m/d H:i:s');

        $html = PDF::loadView('Lote_pintura/pdf_pintura', ['user' => $data_lote[0]->acti_usua, 'user_cone' => $user_conectado, 'fecha_hoy' => $current_date, 'codigo_pintura' => $data_lote[0]->Codigo, 'proyecto' => $data_lote[0]->varCodiProy, 'pintura' => $data_lote[0]->varLotePintura, 'cabina' => $data_lote[0]->varCabina, 'elemento' => $data_lote[0]->varDescTipoProd, 'usua_hora' => $data_lote[0]->acti_usua, 'fech_inicio' => $data_lote[0]->dateFechInic, 'fech_final' => $data_lote[0]->dateFechFin, 'observacion' => $data_lote[0]->varObservacion,'detalle' => $array_temp])->setPaper('a4', 'landscape');
        //dd($html);
        $html->setOptions(['margin-top' => 0, 'margin-right' => 0, 'margin-bottom' => 0, 'margin-left' => 0,'footer-center' => 'Pagina [page] de [toPage]']);
        return $html->download($user_conectado . '.pdf');
    }

}
