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

<style>
    .total{
        color: white;
        background-color: rgba(32, 50, 64,0.75);
    }
    .subtotal{
        color: black;
        background-color: #B4D6BF;
    }
    .resto{
        color: black;
        background-color: white;
        
    }
    .jqx-widget-metro .jqx-grid-cell-selected-metro, .jqx-grid-cell-selected-metro{ background-color:#DCEBFC; border-color: #DCEBFC; font-size: 12px;color: black; }
    .jqx-widget .jqx-grid-cell, .jqx-widget .jqx-grid-column-header, .jqx-widget .jqx-grid-group-cell {
        border-color: white;
        
    }

</style>

@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row ">



            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">FECHA INICIO</label>
                    <input type="date" class="form-control" id="fech_inic_repo_insp_galv" style="width: 100%;height: 30px;line-height: 1rem !important;">
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">FECHA FIN</label>
                    <input type="date" class="form-control" id="fech_fin_repo_insp_galv" style="width: 100%;height: 30px;line-height: 1rem !important;">
                </div>
            </div>
             <div class="col-lg-3 col-md-2 col-md-4 col-sm-4 col-6 mt-4">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" checked>
                    <label class="form-check-label">Inspeccion por especificacion</label>
                </div>
            </div>
            <div class="col-lg-3 col-md-2 col-md-4 col-sm-4 col-6 mt-4">

                <div class="form-check" >
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" >
                    <label class="form-check-label" id="a">Inspeccion en exceso,consumo y turno</label>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-3">
                <div class="float-left" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc_repo_insp_galv" style="margin-top:30px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-2">
                <div class="float-left" id="mostrar_excel_galv">
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="export_repo_insp_galv" style="margin-top:30px;">
                        <i class="fas fa-file-csv"></i> Excel
                    </button>
                </div>
            </div>

        </div>

        <div class="card-body default cabecera_pantalla ">
            <div id='jqxWidget'>
                <div id="grid_repo_insp_galv"></div>
                <div style="margin-top: 30px;">
                    <div id="cellbegineditevent"></div>
                    <div style="margin-top: 10px;" id="cellendeditevent"></div>
                </div>
            </div>
        </div>
    </div>  
</div>
@include('Reporte_Inspeccion_Galv.modal_cargar')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script type="text/javascript" src="Folder/reporte_inspeccion_galv.js"></script>

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