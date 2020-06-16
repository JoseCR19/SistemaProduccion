var id = "";
function lista_notificaciones() {
    let usuario = JSON.parse(localStorage.getItem("nombre"));
    id = usuario[0]['codigo_usuario'];
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/noti_usua',
        data: {
            codi_usua: id
        },
        dataType: 'json',
        success: function (responses) {
            console.log(responses);
            var lista_noti = "";
            for (var i = 0; responses.data.length > i; i++) {
                if (responses.data[i]['intIdEsta'] === 3) {
                    if (i < 1) {
                        lista_noti += '<a onClick=ver_info_noti("' + responses.data[i]['intIdNoti'] + '","' + id + '","' + responses.data[i]['intIdEsta'] + '") class="nav-link active" id="' + responses.data[i]['intIdNoti'] + id + '" data-toggle="pill" href="#' + responses.data[i]['intIdNoti'] + '" role="tab" aria-controls="' + responses.data[i]['intIdNoti'] + '" aria-selected="true">' +
                                '<i class="far fa-envelope" style="color:red"></i> ' + responses.data[i]['modu_prog'] +
                                '<div class="text-center">' + responses.data[i]['asun_noti'] + '</div>' +
                                '</a>';
                    } else {
                        lista_noti +=
                                '<a class="nav-link "  onClick=ver_info_noti("' + responses.data[i]['intIdNoti'] + '","' + id + '","' + responses.data[i]['intIdEsta'] + '") id="' + responses.data[i]['intIdNoti'] + id + '" data-toggle="pill" href="#' + responses.data[i]['intIdNoti'] + '" role="tab" aria-controls="' + responses.data[i]['intIdNoti'] + '" aria-selected="false">' +
                                '<i class="far fa-envelope" style="color:red"></i> ' + responses.data[i]['modu_prog'] +
                                '<div class="text-center">' + responses.data[i]['asun_noti'] + '</div>' +
                                '</a>';
                    }
                } else {
                    if (i < 1) {
                        lista_noti +=
                                '<a class="nav-link  active" onClick=ver_info_noti("' + responses.data[i]['intIdNoti'] + '","' + id + '","' + responses.data[i]['intIdEsta'] + '") id="' + responses.data[i]['intIdNoti'] + id + '" data-toggle="pill" href="#' + responses.data[i]['intIdNoti'] + '" role="tab" aria-controls="' + responses.data[i]['intIdNoti'] + '" aria-selected="true">' +
                                '<i class="fas fa-inbox" ></i> ' + responses.data[i]['modu_prog'] +
                                '<div class="text-center">' + responses.data[i]['asun_noti'] + '</div>' +
                                '</a>';
                    } else {
                        lista_noti +=
                                '<a class="nav-link" onClick=ver_info_noti("' + responses.data[i]['intIdNoti'] + '","' + id + '","' + responses.data[i]['intIdEsta'] + '") id="' + responses.data[i]['intIdNoti'] + id + '" data-toggle="pill" href="#' + responses.data[i]['intIdNoti'] + '" role="tab" aria-controls="' + responses.data[i]['intIdNoti'] + '" aria-selected="false">' +
                                '<i class="fas fa-inbox" ></i> ' + responses.data[i]['modu_prog'] +
                                '<div class="text-center">' + responses.data[i]['asun_noti'] + '</div>' +
                                '</a>';
                    }
                }
                if (i < 1) {
                    ver_info_noti(responses.data[i]['intIdNoti'], id, responses.data[i]['intIdEsta']);
                }
                $("#v-pills-tab").html(lista_noti);
            }
        }
    });
}
function ver_info_noti(id_noti, user, estado) {
    var estado_no = 0;

    estado_no = parseInt(estado);
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/most_info_noti',
        data: {
            intIdNoti: id_noti,
            codi_usua: user
        },
        dataType: 'json',
        success: function (responses) {
            console.log(responses);
            $('#' + id_noti + user).html('<i class="fas fa-inbox" ></i>' + responses.data[0].modu_prog + '<div class="text-center">' + responses.data[0].asun_noti + '</div>');
            if (estado_no === 3) {
                noti_usua();
            }
            if (responses.data[0].varNombarch) {
                $("#url_descarga").attr('href', url + '/Documentos/Proyectos/' + responses.data[0].varDetaArch + '/PartList/Cabecera/' + responses.data[0].varNombarch + '.xls');
                document.getElementById('descarga_noti').style = 'display:block';
            } else {
                document.getElementById('descarga_noti').style = 'display:none';
            }
            if (responses.data[0].ruta_prog) {
            } else {
                document.getElementById('redireccionar_noti').style = 'display:none';
            }
            document.getElementById('compartir_noti').style = 'display:none';
            document.getElementById('comentarios_noti').style = 'display:none';
            $("#modulo_prin").html(responses.data[0].modu_prog);
            $("#usuario_noti_prin").html(responses.data[0].nombre);
            $("#nom_fecha_prin").html(responses.data[0].acti_hora);
            $("#titulo_prin").html(responses.data[0].asun_noti);
            $("#descripcion_prin").html(responses.data[0].varDescNoti);
            validar_imagen(url + '/Documentos/Perfil/' + responses.data[0].acti_usua + '.jpg');
        }
    });
}
function validar_imagen(url) {
    console.log(url);
    $("#img_profile").html('');
    $.ajax({
        url: url,
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        },
        error: function ()
        {
            $("#img_profile").html('<img id="img_profile" class="profile-user-img  img-circle img-responsive img-bordered-sm"  src="imagenes-mimco/logo_mimco_sac.png" width="120" height="100">');
        },
        success: function () {
            $("#img_profile").html('<img id="img_profile" class="profile-user-img  img-circle img-responsive img-bordered-sm" src="' + url + '" width="120" height="100">');
        }
    });
}

function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}