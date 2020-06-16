@push('javascripts')
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
<!--<script type="text/javascript" src="jqwidgets/scripts/jquery-1.11.1.min.js"></script>-->
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcore.js"></script>


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


<script type="text/javascript" src="jqwidgets/jqwidgets/jqxpanel.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcalendar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatetimeinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/globalization/globalize.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcombobox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdraw.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxchart.core.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.export.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.export.js"></script>
<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>

<script type="text/javascript" src="jqwidgets/jqwidgets/jqxchart.annotations.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxchart.api.js"></script>

<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.grouping.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.aggregates.js"></script> 
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.export.js"></script>

@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row ">
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">TURNO</label>
                    <div style="float:left;" id='idturno_insp_galv' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6 hidde_grid" id="mostrar_respon">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">RESPONSABLE</label>
                    <div style="float:left;" id='idresponsable_insp_galv' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">FECHA INICIO</label>
                    <input type="date" class="form-control" id="fech_inic_insp_galv" style="width: 100%;height: 30px;line-height: 1rem !important;">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">FECHA FIN</label>
                    <input type="date" class="form-control" id="fech_fin_insp_galv" style="width: 100%;height: 30px;line-height: 1rem !important;">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">ESTADO</label>
                    <div style="float:left;" id='idestado_insp_galv' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                <div class="float-left" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc_insp_galv" style="margin-top:30px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
              <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                <div class="float-left " >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="export_insp_galv" style="margin-top:30px;">
                        <i class="fas fa-file-csv"></i> Excel
                    </button>
                </div>
            </div>
            <div class="col-lg-8 col-md-2 col-md-4 col-sm-4"></div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6 hidde_grid" id="mostrar_radio1">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" checked>
                    <label class="form-check-label">Control de micraje</label>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-md-4 col-sm-4 col-6 hidde_grid" id="mostrar_radio2" >

                <div class="form-check" >
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" >
                    <label class="form-check-label" id="a">Observacion</label>
                </div>
            </div>

        </div>
        <div class="card-body default cabecera_pantalla">
            <div id='jqxWidget'>
                <div id="grid_insp_galv"></div>
                <div style="margin-top: 30px;">
                    <div id="cellbegineditevent"></div>
                    <div style="margin-top: 10px;" id="cellendeditevent"></div>
                </div>
            </div>
        </div>


    </div>  
</div>
@include('Inspeccion_Galvanizado.modal_cargar')
@include('Inspeccion_Galvanizado.modal_pregunta')
@include('Inspeccion_Galvanizado.modal_control_metraje')
@include('Inspeccion_Galvanizado.modal_observacion')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script type="text/javascript" src="Folder/inspeccion_galvanizado.js"></script>


<script type="text/javascript">
                        combo_turno();
                        combo_estado();
                    //    combo_responsable();
</script>

@endpush
@endsection