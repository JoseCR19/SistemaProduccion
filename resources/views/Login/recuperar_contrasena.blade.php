<!doctype html>
<html class="no-js" lang="">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Sistema MIMCO</title>
        <meta name="description" content="">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- favicon
                    ============================================ -->
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
        <script type="text/javascript" src="js/sweetalert2@8.js" ></script>
        <!-- Google Fonts
                    ============================================ -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700,900" rel="stylesheet">
        <!-- Bootstrap CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/bootstrap.min.css">
        <!-- font awesome CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/font-awesome.min.css">
        <!-- owl.carousel CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/owl.carousel.css">
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/owl.theme.css">
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/owl.transitions.css">
        <!-- animate CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/animate.css">
        <!-- normalize CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/normalize.css">
        <!-- mCustomScrollbar CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/scrollbar/jquery.mCustomScrollbar.min.css">
        <!-- wave CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/wave/waves.min.css">
        <!-- Notika icon CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/notika-custom-icon.css">
        <!-- main CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/main.css">
        <!-- style CSS
                    ============================================ -->

        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/style.css">
        <!-- responsive CSS
                    ============================================ -->
        <link rel="stylesheet" href="https://mimcoapps.mimco.com.pe/SisMimco/css/responsive.css">
        <!-- modernizr JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/vendor/modernizr-2.8.3.min.js"></script>
    </head>

    <body>
        <div class="login-content">
            <!-- Login -->
            <div class="nk-block toggled" id="l-login">
                <img src="https://mimcoapps.mimco.com.pe/SisMimco/imagenes-mimco/logo.png" alt="" style="margin-bottom: 20px">
                <div style="color: white;font-size: 20px;margin-bottom: 15px;font-family: 'Kite One', sans-serif;">
                    Actualizar
                    Contraseña</div>
                <div class="nk-form">
                    <div class="input-group">
                        <span class="input-group-addon nk-ic-st-pro"><i class="notika-icon notika-support"></i></span>
                        <div class="nk-int-st">
                            <input type="text" id="usuario" class="form-control" placeholder="Usuario" value="{{$data}}"
                                   disabled=true>
                        </div>
                    </div>
                    <div class="input-group mg-t-15">
                        <span class="input-group-addon nk-ic-st-pro"><i class="notika-icon notika-edit"></i></span>
                        <div class="nk-int-st">
                            <input type="password" id="contrasena" class="form-control" placeholder="Contraseña">
                        </div>
                    </div>
                </div>
                <div class="nk-navigation nk-lg-ic">
                    <a href="#" id="actualizar">
                        <i>Actualizar Contraseña</i>
                </div>
            </div>
        </div>
        <!-- Login Register area End-->
        <!-- jquery
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/vendor/jquery-1.12.4.min.js"></script>
        <!-- bootstrap JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/bootstrap.min.js"></script>
        <!-- wow JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/wow.min.js"></script>
        <!-- price-slider JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/jquery-price-slider.js"></script>
        <!-- owl.carousel JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/owl.carousel.min.js"></script>
        <!-- scrollUp JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/jquery.scrollUp.min.js"></script>
        <!-- meanmenu JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/meanmenu/jquery.meanmenu.js"></script>
        <!-- counterup JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/counterup/jquery.counterup.min.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/counterup/waypoints.min.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/counterup/counterup-active.js"></script>
        <!-- mCustomScrollbar JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/scrollbar/jquery.mCustomScrollbar.concat.min.js"></script>
        <!-- sparkline JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/sparkline/jquery.sparkline.min.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/sparkline/sparkline-active.js"></script>
        <!-- flot JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/flot/jquery.flot.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/flot/jquery.flot.resize.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/flot/flot-active.js"></script>
        <!-- knob JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/knob/jquery.knob.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/knob/jquery.appear.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/knob/knob-active.js"></script>
        <!--  Chat JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/chat/jquery.chat.js"></script>
        <!--  wave JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/wave/waves.min.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/wave/wave-active.js"></script>
        <!-- icheck JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/icheck/icheck.min.js"></script>
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/icheck/icheck-active.js"></script>
        <!--  todo JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/todo/jquery.todo.js"></script>
        <!-- Login JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/login/login-action.js"></script>
        <!-- plugins JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/plugins.js"></script>
        <!-- main JS
                    ============================================ -->
        <script src="https://mimcoapps.mimco.com.pe/SisMimco/js/main.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
        <script type="application/javascript"></script>
        <script>
            var url_sis = location.protocol + '//' + location.host;
            $('#actualizar').click(function () {
                actualizar_contrasena();
            });

            function actualizar_contrasena() {
                let Dni = $('#usuario').val();
                let contrasena = $('#contrasena').val();
                if (Dni != "" && contrasena != "") {
                    $.ajax({
                        type: 'POST',
                        url: url_sis + '/MimcoSeguridad/public/index.php/actu_clav',
                        dataType: 'json',
                        data: {
                            varNumeDni: Dni,
                            varClavUsua: contrasena
                        },
                        beforeSend: function () {},
                        success: function (responses) {
                            document.location.href = url_sis + "/SistemaProduccion/Redireccionar";
                        }
                    });
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Ingrese la contrasena',
                        width: '230px'
                    })
                }
            }
            ;
        </script>
    </body>

</html>