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

//php_value upload_max_filesize 30M
class Foto_PerfilController extends Controller {

    function guardar_foto_perfil() {
        // $TIPO_CARGA = $_POST['carga'];
        $validar = array('data' => [], 'mensaje' => '', 'validacion' => array());
        //$nombre_user = $_POST['nombre_user'];
        $usuario = $_POST['varUsuario'];
        if (!empty($_FILES['varImage']['name'])) {
            $data_exte = explode(".", $_FILES['varImage']['name']);
            $mayuscula = strtoupper($data_exte[1]);
            //dd($mayuscula);
            $nombre_archivo = strtoupper($data_exte[0]);
            if ($mayuscula !== "JPG") {

                $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER  JPG .";
            } else {
                $file_name = $_FILES['varImage']['tmp_name'];
                if ($_FILES["varImage"]["size"] > 0) {
                    $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Perfil/";
                    $destino = $directorio . '' . $usuario . '.jpg';
                    if (is_dir($directorio)) {
                        if (file_exists($directorio . '' . $usuario . '.jpg')) {
                            unlink($directorio . '' . $usuario . '.jpg');
                            move_uploaded_file($_FILES['varImage']['tmp_name'], $directorio . '' . $usuario . '.jpg');
                            $this->correctImageOrientation($destino);
                            $datos_part_list_actualizado = [
                                'varNumeDni' => $_POST['varNumeDni'],
                                'varNombUsua' => $_POST['varNombUsua'],
                                'varApelUsua' => $_POST['varApelUsua'],
                                'varTelfUsua' => $_POST['varTelfUsua'],
                                'usua_modi' => $usuario
                            ];
                            $ch13 = curl_init('http://localhost/GestionUsuarios/public/index.php/edit_foto_perfil');
                            curl_setopt($ch13, CURLOPT_RETURNTRANSFER, true);
                            curl_setopt($ch13, CURLOPT_POSTFIELDS, $datos_part_list_actualizado);
                            $usuario_actualizado = curl_exec($ch13);
                            curl_close($ch13);
                            $array_usuario_actualizado = json_decode($usuario_actualizado, true);
                            $validar["mensaje"] = $array_usuario_actualizado['data']['mensaje'];
                            return json_encode($validar);
                        } else {
                            move_uploaded_file($_FILES['varImage']['tmp_name'], $directorio . '' . $usuario . '.jpg');
                            $datos_part_list_actualizado = [
                                'varNumeDni' => $_POST['varNumeDni'],
                                'varNombUsua' => $_POST['varNombUsua'],
                                'varApelUsua' => $_POST['varApelUsua'],
                                'varTelfUsua' => $_POST['varTelfUsua'],
                                'usua_modi' => $usuario
                            ];
                            $ch13 = curl_init('http://localhost/GestionUsuarios/public/index.php/edit_foto_perfil');
                            curl_setopt($ch13, CURLOPT_RETURNTRANSFER, true);
                            curl_setopt($ch13, CURLOPT_POSTFIELDS, $datos_part_list_actualizado);
                            $usuario_actualizado = curl_exec($ch13);
                            curl_close($ch13);
                            $array_usuario_actualizado = json_decode($usuario_actualizado, true);
                            $validar["mensaje"] = $array_usuario_actualizado['data']['mensaje'];
                            return json_encode($validar);
                        }
                    }
                } else {
                    $validar["mensaje"] = "La imagen es demasiado grande.";
                }
            }
        } else {
            $datos_part_list_actualizado = [
                'varNumeDni' => $_POST['varNumeDni'],
                'varNombUsua' => $_POST['varNombUsua'],
                'varApelUsua' => $_POST['varApelUsua'],
                'varTelfUsua' => $_POST['varTelfUsua'],
                'usua_modi' => $usuario
            ];
            $ch13 = curl_init('http://localhost/GestionUsuarios/public/index.php/edit_foto_perfil');
            curl_setopt($ch13, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch13, CURLOPT_POSTFIELDS, $datos_part_list_actualizado);
            $usuario_actualizado = curl_exec($ch13);
            curl_close($ch13);
            $array_usuario_actualizado = json_decode($usuario_actualizado, true);
            $validar["mensaje"] = $array_usuario_actualizado['data']['mensaje'];
        }
        //dd($validar);
        return json_encode($validar);
    }

    function correctImageOrientation($filename) {
        if (function_exists('exif_read_data')) {
            $exif = exif_read_data($filename);
            if ($exif && isset($exif['Orientation'])) {
                $orientation = $exif['Orientation'];
                if ($orientation != 1) {
                    $img = imagecreatefromjpeg($filename);
                    $deg = 0;
                    switch ($orientation) {
                        case 3:
                            $deg = 180;
                            break;
                        case 6:
                            $deg = 270;
                            break;
                        case 8:
                            $deg = 90;
                            break;
                    }
                    if ($deg) {
                        $img = imagerotate($img, $deg, 0);
                    }
                    // then rewrite the rotated image back to the disk as $filename
                    imagejpeg($img, $filename, 95);
                } // if there is some rotation necessary
            } // if have the exif orientation info
        } // if function exists     
    }

}
