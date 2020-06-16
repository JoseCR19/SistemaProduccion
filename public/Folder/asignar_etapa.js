var data = [];
var dataAdapter = "";
var elemento = "";
$("#producto").on('change', function () {
    var ot = $("#OT").val();
    listar_asignaciones_por_ot(this.value, ot);
});
$("#producto2").on('change', function () {
    elemento = this.value;
    var codigoot = $("#CODIGOOT2").val();
    listar_asignar_etapa(this.value, codigoot);
});
$("#agregar_asignacion").click(function () {
    var ot2 = $("#OT").val();
    var codot = $("#CODIGOOT").val();
    var cod_elemento = $("#producto").val();
    if (cod_elemento === null) {
        mensaje(false, "Seleccione un Tipo Elemento", "no");
    } else {
        listar_asignar_etapa_limpiar();
        $("#CODIGOOT2").val(codot);
        $("#OT2").val(ot2);
        listar_asignar_etapa(cod_elemento, codot);
        $("#producto2").val(cod_elemento);
        $('#modal-agregar-asignar-etapa-proyecto').modal('show');
    }
});
$("#cerrar_modal_1").click(function () {
    $('#modal-asignar-etapa-proyecto').modal('hide');
    listar_asignaciones_por_ot_limpiar();
});
$("#cerrar_modal_2").click(function () {
    $("#grid3").jqxGrid('clearSelection');
    $('#modal-agregar-asignar-etapa-proyecto').modal('hide');
    listar_asignar_etapa_limpiar();
});
$("#close_modalasignar").click(function () {
    $('#modal-asignar-etapa-proyecto').modal('hide');
    listar_asignaciones_por_ot_limpiar();
});
$("#close_modalasignar2").click(function () {
    $("#grid3").jqxGrid('clearSelection');
    $('#modal-agregar-asignar-etapa-proyecto').modal('hide');
    listar_asignar_etapa_limpiar();
});
$("#registrar_asignaciones").click(function () {
    var ot_insert = $("#CODIGOOT2").val();
    var id_producto = $("#producto2").val();
    let user = obtener_user();
    var textData = new Array();
    /**
     * OBTENGO EL INDEX SELECCIONADOS POR LOS CHECK
     */
    var rowindex = $("#grid3").jqxGrid("getselectedrowindexes");
    var data = $("#grid3").jqxGrid("getrows");
    /**
     * UNA VEZ OBTENIDO LOS INDICES, LO INGRESO DENTRO DE UN FOR PARA RECORRER Y GENERAR UN BUCLE PARA OBTENER LA DATA
     */

    if (rowindex.length > 0) {
        var index_etapa = [];
        var var_etapa = [];
        var hay_despacho = "no";
        var existe_despacho = "no";
        var cont_despacho = 0;
        for (var i = 0; i < rowindex.length; i++) {
            textData[i] = $('#grid3').jqxGrid('getrowdata', rowindex[i]);
            index_etapa.push(textData[i]['intIdEtapa']);
            var_etapa.push(textData[i]['varDescEtap']);
        }

        for (var j = 0; data.length > j; j++) {
            if (data[j]['varDescEtap'] === "DESPACHO") {
                existe_despacho = "si";
            }
        }
        if (existe_despacho === "si") {
            cont_despacho = 0;
            for (var e = 0; var_etapa.length > e; e++) {
                if (var_etapa[e] === "DESPACHO") {
                    cont_despacho++;
                }
            }
        } else {
            cont_despacho++;
        }
        
        if (cont_despacho>0) {
            $.ajax({
                type: 'POST',
                url: url + '/Asignaciones/public/index.php/regi_otra_inte',
                dataType: 'json',
                data: {
                    varCodiOt: ot_insert,
                    intIdTipoProducto: id_producto,
                    intIdEtapa: index_etapa,
                    acti_usua: user
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError === "Internal Server Error") {
                    }
                },
                success: function (responses) {

                    let mensaje_alert = responses.data.mensaje;
                    if (mensaje_alert === "Guardado.") {
                        var ot = $("#OT").val();
                        var cod_elemento = $("#producto").val();
                        mensaje(true, mensaje_alert, "modal-agregar-asignar-etapa-proyecto");

                        listar_asignaciones_por_ot(cod_elemento, ot);
                        listar_asignaciones_por_ot_limpiar();
                        listar_asignar_etapa_limpiar();
                        $("#grid3").jqxGrid('clearSelection');
                    } else {
                        mensaje(false, mensaje_alert, "modal-agregar-asignar-etapa-proyecto");
                        listar_asignaciones_por_ot_limpiar();
                        listar_asignar_etapa_limpiar();
                        $("#grid3").jqxGrid('clearSelection');
                    }
                }
            });
        } else {
            mensaje(false, "No ha seleccionado DESPACHO", "no");
            var rows = $('#grid3').jqxGrid('getrows');
            for (i = 0; rows.length > i; i++) {
                if (rows[i]['varDescEtap'] === "DESPACHO") {
                    $('#grid3').jqxGrid({selectedrowindex: rows[i]['boundindex']});
                }
            }
        }
    } else {
        mensaje(false, "No ha seleecionado una etapa", "no");
    }
});
$("#registrar_orden_etapa").click(function () {

    var id_producto = $("#producto").val();
    var ot = $("#CODIGOOT").val();
    var arra_new = [];
    var respuesta = [];
    var rows = $('#grid2').jqxGrid('getrows');
    /**
     * PROPIEDAD PARA LOS DATOS UNICOS
     */
    Array.prototype.unique = function (a) {
        return function () {
            return this.filter(a)
        }
    }(function (a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });
    /**
     * OBTENEMOS EL ARRAY DE LA TABLA Y LLENAMOS UN NUEVO ARRAY CON EL INT ID ORDEN EL CUAL NOS SERVIRA PARA VALIDAR LOS DUPLCIADOS
     * 
     */

    for (let j = 0; j < rows.length; j++) {
        arra_new.push(rows[j]['intOrden']);
    }
    /**
     * SI EL ARRAY NUEVO ES DIFERENTE AL ARRAY QUE TENEMOS EN LA TABAL SIGINIFCA QUE SE HA ELIMINADO UN REPETIDO Y POR ENDE SERA MENOS Q EL ARRAY
     * PRINCIPAL, SI VERIFICAMOS QUE EL ARRAY ES MENOR LANZAMOS UN ERROR PARA QUE LA PERSONA VERIFIQUE QUE NO SE REPITA EL ORDEN 
     * EN CASO CONTRARIO ACTUALIZAMOS
     */
    if (arra_new.unique().length == rows.length) {
        /**
         * REALIZAMOS UN FOR PARA PODER ACTUALIZAR EL ORDEN
         */
        var valor = "";
        var cont = 0;
        var cont2 = 0;
        var cont3 = 0;
        for (let i = 0; i < rows.length; i++) {
            var id_orden = rows[i]['intOrden'];
            if (id_orden) {
                cont3++;
            }
        }
        if (cont3 === rows.length) {
            for (let i = 0; i < rows.length; i++) {
                cont++;
                var id_etapa = rows[i]['intIdEtapa'];
                var id_orden = rows[i]['intOrden'];
                var id_asig_etapa = rows[i]['intIdAsigEtapProy'];
                var user = obtener_user();
                $.ajax({
                    type: 'POST',
                    url: url + '/Asignaciones/public/index.php/actu_asig_etapa',
                    dataType: 'json',
                    data: {
                        varCodiOt: ot,
                        intIdAsigEtapProy: id_asig_etapa,
                        intIdTipoProducto: id_producto,
                        intIdEtapa: id_etapa,
                        intOrden: id_orden,
                        usua_modi: user
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        if (thrownError == "Internal Server Error") {
                        }
                    },
                    success: function (responses) {
                        if (responses.data.mensaje === "Actualizacion Satisfactoria.") {
                            cont2++;
                        }
                    }
                });

            }
            if (cont > 0) {
                mensaje(true, "Actualizacion Satisfactoria.", "modal-asignar-etapa-proyecto");
                listar_asignaciones_por_ot_limpiar();
            }
        } else {
            mensaje(false, "Para asignar el orden a todas las etapas deben tener un número de orden.", "no");
        }

    } else {
        /**
         * FUNCION MENSAJE QUE NOS SIRVE PARA LLAMAR UNA ALERTA SEGUN LO QUE LE ENVIAMOS
         */
        mensaje(false, "EL ORDEN NO SE PUEDE REPETIR VERIFICAR", "no");
    }

});
$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Etapa", true);
});
function listar_asignar_etapa_proyecto() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionPartList/public/index.php/List_proy_vige',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_asignar_etapa_proyecto();
            }
        },
        success: function (responses) {
            console.log(responses);
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'acti_hora', type: 'date', format: 'dd/MM/yyyy'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'dateFechFina', type: 'date'},
                    {name: 'dateFechInic', type: 'date'},
                    {name: 'hora_modi', type: 'date'},
                    {name: 'intAnioProy', type: 'number'},
                    {name: 'intIdEsta', type: 'string'},
                    {name: 'intIdproy', type: 'number'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'varAlias', type: 'string'},
                    {name: 'varCodiProy', type: 'string'},
                    {name: 'varDescProy', type: 'string'},
                    {name: 'varIdTipOT', type: 'string'},
                    {name: 'varRucClie', type: 'string'},
                    {name: 'varUbicacionProy', type: 'string'},
                    {name: 'varcodiOt', type: 'string'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                showfilterrow: true,
                filterable: true,
                theme: 'darkblue',
                selectionmode: 'multiplecellsextended',
                sortable: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {
                        text: 'Asignar', datafield: 'Editar', columntype: 'button', width: 70, cellsrenderer: function () {
                            return "Asignar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $('#modal-asignar-etapa-proyecto').modal('show');
                            combo_producto();
                            listar_asignar_etapa_limpiar();
                            $("#numeroot").val(dataRecord.intIdproy);
                            var divisiones = dataRecord.varCodiProy.split(" /");

                            $("#OT").val(divisiones[0]);
                            $("#CODIGOOT").val(dataRecord.varcodiOt);
                            $("#ALIAS").val(dataRecord.varAlias);
                            $("#armador_nombre").val(dataRecord.varNombArma);
                            $("#empresa").val(dataRecord.intIdCont);
                            $("#etapa").val(dataRecord.intIdEtapa);
                            $("#estado").val(dataRecord.varEstaArma);
                        }
                    },
                    {text: 'Número', datafield: 'intIdproy', width: 58, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Año', datafield: 'intAnioProy', width: 40},
                    {text: 'N° Proyecto', datafield: 'varcodiOt', width: 85},
                    {text: 'Cod. Ot', datafield: 'varCodiProy', width: 85},
                    {text: 'Proyecto', datafield: 'varDescProy', cellsalign: 'left', width: 570, },
                    {text: 'Alias', datafield: 'varAlias', cellsalign: 'left', width: 180, },
                    {text: 'Cliente', datafield: 'varRucClie', cellsalign: 'left', width: 190, hidden: true},
                    {text: 'Inicio', datafield: 'dateFechInic', cellsalign: 'left', width: 90, cellsformat: 'dd/MM/yyyy'},
                    {text: 'Termino', datafield: 'dateFechFina', cellsalign: 'left', width: 90, cellsformat: 'dd/MM/yyyy'},
                    {text: 'Estado', datafield: 'intIdEsta', width: 80},
                    {text: 'Creado Por', datafield: 'acti_usua', width: 120},
                    {text: 'F.Creado', datafield: 'acti_hora', width: 130, cellsformat: 'dd/MM/yyyy'},
                    {text: 'Modificado Por', datafield: 'usua_modi', width: 120},
                    {text: 'F.Modificado', datafield: 'hora_modi', width: 130, cellsformat: 'dd/MM/yyyy'},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
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
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {

                va += '<option value="' + responses.data[c].intIdTipoProducto + '">' + responses.data[c]
                        .varDescTipoProd + '</option>';
                $("#producto").html(va);
                $("#producto2").html(va);
            }
            $("#producto").val(1);
            var ot = $("#OT").val();
            listar_asignaciones_por_ot($("#producto").val(), ot);


        }
    });
}
function listar_asignaciones_por_ot_limpiar() {
    var source = {
        datatype: "array",
        datafields: [
            {name: 'intIdAsigEtapProy', type: 'number'},
            {name: 'intOrden', type: 'number'},
            {name: 'intIdEtapa', type: 'number'},
            {name: 'varDescEtap', type: 'string'},
            {name: 'intIdPlan', type: 'number'},
            {name: 'varDescPlanta', type: 'string'},
        ], updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid2").jqxGrid({
        width: '100%',
        height: '300',
        source: dataAdapter,
        filterable: true,
        selectionmode: 'multiplecellsextended',
        sortable: true,
        theme: 'darkblue',
        columns: [
            {text: 'Orden', width: '10%', cellsalign: 'center'},
            {text: 'Etapa', width: '40%'},
            {text: 'Planta', cellsalign: 'left', width: '40%'},
            {text: 'Eliminar', cellsalign: 'left', width: '12%'}
        ]
    });
    $("#grid2").jqxGrid('localizestrings', localizationobj);
}
function listar_asignar_etapa_limpiar() {
}
function listar_asignaciones_por_ot(producto, ot) {

    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/asig_etap_proy',
        dataType: 'json',
        data: {
            varCodiProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_asignaciones_por_ot(producto, ot);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "No existe") {
                $("#grid2").jqxGrid('clear');
                $("#grid2").jqxGrid('refresh');
                var source = {
                    datatype: "array",
                    theme: 'darkblue',
                    datafields: [
                        {name: 'intIdAsigEtapProy', type: 'number'},
                        {name: 'intOrden', type: 'number'},
                        {name: 'intIdEtapa', type: 'number'},
                        {name: 'varDescEtap', type: 'string'},
                        {name: 'intIdPlan', type: 'number'},
                        {name: 'varDescPlanta', type: 'string'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid2").jqxGrid({
                    width: '100%',
                    height: '300',
                    source: dataAdapter,
                    selectionmode: 'multiplecellsextended',
                    sortable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        /**
                         * PARA EL DROPDWLIST NECESITAMOS UN NUEVO DATA SOURCE EL CUAL LO LLENAMOS ARRIBA QUE SON PARA LOS COMBOS
                         * CREAMOS UN CREATEEDITOR PARA LLENAR EL DROPDOWLIST CON LOS ID ORDEN 
                         */
                        {
                            text: 'Orden', datafield: 'intOrden', columntype: 'dropdownlist', width: '15%',
                            createeditor: function (row, column, editor) {
                                editor.jqxDropDownList({
                                    dropDownHeight: 150,
                                    source: locallistaAdapter,
                                    displayMember: 'intOrden',
                                    filterable: false,
                                    renderer: function (index, label) {
                                        var item = editor.jqxDropDownList('getSelectedItem');
                                        return label;
                                    }
                                });
                            }, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid2").jqxGrid('getrows');
                                                return count.length;
                                            }
                                }]},
                        {text: 'Etapa', width: '40%', datafield: 'varDescEtap'},
                        {text: 'Planta', cellsalign: 'left', width: '38%', datafield: 'varDescPlanta'},
                        {text: 'Eliminar', datafield: 'Editar', width: '15%'},
                        {text: 'id_asignacion', width: '10%', datafield: 'intIdAsigEtapProy', hidden: true}
                    ]
                });
                $("#grid2").jqxGrid('localizestrings', localizationobj);
            } else {
                /**
                 * CREAMOS UN NUEVO ARRAY
                 */
                var new_array_datos = new Array();
                /**
                 * CREAMOS UN ARRAY PARA LLENAR LUEGO Y SER LLAMADO PARA LISTAR EL COMBO
                 */
                var source_2 = {};
                var locallista = [];
                /**
                 * EL INT ORDEN PARA INICIALIZAR EN 1 SI ES Q TENEMOS DATA
                 */
                let int_orden = 1;
                /**
                 * VALIDAMOS SI LA DATA VIENE VACIA O LLENA PARA QUE LOS CAMBOS SE LIMPIEN
                 */

                if (responses.mensaje == "No existe") {
                    /**
                     * SI EL ARRAY ES VACIO EL COMBO ESTARÁ VACIO
                     */
                    var source_2 = {
                        datatype: "array",
                        datafields: [
                            {name: 'intOrden', type: 'number'}
                        ], updaterow: function (rowid, rowdata, commit) {
                            commit(true);
                        }
                    };
                } else {
                    /**
                     * SI TENEMOS DATA EL COMOBO EMPIEZA A LLENARSE 
                     * OBTENEMOS EL TAMAÑO DEL ARRAY PARA EL FOR Y DENTRO DEL FOR LLENAMOS EL ARRAY QUE DECLARAMOS EN LA PARTE SUPERIOR
                     * LLENAMOS CON EL EL ID_ORDEN SEGUN SU CANTIDAD DEL ARRAY
                     * Y LLENAMOS DENTRO DE OTRO ARRAY SOLO LOS ID ORDEN PARA LUEGO LISTARLOS
                     */
                    for (let index = 0; index < responses.data.length; index++) {
                        new_array_datos = int_orden++;
                        locallista.push({intOrden: new_array_datos});
                    }
                    /**
                     * PASAMOS LA DATA DEL ID PARA EL COMBO DENTRO DEL SOURCE QUE ES PARA EL JQWIDGET
                     */
                    source_2 = {
                        localdata: locallista,
                        datatype: "array",
                        datafields: [
                            {name: 'intOrden', type: 'number'}
                        ], updaterow: function (rowid, rowdata, commit) {
                            commit(true);
                        }
                    };
                    locallistaAdapter = new $.jqx.dataAdapter(source_2);
                }
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    theme: 'darkblue',
                    datafields: [
                        {name: 'intIdAsigEtapProy', type: 'number'},
                        {name: 'intOrden', type: 'number'},
                        {name: 'intIdEtapa', type: 'number'},
                        {name: 'varDescEtap', type: 'string'},
                        {name: 'intIdPlan', type: 'number'},
                        {name: 'varDescPlanta', type: 'string'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#excel").click(function () {
                    $("#grid2").jqxGrid('exportdata', 'xls', 'Asignacion_Proyectos');
                });
                dataAdapter = new $.jqx.dataAdapter(source);
                var editrow = -1;
                $("#grid2").jqxGrid({
                    width: '100%',
                    height: '300',
                    source: dataAdapter,
                    selectionmode: 'multiplecellsextended',
                    sortable: true,
                    editable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        /**
                         * PARA EL DROPDWLIST NECESITAMOS UN NUEVO DATA SOURCE EL CUAL LO LLENAMOS ARRIBA QUE SON PARA LOS COMBOS
                         * CREAMOS UN CREATEEDITOR PARA LLENAR EL DROPDOWLIST CON LOS ID ORDEN 
                         */
                        {
                            text: 'Orden', datafield: 'intOrden', width: '15%', editable: true, columntype: 'dropdownlist',
                            createeditor: function (row, column, editor) {
                                editor.jqxDropDownList({
                                    dropDownHeight: 150,
                                    source: locallistaAdapter,
                                    displayMember: 'intOrden',
                                    filterable: false,
                                    renderer: function (index, label) {
                                        var item = editor.jqxDropDownList('getSelectedItem');
                                        return label;
                                    }
                                });
                            }, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid2").jqxGrid('getrows');
                                                return count.length;
                                            }
                                }]},
                        {text: 'Etapa', width: '40%', datafield: 'varDescEtap', editable: false},
                        {text: 'Planta', cellsalign: 'left', width: '30%', datafield: 'varDescPlanta', editable: false},
                        {
                            text: 'Eliminar', datafield: 'Editar', columntype: 'button', width: '15%', cellsrenderer: function () {
                                return "Eliminar";
                            }, buttonclick: function (row) {
                                // open the popup window when the user clicks a button.
                                editrow = row;
                                var offset = $("#grid2").offset();
                                var dataRecord = $("#grid2").jqxGrid('getrowdata', editrow);
                                var codot = $("#numeroot").val();
                                eliminar_asignacion(codot, producto, dataRecord.intIdAsigEtapProy);
                            }
                        },
                        {text: 'id_asignacion', width: '10%', datafield: 'intIdAsigEtapProy', hidden: true}
                    ]
                });
                $("#grid2").jqxGrid('localizestrings', localizationobj);
            }
        }
    });
}
function listar_asignar_etapa(producto, ot) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/mostr_asig_etap',
        dataType: 'json',
        data: {
            intIdProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_asignaciones_por_ot(producto, ot);
            }
        },
        success: function (responses) {

            var array = responses.data;
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdEtapa', type: 'number'},
                    {name: 'intIdPlan', type: 'number'},
                    {name: 'varDescEtap', type: 'string'},
                    {name: 'varDescPlanta', type: 'number'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            $("#excel").click(function () {
                $("#grid").jqxGrid('exportdata', 'xls', 'Asignacion_Proyectos');
            });
            var cellbeginedit = function (row, datafield, columntype, value) {
                var valor = $("#grid2").jqxGrid('getrowdata', row);
                if (valor['varDescEtap'] === "DESPACHO") {
                    return false;
                } else {
                    return true;
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            $("#grid3").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                showfilterrow: true,
                columnsresize: true,
                filterable: true,
                altrows: true,
                enabletooltips: true,
                selectionmode: 'checkbox',
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: 'id_etapa', datafield: 'intIdEtapa', width: '10%', hidden: true, cellbeginedit: cellbeginedit},
                    {text: 'Etapa', datafield: 'varDescEtap', width: '47%', cellbeginedit: cellbeginedit, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid3").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Planta', datafield: 'varDescPlanta', width: '49%', cellbeginedit: cellbeginedit},
                    {text: 'id_planta', datafield: 'intIdPlan', width: '25', hidden: true, cellbeginedit: cellbeginedit}
                ]
            });
            var rows = $('#grid3').jqxGrid('getrows');
            for (i = 0; rows.length > i; i++) {
                if (rows[i]['varDescEtap'] === "DESPACHO") {
                    $('#grid3').jqxGrid({selectedrowindex: rows[i]['boundindex']});
                }
            }

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
function eliminar_asignacion(ot, producto, intasig) {

    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/elim_asig_etap',
        dataType: 'json',
        data: {
            intIdAsigEtapProy: intasig,
            intIdProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_asignaciones_por_ot(producto, ot);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "") {
                var cod_ot = $("#OT").val();
                mensaje(true, "Se Elimino Correctamente", "no");
                listar_asignaciones_por_ot(producto, cod_ot);
            } else {
                mensaje(false, responses.data.mensaje, "no");
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

    if (CSV == '') {
        alert("Invalid data");
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