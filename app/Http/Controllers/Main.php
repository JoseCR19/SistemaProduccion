<?php

namespace App\Http\Controllers;

use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class Main extends Controller {

    public function index() {
        return view('Layout.principal');
    }

    public function entidad() {
        return view('Mantenimiento.Entidaddes');
    }

    public function proyecto() {
        return view('Proyecto.gestion_proyecto');
    }

    public function agrupacion() {
        return view('Agrupacion.agrupacion');
    }

    public function partlist() {
        return view('PartList.part_list');
    }

    public function tipo_etapa() {
        return view('Tipo_Etapa.tipo_etapa');
    }

    public function etapa() {
        return view('Etapa.etapa');
    }

    public function armadores() {
        return view('Armadores.armadores');
    }

    public function asignar_etapa() {
        return view('Asignar_Etapa.asignar_etapa');
    }

    public function listar_ot() {
        return view('Lista_OT.lista_ot');
    }

    public function listar_rutas_etapas() {
        return view('Ruta.ruta');
    }

    public function asignar_ruta_produccion() {
        return view('Asignacion_Ruta.asignar_ruta');
    }

    public function asingar_precio_especifico() {
        return view('Asignacion_Precio_Especifico.precio_especifico');
    }
    public function asignar_costos(){
        return view('Asignacion_Costos.costos');
    }
    public function asignar_grupos(){
        return view('Asignacion_Grupos.asignacion_grupos');
    }
    public function wip(){
        return view('Wip.lista_wip');
    }
    public function valorizacion(){
        return view('Valorizacion.valorizacion');
    }
    public function notificacion(){
        return view('Notificacion.noti');
    }
    public function liberacion(){
        return view('Liiberacion.liberacion');
    }

    public function qr(){
        return view('pruebas.lector_qr');
    }
     public function rotulo(){
        return view('Despacho.rotulo');
    }
    public function generar_despacho(){
        return view('Generar_Despacho.generar_despacho');
    }
    public function generar_guia(){
        return view('Guia_Remision.guia_remision');
    }
    
    public function Reporte_liberacion(){
        return view('Reporte_Liberacion.reporte_liberacion');
    }
    public function Reporte_seguimiento_pintura(){
        return view('Reportar_Pintura.Seguimiento_Pintura');
    }
    public function Reportar_galvanizado_turno(){
        return view('Galvanizado.Reporte_galvanizado');
    }
    public function Contrato(){
        return view('Contrato.contrato');
    }
            
}
