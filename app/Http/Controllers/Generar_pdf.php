<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use PDF;
use iio\libmergepdf\Merger;

class Generar_pdf extends Controller {

    public function pdf_componentes($id, $paquete, $producto, $cod_ot, $cod_tarea, $cod_paquete, $user) {

        $ot = [
            'v_intIdProy' => intval($id),
            'v_intIdTipoProducto' => intval($producto),
            'v_intIdProyPaquete' => intval($paquete),
        ];
        //dd($ot);

        $ch = curl_init('http://localhost/Asignaciones/public/index.php/visu_repo_comp');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $ot);
        $data = curl_exec($ch);
        $array_temporal = array();
        $array_temporal_2 = [];
        $datos_array = json_decode($data, true);

        $cant_elementos = 0;
        $cantidad_componentes = 0;
        $array_temp = $datos_array['data'];
        //dd($array_temp);
        for ($i = 0; count($array_temp) > $i; $i++) {
            if (!in_array($array_temp[$i]['Cod_elemento'], $array_temporal)) {
                $array_temporal[] = $array_temp[$i]['Cod_elemento'];
                array_push($array_temporal_2, ["proyecto" => $array_temp[$i]['proyecto'], "Zona" => $array_temp[$i]['Zona'],
                    "Programa" => $array_temp[$i]['Programa'], "Grupo" => $array_temp[$i]['Grupo'], "Cod_elemento" => $array_temp[$i]['Cod_elemento'],
                    "Descripcion" => $array_temp[$i]['Descripcion'], "canti" => $array_temp[$i]['canti'], "PesoNetoElemento" => $array_temp[$i]['PesoNetoElemento'],
                    "PesoBrutoElemento" => $array_temp[$i]['PesoBrutoElemento'], "deciLong" => $array_temp[$i]['deciLong'], "intRevision" => $array_temp[$i]['intRevision'],
                    "varPerfil" => $array_temp[$i]['varPerfil'], "AreaElemento" => $array_temp[$i]['AreaElemento'],]);
                $cant_elementos = intval($array_temp[$i]['canti']) + $cant_elementos;
            }
            $cantidad_componentes = $array_temp[$i]['Cant_Componente'] + $cantidad_componentes;
        }
        $html = PDF::loadView('Asignacion_Grupos/pdf', ['id_ot' => $cod_ot, 'cod_tarea' => $cod_tarea, 'data' => $datos_array['data'], 'cabecera' => $array_temporal_2, 'cantidad_elementos' => $cant_elementos, 'cantidad_componentes' => $cantidad_componentes, 'cod_paquete' => $cod_paquete]);
        $html->setOptions(['footer-font-size' => 8, 'footer-left' => 'Creado por ' . $user, 'footer-center' => 'Pagina [page] de [toPage]']);
        return $html->download($cod_paquete . '.pdf');

        // file_put_contents($file_location,$pdf_2); 
    }

    public function pdf_planos(Request $request) {

        $porciones = $request->input('elementos');
        $ot = $request->cod_ot;
        $nom_zona = $request->zona;
        $nom_user = $request->user;
        $elementos = array();
        $ot = explode(" /", $ot);
        $ot = $ot[0];
        $combinadorsustento = new Merger;
        $mensaje = "";
        for ($i = 0; count($porciones) > $i; $i++) {
            $DocSustento = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Planos/Proyecto/" . $ot . "/Zonas/" . $nom_zona . "/" . $porciones[$i] . ".pdf";
            if (file_exists($DocSustento)) {
                $combinadorsustento->addFile($DocSustento);
            } else {
                $mensaje = "ERROR";
                array_push($elementos, $porciones[$i]);
            }
        }
        $directorio_globales = $_SERVER['DOCUMENT_ROOT'] . "/Planos/Proyecto/" . $ot . "/Zonas/" . $nom_zona . "/GLOBALES";
        if (is_dir($directorio_globales)) {
            $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Planos/Proyecto/" . $ot . "/Zonas/" . $nom_zona . "/GLOBALES/" . $nom_user . ".pdf";
            if (file_exists($docplanos)) {
                unlink($directorio = $_SERVER['DOCUMENT_ROOT'] . "/Planos/Proyecto/" . $ot . "/Zonas/" . $nom_zona . "/GLOBALES/" . $nom_user . ".pdf");
                $salida = $combinadorsustento->merge();
                file_put_contents($docplanos, $salida);
            } else {
                $salida = $combinadorsustento->merge();

                file_put_contents($docplanos, $salida);
            }
        } else {
            mkdir($directorio_globales, 0777, true);
            $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Planos/Proyecto/" . $ot . "/Zonas/" . $nom_zona . "/GLOBALES/" . $nom_user . ".pdf";
            if (file_exists($docplanos)) {
                unlink($directorio = $_SERVER['DOCUMENT_ROOT'] . "/Planos/Proyecto/" . $ot . "/Zonas/" . $nom_zona . "/GLOBALES/" . $nom_user . ".pdf");
                $salida = $combinadorsustento->merge();
                file_put_contents($docplanos, $salida);
            } else {
                $salida = $combinadorsustento->merge();

                file_put_contents($docplanos, $salida);
            }
        }
        return['veri' => true, 'lista' => $docplanos, 'mensaje' => $mensaje, 'zona' => $nom_zona, 'user' => $nom_user, 'ot' => $ot, 'elementos' => $elementos];
    }

    public function validar_pdf_contratista(Request $request) {
        $contrata = [
            'v_intIdproy' => intval($request->input('txt_ot')),
            'v_intIdTipoProducto' => intval($request->input('producto')),
            'v_intIdTipoEtapa' => intval($request->input('etapa')),
            'v_intIdPlanta' => intval($request->input('planta')),
            'v_intIdEtapa' => intval($request->input('etapa_actual')),
            'v_strCodigos' => $request->input('codigo_elemento_final') ,
            'v_intIdContra' => intval($request->input('contratista')),
            'v_intIdSemaIni' => intval($request->input('semana_inicio')),
            'v_intIdSemaFin' => intval($request->input('semana_fin') ),
            'v_TipoReporte' => intval($request->input('tipo_reporte'))
        ];
        $validar = array('mensaje' => '', 'dato' => array());

        $url = "http://localhost/GestionReportes/public/index.php/gsrepo_store_valor";
        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $contrata);
        $data = curl_exec($ch);
        $err = curl_errno($ch);
        $errmsg = curl_error($ch);
        $header = curl_getinfo($ch);
        $datos_array = json_decode($data, true);
        $array_temp = $datos_array['data'];
        if(count($array_temp)>0){
            $validar["mensaje"] = "";
        }else{
            $validar["mensaje"] = "En este período no habido contratistas valorizados";
        }
        return json_encode($validar);
    }

    public function pdf_contratista($txt_ot, $producto, $etapa, $planta, $etapa_actual, $codigo_elemento_final, $contratista, $semana_inicio, $semana_fin, $tipo_reporte, $user, $semana_inicio_label, $semana_fin_label) {
        if ($codigo_elemento_final === ",") {
            $codigo_elemento_final = "";
        } else {
            $codigo_elemento_final = $codigo_elemento_final;
        }
        date_default_timezone_set('America/Lima');
        $current_date = date('Y/m/d H:i:s');

        // // CDT

        $contrata = [
            'v_intIdproy' => intval($txt_ot),
            'v_intIdTipoProducto' => intval($producto),
            'v_intIdTipoEtapa' => intval($etapa),
            'v_intIdPlanta' => intval($planta),
            'v_intIdEtapa' => intval($etapa_actual),
            'v_strCodigos' => $codigo_elemento_final,
            'v_intIdContra' => intval($contratista),
            'v_intIdSemaIni' => intval($semana_inicio),
            'v_intIdSemaFin' => intval($semana_fin),
            'v_TipoReporte' => intval($tipo_reporte)
        ];

        $url = "http://localhost/GestionReportes/public/index.php/gsrepo_store_valor";
        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $contrata);


        $data = curl_exec($ch);
        $err = curl_errno($ch);
        $errmsg = curl_error($ch);
        $header = curl_getinfo($ch);

        $datos_array = json_decode($data, true);

        $array_temp = $datos_array['data'];
        //dd($array_temp);
        if (intval($tipo_reporte) === 1) {

            $array_temporal = array();
            $array_temporal_2 = [];
            $array_temporal_3 = [];
            $array_temporal_4 = [];

            
            for ($i = 0; count($array_temp) > $i; $i++) {
                if (!in_array($array_temp[$i]['ruc'], $array_temporal)) {
                    $array_temporal[] = $array_temp[$i]['ruc'];
                    array_push($array_temporal_2, ["ruc" => $array_temp[$i]['ruc'], "contratista" => $array_temp[$i]['contratista']]);
                }
            }

            //dd($array_temporal_2);
            for ($i = 0; count($array_temp) > $i; $i++) {
                if (!in_array($array_temp[$i]['etapa'], $array_temporal)) {
                    $array_temporal[] = $array_temp[$i]['etapa'];
                    array_push($array_temporal_3, ["etapa" => $array_temp[$i]['etapa']]);
                }
            }
            $importe_total = 0;
            //$pdf = PDF::loadView('Valorizacion/pdf_cxexc', $data);
            //dd($array_temp);
            $html = PDF::loadView('Valorizacion/pdf_cxexc', ['user' => $user, 'fecha_hora' => $current_date, 'cabecera' => $array_temporal_2, 'detalle' => $array_temp, 'etapa' => $array_temporal_3, "semana_inicio" => $semana_inicio_label, "semana_fin" => $semana_fin_label, "importe_total" => $importe_total])->setPaper('a4', 'landscape');
            //dd($html);
            $html->setOptions(['margin-top' => 0, 'margin-right' => 0, 'margin-bottom' => 0, 'margin-left' => 0]);
            return $html->download($user . '.pdf');
        } else if (intval($tipo_reporte) === 2) {
            $array_temporal = array();
            $array_temporal_2 = [];
            $array_totales = [];
            $total_importe = 0;
            $peso_total = 0;
            $area_total = 0;
            $cantidad_total = 0;
            for ($i = 0; count($array_temp) > $i; $i++) {
                if (!in_array($array_temp[$i]['ruc'], $array_temporal)) {
                    $array_temporal[] = $array_temp[$i]['ruc'];
                    array_push($array_temporal_2, ["ruc" => $array_temp[$i]['ruc'], "contratista" => $array_temp[$i]['contratista']]);
                }
            }
            for ($i = 0; count($array_temp) > $i; $i++) {
                if ($array_temp[$i]['importetotal'] === null) {
                    $array_temp[$i]['importetotal'] = 0;
                }
                if ($array_temp[$i]['pesonetotal'] === null) {
                    $array_temp[$i]['pesonetotal'] = 0;
                }
                if ($array_temp[$i]['areatotal'] === null) {
                    $array_temp[$i]['areatotal'] = 0;
                }
                if ($array_temp[$i]['cantidad'] === null) {
                    $array_temp[$i]['cantidad'] = 0;
                }
                $total_importe += $array_temp[$i]['importetotal'];
                $peso_total += $array_temp[$i]['pesonetotal'];
                $area_total += $array_temp[$i]['areatotal'];
                $cantidad_total += $array_temp[$i]['cantidad'];
            }
            $html = PDF::loadView('Valorizacion/pdf_c', ['user' => $user, 'fecha_hora' => $current_date, 'cabecera' => $array_temporal_2, 'detalle' => $array_temp, "importe_total_TOTAL" => $total_importe, "peso_total_TOTAL" => $peso_total, "area_total_TOTAL" => $area_total, "cantidad_total_TOTAL" => $cantidad_total, "semana_inicio" => $semana_inicio_label, "semana_fin" => $semana_fin_label]);
            //PDF::loadHTML($html)->setPaper('a4', 'landscape');
            //dd($html); 
            $html->setOptions(['margin-top' => 0, 'margin-right' => 5, 'margin-bottom' => 5, 'margin-left' => 5, 'footer-font-size' => 8, 'footer-left' => 'Creado por ' . $user, 'footer-center' => 'Pagina [page] de [toPage]']);
            //$html->setOptions(['footer-font-size' => 8, 'footer-left' => 'Creado por ' . $user, 'footer-center' => 'Pagina [page] de [toPage]','margin-top' => 0, 'margin-right' => 0, 'margin-bottom' => 0, 'margin-left' => 0]);
            return $html->download($user . '.pdf');
        } else if (intval($tipo_reporte) === 3) {
            $array_temporal = array();
            $array_temporal_2 = [];
            $array_totales = [];
            $total_importe = 0;
            $peso_total = 0;
            $area_total = 0;
            $cantidad_total = 0;

            for ($i = 0; count($array_temp) > $i; $i++) {
                if (!in_array($array_temp[$i]['ruc'], $array_temporal)) {
                    $array_temporal[] = $array_temp[$i]['ruc'];
                    array_push($array_temporal_2, ["ruc" => $array_temp[$i]['ruc'], "contratista" => $array_temp[$i]['contratista']]);
                }
            }
            for ($i = 0; count($array_temp) > $i; $i++) {
                if ($array_temp[$i]['importetotal'] === null) {
                    $array_temp[$i]['importetotal'] = 0;
                }
                if ($array_temp[$i]['pesonetotal'] === null) {
                    $array_temp[$i]['pesonetotal'] = 0;
                }
                if ($array_temp[$i]['areatotal'] === null) {
                    $array_temp[$i]['areatotal'] = 0;
                }
                if ($array_temp[$i]['cantidad'] === null) {
                    $array_temp[$i]['cantidad'] = 0;
                }
                $total_importe += $array_temp[$i]['importetotal'];
                $peso_total += $array_temp[$i]['pesonetotal'];
                $area_total += $array_temp[$i]['areatotal'];
                $cantidad_total += $array_temp[$i]['cantidad'];
            }
            //dd($array_temp);
            $html = PDF::loadView('Valorizacion/pdf_cxe', ['user' => $user, 'fecha_hora' => $current_date, 'cabecera' => $array_temporal_2, 'detalle' => $array_temp, "importe_total_TOTAL" => $total_importe, "peso_total_TOTAL" => $peso_total, "area_total_TOTAL" => $area_total, "cantidad_total_TOTAL" => $cantidad_total, "semana_inicio" => $semana_inicio_label, "semana_fin" => $semana_fin_label])->setPaper('a4', 'landscape');
            $html->setOptions(['margin-top' => 0, 'margin-right' => 5, 'margin-bottom' => 5, 'margin-left' => 5, 'footer-font-size' => 8, 'footer-left' => 'Creado por ' . $user, 'footer-center' => 'Pagina [page] de [toPage]']);
            return $html->download($user . '.pdf');
        }
    }

    public function pdf_qr($data, $tipo, $rotulo) {
        //dd($data, $tipo);
        $data_bulto = json_decode($data);
        //dd($data_bulto);
        $array_temporal_2 = [];
        $array_temporal_detalle = [];
        $datos_array_DETALLE = "";
        //dd($data_bulto);
        for ($i = 0; count($data_bulto) > $i; $i++) {
            //CABECERA
            $lista_bulto_cabecera = [
                'intIdProy' => $data_bulto[$i]->intIdProy,
                'intIdTipoProducto' => $data_bulto[$i]->intIdTipoProducto,
                'intIdProyZona' => $data_bulto[$i]->intIdProyZona,
                'intIdProyTarea' => $data_bulto[$i]->intIdProyTarea,
                'varCodiElemento' => "'" . $data_bulto[$i]->varModelo . "'",
                'varBulto' => "'" . $data_bulto[$i]->varBulto . "'",
            ];
            $data_json = json_encode($lista_bulto_cabecera);
            //dd($lista_bulto_cabecera);
            //dd(urlencode($data_bulto[$i]->intIdProy.'/'.$data_bulto[$i]->varBulto));
            //dd($url_codigo_qr);
            //dd($data_json);
            //dd($lista_bulto_cabecera);
            $ch = curl_init('http://localhost/GestionProyectos/public/index.php/list_bulto_total');

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $lista_bulto_cabecera);
            $data = curl_exec($ch);
            //dd($data);
            curl_close($ch);
            $datos_array = json_decode($data, true);
            //dd($datos_array['data']);
            for ($j = 0; count($datos_array['data']) > $j; $j++) {
                array_push($array_temporal_2, ["nomb_proyecto" => $datos_array['data'][$j]['nomb_proyecto'],
                    "varDescTipoProd" => $datos_array['data'][$j]['varDescTipoProd'],
                    "varDescrip" => $datos_array['data'][$j]['varDescrip'],
                    "varDescripTarea" => $datos_array['data'][$j]['varDescripTarea'],
                    "varBulto" => $datos_array['data'][$j]['varBulto'],
                    "varModelo" => $datos_array['data'][$j]['varModelo'],
                    "deciPesoNeto" => $datos_array['data'][$j]['deciPesoNeto'],
                    "deciPesoBruto" => $datos_array['data'][$j]['deciPesoBruto'],
                    "deciArea" => $datos_array['data'][$j]['deciArea'],
                    "cantidad" => $datos_array['data'][$j]['cantidad'],
                    "data" => $data_json, "tipo" => $tipo,
                    "intIdProy" => $data_bulto[$i]->intIdProy,
                    "intIdTipoProducto" => $data_bulto[$i]->intIdTipoProducto,
                    "intIdProyZona" => $data_bulto[$i]->intIdProyZona,
                    "intIdProyTarea" => $data_bulto[$i]->intIdProyTarea,
                    "varModelo" => $data_bulto[$i]->varModelo,
                    "varBulto" => $data_bulto[$i]->varBulto
                ]);
            }
            //dd($array_temporal_2);
            $lista_bulto_DETALLE = [
                'intIdProy' => $data_bulto[$i]->intIdProy,
                'intIdTipoProducto' => $data_bulto[$i]->intIdTipoProducto,
                'varBulto' => $data_bulto[$i]->varBulto,
            ];
            //dd($lista_bulto_DETALLE);

            if ($tipo === "1") {
                $ch3 = curl_init('http://localhost/GestionProyectos/public/index.php/listar_por_codigo_bulto');
                curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch3, CURLINFO_HEADER_OUT, true);
                curl_setopt($ch3, CURLOPT_POST, true);
                curl_setopt($ch3, CURLOPT_POSTFIELDS, $lista_bulto_DETALLE);
                $data_DETALLE = curl_exec($ch3);
                curl_close($ch3);
                $datos_array_DETALLE = json_decode($data_DETALLE, true);
                //dd($datos_array_DETALLE);
            } else {
                $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/listar_bulto_detalle');
                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch2, CURLINFO_HEADER_OUT, true);
                curl_setopt($ch2, CURLOPT_POST, true);
                curl_setopt($ch2, CURLOPT_POSTFIELDS, $lista_bulto_DETALLE);
                $data_DETALLE = curl_exec($ch2);
                curl_close($ch2);
                $datos_array_DETALLE = json_decode($data_DETALLE, true);
                //dd($datos_array_DETALLE);
            }

            //dd(count($datos_array_DETALLE['data']));
            for ($x = 0; count($datos_array_DETALLE['data']) > $x; $x++) {
                if ($tipo === "1") {
                    $cantidad = $datos_array_DETALLE['data'][$x]['cantidad'];
                } else {
                    $cantidad = 0;
                }
                array_push($array_temporal_detalle, ["varCodiElemento" => $datos_array_DETALLE['data'][$x]['varCodiElemento'],
                    "varDescripcion" => $datos_array_DETALLE['data'][$x]['varDescripcion'],
                    "intRevision" => $datos_array_DETALLE['data'][$x]['intRevision'],
                    "intCantRepro" => $datos_array_DETALLE['data'][$x]['intCantRepro'],
                    "varPerfil" => $datos_array_DETALLE['data'][$x]['varPerfil'],
                    "varCodigoPaquete" => $datos_array_DETALLE['data'][$x]['varCodigoPaquete'],
                    "deciPesoNeto" => $datos_array_DETALLE['data'][$x]['deciPesoNeto'],
                    "deciPesoBruto" => $datos_array_DETALLE['data'][$x]['deciPesoBruto'],
                    "deciArea" => $datos_array_DETALLE['data'][$x]['deciArea'],
                    "varBulto" => $datos_array_DETALLE['data'][$x]['varBulto'],
                    "deciAlto" => $datos_array_DETALLE['data'][$x]['deciAlto'],
                    "deciAncho" => $datos_array_DETALLE['data'][$x]['deciAncho'],
                    "deciLong" => $datos_array_DETALLE['data'][$x]['deciLong'],
                    "cantidad" => $cantidad]);
            }
        }

        $html = PDF::loadView('Despacho/rotula_qr', ['array_temporal_2' => $array_temporal_2, 'array_temporal_detalle' => $array_temporal_detalle, 'tipo' => $tipo, 'rotulo' => $rotulo]);
        $html->setOptions(['margin-top' => 0, 'margin-right' => 5, 'margin-bottom' => 5, 'margin-left' => 5, 'footer-font-size' => 8, 'footer-center' => 'Pagina [page] de [toPage]']);
        return $html->download('BULTO' . '.pdf');
    }

    public function pdf_qr_2($proyecto, $intIdTipoProducto, $intIdProyZona, $intIdProyTarea, $varModelo, $varBulto, $tipo) {
        //dd($proyecto, $intIdTipoProducto, $intIdProyZona, $intIdProyTarea, $varModelo, $varBulto);
        //dd($data, $tipo);
        //dd($data_bulto);
        //dd(rawurldecode($varBulto));
        $array_temporal_2 = [];
        $array_temporal_detalle = [];
        $datos_array_DETALLE = "";
        //dd($data_bulto);
        $lista_bulto_cabecera = [
            'intIdProy' => intval($proyecto),
            'intIdTipoProducto' => intval($intIdTipoProducto),
            'intIdProyZona' => intval($intIdProyZona),
            'intIdProyTarea' => intval($intIdProyTarea),
            'varCodiElemento' => "'" . urldecode($varModelo) . "'",
            'varBulto' => "'" . urldecode($varBulto) . "'"
        ];
        //dd($lista_bulto_cabecera);
        $ch = curl_init('http://localhost/GestionProyectos/public/index.php/list_bulto_total');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $lista_bulto_cabecera);
        $data = curl_exec($ch);
        curl_close($ch);
        $datos_array = json_decode($data, true);
        //dd($datos_array);
        for ($j = 0; count($datos_array) > $j; $j++) {
            array_push($array_temporal_2, ["nomb_proyecto" => $datos_array['data'][$j]['nomb_proyecto'],
                "varDescTipoProd" => $datos_array['data'][$j]['varDescTipoProd'],
                "varDescrip" => $datos_array['data'][$j]['varDescrip'],
                "varDescripTarea" => $datos_array['data'][$j]['varDescripTarea'],
                "varBulto" => $datos_array['data'][$j]['varBulto'],
                "varModelo" => $datos_array['data'][$j]['varModelo'],
                "deciPesoNeto" => $datos_array['data'][$j]['deciPesoNeto'],
                "deciPesoBruto" => $datos_array['data'][$j]['deciPesoBruto'],
                "deciArea" => $datos_array['data'][$j]['deciArea'],
                "cantidad" => $datos_array['data'][$j]['cantidad'],
                "tipo" => $tipo,
                "intIdProy" => intval($proyecto),
                "intIdTipoProducto" => intval($intIdTipoProducto),
                "intIdProyZona" => intval($intIdProyZona),
                "intIdProyTarea" => intval($intIdProyTarea),
                "varModelo" => $varModelo,
                "varBulto" => urldecode($varBulto)
            ]);
        }
        $lista_bulto_DETALLE = [
            'intIdProy' => intval($proyecto),
            'intIdTipoProducto' => intval($intIdTipoProducto),
            'varBulto' => urldecode($varBulto)
        ];
        if ($tipo === "1") {
            $ch3 = curl_init('http://localhost/GestionProyectos/public/index.php/listar_por_codigo_bulto');
            curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch3, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch3, CURLOPT_POST, true);
            curl_setopt($ch3, CURLOPT_POSTFIELDS, $lista_bulto_DETALLE);
            $data_DETALLE = curl_exec($ch3);
            curl_close($ch3);
            $datos_array_DETALLE = json_decode($data_DETALLE, true);
            //dd($datos_array_DETALLE);
        } else {
            $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/listar_bulto_detalle');
            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch2, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch2, CURLOPT_POST, true);
            curl_setopt($ch2, CURLOPT_POSTFIELDS, $lista_bulto_DETALLE);
            $data_DETALLE = curl_exec($ch2);
            curl_close($ch2);
            $datos_array_DETALLE = json_decode($data_DETALLE, true);
            //dd($datos_array_DETALLE);
        }
        for ($x = 0; count($datos_array_DETALLE['data']) > $x; $x++) {
            if ($tipo === "1") {
                $cantidad = $datos_array_DETALLE['data'][$x]['cantidad'];
            } else {
                $cantidad = 0;
            }
            array_push($array_temporal_detalle, ["varCodiElemento" => $datos_array_DETALLE['data'][$x]['varCodiElemento'],
                "varDescripcion" => $datos_array_DETALLE['data'][$x]['varDescripcion'],
                "intRevision" => $datos_array_DETALLE['data'][$x]['intRevision'],
                "intCantRepro" => $datos_array_DETALLE['data'][$x]['intCantRepro'],
                "varPerfil" => $datos_array_DETALLE['data'][$x]['varPerfil'],
                "varCodigoPaquete" => $datos_array_DETALLE['data'][$x]['varCodigoPaquete'],
                "deciPesoNeto" => $datos_array_DETALLE['data'][$x]['deciPesoNeto'],
                "deciPesoBruto" => $datos_array_DETALLE['data'][$x]['deciPesoBruto'],
                "deciArea" => $datos_array_DETALLE['data'][$x]['deciArea'],
                "varBulto" => $datos_array_DETALLE['data'][$x]['varBulto'],
                "deciAlto" => $datos_array_DETALLE['data'][$x]['deciAlto'],
                "deciAncho" => $datos_array_DETALLE['data'][$x]['deciAncho'],
                "deciLong" => $datos_array_DETALLE['data'][$x]['deciLong'],
                "cantidad" => $cantidad]);
        }
        $html = PDF::loadView('Despacho/rotula_qr', ['array_temporal_2' => $array_temporal_2, 'array_temporal_detalle' => $array_temporal_detalle, 'tipo' => $tipo]);
        //dd($html);

        $html->setOptions(['margin-top' => 0, 'margin-right' => 5, 'margin-bottom' => 5, 'margin-left' => 5, 'footer-font-size' => 8, 'footer-center' => 'Pagina [page] de [toPage]']);
        return $html->download('BULTO' . '.pdf');
    }

    function pdf_reproceso($ot, $codigoproducto, $idreproceso, $canti, $etapaorigen, $etapadestino, $pesos, $motivo, $observacion, $acti_usua, $acti_hora, $estado, $user) {
        // dd($ot, $codigoproducto, $idreproceso, $canti, $etapaorigen, $etapadestino, $pesos, $motivo, $observacion, $acti_usua, $acti_hora, $estado,$user);
        $reproceso_detalle = [
            'intIdreproceso' => intval($idreproceso),
        ];

        $url = "http://localhost/GestionReprocesos/public/index.php/repr_deta";
        $ch5 = curl_init($url);

        curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch5, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch5, CURLOPT_POST, true);
        curl_setopt($ch5, CURLOPT_POSTFIELDS, $reproceso_detalle);
        $data = curl_exec($ch5);
        $datos_array = json_decode($data, true);
        $array_temp = $datos_array['data'];
        //dd($array_temp);
        date_default_timezone_set('America/Lima');
        $current_date = date('Y/m/d H:i:s');

        $idreproceso = str_pad($idreproceso, 6, '0', STR_PAD_LEFT);

        $html = PDF::loadView('Reproceso/pdf_reproceso', ['detalle' => $array_temp, 'user' => $user, "codigo_ot" => $ot, "codigo_producto" => $codigoproducto, "idreproceso" => $idreproceso, "cantidad" => $canti, "origen" => $etapaorigen, "destino" => $etapadestino, "pesos" => $pesos, "motivo" => $motivo, "observacion" => $observacion, "acti_usua" => $acti_usua, "fecha_hora" => $acti_hora, "estado" => $estado,]);
        $html->setOptions(['margin-top' => 0, 'margin-right' => 5, 'margin-bottom' => 5, 'margin-left' => 5, 'footer-font-size' => 8, 'footer-left' => 'Creado por ' . $user, 'footer-center' => 'Pagina [page] de [toPage]', 'footer-right' => 'hora creada ' . $current_date]);
        return $html->download($idreproceso . '.pdf');
    }

    public function generar_guia_remision($idguia, $tipo_reporte) {
        $data_guia = json_decode($idguia);
        $cabecera = [];
        $detalle = [];
        //dd($data_guia);
        for ($i = 0; count($data_guia) > $i; $i++) {
            $guia = [
                'intIdGuia' => intval($data_guia[$i]->id),
            ];
            //dd($idguia,$tipo_reporte);
            $reporte = $tipo_reporte;
            $ch1 = curl_init('http://localhost/GestionProyectos/public/index.php/listar_guia');
            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch1, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch1, CURLOPT_POST, true);
            curl_setopt($ch1, CURLOPT_POSTFIELDS, $guia);
            $data_DETALLE = curl_exec($ch1);
            curl_close($ch1);
            $datos_array_DETALLE = json_decode($data_DETALLE, true);
            //dd($datos_array_DETALLE);
            for ($c = 0; count($datos_array_DETALLE['data']) > $c; $c++) {
                array_push($cabecera, ['Fecha_Emision' => $datos_array_DETALLE['data'][$c]['Fecha_Emision'],
                    'Anio_emision' => $datos_array_DETALLE['data'][$c]['Anio_emision'],
                    'Mes_emision' => $datos_array_DETALLE['data'][$c]['Mes_emision'],
                    'Dia_emision' => $datos_array_DETALLE['data'][$c]['Dia_emision'],
                    'Fecha_Traslado' => $datos_array_DETALLE['data'][$c]['Fecha_Traslado'],
                    'Anio_Traslado' => $datos_array_DETALLE['data'][$c]['Anio_Traslado'],
                    'Mes_Traslado' => $datos_array_DETALLE['data'][$c]['Mes_Traslado'],
                    'Dia_Traslado' => $datos_array_DETALLE['data'][$c]['Dia_Traslado'],
                    'Serie_Codigo' => $datos_array_DETALLE['data'][$c]['Serie_Codigo'],
                    'varAlias' => $datos_array_DETALLE['data'][$c]['varAlias'],
                    'Direccion_Salida' => $datos_array_DETALLE['data'][$c]['Direccion_Salida'],
                    'Distrito_Salida' => $datos_array_DETALLE['data'][$c]['Distrito_Salida'],
                    'Provincia_Salida' => $datos_array_DETALLE['data'][$c]['Provincia_Salida'],
                    'Departamento_Salida' => $datos_array_DETALLE['data'][$c]['Departamento_Salida'],
                    'Direccion_Llegada' => $datos_array_DETALLE['data'][$c]['Direccion_Llegada'],
                    'Distrito_Llegada' => $datos_array_DETALLE['data'][$c]['Distrito_Llegada'],
                    'Provincia_Llegada' => $datos_array_DETALLE['data'][$c]['Provincia_Llegada'],
                    'Departamento_Llegada' => $datos_array_DETALLE['data'][$c]['Departamento_Llegada'],
                    'Razon_Social_Cliente' => $datos_array_DETALLE['data'][$c]['Razon_Social_Cliente'],
                    'Ruc_Cliente' => $datos_array_DETALLE['data'][$c]['Ruc_Cliente'],
                    'Nombre_Chofer' => $datos_array_DETALLE['data'][$c]['Nombre_Chofer'],
                    'Documento_Chofer' => $datos_array_DETALLE['data'][$c]['Documento_Chofer'],
                    'Licencia_Documento' => $datos_array_DETALLE['data'][$c]['Licencia_Documento'],
                    'Orden_Trabajo' => $datos_array_DETALLE['data'][$c]['Orden_Trabajo'],
                    'Referencia' => $datos_array_DETALLE['data'][$c]['Referencia'],
                    'Razon_Social_Transportista' => $datos_array_DETALLE['data'][$c]['Razon_Social_Transportista'],
                    'Documento_Transportista' => $datos_array_DETALLE['data'][$c]['Documento_Transportista'],
                    'Motivo' => $datos_array_DETALLE['data'][$c]['Motivo'],
                    'intIdGuia' => $datos_array_DETALLE['data'][$c]['intIdGuia'],
                    'varCodiProy' => $datos_array_DETALLE['data'][$c]['varCodiProy'],
                    'varMotiCome' => $datos_array_DETALLE['data'][$c]['varMotiCome'],
                    'varTituGuia' => $datos_array_DETALLE['data'][$c]['varTituGuia']
                ]);
            }
            if ($reporte === "1") {
                $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/detalle_guia_cantidad');
                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch2, CURLINFO_HEADER_OUT, true);
                curl_setopt($ch2, CURLOPT_POST, true);
                curl_setopt($ch2, CURLOPT_POSTFIELDS, $guia);
                $data_DETALLE_2 = curl_exec($ch2);
                curl_close($ch2);
                $datos_array_DETALLE_2 = json_decode($data_DETALLE_2, true);
            } else {
                $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/detalle_guia');
                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch2, CURLINFO_HEADER_OUT, true);
                curl_setopt($ch2, CURLOPT_POST, true);
                curl_setopt($ch2, CURLOPT_POSTFIELDS, $guia);
                $data_DETALLE_2 = curl_exec($ch2);
                curl_close($ch2);
                $datos_array_DETALLE_2 = json_decode($data_DETALLE_2, true);
            }
            //dd($datos_array_DETALLE_2['data']);
            for ($d = 0; count($datos_array_DETALLE_2['data']) > $d; $d++) {
                if ((int) $datos_array_DETALLE_2['data'][$d]['varGuia'] === (int) $data_guia[$i]->id) {
                    array_push($detalle, ['varCodiElemento' => $datos_array_DETALLE_2['data'][$d]['varCodiElemento'],
                        'cantidad' => $datos_array_DETALLE_2['data'][$d]['cantidad'],
                        'varDescripcion' => $datos_array_DETALLE_2['data'][$d]['varDescripcion'],
                        'varPerfil' => $datos_array_DETALLE_2['data'][$d]['varPerfil'],
                        'deciLong' => $datos_array_DETALLE_2['data'][$d]['deciLong'],
                        'nume_guia' => $datos_array_DETALLE_2['data'][$d]['nume_guia'],
                        'varGuia' => $datos_array_DETALLE_2['data'][$d]['varGuia'],
                        'varBulto' => $datos_array_DETALLE_2['data'][$d]['varBulto'],
                        'varValo5' => $datos_array_DETALLE_2['data'][$d]['varValo5'],
                        'varDescTipoGrupo' => $datos_array_DETALLE_2['data'][$d]['varDescTipoGrupo'],
                    ]);
                }
            }
            //dd($detalle);
        }
        //dd($cabecera,$detalle);
        $html = PDF::loadView('Guia_Remision/guia_remision_pdf', ['cabecera' => $cabecera, 'detalle' => $detalle]);
        $html->setOptions(['margin-top' => 0, 'margin-right' => 5, 'margin-bottom' => 5, 'margin-left' => 5]);
        return $html->download('Guia_Remision' . '.pdf');
    }

    public function pdf_contrato_valorizacion($idcontrato, $user) {

        $contrato = [
            'intIdContrato' => intval($idcontrato),
        ];
        $ch1 = curl_init('http://localhost/GestionProyectos/public/index.php/contrato_id');
        curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch1, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch1, CURLOPT_POST, true);
        curl_setopt($ch1, CURLOPT_POSTFIELDS, $contrato);
        $data_DETALLE = curl_exec($ch1);
        curl_close($ch1);
        $datos_array_DETALLE = json_decode($data_DETALLE, true);

        $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/contrato_tarifa');
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch2, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch2, CURLOPT_POST, true);
        curl_setopt($ch2, CURLOPT_POSTFIELDS, $contrato);
        $data_tarifa = curl_exec($ch2);
        curl_close($ch2);
        $datos_array_tarifa = json_decode($data_tarifa, true);

        $ch3 = curl_init('http://localhost/GestionProyectos/public/index.php/valorizacion_contrato');
        curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch3, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch3, CURLOPT_POST, true);
        curl_setopt($ch3, CURLOPT_POSTFIELDS, $contrato);
        $data_valorizacion = curl_exec($ch3);
        curl_close($ch3);
        $datos_array_valorizacion = json_decode($data_valorizacion, true);
        date_default_timezone_set('America/Lima');
        $current_date = date('Y/m/d H:i:s');
        $html = PDF::loadView('Contrato/pdf_c', ['cabecera' => $datos_array_DETALLE['data'], 'tarifa' => $datos_array_tarifa['data'], 'valorizacion' => $datos_array_valorizacion['data'], 'user' => $user, 'fecha_hora' => $current_date]);
        $html->setOptions(['margin-top' => 0, 'margin-right' => 5, 'margin-bottom' => 5, 'margin-left' => 5, 'footer-center' => 'Pagina [page] de [toPage]']);
        return $html->download('ContratoxNombreContratistaxNumeroOT' . '.pdf');
    }

}
