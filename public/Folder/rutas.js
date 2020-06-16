var data = [];
var dataAdapter = "";
var codigoot = "";
var codgproducto = "";
var desot = "";
var despro = "";
var ruta = "";
var cod_ot = "";
var cod_pro = "";
var ruta_mod = "";
var ruta_modificacion = "";
var varnombre = "";
$("#codigo").on('change', function (event) {
    codigoot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            desot = item.label;
        }
    }
});
$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Ruta", true);

});
$("#producto").on('change', function (event) {
    codgproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codgproducto = item.value;
            despro = item.label;
        }
    }
});
$('#buscar_lista_ruta').click(function () {
    lista_ruta(codigoot, codgproducto);
});
$('#agregar').click(function () {
    listar_etapas(codigoot, codgproducto);
});
$('#cerrar_modal_3').click(function () {
    $("#modal-modificar-asignar-ruta").modal('hide');
    $("#grid3").jqxGrid('clearselection');
    $("#grid3").jqxGrid('refresh');
    lista_ruta(codigoot, codgproducto);
});
$("#close_ruta").click(function () {
    $('#modal_ruta_descripcion').modal('hide');
    $("#ruta_descripcion").val('');
});
function listar_data_list_proyectos() {
    var array_ot = new Array();
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionPartList/public/index.php/List_proy_vige',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_data_list_proyectos();
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
            $("#codigo").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '30px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#codigo").jqxComboBox('focus');
            $("#codigo").jqxComboBox('selectIndex', 0);
        }
    });
}
function combo_producto() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionPartList/public/index.php/list_tipo_prod_ruta',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            var new_tarea = [];
            var arra_new2 = [];
            Array.prototype.unique = function (a) {
                return function () {
                    return this.filter(a)
                }
            }(function (a, b, c) {
                return c.indexOf(a, b + 1) < 0
            });
            for (let j = 0; j < responses.data.length; j++) {
                arra_new2.push(responses.data[j]);
            }
            new_tarea = arra_new2.unique().reverse();
            var source =
                    {
                        localdata: new_tarea,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdTipoProducto'},
                            {name: 'varDescTipoProd'}
                        ],
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#producto").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30});
            // Focus the jqxDropDownList
            $("#producto").jqxDropDownList('focus');
            $("#producto").jqxDropDownList('selectIndex', 2);
        }
    });
}
function lista_ruta(ot, producto) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_ruta_proy',
        dataType: 'json',
        data: {
            intIdProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_tipo_etapa(etapa);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje == "Error.") {
                mensaje(false, 'No hay datos a mostrar', 'no');
                $("#grid").jqxGrid('clear');
            } else {
                var source = {
                    datatype: "array",
                    localdata: responses.data,
                    datafields: [
                        {name: 'acti_usua', type: 'string'},
                        {name: 'intIdRuta', type: 'number'},
                        {name: 'usua_modi', type: 'string'},
                        {name: 'varCodiOt', type: 'string'},
                        {name: 'varCodiProy', type: 'string'},
                        {name: 'varDescTipoProd', type: 'string'},
                        {name: 'varDescrip', type: 'string'},
                        {name: 'varNombre', type: 'string'},
                        {name: 'intIdProy', type: 'number'},
                        {name: 'intIdTipoProducto', type: 'number'},
                        {name: 'acti_hora', type: 'date'},
                        {name: 'hora_modi', type: 'date'}
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);

                $("#grid").jqxGrid({
                    width: '100%',
                    height: '300',
                    columnsresize: true,
                    altrows: true,
                    source: dataAdapter,
                    enabletooltips: true,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        {
                            text: 'Modificar', datafield: 'Modificar', columntype: 'button', width: '8%', cellsrenderer: function () {
                                return "Modificar";
                            }, buttonclick: function (row) {
                                // open the popup window when the user clicks a button.
                                editrow = row;
                                var offset = $("#grid").offset();
                                var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                cod_ot = "";
                                cod_pro = "";
                                ruta_mod = "";
                                $('#grid3').jqxGrid('clearselection');
                                $('#grid3').jqxGrid('showloadelement');
                                $('#grid3').jqxGrid('refresh');
                                varNombre = "";

                                listar_etapas_modificacion(dataRecord.intIdProy, dataRecord.intIdTipoProducto, dataRecord.intIdRuta);
                                $("#OT3").val(dataRecord.varCodiProy);
                                $("#idproyecto").val(dataRecord.intIdProy);
                                $("#DESPRO2").val(dataRecord.varDescTipoProd);
                                varNombre = dataRecord.varNombre;
                                $("#NOMBRE2").val(dataRecord.varNombre);
                                $("#idruta").val(dataRecord.intIdRuta);
                            }
                        },
                        {text: 'Número', datafield: 'intIdRuta', width: '5%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }]},
                        {text: 'id_proyecto', datafield: 'intIdProy', width: '8%', hidden: true},
                        {text: 'id_producto', datafield: 'intIdTipoProducto', width: '8%', hidden: true},
                        {text: 'Proyecto', datafield: 'varCodiProy', width: '8%'},
                        {text: 'Nro. Proyecto', datafield: 'varCodiOt', width: '8%'},
                        {text: 'Elemento', datafield: 'varDescTipoProd', width: '12%'},
                        {text: 'Nombre Ruta', datafield: 'varNombre', width: '16.6%'},
                        {text: 'Ruta', datafield: 'varDescrip', hidden: true},
                        {text: 'Ruta', datafield: 'Ruta', columntype: 'button', width: '10%', cellsrenderer: function () {
                                return "Ver Ruta";
                            }, buttonclick: function (row) {
                                editrow = row;
                                var offset = $("#grid").offset();
                                var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                var ruta_modal = dataRecord.varDescrip;
                                document.getElementById("ruta_descripcion").innerHTML = ruta_modal;
                                $("#modal_ruta_descripcion").modal('show');

                            }
                        },
                        {text: 'Usu.Crea', datafield: 'acti_usua', width: '10%'},
                        {text: 'Fech.Crea.', datafield: 'acti_hora', width: '8%', cellsformat: 'dd/MM/yyyy'},
                        {text: 'Usu.Modi.', datafield: 'usua_modi', width: '8%'},
                        {text: 'Fech.Modi.', datafield: 'hora_modi', width: '8%', cellsformat: 'dd/MM/yyyy'},
                    ]
                });
                $("#grid").jqxGrid('localizestrings', localizationobj);
            }
        }
    });
}
$("#cerrar_modal_2").click(function () {
    limpiar_etapas();
    $('#modal-agregar-asignar-ruta').modal('hide');
    limpiar_etapas();

});
$("#registrar_rutas").click(function () {
    agregar_ruta();
});
function listar_etapas(ot, producto) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/asig_etap_proy_ruta',
        dataType: 'json',
        data: {
            intIdProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_etapas(ot, producto);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje == "No existe") {
                mensaje(false, 'No hay etapas asignadas a este Elemento', 'no');
            } else {
                $("#CODIGOOT2").val(ot);
                $("#OT2").val(desot);
                $("#IDPRODUCTO").val(codgproducto);
                $("#DESPRO").val(despro);
                $("#modal-agregar-asignar-ruta").modal('show');
                var source = {
                    datatype: "array",
                    localdata: responses.data,
                    datafields: [
                        {name: 'intIdAsigEtapProy', type: 'number'},
                        {name: 'intIdEtapa', type: 'number'},
                        {name: 'intIdPlan', type: 'string'},
                        {name: 'intOrden', type: 'string'},
                        {name: 'varDescEtap', type: 'string'},
                        {name: 'varDescPlanta', type: 'string'},
                        {name: 'intIdTipoEtap', type: 'number'},
                        {name: 'varDescTipoEtap', type: 'string'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);
                var editrow = -1;
                var cellbeginedit = function (row, datafield, columntype, value) {
                    var valor = $("#grid2").jqxGrid('getrowdata', row);
                    if (valor['varDescEtap'] === "DESPACHO" || valor['varDescEtap'] === "DESPACHO COMPONENTE") {
                        return false;
                    } else {
                        return true;
                    }
                };

                $("#grid2").jqxGrid({
                    width: '100%',
                    height: '300',
                    source: dataAdapter,
                    columnsresize: true,
                    altrows: true,
                    enabletooltips: true,
                    selectionmode: 'checkbox',
                    sortable: true,
                    theme: 'darkblue',
                    columns: [
                        {text: 'intIdAsigEtapProy', datafield: 'intIdAsigEtapProy', width: '1%', hidden: true},
                        {text: 'intIdEtapa', datafield: 'intIdEtapa', width: '47%', hidden: true},
                        {text: 'intIdPlan', datafield: 'intIdPlan', width: '47%', hidden: true},
                        {text: 'intIdTipoEtap', datafield: 'intIdTipoEtap', width: '47%', hidden: true},
                        {text: 'Orden', datafield: 'intOrden', width: '8%'},
                        {text: 'Tipo Etapa', datafield: 'varDescTipoEtap', width: '25%', hidden: true},
                        {text: 'Etapa', datafield: 'varDescEtap', width: '45%', cellbeginedit: cellbeginedit},
                        {text: 'Planta', datafield: 'varDescPlanta', width: '45%'}
                    ]
                });
                var rows = $('#grid2').jqxGrid('getrows');
                for (i = 0; rows.length > i; i++) {
                    if (rows[i]['varDescEtap'] === "DESPACHO" || rows[i]['varDescEtap'] === "DESPACHO COMPONENTE") {

                        $('#grid2').jqxGrid({selectedrowindex: rows[i]['boundindex']});
                    }
                }
                $("#grid2").jqxGrid('localizestrings', localizationobj);
            }
        }
    });
}
function listar_etapas_modificacion(ot, producto, ruta_modi) {
    var lista_total = "";
    var lista_temporal = "";
    var array_new = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/asig_etap_proy_ruta',
        dataType: 'json',
        data: {
            intIdProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            listar_array_etapa(responses.data, ruta_modi, ot, producto);
        }
    });
    return lista_total;
}
function listar_array_etapa(lista, ruta_mod, cod_ot, cod_pro) {
    ruta_modificacion = "";
    ruta_modificacion = ruta_mod;
    $('#grid3').jqxGrid('clearselection');
    $('#grid3').jqxGrid('clear');
    $('#grid3').jqxGrid('showloadelement');
    $('#grid3').jqxGrid('clearfilters');
    $('#grid3').jqxGrid('refresh');
    document.getElementById('NOMBRE2').disabled = true;
    document.getElementById('DESPRO2').disabled = true;
    $("#numero_documento").removeClass('hidde_grid');
    $("#guardar_documento").addClass('hidde_grid');
    var lista_temporal = "";
    var array_nuevo = [];
    var array_nuevo_2 = [];
    var lista_check = "";
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/modi_ruta',
        dataType: 'json',
        data: {
            intIdRuta: ruta_mod
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_array_etapa(lista, ruta);
            }
        },
        success: function (responses) {
            lista_check = responses.data;
            var array_modal = [];
            var etapa = "";
            var source = {
                datatype: "array",
                localdata: lista,
                datafields: [
                    {name: 'intIdAsigEtapProy', type: 'number'},
                    {name: 'intIdEtapa', type: 'number'},
                    {name: 'intIdPlan', type: 'string'},
                    {name: 'intOrden', type: 'string'},
                    {name: 'varDescEtap', type: 'string'},
                    {name: 'varDescPlanta', type: 'string'},
                    {name: 'intIdTipoEtap', type: 'number'},
                    {name: 'varDescTipoEtap', type: 'string'},
                    {name: 'intIdProy', type: 'number'},
                    {name: 'intIdRuta', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'varCodiProy', type: 'string'},
                    {name: 'varDescTipoProd', type: 'string'},
                    {name: 'varNombre', type: 'string'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            var cellbeginedit = function (row, datafield, columntype, value) {
                var valor = $("#grid3").jqxGrid('getrowdata', row);
                if (valor['varDescEtap'] === "DESPACHO" || valor['varDescEtap'] === "DESPACHO COMPONENTE") {
                    return false;
                } else {
                    return true;
                }
            };
            $("#grid3").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                selectionmode: 'checkbox',

                sortable: true,
                theme: 'darkblue',
                columns: [
                    //{ text: 'Available', datafield: 'available', columntype: 'checkbox', width: 67},
                    {text: 'ruta', datafield: 'intIdRuta', width: '1%'},
                    {text: 'pro', datafield: 'intIdTipoProducto', width: '1%', hidden: true},
                    {text: 'ot', datafield: 'intIdProy', width: '1%', hidden: true},
                    {text: 'intIdAsigEtapProy', datafield: 'intIdAsigEtapProy', width: '1%', hidden: true},
                    {text: 'intIdEtapa', datafield: 'intIdEtapa', width: '47%', hidden: true},
                    {text: 'intIdPlan', datafield: 'intIdPlan', width: '47%', hidden: true},
                    {text: 'intIdTipoEtap', datafield: 'intIdTipoEtap', width: '47%', hidden: true},
                    {text: 'Orden', datafield: 'intOrden', width: '8%'},
                    {text: 'Tipo Etapa', datafield: 'varDescTipoEtap', width: '25%', hidden: true},
                    {text: 'Etapa', datafield: 'varDescEtap', width: '39%', cellbeginedit: cellbeginedit},
                    {text: 'Planta', datafield: 'varDescPlanta', width: '29%'},
                    {text: 'Opción', datafield: 'Opción2', columntype: 'button', width: '10%', cellsrenderer: function () {
                            return "Agregar";
                        }, buttonclick: function (row) {
                            editrow = row;
                            var offset = $("#grid3").offset();
                            var dataRecord = $("#grid3").jqxGrid('getrowdata', editrow);
                            if (dataRecord.varDescEtap === "DESPACHO" || dataRecord.varDescEtap === "DESPACHO COMPONENTE") {
                                mensaje(true, "YA TIENE AGREGADO DESPACHO", "NO");
                            } else {

                                store_etapa(cod_ot, cod_pro, ruta_modificacion, dataRecord.intIdAsigEtapProy, 1, editrow);
                            }
                        }
                    },
                    {text: 'Opción', datafield: 'Opción', columntype: 'button', width: '10%', cellsrenderer: function () {
                            return "Eliminar";
                        }, buttonclick: function (row) {
                            editrow = row;
                            var offset = $("#grid3").offset();
                            var dataRecord = $("#grid3").jqxGrid('getrowdata', editrow);
                            var data_select = $("#grid3").jqxGrid('getselectedrowindexes');
                            var exite_data = "no";
                            for (var i = 0; data_select.length > i; i++) {
                                if (data_select[i] === editrow) {
                                    exite_data = "si";
                                }
                            }
                            if (dataRecord.varDescEtap === "DESPACHO" || dataRecord.varDescEtap === "DESPACHO COMPONENTE") {
                                mensaje(false, "NO PUEDE ELIMINAR DESPACHO", "NO");
                            } else {
                                if (exite_data === "si") {
                                    store_etapa(cod_ot, cod_pro, ruta_modificacion, dataRecord.intIdAsigEtapProy, 2, editrow);
                                } else {
                                    mensaje(false, "No esta seleccionada la etapa que desea elminar", "no");
                                }

                            }

                        }
                    }

                ]
            });
            $("#grid3").jqxGrid('localizestrings', localizationobj);
            for (i = 0; i < lista.length; i++) {
                $.each(lista_check, function (index, obj) {
                    if (lista[i]['intIdEtapa'] === obj.intIdEtapa) {
                        $('#grid3').jqxGrid('selectrow', i);
                    }
                });
            }
            var rows = $('#grid3').jqxGrid('getrows');
            for (i = 0; rows.length > i; i++) {
                if (rows[i]['varDescEtap'] === "DESPACHO" || rows[i]['varDescEtap'] === "DESPACHO COMPONENTE") {

                    $('#grid3').jqxGrid({selectedrowindex: rows[i]['boundindex']});
                }
            }
            $("#modal-modificar-asignar-ruta").modal('show');
        }
    });
}
function agregar_ruta() {
    var hay_despacho = "no";
    var ot_insert = $("#CODIGOOT2").val();
    var id_producto = $("#IDPRODUCTO").val();
    var nombre_ruta = $("#NOMBRE").val().toUpperCase();
    let user = obtener_user();
    var textData = new Array();
    var text_id = new Array();
    var arra_new = [];
    var index_etapa = [];
    var nom_etapa = [];
    var rowindex = $("#grid2").jqxGrid("getselectedrowindexes");
    var rows = $('#grid2').jqxGrid('getselectedrowindexes');
    for (let j = 0; j < rows.length; j++) {
        text_id[j] = $('#grid2').jqxGrid('getrowdata', rows[j]);
        arra_new.push(text_id[j]['intIdTipoEtap']);
    }
    for (var i = 0; i < rowindex.length; i++) {
        textData[i] = $('#grid2').jqxGrid('getrowdata', rowindex[i]);
        index_etapa.push(textData[i]['intIdAsigEtapProy']);
        nom_etapa.push(textData[i]['varDescEtap']);
    }
    for (var j = 0; j < nom_etapa.length; j++) {
        if (id_producto === "1") {
            if (nom_etapa[j] === "DESPACHO") {
                hay_despacho = "si";
            }
        }else{
            hay_despacho = "si";
        }

    }
    Array.prototype.unique = function (a) {
        return function () {
            return this.filter(a)
        }
    }(function (a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });

    if (hay_despacho === "si") {
        if (arra_new.unique().length > 0) {
            if (arra_new.unique().length === nom_etapa.length) {
                if (nombre_ruta !== "") {
                    $.ajax({
                        type: 'POST',
                        url: url + '/GestionPartList/public/index.php/crea_asig_ruta_proy',
                        dataType: 'json',
                        data: {
                            intIdProy: ot_insert,
                            intIdTipoProducto: id_producto,
                            varNombre: nombre_ruta,
                            varDescrip: nom_etapa,
                            intIdAsigEtapProy: index_etapa,
                            acti_usua: user
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            if (thrownError == "Internal Server Error") {
                            }
                        },
                        success: function (responses) {

                            if (responses.data.mensaje == "Exito.") {
                                lista_ruta(ot_insert, id_producto);
                                mensaje(true, "Se registró una nueva ruta.", "modal-agregar-asignar-ruta");
                                limpiar_etapas();
                            } else {
                                mensaje(false, responses.data.error, "no");
                            }
                        }
                    });
                } else {
                    mensaje(false, "DEBE INGRESAR EL NOMBRE DE LA RUTA", "no");
                }

            } else {
                mensaje(false, "EL TIPO ETAPA NO SE DEBE REPETIR", "no");
            }
        } else {
            mensaje(false, "DEBE SELECCIONAR UNA ETAPA PARA CREAR UNA RUTA", "no");
        }
    } else {
        var rows = $('#grid2').jqxGrid('getrows');
        for (i = 0; rows.length > i; i++) {
            if (rows[i]['varDescEtap'] === "DESPACHO" || rows[i]['varDescEtap'] === "DESPACHO COMPONENTE") {
                $('#grid2').jqxGrid({selectedrowindex: rows[i]['boundindex']});
            }
        }
        mensaje(false, "DEBE SELECCIONAR LA ETAPA DESPACHO PARA CREAR UNA RUTA", "no");
    }
}
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}

function limpiar_etapas() {
    $('#grid2').jqxGrid('clearselection');
    $('#NOMBRE').val('');
}

function store_etapa(cod_ot, cod_pro, cod_rut, cod_asg, cod_etp, index) {
    var rowindex = $("#grid3").jqxGrid("getselectedrowindexes");
    var rows = $('#grid3').jqxGrid('getselectedrowindexes');
    var arra_new = [];
    var text_id = new Array();
    var textData = new Array();
    var nom_etapa = [];
    let user = obtener_user();
    Array.prototype.unique = function (a) {
        return function () {
            return this.filter(a)
        }
    }(function (a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });
    for (let j = 0; j < rows.length; j++) {
        text_id[j] = $('#grid3').jqxGrid('getrowdata', rows[j]);
        arra_new.push(text_id[j]['intIdTipoEtap']);
    }
    for (var i = 0; i < rowindex.length; i++) {
        textData[i] = $('#grid3').jqxGrid('getrowdata', rowindex[i]);
        nom_etapa.push(textData[i]['varDescEtap']);
    }

    if (arra_new.unique().length === nom_etapa.length) {
        $.ajax({
            type: 'POST',
            url: url + '/GestionPartList/public/index.php/store_modi_ruta',
            dataType: 'json',
            data: {
                intIdProy: cod_ot,
                intIdTipoProducto: cod_pro,
                intIdRuta: cod_rut,
                v_intIdAsigEtapProy: cod_asg,
                v_operacion: cod_etp,
                usua_modi: user
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {

                }
            },
            success: function (responses) {
                if (responses.data.mensaje === "") {
                    $('#grid3').jqxGrid('selectrow', index);
                    mensaje(true, "Se Guardo Correctamnte.", "no");
                } else if (responses.data.mensaje === "Ya se encuentra Asignado.") {
                    mensaje(false, responses.data.mensaje, "no");
                    $('#grid3').jqxGrid('selectrow', index);
                } else {
                    mensaje(false, responses.data.mensaje, "no");
                    $('#grid3').jqxGrid('unselectrow', index);
                }
            }
        });
    } else {
        $('#grid3').jqxGrid('unselectrow', index);
        mensaje(false, "EL TIPO ETAPA NO SE DEBE REPETIR", "no");

    }
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
            row += '' + arrData[i][index] + ',';
        }

        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {

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
$("#numero_documento").on('click', function () {
    document.getElementById('NOMBRE2').disabled = false;
    document.getElementById('DESPRO2').disabled = true;
    $("#numero_documento").addClass('hidde_grid');
    $("#guardar_documento").removeClass('hidde_grid');
});
$("#close_documento").on('click', function () {
    $("#NOMBRE2").val(varNombre);
    document.getElementById('NOMBRE2').disabled = true;
    document.getElementById('DESPRO2').disabled = true;
    $("#numero_documento").removeClass('hidde_grid');
    $("#guardar_documento").addClass('hidde_grid');
});
$("#guardar_documento").on('click', function () {

    guardar_nombre();
});
function guardar_nombre() {
    var cod = $("#idruta").val();
    var nombre = $("#NOMBRE2").val();
    var ot = $("#idproyecto").val();
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/validar_ruta',
        dataType: 'json',
        data: {
            intIdRuta: cod,
            varNombre: nombre,
            intIdProy: ot,
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data === "") {
                mensaje(true, "Se actualizó correctamente", "no");
                document.getElementById('NOMBRE2').disabled = true;
                document.getElementById('DESPRO2').disabled = true;
                $("#numero_documento").removeClass('hidde_grid');
                $("#guardar_documento").addClass('hidde_grid');
            } else {
                mensaje(false, "El nombre ya se encuentra en otra ruta", "no");
                $("#NOMBRE2").val(varNombre);
                document.getElementById('NOMBRE2').disabled = true;
                document.getElementById('DESPRO2').disabled = true;
                $("#numero_documento").removeClass('hidde_grid');
                $("#guardar_documento").addClass('hidde_grid');
            }
        }
    });
}
