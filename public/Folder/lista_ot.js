var usuario_admitido = 0;
var lista_pint = [];
var pintura = [];
var textData = new Array();
var exportar_data = 0;
var estado_list_ot = "";
var especificar = 0;
var pintura = 'no';
var anulserie = 'no';
var anulavance = 'no';
function validar_2() {
    let user = obtener_user();
    dropDownlist();

    combo_producto();
    combo_estados();

    //lista_etapa();
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/gsu_obte_prog_medi_idusu',
        dataType: 'json',
        data: {
            varCodiUsua: user,
            varCodiProg: 'ASIG_LIST_OT',
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte,rango_fecha,fecha_ini,fecha_fin);
            }
        },
        success: function (responses) {
            if (responses.data.length) {

                for (var i = 0; responses.data.length > i; i++) {
                    if (responses.data[i]['varDescBoto'] === 'ANULAR AVANCE') {
                        anulavance = 'si';
                        $("#anular_avance").removeClass('hidde_grid');
                    }
                    if (responses.data[i]['varDescBoto'] === 'ANULAR SERIE') {
                        anulserie = 'si';
                        $("#anular_serie").removeClass('hidde_grid');
                    }
                    if (responses.data[i]['varDescBoto'] === 'AGREGAR PINTURA') {
                        usuario_admitido = 1;
                        $("#asignar_pintura").removeClass('hidde_grid');
                        pintura = 'si';
                    }
                }
                tipo_ot();
            } else {
                tipo_ot();
            }

        }
    });

}
/*VARIABLES GLOBLES*/
var data = [];
var dataAdapter = "";
var codigoot = "";
var codigoproducto = "";
var codigopaquete = "";
var codigo_tipo_etapa = "";
var codigo_tarea = "";
var codigo_etapa = "";
var codigo_elemento = "";
var checkedItems = "";
var checkedItems_paquete = "";
var checkedItems_tarea = "";
var checkedItems_tipo_etapa = "";
var series_avance = "";
var rango_fechas = 0;
/*COMBOS INICIALIZADOS PARA TODOS*/
function dropDownlist() {
    $("#tarea").jqxDropDownList({checkboxes: true, width: 200, height: 30, placeHolder: "Seleccione"});
    $("#paquete").jqxDropDownList({checkboxes: true, width: 200, height: 30, placeHolder: "Seleccione"});
    $("#codigo").jqxDropDownList({checkboxes: true, width: 200, height: 30, placeHolder: "Seleccione"});
    $("#etapa_actual").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
}
/*CADA VEZ QUE CAMBIA EL COMBO DE OT CAMBIA TAMBIEN LA VARIABLE*/
$("#txt_ot").on('change', function (event) {
    $('#txt_ot').jqxDropDownList('clearFilter');
    codigoot = "";
    proyecto_notificado = "";
    $("#tarea").jqxDropDownList({checkboxes: true, width: 200, height: 30, placeHolder: "Seleccione", });
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            proyecto_notificado = item.label;
        }
        if (codigoproducto) {
            lista_etapa(codigoproducto, item.value);
            listar_tarea(codigoproducto, item.value);
        } else {

        }
    }

});
$("#cerrar_modal_pdf").on('click', function () {

    $("#modal-pdf-1").modal('hide');
});
/*CADA VEZ QUE CAMBIA EL COMBO DE ETAPA CAMBIA TAMBIEN LA VARIABLE*/
$("#etapa").on('change', function (event) {
    codigo_etapa = "";
    checkedItems_etapa = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_etapa = item.value;
            checkedItems_etapa = item.value;
            listar_tipo_etapa(item.value);
        }
    }
});
/*CADA VEZ QUE CAMBIA EL COMBO DE ETAPA ACTUAL CAMBIA TAMBIEN LA VARIABLE*/
$("#etapa_actual").on('change', function (event) {
    codigo_tipo_etapa = "";
    checkedItems_tipo_etapa = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_tipo_etapa = item.value;
            checkedItems_tipo_etapa = item.value;
        }
    }
});
/*CADA VEZ QUE CAMBIA EL COMBO DE PRODUCTO CAMBIA TAMBIEN LA VARIABLE*/
$("#producto").on('change', function (event) {
    codigoproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
        }
    }
    if (codigoot) {
        lista_etapa(codigoproducto, codigoot);
        listar_tarea(codigoproducto, codigoot);
        $("#tarea").jqxDropDownList({
            selectedIndex: -1
        });
    } else {

    }

});

/*CADA VEZ QUE CAMBIA EL COMBO DE TAREA CAMBIA TAMBIEN LA VARIABLE*/
$("#tarea").on('checkChange', function (event) {
    codigo_tarea = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_tarea = item.value;
            var items = $("#tarea").jqxDropDownList('getCheckedItems');
            checkedItems_tarea = "";
            $.each(items, function (index) {
                checkedItems_tarea += this.value + ",";
            });
            listar_paquete(codigoot, codigoproducto, checkedItems_tarea);
        }
    }
});
/*CADA VEZ QUE CAMBIA EL COMBO DE PAQUETE CAMBIA TAMBIEN LA VARIABLE*/
$("#paquete").on('checkChange', function (event) {
    codigopaquete = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigopaquete = item.value;
            //listar_codigos(codigoot, codigoproducto, item.value);
            var items = $("#paquete").jqxDropDownList('getCheckedItems');
            checkedItems_paquete = "";
            $.each(items, function (index) {
                checkedItems_paquete += this.value + ",";
            });
            listar_codigos(codigoot, codigoproducto, checkedItems_paquete);
        }
    }
});
/*CADA VEZ QUE CAMBIA EL COMBO DE CODIGO CAMBIA TAMBIEN LA VARIABLE*/
$("#codigo").on('checkChange', function (event) {
    codigo_elemento = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_elemento = item.value;
            var items = $("#codigo").jqxDropDownList('getCheckedItems');
            checkedItems = "";
            $.each(items, function (index) {
                checkedItems += this.value + ",";
            });
        }
    }
});
/*CADA VEZ QUE CAMBIA EL COMBO DE CODIGO CAMBIA TAMBIEN LA VARIABLE*/
$("#estados_ot").on('change', function (event) {
    estado_list_ot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            estado_list_ot = item.value;
        }
    }
});
/*LLAMAMOS EL ID DEBUSCAR LSTA OT LA CUAL NOS LISTARA TODA LA TADA MEDIANTE UN STORE*/
$("#buscar_lista-ot").click(function () {
    $("#modal-cargar-elem").modal('show');
    var tipo_ot = $("#tipo_ot").val();
    rango_fechas = 0;
    var fechas_diferentes = 0;
    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
    var codigo_producto = "";
    var paquete_codigos = "";
    var tarea_codigos = "";
    var tipo_etapa_codigos = "";
    var etapa_codigos = "";
    var fecha_inicio = $("#fech_inic").val();
    var fecha_fin = $("#fech_fin").val();
    if (fecha_inicio !== "" && fecha_fin !== "") {
        if (fecha_inicio > fecha_fin) {
            $("#grid").jqxGrid('clear');
            fechas_diferentes = 1;
            mensaje(false, "Fecha inicio debe ser menor a la fecha final", "no");
        } else {
            rango_fechas = 1;
        }
    }
    if (checkedItems_etapa.trim() === '-1,') {
        etapa_codigos = -1;
    } else if (checkedItems_etapa === '') {
        etapa_codigos = -1;
    } else {
        etapa_codigos = checkedItems_etapa.replace(/ /g, "");
    }
    if (checkedItems_tipo_etapa.trim() === '-1,') {
        tipo_etapa_codigos = -1;
    } else if (checkedItems_tipo_etapa === '') {
        tipo_etapa_codigos = -1;
    } else {
        tipo_etapa_codigos = checkedItems_tipo_etapa.replace(/ /g, "");
    }
    if (checkedItems_tarea.trim() === '-1,') {
        tarea_codigos = -1;
    } else if (checkedItems_tarea.trim() === '') {
        tarea_codigos = -1;
    } else {
        tarea_codigos = checkedItems_tarea.replace(/ /g, "");
    }
    if (checkedItems_paquete.trim() === '-1,') {
        paquete_codigos = -1;
    } else if (checkedItems_paquete.trim() === '') {
        paquete_codigos = -1;
    } else {
        paquete_codigos = checkedItems_paquete.replace(/ /g, "");
    }
    if (checkedItems.trim() === "TODOS,") {
        codigo_producto = -1;
    } else if (checkedItems.trim() === "") {
        codigo_producto = -1;
    } else {
        codigo_producto = checkedItems.replace(/ /g, "");
    }
    if (fechas_diferentes === 0) {
        if (usuario_admitido === 1 && tipo_ot === "1") {
            if (codigoot) {
                if (codigoproducto) {
                    if (estado_list_ot) {
                        listar_ot(codigoot, codigoproducto, etapa_codigos, tipo_etapa_codigos, tarea_codigos, paquete_codigos, codigo_producto, reporte, rango_fechas, fecha_inicio, fecha_fin, estado_list_ot);
                    } else {
                        mensaje(false, "Seleccione un ESTADO", "no");
                    }

                } else {
                    mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
                }
            } else {
                mensaje(false, "Seleccione una O.T", "no");
            }
        } else {
            if (codigoot) {
                if (codigoproducto) {
                    if (estado_list_ot) {
                        listar_ot_sin_privilegios(codigoot, codigoproducto, etapa_codigos, tipo_etapa_codigos, tarea_codigos, paquete_codigos, codigo_producto, reporte, rango_fechas, fecha_inicio, fecha_fin, estado_list_ot);
                    } else {
                        mensaje(false, "Seleccione un ESTADO", "no");
                    }
                } else {
                    mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
                }
            } else {
                mensaje(false, "Seleccione una O.T", "no");
            }
        }
    }

});
$("#anular_serie").click(function () {
    anular_serie();
});
$("#close").click(function () {
    $('#modal-lista-series-ot').modal('hide');
    listar_limpiar_serie();
});
$("#cerrar_modal_2").click(function () {
    if (usuario_admitido === 1) {
        $('#modal-lista-series-ot').modal('hide');
        $("#grid3").jqxGrid('clearSelection');
        $("#grid3").removeClass('hidde_grid');
        $("#grid4").removeClass('hidde_grid');
        //$('#anular_serie').removeClass('hidde_grid');
        $("#codigo_avanance").val('');
        $("#id_estado").val('');
    } else {
        $('#modal-lista-series-ot').modal('hide');
        $("#grid3").jqxGrid('clearSelection');
        $("#grid3").removeClass('hidde_grid');
        $("#grid4").removeClass('hidde_grid');
        $("#codigo_avanance").val('');
        $("#id_estado").val('');
        listar_limpiar_serie();
        listar_limpiar_serie_2();
    }

});
$("#seriales_data").click(function () {
    var reporte = $("#inlineRadio2").val();
    var codigo_producto = "";
    var paquete_codigos = "";
    var tarea_codigos = "";
    var tipo_etapa_codigos = "";
    var etapa_codigos = "";
    var estado_serie = $("#estados_ot").val();
    if (checkedItems_etapa.trim() == '-1,') {
        etapa_codigos = -1;
    } else {
        etapa_codigos = checkedItems_etapa.replace(/ /g, "");
    }
    if (checkedItems_tipo_etapa.trim() == '-1,') {
        tipo_etapa_codigos = -1;
    } else {
        tipo_etapa_codigos = checkedItems_tipo_etapa.replace(/ /g, "");
    }
    if (checkedItems_tarea.trim() == '-1,') {
        tarea_codigos = -1;
    } else {
        tarea_codigos = checkedItems_tarea.replace(/ /g, "");
    }
    if (checkedItems_paquete.trim() == '-1,') {
        paquete_codigos = -1;
    } else {
        paquete_codigos = checkedItems_paquete.replace(/ /g, "");
    }
    if (checkedItems.trim() == "TODOS,") {
        codigo_producto = -1;
    } else {
        codigo_producto = checkedItems.replace(/ /g, "");
    }
    listar_ot_series(codigoot, codigoproducto, etapa_codigos, tipo_etapa_codigos, tarea_codigos, paquete_codigos, codigo_producto, 3, estado_serie);
});
$("#limpiar").click(function () {
    $("#txt_ot").jqxDropDownList('selectIndex', 0);
    $("#etapa").jqxDropDownList('selectIndex', 0);
    $("#etapa_actual").jqxDropDownList('selectIndex', 0);

    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#tarea").jqxDropDownList('uncheckAll');
    $("#paquete").jqxDropDownList('uncheckAll');
    $("#codigo").jqxDropDownList('uncheckAll');
    $("#tarea").jqxDropDownList('checkIndex', 0);
    $("#paquete").jqxDropDownList('checkIndex', 0);
    $("#codigo").jqxDropDownList('checkIndex', 0);
    $("#fech_fin").val('dd/MM/yyyy');
    $("#fech_inic").val('dd/MM/yyyy');
    $("#grid").jqxGrid('clear');
    $("#estados_ot").jqxDropDownList('selectIndex', 0);
    exportar_data = 0;
});
$("#anular_avance").on('click', function () {
    anular_avance();
});
$("#cerrar_modal_3").on('click', function () {
    $("#grid5").jqxGrid('clear');
    $('#modal-lista-series-historico').modal('hide');
});
$("#btn_cerr_pintura").on('click', function () {
    $("#codigo_pintura").val('');
    lista_pint = [];
    $("#modal-asignar-pintura").modal('hide');
});
$("#btn_cerr").on('click', function () {
    $("#codigo_pintura").val('');
    lista_pint = [];
    $("#modal-asignar-pintura").modal('hide');
});
$("#asignar_pintura").on('click', function () {
    $("#grilla_seriales").addClass('hidde_grid');
    pintura = [];
    var validacion = [];
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {
        if (rowindex.length > 1) {
            $("#caja_text").removeClass('col-8');
            $("#caja_text").addClass('col-12');
            $("#series").addClass('hidde_grid');
            for (var i = 0; i < rowindex.length; i++) {
                textData[i] = $('#grid').jqxGrid('getrowdata', rowindex[i]);
                var lista_pintura = ({"intIdProy": codigoot, "intIdTipoProducto": codigoproducto, "intIdProyPaquete": textData[i].intIdProyPaquete, "varCodiElemento": textData[i].varCodiElemento, "Pintura": textData[i].Pintura});
                lista_pint.push(lista_pintura);
                pintura.push(textData[i]['Pintura']);
                validacion.push(textData[i]['estado']);
            }
            Array.prototype.unique = function (a) {
                return function () {
                    return this.filter(a)
                }
            }(function (a, b, c) {
                return c.indexOf(a, b + 1) < 0
            });
            var estado_vali = validacion.unique();
            var anulado_terminado = "no";
            for (var i = 0; estado_vali.length > i; i++) {
                if (estado_vali[i] === "ANULADO" || estado_vali[i] === "TERMINADO" || estado_vali[i] === "BLOQUEADO") {
                    anulado_terminado = "si";
                }
            }
            if (anulado_terminado === "no") {
                if (pintura.unique().length === 1) {
                    $("#modal-asignar-pintura").modal('show');
                } else {
                    $("#grid").jqxGrid('clearSelection');
                    lista_pint = [];
                    pintura = [];
                    mensaje(false, "Ha seleccionado un Elemento con diferente codigo de pintura", "no");
                }
            } else {
                mensaje(false, "Ha seleccionado un Elemento Anulado o Terminado", "no");
            }
        } else {
            $("#caja_text").removeClass('col-12');
            $("#caja_text").addClass('col-8');
            $("#series").removeClass('hidde_grid');

            for (var i = 0; i < rowindex.length; i++) {
                textData[i] = $('#grid').jqxGrid('getrowdata', rowindex[i]);
                var lista_pintura = ({"intIdProy": codigoot, "intIdTipoProducto": codigoproducto, "intIdProyPaquete": textData[i].intIdProyPaquete, "varCodiElemento": textData[i].varCodiElemento, "Pintura": textData[i].Pintura});
                lista_pint.push(lista_pintura);
                pintura.push(textData[i]['Pintura']);
                validacion.push(textData[i]['estado']);
            }
            Array.prototype.unique = function (a) {
                return function () {
                    return this.filter(a)
                }
            }(function (a, b, c) {
                return c.indexOf(a, b + 1) < 0
            });
            var estado_vali = validacion.unique();
            var anulado_terminado = "no";
            for (var i = 0; estado_vali.length > i; i++) {
                if (estado_vali[i] === "ANULADO" || estado_vali[i] === "TERMINADO" || estado_vali[i] === "BLOQUEADO") {
                    anulado_terminado = "si";
                }
            }
            if (anulado_terminado === "no") {
                if (pintura.unique().length === 1) {
                    $("#modal-asignar-pintura").modal('show');
                } else {
                    $("#grid").jqxGrid('clearSelection');
                    lista_pint = [];
                    pintura = [];
                    mensaje(false, "Ha seleccionado un Elemento con diferente codigo de pintura", "no");
                }
            } else {
                mensaje(false, "Ha seleccionado un Elemento Anulado o Terminado", "no");
            }
        }
    } else {
        mensaje(false, "Seleccione un fila", "no");
    }
});
$("#especificar").on('click', function () {
    especificar = 1;
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    var data_array = $("#grid").jqxGrid('getrowdata', rowindex[0]);
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/most_cant_info',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigoproducto,
            varCodiElemento: data_array.varCodiElemento,
            intIdProyZona: data_array.intIdProyZona,
            intRevision: data_array.intRevision,
            varDescripcion: data_array.varDescripcion,
            intCantRepro: data_array.intCantRepro,
            deciPesoNeto: data_array.deciPesoNeto,
            deciArea: data_array.deciArea,
            deciLong: data_array.deciLong,
            varPerfil: data_array.varPerfil,
            varCodVal: data_array.varCodVal,
            intIdProyTarea: data_array.intIdProyTarea,
            intIdProyPaquete: data_array.intIdProyPaquete,
            deciPrec: data_array.deciPrec,
            intIdEsta: data_array.intIdEsta,
            intIdEtapa: data_array.intIdEtapa,
            intIdEtapaAnte: data_array.intIdEtapaAnte,
            intIdEtapaSiguiente: data_array.intIdEtapaSiguiente,
            varValo1: data_array.Pintura,
            deciPesoBruto: data_array.deciPesoBruto,
            deciPesoContr: data_array.deciPesoContr,
            varModelo: data_array.varModelo,
            intIdRuta: data_array.intIdRuta,
            DocEnvioTS: data_array.DocEnvioTS,
            bultos: data_array.bulto, //andy lo coloco bultos
            Obs1: data_array.Obs1,
            obs2: data_array.obs2,
            obs3: data_array.obs3,
            obs4: data_array.obs4,
            nume_guia: data_array.nume_guia

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

                window.setTimeout(function () {

                    $("#modal-cargar-elem").modal('hide'); // COLOCO ANDY 
                }, 1000);

                //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte);
            }
        },
        success: function (responses) {
            if (responses.data.length) {
                $("#grid_serial").jqxGrid('clearSelection');
                $("#grid_serial").jqxGrid('clear');
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'hora_modi', type: 'string'},
                        {name: 'intIdEleme', type: 'number'},
                        {name: 'intIdProy', type: 'number'},
                        {name: 'intIdTipoProducto', type: 'number'},
                        {name: 'intRevision', type: 'number'},
                        {name: 'intSerie', type: 'number'},
                        {name: 'usua_modi', type: 'string'},
                        {name: 'varCodiElemento', type: 'string'},
                        {name: 'varCodiProy', type: 'string'},
                        {name: 'varDescEsta', type: 'string'},
                        {name: 'varDescripcion', type: 'string'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);
                var editrow = -1;
                $("#grid_serial").jqxGrid({
                    width: '480px',
                    height: '300',
                    source: dataAdapter,
                    columnsresize: true,
                    altrows: true,
                    enabletooltips: true,
                    editable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        {text: 'id_elemento', datafield: 'intIdEleme', width: 1, hidden: true},
                        {text: 'Serie', datafield: 'intSerie', width: 70, aggregates: [{
                                    '<b>Total</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var count = $("#grid_serial").jqxGrid('getrows');
                                                return count.length;
                                            }
                                }]},
                        {
                            text: 'Codigo', datafield: 'varCodiElemento', width: 190
                        },
                        {text: 'Descripción', datafield: 'varDescripcion', width: 190}

                    ]
                });
                $("#grilla_seriales").removeClass('hidde_grid');
                $("#grid_serial").jqxGrid('localizestrings', localizationobj);
                $("#grid_serial").jqxGrid({selectionmode: 'checkbox'});
            } else {
            }
        }
    });
});
$("#registrar_pintura").on('click', function () {
    var rowindex_2 = "";
    var cod_pintura = $("#codigo_pintura").val();
    if (especificar === 1) {
        rowindex_2 = $("#grid_serial").jqxGrid("getselectedrowindexes");
        if (rowindex_2.length > 0) {
            if (cod_pintura) {
                registrar_pintura();
            } else {
                mensaje(false, "Campo CODIGO PINTURA vacio", "no");
            }
        } else {
            mensaje(false, "No ha seleccionado una serie", "no");
        }
    } else {
        if (cod_pintura) {
            registrar_pintura();
        } else {
            mensaje(false, "Campo CODIGO PINTURA vacio", "no");
        }
    }
});
$("#excel_lista_ot").click(function () {
    if (exportar_data === 0) {
        mensaje(false, "No hay data para exportar", "no");
    } else {
        //var data = $("#grid").jqxGrid('getrows');
        var data = $("#grid").jqxGrid('exportData', 'json');

        JSONToCSVConvertor(data, "Lista Elementos", true);
    }
});
function registrar_pintura() {
    var rowindex_2 = "";
    var rowindex = "";
    var textData = "";
    var error = "";
    var checkedItems_etapa = "";
    rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 1) {
        var lista_print_co = lista_pint;
        lista_pint = [];
        for (var i = 0; lista_print_co.length > i; i++) {
            var lista_pintura = ({"intIdProy": codigoot, "intIdTipoProducto": codigoproducto, "intIdProyPaquete": lista_print_co[i].intIdProyPaquete, "varCodiElemento": lista_print_co[i].varCodiElemento, "series": '', "Pintura": lista_print_co[i].Pintura});
            lista_pint.push(lista_pintura);
        }
    } else if (especificar === 1) {
        rowindex_2 = $("#grid_serial").jqxGrid("getselectedrowindexes");
        if (rowindex_2.length > 0) {
            for (var i = 0; i < rowindex_2.length; i++) {
                textData = $('#grid_serial').jqxGrid('getrowdata', rowindex_2[i]);
                checkedItems_etapa += textData['intSerie'] + ",";
            }
            var lista_print_co = lista_pint;
            lista_pint = [];
            for (var i = 0; lista_print_co.length > i; i++) {
                var lista_pintura = ({"intIdProy": codigoot, "intIdTipoProducto": codigoproducto, "intIdProyPaquete": lista_print_co[i].intIdProyPaquete, "varCodiElemento": lista_print_co[i].varCodiElemento, "series": checkedItems_etapa, "Pintura": lista_print_co[i].Pintura});
                lista_pint.push(lista_pintura);
            }
        }
    } else {
        var lista_print_co = lista_pint;
        lista_pint = [];
        for (var i = 0; lista_print_co.length > i; i++) {
            var lista_pintura = ({"intIdProy": codigoot, "intIdTipoProducto": codigoproducto, "intIdProyPaquete": lista_print_co[i].intIdProyPaquete, "varCodiElemento": lista_print_co[i].varCodiElemento, "series": '', "Pintura": lista_print_co[i].Pintura});
            lista_pint.push(lista_pintura);
        }
    }
    var cod_pintura = $("#codigo_pintura").val();
    let user = obtener_user();
    $("#modal-cargar-pintura").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/gspar_actua_pintura',
        dataType: 'json',
        data: {
            cod_pintura: lista_pint,
            varValo1: cod_pintura,
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
            } else {
                $("#modal-asignar-pintura").modal('hide');
                mensaje(true, "Actualización de Pintura satisfactoria", "modal-cargar-pintura");
                window.setTimeout(function () {

                    $("#modal-cargar-pintura").modal('hide'); // COLOCO ANDY 
                }, 1000);

                $("#codigo_pintura").val('');
                lista_pint = [];
                $("#grid").jqxGrid('clearSelection');
                especificar = 0;
                $("#buscar_lista-ot").trigger('click');
            }
        }
    });
}
function tipo_ot() {
    var tipo_ot = [{'Tipo_Ot': 1, 'VarOt': 'ABIERTOS'}, {'Tipo_Ot': 2, 'VarOt': 'CERRADOS'}];
    var source =
            {
                localdata: tipo_ot,
                datatype: "array",
                datafields: [
                    {name: 'Tipo_Ot'},
                    {name: 'VarOt'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#tipo_ot").jqxDropDownList({source: dataAdapter, displayMember: "VarOt", valueMember: "Tipo_Ot", width: 200, height: 30});
    // Focus the jqxDropDownList
    //$("#tipo_ot").jqxDropDownList('selectIndex', 1);
    $("#tipo_ot").val('1');
    $("#tipo_ot").jqxDropDownList('focus');
}
$("#tipo_ot").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            if (item.value === "-1") {
                $("#anular_avance").addClass('hidde_grid');
                $("#anular_serie").addClass('hidde_grid');
                $("#asignar_pintura").addClass('hidde_grid');
            } else if (item.value === "2") {
                $("#anular_avance").addClass('hidde_grid');
                $("#anular_serie").addClass('hidde_grid');
                $("#asignar_pintura").addClass('hidde_grid');
            } else {
                if (pintura === 'si') {
                    $("#asignar_pintura").removeClass('hidde_grid');
                }
                if (anulserie === 'si') {
                    $("#anular_serie").removeClass('hidde_grid');
                }
                if (anulavance === 'si') {
                    $("#anular_avance").removeClass('hidde_grid');
                }

            }
            listar_data_list_proyectos(item.value);
        }
    }
});
function anular_avance() {
    checkedItems_etapa = "";
    series_avance = "";
    var estado = $("#id_estado").val();
    if (estado === "ANULADO") {
        mensaje(false, 'No puede anular un avance con estado ANULADO', 'no');
    } else if (estado === "BLOQUEADO") {
        mensaje(false, 'No puede anular un avance con estado BLOQUEAD', 'no');
    } else {
        var serie = new Array();
        var rowindex = $("#grid3").jqxGrid("getselectedrowindexes");
        var textData = "";
        if (rowindex.length > 0) {
            for (var i = 0; i < rowindex.length; i++) {
                textData = $('#grid3').jqxGrid('getrowdata', rowindex[i]);
                series_avance += textData['intSerie'] + ",";
            }
            var codigo_paquete = $("#codigo_avanance").val();
            elimiar_avance(codigo_paquete, series_avance);
        } else {
            mensaje(false, "Debe seleccionar una Serie", "no");
        }
    }
}
function elimiar_avance(codigo, str_serie) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/store_elim_avance',
        dataType: 'json',
        data: {
            v_intIdproy: codigoot,
            v_intIdTipoProducto: codigoproducto,
            v_codigo: codigo,
            v_strNuSerie: str_serie,
            v_usuario: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            if (responses.data[0]['@mensaje'] !== null) {
                mensaje(false, responses.data[0]['@mensaje'], "no");
            } else {
                mensaje(true, "Se anulo correctamente", "modal-lista-series-ot");
                $("#grid3").jqxGrid('clearSelection');
            }
        }
    });
}
function anular_serie() {
    var serie = new Array();
    var descripcion_data = "";
    var rowindex = $("#grid3").jqxGrid("getselectedrowindexes");
    var index_etapa = [];
    descripcion_data = 'PROYECTO: ' + proyecto_notificado + ': ';
    for (var i = 0; i < rowindex.length; i++) {
        serie[i] = $('#grid3').jqxGrid('getrowdata', rowindex[i]);
        descripcion_data += 'CODIGO ELEMENTO: ' + serie[i]['varCodiElemento'] + ',' + 'SERIE: ' + serie[i]['intSerie'] + ',';
        index_etapa.push(serie[i]['intIdEleme']);
    }
    if (index_etapa.length > 0) {
        $.ajax({
            type: 'POST',
            url: url + '/GestionPartList/public/index.php/anua_seri',
            dataType: 'json',
            data: {
                intIdEleme: index_etapa
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                }
            },
            success: function (responses) {
                let mensaje_alert = responses.data.mensaje;
                if (mensaje_alert == "Exito.") {
                    comentario_series = descripcion_data;
                    mensaje_noti(true, mensaje_alert, "modal-lista-series-ot");

                    var reporte = $("#inlineRadio2").val();
                    var codigo_producto = "";
                    var paquete_codigos = "";
                    var tarea_codigos = "";
                    var tipo_etapa_codigos = "";
                    var etapa_codigos = "";
                    $("#buscar_lista-ot").trigger('click');
                    $("#grid").jqxGrid('clearSelection');
                    listar_limpiar_serie();
                } else {
                    mensaje(false, mensaje_alert, "modal-lista-series-ot");
                    listar_limpiar_serie();
                    $("#grid").jqxGrid('clearSelection');
                }
            }
        });
    } else {
        mensaje(false, "No ha seleccionado ningún elemento", "no");
    }
}
function listar_limpiar_serie_2() {
    var source = {
        datatype: "array",
        datafields: [
            {name: 'hora_modi', type: 'date', format: 'dd/MM/yyyy'},
            {name: 'intIdEleme', type: 'number'},
            {name: 'intIdProy', type: 'number'},
            {name: 'intIdTipoProducto', type: 'number'},
            {name: 'intRevision', type: 'number'},
            {name: 'intSerie', type: 'number'},
            {name: 'usua_modi', type: 'string'},
            {name: 'varCodiElemento', type: 'string'},
            {name: 'varCodiProy', type: 'string'},
            {name: 'varDescEsta', type: 'string'},
            {name: 'varDescripcion', type: 'string'},
        ], updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid3").jqxGrid({
        width: '100%',
        height: '350',
        columnsresize: true,
        altrows: true,
        source: dataAdapter,
        enabletooltips: true,
        theme: 'darkblue',
        selectionmode: 'multiplecellsextended',
        columns: [
            {text: 'id_elemento', datafield: 'a', width: '10%', hidden: true},
            {text: 'Codigo', datafield: 'b', width: '16.6%'},
            {text: 'Descripción', datafield: 'c', width: '16.6%'},
            {text: 'Serie', datafield: 'd', width: '16.6%'},
            {text: 'Estado', datafield: 'e', width: '16.6%'},
            {text: 'Usuario Modificado', datafield: 'f', width: '16.6%'},
            {text: 'Hora Modificación', datafield: 'g', width: '16.6%'},
        ]
    });
    $("#grid3").jqxGrid('localizestrings', localizationobj);
}
function listar_limpiar_serie() {
    var source = {
        datatype: "array",
        datafields: [
            {name: 'hora_modi', type: 'date', format: 'dd/MM/yyyy'},
            {name: 'intIdEleme', type: 'number'},
            {name: 'intIdProy', type: 'number'},
            {name: 'intIdTipoProducto', type: 'number'},
            {name: 'intRevision', type: 'number'},
            {name: 'intSerie', type: 'number'},
            {name: 'usua_modi', type: 'string'},
            {name: 'varCodiElemento', type: 'string'},
            {name: 'varCodiProy', type: 'string'},
            {name: 'varDescEsta', type: 'string'},
            {name: 'varDescripcion', type: 'string'},
        ], updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid4").jqxGrid({
        width: '100%',
        height: '305',
        source: dataAdapter,
        columnsresize: true,
        altrows: true,
        enabletooltips: true,
        editable: true,
        theme: 'darkblue',
        showstatusbar: true,
        statusbarheight: 25,
        showaggregates: true,
        showgroupaggregates: true,
        columns: [
            {text: 'id_elemento', datafield: 'a', width: '10%', hidden: true},
            {text: 'Codigo', datafield: 'b', width: '16.6%'},
            {text: 'Descripción', datafield: 'c', width: '16.6%'},
            {text: 'Serie', datafield: 'd', width: '16.6%'},
            {text: 'Estado', datafield: 'e', width: '16.6%'},
            {text: 'Usuario Modificado', datafield: 'f', width: '16.6%'},
            {text: 'Hora Modificación', datafield: 'g', width: '16.6%'},
        ]
    });

    $("#grid4").jqxGrid('localizestrings', localizationobj);
}
function listar_data_list_proyectos(codigo) {
    var array_ot = new Array();
    $.ajax({
        type: 'POST',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionPartList/public/index.php/List_proy',
        dataType: 'json',
        data: {tipo_ot: codigo},
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_data_list_proyectos(codigo);
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
            $("#txt_ot").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot").jqxDropDownList('selectIndex', 0);
            $("#txt_ot").jqxDropDownList('focus');
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
            //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

            $("#producto").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30});
            // Focus the jqxDropDownList
            $("#producto").jqxDropDownList('selectIndex', 0);
            $("#producto").jqxDropDownList('focus');
        }
    });
}
function lista_etapa(cod_ot, cod_pro) {
    var jsonN = "";
    var resultado = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_tipo_etap_proy_tipopro',
        data:
                {
                    intIdProy: cod_pro,
                    intIdTipoProducto: cod_ot
                },
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                lista_etapa(cod_ot, cod_pro);
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
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
                                {name: 'intIdTipoEtap'},
                                {name: 'varDescTipoEtap'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#etapa").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoEtap", valueMember: "intIdTipoEtap", width: 200, height: 30});
                $("#etapa").jqxDropDownList('selectIndex', 0);
                $("#etapa").jqxDropDownList('focus');
            } else {
                responses.data.push({intIdTipoEtap: -1, varDescTipoEtap: 'TODOS'});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdTipoEtap'},
                                {name: 'varDescTipoEtap'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#etapa").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoEtap", valueMember: "intIdTipoEtap", width: 200, height: 30});
                $("#etapa").jqxDropDownList('selectIndex', 0);
                $("#etapa").jqxDropDownList('focus');
            }

        }
    });
}
function listar_tipo_etapa(etapa) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/List_Etap_actu',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigoproducto,
            intIdTipoEtap: etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_tipo_etapa(etapa);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje == "error") {
                $("#etapa_actual").jqxDropDownList('clear');
            } else {
                var jsonN1 = "";
                var result1 = [];
                for (const i in responses.data) {
                    result1.push(responses.data[i]);
                }
                jsonN1 = result1.reverse();
                var removed = jsonN1.splice(1);
                var source =
                        {
                            localdata: removed,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdEtapa'},
                                {name: 'varDescEtap'}
                            ]
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#etapa_actual").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 200, height: 30, });
                $("#etapa_actual").jqxDropDownList('selectIndex', 0);
                $("#etapa_actual").jqxDropDownList('focus');
            }
        }
    });
}
function listar_tarea(proyecto, ot) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/List_tarea',
        dataType: 'json',
        data: {
            intIdProy: ot,
            intIdTipoProducto: proyecto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_tarea(proyecto, ot);
            }
        },
        success: function (responses) {
            var dataAdapter = "";
            if (responses.data.mensaje == "error") {
                $("#tarea").jqxDropDownList('clear');
            } else {
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
                                {name: 'intIdProyTarea'},
                                {name: 'varDescripTarea'}
                            ],
                            async: false
                        };
                dataAdapter = new $.jqx.dataAdapter(source);
                $("#tarea").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30, });
                $("#tarea").jqxDropDownList('checkIndex', 0);
                $("#tarea").jqxDropDownList('focus');
            }
        }
    });
}
function listar_paquete(var_ot, id_producto, id_tarea) {
    if (var_ot != "" && id_producto != "" && id_tarea != "") {
        $.ajax({
            type: 'POST',
            url: url + '/GestionPartList/public/index.php/List_paqu',
            dataType: 'json',
            data: {
                intIdProy: var_ot,
                intIdProyTarea: id_tarea,
                intIdTipoProducto: id_producto,
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    listar_paquete(var_ot, id_producto, id_tarea);
                }
            },
            success: function (responses) {

                if (responses.data.mensaje == "error") {
                    $("#paquete").jqxDropDownList('clear');
                } else {
                    responses.data.push({intIdProyPaquete: -1, varCodigoPaquete: 'TODOS'});
                    var jsonN1 = "";
                    var result1 = [];
                    for (const i in responses.data) {
                        result1.push(responses.data[i]);
                    }
                    jsonN1 = result1.reverse();
                    var removed = jsonN1.splice(1);
                    var source =
                            {
                                localdata: removed,
                                datatype: "array",
                                datafields: [
                                    {name: 'intIdProyPaquete'},
                                    {name: 'varCodigoPaquete'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#paquete").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varCodigoPaquete", valueMember: "intIdProyPaquete", width: 200, height: 30, });
                    $("#paquete").jqxDropDownList('checkIndex', 0);
                    $("#paquete").jqxDropDownList('focus');
                }
            }
        });
    }
}
function listar_codigos(id_proyecto, id_producto, id_paquete) {

    var array_codigo_elmento = new Array();
    if (id_proyecto != "" && id_producto != "", id_paquete != "") {

        $.ajax({
            type: 'POST',
            url: url + '/GestionPartList/public/index.php/list_codi_elem',
            dataType: 'json',
            data: {
                intIdProy: id_proyecto,
                intIdProyPaquete: id_paquete,
                intIdTipoProducto: id_producto,
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    listar_codigos(id_proyecto, id_producto, id_paquete);
                }
            },
            success: function (responses) {
                if (responses.data.mensaje == "error") {
                    $("#codigo").jqxDropDownList('clear');
                } else {

                    var jsonN1 = "";
                    var result1 = [];
                    for (const i in responses.data) {
                        result1.push(responses.data[i]);
                    }
                    jsonN1 = result1.reverse();
                    var removed = jsonN1.splice(1);
                    var source =
                            {
                                localdata: removed,
                                datatype: "array",
                                datafields: [
                                    {name: 'varCodiElemento'},
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#codigo").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varCodiElemento", valueMember: "varCodiElemento", width: 200, height: 30, });
                    $("#codigo").jqxDropDownList('checkIndex', 0);
                    $("#codigo").jqxDropDownList('focus');
                }

            }
        });
    }
}
/*FUNCION PARA LSTAR TODA LA DATA PARA USUARIOS CON PRIVILEGIOS*/
function listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte, rango_fecha, fecha_ini, fecha_fin, estado) {
    $("#grid").jqxGrid('clear');
    $("#modal-cargar-elem").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_repo_elem',
        dataType: 'json',
        data: {
            intIdProy: int_id_proyecto,
            intIdTipoProducto: int_IdTipo_Producto,
            intIdTipoEtap: int_IdTipo_Etap,
            intIdEtapa: int_Id_Etapa,
            intIdProyTarea: int_Id_Proy_Tarea,
            intIdProyPaquete: int_Id_Proy_Paquete,
            varCodiElemento: var_Codi_Elemento,
            TipoReporte: TipoReporte,
            v_RangoFecha: rango_fecha,
            v_FechaIni: fecha_ini,
            v_FechaFin: fecha_fin,
            v_estado: estado

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

                window.setTimeout(function () {

                    $("#modal-cargar-elem").modal('hide'); // COLOCO ANDY 
                }, 1000);
                //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte,rango_fecha,fecha_ini,fecha_fin);
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                exportar_data = 1;
            } else {
                exportar_data = 0;
            }
            /*SE DIVIDE EN DOS TIPOS DE REPORTES 1 CUANDO ES SITUACION ACTUAL Y 2 ES CUANDO ES HISTORICO
             * CUANDO ES SITUACION ACTUAL PUEDE ELIMINAR AVANCE Y SERIE PERO CUADNO ES HISTORICO LAS OPCIONES 
             * DE ANULAR AVANCE Y SERIE SE OCULTAN*/
            if (TipoReporte === '1') {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'EtapaActual', type: 'string'},
                        {name: 'EtapaAnterior', type: 'string'},
                        {name: 'EtapaSiguiente', type: 'string'},
                        {name: 'canti', type: 'string'},
                        {name: 'Saldo', type: 'string'},
                        {name: 'deciArea', type: 'string'},
                        {name: 'deciLong', type: 'string'},
                        {name: 'deciPesoBruto', type: 'string'},
                        {name: 'deciPesoContr', type: 'string'},
                        {name: 'deciPesoNeto', type: 'string'},
                        {name: 'deciPrec', type: 'number'},
                        {name: 'intCantRepro', type: 'number'},
                        {name: 'intIdProyPaquete', type: 'number'},
                        {name: 'intIdProyTarea', type: 'number'},
                        {name: 'intIdProyZona', type: 'number'},
                        {name: 'intRevision', type: 'number'},
                        {name: 'estado', type: 'string'},
                        {name: 'tarea', type: 'string'},
                        {name: 'varCodVal', type: 'string'},
                        {name: 'varCodiElemento', type: 'string'},
                        {name: 'varCodigoPaquete', type: 'string'},
                        {name: 'varDescripcion', type: 'string'},
                        {name: 'varModelo', type: 'string'},
                        {name: 'varPerfil', type: 'string'},
                        {name: 'zona', type: 'string'},
                        {name: 'intIdEsta', type: 'number'},
                        {name: 'intIdEtapa', type: 'number'},
                        {name: 'intIdEtapaAnte', type: 'number'},
                        {name: 'intIdEtapaSiguiente', type: 'number'},
                        {name: 'intIdRuta', type: 'number'},
                        {name: 'Ruta', type: 'string'},
                        {name: 'Pintura', type: 'string'},
                        {name: 'intIdMaqui', type: 'number'},
                        {name: 'tipoEstructurado', type: 'string'},
                        {name: 'intIdPlan', type: 'string'},
                        {name: 'planta', type: 'string'},
                        {name: 'intIdTipoGrupo', type: 'number'},
                        {name: 'varDescTipoGrupo', type: 'string'},
                        {name: 'DocEnvioTS', type: 'string'},
                        {name: 'bulto', type: 'string'}, //andy lo coloco bultos
                        {name: 'Obs1', type: 'string'},
                        {name: 'obs2', type: 'string'},
                        {name: 'obs3', type: 'string'},
                        {name: 'obs4', type: 'string'},
                        {name: 'nume_guia', type: 'string'},
                        {name: 'PesoBrutoTotal', type: 'string'},
                        {name: 'PesoNetoTotal', type: 'string'},
                        {name: 'AreaTotal', type: 'string'},
                        {name: 'numDocTratSup', type: 'string'},
                        {name: 'intReproceso', type: 'string'},
                        {name: 'intRechazo', type: 'string'},
                        {name: 'intIdRutaAnt', type: 'string'},
                        {name: 'RutaAnt', type: 'string'},
                        {name: 'LotePintura', type: 'string'},
                        {name: 'intIdLotePintura', type: 'number'}
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                    var html = '<center><button class="btn btn-danger btn-sm" onClick=ver_ruta("' + dataRecord.intIdRuta + '");><i class="fas fa-eye"></i> ' + value + '</button></center>';
                    return html;
                };
                var linkrenderer_accounts_2 = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                    var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + codigoot + '","' + dataRecord.intIdProyZona + '","' + dataRecord.varCodiElemento + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
                    return html;
                };
                var linkrenderer_accounts_3 = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                    var html = '<center><button class="btn btn-danger btn-sm" onClick=ver_ruta("' + dataRecord.intIdRutaAnt + '");><i class="fas fa-eye"></i> ' + value + '</button></center>';
                    return html;
                };
                $("#grid").jqxGrid('clear');
                if (int_IdTipo_Producto === "1") {
                    if (usuario_admitido === 1) {
                        $("#asignar_pintura").removeClass('hidde_grid');
                    } else {
                        $("#asignar_pintura").addClass('hidde_grid');
                    }
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '400',
                        source: dataAdapter,
                        selectionmode: 'checkbox',
                        theme: 'darkblue',
                        showfilterrow: true,
                        filterable: true,
                        groupable: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {
                                text: 'Series', datafield: 'Series', columntype: 'button', width: 70, pinned: true, cellsrenderer: function () {
                                    return "Series";
                                }, buttonclick: function (row) {
                                    // open the popup window when the user clicks a button.
                                    editrow = row;
                                    var offset = $("#grid").offset();
                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                    if (dataRecord.estado === "ANULADO" || dataRecord.estado === "TERMINADO") {

                                        $("#id_estado").val(dataRecord.estado);
                                        $("#grid3").jqxGrid({selectionmode: 'multiplecellsextended'});
                                        //$('#grid3').addClass('hidde_grid');
                                        //$('#anular_serie').addClass('hidde_grid');
                                        //$('#grid3').removeClass('hidde_grid');
                                        listar_series_ot(codigoot, codigoproducto, dataRecord.varCodiElemento, dataRecord.intIdProyZona,
                                                dataRecord.intRevision, dataRecord.varDescripcion, dataRecord.intCantRepro, dataRecord.deciPesoNeto,
                                                dataRecord.deciArea, dataRecord.deciLong, dataRecord.varPerfil, dataRecord.varCodVal, dataRecord.intIdProyTarea,
                                                dataRecord.intIdProyPaquete, dataRecord.deciPrec, dataRecord.intIdEsta, 2, dataRecord.intIdEtapa, dataRecord.intIdEtapaAnte,
                                                dataRecord.intIdEtapaSiguiente, dataRecord.Pintura, dataRecord.deciPesoBruto, dataRecord.deciPesoContr, dataRecord.varModelo,
                                                dataRecord.intIdRuta, dataRecord.intCantRepro, dataRecord.DocEnvioTS, dataRecord.bulto, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.nume_guia,
                                                dataRecord.intReproceso, dataRecord.intRechazo, dataRecord.intIdRutaAnt,dataRecord.intIdLotePintura);//andy lo coloco bultos
                                    } else {
                                        $("#grid3").jqxGrid({selectionmode: 'checkbox'});

                                        //$('#grid4').addClass('hidde_grid');
                                        //$('#anular_serie').removeClass('hidde_grid');
                                        //$('#grid4').removeClass('hidde_grid');
                                        listar_series_ot(codigoot, codigoproducto, dataRecord.varCodiElemento, dataRecord.intIdProyZona, dataRecord.intRevision,
                                                dataRecord.varDescripcion, dataRecord.intCantRepro, dataRecord.deciPesoNeto, dataRecord.deciArea, dataRecord.deciLong,
                                                dataRecord.varPerfil, dataRecord.varCodVal, dataRecord.intIdProyTarea, dataRecord.intIdProyPaquete, dataRecord.deciPrec,
                                                dataRecord.intIdEsta, 2, dataRecord.intIdEtapa, dataRecord.intIdEtapaAnte, dataRecord.intIdEtapaSiguiente,
                                                dataRecord.Pintura, dataRecord.deciPesoBruto, dataRecord.deciPesoContr, dataRecord.varModelo, dataRecord.intIdRuta,
                                                dataRecord.intCantRepro, dataRecord.DocEnvioTS, dataRecord.bulto, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.nume_guia,
                                                dataRecord.intReproceso, dataRecord.intRechazo, dataRecord.intIdRutaAnt,dataRecord.intIdLotePintura); //andy lo coloco bultos
                                        $("#grid3").jqxGrid('clearSelection');
                                    }

                                }
                            },
                            {text: 'Codigo', width: 120, datafield: 'varCodiElemento', pinned: true, cellsrenderer: linkrenderer_accounts_2, cellsalign: 'center', groupable: true, pinned: true},
                            {text: 'Descripción', width: 150, datafield: 'varDescripcion', pinned: true},
                            {text: 'Rev.', width: 45, datafield: 'intRevision', pinned: true},
                            {text: 'Repro', width: 45, datafield: 'intCantRepro', pinned: true},
                            {
                                text: 'Cantidad', width: 80, datafield: 'canti',pinned: true, cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['canti']);
                                                    //return final;
                                                    return aggregatedValue + total;
                                                },
                                    }], pinned: true
                            },
                            {text: 'Ruta', width: 180, datafield: 'Ruta', cellsrenderer: linkrenderer_accounts, cellsalign: 'center'},
                            {text: 'Etapa Act.', width: 200, datafield: 'EtapaActual'},
                            {text: 'Planta', width: 200, datafield: 'planta'},
                            {text: 'Zona', width: 120, datafield: 'zona'},
                            {text: 'Programa', width: 90, datafield: 'tarea'},
                            {text: 'Grupo', width: 100, datafield: 'varCodigoPaquete'},
                            {text: 'Modelo', width: 120, datafield: 'varModelo'},
                            {
                                text: 'Peso Neto Unit.', width: 150, datafield: 'deciPesoNeto', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;

                                                    total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Neto Total', width: 150, datafield: 'PesoNetoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Unit.', width: 130, datafield: 'deciPesoBruto', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;


                                                    total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Total', width: 150, datafield: 'PesoBrutoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Unit.', width: 150, datafield: 'deciArea', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Total', width: 150, datafield: 'AreaTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Codigo Valor', width: 120, datafield: 'varCodVal'},
                            {text: 'Precio', width: 100, datafield: 'deciPrec', cellsalign: 'right'},
                            {text: 'Etapa Ant.', width: 200, datafield: 'EtapaAnterior'},
                            {text: 'Etapa Sig.', width: 200, datafield: 'EtapaSiguiente'},
                            {
                                text: 'Longitud', width: 160, datafield: 'deciLong', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciLong']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Perfil', width: 180, datafield: 'varPerfil'},
                            {text: 'Pintura', width: 400, datafield: 'Pintura'},
                            {text: 'Lote Pintura', width: 400, datafield: 'LotePintura'},
                            {text: 'Nro° Guia', width: 180, datafield: 'nume_guia'},
                            {text: 'Estado', width: 100, datafield: 'estado'},
                            {
                                text: 'P.Contratado', width: 160, datafield: 'deciPesoContr', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoContr']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                            {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                            {text: 'Documento Transferencia', datafield: 'DocEnvioTS', width: 250},
                            {text: 'Bulto', datafield: 'bulto', width: 250}, //andy lo coloco bultos
                            {text: 'Observación 1', datafield: 'Obs1', width: 250},
                            {text: 'Observación 2', datafield: 'obs2', width: 250},
                            {text: 'Observación 3', datafield: 'obs3', width: 250},
                            {text: 'Observación 4', datafield: 'obs4', width: 250},
                            {text: 'Reproceso', datafield: 'intReproceso', width: 250},
                            {text: 'Rechazo', datafield: 'intRechazo', width: 250},
                            {text: 'Ruta Anterior', datafield: 'RutaAnt', width: 250, cellsrenderer: linkrenderer_accounts_3},
                            {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                            {text: 'intIdLotePintura', width: 400, datafield: 'intIdLotePintura'},
                            {text: 'id_zona', width: 140, datafield: 'intIdProyZona', hidden: true},
                            {text: 'id_tarea', width: 160, datafield: 'intIdProyTarea', hidden: true},
                            {text: 'id_paquete', width: 170, datafield: 'intIdProyPaquete', hidden: true},
                            {text: 'intIdEsta', width: 200, datafield: 'intIdEsta', hidden: true},
                            {text: 'intIdEtapa', width: 300, datafield: 'intIdEtapa', hidden: true},
                            {text: 'intIdEtapaAnte', width: 230, datafield: 'intIdEtapaAnte', hidden: true},
                            {text: 'intIdEtapaSiguiente', width: 20, datafield: 'intIdEtapaSiguiente', hidden: true},
                            {text: 'intIdPlan', width: 20, datafield: 'intIdPlan', hidden: true},
                        ]
                    });
                } else {
                    $("#asignar_pintura").addClass('hidde_grid');
                    var linkrenderer_accounts_2 = function (row, column, value, rowKey, rowData) {
                        var editrow = row;
                        var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                        var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + codigoot + '","' + dataRecord.intIdProyZona + '","' + dataRecord.varCodiElemento + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
                        return html;
                    };
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '400',
                        source: dataAdapter,
                        selectionmode: 'multilpecells',
                        theme: 'darkblue',
                        showfilterrow: true,
                        filterable: true,
                        groupable: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {
                                text: 'Series', datafield: 'Series', columntype: 'button',pinned: true, width: 70, cellsrenderer: function () {
                                    return "Series";
                                }, buttonclick: function (row) {
                                    // open the popup window when the user clicks a button.
                                    editrow = row;
                                    var offset = $("#grid").offset();
                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                    if (dataRecord.estado === "ANULADO" || dataRecord.estado === "TERMINADO") {

                                        $("#id_estado").val(dataRecord.estado);
                                        $("#grid3").jqxGrid({selectionmode: 'multiplecellsextended'});
                                        //$('#grid3').addClass('hidde_grid');
                                        //$('#anular_serie').addClass('hidde_grid');
                                        //$('#grid3').removeClass('hidde_grid');
                                        listar_series_ot(codigoot, codigoproducto, dataRecord.varCodiElemento, dataRecord.intIdProyZona,
                                                dataRecord.intRevision, dataRecord.varDescripcion, dataRecord.intCantRepro, dataRecord.deciPesoNeto,
                                                dataRecord.deciArea, dataRecord.deciLong, dataRecord.varPerfil, dataRecord.varCodVal, dataRecord.intIdProyTarea,
                                                dataRecord.intIdProyPaquete, dataRecord.deciPrec, dataRecord.intIdEsta, 2, dataRecord.intIdEtapa, dataRecord.intIdEtapaAnte,
                                                dataRecord.intIdEtapaSiguiente, dataRecord.Pintura, dataRecord.deciPesoBruto, dataRecord.deciPesoContr, dataRecord.varModelo,
                                                dataRecord.intIdRuta, dataRecord.intCantRepro, dataRecord.DocEnvioTS, dataRecord.bulto, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.nume_guia,
                                                dataRecord.intReproceso, dataRecord.intRechazo, dataRecord.intIdRutaAnt,dataRecord.intIdLotePintura);//andy lo coloco bultos
                                    } else {
                                        $("#grid3").jqxGrid({selectionmode: 'checkbox'});
                                        //$('#grid4').addClass('hidde_grid');
                                        //$('#anular_serie').removeClass('hidde_grid');
                                        //$('#grid4').removeClass('hidde_grid');
                                        listar_series_ot(codigoot, codigoproducto, dataRecord.varCodiElemento, dataRecord.intIdProyZona, dataRecord.intRevision,
                                                dataRecord.varDescripcion, dataRecord.intCantRepro, dataRecord.deciPesoNeto, dataRecord.deciArea, dataRecord.deciLong,
                                                dataRecord.varPerfil, dataRecord.varCodVal, dataRecord.intIdProyTarea, dataRecord.intIdProyPaquete, dataRecord.deciPrec,
                                                dataRecord.intIdEsta, 2, dataRecord.intIdEtapa, dataRecord.intIdEtapaAnte, dataRecord.intIdEtapaSiguiente,
                                                dataRecord.Pintura, dataRecord.deciPesoBruto, dataRecord.deciPesoContr, dataRecord.varModelo, dataRecord.intIdRuta,
                                                dataRecord.intCantRepro, dataRecord.DocEnvioTS, dataRecord.bulto, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.nume_guia,
                                                dataRecord.intReproceso, dataRecord.intRechazo, dataRecord.intIdRutaAnt,dataRecord.intIdLotePintura); //andy lo coloco bultos
                                    }

                                }
                            },
                            {text: 'Codigo', width: 120, datafield: 'varCodiElemento',pinned: true, cellsrenderer: linkrenderer_accounts_2, groupable: true},
                            {text: 'Descripción', width: 150, datafield: 'varDescripcion',pinned: true},
                            {text: 'Rev.', width: 50, datafield: 'intRevision',pinned: true},
                            {text: 'Repro', width: 50, datafield: 'intCantRepro',pinned: true},
                            {
                                text: 'Cantidad', width: 120, datafield: 'canti',pinned: true, cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['canti']);
                                                    //return final;
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            {
                                text: 'Saldo', width: 120, datafield: 'Saldo', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['Saldo']);
                                                    //return final;
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            {text: 'Ruta', width: 180, datafield: 'Ruta', cellsrenderer: linkrenderer_accounts, cellsalign: 'center'},
                            {text: 'Etapa Act.', width: 200, datafield: 'EtapaActual'},
                            {text: 'Planta', width: 200, datafield: 'planta'},
                            {text: 'Zona', width: 120, datafield: 'zona'},
                            {text: 'Programa', width: 90, datafield: 'tarea'},
                            {text: 'Grupo', width: 100, datafield: 'varCodigoPaquete'},
                            {text: 'Modelo', width: 120, datafield: 'varModelo'},
                            {
                                text: 'Peso Neto Unit.', width: 150, datafield: 'deciPesoNeto', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Neto Total', width: 150, datafield: 'PesoNetoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Unit.', width: 130, datafield: 'deciPesoBruto', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Total', width: 150, datafield: 'PesoBrutoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Unit.', width: 150, datafield: 'deciArea', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;

                                                    total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Total', width: 150, datafield: 'AreaTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Codigo Valor', width: 90, datafield: 'varCodVal'},
                            {text: 'Precio', width: 100, datafield: 'deciPrec', cellsalign: 'right'},
                            {text: 'Etapa Ant.', width: 200, datafield: 'EtapaAnterior'},
                            {text: 'Etapa Sig.', width: 200, datafield: 'EtapaSiguiente'},
                            {
                                text: 'Longitud', width: 160, datafield: 'deciLong', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciLong']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Perfil', width: 180, datafield: 'varPerfil'},
                            {text: 'Pintura', width: 400, datafield: 'Pintura'},
                            {text: 'Lote Pintura', width: 400, datafield: 'LotePintura'},
                            {text: 'Estado', width: 100, datafield: 'estado'},
                            {
                                text: 'P.Contratado', width: 160, datafield: 'deciPesoContr', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoContr']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                            {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                            {text: 'Documento Transferencia', datafield: 'DocEnvioTS', width: 250},
                            {text: 'Bulto', datafield: 'bulto', width: 250}, //andy lo coloco bultos
                            /*{text: 'Observación 1', datafield: 'Obs1', width: 250},
                             {text: 'Observación 2', datafield: 'obs2', width: 250},
                             {text: 'Observación 3', datafield: 'obs3', width: 250},
                             {text: 'Observación 4', datafield: 'obs4', width: 250},*/
                            {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                            {text: 'id_zona', width: 140, datafield: 'intIdProyZona', hidden: true},
                            {text: 'intIdLotePintura', width: 140, datafield: 'intIdLotePintura', hidden: true},
                            {text: 'id_tarea', width: 160, datafield: 'intIdProyTarea', hidden: true},
                            {text: 'id_paquete', width: 170, datafield: 'intIdProyPaquete', hidden: true},
                            {text: 'intIdEsta', width: 200, datafield: 'intIdEsta', hidden: true},
                            {text: 'intIdEtapa', width: 300, datafield: 'intIdEtapa', hidden: true},
                            {text: 'intIdEtapaAnte', width: 230, datafield: 'intIdEtapaAnte', hidden: true},
                            {text: 'intIdEtapaSiguiente', width: 20, datafield: 'intIdEtapaSiguiente', hidden: true},
                            {text: 'intIdPlan', width: 20, datafield: 'intIdPlan', hidden: true},
                        ]
                    });
                }
                $("#grid").jqxGrid('localizestrings', localizationobj);
                $("#modal-cargar-elem").modal('hide');
            } else if (TipoReporte === '2') {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'Codigo', type: 'string'},
                        {name: 'Nombre', type: 'string'},
                        {name: 'Revis', type: 'number'},
                        {name: 'intNuConta', type: 'number'},
                        {name: 'Cantidad', type: 'number'},
                        {name: 'Saldo', type: 'string'},
                        {name: 'EtapaAvance', type: 'string'},
                        {name: 'Zona', type: 'string'},
                        {name: 'Programa', type: 'string'},
                        {name: 'Grupo', type: 'string'},
                        {name: 'PesoNetoUnit', type: 'float'},
                        {name: 'PesoBrutoUnit', type: 'float'},
                        {name: 'AreaUnit', type: 'float'},
                        {name: 'Precio', type: 'float'},
                        {name: 'UsuarioCreac', type: 'string'},
                        {name: 'UsuarioModi', type: 'string'},
                        {name: 'FechaModif', type: 'date'},
                        {name: 'Contratista', type: 'string'},
                        {name: 'Maquina', type: 'string'},
                        {name: 'obse_avan', type: 'string'},
                        {name: 'Longitud', type: 'float'},
                        {name: 'varPerfil', type: 'string'},
                        {name: 'varBulto', type: 'string'},
                        {name: 'nume_guia', type: 'string'},
                        {name: 'intIdEtapa', type: 'number'},
                        {name: 'intIdContr', type: 'number'},
                        {name: 'intIdProyZona', type: 'number'},
                        {name: 'intIdProyTarea', type: 'number'},
                        {name: 'intIdProyPaquete', type: 'number'},
                        {name: 'intIdMaqui', type: 'number'},
                        {name: 'Fecha', type: 'date'},
                        {name: 'Pintura', type: 'string'},
                        {name: 'tipoEstructurado', type: 'string'},
                        {name: 'acti_usua', type: 'string'},
                        {name: 'acti_hora', type: 'string'},
                        {name: 'usua_modi', type: 'string'},
                        {name: 'hora_modi', type: 'string'},
                        {name: 'intIdPlan', type: 'string'},
                        {name: 'planta', type: 'string'},
                        {name: 'intIdTipoGrupo', type: 'number'},
                        {name: 'varDescTipoGrupo', type: 'string'},
                        {name: 'Obs1', type: 'string'},
                        {name: 'obs2', type: 'string'},
                        {name: 'obs3', type: 'string'},
                        {name: 'obs4', type: 'string'},
                        {name: 'estado', type: 'string'},
                        {name: 'varModelo', type: 'string'},
                        {name: 'PesoBrutoTotal', type: 'string'},
                        {name: 'PesoNetoTotal', type: 'string'},
                        {name: 'AreaTotal', type: 'string'},
                        {name: 'numDocTratSup', type: 'string'},
                        {name: 'intIdRuta', type: 'string'},
                        {name: 'intMaxContaEtap', type: 'string'},
                        {name: 'RutaAnt', type: 'string'},
                        {name: 'LotePintura', type: 'string'},
                        {name: 'intIdLotePintura', type: 'number'}
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                var linkrenderer_accounts_2 = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                    var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + codigoot + '","' + dataRecord.intIdProyZona + '","' + dataRecord.Codigo + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
                    return html;
                };
                var linkrenderer_accounts_3 = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                    var html = '<center><button class="btn btn-danger btn-sm" onClick=ver_ruta("' + dataRecord.intIdRuta + '");><i class="fas fa-eye"></i> ' + value + '</button></center>';
                    return html;
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                if (int_IdTipo_Producto === "1") {
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '400',
                        source: dataAdapter,
                        selectionmode: 'multiplecellsextended',
                        theme: 'darkblue',
                        showfilterrow: true,
                        filterable: true,
                        groupable: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {
                                text: 'Series', datafield: 'Series', columntype: 'button',pinned: true, width: 70, cellsrenderer: function () {
                                    return "Series";
                                }, buttonclick: function (row) {
                                    // open the popup window when the user clicks a button.
                                    editrow = row;
                                    var offset = $("#grid").offset();
                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                    var año = new Date(dataRecord.Fecha).getFullYear();
                                    var dia = new Date(dataRecord.Fecha).getDate() + 1;
                                    var mes = new Date(dataRecord.Fecha).getMonth() + 1;
                                    if (mes <= 9) {
                                        var mes_inicio = '0' + mes;
                                    } else {
                                        var mes_inicio = mes;
                                    }
                                    if (dia <= 9) {
                                        var dia_ultimo = '0' + dia;
                                    } else {
                                        var dia_ultimo = dia;
                                    }
                                    var fecha_valo = año + '-' + mes_inicio + '-' + dia_ultimo;
                                    listar_series_historicos(codigoot, codigoproducto, dataRecord.Codigo, dataRecord.Nombre, dataRecord.intIdProyZona,
                                            dataRecord.intIdProyTarea, dataRecord.intIdProyPaquete, dataRecord.PesoNetoUnit, dataRecord.PesoBrutoUnit, dataRecord.AreaUnit,
                                            dataRecord.Revis, dataRecord.intNuConta, dataRecord.intIdEtapa, dataRecord.Precio, dataRecord.intIdContr, dataRecord.intIdMaqui,
                                            dataRecord.obse_avan, dataRecord.varBulto, dataRecord.nume_guia, fecha_valo, dataRecord.varPerfil, dataRecord.Pintura,
                                            dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.intIdRuta, dataRecord.intMaxContaEtap);
                                }
                            },
                            {text: 'Codigo', width: 120, datafield: 'Codigo',pinned: true, cellsrenderer: linkrenderer_accounts_2, groupable: true},
                            {text: 'Nombre', width: 150, datafield: 'Nombre',pinned: true},
                            {text: 'Rev.', width: 50, datafield: 'Revis',pinned: true},
                            {text: 'Repro', width: 50, datafield: 'intNuConta',pinned: true},
                            {
                                text: 'Cantidad', width: 120, datafield: 'Cantidad',pinned: true, cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['Cantidad']);
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            {text: 'Etapa Avn.', width: 200, datafield: 'EtapaAvance'},
                            {text: 'Planta', width: 200, datafield: 'planta'},
                            {text: 'Zona', width: 120, datafield: 'Zona'},
                            {text: 'Programa', width: 90, datafield: 'Programa'},
                            {text: 'Grupo', width: 100, datafield: 'Grupo'},
                            {text: 'Modelo', width: 120, datafield: 'varModelo'},
                            {
                                text: 'Peso Neto Unit.', width: 120, datafield: 'PesoNetoUnit', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);

                                                    return total;
                                                },
                                    }]
                            },
                            {
                                text: 'Peso Neto Total', width: 150, datafield: 'PesoNetoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Unit.', width: 120, datafield: 'PesoBrutoUnit', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Total', width: 150, datafield: 'PesoBrutoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Unit.', width: 120, datafield: 'AreaUnit', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Total', width: 150, datafield: 'AreaTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Precio', width: 90, datafield: 'Precio', cellsalign: 'right'},
                            {text: 'Contratista', width: 250, datafield: 'Contratista'},
                            {text: 'Maquina', width: 150, datafield: 'Maquina'},
                            {text: 'N°Bulto', width: 100, datafield: 'varBulto'},
                            {text: 'N°Guia', width: 100, datafield: 'nume_guia'},
                            {text: 'Observación', width: 250, datafield: 'obse_avan'},
                            {
                                text: 'Longitud', width: 120, datafield: 'Longitud', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['Longitud']);
                                                    return aggregatedValue + total;
                                                }
                                    }]
                            },
                            {text: 'Perfil', width: 250, datafield: 'varPerfil'},
                            {text: 'Pintura', width: 400, datafield: 'Pintura'},
                            {text: 'Lote de Pintura', width: 400, datafield: 'LotePintura'},
                            {text: 'Estado', width: 120, datafield: 'estado'},
                            {text: 'Usu.Crea', width: 150, datafield: 'acti_usua'},
                            {text: 'Fech.Crea.', width: 200, datafield: 'acti_hora', cellsformat: 'dd/MM/yyyy'},
                            {text: 'Usu.Mod', width: 160, datafield: 'usua_modi'},
                            {text: 'Fech.Mod.', width: 200, datafield: 'hora_modi', cellsformat: 'dd/MM/yyyy'},
                            {text: 'Doc. Internan', datafield: 'numDocTratSup', width: 110},
                            {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                            {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                            {text: 'Observación 1', datafield: 'Obs1', width: 250},
                            {text: 'Observación 2', datafield: 'obs2', width: 250},
                            {text: 'Observación 3', datafield: 'obs3', width: 250},
                            {text: 'Observación 4', datafield: 'obs4', width: 250},
                            {text: 'Ruta', datafield: 'RutaAnt', width: 250, cellsrenderer: linkrenderer_accounts_3},
                            {text: 'Ult.Avanc.Etapa', datafield: 'intMaxContaEtap', width: 250},
                            {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                            {text: 'intIdLotePintura', width: 140, datafield: 'intIdLotePintura', hidden: true},
                            {text: 'intIdEtapa', width: '8%', datafield: 'intIdEtapa', hidden: true},
                            {text: 'intIdContr', width: '8%', datafield: 'intIdContr', hidden: true},
                            {text: 'intIdProyZona', width: '8%', datafield: 'intIdProyZona', hidden: true},
                            {text: 'intIdProyTarea', width: '8%', datafield: 'intIdProyTarea', hidden: true},
                            {text: 'intIdProyPaquete', width: '8%', datafield: 'intIdProyPaquete', hidden: true},
                            {text: 'intIdMaqui', width: '8%', datafield: 'intIdMaqui', hidden: true},
                            {text: 'fecha', width: '8%', datafield: 'Fecha', cellsformat: 'dd/MM/yyyy', hidden: true},
                            {text: 'intIdPlan', width: 20, datafield: 'intIdPlan', hidden: true},
                        ]
                    });
                } else {
                    var linkrenderer_accounts_2 = function (row, column, value, rowKey, rowData) {
                        var editrow = row;
                        var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                        var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + codigoot + '","' + dataRecord.intIdProyZona + '","' + dataRecord.Codigo + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
                        return html;
                    };
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '400',
                        source: dataAdapter,
                        selectionmode: 'multiplecellsextended',
                        theme: 'darkblue',
                        showfilterrow: true,
                        filterable: true,
                        groupable: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {text: 'Codigo', width: 120, datafield: 'Codigo', cellsrenderer: linkrenderer_accounts_2, groupable: true},
                            {text: 'Nombre', width: 150, datafield: 'Nombre'},
                            {text: 'Rev.', width: 50, datafield: 'Revis'},
                            {text: 'Repro', width: 50, datafield: 'intNuConta'},
                            {
                                text: 'Cantidad', width: 120, datafield: 'Cantidad', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['Cantidad']);
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            /*{
                             text: 'Saldo', width: 120, datafield: 'Saldo', cellsalign: 'right', aggregates: [{
                             '<b>#</b>':
                             function (aggregatedValue, currentValue, column, record) {
                             
                             var total = parseFloat(record['Saldo']);
                             return aggregatedValue + total;
                             },
                             }]
                             },*/
                            {text: 'Etapa Avn.', width: 200, datafield: 'EtapaAvance'},
                            {text: 'Planta', width: 200, datafield: 'planta'},
                            {text: 'Zona', width: 120, datafield: 'Zona'},
                            {text: 'Programa', width: 90, datafield: 'Programa'},
                            {text: 'Grupo', width: 100, datafield: 'Grupo'},
                            {text: 'Modelo', width: 120, datafield: 'varModelo'},
                            {
                                text: 'Peso Neto Unit.', width: 120, datafield: 'PesoNetoUnit', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);

                                                    return total;
                                                },
                                    }]
                            },
                            {
                                text: 'Peso Neto Total', width: 150, datafield: 'PesoNetoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Unit.', width: 120, datafield: 'PesoBrutoUnit', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Total', width: 150, datafield: 'PesoBrutoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Unit.', width: 120, datafield: 'AreaUnit', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Total', width: 150, datafield: 'AreaTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Precio', width: 90, datafield: 'Precio', cellsalign: 'right'},
                            {text: 'Contratista', width: 250, datafield: 'Contratista'},
                            {text: 'Maquina', width: 150, datafield: 'Maquina'},
                            {text: 'N°Bulto', width: 100, datafield: 'varBulto'},
                            {text: 'N°Guia', width: 100, datafield: 'nume_guia'},
                            {text: 'Observación', width: 250, datafield: 'obse_avan'},
                            {
                                text: 'Longitud', width: 120, datafield: 'Longitud', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['Longitud']);
                                                    return aggregatedValue + total;
                                                }
                                    }]
                            },
                            {text: 'Perfil', width: 250, datafield: 'varPerfil'},
                            {text: 'Pintura', width: 400, datafield: 'Pintura'},
                            {text: 'Lote de Pintura', width: 400, datafield: 'LotePintura'},
                            {text: 'Estado', width: 120, datafield: 'estado'},
                            {text: 'Usu.Crea', width: 150, datafield: 'acti_usua'},
                            {text: 'Fech.Crea.', width: 200, datafield: 'acti_hora', cellsformat: 'dd/MM/yyyy'},
                            {text: 'Usu.Mod', width: 160, datafield: 'usua_modi'},
                            {text: 'Fech.Mod.', width: 200, datafield: 'hora_modi', cellsformat: 'dd/MM/yyyy'},
                            {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                            {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                            /*{text: 'Observación 1', datafield: 'Obs1', width: 250},
                             {text: 'Observación 2', datafield: 'obs2', width: 250},
                             {text: 'Observación 3', datafield: 'obs3', width: 250},
                             {text: 'Observación 4', datafield: 'obs4', width: 250},*/
                            {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                            {text: 'intIdEtapa', width: '8%', datafield: 'intIdEtapa', hidden: true},
                            {text: 'intIdLotePintura', width: 140, datafield: 'intIdLotePintura', hidden: true},
                            {text: 'intIdContr', width: '8%', datafield: 'intIdContr', hidden: true},
                            {text: 'intIdProyZona', width: '8%', datafield: 'intIdProyZona', hidden: true},
                            {text: 'intIdProyTarea', width: '8%', datafield: 'intIdProyTarea', hidden: true},
                            {text: 'intIdProyPaquete', width: '8%', datafield: 'intIdProyPaquete', hidden: true},
                            {text: 'intIdMaqui', width: '8%', datafield: 'intIdMaqui', hidden: true},
                            {text: 'fecha', width: '8%', datafield: 'Fecha', cellsformat: 'dd/MM/yyyy', hidden: true},
                            {text: 'intIdPlan', width: 20, datafield: 'intIdPlan', hidden: true},
                        ]
                    });
                }
                $("#grid").jqxGrid('localizestrings', localizationobj);
                $("#modal-cargar-elem").modal('hide');
            }

        }
    });
}
/*FUNCION PARA LSTAR TODA LA DATA PARA USUARIOS SIN PRIVILEGIOS*/
function listar_ot_sin_privilegios(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte, rango_fecha, fecha_ini, fecha_fin, estado) {
    $("#grid").jqxGrid('clear');
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_repo_elem',
        dataType: 'json',
        data: {
            intIdProy: int_id_proyecto,
            intIdTipoProducto: int_IdTipo_Producto,
            intIdTipoEtap: int_IdTipo_Etap,
            intIdEtapa: int_Id_Etapa,
            intIdProyTarea: int_Id_Proy_Tarea,
            intIdProyPaquete: int_Id_Proy_Paquete,
            varCodiElemento: var_Codi_Elemento,
            TipoReporte: TipoReporte,
            v_RangoFecha: rango_fecha,
            v_FechaIni: fecha_ini,
            v_FechaFin: fecha_fin,
            v_estado: estado
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

                window.setTimeout(function () {

                    $("#modal-cargar-elem").modal('hide'); // COLOCO ANDY 
                }, 1000);
                //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte,rango_fecha,fecha_ini,fecha_fin);
            }
        },
        success: function (responses) {
            console.log(responses.data);
            if (responses.data.length > 0) {
                exportar_data = 1;
            } else {
                exportar_data = 0;
            }
            if (TipoReporte === '1') {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'EtapaActual', type: 'string'},
                        {name: 'EtapaAnterior', type: 'string'},
                        {name: 'EtapaSiguiente', type: 'string'},
                        {name: 'canti', type: 'string'},
                        {name: 'Saldo', type: 'string'},
                        {name: 'deciArea', type: 'string'},
                        {name: 'deciLong', type: 'string'},
                        {name: 'deciPesoBruto', type: 'string'},
                        {name: 'deciPesoContr', type: 'string'},
                        {name: 'deciPesoNeto', type: 'string'},
                        {name: 'deciPrec', type: 'string'},
                        {name: 'intCantRepro', type: 'number'},
                        {name: 'intIdProyPaquete', type: 'number'},
                        {name: 'intIdProyTarea', type: 'number'},
                        {name: 'intIdProyZona', type: 'number'},
                        {name: 'intRevision', type: 'number'},
                        {name: 'estado', type: 'string'},
                        {name: 'tarea', type: 'string'},
                        {name: 'varCodVal', type: 'string'},
                        {name: 'varCodiElemento', type: 'string'},
                        {name: 'varCodigoPaquete', type: 'string'},
                        {name: 'varDescripcion', type: 'string'},
                        {name: 'varModelo', type: 'string'},
                        {name: 'varPerfil', type: 'string'},
                        {name: 'zona', type: 'string'},
                        {name: 'intIdEsta', type: 'number'},
                        {name: 'intIdEtapa', type: 'number'},
                        {name: 'intIdEtapaAnte', type: 'number'},
                        {name: 'intIdEtapaSiguiente', type: 'number'},
                        {name: 'intIdRuta', type: 'number'},
                        {name: 'Ruta', type: 'string'},
                        {name: 'Pintura', type: 'string'},
                        {name: 'tipoEstructurado', type: 'string'},
                        {name: 'intIdPlan', type: 'string'},
                        {name: 'planta', type: 'string'},
                        {name: 'intIdTipoGrupo', type: 'number'},
                        {name: 'varDescTipoGrupo', type: 'string'},
                        {name: 'DocEnvioTS', type: 'string'},
                        {name: 'bulto', type: 'string'}, //andy lo coloco bultos
                        {name: 'Obs1', type: 'string'},
                        {name: 'obs2', type: 'string'},
                        {name: 'obs3', type: 'string'},
                        {name: 'obs4', type: 'string'},
                        {name: 'nume_guia', type: 'string'},
                        {name: 'PesoBrutoTotal', type: 'string'},
                        {name: 'PesoNetoTotal', type: 'string'},
                        {name: 'AreaTotal', type: 'string'},
                        {name: 'intReproceso', type: 'string'},
                        {name: 'intRechazo', type: 'string'},
                        {name: 'intIdRutaAnt', type: 'string'},
                        {name: 'RutaAnt', type: 'string'},
                        {name: 'LotePintura', type: 'string'},
                        {name: 'intIdLotePintura', type: 'number'}
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                    var html = '<center><button class="btn btn-danger btn-sm" onClick=ver_ruta("' + dataRecord.intIdRuta + '");><i class="fas fa-eye"></i> ' + value + '</button></center>';
                    return html;
                };
                var linkrenderer_accounts_2 = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                    var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + codigoot + '","' + dataRecord.intIdProyZona + '","' + dataRecord.varCodiElemento + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
                    return html;
                };
                var linkrenderer_accounts_3 = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                    var html = '<center><button class="btn btn-danger btn-sm" onClick=ver_ruta("' + dataRecord.intIdRutaAnt + '");><i class="fas fa-eye"></i> ' + value + '</button></center>';
                    return html;
                };
                if (int_IdTipo_Producto === "1") {
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '400',
                        source: dataAdapter,
                        selectionmode: 'multiplecellsextended',
                        theme: 'darkblue',
                        showfilterrow: true,
                        filterable: true,
                        groupable: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {
                                text: 'Series', datafield: 'Series', columntype: 'button', width: 70, pinned: true, cellsrenderer: function () {
                                    return "Series";
                                }, buttonclick: function (row) {
                                    // open the popup window when the user clicks a button.
                                    editrow = row;
                                    var offset = $("#grid").offset();
                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                    if (dataRecord.estado === "ANULADO" || dataRecord.estado === "TERMINADO") {

                                        $("#id_estado").val(dataRecord.estado);
                                        $("#grid3").jqxGrid({selectionmode: 'multiplecellsextended'});
                                        //$('#grid3').addClass('hidde_grid');
                                        //$('#anular_serie').addClass('hidde_grid');
                                        //$('#grid3').removeClass('hidde_grid');
                                        listar_series_ot(codigoot, codigoproducto, dataRecord.varCodiElemento, dataRecord.intIdProyZona,
                                                dataRecord.intRevision, dataRecord.varDescripcion, dataRecord.intCantRepro, dataRecord.deciPesoNeto,
                                                dataRecord.deciArea, dataRecord.deciLong, dataRecord.varPerfil, dataRecord.varCodVal, dataRecord.intIdProyTarea,
                                                dataRecord.intIdProyPaquete, dataRecord.deciPrec, dataRecord.intIdEsta, 2, dataRecord.intIdEtapa, dataRecord.intIdEtapaAnte,
                                                dataRecord.intIdEtapaSiguiente, dataRecord.Pintura, dataRecord.deciPesoBruto, dataRecord.deciPesoContr, dataRecord.varModelo,
                                                dataRecord.intIdRuta, dataRecord.intCantRepro, dataRecord.DocEnvioTS, dataRecord.bulto, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.nume_guia,
                                                dataRecord.intReproceso, dataRecord.intRechazo, dataRecord.intIdRutaAnt,dataRecord.intIdLotePintura);//andy lo coloco bultos
                                    } else {
                                        $("#grid3").jqxGrid({selectionmode: 'checkbox'});
                                        //$('#grid4').addClass('hidde_grid');
                                        //$('#anular_serie').removeClass('hidde_grid');
                                        //$('#grid4').removeClass('hidde_grid');
                                        listar_series_ot(codigoot, codigoproducto, dataRecord.varCodiElemento, dataRecord.intIdProyZona, dataRecord.intRevision,
                                                dataRecord.varDescripcion, dataRecord.intCantRepro, dataRecord.deciPesoNeto, dataRecord.deciArea, dataRecord.deciLong,
                                                dataRecord.varPerfil, dataRecord.varCodVal, dataRecord.intIdProyTarea, dataRecord.intIdProyPaquete, dataRecord.deciPrec,
                                                dataRecord.intIdEsta, 2, dataRecord.intIdEtapa, dataRecord.intIdEtapaAnte, dataRecord.intIdEtapaSiguiente,
                                                dataRecord.Pintura, dataRecord.deciPesoBruto, dataRecord.deciPesoContr, dataRecord.varModelo, dataRecord.intIdRuta,
                                                dataRecord.intCantRepro, dataRecord.DocEnvioTS, dataRecord.bulto, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.nume_guia,
                                                dataRecord.intReproceso, dataRecord.intRechazo, dataRecord.intIdRutaAnt,dataRecord.intIdLotePintura); //andy lo coloco bultos
                                    }

                                }
                            },
                            {text: 'Codigo', width: 120, datafield: 'varCodiElemento', pinned: true, cellsrenderer: linkrenderer_accounts_2, groupable: true},
                            {text: 'Descripción', width: 150, datafield: 'varDescripcion', pinned: true},
                            {text: 'Rev.', width: 50, datafield: 'intRevision', pinned: true},
                            {text: 'Repro', width: 50, datafield: 'intCantRepro', pinned: true},
                            {
                                text: 'Cantidad', width: 120, datafield: 'canti',pinned: true, cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['canti']);
                                                    //return final;
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            {text: 'Ruta', width: 180, datafield: 'Ruta', cellsrenderer: linkrenderer_accounts, cellsalign: 'center'},
                            {text: 'Etapa Act.', width: 200, datafield: 'EtapaActual'},
                            {text: 'Planta', width: 200, datafield: 'planta'},
                            {text: 'Zona', width: 120, datafield: 'zona'},
                            {text: 'Programa', width: 90, datafield: 'tarea'},
                            {text: 'Grupo', width: 100, datafield: 'varCodigoPaquete'},
                            {text: 'Modelo', width: 120, datafield: 'varModelo'},
                            {
                                text: 'Peso Neto Unit.', width: 130, datafield: 'deciPesoNeto', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);

                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Neto Total', width: 150, datafield: 'PesoNetoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Unit.', width: 130, datafield: 'deciPesoBruto', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Total', width: 150, datafield: 'PesoBrutoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Unit.', width: 130, datafield: 'deciArea', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Total', width: 150, datafield: 'AreaTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Codigo Valor', width: 90, datafield: 'varCodVal'},
                            {text: 'Precio', width: 100, datafield: 'deciPrec', cellsalign: 'right'},
                            {text: 'Etapa Ant.', width: 200, datafield: 'EtapaAnterior'},
                            {text: 'Etapa Sig.', width: 200, datafield: 'EtapaSiguiente'},
                            {
                                text: 'Longitud', width: 100, datafield: 'deciLong', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    subtotal = parseFloat(record['deciLong']) * parseFloat(record['canti']);
                                                    subtotal = parseFloat(subtotal).toFixed(3);
                                                    subtotal = parseFloat(subtotal);

                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Perfil', width: 180, datafield: 'varPerfil'},
                            {text: 'Pintura', width: 400, datafield: 'Pintura'},
                            {text: 'Lote Pintura', width: 400, datafield: 'LotePintura'},
                            {text: 'Nro° Guia', width: 180, datafield: 'nume_guia'},
                            {text: 'Estado', width: 100, datafield: 'estado'},
                            {
                                text: 'P.Contratado', width: 160, datafield: 'deciPesoContr', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    subtotal = parseFloat(record['deciPesoContr']) * parseFloat(record['canti']);
                                                    subtotal = parseFloat(subtotal).toFixed(3);
                                                    subtotal = parseFloat(subtotal);

                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                            {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                            {text: 'Documento Transferencia', datafield: 'DocEnvioTS', width: 250},
                            {text: 'Bulto', datafield: 'bulto', width: 250}, //andy lo coloco bultos
                            {text: 'Observación 1', datafield: 'Obs1', width: 250},
                            {text: 'Observación 2', datafield: 'obs2', width: 250},
                            {text: 'Observación 3', datafield: 'obs3', width: 250},
                            {text: 'Observación 4', datafield: 'obs4', width: 250},
                            {text: 'Reproceso', datafield: 'intReproceso', width: 250},
                            {text: 'Rechazo', datafield: 'intRechazo', width: 250},
                            {text: 'Ruta Anterior', datafield: 'RutaAnt', width: 250, cellsrenderer: linkrenderer_accounts_3},
                            {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                            {text: 'id_zona', width: '8%', datafield: 'intIdProyZona', hidden: true},
                            {text: 'id_tarea', width: '8%', datafield: 'intIdProyTarea', hidden: true},
                            {text: 'id_paquete', width: '8%', datafield: 'intIdProyPaquete', hidden: true},
                            {text: 'intIdEsta', width: '8%', datafield: 'intIdEsta', hidden: true},
                            {text: 'intIdEtapa', width: '8%', datafield: 'intIdEtapa', hidden: true},
                            {text: 'intIdEtapaAnte', width: '8%', datafield: 'intIdEtapaAnte', hidden: true},
                            {text: 'intIdEtapaSiguiente', width: '8%', datafield: 'intIdEtapaSiguiente', hidden: true},
                            {text: 'intIdPlan', width: 20, datafield: 'intIdPlan', hidden: true},
                            {text: 'intIdLotePintura', width: 20, datafield: 'intIdLotePintura', hidden: true},
                        ]
                    });
                } else {
                    var linkrenderer_accounts_2 = function (row, column, value, rowKey, rowData) {
                        var editrow = row;
                        var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                        var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + codigoot + '","' + dataRecord.intIdProyZona + '","' + dataRecord.varCodiElemento + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
                        return html;
                    };
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '400',
                        source: dataAdapter,
                        selectionmode: 'multiplecellsextended',
                        theme: 'darkblue',
                        showfilterrow: true,
                        filterable: true,
                        groupable: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {
                                text: 'Series', datafield: 'Series', columntype: 'button',pinned: true, width: 70, cellsrenderer: function () {
                                    return "Series";
                                }, buttonclick: function (row) {
                                    // open the popup window when the user clicks a button.
                                    editrow = row;
                                    var offset = $("#grid").offset();
                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                    if (dataRecord.estado === "ANULADO" || dataRecord.estado === "TERMINADO") {

                                        $("#id_estado").val(dataRecord.estado);
                                        $("#grid3").jqxGrid({selectionmode: 'multiplecellsextended'});
                                        //$('#grid3').addClass('hidde_grid');
                                        //$('#anular_serie').addClass('hidde_grid');
                                        //$('#grid3').removeClass('hidde_grid');
                                        listar_series_ot(codigoot, codigoproducto, dataRecord.varCodiElemento, dataRecord.intIdProyZona,
                                                dataRecord.intRevision, dataRecord.varDescripcion, dataRecord.intCantRepro, dataRecord.deciPesoNeto,
                                                dataRecord.deciArea, dataRecord.deciLong, dataRecord.varPerfil, dataRecord.varCodVal, dataRecord.intIdProyTarea,
                                                dataRecord.intIdProyPaquete, dataRecord.deciPrec, dataRecord.intIdEsta, 2, dataRecord.intIdEtapa, dataRecord.intIdEtapaAnte,
                                                dataRecord.intIdEtapaSiguiente, dataRecord.Pintura, dataRecord.deciPesoBruto, dataRecord.deciPesoContr, dataRecord.varModelo,
                                                dataRecord.intIdRuta, dataRecord.intCantRepro, dataRecord.DocEnvioTS, dataRecord.bulto, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.nume_guia,
                                                dataRecord.intReproceso, dataRecord.intRechazo, dataRecord.intIdRutaAnt,dataRecord.intIdLotePintura);//andy lo coloco bultos
                                    } else {
                                        $("#grid3").jqxGrid({selectionmode: 'checkbox'});
                                        //$('#grid4').addClass('hidde_grid');
                                        //$('#anular_serie').removeClass('hidde_grid');
                                        //$('#grid4').removeClass('hidde_grid');
                                        listar_series_ot(codigoot, codigoproducto, dataRecord.varCodiElemento, dataRecord.intIdProyZona, dataRecord.intRevision,
                                                dataRecord.varDescripcion, dataRecord.intCantRepro, dataRecord.deciPesoNeto, dataRecord.deciArea, dataRecord.deciLong,
                                                dataRecord.varPerfil, dataRecord.varCodVal, dataRecord.intIdProyTarea, dataRecord.intIdProyPaquete, dataRecord.deciPrec,
                                                dataRecord.intIdEsta, 2, dataRecord.intIdEtapa, dataRecord.intIdEtapaAnte, dataRecord.intIdEtapaSiguiente,
                                                dataRecord.Pintura, dataRecord.deciPesoBruto, dataRecord.deciPesoContr, dataRecord.varModelo, dataRecord.intIdRuta,
                                                dataRecord.intCantRepro, dataRecord.DocEnvioTS, dataRecord.bulto, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.nume_guia,
                                                dataRecord.intReproceso, dataRecord.intRechazo, dataRecord.intIdRutaAnt,dataRecord.intIdLotePintura); //andy lo coloco bultos
                                    }

                                }
                            },
                            {text: 'Codigo', width: 120, datafield: 'varCodiElemento',pinned: true, cellsrenderer: linkrenderer_accounts_2, groupable: true},
                            {text: 'Descripción', width: 150, datafield: 'varDescripcion',pinned: true,},
                            {text: 'Rev.', width: 50, datafield: 'intRevision',pinned: true},
                            {text: 'Repro', width: 50, datafield: 'intCantRepro',pinned: true},
                            {
                                text: 'Cantidad', width: 120, datafield: 'canti',pinned: true, cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['canti']);
                                                    //return final;
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            {
                                text: 'Saldo', width: 120, datafield: 'Saldo', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['Saldo']);
                                                    //return final;
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            {text: 'Ruta', width: 180, datafield: 'Ruta', cellsrenderer: linkrenderer_accounts, cellsalign: 'center'},
                            {text: 'Etapa Act.', width: 200, datafield: 'EtapaActual'},
                            {text: 'Planta', width: 200, datafield: 'planta'},
                            {text: 'Zona', width: 120, datafield: 'zona'},
                            {text: 'Programa', width: 90, datafield: 'tarea'},
                            {text: 'Grupo', width: 100, datafield: 'varCodigoPaquete'},
                            {text: 'Modelo', width: 120, datafield: 'varModelo'},
                            {
                                text: 'Peso Neto Unit.', width: 130, datafield: 'deciPesoNeto', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Neto Total', width: 150, datafield: 'PesoNetoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Unit.', width: 130, datafield: 'deciPesoBruto', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Total', width: 150, datafield: 'PesoBrutoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Unit.', width: 130, datafield: 'deciArea', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Total', width: 150, datafield: 'AreaTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Codigo Valor', width: 90, datafield: 'varCodVal'},
                            {text: 'Precio', width: 100, datafield: 'deciPrec', cellsalign: 'right'},
                            {text: 'Etapa Ant.', width: 200, datafield: 'EtapaAnterior'},
                            {text: 'Etapa Sig.', width: 200, datafield: 'EtapaSiguiente'},
                            {
                                text: 'Longitud', width: 100, datafield: 'deciLong', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    subtotal = parseFloat(record['deciLong']) * parseFloat(record['canti']);
                                                    subtotal = parseFloat(subtotal).toFixed(3);
                                                    subtotal = parseFloat(subtotal);

                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Perfil', width: 180, datafield: 'varPerfil'},
                            {text: 'Pintura', width: 400, datafield: 'Pintura'},
                            {text: 'Lote Pintura', width: 400, datafield: 'LotePintura'},
                            {text: 'Estado', width: 100, datafield: 'estado'},
                            {
                                text: 'P.Contratado', width: 160, datafield: 'deciPesoContr', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    subtotal = parseFloat(record['deciPesoContr']) * parseFloat(record['canti']);
                                                    subtotal = parseFloat(subtotal).toFixed(3);
                                                    subtotal = parseFloat(subtotal);

                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                            {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                            {text: 'Documento Transferencia', datafield: 'DocEnvioTS', width: 250},
                            {text: 'Bulto', datafield: 'bulto', width: 250}, //andy lo coloco bultos
                            /*{text: 'Observación 1', datafield: 'Obs1', width: 250},
                             {text: 'Observación 2', datafield: 'obs2', width: 250},
                             {text: 'Observación 3', datafield: 'obs3', width: 250},
                             {text: 'Observación 4', datafield: 'obs4', width: 250},*/
                            {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                            {text: 'id_zona', width: '8%', datafield: 'intIdProyZona', hidden: true},
                            {text: 'intIdLotePintura', width: '8%', datafield: 'intIdLotePintura', hidden: true},
                            {text: 'id_tarea', width: '8%', datafield: 'intIdProyTarea', hidden: true},
                            {text: 'id_paquete', width: '8%', datafield: 'intIdProyPaquete', hidden: true},
                            {text: 'intIdEsta', width: '8%', datafield: 'intIdEsta', hidden: true},
                            {text: 'intIdEtapa', width: '8%', datafield: 'intIdEtapa', hidden: true},
                            {text: 'intIdEtapaAnte', width: '8%', datafield: 'intIdEtapaAnte', hidden: true},
                            {text: 'intIdEtapaSiguiente', width: '8%', datafield: 'intIdEtapaSiguiente', hidden: true},
                            {text: 'intIdPlan', width: 20, datafield: 'intIdPlan', hidden: true},
                        ]
                    });
                }
                $("#grid").jqxGrid('localizestrings', localizationobj);
                $("#modal-cargar-elem").modal("hide");
            } else if (TipoReporte === '2') {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'Codigo', type: 'string'},
                        {name: 'Nombre', type: 'string'},
                        {name: 'Revis', type: 'number'},
                        {name: 'intNuConta', type: 'number'},
                        {name: 'Cantidad', type: 'number'},
                        {name: 'Saldo', type: 'string'},
                        {name: 'EtapaAvance', type: 'string'},
                        {name: 'Zona', type: 'string'},
                        {name: 'Programa', type: 'string'},
                        {name: 'Grupo', type: 'string'},
                        {name: 'PesoNetoUnit', type: 'float'},
                        {name: 'PesoBrutoUnit', type: 'float'},
                        {name: 'AreaUnit', type: 'float'},
                        {name: 'Precio', type: 'float'},
                        {name: 'UsuarioCreac', type: 'string'},
                        {name: 'UsuarioModi', type: 'string'},
                        {name: 'FechaModif', type: 'date'},
                        {name: 'Contratista', type: 'string'},
                        {name: 'Maquina', type: 'string'},
                        {name: 'obse_avan', type: 'string'},
                        {name: 'Longitud', type: 'float'},
                        {name: 'varPerfil', type: 'string'},
                        {name: 'varBulto', type: 'string'},
                        {name: 'nume_guia', type: 'string'},
                        {name: 'intIdEtapa', type: 'number'},
                        {name: 'intIdContr', type: 'number'},
                        {name: 'intIdProyZona', type: 'number'},
                        {name: 'intIdProyTarea', type: 'number'},
                        {name: 'intIdProyPaquete', type: 'number'},
                        {name: 'intIdMaqui', type: 'number'},
                        {name: 'Fecha', type: 'date'},
                        {name: 'Pintura', type: 'string'},
                        {name: 'varModelo', type: 'string'},
                        {name: 'tipoEstructurado', type: 'string'},
                        {name: 'acti_usua', type: 'string'},
                        {name: 'acti_hora', type: 'string'},
                        {name: 'usua_modi', type: 'string'},
                        {name: 'hora_modi', type: 'string'},
                        {name: 'intIdPlan', type: 'string'},
                        {name: 'planta', type: 'string'},
                        {name: 'intIdTipoGrupo', type: 'number'},
                        {name: 'varDescTipoGrupo', type: 'string'},
                        {name: 'DocEnvioTS', type: 'string'},
                        {name: 'Obs1', tyope: 'string'},
                        {name: 'obs2', tyope: 'string'},
                        {name: 'obs3', tyope: 'string'},
                        {name: 'obs4', tyope: 'string'},
                        {name: 'estado', type: 'string'},
                        {name: 'PesoBrutoTotal', type: 'string'},
                        {name: 'PesoNetoTotal', type: 'string'},
                        {name: 'AreaTotal', type: 'string'},
                        {name: 'numDocTratSup', type: 'string'},
                        {name: 'intIdRuta', type: 'string'},
                        {name: 'intMaxContaEtap', type: 'string'},
                        {name: 'RutaAnt', type: 'string'},
                        {name: 'LotePintura', type: 'string'},
                        {name: 'intIdLotePintura', type: 'number'}
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                var linkrenderer_accounts_2 = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                    var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + codigoot + '","' + dataRecord.intIdProyZona + '","' + dataRecord.Codigo + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
                    return html;
                };
                var linkrenderer_accounts_3 = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                    var html = '<center><button class="btn btn-danger btn-sm" onClick=ver_ruta("' + dataRecord.intIdRuta + '");><i class="fas fa-eye"></i> ' + value + '</button></center>';
                    return html;
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                if (int_IdTipo_Producto === "1") {
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '400',
                        source: dataAdapter,
                        selectionmode: 'multiplecellsextended',
                        theme: 'darkblue',
                        showfilterrow: true,
                        filterable: true,
                        groupable: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {
                                text: 'Series', datafield: 'Series', columntype: 'button',pinned: true,width: 70, cellsrenderer: function () {
                                    return "Series";
                                }, buttonclick: function (row) {
                                    // open the popup window when the user clicks a button.
                                    editrow = row;
                                    var offset = $("#grid").offset();
                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                    var año = new Date(dataRecord.Fecha).getFullYear();
                                    var dia = new Date(dataRecord.Fecha).getDate() + 1;
                                    var mes = new Date(dataRecord.Fecha).getMonth() + 1;
                                    if (mes <= 9) {
                                        var mes_inicio = '0' + mes;
                                    } else {
                                        var mes_inicio = mes;
                                    }
                                    if (dia <= 9) {
                                        var dia_ultimo = '0' + dia;
                                    } else {
                                        var dia_ultimo = dia;
                                    }
                                    var fecha_valo = año + '-' + mes_inicio + '-' + dia_ultimo;
                                    listar_series_historicos(codigoot, codigoproducto, dataRecord.Codigo, dataRecord.Nombre, dataRecord.intIdProyZona,
                                            dataRecord.intIdProyTarea, dataRecord.intIdProyPaquete, dataRecord.PesoNetoUnit, dataRecord.PesoBrutoUnit, dataRecord.AreaUnit,
                                            dataRecord.Revis, dataRecord.intNuConta, dataRecord.intIdEtapa, dataRecord.Precio, dataRecord.intIdContr, dataRecord.intIdMaqui,
                                            dataRecord.obse_avan, dataRecord.varBulto, dataRecord.nume_guia, fecha_valo, dataRecord.varPerfil, dataRecord.Pintura, dataRecord.Obs1, dataRecord.obs2, dataRecord.obs3, dataRecord.obs4, dataRecord.intIdRuta, dataRecord.intMaxContaEtap);
                                }
                            },
                            {text: 'Codigo', width: 120, datafield: 'Codigo',pinned: true,cellsrenderer: linkrenderer_accounts_2, groupable: true},
                            {text: 'Nombre', width: 150, datafield: 'Nombre',pinned: true},
                            {text: 'Rev.', width: 50, datafield: 'Revis',pinned: true},
                            {text: 'Repro', width: 50, datafield: 'intNuConta',pinned: true},
                            {
                                text: 'Cantidad', width: 120, datafield: 'Cantidad',pinned: true, aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['Cantidad']);
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            {text: 'Etapa Avn.', width: 200, datafield: 'EtapaAvance'},
                            {text: 'Planta', width: 200, datafield: 'planta'},
                            {text: 'Zona', width: 120, datafield: 'Zona'},
                            {text: 'Programa', width: 90, datafield: 'Programa'},
                            {text: 'Grupo', width: 100, datafield: 'Grupo'},
                            {text: 'Modelo', width: 120, datafield: 'varModelo'},
                            {
                                text: 'Peso Neto Unit.', width: 120, datafield: 'PesoNetoUnit', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]
                            },
                            {
                                text: 'Peso Neto Total', width: 150, datafield: 'PesoNetoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Unit.', width: 120, datafield: 'PesoBrutoUnit', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Total', width: 150, datafield: 'PesoBrutoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Unit.', width: 120, datafield: 'AreaUnit', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Total', width: 150, datafield: 'AreaTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Precio', width: 90, datafield: 'Precio'},
                            {text: 'Contratista', width: 250, datafield: 'Contratista'},
                            {text: 'Maquina', width: 150, datafield: 'Maquina'},
                            {text: 'N°Bulto', width: 100, datafield: 'varBulto'},
                            {text: 'N°Guía', width: 100, datafield: 'nume_guia'},
                            {text: 'Observación', width: 250, datafield: 'obse_avan'},
                            {
                                text: 'Longitud', width: 120, datafield: 'Longitud', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    subtotal = parseFloat(record['Longitud']) * parseFloat(record['Cantidad']);
                                                    subtotal = parseFloat(subtotal).toFixed(3);
                                                    subtotal = parseFloat(subtotal);

                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Perfil', width: 250, datafield: 'varPerfil'},
                            {text: 'Pintura', width: 400, datafield: 'Pintura'},
                            {text: 'Lote Pintura', width: 400, datafield: 'LotePintura'},
                            {text: 'Estado', width: 150, datafield: 'estado'},
                            {text: 'Usu.Crea', width: 150, datafield: 'acti_usua'},
                            {text: 'Fech.Crea.', width: 200, datafield: 'acti_hora', cellsformat: 'dd/MM/yyyy'},
                            {text: 'Usu.Mod', width: 160, datafield: 'usua_modi'},

                            {text: 'Fech.Mod.', width: 200, datafield: 'hora_modi', cellsformat: 'dd/MM/yyyy'},
                            {text: 'Doc. Internam', width: 110, datafield: 'numDocTratSup'},
                            {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                            {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                            {text: 'Documento Transferencia', datafield: 'DocEnvioTS', width: 250},
                            {text: 'Observación 1', datafield: 'Obs1', width: 250},
                            {text: 'Observación 2', datafield: 'obs2', width: 250},
                            {text: 'Observación 3', datafield: 'obs3', width: 250},
                            {text: 'Observación 4', datafield: 'obs4', width: 250},
                            {text: 'Ruta', datafield: 'RutaAnt', width: 250, cellsrenderer: linkrenderer_accounts_3},
                            {text: 'Ult.Avanc.Etapa', datafield: 'intMaxContaEtap', width: 250},
                            {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                            {text: 'intIdLotePintura', width: 140, datafield: 'intIdLotePintura', hidden: true},
                            {text: 'intIdEtapa', width: '8%', datafield: 'intIdEtapa', hidden: true},
                            {text: 'intIdContr', width: '8%', datafield: 'intIdContr', hidden: true},
                            {text: 'intIdProyZona', width: '8%', datafield: 'intIdProyZona', hidden: true},
                            {text: 'intIdProyTarea', width: '8%', datafield: 'intIdProyTarea', hidden: true},
                            {text: 'intIdProyPaquete', width: '8%', datafield: 'intIdProyPaquete', hidden: true},
                            {text: 'intIdMaqui', width: '8%', datafield: 'intIdMaqui', hidden: true},
                            {text: 'fecha', width: '8%', datafield: 'Fecha', cellsformat: 'dd/MM/yyyy', hidden: true},
                            {text: 'intIdPlan', width: 20, datafield: 'intIdPlan', hidden: true},
                        ]
                    });
                } else {
                    var linkrenderer_accounts_2 = function (row, column, value, rowKey, rowData) {
                        var editrow = row;
                        var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                        var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + codigoot + '","' + dataRecord.intIdProyZona + '","' + dataRecord.Codigo + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
                        return html;
                    };
                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '400',
                        source: dataAdapter,
                        selectionmode: 'multiplecellsextended',
                        theme: 'darkblue',
                        showfilterrow: true,
                        filterable: true,
                        groupable: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {text: 'Codigo', width: 120, datafield: 'Codigo', cellsrenderer: linkrenderer_accounts_2, groupable: true},
                            {text: 'Nombre', width: 150, datafield: 'Nombre'},
                            {text: 'Rev.', width: 50, datafield: 'Revis'},
                            {text: 'Repro', width: 50, datafield: 'intNuConta'},
                            {
                                text: 'Cantidad', width: 120, datafield: 'Cantidad', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = parseFloat(record['Cantidad']);
                                                    return aggregatedValue + total;
                                                },
                                    }]
                            },
                            /*{
                             text: 'Saldo', width: 120, datafield: 'Saldo', aggregates: [{
                             '<b>#</b>':
                             function (aggregatedValue, currentValue, column, record) {
                             
                             var total = parseFloat(record['Saldo']);
                             return aggregatedValue + total;
                             },
                             }]
                             },*/
                            {text: 'Etapa Avn.', width: 200, datafield: 'EtapaAvance'},
                            {text: 'Planta', width: 200, datafield: 'planta'},
                            {text: 'Zona', width: 120, datafield: 'Zona'},
                            {text: 'Programa', width: 90, datafield: 'Programa'},
                            {text: 'Grupo', width: 100, datafield: 'Grupo'},
                            {text: 'Modelo', width: 120, datafield: 'varModelo'},
                            {
                                text: 'Peso Neto Unit.', width: 120, datafield: 'PesoNetoUnit', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]
                            },
                            {
                                text: 'Peso Neto Total', width: 150, datafield: 'PesoNetoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoNetoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Unit.', width: 120, datafield: 'PesoBrutoUnit', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Peso Bruto Total', width: 150, datafield: 'PesoBrutoTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['PesoBrutoTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Unit.', width: 120, datafield: 'AreaUnit', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaUnit']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {
                                text: 'Area Total', width: 150, datafield: 'AreaTotal', cellsalign: 'right', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['AreaTotal']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Precio', width: 90, datafield: 'Precio'},
                            {text: 'Contratista', width: 250, datafield: 'Contratista'},
                            {text: 'Maquina', width: 150, datafield: 'Maquina'},
                            {text: 'N°Bulto', width: 100, datafield: 'varBulto'},
                            {text: 'N°Guía', width: 100, datafield: 'nume_guia'},
                            {text: 'Observación', width: 250, datafield: 'obse_avan'},
                            {
                                text: 'Longitud', width: 120, datafield: 'Longitud', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {
                                                    var total = 0;
                                                    subtotal = parseFloat(record['Longitud']) * parseFloat(record['Cantidad']);
                                                    subtotal = parseFloat(subtotal).toFixed(3);
                                                    subtotal = parseFloat(subtotal);
                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]
                            },
                            {text: 'Perfil', width: 250, datafield: 'varPerfil'},
                            {text: 'Pintura', width: 400, datafield: 'Pintura'},
                            {text: 'Lote Pintura', width: 400, datafield: 'LotePintura'},
                            {text: 'Estado', width: 150, datafield: 'estado'},
                            {text: 'Usu.Crea', width: 150, datafield: 'acti_usua'},
                            {text: 'Fech.Crea.', width: 200, datafield: 'acti_hora', cellsformat: 'dd/MM/yyyy'},
                            {text: 'Usu.Mod', width: 160, datafield: 'usua_modi'},
                            {text: 'Fech.Mod.', width: 200, datafield: 'hora_modi', cellsformat: 'dd/MM/yyyy'},
                            {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                            {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                            {text: 'Documento Transferencia', datafield: 'DocEnvioTS', width: 250},
                            /* {text: 'Observación 1', datafield: 'Obs1', width: 250},
                             {text: 'Observación 2', datafield: 'obs2', width: 250},
                             {text: 'Observación 3', datafield: 'obs3', width: 250},
                             {text: 'Observación 4', datafield: 'obs4', width: 250},*/
                            {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                            {text: 'intIdEtapa', width: '8%', datafield: 'intIdEtapa', hidden: true},
                            {text: 'intIdLotePintura', width: 140, datafield: 'intIdLotePintura', hidden: true},
                            {text: 'intIdContr', width: '8%', datafield: 'intIdContr', hidden: true},
                            {text: 'intIdProyZona', width: '8%', datafield: 'intIdProyZona', hidden: true},
                            {text: 'intIdProyTarea', width: '8%', datafield: 'intIdProyTarea', hidden: true},
                            {text: 'intIdProyPaquete', width: '8%', datafield: 'intIdProyPaquete', hidden: true},
                            {text: 'intIdMaqui', width: '8%', datafield: 'intIdMaqui', hidden: true},
                            {text: 'fecha', width: '8%', datafield: 'Fecha', cellsformat: 'dd/MM/yyyy', hidden: true},
                            {text: 'intIdPlan', width: 20, datafield: 'intIdPlan', hidden: true},
                        ]
                    });
                }
                $("#grid").jqxGrid('localizestrings', localizationobj);
                $("#modal-cargar-elem").modal("hide");
            }
        }
    });
}
function listar_ot_series(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte, estado_serie2) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_repo_elem',
        dataType: 'json',
        data: {
            intIdProy: int_id_proyecto,
            intIdTipoProducto: int_IdTipo_Producto,
            intIdTipoEtap: int_IdTipo_Etap,
            intIdEtapa: int_Id_Etapa,
            intIdProyTarea: int_Id_Proy_Tarea,
            intIdProyPaquete: int_Id_Proy_Paquete,
            varCodiElemento: var_Codi_Elemento,
            TipoReporte: TipoReporte,
            v_estado: estado_serie2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, 3);
            }
        },
        success: function (responses) {
            JSONToCSVConvertor(responses.data, "Series", true);
        }
    });
}
function listar_series_ot(intIdProy, intIdTipoProducto, varCodiElemento, intIdProyZona, intRevision,
        varDescripcion, intCantRepro, deciPesoNeto, deciArea, deciLong, varPerfil, varCodVal, intIdProyTarea,
        intIdProyPaquete, deciPrec, intIdEsta, estado, actual, anterior, siguiente, pintura, peso_bruto, peso_contrata,
        modelo, ruta, reproceso, doc_trans, bultos, obs1, obs2, obs3, obs4, nr_guia, reproceso, rechazo, ruta_anterior,idlotepintura) { //andy lo coloco bultos
    $("#codigo_avanance").val(varCodiElemento);
    if (estado === 2) {
        var count = 0;
        $.ajax({
            type: 'POST',
            url: url + '/GestionPartList/public/index.php/most_cant_info',
            dataType: 'json',
            data: {
                intIdProy: intIdProy,
                intIdTipoProducto: intIdTipoProducto,
                varCodiElemento: varCodiElemento,
                intIdProyZona: intIdProyZona,
                intRevision: intRevision,
                varDescripcion: varDescripcion,
                intCantRepro: intCantRepro,
                deciPesoNeto: deciPesoNeto,
                deciArea: deciArea,
                deciLong: deciLong,
                varPerfil: varPerfil,
                varCodVal: varCodVal,
                intIdProyTarea: intIdProyTarea,
                intIdProyPaquete: intIdProyPaquete,
                deciPrec: deciPrec,
                intIdEsta: intIdEsta,
                intIdEtapa: actual,
                intIdEtapaAnte: anterior,
                intIdEtapaSiguiente: siguiente,
                varValo1: pintura,
                deciPesoBruto: peso_bruto,
                deciPesoContr: peso_contrata,
                varModelo: modelo,
                intIdRuta: ruta,
                DocEnvioTS: doc_trans,
                bultos: bultos, //andy lo coloco bultos
                Obs1: obs1,
                obs2: obs2,
                obs3: obs3,
                obs4: obs4,
                nume_guia: nr_guia,
                intReproceso: reproceso,
                intRechazo: rechazo,
                intIdRutaAnt: ruta_anterior,
                intIdLotePintura:idlotepintura
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte);
                }
            },
            success: function (responses) {

                if (responses.data.length) {
                    count = responses.data.length;
                    var source = {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'hora_modi', type: 'string'},
                            {name: 'intIdEleme', type: 'number'},
                            {name: 'intIdProy', type: 'number'},
                            {name: 'intIdTipoProducto', type: 'number'},
                            {name: 'intRevision', type: 'number'},
                            {name: 'intSerie', type: 'number'},
                            {name: 'usua_modi', type: 'string'},
                            {name: 'varCodiElemento', type: 'string'},
                            {name: 'varCodiProy', type: 'string'},
                            {name: 'varDescEsta', type: 'string'},
                            {name: 'varDescripcion', type: 'string'},
                        ], updaterow: function (rowid, rowdata, commit) {
                            commit(true);
                        }
                    };
                    dataAdapter = new $.jqx.dataAdapter(source);
                    var editrow = -1;
                    $("#grid3").jqxGrid({
                        width: '100%',
                        height: '300',
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        enabletooltips: true,
                        editable: true,
                        theme: 'darkblue',
                        showstatusbar: true,
                        statusbarheight: 25,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {text: 'id_elemento', datafield: 'intIdEleme', width: '10%', hidden: true},
                            {
                                text: 'Codigo', datafield: 'varCodiElemento', editable: false, width: '16.6%', aggregates: [{
                                        '<b>Total</b>':
                                                function (aggregatedValue, currentValue, column, record) {
                                                    var count = $("#grid3").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]
                            },
                            {text: 'Descripción', datafield: 'varDescripcion', editable: false, width: '16.6%'},
                            {text: 'Serie', datafield: 'intSerie', width: '6%', editable: false},
                            {text: 'Estado', datafield: 'varDescEsta', width: '15%', editable: false},
                            {text: 'Usu.Modi', datafield: 'usua_modi', width: '16.6%', editable: false},
                            {text: 'Hr.Modi', datafield: 'hora_modi', cellsformat: 'dd/MM/yyyy hh:mm:ss', width: '25%', editable: false},
                        ]
                    });
                    $("#grid3").jqxGrid('localizestrings', localizationobj);
                    $("#modal-lista-series-ot").modal('show');
                } else {
                }
            }
        });
    } else {
        var count = 0;
        $.ajax({
            type: 'POST',
            url: url + '/GestionPartList/public/index.php/most_cant_info',
            dataType: 'json',
            data: {
                intIdProy: intIdProy,
                intIdTipoProducto: intIdTipoProducto,
                varCodiElemento: varCodiElemento,
                intIdProyZona: intIdProyZona,
                intRevision: intRevision,
                varDescripcion: varDescripcion,
                intCantRepro: intCantRepro,
                deciPesoNeto: deciPesoNeto,
                deciArea: deciArea,
                deciLong: deciLong,
                varPerfil: varPerfil,
                varCodVal: varCodVal,
                intIdProyTarea: intIdProyTarea,
                intIdProyPaquete: intIdProyPaquete,
                deciPrec: deciPrec,
                intIdEsta: intIdEsta,
                intIdEtapa: actual,
                intIdEtapaAnte: anterior,
                intIdEtapaSiguiente: siguiente,
                varValo1: pintura,
                deciPesoBruto: peso_bruto,
                deciPesoContr: peso_contrata,
                varModelo: modelo,
                intIdRuta: ruta,
                DocEnvioTS: doc_trans,
                bultos: bultos, //andy lo coloco bultos
                Obs1: obs1, //andy lo coloco bultos
                obs2: obs2, //andy lo coloco bultos
                obs3: obs3, //andy lo coloco bultos
                obs4: obs4, //andy lo coloco bultos
                nume_guia: nr_guia,
                nume_guia: nr_guia,
                intReproceso: reproceso,
                intRechazo: rechazo,
                intIdRutaAnt: ruta_anterior
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte);
                }
            },
            success: function (responses) {
                if (responses.data.length) {
                    count = responses.data.length;
                    var source = {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'hora_modi', type: 'date', format: 'dd/MM/yyyy'},
                            {name: 'intIdEleme', type: 'number'},
                            {name: 'intIdProy', type: 'number'},
                            {name: 'intIdTipoProducto', type: 'number'},
                            {name: 'intRevision', type: 'number'},
                            {name: 'intSerie', type: 'number'},
                            {name: 'usua_modi', type: 'string'},
                            {name: 'varCodiElemento', type: 'string'},
                            {name: 'varCodiProy', type: 'string'},
                            {name: 'varDescEsta', type: 'string'},
                            {name: 'varDescripcion', type: 'string'},
                        ], updaterow: function (rowid, rowdata, commit) {
                            commit(true);
                        }
                    };
                    dataAdapter = new $.jqx.dataAdapter(source);
                    var editrow = -1;
                    $("#grid4").jqxGrid({
                        width: '100%',
                        height: '300',
                        source: dataAdapter,
                        columnsresize: true,
                        altrows: true,
                        enabletooltips: true,
                        editable: true,
                        theme: 'darkblue',
                        showstatusbar: true,
                        statusbarheight: 25,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {text: 'id_elemento', datafield: 'intIdEleme', width: '10%', hidden: true},
                            {
                                text: 'Codigo', datafield: 'varCodiElemento', width: '16.6%', editable: false, aggregates: [{
                                        '<b>Total</b>':
                                                function (aggregatedValue, currentValue, column, record) {
                                                    var count = $("#grid4").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]
                            },
                            {text: 'Descripción', datafield: 'varDescripcion', editable: false, width: '16.6%'},
                            {text: 'Serie', datafield: 'intSerie', editable: false, width: '6%'},
                            {text: 'Estado', datafield: 'varDescEsta', editable: false, width: '15%'},
                            {text: 'Usu.Modi', datafield: 'usua_modi', editable: false, width: '16.6%'},
                            {text: 'Hr.Modi', datafield: 'hora_modi', editable: false, cellsformat: 'dd/MM/yyyy hh:mm:ss', width: '25%'},
                        ]
                    });
                    $("#grid4").jqxGrid('localizestrings', localizationobj);
                    $("#modal-lista-series-ot").modal('show');
                }
            }
        });
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
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}
function handleClick(myRadio) {
    $("#modal-cargar-elem").modal('show');
    $("#fech_fin").val('dd/MM/yyyy');
    $("#fech_inic").val('dd/MM/yyyy');
    rango_fechas = 0;
    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
    var codigo_producto = "";
    var paquete_codigos = "";
    var tarea_codigos = "";
    var tipo_etapa_codigos = "";
    var etapa_codigos = "";
    var fecha_inicio = $("#fech_inic").val();
    var fecha_fin = $("#fech_fin").val();

    var estado_check = $("#estados_ot").val(); //COLOCO ANDY 

    if (fecha_inicio !== "" && fecha_fin !== "") {
        if (fecha_inicio > fecha_fin) {
            mensaje(false, "Fecha inicio debe ser menor a la fecha final", "no");
        } else {
            rango_fechas = 1;
        }
    }
    if (checkedItems_etapa.trim() === '-1,') {
        etapa_codigos = -1;
    } else if (checkedItems_etapa === '') {
        etapa_codigos = -1;
    } else {
        etapa_codigos = checkedItems_etapa.replace(/ /g, "");
    }
    if (checkedItems_tipo_etapa.trim() === '-1,') {
        tipo_etapa_codigos = -1;
    } else if (checkedItems_tipo_etapa === '') {
        tipo_etapa_codigos = -1;
    } else {
        tipo_etapa_codigos = checkedItems_tipo_etapa.replace(/ /g, "");
    }
    if (checkedItems_tarea.trim() === '-1,') {
        tarea_codigos = -1;
    } else if (checkedItems_tarea.trim() === '') {
        tarea_codigos = -1;
    } else {
        tarea_codigos = checkedItems_tarea.replace(/ /g, "");
    }
    if (checkedItems_paquete.trim() === '-1,') {
        paquete_codigos = -1;
    } else if (checkedItems_paquete.trim() === '') {
        paquete_codigos = -1;
    } else {
        paquete_codigos = checkedItems_paquete.replace(/ /g, "");
    }
    if (checkedItems.trim() === "TODOS,") {
        codigo_producto = -1;
    } else if (checkedItems.trim() === "") {
        codigo_producto = -1;
    } else {
        codigo_producto = checkedItems.replace(/ /g, "");
    }
    if (myRadio.value === '1') {
        $("#fecha_i").addClass('hidde_grid');
        $("#fecha_f").addClass('hidde_grid');
        if (usuario_admitido === 1) {
            $("#asignar_pintura").removeClass('hidde_grid');
            if (codigoot) {
                if (codigoproducto) {
                    listar_ot(codigoot, codigoproducto, etapa_codigos, tipo_etapa_codigos, tarea_codigos, paquete_codigos, codigo_producto, reporte, rango_fechas, fecha_inicio, fecha_fin, estado_check); // COLOCO ANDY ESTADO
                } else {
                    mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
                }
            } else {
                mensaje(false, "Seleccione una O.T", "no");
            }
        } else {
            if (codigoot) {
                if (codigoproducto) {
                    listar_ot_sin_privilegios(codigoot, codigoproducto, etapa_codigos, tipo_etapa_codigos, tarea_codigos, paquete_codigos, codigo_producto, reporte, rango_fechas, fecha_inicio, fecha_fin, estado_check); // COLOCO ANDY ESTADO
                } else {
                    mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
                }
            } else {
                mensaje(false, "Seleccione una O.T", "no");
            }
        }
    } else if (myRadio.value === '2') {
        $("#fecha_i").removeClass('hidde_grid');
        $("#fecha_f").removeClass('hidde_grid');
        if (usuario_admitido === 1) {
            $("#asignar_pintura").addClass('hidde_grid');
            if (codigoot) {
                if (codigoproducto) {
                    listar_ot(codigoot, codigoproducto, etapa_codigos, tipo_etapa_codigos, tarea_codigos, paquete_codigos, codigo_producto, reporte, rango_fechas, fecha_inicio, fecha_fin, estado_check); // COLOCO ANDY ESTADO
                } else {
                    mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
                }
            } else {
                mensaje(false, "Seleccione una O.T", "no");
            }
        } else {
            if (codigoot) {
                if (codigoproducto) {
                    listar_ot_sin_privilegios(codigoot, codigoproducto, etapa_codigos, tipo_etapa_codigos, tarea_codigos, paquete_codigos, codigo_producto, reporte, rango_fechas, fecha_inicio, fecha_fin, estado_check); // COLOCO ANDY ESTADO
                } else {
                    mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
                }
            } else {
                mensaje(false, "Seleccione una O.T", "no");
            }
        }
    }
}
function ver_ruta(id_ruta) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/most_secu_etap_ruta_asig',
        dataType: 'json',
        data: {
            intIdRuta: id_ruta
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte);
            }
        },
        success: function (responses) {
            document.getElementById("ruta_descripcion").innerHTML = responses.data.varDescrip;
            $("#modal_ruta_descripcion").modal('show');
        }
    });
}
function listar_series_historicos(ot, producto, varelemento, vardescripcion, zona, tarea, paquete, pesoneto, pesobruto, area, revi, cont, etapa, precio, contratista,
        maquina, observacion, bulto, guia, fecha, perfil, pintura, obs1, obs2, obs3, obs4, idruta, intmaxrepro) {


    $("#codigo_historico").val(varelemento);
    $("#grid5").jqxGrid('clear');
    var count = 0;
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/most_seri_host_avan',
        dataType: 'json',
        data: {
            intIdProy: ot,
            intIdTipoProducto: producto,
            varCodiElemento: varelemento,
            varDescripcion: vardescripcion,
            intIdProyZona: zona,
            intIdProyTarea: tarea,
            intIdProyPaquete: paquete,
            deciPesoNeto: pesoneto,
            deciPesoBruto: pesobruto,
            deciArea: area,
            intNuRevis: revi,
            intNuConta: cont,
            intIdEtapa: etapa,
            deciPrec: precio,
            intIdContr: contratista,
            intIdMaqui: maquina,
            obse_avan: observacion,
            varBulto: bulto,
            nume_guia: guia,
            fech_avan: fecha,
            varPerfil: perfil,
            varValo1: pintura,
            Obs1: obs1,
            obs2: obs2,
            obs3: obs3,
            obs4: obs4,
            intIdRuta: idruta,
            intMaxContaEtap: intmaxrepro
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte);
            }
        },
        success: function (responses) {
            $("#modal-lista-series-historico").modal('show');
            count_2 = responses.data.length;

            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'varCodiElemento', type: 'string'},
                    {name: 'intSerie', type: 'number'},
                    {name: 'varDescripcion', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'string'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'string'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            $("#grid5").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                editable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [

                    {
                        text: 'Codigo', datafield: 'varCodiElemento', width: 100, aggregates: [{
                                '<b>Total</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            return count_2;
                                        }
                            }]
                    },
                    {text: 'Descripción', datafield: 'varDescripcion', width: 160},
                    {text: 'Serie', datafield: 'intSerie', width: 60},
                    {text: 'Usu.Crea', datafield: 'acti_usua', width: 100},
                    {text: 'Hr.Crea', datafield: 'acti_hora', width: 160, cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                    {text: 'Usu.Modi', datafield: 'usua_modi', width: 100},
                    {text: 'Hr.Modi', datafield: 'hora_modi', cellsformat: 'dd/MM/yyyy hh:mm:ss', width: 160}
                ]
            });
            $("#grid5").jqxGrid('localizestrings', localizationobj);

        }
    });
}
function ver_pdf(ot, zona, codigo) {
    $("#url").attr('src', '');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/gsp_proy_nom',
        dataType: 'json',
        data: {
            intIdProy: parseInt(ot),
            intIdProyZona: parseInt(zona)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            $("#pdf").empty();
            var url_final = url + '/Planos/Proyecto/' + responses.data[0].varCodiProy + '/Zonas/' + responses.data[0].varDescrip + '/' + codigo + '.pdf';
            //var url = url_final + "&output=embed";
            //var url = url_final + "&embedded=true";
            var emb = '<embed  class="embed-responsive-item"  width="900" height="1064" src="' + url_final + '" id="url" type="application/pdf">';
            //$("#url").attr('src', url_final);
            $("#pdf").html(emb);
            //window.open(url,'_blank', 'fullscreen','false ');

            $("#modal-pdf-1").modal('show');
        }
    });
}
function combo_estados() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/eleg_proc_estado',
        dataType: 'json',
        data: {
            intIdProcEsta: 2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            responses.data.push({intIdEsta: 0, varDescEsta: 'SIN ANULADOS'}, {intIdEsta: -1, varDescEsta: 'TODOS'});
            responses.data.reverse();
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdEsta'},
                            {name: 'varDescEsta'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

            $("#estados_ot").jqxDropDownList({source: dataAdapter, displayMember: "varDescEsta", valueMember: "intIdEsta", width: 200, height: 30});
            // Focus the jqxDropDownList
            $("#estados_ot").jqxDropDownList('selectIndex', 0);
            $("#estados_ot").jqxDropDownList('focus');
        }
    });
}
