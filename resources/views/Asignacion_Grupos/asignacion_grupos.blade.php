@push('javascripts')
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
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcombobox.js"></script>
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
<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.grouping.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.aggregates.js"></script> 

@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row">
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                    <div style="float:left;" id='txt_ot' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important">TIPO ELEMENTO</label>
                    <div style="float:left;" id='producto' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">ZONA</label>
                    <div style='float: left;' id='zona' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">PROGRAMA</label>
                    <div style='float: left;' id='tarea' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">GRUPO</label>
                    <div style='float: left;' id='paquete' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="form-group ">
                    <label style="font-weight:500 !important">PLANTA</label>
                    <div style='float: left;' id='planta' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4 col-6">
                <div class="form-group ">
                    <label style="font-weight:500 !important">ESTADOS</label>
                    <div style='float: left;' id='estados' class="col-lg-11 col-md-11 col-sm-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-sm-2 col-6">
                <div class="float-left  mt-4" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="buscar_lista_grupos" style="margin-top:8px;">
                        <i class="fas fa-search"></i>Buscar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-sm-2 col-6">
                <div class="float-left  mt-4">
                    <button class="btn btn-block btn-success btn-sm"  id="excel_asignacion_grupo" style="margin-top:8px;">
                        <i class="far fa-file-excel"></i>Exportar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-sm-2 col-6">
                <div class="float-left mt-4">
                    <button class="btn btn-block btn-primary btn-sm" id="limpiar" style="margin-top:8px;">
                        <i class="fas fa-broom"></i>Limpiar
                    </button>
                </div>
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
    <div>

    </div>
</div>
@include('Asignacion_Grupos.modal_ver_grupos')
@include('Asignacion_Grupos.modal_editar_grupos')
@include('Asignacion_Grupos.modal_ver_planos')
@include('Asignacion_Grupos.modal_pdf_visualizar')
@include('Asignacion_Grupos.modal_cargar')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/asignar_grupos.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //listar_agrupacion();
        dropDownlist();
        listar_data_list_proyectos();
        combo_producto();
        listar_planta();
        listar_estado();
        //lista_etapa();
    });
</script>
@endpush
@endsection