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
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ESTADO O.T</label>
                    <div style="float:left;" id='tipo_ot' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                    <div style="float:left;" id='txt_ot'>
                    </div>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-right  mt-4" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc" style="margin-top:8px;">
                        <i class="fas fa-search "></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-right mt-4">
                    <button class="btn btn-block btn-primary btn-sm" id="btn_nuevo" style="margin-top:8px;">
                        <i class="fas fa-plus"></i> Nuevo
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
</div>
@include('Contrato.modal_cargar')
@include('Contrato.modal_contrato_nuevo')
@include('Contrato.modal_contrato_editar')
@include('Contrato.modal_tarifa_nueva')
@include('Contrato.modal_tarifa_editar')
@include('Contrato.modal_guia_recibida')
@include('Contrato.modal_errore')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/contrato.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        listar_data_list_proyectos();
        tipo_ot();
        listar_ot_abiertas_editar();
        combo_producto_editar();
        combo_contratista_editar();
        unidad_valorizar_editar();
    });
</script>
@endpush
@endsection