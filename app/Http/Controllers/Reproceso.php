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

class Reproceso extends Controller {

    public function regi_reproceso() {
        return view('Reproceso.regi_reproceso');
    }

    public function guardar_detalle_reproceso() {

        $validar = array('mensaje' => '', 'dato' => array());
        $id_ot = $_POST['ot_detalle_reproceso_nuevo'];
        $tipo_producto = $_POST['tipo_producto_detalle_reproceso'];
        $zona_detalle = $_POST['zona_detalle_reproceso'];
        $programa_detalle = $_POST['programa_detalle_reproceso'];
        $ruta_detalle = $_POST['ruta_detalle_reproceso'];
        $idelemento_detalle = $_POST['idelemento_detalle_reproceso'];
        $usuario = $_POST['user_detalle_reproceso'];
        $etapa_origen_php = $_POST['nuevo_detalle_reproceso_etapa_origen_php'];
        $etapa_destino_php = $_POST['nuevo_detalle_reproceso_etapa_destino_php'];
        $motivo_php = $_POST['nuevo_detalle_reproceso_motivo_php'];
        $observacion = $_POST['nuevo_reproceso_observacion'];
        //archivo
        $nombre_archivo = $_POST['nuevo_reproceso_observacion'];
        $subir_archivo_reproceso = $_FILES['subir_archivo_reproceso']['name'];

        if ($observacion !== "") { // SI LA OBSERVACION ES VACIO
            if (!empty($_FILES['subir_archivo_reproceso']['name'])) { // SI NO ESTA VACIO EL ARCHIVO
              
                $data_exte = explode(".", $_FILES['subir_archivo_reproceso']['name']);
                $extension = $data_exte[1];
                $nombre_archivo = strtoupper($data_exte[0]);
                $file_name = $_FILES['subir_archivo_reproceso']['tmp_name'];
                
                $reproceso = [
                    'v_intIdproy' => $id_ot,
                    'v_intIdTipoProducto' => $tipo_producto,
                    'v_intIdZona' => $zona_detalle,
                    'v_intPrograma' => $programa_detalle,
                    'v_intIdEtapaOrigen' => $etapa_origen_php,
                    'v_intIdEtapaDestino' => $etapa_destino_php,
                    'v_intIdMotivo' => $motivo_php,
                    'v_Observacion' => $observacion,
                    'v_usuario' => $usuario,
                    'v_intIdRuta' => $ruta_detalle,
                    'v_IdElementos' => $idelemento_detalle,
                ];

                $ch1 = curl_init('http://localhost/GestionReprocesos/public/index.php/guar_repro'); // GUARDARMOS EL REPROCESO  CON LA FUNCION
                curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch1, CURLOPT_POSTFIELDS, $reproceso);
                $reproceso_array = curl_exec($ch1);
                curl_close($ch1);
                $array_reproceso = json_decode($reproceso_array, true);


                if ($array_reproceso['data'][0]['mensaje'] === "" || $array_reproceso['data'][0]['mensaje'] === null) {

                    $reproceso_usuario = [
                        'acti_usua' => $usuario,
                    ];

                    $ch3 = curl_init('http://localhost/GestionReprocesos/public/index.php/obtn_id_repr'); // OBTENEMOS EL ID DEL REPROCESO
                    curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch3, CURLOPT_POSTFIELDS, $reproceso_usuario);
                    $reproceso_usuario_array = curl_exec($ch3);
                    curl_close($ch3);
                    $array_reproceso_usuario = json_decode($reproceso_usuario_array, true);

                    $id_reproceso = $array_reproceso_usuario['data'];

                    $reproceso_archivo = [
                        'varArchivo' => $id_reproceso . '.' . $extension,
                        'intIdreproceso' => $id_reproceso
                    ];


                    //dd($reproceso_archivo);
                    $ch4 = curl_init('http://localhost/GestionReprocesos/public/index.php/actu_nombre_arch'); // ACTUALIZAMOS EL NOMBRE DEL ARCHIVO
                    curl_setopt($ch4, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch4, CURLOPT_POSTFIELDS, $reproceso_archivo);
                    $reproceso_archivo_array = curl_exec($ch4);
                    curl_close($ch4);
                    $array_reproceso_archivo = json_decode($reproceso_archivo_array, true);


                    $directorio_archivo_reproceso = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso";
                    if (is_dir($directorio_archivo_reproceso)) {
                        if (file_exists($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso/" . $id_reproceso . '.' . $extension)) {
                            unlink($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso/" . $id_reproceso . '.' . $extension);
                            move_uploaded_file($_FILES['subir_archivo_reproceso']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso/" . $id_reproceso . '.' . $extension);
                            rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso/" . $id_reproceso . '.' . $extension, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso/" . $id_reproceso . '.' . $extension);
                        } else {
                            move_uploaded_file($_FILES['subir_archivo_reproceso']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso/" . $id_reproceso . '.' . $extension);
                            rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso/" . $id_reproceso . '.' . $extension, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Reproceso/" . $id_reproceso . '.' . $extension);
                        }
                    }


                    $reproceso_archivo_informacion_vacio = [
                        'intIdreproceso' => $id_reproceso,
                    ];


                    $ch7 = curl_init('http://localhost/GestionReprocesos/public/index.php/cabecera_reproceso'); // OBTENEMOS LA CABECERA DEL REPROCESO
                    curl_setopt($ch7, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch7, CURLOPT_POSTFIELDS, $reproceso_archivo_informacion_vacio);
                    $obtener_reproceso_vacio_array = curl_exec($ch7);
                    curl_close($ch7);
                    $data = json_decode($obtener_reproceso_vacio_array, true);
                   
                    $validar['mensaje'] = "";
                  
                    $validar['dato'][] = array(
                        'num_Doc' => mb_strtoupper(trim($id_reproceso), 'UTF-8'),
                        'intCantiTotal' => mb_strtoupper(trim($data['data'][0]['intCantiTotal']), 'UTF-8'),
                        'EtapaOrigen' => mb_strtoupper(trim($data['data'][0]['EtapaOrigen']), 'UTF-8'),
                        'EtapaDestino' => mb_strtoupper(trim($data['data'][0]['EtapaDestino']), 'UTF-8'),
                        'numPesoNetoTotal' => mb_strtoupper(trim($data['data'][0]['numPesoNetoTotal']), 'UTF-8'),
                        'Motivo' => mb_strtoupper(trim($data['data'][0]['Motivo']), 'UTF-8'),
                        'Estado'=> mb_strtoupper(trim($data['data'][0]['Estado']), 'UTF-8'),
                        'varObservacion' => mb_strtoupper(trim($data['data'][0]['varObservacion']), 'UTF-8'),
                        'acti_usua' => mb_strtoupper(trim($data['data'][0]['acti_usua']), 'UTF-8'),
                        'acti_hora' => mb_strtoupper(trim($data['data'][0]['acti_hora']), 'UTF-8')
                    );
                    
                    
                

                    // $validar['mensaje'] = "";
                } else {
                    $validar['mensaje'] = $array_reproceso['data'][0]['mensaje'];
                }
            } else {
                $reproceso_vacio = [
                    'v_intIdproy' => $id_ot,
                    'v_intIdTipoProducto' => $tipo_producto,
                    'v_intIdZona' => $zona_detalle,
                    'v_intPrograma' => $programa_detalle,
                    'v_intIdEtapaOrigen' => $etapa_origen_php,
                    'v_intIdEtapaDestino' => $etapa_destino_php,
                    'v_intIdMotivo' => $motivo_php,
                    'v_Observacion' => $observacion,
                    'v_usuario' => $usuario,
                    'v_intIdRuta' => $ruta_detalle,
                    'v_IdElementos' => $idelemento_detalle,
                ];
                  
                 
                    
               
                $ch2 = curl_init('http://localhost/GestionReprocesos/public/index.php/guar_repro');
                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch2, CURLOPT_POSTFIELDS, $reproceso_vacio);
                $reproceso_vacio_array = curl_exec($ch2);
                curl_close($ch2);
                $array_reproceso_vacio = json_decode($reproceso_vacio_array, true);
                      
                //  $ validar['mensaje']=$array_reproceso_vacio; 
                if ($array_reproceso_vacio['data'][0]['mensaje'] === "" || $array_reproceso_vacio['data'][0]['mensaje'] === null) {
                    
                    $reproceso_usuario = [
                        'acti_usua' => $usuario,
                    ];

                    $ch3 = curl_init('http://localhost/GestionReprocesos/public/index.php/obtn_id_repr'); // OBTENEMOS EL ID DEL REPROCESO
                    curl_setopt($ch3, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch3, CURLOPT_POSTFIELDS, $reproceso_usuario);
                    $reproceso_usuario_array = curl_exec($ch3);
                    curl_close($ch3);
                    $array_reproceso_usuario = json_decode($reproceso_usuario_array, true);

                    $id_reproceso = $array_reproceso_usuario['data'];

                    
                    
                    $reproceso_archivo_informacion_vacio = [
                        'intIdreproceso' => $id_reproceso,
                    ];


                    $ch6 = curl_init('http://localhost/GestionReprocesos/public/index.php/cabecera_reproceso'); // OBTENEMOS LA CABECERA DEL REPROCESO
                    curl_setopt($ch6, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($ch6, CURLOPT_POSTFIELDS, $reproceso_archivo_informacion_vacio);
                    $obtener_reproceso_vacio_array = curl_exec($ch6);
                    curl_close($ch6);
                    $data = json_decode($obtener_reproceso_vacio_array, true);

                    //  $validar['mensaje'] = $array_obtener_reproceso_vacio;

                    $validar['mensaje'] = "";
                  
                    $validar['dato'][] = array(
                        'num_Doc' => mb_strtoupper(trim($id_reproceso), 'UTF-8'),
                        'intCantiTotal' => mb_strtoupper(trim($data['data'][0]['intCantiTotal']), 'UTF-8'),
                        'EtapaOrigen' => mb_strtoupper(trim($data['data'][0]['EtapaOrigen']), 'UTF-8'),
                        'EtapaDestino' => mb_strtoupper(trim($data['data'][0]['EtapaDestino']), 'UTF-8'),
                        'numPesoNetoTotal' => mb_strtoupper(trim($data['data'][0]['numPesoNetoTotal']), 'UTF-8'),
                        'Motivo' => mb_strtoupper(trim($data['data'][0]['Motivo']), 'UTF-8'),
                        'Estado'=> mb_strtoupper(trim($data['data'][0]['Estado']), 'UTF-8'),
                        'varObservacion' => mb_strtoupper(trim($data['data'][0]['varObservacion']), 'UTF-8'),
                        'acti_usua' => mb_strtoupper(trim($data['data'][0]['acti_usua']), 'UTF-8'),
                        'acti_hora' => mb_strtoupper(trim($data['data'][0]['acti_hora']), 'UTF-8')
                    );
                } else {
                    $validar['mensaje'] = $array_reproceso_vacio['data'][0]['mensaje'];
                }
            }
        } else {
            $validar['mensaje'] = " LA OBSERVACION OBLIGATORIA";
        }


        return json_encode($validar);
    }

}
