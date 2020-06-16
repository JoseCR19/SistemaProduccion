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
            <button class="btn btn-block btn-primary btn-sm"  onclick="introJs().start();"  type="button" id="obte_info">
                <i class="fas fa-info-circle"></i> 
            </button>
        </div>
        <div class="float-right mr-3" data-intro="">
            <button class="btn btn-block btn-sm btn-primary" type="button" id="btnNuevoidtipoetapa">
                <i class="fas fa-plus"></i> Nuevo
            </button>
        </div>
        <div id="excel" class="float-right mr-3" data-intro="Exporta la tabla hacia la hoja de cálculo Excel." style="color:white;border-color:transparent !important;background:transparent !important">
            <button class="btn btn-block btn-sm btn-success">
                <i class="far fa-file-excel"></i> Exportar
            </button>
        </div>
        <div class="row">
            <div class="float-left" data-intro="Permite seleccionar tipo etapa">  
                <label for="inputPassword3" style="font-weight:600 !important" class="col-lg-12 col-md-12">TIPO ETAPA</label>
                <div id="tipoetapa_pintura"></div>            
            </div>           
            <div class="col-lg-2 col-md-2 col-sm-2 col-3">
                <div class="float-left" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_buscar" style="margin-top:30px;">
                        <i class="fas fa-search icon-buscar"></i> BUSCAR
                    </button>
                </div>
            </div> 
        </div>
    </div>
    <!--    <div class="card-body default">
            <div class="row">
                <div class="col-2"> 
                </div>
                <div class="col-8">
                    <div id='jqxWidget'>
                        <div id="grid_idtipoetapa"></div>
                        <div style="margin-top: 30px;">
                            <div id="cellbegineditevent"></div>
                            <div style="margin-top: 10px;" id="cellendeditevent"></div>
                        </div>
                    </div>
                </div>
    
                <div class="col-2"> 
                </div>
            </div>
    
        </div>-->
    <div class="card-body default">
        <div id='jqxWidget'>
            <div id="grid_idtipoetapa"></div>
            <div style="margin-top: 30px;">
                <div id="cellbegineditevent"></div>
                <div style="margin-top: 10px;" id="cellendeditevent"></div>
            </div>
        </div>
    </div>
</div> 
<!-- nombre de la carpeta resources/views/modal_tipoetapa_pintura mas nombre de la vista -->
@include('TipoEtapa_Pintura.modal_TipoEtapa_Pintura')
@push('scripts')
<script src="intro.js"></script>
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script src="Folder/TipoEtapa_Pintura.js"></script>
<script type="text/javascript">
                $(document).ready(function () {
                    cmb_tipoetapa();
                });
</script>
@endpush
@endsection