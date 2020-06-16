@push('javascripts')
<link rel="stylesheet" href="introjs.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.shinyblack.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.light.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxbuttons.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxscrollbar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxlistbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdropdownlist.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxmenu.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.pager.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.filter.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.sort.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.selection.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxnumberinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxwindow.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxlistbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdropdownlist.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.columnsresize.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.export.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.export.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxpanel.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcalendar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatetimeinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.edit.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/globalization/globalize.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcombobox.js"></script>
<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.grouping.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.aggregates.js"></script> 
@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row">
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ESTADO O.T</label>
                    <div style="float:left;" id='tipo_ot' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">O.T</label>
                    <div style="float:left;" id='txt_ot' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-md-2 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO ELEMENTO</label>
                    <div style="float:left;" id='producto' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO ETAPA</label>
                    <div style='float: left;' id='etapa' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ETAPA ACTUAL</label>
                    <div style='float: left;' id='etapa_actual' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">PROGRAMA</label>
                    <div style='float: left;' id='tarea' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">GRUPO</label>
                    <div style='float: left;' id='paquete' class="col-11">
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">CODIGO</label>
                    <div style='float: left;' id='codigo' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ESTADOS</label>
                    <div style='float: left;' id='estados_ot' class="col-11">
                    </div>
                </div>
            </div>
            <!--<div class="col-md-2 col-sm-6 col-6" id="quitar_div">
            </div>-->
            <div class="col-lg-2 col-md-2 col-sm-6 col-6" >
                <div class="form-group hidde_grid" id="fecha_i">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">FECHA INICIO</label>
                    <input type="date" class="form-control" id="fech_inic" style="width: 100%;height: 30px;">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-6 col-6" >
                <div class="form-group hidde_grid" id="fecha_f">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">FECHA FIN</label>
                    <input type="date" class="form-control" id="fech_fin" style="width: 100%;height: 30px;">
                </div>
            </div>

            <div class="col-lg-1 col-md-1 col-sm-3 col-6">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check" data-intro="Muestra la situación actual de los elementos: La etapa actual en donde se encuentran">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" checked onclick="handleClick(this);">
                    <label class="form-check-label">Actual</label>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-3 col-4 " id="c" >
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check" data-intro="Muestra las actividades realizadas en los elementos: Etapas avanzadas, fechas en que fueron reportados, observaciones ...">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio" value="2" onclick="handleClick(this);">
                    <label class="form-check-label" id="a">Historico</label>
                </div>
            </div>
            <div class="col-lg-7 col-md-1" >
            </div>
      
            <div class="col-md-1 col-md-1 col-sm-2 col-4">
                <div class="float-left" data-intro="Exporta la tabla hacia la hoja de cálculo Excel.">
                    <button class="btn btn-block btn-success btn-sm"  id="buscar_lista-ot" style="margin-top: 5px;">
                         <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-md-1 col-md-1 col-sm-2 col-4">
                <div class="float-left" data-intro="Exporta la tabla hacia la hoja de cálculo Excel.">
                    <button class="btn btn-block btn-success btn-sm"  id="excel_lista_ot" style="margin-top: 5px;">
                        <i class="far fa-file-excel"></i> Exportar
                    </button>
                </div>
            </div>
            <div class="col-md-1 col-md-1 col-sm-2 col-4">
                <div class="float-left" data-intro="Exporta los elementos serializados hacia la hoja de cálculo Excel.">
                    <button class="btn btn-block btn-success btn-sm" id="seriales_data" style="margin-top: 5px;">
                        <i class="far fa-file-excel "></i> Seriales
                    </button>
                </div>
            </div>
            <div class="col-md-1 col-md-1 col-sm-2 col-4">
                <div class="float-left" data-intro="Restablece los filtros de búsqueda.">
                    <button class="btn btn-block btn-primary btn-sm" id="limpiar" style="margin-top: 5px;">
                        <i class="fas fa-broom"></i> Limpiar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-3">
                <div class="float-left">
                    <button class="btn btn-block btn-primary btn-sm"  onclick="introJs().start();"  type="button" id="obte_info" style="margin-top: 5px;">
                        <i class="fas fa-info-circle"></i> 
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body default cabecera_pantalla" data-intro="<b>Series:</b><br>Muestra las series del elemento seleccionado.">
        <div id='jqxWidget'>
            <div id="grid"></div>
            <div style="margin-top: 30px;">
                <div id="cellbegineditevent"></div>
                <div style="margin-top: 10px;" id="cellendeditevent"></div>
            </div>
        </div>
        <div class="row " style="margin-top: -20px">
            <div class="col-md-10" >
            </div>
            <div class="col-md-2 " >
                <div class="float-right" data-intro="Permite agregar el dato “Pintura” a los elementos seleccionados.">
                    <button class="btn btn-block btn-primary btn-md hidde_grid" id="asignar_pintura" style="margin-top:8px;">
                        <i class="fas fa-plus"></i> AGREGAR PINTURA
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@include('Lista_OT.modal_lista_ot')
@include('Lista_OT.modal_ruta_descripcion')
@include('Lista_OT.modal_lista_serie_historio')
@include('Lista_OT.modal_asignar_pintura')
@include('Lista_OT.modal_cargar')
@include('Lista_OT.modal_pdf_visualizar')
@include('Lista_OT.modal_cargar_elem')
@push('scripts')
<script src="intro.js"></script>
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/lista_ot.js"></script>
<script type="text/javascript">
                        $(document).ready(function () {
                            //listar_agrupacion();

                            validar_2();


                        });
</script>
@endpush
@endsection