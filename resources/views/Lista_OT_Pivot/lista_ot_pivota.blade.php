@push('javascripts')
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.shinyblack.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
 

<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxbuttons.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxscrollbar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxlistbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxmenu.js"></script>
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
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdragdrop.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxpivot.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxpivotgrid.js"></script> 
  <script type="text/javascript" src="jqwidgets/jqwidgets/jqxpivotdesigner.js"></script>
 
 

<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>
 
@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row mb-1">
            <div class="col-md-2">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                    <div style="float:left;" id='txt_ot'>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important">ELEMENTO</label>
                    <div style="float:left;" id='producto'>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">TIPO ETAPA</label>
                    <div style='float: left;' id='etapa'>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">ETAPA ACTUAL</label>
                    <div style='float: left;' id='etapa_actual'>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">TAREA</label>
                    <div style='float: left;' id='tarea'>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">PAQUETE</label>
                    <div style='float: left;' id='paquete'>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">CODIGO</label>
                    <div style='float: left;' id='codigo'>
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
            <div class="col-md-2">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" checked>
                    <label class="form-check-label">Situación Actual</label>
                </div>
            </div>
            <div class="col-md-1">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio" value="2">
                    <label class="form-check-label">Historico</label>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-left  mt-4" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="buscar_lista_ot" style="margin-top:8px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-left  mt-4">
                    <button class="btn btn-block btn-success btn-sm"  id="excel_lista_ot" style="margin-top:8px;">
                        <i class="far fa-file-excel"></i> Exportar
                    </button>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-left mt-4">
                    <button class="btn btn-block btn-success btn-sm" style="margin-top:8px;" id="seriales_data">
                        <i class="far fa-file-excel "></i> Seriales
                    </button>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-left mt-4">
                    <button class="btn btn-block btn-primary btn-sm" id="limpiar" style="margin-top:8px;">
                        <i class="fas fa-broom"></i> Limpiar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body default cabecera_pantalla">
         <table>
        <tr>
            <td>
                <div id="divPivotGridDesigner" style="height: 400px; width: 250px;">
                </div>
            </td>
            <td>
                <div id="divPivotGrid" style="height: 400px; width: 550px;">
                </div>
            </td>
        </tr>
    </table>
    </div>
    
           
        
    </div>
</div>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/lista_ot_pivot.js"></script>
<script type="text/javascript">
    $(document).ready(function() {
        //listar_agrupacion();
        dropDownlist();
        listar_data_list_proyectos();
        combo_producto();
        lista_etapa();
    });
</script>
@endpush
@endsection