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

class Proyecto extends Controller {

    public function guardar_detalle_detalle() {
        $validar = array('mensaje' => '');
        // $validar = array('mensaje' => '', 'dato' => array());
        $codigo = $_POST['codigo_proyecto_detalle'];
        $usuario_proyecto = $_POST['user_proyecto'];
        $alias = $_POST['alias_proyecto'];
        $fecha_termino = $_POST['fecha_termino'];
        $observacion_proyecto = $_POST['observacion_proyecto'];
        $subir_archivo_proyecto = $_FILES['subir_archivo_proyecto']['name'];
        $cambio_fecha = $_POST['cambio_fecha'];
        
        $status = $_POST['act_check'];
       
        $guardar_termino_final_proyecto = $_POST['guardar_termino_final_proyecto'];
        if ($cambio_fecha == "no") {
           
                $proyecto_alias = [
                    'intIdProy' => $codigo,
                    'varAlias' => strtoupper($alias),
                    'usua_modi' => $usuario_proyecto,
                    'boolCambioFecha'=>$cambio_fecha,
                    'FechaCambTerm' => $fecha_termino,
                    'varObservacion' => $observacion_proyecto,
                    'varNombArch' => $subir_archivo_proyecto,
                    'status' => $status,
                ];
               
                $ch1 = curl_init('http://localhost/GestionProyectos/public/index.php/actu_proy'); // GUARDARMOS EL REPROCESO  CON LA FUNCION
                curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch1, CURLOPT_POSTFIELDS, $proyecto_alias);
                $proyecto_alias_array = curl_exec($ch1);
                curl_close($ch1);
                
                $array_proyecto_alias = json_decode($proyecto_alias_array, true);
                
                $validar["mensaje"] = $array_proyecto_alias;
             
            
        } else {
            if ($fecha_termino !== "") {
                if ($observacion_proyecto !== "") {
                    if (!empty($_FILES['subir_archivo_proyecto']['name'])) {
                        $data_exte = explode(".", $_FILES['subir_archivo_proyecto']['name']);
                        $extension = $data_exte[1];
                        $nombre_archivo = strtoupper($data_exte[0]);
                        $file_name = $_FILES['subir_archivo_proyecto']['tmp_name'];
                        // dd($NombreFinalArchivo);
                        //$id_reproceso = $array_reproceso_usuario['data'];
                        $proyecto_max_arc = [
                            'intIdProy' => $codigo,
                        ];
                        $ch3 = curl_init('http://localhost/GestionProyectos/public/index.php/obte_maxi_archi_id'); // OBTENEMOS EL ID DEL REPROCESO
                        curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch3, CURLOPT_POSTFIELDS, $proyecto_max_arc);
                        $proyecto_max_arc_array = curl_exec($ch3);
                        curl_close($ch3);
                        $array_proyecto_max_arc = json_decode($proyecto_max_arc_array, true);
                        $NombreFinalArchivo = $codigo . '-' . $array_proyecto_max_arc['data'];
                        $directorio_archivo_reproceso = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE";
                        if (is_dir($directorio_archivo_reproceso)) {
                            if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE/" . $NombreFinalArchivo . '.' . $extension)) {
                                unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE/" . $NombreFinalArchivo . '.' . $extension);
                                move_uploaded_file($_FILES['subir_archivo_proyecto']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE/" . $NombreFinalArchivo . '.' . $extension);
                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE/" . $NombreFinalArchivo . '.' . $extension, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE/" . $NombreFinalArchivo . '.' . $extension);
                            } else {
                                move_uploaded_file($_FILES['subir_archivo_proyecto']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE/" . $NombreFinalArchivo . '.' . $extension);
                                rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE/" . $NombreFinalArchivo . '.' . $extension, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ProyectoE/" . $NombreFinalArchivo . '.' . $extension);
                            }
                        }
                        $proyecto_archivos = [
                            'intIdProy' => $codigo,
                            'varAlias' => strtoupper($alias),
                            'usua_modi' => $usuario_proyecto,
                             'boolCambioFecha'=>$cambio_fecha,
                            'FechaCambTerm' => $fecha_termino,
                            'varObservacion' => $observacion_proyecto,
                            'varNombArch' => $NombreFinalArchivo . '.' . $extension,
                            'status' => $status,
                        ];
                        $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/actu_proy'); // GUARDARMOS EL REPROCESO  CON LA FUNCION
                        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch2, CURLOPT_POSTFIELDS, $proyecto_archivos);
                        $proyecto_archivos_array = curl_exec($ch2);
                        curl_close($ch2);
                        $array_proyecto_archivos = json_decode($proyecto_archivos_array, true);
                        
                        $validar["mensaje"] = $array_proyecto_archivos;
                        
                        
                    } else {
                        $proyecto_sin_archivos = [
                            'intIdProy' => $codigo,
                            'varAlias' => strtoupper($alias),
                            'usua_modi' => $usuario_proyecto,
                            'FechaCambTerm' => $fecha_termino,
                             'boolCambioFecha'=>$cambio_fecha,
                            'varObservacion' => $observacion_proyecto,
                            'varNombArch' => $subir_archivo_proyecto,
                            'status' => $status,
                        ];
                       // dd($proyecto_sin_archivos);
                        $ch5 = curl_init('http://localhost/GestionProyectos/public/index.php/actu_proy'); // GUARDARMOS EL REPROCESO  CON LA FUNCION
                        curl_setopt($ch5, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch5, CURLOPT_POSTFIELDS, $proyecto_sin_archivos);
                        $proyecto_sin_archivos_array = curl_exec($ch5);
                        curl_close($ch5);
                        $array_proyecto_sin_archivos = json_decode($proyecto_sin_archivos_array, true);

                        $validar["mensaje"] = $array_proyecto_sin_archivos;
                        
                                   }
                } else {
                    $validar["mensaje"] = "Ingrese la OBSERVACION  OBLIGATORIO";
                }
            } else {
                $validar["mensaje"] = "Ingrese la Fecha de cambio  OBLIGATORIO";
            }
        }
        return json_encode($validar);
    }

}
