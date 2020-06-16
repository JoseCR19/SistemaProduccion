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
<link rel="stylesheet" href="gant/codebase/skins/dhtmlxgantt_broadway.css" type="text/css">
<script type="text/javascript" src="gant/api.js"></script>
<script src="gant/codebase/locale/locale_es.js" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css?v=5.2.0">
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
                    <label for="inputPassword3" style="font-weight:500 !important">PROGRAMA</label>
                    <div style='float: left;' id='tarea'>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">GRUPO</label>
                    <div style='float: left;' id='paquete'>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group ">
                    <label for="inputPassword3" style="font-weight:500 !important">ARMADOR</label>
                    <div style='float: left;' id='armador'>
                    </div>
                </div>
            </div>
            <div class="col-md-1">
                <div class="float-right  mt-4" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc" style="margin-top:8px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
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
        <div class="row">
            <div class="col-md-10">
                <fieldset style="border: 1px solid #B2B2B2; padding: 6px;border-radius: 3px">
                    <legend style="background-color: #fff;border: 1px solid #B2B2B2;border-radius: 4px;font-size: 17px;font-weight: 100;padding: 3px 5px 3px 7px;width: auto;">Estados</legend>
                    <div class="float-left ">
                        <div class="float-left ml-2">
                            <div style="width: 30px; height: 30px;background-color: #60ad5e;border-radius: 5px;float: left" onclick="color('#60ad5e')"></div>
                            <span style="margin-left: 4px">
                                Terminado
                            </span>
                        </div>
                        <div class="float-left ml-2">
                            <div style="width: 30px; height: 30px;background-color: #326E37;border-radius: 5px;float: left" onclick="color('#326E37')"></div>
                            <span style="margin-left: 4px">
                                Terminado con Demora
                            </span>
                        </div>
                        <div class="float-left ml-2">
                            <div style="width: 30px; height: 30px;background-color: #8BC34A;border-radius: 5px;float: left" onclick="color('#8bc34a')"></div>
                            <span style="margin-left: 4px">
                                Termino Anticipado
                            </span>
                        </div>
                        <div class="float-left ml-2">
                            <div style="width: 30px; height: 30px;background-color: #FF5252;border-radius: 5px;float: left" onclick="color('#c50e29')"></div>
                            <span style="margin-left: 4px">
                                Con Demora
                            </span>
                        </div>
                        <div class="float-left ml-2">
                            <div style="width: 30px; height: 30px;background-color: #c50e29;border-radius: 5px;float: left" onclick="color('#c50e29')"></div>
                            <span style="margin-left: 4px">
                                con Atraso
                            </span>
                        </div>
                        <div class="float-left ml-2">
                            <div style="width: 30px; height: 30px;background-color: #fbc02d;border-radius: 5px;float: left" onclick="color('#fbc02d')"></div>
                            <span style="margin-left: 4px">
                                En Proceso
                            </span>
                        </div>
                        <div class="float-left ml-2">
                            
                                <div style="width: 30px; height: 30px;background-color: #1E90FF;border-radius: 5px;float: left" onclick="color('#1E90FF')" ></div>
                                <span style="margin-left: 4px">
                                    En Espera
                                </span>
                        </div>
                    </div>
                </fieldset>


            </div>
            <div class="col-md-1">
                <div class="float-right mt-4">
                    <button class="btn btn-block btn-primary btn-sm" id="exportar_execel_grupos" style="margin-top:8px;">
                        <i class="far fa-file-excel"></i> Exportar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body default cabecera_pantalla">

        <div id="gantt_here" style='width:100%; height:450px;'></div>
    </div>
</div>
@include('Grupo.modal_ver_grupos')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<link href="jQuery-MultiSelect-master/jquery.multiselect.css" rel="stylesheet" />
<script type="text/javascript" src="jQuery-MultiSelect-master/jquery.multiselect.js"></script>
<script type="text/javascript" src="Folder/grupo.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        //listar_agrupacion();
        dropDownlist();
        listar_data_list_proyectos();
        combo_producto();

    });
</script>
@endpush
@endsection