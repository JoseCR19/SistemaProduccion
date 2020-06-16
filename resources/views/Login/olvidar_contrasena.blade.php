<!doctype html>
<html class="no-js" lang="">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Login Register | Notika - Notika Admin Template</title>
        <meta name="description" content="">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- favicon
                    ============================================ -->
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
        <!-- Google Fonts
                    ============================================ -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700,900" rel="stylesheet">
        <!-- Bootstrap CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <!-- font awesome CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <!-- owl.carousel CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/owl.carousel.css">
        <link rel="stylesheet" href="css/owl.theme.css">
        <link rel="stylesheet" href="css/owl.transitions.css">
        <!-- animate CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/animate.css">
        <!-- normalize CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/normalize.css">
        <!-- mCustomScrollbar CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/scrollbar/jquery.mCustomScrollbar.min.css">
        <!-- wave CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/wave/waves.min.css">
        <!-- Notika icon CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/notika-custom-icon.css">
        <!-- main CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/main.css">
        <!-- style CSS
                    ============================================ -->
        <link rel="stylesheet" href="style.css">
        <!-- responsive CSS
                    ============================================ -->
        <link rel="stylesheet" href="css/responsive.css">
        <!-- modernizr JS
                    ============================================ -->
        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>

    <body>
        <!--[if lt IE 8]>
                <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
            <![endif]-->
        <!-- Login Register area Start-->
        <div class="login-content">
            <!-- Login -->
            <div class="nk-block toggled" id="l-login">
                <img src="imagenes-mimco/logo.png" alt="" style="margin-bottom: 20px">
                <div style="color: white;font-size: 20px;margin-bottom: 15px;font-family: 'Kite One', sans-serif;">Recuperar
                    Contraseña</div>
                <div class="nk-form">
                    <div class="input-group">
                        <span class="input-group-addon nk-ic-st-pro"><i class="notika-icon notika-edit"></i></span>
                        <div class="nk-int-st">
                            <input type="text" id="dni" class="form-control" placeholder="DNI">
                        </div>
                    </div>
                    <div class="input-group mg-t-15">
                        <span class="input-group-addon nk-ic-st-pro"><i class="notika-icon notika-support"></i></span>
                        <div class="nk-int-st">
                            <input type="text" id="usuario" class="form-control" style=" text-transform:lowercase" placeholder="Usuario">
                        </div>
                    </div>
                </div>
                <div class="nk-navigation nk-lg-ic">
                    <a href="#" id="enviar">
                        <i>Enviar</i>
                    </a>
                </div>
            </div>
        </div>
        <!-- Login Register area End-->
        <!-- jquery
                    ============================================ -->
        <script src="js/vendor/jquery-1.12.4.min.js"></script>
        <!-- bootstrap JS
                    ============================================ -->
        <script src="js/bootstrap.min.js"></script>
        <!-- wow JS
                    ============================================ -->
        <script src="js/wow.min.js"></script>
        <!-- price-slider JS
                    ============================================ -->
        <script src="js/jquery-price-slider.js"></script>
        <!-- owl.carousel JS
                    ============================================ -->
        <script src="js/owl.carousel.min.js"></script>
        <!-- scrollUp JS
                    ============================================ -->
        <script src="js/jquery.scrollUp.min.js"></script>
        <!-- meanmenu JS
                    ============================================ -->
        <script src="js/meanmenu/jquery.meanmenu.js"></script>
        <!-- counterup JS
                    ============================================ -->
        <script src="js/counterup/jquery.counterup.min.js"></script>
        <script src="js/counterup/waypoints.min.js"></script>
        <script src="js/counterup/counterup-active.js"></script>
        <!-- mCustomScrollbar JS
                    ============================================ -->
        <script src="js/scrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
        <!-- sparkline JS
                    ============================================ -->
        <script src="js/sparkline/jquery.sparkline.min.js"></script>
        <script src="js/sparkline/sparkline-active.js"></script>
        <!-- flot JS
                    ============================================ -->
        <script src="js/flot/jquery.flot.js"></script>
        <script src="js/flot/jquery.flot.resize.js"></script>
        <script src="js/flot/flot-active.js"></script>
        <!-- knob JS
                    ============================================ -->
        <script src="js/knob/jquery.knob.js"></script>
        <script src="js/knob/jquery.appear.js"></script>
        <script src="js/knob/knob-active.js"></script>
        <!--  Chat JS
                    ============================================ -->
        <script src="js/chat/jquery.chat.js"></script>
        <!--  wave JS
                    ============================================ -->
        <script src="js/wave/waves.min.js"></script>
        <script src="js/wave/wave-active.js"></script>
        <!-- icheck JS
                    ============================================ -->
        <script src="js/icheck/icheck.min.js"></script>
        <script src="js/icheck/icheck-active.js"></script>
        <!--  todo JS
                    ============================================ -->
        <script src="js/todo/jquery.todo.js"></script>
        <!-- Login JS
                    ============================================ -->
        <script src="js/login/login-action.js"></script>
        <!-- plugins JS
                    ============================================ -->
        <script src="js/plugins.js"></script>
        <!-- main JS
                    ============================================ -->
        <script src="js/main.js"></script>
        <script type="application/javascript">
            var url_sis = location.protocol + '//' + location.host;
            $('#enviar').click(function() {
            recuperar_contrasena();
            }); 

            function recuperar_contrasena() {
            let Dni = $('#dni').val();
            let Usuario = $('#usuario').val();
            if (Dni != "" && Usuario != "") {
            jQuery.ajaxSetup({
            async: false
            });
            jQuery.post(
            url_sis +'/MimcoSeguridad/public/index.php/recu_clav', {
            cache: Math.random(),
            varNumeDni: jQuery.trim(jQuery("#dni").val()),
            varCodiUsua: jQuery.trim(jQuery("#usuario").val())
            },
            function(response) {
            //console.log(response);
            if (response.mensaje == "Se envio un correo para el reseteo de clave.") {
            Swal.fire({
            title: '<strong>' + response.mensaje + '</strong>',
            type: 'success',
            width: '300px',
            })
            } else {
            Swal.fire({
            title: '<strong>' + response.mensaje + '</strong>',
            type: 'warning',
            width: '300px',
            })
            }
            }, "json"
            )
            } else if (Usuario == "" && Dni == "") {
            Swal.fire({
            title: '<strong>LLenar los campos</strong>',
            type: 'warning',
            width: '300px',
            })
            } else if (Usuario == "") {
            Swal.fire({
            title: '<strong>Ingrese su Usuario</strong>',
            type: 'warning',
            width: '300px',
            })
            } else if (Dni == "") {
            Swal.fire({
            title: '<strong>Ingrese su DNI</strong>',
            type: 'warning',
            width: '300px',
            })
            }
            }
        </script>

    </body>

</html>
