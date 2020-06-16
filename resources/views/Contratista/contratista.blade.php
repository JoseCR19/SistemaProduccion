@push('javascripts')
<link rel="stylesheet" href="introjs.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.shinyblack.css" type="text/css" />
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
    <div class="card-header cabecera_pantalla">
        
        <div class="float-right mr-3">
            <button class="btn btn-block btn-primary"  onclick="introJs().start();"  type="button" id="obte_info">
                <i class="fas fa-info-circle"></i> 
            </button>
        </div>
        <div class="float-right mr-3" data-intro="Permite agregar contratistas al agrupador seleccionado."> 
            <button class="btn btn-block btn-primary" type="button" id="crea_cont_agru">
                <i class="fas fa-plus"></i> Nuevo
            </button>
        </div>
        
        <div id="excel" data-intro="Exporta la tabla hacia la hoja de cálculo Excel." class="float-right mr-3" style="color:white;border-color:transparent !important;background:transparent !important">
            <button class="btn btn-block btn-success">
                <i class="far fa-file-excel"></i> Exportar
            </button>
        </div>
        <div class="float-left" data-intro="Permite seleccionar el “agrupador”">
            <select name="subtipo" id="agrupador3" class="custom-select">
                <option value="" disabled="" selected="">Seleccione</option>
            </select>
        </div>

        <div class="float-left  ml-2" data-intro="Lista los contratistas relacionados al agrupador seleccionado.">
            <a data-target="#modal-create-usuario" data-toggle="modal" href="" style="text-decoration: none !important">
                <button type="button" class="btn btn-block btn-primary" id="busc_cont">
                    <i class="fas fa-search"></i> Buscar
                </button>
            </a>
        </div>
    </div>
    <div class="card-body default">
        <div id='jqxWidget'>
            <div id="grid_agru"></div>
            <div style="margin-top: 30px;">
                <div id="cellbegineditevent"></div>
                <div style="margin-top: 10px;" id="cellendeditevent"></div>
            </div>
        </div>
    </div>
</div>
 
@include('Contratista.modal_create_contratista')
@push('scripts')
<script src="intro.js"></script>
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script src="Folder/contratista.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        listar_agrupadores();
        list_cont_agrup();
    });
</script>
@endpush
@endsection