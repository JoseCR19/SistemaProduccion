var codigoproducto = "";
var codigoot = "";
var codunidadnegocio = "";
var labelunidad = "";
var fecha_ini = "";
var fecha_fin = "";
var label_element = "";
var array_general = new Array();
var json_array = "";
var data = {};
var zona = {};
$("#producto").on('change', function (event) {
    codigoproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
        }
    }

});
$("#txt_ot").on('change', function (event) {
    codigoot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            //$("#producto").jqxDropDownList('selectIndex', 0);
            check_items_zona = [];
        }
    }
});
$("#unidad_negocio").on('change', function (event) {
    codunidadnegocio = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codunidadnegocio = item.value;
        }
    }
});
$("#unidad").on('change', function (event) {

    if (event.args) {
        var item = event.args.item;

        if (item) {
            labelunidad = item.label;
        }
    }
});
$("#btn_busc").on('click', function () {
    buscar_ot();
});
$("#limpiar").on('click', function () {
    limpiar();
});

$("#btn_buscar2").on('click', function () {
    buscar_ot_2();
});
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
                    {name: 'desp', type: 'string'}
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
    // create Tree Grid
    $("#grid").jqxTreeGrid(
            {
                width: getWidth("#grid"),
                source: dataAdapter,
                sortable: true,
                ready: function ()
                {
                    $("#grid").jqxTreeGrid('expandRow', '2');
                },
                columns: [
                    {text: 'Id', columnGroup: 'info', dataField: 'intIdProy', width: 200, 'hidden': true},
                    {text: 'IdProducto', columnGroup: 'info', dataField: 'intIdTipoProducto', width: 200, 'hidden': true},
                    {text: 'Proyecto', dataField: 'nombProy', columnGroup: 'info', width: 180},
                    {text: 'Total', dataField: 'TotaElem', cellsFormat: 'd', width: 120},
                    {text: 'Fabricacion', dataField: 'fabri', cellsFormat: 'd', width: 120},
                    {text: 'Inspeccion', dataField: 'insp', width: 100},
                    {text: 'Env. Galvanizado', dataField: 'envi_galv', width: 100},
                    {text: 'Galvanizado', dataField: 'galv', width: 100},
                    {text: 'Insp. Galvanizado', dataField: 'insp_galv', width: 100},
                    {text: 'Pintura', dataField: 'pint', width: 100},
                    {text: 'Insp. Pintura', dataField: 'insp_pint', width: 100},
                    {text: 'Traslado', dataField: 'tras_int', width: 100},
                    {text: 'Empaque', dataField: 'empa', width: 100},
                    {text: 'Carga', dataField: 'carg', width: 100},
                    {text: 'Despacho', dataField: 'desp', width: 100}
                ],
                columnGroups: [
                    {text: 'Informacion', name: 'info'}
                ]
            });

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

        listar_zona(row.intIdProy, row.intIdTipoProducto, 'PESO', fecha_ini, fecha_fin);

    });
}
function ot_1() {

    var ot = [];
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url:  url + '/GestionPartList/public/index.php/List_proy_vige',
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
            $("#txt_ot").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '30px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot").jqxComboBox('focus');
            $("#txt_ot").jqxComboBox('selectIndex', 0);
        }
    });
}
function combo_producto() {
    $.ajax({
        type: 'GET',
        url:  url + '/GestionProyectos/public/index.php/list_tipo_prod',
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
        url:  url + '/GestionProyectos/public/index.php/list_unid_nego_acti',
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
        {intIdUniNego: 1, varDescripcion: 'PESO'},
        {intIdUniNego: 2, varDescripcion: 'AREA'},
        {intIdUniNego: 3, varDescripcion: 'CANTIDAD'}];
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
    if (codunidadnegocio) {
        if (codigoot) {
            if (codigoproducto) {
                if (labelunidad) {
                    if (fecha_ini !== "" && fecha_fin !== "") {
                        if (fecha_ini > fecha_fin) {
                            mensaje(false, "La fecha innicio debe ser menor a la fecha final", "no");
                        } else {
                            listar_wip(codigoot, codigoproducto, codunidadnegocio, labelunidad, fecha_ini, fecha_fin);
                        }
                    } else {
                        listar_wip(codigoot, codigoproducto, codunidadnegocio, labelunidad, fecha_ini, fecha_fin);
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
function listar_wip(cod_ot, cod_pro, cod_unidad_negocio, cod_unidad, fecha_ini, fecha_fin) {

    $.ajax({
        type: 'POST',
        url:  url + '/GestionReportes/public/index.php/list_ot_o_todas_ot_vers2',
        dataType: 'json',
        data: {
            m_intIdProy: cod_ot,
            m_intIdTipoProducto: cod_pro,
            m_unidad: cod_unidad,
            m_fech_fina: fecha_fin,
            m_fech_inic: fecha_ini

        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // actualizar_tipo_etapa();
            }
        },
        success: function (responses) {

            //  for (var i = 0; responses.data.length > i; i++) {

            //    listar_zona(responses.data[i]['intIdProy'], responses.data[i]['intIdTipoProducto'], cod_unidad, fecha_ini, fecha_fin, responses.data[i]);
            //  }

            data = responses.data;
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
                            {name: 'desp', type: 'string'}
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

        }
    });
}
function listar_zona(cod_ot_zona, cod_pro_zona, cod_unidad_zona, fecha_fin_zona, fecha_ini_zona) {

    $.ajax({
        type: 'POST',
        url:  url + '/GestionReportes/public/index.php/repo_zona_vers2',
        dataType: 'json',
        data: {
            m_intIdProy: cod_ot_zona,
            m_intIdTipoProducto: cod_pro_zona,
            m_unidad: cod_unidad_zona,
            m_fech_fina: fecha_fin_zona,
            m_fech_inic: fecha_ini_zona
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //actualizar_tipo_etapa();
            }
        },
        success: function (responses) {



            $("#grid").jqxTreeGrid('refresh');



            for (j = 0; j < responses.data.length; j++) {

                var intId =  responses.data[j].intIdProy + ''+  responses.data[j].intIdProyZona;
                var asd = ({
                    "intIdProy": intId,
                    "idProy": responses.data[j].intIdProy,
                    "reporta": responses.data[j].reporta,
                    "intIdTipoProducto": responses.data[j].intIdTipoProducto,
                    "intIdProyZona": responses.data[j].intIdProyZona,
                    "nombProy":responses.data[j].nombProy,
                    "TotaElem":  responses.data[j].TotaElem,
                    "fabri": responses.data[j].fabri,
                    "envi_galv": responses.data[j].envi_galv,
                    "galv":  responses.data[j].galv,
                    "insp_galv": responses.data[j].insp_galv,
                    "pint": responses.data[j].pint,
                    "insp_pint": responses.data[j].insp_pint,
                    "tras_int": responses.data[j].tras_int,
                    "empa": responses.data[j].empa,
                    "carg": responses.data[j].carg,
                    "desp": responses.data[j].desp
                });
               data.push(asd);
            }


            
 
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
                            {name: 'desp', type: 'string'}
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
        }
    });
}
function listar_programa(cod_ot_programa, cod_pro_programa, cod_unidad_programa, fecha_fin_programa, fecha_ini_programa, zona_programa, div, zona) {

    console.log(cod_ot_programa, cod_pro_programa, cod_unidad_programa, fecha_fin_programa, fecha_ini_programa, zona_programa, div, zona);
    $.ajax({
        type: 'POST',
        url:  url + '/GestionReportes/public/index.php/repo_prog',

        dataType: 'json',
        data: {
            m_intIdProy: cod_ot_programa,
            m_intIdTipoProducto: cod_pro_programa,
            m_unidad: cod_unidad_programa,
            m_fech_fina: fecha_fin_programa,
            m_fech_inic: fecha_ini_programa,
            m_intIdProyZona: zona_programa
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                actualizar_tipo_etapa();
            }
        },
        success: function (responses) {
            for (var i = 0; responses.data.length > i; i++) {
                listar_grupo(responses.data[i]['intIdProy'], responses.data[i]['intIdTipoProducto'], cod_unidad_programa, fecha_fin_programa, fecha_ini_programa, zona_programa, responses.data[i]['intIdProyTarea'], div, zona, responses.data[i]);
            }
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'TotaElem', type: 'string'},
                    {name: 'carg', type: 'string'},
                    {name: 'desp', type: 'string'},
                    {name: 'empa', type: 'string'},
                    {name: 'envi_galv', type: 'string'},
                    {name: 'fabri', type: 'string'},
                    {name: 'galv', type: 'string'},
                    {name: 'insp', type: 'string'},
                    {name: 'insp_galv', type: 'string'},
                    {name: 'insp_pint', type: 'string'},
                    {name: 'intIdProy', type: 'number'},
                    {name: 'intIdProyZona', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'nombProy', type: 'string'},
                    {name: 'pint', type: 'string'},
                    {name: 'tras_int', type: 'string'},
                    {name: 'intIdProyTarea', type: 'number'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
        }
    }
    );
}
function listar_grupo(cod_ot_grupo, cod_pro_grupo, cod_unidad_grupo, fecha_fin_grupo, fecha_ini_grupo, zona_grupo, tarea_grupo, div, zona, tarea) {
    console.log(cod_ot_grupo, cod_pro_grupo, cod_unidad_grupo, fecha_fin_grupo, fecha_ini_grupo, zona_grupo, tarea_grupo, div, zona, tarea);
    $.ajax({
        type: 'POST',
        url:  url + '/GestionReportes/public/index.php/repo_grup',
        dataType: 'json',
        data: {
            m_intIdProy: cod_ot_grupo,
            m_intIdTipoProducto: cod_pro_grupo,
            m_unidad: cod_unidad_grupo,
            m_fech_fina: fecha_fin_grupo,
            m_fech_inic: fecha_ini_grupo,
            m_intIdProyZona: zona_grupo,
            m_intIdProyTarea: tarea_grupo
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                actualizar_tipo_etapa();
            }
        },
        success: function (responses) {
            for (var i = 0; responses.data.length > i; i++) {
                listar_codigo(responses.data[i]['intIdProy'], responses.data[i]['intIdProyZona'], cod_unidad_grupo, fecha_fin_grupo, fecha_ini_grupo, responses.data[i]['intIdProyZona'], responses.data[i]['intIdProyTarea'], responses.data[i]['intIdProyPaquete'], div, zona, tarea, responses.data[i]);
            }
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'TotaElem', type: 'string'},
                    {name: 'carg', type: 'string'},
                    {name: 'desp', type: 'string'},
                    {name: 'empa', type: 'string'},
                    {name: 'envi_galv', type: 'string'},
                    {name: 'fabri', type: 'string'},
                    {name: 'galv', type: 'string'},
                    {name: 'insp', type: 'string'},
                    {name: 'insp_galv', type: 'string'},
                    {name: 'insp_pint', type: 'string'},
                    {name: 'intIdProy', type: 'number'},
                    {name: 'intIdProyZona', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'nombProy', type: 'string'},
                    {name: 'pint', type: 'string'},
                    {name: 'tras_int', type: 'string'},
                    {name: 'intIdProyTarea', type: 'number'},
                    {name: 'intIdProyPaquete', type: 'number'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };


        }
    });
}
function listar_codigo(cod_ot_codigo, cod_pro_codigo, cod_unidad_codigo, fecha_fin_codigo, fecha_ini_codigo, zona_codigo, tarea_codigo, grupo_codigo, div, zona, tarea, grupo) {
    console.log(cod_ot_codigo, cod_pro_codigo, cod_unidad_codigo, fecha_fin_codigo, fecha_ini_codigo, zona_codigo, tarea_codigo, grupo_codigo, div, zona, tarea, grupo);
    $.ajax({
        type: 'POST',
        url:  url + '/GestionReportes/public/index.php/repo_codi',
        dataType: 'json',
        data: {
            m_intIdProy: cod_ot_codigo,
            m_intIdTipoProducto: cod_pro_codigo,
            m_unidad: cod_unidad_codigo,
            m_fech_fina: fecha_fin_codigo,
            m_fech_inic: fecha_ini_codigo,
            m_intIdProyZona: zona_codigo,
            m_intIdProyTarea: tarea_codigo,
            m_intIdProyPaquete: grupo_codigo
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                actualizar_tipo_etapa();
            }
        },
        success: function (responses) {
            for (var i = 0; responses.data.length > i; i++) {

            }
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'TotaElem', type: 'string'},
                    {name: 'carg', type: 'string'},
                    {name: 'desp', type: 'string'},
                    {name: 'empa', type: 'string'},
                    {name: 'envi_galv', type: 'string'},
                    {name: 'fabri', type: 'string'},
                    {name: 'galv', type: 'string'},
                    {name: 'insp', type: 'string'},
                    {name: 'insp_galv', type: 'string'},
                    {name: 'insp_pint', type: 'string'},
                    {name: 'intIdProy', type: 'number'},
                    {name: 'intIdProyZona', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'nombProy', type: 'string'},
                    {name: 'pint', type: 'string'},
                    {name: 'tras_int', type: 'string'},
                    {name: 'intIdProyTarea', type: 'number'},
                    {name: 'intIdProyPaquete', type: 'number'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
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

}