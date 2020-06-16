<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use DB;
use PHPUnit\Framework\Constraint\Count;
use Illuminate\Support\Facades\Storage;

class Precio_Especifico extends Controller {

    function validar_precio_especifico() {

        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array());
        $nombre_user = $_POST['nombre_user'];
        $post = (isset($_POST['ot']) && !empty($_POST['ot'])) && (isset($_POST['producto']) && !empty($_POST['producto'])) && (isset($_FILES['subir_archivo']) && !empty($_FILES['subir_archivo']));
        $codigo_producto = intval($_POST['producto']);
        if ($post) {
            $elements = explode(" /", $_POST['ot']);
            //dd($elements);
            $ot = [
                'varCodiProy' => $elements[0]
            ];
            //dd($ot);
            //dd($ot_json);
            // Prepare new cURL resource
            $ch = curl_init('http://localhost/Asignaciones/public/index.php/vali_OT');
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
                        $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER CSV.";
                    } else {
                        $file_name = $_FILES['subir_archivo']['tmp_name'];
                        //echo $file_name;
                        if ($_FILES["subir_archivo"]["size"] > 0) {

                            $file = fopen($file_name, "r");
                            $file2 = fopen($file_name, "r");
                            $file3 = fopen($file_name, "r");
                            $total_fila = 0;
                            $si_es_la_ot = false;
                            $numero_fila = 1;
                            $start_row = 3;
                            $filas_part_list = 0;

                            /**
                             * PRIMERO SE VALIDA SI LA OT DENTRO DEL EXCEL ES IGUAL A LA OT INGRESADA
                             * SE COLOCA UN VALOR TRUE SI ES VERDAD SI ES FALSO SALTA UN ERROR
                             */
                            while (($data_file3 = fgetcsv($file3, 100000, ",")) !== FALSE) {
                                //dd("ingesa aca al while");
                                if ($numero_fila === 1) {

                                    for ($i = 0; $i < $numero_fila; $i++) {
                                        $ot_compara = $data_file3[0];
                                        //dd($ot_compara);
                                    }
                                    if (mb_strtoupper(trim($ot_compara)) === mb_strtoupper($elements[0])) {
                                        $si_es_la_ot = true;
                                    }
                                }
                            }
                            fclose($file3);
                            //dd($si_es_la_ot);
                            if ($si_es_la_ot == true) {
                                $eliminar = [
                                    'UsuarioCarga' => $nombre_user
                                ];
                                $ch2 = curl_init('http://localhost/GestionCostos/public/index.php/elim_dato_temp');
                                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                                curl_setopt($ch2, CURLINFO_HEADER_OUT, true);
                                curl_setopt($ch2, CURLOPT_POST, true);
                                curl_setopt($ch2, CURLOPT_POSTFIELDS, $eliminar);
                                $data = curl_exec($ch2);
                                //dd($data);
                                curl_close($ch2);

                                $datos_array2 = json_decode($data, true);
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
                                            if (strlen($data_file[3]) <= 0) {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA D CAMPO PRECIO OBLIGATORIO.";
                                            } else {
                                                if (is_numeric($data_file[3])) {
                                                    
                                                } else {
                                                    $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA D CAMPO PRECIO NO ES NUMERICO.";
                                                }
                                            }

                                            if (count($validar['validacion']) === 0) {

                                                $temporal = [
                                                    'codigo' => $data_file[0],
                                                    'intSerie' => $data_file[1],
                                                    'intIdEtapa' => $data_file[2],
                                                    'numPrecio' => $data_file[3],
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
                                    //dd("rgistr de tempral");
                                    fclose($file);
                                    if (count($validar['validacion']) === 0) {
                                        $filas_registradas = 0;
                                        $registrar_precio = [
                                            'v_intIdproy' => intval($id),
                                            'v_intIdTipoProducto' => $codigo_producto,
                                            'v_intIdTipo' => 1,
                                            'v_Usuario' => $nombre_user
                                        ];
                                        //dd($registrar_precio);
                                        $ch4 = curl_init('http://localhost/GestionCostos/public/index.php/carg_arc_cost_espe');
                                        curl_setopt($ch4, CURLOPT_RETURNTRANSFER, true);
                                        curl_setopt($ch4, CURLINFO_HEADER_OUT, true);
                                        curl_setopt($ch4, CURLOPT_POST, true);
                                        curl_setopt($ch4, CURLOPT_POSTFIELDS, $registrar_precio);
                                        $data = curl_exec($ch4);

                                        curl_close($ch4);
                                        $datos_array3 = json_decode($data, true);

                                        $mensaje_final = $datos_array3['data'];
                                        //dd($mensaje_final);
                                        if ($mensaje_final === "") {
                                            
                                        } else {
                                            for ($i = 0; count($mensaje_final) > $i; $i++) {
                                                $validar['validacion'][] .= "CODIGO" . " " . $mensaje_final[$i]['codigo'] . "," . "MENSAJE" . " " . $mensaje_final[$i]['mensaje'];
                                            }
                                        }
                                    }
                                    //dd($validar);
                                    if (count($validar["validacion"]) > 0) {
                                        $validar["mensaje"] = "* EL CVS DE PRECIOS ESPECIFICOS CONTIENE ERRORES CULPA DE ANDY";
                                        //return json_encode($validar);
                                    } else {
                                        $validar["mensaje"] = "ok";
                                    }
                                    //dd($validar);
                                }
                            } else {
                                //dd("ingresa al error");
                                $validar['validacion'][] .= "* ERROR EN LA FILA 1 COLUMNA A CAMPO OT NO SON IGUALES A LA INGRESADA.";
                                //dd($validar);
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
        //dd($validar);
        return json_encode($validar);
    }

}
