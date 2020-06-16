var rango_fechas = 0;
var tipo_orden_value = 0;
var rango_fechas = 0;
//HORA  Y DIA
var now = new Date();
var idPeriodo_prueba = "";
var day_galv = ("0" + now.getDate()).slice(-2);
var month_galv = ("0" + (now.getMonth() + 1)).slice(-2);
var diaactual = now.getFullYear() + "-" + (month_galv) + "-" + (day_galv);
var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia = moment(firstDay).format('YYYY-MM-DD');
/*
 $('#fech_inic_galv').val(primerdia);
 $('#fech_fin_galv').val(diaactual);
 */
var label_proyecto = "";
var tipo_orden_value = "";
var codi_proy_galv = "";
var codi_elem_galv = "";
var tipo_orden_galv_nuev = "";
var proy_os_galv_nuev = "";
var tipo_orden_galv_nuev_label = "";
var tipo_orden_value_label = "";
var peso_negro_label = "";
var peso_galv_label = "";
var total_consumo = 0;
var porce_consumo = 0;
var total_cantidad = 0;
var total_cantidad_estado = 0;
//PARA EDITAR 
var peso_negro_label_edit = 0;
var peso_galv_label_edit = 0;
var tipo_mate_edit = "";
var total_consumo_edit = 0;
var porce_consumo_edit = 0;
var var_tipo_mate_edit = "";
var total_cantidad_edit = 0;
var rango_fecha_final = "";
var rango_fecha_inicio = "";

var idPeriodo_prueba = "";

$("#tipo_orden_galv").on('change', function (event) {
    label_proyecto = "";
    $("#txt_ot_galv").jqxComboBox('clearSelection');
    $("#txt_ot_galv").jqxComboBox('clear');

    if (event.args) {
        var item = event.args.item;
        if (item) {
            tipo_orden_value = item.value;
            tipo_orden_value_label = item.label;

        }
        if (tipo_orden_value === "1") {
            $("#mostrarOT").removeClass('hidde_grid');
            $("#mostrarCN").addClass('hidde_grid');
            $("#mostrar_tipo_elemento").removeClass('hidde_grid');
            label_proyecto = "O.T";
            listar_data_list_proyectos_OT();
            combo_producto();
        } else {
            label_proyecto = "O.S";
            $("#mostrarOT").addClass('hidde_grid');
            $("#mostrarCN").removeClass('hidde_grid');
            $("#mostrar_tipo_elemento").addClass('hidde_grid');
            $("#producto_galv").jqxDropDownList('clearSelection');
            $("#producto_galv").jqxDropDownList('clear');
            listar_data_list_proyectos_OS();
        }
    }
    $("#grid_galv").jqxGrid('clear');

});
$("#txt_ot_galv").on('change', function (event) {
    codi_proy_galv = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            codi_proy_galv = item.value;

        }
    }
    $("#grid_galv").jqxGrid('clear');
});
$("#producto_galv").on('change', function (event) {
    codi_elem_galv = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            codi_elem_galv = item.value;

        }
    }
    $("#grid_galv").jqxGrid('clear');
});
//FECHA DE INICIO 
$("#fech_inic_galv").on('change', function (event) {
    rango_fecha_inicio = "";
    // console.log(event.target);
    var item = event.target;
    if (item) {
        rango_fecha_inicio = item.value;

        $("#grid_galv").jqxGrid('clear');
    }

});
//FECHA DE FINAL 
$("#fech_fin_galv").on('change', function (event) {
    rango_fecha_final = "";
    var item = event.target;
    if (item) {
        rango_fecha_final = item.value;

        $("#grid_galv").jqxGrid('clear');
    }
});

//LISTAR OT 
function listar_data_list_proyectos_OT() {
    var array_ot = new Array();
    $.ajax({
        type: 'GET',
        //, http://192.168.0.120:8081
        url: url + '/GestionProyectos/public/index.php/obtener_ot_erp',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_data_list_proyectos();
            }
        },
        success: function (responses) {

            $("#txt_ot_galv").jqxComboBox('clear');
            $("#txt_ot_galv").jqxComboBox('clearSelection');
            if (responses.data.length > 0) {

                responses.data.push({intIdProy: -1, varCodiProy: 'TODOS'});

                var source =
                        {
                            localdata: responses.data.reverse(),
                            datatype: "array",
                            datafields: [
                                {name: 'varCodiProy'},
                                {name: 'intIdProy'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#txt_ot_galv").jqxComboBox({
                    source: dataAdapter,
                    width: '90%',
                    height: '30px',
                    selectionMode: 'dropDownList',
                    placeHolder: "Seleccione",
                    displayMember: "varCodiProy",
                    valueMember: "intIdProy"
                });
                $("#txt_ot_galv").jqxComboBox('focus');

                $("#txt_ot_galv").jqxComboBox({selectedIndex: 0});
            } else {
                $("#txt_ot_galv").jqxComboBox({
                    source: dataAdapter,
                    width: '90%',
                    height: '30px',
                    selectionMode: 'dropDownList',
                    placeHolder: "Seleccione",
                    displayMember: "varCodiProy",
                    valueMember: "intIdProy"
                });
                $("#txt_ot_galv").jqxComboBox('focus');
            }


        }
    });
}
//LISTAR OS
function listar_data_list_proyectos_OS() {
    var array_ot = new Array();
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionProyectos/public/index.php/obtener_ot_os_g',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            $("#txt_ot_galv").jqxComboBox('clear');
            $("#txt_ot_galv").jqxComboBox('clearSelection');

            if (responses.data.length > 0) {
                responses.data.push({varCodiProy: 'TODOS', intIdProy: -1});
                var source =
                        {
                            localdata: responses.data.reverse(),
                            datatype: "array",
                            datafields: [
                                {name: 'varCodiProy'},
                                {name: 'intIdProy'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#txt_ot_galv").jqxComboBox({
                    source: dataAdapter,
                    width: '90%',
                    height: '30px',
                    selectionMode: 'dropDownList',
                    placeHolder: "Seleccione",
                    displayMember: "varCodiProy",
                    valueMember: "intIdProy"
                });
                $("#txt_ot_galv").jqxComboBox('focus');
                $("#txt_ot_galv").jqxComboBox({selectedIndex: 0});
            }
        }


    });
}
function combo_producto() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_prod',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdTipoProducto'},
                            {name: 'varDescTipoProd'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#producto_galv").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 180, height: 30});
            // Focus the jqxDropDownList
            $("#producto_galv").jqxDropDownList('focus');
            $("#producto_galv").jqxDropDownList('selectIndex', 0);
        }
    });
}
function combo_tipo_orden() {
    var tipo_anulacion = [{'value_tipo_orden': 1, 'label': 'MIMCO'}, {'value_tipo_orden': 2, 'label': 'TERCERO'}];

    var source =
            {
                localdata: tipo_anulacion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_tipo_orden'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#tipo_orden_galv").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_tipo_orden", width: 150, height: 28});
    // Focus the jqxDropDownList

    $("#tipo_orden_galv").jqxDropDownList('focus');
    $("#tipo_orden_galv").jqxDropDownList('selectIndex', 0);



}
//buscar 
$("#btn_busc_galv").click(function () {
    // $("#modal-actua-galv").modal('show');
    //$("#modal-deta-cant").modal('show');
    let inicio_galv = $('#fech_inic_galv').val();
    let final_galv = $('#fech_fin_galv').val();
    let proy_galv = $("#txt_ot_galv").val();
    let tipo_orden = $("#tipo_orden_galv").val();
    let comb_pro = $("#producto_galv").val();

    var fechas_diferentes = 0;

    if (inicio_galv !== "" && final_galv !== "") {
        if (inicio_galv > final_galv) {
            $("#grid_galv").jqxGrid('clear');
            fechas_diferentes = 1;
            mensaje(false, "Fecha inicio debe ser menor a la fecha final", "no");
        }
    }


    if (fechas_diferentes === 0) {
        if (tipo_orden === "") {
            mensaje(false, "SELECCIONE EL TIPO DE ORDEN", "no");
        } else {
            if (proy_galv === "") {
                mensaje(false, "SELECCIONE LA " + label_proyecto, "no");
            } else {
                mostrar_listar_galvanillado(tipo_orden_value_label, proy_galv, comb_pro, inicio_galv, final_galv);
                //  console.log(tipo_orden, proy_galv, comb_pro, inicio_galv, final_galv);

            }
        }
    }

});
// REGISTRAR EL GALVANIZADO MODAL **************************************************
$("#nuev_galv").click(function () {
    listar_data_list_proyectos_nuevo_os();
    combo_tipo_orden_nuevo();
});
$("#nuevo_tipo_orden_galv").on('change', function (event) {
    tipo_orden_galv_nuev = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            tipo_orden_galv_nuev = item.value;
            tipo_orden_galv_nuev_label = item.label;
            // console.log(tipo_orden_galv_nuev_label);
            $("#nuevo_ot_galv").jqxComboBox('clear');
        }
        if (tipo_orden_galv_nuev === "1") {
            listar_data_list_proyectos_nuevo();
        }
    }
});
$("#nuevo_ot_galv").on('change', function (event) {
    proy_os_galv_nuev = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            proy_os_galv_nuev = item.value;
            obtener_dato_proy_os(proy_os_galv_nuev);

        }

    }
});
function combo_tipo_orden_nuevo() {
    var tipo_anulacion = [{'value_tipo_orden': 1, 'label': 'MIMCO'}, {'value_tipo_orden': 2, 'label': 'TERCERO'}];

    var source =
            {
                localdata: tipo_anulacion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_tipo_orden'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#nuevo_tipo_orden_galv").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_tipo_orden", width: 150, height: 27});
    // Focus the jqxDropDownList

    $("#nuevo_tipo_orden_galv").jqxDropDownList('focus');
    $("#nuevo_tipo_orden_galv").jqxDropDownList('selectIndex', 1);
    $('#nuevo_tipo_orden_galv').jqxDropDownList('disabled', true);



}
function listar_data_list_proyectos_nuevo_os() {
    $("#modal-cargar-galv").modal('show');
    var array_ot = new Array();
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionProyectos/public/index.php/obtener_os_erp',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            window.setTimeout(function () {

                $("#modal-cargar-galv").modal('hide'); // COLOCO ANDY 
            }, 500);



            $("#nuevo_ot_galv").jqxComboBox('clear');
            $("#nuevo_ot_galv").jqxComboBox('clearSelection');
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdProy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#nuevo_ot_galv").jqxComboBox({
                source: dataAdapter,
                width: '90%',
                height: '27px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdProy"
            });
            $("#nuevo_ot_galv").jqxComboBox('focus');
            $("#nuevo_ot_galv").jqxComboBox({selectedIndex: 0});
            $("#modal-registrar-galvanizado").modal('show');
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
function obtener_dato_proy_os(codi_proy) {


    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/obtener_os_id',
        dataType: 'json',
        data: {
            NUMERO: codi_proy,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
            }
        },
        success: function (responses) {

            $("#canti_total").val(responses.data[0].CANTIDAD);
            $("#peso_neto_total_galva").val(responses.data[0].PESO_ESTRUCTURA);
            $("#peso_bruto_total_galva").val(responses.data[0].PESO_ESTRUCTURA);
            $("#razon_social_galva").val(responses.data[0].RAZON_SOCIAL);
        }
    });


}
$("#guar_galv_nuevo_boto").click(function () {
    let tipo_orden_nuevo = $('#nuevo_tipo_orden_galv').val();
    let proy_os = $("#nuevo_ot_galv").val();
    let descrip_nuev = $("#descrip_galv").val();
    let cant_proy_nuev = $("#canti_total").val();
    let peso_neto_nuev = $("#peso_neto_total_galva").val();
    let peso_brut_nuev = $("#peso_bruto_total_galva").val();
    let razo_soci_nuev = $("#razon_social_galva").val();



    if (proy_os === "") {
        mensaje(false, "SELECCIONE EL O.S", "no");
    } else {
        if (descrip_nuev === "") {
            mensaje(false, "INGRESE LA DESCRIPCION", "no");
        } else {
            guardar_galvanizado(tipo_orden_galv_nuev_label, proy_os, descrip_nuev, cant_proy_nuev, peso_neto_nuev, peso_brut_nuev, razo_soci_nuev);
            //  console.log(tipo_orden_galv_nuev_label, proy_os, descrip_nuev, cant_proy_nuev, peso_neto_nuev, peso_brut_nuev, razo_soci_nuev);
        }
    }
});
$("#close_galv_nuev").click(() => {
    limpiar_nuevo_galv();
});
function limpiar_nuevo_galv() {
    $("#descrip_galv").val('');
    $("#canti_total").val('');
    $("#peso_neto_total_galva").val('');
    $("#peso_bruto_total_galva").val('');
    $("#razon_social_galva").val('');
}
function guardar_galvanizado(tipo_orden_nuevo2, proy_os2, descrip_nuev2, cant_proy_nuev2, peso_neto_nuev2, peso_brut_nuev2, razo_soci_nuev2) {
    let user = obtener_user();

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/crear_galvanizado',
        dataType: 'json',
        data: {
            varOrdenServi: proy_os2,
            varTipoOrden: tipo_orden_nuevo2,
            varRazoSoci: razo_soci_nuev2,
            varDescripcion: descrip_nuev2.toUpperCase(),
            intCantTota: cant_proy_nuev2,
            deciPesoInge: peso_neto_nuev2,
            deciPesoBruto: peso_brut_nuev2,
            acti_usua: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data == "") {
                $("#modal-registrar-galvanizado").modal('hide');
                mensaje(true, "GUARDADO CON EXITO", "no");
                limpiar_nuevo_galv();
                listar_data_list_proyectos_OS();
                $("#tipo_orden_galv").jqxDropDownList('selectIndex', 1);
                // mostrar_listar_galvanillado(tipo_orden_nuevo2, proy_os2, codi_elem_galv);
                mostrar_listar_galvanillado('TERCERO', '-1', codi_elem_galv, rango_fecha_inicio, rango_fecha_final);
            } else {
                mensaje(true, responses.data, "no");
            }
        }
    });

}
function mostrar_listar_galvanillado(tipo_orden2, proy_galv2, comb_pro2, inicio_galv2, final_galv2) {
    $("#modal-cargar-galv").modal('show');
    $("#grid_galv").jqxGrid('clear');
    $('#grid_galv').on('bindingcomplete', function () {
        $('#grid_galv').jqxGrid('refreshaggregates');
        $('#grid_galv').jqxGrid('renderaggregates');
    });

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_galvanizado',
        dataType: 'json',
        data: {
            varTipoOrden: tipo_orden2,
            varOrdenServi: proy_galv2,
            intIdTipoProducto: parseInt(comb_pro2),
            dateFechIngr: inicio_galv2,
            dateFechSali: final_galv2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {

            }
        },
        success: function (responses) {
            var array_const = [];
            var total_consumozinc = 0;
            var contador_ = 0;
            if (responses.data.length > 0) {
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: "intIdGalva", type: "number"},
                                {name: "intIdUniNego", type: "number"},
                                {name: "varDescripcion", type: "string"},
                                {name: "unidad_negocio", type: "string"},
                                {name: "varTipoOrden", type: "string"},
                                {name: "intIdProy", type: "number"},
                                {name: "intIdTipoProducto", type: "number"},
                                {name: "varRazoSoci", type: "string"},
                                {name: "varOrdenServi", type: "string"},
                                {name: "varDescripcion", type: "string"},
                                {name: "dateFechIngr", type: "string"},
                                {name: "dateFechSali", type: "string"},
                                {name: "dateFechIntern", type: "string"},
                                {name: "varNumeGuia", type: "string"},
                                {name: "intCantTota", type: "number"},
                                {name: "intCantRegi", type: "string"},
                                {name: "deciPesoInge", type: "string"},
                                {name: "deciPesoBruto", type: "string"},
                                {name: "deciPesoNegro", type: "string"},
                                {name: "deciPesoGalv", type: "string"},
                                {name: "deciConsumoZinc", type: "string"},
                                {name: "varPorcZinc", type: "string"},
                                {name: "porcentajezinc", type: "string"},
                                {name: "acti_usua", type: "string"},
                                {name: "acti_hora", type: "string"},
                                {name: "usua_modi", type: "string"},
                                {name: "hora_modi", type: "string"},
                                {name: "varDescEsta", type: "string"},
                                {name: "varCodiProy", type: "string"},
                                {name: "varDescTipoProd", type: "string"},
                            ],
                            updaterow: function (rowid, rowdata, commit) {
                                commit(true);
                            }
                        };

                window.setTimeout(function () {
                    $("#modal-cargar-galv").modal('hide');

                    $("#btn_cerr_galv").trigger('click');
                }, 1000);
                var dataAdapter = new $.jqx.dataAdapter(source);


                var descargar_archivo = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_galv").jqxGrid('getrowdata', editrow);
                    var html = "";
                    html = '<center><button class="btn btn-danger btn-sm" onClick=agregar_galv("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-plus-circle"></i></button>' +
                            '<button class="btn btn-danger btn-sm" onClick=editar_galv("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-edit"></i></button></center>';
                    return html;
                };
                if (tipo_orden2 === "TERCERO") {
                    $("#grid_galv").jqxGrid({
                        width: '100%',
                        height: '100%',
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        selectionmode: 'multiplecellsextended',
                        sortable: true,
                        theme: 'darkblue',
                        showstatusbar: true,
                        statusbarheight: 25,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {text: 'Opciones', width: '8%', datafield: 'Descargar', cellsrenderer: descargar_archivo, cellsalign: 'center', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {
                                                    var count = $("#grid_galv").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                            {text: '#', width: '4%', datafield: 'intIdGalva', cellasign: 'center', hidden: true},
                            {text: 'Uni.Nego', width: '8%', datafield: 'intIdUniNego', hidden: true},
                            {text: 'Tipo Orden', width: '8%', datafield: 'varTipoOrden', hidden: true},
                            {text: 'Proyecto_id', width: '8%', datafield: 'intIdProy', hidden: true},
                            {text: 'Proyecto', width: '8%', datafield: 'varCodiProy', hidden: true},
                            {text: 'T.elemento_id', width: '8%', datafield: 'intIdTipoProducto', hidden: true},
                            {text: 'T.Elemento', width: '8%', datafield: 'varDescTipoProd', hidden: true},
                            {text: 'O.Servicio', datafield: 'varOrdenServi'},
                            {text: 'Cliente', width: '25%', datafield: 'varRazoSoci'},

                            {text: 'Descripcion', width: '10%', datafield: 'varDescripcion'},
                            {text: 'Fech.Ingr', width: '12%', datafield: 'dateFechIngr'},
                            {text: 'Fech.Sali', width: '12%', datafield: 'dateFechSali'},
                            {text: 'Fecha.Inter', width: '12%', datafield: 'dateFechIntern'},
                            {text: 'Numero Guia', width: '10%', datafield: 'varNumeGuia', hidden: true},
                            {text: 'Cantidad', width: '10%', datafield: 'intCantTota', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {
                                                    var total = 0;
                                                    total = parseFloat(record['intCantTota']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Cant. Registrar', width: '8%', datafield: 'intCantRegi', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['intCantRegi']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Peso Ingenieria', width: '10%', datafield: 'deciPesoInge', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoInge']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Peso Bruto', width: '10%', datafield: 'deciPesoBruto', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Peso Negro', width: '10%', datafield: 'deciPesoNegro', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoNegro']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Peso Galvanizado', width: '10%', datafield: 'deciPesoGalv', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;

                                                    total = parseFloat(record['deciPesoGalv']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);


                                                    return total;
                                                }
                                    }]},
                            {text: 'Consumo(ZINC)', width: '10%', datafield: 'deciConsumoZinc', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciConsumoZinc']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'ZINC(%)_fake', width: '10%', datafield: 'varPorcZinc', cellformat: "c3", hidden: true, aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;

                                                    return total;
                                                }
                                    }]},
                            {text: 'ZINC(%)', datafield: 'porcentajezinc', width: 170, aggregatesrenderer: function (aggregates, column, element) {
                                    var sumQuantity = $("#grid_galv").jqxGrid('getcolumnaggregateddata', 'deciConsumoZinc', ['sum']);
                                    var sumPrice = $("#grid_galv").jqxGrid('getcolumnaggregateddata', 'deciPesoNegro', ['sum']);
                                    sum = (sumQuantity.sum / sumPrice.sum) * 100;
                                    total = parseFloat(sum).toFixed(3);
                                    if (total === 'NaN') {
                                        return '';
                                    } else {
                                        return total;
                                    }

                                }
                            },
                            {text: 'idEstado', width: '10%', datafield: 'intIdEsta', hidden: true},
                            {text: 'Estado', width: '10%', datafield: 'varDescEsta'},
                            {text: 'Creado Por', width: '15%', datafield: 'acti_usua'},
                            {text: 'Fecha creado', width: '15%', datafield: 'acti_hora'},
                            {text: 'Modificado Por', width: '15%', datafield: 'usua_modi'},
                            {text: 'Fecha Modificado', width: '15%', datafield: 'hora_modi'},
                        ]
                    });

                } else if (tipo_orden2 === "MIMCO") {
                    var numero_guia = function (row, column, value, rowKey, rowData) {
                        var editrow = row;
                        var dataRecord = $("#grid_galv").jqxGrid('getrowdata', editrow);
                        var html = "";
                        html = '<center><button class="btn btn-danger btn-sm" onClick=numero_guia_galv("' + editrow + '");><i class="fas fa-paste"></i>' + value + '</button></center>';
                        ;

                        return html;
                    };


                    $("#grid_galv").jqxGrid('refreshaggregates');
                    $("#grid_galv").jqxGrid('renderaggregates');
                    $("#grid_galv").jqxGrid({
                        width: '100%',
                        height: '100%',
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        showfilterrow: true,
                        filterable: true,
                        selectionmode: 'multiplecellsextended',
                        sortable: true,
                        theme: 'darkblue',
                        showstatusbar: true,
                        statusbarheight: 25,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {text: 'Opciones', width: '8%', datafield: 'Descargar', cellsrenderer: descargar_archivo, cellsalign: 'center', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {
                                                    var count = $("#grid_galv").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                            {text: '#', width: '4%', datafield: 'intIdGalva', cellasign: 'center', hidden: true},
                            {text: 'Uni.Nego', width: '8%', datafield: 'intIdUniNego', hidden: true},
                            {text: 'Proyecto_id', width: '8%', datafield: 'intIdProy', hidden: true},
                            {text: 'Proyecto', width: '8%', datafield: 'varCodiProy'},

                            {text: 'Tipo Orden', width: '8%', datafield: 'varTipoOrden', hidden: true},

                            {text: 'T.elemento_id', width: '8%', datafield: 'intIdTipoProducto', hidden: true},

                            {text: 'Unidad Negocio', width: '25%', datafield: 'unidad_negocio'},
                            {text: 'T.Elemento', width: '8%', datafield: 'varDescTipoProd', hidden: true},
                            {text: 'Cliente', width: '20%', datafield: 'varRazoSoci'},
                            {text: 'Descripcion', width: '25%', datafield: 'varDescripcion'},
                            {text: 'Numero Guia', width: '10%', datafield: 'varNumeGuia', cellsrenderer: numero_guia},
                            {text: 'O.Servicio', datafield: 'varOrdenServi', hidden: true},
                            {text: 'Fech.Ingr', width: '12%', datafield: 'dateFechIngr'},
                            {text: 'Fech.Sali', width: '12%', datafield: 'dateFechSali'},
                            {text: 'Fecha.Inter', width: '12%', datafield: 'dateFechIntern'},

                            {text: 'Cantidad', width: '7%', datafield: 'intCantTota', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['intCantTota']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Cant. Registrar', width: '8%', datafield: 'intCantRegi', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['intCantRegi']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Peso Ingenieria', width: '10%', datafield: 'deciPesoInge', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoInge']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Peso Bruto', width: '10%', datafield: 'deciPesoBruto', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Peso Negro', width: '10%', datafield: 'deciPesoNegro', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoNegro']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Peso Galvanizado', width: '10%', datafield: 'deciPesoGalv', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoGalv']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'Consumo(ZINC)', width: '10%', datafield: 'deciConsumoZinc', aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciConsumoZinc']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]},
                            {text: 'ZINC(%)_fake', width: '10%', datafield: 'varPorcZinc', format: "d3", hidden: true, aggregates: [{

                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;

                                                    return total;
                                                }
                                    }]},
                            {text: 'ZINC(%)', datafield: 'porcentajezinc', width: 170, aggregatesrenderer: function (aggregates, column, element) {
                                    var sumQuantity = $("#grid_galv").jqxGrid('getcolumnaggregateddata', 'deciConsumoZinc', ['sum']);
                                    var sumPrice = $("#grid_galv").jqxGrid('getcolumnaggregateddata', 'deciPesoNegro', ['sum']);
                                    sum = (sumQuantity.sum / sumPrice.sum) * 100;
                                    total = parseFloat(sum).toFixed(3);
                                    if (total === 'NaN') {
                                        return '';
                                    } else {
                                        return total;
                                    }

                                }
                            },
                            {text: 'idEstado', width: '10%', datafield: 'intIdEsta', hidden: true},
                            {text: 'Estado', width: '10%', datafield: 'varDescEsta'},
                            {text: 'Creado Por', width: '15%', datafield: 'acti_usua'},
                            {text: 'Fecha creado', width: '15%', datafield: 'acti_hora'},
                            {text: 'Modificado Por', width: '15%', datafield: 'usua_modi'},
                            {text: 'Fecha Modificado', width: '15%', datafield: 'hora_modi'},
                        ]
                    });

                }

                $("#grid_galv").jqxGrid('localizestrings', localizationobj);

            } else {

                window.setTimeout(function () {

                    $("#modal-cargar-galv").modal('hide');

                }, 1000);


                mensaje(false, "No hay dato para mostrar", "no");
                $("#grid_galv").jqxGrid('clear');
            }

        }
    });

}

//AGREGAR (MODAL)
// VALORIZACION 
function combo_repo_valo() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_peri_valo_abie',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_inicio_valo();
            }
        },
        success: function (responses) {
            // console.log(responses);
            //console.log(idPeriodo_prueba);
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdPeriValo'},
                            {name: 'varCodiPeriValo'}
                        ]
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#repo_valo_galv").jqxDropDownList({source: dataAdapter, displayMember: "varCodiPeriValo", valueMember: "intIdPeriValo", width: 200, height: 27, });
            // $("#repo_valo_galv").jqxDropDownList('selectIndex', 0);
            // $("#repo_valo_galv").jqxDropDownList('focus');
            $("#repo_valo_galv").val(idPeriodo_prueba);
            $("#repo_valo_galv").jqxDropDownList({disabled: true});
        }
    });
}
function combo_turno() {
    var tipo_anulacion = [{'value_turno': 'TURNO 1', 'label': 'TURNO 1'}, {'value_turno': 'TURNO 2', 'label': 'TURNO 2'}];

    var source =
            {
                localdata: tipo_anulacion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_turno'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#turn_galv_agre").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_turno", width: 170, height: 27});
    // Focus the jqxDropDownList

    $("#turn_galv_agre").jqxDropDownList('focus');
    $("#turn_galv_agre").jqxDropDownList('selectIndex', 0);


}
function tipo_material() {
    var tipo_anulacion = [{'value_tipo_material': 'LIVIANO', 'label': 'LIVIANO'}, {'value_tipo_material': 'SEMIPESADO', 'label': 'SEMIPESADO'}, {'value_tipo_material': 'PESADO', 'label': 'PESADO'}];

    var source =
            {
                localdata: tipo_anulacion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_tipo_material'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#tipo_mate_agre").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_tipo_material", width: 150, height: 27});
    // Focus the jqxDropDownList

    $("#tipo_mate_agre").jqxDropDownList('focus');
    $("#tipo_mate_agre").jqxDropDownList('selectIndex', 0);

}


// GUARDA EL AGREGAR 
$("#peso_negr_agre").on('change', function (event) {
    peso_negro_label = "";
    $("#consu_zinc_agre").val('');
    $("#consu_porc_agre").val('');
    //$("#agre_galv_boton").prop("disabled", false);
    if (event.target) {
        var label = event.target.value;
        if (label) {

            peso_negro_label = parseFloat(label);

        }
        if (peso_negro_label) {
            if (peso_galv_label) {
                total_consumo = parseFloat(peso_galv_label) - parseFloat(peso_negro_label);
                porce_consumo = (total_consumo / peso_negro_label) * 100;
                $("#consu_zinc_agre").val(total_consumo.toFixed(3));
                $("#consu_porc_agre").val(porce_consumo.toFixed(3) + "%");
                /* if (total_consumo < 0) {
                 mensaje(false, "PESO GALVANIZADO DEBE SER MAYOR QUE EL PESO NEGRO", "no");
                 $("#agre_galv_boton").prop("disabled", true);
                 }*/
            }

        }

    }
});
$("#peso_galv_agre").on('change', function (event) {
    peso_galv_label = "";
    $("#consu_zinc_agre").val('');
    $("#consu_porc_agre").val('');
    // $("#agre_galv_boton").prop("disabled", false);
    total_consumo = 0;
    porce_consumo = 0;
    if (event.target) {
        var label = event.target.value;
        if (label) {

            peso_galv_label = parseFloat(label);
            //  console.log(peso_galv_label);
        }
        if (peso_galv_label) {
            if (peso_negro_label) {
                total_consumo = peso_galv_label - peso_negro_label;
                porce_consumo = (total_consumo / peso_negro_label) * 100;
                $("#consu_zinc_agre").val(total_consumo.toFixed(3));
                $("#consu_porc_agre").val(porce_consumo.toFixed(3) + "%");
                /*if (total_consumo < 0) {
                 mensaje(false, "PESO GALVANIZADO DEBE SER MAYOR QUE EL PESO NEGRO", "no");
                 $("#agre_galv_boton").prop("disabled", true);
                 }*/
            }

        }
    }
});
function agregar_galv(idgalv) {
    var dataRecord = $("#grid_galv").jqxGrid('getrowdata', idgalv);
    // console.log(dataRecord);
    total_cantidad_edit = 0;
    // console.log(typeof dataRecord.varCodiProy);
    if (dataRecord.varCodiProy === "" || typeof dataRecord.varCodiProy === "undefined" || dataRecord.varCodiProy === null) {
        $("#mostrar_ot_galv").addClass('hidde_grid');
        $("#mostrar_os_galv").removeClass('hidde_grid');
        $("#proy_ot_galv").val(dataRecord.varOrdenServi);
        $("#most_camp_num_guia_galv").addClass('hidde_grid');
        $("#numero_guia_galv").val(dataRecord.varNumeGuia);
    } else {
        $("#mostrar_ot_galv").removeClass('hidde_grid');
        $("#mostrar_os_galv").addClass('hidde_grid');
        $("#proy_ot_galv").val(dataRecord.varCodiProy);
        $("#most_camp_num_guia_galv").removeClass('hidde_grid');
        $("#numero_guia_galv").val(dataRecord.varNumeGuia);
    }

    $("#descripcion_galv").val(dataRecord.varDescripcion);
    $("#cliente_galv").val(dataRecord.varRazoSoci);
    $("#idgalva_deta_galv").val(dataRecord.intIdGalva);
    $("#cant_total_deta_galv").val(dataRecord.intCantTota);
    total_cantidad_edit = dataRecord.intCantTota;
    detalle_galv(dataRecord.intIdGalva);
    $("#modal-deta-galv").modal('show');
}
function detalle_galv(idGalvanizado) {

    $("#modal-cargar-galv").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_galvanizado_detalle',
        dataType: 'json',
        data: {
            intIdGalva: idGalvanizado,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: "intIdGalva", type: "number"},
                            {name: "intIdDetaGalv", type: "number"},
                            {name: "intIdPeriValo", type: "string"},
                            {name: "varTipoGalv", type: "string"},

                            {name: "intGanchera", type: "number"},
                            {name: "varTurno", type: "string"},
                            {name: "varHoraEntr", type: "string"},
                            {name: "varHoraSali", type: "string"},
                            {name: "intCantidad", type: "string"},
                            {name: "varTipoMate", type: "string"},
                            {name: "deciPesoNegro", type: "string"},
                            {name: "deciPesoGalv", type: "string"},
                            {name: "ConsumoPesoG", type: "string"},
                            {name: "deciConsumoZinc", type: "string"},
                            {name: "varPorcZinc", type: "number"},
                            {name: "dateFechInic", type: "string"},
                            {name: "dateFechSali", type: "string"},
                            {name: "acti_usua", type: "string"},
                            {name: "acti_hora", type: "string"},
                            {name: "usua_modi", type: "string"},
                            {name: "hora_modi", type: "string"},
                            {name: "intIdEsta", type: "number"},
                            {name: "varDescEsta", type: "string"},
                            {name: "varDescPeriValo", type: "string"}
                        ],
                        updaterow: function (rowid, rowdata, commit) {
                            commit(true);
                        }
                    };

            $("#grid_deta_galv").jqxGrid('clear');
            var dataAdapter = new $.jqx.dataAdapter(source);
            window.setTimeout(function () {
                $("#modal-cargar-galv").modal('hide');
            }, 1000);

            var descargar_editar = function (row, column, value, rowKey, rowData) {
                var editrow = row;
                var dataRecord = $("#grid_deta_galv").jqxGrid('getrowdata', editrow);
                var html = "";
                html = '<center><button class="btn btn-danger btn-sm" onClick=editar_galv_hijo("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-edit"></i></button></center>';
                return html;
            };

            $("#grid_deta_galv").jqxGrid({
                width: '100%',
                height: '350px',
                source: dataAdapter,
                selectionmode: 'multiplecellsextended',
                theme: 'darkblue',
                showfilterrow: true,
                filterable: true,

                showstatusbar: true,
                statusbarheight: 25,
                altrows: true,
                columnsresize: true,
                showaggregates: true,
                showgroupaggregates: true,

                columns: [
                    {text: 'Opciones', width: '8%', datafield: 'Descargar', cellsrenderer: descargar_editar, cellsalign: 'center', aggregates: [{
                                '<b>Total</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var count = $("#grid_deta_galv").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: '#', width: '4%', datafield: 'intIdGalva', cellasign: 'center', hidden: true},
                    {text: 'Detalle Galvanizado', width: '8%', datafield: 'intIdDetaGalv', cellasign: 'center', hidden: true},
                    {text: 'Peri Valo_ID', width: '10%', datafield: 'intIdPeriValo', hidden: true},
                    {text: 'Peri Valo', width: '25%', datafield: 'varDescPeriValo'},
                    {text: 'Tipo Galvanizado', width: '25%', datafield: 'varTipoGalv'},
                    {text: 'Ganchera', width: '8%', datafield: 'intGanchera'},
                    {text: 'Turno', width: '8%', datafield: 'varTurno'},
                    {text: 'H.Entrada', width: '8%', datafield: 'varHoraEntr'},
                    {text: 'H.Salida', width: '8%', datafield: 'varHoraSali'},
                    {text: 'Cantidad', width: '10%', datafield: 'intCantidad', aggregates: [{
                                '<b>Cant</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            if (record['varTipoGalv'] === "GALVANIZADO") {
                                                total_cantidad = parseFloat(record['intCantidad']) + parseFloat(aggregatedValue);
                                                total_cantidad = parseFloat(total_cantidad);
                                            }


                                            return total_cantidad;

                                        }
                            }]},
                    {text: 'Tipo Materia', width: '12%', datafield: 'varTipoMate'},
                    {text: 'Peso Negro', width: '12%', datafield: 'deciPesoNegro', aggregates: [{

                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {


                                            if (record['varTipoGalv'] === "GALVANIZADO") {
                                                total = parseFloat(record['deciPesoNegro']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                            }


                                            return total;
                                        }
                            }]},
                    {text: 'Peso Galvanizado', width: '12%', datafield: 'deciPesoGalv', aggregates: [{

                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {


                                            if (record['varTipoGalv'] === "GALVANIZADO") {
                                                total = parseFloat(record['deciPesoGalv']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                            }

                                            return total;
                                        }
                            }]},
                    {text: 'Consumo Zinc', width: '10%', datafield: 'deciConsumoZinc', aggregates: [{

                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciConsumoZinc']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Zinc (%)', width: '10%', datafield: 'varPorcZinc', 
                        aggregatesrenderer: function (aggregates, column, element,record) {
                            console.log(record);
                            var sumQuantity = $("#grid_deta_galv").jqxGrid('getcolumnaggregateddata', 'deciConsumoZinc', ['sum']);
                            var sumPrice = $("#grid_deta_galv").jqxGrid('getcolumnaggregateddata', 'ConsumoPesoG', ['sum']);
                            
                            sum = (sumQuantity.sum / sumPrice.sum )*100;
                            if(sum==='NaN'){
                                return '';
                            }else{
                                total =  parseFloat(sum).toFixed(3);
                                return total;
                            }
                            
                        }},
                    {text: 'Fecha Inicio', width: '15%', datafield: 'ConsumoPesoG', hidden: true,},
                    {text: 'Fecha Inicio', width: '15%', datafield: 'dateFechInic'},
                    {text: 'Fecha Salida', width: '15%', datafield: 'dateFechSali'},
                    {text: 'Creado Por', width: '15%', datafield: 'acti_usua'},
                    {text: 'Fecha creado', width: '17%', datafield: 'acti_hora'},
                    {text: 'Modificado Por', width: '15%', datafield: 'usua_modi'},
                    {text: 'Fecha Modificado', width: '17%', datafield: 'hora_modi'},
                    {text: 'idEstado', width: '10%', datafield: 'intIdEsta', hidden: true,
                        aggregates: [{
                                '<b>Cant_estado</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            if (record['varTipoGalv'] === "GALVANIZADO") {

                                                if ((record['varDescEsta'] === "TERMINADO" || record['varDescEsta'] === "VERIFICADO")) {

                                                    total_cantidad_estado = parseInt(record['intCantidad']) + total_cantidad_estado;
                                                    // total_cantidad_estado = total_cantidad_estado);
                                                }

                                            }


                                            return total_cantidad_estado;
                                        }
                            }]},
                    {text: 'Estado', width: '15%', datafield: 'varDescEsta'}
                ]
            });
            //$("#grid_deta_galv").jqxGrid('localizestrings', localizationobj);
        }
    });
}
$("#btn_cerrar_detalle_galvanizado_abajo").click(function () {
    total_cantidad = 0;
    mostrar_listar_galvanillado(tipo_orden_value_label, codi_proy_galv, codi_elem_galv, rango_fecha_inicio, rango_fecha_final);

});
function tipo_galvanizado() {

    var tipo_galv = [{'value_tipo_galv': 'GALVANIZADO', 'label': 'GALVANIZADO'}, {'value_tipo_galv': 'FLUXADO', 'label': 'FLUXADO'}, {'value_tipo_galv': 'RE-GALVANIZADO', 'label': 'RE-GALVANIZADO'}];

    var source =
            {
                localdata: tipo_galv,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_tipo_galv'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#id_tipo_galv").jqxDropDownList({placeHolder: "SELECCIONE", template: "primary", source: dataAdapter, displayMember: "label", valueMember: "value_tipo_galv", width: 150, height: 27});
    // Focus the jqxDropDownList

    $("#id_tipo_galv").jqxDropDownList('focus');
    //$("#id_tipo_galv").jqxDropDownList('selectIndex', 0);
}
//AGREGAR DETALLE GALVANIZADO
$("#agregar_detalle_galvanizado").click(function () {
    $("#id_tipo_galv").jqxDropDownList('clear');
    $("#id_tipo_galv").jqxDropDownList('clearSelection');
    tipo_galvanizado();
    $("#modal-pregunta-tipo-galv").modal('show');



});
//SALIR DE LA PREGUNTA 
$("#close_btn_clear_tipo_galv").click(function () {
    $("#id_tipo_galv").jqxDropDownList('clear');
    $("#id_tipo_galv").jqxDropDownList('clearSelection');
    $("#modal-pregunta-tipo-galv").modal('hide');
});
//ACEPTA LA PREGUNTA 
$("#opci_acep_tipo_galv").click(function () {
    $("#modal-pregunta-tipo-galv").modal('hide');
    let idtipogalv = $("#id_tipo_galv").val();
    let idgalvanizado = $("#idgalva_deta_galv").val();
    let cantidad_total_almacenado = $("#cant_total_deta_galv").val();
    ahorasi_periodo_valorizacion_oficial(obtener_user());


    if (idtipogalv === "") {
        mensaje(false, "INGRESE EL  TIPO GALVANIZADO", "no");
    } else if (idtipogalv === "GALVANIZADO") {


        if (parseInt(total_cantidad) >= parseInt(cantidad_total_almacenado)) {
            mensaje(false, "LA CANTIDAD TOTAL LLEGO AL LIMITE", "no")
        } else {
            if (idPeriodo_prueba !== 0) {
                $("#mostrar_nombre_gal").removeClass('hidde_grid');
                $("#mostrar_nombre_gal_2").removeClass('hidde_grid');
                $("#mostrar_nombre_flu").addClass('hidde_grid');
                $("#mostrar_nombre_flu_2").addClass('hidde_grid');

                combo_repo_valo();
                combo_turno();
                tipo_material();
                $("#ganc_agre").val(0);
                $("#tipo_galv_agre").val(idtipogalv);
                $("#idGalv_agre").val(idgalvanizado);
                $("#fecha_ingr_agre").val(diaactual);
                //HORA DE ENTRADA
                $("#hora_entra_agre").jqxDateTimeInput({value: null, width: '250px', height: '25px', formatString: 'hh:mm tt', showTimeButton: true, showCalendarButton: false, template: 'primary'});
                //HORA DE SALIDA
                $("#hora_sali_agre").jqxDateTimeInput({value: null, width: '250px', height: '25px', formatString: 'hh:mm tt', showTimeButton: true, showCalendarButton: false, template: 'primary'});
                $("#canti_galv_alma").val(cantidad_total_almacenado);
                $("#canti_hijo_alma").val(total_cantidad);
                $("#modal-agregar-galvanizado").modal('show');
            } else if (idPeriodo_prueba === 0) {
                mensaje(false, "No se puede registrar, No hay perido de valorización", "no");
            }
        }

    } else if (idtipogalv === "RE-GALVANIZADO") {
        if (total_cantidad === 0) {
            mensaje(false, "NO HAY UN GALVANIZADO EN LA GRILLA", "no");
        } else {

            if (idPeriodo_prueba !== 0) {
                $("#mostrar_nombre_gal").removeClass('hidde_grid');
                $("#mostrar_nombre_gal_2").removeClass('hidde_grid');
                $("#mostrar_nombre_flu").addClass('hidde_grid');
                $("#mostrar_nombre_flu_2").addClass('hidde_grid');

                combo_repo_valo();
                combo_turno();
                tipo_material();
                $("#ganc_agre").val(0);
                $("#tipo_galv_agre").val(idtipogalv);
                $("#idGalv_agre").val(idgalvanizado);
                $("#fecha_ingr_agre").val(diaactual);
                //HORA DE ENTRADA
                $("#hora_entra_agre").jqxDateTimeInput({value: null, width: '250px', height: '25px', formatString: 'hh:mm tt', showTimeButton: true, showCalendarButton: false, template: 'primary'});
                //HORA DE SALIDA
                $("#hora_sali_agre").jqxDateTimeInput({value: null, width: '250px', height: '25px', formatString: 'hh:mm tt', showTimeButton: true, showCalendarButton: false, template: 'primary'});
                $("#canti_galv_alma").val(cantidad_total_almacenado);
                $("#canti_hijo_alma").val(total_cantidad);
                $("#modal-agregar-galvanizado").modal('show');
            } else if (idPeriodo_prueba === 0) {
                mensaje(false, "No se puede registrar, No hay perido de valorización", "no");
            }
        }

    } else {
        if (total_cantidad === 0) {
            mensaje(false, "NO HAY UN GALVANIZADO EN LA GRILLA", "no");
        } else {
            //   ahorasi_periodo_valorizacion_oficial(obtener_user());
            if (idPeriodo_prueba !== 0) {
                $("#mostrar_nombre_flu").removeClass('hidde_grid');
                $("#mostrar_nombre_flu_2").removeClass('hidde_grid');
                $("#mostrar_nombre_gal").addClass('hidde_grid');
                $("#mostrar_nombre_gal_2").addClass('hidde_grid');
                combo_repo_valo();
                combo_turno();
                tipo_material();
                $("#ganc_agre").val(0);
                $("#tipo_galv_agre").val(idtipogalv);
                $("#idGalv_agre").val(idgalvanizado);
                $("#fecha_ingr_agre").val(diaactual);
                //HORA DE ENTRADA
                $("#hora_entra_agre").jqxDateTimeInput({value: null, width: '250px', height: '25px', formatString: 'hh:mm tt', showTimeButton: true, showCalendarButton: false, template: 'primary'});
                //HORA DE SALIDA
                $("#hora_sali_agre").jqxDateTimeInput({value: null, width: '250px', height: '25px', formatString: 'hh:mm tt', showTimeButton: true, showCalendarButton: false, template: 'primary'});
                $("#canti_galv_alma").val(cantidad_total_almacenado);
                $("#canti_hijo_alma").val(total_cantidad);
                $("#modal-agregar-galvanizado").modal('show');
            } else if (idPeriodo_prueba === 0) {
                mensaje(false, "No se puede registrar, No hay perido de valorización", "no");
            }
        }

    }

});
//PERIODO DE VALORIZACION 
function  ahorasi_periodo_valorizacion_oficial(usuario_peri) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_obte_peri_valo',
        dataType: 'json',
        async: false,
        data: {
            acti_usua: usuario_peri,
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            idPeriodo_prueba = "";
            idPeriodo_prueba = responses.data[0]["@v_idPeriodo"];

        }

    });


}

$("#close_galv_agre").click(function () {
    limpiar_agregar_detalle_galvanizado();
});
function limpiar_agregar_detalle_galvanizado() {
    $("#ganc_agre").val('');
    $("#canti_galv_agre").val('');
    $("#fecha_ingr_agre").val('');
    $("#fecha_salida_agre").val('');
    $("#hora_entra_agre").val('');
    $("#hora_sali_agre").val('');
    $("#idGalv_agre").val('');
    $("#peso_negr_agre").val('');
    $("#peso_galv_agre").val('');
    $("#canti_galv_alma").val('');
    $("#consu_zinc_agre").val('');
    $("#consu_porc_agre").val('');
    $("#tipo_mate_agre").jqxDropDownList('clear');
    $("#tipo_mate_agre").jqxDropDownList('clearSelection');
    $("#turn_galv_agre").jqxDropDownList('clear');
    $("#turn_galv_agre").jqxDropDownList('clearSelection');
    $("#tipo_galv_agre").val('');
    $("#id_tipo_galv").jqxDropDownList('clear');
    $("#id_tipo_galv").jqxDropDownList('clearSelection');
}
;
$("#agre_galv_boton").click(function () {
    let cant_galvani = $("#canti_galv_agre").val();
    let canti_alma = $("#canti_galv_alma").val();
    let canti_hijo_alma = $("#canti_hijo_alma").val();
    let id_tipo_galvanizado = $("#tipo_galv_agre").val();
    let idGalv_agre = $("#idGalv_agre").val();
    let id_repo_val = $("#repo_valo_galv").val();
    let ganchera = $("#ganc_agre").val();
    let fecha_ingr = $("#fecha_ingr_agre").val();
    let turn_agre = $("#turn_galv_agre").val();
    let tipo_mate = $("#tipo_mate_agre").val();
    let hora_ingr = $("#hora_entra_agre").val();

    //no obligatorio
    let fecha_sali = $("#fecha_salida_agre").val();
    let hora_sali = $("#hora_sali_agre").val();
    let peso_negro = $("#peso_negr_agre").val();
    let peso_galv = $("#peso_galv_agre").val();
    let cons_zinc = $("#consu_zinc_agre").val();
    let porce_zinc = $("#consu_porc_agre").val();
    //restar


    let fech_ingreso = new Date(fecha_ingr);
    let fech_salida = new Date(fecha_sali);

    if (id_tipo_galvanizado === "GALVANIZADO") {
        let queda_hijos = parseInt(canti_alma) - parseInt(canti_hijo_alma);
        if (parseInt(cant_galvani) > parseInt(queda_hijos)) {
            mensaje(false, "LA CANTIDAD EXCEDE A LO FALTANTE: " + queda_hijos, "no");
        } else if (parseInt(cant_galvani) === 0 || parseInt(cant_galvani) < 0) {
            mensaje(false, "DEBE INGRESAR UNA CANTIDAD MAYOR A 0", "no");
        } else if (cant_galvani === "") {
            mensaje(false, "DEBE INGRESAR LA CANTIDAD", "no");
        } else {
            if (ganchera === "" || ganchera === "0") {
                mensaje(false, "INGRESE LA GANCHERA", "no");
            } else {
                if (fecha_ingr === "") {
                    mensaje(false, "INGRESE LA FECHA DE INGRESO", "no");
                } else {
                    if (hora_ingr === "") {
                        mensaje(false, "INGRESE LA HORA DE ENTRADA", "no");
                    } else {
                        if (peso_negro === "") {
                            mensaje(false, "INGRESE EL PESO NEGRO", "no");
                        } else {
                            if (fecha_sali != "" && (hora_sali != "" || hora_sali === "")) {
                                if (fech_ingreso.getTime() < fech_salida.getTime() || fech_ingreso.getTime() === fech_salida.getTime()) {
                                    if (peso_galv === "") {
                                        mensaje(false, "INGRESE EL PESO GALVANIZADO", "no");
                                    } else {
                                        if (parseFloat(peso_galv) > parseFloat(peso_negro)) {
                                            agregar_galv_detalle(idGalv_agre, id_repo_val, ganchera, tipo_mate, turn_agre, fecha_ingr, fecha_sali, hora_ingr, hora_sali, peso_negro, peso_galv, cons_zinc, porce_zinc, cant_galvani, id_tipo_galvanizado);
                                        } else {
                                            mensaje(false, "EL PESO GALVANIZADO DEBE SER MAYOR QUE EL PESO NEGRO", "no");
                                        }
                                    }
                                } else {
                                    mensaje(false, "LA FECHA SALIDA DEBE SER MAYOR QUE LA FECHA EN INGRESO", "no");
                                }
                            } else {

                                agregar_galv_detalle(idGalv_agre, id_repo_val, ganchera, tipo_mate, turn_agre, fecha_ingr, fecha_sali, hora_ingr, hora_sali, peso_negro, peso_galv, cons_zinc, porce_zinc, cant_galvani, id_tipo_galvanizado);
                            }
                        }
                    }
                }
            }
        }
    } else {

        if (parseInt(canti_alma) < parseInt(cant_galvani)) {
            mensaje(false, "LA CANTIDAD ES MAYOR A TOTAL: " + canti_alma, "no");
        } else if (parseInt(cant_galvani) === 0 || parseInt(cant_galvani) < 0 || cant_galvani === "") {
            mensaje(false, "DEBE INGRESAR UNA CANTIDAD MAYOR A 0", "no");
        } else if (parseInt(total_cantidad_estado) < parseInt(cant_galvani)) {
            mensaje(false, "LA CANTIDAD ES MAYOR AL TOTAL GALVANIZADO TERMINADOS: " + total_cantidad_estado, "no");
        } else {
            if (parseInt(total_cantidad) < parseInt(cant_galvani)) {
                mensaje(false, "LA CANTIDAD ES MAYOR AL TOTAL GALVANIZADO: " + total_cantidad, "no");
            } else {
                if (ganchera === "" || ganchera === "0") {
                    mensaje(false, "INGRESE LA GANCHERA", "no");
                } else {
                    if (fecha_ingr === "") {
                        mensaje(false, "INGRESE LA FECHA DE INGRESO", "no");
                    } else {
                        if (hora_ingr === "") {
                            mensaje(false, "INGRESE LA HORA DE ENTRADA", "no");
                        } else {
                            if (peso_negro === "") {
                                mensaje(false, "INGRESE EL PESO GALVANIZADO", "no");
                            } else {
                                if (fecha_sali != "" && (hora_sali != "" || hora_sali === "")) {
                                    if (fech_ingreso.getTime() < fech_salida.getTime() || fech_ingreso.getTime() === fech_salida.getTime()) {
                                        if (peso_galv === "") {
                                            mensaje(false, "INGRESE EL PESO " + id_tipo_galvanizado, "no");
                                        } else {
                                            if (parseFloat(peso_galv) > parseFloat(peso_negro)) {
                                                agregar_galv_detalle(idGalv_agre, id_repo_val, ganchera, tipo_mate, turn_agre, fecha_ingr, fecha_sali, hora_ingr, hora_sali, peso_negro, peso_galv, cons_zinc, porce_zinc, cant_galvani, id_tipo_galvanizado);
                                            } else {
                                                mensaje(false, "EL PESO " + id_tipo_galvanizado + " DEBE SER MAYOR QUE EL PESO GALVANIZADO", "no");
                                            }
                                        }
                                    } else {
                                        mensaje(false, "LA FECHA SALIDA DEBE SER MAYOR QUE LA FECHA EN INGRESO", "no");
                                    }
                                } else {

                                    agregar_galv_detalle(idGalv_agre, id_repo_val, ganchera, tipo_mate, turn_agre, fecha_ingr, fecha_sali, hora_ingr, hora_sali, peso_negro, peso_galv, cons_zinc, porce_zinc, cant_galvani, id_tipo_galvanizado);
                                }
                            }
                        }
                    }
                }
            }

        }

    }


});
// crear un funcion para el detalle 
function agregar_galv_detalle(idGalv_agre2, id_repo_val2, ganchera2, tipo_mate2, turn_agre2, fecha_ingr2, fecha_sali2, hora_ingr2, hora_sali2, peso_negro2, peso_galv2, cons_zinc2, porce_zinc2, cant_galvani2, id_tipo_galvanizado2) {
    let usuarios = obtener_user();
    // console.log(idGalv_agre2, id_repo_val2, ganchera2, tipo_mate2, turn_agre2, fecha_ingr2, fecha_sali2, hora_ingr2, hora_sali2, peso_negro2, peso_galv2, cons_zinc2, porce_zinc2, cant_galvani2, usuarios, id_tipo_galvanizado2);
    let num_porce_zincs = porce_zinc2.replace("%", '');
    let peso_negro2_deci = parseFloat(peso_negro2).toFixed(3);

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/crear_detalle',
        dataType: 'json',
        data: {
            intIdGalva: idGalv_agre2,
            intIdPeriValo: id_repo_val2,
            varTipoGalv: id_tipo_galvanizado2,
            intGanchera: ganchera2,
            varTurno: turn_agre2,
            varHoraEntr: hora_ingr2,
            varHoraSali: hora_sali2,
            intCantidad: cant_galvani2,
            varTipoMate: tipo_mate2,
            deciPesoNegro: peso_negro2_deci,
            deciPesoGalv: peso_galv2,
            deciConsumoZinc: parseFloat(cons_zinc2).toFixed(3),
            varPorcZinc: parseFloat(num_porce_zincs).toFixed(3),
            dateFechInic: fecha_ingr2,
            dateFechSali: fecha_sali2,
            acti_usua: usuarios
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {


            window.setTimeout(function () {
                $("#modal-agregar-galvanizado").modal('hide');
            }, 1000);
            if (responses.data === "") {
                mensaje(true, "AGREGADO EXITOSAMENTE", "no");
                detalle_galv(idGalv_agre2);
                limpiar_agregar_detalle_galvanizado();
            } else {
                mensaje(false, responses.data, "no");
            }

        }
    });
}
// NUMERO DE GUIA 
function numero_guia_galv(idnumguia) {
    var dataRecord = $("#grid_galv").jqxGrid('getrowdata', idnumguia);

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_guias_ot',
        dataType: 'json',
        data: {
            intIdProy: dataRecord.intIdProy,
            intIdTipoProducto: dataRecord.intIdTipoProducto,
            numDocTratSup: dataRecord.varNumeGuia,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: "varCodiElemento", type: "string"},
                            {name: "cantidad", type: "number"},
                            {name: "PesoNeto", type: "float"},
                            {name: "PesoBruto", type: "float"},
                            {name: "AreaTotal", type: "float"},
                        ],
                        updaterow: function (rowid, rowdata, commit) {
                            commit(true);
                        }
                    };
            $("#grid_deta_cant_galv").jqxGrid('clear');
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid_deta_cant_galv").jqxGrid({
                width: '100%',
                height: '100%',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                showfilterrow: true,
                filterable: true,
                selectionmode: 'multiplecellsextended',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,

                columns: [
                    {text: 'Elementos', width: '22%', datafield: 'varCodiElemento', aggregates: [{
                                '<b>Total</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var count = $("#grid_deta_cant_galv").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]
                    },
                    {text: 'Cantidad', width: '12%', datafield: 'cantidad', cellasign: 'center', aggregates: [{

                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['cantidad']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Neto', width: '22%', datafield: 'PesoNeto', aggregates: [{

                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['PesoNeto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Bruto', width: '22%', datafield: 'PesoBruto', aggregates: [{

                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['PesoBruto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Area Total', width: '22%', datafield: 'AreaTotal', aggregates: [{

                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                ]
            });
            $("#grid_deta_cant_galv").jqxGrid('localizestrings', localizationobj);
        }
    });

    $("#modal-deta-cant").modal('show');

}
function editar_galv(ideditar) {

    var dataRecord_editar = $("#grid_galv").jqxGrid('getrowdata', ideditar);


    //  $("#tipo_orden_galv_edit_cabe").val(dataRecord_editar.varTipoOrden);
    $("#id_galv_edit_cabe").val(dataRecord_editar.intIdGalva);
    $("#tipo_orden_galv_edit_cabe").val(dataRecord_editar.varTipoOrden);
    $("#descrip_galv_edit_cabe").val(dataRecord_editar.varDescripcion);
    $("#canti_total_edit_cabe").val(dataRecord_editar.intCantTota);
    $("#peso_neto_total_galva_edit_cabe").val(dataRecord_editar.deciPesoInge);
    $("#peso_bruto_total_galva_edit_cabe").val(dataRecord_editar.deciPesoBruto);
    //
    if (dataRecord_editar.varTipoOrden === "TERCERO")
    {
        $("#os_ot_galv_edit_cabe").val(dataRecord_editar.varOrdenServi);
    } else {
        $("#os_ot_galv_edit_cabe").val(dataRecord_editar.varCodiProy);
    }

    $("#modal-edit-cabe").modal('show');
    // mensaje(false,"En mantenimiento","no");

}
$("#edit_cabecera_galv").click(function () {
    let idGalvanizado = $("#id_galv_edit_cabe").val();
    let descrip_galv = $("#descrip_galv_edit_cabe").val();


    if (idGalvanizado === "") {
        mensaje(false, "INGRESE EL IDGALVANIZADO", "no");
    } else {
        if (descrip_galv === "") {
            mensaje(false, "INGRESE LA DESCRIPCION", "no");
        } else {
            edita_galvanizado_cabecera(idGalvanizado, descrip_galv);
        }
    }
});
function edita_galvanizado_cabecera(idGalvanizado2, descrip_galv2) {
    let use_modi = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/editar_cabecera',
        dataType: 'json',
        data: {
            intIdGalva: idGalvanizado2,
            varDescripcion: descrip_galv2,
            usua_modi: use_modi
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data === "") {
                mensaje(true, "ACTUALIZACION CON EXITO", "no");
                $("#modal-edit-cabe").modal('hide');
                mostrar_listar_galvanillado(tipo_orden_value_label, codi_proy_galv, codi_elem_galv);
            } else {
                mensaje(false, responses.data, "no");
            }
        }
    });
}


//EDITAR GALVANIZADO HIJOS
function tipo_material_edit() {
    var tipo_anulacion = [{'value_tipo_material': 'LIVIANO', 'label': 'LIVIANO'}, {'value_tipo_material': 'SEMIPESADO', 'label': 'SEMIPESADO'}, {'value_tipo_material': 'PESADO', 'label': 'PESADO'}];

    var source =
            {
                localdata: tipo_anulacion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_tipo_material'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#tipo_mate_edit_hijo").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_tipo_material", width: 150, height: 27});
    // Focus the jqxDropDownList
    $("#tipo_mate_edit_hijo").jqxDropDownList('focus');
    $("#tipo_mate_edit_hijo").val(tipo_mate_edit);


}
function combo_turno_edit() {
    var tipo_anulacion = [{'value_turno': 'TURNO 1', 'label': 'TURNO 1'}, {'value_turno': 'TURNO 2', 'label': 'TURNO 2'}];

    var source =
            {
                localdata: tipo_anulacion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_turno'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#turno_edit_hijo").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_turno", width: 170, height: 27});
    // Focus the jqxDropDownList

    $("#turno_edit_hijo").jqxDropDownList('focus');
    $("#turno_edit_hijo").val(var_tipo_mate_edit);


}
function editar_galv_hijo(idedithijos) {
    //HORA DE ENTRADA
    $("#hora_entra_agre_edit_hijo").jqxDateTimeInput({width: '250px', height: '25px', formatString: 'hh:mm tt', showTimeButton: true, showCalendarButton: false, template: 'primary'});
    //HORA DE SALIDA
    $("#hora_sali_agre_edit_hijo").jqxDateTimeInput({width: '250px', height: '25px', formatString: 'hh:mm tt', showTimeButton: true, showCalendarButton: false, template: 'primary'});

    var dataRecord_hijos = $("#grid_deta_galv").jqxGrid('getrowdata', idedithijos);
    // console.log(dataRecord_hijos);
    /* if (dataRecord_hijos.varDescEsta === "VERIFICADO") {
     mensaje(false, "NO PUEDE EDITAR POR QUE SE ENCUENTRA EN ESTADO VERIFICADO", "no");
     } else {
     */
    if (dataRecord_hijos.varTipoGalv === "GALVANIZADO" || dataRecord_hijos.varTipoGalv === "RE-GALVANIZADO") {
        $("#mostrar_nombre_gal_edit").removeClass('hidde_grid');
        $("#mostrar_nombre_gal_edit_2").removeClass('hidde_grid');
        $("#mostrar_nombre_flu_edit").addClass('hidde_grid');
        $("#mostrar_nombre_flu_edit_2").addClass('hidde_grid');
    } else {
        $("#mostrar_nombre_gal_edit").addClass('hidde_grid');
        $("#mostrar_nombre_gal_edit_2").addClass('hidde_grid');
        $("#mostrar_nombre_flu_edit").removeClass('hidde_grid');
        $("#mostrar_nombre_flu_edit_2").removeClass('hidde_grid');
    }


    tipo_mate_edit = "";
    var_tipo_mate_edit = "";
    peso_negro_label_edit = dataRecord_hijos.deciPesoNegro;
    peso_galv_label_edit = dataRecord_hijos.deciPesoGalv;

    let dateFechInic = moment(dataRecord_hijos.dateFechInic).format('YYYY-MM-DD');
    let dateFechSali = moment(dataRecord_hijos.dateFechSali).format('YYYY-MM-DD');

    $("#tipo_galv_agre_edit").val(dataRecord_hijos.varTipoGalv);
    $("#fecha_ingr_agre_edit_hijo").val(dateFechInic);
    $("#fecha_salida_agre_edit_hijo").val(dateFechSali);
    $("#nomb_peri_valor").val(dataRecord_hijos.varDescPeriValo);
    $("#ganch_edit_hijo").val(dataRecord_hijos.intGanchera);
    tipo_mate_edit = dataRecord_hijos.varTipoMate;
    var_tipo_mate_edit = dataRecord_hijos.varTurno;


    $("#hora_entra_agre_edit_hijo").val(dataRecord_hijos.varHoraEntr);
    $("#hora_sali_agre_edit_hijo").val(dataRecord_hijos.varHoraSali);


    $("#peso_negr_agre_edit_hijo").val(dataRecord_hijos.deciPesoNegro);
    $("#peso_galv_agre_edit_hijo").val(dataRecord_hijos.deciPesoGalv);
    $("#consu_zinc_agre_edit_hijo").val(dataRecord_hijos.deciConsumoZinc);
    $("#consu_porc_agre_edit_hijo").val(dataRecord_hijos.varPorcZinc + "%");
    $("#canti_galv_agre_edit_hijo").val(dataRecord_hijos.intCantidad);
    $("#canti_hijo_alma_edit_hijo").val(total_cantidad);
    $("#canti_galv_alma_edit_hijo").val(total_cantidad_edit);
    $("#idGalv_edit_hijo").val(dataRecord_hijos.intIdGalva);
    $("#idGalv_deta_edit_hijo").val(dataRecord_hijos.intIdDetaGalv);

    tipo_material_edit();
    combo_turno_edit();
    $("#modal-edit-cabe-hijo").modal('show');
    // }


}
// validaciones 
$("#peso_negr_agre_edit_hijo").on('change', function (event) {

    $("#consu_zinc_agre_edit_hijo").val('');
    $("#consu_porc_agre_edit_hijo").val('');
    // $("#agre_galv_boton_edit_hijo").prop("disabled", false);
    if (event.target) {
        let label = event.target.value;
        if (label) {

            peso_negro_label_edit = parseFloat(label);

        }
        if (peso_negro_label_edit >= 0) {
            if (peso_galv_label_edit >= 0) {

                total_consumo_edit = peso_galv_label_edit - peso_negro_label_edit;
                porce_consumo_edit = (total_consumo_edit / peso_negro_label_edit) * 100;
                $("#consu_zinc_agre_edit_hijo").val(total_consumo_edit.toFixed(3));
                $("#consu_porc_agre_edit_hijo").val(porce_consumo_edit.toFixed(3) + "%");
                /*if (total_consumo_edit < 0) {
                 mensaje(false, "PESO GALVANIZADO DEBE SER MAYOR QUE EL PESO NEGRO", "no");
                 $("#agre_galv_boton_edit_hijo").prop("disabled", true);
                 }*/
            }

        } else {
            $("#consu_zinc_agre_edit_hijo").val('');
            $("#consu_porc_agre_edit_hijo").val('');
        }

    }
});
$("#peso_galv_agre_edit_hijo").on('change', function (event) {
    /* peso_galv_label_edit=0;
     peso_negro_label_edit=0;*/
    $("#consu_zinc_agre_edit_hijo").val('');
    $("#consu_porc_agre_edit_hijo").val('');
    //$("#agre_galv_boton_edit_hijo").prop("disabled", false);
    total_consumo_edit = 0;
    porce_consumo_edit = 0;
    if (event.target) {
        let label = event.target.value;
        if (label) {

            peso_galv_label_edit = parseFloat(label);

        }
        if (peso_galv_label_edit) {
            if (peso_negro_label_edit) {

                total_consumo_edit = peso_galv_label_edit - peso_negro_label_edit;
                porce_consumo_edit = (total_consumo_edit / peso_negro_label_edit) * 100;
                $("#consu_zinc_agre_edit_hijo").val(total_consumo_edit.toFixed(3));
                $("#consu_porc_agre_edit_hijo").val(porce_consumo_edit.toFixed(3) + "%");
                if (total_consumo_edit < 0) {
                    mensaje(false, "PESO GALVANIZADO DEBE SER MAYOR QUE EL PESO NEGRO", "no");
                    //  $("#agre_galv_boton_edit_hijo").prop("disabled", true);
                }
            }

        } else {
            $("#consu_zinc_agre_edit_hijo").val('');
            $("#consu_porc_agre_edit_hijo").val('');
        }
    }
});
$("#agre_galv_boton_edit_hijo").click(function () {
    let idGalv = $("#idGalv_edit_hijo").val();
    let id_deta_galv = $("#idGalv_deta_edit_hijo").val();
    let ganchera_edit = $("#ganch_edit_hijo").val();
    let tipo_galv_edit = $("#tipo_galv_agre_edit").val();
    let tipo_mate = $("#tipo_mate_edit_hijo").val();
    let var_turn = $("#turno_edit_hijo").val();
    let fech_ingr = $("#fecha_ingr_agre_edit_hijo").val();
    let fehc_sali = $("#fecha_salida_agre_edit_hijo").val();
    let hora_entra = $("#hora_entra_agre_edit_hijo").val();
    let hora_sali = $("#hora_sali_agre_edit_hijo").val();
    let peso_nero = $("#peso_negr_agre_edit_hijo").val();
    let peso_galv = $("#peso_galv_agre_edit_hijo").val();
    let consum_zinc = $("#consu_zinc_agre_edit_hijo").val();
    let consu_porc = $("#consu_porc_agre_edit_hijo").val();

    let cant_hijo = $("#canti_galv_agre_edit_hijo").val();
    let cant_galv_alma = $("#canti_galv_alma_edit_hijo").val();
    let cant_galv_hijo_alma = $("#canti_hijo_alma_edit_hijo").val();

    let fech_ingr_data = new Date(fech_ingr);
    let fehc_sali_data = new Date(fehc_sali);



    if (tipo_galv_edit === "GALVANIZADO" || tipo_galv_edit === "RE-GALVANIZADO") {
        if (idGalv === "") {
            mensaje(false, "INGRESE EL ID GALVANIZADO", "no");
        } else {
            if (id_deta_galv === "") {
                mensaje(false, "INGRESE EL ID DETALLE DE GALVANIZADO", "no");
            } else {
                if (ganchera_edit === "") {
                    mensaje(false, "INGRESE EL NUMERO DE LA GANCHERA", "no");
                } else {
                    if (fech_ingr === "") {
                        mensaje(false, "INGRESE LA FECHA DE INGRESO", "no");
                    } else {
                        if (hora_entra === "") {
                            mensaje(false, "INGRESE LA HORA DE ENTRADA", "no");
                        } else {
                            if (peso_nero === "" || peso_nero == "0")
                            {
                                mensaje(false, "EL PESO NO PUEDE SER 0", "no");
                            } else {
                                if (fehc_sali != "" && (hora_sali === "" || hora_sali != "")) {
                                    if (fech_ingr_data.getTime() < fehc_sali_data.getTime() || fech_ingr_data.getTime() === fehc_sali_data.getTime()) {
                                        if (peso_galv === "") {
                                            mensaje(false, "INGRESE EL PESO " + tipo_galv_edit, "no");
                                        } else {
                                            if (parseFloat(peso_galv) > parseFloat(peso_nero)) {
                                                if (cant_hijo === "" || cant_hijo == "0") {
                                                    mensaje(false, "INGRESE LA CANTIDAD", "no");
                                                } else {

                                                    edit_hijos_galvanizado(id_deta_galv, idGalv, ganchera_edit, var_turn, hora_entra, cant_hijo, tipo_mate, fech_ingr, cant_galv_alma, hora_sali, fehc_sali, consum_zinc, consu_porc, peso_nero, peso_galv, tipo_galv_edit);
                                                }

                                            } else {
                                                mensaje(false, "EL PESO " + tipo_galv_edit + " DEBE SER MAYOR QUE EL PESO NEGRO", "no");
                                            }
                                        }
                                    } else {
                                        mensaje(false, "LA FECHA SALIDA DEBE SER MAYOR QUE LA FECHA EN INGRESO", "no");
                                    }
                                } else {
                                    // VACIO LA FECHA DE  FINAL + LA SALIDA  
                                    edit_hijos_galvanizado(id_deta_galv, idGalv, ganchera_edit, var_turn, hora_entra, cant_hijo, tipo_mate, fech_ingr, cant_galv_alma, hora_sali, fehc_sali, consum_zinc, consu_porc, peso_nero, peso_galv, tipo_galv_edit);
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (idGalv === "") {
            mensaje(false, "INGRESE EL ID GALVANIZADO", "no");
        } else {
            if (id_deta_galv === "") {
                mensaje(false, "INGRESE EL ID DETALLE DE GALVANIZADO", "no");
            } else {
                if (ganchera_edit === "") {
                    mensaje(false, "INGRESE EL NUMERO DE LA GANCHERA", "no");
                } else {
                    if (fech_ingr === "") {
                        mensaje(false, "INGRESE LA FECHA DE INGRESO", "no");
                    } else {
                        if (hora_entra === "") {
                            mensaje(false, "INGRESE LA HORA DE ENTRADA", "no");
                        } else {
                            if (peso_nero === "" || peso_nero == "0")
                            {
                                mensaje(false, "EL PESO GALVANIZADO NO PUEDE SER 0", "no");
                            } else {
                                if (fehc_sali != "" && (hora_sali === "" || hora_sali != "")) {
                                    if (fech_ingr_data.getTime() < fehc_sali_data.getTime() || fech_ingr_data.getTime() === fehc_sali_data.getTime()) {
                                        if (peso_galv === "") {
                                            mensaje(false, "INGRESE EL PESO " + tipo_galv_edit, "no");
                                        } else {
                                            if (parseFloat(peso_galv) > parseFloat(peso_nero)) {
                                                if (parseInt(cant_galv_alma) < parseInt(cant_hijo)) {
                                                    mensaje(false, "la cantidad debe ser menos a la cantidad total: " + cant_galv_alma, "no");
                                                } else {

                                                    if (cant_hijo === "" || cant_hijo == "0") {
                                                        mensaje(false, "INGRESE LA CANTIDAD", "no");
                                                    } else {

                                                        edit_hijos_galvanizado(id_deta_galv, idGalv, ganchera_edit, var_turn, hora_entra, cant_hijo, tipo_mate, fech_ingr, cant_galv_alma, hora_sali, fehc_sali, consum_zinc, consu_porc, peso_nero, peso_galv, tipo_galv_edit);
                                                    }
                                                }
                                            } else {
                                                mensaje(false, "EL PESO " + tipo_galv_edit + " DEBE SER MAYOR QUE EL PESO GALVANIZADO", "no");
                                            }
                                        }
                                    } else {
                                        mensaje(false, "LA FECHA SALIDA DEBE SER MAYOR QUE LA FECHA EN INGRESO", "no");
                                    }
                                } else {
                                    // VACIO LA FECHA DE  FINAL + LA SALIDA  
                                    edit_hijos_galvanizado(id_deta_galv, idGalv, ganchera_edit, var_turn, hora_entra, cant_hijo, tipo_mate, fech_ingr, cant_galv_alma, hora_sali, fehc_sali, consum_zinc, consu_porc, peso_nero, peso_galv, tipo_galv_edit);
                                }
                            }
                        }
                    }
                }
            }
        }

    }


});

function edit_hijos_galvanizado(id_deta_galv2, idGalv2, ganchera_edit2, var_turn2, hora_entra2, cant_hijo2, tipo_mate2, fech_ingr2, cant_galv_alma2, hora_sali2, fehc_sali2, consum_zinc2, consu_porc2, peso_nero2, peso_galv2, tipo_galv_edit2) {
    let use_modi = obtener_user();
    let num_porce_zincs = consu_porc2.replace("%", '');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/actualizar_detalle_galvanizado',
        dataType: 'json',
        data: {
            intIdDetaGalv: id_deta_galv2,
            intIdGalva: idGalv2,
            varTipoGalv: tipo_galv_edit2,
            intGanchera: ganchera_edit2,
            varTurno: var_turn2,
            varHoraEntr: hora_entra2,
            intCantidad: cant_hijo2,
            varTipoMate: tipo_mate2,
            dateFechInic: fech_ingr2,
            cantidad_total: cant_galv_alma2,
            usua_modi: use_modi,
            varHoraSali: hora_sali2,
            dateFechSali: fehc_sali2,
            deciConsumoZinc: parseFloat(consum_zinc2),
            varPorcZinc: parseFloat(num_porce_zincs).toFixed(3),
            deciPesoNegro: peso_nero2,
            deciPesoGalv: peso_galv2

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data === "") {
                mensaje(true, "ACTUALIZACION EXITOSO", "no");
                detalle_galv(idGalv2);
                $("#modal-edit-cabe-hijo").modal('hide');

            } else {
                mensaje(false, responses.data, "no");
            }
        }
    });



}

