var codigoot = "";
var codigoproducto = "";
var codigoestado = "";
var id_despacho = "";
var labelot = "";
var proyectos = [];
var labelproducto = "";
var planta_dir = [];
var codplanta = "";
var dirplanta = "";
var coddepartamento_sql = "";
var coddistrito_sql = "";
var coddepartamento = "";
var ructransportista = "";
var transportista_array = [];
var codtransportista = "";
var chofer_array = [];
var codzona = "";
var bulto = "";
var tipo_grupo = "";
var tipo_guia = "";
var cod_tipo_guia = "";
var id_cliente = "";
var coddepa_sql = "";
var codedepartamento_salida = "";
var codchofer = "";
var cod_motivo = "";
var buscar_des = 0;
var provincia_salida = "";
var distrito_salida_cod = "";
var departamento_salida = "";
var coddepartamento_partida = "";
var distrito_partida = "";
var coddistrito = "";
var codeprovincia = "";
var info = "";
var unidad_medida = [];
var codigo_modelo = "";


//COLOCO ANDY  

var project_ot_codigo = "";
var tipo_eleme_codigo = "";
var estado_guiaremisio = "";
var id_despa_guiaremi = "";

var tipo_grupo_label = "";
var codigo_modelo_label = "";

var intIdClie = "";

//pruebas 



$("#txt_ot").on('change', function (event) {
    $('#txt_ot').jqxDropDownList('clearFilter'); 
    codigoot = "";
    labelot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            labelot = item.label;
            $("#grid").jqxGrid('clear');
        }
    }
});
$("#limpiar").on('click',function(){
    $("#estado_guia").jqxDropDownList('selectIndex',1);
    $("#producto").jqxDropDownList('selectIndex',0);
    $("#txt_ot").jqxDropDownList('clearFilter'); 
    $("#txt_ot").jqxDropDownList('selectIndex',0);
    $("#tipo_ot").jqxDropDownList('selectIndex',0);
});
$("#producto").on('change', function (event) {
    codigoproducto = "";
    labelproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
            labelproducto = item.label;
            $("#grid").jqxGrid('clear');
        }

    }

});
$("#estado_guia").on('change', function (event) {
    codigoestado = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoestado = item.value;
            $("#grid").jqxGrid('clear');
        }
    }
});


$("#tipo_gupo_estructura").on('change', function (event) {
    tipo_grupo = "";
    tipo_grupo_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            tipo_grupo = item.value;
            tipo_grupo_label = item.label;
            // console.log(project_ot_codigo,tipo_eleme_codigo,estado_guiaremisio,id_despa_guiaremi,tipo_grupo,);
            $("#griddespacho").jqxGrid('clearSelection');
            modelo_codigo(project_ot_codigo, tipo_eleme_codigo, estado_guiaremisio, id_despa_guiaremi, tipo_grupo);
        }

    }
});
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
            $("#txt_ot").jqxDropDownList('selectIndex',0);
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
            $("#producto").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30});
            // Focus the jqxDropDownList
            $("#producto").jqxDropDownList('selectIndex', 0);
            $("#producto").jqxDropDownList('focus');
        }
    });
}
function combo_estado() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/eleg_proc_estado',
        dataType: 'json',
        data: {intIdProcEsta: 10},
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
                            {name: 'intIdEsta'},
                            {name: 'varDescEsta'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

            $("#estado_guia").jqxDropDownList({source: dataAdapter, displayMember: "varDescEsta", valueMember: "intIdEsta", width: 200, height: 30});
            // Focus the jqxDropDownList
            $("#estado_guia").jqxDropDownList('selectIndex', 1);
            $("#estado_guia").jqxDropDownList('focus');
        }
    });
}
$("#btn_busc").on('click', function () {

    if (codigoot === "") {
        mensaje(false, "INGRESE LA OT", "no");
    } else {
        $("#modal-cargar-guia").modal('show');
        buscar_despachos(codigoot, codigoproducto, codigoestado);
    }

});
function buscar_despachos(cod_ot, cod_pro, cod_est) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/lista_despacho',
        dataType: 'json',
        data: {
            intIdProy: cod_ot,
            intIdTipoProducto: cod_pro,
            intIdEsta: cod_est
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
                            {name: 'count', type: 'number'},
                            {name: 'intIdDesp', type: 'number'},
                            {name: 'intIdProy', type: 'number'},
                            {name: 'guias_despachadas', type: 'string'},
                            {name: 'deciTotaPesoNeto', type: 'string'},
                            {name: 'deciTotaPesoBruto', type: 'string'},
                            {name: 'deciTotaArea', type: 'string'},
                            {name: 'varDescEsta', type: 'string'},
                            {name: 'varArchDesp', type: 'string'},
                            {name: 'arch_desp_usua', type: 'string'},
                            {name: 'arch_desp_hora', type: 'string'},
                            {name: 'varCodiProy', type: 'string'},
                            {name: 'varArchRece', type: 'string'},
                            {name: 'varRucClie', type: 'string'},
                            {name: 'arch_rece_usua', type: 'string'},
                            {name: 'arch_rece_hora', type: 'string'},

                            {name: 'acti_usua', type: 'string'},
                            {name: 'acti_hora', type: 'string'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);

            var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {
                var editrow = row;

                var dataready = $("#grid").jqxGrid('getrowdata', editrow);

                if (dataready.varDescEsta === "TERMINADO") {
                    var html = '';
                } else {
                    var html = '<center><button class="btn btn-danger btn-sm" onClick=guiar_remision("' + editrow + '");><i class="far fa-clipboard"></i></button></center>';
                }
                return html;
            };
            var despacho_emitido = function (row, column, value, rowKey, rowData) {
                var editrow = row;
                var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                var archivo = url + '/Documentos/ReporteFotografico/' + dataRecord.varCodiProy + '/' + dataRecord.varArchDesp;


                if (dataRecord.varArchDesp === "" || dataRecord.varArchDesp === null) {
                    var desp_emitido = '<center><button class="btn btn-danger btn-sm" onClick=despacho_emitido("' + editrow + '"); style="background-color: white ;color: #dc3545;"><i class="fas fa-camera-retro"></i></button></center>';
                } else {
                    var desp_emitido = '<center><button class="btn btn-danger btn-sm" onClick=bajar_archivo("' + editrow + '","' + archivo + '"); style="background-color: white;color: #28a745;"><i class="fas fa-camera-retro"></i></button></center>';
                }

                return desp_emitido;
            };
            var despacho_recepcionado = function (row, column, value, rowKey, rowData) {
                var editrow = row;
                var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                var archivo = url + '/Documentos/ReporteFotografico/' + dataRecord.varCodiProy + '/' + dataRecord.varArchRece;


                if (dataRecord.varArchRece === "" || dataRecord.varArchDesp === null) {
                    var desp_recepcionado = '<center><button class="btn btn-danger btn-sm" onClick=despacho_recepcionada("' + editrow + '"); style="background-color: white;color: #dc3545;"><i class="fas fa-archive"></i></button></center>';
                } else {
                    var desp_recepcionado = '<center><button class="btn btn-danger btn-sm" onClick=bajar_archivo("' + editrow + '","' + archivo + '"); style="background-color: white;color: #28a745;"><i class="fas fa-archive"></i></button></center>';
                }


                return desp_recepcionado;
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
                    {text: 'Guía de Remisión', width: 120, datafield: 'Ruta', cellsrenderer: linkrenderer_accounts, cellsalign: 'center'},
                    {text: '', width: 50, datafield: 'despacho_emitido', cellsrenderer: despacho_emitido, cellsalign: 'center'},
                    {text: '', width: 50, datafield: 'despacho_recepcionado', cellsrenderer: despacho_recepcionado, cellsalign: 'center'},
                    {text: '#', datafield: 'count', width: 50, aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'O.T', datafield: 'varCodiProy', width: 100},
                    {text: 'Despacho', datafield: 'intIdDesp', width: 100},
                    {text: 'Cantidad', datafield: 'guias_despachadas', width: 250},
                    {text: 'Peso Neto', datafield: 'deciTotaPesoNeto', width: 250},
                    {text: 'Peso Bruto', datafield: 'deciTotaPesoBruto', width: 250},
                    {text: 'Area', datafield: 'deciTotaArea', width: 250},
                    {text: 'Estado', datafield: 'varDescEsta', width: 120},

                    {text: 'Archivo_desp', datafield: 'varArchDesp', width: 120, hidden: true},
                    {text: 'OT', datafield: 'intIdProy', width: 120, hidden: true},
                    {text: 'Desp_usua', datafield: 'arch_desp_usua', width: 120, hidden: true},
                    {text: 'Desp_hora', datafield: 'arch_desp_hora', width: 120, hidden: true},
                    {text: 'ruc', datafield: 'varRucClie', width: 120, hidden: true},
                    {text: 'Archivo_desp', datafield: 'varArchRece', width: 120, hidden: true},
                    {text: 'recep_usua', datafield: 'arch_rece_usua', width: 120, hidden: true},
                    {text: 'recep_hora', datafield: 'arch_rece_hora', width: 120, hidden: true},

                    {text: 'Usuario Creación', datafield: 'acti_usua', width: 250},
                    {text: 'Fecha Creación', datafield: 'acti_hora', width: 120},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }

    });
}
function combo_tipo_grupo_estructura(codot, codpro, codest, coddes) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_tipo_grupo',
        dataType: 'json',
        data: {intIdProy: codot, intIdTipoProducto: codpro, intIdEsta: codest, intIdDesp: coddes},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            responses.data.push({intIdTipoGrupo: -1, varDescTipoGrupo: 'TODOS'});
            //t_g_e = responses.data.reverse();
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
            $("#tipo_gupo_estructura").jqxDropDownList('selectIndex', 0);
            $("#tipo_gupo_estructura").jqxDropDownList('focus');
            var tipo_grupo = $("#tipo_gupo_estructura").val();
            modelo_codigo(codot, codpro, codest, coddes, tipo_grupo);
        }
    });
}
function combo_tipo_reporte() {

    var new_data = [];
    new_data.push({idTipoReporte: 1, varTipoReporte: 'CANTIDAD'}, {idTipoReporte: 2, varTipoReporte: 'SERIE'});
    var source =
            {
                localdata: new_data,
                datatype: "array",
                datafields: [
                    {name: 'idTipoReporte'},
                    {name: 'varTipoReporte'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    var dataAdapter = new $.jqx.dataAdapter(source);
    $("#tipo_reporte").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varTipoReporte", valueMember: "idTipoReporte", width: 200, height: 30, });
    $("#tipo_reporte").jqxDropDownList('focus');
}
$("#tipo_reporte").on('change', function (event) {
    cod_tipo_guia = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            cod_tipo_guia = item.value;
        }
    }
});
function combo_motivo() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_motivo_id',
        dataType: 'json',
        data: {
            intIdTipoMoti: 4
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
                            {name: 'intIdMoti'},
                            {name: 'varDescripcion'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#motivo").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdMoti", width: 200, height: 30, });
            //Focus the jqxDropDownList
            $("#motivo").jqxDropDownList('focus');
        }
    });
}
$("#motivo").on('change', function (event) {
    cod_motivo = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            cod_motivo = item.value;
            if (item.label === "OTROS") {
                document.getElementById('otros_input').disabled = false;
            } else {
                document.getElementById('otros_input').disabled = true;
            }
        }
    }
});
function guiar_remision(row) {
    $("#motivo").jqxDropDownList('clearSelection');
    combo_planta();
    combo_motivo();
    $("#fech_inic_reproceso").val('mm/dd/yyyy');
    $("#fech_fin_reproceso").val('mm/dd/yyyy');
    $("#codigo_referencia").val('');
    $("#punto_llegada").val('');
    $("#chofer").val('');
    $("#ruc_chofer").val('');
    $("#ruc_chofer").val('');
    $("#licencia").val('');
    $("#punto_partida").val('');
    $("#placa").val('');
    $("#ot_adquirida").val('');
    $("#otros_input").val('');
    document.getElementById('otros_input').disabled=true;
    $("#zona").jqxDropDownList('clearSelection');
    $("#zona").jqxDropDownList('clear');
    $("#tipo_gupo_estructura").jqxDropDownList('clearSelection');
    $("#tipo_gupo_estructura").jqxDropDownList('clear');
    $("#bulto").jqxDropDownList('clearSelection');
    $("#bulto").jqxDropDownList('clear');
    $("#id_ruc").val('');
    $("#id_raz").val('');
    listar_departamento();
    listar_departamento_salida();
    combo_tipo_reporte();
    transportista();
    numeros_documentos();
    var data = $("#grid").jqxGrid('getrowdata', row);
    validar_data(data.intIdProy, codigoproducto, data.intIdDesp, row);


}
function validar_data(codot, codproducto, coddespacho, row) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/validar_data',
        dataType: 'json',
        data: {intIdDesp: coddespacho, intIdProy: codot, intIdTipoProducto: codproducto},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            console.log(responses);
            if (responses.data.length > 0) {
                $("#modal-pregunta").modal('show');
                var data = $("#grid").jqxGrid('getrowdata', row);
                project_ot_codigo = "";
                tipo_eleme_codigo = "";
                estado_guiaremisio = "";
                id_despa_guiaremi = "";
                id_cliente = "";
                var ruc = "";
                $("#id_despacho").val(data.intIdDesp);
                id_despacho = data.intIdDesp;
                intIdClie = responses.data[0]['intIdClie'];
                //ruc = data.varRucClie;
                //cliente(ruc);
                $("#chofer").val(responses.data[0]['varNombChof']);
                $("#ruc_chofer").val(responses.data[0]['varNumeChof']);
                $("#licencia").val(responses.data[0]['varNumeLicen']);
                $("#placa").val(responses.data[0]['varPlaca']);
                $("#codigo_referencia").val(responses.data[0]['varRefe']);
                $("#motivo").val(responses.data[0]['intIdMoti']);
                console.log(responses.data[0]['intIdMoti']);
                if (responses.data[0]['intIdMoti'] === 13) {
                    console.log('ingresa');
                    document.getElementById('otros_input').disabled = false;
                    $("#otros_input").val(responses.data[0]['varMotiCome']);
                } else {
                    document.getElementById('otros_input').disabled = true;
                    $("#otros_input").val(responses.data[0]['varMotiCome']);
                }

                $("#fech_inic_reproceso").val(responses.data[0]['dateFechEmis']);
                $("#fech_fin_reproceso").val(responses.data[0]['dateFechTras']);
                $("#id_ruc").val(responses.data[0]['varRucClie']);
                $("#id_raz").val(responses.data[0]['varRazClie']);

                combo_bulto(data.intIdProy, codigoproducto, codigoestado, data.intIdDesp);
                combo_tipo_grupo_estructura(data.intIdProy, codigoproducto, codigoestado, data.intIdDesp);
                combo_zona(data.intIdProy, codigoproducto, codigoestado, data.intIdDesp);
                $("#transportista").val(parseInt(responses.data[0]['intIdTrans']));
                $("#departamento").val(responses.data[0]['varIdDepa']);
                coddepartamento_sql = responses.data[0]['varIdProvincia'];
                coddistrito_sql = responses.data[0]['varIdDistrito'];
                $("#punto_llegada").val(responses.data[0]['varPuntLleg']);
                console.log(parseInt(responses.data[0]['intIdPlanta']));
                if (parseInt(responses.data[0]['intIdPlanta']) === 0) {
                    $("#planta").val(parseInt(responses.data[0]['intIdPlanta']));
                    $("#departamento_partida").val(responses.data[0]['varIdDepaSali']);
                    provincia_salida = responses.data[0]['varIdProvinciaSali'];
                    distrito_salida_cod = responses.data[0]['varIdDistritoSali'];
                    $("#punto_partida").val(responses.data[0]['varPuntSali']);
                } else {
                    $("#planta").val(parseInt(responses.data[0]['intIdPlanta']));
                }
                project_ot_codigo = data.intIdProy;
                tipo_eleme_codigo = codigoproducto;
                estado_guiaremisio = codigoestado;
                id_despa_guiaremi = data.intIdDesp;
                $("#id_ot").val(data.varCodiProy);
                $("#id_te").val(labelproducto);
                $("#ot_adquirida").val(data.intIdProy);
                $("#modal-pregunta").modal('show');

            } else {
                var data = $("#grid").jqxGrid('getrowdata', row);
                project_ot_codigo = "";
                tipo_eleme_codigo = "";
                estado_guiaremisio = "";
                id_despa_guiaremi = "";
                var ruc = "";
                $("#id_despacho").val(data.intIdDesp);
                id_despacho = data.intIdDesp;
                ruc = data.varRucClie;
                cliente(ruc);
                combo_bulto(data.intIdProy, codigoproducto, codigoestado, data.intIdDesp);
                combo_tipo_grupo_estructura(data.intIdProy, codigoproducto, codigoestado, data.intIdDesp);
                project_ot_codigo = data.intIdProy;
                tipo_eleme_codigo = codigoproducto;
                estado_guiaremisio = codigoestado;
                id_despa_guiaremi = data.intIdDesp;
                combo_zona(data.intIdProy, codigoproducto, codigoestado, data.intIdDesp);
                $("#id_ot").val(data.varCodiProy);
                $("#id_te").val(labelproducto);
                $("#ot_adquirida").val(data.intIdProy);
                $("#modal-pregunta").modal('show');
            }
        }
    });
}
function listar_departamento() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_departamento',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                $("#provincia").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#distrito").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlDepa'},
                                {name: 'varNombDepa'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#departamento").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombDepa", valueMember: "varIdSqlDepa", width: 200, height: 30, });
                $("#departamento").jqxDropDownList('focus');
            } else {
                $("#departamento").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDepa", valueMember: "varIdSqlDepa", width: 200, height: 30});
                $("#provincia").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#distrito").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});

            }
        }
    });
}
function listar_departamento_salida() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_departamento',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                $("#provincia_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#distrito_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlDepa'},
                                {name: 'varNombDepa'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#departamento_partida").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombDepa", valueMember: "varIdSqlDepa", width: 200, height: 30, });
                //Focus the jqxDropDownList
                $("#departamento_partida").jqxDropDownList('focus');
            } else {
                $("#departamento_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDepa", valueMember: "varIdSqlDepa", width: 200, height: 30});
                $("#provincia_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#distrito_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
            }
        }
    });
}
$("#departamento").on('change', function (event) {
    coddepartamento = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            coddepartamento = item.value;
            provincia(coddepartamento);
        }
    }
});
$("#departamento_partida").on('change', function (event) {
    console.log(event);
    codedepartamento_salida = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codedepartamento_salida = item.value;
            provincia_partida(codedepartamento_salida);
        }
    }
});
function provincia(cod) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_provincia',
        dataType: 'json',
        data: {varIdSqlDepa: cod},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
                $("#distrito").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlProv'},
                                {name: 'varNombProv'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#provincia").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#provincia").jqxDropDownList('focus');
                $("#provincia").val(coddepartamento_sql);
            } else {
                $("#distrito").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                $("#provincia").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
            }
        }
    });
}
function provincia_partida(cod) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_provincia',
        dataType: 'json',
        data: {varIdSqlDepa: cod},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {

                $("#distrito_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlProv'},
                                {name: 'varNombProv'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#provincia_partida").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#provincia_partida").jqxDropDownList('focus');
                $("#provincia_partida").val(provincia_salida);


            } else {
                $("#distrito_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                $("#provincia_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
            }
        }
    });
}
$("#provincia").on('change', function (event) {
    codeprovincia = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codeprovincia = item.value;
            distrito(coddepartamento, codeprovincia);
        }
    }
});
$("#provincia_partida").on('change', function (event) {
    provincia_salida = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            provincia_salida = item.value;
            distrito_salida(codedepartamento_salida, provincia_salida);
        }
    }
});
function distrito(codde, codpro) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_distrito',
        dataType: 'json',
        data: {varIdSqlProv: codpro, varIdSqlDepa: codde},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlDist'},
                                {name: 'varNombDist'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#distrito").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                $("#distrito").jqxDropDownList('focus');
                $("#distrito").val(coddistrito_sql);
            } else {

                $("#distrito").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
            }
        }
    });
}
function distrito_salida(codde, codpro) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_distrito',
        dataType: 'json',
        data: {varIdSqlProv: codpro, varIdSqlDepa: codde},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlDist'},
                                {name: 'varNombDist'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#distrito_partida").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                $("#distrito_partida").jqxDropDownList('focus');
                $("#distrito_partida").val(distrito_salida_cod);
            } else {
                $("#distrito_partida").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
            }
        }
    });
}
$("#distrito_partida").on('change', function (event) {
    distrito_partida = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            distrito_partida = item.value;
        }
    }
});
$("#distrito").on('change', function (event) {
    coddistrito = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            coddistrito = item.value;
        }
    }
});
function cliente(ruc) {
    coddepartamento_sql = "";
    coddistrito_sql = "";
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_cliente',
        dataType: 'json',
        data: {
            varRucClie: ruc
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            intIdClie = responses.data[0].intIdClie;
            $("#id_raz").val(responses.data[0].varRazClie);
            $("#id_ruc").val(responses.data[0].varRucClie);
            $("#departamento").val(responses.data[0].varIdSqlDepa);
            $("#punto_llegada").val(responses.data[0].varDireClie);
            coddepa_sql = responses.data[0].varIdSqlDepa;
            coddepartamento_sql = responses.data[0].varIdSqlProv;
            coddistrito_sql = responses.data[0].varIdSqlDist;

        }
    });
}
function combo_planta() {
    dire_plant = [];
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_plan',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_planta();
            }
        },
        success: function (responses) {

            for (var i = 0; responses.data.length > i; i++) {
                var row = {'intIdPlanta': responses.data[i].intIdPlanta,
                    'dire_plant': responses.data[i].dire_plant,
                    'varIdSqlDepa': responses.data[i].varIdSqlDepa,
                    'varIdSqlProv': responses.data[i].varIdSqlProv,
                    'varIdSqlDist': responses.data[i].varIdSqlDist};
                dire_plant.push(row);
            }
            responses.data.push({'intIdPlanta': 0, 'varDescPlanta': 'OTROS'});
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdPlanta'},
                            {name: 'varDescPlanta'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#planta").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescPlanta", valueMember: "intIdPlanta", width: 200, height: 30, });
            //Focus the jqxDropDownList
            $("#planta").jqxDropDownList('selectIndex', 0);
            $("#planta").jqxDropDownList('focus');
        }
    });
}
$("#planta").on('change', function (event) {
    codplanta = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            console.log(item.value);
            codplanta = item.value;
            if (parseInt(codplanta) === 0) {
                document.getElementById('punto_partida').disabled = false;
                $("#punto_partida").val('');
                $("#departamento_partida").jqxDropDownList('clearSelection');
                $("#provincia_partida").jqxDropDownList('clear');
                $("#distrito_partida").jqxDropDownList('clear');

            } else {
                direccion(codplanta);
            }
        }
    }
});
function transportista() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tran',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            transportista_array = [];
            if (responses.data.length > 0) {
                for (var i = 0; responses.data.length > i; i++) {
                    var row = {'intIdTrans': responses.data[i].intIdTrans, 'varNumeIden': responses.data[i].varNumeIden};
                    transportista_array.push(row);
                }
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdTrans'},
                                {name: 'varRazonSoci'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#transportista").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varRazonSoci", valueMember: "intIdTrans", width: 200, height: 30, });
                //Focus the jqxDropDownList
                $("#transportista").jqxDropDownList('selectIndex', 0);
                $("#transportista").jqxDropDownList('focus');
            } else {
                $("#transportista").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varRazonSoci", valueMember: "intIdTrans", width: 200, height: 30, });
            }

        }
    });
}
$("#transportista").on('change', function (event) {
    codtransportista = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codtransportista = item.value;
            ruc_transportista(codtransportista);
        }
    }
});
function ruc_transportista(cod) {
    for (var i = 0; transportista_array.length > i; i++) {
        if (transportista_array[i].intIdTrans === parseInt(cod)) {
            $("#ruc_transportista").val(transportista_array[i].varNumeIden);
        }
    }
}
function direccion(cod) {
    provincia_salida = "";
    distrito_salida_cod = "";
    for (var i = 0; dire_plant.length > i; i++) {
        if (dire_plant[i].intIdPlanta === parseInt(cod)) {
            document.getElementById('punto_partida').disabled = true;
            $("#punto_partida").val(dire_plant[i].dire_plant);
            $("#departamento_partida").val(dire_plant[i].varIdSqlDepa);
            departamento_salida = dire_plant[i].varIdSqlDepa;
            provincia_salida = dire_plant[i].varIdSqlProv;
            distrito_salida_cod = dire_plant[i].varIdSqlDist;
        }
    }
}
function combo_bulto(codot, codpro, codest, coddes) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_bulto_codigo',
        dataType: 'json',
        data: {intIdProy: codot, intIdTipoProducto: codpro, intIdEsta: codest, intIdDesp: coddes},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                responses.data.push({varBulto: 'TODOS'});
                var source =
                        {
                            localdata: responses.data.reverse(),
                            datatype: "array",
                            datafields: [
                                {name: 'varBulto'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#bulto").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varBulto", valueMember: "varBulto", width: 200, height: 30, });
                //Focus the jqxDropDownList
                $("#bulto").jqxDropDownList('selectIndex', 0);
                $("#bulto").jqxDropDownList('focus');
            } else {
                $("#bulto").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varBulto", valueMember: "varBulto", width: 200, height: 30, });
            }
        }
    });
}
$("#bulto").on('change', function (event) {
    bulto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            bulto = item.value;
            $("#griddespacho").jqxGrid('clearSelection'); //COLOCO ANDY
            $("#griddespacho").jqxGrid('clear');//COLOCO ANDY
        }
    }
});
function combo_zona(codot, codpro, codest, coddes) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_tipo_zona',
        dataType: 'json',
        data: {intIdProy: codot, intIdTipoProducto: codpro, intIdEsta: codest, intIdDesp: coddes},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                responses.data.push({intIdProyZona: -1, varDescrip: 'TODOS'});
                var source =
                        {
                            localdata: responses.data.reverse(),
                            datatype: "array",
                            datafields: [
                                {name: 'intIdProyZona'},
                                {name: 'varDescrip'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#zona").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30});
                //Focus the jqxDropDownList
                $("#zona").jqxDropDownList('selectIndex', 0);
                $("#zona").jqxDropDownList('focus');
            } else {
                $("#zona").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30});
            }
        }
    });
}
$("#zona").on('change', function (event) {
    codzona = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codzona = item.value;
            $("#griddespacho").jqxGrid('clearSelection'); //COLOCO ANDY
            $("#griddespacho").jqxGrid('clear');//COLOCO ANDY
        }
    }
});
$("#generar_guia").on('click', function () {
    for (var i = 0; proyectos.length > i; i++) {
        if (proyectos[i]['intIdproy'] === parseInt(codigoot)) {
            var ruc = proyectos[i]['varRucClie'];
        }
    }


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

    $("#fech_inic_reproceso").val(fecha_actual);
    $("#fech_fin_reproceso").val(fecha_actual);
    $("#grilla_despacho_detalle").addClass('hidde_grid');
    // $("#griddespacho").jqxGrid('clearSelection');
    $("#griddespacho").jqxGrid('clear');
    document.getElementById('documento').disabled = true;
    $("#numero_documento").removeClass('hidde_grid');
    $("#guardar_documento").addClass('hidde_grid');
    tipo_guia = "1";
    $("#tipo_reporte").val(1);
    $("#tipo_reporte").jqxDropDownList('disabled', true);
    $("#modal-pregunta").modal('hide');
    $("#modal-guia_remision").modal('show');
});
$("#generar_guia2").on('click', function () {
    for (var i = 0; proyectos.length > i; i++) {
        if (proyectos[i]['intIdproy'] === parseInt(codigoot)) {
            var ruc = proyectos[i]['varRucClie'];
        }
    }

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
    $("#fech_inic_reproceso").val(fecha_actual);
    $("#fech_fin_reproceso").val(fecha_actual);
    $("#grilla_despacho_detalle").addClass('hidde_grid');
    // $("#griddespacho").jqxGrid('clearSelection');
    $("#griddespacho").jqxGrid('clear');
    tipo_guia = "2";
    $("#griddespacho").jqxGrid('clearSelection');
    $("#griddespacho").jqxGrid('clear');
    document.getElementById('documento').disabled = true;
    $("#numero_documento").removeClass('hidde_grid');
    $("#guardar_documento").addClass('hidde_grid');
    $("#tipo_reporte").val(2);
    $("#tipo_reporte").jqxDropDownList('disabled', true);
    $("#modal-pregunta").modal('hide');
    $("#modal-guia_remision").modal('show');
});
$("#btn_despachos").on('click', function () {
    var ot = $("#ot_adquirida").val();

    if (ot) {
        if (codigoproducto) {
            if (codigoestado) {
                if (codzona) {
                    if (bulto) {
                        if (codigo_modelo) {
                            if (id_despacho) {
                                if (tipo_grupo) {
                                    if (tipo_guia === "1") {

                                        buscar_despacho_detalle(ot, codigoproducto, codigoestado, codzona, bulto, id_despacho, tipo_grupo, codigo_modelo);
                                    } else if (tipo_guia === "2") {
                                        buscar_despacho_serie(ot, codigoproducto, codigoestado, codzona, bulto, id_despacho, tipo_grupo, codigo_modelo);
                                    }
                                } else {
                                    mensaje(false, "No ha seleccionado un Tipo Grupo", "no");
                                }
                            } else {
                                mensaje(false, "No ha seleccionado un Despacho", "no");
                            }
                        } else {
                            mensaje(false, "No ha seleccionado un Modelo", "no");
                        }
                    } else {
                        mensaje(false, "No ha seleccionado un Bulto", "no");
                    }
                } else {
                    mensaje(false, "No ha seleccionado un Zona", "no");
                }
            } else {
                mensaje(false, "No ha seleccionado un Estado", "no");
            }
        } else {
            mensaje(false, "No ha seleccionado un Tipo Elemento", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado una O.T", "no");
    }
});
function buscar_despacho_detalle(intIdProy, intIdTipoProducto, intIdEsta, intIdProyZona, varBulto, intIdDesp, intIdTipoGrupo, modelo) {
    cantidad_total=0;
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_despc_codigo',
        dataType: 'json',
        data: {
            intIdProy: intIdProy,
            intIdTipoProducto: intIdTipoProducto,
            intIdEsta: intIdEsta,
            intIdProyZona: intIdProyZona,
            varBulto: varBulto,
            intIdDesp: intIdDesp,
            intIdTipoGrupo: intIdTipoGrupo,
            varModelo: modelo
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                window.setTimeout(function () {
                    $("#modal-cargar-generar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);
            }
        },
        success: function (responses) {
            window.setTimeout(function () {
                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);
            listar_unidad_medida();
            if (responses.data.length > 0) {

                buscar_des = 1;
            } else {
                buscar_des = 0;
            }
            $("#grilla_despacho_detalle").removeClass('hidde_grid');
            var source_2 = {
                localdata: unidad_medida,
                datatype: "array",
                datafields: [
                    {name: 'intIdUniMedi', type: 'number'},
                    {name: 'varAbrevMedi', type: 'string'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            locallistaAdapter = new $.jqx.dataAdapter(source_2);
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdDesp', type: 'number'},
                            {name: 'varCodiElemento', type: 'string'},
                            {name: 'varDescripcion', type: 'string'},
                            {name: 'cantidad', type: 'string'},
                            {name: 'deciTotaPesoNeto', type: 'string'},
                            {name: 'deciTotaPesoBruto', type: 'string'},
                            {name: 'deciTotaArea', type: 'string'},
                            {name: 'varDescEsta', type: 'string'},
                            {name: 'acti_usua', type: 'string'},
                            {name: 'acti_hora', type: 'string'},
                            {name: 'varBulto', type: 'string'},
                            {name: 'nume_guia', type: 'string'},
                            {name: 'intIdProyTarea', type: 'number'},
                            {name: 'varDescripTarea', type: 'string'},
                            {name: 'intIdProyZona', type: 'number'},
                            {name: 'varDescrip', type: 'number'},
                            {name: 'varDescTipoGrupo', type: 'number'},
                            {name: 'intIdTipoGrupo', type: 'number'},
                            {name: 'Unidad_Medida', type: 'string'},
                            {name: 'varModelo', type: 'string'},
                            {name: 'varPerfil', type: 'string'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#griddespacho").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                editable: true,
                enabletooltips: true,
                sortable: true,
                selectionmode: 'checkbox',
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    /*{
                     text: 'Uni.Medida', datafield: 'Unidad', width: 80, editable: true, columntype: 'dropdownlist',
                     createeditor: function (row, column, editor) {
                     editor.jqxDropDownList({
                     dropDownHeight: 150,
                     source: locallistaAdapter,
                     displayMember: 'varAbrevMedi',
                     valueMember: 'intIdUniMedi',
                     filterable: false,
                     renderer: function (index, label,item) {
                     return label;
                     }
                     });
                     }},*/
                    {text: 'ID', datafield: 'intIdDesp', width: 50, editable: false, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var count = $("#griddespacho").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Codigo', datafield: 'varCodiElemento', width: 120, editable: false},
                    {text: 'Descripcion', datafield: 'varDescripcion', width: 250, editable: false},
                    {text: 'Perfil', datafield: 'varPerfil', width: 250, editable: false},
                    {text: 'Und. Medida', datafield: 'Unidad_Medida', width: 80, editable: true},
                    {text: 'Cantidad', datafield: 'cantidad', width: 80, editable: false},
                    {text: 'Programa', datafield: 'varDescripTarea', width: 120, editable: false},
                    {text: 'Zona', datafield: 'varDescrip', width: 120, editable: false},
                    {text: 'Modelo', datafield: 'varModelo', width: 120, editable: false},
                    {text: 'Peso Neto', datafield: 'deciTotaPesoNeto', width: 120, editable: false},
                    {text: 'Peso Bruto', datafield: 'deciTotaPesoBruto', width: 120, editable: false},
                    {text: 'Area', datafield: 'deciTotaArea', width: 120, editable: false}
                ]
            });
            //$("#griddespacho").jqxGrid('localizestrings', localizationobj);
        }
    });
}
function buscar_despacho_serie(intIdProy, intIdTipoProducto, intIdEsta, intIdProyZona, varBulto, intIdDesp, intIdTipoGrupo, modelo) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_despc_serie',
        dataType: 'json',
        data: {
            intIdProy: intIdProy,
            intIdTipoProducto: intIdTipoProducto,
            intIdEsta: intIdEsta,
            intIdProyZona: intIdProyZona,
            varBulto: varBulto,
            intIdDesp: intIdDesp,
            intIdTipoGrupo: intIdTipoGrupo,
            varModelo: modelo
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                window.setTimeout(function () {

                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                buscar_des = 1;
            } else {
                buscar_des = 0;
            }
            window.setTimeout(function () {

                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);
            var source_2 = {
                localdata: unidad_medida,
                datatype: "array",
                datafields: [
                    {name: 'intIdUniMedi', type: 'number'},
                    {name: 'varAbrevMedi', type: 'string'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            locallistaAdapter = new $.jqx.dataAdapter(source_2);
            $("#grilla_despacho_detalle").removeClass('hidde_grid');
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdDesp', type: 'number'},
                            {name: 'varCodiElemento', type: 'string'},
                            {name: 'varDescripcion', type: 'string'},
                            {name: 'intSerie', type: 'string'},
                            {name: 'deciTotaPesoNeto', type: 'string'},
                            {name: 'deciTotaPesoBruto', type: 'string'},
                            {name: 'deciTotaArea', type: 'string'},
                            {name: 'varDescEsta', type: 'string'},
                            {name: 'acti_usua', type: 'string'},
                            {name: 'acti_hora', type: 'string'},
                            {name: 'varBulto', type: 'string'},
                            {name: 'nume_guia', type: 'string'},
                            {name: 'intIdProyTarea', type: 'number'},
                            {name: 'varDescripTarea', type: 'string'},
                            {name: 'intIdProyZona', type: 'number'},
                            {name: 'varDescrip', type: 'number'},
                            {name: 'varDescTipoGrupo', type: 'number'},
                            {name: 'intIdTipoGrupo', type: 'number'},
                            {name: 'Unidad_Medida', type: 'string'},
                            {name: 'varModelo', type: 'string'},
                            {name: 'varPerfil', type: 'string'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#griddespacho").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                sortable: true,
                editable: true,
                selectionmode: 'checkbox',
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [

                    /*{
                     text: 'Uni.Medida', datafield: 'Unidad', width: 80, editable: true, columntype: 'dropdownlist',
                     createeditor: function (row, column, editor) {
                     editor.jqxDropDownList({
                     dropDownHeight: 150,
                     source: locallistaAdapter,
                     displayMember: 'varAbrevMedi',
                     valueMember: 'intIdUniMedi',
                     filterable: false,
                     renderer: function (index, label,item) {
                     return label;
                     }
                     });
                     }},*/
                    {text: 'ID', datafield: 'intIdDesp', width: 80, editable: false, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var count = $("#griddespacho").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Codigo', datafield: 'varCodiElemento', width: 120, editable: false},
                    {text: 'Descripcion', datafield: 'varDescripcion', width: 250, editable: false},
                    {text: 'Descripcion', datafield: 'varPerfil', width: 250, editable: false},
                    {text: 'Und. Medida', datafield: 'Unidad_Medida', width: 120, editable: true},
                    {text: 'Serie', datafield: 'intSerie', width: 50, editable: false},
                    {text: 'Programa', datafield: 'varDescripTarea', width: 120, editable: false},
                    {text: 'Zona', datafield: 'varDescrip', width: 120, editable: false},
                    {text: 'Modelo', datafield: 'varModelo', width: 120, editable: false},
                    {text: 'Peso Neto', datafield: 'deciTotaPesoNeto', width: 120, editable: false},
                    {text: 'Peso Bruto', datafield: 'deciTotaPesoBruto', width: 120, editable: false},
                    {text: 'Area', datafield: 'deciTotaArea', width: 120, editable: false}
                ]
            });
            $("#griddespacho").jqxGrid('localizestrings', localizationobj);
        }
    });
}
$("#cerrar_modal_2").on('click', function () {
    $("#modal-guia_remision").modal('hide');
    $("#fech_inic_reproceso").val('mm/dd/yyyy');
    $("#fech_fin_reproceso").val('mm/dd/yyyy');
    $("#motivo").jqxDropDownList('clearSelection');
    $("#zona").jqxDropDownList('clearSelection');
    $("#zona").jqxDropDownList('clear');
    $("#bulto").jqxDropDownList('clearSelection');
    $("#bulto").jqxDropDownList('clear');
    $("#tipo_gupo_estructura").jqxDropDownList('clearSelection');
    $("#tipo_gupo_estructura").jqxDropDownList('clear');
    $("#modelo_codigo").jqxDropDownList('clearSelection');
    $("#modelo_codigo").jqxDropDownList('clear');
    $("#codigo_referencia").val('');
    $("#punto_llegada").val('');
    $("#punto_llegada").val('');
    $("#placa").val('');
    $("#combinacion").val('');
    tipo_guia = "";
    project_ot_codigo = "";
    tipo_eleme_codigo = "";
    estado_guiaremisio = "";
    id_despa_guiaremi = "";
});
$("#btn_registrar").on('click', function () {
    console.log(cantidad_total);
    
    var fecha_inicio = $("#fech_inic_reproceso").val();
    var fecha_traslado = $("#fech_fin_reproceso").val();
    var puto_llegad = $("#punto_llegada").val();
    var referencia = $("#codigo_referencia").val();
    var punto_partida = $("#punto_partida").val();
    var chofer = $("#chofer").val();
    var placa = $("#placa").val();
    var ruc_chofer = $("#ruc_chofer").val();
    var licencia = $("#licencia").val();
    var ot = $("#ot_adquirida").val();
    var fusion_tipoG_modelo = $("#combinacion").val();
    if (buscar_des === 1) {
        var index = $("#griddespacho").jqxGrid('getselectedrowindexes');
          
             textData = $('#griddespacho').jqxGrid('getrowdata', index);
            
            
           if (index.length > 0) {
            if (id_despacho) {
                if (intIdClie) {
                    if (coddepartamento) {
                        if (codeprovincia) {
                            if (coddistrito) {
                                if (codedepartamento_salida) {
                                    if (provincia_salida) {
                                        if (distrito_partida) {
                                            if (chofer) {
                                                if (ruc_chofer) {
                                                    if (licencia) {
                                                        if (codtransportista) {
                                                            if (ot) {
                                                                if (codigoproducto) {
                                                                    if (fecha_inicio) {
                                                                        if (fecha_traslado) {
                                                                            if (fecha_traslado > fecha_inicio || fecha_traslado === fecha_inicio) {
                                                                                if (cod_tipo_guia) {
                                                                                    if (punto_partida) {
                                                                                        if (puto_llegad) {
                                                                                            if (placa) {
                                                                                                if (cod_motivo) {
                                                                                                    if (codigoestado) {
                                                                                                        contador(id_despacho, intIdClie, codedepartamento_salida, provincia_salida, distrito_partida,
                                                                                                                chofer, ruc_chofer, licencia, codtransportista, ot, codigoproducto, fecha_inicio,
                                                                                                                fecha_traslado, cod_tipo_guia, punto_partida, puto_llegad, placa, referencia, cod_motivo, codigoestado,
                                                                                                                coddepartamento, codeprovincia, coddistrito, fusion_tipoG_modelo);


                                                                                                    } else {
                                                                                                        mensaje(false, "No ha Seleccionado un Estado", "no");
                                                                                                    }
                                                                                                } else {
                                                                                                    mensaje(false, "No ha Seleccionado un Motivo", "no");
                                                                                                }
                                                                                            } else {
                                                                                                mensaje(false, "No ha colocado una placa", "no");
                                                                                            }
                                                                                        } else {
                                                                                            mensaje(false, "No ha colocado una dirección en Punto de Llegada", "no");
                                                                                        }
                                                                                    } else {
                                                                                        mensaje(false, "No ha colocado una dirección en Punto de Salida", "no");
                                                                                    }
                                                                                } else {
                                                                                    mensaje(false, "No se ha seleccionado un tipo de guia", "no");
                                                                                }
                                                                            } else {
                                                                                mensaje(false, "La fecha de traslado no puede ser menor a la fecha de emisión", "no");
                                                                            }
                                                                        } else {
                                                                            mensaje(false, "No se ha seleccionado un Fecha de Traslado", "no");
                                                                        }
                                                                    } else {
                                                                        mensaje(false, "No se ha seleccionado un Fecha de Emisión", "no");
                                                                    }
                                                                } else {
                                                                    mensaje(false, "No se ha seleccionado un Tipo Elemento", "no");
                                                                }
                                                            } else {
                                                                mensaje(false, "No se ha seleccionado una OT", "no");
                                                            }
                                                        } else {
                                                            mensaje(false, "No se ha seleccionado un Transportista", "no");
                                                        }
                                                    } else {
                                                        mensaje(false, "No ha ingresado la licencia del Chofer.", "no");
                                                    }

                                                } else {
                                                    mensaje(false, "No ha ingresado el Documento de Identidad del Chofer.", "no");
                                                }

                                            } else {
                                                mensaje(false, "No se ha seleccionado un Chofer", "no");
                                            }
                                        } else {
                                            mensaje(false, "No se ha seleccionado un Distrito de Salida", "no");
                                        }
                                    } else {
                                        mensaje(false, "No se ha seleccionado una Provincia de Salida", "no");
                                    }
                                } else {
                                    mensaje(false, "No se ha seleccionado un Departamento de Salida", "no");
                                }
                            } else {
                                mensaje(false, "No se ha seleccionado un Distrito", "no");
                            }
                        } else {
                            mensaje(false, "No se ha seleccionado una Provincia", "no");
                        }
                    } else {
                        mensaje(false, "No se ha seleccionado un Departamento", "no");
                    }
                } else {
                    mensaje(false, "No se ha Id Cliente", "no");
                }
            } else {
                mensaje(false, "No se ha Id Despacho", "no");
            }
        } else {
            mensaje(false, "No se ha seleccionado ningun elemento", "no");
        }
    } else {
        mensaje(false, "No se hay data para registrar", "no");
    }
    
});
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}
function contador(id_despacho, intIdClie, coddepa_sql, coddepartamento_sql, coddistrito_sql,
        chofer, ruc_chofer, licencia, codtransportista, codigoot, codigoproducto, fecha_inicio,
        fecha_traslado, cod_tipo_guia, punto_partida, puto_llegad, placa, referencia, cod_motivo, codigoestado,
        coddepartamento_partida, provincia_salida, distrito_partida, fusion_tipoG_modelo2) {
    var index = $("#griddespacho").jqxGrid('getselectedrowindexes');
    var informacion = [];
    var contador_variables = 0;
    var items_codigo = "";
    var info = "";
    if (tipo_guia === "1") {
        for (var i = 0; index.length > i; i++) {
            contador_variables++;
            textData = $('#griddespacho').jqxGrid('getrowdata', index[i]);
            items_codigo += "'" + textData['varCodiElemento'] + "',";
            var row = {cantidad: textData['cantidad'],
                intIdDesp: textData['intIdDesp'],
                intIdProyTarea: textData['intIdProyTarea'],
                intIdProyZona: textData['intIdProyZona'],
                intIdTipoGrupo: textData['intIdTipoGrupo'],
                varBulto: textData['varBulto'],
                varModelo: textData['varModelo'],
                Unidad_Medida: textData['Unidad_Medida'],
                varCodiElemento: textData['varCodiElemento'],
                intSerie: ''};
            informacion.push(row);
        }
        var myJsonString = JSON.stringify(informacion);
    } else if (tipo_guia === "2") {
        for (var i = 0; index.length > i; i++) {
            contador_variables++;
            textData = $('#griddespacho').jqxGrid('getrowdata', index[i]);
            var row = {cantidad: 1,
                intIdDesp: textData['intIdDesp'],
                intIdProyTarea: textData['intIdProyTarea'],
                intIdProyZona: textData['intIdProyZona'],
                intIdTipoGrupo: textData['intIdTipoGrupo'],
                varBulto: textData['varBulto'],
                varModelo: textData['varModelo'],
                Unidad_Medida: textData['Unidad_Medida'],
                varCodiElemento: textData['varCodiElemento'],
                intSerie: textData['intSerie']};
            informacion.push(row);
        }
        var myJsonString = JSON.stringify(informacion);
    }
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/guias_generadas',
        dataType: 'json',
        data: {
            v_informacion: myJsonString
        }
        ,
        beforesend: function () {
        }
        ,
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        }
        ,
        success: function (responses) {
            var guias = "";
            for (var i = 0; responses.data.docu.length > i; i++) {
                if (responses.data.docu.length === 1) {
                    guias += "'" + responses.data.docu[i];
                } else {
                    guias += "'" + responses.data.docu[i] + "',";
                }
            }
            Swal.fire({
                title: '¿Esta seguro de registrar la Guía?',
                type: 'success',
                text: 'Se generará ' + responses.data.cantidad + ' Guia(s) : ' + guias,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.value) {
                    registrar_guia(id_despacho, intIdClie, coddepa_sql, coddepartamento_sql, coddistrito_sql,
                            chofer, ruc_chofer, licencia, codtransportista, codigoot, codigoproducto, fecha_inicio,
                            fecha_traslado, cod_tipo_guia, punto_partida, puto_llegad, placa, referencia, cod_motivo, codigoestado,
                            coddepartamento_partida, provincia_salida, distrito_partida, fusion_tipoG_modelo2);
                } else {
                    //$("#cerrar_modal_2").trigger('click');
                }
            })
        }
    });
}
function registrar_guia(id_despacho, intIdClie, coddepa_sql, coddepartamento_sql, coddistrito_sql, chofer, documento, licencia, codtransportista,
        codigoot, codigoproducto, fecha_inicio, fecha_traslado, cod_tipo_guia, punto_salida, puto_llegad, placa, referencia, cod_motivo, codigoestado,
        coddepartamento_salida, codprovincia_salida, coddistrito_salida, fusion_tipoG_modelo3) {

    let user = obtener_user();
    var informacion = [];
    var textData = "";
    var items_codigo = "";
    var contador_variables = 0;
    var index = $("#griddespacho").jqxGrid('getselectedrowindexes');
    $("#modal-cargar-guia").modal('show');
    var otros = $("#otros_input").val();
    if (tipo_guia === "1") {
        for (var i = 0; index.length > i; i++) {
            contador_variables++;
            textData = $('#griddespacho').jqxGrid('getrowdata', index[i]);
            items_codigo += "'" + textData['varCodiElemento'] + "',";
            var row = {cantidad: textData['cantidad'],
                intIdDesp: textData['intIdDesp'],
                intIdProyTarea: textData['intIdProyTarea'],
                intIdProyZona: textData['intIdProyZona'],
                intIdTipoGrupo: textData['intIdTipoGrupo'],
                varBulto: textData['varBulto'],
                varModelo: textData['varModelo'],
                varPerfil: textData['varPerfil'],
                Unidad_Medida: textData['Unidad_Medida'],
                varCodiElemento: textData['varCodiElemento'],
                intSerie: ''};
            informacion.push(row);
        }
        var myJsonString = JSON.stringify(informacion);
    } else if (tipo_guia === "2") {
        for (var i = 0; index.length > i; i++) {
            contador_variables++;
            textData = $('#griddespacho').jqxGrid('getrowdata', index[i]);
            var row = {cantidad: 1,
                intIdDesp: textData['intIdDesp'],
                intIdProyTarea: textData['intIdProyTarea'],
                intIdProyZona: textData['intIdProyZona'],
                intIdTipoGrupo: textData['intIdTipoGrupo'],
                varBulto: textData['varBulto'],
                varPerfil: textData['varPerfil'],
                varModelo: textData['varModelo'],
                Unidad_Medida: textData['Unidad_Medida'],
                varCodiElemento: textData['varCodiElemento'],
                intSerie: textData['intSerie']};
            informacion.push(row);
        }
        var myJsonString = JSON.stringify(informacion);
    }

    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/crear_guia',
        dataType: 'json',
        data: {
            intIdDesp: id_despacho,
            intIdCliente: intIdClie,
            varIdDistrito: coddistrito_sql,
            varIdProvincia: coddepartamento_sql,
            varIdDepa: coddepa_sql,
            varIdDistritoSali: coddistrito_salida,
            varIdProvinciaSali: codprovincia_salida,
            varIdDepaSali: coddepartamento_salida,
            varNombChof: chofer,
            varNumeChof: documento,
            varNumeLicen: licencia,
            intIdTrans: codtransportista,
            intIdProy: codigoot,
            intIdTipoProducto: codigoproducto,
            dateFechEmis: fecha_inicio,
            dateFechTras: fecha_traslado,
            varTipoGuia: cod_tipo_guia,
            intIdMoti: cod_motivo,
            varPuntSali: punto_salida,
            varPuntLleg: puto_llegad,
            varPlaca: placa,
            acti_usua: user,
            v_informacion: myJsonString,
            varRefe: referencia,
            intIdEsta: codigoestado,
            intIdProyZona: codzona,
            varBulto: bulto,
            intIdTipoGrupo: tipo_grupo,
            codigos_label: items_codigo,
            tipo_reporte: tipo_guia,
            varMotiCome: otros,
            intIdPlanta: codplanta,
            varTituGuia: fusion_tipoG_modelo3 //COLOCO ANDY

        }
        ,
        beforesend: function () {
            $("#modal-cargar-guia").modal('hide');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                window.setTimeout(function () {
                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);
            }
        }
        ,
        success: function (responses) {
            window.setTimeout(function () {
                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);
            if (responses.data.mensaje_alternativo === "sin error") {

                mensaje(true, "Se regristro correctamente guía", "modal-guia_remision");
                Swal.fire({
                    title: '¿Desea Imprimir las Guías generadas?',
                    type: 'success',
                    //text: "You won't be able to revert this!",
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    var array_id = [];
                    for (var i = 0; responses.data.id.length > i; i++) {
                        var row = {id: responses.data.id[i]};
                        array_id.push(row);
                    }
                    var myJsonString = JSON.stringify(array_id);
                    if (result.value) {
                        guiar_con_imprimir(myJsonString);
                    } else {
                        guiar_sin_imprimir(myJsonString);
                        $("#modal-guia_remision").modal('hide');
                        $("#btn_busc").trigger('click');
                    }
                })
            } else {
                mensaje(false, "No se ha registrado la guía", "no");
            }
        }
    }
    );
}
function guiar_sin_imprimir(data) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/guia_sin_imprimir',
        dataType: 'json',
        data: {
            data: data
        },
        success: function (responses) {
            mensaje(true, "Se ha registrado la guía", "no");
        }
    });
}
function guiar_con_imprimir(data) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/guia_imprimir',
        dataType: 'json',
        data: {
            data: data,
            user: user
        },
        success: function (responses) {
            $(location).attr('href', "guias/pdf/" + data + '/' + tipo_guia);
            $("#modal-guia_remision").modal('hide');
            $("#btn_busc").trigger('click');
        }
    });
}
function numeros_documentos() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/numero_guia',
        dataType: 'json',
        success: function (responses) {
            $("#serie").val(responses.data.serie[0]);
            $("#documento").val(responses.data.documento[0]);
        }
    });
}
$("#numero_documento").on('click', function () {
    document.getElementById('documento').disabled = false;
    $("#guardar_documento").removeClass('hidde_grid');
    $("#numero_documento").addClass('hidde_grid');
});
$("#guardar_documento").on('click', function () {
    var docu = $("#documento").val();
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/actualizar_docu',
        dataType: 'json',
        data: {
            docu: docu,
            user: user
        },
        success: function (responses) {
            if (responses.data === "") {
                mensaje(true, "Se actualizo el Documento satisfactoriamente", "no");
                document.getElementById('documento').disabled = true;
                $("#guardar_documento").addClass('hidde_grid');
                $("#numero_documento").removeClass('hidde_grid');
                numeros_documentos();
            } else {
                mensaje(false, responses.data, "no");
                document.getElementById('documento').disabled = true;
                $("#guardar_documento").addClass('hidde_grid');
                $("#numero_documento").removeClass('hidde_grid');
                numeros_documentos();
            }
        }
    });
});
function listar_unidad_medida() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_unid_medida',
        dataType: 'json',
        success: function (responses) {
            for (var i = 0; responses.data.length > i; i++) {
                unidad_medida.push({intIdUniMedi: responses.data[i].intIdUniMedi, varAbrevMedi: responses.data[i].varAbrevMedi});
            }
        }
    });
}
$("#close_documento").on('click', function () {
    document.getElementById('documento').disabled = true;
    $("#guardar_documento").addClass('hidde_grid');
    $("#numero_documento").removeClass('hidde_grid');
    numeros_documentos();
});

//COLOCO ANDY 

function despacho_emitido(despaemit) {
    var dataRecord = $("#grid").jqxGrid('getrowdata', despaemit);
    $("#ot_despa_emit").val(dataRecord.intIdProy);
    $("#ot_nomb_despa_emit").val(dataRecord.varCodiProy);
    $("#tipo_eleme_despa_emit").val(codigoproducto);
    $("#id_despa_emit").val(dataRecord.intIdDesp);
    $("#usuario_despa_emit").val(obtener_user);
    $("#modal-despacho-emitida").modal('show');
}

$("#form_register_despacho_foto_emitada").on('submit', function (e) {

    $("#modal-cargar-guia").modal('show');
    e.preventDefault();

    $.ajax({
        url: 'GUARDAR_DESPA_EMIT',
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json',
        /* beforeSend: function () {
         $("#modal-cargar-reproceso").modal('show')
         },
         */
        success: function (html) {
            console.log(html);
            window.setTimeout(function () {

                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);

            if (html.mensaje == "") {

                mensaje(true, "GUARDADO CON EXITO", "modal-guia-recibida");
                $("#modal-despacho-emitida").modal('hide');
                limpiar_campos_emit();
                buscar_despachos(codigoot, codigoproducto, codigoestado);
            } else {
                mensaje(false, html.mensaje, "no");
            }

        }
    });

});

// SUBIR ARCHIVOS  y cambia el nombre 
$("#subir_archivo_icon_despa_emit").click(function () {
    $("#subir_archivo_despa_emit").trigger('click');
});

document.getElementById("subir_archivo_despa_emit").onchange = function () {
    document.getElementById("nombre_archivo_despa_emit").value = this.value;
};






function limpiar_campos_emit() {
    $("#ot_despa_emit").val('');
    document.getElementsByName('ot_despa_emit').value = '';
    $("#tipo_eleme_despa_emit").val('');
    document.getElementsByName('tipo_eleme_despa_emit').value = '';
    $("#id_despa_emit").val('');
    document.getElementsByName('id_despa_emit').value = '';

    //ARCHIVO
    $("#nombre_archivo_despa_emit").val('');
    document.getElementsByName('nombre_archivo_despa_emit').value = '';

    $("#subir_archivo_icon_despa_emit").val('');
    $("#subir_archivo_despa_emit").val('');
    document.getElementsByName('subir_archivo_despa_emit').value = '';

    $("#usuario_despa_emit").val('');
    document.getElementsByName('usuario_despa_emit').value = '';

}

$("#btn_cerrar_despa_emitida").click(function () {
    limpiar_campos_emit();
});

/*************************RECEPCION****************************/



function despacho_recepcionada(desparecep) {
    var dataRecord = $("#grid").jqxGrid('getrowdata', desparecep);


    $("#ot_guia_recep").val(dataRecord.intIdProy);
    $("#ot_nomb_despa_recep").val(dataRecord.varCodiProy);
    $("#tipo_elem_despa_recep").val(codigoproducto);
    $("#id_despa_recep").val(dataRecord.intIdDesp);
    $("#usuario_despa_recep").val(obtener_user);

    $("#modal-despacho-recepciona").modal('show');
}


$("#form_register_despacho_recepcionado").on('submit', function (e) {
    // console.log(e);
    $("#modal-cargar-guia").modal('show');
    e.preventDefault();

    $.ajax({
        url: 'GUARDAR_DESPA_RECEP',
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json',
        /* beforeSend: function () {
         $("#modal-cargar-reproceso").modal('show')
         },
         */
        success: function (html) {
            console.log(html);
            window.setTimeout(function () {

                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);

            if (html.mensaje == "") {

                mensaje(true, "GUARDADO CON EXITO", "modal-guia-recibida");
                $("#modal-despacho-recepciona").modal('hide');
                buscar_despachos(codigoot, codigoproducto, codigoestado);
                limpiar_campos_recepcion();
            } else {
                mensaje(false, html.mensaje, "no");
            }


        }
    });

});



function limpiar_campos_recepcion() {
    $("#ot_guia_recep").val('');
    document.getElementsByName('ot_guia_recep').value = '';
    $("#tipo_elem_despa_recep").val('');
    document.getElementsByName('tipo_elem_despa_recep').value = '';
    $("#id_despa_recep").val('');
    document.getElementsByName('id_despa_recep').value = '';

    //ARCHIVO
    $("#nombre_archivo_despa_recep").val('');
    document.getElementsByName('nombre_archivo_despa_recep').value = '';

    $("#subir_archivo_icon_despa_recep").val('');
    $("#subir_archivo_despa_recep").val('');
    document.getElementsByName('subir_archivo_despa_recep').value = '';

    $("#usuario_despa_recep").val('');
    document.getElementsByName('usuario_despa_recep').value = '';

}

// SUBIR ARCHIVOS  y cambia el nombre 
$("#subir_archivo_icon_despa_recep").click(function () {
    $("#subir_archivo_despa_recep").trigger('click');
});

document.getElementById("subir_archivo_despa_recep").onchange = function () {
    document.getElementById("nombre_archivo_despa_recep").value = this.value;
};



$("#btn_cerrar_despa_recepcionado").click(function () {
    limpiar_campos_recepcion();
});


function bajar_archivo(idarchivo, url) {
    var dataRecord = $("#grid").jqxGrid('getrowdata', idarchivo);
    window.open(url, 'Download');
}
function modelo_codigo(codproyecto, codigoproducto, codigoestado, intIdDesp, intIdTipoGrupo) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_modelo_codigo',
        dataType: 'json',
        data: {intIdProy: codproyecto, intIdTipoProducto: codigoproducto, intIdEsta: codigoestado, intIdDesp: intIdDesp, intIdTipoGrupo: intIdTipoGrupo},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                var source =
                        {
                            localdata: responses.data.reverse(),
                            datatype: "array",
                            datafields: [
                                {name: 'varModelo'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#modelo_codigo").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varModelo", valueMember: "varModelo", width: 200, height: 30, });
                //Focus the jqxDropDownList
                $("#modelo_codigo").jqxDropDownList('selectIndex', 0);
                $("#modelo_codigo").jqxDropDownList('focus');
            } else {
                $("#modelo_codigo").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varModelo", valueMember: "varModelo", width: 200, height: 30, });
            }
        }
    });
}
$("#modelo_codigo").on('change', function (event) {
    codigo_modelo = "";
    codigo_modelo_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_modelo = item.value;
            codigo_modelo_label = item.value;
            if (tipo_guia !== "") {
                $("#griddespacho").jqxGrid('clearSelection');
                $("#btn_despachos").trigger('click');
            } else {

            }
            //COLOCO ANDYS
            if (tipo_grupo_label === "TODOS") {
                $("#combinacion").val(codigo_modelo_label);
            } else {

                $("#combinacion").val(tipo_grupo_label + " " + codigo_modelo_label);
            }
        }
    }
});
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
            listar_data_list_proyectos(item.value);
        }
    }
});