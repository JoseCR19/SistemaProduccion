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
        <div class="row ">
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
                    <div style="float:left;" id='txt_ot_repo_libe' class="col-11">   
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO ELEMENTO</label>
                    <div style="float:left;" id='producto_repo_libe' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ZONA</label>
                    <div style='float: left;' id='zona_repo_libe' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">PROGRAMA</label>
                    <div style='float: left;' id='tarea_repo_libe' class="col-11">
                    </div>
                </div>
            </div>
            <div  class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ETAPA INSPECCIÓN</label>
                    <div style='float: left;' id='etapa_repo_libe' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">CONTRATISTA</label>
                    <div style='float: left;' id='contra_repo_libe' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">INSPECTOR</label>
                    <div style='float: left;' id='inspe_repo_libe' class="col-11">
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-3 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">CODIGO</label>
                    <div style='float: left;' id='codi_elem_repo_libe' class="col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">FECHA INICIO</label>
                    <input type="date" class="form-control" id="fech_inic_repo_libe" style="width: 100%;height: 30px;">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">FECHA FINAL</label>
                    <input type="date" class="form-control" id="fech_fin_repo_libe" style="width: 100%;height: 30px;">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12" >TIPO REPORTE</label>
                    <div style="float: left;" id='combo_tipo_repo' class="col-11">
                    </div>
                </div>
            </div>            
            <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12" >TIPO INSPECCION</label>
                    <div style="float: left;" id='combo_tipo_inspe'  class="col-11">
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-6 col-6" style="margin-top: -34px !important;">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" checked onclick="handleClick(this);">
                    <label class="form-check-label">CANTIDAD</label>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-6 col-6" style="margin-top: -34px !important;">
                <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                <div class="form-check" >
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio" value="2" onclick="handleClick(this);">
                    <label class="form-check-label" >SERIE</label>
                </div>
            </div>
        </div>

        <div class="row">

            <div class="col-md-9">

            </div>

            <div class="col-md-1">
                <button class="btn btn-block btn-primary btn-sm" type="button" id="buscar_repor_libe" style="margin-top:8px;">
                    <i class="fas fa-search icon-buscar"></i> Buscar
                </button>
            </div>
            <div class="col-md-1">
                <button class="btn btn-block btn-primary btn-sm" id="exportar_repor_libe" style="margin-top:8px;">
                    <i class="fas fa-file-excel"></i>Exportar
                </button>
            </div>
            <div class="col-md-1">
                <button class="btn btn-block btn-primary btn-sm" id="limpiar_repor_libe" style="margin-top:8px;">
                    <i class="fas fa-broom"></i> Limpiar
                </button>
            </div>
        </div>
    </div>
</div>
<div class="card-body default cabecera_pantalla">
    <div id='jqxWidget'>
        <div id="grid_repo_libe"></div>
        <div style="margin-top: 30px;">
            <div id="cellbegineditevent"></div>
            <div style="margin-top: 10px;" class="row hidde_grid" id="datos_reporte">
                <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                    <div class="form-group">
                        <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Valor Inspección</label>
                        <input type="text" class="form-control" id="valor_inspeccion" style="width: 100%;height: 30px;" disabled="false">
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                    <div class="form-group">
                        <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Valor Producido</label>
                        <input type="text" class="form-control" id="valor_produccion" style="width: 100%;height: 30px;" disabled="false">
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-6 col-6">
                    <div class="form-group">
                        <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Indicador</label>
                        <input type="text" class="form-control" id="indicador" style="width: 100%;height: 30px;" disabled="false">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
@include('Reporte_Liberacion.modal_cargar')
@include('Reporte_Liberacion.modal_defectos')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script type="text/javascript" src="Folder/reporte_liberacion.js"></script>

<script type="text/javascript">
                        $(document).ready(function () {
                            tipo_ot();
                            listar_data_list_proyectos();
                            combo_producto();
                            combo_tipo_reporte();
                            combo_tipo_inspe();


                        });
</script>
@endpush
@endsection