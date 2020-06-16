@push('javascripts')
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.shinyblack.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.light.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatatable.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.export.js"></script> 
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatatable.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxscrollbar.js"></script>
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
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdraw.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxchart.core.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxtreegrid.js"></script>
<style>
    .max {
        color: black;
        background-color: #EDEDED;
    }

    .avg {
        color: black;
        background-color: #C6E0B4;
    }
    .minavg {
        color: black;
        background-color: #F8CBAD;
    }
    .min {
        color: black;
        background-color: #FFE699;
    }
    .pintura {
        color: black;
        background-color: #FFF2CC;
    }
    .final {
        color: black;
        background-color: #BDD7EE;

    }
    .total{
        color: white;
        background-color: #21242B;
    }
    .max:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected), .jqx-widget .max:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected) {
        color: black !important;
        background-color: #EDEDED;
    }
    .avg:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected), .jqx-widget .avg:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected) {
        color: black;
        background-color: #C6E0B4;
    }
    .minavg:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected), .jqx-widget .minavg:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected) {
        color: black;
        background-color: #F8CBAD;
    } 
    .min:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected), .jqx-widget .min:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected) {
        color: black;
        background-color: #FFE699;
    }
    .pintura:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected), .jqx-widget .pintura:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected) {
        color: black;
        background-color: #FFF2CC;
    }
    .final:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected), .jqx-widget .final:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected) {
        color: black;
        background-color: #BDD7EE;
    }
    .total:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected), .jqx-widget .total:not(.jqx-grid-cell-hover):not(.jqx-grid-cell-selected) {
        color: white;
        background-color: #21242B;
    }
</style>
@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row">
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">UNIDAD DE NEGOCIO</label>
                    <div style='float: left;' id='unidad_negocio' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">O.T</label>
                    <div style="float:left;" id='txt_ot' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4  col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">TIPO ELEMENTO</label>
                    <div style="float:left;" id='producto' class="col-md-11 col-11">
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important"  class="col-md-12 col-12">UNIDAD</label>
                    <div style='float: left;' id='unidad' class="col-md-11 col-11">
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group" id="fecha_i">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">FECHA INICIO</label>
                    <input type="date" class="form-control" id="fech_inic" style="width: 100%;height: 30px;">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group" id="fecha_f">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">FECHA FIN</label>
                    <input type="date" class="form-control" id="fech_fin" style="width: 100%;height: 30px;" >
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important"  class="col-md-12 col-12">T.GRUPO ESTRUCTURA</label>
                    <div style='float: left;' id='tipo_gupo_estructura' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-sm-1 col-sm-4 col-6">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" checked>
                    <label class="form-check-label">Producido</label>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-sm-1 col-sm-4 col-6">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="2">
                    <label class="form-check-label">Pendiente</label>
                </div>
            </div>

            <div class="col-lg-1 col-md-2 col-sm-1 col-sm-4 col-4">
                <div class="float-right  mt-4" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc" style="margin-top:8px;">
                        <i class="fas fa-search"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-sm-1 col-sm-4 col-4">
                <div class="float-right mt-4">
                    <button class="btn btn-block btn-primary btn-sm" id="limpiar" style="margin-top:8px;">
                        <i class="fas fa-broom"></i> Limpiar
                    </button>
                </div>
            </div>
            <div id="excel" data-intro="Exporta la tabla hacia la hoja de cálculo Excel." class="float-right mr-3" style="color:white;border-color:transparent !important;background:transparent !important">
                <div class="float-right mt-4">
                    <button class="btn btn-block btn-primary btn-sm" style="margin-top:8px;">
                        <i class="far fa-file-excel"></i> Exportar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body default cabecera_pantalla">
        <div id="grid">  </div>
        <div id="grid_componente" class="hidde_grid"></div>
        <div id='jqxWidget'>
            <div style="margin-top: 30px;">
                <div id="cellbegineditevent"></div>
                <div style="margin-top: 10px;" id="cellendeditevent"></div>
            </div>
        </div>
    </div>
</div>
@include('Wip.modal_ver_grupos')
@include('Wip.modal_pdf_visualizar')
@include('Wip.modal_cargar')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/wip.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //listar_agrupacion();
        ot_1();
        combo_producto();
        unidad_negocio();
        combo_tipo_grupo_estructura();
        unidad();
        tree_grid();
        tree_grid_componente();
    });
</script>
@endpush
@endsection