var codigoot = "";
var labelot = "";
var codigoproducto = "";
var labelproducto = "";
var idcontrato = "";
var idtarifa = "";
var ot_edit = "";
var producto_ot = "";
var idestado = "";
var contrato_listado = "";
var editar_contrato_val = "";
var idvalorizacion = "";
var asignar_tarifa = "";
var editar_tarifa_val = "";
$("#tipo_ot").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            listar_data_list_proyectos(item.value);
        }
    }
});
$("#unidad_valorizar").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            unidad_valorizacion_eligir(item.value);
        }
    }
});
$("#unidad_valorizar_edit").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            unidad_valorizacion_eligir_editar(item.value);
        }
    }
});

$("#txt_ot").on('change', function (event) {
    $('#txt_ot').jqxDropDownList('clearFilter');
    codigoot = "";
    labelot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            labelot = item.label;

        }
    }
});
$("#txt_ot_edit").on('change', function (event) {
    $('#txt_ot_edit').jqxDropDownList('clearFilter');
    ot_edit = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            ot_edit = item.value;
        }
    }
    if (producto_ot) {
        listar_etap_usua_editar(producto_ot, ot_edit);
    }
});

$("#producto_edit").on('change', function (event) {
    $('#producto_edit').jqxDropDownList('clearFilter');
    producto_ot = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            producto_ot = item.value;
        }
    }
    if (ot_edit) {
        listar_etap_usua_editar(producto_ot, ot_edit);
    }
});
$("#btn_busc").on('click', function () {

    if (codigoot === "") {
        mensaje(false, "INGRESE LA OT", "no");
    } else {
        $("#modal-cargar-guia").modal('show');
        contratos(codigoot);
    }

});
$("#editar_cantidades").on('click', function () {

    $("#descripcioin_tarifa").val('');
    $("#cod_valorizacion_tarifa").val('');
    $("#tarifa").val('');

    $("#modal-nueva-tarifa").modal('show');
    var ot = $("#txt_ot_edit").val();
    var producto = $("#producto_edit").val();
    listar_etap_usua(producto, ot);
});
$("#save_contrato").on('click', function () {

    registrar_contrato();

});
$("#edit_contrato").on('click', function () {

    editar_contrato();

});

$("#producto").on('change', function (event) {
    codigoproducto = "";
    labelproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
            labelproducto = item.label;
        }
    }
});


$("#btn_nuevo").on('click', function () {
    limpiar_campos();
    $("#modal-contrato-nuevo").modal('show');
    listar_ot_abiertas();
    combo_producto();
    unidad_valorizar();
    combo_contratista();
    document.getElementById('importe_valorizado').value = 0;
    document.getElementById('saldo').value = 0;
});
$("#save_tarifa").on('click', function () {
    crear_tarifa();
});
$("#save_tarifa_editar").on('click', function () {
    editar_guardar();
});

function combo_producto_editar() {
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
            $("#producto_edit").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30});
            // Focus the jqxDropDownList
        }
    });
}
function listar_ot_abiertas_editar() {
    var array_ot = new Array();
    $.ajax({
        type: 'POST',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionPartList/public/index.php/List_proy',
        dataType: 'json',
        data: {tipo_ot: 1},
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_ot_abiertas();
            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_ot_edit").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });

        }

    });
}
function listar_ot_abiertas() {
    var array_ot = new Array();
    $.ajax({
        type: 'POST',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionPartList/public/index.php/List_proy',
        dataType: 'json',
        data: {tipo_ot: 1},
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_ot_abiertas();
            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_ot_nuevo").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_nuevo").jqxDropDownList('selectIndex', 0);
            $("#txt_ot_nuevo").jqxDropDownList('focus');
        }

    });
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
            responses.data.push({varCodiProy: 'TODOS', intIdproy: -1});
            var source =
                    {
                        localdata: responses.data.reverse(),
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
function unidad_valorizar() {
    var tipo_ot = [{'unid_v': 1, 'var_uni': 'PESO'}, {'unid_v': 2, 'var_uni': 'AREA'}, {'unid_v': 3, 'var_uni': 'AMBOS'}];
    var source =
            {
                localdata: tipo_ot,
                datatype: "array",
                datafields: [
                    {name: 'unid_v'},
                    {name: 'var_uni'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#unidad_valorizar").jqxDropDownList({source: dataAdapter, displayMember: "var_uni", valueMember: "unid_v", width: 200, height: 30});
    // Focus the jqxDropDownList
    //$("#tipo_ot").jqxDropDownList('selectIndex', 1);
    $("#unidad_valorizar").val('1');
    $("#unidad_valorizar").jqxDropDownList('focus');
}
function unidad_valorizar_editar() {
    var tipo_ot = [{'unid_v': 1, 'var_uni': 'PESO'}, {'unid_v': 2, 'var_uni': 'AREA'}, {'unid_v': 3, 'var_uni': 'AMBOS'}];
    var source =
            {
                localdata: tipo_ot,
                datatype: "array",
                datafields: [
                    {name: 'unid_v'},
                    {name: 'var_uni'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#unidad_valorizar_edit").jqxDropDownList({source: dataAdapter, displayMember: "var_uni", valueMember: "unid_v", width: 200, height: 30});
    // Focus the jqxDropDownList
    //$("#tipo_ot").jqxDropDownList('selectIndex', 1);

}
function contratos(cod_ot) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_contrato',
        dataType: 'json',
        data: {
            intIdProy: cod_ot
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                window.setTimeout(function () {
                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);
            }
        },
        success: function (responses) {
            window.setTimeout(function () {
                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varRazCont', type: 'number'},
                            {name: 'varCodiProy', type: 'number'},
                            {name: 'varDescTipoProd', type: 'number'},
                            {name: 'idcontrato', type: 'string'},
                            {name: 'intIdProy', type: 'string'},
                            {name: 'intIdTipoProducto', type: 'string'},
                            {name: 'intIdContr', type: 'string'},
                            {name: 'varNuContrato', type: 'string'},
                            {name: 'varDescripcion', type: 'string'},
                            {name: 'fech_Ini', type: 'string'},
                            {name: 'fech_Fin', type: 'string'},
                            {name: 'varNuOS', type: 'string'},
                            {name: 'deciImpTotal', type: 'string'},
                            {name: 'deciImpValor', type: 'string'},
                            {name: 'deciImpSaldo', type: 'string'},
                            {name: 'intTipoUnidad', type: 'string'},
                            {name: 'deciPesoTotal', type: 'string'},
                            {name: 'deciPesoSaldo', type: 'string'},
                            {name: 'deciAreaTotal', type: 'string'},
                            {name: 'deciAreaSaldo', type: 'string'},
                            {name: 'fech_IniVal', type: 'string'},
                            {name: 'fech_UltValor', type: 'string'},
                            {name: 'varObservacion', type: 'string'},
                            {name: 'acti_usua', type: 'string'},
                            {name: 'acti_hora', type: 'string'},
                            {name: 'usua_modi', type: 'string'},
                            {name: 'hora_modi', type: 'string'},
                            {name: 'contratocol', type: 'string'},
                            {name: 'intIdEsta', type: 'string'},
                            {name: 'varDescEsta', type: 'string'},
                            {name: 'tipo_unidad', type: 'string'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            var pdf_grilla = function (row, column, value, rowKey, rowData) {
                var editrow = row;
                var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                var archivo_recibida = url + '/Documentos/Contratos/' + dataRecord.idcontrato + '.' + 'PDF';
                var archivo = "";
                archivo = '<center><button class="btn btn-danger btn-sm" onClick=generar_pdf("' + dataRecord.idcontrato + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="far fa-file-pdf" ></i></button>  <button class="btn btn-danger btn-sm" onClick=archivo("' + dataRecord.idcontrato + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-upload"></i></button> <button class="btn btn-danger btn-sm" onClick=ver_archivo("' + dataRecord.idcontrato + '","' + archivo_recibida + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="far fa-eye"></i></button> <button class="btn btn-danger btn-sm" onClick=editar("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="far fa-edit"></i></button></center>';

                return archivo;
            };
            $("#grid").jqxGrid({
                width: '100%',
                height: '100%',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: 'Opciones', width: 200, datafield: 'pdf', cellsalign: 'center', cellsrenderer: pdf_grilla, aggregates: [{
                                '<b>Total</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Contratista', width: 350, datafield: 'varRazCont'},
                    {text: 'Nro.Contrato', width: 120, datafield: 'varNuContrato'},
                    {text: 'Descripcion', datafield: 'varDescripcion', width: 200},
                    {text: 'Fecha Inicio', datafield: 'fech_Ini', width: 100},
                    {text: 'Fecha Fin', datafield: 'fech_Fin', width: 100},
                    {text: 'Importe Total', datafield: 'deciImpTotal', width: 100, cellsalign: 'right', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciImpTotal']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'Importe Valorizado', datafield: 'deciImpValor', width: 100, cellsalign: 'right', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciImpValor']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'Importe Saldo', datafield: 'deciImpSaldo', width: 100, cellsalign: 'right', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciImpSaldo']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'Tipo Elemento', datafield: 'varDescTipoProd', width: 120},
                    {text: 'Num O.S', datafield: 'varNuOS', width: 120},
                    {text: 'Peso Total', datafield: 'deciPesoTotal', width: 120, cellsalign: 'right', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciPesoTotal']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'Saldo Peso', datafield: 'deciPesoSaldo', width: 120, cellsalign: 'right', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciPesoSaldo']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'Area Total', datafield: 'deciAreaTotal', width: 120, cellsalign: 'right', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciAreaTotal']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'Saldo Area', datafield: 'deciAreaSaldo', width: 120, cellsalign: 'right', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciAreaSaldo']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'F.Inicial Val.', datafield: 'fech_IniVal', width: 120, },
                    {text: 'F.Fin Val', datafield: 'fech_UltValor', width: 120},
                    {text: 'Estado', datafield: 'varDescEsta', width: 120},
                    {text: 'Usuario Creacion', datafield: 'acti_usua', width: 120},
                    {text: 'Fecha Creación', datafield: 'acti_hora', width: 200},
                    {text: 'Usuario Modificacion', datafield: 'usua_modi', width: 120},
                    {text: 'Fecha Modificacion', datafield: 'hora_modi', width: 200},
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
            $("#producto").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30});
            // Focus the jqxDropDownList
            $("#producto").jqxDropDownList('selectIndex', 0);
            $("#producto").jqxDropDownList('focus');
        }
    });
}
function combo_contratista() {
    var array_ot = new Array();
    $.ajax({
        type: 'GET',

        url: url + '/GestionProyectos/public/index.php/listar_contratista_contrato',
        dataType: 'json',
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
                            {name: 'intIdCont'},
                            {name: 'varRazCont'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_contratista").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varRazCont",
                valueMember: "intIdCont"
            });
            $("#txt_contratista").jqxDropDownList('selectIndex', 0);
            $("#txt_contratista").jqxDropDownList('focus');
        }

    });
}
function combo_contratista_editar() {

    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/listar_contratistas_editar',
        dataType: 'json',
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
                            {name: 'intIdCont'},
                            {name: 'varRazCont'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_contratista_edit").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varRazCont",
                valueMember: "intIdCont"
            });
        }
    });
}
function unidad_valorizacion_eligir(codigo) {
    if (codigo === "1") {
        document.getElementById("peso_total").disabled = false;
        document.getElementById("peso_total").value = '';
        document.getElementById("area_total").disabled = true;
        document.getElementById("area_total").value = 0;
        document.getElementById("peso_valorizado").value = 0;
        document.getElementById("peso_saldo").value = 0;
        document.getElementById("area_valorizado").value = 0;
        document.getElementById("saldo_area").value = 0;
    } else if (codigo === "2") {
        document.getElementById("peso_total").disabled = true;
        document.getElementById("peso_total").value = 0;
        document.getElementById("area_total").disabled = false;
        document.getElementById("area_total").value = '';
        document.getElementById("peso_valorizado").value = 0;
        document.getElementById("peso_saldo").value = 0;
        document.getElementById("area_valorizado").value = 0;
        document.getElementById("saldo_area").value = 0;
    } else if (codigo === "3") {
        document.getElementById("peso_total").disabled = false;
        document.getElementById("peso_total").value = '';
        document.getElementById("area_total").disabled = false;
        document.getElementById("area_total").value = '';
        document.getElementById("peso_valorizado").value = 0;
        document.getElementById("peso_saldo").value = 0;
        document.getElementById("area_valorizado").value = 0;
        document.getElementById("saldo_area").value = 0;
    }
}
function unidad_valorizacion_eligir_editar(codigo) {
    if (codigo === "1") {
        document.getElementById("peso_total_edit").disabled = false;
        document.getElementById("area_total_edit").disabled = true;
    } else if (codigo === "2") {
        document.getElementById("peso_total_edit").disabled = true;
        document.getElementById("area_total_edit").disabled = false;
    } else if (codigo === "3") {
        document.getElementById("peso_total_edit").disabled = false;
        document.getElementById("area_total_edit").disabled = false;
    }
}

function registrar_contrato() {
    var ot = $("#txt_ot_nuevo").val();
    var tp = $("#producto").val();
    var ncontrato = $("#nro_contrto").val();
    var fecha_inicio = $("#fech_cont_inicio").val();
    var fecha_fin = $("#fech_cont_fin").val();
    var orden_servicio = $("#ordern_servicio").val();
    var descripcion = $("#descripcion_contrato").val();
    var importante_total = $("#importe_total").val();
    var importe_valorizado = $("#importe_valorizado").val();
    var contratista = $("#txt_contratista").val();
    var saldo = $("#saldo").val();
    var unidad_valorizar = $("#unidad_valorizar").val();
    var peso_total = $("#peso_total").val();
    var peso_valorizado = $("#peso_valorizado").val();
    var peso_saldo = $("#peso_saldo").val();
    var area_total = $("#area_total").val();
    var area_valorizado = $("#area_valorizado").val();
    var saldo_area = $("#saldo_area").val();
    var observaciones = $("#observaciones").val();
    var user = obtener_user();
    if (ot) {
        if (tp) {
            if (ncontrato) {
                if (fecha_inicio) {
                    if (fecha_fin) {
                        if (orden_servicio) {
                            if (importante_total) {
                                if (importe_valorizado) {
                                    if (saldo) {
                                        if (unidad_valorizar) {
                                            if (peso_total) {
                                                if (peso_saldo) {
                                                    if (area_total) {
                                                        if (saldo_area) {
                                                            if (user) {
                                                                $.ajax({
                                                                    type: 'POST',
                                                                    url: url + '/GestionProyectos/public/index.php/crear_contrato',
                                                                    dataType: 'json',
                                                                    data: {
                                                                        intIdProy: ot,
                                                                        intIdTipoProducto: tp,
                                                                        intIdContr: contratista,
                                                                        varNuContrato: ncontrato,
                                                                        varDescripcion: descripcion,
                                                                        fech_Ini: fecha_inicio,
                                                                        fech_Fin: fecha_fin,
                                                                        varNuOS: orden_servicio,
                                                                        deciImpTotal: importante_total,
                                                                        deciImpValor: importe_valorizado,
                                                                        deciImpSaldo: saldo,
                                                                        intTipoUnidad: unidad_valorizar,
                                                                        deciPesoTotal: peso_total,
                                                                        deciPesoSaldo: peso_saldo,
                                                                        deciAreaTotal: area_total,
                                                                        deciAreaSaldo: saldo_area,
                                                                        varObservacion: observaciones,
                                                                        acti_usua: user
                                                                    },
                                                                    error: function (xhr, ajaxOptions, thrownError) {
                                                                        if (thrownError == "Internal Server Error") {
                                                                            window.setTimeout(function () {
                                                                                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                                                                            }, 1000);
                                                                        }
                                                                    },
                                                                    success: function (responses) {
                                                                        mensaje("true", "Se registro correctamente", "modal-contrato-nuevo");
                                                                        $("#btn_busc").trigger("click");
                                                                    }

                                                                });
                                                            } else {
                                                                mensaje(false, "Ingrese Usuario", "no");
                                                            }
                                                        } else {
                                                            mensaje(false, "Ingrese area saldo", "no");
                                                        }
                                                    } else {
                                                        mensaje(false, "Ingrese area total", "no");
                                                    }
                                                } else {
                                                    mensaje(false, "Ingrese peso saldo", "no");
                                                }
                                            } else {
                                                mensaje(false, "Ingrese peso total", "no");
                                            }
                                        } else {
                                            mensaje(false, "Seleccione la unidad de Valorizaciòn", "no");
                                        }
                                    } else {
                                        mensaje(false, "Ingrese el Saldo", "no");
                                    }
                                } else {
                                    mensaje(false, "Ingrese el Importe Valorizado", "no");
                                }
                            } else {
                                mensaje(false, "Ingrese el Importe Total", "no");
                            }
                        } else {
                            mensaje(false, "Ingrese de Fin de Contrato", "no");
                        }
                    } else {
                        mensaje(false, "Ingrese de Fin de Contrato", "no");
                    }
                } else {
                    mensaje(false, "Ingrese de Inicio de Contrato", "no");
                }
            } else {
                mensaje(false, "Ingrese el Nùmero de Contrato", "no");
            }
        } else {
            mensaje(false, "Seleccione una Tipo Producto", "no");
        }
    } else {
        mensaje(false, "Seleccione una Ot", "no");
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
function limpiar_campos() {
    $("#nro_contrto").val('');
    $("#fech_cont_inicio").val('dd/mm/aaaa');
    $("#fech_cont_fin").val('dd/mm/aaaa');
    $("#ordern_servicio").val('');
    $("#descripcion_contrato").val('');
    $("#importe_total").val('');
    $("#observaciones").val('');

}
function editar(id) {
    var dataRecord = $("#grid").jqxGrid('getrowdata', id);
    idcontrato = dataRecord.idcontrato;
    idestado = dataRecord.intIdEsta;
    idvalorizacion = dataRecord.intTipoUnidad;
    listar_valorizacion(dataRecord.idcontrato);

    $("#txt_ot_edit").val(dataRecord.intIdProy);
    $("#producto_edit").val(dataRecord.intIdTipoProducto);
    $("#txt_contratista_edit").val(dataRecord.intIdContr);
    $("#nro_contrto_edit").val(dataRecord.varNuContrato);
    $("#fech_cont_inicio_edit").val(dataRecord.fech_Ini);
    $("#fech_cont_fin_edit").val(dataRecord.fech_Fin);
    $("#ordern_servicio_edit").val(dataRecord.varNuOS);
    $("#descripcion_contrato_edit").val(dataRecord.varDescripcion);
    $("#importe_total_edit").val(dataRecord.deciImpTotal);
    $("#importe_valorizado_edit").val(dataRecord.deciImpValor);
    $("#saldo_edit").val(dataRecord.deciImpSaldo);
    $("#peso_saldo_edit").val(dataRecord.deciPesoSaldo);
    $("#peso_total_edit").val(dataRecord.deciPesoTotal);
    $("#area_total_edit").val(dataRecord.deciAreaTotal);
    $("#saldo_area_edit").val(dataRecord.deciAreaSaldo);
    $("#observaciones_edit").val(dataRecord.varObservacion);
    $("#unidad_valorizar_edit").val(dataRecord.intTipoUnidad);
    importe_valorizado_editar_peso();
    importe_valorizado_editar_area();

    $("#modal-contrato-edit").modal('show');


}
function permiso_editar(contrato) {
    if (idestado === "44") {
        if (contrato === "si") {
            campos_enable("si", "si");
            listar_tarifas(idcontrato, "si");
        } else if (contrato === "no") {

            if (contrato_listado === "si") {
                campos_enable("si", asignar_tarifa);
                listar_tarifas(idcontrato, editar_tarifa_val);
            } else {
                campos_enable("no", asignar_tarifa);
                listar_tarifas(idcontrato, editar_tarifa_val);
            }
        }
    } else {
        if (contrato_listado === "si") {
            campos_enable("si", asignar_tarifa);
            listar_tarifas(idcontrato, editar_tarifa_val);
        } else {
            campos_enable("no", asignar_tarifa);
            listar_tarifas(idcontrato, editar_tarifa_val);
        }
    }
}
function listar_valorizacion(id) {
    $.ajax({
        type: 'POST',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionProyectos/public/index.php/contrato_valorizado',
        dataType: 'json',
        data: {intIdContrato: id},
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_ot_abiertas();
            }
        },
        success: function (responses) {
            editar_contrato_val = "";

            if (responses.data.length > 0) {
                editar_contrato_val = "no";
                validar_2(editar_contrato_val);
            } else {
                editar_contrato_val = "si";
                validar_2(editar_contrato_val);
            }
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'idvalorizacion_cab', type: 'number'},
                            {name: 'intNumValor', type: 'number'},
                            {name: 'intIdPeriValo', type: 'number'},
                            {name: 'intIdProy', type: 'string'},
                            {name: 'intIdTipoProducto', type: 'string'},
                            {name: 'intIdContr', type: 'string'},
                            {name: 'deciImpTotal', type: 'string'},
                            {name: 'intTipoUnidad', type: 'string'},
                            {name: 'deciUnidadTotal', type: 'string'},
                            {name: 'intIdContrato', type: 'string'},
                            {name: 'varNumFactura', type: 'string'},
                            {name: 'valorizacion_cabcol', type: 'string'},
                            {name: 'acti_usua', type: 'string'},
                            {name: 'acti_hora', type: 'string'},
                            {name: 'usua_modi', type: 'string'},
                            {name: 'hora_modi', type: 'string'},
                            {name: 'f_acti_hora', type: 'string'},
                            {name: 'varDescEsta', type: 'string'},
                            {name: 'varCodiPeriValo', type: 'string'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            var ver_valo = function (row, column, value, rowKey, rowData) {
                var editrow = row;
                var dataRecord = $("#grid_valorizaciones").jqxGrid('getrowdata', editrow);

                var archivo = "";
                archivo = '<center><button class="btn btn-danger btn-sm" onClick=ver_valorizacion("' + dataRecord.idvalorizacion_cab + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="far fa-eye"></i></button> </center>';

                return archivo;
            };
            $("#grid_valorizaciones").jqxGrid({
                width: '100%',
                height: '100%',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: 'Opciones', width: 80, datafield: 'pdf', cellsalign: 'center', cellsrenderer: ver_valo, aggregates: [{
                                '<b>Total</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var count = $("#grid_valorizaciones").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Semana', width: 120, datafield: 'varCodiPeriValo'},
                    {text: 'Nro.Valorizacion', width: 120, datafield: 'intNumValor'},
                    {text: 'Unid. Total', datafield: 'deciUnidadTotal', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciUnidadTotal']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'Imp. Total', datafield: 'deciImpTotal', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciImpTotal']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'F. Valorizacion', datafield: 'f_acti_hora', width: 150},
                    {text: 'Factura', datafield: 'varNumFactura', width: 100, cellsalign: 'right'},
                    {text: 'Usuario Creacion', datafield: 'acti_usua', width: 150, cellsalign: 'right'},
                    {text: 'Fecha Creacion', datafield: 'acti_hora', width: 150, cellsalign: 'right'},
                    {text: 'Usurio Modificacion', datafield: 'usua_modi', width: 150, cellsalign: 'right'},
                    {text: 'Fecha Modificacion', datafield: 'hora_modi', width: 150, cellsalign: 'right'},
                    {text: 'Estado', datafield: 'varDescEsta', width: 150, cellsalign: 'right'},
                ]
            });
            $("#grid_valorizaciones").jqxGrid('localizestrings', localizationobj);

        }

    });
}
function listar_tarifas(id, tarifa) {
    $.ajax({
        type: 'POST',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionProyectos/public/index.php/listar_tarifa',
        dataType: 'json',
        data: {intIdContrato: id},
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_ot_abiertas();
            }
        },
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'idcontrato', type: 'number'},
                            {name: 'idcontrato_tarifa', type: 'number'},
                            {name: 'idetapa', type: 'number'},
                            {name: 'vardescripcion', type: 'string'},
                            {name: 'varCodVal', type: 'string'},
                            {name: 'deciTarifa', type: 'string'},
                            {name: 'acti_usua', type: 'string'},
                            {name: 'acti_hora', type: 'string'},
                            {name: 'usua_modi', type: 'string'},
                            {name: 'hora_modi', type: 'string'},
                            {name: 'varDescEtap', type: 'string'}

                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid_tarifas").jqxGrid('clear');
            if (tarifa === "si") {
                var opcion_archivo = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_tarifas").jqxGrid('getrowdata', editrow);
                    var archivo = "";


                    archivo = '<center><button class="btn btn-danger btn-sm" onClick=editar_tarifa("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;"><i class="far fa-edit"></i></button></center>';

                    return archivo;
                };

                $("#grid_tarifas").jqxGrid({
                    width: '100%',
                    height: '100%',
                    showfilterrow: true,
                    source: dataAdapter,
                    filterable: true,
                    columnsresize: true,
                    altrows: true,
                    enabletooltips: true,
                    sortable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        {text: 'Opcion', width: '70', datafield: 'Descargar', cellsrenderer: opcion_archivo, cellsalign: 'center'},
                        {text: 'Etapa', width: 80, datafield: 'varDescEtap', cellsalign: 'center'},
                        {text: 'Descripcion', width: 350, datafield: 'vardescripcion'},
                        {text: 'Cod. Valorizacion', width: 120, datafield: 'varCodVal'},
                        {text: 'Tarifa', datafield: 'deciTarifa', width: 200},
                        {text: 'Usuario Creacion', datafield: 'acti_usua', width: 100},
                        {text: 'Fecha Creacion', datafield: 'acti_hora', width: 100},
                        {text: 'Usuario Modificaicon', datafield: 'usua_modi', width: 100},
                        {text: 'Fecha Modificaicon', datafield: 'hora_modi', width: 100}
                    ]
                });
                $("#grid_tarifas").jqxGrid('localizestrings', localizationobj);
            } else {
                $("#grid_tarifas").jqxGrid({
                    width: '100%',
                    height: '100%',
                    showfilterrow: true,
                    source: dataAdapter,
                    filterable: true,
                    columnsresize: true,
                    altrows: true,
                    enabletooltips: true,
                    sortable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        {text: 'Etapa', width: 80, datafield: 'varDescEtap', cellsalign: 'center'},
                        {text: 'Descripcion', width: 350, datafield: 'vardescripcion'},
                        {text: 'Cod. Valorizacion', width: 120, datafield: 'varCodVal'},
                        {text: 'Tarifa', datafield: 'deciTarifa', width: 200},
                        {text: 'Usuario Creacion', datafield: 'acti_usua', width: 100},
                        {text: 'Fecha Creacion', datafield: 'acti_hora', width: 100},
                        {text: 'Usuario Modificaicon', datafield: 'usua_modi', width: 100},
                        {text: 'Fecha Modificaicon', datafield: 'hora_modi', width: 100}
                    ]
                });
                $("#grid_tarifas").jqxGrid('localizestrings', localizationobj);
            }

        }

    });
}
function listar_etap_usua(producto, ot) {
    let user = obtener_user();
    array_asignaciones = [];
    var new_data = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/comb_asig_etapa_actu_proy',
        dataType: 'json',
        data: {
            varCodiUsua: user,
            intIdProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_etap_usua();
            }
        },
        success: function (responses) {
            if (responses.data.mensaje == "Error.") {
                $("#etapa").jqxDropDownList('clear');
            } else {

                for (var i = 0; responses.data.length > i; i++) {

                    if (responses.data[i].varCodiAgru === "CAL" || responses.data[i].varCodiTipoEtap === "CARGA" || responses.data[i].varCodiTipoEtap === "DESP") {
                    } else {
                        new_data.push({'intIdEtapa': responses.data[i].intIdEtapa, 'varDescEtap': responses.data[i].varDescEtap});
                        var row = {'intIdEtapa': responses.data[i].intIdEtapa, 'boolMostMaqu': responses.data[i].boolMostMaqu,
                            'boolMostSupe': responses.data[i].boolMostSupe, 'boolMostCont': responses.data[i].boolMostCont, 'boolDespacho': responses.data[i].boolDesp};
                        array_asignaciones.push(row);
                    }
                }
                var source =
                        {
                            localdata: new_data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdEtapa'},
                                {name: 'varDescEtap'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#etapa").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 280, height: 30});
                $("#etapa").jqxDropDownList('focus');
                $("#etapa").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}
function listar_etap_usua_editar(producto, ot) {
    let user = obtener_user();
    array_asignaciones = [];
    var new_data = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/comb_asig_etapa_actu_proy',
        dataType: 'json',
        data: {
            varCodiUsua: user,
            intIdProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_etap_usua();
            }
        },
        success: function (responses) {
            if (responses.data.mensaje == "Error.") {
                $("#etapa_editar").jqxDropDownList('clear');
            } else {

                for (var i = 0; responses.data.length > i; i++) {

                    if (responses.data[i].varCodiAgru === "CAL" || responses.data[i].varCodiTipoEtap === "CARGA" || responses.data[i].varCodiTipoEtap === "DESP") {
                    } else {
                        new_data.push({'intIdEtapa': responses.data[i].intIdEtapa, 'varDescEtap': responses.data[i].varDescEtap});
                        var row = {'intIdEtapa': responses.data[i].intIdEtapa, 'boolMostMaqu': responses.data[i].boolMostMaqu,
                            'boolMostSupe': responses.data[i].boolMostSupe, 'boolMostCont': responses.data[i].boolMostCont, 'boolDespacho': responses.data[i].boolDesp};
                        array_asignaciones.push(row);
                    }
                }
                var source =
                        {
                            localdata: new_data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdEtapa'},
                                {name: 'varDescEtap'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#etapa_editar").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 280, height: 30});

            }
        }
    });
}
function crear_tarifa() {
    var etapa = $("#etapa").val();
    var descripcion = $("#descripcioin_tarifa").val();
    var valorizacion = $("#cod_valorizacion_tarifa").val();
    var tarifa = $("#tarifa").val();
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/crear_tarifa',
        dataType: 'json',
        data: {
            idcontrato: idcontrato,
            idetapa: etapa,
            varCodVal: valorizacion,
            deciTarifa: tarifa,
            acti_usua: user,
            vardescripcion: descripcion
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_etap_usua();
            }
        },
        success: function (responses) {
            mensaje('true', "Se registro Correctamente", "modal-nueva-tarifa");
            listar_tarifas(idcontrato, editar_tarifa_val);
        }
    });

}
function editar_tarifa(id) {
    var dataRecord = $("#grid_tarifas").jqxGrid('getrowdata', id);
    console.log(dataRecord);
    $("#descripcioin_tarifa_editar").val(dataRecord.vardescripcion);
    $("#cod_valorizacion_tarifa_editar").val(dataRecord.varCodVal);
    $("#tarifa_editar").val(dataRecord.deciTarifa);
    $("#etapa_editar").val(dataRecord.idetapa);
    idtarifa = dataRecord.idcontrato_tarifa;

    $("#modal-editar-tarifa").modal('show');

}
function editar_guardar() {
    var etapa = $("#etapa_editar").val();
    var descripcion = $("#descripcioin_tarifa_editar").val();
    var codigo = $("#cod_valorizacion_tarifa_editar").val();
    var tarifa = $("#tarifa_editar").val();
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/editar_tarifa',
        dataType: 'json',
        data: {
            idetapa: etapa,
            varCodVal: codigo,
            deciTarifa: tarifa,
            usua_modi: user,
            vardescripcion: descripcion,
            idcontrato_tarifa: idtarifa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_etap_usua();
            }
        },
        success: function (responses) {
            mensaje('true', "Se Actualizo Correctamente", "modal-editar-tarifa");
            listar_tarifas(idcontrato, editar_tarifa_val);
        }
    });
}
function campos_enable(estado, n_tarifa) {
    if (estado === "si") {
        $("#txt_ot_edit").jqxDropDownList({disabled: false});
        $("#producto_edit").jqxDropDownList({disabled: false});
        $("#txt_contratista_edit").jqxDropDownList({disabled: false});
        document.getElementById('nro_contrto_edit').disabled = false;
        document.getElementById('fech_cont_inicio_edit').disabled = false;
        document.getElementById('fech_cont_fin_edit').disabled = false;
        document.getElementById('ordern_servicio_edit').disabled = false;
        document.getElementById('descripcion_contrato_edit').disabled = false;
        document.getElementById('importe_total_edit').disabled = false;
        $("#unidad_valorizar_edit").jqxDropDownList({disabled: false});
        $("#unidad_valorizar_edit").val(idvalorizacion);
        document.getElementById('observaciones_edit').disabled = false;
    } else {
        $("#txt_ot_edit").jqxDropDownList({disabled: true});
        $("#producto_edit").jqxDropDownList({disabled: true});
        $("#txt_contratista_edit").jqxDropDownList({disabled: true});
        document.getElementById('nro_contrto_edit').disabled = true;
        document.getElementById('fech_cont_inicio_edit').disabled = true;
        document.getElementById('fech_cont_fin_edit').disabled = true;
        document.getElementById('ordern_servicio_edit').disabled = true;
        document.getElementById('descripcion_contrato_edit').disabled = true;
        document.getElementById('importe_total_edit').disabled = true;
        document.getElementById('importe_valorizado_edit').disabled = true;
        document.getElementById('saldo_edit').disabled = true;
        document.getElementById('saldo_edit').disabled = true;
        $("#unidad_valorizar_edit").jqxDropDownList({disabled: true});
        document.getElementById('peso_total_edit').disabled = true;
        document.getElementById('peso_valorizado_edit').disabled = true;
        document.getElementById('peso_saldo_edit').disabled = true;
        document.getElementById('area_total_edit').disabled = true;
        document.getElementById('area_valorizado_edit').disabled = true;
        document.getElementById('saldo_area_edit').disabled = true;
        document.getElementById('observaciones_edit').disabled = true;
    }
    if (n_tarifa === "si") {
        document.getElementById('editar_cantidades').disabled = false;
    } else {
        document.getElementById('editar_cantidades').disabled = true;
    }
}
function editar_contrato() {
    var ot = $("#txt_ot_edit").val();
    var tp = $("#producto_edit").val();
    var ncontrato = $("#nro_contrto_edit").val();
    var fecha_inicio = $("#fech_cont_inicio_edit").val();
    var fecha_fin = $("#fech_cont_fin_edit").val();
    var orden_servicio = $("#ordern_servicio_edit").val();
    var descripcion = $("#descripcion_contrato_edit").val();
    var importante_total = $("#importe_total_edit").val();
    var importe_valorizado = $("#importe_valorizado_edit").val();
    var contratista = $("#txt_contratista_edit").val();
    var saldo = $("#saldo_edit").val();
    var unidad_valorizar = $("#unidad_valorizar_edit").val();
    var peso_total = $("#peso_total_edit").val();
    var peso_valorizado = $("#peso_valorizado_edit").val();
    var peso_saldo = $("#peso_saldo_edit").val();
    var area_total = $("#area_total_edit").val();
    var area_valorizado = $("#area_valorizado_edit").val();
    var saldo_area = $("#saldo_area_edit").val();
    var observaciones = $("#observaciones_edit").val();
    var user = obtener_user();
    if (ot) {
        if (tp) {
            if (ncontrato) {
                if (fecha_inicio) {
                    if (fecha_fin) {
                        if (orden_servicio) {
                            if (importante_total) {
                                if (importe_valorizado) {
                                    if (saldo) {
                                        if (unidad_valorizar) {
                                            if (peso_total) {
                                                if (peso_saldo) {
                                                    if (area_total) {
                                                        if (saldo_area) {
                                                            if (user) {
                                                                $.ajax({
                                                                    type: 'POST',
                                                                    url: url + '/GestionProyectos/public/index.php/editar_contrato',
                                                                    dataType: 'json',
                                                                    data: {
                                                                        intIdProy: ot,
                                                                        intIdTipoProducto: tp,
                                                                        intIdContr: contratista,
                                                                        varNuContrato: ncontrato,
                                                                        varDescripcion: descripcion,
                                                                        fech_Ini: fecha_inicio,
                                                                        fech_Fin: fecha_fin,
                                                                        varNuOS: orden_servicio,
                                                                        deciImpTotal: importante_total,
                                                                        deciImpValor: importe_valorizado,
                                                                        deciImpSaldo: saldo,
                                                                        intTipoUnidad: unidad_valorizar,
                                                                        deciPesoTotal: peso_total,
                                                                        deciPesoSaldo: peso_saldo,
                                                                        deciAreaTotal: area_total,
                                                                        deciAreaSaldo: saldo_area,
                                                                        varObservacion: observaciones,
                                                                        usua_modi: user,
                                                                        idcontrato: idcontrato
                                                                    },
                                                                    error: function (xhr, ajaxOptions, thrownError) {
                                                                        if (thrownError == "Internal Server Error") {
                                                                            window.setTimeout(function () {
                                                                                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                                                                            }, 1000);
                                                                        }
                                                                    },
                                                                    success: function (responses) {
                                                                        mensaje("true", "Se actualizo correctamente", "modal-contrato-edit");
                                                                        $("#btn_busc").trigger("click");
                                                                    }

                                                                });
                                                            } else {
                                                                mensaje(false, "Ingrese Usuario", "no");
                                                            }
                                                        } else {
                                                            mensaje(false, "Ingrese area saldo", "no");
                                                        }
                                                    } else {
                                                        mensaje(false, "Ingrese area total", "no");
                                                    }
                                                } else {
                                                    mensaje(false, "Ingrese peso saldo", "no");
                                                }
                                            } else {
                                                mensaje(false, "Ingrese peso total", "no");
                                            }
                                        } else {
                                            mensaje(false, "Seleccione la unidad de Valorizaciòn", "no");
                                        }
                                    } else {
                                        mensaje(false, "Ingrese el Saldo", "no");
                                    }
                                } else {
                                    mensaje(false, "Ingrese el Importe Valorizado", "no");
                                }
                            } else {
                                mensaje(false, "Ingrese el Importe Total", "no");
                            }
                        } else {
                            mensaje(false, "Ingrese de Fin de Contrato", "no");
                        }
                    } else {
                        mensaje(false, "Ingrese de Fin de Contrato", "no");
                    }
                } else {
                    mensaje(false, "Ingrese de Inicio de Contrato", "no");
                }
            } else {
                mensaje(false, "Ingrese el Nùmero de Contrato", "no");
            }
        } else {
            mensaje(false, "Seleccione una Tipo Producto", "no");
        }
    } else {
        mensaje(false, "Seleccione una Ot", "no");
    }

}
function validar_2(editar) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/gsu_obte_prog_medi_idusu',
        dataType: 'json',
        data: {
            varCodiUsua: user,
            varCodiProg: 'VAL_RRO'
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte,rango_fecha,fecha_ini,fecha_fin);
            }
        },
        success: function (responses) {

            contrato_listado = "no";
            asignar_tarifa = "no";
            editar_tarifa_val = "no";

            if (responses.data.length > 0) {
                for (var i = 0; responses.data.length > i; i++) {
                    if (responses.data[i]['varDescBoto'] === "EDITAR CONTRATO") {
                        contrato_listado = "si";
                    }
                    if (responses.data[i]['varDescBoto'] === "ASIGNAR TARIFA") {
                        asignar_tarifa = "si";
                    }
                    if (responses.data[i]['varDescBoto'] === "EDITAR TARIFA") {
                        editar_tarifa_val = "si";
                    }
                }

            } else {
                contrato_listado = "no";
                asignar_tarifa = "no";
                editar_tarifa_val = "no";
            }

            permiso_editar(editar);
        }
    });
}
function generar_pdf(id) {
    let user = obtener_user();
    $(location).attr('href', "contrato/pdf/" + id + '/' + user);
}
function importe_saldo() {
    let importe_total = document.getElementById('importe_total').value;
    let importe_valorizado = document.getElementById('importe_valorizado').value;
    if (importe_total === "") {
        importe_total = 0;
    } else {
        importe_total = importe_total;
    }
    if (importe_valorizado === "") {
        importe_valorizado = 0;
    } else {
        importe_valorizado = importe_valorizado;
    }
    let saldo = parseFloat(importe_total) - parseFloat(importe_valorizado);
    document.getElementById('saldo').value = saldo.toFixed(3);
}
function importe_saldo_editar() {
    let importe_total = document.getElementById('importe_total_edit').value;
    let importe_valorizado = document.getElementById('importe_valorizado_edit').value;
    if (importe_total === "") {
        importe_total = 0;
    } else {
        importe_total = importe_total;
    }
    if (importe_valorizado === "") {
        importe_valorizado = 0;
    } else {
        importe_valorizado = importe_valorizado;
    }
    let saldo = parseFloat(importe_total) - parseFloat(importe_valorizado);
    document.getElementById('saldo_edit').value = saldo.toFixed(3);
}
function soloNumerospunto(e) {

    var key = window.Event ? e.which : e.keyCode

    return (key >= 48 && key <= 57) || key == 46
}
function saldo_peso() {
    let importe_total = document.getElementById('peso_total').value;
    let importe_valorizado = document.getElementById('peso_valorizado').value;
    if (importe_total === "") {
        importe_total = 0;
    } else {
        importe_total = importe_total;
    }
    if (importe_valorizado === "") {
        importe_valorizado = 0;
    } else {
        importe_valorizado = importe_valorizado;
    }
    let saldo = parseFloat(importe_total) - parseFloat(importe_valorizado);
    document.getElementById('peso_saldo').value = saldo.toFixed(3);
}
function importe_valorizado_editar_peso() {
    let importe_total = document.getElementById('peso_total_edit').value;
    let importe_valorizado = document.getElementById('peso_saldo_edit').value;
    if (importe_total === "") {
        importe_total = 0;
    } else {
        importe_total = importe_total;
    }
    if (importe_valorizado === "") {
        importe_valorizado = 0;
    } else {
        importe_valorizado = importe_valorizado;
    }
    let saldo = parseFloat(importe_total) - parseFloat(importe_valorizado);
    document.getElementById('peso_valorizado_edit').value = saldo.toFixed(3);
}
function importe_valorizado_editar_area() {
    let importe_total = document.getElementById('area_total_edit').value;
    let importe_valorizado = document.getElementById('saldo_area_edit').value;
    if (importe_total === "") {
        importe_total = 0;
    } else {
        importe_total = importe_total;
    }
    if (importe_valorizado === "") {
        importe_valorizado = 0;
    } else {
        importe_valorizado = importe_valorizado;
    }
    let saldo = parseFloat(importe_total) - parseFloat(importe_valorizado);
    document.getElementById('area_valorizado_edit').value = saldo.toFixed(3);
}
function  saldo_area() {
    let importe_total = document.getElementById('area_total').value;
    let importe_valorizado = document.getElementById('area_valorizado').value;
    if (importe_total === "") {
        importe_total = 0;
    } else {
        importe_total = importe_total;
    }
    if (importe_valorizado === "") {
        importe_valorizado = 0;
    } else {
        importe_valorizado = importe_valorizado;
    }
    let saldo = parseFloat(importe_total) - parseFloat(importe_valorizado);
    document.getElementById('saldo_area').value = saldo.toFixed(3);
}
$("#form_register_guia_recibida").on('submit', function (e) {

    e.preventDefault();
    $.ajax({
        url: 'GUARDAR_CONTRATO',
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
            if (html.mensaje == "") {
                mensaje(true, "GUARDADO CON EXITO", "modal-contrato-recibida");
                $("#btn_busc").trigger('click');
            } else {
                mensaje(false, html.mensaje, "no");
            }

        }
    });
});
function archivo(id) {
    document.getElementById('id_contrto').value = id;
    document.getElementById('nombre_archivo_guiarecibida').value = '';
    document.getElementById('subir_archivo_guia_recibida').value = '';
    $("#modal-contrato-recibida").modal('show');
}
// SUBIR ARCHIVOS  y cambia el nombre 
$("#subir_archivo_icon_guia_recibida").click(function () {
    $("#subir_archivo_guia_recibida").trigger('click');
});

document.getElementById("subir_archivo_guia_recibida").onchange = function () {
    document.getElementById("nombre_archivo_guiarecibida").value = this.value;
};
function ver_archivo(idcontrato,ruta){
    $.ajax({
        url: 'VALIDAR_CONTRATO',
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            intIdContrato:idcontrato
        },
        dataType: 'json',
        success: function (html) {
            if (html.mensaje == "") {
                window.open(ruta, 'Download');
            } else {
                mensaje(false, html.mensaje, "no");
            }
        }
    });
    
}