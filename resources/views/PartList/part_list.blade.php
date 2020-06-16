@push('javascripts')
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
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
<script type="text/javascript" src="jqwidgets/jqwidgets/globalization/globalize.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcombobox.js"></script>
<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>
@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header p-2 card card-success card-outline">
        <ul class="nav nav-pills">
            <li class="nav-item"><a class="nav-link active " href="#activity" data-toggle="tab"><i class="fas fa-file-csv"></i> Part List</a></li>
            <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab"><i class="fas fa-upload"></i>
                    Cargar Part List</a></li>
        </ul>
    </div><!-- /.card-header -->
    <div class="card-body">
        <div class="tab-content">
            <div class="tab-pane active" id="activity">
                <div class="card-header cabecera_pantalla">
                    <div class="row">
                        <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                            <div class="form-group">
                                <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">O.T</label>
                                <div style="float:left;" id='txt_ot' class="col-11">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                            <div class="form-group">
                                <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-12 col-12">TIPO ELEMENTO</label>
                                <select name="" id="producto2" class="custom-select select2">
                                    <option value="" disabled="" selected="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                            <div class="float-left  mt-4" >
                                <button type="button" class="btn btn-block btn-primary btn-sm" id="buscar_entidades" style="margin-top:8px;">
                                    <i class="fas fa-search"></i> Buscar
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-1 col-md-1 col-sm-2 col-6">
                            <div class="float-left mt-4" >
                                <button class="btn btn-block btn-primary btn-sm" type="button" id="excel" style="margin-top:8px;">
                                    <i class="far fa-file-excel"></i> Exportar
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
                                            <div  id='txt_ot_2' class="col-11">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                        <div class="form-group ">
                                            <label for="inputPassword3">TIPO ELEMENTO</label>                                           
                                            <select name="producto" id="producto" class="custom-select select2">
                                                <option disabled="" selected="" value="">Seleccione</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-md-2 col-sm-4 col-6">
                                        <label for="inputPassword3">TIPO CARGA</label>
                                        <select class="form-control" id="carga" name="carga">
                                            <option value="">SELECCIONE</option>
                                            <option value="PARTLIST">CARGA PART LIST</option>
                                            <option value="COMPONENTES">CARGA COMPONENTES</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-4 col-md-2 col-sm-4 col-6">
                                        <label for="inputPassword3">DESCRIPCION</label>
                                        <input type="text" id="descripcion_1" class="form-control" name="descripcion">
                                        <div id="error"></div>
                                    </div>

                                    <div class="col-lg-2 col-md-2 col-sm-4 col-6" id="zona_mostrar" style="display:none" >
                                        <div class="form-group">
                                              <input type="text" id="zona_part_php" class="form-control" name="zona_part_php" style="display:none">
                                            <label for="inputPassword3" style="font-weight:500 !important">ZONA</label>
                                            <div style='float: left;' id='zona_part' class="col-11" name="zona_part">
                                            </div>
                                        </div>
                                    </div>                                    
                                    <div class="col-lg-2 col-md-2 col-sm-4 col-6" id="tarea_mostrar" style="display:none" >
                                        <div class="form-group">
                                             <input type="text" id="programa_part_php" class="form-control" name="programa_part_php" style="display:none">
                                            <label for="inputPassword3" style="font-weight:500 !important">PROGRAMA</label>
                                            <div style='float: left;' id='programa_part' class="col-11" name="programa_part">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-lg-4 col-md-2 col-sm-2 col-8">
                                        <div class="form-group">
                                            <label for="exampleFormControlFile1">Subir Archivo</label>
                                            <div class="row">
                                                <div class="col-lg-9 col-md-8 col-sm-6 col-8">
                                                    <input type="text" id="nombre_archivo" class="form-control" placeholder="ARCHIVO .CSV">
                                                </div>
                                                <div class="col-lg-1 col-md-1 col-sm-1 col-1">
                                                    <img src="iconos-svg/outbox.svg" alt="" id="subir_archivo_icon" width="30" style="cursor:pointer">
                                                    <input type="file" id="subir_archivo" accept=".csv" name="subir_archivo" style="display:none">
                                                </div>
                                                <div class="col-lg-2 col-md-2 col-sm-2 col-2" style="float: start" data-toggle="tooltip" data-placement="right" title="Descargar Formato">
                                                    <a  download="CostosElemento.csv" id='colocar_ruta' >
                                                        <img src="iconos-svg/excel.svg" alt="" id="descargar_excel_costos" width="30" style="cursor:pointer" >
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio" value="option1" checked>
                                            <label class="form-check-label" for="inlineRadio1">NUEVO</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                            <label class="form-check-label" for="inlineRadio2">ACTUALIZACIÓN DE
                                                DATOS</label>
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
                                        <button type="button" class="btn btn-warning float" id="limpiar_part_list"><i class="fas fa-broom"></i>
                                            Limpiar</button>
                                    </center>
                                </div>
                                @include('PartList.modal_cargar')
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
<script type="text/javascript" src="Folder/part_list.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        combo_producto();
        listar_data_list_proyectos();
        listar_part_list();
        cargardata_user();
    });
</script>
@endpush
@endsection
