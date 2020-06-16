<!doctype html>
<html class="no-js" lang="es">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Sistema MIMCO</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#7389AE"/>

        <script src="js/sweetalert2@8.js"></script>
        <!-- Google Fonts
                    ============================================ -->
        <link href="css/font_mimco_login.css" rel="stylesheet">
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

        <!-- PWA   -->
        <link rel="manifest" href="manifest.json">
        <!-- Chrome for Android theme color -->
        <meta name="theme-color" content="#000000">

        <!-- Add to homescreen for Chrome on Android -->
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="application-name" content="PWA">
        <link rel="icon"  href="mimco.PNG">

        <link rel="apple-touch-icon" href="mimco.PNG">

        <!-- Add to homescreen for Safari on iOS -->
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="apple-touch-startup-image" href="prueba.png">
        <meta name="apple-mobile-web-app-title" content="PWA">
        <link rel="apple-touch-icon" href="/images/icons/mimco-192x192.png">
        <link rel="apple-touch-startup-image" />


        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
    </head>

    <body>
        <div class="login-content">
            <!-- Login -->
            <div class="nk-block toggled" id="l-login">
                <img src="imagenes-mimco/logo.png" alt="" style="margin-bottom: 20px">
                <div class="nk-form">
                    <div class="input-group">
                        <span class="input-group-addon nk-ic-st-pro"><i class="notika-icon notika-support"></i></span>
                        <div class="nk-int-st">
                            <input type="text" id="usuario" class="form-control" placeholder="Usuario">
                        </div>
                    </div>
                    <div class="input-group mg-t-15">
                        <span class="input-group-addon nk-ic-st-pro"><i class="notika-icon notika-edit"></i></span>
                        <div class="nk-int-st">
                            <input type="password" id="contraseña" class="form-control" placeholder="Contraseña" onkeypress="validar(event)">
                        </div>
                    </div>

                </div>
                <div class="nk-navigation nk-lg-ic">
                    <a id="valida" style="cursor:pointer">
                        <i>Iniciar Sesión</i>
                    </a>
                </div>
                <div class="nk-navigation nk-lg-ic" style="cursor:pointer">
                    <a href="{{route('recuperar_pass')}}">
                        <i>¿Olvidaste tu Contraseña?</i>
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
        <script src="Folder/login.js"></script>
       
        <script type="text/javascript">
                              

                                if ('serviceWorker' in navigator) {
                                    navigator.serviceWorker.register('serviceworker.js', {
                                        scope: '.'
                                    }).then(function (registration) {
                                        // Registration was successful
                                        console.log('Laravel PWA: ServiceWorker registration successful with scope: ', registration.scope);
                                        // navigator.serviceWorker.ready.then(function(serviceWorker) {
                                        //   serviceWorker.showNotification(title, options);
                                        //  });
                                    }, function (err) {
                                        // registration failed :(
                                        console.log('Laravel PWA: ServiceWorker registration failed: ', err);
                                    });
                                }
        </script> 
    </body>

</html>