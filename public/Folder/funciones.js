var va = "";
var secret = "";
var token = "";
var Ac_to = "";
var access_token = "";
var data = [];
var menu = [];
var url = location.protocol + '//' + location.host;
var menu_style = "";
var id = "";
var estado_http = false;
var select = "";
var count = 0;
var Estado = "";
var listar_clientes = "";
var listar_empresas = "";
var listar_contratista = "";
var mensaje_alerta = "";
var estado_mensaje = false;
var checkLabel_noti = "";
var checkedLabel_user = "";
var cod_user_integrante = "";
var label_user_integrante = "";
var deta_json = "";
var ws = "";
var file_part_list = "";
var comentario_series = "";
var proyecto_notificado = "";
var options = {};
var conta = 0;
var tag_id = "";

//COLOCO ANDY 
$("#guardar_notificacion").prop("disabled", false);

/*********************************************************FUNCIONES GENERALES*****************************************************************/
/*FUNCION PARA GENERAR TOKEN, SE UTILIZA LA API oauth/token para poder obtener el token,
 se registra dentro de un localstorege para poder consumir el token para las autorizaciones*/
/*function generartoken() {
 jQuery.ajaxSetup({
 async: false
 });
 jQuery.post(
 'http://' + url + '//public/index.php/oauth/token', {
 
 
 cache: Math.random(),
 grant_type: 'client_credentials',
 client_id: token,
 client_secret: secret
 },
 function (response) {
 localStorage.setItem("secret", JSON.stringify(response.access_token));
 }
 )
 };
 */
/*CAMBIA DE COLOR CUANDO ESTA EN DIFERENTES AMBITOS DE DESARROLLO*/
function cambio_color() {

    if (url === "http://192.168.0.120:8081") {
        $("#menu_superior").addClass('dashboard_superior-desarrollo');
    }
    if (url === "http://192.168.0.120:8080") {
        $("#menu_superior").addClass('dashboard_superior-test');
    }
    if (url === "https://mimcoapps.mimco.com.pe") {
        $("#menu_superior").addClass('dashboard_superior');
    }
}
/*FUNCION PARA VALIDAR EL LOCALSTORAGE SI ESTA ACTIVO O NO*/
if (localStorage.getItem("nombre") === "" || localStorage.getItem("nombre") === null) {
    document.location.href = url + '/SistemaProduccion';
}
/*FIN DE GENERAR TOKEN  */
/*SE OBTIENE EL TOKEN SECRETO Y EL USUARIO */
function validar_localstoreg_token() {
    let usuario = JSON.parse(localStorage.getItem("nombre"));
    for (const i in usuario) {
        secret = usuario[i]['seguridad_usuario'];
        token = usuario[i]['token_usuario'];
    }
    if (localStorage.getItem("secret")) {
        access_token = obtener_access_token();

    } else {
        generartoken();
        access_token = obtener_access_token();

    }
}
;
/**FUNCION PARA GENERAR EL TOKEN_MICROSERVICIOS Y REMOVER EL ANTIGUO CUANDO SE GENERE EL ERROR 401 , EL CUAL ES POR QUE EL TOKEN TIENE UN LIMITE DE TIEMPO */
function validar_tocken(estado_http) {
    if (estado_http == true) {
        eliminar_tocken_localstorege();
        generartoken();
    }
}
;
function eliminar_tocken_localstorege() {
    localStorage.removeItem('secret');
}
;
function eliminar_nombre_localstorege() {
    localStorage.removeItem('nombre');
}
;
/*FUNCION PARA OBTENER EL TOKEN_MICROSERVICIOS ALOJADO DENTRO DEL LOCAL STOREGE*/
function obtener_access_token() {
    return access_token = JSON.parse(localStorage.getItem("secret"));
}
;
/************************************************* FIN FUNCIONES GENERALES*****************************************************************/
/**************************************************FUNCIONES PARA EL LA PAGINA ADMIN ******************************************************/
/**LLAMA AL ID CERRAR SESSION PARA PODER LLAMAR A LA FUNCION CERRAR_SESION */
$('#cerrar_sesion').click(function () {
    cerrar_session();
});
/**
 * llama cuando se hace click en el boton de sincronizar
 */
$('#sincronizar').click(function () {
    $('#modal-sincronizar').modal('show');
});
/**
 * llama a la funcion sincronizar 
 */
$('#sincronizar_total').click(function () {
    sincronizar();
    $('#sinc').removeClass('sincronizacion-inicio').addClass('sincronizacion-next');
    $('#sinc2').removeClass('sincronizacion-next').addClass('sincronizacion-inicio');
    document.getElementById('close').disabled = true;
});
$("#subir_archivo_icon_2").on('click', function () {
    $("#file").trigger('click');
});
/**
 * llama a la funcion cancelar
 */
$('#close').click(function () {
    $('#sinc').removeClass('sincronizacion-next').addClass('sincronizacion-inicio');
    $('#sinc2').removeClass('sincronizacion-inicio').addClass('sincronizacion-next');
    $('#sinc3').removeClass('sincronizacion-next').addClass('sincronizacion-inicio');
    document.getElementById('sincronizar_total').disabled = false;
});
/**
 * FUNCION PARA LLAMAR LA SINCRONIZACION
 */
function sincronizar() {
    $.ajax({
        type: 'GET',
        url: url + '/Sincronizacion/public/index.php/sincronizar',
        dataType: 'json',
        success: function (responses) {


            if (responses.data.mensaje == "Sincronizacion Total Satisfactoria") {

                $('#sinc').removeClass('sincronizacion-next').addClass('sincronizacion-inicio');
                $('#sinc3').removeClass('sincronizacion-inicio').addClass('sincronizacion-next');
                document.getElementById('sincronizar_total').disabled = true;
                document.getElementById('close').disabled = false;
            }

        },
    });
}

/**FUNCION PARA PODER CARGAR LOS DATOS BASICOS COMO EL NOMBRE Y EL APELLIDO DEL USUARIO*/
function cargardata() {
    let usuario = JSON.parse(localStorage.getItem("nombre"));
    for (const i in usuario) {
        id = usuario[i]['codigo_usuario'];
        va +=
                usuario[i]['nombre_usuario'] + ' ' +
                usuario[i]['apellido_usuario'];
    }
    listar_menu(id);
    $("#nombre").html(va);
    $("#nombre_2").html(va);

}
/**FUNCION PARA LISTAR EL MENU LATERAL DE LA PLANTILLA SEGUN LOS PERMISOS DEL USUARIO */
function profile() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var uuario = cod_user[0].codigo_usuario;
    var url_img = url + '/Documentos/Perfil/' + uuario + '.jpg';
    $.ajax({
        url: url_img,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        error: function ()
        {
            $("#img_principal").attr('src', 'imagenes-mimco/logo_mimco_sac.png');
        },
        success: function () {
            //$("#img_principal").attr('src', url_img);
            document.getElementById('img_principal').src = url_img;
        }
    });
}

function listar_menu(id) {

    var arra_new2 = [];
    var menu_principal = [];
    var menu_principal_2 = [];
    var menu_style_principal = [];
    var menu_style_principal_2 = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/obte_perm',
        dataType: 'json',
        data: {
            varCodiUsua: id,
            intIdSoft: 2
        }, error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_menu(id);
            }
        },
        success: function (responses) {
            const map = new Map();
            for (const item of responses.data) {
                if (!map.has(item.varRutaProg)) {
                    map.set(item.varRutaProg, true); // set any value to Map
                    arra_new2.push(
                            item.varRutaProg
                            );
                }
            }
            menu_principal = arra_new2.sort();
            menu_principal_2 = arra_new2.sort();
            menu = responses.data;
            for (let index = 0; index < menu_principal.length; index++) {
                menu_style_principal += '<li class="nav-item has-treeview">' +
                        '<a style="cursor:pointer" class="nav-link" id="menu_link2">' +
                        '<img src="iconos-svg/' + menu_principal[index] + '.svg" width="25px" class="mr-2">' +
                        '<p >' + menu_principal[index] + '<i class="fas fa-angle-left right"></i></p>' +
                        '</a>' +
                        '<ul class="nav nav-treeview" id="sub_menu' + menu_principal[index] + '">' +
                        '</ul>';
                $('#menu_principal').append(menu_style_principal);
            }
            $('#menu_principal').html(menu_style_principal);
            for (let index = 0; index < menu_principal_2.length; index++) {
                menu_style_principal_2 += '<li class="nav-item has-treeview">' +
                        '<a style="cursor:pointer" class="nav-link" >' +
                        '<img src="iconos-svg/' + menu_principal_2[index] + '.svg" width="25px" class="mr-2">'
                        + menu_principal_2[index] + '<i class="fas fa-angle-left right"></i>' +
                        '</a>' +
                        '<ul class="nav nav-treeview" id="sub_menu_2' + menu_principal_2[index] + '">' +
                        '</ul>';
                $('#menu_principal_2').append(menu_style_principal_2);
            }
            $('#menu_principal_2').html(menu_style_principal_2);
            for (let index = 0; index < menu_principal.length; index++) {
                var menu_style = "";
                for (let i = 0; i < menu.length; i++) {
                    if (menu[i]['varRutaProg'] == menu_principal[index]) {

                        menu_style += '<li class="nav-item" id="">' +
                                '<a href="' + menu[i]['varCodiProg'] + '" class="nav-link">' +
                                '<i class="far fa-circle nav-icon"></i> ' +
                                '<p>' + menu[i]['varNombProg'] + '</p>' +
                                '</a>' +
                                '</li>';
                        $('#sub_menu' + menu[i]['varRutaProg']).append(menu_style);
                        $('#sub_menu' + menu[i]['varRutaProg']).html(menu_style);
                    } else {
                    }
                }
            }
            for (let index = 0; index < menu_principal.length; index++) {
                var menu_style = "";
                for (let i = 0; i < menu.length; i++) {
                    if (menu[i]['varRutaProg'] == menu_principal[index]) {

                        menu_style += '<li class="nav-item" id="">' +
                                '<a href="' + url + '/ManualUsuario/' + menu[i]['varCodiProg'] + '.pdf' + '"   download="' + menu[i]['varNombProg'] + '" class="nav-link" >' +
                                '<i class="fas fa-download"></i> ' +
                                menu[i]['varNombProg'] +
                                '</a>' +
                                '</li>';
                        $('#sub_menu_2' + menu[i]['varRutaProg']).append(menu_style);
                        $('#sub_menu_2' + menu[i]['varRutaProg']).html(menu_style);
                    } else {
                    }
                }
            }
        }
    });
}
function descargar(id_sub_menu) {
    var url_2 = url + '/ManualUsuario/' + id_sub_menu + '.pdf';
    window.open(url_2, 'Download');

}
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}
function noti_usua_windows() {
    if (conta > 0) {
        if (!("Notification"  in  window)) {
            alert("Este navegador no soporta notificaciones de escritorio");
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (!('permission'  in  Notification)) {
                    Notification.permission = permission;
                }
                if (permission === "granted") {
                    var notification = new Notification("MimcoApps", options);
                    notification.onclick = function (event) {
                        event.preventDefault(); // prevent the browser from focusing the Notification's tab

                        window.open('https://mimcoapps.mimco.com.pe/SistemaProduccion/VER_NOTI', '_blank');
                    }
                }
            });
        }
    }

}
function noti_usua() {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/noti_usua',
        data: {
            codi_usua: id
        },
        dataType: 'json',
        success: function (responses) {

            conta = 0;
            var list = '';

            if (responses.data.length > 0) {
                list = '';
                for (var i = 0; responses.data.length > i; i++) {
                    if (responses.data[i]['intIdEsta'] === 3) {
                        conta++;
                    }
                    if (i < 5) {
                        if (responses.data[i]['intIdEsta'] === 3) {
                            var descripcion = responses.data[i]['varDescNoti'];
                            list += '<a style="cursor:pointer" class="dropdown-item" onclick=mostrar_notificaciones("' + responses.data[i]['intIdNoti'] + '","' + user + '","' + responses.data[i]['intIdEsta'] + '")>' +
                                    '<div class="media">' +
                                    '<img id="' + responses.data[i]['intIdNoti'] + '" alt="Avatar de usuario" class="img-size-50 mr-3 img-circle">' +
                                    '<div class="media-body">' +
                                    '<h3 class="dropdown-item-title" style="font-weight:bold"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                    responses.data[i]['asun_noti'] +
                                    '</font>' +
                                    '</font>' +
                                    '<span class="float-right text-sm text-danger">' +
                                    '<i class="fas fa-star"></i></span>' +
                                    '</h3>' +
                                    '<p class="text-sm"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                    descripcion.substring(0, 19) + '....' +
                                    '</font></font></p>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>' +
                                    '<div class="dropdown-divider"></div>';
                            $("#list_noti").html(list);
                        } else {
                            var descripcion = responses.data[i]['varDescNoti'];
                            list += '<a style="cursor:pointer" class="dropdown-item" onclick=mostrar_notificaciones("' + responses.data[i]['intIdNoti'] + '","' + user + '","' + responses.data[i]['intIdEsta'] + '")>' +
                                    '<div class="media">' +
                                    '<img id="' + responses.data[i]['intIdNoti'] + '"  alt="Avatar de usuario" class="img-size-50 mr-3 img-circle">' +
                                    '<div class="media-body">' +
                                    '<h3 class="dropdown-item-title" style="font-weight:bold"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                    responses.data[i]['asun_noti'] +
                                    '</font>' +
                                    '</font>' +
                                    '<span class="float-right text-sm text-muted">' +
                                    '<i class="fas fa-star"></i></span>' +
                                    '</h3>' +
                                    '<p class="text-sm"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">' +
                                    descripcion.substring(0, 19) + '....' +
                                    '</font></font></p>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>' +
                                    '<div class="dropdown-divider"></div>';
                            $("#list_noti").html(list);
                        }
                        validar_imagen_list_noti(url + '/Documentos/Perfil/' + responses.data[i].acti_usua + '.jpg', responses.data[i].intIdNoti);
                    }
                }
                $("#number_noti").html(conta);
                if (conta === 1) {
                    var noti_larg = conta + " Notificaciones Pendiente";
                    options = {body: noti_larg,
                        icon: "imagenes-mimco/logo.png",
                        dir: "ltr"};
                } else {
                    var noti_larg = conta + " Notificaciones Pendientes";
                }
                $("#number_noti_large").html(noti_larg);
                if (conta > 0) {

                    $("#notificationContent").html("Hay " + conta + " nuevo(s) mensaje(s)");
                    $("#messageNotification").jqxNotification({
                        width: 250, position: "bottom-right", opacity: 0.9,
                        autoOpen: false, autoClose: false, template: "info", autoCloseDelay: 3000, autoClose: true
                    });
                    $("#messageNotification").jqxNotification("open");
                    var noti_larg = conta + " Notificaciones Pendiente";
                    options = {body: noti_larg,
                        icon: 'https://mimcoapps.mimco.com.pe/SistemaProduccion/images/icons/mimco-192x192.png',
                        vibrate: [200, 100, 200],
                        dir: "ltr"};
                }
            } else {
                $("#number_noti").html(conta);
                var noti_larg = conta + " Notificacion Pendiente";
                $("#number_noti_large").html(noti_larg);
            }
        }
    });
}
function mostrar_notificaciones(id_noti, user, estado) {
    $("#modal-visualizar-notificacion").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/most_info_noti',
        data: {
            intIdNoti: id_noti,
            codi_usua: user
        },
        dataType: 'json',
        success: function (responses) {

            if (estado === '3') {
                noti_usua();
            }
            if (responses.data[0].varNombarch) {
                $("#url_descarga_modal").attr('href', url + '/Documentos/Proyectos/' + responses.data[0].varDetaArch + '/PartList/Cabecera/' + responses.data[0].varNombarch + '.xls');
                document.getElementById('descargar_noti_modal').style = 'display:block';
            } else {
                document.getElementById('descargar_noti_modal').style = 'display:none';
            }
            if (responses.data[0].ruta_prog) {
                document.getElementById('redireccionar_noti_modal').style = 'display:block';
            } else {
                document.getElementById('redireccionar_noti_modal').style = 'display:none';
            }
            document.getElementById('compartir_noti_modal').style = 'display:none';
            document.getElementById('comentarios_noti_modal').style = 'display:none';
            $("#usuario_noti").html(responses.data[0].nombre);
            $("#nom_fecha").html(responses.data[0].acti_hora);
            $("#titulo").html(responses.data[0].asun_noti);
            $("#descripcion").html(responses.data[0].varDescNoti);
            $("#modulo").html(responses.data[0].modu_prog);
            validar_imagen_noti(url + '/Documentos/Perfil/' + responses.data[0].acti_usua + '.jpg');
        }
    });
}
function validar_imagen_list_noti(url, id) {
    $("#" + id).attr('src', '');
    $.ajax({
        url: url,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        error: function ()
        {
            $("#" + id).attr('src', 'imagenes-mimco/logo_mimco_sac.png');
        },
        success: function () {
            $("#" + id).attr('src', url);
        }
    });
}
function validar_imagen_noti(url) {
    $.ajax({
        url: url,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        error: function ()
        {
            $("#img_profile_noti").attr('src', 'imagenes-mimco/logo_mimco_sac.png');
        },
        success: function () {
            $("#img_profile_noti").attr('src', url);
        }
    });
}
$("#messageNotification").on('click', function () {
    $("#noti_clik").trigger('click');
});
$('#rest_clav').click(function () {
    validar_contrasena();
});
function obtener_id_user() {
    var id_user = "";
    let cod_user = JSON.parse(localStorage.getItem("nombre"));
    for (const i in cod_user) {
        id_user = cod_user[i]["id_usuario"];
    }
    return id_user;
}
$("#edit_perfil").on('click', function () {
    var dni = "";
    let cod_user = JSON.parse(localStorage.getItem("nombre"));
    dni = cod_user[0].dni;
    $.ajax({
        type: 'POST',
        //url: 'https://' + url + '/MimcoSeguridad/public/index.php/usuario/validar_usuario',
        url: url + '/GestionUsuarios/public/index.php/validar_usuario',
        dataType: 'json',
        data: {
            varNumeDni: dni
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                editar(dni);
            }
        },
        /*beforeSend: function(xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        success: function (responses) {
            $("#modal-editar-usuario").modal('show');
            $("#dni").val(responses.data.varNumeDni);
            $("#nombres").val(responses.data.varNombUsua);
            $("#apellidos").val(responses.data.varApelUsua);
            $("#usuario").val(responses.data.varCodiUsua);
            $("#clave").val(responses.data.varClavUsua);
            $("#correo").val(responses.data.varCorrUsua);
            $("#telefono").val(responses.data.varTelfUsua);
            $("#estado").val(responses.data.varEstaUsua);
        }
    });
});
$("#form_actualizar_perfil").on('submit', function (e) {
    e.preventDefault();
    let Dni = $('#dni').val();
    let nombres = $('#nombres').val().toUpperCase();
    let apellidos = $('#apellidos').val().toUpperCase();
    let telefono = $('#telefono').val();
    let cod_user = JSON.parse(localStorage.getItem("nombre"));
    for (const i in cod_user) {
        codigo_usuario = cod_user[i]["codigo_usuario"];
    }
    if (Dni !== "" && nombres !== "" && apellidos !== "" && telefono !== "") {
        var respuesta = "";
        $.ajax({
            url: 'GUARDAR_FOTO_PERFIL',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: new FormData(this),
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (html) {
                respuesta = html.mensaje;
                if (respuesta == "") {
                    mensaje(true, "Actualizacion de Perfil Satisfactorio", "modal-editar-usuario");
                    var url_img = url + '/Documentos/Perfil/' + codigo_usuario + '.jpg';
                    window.location.reload();
                    noti_usua();
                } else {
                    mensaje(false, respuesta, "no");
                    document.getElementById('img').src = 'imagenes-mimco/perfil.png';
                }
            }
        });
    } else {

        mensaje(false, "Datos incompletos", "no");
    }


});
function mostrar() {
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(archivo);
        reader.onloadend = function () {
            document.getElementById("img").src = reader.result;
            document.getElementById('img').style = "width:120px;height:120px";
        }
    }
}
function validar_contrasena() {
    var clave_act = $("#claveactual").val();
    var clave_nuevo = $("#clavenuevo").val();
    var clave_confirmar = $("#claveconfirmar").val();
    var usuario = $("#coduser").val();
    let idusu = obtener_id_user();
    if (validar_texto(clave_act) == true)
    {
        /*alert("Ingrese Contraseña Actual"); */
        Swal.fire({
            title: '<strong>' + "Contraseña Actual No Correcta" + '</strong>',
            type: 'error',
            width: '300px',
            cancelButtonColor: '#d33',
        });
    } else if (clave_nuevo !== clave_confirmar) {
        Swal.fire({
            title: '<strong>' + "Contraseña Confirmación Incoherente" + '</strong>',
            type: 'error',
            width: '300px',
            cancelButtonColor: '#d33',
        });
    } else if (clave_nuevo.length == 0 && clave_confirmar.length == 0) {
        Swal.fire({
            title: '<strong>' + "Contraseña Confirmación Incoherente" + '</strong>',
            type: 'error',
            width: '300px',
            cancelButtonColor: '#d33',
        });
    } else
    {
        $.ajax({
            type: 'POST',
            url: url + '/MimcoSeguridad/public/index.php/valida_clave',
            dataType: 'json',
            data: {
                intIdUsua: idusu,
                varClavUsua: clave_act,
                updclave: clave_nuevo

            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    validar_contrasena();
                }
            },
            success: function (responses) {
                if (responses.mensaje === "Contrasena Actualizada Correctamente") {
                    Swal.fire({
                        text: responses.mensaje,
                        type: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ok'
                    })
                            .then((result) => {
                                if (result.value) {
                                    $('#modal-create-programa .close').click();
                                    cerrar_session();
                                }
                            });
                    //limpiar_programas_registrar();
                    //access_token = obtener_access_token();
                    //listar_programa_ajax();
                    //cerrar_session();
                } else {
                    Swal.fire({
                        title: '<strong>' + responses.mensaje + '</strong>',
                        type: 'error',
                        width: '300px',
                        cancelButtonColor: '#d33',
                    });
                }
            }
        });
    }
}
function validar_texto(text) {
    if (text === "") {
        return true;
    } else {
        return false;
    }
}
/**
 * ACTIVA EL MENU SEGUN LA BASE DE URL 
 */
function activar_menu() {
    link = "/SistemaProduccion/";
    base1 = "MANT_ENTI";
    base2 = "ASIG_PROY";
    base3 = "MANT_AGRUP";
    base4 = "MANT_PART";
    base5 = "MANT_TIP_ETP";
    base6 = "MANT_ETP";
    base7 = "MANT_ARM";
    base8 = "ASIG_ETAP_PROY";
    base9 = "ASIG_LIST_OT";
    base10 = "ASIG_ETAP_RUTA";
    base11 = "MANT_PERI_VALO";
    base12 = "ASIG_RUTA_PROD";
    base13 = "ASIG_PREC_ESPE";
    base14 = "ASIG_COST";
    base15 = "MANT_CONT_AGRU";
    base16 = "PROD_REPO_AVAN";
    base17 = "REPO_SEGU_GRUP";
    base18 = "REPO_VAL";
    base19 = "REPO_WIP";
    base20 = "MANT_TRAN";
    base21 = "ASIG_GRUP";
    base22 = "MANT_MAQU";
    base23 = "MANT_CHOF";
    base24 = "MANT_MOTI";
    base25 = "MANT_COLA_AGRU";
    base26 = "MANT_TIPO_ESTR";
    base27 = "VER_NOTI";
    base28 = "MANT_TIPO_ESTRUCT";
    base29 = "MANT_CAUSA";
    base30 = "REPR_REPR";
    base31 = "MANT_TIPO_GRUPO";
    base32 = "MANT_TAB_DEFEC";
    base33 = "DESP_DESP";
    base34 = "LIBE_LIBE";
    base35 = "REPO_LIBE";
    base36 = "GENE_DESP";
    base37 = "GENE_GUIA";
    base38 = "LIST_GUIA";
    base39 = "GALV_REGI";
    base40 = "REPO_GALV";
    base41 = "LOTE_PINT";
    base42 = "REPO_PINT";
    base43 = "REPO_SEGU_PINT";
    base44 = "REPO_GALV_SEMA";
    base45 = "REPO_DETA_GALVA";
    base46 = "INSPE_GAL";
    base47 = "REPO_INSP_GALV";
    base48 = "REPO_PESO";
    base49 = "MANT_ESPECIF";
    base50 = "MANT_ETAPA_PINT";

    /*Listar nombre y apellidos para la plantilla */
    var URLactual = window.location.href;
    var element = document.getElementById("menu_link1");
    var element2 = document.getElementById("menu_link2");
    if (URLactual == url + link + base1) {
        document.getElementById('name').innerHTML = 'ENTIDADES';
        document.getElementById('a').innerHTML = 'Mantenimiento';
        document.getElementById('li').innerHTML = 'Entidades';
        //element2.classList.add("active");
    } else if (URLactual == url + link + base2) {
        document.getElementById('name').innerHTML = 'PROYECTOS';
        document.getElementById('a').innerHTML = 'L.P';
        document.getElementById('li').innerHTML = 'Listar Proyectos';
        //element2.classList.add("active");
    } else if (URLactual == url + link + base3) {
        document.getElementById('name').innerHTML = 'AGRUPADOR';
        document.getElementById('a').innerHTML = 'L.G';
        document.getElementById('li').innerHTML = 'Listar Agrupaciones';
        //element2.classList.add("active");
    } else if (URLactual == url + link + base4) {
        document.getElementById('name').innerHTML = 'PART LIST';
        document.getElementById('a').innerHTML = 'L.P';
        document.getElementById('li').innerHTML = 'Lista Part List';
        //element2.classList.add("active");
    } else if (URLactual == url + link + base5) {
        document.getElementById('name').innerHTML = 'TIPO ETAPA';
        document.getElementById('a').innerHTML = 'L.T.E';
        document.getElementById('li').innerHTML = 'Lista Tipo Etapa';
        //element2.classList.add("active");
    } else if (URLactual == url + link + base6) {
        document.getElementById('name').innerHTML = 'ETAPA';
        document.getElementById('a').innerHTML = 'L.E';
        document.getElementById('li').innerHTML = 'Listar Etapa';
        //element2.classList.add("active");
    } else if (URLactual == url + link + base7) {
        document.getElementById('name').innerHTML = 'ARMADORES';
        document.getElementById('a').innerHTML = 'A.L';
        document.getElementById('li').innerHTML = 'Listar Armadores';
        //element2.classList.add("active");
    } else if (URLactual == url + link + base8) {
        document.getElementById('name').innerHTML = 'ASIGNAR ETAPA';
        document.getElementById('a').innerHTML = 'A.E';
        document.getElementById('li').innerHTML = 'Listar Asignar Etapa';
        //element2.classList.add("active");
    } else if (URLactual == url + link + base9) {
        document.getElementById('name').innerHTML = 'LISTA ELEMENTOS';
        document.getElementById('a').innerHTML = 'L.E';
        document.getElementById('li').innerHTML = 'Listar Elementos';
    } else if (URLactual == url + link + base10) {
        document.getElementById('name').innerHTML = 'CREAR RUTAS';
        document.getElementById('a').innerHTML = 'C.R';
        document.getElementById('li').innerHTML = 'Crear Rutas';
    } else if (URLactual == url + link + base11) {
        document.getElementById('name').innerHTML = 'PERIODO VALORIZACION';
        document.getElementById('a').innerHTML = 'P.V';
        document.getElementById('li').innerHTML = 'Listar Periodo Valorizacion';
    } else if (URLactual == url + link + base12) {
        document.getElementById('name').innerHTML = 'ASIGNACIÓN RUTA';
        document.getElementById('a').innerHTML = 'A.R';
        document.getElementById('li').innerHTML = 'Listar Asignacion Ruta';
    } else if (URLactual == url + link + base13) {
        document.getElementById('name').innerHTML = 'ASIGNACIÓN PRECIO ESPECIFICO';
        document.getElementById('a').innerHTML = 'A.P.E';
        document.getElementById('li').innerHTML = 'Listar Asignacion Precio Específico';
    } else if (URLactual == url + link + base14) {
        document.getElementById('name').innerHTML = 'ASIGNACIÓN COSTO';
        document.getElementById('a').innerHTML = 'A.C';
        document.getElementById('li').innerHTML = 'Listar Asignacion Costo';
    } else if (URLactual == url + link + base15) {
        document.getElementById('name').innerHTML = 'CONTRATISTA AGRUPADOR';
        document.getElementById('a').innerHTML = 'C.A';
        document.getElementById('li').innerHTML = 'Listar Contratista Agrupador';
    } else if (URLactual == url + link + base16) {
        document.getElementById('name').innerHTML = 'REPORTE AVANCE';
        document.getElementById('a').innerHTML = 'R.A';
        document.getElementById('li').innerHTML = 'Listar Reporte Avance';
    } else if (URLactual == url + link + base17) {
        document.getElementById('name').innerHTML = 'SEGUIMIENTO DE GRUPOS';
        document.getElementById('a').innerHTML = 'S.G';
        document.getElementById('li').innerHTML = 'Listar Seguimientos de Grupos';
    } else if (URLactual == url + link + base18) {
        document.getElementById('name').innerHTML = 'REPORTE DE VALORIZACION';
        document.getElementById('a').innerHTML = 'R.V';
        document.getElementById('li').innerHTML = 'Listar Reporte  de Valorización';
    } else if (URLactual == url + link + base19) {
        document.getElementById('name').innerHTML = 'WIP';
        document.getElementById('a').innerHTML = 'R.W';
        document.getElementById('li').innerHTML = 'Wip';
    } else if (URLactual == url + link + base20) {
        document.getElementById('name').innerHTML = 'TRANSPORTISTAS';
        document.getElementById('a').innerHTML = 'L.T';
        document.getElementById('li').innerHTML = 'Lista Transportistas';
    } else if (URLactual == url + link + base21) {
        document.getElementById('name').innerHTML = 'GRUPOS';
        document.getElementById('a').innerHTML = 'A.G';
        document.getElementById('li').innerHTML = 'Lista Grupos';
    } else if (URLactual == url + link + base22) {
        document.getElementById('name').innerHTML = 'MAQUINA';
        document.getElementById('a').innerHTML = 'L.M';
        document.getElementById('li').innerHTML = 'Lista Maquina';
    } else if (URLactual == url + link + base23) {
        document.getElementById('name').innerHTML = 'CHOFER';
        document.getElementById('a').innerHTML = 'L.C';
        document.getElementById('li').innerHTML = 'Lista Chofer';
    } else if (URLactual == url + link + base24) {
        document.getElementById('name').innerHTML = 'MOTIVO';
        document.getElementById('a').innerHTML = 'L.M';
        document.getElementById('li').innerHTML = 'Lista Motivo';
    } else if (URLactual == url + link + base25) {
        document.getElementById('name').innerHTML = 'SUPERVISOR';
        document.getElementById('a').innerHTML = 'L.S';
        document.getElementById('li').innerHTML = 'Lista Supervisor';
    } else if (URLactual === url + link + base26) {
        document.getElementById('name').innerHTML = 'TIPO ESTRUCTURA';
        document.getElementById('a').innerHTML = 'L.T.E';
        document.getElementById('li').innerHTML = 'Lista Tipo Estructura';
    } else if (URLactual === url + link + base27) {
        document.getElementById('name').innerHTML = 'NOTIFICACIONES';
        document.getElementById('a').innerHTML = 'L.N';
        document.getElementById('li').innerHTML = 'Lista Notificaciones';
    } else if (URLactual == url + link) {
        document.getElementById('name').innerHTML = 'Dashboard';
        document.getElementById('a').innerHTML = 'Sistema Mimco';
        document.getElementById('li').innerHTML = 'Dashboard';
        //element.classList.add("active");
    } else if (URLactual == url + link) {
        document.getElementById('name').innerHTML = 'Dashboard';
        document.getElementById('a').innerHTML = 'Sistema Mimco';
        document.getElementById('li').innerHTML = 'Dashboard';
        //element.classList.add("active");
    } else if (URLactual === url + link + base28) {
        document.getElementById('name').innerHTML = 'TIPO ESTRUCTURADO';
        document.getElementById('a').innerHTML = 'L.T.E';
        document.getElementById('li').innerHTML = 'Lista Tipo Estructurado';
    } else if (URLactual === url + link + base29) {
        document.getElementById('name').innerHTML = 'CAUSA';
        document.getElementById('a').innerHTML = 'L.C';
        document.getElementById('li').innerHTML = 'Lista Causa';
    } else if (URLactual === url + link + base30) {
        document.getElementById('name').innerHTML = 'REPROCESO';
        document.getElementById('a').innerHTML = 'L.R';
        document.getElementById('li').innerHTML = 'Lista Reproceso';
    } else if (URLactual === url + link + base31) {
        document.getElementById('name').innerHTML = 'TIPO GRUPO';
        document.getElementById('a').innerHTML = 'L.G';
        document.getElementById('li').innerHTML = 'Lista Tipo Grupo';
    } else if (URLactual === url + link + base32) {
        document.getElementById('name').innerHTML = 'DEFECTO';
        document.getElementById('a').innerHTML = 'L.D';
        document.getElementById('li').innerHTML = 'Lista Defecto';
    } else if (URLactual === url + link + base33) {
        document.getElementById('name').innerHTML = 'IMPRESION ROTULO';
        document.getElementById('a').innerHTML = 'I.R';
        document.getElementById('li').innerHTML = 'Impresion Rotulo';
    } else if (URLactual === url + link + base34) {
        document.getElementById('name').innerHTML = 'LIBERACION';
        document.getElementById('a').innerHTML = 'R.L';
        document.getElementById('li').innerHTML = 'Registrar Liberacion';
    } else if (URLactual === url + link + base35) {
        document.getElementById('name').innerHTML = 'REPORTE INSPECCION';
        document.getElementById('a').innerHTML = 'R.I';
        document.getElementById('li').innerHTML = 'Reporte Inspeccion';
    } else if (URLactual === url + link + base36) {
        document.getElementById('name').innerHTML = 'GENERAR DESPACHO';
        document.getElementById('a').innerHTML = 'G.D';
        document.getElementById('li').innerHTML = 'Generar Despacho';
    } else if (URLactual === url + link + base37) {
        document.getElementById('name').innerHTML = 'GUIA DE REMISION';
        document.getElementById('a').innerHTML = 'G.R';
        document.getElementById('li').innerHTML = 'Guia de Remision';
    } else if (URLactual === url + link + base38) {
        document.getElementById('name').innerHTML = 'LISTAR GUIA';
        document.getElementById('a').innerHTML = 'L.G';
        document.getElementById('li').innerHTML = 'Listar Guia';
    } else if (URLactual === url + link + base39) {
        document.getElementById('name').innerHTML = 'REGISTRAR GALVANIZADO';
        document.getElementById('a').innerHTML = 'R.G';
        document.getElementById('li').innerHTML = 'Registrar Galvanizado';
    } else if (URLactual === url + link + base40) {
        document.getElementById('name').innerHTML = 'REPORTE GALVANIZADO';
        document.getElementById('a').innerHTML = 'R.G';
        document.getElementById('li').innerHTML = 'Reporte Galvanizado';
    } else if (URLactual === url + link + base41) {
        document.getElementById('name').innerHTML = 'LOTE PINTURA';
        document.getElementById('a').innerHTML = 'L.P';
        document.getElementById('li').innerHTML = 'Lote Pintura';
    } else if (URLactual === url + link + base42) {
        document.getElementById('name').innerHTML = 'GENERAR LOTE PINTURA';
        document.getElementById('a').innerHTML = 'G.P';
        document.getElementById('li').innerHTML = 'Generar Lote Pintura';
    } else if (URLactual === url + link + base43) {
        document.getElementById('name').innerHTML = 'SEGUIMIENTO PINTURA';
        document.getElementById('a').innerHTML = 'S.P';
        document.getElementById('li').innerHTML = 'Siguimiento Pintura';
    } else if (URLactual === url + link + base44) {
        document.getElementById('name').innerHTML = 'GALVANIZADO POR TURNO';
        document.getElementById('a').innerHTML = 'G.T';
        document.getElementById('li').innerHTML = 'Galvanizado Turno';
    } else if (URLactual === url + link + base45) {
        document.getElementById('name').innerHTML = 'DETALLE GALVANIZADO';
        document.getElementById('a').innerHTML = 'D.T';
        document.getElementById('li').innerHTML = 'Detalle Galvanizado';
    } else if (URLactual === url + link + base46) {
        document.getElementById('name').innerHTML = 'INSPECCION GALVANIZADO';
        document.getElementById('a').innerHTML = 'I.G';
        document.getElementById('li').innerHTML = 'Inspeccion Galvanizado';
    } else if (URLactual === url + link + base47) {
        document.getElementById('name').innerHTML = 'REPORTE INSPECCION GALVANIZADO';
        document.getElementById('a').innerHTML = 'R.I.G';
        document.getElementById('li').innerHTML = 'Reporte Inspeccion Galvanizado';
    } else if (URLactual === url + link + base48) {
        document.getElementById('name').innerHTML = 'REPORTE PESO';
        document.getElementById('a').innerHTML = 'R.P';
        document.getElementById('li').innerHTML = 'Reporte Peso';
    } else if (URLactual === url + link + base49) {
        document.getElementById('name').innerHTML = 'ESPECIFICACION';
        document.getElementById('a').innerHTML = 'M.E';
        document.getElementById('li').innerHTML = 'Especificacion';
    } else if (URLactual === url + link + base50) {
        document.getElementById('name').innerHTML = 'PINTOR';
        document.getElementById('a').innerHTML = 'L.P';
        document.getElementById('li').innerHTML = 'Listar Pintor';
    }
};
function cerrar_session() {
    eliminar_nombre_localstorege();
    eliminar_tocken_localstorege();
    document.location.href = url + "/SistemaProduccion/";
}
/********************************************** *FIN FUNCIONES PARA EL LA PAGINA ADMIN ******************************************************/
/**
 * FUNCION DE MENSAJE DE SWEEALERT
 */
$("#notificaciones").on('click', function () {

    var URLactual = window.location;
    var pathname = URLactual.pathname;
    var split = pathname.split('/');
    $("#name").val(split[3]);
    mensaje_notificacion();
});
function mensaje_notificacion() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: '¿Desea notificar?',
        text: "Se enviará una notifación",
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Si',
    }).then((result) => {
        if (result.value) {
            listar_tag_user();
            $("#subir_archivo_2").val('');
            $("#nombre_archivo_2").val('');
            $("#subir_archivo_icon_2").val('');
            $("#tag_noti").jqxDropDownList('selectIndex', -1);
            listar_tag_usuarios();
            $("#tag_noti_personal").jqxDropDownList('uncheckAll');
            $("#tag_lista_noti").val('');
            $("#asunto").val('');
            $("#text_observacion").val('');
            $("#text_observacion").val(comentario_series);
            $("#para_noti").val('');
            $("#guardar_notificacion").prop("disabled", false);
            $("#modal-crear-notificacion").modal('show');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            $("#para_noti").val('');
            $("#name").val('');
        }
    })
}
$("#guardar_notificacion").on('submit', function (e) {
    e.preventDefault();
    $("#guardar_notificacion").prop("disabled", true);
    var para = $("#para_noti").val();
    var nombre_programa = document.getElementById('name').innerHTML;
    let user = obtener_user();
    if ($("#text_observacion").val() != "") {
        if (para) {
            if ($("#asunto").val() != "") {
                var proyecto = proyecto_notificado;
                $.ajax({
                    type: 'POST',
                    url: url + '/GestionUsuarios/public/index.php/regis_noti_deta_noti',
                    data: new FormData(this),
                    /*data: {
                     asun_noti: $("#asunto").val(),
                     modu_prog: nombre_programa,
                     varDescNoti: $("#text_observacion").val(),
                     acti_usua: user,
                     intIdTags: checkLabel_noti,
                     ruta_prog: '',
                     varNombarch: file_part_list,
                     Personal: checkedLabel_user,
                     varDetaArch: proyecto
                     },*/
                    dataType: 'json',
                    success: function (responses) {
                        mensaje(true, "Notificacion enviada", "modal-crear-notificacion");
                        $("#para_noti").val('');
                        $("#name").val('');
                        proyecto_notificado = "";
                        notificaciones_tiempo_real();
                    }
                });
            } else {
                proyecto_notificado = "";
                mensaje(false, "Debe Ingresar Asunto");
                $("#guardar_notificacion").prop("disabled", false);
            }

        } else {
            mensaje(false, "Debe seleccionar Grupo o Persona");
            $("#guardar_notificacion").prop("disabled", false);
        }
    } else {
        mensaje(false, "Debe Ingresar Observación");
        $("#guardar_notificacion").prop("disabled", false);
    }
});
$("#tag_noti").on('change', function (event) {
    checkLabel_noti = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            checkLabel_noti = item.label + ",";
        }
    }
    if (checkedLabel_user) {
        $("#para_noti").val(checkLabel_noti + checkedLabel_user);
        $("#tag_lista_noti").html(checkLabel_noti + checkedLabel_user);
    } else {
        $("#para_noti").val(checkLabel_noti + checkedLabel_user);
        $("#tag_lista_noti").html(checkLabel_noti);
    }
});
$("#tag_noti_personal").on('checkChange', function (event) {
    checkedLabel_user = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {

            var items = $("#tag_noti_personal").jqxDropDownList('getCheckedItems');
            checkedLabel_user = "";
            $.each(items, function (index) {
                checkedLabel_user += this.value + ",";
            });

        }
    }
    if (checkLabel_noti) {
        lista_user_noti = checkLabel_noti + checkedLabel_user + ",";
        $("#para_noti").val(checkedLabel_user + checkLabel_noti);
        $("#tag_lista_noti").html(checkedLabel_user + checkLabel_noti);
    } else {
        $("#para_noti").val(checkedLabel_user);
        $("#tag_lista_noti").html(checkedLabel_user);
    }
});
$('#grid_list_user_tags').on('rowdoubleclick', function (event)
{
    var args = event.args;
    var row = args.rowindex;
    var dataRecord = jQuery("#grid_list_user_tags").jqxGrid('getrowdata', row);
    var indexRecord = jQuery("#grid_list_user_tags").jqxGrid('getrowid', row);
    //   jQuery("#proc_cali_insp_txt_codi_prod_rech").val(dataRecord.codi_prod);
    //   jQuery("#proc_cali_insp_txt_nomb_prod_rech").val(dataRecord.nomb_prod);
    if (jQuery('#grid_list_user_tags').jqxGrid('getrows').length > 0) {
        jQuery("#grid_list_user_tags").jqxGrid('deleterow', indexRecord);
    }
});
function listar_tag_user() {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/traer_tags_usua_publi',
        data: {
            varPropTags: user
        },
        dataType: 'json',
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdTags'},
                            {name: 'varDescTags'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#tag_noti").jqxDropDownList({source: dataAdapter, displayMember: "varDescTags", valueMember: "intIdTags", width: 200, height: 30});
            $("#tag_noti_grupos").jqxDropDownList({source: dataAdapter, displayMember: "varDescTags", valueMember: "intIdTags", width: 200, height: 30});
        }
    });
}
function listar_tag_usuarios() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionUsuarios/public/index.php/list_usua_noti',
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiUsua'},
                            {name: 'nombre'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#tag_noti_personal").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "nombre", valueMember: "varCodiUsua", width: 200, height: 30});
            $("#list_noti_usuario").jqxDropDownList({source: dataAdapter, displayMember: "nombre", valueMember: "varCodiUsua", width: 200, height: 30});
        }
    });
}
function mensaje(estado, mensaje, modal) {
    var resutado_mensaje = "";
    if (modal === "no") {
        if (estado === false) {
            Swal.fire({
                type: 'error',
                title: mensaje,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        } else {
            Swal.fire({
                type: 'success',
                title: mensaje,
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        }
    } else {
        if (estado === false) {
            Swal.fire({
                type: 'error',
                title: mensaje,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                $('#' + modal).modal('hide');
            })
        } else {
            Swal.fire({
                type: 'success',
                title: mensaje,

                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            }).then((result) => {
                $('#' + modal).modal('hide');
                //mensaje_notificacion();
            })
        }
    }
}
function mensaje_noti(estado, mensaje, modal) {
    var resutado_mensaje = "";
    if (modal === "no") {
        if (estado === false) {
            Swal.fire({
                type: 'error',
                title: mensaje,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                $('#' + modal).modal('hide');
            })
        } else {
            Swal.fire({
                type: 'success',
                title: mensaje,
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            }).then((result) => {
                $('#' + modal).modal('hide');
                mensaje_notificacion();
            })
        }
    } else {
        if (estado === false) {
            Swal.fire({
                type: 'error',
                title: mensaje,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                $('#' + modal).modal('hide');
            })
        } else {
            Swal.fire({
                type: 'success',
                title: mensaje,
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            }).then((result) => {
                $('#' + modal).modal('hide');
                mensaje_notificacion();
            })
        }
    }
}
function listar_integrantes_tag(codigo) {
    $('#grid_list_user_tags').jqxGrid('clear');
    $('#grid_list_user_tags').jqxGrid('clearselection');
    $('#grid_list_user_tags').jqxGrid('showloadelement');
    if (codigo === "no") {
        var source = {
            datatype: "array",
            datafields:
                    [
                        {name: 'varCodiUsua', type: 'string'},
                        {name: 'nombre', type: 'string'}
                    ], updaterow: function (rowid, rowdata, commit) {
                commit(true);
            }
        };
        dataAdapter = new $.jqx.dataAdapter(source);
        var editrow = -1;
        $("#grid_list_user_tags").jqxGrid({
            width: "100%",
            height: "200px",
            theme: 'darkblue',
            source: dataAdapter,
            columnsresize: true,
            columns: [
                {text: 'Id', dataField: 'varCodiUsua', width: 80},
                {text: 'Nombre', dataField: 'nombre', width: 385},
            ]
        });
        $("#grid_list_user_tags").jqxGrid('localizestrings', localizationobj);
    } else {
        $.ajax({
            type: 'POST',
            url: url + '/GestionUsuarios/public/index.php/muest_integrante_tags',
            data: {
                intIdTags: codigo
            },
            dataType: 'json',
            success: function (responses) {
                var source = {
                    datatype: "array",
                    localdata: responses.data,
                    datafields:
                            [
                                {name: 'varCodiUsua', type: 'string'},
                                {name: 'nombre', type: 'string'}
                            ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);
                var editrow = -1;
                $("#grid_list_user_tags").jqxGrid({
                    width: "100%",
                    height: "200px",
                    theme: 'darkblue',
                    source: dataAdapter,
                    columnsresize: true,
                    columns: [
                        {text: 'Id', dataField: 'varCodiUsua', width: 80},
                        {text: 'Nombre', dataField: 'nombre', width: 305},
                    ]
                });
            }
        });
    }
}
$("#list_noti_usuario").on('select', function (event) {
    cod_user_integrante = "";
    label_user_integrante = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            cod_user_integrante = item.value;
            label_user_integrante = item.label;
        }
    }
});
$("#agregar_integrantes_grupo").on('click', function () {
    let agru_tag = $('#list_noti_usuario').val();
    if (agru_tag === null) {
        mensaje(false, "Obligatorio seleccionar un Integrante", "no");
    } else {
        agre_grid_integrantes(cod_user_integrante, label_user_integrante);
    }
});
$("#guardar_lista_integrantes").on('click', function () {
    let nombre_grupo = $("#tag_crear_noti_grupos").val();
    let estilo = document.getElementById('tag_crear_noti_grupos').disabled;
    let user = obtener_user();
    let data_entera = $("#grid_list_user_tags").jqxGrid('getdatainformation');

    if (data_entera.rowscount > 0) {
        if (estilo === true) {
            if (tag_id) {
                $.ajax({
                    type: 'POST',
                    url: url + '/GestionUsuarios/public/index.php/modi_tags',
                    data: {
                        intIdTags: tag_id,
                        codi_usua: $("#grid_list_user_tags").jqxGrid('exportdata', 'json'),
                        acti_usua: user
                    },
                    dataType: 'json',
                    success: function (responses) {
                        if (responses.data.mensaje === "") {
                            mensaje(true, "Se guardo satisfactoriamente.", "modal-crear-grupos_notificacion");
                            listar_tag_user();
                        } else {
                            mensaje(false, responses.data.mensaje, "no");
                        }
                    }
                });
            }
        } else {
            if (nombre_grupo) {
                $.ajax({
                    type: 'POST',
                    url: url + '/GestionUsuarios/public/index.php/regis_tags',
                    data: {
                        varDescTags: nombre_grupo,
                        codi_usua: $("#grid_list_user_tags").jqxGrid('exportdata', 'json'),
                        acti_usua: user
                    },
                    dataType: 'json',
                    success: function (responses) {
                        if (responses.data.mensaje === "") {
                            mensaje(true, "Se guardo satisfactoriamente.", "modal-crear-grupos_notificacion");
                            listar_tag_user();
                        } else {
                            mensaje(false, responses.data.mensaje, "no");
                        }
                    }
                });
            } else {
                mensaje(false, "Ingrese nombre del grupo a crear", "no");
            }
        }
    } else {
        mensaje(false, "No hay data en la grilla", "no");
    }
});
$("#close_modal_crear_grupos").on('click', function () {
    $("#modal-crear-grupos_notificacion").modal('hide');
});
function agre_grid_integrantes(cod_user, label_user) {
    var mant_agre_grid = 0;
    var id_cod_user = cod_user;
    var id_label_user = label_user;
    if (jQuery('#grid_list_user_tags').jqxGrid('getrows').length > 0) {
        deta_json = $("#grid_list_user_tags").jqxGrid('exportdata', 'json');
        jQuery.each($.parseJSON(deta_json), function (idx, obj) {
            if (obj.Id === jQuery.trim(id_cod_user)) {
                mant_agre_grid = 1;
            }
        });
    }
    if (mant_agre_grid == 0) {
        if (id_cod_user == '' && id_label_user == '') {
            mensaje(false, "Error Integrante es obligatorio antes de agregar.", "no");
        } else {
            var cont_deta_data = {};
            cont_deta_data["varCodiUsua"] = id_cod_user;
            cont_deta_data["nombre"] = id_label_user;
            jQuery("#grid_list_user_tags").jqxGrid('addrow', null, cont_deta_data);
        }
    } else {
        mensaje(false, "Integrante ya se encuentra agregado", "no");
    }
}
$("#agregar_nuevo_tag").on('click', function () {
    listar_integrantes_tag('no');
    $("#tag_noti_grupos").jqxDropDownList('selectIndex', -1);
    $("#tag_crear_noti_grupos").val('');
    document.getElementById('tag_crear_noti_grupos').disabled = false;
    $("#list_noti_usuario").jqxDropDownList('selectIndex', -1);
});
$("#tag_noti_grupos").on('change', function (event) {
    var list_noti = "";
    var tag_name = "";
    tag_id = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            list_noti = item.value;
            tag_name = item.label;
            tag_id = item.value;
            ;
        }
    }
    if (list_noti) {
        $("#tag_crear_noti_grupos").val(tag_name);
        document.getElementById('tag_crear_noti_grupos').disabled = true;
        listar_integrantes_tag(list_noti);
    } else {
        $("#tag_crear_noti_grupos").val('');
        document.getElementById('tag_crear_noti_grupos').disabled = false;
        listar_integrantes_tag('no');
    }
});
$("#agregar_grupos").on('click', function () {
    $("#modal-crear-grupos_notificacion").modal('show');
    $("#tag_crear_noti_grupos").val('');
    listar_integrantes_tag('no');
    $("#tag_noti_grupos").jqxDropDownList('selectIndex', -1);
    document.getElementById('tag_crear_noti_grupos').disabled = false;
    $("#list_noti_usuario").jqxDropDownList('selectIndex', -1);
});
$("#close_clav").on('click', function () {
    $("#claveactual").val('');
    $("#clavenuevo").val('');
    $("#claveconfirmar").val('');
});
var localizationobj = {};
localizationobj.percentsymbol = "%";
localizationobj.currencysymbol = "S/";
localizationobj.currencysymbolposition = "before";
localizationobj.decimalseparator = ".";
localizationobj.thousandsseparator = "";
localizationobj.pagergotopagestring = "IR A PAG =";
localizationobj.pagershowrowsstring = "MOSTRAR FILAS =";
localizationobj.pagerrangestring = " DE ";
localizationobj.pagerpreviousbuttonstring = "PREVIO";
localizationobj.pagernextbuttonstring = "SIGUIENTE";
localizationobj.groupsheaderstring = "ARRASTRE UNA COLUMNA PARA AGRUPAR";
localizationobj.sortascendingstring = "ORDERNAR ASC";
localizationobj.sortdescendingstring = "ORDENAR DES";
localizationobj.sortremovestring = "QUITAR ORDEN";
localizationobj.groupbystring = "AGRUPAR POR ESTA COLUMNA";
localizationobj.groupremovestring = "QUITAR DE GRUPOS";
localizationobj.filterclearstring = "LIMPIAR";
localizationobj.filterstring = "FILTRO";
localizationobj.filtershowrowstring = "MOSTRAR FILA DONDE =";
localizationobj.filtershowrowdatestring = "MOSTRAR FILE DONDE FECHA =";
localizationobj.filterorconditionstring = "O";
localizationobj.filterandconditionstring = "Y";
localizationobj.filterselectallstring = "(SELECCIONAR TODO)";
localizationobj.filterchoosestring = "POR FAVOR SELECCIONE:";
localizationobj.filterstringcomparisonoperators = ['VACIO', 'NO VACIO', 'CONTENGA', 'CONTENGA(COINCIDIR MAYUSCULAS/MINISCULAS)', 'NO CONTENGA', 'NO CONTENGA (COINCIDIR MAYUSCULAS/MINISCULAS)', 'INICIA CON', 'INICIA CON(COINCIDIR MAYUSCULAS/MINISCULAS)', 'TERMINA CON', 'TERMINA CON (COINCIDIR MAYUSCULAS/MINISCULAS)', 'IGUAL', 'IGUAL(COINCIDIR MAYUSCULAS/MINISCULAS)', 'NULO', 'NO NULO'];
localizationobj.filternumericcomparisonoperators = ['=', '!=', '<', '<=', '>', '>=', 'NULO', 'NO NULO'];
localizationobj.filterdatecomparisonoperators = ['=', '!=', '<', '<=', '>', '>=', 'NULO', 'NO NULO'];
localizationobj.filterbooleancomparisonoperators = ['=', '!='];
localizationobj.validationstring = "VALOR NO VALIDO";
localizationobj.emptydatastring = "NO HAY REGISTROS QUE MOSTRAR";
localizationobj.filterselectstring = "SELECCIONE UN FILTRO";
localizationobj.loadtext = "CARGANDO…";
localizationobj.clearstring = "LMPIAR";
localizationobj.todaystring = "HOY";
var days = {
    names: ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"],
    namesAbbr: ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"],
    namesShort: ["DO", "LU", "MA", "MI", "JU", "VI", "SA"]
};
localizationobj.days = days;
var months = {
    names: ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE", ""],
    namesAbbr: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC", ""]
};
localizationobj.months = months;

var camp_actu = 0;
var camp_inic = "";
var camp_fina = "";
var fech_venc = "";
var data_menu = {};
var data_subt = {};
var data_mess = [
    {"mess_nomb": "ENERO", "mess_valu": "01"},
    {"mess_nomb": "FEBRERO", "mess_valu": "02"},
    {"mess_nomb": "MARZO", "mess_valu": "03"},
    {"mess_nomb": "ABRIL", "mess_valu": "04"},
    {"mess_nomb": "MAYO", "mess_valu": "05"},
    {"mess_nomb": "JUNIO", "mess_valu": "06"},
    {"mess_nomb": "JULIO", "mess_valu": "07"},
    {"mess_nomb": "AGOSTO", "mess_valu": "08"},
    {"mess_nomb": "SEPTIEMBRE", "mess_valu": "09"},
    {"mess_nomb": "OCTUBRE", "mess_valu": "10"},
    {"mess_nomb": "NOVIEMBRE", "mess_valu": "11"},
    {"mess_nomb": "DICIEMBRE", "mess_valu": "12"},
];
function notificaciones_tiempo_real() {

    // ws = new WebSocket("wss://mimcoapps.mimco.com.pe:8090/");
    ws = new WebSocket('wss://' + window.location.hostname + '/wss2/');
    ws.onopen = function () {
        // Websocket is connected
        ws.send("Notificacion");
    };
    // Websocket is connected
}


// ws = new WebSocket('wss://'+window.location.hostname+':8090/');
//ws = new WebSocket('wss://mimcoapps.mimco.com.pe:8090/','https');
ws = new WebSocket('wss://' + window.location.hostname + '/wss2/');
/*
 var ws = new WebSocket('wss://localhost:15449/', {
 protocolVersion: 8,
 origin: 'https://localhost:15449',
 rejectUnauthorized: false
 });
 */
/*
 ws.onopen = function () {
 // Websocket is connected
 console.log("Websocket connected");
 ws.send("Hello World");
 console.log("Message sent");
 
 }; 
 */
ws.onmessage = function (event) {
    var as = JSON.parse(event.data);
    var varible = "";
    for (var i in as) {
        varible = as[i];
    }
    if (varible === "Notificacion") {
        noti_usua();
        noti_usua_windows();
    }
};
$("#libro").on('click', function () {
    $("#modal-libros").modal('show');
});
$("#subir_archivo_icon_2").click(function () {
    $("#subir_archivo_2").trigger('click');
});
document.getElementById("subir_archivo_2").onchange = function () {
    document.getElementById("nombre_archivo_2").value = this.value;
};
/*
 ws.onclose = function () {
 // websocket is closed.
 console.log("Connection closed");
 };        
 */

 