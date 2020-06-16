@push('javascripts')
<link rel="stylesheet" href="introjs.css" type="text/css" />
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
        <div class="row">
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">UNIDAD NEGOCIO</label>
                    <div style="float:left;" id='unidad_negocio' class="col-md-11 col-11">
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
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">TIPO ELEMENTO</label>
                    <div style="float:left;" id='producto' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">SEMANA INICIO</label>
                    <div style='float: left;' id='semana_inicio' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">SEMANA FIN</label>
                    <div style='float: left;' id='semana_fin' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">PLANTA</label>
                    <div style='float: left;' id='planta' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">TIPO ETAPA</label>
                    <div style='float: left;' id='etapa' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">ETAPA ACTUAL</label>
                    <div style='float: left;' id='etapa_actual' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">CONTRATISTA</label>
                    <div style='float: left;' id='contratista' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">CODIGO</label>
                    <input type="text" class="col-md-11 col-11 form-control" id="codigo" placeholder="codigo" require  tabindex="-1" autocomplete="off" style="height: calc(2.25rem + -5.5px)!important">
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-3">
                <div class="float-right  mt-4" data-intro="Lista la tabla de información correspondiente a los filtros seleccionados.">
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc" style="margin-top:8px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-2 col-3">
                <div class="float-left  mt-4" data-intro="Exporta la tabla hacia la hoja de cálculo Excel.">
                    <button class="btn btn-block btn-success btn-sm"  id="excel_lista_valo" style="margin-top:8px;">
                        <i class="far fa-file-excel"></i> Exportar
                    </button>
                </div>
            </div>
            <div class="col-lg-1 col-md-3 col-2">
            <div class="float-right mt-4">
                <button class="btn btn-block btn-primary"  onclick="introJs().start();"  type="button" id="obte_info">
                    <i class="fas fa-info-circle"></i> 
                </button>
            </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3" data-intro="Descarga un documento pdf con información correspondiente al importe de la cantidad producida por el contratista.">
                <div class="">
                    <button class="btn btn-block btn-success btn-sm"  id="pdf_contratista" style="margin-top:8px;width:250px !important">
                        <i class="far fa-file-excel"></i> V.Contratista
                    </button>
                </div>
            </div>
            <div class="col-md-3 " data-intro="Descarga un documento pdf con información correspondiente al importe de la cantidad producida por el contratista de una etapa específica.">
                <div class="">
                    <button class="btn btn-block btn-success btn-sm"  id="pdf_contratista_etapa" style="margin-top:8px;width:250px !important">
                        <i class="far fa-file-excel"></i> V.CONTRATISTA Y ETAPA
                    </button>
                </div>
            </div>
            <div class="col-md-3" data-intro="Descarga un documento pdf con información específica del importe de cada elemento producido por contratista en una etapa.">
                <div class="">
                    <button class="btn btn-block btn-success btn-sm"  id="pdf_contratista_etapa_codigo" style="margin-top:8px;width:250px !important">
                        <i class="far fa-file-excel"></i> V.CONTRATISTA,ETAPA Y CODIGO
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="card-body default cabecera_pantalla">
    <div id='jqxWidget'>
        <div id="grid"></div>
    </div>
</div>
@push('scripts')
<script src="intro.js"></script>
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet"/>
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/valorizacion.js"></script>
<script type="text/javascript">
                $(document).ready(function () {
                    unidad_negocio();
                    ot_1();
                    combo_producto();
                    listar_planta();
                    lista_etapa();
                    combo_fin_valo();
                    combo_inicio_valo();
                });
</script>
@endpush
@endsection