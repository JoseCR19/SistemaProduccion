<?php

namespace App\Http\Controllers;

use App\Clientes;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use PHPUnit\Framework\Constraint\Count;
use Illuminate\Support\Facades\Storage;

class Precio_Costo extends Controller {

    function validar_precio_costo() {



        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array());

        $nombre_user = $_POST['nombre_user'];
        $post = (isset($_POST['ot']) && !empty($_POST['ot'])) && (isset($_POST['producto']) && !empty($_POST['producto'])) && (isset($_FILES['subir_archivo']) && !empty($_FILES['subir_archivo']));
        //dd($_POST['ot']);
        $codigo_producto = intval($_POST['producto']);
        $etapa = intval($_POST['etapa']);

        if ($post) {
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
            $domainName = $_SERVER['HTTP_HOST'] . '/';
            $url = $protocol . $domainName;
            //dd($url);
            $elements = explode(" /", $_POST['ot']);
            //dd($elements);
            $ot = [
                'varCodiProy' => $elements[0]
            ];
            //dd($ot);
            //dd($ot_json);
            // Prepare new cURL resource
            //dd(curl_init($url.'Asignaciones/public/index.php/vali_OT'));
            $ch = curl_init('http://localhost/' . 'Asignaciones/public/index.php/vali_OT');

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $ot);
            $data = curl_exec($ch);
            //dd($data);
            curl_close($ch);
            $datos_array = json_decode($data, true);

            $mensaje = $datos_array['data']['mensaje'];

            if ($mensaje == "Error.") {
                $validar["mensaje"] = "* EL CODIGO DE OT NO EXISTE";
            } else {
                $id = $datos_array['data']['id'];
                //dd($id);
                if (!empty($_FILES['subir_archivo']['name'])) {
                    //$allowed_ext = array('csv');
                    $output = "";
                    $allowed_ext = array("csv");
                    $data_exte = explode(".", $_FILES['subir_archivo']['name']);
                    $mayuscula = strtoupper($data_exte[1]);
                    $nombre_archivo = strtoupper($data_exte[0]);

                    if ($mayuscula != "CSV") {
                        $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER .CSV";
                    } else {
                        $file_name = $_FILES['subir_archivo']['tmp_name'];
                        //echo $file_name;
                        if ($_FILES["subir_archivo"]["size"] > 0) {
                            $file = fopen($file_name, "r");
                            $file3 = fopen($file_name, "r");
                            $total_fila = 0;
                            $si_es_la_ot = false;
                            $numero_fila = 1;
                            $start_row = 3;
                            $filas_part_list = 0;
                            $filas_registradas = 0;
                            /**
                             * PRIMERO SE VALIDA SI LA OT DENTRO DEL EXCEL ES IGUAL A LA OT INGRESADA
                             * SE COLOCA UN VALOR TRUE SI ES VERDAD SI ES FALSO SALTA UN ERROR
                             */
                            while (($data_file3 = fgetcsv($file3, 10000, ",")) !== FALSE) {

                                if ($numero_fila === 1) {

                                    for ($i = 0; $i < $numero_fila; $i++) {
                                        $ot_compara = $data_file3[0];
                                        //dd($ot_compara);
                                    }
                                    if (mb_strtoupper(trim($ot_compara)) === mb_strtoupper(trim($elements[0]))) {
                                        $si_es_la_ot = true;
                                    }
                                }
                            }
                            //dd($si_es_la_ot);
                            fclose($file3);
                            if ($si_es_la_ot == true) {


                                $eliminar = [
                                    'UsuarioCarga' => $nombre_user
                                ];
                                //dd($eliminar);
                                /* ELIMINADOS LOS DATOS DE LA TABLA TEMPORAL */
                                //dd(curl_init($url.'GestionCostos/public/index.php/elim_dato_temp'));
                                
                                $ch2 = curl_init('http://localhost/GestionCostos/public/index.php/elim_dato_temp');
                                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                                curl_setopt($ch2, CURLINFO_HEADER_OUT, true);
                                curl_setopt($ch2, CURLOPT_POST, true);
                                curl_setopt($ch2, CURLOPT_POSTFIELDS, $eliminar);
                                $data = curl_exec($ch2);

                                curl_close($ch2);

                                $datos_array2 = json_decode($data, true);
                                //dd($datos_array2);
                                $mensaje = $datos_array2['data']['mensaje'];
                                ///dd($si_es_la_ot);
                                //echo "ingresa siempre y cuando es el mismo de la ot";
                                if ($mensaje === "") {
                                    while (($data_file = fgetcsv($file, 100000, ",")) !== FALSE) {
                                        $total_fila++;
                                        /**
                                         * SE CONTABILIZA APARTIR DE LA FILA NUMERO 3 YA QUE LA FILA 1 ES LA OT Y LA SEGUNDA ES LA CABECERA
                                         */
                                        if ($total_fila >= $start_row) {
                                            $filas_part_list++;
                                            if (empty(mb_strtoupper(trim($data_file[0]), 'UTF-8'))) {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO CODIGO OBLIGATORIO.";
                                            } else {
                                                
                                            }
                                            if (strlen($data_file[1]) <= 0) {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA B CAMPO SERIES OBLIGATORIO.";
                                            } else {
                                                if (is_numeric($data_file[1])) {
                                                    
                                                } else {
                                                    $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA B CAMPO SERIES NO ES NUMERICO.";
                                                }
                                            }
                                            if (strlen($data_file[2]) <= 0) {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO ETAPA OBLIGATORIO.";
                                            } else {
                                                if (is_numeric($data_file[2])) {
                                                    
                                                } else {
                                                    $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO ETAPA NO ES NUMERICO.";
                                                }
                                            }

                                            if (count($validar['validacion']) === 0) {

                                                $temporal = [
                                                    'codigo' => $data_file[0],
                                                    'intIdEtapa' => intval($data_file[1]),
                                                    'numPrecio' => $data_file[2],
                                                    'UsuarioCarga' => $nombre_user
                                                ];
                                                //dd($temporal);
                                                $ch3 = curl_init('http://localhost/GestionCostos/public/index.php/regi_tabl_temp');
                                                curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
                                                curl_setopt($ch3, CURLINFO_HEADER_OUT, true);
                                                curl_setopt($ch3, CURLOPT_POST, true);
                                                curl_setopt($ch3, CURLOPT_POSTFIELDS, $temporal);
                                                $data = curl_exec($ch3);
                                                //dd($data);
                                                curl_close($ch3);
                                                $datos_array3 = json_decode($data, true);
                                                //dd($datos_array3);
                                            }
                                        }
                                    }
                                    fclose($file);
                                    if (count($validar['validacion']) === 0) {
                                        $registrar_precio = [
                                            'v_intIdproy' => intval($id),
                                            'v_intIdTipoProducto' => intval($codigo_producto),
                                            'v_intIdEtapa' => intval($etapa),
                                            'v_Usuario' => $nombre_user
                                        ];
                                        //dd($registrar_precio);
                                        $ch4 = curl_init('http://localhost/GestionCostos/public/index.php/regi_prec_elem');
                                        curl_setopt($ch4, CURLOPT_RETURNTRANSFER, true);
                                        curl_setopt($ch4, CURLINFO_HEADER_OUT, true);
                                        curl_setopt($ch4, CURLOPT_POST, true);
                                        curl_setopt($ch4, CURLOPT_POSTFIELDS, $registrar_precio);
                                        $data = curl_exec($ch4);
                                        //dd($data);
                                        curl_close($ch4);
                                        $datos_array3 = json_decode($data, true);
                                        //dd($datos_array3);
                                        $mensaje_final = $datos_array3['data'];
                                        //dd($mensaje_final);
                                        if (count($mensaje_final) === 0) {
                                            
                                        } else {
                                            for ($i = 0; count($mensaje_final) > $i; $i++) {
                                                $validar['validacion'][] .= "CODIGO" . " " . $mensaje_final[$i]['codigo'] . "," . "MENSAJE" . " " . $mensaje_final[$i]['mensaje'];
                                            }
                                        }
                                    }
                                    //dd($validar);
                                    if (count($validar["validacion"]) > 0) {

                                        $validar["mensaje"] = "* EL CVS DE PRECIOS COSTOS CONTIENE ERRORES CULPA DE ANDY";
                                    } else {
                                        $validar["mensaje"] = "OK";
                                    }
                                }
                            } else {
                                $validar['validacion'][] .= "* ERROR EN LA FILA 1 COLUMNA A CAMPO OT NO SON IGUALES A LA INGRESADA.";
                            }
                        } else {
                            $validar["mensaje"] = "* NO HAY DATOS EN EL ARCHIVO";
                        }
                    }
                } else {
                    $validar["mensaje"] = "* NO HA CARGADO NINGUN ARCHIVO";
                }
            }
        } else {
            $validar["mensaje"] = "* TODO LOS CAMPOS SON OBLIGATORIOS";
        }
        //dd(json_encode($validar));
        return json_encode($validar);
    }

}
