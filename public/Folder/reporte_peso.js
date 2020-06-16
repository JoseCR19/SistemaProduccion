var estado_ot_list_ot = "";
var unid_repo_peso_value = "";
var ot_repo_peso_value = "";
var checkedItems = "";
var data = {};
// UNIDAD REPORTE PESO
$("#unid_repo_peso").on('checkChange', function (event) {

    unid_repo_peso_value = "";
    checkedItems = "";
    if (event.args.checked) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#unid_repo_peso").jqxDropDownList('checkAll');
                } else {
                    var items = $("#unid_repo_peso").jqxDropDownList('getCheckedItems');
                    $.each(items, function (index) {
                        checkedItems += "'" + this.value + "',";

                    });
                    console.log(checkedItems);
                    listar_data_list_proyectos(checkedItems, estado_ot_list_ot);

                }
            }
        }
    } else {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#unid_repo_peso").jqxDropDownList('uncheckAll');
                }
            }
        }
    }
    unid_repo_peso_value = "";

});
// ESTADO DE LA OT
$("#esta_ot_repo_peso").on('change', function (event) {
    estado_ot_list_ot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            estado_ot_list_ot = item.value;

        }
    }
    listar_data_list_proyectos(checkedItems, estado_ot_list_ot);
});

$("#ot_repo_peso").on('checkChange', function (event) {
    ot_repo_peso_value = "";
    if (event.args.checked) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#ot_repo_peso").jqxDropDownList('checkAll');
                }
            }
        }
    } else {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#ot_repo_peso").jqxDropDownList('uncheckAll');
                }
            }
        }
    }
});


// LISTAR LA UNIDAD DE NEGOCIO
function combo_unid_nego() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_unid_nego_acti',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'intIdUniNego'},
                            {name: 'varDescripcion'}
                        ],

                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // Create a jqxDropDownList
            $("#unid_repo_peso").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdUniNego", width: 220, height: 30, });
            $("#unid_repo_peso").jqxDropDownList('checkIndex', 1);



        }
    });
}
//LISTAR EL ESTADO
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

    $("#esta_ot_repo_peso").jqxDropDownList({source: dataAdapter, displayMember: "VarOt", valueMember: "Tipo_Ot", width: 200, height: 30});
    // Focus the jqxDropDownList
    //$("#tipo_ot").jqxDropDownList('selectIndex', 1);
    $("#esta_ot_repo_peso").val('1');
    $("#esta_ot_repo_peso").jqxDropDownList('focus');
}
//LISTAR LA LISTA DE PROYECTO 
function listar_data_list_proyectos(checkedItems2, codigo2) {
    //var cadena =checkedItems2.slice(0,-1);
    var array_ot = new Array();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_ot_pesos',
        dataType: 'json',
        data: {
            intIdUniNego: checkedItems2,
            intIdEsta: codigo2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            // responses.data.push({varCodiProy: 'TODOS', intIdproy: -1});
            console.log(responses);
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
            $("#ot_repo_peso").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                checkboxes: true,
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#ot_repo_peso").jqxDropDownList('selectIndex', 1);
            $("#ot_repo_peso").jqxDropDownList('focus');
        }

    });

}

$("#btn_busc_repo_peso").click(function () {
    let idunidad = $("#unid_repo_peso").val();
    let esta_ot = $("#esta_ot_repo_peso").val();
    let list_ot = $("#ot_repo_peso").val();
    let tipo = $("#tipo_ot_repo_peso").val();
    console.log(idunidad, esta_ot, list_ot, tipo);


    if (list_ot === "") {
        mensaje(false, "Seleccione OT ", "no");
    } else {
        if (tipo === "") {
            mensaje(false, "Seleccione el tipo", "no");
        } else {
            $("#modal-cargar-repo-peso").modal("show");
            mostrar_grilla(list_ot, tipo);
        }
    }

});
//LISTAR EL ESTADO
function tipo_reporte_ot() {
    var tipo_ots = [{'Tipo': 1, 'VarOt': 'ESTRUCTURA'}, {'Tipo': 2, 'VarOt': 'PERNOS'}];
    var source =
            {
                localdata: tipo_ots,
                datatype: "array",
                datafields: [
                    {name: 'Tipo'},
                    {name: 'VarOt'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#tipo_ot_repo_peso").jqxDropDownList({source: dataAdapter, displayMember: "VarOt", valueMember: "Tipo", width: 200, height: 30});
    // Focus the jqxDropDownList
    //$("#tipo_ot").jqxDropDownList('selectIndex', 1);
    $("#tipo_ot_repo_peso").val('1');
    $("#tipo_ot_repo_peso").jqxDropDownList('focus');
}

function mostrar_grilla(list_ot2, tipo2) {
    let  user = obtener_user();
    let nuevo_lista = "";
    nuevo_lista = list_ot2 + ",";

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/llistar_pesos_ot',
        dataType: 'json',
        data: {
            v_varintIdProy: nuevo_lista,
            v_tipo: parseInt(tipo2),
            v_usuario: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {


            data = responses.data;


            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'intIdProy', type: 'number'},
                            {name: 'reporta', type: 'string'},
                            {name: 'varCodigoOT', type: 'string'},
                            {name: 'dateFecTermino', type: 'string'},
                            {name: 'intCanti', type: 'number'},
                            {name: 'deciPesoComer', type: 'string'},
                            {name: 'deciPesoCompraSol', type: 'string'},
                            {name: 'deciPesoCompraRec', type: 'string'},
                            {name: 'deciPesoCompraDes', type: 'string'},
                            {name: 'deciPesoIngenieria', type: 'string'},
                            {name: 'deciPesoNegro', type: 'string'},
                            {name: 'deciPesoGalvanizado', type: 'string'},
                            {name: 'deciPesoDespachado', type: 'string'},
                            {name: 'varUsuario', type: 'string'},
                        ],
                        hierarchy:
                                {
                                    keyDataField: {name: 'intIdProy'},
                                    parentDataField: {name: 'reporta'}
                                },
                        id: 'intIdProy',
                        localData: responses.data
                    };

            window.setTimeout(function () {
                $("#modal-cargar-repo-peso").modal('hide'); // COLOCO ANDY 
            }, 1000);

            var dataAdapter = new $.jqx.dataAdapter(source);


            $("#grid_repor_lote_pint").jqxTreeGrid({
                source: dataAdapter
            });
            $('#grid_repor_lote_pint').on('bindingComplete', function () {
                $("#grid_repor_lote_pint").jqxTreeGrid('expandAll');
            });
        }
    });



}

// VAMOS A PREPARAR LA DATA
function preparar_data() {

    var source =
            {
                dataType: "json",
                dataFields: [
                    {name: 'intIdProy', type: 'number'},
                    {name: 'reporta', type: 'string'},
                    {name: 'varCodigoOT', type: 'string'},
                    {name: 'dateFecTermino', type: 'string'},
                    {name: 'intCanti', type: 'number'},
                    {name: 'deciPesoComer', type: 'string'},

                    {name: 'deciPesoCompraSol', type: 'string'},
                    {name: 'deciPesoCompraRec', type: 'string'},
                    {name: 'deciPesoCompraDes', type: 'string'},

                    {name: 'deciPesoIngenieria', type: 'string'},
                    {name: 'deciPesoNegro', type: 'string'},
                    {name: 'deciPesoGalvanizado', type: 'string'},

                    {name: 'deciPesoDespachado', type: 'string'},
                    {name: 'varUsuario', type: 'string'},
                ],
                hierarchy:
                        {
                            keyDataField: {name: 'intIdProy'},
                            parentDataField: {name: 'reporta'}
                        },
                id: 'intIdProy',
                localData: data
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {
        var html = value;
        if (rowKey.level === 0) {

        

            var html = '<button class="btn btn-danger btn-sm" onClick="listar_zona(\'' + rowKey.intIdProy + '\');"><i class="fas fa-search"></i></button>' + ' ' + value;
        }
        return html;
    };

    var cellClass1 = function (row, dataField, cellText, rowData) {
        return "color1";
    };
    var cellClass2 = function (row, dataField, cellText, rowData) {
        return "color2";
    };
    var cellClass3 = function (row, dataField, cellText, rowData) {
        return "color3";
    };
    var cellClass4 = function (row, dataField, cellText, rowData) {
        return "color4";
    };
    var cellClass5 = function (row, dataField, cellText, rowData) {
        return "color5";
    };
    var cellClass6 = function (row, dataField, cellText, rowData) {
        return "color6";
    };
    var cellClass7 = function (row, dataField, cellText, rowData) {
        return "color7";
    };

    $("#grid_repor_lote_pint").jqxTreeGrid(
            {
                width: '100%',
                source: dataAdapter,
                sortable: true,
                height: '400',
                theme: 'darkblue',
                showstatusbar: true,

                columns: [
                    {text: 'reporta', align: 'center', dataField: 'reporta', width: '15%', 'hidden': true},
                    {text: 'Id', align: 'center', dataField: 'intIdProy', width: '15%', 'hidden': true},
                    {text: 'OT/Alias', align: 'center', dataField: 'varCodigoOT', pinned: true, width: '20%', cellClassName: cellClass1, cellsrenderer: linkrenderer_accounts, cellsalign: 'left'},
                    {text: 'Fecha Termino', align: 'center', cellsalign: 'right', dataField: 'dateFecTermino', width: '10%', cellClassName: cellClass1, },
                    {text: 'Cantidad', align: 'center', cellsalign: 'right', dataField: 'intCanti', width: '10%', cellClassName: cellClass6},
                    {text: 'Peso Comercial', align: 'center', cellsalign: 'right', dataField: 'deciPesoComer', width: '10%', cellClassName: cellClass6},
                    {text: 'Solicitada', align: 'center', cellsalign: 'right', columnGroup: 'Name', dataField: 'deciPesoCompraSol', width: '10%', cellClassName: cellClass2},
                    {text: 'Recepcionada', align: 'center', cellsalign: 'right', columnGroup: 'Name', dataField: 'deciPesoCompraRec', width: '10%', cellClassName: cellClass2},
                    {text: 'Despachada', align: 'center', cellsalign: 'right', columnGroup: 'Name', dataField: 'deciPesoCompraDes', width: '10%', cellClassName: cellClass2},
                    {text: 'Peso Ingenieria', align: 'center', cellsalign: 'right', dataField: 'deciPesoIngenieria', width: '10%', cellClassName: cellClass3},
                    {text: 'Peso Negro', align: 'center', cellsalign: 'right', dataField: 'deciPesoNegro', width: '10%', cellClassName: cellClass4},
                    {text: 'Peso Galvanizado', align: 'center', cellsalign: 'right', dataField: 'deciPesoGalvanizado', width: '10%', cellClassName: cellClass5},
                    {text: 'Peso Despachado a Cliente', cellsalign: 'right', align: 'center', dataField: 'deciPesoDespachado', width: '10%', cellClassName: cellClass7},
                    {text: 'Usuario', align: 'center', cellsalign: 'right', dataField: 'varUsuario', width: '10%', hidden: true},
                ],
                columnGroups:
                        [
                            {text: 'Peso Compras', align: 'center', name: 'Name'}
                        ]
            });
    $("#grid_repor_lote_pint").jqxGrid('localizestrings', localizationobj);


}
function listar_zona(cod_ot) {
    $("#modal-cargar-repo-peso").modal("show"); //coloco andy
    let tipo = $("#tipo_ot_repo_peso").val();
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listqar_pesos_sub_ot',
        dataType: 'json',
        data: {
            v_intIdProy: cod_ot,
            v_tipo: tipo,
            v_usuario: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //actualizar_tipo_etapa();
            }
        },
        success: function (responses) {

            window.setTimeout(function () {
                $("#modal-cargar-repo-peso").modal('hide'); // COLOCO ANDY 
            }, 1000);
            $("#grid_repor_lote_pint").jqxTreeGrid('refresh');
            for (var i = 0; responses.data.length > i; i++) {

                var intId = responses.data[i].intIdProy + ''+i;
                var zona = ({
                    "intIdProy": intId,
                    "intCanti":responses.data[i].intCanti,
                    "reporta":responses.data[i].intIdProy,
                    "varCodigoOT": responses.data[i].varCodigoSubOt,
                    "dateFecTermino": responses.data[i].dateFecTermino,
                    "deciPesoComer": responses.data[i].deciPesoComer,
                    "deciPesoCompraSol": responses.data[i].deciPesoCompraSol,
                    "deciPesoCompraRec": responses.data[i].deciPesoCompraRec,
                    "deciPesoCompraDes": responses.data[i].deciPesoCompraDes,
                    "deciPesoIngenieria": responses.data[i].deciPesoIngenieria,
                    "deciPesoNegro": responses.data[i].deciPesoNegro,
                    "deciPesoGalvanizado": responses.data[i].deciPesoGalvanizado,
                    "deciPesoDespachado": responses.data[i].deciPesoDespachado,
                    "varUsuario": responses.data[i].varUsuario
                });
                data.push(zona);
            }
            console.log(data);
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'intIdProy', type: 'number'},
                            {name: 'reporta', type: 'string'},
                            {name: 'varCodigoOT', type: 'string'},
                            {name: 'dateFecTermino', type: 'string'},
                            {name: 'intCanti', type: 'number'},
                            {name: 'deciPesoComer', type: 'string'},
                            {name: 'deciPesoCompraSol', type: 'string'},
                            {name: 'deciPesoCompraRec', type: 'string'},
                            {name: 'deciPesoCompraDes', type: 'string'},
                            {name: 'deciPesoIngenieria', type: 'string'},
                            {name: 'deciPesoNegro', type: 'string'},
                            {name: 'deciPesoGalvanizado', type: 'string'},
                            {name: 'deciPesoDespachado', type: 'string'},
                            {name: 'varUsuario', type: 'string'},
                        ],
                        hierarchy:
                                {
                                    keyDataField: {name: 'intIdProy'},
                                    parentDataField: {name: 'reporta'}
                                },
                        id: 'intIdProy',
                        localData: data
                    };

            var dataAdapter = new $.jqx.dataAdapter(source);
            console.log(dataAdapter);
            $("#grid_repor_lote_pint").jqxTreeGrid({
                source: dataAdapter

            });
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