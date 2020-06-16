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

ini_set("max_execution_time", 120);

class Guia extends Controller {

    public function listar_guia() {
        return view('Guia.lista_guia');
    }

    public function guardar_guia_emitida() {

        $validar = array('mensaje' => '', 'dato' => array());
        $id_guia_emit = $_POST['id_guia_emitida'];
        $nombr_carpet_emit = $_POST['nombre_carpeta_emitida'];
        $usuario_emit = $_POST['usuario_guia_emitida'];
        $nomb_carp = $_FILES['subir_archivo_guiaemitida']['name'];

        // return view('Guia.lista_guia');
        //dd($id_guia_emit,$nombr_carpet_emit,$usuario_emit,$nomb_carp);

        if (!empty($_FILES['subir_archivo_guiaemitida']['name'])) {

            $data_exte = explode(".", $_FILES['subir_archivo_guiaemitida']['name']);
            $extension = strtoupper($data_exte[1]);
            $nombre_archivo = strtoupper($data_exte[0]);
            $file_name = $_FILES['subir_archivo_guiaemitida']['tmp_name'];

            //NOMBRE DEL ARCHIVO
            $nomb_arch_guia_emit = $id_guia_emit . "-GE";

            if ($extension !== "PDF") {
                $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER PDF.";
            } else {
                $nomb_guia_emitida = [
                    'intIdGuia' => $id_guia_emit,
                    'varArchEmit' => $nomb_arch_guia_emit . "." . $extension,
                    'usua_emit' => $usuario_emit
                ];

                $ch1 = curl_init('http://localhost/GestionProyectos/public/index.php/guia_emitida'); // OBTENEMOS EL ID DEL REPROCESO
                curl_setopt($ch1, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch1, CURLOPT_POSTFIELDS, $nomb_guia_emitida);
                $nomb_guia_emitida_array = curl_exec($ch1);
                curl_close($ch1);

                $directorio_archivo_guia_emitida = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_emit;
                if (is_dir($directorio_archivo_guia_emitida)) {
                    move_uploaded_file($_FILES['subir_archivo_guiaemitida']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_emit . "/" . $nomb_arch_guia_emit . "." . $extension);
                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_emit . "/" . $nomb_arch_guia_emit . "." . $extension, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_emit . "/" . $nomb_arch_guia_emit . "." . $extension);
                } else {
                    mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_emit, 0777, true);
                    move_uploaded_file($_FILES['subir_archivo_guiaemitida']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_emit . "/" . $nomb_arch_guia_emit . "." . $extension);
                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_emit . "/" . $nomb_arch_guia_emit . "." . $extension, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_emit . "/" . $nomb_arch_guia_emit . "." . $extension);
                }

                $validar["mensaje"] = "";
            }
        } else {
            $validar["mensaje"] = "Ingrese el archivo Adjunto";
        }
        return json_encode($validar);
    }

    public function guardar_guia_recibida() {

        $validar = array('mensaje' => '', 'dato' => array());
        $id_guia_reci = $_POST['id_guia_recibida'];
        $nombr_carpet_reci = $_POST['nombre_carpeta_recibida'];
        $usuario_reci = $_POST['usuario_guia_recibida'];
        $nomb_arch_reci = $_FILES['subir_archivo_guia_recibida']['name'];
        // dd($id_guia_reci,$nombr_carpet_reci,$usuario_reci,$nomb_arch_reci);


        if (!empty($_FILES['subir_archivo_guia_recibida']['name'])) {

            $data_exte = explode(".", $_FILES['subir_archivo_guia_recibida']['name']);
            $extension = strtoupper($data_exte[1]);
            $nombre_archivo = strtoupper($data_exte[0]);
            $file_name_recibida = $_FILES['subir_archivo_guia_recibida']['tmp_name'];

            //NOMBRE DEL ARCHIVO
            $nomb_arch_guia_reci = $id_guia_reci . "-GR";

            if ($extension !== "PDF") {
                $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER PDF.";
            } else {
                $nomb_guia_recibida = [
                    'intIdGuia' => $id_guia_reci,
                    'varArchRecep' => $nomb_arch_guia_reci . "." . $extension,
                    'usua_recep' => $usuario_reci
                ];

                $ch2 = curl_init('http://localhost/GestionProyectos/public/index.php/guia_recibida'); // OBTENEMOS EL ID DEL REPROCESO
                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch2, CURLOPT_POSTFIELDS, $nomb_guia_recibida);
                $nomb_guia_recibida_array = curl_exec($ch2);
                curl_close($ch2);

                $directorio_archivo_guia_recibida = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_reci;
                if (is_dir($directorio_archivo_guia_recibida)) {
                    move_uploaded_file($_FILES['subir_archivo_guia_recibida']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_reci . "/" . $nomb_arch_guia_reci . "." . $extension);
                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_reci . "/" . $nomb_arch_guia_reci . "." . $extension, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_reci . "/" . $nomb_arch_guia_reci . "." . $extension);
                } else {
                    mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_reci, 0777, true);
                    move_uploaded_file($_FILES['subir_archivo_guia_recibida']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_reci . "/" . $nomb_arch_guia_reci . "." . $extension);
                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_reci . "/" . $nomb_arch_guia_reci . "." . $extension, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $nombr_carpet_reci . "/" . $nomb_arch_guia_reci . "." . $extension);
                }



                $validar["mensaje"] = "";
            }
        } else {
            $validar["mensaje"] = "Ingrese el archivo Adjunto";
        }
        return json_encode($validar);
    }

    public function pdf_guia_emitida(Request $request) {

        $idguia_emitida = $request->input('idguia_emitida');
        $documen_nomb_carpe = $request->input('obte_documen');
        $usuario = $request->input('usuarios');
        //QUITAMOS LA COMAS ULTMA
        //dd($usuario);
        $idguia_emitida_quitar_coma = trim($idguia_emitida, ',');
        $documen_nomb_carpe_quitar_coma = trim($documen_nomb_carpe, ',');

        $idguia_emitida = explode(",", $idguia_emitida_quitar_coma);
        $documen_nomb = explode(",", $documen_nomb_carpe_quitar_coma);

        $combinadorsustento = new Merger;

        $mensaje = "";
        for ($i = 0; count($documen_nomb) > $i; $i++) {
            $existe = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $documen_nomb[$i];
            if (file_exists($existe)) {
                if ($idguia_emitida[$i] !== "null" || $idguia_emitida[$i] !== "") {
                    $DocSustento = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $documen_nomb[$i] . "/" . $idguia_emitida[$i];
                    $combinadorsustento->addFile($DocSustento);
                }
            }
        }
        $directorio_globales = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales";
        if (is_dir($directorio_globales)) {
            $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales/" . $usuario . ".pdf";
            if (file_exists($docplanos)) {
                unlink($directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales/" . $usuario . ".pdf");
                $salida = $combinadorsustento->merge();
                file_put_contents($docplanos, $salida);
            } else {
                $salida = $combinadorsustento->merge();
                file_put_contents($docplanos, $salida);
            }
        } else {
            mkdir($directorio_globales, 0777, true);
            $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales/" . $usuario . ".pdf";
            if (file_exists($docplanos)) {
                unlink($directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales/" . $usuario . ".pdf");
                $salida = $combinadorsustento->merge();
                file_put_contents($docplanos, $salida);
            } else {
                $salida = $combinadorsustento->merge();

                file_put_contents($docplanos, $salida);
            }
        }

        return['veri' => true, 'lista' => $docplanos, 'mensaje' => $mensaje, 'user' => $usuario];
    }

    public function pdf_guia_recepcionada(Request $request) {

        $idguia_recep = $request->input('idguia_recep');
        $documen_nomb_carpe_recep = $request->input('obte_documen_recep');
        $usuario_recep = $request->input('usuarios_recep');
        //QUITAMOS LA COMAS ULTMA

        $idguia_recep_quitar_coma = trim($idguia_recep, ',');
        $documen_nomb_carpe_recep_quitar_coma = trim($documen_nomb_carpe_recep, ',');

        $idguia_recep = explode(",", $idguia_recep_quitar_coma);
        $documen_nomb_carpe_recep = explode(",", $documen_nomb_carpe_recep_quitar_coma);

        $combinadorsustentos = new Merger;

        $mensaje = "";
        for ($i = 0; count($documen_nomb_carpe_recep) > $i; $i++) {
            $existe = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $documen_nomb_carpe_recep[$i];
            if (file_exists($existe)) {
                if ($idguia_recep[$i] !== "null" || $idguia_recep[$i] !== "") {
                    $DocSustento = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/" . $documen_nomb_carpe_recep[$i] . "/" . $idguia_recep[$i];
                    $combinadorsustentos->addFile($DocSustento);
                }
            }
        }
        $directorio_globales = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales";
        if (is_dir($directorio_globales)) {
            $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales/" . $usuario_recep . ".pdf";
            if (file_exists($docplanos)) {
                unlink($directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales/" . $usuario_recep . ".pdf");
                $salida = $combinadorsustentos->merge();
                file_put_contents($docplanos, $salida);
            } else {
                $salida = $combinadorsustentos->merge();
                file_put_contents($docplanos, $salida);
            }
        } else {
            mkdir($directorio_globales, 0777, true);
            $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales/" . $usuario_recep . ".pdf";
            if (file_exists($docplanos)) {
                unlink($directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/GuiasRemision/Globales/" . $usuario_recep . ".pdf");
                $salida = $combinadorsustentos->merge();
                file_put_contents($docplanos, $salida);
            } else {
                $salida = $combinadorsustentos->merge();

                file_put_contents($docplanos, $salida);
            }
        }

        return['veri' => true, 'lista' => $docplanos, 'mensaje' => $mensaje, 'user' => $usuario_recep];
    }

    // GUIA DE REMISION 
    // REPORTE FOTOGRAFICO RECEPCION

    public function guardar_despa_emit() {




        $validar = array('mensaje' => '', 'dato' => array());

        $ot_despacho = $_POST['ot_despa_emit'];

        $nombre_proyecto_despacho = $_POST['ot_nomb_despa_emit'];

        $tipo_eleme_despa_emit = $_POST['tipo_eleme_despa_emit'];
        $id_despa = $_POST['id_despa_emit'];
        $usuario_des = $_POST['usuario_despa_emit'];
        $nomb_carp_despa = $_FILES['subir_archivo_despa_emit']['name'];

        //dd($ot_despacho, $nombre_proyecto_despacho, $tipo_eleme_despa_emit, $id_despa, $usuario_des, $nomb_carp_despa);
        //$data_exte_documento = explode(" / ", $nombre_proyecto_despacho);
        // dd($data_exte_documento);
        //$proyecto_alias = strtoupper($data_exte_documento[1]);
        $nombre_carpeta_ot = $nombre_proyecto_despacho;

        //  dd($nombre_carpeta_ot);



        if (!empty($_FILES['subir_archivo_despa_emit']['name'])) {
            $data_exte = explode(".", $_FILES['subir_archivo_despa_emit']['name']);
            // dd($data_exte);
            $extension = strtoupper($data_exte[1]);
            $nombre_archivo = strtoupper($data_exte[0]);
            $file_name = $_FILES['subir_archivo_despa_emit']['tmp_name'];
            //dd($extension);

            if ($extension !== "DOC") {
                $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER DOCX.";
            } else {
                $programa = $ot_despacho . $id_despa . "-FD" . "." . $extension;

                $nomb_foto_despacho = [
                    'intIdDesp' => $id_despa,
                    'intIdProy' => $ot_despacho,
                    'intIdTipoProducto' => $tipo_eleme_despa_emit,
                    'varArchDesp' => $programa,
                    'arch_desp_usua' => $usuario_des
                ];
                // dd($nomb_foto_despacho);
                $ch10 = curl_init('http://localhost/GestionProyectos/public/index.php/repo_foto_despa'); // 
                curl_setopt($ch10, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch10, CURLOPT_POSTFIELDS, $nomb_foto_despacho);
                $nomb_foto_despacho_array = curl_exec($ch10);
                curl_close($ch10);

                $directorio_archivo_foto_despacho = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot;

                if (is_dir($directorio_archivo_foto_despacho)) {

                    move_uploaded_file($_FILES['subir_archivo_despa_emit']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa);
                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa);
                } else {
                    mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot, 0777, true);
                    move_uploaded_file($_FILES['subir_archivo_despa_emit']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa);
                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa);
                }

                $validar["mensaje"] = "";
            }
        } else {
            $validar["mensaje"] = "Ingrese el archivo Adjunto";
        }

        return json_encode($validar);
    }

    public function contrato() {
        $validar = array('mensaje' => '', 'dato' => array());
        $id_contrato = $_POST['id_contrto'];
        $nomb_carp_despa = $_FILES['subir_archivo_guia_recibida']['name'];

        if (!empty($_FILES['subir_archivo_guia_recibida']['name'])) {
            $data_exte = explode(".", $_FILES['subir_archivo_guia_recibida']['name']);
            // dd($data_exte);
            $extension = strtoupper($data_exte[1]);
            $nombre_archivo = strtoupper($data_exte[0]);
            $file_name = $_FILES['subir_archivo_guia_recibida']['tmp_name'];
            if ($extension !== "PDF") {
                $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER PDF.";
            } else {
                $programa = $id_contrato . "." . $extension;
                //dd($programa);
                $directorio_archivo_foto_despacho = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos";
                if (is_dir($directorio_archivo_foto_despacho)) {
                    $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa . ".PDF";
                    if (file_exists($docplanos)) {
                        unlink($directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa . ".PDF");
                        move_uploaded_file($_FILES['subir_archivo_guia_recibida']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa);
                        rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa);
                    } else {
                        move_uploaded_file($_FILES['subir_archivo_guia_recibida']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa);
                        rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa);
                    }
                } else {
                    mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos", 0777, true);
                    $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa . ".PDF";
                    if (file_exists($docplanos)) {
                        unlink($directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa . ".PDF");
                        move_uploaded_file($_FILES['subir_archivo_guia_recibida']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa);
                        rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa);
                    } else {
                        move_uploaded_file($_FILES['subir_archivo_guia_recibida']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa);
                        rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $programa);
                    }
                }
                $validar["mensaje"] = "";
            }
        } else {
            $validar["mensaje"] = "Ingrese el archivo Adjunto";
        }
        return json_encode($validar);
    }

    public function validar_documento(Request $request) {

        $id_contrato = $request->input('intIdContrato');
        
        $directorio_archivo_foto_despacho = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos";
        $validar = array('mensaje' => '', 'dato' => array());
        if(is_dir($directorio_archivo_foto_despacho)){
            
            $docplanos = $directorio = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/Contratos/" . $id_contrato . ".PDF";
            if(file_exists($docplanos)){
                $validar["mensaje"] = "";
            }else{
                $validar["mensaje"] = "No hay ningun archivo cargado";
            }
        }else{
            $validar["mensaje"] = "No hay ningun archivo cargado";
        }
        return json_encode($validar);
    }

    public function guardar_despa_recep() {

        $validar = array('mensaje' => '', 'dato' => array());
        $ot_despacho_recep = $_POST['ot_guia_recep'];
        $nombre_proyecto_despacho_recep = $_POST['ot_nomb_despa_recep'];
        $tipo_eleme_despa_recep = $_POST['tipo_elem_despa_recep'];
        $id_despa_recep = $_POST['id_despa_recep'];
        $usuario_recep = $_POST['usuario_despa_recep'];
        $nomb_carp_despa = $_FILES['subir_archivo_despa_recep']['name'];

        //dd($ot_despacho_recep, $nombre_proyecto_despacho_recep, $tipo_eleme_despa_recep, $id_despa_recep, $usuario_recep, $nomb_carp_despa);
        $data_exte_documento = explode(" / ", $nombre_proyecto_despacho_recep);
        // dd($data_exte_documento);
        $proyecto_alias = strtoupper($data_exte_documento[1]);
        $nombre_carpeta_ot = strtoupper($data_exte_documento[0]);





        if (!empty($_FILES['subir_archivo_despa_recep']['name'])) {
            $data_exte = explode(".", $_FILES['subir_archivo_despa_recep']['name']);
            // dd($data_exte);
            $extension = strtoupper($data_exte[1]);
            $nombre_archivo_recep = strtoupper($data_exte[0]);
            $file_name = $_FILES['subir_archivo_despa_recep']['tmp_name'];

            if ($extension !== "DOCX") {
                $validar["mensaje"] = "* ERROR EXTENSION DEL ARCHIVO DEBE SER DOCX.";
            } else {
                $programa_recep = $ot_despacho_recep . $id_despa_recep . "-FR" . "." . $extension;


                $nomb_foto_despacho_recep = [
                    'intIdDesp' => $id_despa_recep,
                    'intIdProy' => $ot_despacho_recep,
                    'intIdTipoProducto' => $tipo_eleme_despa_recep,
                    'varArchRece' => $programa_recep,
                    'arch_rece_usua' => $usuario_recep
                ];
                //dd($nomb_foto_despacho);
                $ch11 = curl_init('http://localhost/GestionProyectos/public/index.php/repo_foto_recep'); // 
                curl_setopt($ch11, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch11, CURLOPT_POSTFIELDS, $nomb_foto_despacho_recep);
                $nomb_foto_despacho_recep_array = curl_exec($ch11);
                curl_close($ch11);
                $directorio_archivo_foto_recepcion = $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot;

                if (is_dir($directorio_archivo_foto_recepcion)) {
                    move_uploaded_file($_FILES['subir_archivo_despa_recep']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa_recep);
                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa_recep, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa_recep);
                } else {
                    mkdir($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot, 0777, true);
                    move_uploaded_file($_FILES['subir_archivo_despa_recep']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa_recep);
                    rename($_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa_recep, $_SERVER['DOCUMENT_ROOT'] . "/Documentos/ReporteFotografico/" . $nombre_carpeta_ot . "/" . $programa_recep);
                }
                $validar["mensaje"] = "";
            }
        } else {
            $validar["mensaje"] = "Ingrese el archivo Adjunto";
        }


        return json_encode($validar);
    }

}
