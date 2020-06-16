/* global parseFloat */

var codigoproducto = "";
var codigoot = "";
var check_items_ot = "";
var check_tipo_gupo = "";

var codunidadnegocio = "";
var labelunidad = "";
var fecha_ini = "";
var fecha_fin = "";
var label_element = "";
var array_general = new Array();
var json_array = "";
var data = {};
var data_componente = {};
var zona = {};
var id_varibale_level_3 = "";
var labelcodproducto = "";
$("#producto").on('change', function (event) {
    codigoproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
            labelcodproducto = item.label;
        }
    }
});
$("#txt_ot").on('checkChange', function (event) {
    cod_label = "";
    check_items_ot = "";
    if (event.args.checked) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#txt_ot").jqxDropDownList('checkAll');
                }
            }
        }
    } else {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#txt_ot").jqxDropDownList('uncheckAll');
                }
            }
        }
    }
    check_items_ot = "";
});
$("#unidad_negocio").on('change', function (event) {
    codunidadnegocio = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codunidadnegocio = item.value;
            ot_1(codunidadnegocio);
        }
    }
});

$("#tipo_gupo_estructura").on('change', function (event) {
    check_tipo_gupo = "";
    if (event.args) {

        var item = event.args.item;
        if (item) {
            check_tipo_gupo = item.value;

        }
    }
});

$("#unidad").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            labelunidad = item.value;
        }
    }
});
$("#btn_busc").on('click', function () {
    if (codigoproducto === "1") {
        $("#grid").removeClass('hidde_grid');
        $("#grid_componente").addClass('hidde_grid');
    } else {
        $("#grid_componente").removeClass('hidde_grid');
        $("#grid").addClass('hidde_grid');
    }
    buscar_ot();
});
$("#limpiar").on('click', function () {
    limpiar();
});
$("#cerrar_modal_pdf").on('click', function () {
    $("#modal-pdf").modal('hide');
});
function tree_grid_componente() {
    var source =
            {
                dataType: "json",
                dataFields: [
                    {name: 'intIdProy', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'intIdProyZona', type: 'number'},
                    {name: 'reporta', type: 'number'},
                    {name: 'TotaElem', type: 'number'},
                    {name: 'nombProy', type: 'string'},
                    {name: 'Corte', type: 'string'},
                    {name: 'InsC', type: 'string'},
                    {name: 'Quiebre', type: 'string'},
                    {name: 'InsQui', type: 'string'},
                    {name: 'Cepillado', type: 'string'},
                    {name: 'InsCep', type: 'string'},
                    {name: 'Codificacion', type: 'string'},
                    {name: 'InsCodi', type: 'string'},
                    {name: 'Rolado', type: 'string'},
                    {name: 'InsRol', type: 'string'},
                    {name: 'Plegado', type: 'string'},
                    {name: 'InsPle', type: 'string'},
                    {name: 'Roscado', type: 'string'},
                    {name: 'InsRos', type: 'string'},
                    {name: 'Punzonado', type: 'string'},
                    {name: 'InsPun', type: 'string'},
                ],
                hierarchy:
                        {
                            keyDataField: {name: 'intIdProy'},
                            parentDataField: {name: 'reporta'}
                        },
                id: 'intIdProy',
                localData: data_componente
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    var cellClass1 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "max";
        }
    };
    var cellClass2 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "avg";
        }
    };
    var cellClass3 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "minavg";
        }
    };
    var cellClass4 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "min";
        }
    };
    var cellClass5 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "pintura";
        }
    };
    var cellClass6 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "final";
        }
    };
    var suma = function (row, column, value, defaultRender, column, rowData) {
        if (value.toString().indexOf("Sum") >= 0) {
            return defaultRender.replace("Sum", "Total");
        }
    };
    var cellrender = function (rowKey, rowData) {
        var level = rowData.level;
        var name = rowData.Proyecto;
        if (level === 3) {
            var html = "<a href=" + '#' + ">" + name + "</a>";
            return html;
        } else {
            return name;
        }
    };
    var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {
        var html = value;

        if (rowKey.level === 0) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            if (value === "TOTAL") {

            } else {
                var html = '<button class="btn btn-danger btn-sm" onClick=listar_zona("' + rowKey.intIdProy + '","' + rowKey.intIdTipoProducto + '","' + labelunidad + '","' + fecha_ini + '","' + fecha_fin + '");><i class="fas fa-search"></i></button>' + ' ' + value;
            }
        }
        if (rowKey.level === 1) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            var html = '<button class="btn btn-danger btn-sm" onClick=listar_programa("' + rowKey.reporta + '","' + rowKey.intIdTipoProducto + '","' + labelunidad + '","' + fecha_ini + '","' + fecha_fin + '","' + rowKey.intIdProyZona + '");><i class="fas fa-search"></i></button>' + ' ' + value;
        }
        if (rowKey.level === 2) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            var html = '<button class="btn btn-danger btn-sm" onClick=listar_grupo("' + rowKey.idProy + '","' + rowKey.intIdTipoProducto + '","' + labelunidad + '","' + fecha_ini + '","' + fecha_fin + '","' + rowKey.intIdProyZona + '","' + rowKey.intIdProyTarea + '");><i class="fas fa-search"></i></button>' + ' ' + value;
        }
        if (rowKey.level === 3) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            var html = '<button class="btn btn-danger btn-sm" onClick=listar_codigo("' + rowKey.idProy + '","' + rowKey.intIdTipoProducto + '","' + labelunidad + '","' + fecha_ini + '","' + fecha_fin + '","' + rowKey.intIdProyZona + '","' + rowKey.intIdProyTarea + '","' + rowKey.intIdProyPaquete + '");><i class="fas fa-search"></i></button>' + ' ' + '<button class="btn btn-danger btn-sm" onClick=ver_reporte_grupo("' + rowKey.intIdProyPaquete + '","' + rowKey.idProy + '","' + rowKey.intIdProyZona + '");><i class="fas fa-eye"></i> </button>' + value;
        } else if (rowKey.level === 4) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + rowKey.idProy + '","' + rowKey.intIdProyZona + '","' + rowKey.nombProy + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
        }
        //var html = "<a href=\"?module=accounts\&applettype\=baseview\&ret_module=accounts\&ret_applettype\=listview\&record=" + href + "\">" + value + "</a>";
        return html;
    };
    // create Tree Grid
    $("#grid_componente").jqxTreeGrid(
            {
                width: '100%',
                source: dataAdapter,
                sortable: true,
                height: '400',
                theme: 'darkblue',
                columns: [
                    {text: 'Id', dataField: 'intIdProy', width: 200, 'hidden': true},
                    {text: 'IdProducto', dataField: 'intIdTipoProducto', width: 200, 'hidden': true},
                    {text: 'reporta', dataField: 'reporta', width: 200, 'hidden': true},
                    {text: 'Proyecto', dataField: 'nombProy', pinned: true, width: 220, cellClassName: cellClass1, cellsrenderer: linkrenderer_accounts, cellsalign: 'left'},
                    {text: 'Total', dataField: 'TotaElem', cellsFormat: 'd', width: 120, cellClassName: cellClass2, cellsalign: 'right'},
                    {text: 'Corte', dataField: 'Corte', cellsFormat: 'd', width: 120, cellClassName: cellClass3, cellsalign: 'right'},
                    {text: 'Ins.Corte', dataField: 'InsC', width: 100, cellClassName: cellClass3, cellsalign: 'right'},
                    {text: 'Quiebre', dataField: 'Quiebre', cellsFormat: 'd', width: 110, cellClassName: cellClass4, cellsalign: 'right'},
                    {text: 'Ins.Quiebre', dataField: 'InsQui', width: 100, cellClassName: cellClass4, cellsalign: 'right'},
                    {text: 'Codificacion', dataField: 'Codificacion', width: 100, cellsFormat: 'd', cellClassName: cellClass5, cellsalign: 'right'},
                    {text: 'Ins.Codificación', dataField: 'InsCodi', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Cepillado', dataField: 'Cepillado', cellsFormat: 'd', width: 110, cellClassName: cellClass4, cellsalign: 'right'},
                    {text: 'InsCep', dataField: 'InsCep', width: 100, cellClassName: cellClass5, cellsalign: 'right'},
                    {text: 'Rolado', dataField: 'Rolado', cellsFormat: 'd', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Ins.Rolado', dataField: 'InsRol', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Plegado', dataField: 'Plegado', cellsFormat: 'd', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Ins.Plegado', dataField: 'InsPle', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Roscado', dataField: 'Roscado', cellsFormat: 'd', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Ins.Roscado', dataField: 'InsRos', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Punzonado', dataField: 'Punzonado', cellsFormat: 'd', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Ins.Punzando', dataField: 'InsPun', width: 100, cellClassName: cellClass6, cellsalign: 'right'}
                ]
            });
    $("#grid_componente").jqxGrid('localizestrings', localizationobj);
}
function tree_grid() {
// prepare the data
    var source =
            {
                dataType: "json",
                dataFields: [
                    {name: 'intIdProy', type: 'number'},
                    {name: 'Reporta', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'intIdProyZona', type: 'number'},
                    {name: 'nombProy', type: 'string'},
                    {name: 'TotaElem', type: 'string'},
                    {name: 'fabri', type: 'string'},
                    {name: 'insp', type: 'string'},
                    {name: 'envi_galv', type: 'string'},
                    {name: 'galv', type: 'string'},
                    {name: 'insp_galv', type: 'string'},
                    {name: 'pint', type: 'string'},
                    {name: 'insp_pint', type: 'string'},
                    {name: 'tras_int', type: 'string'},
                    {name: 'empa', type: 'string'},
                    {name: 'carg', type: 'string'},
                    {name: 'desp', type: 'string'},
                    {name: 'fechatermino', type: 'string'},
                    {name: 'mpint', type: 'string'}
                ],
                hierarchy:
                        {
                            keyDataField: {name: 'intIdProy'},
                            parentDataField: {name: 'Reporta'}
                        },
                id: 'intIdProy',
                localData: data
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    var cellClass1 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "max";
        }
    };
    var cellClass2 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "avg";
        }
    };
    var cellClass3 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "minavg";
        }
    };
    var cellClass4 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "min";
        }
    };
    var cellClass5 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "pintura";
        }
    };
    var cellClass6 = function (row, dataField, cellText, rowData) {
        if (rowData.nombProy === "TOTAL") {
            return "total";
        } else {
            return "final";
        }
    };
    var suma = function (row, column, value, defaultRender, column, rowData) {
        if (value.toString().indexOf("Sum") >= 0) {
            return defaultRender.replace("Sum", "Total");
        }
    };
    var cellrender = function (rowKey, rowData) {
        var level = rowData.level;
        var name = rowData.Proyecto;
        if (level === 3) {
            var html = "<a href=" + '#' + ">" + name + "</a>";
            return html;
        } else {
            return name;
        }
    };
    var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {
        var html = value;
        if (rowKey.level === 0) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            if (value === "TOTAL") {

            } else {
                var html = '<button class="btn btn-danger btn-sm" onClick=listar_zona("' + rowKey.intIdProy + '","' + rowKey.intIdTipoProducto + '","' + labelunidad + '","' + fecha_ini + '","' + fecha_fin + '","' + check_tipo_gupo + '");><i class="fas fa-search"></i></button>' + ' ' + value;
            }
        }
        if (rowKey.level === 1) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            var html = '<button class="btn btn-danger btn-sm" onClick=listar_programa("' + rowKey.reporta + '","' + rowKey.intIdTipoProducto + '","' + labelunidad + '","' + fecha_ini + '","' + fecha_fin + '","' + rowKey.intIdProyZona + '","' + check_tipo_gupo + '");><i class="fas fa-search"></i></button>' + ' ' + value;
        }
        if (rowKey.level === 2) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            var html = '<button class="btn btn-danger btn-sm" onClick=listar_grupo("' + rowKey.idProy + '","' + rowKey.intIdTipoProducto + '","' + labelunidad + '","' + fecha_ini + '","' + fecha_fin + '","' + rowKey.intIdProyZona + '","' + rowKey.intIdProyTarea + '","' + check_tipo_gupo + '");><i class="fas fa-search"></i></button>' + ' ' + value;
        }
        if (rowKey.level === 3) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            var html = '<button class="btn btn-danger btn-sm" onClick=listar_codigo("' + rowKey.idProy + '","' + rowKey.intIdTipoProducto + '","' + labelunidad + '","' + fecha_ini + '","' + fecha_fin + '","' + rowKey.intIdProyZona + '","' + rowKey.intIdProyTarea + '","' + rowKey.intIdProyPaquete + '","' + check_tipo_gupo + '");><i class="fas fa-search"></i></button>' + ' ' + '<button class="btn btn-danger btn-sm" onClick=ver_reporte_grupo("' + rowKey.intIdProyPaquete + '","' + rowKey.idProy + '","' + rowKey.intIdProyZona + '");><i class="fas fa-eye"></i> </button>' + value;
        } else if (rowKey.level === 4) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            hola = 0;
            var html = '<button class="btn btn-danger btn-sm" onClick=ver_pdf("' + rowKey.idProy + '","' + rowKey.intIdProyZona + '","' + rowKey.nombProy + '");><i class="far fa-file-pdf"></i> ' + value + '</button>';
        }
        return html;
    };
    $("#grid").jqxTreeGrid(
            {
                width: '100%',
                source: dataAdapter,
                sortable: true,
                height: '400',
                theme: 'darkblue',
                columns: [
                    {text: 'Id', dataField: 'intIdProy', width: 200, 'hidden': true},
                    {text: 'IdProducto', dataField: 'intIdTipoProducto', width: 200, 'hidden': true},
                    {text: 'Proyecto', dataField: 'nombProy', pinned: true, width: 220, cellClassName: cellClass1, cellsrenderer: linkrenderer_accounts, cellsalign: 'left'},
                    {text: 'Fecha Termino', dataField: 'fechatermino', pinned: true, width: 120, cellClassName: cellClass1, cellsalign: 'left'},
                    {text: 'Total', dataField: 'TotaElem', cellsFormat: 'd', width: 120, cellClassName: cellClass2, cellsalign: 'right'},
                    {text: 'Estructurado', dataField: 'fabri', cellsFormat: 'd', width: 120, cellClassName: cellClass3, cellsalign: 'right'},
                    {text: 'Inspeccion', dataField: 'insp', cellsFormat: 'd', width: 100, cellClassName: cellClass3, cellsalign: 'right'},
                    {text: 'Env.TSuperf.', dataField: 'envi_galv', cellsFormat: 'd', width: 110, cellClassName: cellClass4, cellsalign: 'right'},
                    {text: 'Galvanizado', dataField: 'galv', width: 100, cellsFormat: 'd', cellClassName: cellClass4, cellsalign: 'right'},
                    {text: 'Insp. Galva.', dataField: 'insp_galv', cellsFormat: 'd', width: 110, cellClassName: cellClass4, cellsalign: 'right'},
                    {text: 'Metrado', dataField: 'mpint', width: 100, cellsFormat: 'd', cellClassName: cellClass5, cellsalign: 'right'},
                    {text: 'Pintura', dataField: 'pint', width: 100, cellsFormat: 'd', cellClassName: cellClass5, cellsalign: 'right'},
                    {text: 'Insp. Pintura', dataField: 'insp_pint', width: 100, cellsFormat: 'd', cellClassName: cellClass5, cellsalign: 'right'},
                    {text: 'Traslado', dataField: 'tras_int', cellsFormat: 'd', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Empaque', dataField: 'empa', cellsFormat: 'd', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Carga', dataField: 'carg', cellsFormat: 'd', width: 100, cellClassName: cellClass6, cellsalign: 'right'},
                    {text: 'Despacho', dataField: 'desp', cellsFormat: 'd', width: 100, cellClassName: cellClass6, cellsalign: 'right'}
                ]
            });
    $("#grid").jqxGrid('localizestrings', localizationobj);
}
$('#grid').on('rowDoubleClick', function (event) {

// event args.
    var args = event.args;
    // row data.
    var row = args.row;
    // row key.
    var key = args.key;
    // data field
    var dataField = args.dataField;
    // original click event.
    var clickEvent = args.originalEvent;
    if (row.tipo_ot === "zona") {
        //  listar_programa(row.reporta, row.intIdTipoProducto, labelunidad, fecha_ini, fecha_fin, row.intIdProyZona);
    } else if (row.tipo_ot === "programa") {

        //  listar_grupo(row.idProy, row.intIdTipoProducto, labelunidad, fecha_ini, fecha_fin, row.intIdProyZona, row.intIdProyTarea);
    } else if (row.tipo_ot === "paquete") {

        //  listar_codigo(row.idProy, row.intIdTipoProducto, labelunidad, fecha_ini, fecha_fin, row.intIdProyZona, row.intIdProyTarea, row.intIdProyPaquete);
    } else if (row.tipo_ot === "codigo") {

    } else if (row.tipo_ot === "total") {

    } else
    {
        // listar_zona(row.intIdProy, row.intIdTipoProducto, labelunidad, fecha_ini, fecha_fin);
    }
});
$('#grid_componente').on('rowDoubleClick', function (event) {

// event args.
    var args = event.args;
    // row data.
    var row = args.row;
    // row key.
    var key = args.key;
    // data field
    var dataField = args.dataField;
    // original click event.
    var clickEvent = args.originalEvent;
    if (row.tipo_ot === "zona") {
        //  listar_programa(row.reporta, row.intIdTipoProducto, labelunidad, fecha_ini, fecha_fin, row.intIdProyZona);
    } else if (row.tipo_ot === "programa") {
        // listar_grupo(row.idProy, row.intIdTipoProducto, labelunidad, fecha_ini, fecha_fin, row.intIdProyZona, row.intIdProyTarea);
    } else if (row.tipo_ot === "paquete") {
        //  listar_codigo(row.idProy, row.intIdTipoProducto, labelunidad, fecha_ini, fecha_fin, row.intIdProyZona, row.intIdProyTarea, row.intIdProyPaquete);
    } else if (row.tipo_ot === "codigo") {

    } else if (row.tipo_ot === "total") {

    } else
    {
        //  listar_zona(row.intIdProy, row.intIdTipoProducto, labelunidad, fecha_ini, fecha_fin);
    }
});
function ot_1(unidad) {
    var ot = [];
    $.ajax({
        type: 'POST',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',

        url: url + '/GestionProyectos/public/index.php/combox_list_unid_nego_proy',
        dataType: 'json',
        data: {
            intIdUniNego: unidad
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/

        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_data_list_proyectos();
            }
        },
        success: function (responses) {

            responses.data.push({intIdproy: -1, varCodiProy: 'TODOS'});
            ot = responses.data.reverse();
            var source =
                    {
                        localdata: ot,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_ot").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varCodiProy", valueMember: "intIdproy", width: 200, height: 30, });
            $("#txt_ot").jqxDropDownList('checkIndex', 0);
        }
    });
}
function combo_tipo_grupo_estructura() {
    var t_g_e = [];
    $.ajax({
        type: 'GET',
        url: url + '/GestionPartList/public/index.php/comb_tipo_grupo_wip',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            responses.data.push({intIdTipoGrupo: -1, varDescTipoGrupo: 'TODOS'});

            // t_g_e = responses.data.reverse();
            //   console.log(t_g_e);
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'intIdTipoGrupo'},
                            {name: 'varDescTipoGrupo'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#tipo_gupo_estructura").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoGrupo", valueMember: "intIdTipoGrupo", width: 200, height: 30, });
            // Focus the jqxDropDownList
            $("#tipo_gupo_estructura").jqxDropDownList('focus');
            $("#tipo_gupo_estructura").jqxDropDownList('selectIndex', 0);
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

            $("#producto").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30, });
            // Focus the jqxDropDownList
            $("#producto").jqxDropDownList('focus');
            $("#producto").jqxDropDownList('selectIndex', 0);
        }
    });
}
function unidad_negocio() {
    var negocio = [];
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_unid_nego_acti',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            responses.data.push({intIdUniNego: -1, varDescripcion: 'TODOS'});
            negocio = responses.data.reverse();
            var source =
                    {
                        localdata: negocio,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdUniNego'},
                            {name: 'varDescripcion'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#unidad_negocio").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdUniNego", width: 200, height: 30});
            // Focus the jqxDropDownList
            $("#unidad_negocio").jqxDropDownList('focus');
            $("#unidad_negocio").jqxDropDownList('selectIndex', 0);
        }
    });
}
function unidad() {
    var data = [
        {intIdUniNego: 'PESOB', varDescripcion: 'PESO BRUTO'},
        {intIdUniNego: 'PESON', varDescripcion: 'PESO NETO'},
        {intIdUniNego: 'AREA', varDescripcion: 'AREA'},
        {intIdUniNego: 'CANTIDAD', varDescripcion: 'CANTIDAD'}];
    var source =
            {
                localdata: data,
                datatype: "array",
                datafields: [
                    {name: 'intIdUniNego'},
                    {name: 'varDescripcion'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#unidad").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdUniNego", width: 200, height: 30});
    // Focus the jqxDropDownList
    $("#unidad").jqxDropDownList('focus');
    $("#unidad").jqxDropDownList('selectIndex', 0);
}
function buscar_ot() {
    fecha_ini = $("#fech_inic").val();
    fecha_fin = $("#fech_fin").val();
    check_items_ot = "";
    var items = $("#txt_ot").jqxDropDownList('getCheckedItems');
    $.each(items, function (index) {
        check_items_ot += this.value + ",";
    });
    if (codunidadnegocio) {
        if (check_items_ot) {
            if (codigoproducto) {
                if (labelunidad) {
                    if (fecha_ini !== "" && fecha_fin !== "") {
                        if (fecha_ini > fecha_fin) {
                            mensaje(false, "La fecha innicio debe ser menor a la fecha final", "no");
                        } else {

                            listar_wip(check_items_ot, codigoproducto, codunidadnegocio, labelunidad, fecha_ini, fecha_fin, check_tipo_gupo);
                        }
                    } else {
                        listar_wip(check_items_ot, codigoproducto, codunidadnegocio, labelunidad, fecha_ini, fecha_fin, check_tipo_gupo);

                    }
                } else {
                    mensaje(false, "Debe seleccionar un UNIDAD", "no");
                }
            } else {
                mensaje(false, "Debe seleccionar un PRODUCTO", "no");
            }
        } else {
            mensaje(false, "Debe seleccionar una OT", "no");
        }
    } else {
        mensaje(false, "Debe seleccionar una UNIDAD DE NEGOCIO", "no");
    }
}
function hideModal() {
    $("#modal-cargar-wip").removeClass("in");
    $(".modal-backdrop").remove();
    $("#modal-cargar-wip").hide();
}


function listar_wip(cod_ot, cod_pro, cod_unidad_negocio, cod_unidad, fecha_ini, fecha_fin, tipo_grupo2) {
    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
    var total = 0;
    var total_componente = 0;
    var fabricacion = 0;
    var envi_galv = 0;
    var galv = 0;
    var insp_galv = 0;
    var pint = 0;
    var insp_pint = 0;
    var tras_int = 0;
    var empa = 0;
    var carg = 0;
    var desp = 0;
    var insp = 0;
    var corte = 0;
    var quiebre = 0;
    var cepillado = 0;
    var codificacion = 0;
    var codificacion = 0;
    var rolado = 0;
    var plegado = 0;
    var roscado = 0;
    var punzanado = 0;
    var mpintura = 0;
    data = [];
    data_componente = [];

    $("#modal-cargar-wip").modal('show'); //coloco andy

    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/list_ot_o_todas_ot_vers2',
        dataType: 'json',
        data: {
            v_varintIdProy: cod_ot,
            v_intIdTipoProducto: cod_pro,
            v_unidad: cod_unidad,
            v_fech_fina: fecha_fin,
            v_fech_inic: fecha_ini,
            v_opcion: reporte,
            v_TipoGrupo: tipo_grupo2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // actualizar_tipo_etapa();

                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);

            }
        },
        success: function (responses) {
            if (codigoproducto === "1") {
                //
                for (var i = 0; responses.data.length > i; i++) {
                    if (responses.data[i]['TotaElem'] === null) {
                        responses.data[i]['TotaElem'] = 0;
                    }
                    if (responses.data[i]['fabri'] === null) {
                        responses.data[i]['fabri'] = 0;
                    }
                    if (responses.data[i]['envi_galv'] === null) {
                        responses.data[i]['envi_galv'] = 0;
                    }
                    if (responses.data[i]['galv'] === null) {
                        responses.data[i]['galv'] = 0;
                    }
                    if (responses.data[i]['insp_galv'] === null) {
                        responses.data[i]['insp_galv'] = 0;
                    }
                    if (responses.data[i]['pint'] === null) {
                        responses.data[i]['pint'] = 0;
                    }
                    if (responses.data[i]['insp_pint'] === null) {
                        responses.data[i]['insp_pint'] = 0;
                    }
                    if (responses.data[i]['tras_int'] === null) {
                        responses.data[i]['tras_int'] = 0;
                    }
                    if (responses.data[i]['empa'] === null) {
                        responses.data[i]['empa'] = 0;
                    }
                    if (responses.data[i]['carg'] === null) {
                        responses.data[i]['carg'] = 0;
                    }
                    if (responses.data[i]['desp'] === null) {
                        responses.data[i]['desp'] = 0;
                    }
                    if (responses.data[i]['insp'] === null) {
                        responses.data[i]['insp'] = 0;
                    }
                    if (responses.data[i]['mpint'] === null) {
                        responses.data[i]['mpint'] = 0;
                    }
                    total += parseFloat(responses.data[i]['TotaElem']);
                    fabricacion += parseFloat(responses.data[i]['fabri']);
                    envi_galv += parseFloat(responses.data[i]['envi_galv']);
                    galv += parseFloat(responses.data[i]['galv']);
                    insp_galv += parseFloat(responses.data[i]['insp_galv']);
                    pint += parseFloat(responses.data[i]['pint']);
                    insp_pint += parseFloat(responses.data[i]['insp_pint']);
                    tras_int += parseFloat(responses.data[i]['tras_int']);
                    empa += parseFloat(responses.data[i]['empa']);
                    carg += parseFloat(responses.data[i]['carg']);
                    desp += parseFloat(responses.data[i]['desp']);
                    insp += parseFloat(responses.data[i]['insp']);
                    mpintura += parseFloat(responses.data[i]['mpint']);
                }
                total = parseFloat(total).toFixed(3);
                fabricacion = parseFloat(fabricacion).toFixed(3);
                envi_galv = parseFloat(envi_galv).toFixed(3);
                galv = parseFloat(galv).toFixed(3);
                insp_galv = parseFloat(insp_galv).toFixed(3);
                pint = parseFloat(pint).toFixed(3);
                insp_pint = parseFloat(insp_pint).toFixed(3);
                tras_int = parseFloat(tras_int).toFixed(3);
                empa = parseFloat(empa).toFixed(3);
                carg = parseFloat(carg).toFixed(3);
                desp = parseFloat(desp).toFixed(3);
                insp = parseFloat(insp).toFixed(3);
                mpintura = parseFloat(mpintura).toFixed(3);
                var asd = ({
                    "intIdProy": 1,
                    "idProy": 1,
                    "insp": insp,
                    "reporta": 'a',
                    "intIdTipoProducto": 0,
                    "intIdProyZona": 0,
                    "nombProy": 'TOTAL',
                    "TotaElem": total,
                    "fabri": fabricacion,
                    "envi_galv": envi_galv,
                    "galv": galv,
                    "insp_galv": insp_galv,
                    "pint": pint,
                    "insp_pint": insp_pint,
                    "tras_int": tras_int,
                    "empa": empa,
                    "carg": carg,
                    "desp": desp,
                    "mpint": mpintura,
                    "tipo_ot": 'total'
                });
                responses.data.push(asd);

                data = responses.data;
                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);
                var source =
                        {
                            dataType: "json",
                            dataFields: [
                                {name: 'intIdProy', type: 'number'},
                                {name: 'Reporta', type: 'number'},
                                {name: 'intIdTipoProducto', type: 'number'},
                                {name: 'intIdProyZona', type: 'number'},
                                {name: 'nombProy', type: 'string'},
                                {name: 'TotaElem', type: 'string'},
                                {name: 'fabri', type: 'string'},
                                {name: 'insp', type: 'string'},
                                {name: 'envi_galv', type: 'string'},
                                {name: 'galv', type: 'string'},
                                {name: 'insp_galv', type: 'string'},
                                {name: 'pint', type: 'string'},
                                {name: 'insp_pint', type: 'string'},
                                {name: 'tras_int', type: 'string'},
                                {name: 'empa', type: 'string'},
                                {name: 'carg', type: 'string'},
                                {name: 'desp', type: 'string'},
                                {name: 'idProy', type: 'number'},
                                {name: 'mpint', type: 'string'},
                                {name: 'fechatermino', type: 'string'}
                            ],
                            hierarchy:
                                    {
                                        keyDataField: {name: 'intIdProy'},
                                        parentDataField: {name: 'Reporta'}
                                    },
                            id: 'intIdProy',
                            localData: responses.data
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                jQuery("#grid").jqxTreeGrid({
                    source: dataAdapter
                });
                $('#grid').on('bindingComplete', function () {
                    $("#grid").jqxTreeGrid('expandAll');
                });
            } else {
                for (var i = 0; responses.data.length > i; i++) {

                    if (responses.data[i]['TotaElem'] === null) {
                        responses.data[i]['TotaElem'] = 0;
                    }
                    if (responses.data[i]['Corte'] === null) {
                        responses.data[i]['Corte'] = 0;
                    }
                    if (responses.data[i]['Quiebre'] === null) {
                        responses.data[i]['Quiebre'] = 0;
                    }
                    if (responses.data[i]['Cepillado'] === null) {
                        responses.data[i]['Cepillado'] = 0;
                    }
                    if (responses.data[i]['Codificacion'] === null) {
                        responses.data[i]['Codificacion'] = 0;
                    }
                    if (responses.data[i]['Rolado'] === null) {
                        responses.data[i]['Rolado'] = 0;
                    }
                    if (responses.data[i]['Plegado'] === null) {
                        responses.data[i]['Plegado'] = 0;
                    }
                    if (responses.data[i]['Roscado'] === null) {
                        responses.data[i]['Roscado'] = 0;
                    }
                    if (responses.data[i]['Punzonado'] === null) {
                        responses.data[i]['Punzonado'] = 0;
                    }
                    total_componente += parseFloat(responses.data[i]['TotaElem']);
                    corte += parseFloat(responses.data[i]['Corte']);
                    quiebre += parseFloat(responses.data[i]['Quiebre']);
                    cepillado += parseFloat(responses.data[i]['Cepillado']);
                    codificacion += parseFloat(responses.data[i]['Codificacion']);
                    rolado += parseFloat(responses.data[i]['Rolado']);
                    plegado += parseFloat(responses.data[i]['Plegado']);
                    roscado += parseFloat(responses.data[i]['Roscado']);
                    punzanado += parseFloat(responses.data[i]['Punzonado']);
                }

                total_componente = parseFloat(total_componente).toFixed(3);
                corte = parseFloat(corte).toFixed(3);
                quiebre = parseFloat(quiebre).toFixed(3);
                cepillado = parseFloat(cepillado).toFixed(3);
                codificacion = parseFloat(codificacion).toFixed(3);
                rolado = parseFloat(rolado).toFixed(3);
                plegado = parseFloat(plegado).toFixed(3);
                roscado = parseFloat(roscado).toFixed(3);
                punzanado = parseFloat(punzanado).toFixed(3);
                var total_componente_data = ({
                    "intIdProy": 1,
                    "idProy": 1,
                    "intIdTipoProducto": 0,
                    "intIdProyZona": 0,
                    "reporta": 'a',
                    "TotaElem": total_componente,
                    "nombProy": 'TOTAL',
                    "Corte": corte,
                    "InsC": 0,
                    "Quiebre": quiebre,
                    "InsQui": 0,
                    "Cepillado": cepillado,
                    "InsCep": 0,
                    "Codificacion": codificacion,
                    "InsCodi": 0,
                    "Rolado": rolado,
                    "InsRol": 0,
                    "Plegado": plegado,
                    "InsPle": 0,
                    "Roscado": roscado,
                    "InsRos": 0,
                    "Punzonado": punzanado,
                    "InsPun": 0,
                    "tipo_ot": 'total'
                });
                responses.data.push(total_componente_data);
                data_componente = responses.data;
                var source =
                        {
                            dataType: "json",
                            dataFields: [
                                {name: 'intIdProy', type: 'number'},
                                {name: 'intIdTipoProducto', type: 'number'},
                                {name: 'intIdProyZona', type: 'number'},
                                {name: 'reporta', type: 'number'},
                                {name: 'TotaElem', type: 'string'},
                                {name: 'nombProy', type: 'string'},
                                {name: 'Corte', type: 'string'},
                                {name: 'InsC', type: 'string'},
                                {name: 'Quiebre', type: 'string'},
                                {name: 'InsQui', type: 'string'},
                                {name: 'Cepillado', type: 'string'},
                                {name: 'InsCep', type: 'string'},
                                {name: 'Codificacion', type: 'string'},
                                {name: 'InsCodi', type: 'string'},
                                {name: 'Rolado', type: 'string'},
                                {name: 'InsRol', type: 'string'},
                                {name: 'Plegado', type: 'string'},
                                {name: 'InsPle', type: 'string'},
                                {name: 'Roscado', type: 'string'},
                                {name: 'InsRos', type: 'string'},
                                {name: 'Punzonado', type: 'string'},
                                {name: 'InsPun', type: 'string'},
                                {name: 'idProy', type: 'number'}
                            ],
                            hierarchy:
                                    {
                                        keyDataField: {name: 'intIdProy'},
                                        parentDataField: {name: 'reporta'}
                                    },
                            id: 'intIdProy',
                            localData: data_componente
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_componente").jqxTreeGrid({
                    source: dataAdapter
                });
                $('#grid_componente').on('bindingComplete', function () {
                    $("#grid_componente").jqxTreeGrid('expandAll');
                });
                //var dataAdapter = new $.jqx.dataAdapter(source);
            }
        }
    });
}
function listar_zona(cod_ot_zona, cod_pro_zona, cod_unidad_zona, fecha_ini_zona, fecha_fin_zona, tipo_grupo2) {
    $("#modal-cargar-wip").modal('show'); //coloco andy

    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/repo_zona_vers2',
        dataType: 'json',
        data: {
            v_intIdProy: cod_ot_zona,
            v_intIdTipoProducto: cod_pro_zona,
            v_unidad: cod_unidad_zona,
            v_fech_fina: fecha_fin_zona,
            v_fech_inic: fecha_ini_zona,
            v_opcion: reporte,
            v_TipoGrupo: tipo_grupo2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //actualizar_tipo_etapa();

                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);

            }
        },
        success: function (responses) {

            if (codigoproducto === "1") {
                $("#grid").jqxTreeGrid('refresh');
                for (j = 0; j < responses.data.length; j++) {
                    if (responses.data[j]['TotaElem'] === null) {
                        responses.data[j]['TotaElem'] = 0;
                    }
                    if (responses.data[j]['fabri'] === null) {
                        responses.data[j]['fabri'] = 0;
                    }
                    if (responses.data[j]['envi_galv'] === null) {
                        responses.data[j]['envi_galv'] = 0;
                    }
                    if (responses.data[j]['galv'] === null) {
                        responses.data[j]['galv'] = 0;
                    }
                    if (responses.data[j]['insp_galv'] === null) {
                        responses.data[j]['insp_galv'] = 0;
                    }
                    if (responses.data[j]['pint'] === null) {
                        responses.data[j]['pint'] = 0;
                    }
                    if (responses.data[j]['insp_pint'] === null) {
                        responses.data[j]['insp_pint'] = 0;
                    }
                    if (responses.data[j]['tras_int'] === null) {
                        responses.data[j]['tras_int'] = 0;
                    }
                    if (responses.data[j]['empa'] === null) {
                        responses.data[j]['empa'] = 0;
                    }
                    if (responses.data[j]['carg'] === null) {
                        responses.data[j]['carg'] = 0;
                    }
                    if (responses.data[j]['desp'] === null) {
                        responses.data[j]['desp'] = 0;
                    }
                    if (responses.data[j]['insp'] === null) {
                        responses.data[j]['insp'] = 0;
                    }
                    if (responses.data[j]['mpint'] === null) {
                        responses.data[j]['mpint'] = 0;
                    }
                    var intId = responses.data[j].intIdProy + '' + responses.data[j].intIdProyZona;
                    var zona = ({
                        "intIdProy": intId,
                        "idProy": responses.data[j].intIdProy,
                        "reporta": responses.data[j].intIdProy,
                        "intIdTipoProducto": responses.data[j].intIdTipoProducto,
                        "intIdProyZona": responses.data[j].intIdProyZona,
                        "nombProy": responses.data[j].nombProy,
                        "TotaElem": responses.data[j].TotaElem,
                        "fabri": responses.data[j].fabri,
                        "insp": responses.data[j].insp,
                        "envi_galv": responses.data[j].envi_galv,
                        "galv": responses.data[j].galv,
                        "insp_galv": responses.data[j].insp_galv,
                        "pint": responses.data[j].pint,
                        "insp_pint": responses.data[j].insp_pint,
                        "tras_int": responses.data[j].tras_int,
                        "empa": responses.data[j].empa,
                        "carg": responses.data[j].carg,
                        "desp": responses.data[j].desp,
                        "tipo_ot": 'zona',
                        "mpint": responses.data[j].mpint,
                        "fechatermino": responses.data[j].fechatermino
                    });
                    data.push(zona);
                }

                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);



                var source =
                        {
                            dataType: "json",
                            dataFields: [
                                {name: 'intIdProy', type: 'number'},
                                {name: 'reporta', type: 'number'},
                                {name: 'intIdTipoProducto', type: 'number'},
                                {name: 'intIdProyZona', type: 'number'},
                                {name: 'nombProy', type: 'string'},
                                {name: 'TotaElem', type: 'string'},
                                {name: 'fabri', type: 'string'},
                                {name: 'insp', type: 'string'},
                                {name: 'envi_galv', type: 'string'},
                                {name: 'galv', type: 'string'},
                                {name: 'insp_galv', type: 'string'},
                                {name: 'pint', type: 'string'},
                                {name: 'insp_pint', type: 'string'},
                                {name: 'tras_int', type: 'string'},
                                {name: 'empa', type: 'string'},
                                {name: 'carg', type: 'string'},
                                {name: 'desp', type: 'string'},
                                {name: 'tipo_ot', type: 'string'},
                                {name: 'idProy', type: 'number'},
                                {name: 'fechatermino', type: 'string'},
                                {name: 'mpint', type: 'string'},
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
                $("#grid").jqxTreeGrid({
                    source: dataAdapter

                });
            } else {
                $("#grid_componente").jqxTreeGrid('refresh');
                for (i = 0; i < responses.data.length; i++) {
                    if (responses.data[i]['TotaElem'] === null) {
                        responses.data[i]['TotaElem'] = 0;
                    }
                    if (responses.data[i]['Corte'] === null) {
                        responses.data[i]['Corte'] = 0;
                    }
                    if (responses.data[i]['Quiebre'] === null) {
                        responses.data[i]['Quiebre'] = 0;
                    }
                    if (responses.data[i]['Cepillado'] === null) {
                        responses.data[i]['Cepillado'] = 0;
                    }
                    if (responses.data[i]['Codificacion'] === null) {
                        responses.data[i]['Codificacion'] = 0;
                    }
                    if (responses.data[i]['Rolado'] === null) {
                        responses.data[i]['Rolado'] = 0;
                    }
                    if (responses.data[i]['Plegado'] === null) {
                        responses.data[i]['Plegado'] = 0;
                    }
                    if (responses.data[i]['Roscado'] === null) {
                        responses.data[i]['Roscado'] = 0;
                    }
                    if (responses.data[i]['Punzonado'] === null) {
                        responses.data[i]['Punzonado'] = 0;
                    }
                    var intId = responses.data[i].intIdProy + '' + responses.data[i].intIdProyZona;
                    var zona = ({
                        "intIdProy": intId,
                        "idProy": responses.data[i].intIdProy,
                        "intIdTipoProducto": responses.data[i].intIdTipoProducto,
                        "intIdProyZona": responses.data[i].intIdProyZona,
                        "reporta": responses.data[i].intIdProy,
                        "TotaElem": responses.data[i].TotaElem,
                        "nombProy": responses.data[i].nombProy,
                        "Corte": responses.data[i].Corte,
                        "InsC": responses.data[i].InsC,
                        "Quiebre": responses.data[i].Quiebre,
                        "InsQui": responses.data[i].InsQui,
                        "Cepillado": responses.data[i].Cepillado,
                        "InsCep": responses.data[i].InsCep,
                        "Codificacion": responses.data[i].Codificacion,
                        "InsCodi": responses.data[i].InsCodi,
                        "Rolado": responses.data[i].Rolado,
                        "InsRol": responses.data[i].InsRol,
                        "Plegado": responses.data[i].Plegado,
                        "InsPle": responses.data[i].InsPle,
                        "Roscado": responses.data[i].Roscado,
                        "InsRos": responses.data[i].InsRos,
                        "Punzonado": responses.data[i].Punzonado,
                        "InsPun": responses.data[i].InsPun,
                        "tipo_ot": 'zona',
                    });
                    data_componente.push(zona);
                }

                var source =
                        {
                            dataType: "json",
                            dataFields: [
                                {name: 'intIdProy', type: 'number'},
                                {name: 'intIdTipoProducto', type: 'number'},
                                {name: 'intIdProyZona', type: 'number'},
                                {name: 'reporta', type: 'number'},
                                {name: 'TotaElem', type: 'string'},
                                {name: 'nombProy', type: 'string'},
                                {name: 'Corte', type: 'string'},
                                {name: 'InsC', type: 'string'},
                                {name: 'Quiebre', type: 'string'},
                                {name: 'InsQui', type: 'string'},
                                {name: 'Cepillado', type: 'string'},
                                {name: 'InsCep', type: 'string'},
                                {name: 'Codificacion', type: 'string'},
                                {name: 'InsCodi', type: 'string'},
                                {name: 'Rolado', type: 'string'},
                                {name: 'InsRol', type: 'string'},
                                {name: 'Plegado', type: 'string'},
                                {name: 'InsPle', type: 'string'},
                                {name: 'Roscado', type: 'string'},
                                {name: 'InsRos', type: 'string'},
                                {name: 'Punzonado', type: 'string'},
                                {name: 'InsPun', type: 'string'},
                                {name: 'idProy', type: 'number'},
                                {name: 'tipo_ot', type: 'string'}
                            ],
                            hierarchy:
                                    {
                                        keyDataField: {name: 'intIdProy'},
                                        parentDataField: {name: 'reporta'}
                                    },
                            id: 'intIdProy',
                            localData: data_componente
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_componente").jqxTreeGrid({
                    source: dataAdapter

                });
            }
        }
    });
}
function listar_programa(cod_ot_programa, cod_pro_programa, cod_unidad_programa, fecha_ini_programa, fecha_fin_programa, zona_programa, TipoGrupo2) {

    $("#modal-cargar-wip").modal('show'); //coloco andy

    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/repo_prog',
        dataType: 'json',
        data: {
            v_intIdProy: cod_ot_programa,
            v_intIdTipoProducto: cod_pro_programa,
            v_unidad: cod_unidad_programa,
            v_fech_fina: fecha_fin_programa,
            v_fech_inic: fecha_ini_programa,
            v_intIdProyZona: zona_programa,
            v_opcion: reporte,
            v_TipoGrupo: TipoGrupo2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //actualizar_tipo_etapa();

                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);

            }
        },
        success: function (responses) {
            if (codigoproducto === "1") {
                $("#grid").jqxTreeGrid('refresh');
                for (j = 0; j < responses.data.length; j++) {
                    if (responses.data[j]['TotaElem'] === null) {
                        responses.data[j]['TotaElem'] = 0;
                    }
                    if (responses.data[j]['fabri'] === null) {
                        responses.data[j]['fabri'] = 0;
                    }
                    if (responses.data[j]['envi_galv'] === null) {
                        responses.data[j]['envi_galv'] = 0;
                    }
                    if (responses.data[j]['galv'] === null) {
                        responses.data[j]['galv'] = 0;
                    }
                    if (responses.data[j]['insp_galv'] === null) {
                        responses.data[j]['insp_galv'] = 0;
                    }
                    if (responses.data[j]['pint'] === null) {
                        responses.data[j]['pint'] = 0;
                    }
                    if (responses.data[j]['insp_pint'] === null) {
                        responses.data[j]['insp_pint'] = 0;
                    }
                    if (responses.data[j]['tras_int'] === null) {
                        responses.data[j]['tras_int'] = 0;
                    }
                    if (responses.data[j]['empa'] === null) {
                        responses.data[j]['empa'] = 0;
                    }
                    if (responses.data[j]['carg'] === null) {
                        responses.data[j]['carg'] = 0;
                    }
                    if (responses.data[j]['desp'] === null) {
                        responses.data[j]['desp'] = 0;
                    }
                    if (responses.data[j]['insp'] === null) {
                        responses.data[j]['insp'] = 0;
                    }
                    if (responses.data[j]['mpint'] === null) {
                        responses.data[j]['mpint'] = 0;
                    }
                    var intId_2 = responses.data[j].intIdProy + '' + responses.data[j].intIdProyZona;
                    var intId = responses.data[j].intIdProy + '' + responses.data[j].intIdProyZona + '' + responses.data[j].intIdProyTarea;
                    var asd = ({
                        "intIdProy": intId,
                        "idProy": responses.data[j].intIdProy,
                        "reporta": intId_2,
                        "insp": responses.data[j].insp,
                        "intIdTipoProducto": responses.data[j].intIdTipoProducto,
                        "intIdProyZona": responses.data[j].intIdProyZona,
                        "nombProy": responses.data[j].nombProy,
                        "TotaElem": responses.data[j].TotaElem,
                        "fabri": responses.data[j].fabri,
                        "envi_galv": responses.data[j].envi_galv,
                        "galv": responses.data[j].galv,
                        "insp_galv": responses.data[j].insp_galv,
                        "pint": responses.data[j].pint,
                        "insp_pint": responses.data[j].insp_pint,
                        "tras_int": responses.data[j].tras_int,
                        "empa": responses.data[j].empa,
                        "carg": responses.data[j].carg,
                        "desp": responses.data[j].desp,
                        "intIdProyTarea": responses.data[j].intIdProyTarea,
                        "tipo_ot": 'programa',
                        "mpint": responses.data[j].mpint,
                        "fechatermino": responses.data[j].fechatermino
                    });
                    data.push(asd);
                }


                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);

                var source = {

                    datatype: "json",
                    datafields: [
                        {name: 'intIdProy', type: 'string'},
                        {name: 'reporta', type: 'number'},
                        {name: 'intIdTipoProducto', type: 'number'},
                        {name: 'intIdProyZona', type: 'number'},
                        {name: 'intIdProyTarea', type: 'number'},
                        {name: 'nombProy', type: 'string'},
                        {name: 'TotaElem', type: 'string'},
                        {name: 'fabri', type: 'string'},
                        {name: 'insp', type: 'string'},
                        {name: 'envi_galv', type: 'string'},
                        {name: 'galv', type: 'string'},
                        {name: 'insp_galv', type: 'string'},
                        {name: 'pint', type: 'string'},
                        {name: 'insp_pint', type: 'string'},
                        {name: 'tras_int', type: 'string'},
                        {name: 'empa', type: 'string'},
                        {name: 'carg', type: 'string'},
                        {name: 'desp', type: 'string'},
                        {name: 'tipo_ot', type: 'string'},
                        {name: 'idProy', type: 'number'},
                        {name: 'fechatermino', type: 'string'},
                        {name: 'mpint', type: 'string'},
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
                jQuery("#grid").jqxTreeGrid({
                    source: dataAdapter
                });
            } else {
                $("#grid_componente").jqxTreeGrid('refresh');
                for (i = 0; i < responses.data.length; i++) {
                    if (responses.data[i]['TotaElem'] === null) {
                        responses.data[i]['TotaElem'] = 0;
                    }
                    if (responses.data[i]['Corte'] === null) {
                        responses.data[i]['Corte'] = 0;
                    }
                    if (responses.data[i]['Quiebre'] === null) {
                        responses.data[i]['Quiebre'] = 0;
                    }
                    if (responses.data[i]['Cepillado'] === null) {
                        responses.data[i]['Cepillado'] = 0;
                    }
                    if (responses.data[i]['Codificacion'] === null) {
                        responses.data[i]['Codificacion'] = 0;
                    }
                    if (responses.data[i]['Rolado'] === null) {
                        responses.data[i]['Rolado'] = 0;
                    }
                    if (responses.data[i]['Plegado'] === null) {
                        responses.data[i]['Plegado'] = 0;
                    }
                    if (responses.data[i]['Roscado'] === null) {
                        responses.data[i]['Roscado'] = 0;
                    }
                    if (responses.data[i]['Punzonado'] === null) {
                        responses.data[i]['Punzonado'] = 0;
                    }
                    var intId_2 = responses.data[i].intIdProy + '' + responses.data[i].intIdProyZona;
                    var intId = responses.data[i].intIdProy + '' + responses.data[i].intIdProyZona + '' + responses.data[i].intIdProyTarea;
                    var zona = ({
                        "intIdProy": intId,
                        "idProy": responses.data[i].intIdProy,
                        "intIdTipoProducto": responses.data[i].intIdTipoProducto,
                        "intIdProyZona": responses.data[i].intIdProyZona,
                        "reporta": intId_2,
                        "TotaElem": responses.data[i].TotaElem,
                        "nombProy": responses.data[i].nombProy,
                        "Corte": responses.data[i].Corte,
                        "InsC": responses.data[i].InsC,
                        "Quiebre": responses.data[i].Quiebre,
                        "InsQui": responses.data[i].InsQui,
                        "Cepillado": responses.data[i].Cepillado,
                        "InsCep": responses.data[i].InsCep,
                        "Codificacion": responses.data[i].Codificacion,
                        "InsCodi": responses.data[i].InsCodi,
                        "Rolado": responses.data[i].Rolado,
                        "InsRol": responses.data[i].InsRol,
                        "Plegado": responses.data[i].Plegado,
                        "InsPle": responses.data[i].InsPle,
                        "Roscado": responses.data[i].Roscado,
                        "InsRos": responses.data[i].InsRos,
                        "Punzonado": responses.data[i].Punzonado,
                        "InsPun": responses.data[i].InsPun,
                        "intIdProyTarea": responses.data[i].intIdProyTarea,
                        "tipo_ot": 'programa'
                    });
                    data_componente.push(zona);
                }
                var source =
                        {
                            dataType: "json",
                            dataFields: [
                                {name: 'intIdProy', type: 'string'},
                                {name: 'intIdTipoProducto', type: 'number'},
                                {name: 'intIdProyZona', type: 'number'},
                                {name: 'intIdProyTarea', type: 'number'},
                                {name: 'reporta', type: 'number'},
                                {name: 'TotaElem', type: 'string'},
                                {name: 'nombProy', type: 'string'},
                                {name: 'Corte', type: 'string'},
                                {name: 'InsC', type: 'string'},
                                {name: 'Quiebre', type: 'string'},
                                {name: 'InsQui', type: 'string'},
                                {name: 'Cepillado', type: 'string'},
                                {name: 'InsCep', type: 'string'},
                                {name: 'Codificacion', type: 'string'},
                                {name: 'InsCodi', type: 'string'},
                                {name: 'Rolado', type: 'string'},
                                {name: 'InsRol', type: 'string'},
                                {name: 'Plegado', type: 'string'},
                                {name: 'InsPle', type: 'string'},
                                {name: 'Roscado', type: 'string'},
                                {name: 'InsRos', type: 'string'},
                                {name: 'Punzonado', type: 'string'},
                                {name: 'InsPun', type: 'string'},
                                {name: 'idProy', type: 'number'},
                                {name: 'tipo_ot', type: 'string'}
                            ],
                            hierarchy:
                                    {
                                        keyDataField: {name: 'intIdProy'},
                                        parentDataField: {name: 'reporta'}
                                    },
                            id: 'intIdProy',
                            localData: data_componente
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_componente").jqxTreeGrid({
                    source: dataAdapter

                });
            }
        }
    });
}
function listar_grupo(cod_ot_grupo, cod_pro_grupo, cod_unidad_grupo, fecha_ini_grupo, fecha_fin_grupo, zona_grupo, tarea_grupo, tipoGrupo) {
    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/repo_grup',
        dataType: 'json',
        data: {
            v_intIdProy: cod_ot_grupo,
            v_intIdTipoProducto: cod_pro_grupo,
            v_unidad: cod_unidad_grupo,
            v_fech_fina: fecha_fin_grupo,
            v_fech_inic: fecha_ini_grupo,
            v_intIdProyZona: zona_grupo,
            v_intIdProyTarea: tarea_grupo,
            v_opcion: reporte,
            v_TipoGrupo: tipoGrupo
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        beforeSend: function () {
            $("#modal-cargar-wip").modal('show');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //actualizar_tipo_etapa();

                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);

            }
        },
        success: function (responses) {
            if (codigoproducto === "1") {
                $("#grid").jqxTreeGrid('refresh');
                for (j = 0; j < responses.data.length; j++) {
                    if (responses.data[j]['TotaElem'] === null) {
                        responses.data[j]['TotaElem'] = 0;
                    }
                    if (responses.data[j]['fabri'] === null) {
                        responses.data[j]['fabri'] = 0;
                    }
                    if (responses.data[j]['envi_galv'] === null) {
                        responses.data[j]['envi_galv'] = 0;
                    }
                    if (responses.data[j]['galv'] === null) {
                        responses.data[j]['galv'] = 0;
                    }
                    if (responses.data[j]['insp_galv'] === null) {
                        responses.data[j]['insp_galv'] = 0;
                    }
                    if (responses.data[j]['pint'] === null) {
                        responses.data[j]['pint'] = 0;
                    }
                    if (responses.data[j]['insp_pint'] === null) {
                        responses.data[j]['insp_pint'] = 0;
                    }
                    if (responses.data[j]['tras_int'] === null) {
                        responses.data[j]['tras_int'] = 0;
                    }
                    if (responses.data[j]['empa'] === null) {
                        responses.data[j]['empa'] = 0;
                    }
                    if (responses.data[j]['carg'] === null) {
                        responses.data[j]['carg'] = 0;
                    }
                    if (responses.data[j]['desp'] === null) {
                        responses.data[j]['desp'] = 0;
                    }
                    if (responses.data[j]['insp'] === null) {
                        responses.data[j]['insp'] = 0;
                    }
                    if (responses.data[j]['mpint'] === null) {
                        responses.data[j]['mpint'] = 0;
                    }
                    var intId_2 = responses.data[j].intIdProy + '' + responses.data[j].intIdProyZona + responses.data[j].intIdProyTarea;
                    var intId = responses.data[j].intIdProy + '' + responses.data[j].intIdProyZona + '' + responses.data[j].intIdProyTarea + '' + responses.data[j].intIdProyPaquete;
                    var asd = ({
                        "intIdProy": intId,
                        "idProy": responses.data[j].intIdProy,
                        "reporta": intId_2,
                        "insp": responses.data[j].insp,
                        "intIdTipoProducto": responses.data[j].intIdTipoProducto,
                        "intIdProyZona": responses.data[j].intIdProyZona,
                        "nombProy": responses.data[j].nombProy,
                        "TotaElem": responses.data[j].TotaElem,
                        "fabri": responses.data[j].fabri,
                        "envi_galv": responses.data[j].envi_galv,
                        "galv": responses.data[j].galv,
                        "insp_galv": responses.data[j].insp_galv,
                        "pint": responses.data[j].pint,
                        "insp_pint": responses.data[j].insp_pint,
                        "tras_int": responses.data[j].tras_int,
                        "empa": responses.data[j].empa,
                        "carg": responses.data[j].carg,
                        "desp": responses.data[j].desp,
                        "intIdProyTarea": responses.data[j].intIdProyTarea,
                        "intIdProyPaquete": responses.data[j].intIdProyPaquete,
                        "tipo_ot": 'paquete',
                        "mpint": responses.data[j].mpint,
                        "fechatermino": responses.data[j].fechatermino
                    });
                    data.push(asd);
                }
                var source = {

                    datatype: "json",
                    datafields: [
                        {name: 'intIdProy', type: 'string'},
                        {name: 'reporta', type: 'number'},
                        {name: 'intIdTipoProducto', type: 'number'},
                        {name: 'intIdProyZona', type: 'number'},
                        {name: 'intIdProyTarea', type: 'number'},
                        {name: 'nombProy', type: 'string'},
                        {name: 'TotaElem', type: 'string'},
                        {name: 'fabri', type: 'string'},
                        {name: 'insp', type: 'string'},
                        {name: 'envi_galv', type: 'string'},
                        {name: 'galv', type: 'string'},
                        {name: 'insp_galv', type: 'string'},
                        {name: 'pint', type: 'string'},
                        {name: 'insp_pint', type: 'string'},
                        {name: 'tras_int', type: 'string'},
                        {name: 'empa', type: 'string'},
                        {name: 'carg', type: 'string'},
                        {name: 'desp', type: 'string'},
                        {name: 'tipo_ot', type: 'string'},
                        {name: 'idProy', type: 'number'},
                        {name: 'intIdProyPaquete', type: 'number'},
                        {name: 'fechatermino', type: 'string'},
                        {name: 'mpint', type: 'string'},
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
                jQuery("#grid").jqxTreeGrid({
                    source: dataAdapter
                });
            } else {
                $("#grid_componente").jqxTreeGrid('refresh');
                for (i = 0; i < responses.data.length; i++) {
                    if (responses.data[i]['TotaElem'] === null) {
                        responses.data[i]['TotaElem'] = 0;
                    }
                    if (responses.data[i]['Corte'] === null) {
                        responses.data[i]['Corte'] = 0;
                    }
                    if (responses.data[i]['Quiebre'] === null) {
                        responses.data[i]['Quiebre'] = 0;
                    }
                    if (responses.data[i]['Cepillado'] === null) {
                        responses.data[i]['Cepillado'] = 0;
                    }
                    if (responses.data[i]['Codificacion'] === null) {
                        responses.data[i]['Codificacion'] = 0;
                    }
                    if (responses.data[i]['Rolado'] === null) {
                        responses.data[i]['Rolado'] = 0;
                    }
                    if (responses.data[i]['Plegado'] === null) {
                        responses.data[i]['Plegado'] = 0;
                    }
                    if (responses.data[i]['Roscado'] === null) {
                        responses.data[i]['Roscado'] = 0;
                    }
                    if (responses.data[i]['Punzonado'] === null) {
                        responses.data[i]['Punzonado'] = 0;
                    }
                    var intId_2 = responses.data[i].intIdProy + '' + responses.data[i].intIdProyZona + responses.data[i].intIdProyTarea;
                    var intId = responses.data[i].intIdProy + '' + responses.data[i].intIdProyZona + '' + responses.data[i].intIdProyTarea + '' + responses.data[i].intIdProyPaquete;
                    var grupo = ({
                        "intIdProy": intId,
                        "idProy": responses.data[i].intIdProy,
                        "intIdTipoProducto": responses.data[i].intIdTipoProducto,
                        "intIdProyZona": responses.data[i].intIdProyZona,
                        "reporta": intId_2,
                        "TotaElem": responses.data[i].TotaElem,
                        "nombProy": responses.data[i].nombProy,
                        "Corte": responses.data[i].Corte,
                        "InsC": responses.data[i].InsC,
                        "Quiebre": responses.data[i].Quiebre,
                        "InsQui": responses.data[i].InsQui,
                        "Cepillado": responses.data[i].Cepillado,
                        "InsCep": responses.data[i].InsCep,
                        "Codificacion": responses.data[i].Codificacion,
                        "InsCodi": responses.data[i].InsCodi,
                        "Rolado": responses.data[i].Rolado,
                        "InsRol": responses.data[i].InsRol,
                        "Plegado": responses.data[i].Plegado,
                        "InsPle": responses.data[i].InsPle,
                        "Roscado": responses.data[i].Roscado,
                        "InsRos": responses.data[i].InsRos,
                        "Punzonado": responses.data[i].Punzonado,
                        "InsPun": responses.data[i].InsPun,
                        "intIdProyTarea": responses.data[i].intIdProyTarea,
                        "intIdProyPaquete": responses.data[i].intIdProyPaquete,
                        "tipo_ot": 'paquete'
                    });
                    data_componente.push(grupo);
                }


                var source =
                        {
                            dataType: "json",
                            dataFields: [
                                {name: 'intIdProy', type: 'string'},
                                {name: 'intIdTipoProducto', type: 'number'},
                                {name: 'intIdProyZona', type: 'number'},
                                {name: 'reporta', type: 'number'},
                                {name: 'TotaElem', type: 'string'},
                                {name: 'nombProy', type: 'string'},
                                {name: 'Corte', type: 'string'},
                                {name: 'InsC', type: 'string'},
                                {name: 'Quiebre', type: 'string'},
                                {name: 'InsQui', type: 'string'},
                                {name: 'Cepillado', type: 'string'},
                                {name: 'InsCep', type: 'string'},
                                {name: 'Codificacion', type: 'string'},
                                {name: 'InsCodi', type: 'string'},
                                {name: 'Rolado', type: 'string'},
                                {name: 'InsRol', type: 'string'},
                                {name: 'Plegado', type: 'string'},
                                {name: 'InsPle', type: 'string'},
                                {name: 'Roscado', type: 'string'},
                                {name: 'InsRos', type: 'string'},
                                {name: 'Punzonado', type: 'string'},
                                {name: 'InsPun', type: 'string'},
                                {name: 'idProy', type: 'number'},
                                {name: 'tipo_ot', type: 'string'},
                                {name: 'intIdProyTarea', type: 'number'},
                                {name: 'intIdProyPaquete', type: 'number'}
                            ],
                            hierarchy:
                                    {
                                        keyDataField: {name: 'intIdProy'},
                                        parentDataField: {name: 'reporta'}
                                    },
                            id: 'intIdProy',
                            localData: data_componente
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_componente").jqxTreeGrid({
                    source: dataAdapter

                });
            }
            window.setTimeout(function () {

                $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
            }, 1000);
            //$('.modal.in').modal('hide')
            //hideModal();
            //  $("#btn_cerr_wip").trigger('click');
        }
    });
}
function listar_codigo(cod_ot_codigo, cod_pro_codigo, cod_unidad_codigo, fecha_ini_codigo, fecha_fin_codigo, zona_codigo, tarea_codigo, grupo_codigo, tipo_grupo2) {

    $("#modal-cargar-wip").modal('show'); //coloco andy


    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/repo_codi',
        dataType: 'json',
        data: {
            v_intIdProy: cod_ot_codigo,
            v_intIdTipoProducto: cod_pro_codigo,
            v_unidad: cod_unidad_codigo,
            v_fech_fina: fecha_fin_codigo,
            v_fech_inic: fecha_ini_codigo,
            v_intIdProyZona: zona_codigo,
            v_intIdProyTarea: tarea_codigo,
            v_intIdProyPaquete: grupo_codigo,
            v_opcion: reporte,
            v_TipoGrupo: tipo_grupo2
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/

        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // actualizar_tipo_etapa();

                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);


            }
        },
        success: function (responses) {
            if (codigoproducto === "1") {
                $("#grid").jqxTreeGrid('refresh');
                for (var j = 0; j < responses.data.length; j++) {
                    if (responses.data[j]['TotaElem'] === null) {
                        responses.data[j]['TotaElem'] = 0;
                    }
                    if (responses.data[j]['fabri'] === null) {
                        responses.data[j]['fabri'] = 0;
                    }
                    if (responses.data[j]['envi_galv'] === null) {
                        responses.data[j]['envi_galv'] = 0;
                    }
                    if (responses.data[j]['galv'] === null) {
                        responses.data[j]['galv'] = 0;
                    }
                    if (responses.data[j]['insp_galv'] === null) {
                        responses.data[j]['insp_galv'] = 0;
                    }
                    if (responses.data[j]['pint'] === null) {
                        responses.data[j]['pint'] = 0;
                    }
                    if (responses.data[j]['insp_pint'] === null) {
                        responses.data[j]['insp_pint'] = 0;
                    }
                    if (responses.data[j]['tras_int'] === null) {
                        responses.data[j]['tras_int'] = 0;
                    }
                    if (responses.data[j]['empa'] === null) {
                        responses.data[j]['empa'] = 0;
                    }
                    if (responses.data[j]['carg'] === null) {
                        responses.data[j]['carg'] = 0;
                    }
                    if (responses.data[j]['desp'] === null) {
                        responses.data[j]['desp'] = 0;
                    }
                    if (responses.data[j]['insp'] === null) {
                        responses.data[j]['insp'] = 0;
                    }
                    if (responses.data[j]['mpint'] === null) {
                        responses.data[j]['mpint'] = 0;
                    }
                    var intId_2 = responses.data[j].intIdProy + '' + responses.data[j].intIdProyZona + responses.data[j].intIdProyTarea + responses.data[j].intIdProyPaquete;
                    var intId = responses.data[j].intIdProy + '' + responses.data[j].intIdProyZona + '' + responses.data[j].intIdProyTarea + '' + responses.data[j].intIdProyPaquete + '' + responses.data[j].codigo;
                    var asd = ({
                        "intIdProy": intId,
                        "idProy": responses.data[j].intIdProy,
                        "reporta": intId_2,
                        "insp": responses.data[j].insp,
                        "intIdTipoProducto": responses.data[j].intIdTipoProducto,
                        "intIdProyZona": responses.data[j].intIdProyZona,
                        "nombProy": responses.data[j].codigo,
                        "TotaElem": responses.data[j].TotaElem,
                        "fabri": responses.data[j].fabri,
                        "envi_galv": responses.data[j].envi_galv,
                        "galv": responses.data[j].galv,
                        "insp_galv": responses.data[j].insp_galv,
                        "pint": responses.data[j].pint,
                        "insp_pint": responses.data[j].insp_pint,
                        "tras_int": responses.data[j].tras_int,
                        "empa": responses.data[j].empa,
                        "carg": responses.data[j].carg,
                        "desp": responses.data[j].desp,
                        "intIdProyTarea": responses.data[j].intIdProyTarea,
                        "intIdProyPaquete": responses.data[j].intIdProyPaquete,
                        "tipo_ot": 'codigo',
                        "mpint": responses.data[j].mpint,
                        "fechatermino": responses.data[j].fechatermino
                    });
                    data.push(asd);
                }


                window.setTimeout(function () {

                    $("#modal-cargar-wip").modal('hide'); // COLOCO ANDY 
                }, 1000);

                var source = {

                    datatype: "json",
                    datafields: [
                        {name: 'intIdProy', type: 'string'},
                        {name: 'reporta', type: 'number'},
                        {name: 'intIdTipoProducto', type: 'number'},
                        {name: 'intIdProyZona', type: 'number'},
                        {name: 'intIdProyTarea', type: 'number'},
                        {name: 'intIdProyPaquete', type: 'number'},
                        {name: 'nombProy', type: 'string'},
                        {name: 'TotaElem', type: 'string'},
                        {name: 'fabri', type: 'string'},
                        {name: 'insp', type: 'string'},
                        {name: 'envi_galv', type: 'string'},
                        {name: 'galv', type: 'string'},
                        {name: 'insp_galv', type: 'string'},
                        {name: 'pint', type: 'string'},
                        {name: 'insp_pint', type: 'string'},
                        {name: 'tras_int', type: 'string'},
                        {name: 'empa', type: 'string'},
                        {name: 'carg', type: 'string'},
                        {name: 'desp', type: 'string'},
                        {name: 'tipo_ot', type: 'string'},
                        {name: 'idProy', type: 'number'},
                        {name: 'fechatermino', type: 'string'},
                        {name: 'mpint', type: 'string'},
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
                jQuery("#grid").jqxTreeGrid({
                    source: dataAdapter
                });
            } else {
                $("#grid_componente").jqxTreeGrid('refresh');
                for (var i = 0; responses.data.length > i; i++) {
                    if (responses.data[i]['TotaElem'] === null) {
                        responses.data[i]['TotaElem'] = 0;
                    }
                    if (responses.data[i]['Corte'] === null) {
                        responses.data[i]['Corte'] = 0;
                    }
                    if (responses.data[i]['Quiebre'] === null) {
                        responses.data[i]['Quiebre'] = 0;
                    }
                    if (responses.data[i]['Cepillado'] === null) {
                        responses.data[i]['Cepillado'] = 0;
                    }
                    if (responses.data[i]['Codificacion'] === null) {
                        responses.data[i]['Codificacion'] = 0;
                    }
                    if (responses.data[i]['Rolado'] === null) {
                        responses.data[i]['Rolado'] = 0;
                    }
                    if (responses.data[i]['Plegado'] === null) {
                        responses.data[i]['Plegado'] = 0;
                    }
                    if (responses.data[i]['Roscado'] === null) {
                        responses.data[i]['Roscado'] = 0;
                    }
                    if (responses.data[i]['Punzonado'] === null) {
                        responses.data[i]['Punzonado'] = 0;
                    }
                    var intId_2 = responses.data[i].intIdProy + '' + responses.data[i].intIdProyZona + responses.data[i].intIdProyTarea + responses.data[i].intIdProyPaquete;
                    var intId = responses.data[i].intIdProy + '' + responses.data[i].intIdProyZona + '' + responses.data[i].intIdProyTarea + '' + responses.data[i].intIdProyPaquete + '' + responses.data[i].codigo;
                    var zona = ({
                        "intIdProy": intId,
                        "idProy": responses.data[i].intIdProy,
                        "intIdTipoProducto": responses.data[i].intIdTipoProducto,
                        "intIdProyZona": responses.data[i].intIdProyZona,
                        "reporta": intId_2,
                        "TotaElem": responses.data[i].TotaElem,
                        "nombProy": responses.data[i].codigo,
                        "Corte": responses.data[i].Corte,
                        "InsC": responses.data[i].InsC,
                        "Quiebre": responses.data[i].Quiebre,
                        "InsQui": responses.data[i].InsQui,
                        "Cepillado": responses.data[i].Cepillado,
                        "InsCep": responses.data[i].InsCep,
                        "Codificacion": responses.data[i].Codificacion,
                        "InsCodi": responses.data[i].InsCodi,
                        "Rolado": responses.data[i].Rolado,
                        "InsRol": responses.data[i].InsRol,
                        "Plegado": responses.data[i].Plegado,
                        "InsPle": responses.data[i].InsPle,
                        "Roscado": responses.data[i].Roscado,
                        "InsRos": responses.data[i].InsRos,
                        "Punzonado": responses.data[i].Punzonado,
                        "InsPun": responses.data[i].InsPun,
                        "intIdProyTarea": responses.data[i].intIdProyTarea,
                        "intIdProyPaquete": responses.data[i].intIdProyPaquete,
                        "tipo_ot": 'codigo'
                    });
                    data_componente.push(zona);
                }
                var source =
                        {
                            dataType: "json",
                            dataFields: [
                                {name: 'intIdProy', type: 'string'},
                                {name: 'intIdTipoProducto', type: 'number'},
                                {name: 'intIdProyZona', type: 'number'},
                                {name: 'intIdProyTarea', type: 'number'},
                                {name: 'intIdProyPaquete', type: 'number'},
                                {name: 'reporta', type: 'number'},
                                {name: 'TotaElem', type: 'string'},
                                {name: 'nombProy', type: 'string'},
                                {name: 'Corte', type: 'string'},
                                {name: 'InsC', type: 'string'},
                                {name: 'Quiebre', type: 'string'},
                                {name: 'InsQui', type: 'string'},
                                {name: 'Cepillado', type: 'string'},
                                {name: 'InsCep', type: 'string'},
                                {name: 'Codificacion', type: 'string'},
                                {name: 'InsCodi', type: 'string'},
                                {name: 'Rolado', type: 'string'},
                                {name: 'InsRol', type: 'string'},
                                {name: 'Plegado', type: 'string'},
                                {name: 'InsPle', type: 'string'},
                                {name: 'Roscado', type: 'string'},
                                {name: 'InsRos', type: 'string'},
                                {name: 'Punzonado', type: 'string'},
                                {name: 'InsPun', type: 'string'},
                                {name: 'idProy', type: 'number'},
                                {name: 'tipo_ot', type: 'string'}
                            ],
                            hierarchy:
                                    {
                                        keyDataField: {name: 'intIdProy'},
                                        parentDataField: {name: 'reporta'}
                                    },
                            id: 'intIdProy',
                            localData: data_componente
                        };

                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_componente").jqxTreeGrid({
                    source: dataAdapter
                });
            }

        }
    });
}
function limpiar() {
    $("#fech_inic").val("mm/dd/yyyy");
    $("#fech_fin").val("mm/dd/yyyy");
    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#unidad_negocio").jqxDropDownList('selectIndex', 0);
    $("#txt_ot").jqxComboBox('selectIndex', 0);
    $("#unidad").jqxDropDownList('selectIndex', 0);
    data = [];
    tree_grid();
}
function ver_reporte_grupo(paq, labelcodot, zona) {
    listar_elementos(paq);
    datos_ot_zona(labelcodot, zona);
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/sele_los_codi_paqu_camp',
        dataType: 'json',
        data: {
            v_intIdProyPaquete: paq

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte);
            }
        },
        success: function (responses) {
            $("#pro_ver").val(labelcodproducto);
            $("#zon_ver").val(responses.data[0].Zona);
            $("#prog_ver").val(responses.data[0].varDescripTarea);
            $("#grup_ver").val(responses.data[0].varCodigoPaquete);
            $("#prec_ver").val(responses.data[0].TotalPesoNeto);
            $("#cant_elem_ver").val(responses.data[0].Cantidad);
            $("#armador_ver").val(responses.data[0].Armador);
            $("#planta_ver").val(responses.data[0].Planta);
            $("#contrata_ver").val(responses.data[0].Contratista);
            $("#etapa_ver").val(responses.data[0].Etapa);
            var fecha = new Date();
            var año_actual = fecha.getFullYear();
            var mes_actual = fecha.getMonth() + 1;
            var dia_actual = fecha.getDate();
            if (mes_actual <= 9) {
                var mes_now = '0' + mes_actual;
            } else {
                var mes_now = mes_actual;
            }
            if (dia_actual <= 9) {
                var dia_now = '0' + dia_actual;
            } else {
                var dia_now = dia_actual;
            }
            var fecha_actual = año_actual + '-' + mes_now + '-' + dia_now;
            if (responses.data[0].fecha_Inicio !== null) {
                var año = new Date(responses.data[0].fecha_Inicio).getFullYear();
                var dia = new Date(responses.data[0].fecha_Inicio).getDate();
                var mes = new Date(responses.data[0].fecha_Inicio).getMonth() + 1;
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
                $("#inicio").removeClass('hidde_grid');
                $("#fech_inic_grup_ver").val(año + '-' + mes_inicio + '-' + dia_ultimo);
            } else {
                $("#inicio").addClass('hidde_grid');
                $("#fech_inic_grup_ver").val(fecha_actual);
            }
            if (responses.data[0].fecha_Fin !== null) {
                var año_fin = new Date(responses.data[0].fecha_Fin).getFullYear();
                var dia_fin = new Date(responses.data[0].fecha_Fin).getDate();
                var mes_fin = new Date(responses.data[0].fecha_Fin).getMonth() + 1;
                if (dia_fin <= 9) {
                    var dia_ultimo_fin = '0' + dia_fin;
                } else {
                    var dia_ultimo_fin = dia_fin;
                }
                if (mes_fin <= 9) {
                    var mes_ultimo = '0' + mes_fin;
                } else {
                    var mes_ultimo = mes_fin;
                }
                $("#termino").removeClass('hidde_grid');
                $("#fech_fin_grup_ver").val(año_fin + '-' + mes_ultimo + '-' + dia_ultimo_fin);
            } else {
                $("#termino").addClass('hidde_grid');
                $("#fech_fin_grup_ver").val(fecha_actual);
            }
            if (responses.data[0].fecha_TerminoReal !== null) {
                var año_fin_ter = new Date(responses.data[0].fecha_TerminoReal).getFullYear();
                var dia_fin_ter = new Date(responses.data[0].fecha_TerminoReal).getDate();
                var mes_fin_ter = new Date(responses.data[0].fecha_TerminoReal).getMonth() + 1;
                if (dia_fin_ter <= 9) {
                    var dia_ultimo_fin = '0' + dia_fin_ter;
                } else {
                    var dia_ultimo_fin = dia_fin_ter;
                }
                if (mes_fin_ter <= 9) {
                    var mes_ultimo = '0' + mes_fin_ter;
                } else {
                    var mes_ultimo = mes_fin_ter;
                }
                $("#real").addClass('hidde_grid');
                $("#fecha_termino").removeClass('hidde_grid');
                $("#fech_term_grup_ver").val(año_fin_ter + '-' + mes_ultimo + '-' + dia_ultimo_fin);
            } else {
                $("#real").removeClass('hidde_grid');
                $("#fecha_termino").addClass('hidde_grid');
                $("#fech_term_grup_ver").val(fecha_actual);
            }
            $("#modal-ver-grupos").modal('show');
        }
    });
}
function listar_elementos(cod_paq) {

    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/sele_los_codi_paqu_gril',
        dataType: 'json',
        data: {
            v_intIdProyPaquete: parseInt(cod_paq)
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
                            {name: 'Cantidad', type: 'string'},
                            {name: 'Codigo', type: 'string'},
                            {name: 'Estado', type: 'string'},
                            {name: 'EtapaActual', type: 'string'},
                            {name: 'EtapaSiguiente', type: 'string'},
                            {name: 'TotalPesoBruto', type: 'number'},
                            {name: 'TotalPesoNeto', type: 'number'},
                            {name: 'varDescripcion', type: 'string'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $('#grid4').jqxGrid('showloadelement');
            $("#grid4").jqxGrid({
                width: '100%',
                height: '200',
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [

                    {text: 'Elemento', datafield: 'Codigo', width: '10%', aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid4").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Descripción', datafield: 'varDescripcion', width: '12%'},
                    {text: 'Cantidad', datafield: 'Cantidad', width: '7%', aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {

                                                    var total = parseFloat(record['Cantidad']);
                                                    return aggregatedValue + total;
                                                }
                                    }]},
                    {text: 'Peso Neto', datafield: 'TotalPesoNeto', width: '15%', aggregates:
                                [{
                                        '<b>Peso N.</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {

                                                    var total = 0;
                                                    subtotal = parseFloat(record['TotalPesoNeto']) * parseFloat(record['Cantidad']);
                                                    subtotal = parseFloat(subtotal).toFixed(3);
                                                    subtotal = parseFloat(subtotal);
                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]

                    },
                    {text: 'Peso Bruto', datafield: 'TotalPesoBruto', width: '15%', aggregates:
                                [{
                                        '<b>Peso B.</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {

                                                    var total = 0;
                                                    subtotal = parseFloat(record['TotalPesoBruto']) * parseFloat(record['Cantidad']);
                                                    subtotal = parseFloat(subtotal).toFixed(3);
                                                    subtotal = parseFloat(subtotal);
                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]

                    },
                    {text: 'Etapa Actual', datafield: 'EtapaActual', width: '20%'},
                    {text: 'Etapa Siguiente', datafield: 'EtapaSiguiente', width: '20%'}
                ]
            });
        }
    });
}
function ver_pdf(ot, zona, codigo) {
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
            var emb = '<embed  class="embed-responsive-item"  width="900" height="1064" src="' + url_final + '" id="url" type="application/pdf">';
            $("#pdf").html(emb);
            $("#modal-pdf").modal('show');
        }
    });
}
function datos_ot_zona(ot, zona) {
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
            $("#ot_ver").val(responses.data[0].varCodiProy);
        }
    });
    //
}
$("#btn_cerr_wip").on("click", function (e) {
    $("#modal-cargar-wip").modal("hide");
    e.stopPropagation(); //This line would take care of it
});