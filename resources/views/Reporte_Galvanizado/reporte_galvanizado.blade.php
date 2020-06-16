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
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">FECHA INICIO</label>
                    <input type="date" class="form-control" id="fech_inic_report_galv" style="width: 100%;height: 30px;line-height: 1rem !important;">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">FECHA FIN</label>
                    <input type="date" class="form-control" id="fech_fin_report_galv" style="width: 100%;height: 30px;line-height: 1rem !important;">
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-3">
                <div class="float-left" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc_report_galv" style="margin-top:30px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-2">
                <div class="float-left hidde_grid" id="mostrar_excel_galv">
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="export_galv" style="margin-top:30px;">
                        <i class="fas fa-file-csv"></i> Excel
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-2">
                <div class="float-left hidde_grid" id="mostrar_pdf_galv">
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="export_galv_pdf" style="margin-top:30px;">
                        <i class="fas fa-file-csv"></i> Pdf
                    </button>
                </div>
            </div>

        </div>
        <div class="row col-xs-10 hidde_grid" id="mostrar_diagrama">
            <div class="col-xs-3 col-md-6" id="mostrar_grafico1">
                <div id="chartContainer" style="width:500px; height:350px;"></div>
            </div>
            <div class="col-xs-3 col-md-6" id="mostrar_grafico2">
                <div id="chartContainer2" style="width:500px; height:350px;"></div>  
            </div>
            <div class="col-xs-3 col-md-3">
            </div>
            <div class="col-xs-3 col-md-6 mt-2" id="mostrar_grafico3">
                <div id="chartContainer3" style="width:500px; height:350px;"></div>
            </div>
            <div class="col-xs-3 col-md-3">
            </div>
        </div>
        <div class="card-body default cabecera_pantalla ">
            
        </div>
    </div>  
</div>
@include('Reporte_Galvanizado.modal_galv_pregunta')
@include('Reporte_Galvanizado.modal_galv_pregunta_pdf')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script type="text/javascript" src="Folder/grafico_galvanizado.js"></script>

<script type="text/javascript">



</script>
<style type="text/css">
    .redLabel {
        fill: #FF0000;
        color: #FF0000;
        font-size: 11px;
        font-family: Verdana;
    }

    .greenLabel {
        fill: #89A54E;
        color: #89A54E;
        font-size: 11px;
        font-family: Verdana;
    }

</style>
@endpush
@endsection