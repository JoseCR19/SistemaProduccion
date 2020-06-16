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
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdraw.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxchart.core.js"></script>
<script type="text/javascript" src="gant/codebase/dhtmlxgantt.js" ></script>
<link rel="stylesheet" href="gant/codebase/dhtmlxgantt.css" type="text/css">
@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row ">
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">O.T</label>
                    <div style="float:left;" id='txt_ot' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">TIPO ELEMENTO</label>
                    <div style="float:left;" id='producto' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">ZONA</label>
                    <div style='float: left;' id='zona' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">PROGRAMA</label>
                    <div style='float: left;' id='tarea' class="col-md-11 col-11">
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">ETAPA INSPECCIÓN</label>
                    <div style='float: left;' id='etapa' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
             <div class="col-lg-1 col-md-3 col-2" style="margin-top: 23px;">
                <div class="float-right  " >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc" style="margin-top:8px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>

            <div class="col-lg-1 col-md-3 col-2" style="margin-top: 23px;">
                <div class="float-right ">
                    <button class="btn btn-block btn-primary btn-sm" id="limpiar" style="margin-top:8px;">
                        <i class="fas fa-broom"></i> Limpiar
                    </button>
                </div>
            </div>
        </div>
        <div class="row">

            <!--<div class="col-md-10"></div>-->
          <!--  <div class="col-lg-8 col-md-5 col-8"></div>-->
            
           
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
        <div class="row hidde_grid" style="margin-top: -20px !important" id="pesos">
            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                <div class="form-group row" style="margin-bottom: 0px !important;margin-top: 0px !important">
                    <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-7 col-md-7 col-sm-7 col-7">Seleccionados:</label>
                    <div class="col-lg-5 col-md-5 col-sm-5 col-5">
                        <input type="text" class="form-control " id="select" placeholder="" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                <div class="form-group row" style="margin-bottom: 0px !important;margin-top: 0px !important">
                    <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-5 col-md-5 col-sm-5 col-5">Cantidad:</label>
                    <div class="col-lg-7 col-md-7 col-sm-7 col-7">
                        <input type="text" class="form-control " id="cant_su" placeholder="" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                <div class="form-group row" style="margin-bottom: 0px !important;margin-top: 0px !important">
                    <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-5 col-md-5 col-sm-5 col-5">Peso Neto</label>
                    <div class="col-lg-7 col-md-7 col-sm-7 col-7">
                        <input type="text" class="form-control " id="peso_neto" placeholder="" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                <div class="form-group row" style="margin-bottom: 0px !important;margin-top: 0px !important">
                    <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-5 col-md-5 col-sm-5 col-5">Peso Bruto</label>
                    <div class="col-lg-7 col-md-7 col-sm-7 col-7">
                        <input type="text" class="form-control " id="peso_bruto" placeholder="" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                <div class="form-group row" style="margin-bottom: 0px !important;margin-top: 0px !important">
                    <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-5 col-md-5 col-sm-5 col-5">Area</label>
                    <div class="col-lg-7 col-md-7 col-sm-7 col-7">
                        <input type="text" class="form-control " id="area" placeholder="" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                    </div>
                </div>
            </div>
        </div>
        <div class="row " style="margin-top: -20px">
            <div class="col-md-10" >
            </div>
            <div class="col-md-2" >
                <div class="float-right mt-4">
                    <button class="btn btn-block btn-primary btn-md" id="asignar_conforme" style="margin-top:8px;">
                        <i class="fas fa-plus"></i> CONFORME
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@include('Liiberacion.modal_elementos')
@include('Liiberacion.modal_conforme')
@include('Liiberacion.modal_no_conforme')
@include('Liiberacion.modal_cargar')
@include('Liiberacion.modal_errores')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/liberacion.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //listar_agrupacion();
        dropDownlist();
        listar_data_list_proyectos();
        combo_producto();
        //listar_etap_usua();
    });
</script>
@endpush
@endsection