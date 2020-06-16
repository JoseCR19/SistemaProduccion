var url = location.protocol + '//' + location.host;
var data = [];
/**Accede a la función validar usuario */
$('#valida').click(function () {
    validar_usuario();
});
function validar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla === 13){
        validar_usuario();
    }
}
/**
 * Función para poder validar usuario
 */
function validar_usuario() {
    let Usuario = $('#usuario').val();
    let Password = $('#contraseña').val();

    if (Usuario !== "" && Password !== "") {
        jQuery.ajaxSetup({
            async: false
        });
        jQuery.post(
                url + '/MimcoSeguridad/public/index.php/vali_usua', {
                    cache: Math.random(),
                    codi_usua: jQuery.trim(jQuery("#usuario").val()),
                    clav_usua: jQuery.trim(jQuery("#contraseña").val())
                },
                function (html) {
                    if (html.mensaje) {
                        Swal.fire({
                            type: 'error',
                            title: 'Ups...',
                            text: html.mensaje,
                            cancelButtonColor: '#d33',
                        });
                    } else {
                        let nombre_usuario = html.varNombUsua;
                        let apellido_usuario = html.varApelUsua;
                        let token_usuario = html.intIdUsuaToke;
                        let codigo_usuario = html.varCodiUsua;
                        let seguridad_usuario = html.varSecrUsua;
                        let id_usuario = html.intIdUsua;
                        let dni= html.DNI;
                        data = [{
                                nombre_usuario: nombre_usuario,
                                apellido_usuario: apellido_usuario,
                                token_usuario: token_usuario,
                                codigo_usuario: codigo_usuario,
                                seguridad_usuario: seguridad_usuario,
                                id_usuario: id_usuario,
                                dni:dni
                            }];
                        localStorage.setItem("nombre", JSON.stringify(data));
                        if (localStorage.getItem("nombre")) {
                            let usuario = JSON.parse(localStorage.getItem("nombre"));
                            document.location.href = url + "/SistemaProduccion/Principal";
                        }
                    }
                }, "json");
    }
    if (Usuario === "" && Password === "") {
        Swal.fire({
            title: '<strong>Ingrese su Usuario y Contraseña</strong>',
            type: 'warning',
            width: '300px',
        })
    } else if (Password === "") {
        Swal.fire({
            title: '<strong>Ingrese su Contraseña</strong>',
            type: 'warning',
            width: '300px',
        })
    } else if (Usuario === "") {
        Swal.fire({
            title: '<strong>Ingrese su Usuario</strong>',
            type: 'warning',
            width: '300px',
        })
    }
}
