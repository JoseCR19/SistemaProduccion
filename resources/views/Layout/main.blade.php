<?php
# Iniciando la variable de control que permitirá mostrar o no el modal
$exibirModal = false;
# Verificando si existe o no la cookie
if (!isset($_COOKIE["mostrarModal"])) {
    # Caso no exista la cookie entra aquí
    # Creamos la cookie con la duración que queramos
    //$expirar = 3600; // muestra cada 1 hora
    //$expirar = 10800; // muestra cada 3 horas
    //$expirar = 21600; //muestra cada 6 horas
    $expirar = 43200; //muestra cada 12 horas
    //$expirar = 86400;  // muestra cada 24 horas
    setcookie('mostrarModal', 'SI', (time() + $expirar)); // mostrará cada 12 horas.
    # Ahora nuestra variable de control pasará a tener el valor TRUE (Verdadero)
    $exibirModal = true;
}
?>
<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Sistema Producción | MIMCO</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
        
        <!-- Ionicons -->
        <link rel="stylesheet" href="css/ionicons.min.css">
        <!-- Tempusdominus Bbootstrap 4 -->
        <link rel="stylesheet" href="plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
        <!-- iCheck -->
        <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css">
        <!-- JQVMap -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
        <!-- Theme style -->

        <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
        <!-- overlayScrollbars -->
        <link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
        <!-- Daterange picker -->
        <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css">
        <!-- summernote -->
        <link rel="stylesheet" href="plugins/summernote/summernote-bs4.css">
        <!-- Google Font: Source Sans Pro -->
        <link href="css/fuentes_mimco.css" rel="stylesheet">
        <link rel="stylesheet" href="plugins/datatables-bs4/css/dataTables.bootstrap4.css">
        <link rel="stylesheet" href="css/estilos_propios/style.css">

        <!-- jQuery UI 1.11.4 -->
        <script type="text/javascript" src="js/js_jose.js" ></script>
        <link rel="stylesheet" href="estilos_mimco.css">
        <link href="css/estilos_fuentes.css" rel="stylesheet">
        <link rel="stylesheet" href="lib-icon/css/emoji.css" type="text/css" />

        @stack('javascripts')
    </head>

    <body class="hold-transition sidebar-mini layout-fixed sidebar-collapse">
        <div id="messageNotification">
            <div id="notificationContent">
            </div>
        </div>

        <div class="wrapper">
            <!-- Navbar -->
            <nav id='menu_superior' class="main-header navbar navbar-expand navbar-white navbar-light ">
                <!-- Left navbar links -->
                <ul class="navbar-nav" id="ocultar">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu"  id="blanco"><i class="fas fa-bars"></i></a>
                    </li>
                </ul>
                <!-- Right navbar links -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown" id="notificaciones">
                        <div style="margin-right: 5px;">
                            <img src="iconos-svg/blog.svg" alt="" width="20px" style="cursor: pointer"> 
                        </div>
                    </li>
                    <li class="nav-item dropdown" id="noti_clik">
                        <a class="nav-link" data-toggle="dropdown"  aria-expanded="false" style="cursor: pointer">
                            <i class="far fa-bell"></i>
                            <span class="badge badge-warning navbar-badge"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" id="number_noti"></font></font></span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" >
                            <span class="dropdown-item dropdown-header"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" id="number_noti_large"></font></font></span>
                            <div class="dropdown-divider"></div>
                            <div id="list_noti">
                            </div>
                            <a href="{{route('VER_NOTI')}}" class="dropdown-item dropdown-footer"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Ver todas las notificaciones</font></font></a>
                        </div>
                    </li>
                    <li class="nav-item dropdown" id="libro">
                        <a class="nav-link"  style="cursor:pointer;">
                            <i class="fas fa-book"></i>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" data-toggle="dropdown" href="" style="cursor: pointer">
                            <i class="fas fa-users-cog"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span class="dropdown-item dropdown-header" id="nombre"> </span>
                            <div class="dropdown-divider"></div>
                            <a data-target="#modal_modificar_pwd" data-toggle="modal" href="#myModal" style=" text-decoration: none !important" class="dropdown-item" >
                                <i class="fas fa-user-lock"></i> Restablecer Contraseña
                            </a>
                            <div class="dropdown-divider"></div>

                            <a  class="dropdown-item" id='edit_perfil' style="cursor: pointer">
                                <i class="fas fa-user-edit"></i> Editar Perfil
                            </a>
                            <div class="dropdown-divider"></div>
                            <a  class="dropdown-item" id="sincronizar" style="cursor: pointer">
                                <i class="fas fa-users-cog"></i> Sincronizar
                            </a>
                            <div class="dropdown-divider"></div>
                            <a  class="dropdown-item" id="cerrar_sesion" style="cursor: pointer">
                                <img src="iconos-svg/logout_r.svg" alt="" width="20px"> Cerrar Sesión
                            </a>
                        </div>
                    </li>

                </ul>
            </nav>
            @include('Layout.modal_sincronizar')
            @include('Layout.modal_bienvenido')
            @include('Login.Modal_Modificar_Contrasena')
            @include('Layout.moda_editar_perfil')
            @include('Layout.modal_visualizar_notificacion')
            @include('Layout.modal_notificaciones')
            @include('Layout.modal_crear_grupos')
            @include('Layout.modal_modulos')
            <!-- /.navbar -->
            <!-- Main Sidebar Container -->

            <aside class="main-sidebar sidebar-dark-primary elevation-4 dashboard_latera" style="z-index: 144444 !important">
                <!-- Brand Logo -->
                <a href="{{route('principal_dashboard')}}" class="brand-link dashboard_logo" style="font-size: 1.45rem !important;">
                    <img src="imagenes-mimco/mimco.png"  class="brand-image img-circle elevation-3" style="opacity: .8;background:white;margin-top:0px !important">
                    <span class="brand-text font-weight-light font">MIMCO</span>
                </a>
                <!-- Sidebar -->
                <div class="sidebar">
                    <!-- Sidebar user panel (optional) -->
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="">
                            <img  id="img_principal" class="brand-image img-circle elevation-3" style="background:white;margin-top:0px !important;margin-left: -2px !important"  >
                        </div>
                        <div class="info">
                            <a href="" class="d-block" id="nombre_2" style="margin-left:-10px !important;color:white;cursor: pointer"></a>
                        </div>
                    </div>
                    <!-- Sidebar Menu -->
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false" id="menu_principal">

                        </ul>
                    </nav>
                    <!-- /.sidebar-menu -->
                </div>
                <!-- /.sidebar -->
            </aside>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark font" id="name"></h1>
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right font">
                                    <li class="breadcrumb-item font"><a href="" id="a" class="link-a" style="cursor: pointer"></a></li>
                                    <li class="breadcrumb-item active font" id="li"></li>
                                </ol>
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Main content -->
                <section class="content">
                    @yield('contenido')
                </section>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->
            <footer class="main-footer font">
                <strong>Copyright &copy; 2019-<?php echo date("Y"); ?> Sistema Mimco</a>.</strong>
                All rights reserved.
                <div class="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.1.0
                </div>
            </footer>

            <!-- Control Sidebar -->
            <aside class="control-sidebar control-sidebar-dark">
                <!-- Control sidebar content goes here -->
            </aside>
            <!-- /.control-sidebar -->
        </div>
        <!-- ./wrapper -->
        <!-- jQuery -->

        <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip 
        <script>
            $.widget.bridge('uibutton', $.ui.button)
        </script>-->
        <!-- Bootstrap 4 -->

        <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="plugins/moment/moment.min.js"></script>
        <!-- ChartJS 
        <script src="plugins/chart.js/Chart.min.js"></script>
        <!-- Sparkline
        <script src="plugins/sparklines/sparkline.js"></script> 
        <!-- JQVMap -->

        <!-- jQuery Knob Chart 
        <script src="plugins/jquery-knob/jquery.knob.min.js"></script>-->
        <!-- daterangepicker 
        
        <script src="plugins/daterangepicker/daterangepicker.js"></script>-->
        <!-- Tempusdominus Bootstrap 4 
        <script src="plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
        <!-- Summernote -->
        <script src="plugins/summernote/summernote-bs4.min.js"></script>
        <!-- overlayScrollbars -->
        <script src="plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
        <!-- AdminLTE App -->
        <script src="dist/js/adminlte.js"></script>

        <!-- AdminLTE for demo purposes -->
        <script src="dist/js/demo.js"></script>

        <script src="Folder/funciones.js"></script>
        <script type="text/javascript" src="js/sweetalert2@8.js" ></script>
        <script type="text/javascript" src="jqwidgets/jqwidgets/jqxcore.js"></script>
        <script type="text/javascript" src="jqwidgets/jqwidgets/jqxnotification.js"></script>
        <script type="text/javascript" src="jqwidgets/jqwidgets/jqxbuttons.js"></script>
        <script src="lib-icon/js/config.js"></script>
        <script src="lib-icon/js/util.js"></script>
        <script src="lib-icon/js/jquery.emojiarea.js"></script>
        <script src="lib-icon/js/emoji-picker.js"></script>
        @stack('scripts')
        <script type="text/javascript">

            var codigo_usuario = "";
            var id_usuario = "";
            let cod_user = JSON.parse(localStorage.getItem("nombre"));
            for (const i in cod_user) {
                codigo_usuario = cod_user[i]["codigo_usuario"];
                id_usuario = cod_user[i]["id_usuario"];
            }
//console.log(id_usuario);
            idusu = parseInt(id_usuario);
//console.log(idusu);
            $("#coduser").val(codigo_usuario);
        </script>  
        <script type="text/javascript">

            $(document).ready(function () {
                var userAgent = navigator.userAgent || navigator.vendor || window.opera;
                if (/android/i.test(userAgent)) {
                    //document.getElementById('margin_left').style='margin-left: 8px !important';
                } else
                if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {

                } else
                if (/windows phone/i.test(userAgent)) {

                } else {
                    document.getElementById("ocultar").style.display = "none";
                    document.getElementById("blanco").style.color = "white";
                    $("#quitar_div").removeClass('col-md-2');
                    $("#quitar_div").removeClass('col-sm-6');
                    $("#quitar_div").removeClass('col-6');
                    $("#buscar_lista_ot").addClass('mt-4');
                }
                //validar_localstoreg_token();
                cambio_color();
                cargardata();
                activar_menu();
                noti_usua();
                noti_usua_windows();
                profile();


            });
        </script>
        <script>   
            $(function () {
                // Initializes and creates emoji set from sprite sheet
                window.emojiPicker = new EmojiPicker({
                    emojiable_selector: '[data-emojiable=true]',
                    assetsPath: 'lib-icon/img/',
                    popupButtonClasses: 'fa fa-smile'
                });
                // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
                // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
                // It can be called as many times as necessary; previously converted input fields will not be converted again
                window.emojiPicker.discover();
            });
        </script>
        <?php if ($exibirModal === true) : // Si nuestra variable de control "$exibirModal" es igual a TRUE activa nuestro modal y será visible a nuestro usuario.   ?>
            <script>
                $(document).ready(function ()
                {
                    // id de nuestro modal
                    $("#modal-bienvenido").modal("show");
                });
            </script>
        <?php endif; ?>


    </body>

</html>