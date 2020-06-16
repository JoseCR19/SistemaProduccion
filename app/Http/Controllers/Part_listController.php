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

set_time_limit(0);

class Part_listController extends Controller {

    function validar_part_list() {
        $TIPO_CARGA = $_POST['carga'];
        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array());
        $zona_data = array('zona' => array(), 'id' => array());
        $nombre_user = $_POST['nombre_user'];
        $post = (isset($_POST['ot']) && !empty($_POST['ot'])) && (isset($_POST['descripcion']) && !empty($_POST['descripcion'])) && (isset($_POST['producto']) && !empty($_POST['producto'])) && (isset($_POST['carga']) && !empty($_POST['carga'])) && (isset($_FILES['subir_archivo']) && !empty($_FILES['subir_archivo'])) && (isset($_POST['inlineRadioOptions']) && !empty($_POST['inlineRadioOptions']));

        if ($post) {
            $elements = explode(" /", $_POST['ot']);
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
                            $tota_regi = 0;
                            $total_fila = 0;
                            $total_fila_1 = 0;
                            $temporal_if = 0;
                            $temporal_i = 0;
                            $tarea_tempora = 0;
                            $zona_temporal = "";
                            $condicion = 'si';
                            $variable = 0;
                            $array_excel3 = array();
                            $array_temporal = array();
                            $array_temporal2 = array();
                            $array_temporal3 = array();
                            $array_temporal4 = array();
                            $array_temporal5 = array();
                            $array_zona = [];
                            $array_zona_tarea = [];
                            $tarea_zona = [];
                            $array_tarea = array();
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

                            fclose($file3);

                            if ($si_es_la_ot == true) {
                                ///dd($si_es_la_ot);
                                //echo "ingresa siempre y cuando es el mismo de la ot";
                                while (($data_file = fgetcsv($file, 100000, ",")) !== FALSE) {
                                    $total_fila++;
                                    /**
                                     * SE CONTABILIZA APARTIR DE LA FILA NUMERO 3 YA QUE LA FILA 1 ES LA OT Y LA SEGUNDA ES LA CABECERA
                                     */
                                    if ($total_fila >= $start_row) {
                                        $filas_part_list++;

                                        if (strlen($data_file[2]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO REVISION OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[2])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO REVISION NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[3]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA D CAMPO CANTIDAD OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[3])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA D CAMPO CANTIDAD NO ES NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[6]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA G CAMPO PERFIL OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[7]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA H CAMPO LONGITUD OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[7])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA H CAMPO LONGITUD NO ES NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[8]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA I CAMPO DESCRIPCTION OBLIGATORIO.";
                                        } else {
                                            
                                        }

                                        if (strlen($data_file[10]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA K CAMPO PESO NETO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[10])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA K CAMPO PESO NETO NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[11]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA L CAMPO PESO BRUTO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[11])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA L CAMPO PESO BRUTO NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[12]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA M CAMPO PESO CONTRATADO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[12])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA M CAMPO PESO CONTRATADO NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[13]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA N CAMPO AREA  OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[13])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA N CAMPO AREA  NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[14]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA O CAMPO ANCHO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[14])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA P CAMPO ANCHO  NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[15]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA Q CAMPO ALTO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[15])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA Q CAMPO ALTO  NO ES NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[16]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA R CAMPO MODELO OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[17]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA 18 CAMPO CODIGO VAL OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[0]), 'UTF-8'))) {
                                            /* SI EL CAMPO ESTA VACIO ME MANDA UN ERROR */
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO GRUPO OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        /* VALIDAMOS LOS CAMPOS VACIOS */
                                        if (empty(mb_strtoupper(trim($data_file[4]), 'UTF-8'))) {
                                            /* SI EL CAMPO ZONA ESTA VACIO MENSAJE DE ERROR */
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA E CAMPO ZONA OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[5]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO TAREA OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[1]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA B CAMPO MARCA OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[9]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA J CAMPO TIPO ESTRUCTURADO OBLIGATORIO.";
                                        } else {
                                            $t_etructurado = [
                                                'varDescTipoEstru' => mb_strtoupper(trim($data_file[9]), 'UTF-8'),
                                            ];
                                            $ch1 = curl_init('http://localhost/GestionProyectos/public/index.php/validar_TipoEstructurado');
                                            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch1, CURLOPT_POSTFIELDS, $t_etructurado);
                                            $tipo_estructurado = curl_exec($ch1);
                                            curl_close($ch1);
                                            $array_tipo_estructurado = json_decode($tipo_estructurado, true);
                                            $mensaje1 = $array_tipo_estructurado['data']['mensaje'];
                                            if ($mensaje1 == "Error.") {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA J CAMPO TIPO ESTRUCTURADO NO EXISTE, POR FAVOR DE REGISTRAR";
                                            } else {
                                                $id_tipo_estructurado_insert = $array_tipo_estructurado['data']['id'];
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[18]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA S CAMPO TIPO ESTRUCTURA OBLIGATORIO.";
                                        } else {
                                            $t_etructura = [
                                                'varCodiEstru' => mb_strtoupper(trim($data_file[18]), 'UTF-8'),
                                            ];
                                            $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/validar_TipoEstructura');
                                            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch2, CURLOPT_POSTFIELDS, $t_etructura);
                                            $tipo_estructura = curl_exec($ch2);
                                            curl_close($ch2);
                                            $array_tipo_estructura = json_decode($tipo_estructura, true);
                                            $mensaje2 = $array_tipo_estructura['data']['mensaje'];
                                            if ($mensaje2 == "Error.") {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA S CAMPO TIPO ESTRUCTURA NO EXISTE, POR FAVOR DE REGISTRAR";
                                            } else {
                                                $id_estructurado_insert = $array_tipo_estructura['data']['id'];
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[19]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA T CAMPO TIPO GRUPO ESTRUCTURA OBLIGATORIO.";
                                        } else {
                                            $G_t_etructura = [
                                                'varCodiTipoGrupo' => mb_strtoupper(trim($data_file[19]), 'UTF-8'),
                                            ];
                                            $chG = curl_init('http://localhost/GestionPartList/public/index.php/vali_tipo_grup');
                                            curl_setopt($chG, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($chG, CURLOPT_POSTFIELDS, $G_t_etructura);
                                            $tipo_estructura = curl_exec($chG);
                                            curl_close($chG);
                                            $array_tipo_estructura = json_decode($tipo_estructura, true);
                                            $mensaje2 = $array_tipo_estructura['data']['mensaje'];
                                            if ($mensaje2 == "") {
                                                $id_grupo_estructurado = $array_tipo_estructura['data']['id'];
                                                if (mb_strtoupper(trim($data_file[19]), 'UTF-8') !== "ESTR") {
                                                    $array_pintura = 0;
                                                    if ($data_file[25]) {
                                                        if (is_numeric($data_file[25])) {
                                                            $array_cantidad = (float) $data_file[25];
                                                        } else {
                                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA  CANTIDAD ACCESORIOS  NO ES NUMERICO.";
                                                        }
                                                    } else {
                                                        $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA CANTIDAD ACCESORIOS OBLIGATORIO ";
                                                    }
                                                } else {
                                                    $array_cantidad = 0;
                                                    //dd(is_numeric($data_file[26]));
                                                    if ($data_file[26]) {
                                                        //dd(is_numeric($data_file[26]));
                                                        if (is_numeric($data_file[26])) {
                                                            $array_pintura = (float) $data_file[26];
                                                        } else {
                                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA  AREA PINTURA  NO ES NUMERICO.";
                                                        }
                                                    } else {
                                                        $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA AREA PINTURA  OBLIGATORIO ";
                                                    }
                                                }
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA T CAMPO GRUPO ESTRUCTURA $mensaje2 ";
                                            }
                                        }
                                        if ($_POST['producto'] === "1" || $_POST['producto'] === "3") {
                                            if (empty(mb_strtoupper(trim($data_file[27]), 'UTF-8'))) {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA AB CAMPO SUBOT OBLIGATORIO.";
                                            } else {
                                                $datos_zona = [
                                                    'intIdProy' => intval($id),
                                                    'intIdTipoProducto' => intval($_POST['producto']),
                                                    'varCodiProy' => mb_strtoupper(trim($elements[0])),
                                                    'varDescrip' => mb_strtoupper($data_file[4]),
                                                    'varCodSubOt' => mb_strtoupper($data_file[27])
                                                ];
                                                /* MEDIANTE EL PROCEDIMIENTO DEL CURL ENVIAREMOS Y RECIBIREMOS UN MENSAJE Y UN ID DE REPUESTA Y REGISTRAMOS LOS DATOS */
                                                $ch95 = curl_init('http://localhost/GestionPartList/public/index.php/obtener_sub_ot');
                                                curl_setopt($ch95, CURLOPT_RETURNTRANSFER, true);
                                                curl_setopt($ch95, CURLOPT_POSTFIELDS, $datos_zona);
                                                $zona_insert = curl_exec($ch95);
                                                curl_close($ch95);
                                                $array_zona_insert = json_decode($zona_insert, true);
                                                $mensaje_zona_insert = $array_zona_insert['data']['mensaje'];
                                                
                                                if ($mensaje_zona_insert === "Exito.") {
                                                    $descripcion = $array_zona_insert['data']['desProd'];
                                                } else {
                                                    $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA AA CAMPO SUB OT:" . " " . $mensaje_zona_insert;
                                                }
                                            }
                                        }

                                        //dd($id_grupo_estructurado);
                                        if (count($validar["validacion"]) == 0) {

                                            if ($_POST['producto'] === "1" || $_POST['producto'] === "3") {
                                                /* FORMAMOS UN ARRAY DE LA DATA QUE ENVIAREMOS POR CURL */
                                                $datos_zona = [
                                                    'intIdProy' => intval($id),
                                                    'intIdTipoProducto' => intval($_POST['producto']),
                                                    'varDescripTarea' => mb_strtoupper(trim($data_file[5])),
                                                    'varDescrip' => mb_strtoupper($data_file[4]),
                                                    'acti_usua' => $nombre_user,
                                                    'varCodigoPaquete' => mb_strtoupper(trim($data_file[0])),
                                                    'varCodSubOt' => mb_strtoupper($data_file[27]),
                                                    'desProd' => mb_strtoupper(trim($descripcion))
                                                ];
                                            } else {
                                                /* FORMAMOS UN ARRAY DE LA DATA QUE ENVIAREMOS POR CURL */
                                                $datos_zona = [
                                                    'intIdProy' => intval($id),
                                                    'intIdTipoProducto' => intval($_POST['producto']),
                                                    'varDescripTarea' => mb_strtoupper(trim($data_file[5])),
                                                    'varDescrip' => mb_strtoupper($data_file[4]),
                                                    'acti_usua' => $nombre_user,
                                                    'varCodigoPaquete' => mb_strtoupper(trim($data_file[0])),
                                                    'varCodSubOt' => mb_strtoupper(''),
                                                    'desProd' => mb_strtoupper(trim(''))
                                                ];
                                            }

                                            /* MEDIANTE EL PROCEDIMIENTO DEL CURL ENVIAREMOS Y RECIBIREMOS UN MENSAJE Y UN ID DE REPUESTA Y REGISTRAMOS LOS DATOS */
                                            $ch6 = curl_init('http://localhost/GestionPartList/public/index.php/regi_proy_zona');
                                            curl_setopt($ch6, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch6, CURLOPT_POSTFIELDS, $datos_zona);
                                            $zona_insert = curl_exec($ch6);
                                            curl_close($ch6);
                                            $array_zona_insert = json_decode($zona_insert, true);
                                            $mensaje_zona_insert = $array_zona_insert['data']['mensaje'];
                                            /* SI EL MENSAJE ES EXITO INGRESAMOS PARA PODER SEGUIR REGISTRANDO */
                                            if ($mensaje_zona_insert == "Exito.") {
                                                $id_zona_insert = $array_zona_insert['data']['id'];
                                                $datos_tarea = [
                                                    'intIdProyZona' => intval($id_zona_insert),
                                                    'intIdProy' => intval($id),
                                                    'intIdTipoProducto' => intval($_POST['producto']),
                                                    'varDescripTarea' => mb_strtoupper($data_file[5]),
                                                    'acti_usua' => $nombre_user,
                                                ];
                                                /* if($total_fila==4){
                                                  dd($datos_tarea);
                                                  } */
                                                $ch7 = curl_init('http://localhost/GestionPartList/public/index.php/regi_proy_tarea');
                                                curl_setopt($ch7, CURLOPT_RETURNTRANSFER, true);
                                                curl_setopt($ch7, CURLOPT_POSTFIELDS, $datos_tarea);
                                                $tarea_insert = curl_exec($ch7);
                                                curl_close($ch7);
                                                $array_tarea_insert = json_decode($tarea_insert, true);
                                                $id_tarea_mensaje = $array_tarea_insert['data']['mensaje'];
                                                if ($id_tarea_mensaje == "Exito.") {
                                                    $id_tarea_id = $array_tarea_insert['data']['id'];
                                                    $paquete = [
                                                        'intIdProy' => intval($id),
                                                        'intIdTipoProducto' => intval($_POST['producto']),
                                                        'varCodigoPaquete' => mb_strtoupper($data_file[0]),
                                                        'intIdProyTarea' => $id_tarea_id,
                                                        'intIdTipoGrupo' => intval($id_grupo_estructurado),
                                                        'acti_usua' => $nombre_user,
                                                    ];
                                                    $ch8 = curl_init('http://localhost/GestionPartList/public/index.php/regi_proy_pque');
                                                    curl_setopt($ch8, CURLOPT_RETURNTRANSFER, true);
                                                    curl_setopt($ch8, CURLOPT_POSTFIELDS, $paquete);
                                                    $paquete_insert = curl_exec($ch8);
                                                    curl_close($ch8);
                                                    $array_paquete_insert = json_decode($paquete_insert, true);
                                                    $id_paquete_mensaje = $array_paquete_insert['data']['mensaje'];
                                                    if ($id_paquete_mensaje == "Exito.") {
                                                        $id_parquete_id = $array_paquete_insert['data']['id'];
                                                        $marca = [
                                                            'intIdProy' => $id,
                                                            'varCodiElemento' => mb_strtoupper($data_file[1]),
                                                            'intIdProyPaquete' => $id_parquete_id,
                                                        ];
                                                        //dd($marca);
                                                        $ch6 = curl_init('http://localhost/GestionPartList/public/index.php/vali_marcar');
                                                        curl_setopt($ch6, CURLOPT_RETURNTRANSFER, true);
                                                        curl_setopt($ch6, CURLOPT_POSTFIELDS, $marca);
                                                        $marca_array = curl_exec($ch6);
                                                        curl_close($ch6);
                                                        $array_marca = json_decode($marca_array, true);
                                                        $array_mensaje_marca = $array_marca['data']['mensaje'];
                                                        if ($array_mensaje_marca == "Conforme.") {
                                                            if (!empty($data_file[20])) {
                                                                $valor1 = $data_file[20];
                                                            } else {
                                                                $valor1 = null;
                                                            }

                                                            if (!empty($data_file[21])) {
                                                                $valor2 = $data_file[21];
                                                            } else {
                                                                $valor2 = null;
                                                            }

                                                            if (!empty($data_file[22])) {
                                                                $valor3 = $data_file[22];
                                                            } else {
                                                                $valor3 = null;
                                                            }

                                                            if (!empty($data_file[23])) {
                                                                $valor4 = $data_file[23];
                                                            } else {
                                                                $valor4 = null;
                                                            }

                                                            if (!empty($data_file[24])) {
                                                                $valor5 = $data_file[24];
                                                            } else {
                                                                $valor5 = null;
                                                            }

                                                            $datos_elemento = [
                                                                'intIdProy' => intval($id),
                                                                'intIdTipoProducto' => intval($_POST['producto']),
                                                                'intIdProyZona' => intval($id_zona_insert),
                                                                'intIdProyTarea' => intval($id_tarea_id),
                                                                'intIdProyPaquete' => intval($id_parquete_id),
                                                                'intIdTipoEstructurado' => intval($id_tipo_estructurado_insert),
                                                                'varCodiElemento' => mb_strtoupper(trim($data_file[1])),
                                                                'intRevision' => intval($data_file[2]),
                                                                'deciLong' => floatval($data_file[7]),
                                                                'varPerfil' => mb_strtoupper(trim($data_file[6])),
                                                                'varDescripcion' => mb_strtoupper(trim($data_file[8])),
                                                                'deciPesoNeto' => floatval($data_file[10]),
                                                                'deciPesoBruto' => floatval($data_file[11]),
                                                                'deciPesoContr' => floatval($data_file[12]),
                                                                'deciArea' => floatval($data_file[13]),
                                                                'deciAncho' => floatval($data_file[14]),
                                                                'deciAlto' => floatval($data_file[15]),
                                                                'varModelo' => mb_strtoupper(trim($data_file[16])),
                                                                'intIdTipoEstru' => intval($id_estructurado_insert),
                                                                'varCodVal' => mb_strtoupper(trim($data_file[17])),
                                                                'acti_usua' => $nombre_user,
                                                                'cantidad' => intval($data_file[3]),
                                                                'varValo1' => $valor1,
                                                                'varValo2' => $valor2,
                                                                'varValo3' => $valor3,
                                                                'varValo4' => $valor4,
                                                                'varValo5' => $valor5,
                                                                'intCantAcce' => $array_cantidad,
                                                                'deciAreaPintura' => $array_pintura
                                                            ];
                                                            $ch11 = curl_init('http://localhost/GestionPartList/public/index.php/partlist_elemento');
                                                            curl_setopt($ch11, CURLOPT_RETURNTRANSFER, true);
                                                            curl_setopt($ch11, CURLOPT_POSTFIELDS, $datos_elemento);
                                                            $elemento_insert = curl_exec($ch11);
                                                            curl_close($ch11);
                                                            $array_elemento = json_decode($elemento_insert, true);
                                                            $filas_registradas++;
                                                        } else {
                                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA B MARCA" . " " . $array_mensaje_marca . " ";
                                                        }
                                                    } else {
                                                        $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO GRUPO:" . " " . $id_paquete_mensaje;
                                                    }
                                                } else {
                                                    $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO PROGRAMA:" . " " . $id_tarea_mensaje;
                                                }
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA E CAMPO ZONA:" . " " . $mensaje_zona_insert;
                                            }
                                        } else {
                                            
                                        }
                                    }
                                }
                                //dd($validar);
                                if ($_POST['inlineRadioOptions'] == "option1") {
                                    $estado = 1;
                                    $estado2 = 0;
                                } else {
                                    $estado = 0;
                                    $estado2 = 1;
                                }
                                fclose($file);
                                if (count($validar["validacion"])) {
                                    $noregistra = "si";
                                    //$validar["mensaje"] = "* EL PART LIST TIENE ERRORES, SE REGISTRARON '$filas_registradas 'DE UN TOTAL DE '$filas_part_list' REGISTROS'";
                                } else {
                                    $noregistra = "si";
                                    //$validar["mensaje"] = $mensaje_part_list_actulizado;
                                }
                                if ($noregistra === "si") {
                                    $datos_part_list = [
                                        'intIdProy' => intval($id),
                                        'intIdTipoProducto' => intval($_POST['producto']),
                                        'varDescripcion' => mb_strtoupper(trim($_POST['descripcion'])),
                                        'varArchivo' => $nombre_archivo,
                                        'boolNuevo' => $estado,
                                        'boolActu' => $estado2,
                                        'vartipoDocu' => 'TP',
                                        'acti_usua' => $nombre_user
                                    ];
                                    //dd($datos_part_list);
                                    $ch12 = curl_init('http://localhost/GestionPartList/public/index.php/regis_partlist');
                                    curl_setopt($ch12, CURLOPT_RETURNTRANSFER, true);
                                    curl_setopt($ch12, CURLOPT_POSTFIELDS, $datos_part_list);
                                    $part_list_insert = curl_exec($ch12);
                                    curl_close($ch12);
                                    $array_part_list = json_decode($part_list_insert, true);
                                    //dd($array_part_list);
                                    $id_part_list_insert = $array_part_list['data']['id'];

                                    $datos_part_list_actualizado = [
                                        'intIdPartList' => $id_part_list_insert,
                                        'varArchivo' => $id_part_list_insert . '.xls'
                                    ];
                                    //dd($datos_part_list_actualizado);

                                    $ch13 = curl_init('http://localhost/GestionPartList/public/index.php/actu_partlist');
                                    curl_setopt($ch13, CURLOPT_RETURNTRANSFER, true);
                                    curl_setopt($ch13, CURLOPT_POSTFIELDS, $datos_part_list_actualizado);
                                    $part_list_actualizado = curl_exec($ch13);
                                    curl_close($ch13);
                                    $array_part_list_actualizado = json_decode($part_list_actualizado, true);
                                    $id_part_list_actualizado = $array_part_list_actualizado['data']['id'];
                                    $mensaje_part_list_actulizado = $array_part_list_actualizado['data']['mensaje'];
                                    //dd($mensaje_part_list_actulizado);
                                    //$validar["mensaje"] = $mensaje_part_list_actulizado;
                                    $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList";

                                    if (is_dir($directorio)) {
                                        if ($TIPO_CARGA === 'PARTLIST') {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            }
                                        } else {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            }
                                        }
                                    } else {
                                        mkdir($directorio, 0777, true);
                                        if ($TIPO_CARGA === 'PARTLIST') {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);

                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            }
                                        } else {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (count($validar["validacion"])) {
                                    //$noregistra = "si";
                                    $validar["mensaje"] = "* EL PART LIST TIENE ERRORES, SE REGISTRARON '$filas_registradas 'DE UN TOTAL DE '$filas_part_list' REGISTROS'";
                                } else {
                                    //$noregistra = "si";
                                    $validar["mensaje"] = $mensaje_part_list_actulizado;
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
        return json_encode($validar);
    }

    function actualizar_ot() {
        $TIPO_CARGA = $_POST['carga'];
        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array(), 'file' => '');
        $zona_data = array('zona' => array(), 'id' => array());
        $nombre_user = $_POST['nombre_user'];
        $post = (isset($_POST['ot']) && !empty($_POST['ot'])) && (isset($_POST['descripcion']) && !empty($_POST['descripcion'])) && (isset($_POST['producto']) && !empty($_POST['producto'])) && (isset($_POST['carga']) && !empty($_POST['carga'])) && (isset($_FILES['subir_archivo']) && !empty($_FILES['subir_archivo'])) && (isset($_POST['inlineRadioOptions']) && !empty($_POST['inlineRadioOptions']));

        if ($post) {
            $elements = explode(" /", $_POST['ot']);
            $ot = [
                'varCodiProy' => $elements[0],
            ];

            $ch = curl_init('http://localhost/Asignaciones/public/index.php/vali_OT');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $ot);
            $data = curl_exec($ch);
            curl_close($ch);
            $datos_array = json_decode($data, true);
            //dd($datos_array);
            $mensaje = $datos_array['data']['mensaje'];

            if ($mensaje == "Error.") {
                $validar["mensaje"] = "* EL CODIGO DE OT NO EXISTE";
            } else {
                $id = $datos_array['data']['id'];
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
                            $name_archivo = "";
                            $tota_regi = 0;
                            $total_fila = 0;
                            $total_fila_1 = 0;
                            $temporal_if = 0;
                            $temporal_i = 0;
                            $tarea_tempora = 0;
                            $zona_temporal = "";
                            $condicion = 'si';
                            $variable = 0;
                            $array_excel3 = array();
                            $array_temporal = array();
                            $array_temporal2 = array();
                            $array_temporal3 = array();
                            $array_temporal4 = array();
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
                                //dd($si_es_la_ot);
                                //echo "ingresa siempre y cuando es el mismo de la ot";
                                while (($data_file = fgetcsv($file, 100000, ",")) !== FALSE) {

                                    $total_fila++;
                                    //dd($total_fila,$start_row);
                                    //dd($total_fila);
                                    /**
                                     * SE CONTABILIZA APARTIR DE LA FILA NUMERO 3 YA QUE LA FILA 1 ES LA OT Y LA SEGUNDA ES LA CABECERA
                                     */
                                    if ($total_fila >= $start_row) {
                                        $filas_part_list++;
                                        //dd($data_file[0]);
                                        if (empty(mb_strtoupper(trim($data_file[6]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA G CAMPO PERFIL OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[7]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA H CAMPO LONGITUD OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[7])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA H CAMPO LONGITUD NO ES NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[8]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA I CAMPO DESCRIPCTION OBLIGATORIO.";
                                        } else {
                                            
                                        }

                                        if (strlen($data_file[10]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA K CAMPO PESO NETO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[10])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA K CAMPO PESO NETO NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[11]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA L CAMPO PESO BRUTO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[11])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA L CAMPO PESO BRUTO NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[12]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA M CAMPO PESO CONTRATADO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[12])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA M CAMPO PESO CONTRATADO NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[13]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA N CAMPO AREA  OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[13])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA N CAMPO AREA  NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[14]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA O CAMPO ANCHO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[14])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA P CAMPO ANCHO  NO ES NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[15]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA Q CAMPO ALTO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[15])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA Q CAMPO ALTO  NO ES NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[16]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA R CAMPO MODELO OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[17]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA 18 CAMPO CODIGO VAL OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[0]), 'UTF-8'))) {

                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO GRUPO OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[4]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA E CAMPO ZONA OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[5]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO TAREA OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[1]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA B CAMPO MARCA OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[2]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO REVISION OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[3]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA D CAMPO CANTIDAD OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[18]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA S CAMPO TIPO ESTRUCTURA OBLIGATORIO.";
                                        } else {
                                            //$id_tipo_estructurado = $array_tipo_estructurado['dato']['id'];
                                            $t_etructura = [
                                                'varCodiEstru' => mb_strtoupper(trim($data_file[18]), 'UTF-8'),
                                            ];
                                            //dd($t_etructura);
                                            $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/validar_TipoEstructura');
                                            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch2, CURLOPT_POSTFIELDS, $t_etructura);
                                            $tipo_estructura = curl_exec($ch2);
                                            curl_close($ch2);
                                            $array_tipo_estructura = json_decode($tipo_estructura, true);
                                            $mensaje2 = $array_tipo_estructura['data']['mensaje'];
                                            if ($mensaje2 == "Error.") {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA S CAMPO TIPO ESTRUCTURA NO EXISTE, POR FAVOR DE REGISTRAR";
                                            } else {
                                                
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[9]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA J CAMPO TIPO ESTRUCTURADO OBLIGATORIO.";
                                        } else {
                                            $t_etructurado = [
                                                'varDescTipoEstru' => mb_strtoupper(trim($data_file[9]), 'UTF-8'),
                                            ];
                                            $ch1 = curl_init('http://localhost/GestionProyectos/public/index.php/validar_TipoEstructurado');
                                            curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch1, CURLOPT_POSTFIELDS, $t_etructurado);
                                            $tipo_estructurado = curl_exec($ch1);
                                            curl_close($ch1);
                                            $array_tipo_estructurado = json_decode($tipo_estructurado, true);
                                            $mensaje1 = $array_tipo_estructurado['data']['mensaje'];

                                            if ($mensaje1 == "Error.") {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA J CAMPO TIPO ESTRUCTURADO NO EXISTE, POR FAVOR DE REGISTRAR";
                                            } else {
                                                $id_tipo_estructurado_insert = $array_tipo_estructurado['data']['id'];
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[19]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA T CAMPO TIPO GRUPO ESTRUCTURA OBLIGATORIO.";
                                        } else {
                                            $G_t_etructura = [
                                                'varCodiTipoGrupo' => mb_strtoupper(trim($data_file[19]), 'UTF-8'),
                                            ];
                                            $chG = curl_init('http://localhost/GestionPartList/public/index.php/vali_tipo_grup');
                                            curl_setopt($chG, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($chG, CURLOPT_POSTFIELDS, $G_t_etructura);
                                            $tipo_estructura = curl_exec($chG);
                                            curl_close($chG);
                                            $array_tipo_estructura = json_decode($tipo_estructura, true);
                                            $mensaje2 = $array_tipo_estructura['data']['mensaje'];
                                            if ($mensaje2 == "") {
                                                $id_grupo_estructurado = $array_tipo_estructura['data']['id'];

                                                if (mb_strtoupper(trim($data_file[19]), 'UTF-8') !== "ESTR") {
                                                    $array_pintura = 0;
                                                    if ($data_file[25]) {
                                                        if (is_numeric($data_file[25])) {
                                                            $array_cantidad_cc = (float) $data_file[25];
                                                        } else {
                                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA  CANTIDAD ACCESORIOS  NO ES NUMERICO.";
                                                        }
                                                    } else {
                                                        $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA CANTIDAD ACCESORIOS OBLIGATORIO ";
                                                    }
                                                } else {
                                                    $array_cantidad_cc = 0;
                                                    if ($data_file[26]) {
                                                        if (is_numeric($data_file[26])) {
                                                            $array_pintura = (float) $data_file[26];
                                                        } else {
                                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA  AREA PINTURA  NO ES NUMERICO.";
                                                        }
                                                    } else {
                                                        $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA AREA PINTURA  OBLIGATORIO ";
                                                    }
                                                }
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA T CAMPO GRUPO ESTRUCTURA $mensaje2 ";
                                            }
                                        }
                                        //dd($validar);
                                        if (count($validar['validacion']) == 0) {
                                            $datos_zona = [
                                                'intIdProy' => intval($id),
                                                'intIdTipoProducto' => intval($_POST['producto']),
                                                'varDescrip' => mb_strtoupper($data_file[4]),
                                                'acti_usua' => $nombre_user,
                                            ];

                                            $ch60 = curl_init('http://localhost/GestionPartList/public/index.php/vali_proy_zona');
                                            curl_setopt($ch60, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch60, CURLOPT_POSTFIELDS, $datos_zona);
                                            $zona_insert = curl_exec($ch60);
                                            curl_close($ch60);
                                            $array_zona_insert = json_decode($zona_insert, true);
                                            //dd($array_zona_insert);
                                            $id_zona_insert = $array_zona_insert['data']['mensaje'];
                                            if ($id_zona_insert == "error.") {
                                                $id_zona_insert_2 = $array_zona_insert['data']['data'];
                                                $datos_tarea = [
                                                    'intIdProyZona' => intval($id_zona_insert_2),
                                                    'intIdProy' => intval($id),
                                                    'intIdTipoProducto' => intval($_POST['producto']),
                                                    'varDescripTarea' => mb_strtoupper($data_file[5]),
                                                ];
                                                //dd($datos_tarea);
                                                //CURL PARA PODER REGISTRAR LA TAREA
                                                $ch70 = curl_init('http://localhost/GestionPartList/public/index.php/vali_tarea');
                                                curl_setopt($ch70, CURLOPT_RETURNTRANSFER, true);
                                                curl_setopt($ch70, CURLOPT_POSTFIELDS, $datos_tarea);
                                                $tarea_insert = curl_exec($ch70);
                                                curl_close($ch70);
                                                $array_tarea_insert = json_decode($tarea_insert, true);
                                                //dd($array_tarea_insert);
                                                $id_tarea_insert = $array_tarea_insert['data']['mensaje'];

                                                if ($id_tarea_insert == "EXITO ZONA.") {
                                                    $id_tarea_insert_2 = $array_tarea_insert['data']['tarea'];
                                                    $paquete = [
                                                        'intIdProy' => $id,
                                                        'intIdTipoProducto' => intval($_POST['producto']),
                                                        'varCodigoPaquete' => mb_strtoupper($data_file[0]),
                                                        'intIdTipoGrupo' => intval($id_grupo_estructurado),
                                                        'intIdProyTarea' => $id_tarea_insert_2,
                                                    ];
                                                    //dd($paquete);
                                                    /**
                                                     * VALIDAMOS SI EL PAQUETE EXISTE EN LA BASE DE DATOS , RECIBIMOS UN MENSAJE DE EXITO Y DE ERROR
                                                     * EXITO(EL PAQUETE NO EXISTE ENTONCES SE TIENE QUE REGISTRAR)
                                                     * ERROR(EL PAQUETE EXISTE ENTONCES NO DEBE REGISTRAR)
                                                     */
                                                    $ch5 = curl_init('http://localhost/GestionPartList/public/index.php/vali_proy_pque');
                                                    curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
                                                    curl_setopt($ch5, CURLOPT_POSTFIELDS, $paquete);
                                                    $paquete_array = curl_exec($ch5);
                                                    curl_close($ch5);
                                                    $array_paquete = json_decode($paquete_array, true);
                                                    //dd($array_paquete);
                                                    $mensaje50 = $array_paquete['data']['mensaje'];
                                                    /**
                                                     * SI EL MENSAJE ES EXITOSO ENTONCES VALIDAR SI EXISTE DENTRO DEL EXCEL 
                                                     */
                                                    if ($mensaje50 == "EXITO GRUPO.") {

                                                        $id_paquete = $array_paquete['data']['paquete'];
                                                        $marca = [
                                                            'intIdProy' => $id,
                                                            'intIdTipoProducto' => intval($_POST['producto']),
                                                            'varCodiElemento' => mb_strtoupper($data_file[1]),
                                                            'intIdProyPaquete' => $id_paquete
                                                        ];
                                                        //dd($marca);
                                                        $ch6 = curl_init('http://localhost/GestionPartList/public/index.php/vali_marcar_regi');
                                                        curl_setopt($ch6, CURLOPT_RETURNTRANSFER, true);
                                                        curl_setopt($ch6, CURLOPT_POSTFIELDS, $marca);
                                                        $marca_array = curl_exec($ch6);
                                                        curl_close($ch6);
                                                        $array_marca = json_decode($marca_array, true);
                                                        //dd($array_marca);
                                                        $mensaje5 = $array_marca['data']['mensaje'];
                                                        if ($mensaje5 == "Error.") {

                                                            $id_marca = $array_marca['data']['id'];
                                                            $validar_actualizar = [
                                                                'intRevision' => intval($data_file[2]),
                                                                'intIdProy' => $id,
                                                                'intIdTipoProducto' => intval($_POST['producto']),
                                                                'varCodiElemento' => mb_strtoupper($data_file[1]),
                                                                'intIdProyTarea' => intval($id_tarea_insert_2),
                                                                'intIdProyPaquete' => intval($id_paquete),
                                                                'intIdProyZona' => intval($id_zona_insert_2)
                                                            ];
                                                            //dd($validar_actualizar);
                                                            $ch14 = curl_init('http://localhost/GestionPartList/public/index.php/vali_revi');
                                                            curl_setopt($ch14, CURLOPT_RETURNTRANSFER, true);
                                                            curl_setopt($ch14, CURLOPT_POSTFIELDS, $validar_actualizar);
                                                            $validar_array = curl_exec($ch14);
                                                            curl_close($ch14);
                                                            $array_validar = json_decode($validar_array, true);

                                                            $revision_mensaje = $array_validar['data']['mensaje'];
                                                            if ($revision_mensaje == "Exito.") {

                                                                $cantidad_actualizar = [
                                                                    'cantidad' => intval($data_file[3]),
                                                                    'intIdProy' => $id,
                                                                    'intIdTipoProducto' => intval($_POST['producto']),
                                                                    'varCodiElemento' => mb_strtoupper(trim($data_file[1])),
                                                                    'intIdProyTarea' => intval($id_tarea_insert_2),
                                                                    'intIdProyPaquete' => intval($id_paquete),
                                                                    'intIdProyZona' => intval($id_zona_insert_2)
                                                                ];
                                                                //dd($cantidad_actualizar);
                                                                $ch15 = curl_init('http://localhost/GestionPartList/public/index.php/vali_cantidad');

                                                                curl_setopt($ch15, CURLOPT_RETURNTRANSFER, true);
                                                                curl_setopt($ch15, CURLOPT_POSTFIELDS, $cantidad_actualizar);
                                                                $cantidad_array = curl_exec($ch15);
                                                                curl_close($ch15);
                                                                $array_cantidad = json_decode($cantidad_array, true);
                                                                //dd($array_cantidad);
                                                                $mensaje15 = $array_cantidad['data']['mensaje'];
                                                                if ($mensaje15 == "Exito.") {
                                                                    $id_tipo_estructura = $array_tipo_estructura['data']['id'];
                                                                    if (!empty($data_file[20])) {
                                                                        $valor1 = $data_file[20];
                                                                    } else {
                                                                        $valor1 = null;
                                                                    }

                                                                    if (!empty($data_file[21])) {
                                                                        $valor2 = $data_file[21];
                                                                    } else {
                                                                        $valor2 = null;
                                                                    }

                                                                    if (!empty($data_file[22])) {
                                                                        $valor3 = $data_file[22];
                                                                    } else {
                                                                        $valor3 = null;
                                                                    }

                                                                    if (!empty($data_file[23])) {
                                                                        $valor4 = $data_file[23];
                                                                    } else {
                                                                        $valor4 = null;
                                                                    }

                                                                    if (!empty($data_file[24])) {
                                                                        $valor5 = $data_file[24];
                                                                    } else {
                                                                        $valor5 = null;
                                                                    }
                                                                    //dd($array_pintura);
                                                                    $datos_elemento = [
                                                                        'intIdProy' => intval($id),
                                                                        'intIdTipoProducto' => intval($_POST['producto']),
                                                                        'intIdProyZona' => intval($id_zona_insert_2),
                                                                        'intIdProyTarea' => intval($id_tarea_insert_2),
                                                                        'intIdProyPaquete' => intval($id_paquete),
                                                                        'intIdTipoEstructurado' => intval($id_tipo_estructurado_insert),
                                                                        'varCodiElemento' => mb_strtoupper(trim($data_file[1])),
                                                                        'intRevision' => intval($data_file[2]),
                                                                        'deciLong' => floatval($data_file[7]),
                                                                        'varPerfil' => mb_strtoupper(trim($data_file[6])),
                                                                        'varDescripcion' => mb_strtoupper(trim($data_file[8])),
                                                                        'deciPesoNeto' => floatval($data_file[10]),
                                                                        'deciPesoBruto' => floatval($data_file[11]),
                                                                        'deciPesoContr' => floatval($data_file[12]),
                                                                        'deciArea' => floatval($data_file[13]),
                                                                        'deciAncho' => floatval($data_file[14]),
                                                                        'deciAlto' => floatval($data_file[15]),
                                                                        'varModelo' => mb_strtoupper(trim($data_file[16])),
                                                                        'intIdTipoEstru' => intval($id_tipo_estructura),
                                                                        'varCodVal' => mb_strtoupper(trim($data_file[17])),
                                                                        'usua_modi' => $nombre_user,
                                                                        'cantidad' => intval($data_file[3]),
                                                                        'varValo1' => $valor1,
                                                                        'varValo2' => $valor2,
                                                                        'varValo3' => $valor3,
                                                                        'varValo4' => $valor4,
                                                                        'varValo5' => $valor5,
                                                                        'intCantAcce' => $array_cantidad_cc,
                                                                        'deciAreaPintura' => $array_pintura
                                                                    ];
                                                                    //print_r($datos_elemento);
                                                                    $ch11 = curl_init('http://localhost/GestionPartList/public/index.php/actu_elem');
                                                                    curl_setopt($ch11, CURLOPT_RETURNTRANSFER, true);
                                                                    curl_setopt($ch11, CURLOPT_POSTFIELDS, $datos_elemento);
                                                                    $elemento_insert = curl_exec($ch11);
                                                                    curl_close($ch11);
                                                                    $filas_registradas++;
                                                                    $array_elemento = json_decode($elemento_insert, true);
                                                                } else {
                                                                    $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA D CAMPO CANTIDAD: " . $mensaje15;
                                                                }
                                                            } else {
                                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO REVISION: " . $revision_mensaje;
                                                            }
                                                        } else {
                                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA B CAMPO MARCA: " . $mensaje5;
                                                        }
                                                    } else {
                                                        $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO GRUPO" . ' ' . 'NO EXISTE' . ' ' . $data_file[0];
                                                    }
                                                } else if ($id_tarea_insert == "Exito.") {
                                                    $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO PROGRAMA" . ' ' . 'NO PERTENECE A LA ZONA ASIGNADA' . ' ' . $data_file[0];
                                                } /* else {
                                                  $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO TAREA" . ' ' . $id_tarea_insert . ' ' . $data_file[5];
                                                  } */
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA E CAMPO ZONA" . ' ' . 'NO EXISTE' . ' ' . $data_file[4];
                                            }
                                        }
                                    }
                                }
                                fclose($file);
                                //dd($validar);
                                if ($_POST['inlineRadioOptions'] == "option1") {
                                    $estado = 1;
                                    $estado2 = 0;
                                } else {
                                    $estado = 0;
                                    $estado2 = 1;
                                }
                                if (count($validar["validacion"])) {
                                    $noregistra = "si";
                                    //$validar["mensaje"] = "* EL PART LIST TIENE ERRORES, SE REGISTRARON '$filas_registradas 'DE UN TOTAL DE '$filas_part_list' REGISTROS'";
                                } else {
                                    $noregistra = "si";
                                    //$validar["mensaje"] = $mensaje_part_list_actulizado;
                                }
                                if ($noregistra === "si") {
                                    $datos_part_list = [
                                        'intIdProy' => intval($id),
                                        'intIdTipoProducto' => intval($_POST['producto']),
                                        'varDescripcion' => mb_strtoupper(trim($_POST['descripcion'])),
                                        'varArchivo' => $nombre_archivo,
                                        'boolNuevo' => $estado,
                                        'boolActu' => $estado2,
                                        'vartipoDocu' => 'TP',
                                        'acti_usua' => $nombre_user
                                    ];
                                    $ch12 = curl_init('http://localhost/GestionPartList/public/index.php/regis_partlist');
                                    curl_setopt($ch12, CURLOPT_RETURNTRANSFER, true);
                                    curl_setopt($ch12, CURLOPT_POSTFIELDS, $datos_part_list);
                                    $part_list_insert = curl_exec($ch12);
                                    curl_close($ch12);
                                    $array_part_list = json_decode($part_list_insert, true);
                                    //dd($array_part_list);
                                    $id_part_list_insert = $array_part_list['data']['id'];
                                    $validar["file"] = $id_part_list_insert;
                                    $name_archivo = $id_part_list_insert;
                                    $datos_part_list_actualizado = [
                                        'intIdPartList' => $id_part_list_insert,
                                        'varArchivo' => $id_part_list_insert . '.xls'
                                    ];

                                    $ch13 = curl_init('http://localhost/GestionPartList/public/index.php/actu_partlist');
                                    curl_setopt($ch13, CURLOPT_RETURNTRANSFER, true);
                                    curl_setopt($ch13, CURLOPT_POSTFIELDS, $datos_part_list_actualizado);
                                    $part_list_actualizado = curl_exec($ch13);
                                    curl_close($ch13);
                                    $array_part_list_actualizado = json_decode($part_list_actualizado, true);
                                    $id_part_list_actualizado = $array_part_list_actualizado['data']['id'];
                                    $mensaje_part_list_actulizado = $array_part_list_actualizado['data']['mensaje'];
                                    //dd($mensaje_part_list_actulizado);
                                    //$validar["mensaje"] = $mensaje_part_list_actulizado;

                                    $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList";
                                    if (is_dir($directorio)) {
                                        if ($TIPO_CARGA === 'PARTLIST') {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            }
                                        } else {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            }
                                        }
                                    } else {
                                        mkdir($directorio, 0777, true);
                                        if ($TIPO_CARGA === 'PARTLIST') {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);

                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            }
                                        } else {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            }
                                        }
                                    }
                                    //dd($datos_part_list_actualizado);
                                }
                                if (count($validar["validacion"])) {
                                    $validar["mensaje"] = "* EL PART LIST TIENE ERRORES, SE REGISTRARON '$filas_registradas 'DE UN TOTAL DE '$filas_part_list' REGISTROS'";
                                } else {
                                    $validar["mensaje"] = $mensaje_part_list_actulizado;
                                }
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

    function registrar_componente() {
        $TIPO_CARGA = $_POST['carga'];
        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array(), 'errores' => array());
        $zona_data = array('zona' => array(), 'id' => array());
        $nombre_user = $_POST['nombre_user'];
        $post = (isset($_POST['ot']) && !empty($_POST['ot'])) && (isset($_POST['descripcion']) && !empty($_POST['descripcion'])) && (isset($_POST['producto']) && !empty($_POST['producto'])) && (isset($_POST['carga']) && !empty($_POST['carga'])) && (isset($_FILES['subir_archivo']) && !empty($_FILES['subir_archivo'])) && (isset($_POST['inlineRadioOptions']) && !empty($_POST['inlineRadioOptions']));
        if ($post) {
            $elements = explode(" /", $_POST['ot']);
            $ot = [
                'varCodiProy' => $elements[0],
            ];
            $ch = curl_init('http://localhost/Asignaciones/public/index.php/vali_OT');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $ot);
            $data = curl_exec($ch);
            curl_close($ch);
            $datos_array = json_decode($data, true);
            //dd($datos_array);
            $mensaje = $datos_array['data']['mensaje'];
            if ($mensaje == "Error.") {
                $validar["mensaje"] = "* EL CODIGO DE OT NO EXISTE";
            } else {
                $id = $datos_array['data']['id'];
                if (!empty($_FILES['subir_archivo']['name'])) {
                    $data_exte = explode(".", $_FILES['subir_archivo']['name']);
                    $mayuscula = strtoupper($data_exte[1]);
                    $nombre_archivo = strtoupper($data_exte[0]);
                    if ($mayuscula != "CSV") {
                        $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER CSV.";
                    } else {
                        $file_name = $_FILES['subir_archivo']['tmp_name'];
                        if ($_FILES["subir_archivo"]["size"] > 0) {
                            $file = fopen($file_name, "r");
                            $file2 = fopen($file_name, "r");
                            $file3 = fopen($file_name, "r");
                            $file4 = fopen($file_name, "r");
                            $tota_regi = 0;
                            $total_fila = 0;
                            $total_fila_1 = 0;
                            $temporal_if = 0;
                            $temporal_i = 0;
                            $tarea_tempora = 0;
                            $zona_temporal = "";
                            $condicion = 'si';
                            $variable = 0;
                            $array_excel3 = array();
                            $array_temporal = array();
                            $array_temporal2 = array();
                            $array_temporal3 = array();
                            $array_temporal4 = array();
                            $llenar_array_marca = array();
                            $si_es_la_ot = false;
                            $numero_fila = 1;
                            $datos_componentes = [];
                            $start_row = 3;
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
                                    if (mb_strtoupper(trim($ot_compara)) == mb_strtoupper(trim($elements[0]))) {
                                        $si_es_la_ot = true;
                                    } else {
                                        
                                    }
                                }
                                $numero_fila++;
                            }
                            fclose($file3);
                            if ($si_es_la_ot == true) {
                                while (($data_file = fgetcsv($file, 100000, ",")) !== FALSE) {
                                    $total_fila++;
                                    /**
                                     * SE CONTABILIZA APARTIR DE LA FILA NUMERO 3 YA QUE LA FILA 1 ES LA OT Y LA SEGUNDA ES LA CABECERA
                                     */
                                    if ($total_fila >= $start_row) {
                                        //SE VALIDA SI EL CAMPO ESTA VACIO 
                                        if (empty(mb_strtoupper(trim($data_file[0]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO MARCA OBLIGATORIO.";
                                        } else {
                                            $marca = [
                                                'intIdProy' => $id,
                                                'intIdTipoProducto' => intval($_POST['producto']),
                                                'varCodiElemento' => mb_strtoupper($data_file[0]),
                                            ];
                                            //dd($marca);
                                            //dd($marca);
                                            //SE VALIDA SI EXISTE O NO LA MARCA DENTRO
                                            $ch2 = curl_init('http://localhost/GestionPartList/public/index.php/vali_var_codi_elem');
                                            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch2, CURLOPT_POSTFIELDS, $marca);
                                            $marca_array = curl_exec($ch2);
                                            curl_close($ch2);
                                            $array_marca = json_decode($marca_array, true);
                                            //dd($array_marca);
                                            $mensaje5 = $array_marca['data']['mensaje'];

                                            if ($mensaje5 == "Error.") {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO MARCA" . ' ' . 'NO EXISTE' . ' ' . $data_file[0];
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[1]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA B CAMPO COMPONENTE OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[2]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO CANTIDAD OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[2])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO CANTIDAD DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[3]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA D CAMPO MATERIAL OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[4]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA E CAMPO PERFIL OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[5]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO LONGITUD OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[5])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO LONGITUD DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[6]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA G CAMPO DESCRIPCION OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[7]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA H CAMPO PESO NETO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[7])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA H CAMPO PESO NETO DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[8]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA I CAMPO PESO BRUTO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[8])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA I CAMPO PESO NETO DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[9]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA J CAMPO PESO CONTRATA OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[9])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA J CAMPO PESO CONTRATA DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[10]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA K CAMPO AREA OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[10])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA K CAMPO AREA DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[11]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA L CAMPO ZONA OBLIGATORIO.";
                                        } else {

                                            if (mb_strtoupper(trim($data_file[11]), 'UTF-8') === $_POST['zona_part_php']) {
                                                
                                            } else {

                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA L CAMPO ZONA ES DIFERENTE A LA SELECCIONADA.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[12]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA M CAMPO PROGRAMA OBLIGATORIO.";
                                        } else {
                                            if (mb_strtoupper(trim($data_file[12]), 'UTF-8') === $_POST['programa_part_php']) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA M CAMPO PROGRAMA ES DIFERENTE A LA SELECCIONADA.";
                                            }
                                        }
                                    }
                                }
                                fclose($file);
                            } else {
                                $validar['validacion'][] .= "* ERROR EN LA FILA 1 COLUMNA A CAMPO OT NO SON IGUALES A LA INGRESADA.";
                            }
                            if (count($validar["validacion"])) {
                                $validar["mensaje"] = "* HAY" . ' ' . count($validar["validacion"]) . ' ' . 'ERRORES DE CORREGIR PARA PODER REGISTRAR LOS COMPONENTES';
                            } else {
                                $total_fila = 0;
                                $start_row = 3;
                                $total_fila2 = 0;
                                $start_row2 = 3;
                                if ($_POST['inlineRadioOptions'] == "option1") {
                                    $estado = 1;
                                    $estado2 = 0;
                                } else {
                                    $estado = 0;
                                    $estado2 = 1;
                                }
                                while (($data_file2 = fgetcsv($file2, 100000, ",")) !== FALSE) {
                                    $total_fila++;

                                    if ($total_fila >= $start_row) {

                                        $datos_componentes = [
                                            'v_intIdProy' => intval($id),
                                            'v_intIdTipoProducto' => intval($_POST['producto']),
                                            'v_varCodiElemento' => mb_strtoupper($data_file2[0]),
                                            'v_varComponente' => mb_strtoupper($data_file2[1]),
                                            'v_intCantidad' => intval($data_file2[2]),
                                            'v_material' => mb_strtoupper($data_file2[3]),
                                            'v_varPerfil' => mb_strtoupper($data_file2[4]),
                                            'v_deciLong' => floatval($data_file2[5]),
                                            'v_varDescripcion' => mb_strtoupper($data_file2[6]),
                                            'v_deciPesoNeto' => floatval($data_file2[7]),
                                            'v_deciPesoBruto' => floatval($data_file2[8]),
                                            'v_deciPesoContr' => floatval($data_file2[9]),
                                            'v_deciArea' => floatval($data_file2[10]),
                                            'v_intIdProyZona' => (int) $_POST['zona_part'],
                                            'v_intIdProyTarea' => (int) $_POST['programa_part'],
                                            'v_strDeZona' => mb_strtoupper($_POST['zona_part_php']),
                                            'v_strDeTarea' => mb_strtoupper($_POST['programa_part']),
                                            'v_usuario' => $nombre_user,
                                        ];
                                        //dd($datos_componentes);
                                        $ch3 = curl_init('http://localhost/GestionPartList/public/index.php/inse_compo');
                                        curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
                                        curl_setopt($ch3, CURLOPT_POSTFIELDS, $datos_componentes);
                                        $componentes_insert = curl_exec($ch3);
                                        curl_close($ch3);
                                        $array_componentes = json_decode($componentes_insert, true);

                                        if ($array_componentes['data'][0]['mensaje'] !== "" && $array_componentes['data'][0]['mensaje'] !== null) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA " . $total_fila . " " . $array_componentes['data'][0]['mensaje'] . " DIRIGIRSE A LA OPCION ACTUALIZAR";
                                        }
                                    }
                                }
                                if (count($validar['validacion']) > 0) {
                                    $validar["mensaje"] = "HAY COMPONENTES REGISTRADOS DIRIGIRSE A LA OPCION ACTUALIZAR";
                                } else {
                                    fclose($file2);
                                    $datos_part_list = [
                                        'intIdProy' => intval($id),
                                        'intIdTipoProducto' => intval($_POST['producto']),
                                        'varDescripcion' => mb_strtoupper(trim($_POST['descripcion'])),
                                        'varArchivo' => $nombre_archivo,
                                        'boolNuevo' => $estado,
                                        'boolActu' => $estado2,
                                        'vartipoDocu' => 'TC',
                                        'acti_usua' => $nombre_user
                                    ];
                                    $ch12 = curl_init('http://localhost/GestionPartList/public/index.php/regis_partlist');
                                    curl_setopt($ch12, CURLOPT_RETURNTRANSFER, true);
                                    curl_setopt($ch12, CURLOPT_POSTFIELDS, $datos_part_list);
                                    $part_list_insert = curl_exec($ch12);
                                    curl_close($ch12);
                                    $array_part_list = json_decode($part_list_insert, true);
                                    $id_part_list_insert = $array_part_list['data']['id'];
                                    $datos_part_list_actualizado = [
                                        'intIdPartList' => $id_part_list_insert,
                                        'varArchivo' => $id_part_list_insert . '.csv'
                                    ];
                                    $ch13 = curl_init('http://localhost/GestionPartList/public/index.php/actu_partlist');
                                    curl_setopt($ch13, CURLOPT_RETURNTRANSFER, true);
                                    curl_setopt($ch13, CURLOPT_POSTFIELDS, $datos_part_list_actualizado);
                                    $part_list_actualizado = curl_exec($ch13);
                                    curl_close($ch13);
                                    $array_part_list_actualizado = json_decode($part_list_actualizado, true);
                                    $id_part_list_actualizado = $array_part_list_actualizado['data']['id'];
                                    $mensaje_part_list_actulizado = $array_part_list_actualizado['data']['mensaje'];
                                    $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList";
                                    if (is_dir($directorio)) {
                                        if ($TIPO_CARGA === 'PARTLIST') {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            }
                                        } else {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            }
                                        }
                                    } else {
                                        mkdir($directorio, 0777, true);
                                        if ($TIPO_CARGA === 'PARTLIST') {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);

                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                }
                                            }
                                        } else {
                                            if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle")) {
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            } else {
                                                mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle", 0777, true);
                                                if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                    unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                } else {
                                                    move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                }
                                            }
                                        }
                                    }
                                    $validar["mensaje"] = $mensaje_part_list_actulizado;
                                }
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

    function actualizar_componente() {
        $TIPO_CARGA = $_POST['carga'];
        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array());
        $zona_data = array('zona' => array(), 'id' => array());
        $nombre_user = $_POST['nombre_user'];
        $post = (isset($_POST['ot']) && !empty($_POST['ot'])) && (isset($_POST['descripcion']) && !empty($_POST['descripcion'])) && (isset($_POST['producto']) && !empty($_POST['producto'])) && (isset($_POST['carga']) && !empty($_POST['carga'])) && (isset($_FILES['subir_archivo']) && !empty($_FILES['subir_archivo'])) && (isset($_POST['inlineRadioOptions']) && !empty($_POST['inlineRadioOptions']));
        if ($post) {
            $elements = explode(" /", $_POST['ot']);
            $ot = [
                'varCodiProy' => $elements[0],
            ];
            $ch = curl_init('http://localhost/Asignaciones/public/index.php/vali_OT');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $ot);
            $data = curl_exec($ch);
            curl_close($ch);
            $datos_array = json_decode($data, true);
            //dd($datos_array);
            $mensaje = $datos_array['data']['mensaje'];
            if ($mensaje == "Error.") {
                $validar["mensaje"] = "* EL CODIGO DE OT NO EXISTE";
            } else {
                $id = $datos_array['data']['id'];
                if (!empty($_FILES['subir_archivo']['name'])) {
                    $data_exte = explode(".", $_FILES['subir_archivo']['name']);
                    $mayuscula = strtoupper($data_exte[1]);
                    $nombre_archivo = strtoupper($data_exte[0]);
                    if ($mayuscula != "CSV") {
                        $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER CSV.";
                    } else {
                        $file_name = $_FILES['subir_archivo']['tmp_name'];
                        if ($_FILES["subir_archivo"]["size"] > 0) {
                            $file = fopen($file_name, "r");
                            $file2 = fopen($file_name, "r");
                            $file3 = fopen($file_name, "r");
                            $file4 = fopen($file_name, "r");
                            $tota_regi = 0;
                            $total_fila = 0;
                            $total_fila_1 = 0;
                            $temporal_if = 0;
                            $temporal_i = 0;
                            $tarea_tempora = 0;
                            $zona_temporal = "";
                            $condicion = 'si';
                            $variable = 0;
                            $array_excel3 = array();
                            $array_temporal = array();
                            $array_temporal2 = array();
                            $array_temporal3 = array();
                            $array_temporal4 = array();
                            $llenar_array_marca = array();
                            $si_es_la_ot = false;
                            $numero_fila = 1;
                            $datos_componentes = [];
                            $start_row = 3;
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
                                    if (mb_strtoupper(trim($ot_compara)) == mb_strtoupper(trim($elements[0]))) {
                                        $si_es_la_ot = true;
                                    } else {
                                        
                                    }
                                }
                                $numero_fila++;
                            }
                            fclose($file3);
                            if ($si_es_la_ot == true) {
                                while (($data_file = fgetcsv($file, 100000, ",")) !== FALSE) {
                                    $total_fila++;
                                    /**
                                     * SE CONTABILIZA APARTIR DE LA FILA NUMERO 3 YA QUE LA FILA 1 ES LA OT Y LA SEGUNDA ES LA CABECERA
                                     */
                                    if ($total_fila >= $start_row) {
                                        //SE VALIDA SI EL CAMPO ESTA VACIO 
                                        if (empty(mb_strtoupper(trim($data_file[0]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO MARCA OBLIGATORIO.";
                                        } else {
                                            $marca = [
                                                'intIdProy' => $id,
                                                'intIdTipoProducto' => intval($_POST['producto']),
                                                'varCodiElemento' => mb_strtoupper($data_file[0]),
                                            ];
                                            //SE VALIDA SI EXISTE O NO LA MARCA DENTRO
                                            $ch2 = curl_init('http://localhost/GestionPartList/public/index.php/vali_var_codi_elem');
                                            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch2, CURLOPT_POSTFIELDS, $marca);
                                            $marca_array = curl_exec($ch2);
                                            curl_close($ch2);
                                            $array_marca = json_decode($marca_array, true);
                                            $mensaje5 = $array_marca['data']['mensaje'];
                                            if ($mensaje5 == "Error.") {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA A CAMPO MARCA" . ' ' . 'NO EXISTE' . ' ' . $data_file[0];
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[1]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA B CAMPO COMPONENTE OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[2]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO CANTIDAD OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[2])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA C CAMPO CANTIDAD DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[3]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA D CAMPO MATERIAL OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[4]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA E CAMPO PERFIL OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[5]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO LONGITUD OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[5])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA F CAMPO LONGITUD DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (empty(mb_strtoupper(trim($data_file[6]), 'UTF-8'))) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA G CAMPO DESCRIPCION OBLIGATORIO.";
                                        } else {
                                            
                                        }
                                        if (strlen($data_file[7]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA H CAMPO PESO NETO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[7])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA H CAMPO PESO NETO DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[8]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA I CAMPO PESO BRUTO OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[8])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA I CAMPO PESO NETO DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[9]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA J CAMPO PESO CONTRATA OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[9])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA J CAMPO PESO CONTRATA DEBE SER NUMERICO.";
                                            }
                                        }
                                        if (strlen($data_file[10]) <= 0) {
                                            $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA K CAMPO AREA OBLIGATORIO.";
                                        } else {
                                            if (is_numeric($data_file[10])) {
                                                
                                            } else {
                                                $validar['validacion'][] .= "* ERROR EN LA FILA $total_fila COLUMNA K CAMPO AREA DEBE SER NUMERICO.";
                                            }
                                        }
                                    }
                                }
                                fclose($file);
                            } else {
                                $validar['validacion'][] .= "* ERROR EN LA FILA 1 COLUMNA A CAMPO OT NO SON IGUALES A LA INGRESADA.";
                            }
                            if (count($validar["validacion"])) {
                                $validar["mensaje"] = "* HAY" . ' ' . count($validar["validacion"]) . ' ' . 'ERRORES DE CORREGIR PARA PODER REGISTRAR LOS COMPONENTES';
                            } else {
                                $total_fila = 0;
                                $start_row = 3;
                                $total_fila2 = 0;
                                $start_row2 = 3;
                                if ($_POST['inlineRadioOptions'] == "option1") {
                                    $estado = 1;
                                    $estado2 = 0;
                                } else {
                                    $estado = 0;
                                    $estado2 = 1;
                                }
                                while (($data_file4 = fgetcsv($file4, 100000, ",")) !== FALSE) {
                                    $total_fila2++;
                                    if ($total_fila2 >= $start_row2) {
                                        if (!in_array($data_file4[0], $llenar_array_marca)) {
                                            $llenar_array_marca[] = $data_file4[0];
                                            $dato_eliminar = [
                                                'intIdProy' => intval($id),
                                                'intIdTipoProducto' => intval($_POST['producto']),
                                                'varCodiElemento' => $data_file4[0],
                                            ];
                                            $ch18 = curl_init('http://localhost/GestionPartList/public/index.php/elim_comp');
                                            curl_setopt($ch18, CURLOPT_RETURNTRANSFER, true);
                                            curl_setopt($ch18, CURLOPT_POSTFIELDS, $dato_eliminar);
                                            $componentes_delete = curl_exec($ch18);
                                            curl_close($ch18);
                                            $array_componentes_delete = json_decode($componentes_delete, true);
                                        } else {
                                            
                                        }
                                    }
                                }
                                fclose($file4);
                                while (($data_file2 = fgetcsv($file2, 100000, ",")) !== FALSE) {
                                    $total_fila++;
                                    if ($total_fila >= $start_row) {

                                        $datos_componentes = [
                                            'intIdProy' => intval($id),
                                            'intIdTipoProducto' => intval($_POST['producto']),
                                            'varCodiElemento' => mb_strtoupper($data_file2[0]),
                                            'varComponente' => mb_strtoupper($data_file2[1]),
                                            'intCantidad' => intval($data_file2[2]),
                                            'varMaterial' => mb_strtoupper($data_file2[3]),
                                            'varPerfil' => mb_strtoupper($data_file2[4]),
                                            'deciLong' => floatval($data_file2[5]),
                                            'varDescripcion' => mb_strtoupper($data_file2[6]),
                                            'deciPesoNeto' => floatval($data_file2[7]),
                                            'deciPesoBruto' => floatval($data_file2[8]),
                                            'deciPesoContr' => floatval($data_file2[9]),
                                            'deciArea' => floatval($data_file2[10]),
                                            'acti_usua' => $nombre_user,
                                        ];
                                        $ch3 = curl_init('http://localhost/GestionPartList/public/index.php/regi_comp');
                                        curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
                                        curl_setopt($ch3, CURLOPT_POSTFIELDS, $datos_componentes);
                                        $componentes_insert = curl_exec($ch3);
                                        curl_close($ch3);
                                        $array_componentes = json_decode($componentes_insert, true);
                                    }
                                }
                                fclose($file2);
                                $datos_part_list = [
                                    'intIdProy' => intval($id),
                                    'intIdTipoProducto' => intval($_POST['producto']),
                                    'varDescripcion' => mb_strtoupper(trim($_POST['descripcion'])),
                                    'varArchivo' => $nombre_archivo,
                                    'boolNuevo' => $estado,
                                    'boolActu' => $estado2,
                                    'vartipoDocu' => 'TC',
                                    'acti_usua' => $nombre_user
                                ];
                                $ch12 = curl_init('http://localhost/GestionPartList/public/index.php/regis_partlist');
                                curl_setopt($ch12, CURLOPT_RETURNTRANSFER, true);
                                curl_setopt($ch12, CURLOPT_POSTFIELDS, $datos_part_list);
                                $part_list_insert = curl_exec($ch12);
                                curl_close($ch12);
                                $array_part_list = json_decode($part_list_insert, true);
                                $id_part_list_insert = $array_part_list['data']['id'];

                                $datos_part_list_actualizado = [
                                    'intIdPartList' => $id_part_list_insert,
                                    'varArchivo' => $id_part_list_insert . '.csv'
                                ];
                                $ch13 = curl_init('http://localhost/GestionPartList/public/index.php/actu_partlist');
                                curl_setopt($ch13, CURLOPT_RETURNTRANSFER, true);
                                curl_setopt($ch13, CURLOPT_POSTFIELDS, $datos_part_list_actualizado);
                                $part_list_actualizado = curl_exec($ch13);
                                curl_close($ch13);
                                $array_part_list_actualizado = json_decode($part_list_actualizado, true);
                                $id_part_list_actualizado = $array_part_list_actualizado['data']['id'];
                                $mensaje_part_list_actulizado = $array_part_list_actualizado['data']['mensaje'];
                                $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList";
                                if (is_dir($directorio)) {
                                    if ($TIPO_CARGA === 'PARTLIST') {
                                        if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera")) {
                                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                            } else {
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                            }
                                        } else {
                                            mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera", 0777, true);
                                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                            } else {
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                            }
                                        }
                                    } else {
                                        if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle")) {
                                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            } else {
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            }
                                        } else {
                                            mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle", 0777, true);
                                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            } else {
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            }
                                        }
                                    }
                                } else {
                                    mkdir($directorio, 0777, true);
                                    if ($TIPO_CARGA === 'PARTLIST') {
                                        if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera")) {
                                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            } else {
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            }
                                        } else {
                                            mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera", 0777, true);
                                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado)) {
                                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);

                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            } else {
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Cabecera/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            }
                                        }
                                    } else {
                                        if (is_dir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle")) {
                                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            } else {
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            }
                                        } else {
                                            mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle", 0777, true);
                                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado)) {
                                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            } else {
                                                move_uploaded_file($_FILES['subir_archivo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Proyectos/" . $elements[0] . "/PartList/Detalle/" . $id_part_list_actualizado);
                                            }
                                        }
                                    }
                                }
                                $validar["mensaje"] = $mensaje_part_list_actulizado;
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
        return json_encode($validar);
    }

    function validar_campos() {
        $post = (isset($_POST['OT']) && !empty($_POST['OT'])) && (isset($_POST['descripcion']) && !empty($_POST['descripcion'])) && (isset($_POST['producto']) && !empty($_POST['producto'])) && (isset($_POST['carga']) && !empty($_POST['carga'])) && (isset($_FILES['subir_archivo']) && !empty($_FILES['subir_archivo'])) && (isset($_POST['inlineRadioOptions']) && !empty($_POST['inlineRadioOptions']));
        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array());
        if ($post) {
            $validar["mensaje"] = "CAMPOS LLENOS";
        } else {
            $validar["mensaje"] = "* TODO LOS CAMPOS SON OBLIGATORIOS";
        }
        return json_encode($validar);
    }

}
