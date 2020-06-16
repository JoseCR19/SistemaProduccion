@push('javascripts')
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
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
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxpanel.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcalendar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatetimeinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/globalization/globalize.js"></script>
<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.grouping.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.aggregates.js"></script> 
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.export.js"></script>
@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header cabecera_pantalla">
    </div>
    <div class="card-body default">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <!--<a href="mailbox.html" class="btn btn-primary btn-block mb-3">Back to Inbox</a>-->
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Notificaciones</h3>
                        </div>
                        <div class="card-body p-0" style="height: 300px;overflow: scroll;">
                            <div class="nav flex-column nav-pills"  id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                </div>
                <div class="col-9" >
                    <div id="descripcion_noti" class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="text-center" id="img_profile">

                                    </div>
                                </div>
                                <div class="col-md-10">
                                    <div class="post">
                                        <div class="user-block">
                                            <span class="username">
                                                <a href="#"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" id="usuario_noti_prin"></font></font></a>
                                            </span>
                                            <span class="description">
                                                <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;" id="nom_fecha_prin"></font>

                                                </font>
                                            </span>
                                            <span class="description">
                                                <font style="vertical-align: inherit;">MODULO:
                                                <font style="vertical-align: inherit;font-weight: bold" id="modulo_prin"></font>
                                                </font>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="text-center">
                                        <font style="vertical-align: inherit;font-weight: bold" id="titulo_prin">
                                        </font>
                                    </div>
                                    <p><font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;" id="descripcion_prin">
                                        </font>
                                        </font>
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3" id="descarga_noti">
                                    <a class="link-black text-sm" id="url_descarga">
                                        <i class="fas fa-download"></i>
                                        <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;"> Descargar</font>
                                        </font>
                                    </a>
                                </div>
                                <div class="col-md-3" id="redireccionar_noti">
                                    <a href="#" class="link-black text-sm">
                                        <i class="fas fa-share mr-1"></i>
                                        <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;"> Redireccionar</font>
                                        </font>
                                    </a>
                                </div>
                                <div class="col-md-3" id="compartir_noti">
                                    <a href="#" class="link-black text-sm">
                                        <i class="fas fa-share-alt-square"></i>
                                        <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;"> Compartir</font>
                                        </font>
                                    </a>
                                </div>
                                <div class="col-md-3" id="comentarios_noti">
                                    <span class="float-right">
                                        <a href="#" class="link-black text-sm">
                                            <i class="far fa-comments mr-1">
                                            </i>
                                            <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;"> Comentarios
                                            </font>
                                            </font>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script type="text/javascript" src="Folder/notificacion.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        lista_notificaciones();

    });
</script>
@endpush
@endsection