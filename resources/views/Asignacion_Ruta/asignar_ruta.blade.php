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
        <div class="row mb-1">
            <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">O.T</label>
                    <div style="float:left;" id='txt_ot' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">TIPO ELEMENTO</label>
                    <div style="float:left;" id='producto' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important"  class="col-lg-12 col-md-12 col-sm-12 col-12">ZONA</label>
                    <div style='float: left;' id='zona' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">PROGRAMA</label>
                    <div style='float: left;' id='tarea' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">GRUPO</label>
                    <div style='float: left;' id='paquete' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">CODIGO</label>
                    <input type="text" class="form-control form-control-sm" id="codigo" placeholder="codigo" require  tabindex="-1" autocomplete="off">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                <div class="form-group ">
                    <label style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">RUTA</label>
                    <div style='float: left;' id='ruta_combo' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-sm-2 col-6">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio" value="1" checked>
                    <label class="form-check-label">Todos</label>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2">
                    <label class="form-check-label">Sin Ruta</label>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3">
                    <label class="form-check-label">Ruta</label>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                <div class="float-left  mt-4" data-intro="Lista la tabla de información correspondiente a los filtros seleccionados.">
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="buscar_lista_rutas" style="margin-top:8px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                <div class="float-left mt-4" data-intro="Exporta la tabla hacia la hoja de cálculo Excel.">
                    <button class="btn btn-block btn-success btn-sm" type="button" id="excel_lista_ruta" style="margin-top:8px;">
                        <i class="far fa-file-excel"></i> Exportar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                <div class="float-left mt-4" data-intro="Restablece los filtros de búsqueda.">
                    <button class="btn btn-block btn-primary btn-sm" id="limpiar" style="margin-top:8px;">
                        <i class="fas fa-broom"></i> Limpiar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                <div class="float-left mt-4" data-intro="Permite asignar una ruta a uno o varios elementos seleccionados.">
                    <button class="btn btn-block btn-primary btn-sm" id="asiganar_ruta" style="margin-top:8px;">
                        <i class="fas fa-plus"></i> Asignar
                    </button>
                </div>
            </div>

                <div class="float-right mt-4">
                    <button class="btn btn-block btn-primary"  onclick="introJs().start();"  type="button" id="obte_info">
                        <i class="fas fa-info-circle"></i> 
                    </button>
                </div>

        </div>
    </div>
    <div class="card-body default cabecera_pantalla">
        <div id='jqxWidget'>
            <div id="grid"></div>
            <div style="margin-top: 30px;">
                <div id="cellbegineditevent"></div>
                <div style="margin-top: 10px;" id="cellendeditevent"></div>
            </div>
        </div>
    </div>
</div>
@include('Asignacion_Ruta.modal_asignar_ruta')
@include('Asignacion_Ruta.modal_errores_asignar_ruta')
@include('Asignacion_Ruta.modal_cargar')
@push('scripts')
<script src="intro.js"></script>
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/asignar_ruta.js"></script>
<script type="text/javascript">
                $(document).ready(function () {
                    //listar_agrupacion();
                    dropDownlist();
                    listar_data_list_proyectos();
                    combo_producto();
                    //lista_etapa();
                });
</script>
@endpush
@endsection