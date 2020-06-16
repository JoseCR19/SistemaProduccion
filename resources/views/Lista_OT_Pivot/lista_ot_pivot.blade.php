@push('javascripts')
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.shinyblack.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.light.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
<script type="text/javascript" src="jqwidgets/scripts/jquery-1.11.1.min.js"></script>
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
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdraw.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxchart.core.js"></script>
  <script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatatable.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxtreegrid.js"></script>


@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row">
            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">Unidad Negocio</label>
                    <div style='float: left;' id='unidad_negocio'>
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
            <div class="col-md-2">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important">Tipo Elemento</label>
                    <div style="float:left;" id='producto'>
                    </div>
                </div>
            </div>

            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">Unidad</label>
                    <div style='float: left;' id='unidad'>
                    </div>
                </div>
            </div>

            <div class="col-md-2 " >
                <div class="form-group" id="fecha_i">
                    <label for="inputPassword3" style="font-weight:500 !important">FECHA INICIO</label>
                    <input type="date" class="form-control" id="fech_inic">
                </div>
            </div>
            <div class="col-md-2 " >
                <div class="form-group" id="fecha_f">
                    <label for="inputPassword3" style="font-weight:500 !important">FECHA FIN</label>
                    <input type="date" class="form-control" id="fech_fin">
                </div>
            </div>
        </div>
        <div class="row" style="margin-top: -28px">
            <div class="col-md-9"></div>
            <div class="col-md-1">
                <div class="float-right  mt-4" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc" style="margin-top:8px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-right  mt-4" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_buscar2" style="margin-top:8px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar2
                    </button>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-right mt-4">
                    <button class="btn btn-block btn-primary btn-sm" id="limpiar" style="margin-top:8px;">
                        <i class="fas fa-broom"></i> Limpiar
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
@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/lista_ot_pivot.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //listar_agrupacion();
        ot_1();
        combo_producto();
        unidad_negocio();
        unidad();
        tree_grid();
    });
</script>
@endpush
@endsection