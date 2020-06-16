@push('javascripts')
<link rel="stylesheet" href="introjs.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="jqwidgets/styles/jqx.light.css" type="text/css" />
<!--<script type="text/javascript" src="jqwidgets/scripts/jquery-1.11.1.min.js"></script>-->
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
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.edit.js"></script> 
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.columnsresize.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.export.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.export.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxpanel.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcalendar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatetimeinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/globalization/globalize.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcombobox.js"></script>
<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.grouping.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.aggregates.js"></script> 
@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header p-2 card card-success card-outline">    
        <ul class="nav nav-pills">
            <li class="nav-item"><a class="nav-link active " href="#activity" data-toggle="tab">
                    <i class="far fa-money-bill-alt"></i> Etapa</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab">
                    <i class="far fa-money-bill-alt"></i> Elemento</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="#contratista" data-toggle="tab">
                    <i class="far fa-money-bill-alt"></i> Contratista</a>
            </li>
        </ul>

    </div><!-- /.card-header -->
    <div class="card-body">
        <div class="tab-content">
            <div class="tab-pane active" id="activity">
                <div class="card-header cabecera_pantalla">
                    <div class="float-right mt-4">
                        <button class="btn btn-block btn-primary"  onclick="introJs().start();"  type="button" id="obte_info">
                            <i class="fas fa-info-circle"></i> 
                        </button>
                    </div>
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-11">O.T</label>
                                <div style="float:left;" id='txt_ot' class="col-11">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">TIPO ELEMENTO</label>
                                <select name="" id="producto2" class="custom-select select2">
                                    <option value="" disabled="" selected="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                            <div class="float-left  mt-4" data-intro="Lista las etapas que corresponden a los filtros seleccionados.">
                                <button type="button" class="btn btn-block btn-primary btn-sm" id="buscar_precios" style="margin-top:8px;">
                                    <i class="fas fa-search"></i> Buscar
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                            <div class="float-left mt-4" data-intro="Exporta la tabla hacia la hoja de cálculo Excel.">
                                <button class="btn btn-block btn-primary btn-sm" type="button" id="excel" style="margin-top:8px;">
                                    <i class="far fa-file-excel"></i>Exportar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body default">
                    <div id="guardar_precio_costo_elemento" class="float-right mb-1" data-intro="Registra el precio asignado a la etapa." style="color:white;border-color:transparent !important;background:transparent !important">
                        <button class="btn btn-block btn-success btn-sm">
                            <i class="far fa-save"></i> Guardar
                        </button>
                    </div>
                    <div id='jqxWidget'>
                        <div id="grid"></div>
                        <div style="margin-top: 30px;">
                            <div id="cellbegineditevent"></div>
                            <div style="margin-top: 10px;" id="cellendeditevent"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.tab-pane -->
            <div class="tab-pane" id="timeline">
                <!-- The timeline -->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">CARGAR ARCHIVO</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">VALIDACIONES</a>
                    </li>
                </ul>
                <div class="card-body">
                    <div class="tab-content">
                        <div class="tab-pane active" id="home">
                            <form action="" id="form_register" enctype="multipart/form-data" method="POST">
                                <div class="row">
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                        <div class="form-group">
                                            <input type="text" id="ot" class="form-control" name="ot" style="display:none">
                                            <label for="admi_asig_perm_txt_codi_OT">OT</label>
                                            <div  id='txt_ot_2'class="col-11">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                        <div class="form-group ">
                                            <label for="inputPassword3">TIPO ELEMENTO</label>
                                            <select name="producto" id="producto" class="custom-select select2">
                                                <option disabled="" selected="" value="no">Seleccione</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                        <div class="form-group ">
                                            <input type="text" id="etapa_name" class="form-control" name="etapa" style="display:none">
                                            <label for="admi_asig_perm_txt_codi_OT">ETAPA</label>
                                            <div  id='etapa2' class="col-11">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1">Subir Archivo</label>
                                            <div class="row">
                                                <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                                                    <input type="text" id="nombre_archivo" class="form-control" placeholder="ARCHIVO .CSV" disabled="true">
                                                </div>
                                                <div class="col-lg-1 col-md-1 col-sm-1 col-2">
                                                    <img src="iconos-svg/outbox.svg" alt="" id="subir_archivo_icon" width="30" style="cursor:pointer">
                                                    <input type="file" id="subir_archivo" accept=".csv" name="subir_archivo" style="display:none">
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-2" style="float: start" data-toggle="tooltip" data-placement="right" title="Descargar Formato">
                                                    <a href="Formatos_excel/CostosElemento.csv" download="CostosElemento.csv">
                                                        <img src="iconos-svg/excel.svg" alt="" id="descargar_excel_costos" width="30" style="cursor:pointer" >
                                                    </a>
                                                </div>
                                                <!--
                                                <div class="col-md-4">
                                                    <div class=" float-left ">
                                                        <button type="submit" class="btn btn-info " id="cargar_data_excel"><i class="fas fa-upload"></i>
                                                            Cargar</button>
                                                    </div>
                                                    <div class=" float-left ml-2">
                                                        <button type="button" id="limpiar_campos" class="btn btn-warning  float-left"><i class="fas fa-broom"></i>
                                                            Limpiar</button>
                                                    </div>
                                                </div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <input type="text" id="nombre_user" style="display:none" name="nombre_user">
                                </div>
                                <div class="card-footer">
                                    <center>
                                        <button type="submit" class="btn btn-info float" id="cargar_data_excel"><i class="fas fa-upload"></i>
                                            Cargar</button>
                                        <button type="button" id="limpiar_campos" class="btn btn-warning float"><i class="fas fa-broom"></i>
                                            Limpiar</button>
                                    </center>
                                </div>
                                @include('Asignacion_Costos.modal_cargar')
                            </form>
                            <div id="visible">
                                <div class="row mb-2">
                                    <div class="col-md-4">
                                        <div class="float-left">
                                            <button type="button" id="modificar_precio" class="btn btn-warning "><i class="fas fa-pencil-alt"></i>
                                                MODIFICAR</button>
                                        </div>
                                        <div class="float-left ml-2">
                                            <button type="button" id="eliminar_precio" class="btn btn-warning "><i class="fas fa-minus-circle"></i>
                                                ELIMINAR</button>
                                        </div>
                                        <div class="float-left ml-2">
                                            <button type="button" id="guardar_precio" class="btn btn-warning "><i class="fas fa-save"></i>
                                                GUARDAR</button>
                                        </div>
                                    </div>
                                </div>
                                <div id='jqxWidget'>
                                    <div id="grid3"></div>
                                    <div style="margin-top: 30px;">
                                        <div id="cellbegineditevent"></div>
                                        <div style="margin-top: 10px;" id="cellendeditevent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane " id="profile">
                            <div class="card-header cabecera_pantalla" id="cabecera">
                                <div id="reload" class="float-right mr-3 ">
                                    <button class="btn btn-block btn-danger">
                                        <i class="fas fa-sync-alt"></i> Volver a Cargar
                                    </button>
                                </div>
                                <div id="excel2" class="float-right mr-3" style="color:white;border-color:transparent !important;background:transparent !important">
                                    <button class="btn btn-block btn-success">
                                        <i class="far fa-file-excel"></i> Exportar
                                    </button>
                                </div>
                            </div>
                            <div class="card-body default">
                                <div id='jqxWidget'>
                                    <div id="grid2"></div>
                                    <div style="margin-top: 30px;">
                                        <div id="cellbegineditevent"></div>
                                        <div style="margin-top: 10px;" id="cellendeditevent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="tab-pane" id="contratista">
                <div class="row">
                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                        <div class="form-group">
                            <label for="admi_asig_perm_txt_codi_OT">OT</label>
                            <div  id='txt_ot_3' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="ccol-lg-2 col-md-2 col-sm-4 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3">TIPO ELEMENTO</label>
                            <select name="producto" id="producto3" class="custom-select select2">
                                <option disabled="" selected="" value="no">Seleccione</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                        <div class="form-group ">
                            <label for="admi_asig_perm_txt_codi_OT">ETAPA</label>
                            <div  id='etapa' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                        <div class="form-group ">
                            <label for="admi_asig_perm_txt_codi_OT">CONTRATA</label>
                            <div  id='contrata' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                        <div class="form-group ">
                            <label for="admi_asig_perm_txt_codi_OT">Precio</label>
                            <input class="form-control" id="precio_contrata" type="number" >
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important;color: white">.</label>
                            <button class="btn btn-block btn-success   " id="agregar_precio_contrata">
                                <i class="far fa-file-excel"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid4"></div>
                    <div style="margin-top: 30px;">
                        <div id="cellbegineditevent"></div>
                        <div style="margin-top: 10px;" id="cellendeditevent"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('Asignacion_Costos.modal_modificar_costo')
@push('scripts')
<script src="intro.js"></script>
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script type="text/javascript" src="Folder/asignar_costos.js"></script>
<script type="text/javascript">
                            $(document).ready(function () {
                                combo_producto();
                                listar_data_list_proyectos();
                                listar_precio_costos();
                                combos_inicio();
                                $("#ot").val('');
                                $("#subir_archivo").val('');
                                $("#nombre_archivo").val('');
                                $("#subir_archivo_icon").val('');
                                $("#precio_contrata").val('');
                                cargardata_user();
                            });
</script>
@endpush
@endsection