var data = [];
var dataAdapter = "";
var numero_ot = "";
var ot_excel = "";
var ot_splite = "";
var codigoot = "";
var check_items_zona = [];
var codigoproducto = "";
var check_zona = "";
var check_zona_nomb = "";
var check_tarea = "";
var check_tarea_nomb = "";

var check_tipo_carga = "";

/*
 function dropDownlist() {
 $("#zona").jqxDropDownList({checkboxes: true, width: 200, height: 30, placeHolder: "SELECCIONE"});
 $("#programa").jqxDropDownList({checkboxes: true, width: 200, height: 30, placeHolder: "SELECCIONE"});
 }
 */

//TIPO DE CARGA
$("#carga").on('change', function (event) {
    check_tipo_carga = "";
    var item = event.target;
    check_tipo_carga = item.value;

    if (check_tipo_carga == "COMPONENTES") {
        if (codigoproducto == "" && codigoot == "") {

        } else {
            $("#zona_mostrar").css("display", "block");
            $("#tarea_mostrar").css("display", "block");
            listar_zona(codigoproducto, codigoot);
            listar_programa(codigoproducto, codigoot, check_zona);
        }

    } else {
        $("#zona_mostrar").css("display", "none");
        $("#tarea_mostrar").css("display", "none");
        $("#zona_part").jqxComboBox('clear');
        $("#zona_part").jqxComboBox('selectIndex', -1);
        $("#programa_part").jqxComboBox('clear');
        $("#programa_part").jqxComboBox('selectIndex', -1);
    }

});

$("#txt_ot_2").on('change', function (event) {
    numero_ot = "";
    codigoot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            numero_ot = item.label;//nombre de la OT
            $("#ot").val(numero_ot);
            codigoot = item.value; //id del proyecto
            //check_items_zona = [];


        }
    }

    if (check_tipo_carga == "COMPONENTES") {
        if (codigoot) {
            if (codigoproducto === "") {

            } else {

                listar_zona(codigoproducto, codigoot);
            }
        }
    }

});



$("#producto").on('change', function (event) {

    codigoproducto = "";

    if (event.target) {
        var item = event.target;
        if (item) {
            codigoproducto = item.value;

        }
    }

    if (check_tipo_carga == "COMPONENTES") {
        if (codigoproducto) {
            if (codigoot === "") {

            } else {

                listar_zona(codigoproducto, codigoot);
            }
        }
    }

});

$("#zona_part").on('change', function (event) {

    check_zona = "";
    check_zona_nomb = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {

            check_zona = item.value;
            check_zona_nomb = item.label;
            $("#zona_part_php").val(check_zona_nomb);
        }
    }
    if (check_tipo_carga == "COMPONENTES") {
        if (check_zona) {
            listar_programa(codigoproducto, codigoot, check_zona);
        } else {

            $("#programa_part").jqxComboBox('clear');
            $("#programa_part").jqxComboBox('selectIndex', -1);

        }

    }

});

$("#programa_part").on('change', function (event) {

    check_tarea = "";
    check_zona_nomb = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_tarea = item.value;
            check_tarea_nomb = item.label;
            $("#programa_part_php").val(check_tarea_nomb);
        }
    }
});



function combo_producto() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_prod',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            va = '<option value="0" disabled="" selected="">Seleccione</option>';
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdTipoProducto + '">' + responses.data[c]
                        .varDescTipoProd + '</option>';
                $("#producto").html(va);
                $("#producto2").html(va);
            }
            $("#producto").val('0');
            $("#producto2").val('1');
            //codigoproducto = $("#producto").val('1');
            //alert(codigoproducto);

        }
    });
}


$("#carga").on('change', function () {
    if (this.value === "PARTLIST") {
        $("#colocar_ruta").attr('href', 'Formatos_excel/PartList.csv').attr('download', 'PartList.csv');
        document.getElementById('inlineRadio2').disabled = false;
    } else if (this.value === "COMPONENTES") {
        $("#colocar_ruta").attr('href', 'Formatos_excel/Componentes.csv').attr('download', 'Componentes.csv');
        document.getElementById('inlineRadio2').disabled = true;
    }
});
$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Part List", true);
});
$("#excel2").click(function () {
    var data = $("#grid2").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Errores", true);
});
/**FUNCION PARA PODER CARGAR LOS DATOS BASICOS COMO EL NOMBRE Y EL APELLIDO DEL USUARIO*/
function cargardata_user() {
    let usuario = JSON.parse(localStorage.getItem("nombre"));
    for (const i in usuario) {
        id = usuario[i]['codigo_usuario'];
        va +=
                usuario[i]['nombre_usuario'] + ' ' +
                usuario[i]['apellido_usuario'];
    }
    $("#nombre_user").val(id);
}
$("#subir_archivo_icon").click(function () {
    $("#subir_archivo").trigger('click');
});
$("#descripcion_1").change(function () {
    //alert($("#descripcion").val());
    $("#descripcion_1").removeClass('is-invalid');
    validar_descripcion_ot($("#descripcion_1").val().toUpperCase());
});

$("#buscar_entidades").click(function () {
    cargar_part_list();
});
$("#limpiar_part_list").on('click', function () {
    limpiar_campos();
});
$("#reload").click(function () {
    limpiar_campos();
    
    $('#home-tab').removeClass('disabled');
    $('#home-tab').addClass('active');
    $('#profile-tab').removeClass('active');
    $('#profile-tab').addClass('disabled');
    $('#home').fadeIn();
    $('#profile').fadeOut();
});

$("#form_register").on('submit', function (e) {
    e.preventDefault();
    if ($("#carga").val() == "PARTLIST" && $("#inlineRadio").is(':checked')) {
        $('#modal-cargar-partlist').modal('show');
        $.ajax({
            url: 'VALIDAR',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            success: function (html) {
                if (html.validacion.length) {
                    $('#profile').fadeIn();
                    mensaje(false, "Hay Erroes en el EXCEL", "modal-cargar-partlist");
                    let valdaciones = [];
                    valdaciones = html.validacion;
                    var data = new Array();
                    for (var i = 0; i < valdaciones.length; i++) {
                        var row = {};

                        var data_new = valdaciones[i];
                        row["esta_mens"] = jQuery.trim(data_new);
                        data[i] = row;
                    }
                    //$('#modal-cargar-partlist').modal('hide');
                    limpiar_campos();
                    $('#home-tab').removeClass('active');
                    $('#home-tab').addClass('disabled');
                    $('#profile-tab').removeClass('disabled');
                    $('#profile-tab').addClass('active');
                    $("#home").hide();
                    var source = {
                        localdata: data,
                        datatype: "array",
                        datafields: [
                            {name: 'esta_mens', type: 'string'},
                        ]
                    };
                    dataAdapter = new $.jqx.dataAdapter(source);
                    $("#grid2").jqxGrid({
                        width: '100%',
                        height: '300',
                        showfilterrow: true,
                        source: dataAdapter,
                        filterable: true,
                        theme: 'darkblue',
                        selectionmode: 'multiplecellsextended',
                        sortable: true,
                        columns: [
                            {text: 'MENSAJE', datafield: 'esta_mens', width: '100%'},
                        ]
                    });
                    $("#grid2").jqxGrid('localizestrings', localizationobj);

                } else {

                    if (html.mensaje == "Carga de Partlist Satisfactoria.") {
                        limpiar_campos();
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(true, html.mensaje, "no");
                    } else if (html.mensaje == "* TODO LOS CAMPOS SON OBLIGATORIOS") {

                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* EL CODIGO DE OT NO EXISTE") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* NO HAY DATOS EN EL ARCHIVO") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* NO HA CARGADO NINGUN ARCHIVO") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    }
                }
            }
        });
    } else if ($("#inlineRadio2").is(':checked') && $("#carga").val() == "PARTLIST") {
        $('#modal-cargar-partlist').modal('show');
        $.ajax({
            url: 'ACTUALIZAR',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            success: function (html) {

                if (html.validacion.length) {
                    mensaje(false, "Hay Erroes en el EXCEL", "modal-cargar-partlist");
                    let valdaciones = [];
                    valdaciones = html.validacion;
                    var data = new Array();
                    for (var i = 0; i < valdaciones.length; i++) {
                        var row = {};

                        var data_new = valdaciones[i];
                        row["esta_mens"] = jQuery.trim(data_new);

                        data[i] = row;
                    }
                    //$('#modal-cargar-partlist').modal('hide');
                    limpiar_campos();
                    $('#home-tab').removeClass('active');
                    $('#home-tab').addClass('disabled');
                    $('#profile-tab').removeClass('disabled');
                    $('#profile-tab').addClass('active');
                    $("#home").hide();
                    $('#profile').fadeIn();
                    var source = {
                        localdata: data,
                        datatype: "array",
                        datafields: [
                            {name: 'esta_mens', type: 'string'},
                        ]
                    };
                    dataAdapter = new $.jqx.dataAdapter(source);
                    $("#grid2").jqxGrid({
                        width: '100%',
                        height: '300',
                        showfilterrow: true,
                        source: dataAdapter,
                        filterable: true,
                        selectionmode: 'multiplecellsextended',
                        sortable: true,
                        theme: 'darkblue',
                        columns: [
                            {text: 'MENSAJE', datafield: 'esta_mens', width: '100%'},
                        ]
                    });
                    $("#grid2").jqxGrid('localizestrings', localizationobj);

                } else {
                    if (html.mensaje == "* TODO LOS CAMPOS SON OBLIGATORIOS") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* EL CODIGO DE OT NO EXISTE") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* NO HAY DATOS EN EL ARCHIVO") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* NO HA CARGADO NINGUN ARCHIVO") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "Carga de Partlist Satisfactoria.") {
                        limpiar_campos();
                        file_part_list = html.file;
                        $('#modal-cargar-partlist').modal('hide');
                        alert('ingresa aca');
                        mensaje_noti(true, html.mensaje, "no");
                    }
                }
            }
        });

    } else if ($("#carga").val() == "COMPONENTES" && $("#inlineRadio").is(':checked')) {
        $('#modal-cargar-partlist').modal('show');
        $.ajax({
            url: 'REGISTRAR_COMPONENTE',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            success: function (html) {
                if (html.validacion.length) {
                    $('#profile').fadeIn();
                    mensaje(false, "Hay Erroes en el EXCEL", "modal-cargar-partlist");
                    let valdaciones = [];
                    valdaciones = html.validacion;
                    var data = new Array();
                    for (var i = 0; i < valdaciones.length; i++) {
                        var row = {};

                        var data_new = valdaciones[i];
                        row["esta_mens"] = jQuery.trim(data_new);

                        data[i] = row;
                    }
                    //$('#modal-cargar-partlist').modal('hide');
                    limpiar_campos();
                    $('#home-tab').removeClass('active');
                    $('#home-tab').addClass('disabled');
                    $('#profile-tab').removeClass('disabled');
                    $('#profile-tab').addClass('active');
                    $("#home").hide();

                    var source = {
                        localdata: data,
                        datatype: "array",
                        datafields: [
                            {name: 'esta_mens', type: 'string'}
                        ]
                    };
                    dataAdapter = new $.jqx.dataAdapter(source);
                    $("#grid2").jqxGrid({
                        width: '100%',
                        height: '300',
                        showfilterrow: true,
                        source: dataAdapter,
                        filterable: true,
                        selectionmode: 'multiplecellsextended',
                        sortable: true,
                        theme: 'darkblue',
                        columns: [
                            {text: 'MENSAJE', datafield: 'esta_mens', width: '100%', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid2").jqxGrid('getrows');
                                                    return count.length;

                                                }
                                    }]},
                        ]
                    });
                    $("#grid2").jqxGrid('localizestrings', localizationobj);

                } else {
                    if (html.mensaje == "* TODO LOS CAMPOS SON OBLIGATORIOS") {

                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* EL CODIGO DE OT NO EXISTE") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* NO HAY DATOS EN EL ARCHIVO") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* NO HA CARGADO NINGUN ARCHIVO") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "Carga de Partlist Satisfactoria.") {
                        limpiar_campos();
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(true, html.mensaje, "no");
                    }
                }
            }
        });
    } else if ($("#inlineRadio2").is(':checked') && $("#carga").val() == "COMPONENTES") {
        $('#modal-cargar-partlist').modal('show');
        $.ajax({
            url: 'ACTUALIZAR_COMPONENTE',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            success: function (html) {
                if (html.validacion.length) {
                    mensaje(false, "Hay Erroes en el EXCEL", "modal-cargar-partlist");
                    let valdaciones = [];
                    valdaciones = html.validacion;
                    var data = new Array();
                    for (var i = 0; i < valdaciones.length; i++) {
                        var row = {};

                        var data_new = valdaciones[i];
                        row["esta_mens"] = jQuery.trim(data_new);

                        data[i] = row;
                    }
                    //$('#modal-cargar-partlist').modal('hide');
                    limpiar_campos();
                    $('#home-tab').removeClass('active');
                    $('#home-tab').addClass('disabled');
                    $('#profile-tab').removeClass('disabled');
                    $('#profile-tab').addClass('active');
                    $("#home").hide();
                    $('#profile').fadeIn();
                    var source = {
                        localdata: data,
                        datatype: "array",
                        datafields: [
                            {name: 'esta_mens', type: 'string'},
                        ]
                    };
                    dataAdapter = new $.jqx.dataAdapter(source);
                    $("#grid2").jqxGrid({
                        width: '100%',
                        height: '300',
                        showfilterrow: true,
                        source: dataAdapter,
                        filterable: true,
                        selectionmode: 'multiplecellsextended',
                        sortable: true,
                        theme: 'darkblue',
                        columns: [
                            {text: 'MENSAJE', datafield: 'esta_mens', width: '100%', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid2").jqxGrid('getrows');
                                                    return count.length;

                                                }
                                    }]}
                        ]
                    });
                    $("#grid2").jqxGrid('localizestrings', localizationobj);

                } else {
                    if (html.mensaje == "* TODO LOS CAMPOS SON OBLIGATORIOS") {

                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* EL CODIGO DE OT NO EXISTE") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* NO HAY DATOS EN EL ARCHIVO") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "* NO HA CARGADO NINGUN ARCHIVO") {
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje(false, html.mensaje, "modal-cargar-partlist");
                    } else if (html.mensaje == "Carga de Partlist Satisfactoria.") {
                        limpiar_campos();
                        $('#modal-cargar-partlist').modal('hide');
                        mensaje_noti(true, html.mensaje, "no");
                    }
                }
            }
        });
    } else if ($("#carga").val() == "PARTLIST") {
        var respuesta = "";
        $.ajax({
            url: 'VALIDAR_CAMPOS',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            success: function (html) {
                respuesta = html.mensaje;
                if (respuesta == "CAMPOS LLENOS") {

                } else {
                    mensaje(false, respuesta, "no");
                }
            }
        });
    } else if ($("#carga").val() === "COMPONENTES") {
        var respuesta = "";
        $.ajax({
            url: 'VALIDAR_CAMPOS',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            success: function (html) {
                respuesta = html.mensaje;
                if (respuesta == "CAMPOS LLENOS") {

                } else {
                    mensaje(false, respuesta, "no");
                }
            }
        });
    } else {
        var respuesta = "";
        $.ajax({
            url: 'VALIDAR_CAMPOS',
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'json',
            success: function (html) {
                respuesta = html.mensaje;
                if (respuesta == "CAMPOS LLENOS") {
                } else {
                    mensaje(false, respuesta, "no");
                }
            }
        });
    }
});




$("#txt_ot").on('change', function (event) {
    ot_excel = "";
    ot_splite = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            ot_excel = item.label;
            ot_splite = ot_excel.split(' /');
            ot_excel = ot_splite[0];
        }
    }
});
function limpiar_campos() {
    $("#txt_ot_2").jqxComboBox('clearSelection');
    $("#producto").val('0');
    $("#carga").val('');
    document.getElementById('descripcion_1').value='';
    $("#descripcion_1").val('');
    $("#subir_archivo").val('');
    $("#nombre_archivo").val('');
    $("#subir_archivo_icon").val('');

    //coloco andy
    $("#zona_mostrar").css("display", "none");
    $("#tarea_mostrar").css("display", "none");
    $("#zona_part").jqxComboBox('clear');
    $("#zona_part").jqxComboBox('selectIndex', -1);
    $("#programa_part").jqxComboBox('clear');
    $("#programa_part").jqxComboBox('selectIndex', -1);

}
;
function cargar_part_list() {
    let nro_ot = $("#txt_ot").val().trim();
    let id_producto = $("#producto2").val();
    if (nro_ot) {
        if (id_producto) {
            $.ajax({
                type: 'POST',
                //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
                url: url + '/GestionPartList/public/index.php/list_partlist',
                dataType: 'json',
                data: {
                    intIdProy: nro_ot,
                    intIdTipoProducto: parseInt(id_producto),
                },
                /*beforeSend: function (xhr) {
                 xhr.setRequestHeader('Authorization', access_token);
                 },*/
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError == "Internal Server Error") {
                        listar_agrupacion();
                    }
                },
                success: function (responses) {

                    var source = {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'acti_hora', type: 'date', format: 'dd/MM/yyyy'},
                            {name: 'acti_usua', type: 'string'},
                            {name: 'boolActu', type: 'bool'},
                            {name: 'boolNuevo', type: 'bool'},
                            {name: 'intIdProy', type: 'number'},
                            {name: 'varArchivo', type: 'string'},
                            {name: 'varDescripcion', type: 'string'},
                            {name: 'vartipoDocu', type: 'string'},
                        ], updaterow: function (rowid, rowdata, commit) {
                            commit(true);
                        }
                    };
                    dataAdapter = new $.jqx.dataAdapter(source);
                    var editrow = -1;
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '300',
                        showfilterrow: true,
                        source: dataAdapter,
                        filterable: true,
                        theme: 'darkblue',
                        selectionmode: 'multiplecellsextended',
                        sortable: true,

                        columns: [
                            {text: 'Número', datafield: 'intIdProy', width: '5%', cellsalign: 'center', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                            {text: 'Descipción', datafield: 'varDescripcion', width: '32%', cellsalign: 'center'},
                            {text: 'Archivo', datafield: 'varArchivo', cellsalign: 'left', width: '20%', cellsalign: 'center'},
                            {text: 'Usuario', datafield: 'acti_usua', width: '10%', cellsalign: 'center'},
                            {text: 'Fecha Registro', datafield: 'acti_hora', width: '10%', cellsalign: 'center', cellformat: 'dd/MM/yyyy'},
                            {text: 'Nuevo', datafield: 'boolNuevo', width: '6%', columntype: 'checkbox', cellsalign: 'center'},
                            {text: 'Actualizado', datafield: 'boolActu', width: '7%', columntype: 'checkbox', cellsalign: 'center'},
                            {text: 'Tipo Documento', datafield: 'vartipoDocu', width: '7%', cellsalign: 'center'},
                            {
                                text: 'Excel', datafield: 'Excel', columntype: 'button', width: '10%', cellsrenderer: function () {
                                    return "EXCEL";
                                }, buttonclick: function (row) {
                                    editrow = row;
                                    var offset = $("#grid").offset();
                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                                    if (dataRecord.vartipoDocu === "COMPONENTE") {
                                        window.location.href = url + '/Documentos/Proyectos/' + ot_excel + '/PartList/Detalle/' + dataRecord.varArchivo;

                                    } else {
                                        window.location.href = url + '/Documentos/Proyectos/' + ot_excel + '/PartList/Cabecera/' + dataRecord.varArchivo;
                                    }
                                }
                            }
                        ]
                    });
                    $("#grid").jqxGrid('localizestrings', localizationobj);
                }
            });
        } else {
            mensaje(false, "Seleccione un TIPO ELEMENTO");
        }
    } else {
        mensaje(false, "Seleccione una O.T");
    }

}
;
document.getElementById("subir_archivo").onchange = function () {
    document.getElementById("nombre_archivo").value = this.value;
};
function listar_part_list() {
    $("#grid").jqxGrid({
        width: '100%',
        height: '100',
        showfilterrow: true,
        filterable: true,
        selectionmode: 'multiplecellsextended',
        sortable: true,
        theme: 'darkblue',
        columns: [
            {text: 'Número', width: '5%', cellsalign: 'center'},
            {text: 'Descipción', width: '32%'},
            {text: 'Archivo', cellsalign: 'left', width: '30%'},
            {text: 'Usuario', width: '10%'},
            {text: 'Fecha Registro', width: '10%'},
            {text: 'Nuevo', width: '6%'},
            {text: 'Actualizado', width: '7%'}
        ]
    });
    $("#grid").jqxGrid('localizestrings', localizationobj);
}
function listar_data_list_proyectos() {
    $.ajax({
        type: 'GET',
        //url: url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionPartList/public/index.php/List_proy_vige',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                list_data();
            }
        },
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_ot").jqxComboBox({
                source: dataAdapter,
                theme: 'light',
                width: '200px',
                height: '38px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_2").jqxComboBox({
                source: dataAdapter,
                theme: 'light',
                width: '200px',
                height: '38px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"

            });

        }
    });
}
function validar_descripcion_ot(descripcion) {
    if (descripcion != "") {
        $.ajax({
            type: 'POST',
            //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
            url: url + '/GestionPartList/public/index.php/vali_nomb_part_list',
            dataType: 'json',
            data: {
                varDescripcion: descripcion
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    validar_descripcion_ot(descripcion);
                }
            },
            success: function (responses) {

                if (responses.data.mensaje != "Exito.") {
                    mensaje(false, responses.data.mensaje, "no");
                    $("#descripcion_1").val("");
                }
            }
        });
    }
}



function listar_zona(codigo_producto, codigo_ot) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_zona_asoc_proy',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_zona(codigo_producto, codigo_ot);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "Error.") {
                $("#zona_part").jqxDropDownList('clear');
                $("#programa_part").jqxDropDownList('clear');
            } else {
                var new_zona = [];
                var arra_new2 = [];
                for (let j = 0; j < responses.data.length; j++) {
                    arra_new2.push(responses.data[j]);
                }
                arra_new2.pop();
                new_zona = arra_new2.reverse();

                var source =
                        {
                            localdata: new_zona,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdProyZona'},
                                {name: 'varDescrip'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#zona_part").jqxComboBox({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 35, placeHolder: "SELECCIONAR:"});
                $("#zona_part").jqxComboBox('focus');
                $("#zona_part").jqxComboBox('selectIndex', 0);
            }
        }
    });
}

function listar_programa(codigo_producto, codigo_ot, zona) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_tare_asoc_proy_sin_array',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            intIdProyZona: zona
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_programa(codigo_producto, codigo_ot, zona);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "Error.") {
                $("#programa_part").jqxDropDownList('clear');
            } else {
                //responses.data.push({varDescripTarea:'TODOS',intIdProyTarea:-1});
                responses.data.pop();
                responses.data.reverse();
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdProyTarea'},
                                {name: 'varDescripTarea'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#programa_part").jqxComboBox({source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 35, placeHolder: "SELECCIONAR:"});
                $("#programa_part").jqxComboBox('focus');
                $("#programa_part").jqxComboBox('selectIndex', 0);
            }
        }
    });
}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

//Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + '\r\n';
    }

//1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV === '') {

        return;
    }

//Generate a file name
    var fileName = "Mi_Reporte_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}