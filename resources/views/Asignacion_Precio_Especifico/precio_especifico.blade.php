@push('javascripts')
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
            <li class="nav-item"><a class="nav-link active " href="#activity" data-toggle="tab"><i class="fas fa-file-csv"></i> Lista</a></li>
            <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab"><i class="fas fa-upload"></i>
                    Cargar Archivo</a></li>
        </ul>
    </div><!-- /.card-header -->
    <div class="card-body">
        <div class="tab-content">
            <div class="tab-pane active" id="activity">
                <div class="card-header cabecera_pantalla">
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-4 col-12">
                            <div class="form-group">
                                <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">O.T</label>
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
                            <div class="float-left mt-4">
                                <button type="button" class="btn btn-block btn-primary btn-sm" id="buscar_precios" style="margin-top:8px;">
                                    <i class="fas fa-search"></i>Buscar
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                            <div class="float-left mt-4">
                                <button class="btn btn-block btn-primary btn-sm" type="button" id="excel" style="margin-top:8px;">
                                    <i class="far fa-file-excel"></i>Exportar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body default">
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
                                            <div  id='txt_ot_2' class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                        <div class="form-group ">
                                            <label for="inputPassword3">TIPO ELEMENTO</label>
                                            <div class="col-sm-12">
                                                <select name="producto" id="producto" class="custom-select select2">
                                                    <option disabled="" selected="" value="no">Seleccione</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8 col-md-12 col-sm-12 col-12">
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1">Subir Archivo</label>
                                            <div class="row">
                                                <div class="col-lg-8 col-md-8 col-sm-8 col-7">
                                                    <input type="text" id="nombre_archivo" class="form-control" placeholder="ARCHIVO .CSV" disabled="true">
                                                </div>
                                                <div class="col-lg-1 col-md-1 col-sm-1 col-2">
                                                    <img src="iconos-svg/outbox.svg" alt="" id="subir_archivo_icon" width="30" style="cursor:pointer">
                                                    <input type="file" id="subir_archivo" accept=".csv" name="subir_archivo" style="display:none">
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-2" style="float: start" data-toggle="tooltip" data-placement="right" title="Descargar Formato">
                                                   <a href="Formatos_excel/PrecioEspecífico.csv" download="PrecioEspecífico.csv">
                                                       <img src="iconos-svg/excel.svg" alt="" id="descargar_excel_costos" width="30" style="cursor:pointer" >
                                                   </a>
                                                </div>
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
                                @include('Asignacion_Precio_Especifico.modal_cargar')
                            </form>
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
        </div>
        <!-- /.tab-content -->
    </div><!-- /.card-body -->
</div>

@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script type="text/javascript" src="Folder/asignar_precio_especifico.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        combo_producto();
        listar_data_list_proyectos();
        listar_precio_especifico();
        $("#ot").val('');
        $("#subir_archivo").val('');
        $("#nombre_archivo").val('');
        $("#subir_archivo_icon").val('');
        cargardata_user();
    });
</script>
@endpush
@endsection