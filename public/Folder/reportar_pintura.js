var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var day_next = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
var codigoot_reporta_pint_value = "";
var codigoot_reporta_pint_label = "";
var tipo_elemento_reporta_pint_value = "";
var tipo_elemento_report_pint_label = "";
var zona_reporta_pint_value = "";
var programa_reporta_pint_value = "";
var lote_sis_pintura_value = "";
var combo_lote_pintura_label = "";
var var_valo = "";
var per_valo = "";
var cod_per_valo = "";
var bool_despacho = "";
var cod_tipo_etapa = "";
var idasig_etapa = "";
var array_avance = [];
var myJsonString = "";
var myJsonString_edit = "";
var array_avance_edit = [];
var edit_pintor = "";
var edit_cabina = "";
var edit_cantidad_total = "";
var id_etapa_cont = "";
var check_items_pintor_value = "";
var edit_contra_pint = "";
var contr_pint_value_edit = "";
var cadena_pintor = [];

$("#txt_ot_repo_lote_pint").on('change', function (event) {
    $('#txt_ot_repo_lote_pint').jqxDropDownList('clearFilter');
    codigoot_reporta_pint_value = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot_reporta_pint_value = item.value;
            codigoot_reporta_pint_label = item.label;


            $("#grid_repor_lote_pint").jqxGrid('clear');
        }
        if (codigoot_reporta_pint_value) {
            periodo_valorizacion(16);
            listar_zona(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value);
            sistema_pintura(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value);
        }
    }


});
$("#tipo_elem_repo_lote_pint").on('change', function (event) {
    $('#tipo_elem_repo_lote_pint').jqxDropDownList('clearFilter');
    tipo_elemento_reporta_pint_value = "";
    tipo_elemento_report_pint_label = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            tipo_elemento_reporta_pint_value = item.value;
            tipo_elemento_report_pint_label = item.label;
            $("#grid_repor_lote_pint").jqxGrid('clear');

        }
        if (tipo_elemento_reporta_pint_value) {
            listar_zona(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value);
            sistema_pintura(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value);
        }
    }
});
$("#zona_repo_lote_pint").on('change', function (event) {
    zona_reporta_pint_value = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            zona_reporta_pint_value = item.value;

            $("#grid_repor_lote_pint").jqxGrid('clear');
        }
        if (zona_reporta_pint_value) {
            listar_tarea(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value, zona_reporta_pint_value);
        }
    }
});
$("#programa_repo_lote_pint").on('change', function (event) {

    programa_reporta_pint_value = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            programa_reporta_pint_value = item.value;

            $("#grid_repor_lote_pint").jqxGrid('clear');
        }

    }
});
//SISTEMAS DE PINTURA 
$("#repor_lote_sis_pintura").on('change', function (event) {
    lote_sis_pintura_value = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            lote_sis_pintura_value = item.value;


            $("#grid_repor_lote_pint").jqxGrid('clear');
        }

    }
});


function listar__proyectos_repo_lote_pint_ot() {
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
            if (thrownError == "Internal Server Error") {
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
            $("#txt_ot_repo_lote_pint").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_repo_lote_pint").jqxDropDownList('selectIndex', 0);
            $("#txt_ot_repo_lote_pint").jqxDropDownList('focus');

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


            $("#tipo_elem_repo_lote_pint").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30});
            $("#tipo_elem_repo_lote_pint").jqxDropDownList('focus');
            $("#tipo_elem_repo_lote_pint").jqxDropDownList('selectIndex', 0);
        }
    });
}
function listar_zona(codigo_ot, codigo_producto) {
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
                $("#zona_repo_lote_pint").jqxDropDownList('clear');
            } else {
                var new_tarea = [];
                var arra_new2 = [];
                for (let j = 0; j < responses.data.length; j++) {
                    arra_new2.push(responses.data[j]);
                }
                new_tarea = arra_new2.reverse();
                var source =
                        {
                            localdata: new_tarea,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdProyZona'},
                                {name: 'varDescrip'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#zona_repo_lote_pint").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30});
                $("#zona_repo_lote_pint").jqxDropDownList('focus');
                $("#zona_repo_lote_pint").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}
function listar_tarea(codigo_ot, codigo_producto, zona) {
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
                listar_tarea(codigo_producto, codigo_ot, zona);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "Error.") {
                $("#programa_repo_lote_pint").jqxDropDownList('clear');
            } else {
                //responses.data.push({varDescripTarea:'TODOS',intIdProyTarea:-1});
                //responses.data.pop();
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
                $("#programa_repo_lote_pint").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30});
                $("#programa_repo_lote_pint").jqxDropDownList('focus');
                $("#programa_repo_lote_pint").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}
function sistema_pintura(codigo_ot, codigo_producto) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_sistema_pintura',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                sistema_pintura(codigo_producto, codigo_ot);
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {


                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varValo1'},
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#repor_lote_sis_pintura").jqxDropDownList({source: dataAdapter, displayMember: "varValo1", valueMember: "varValo1", placeHolder: "Seleccione", width: 260, height: 30});
                $("#repor_lote_sis_pintura").jqxDropDownList('focus');
                $("#repor_lote_sis_pintura").jqxDropDownList('selectIndex', 0);

            } else {
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varValo1'},
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#repor_lote_sis_pintura").jqxDropDownList({source: dataAdapter, displayMember: "varValo1", valueMember: "varValo1", placeHolder: "Seleccione", width: 260, height: 30});
                $("#repor_lote_sis_pintura").jqxDropDownList('focus');
                $("#repor_lote_sis_pintura").jqxDropDownList('selectIndex', 0);
            }


        }

    });
}
// COMBO CONTRATISTA 
function comboc_contratista(id_tipo_etapa) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionCostos/public/index.php/comb_cont',
        dataType: 'json',
        data: {
            intIdEtapa: id_tipo_etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
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
            $("#contratista_avance_lote_pint").jqxDropDownList({
                placeHolder: "Seleccione",
                source: dataAdapter,
                width: '218px',
                height: '23px',

                displayMember: "varRazCont",
                valueMember: "intIdCont"
            });

            $("#contratista_avance_lote_pint").jqxDropDownList('focus');

        }
    });
}
// change  contratista
$("#contratista_avance_lote_pint").on('change', function (event) {

    contr_pint_value = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            contr_pint_value = item.value;

           // console.log(contr_pint_value);
        }
        if (contr_pint_value == "21") {
            $("#mostrar_pintor").removeClass('hidde_grid');
            $("#pintor_gene_lote_pint").css("border-color", "#aaa");
            combo_pintor();
        } else {
            $("#mostrar_pintor").addClass('hidde_grid');
            $("#pintor_gene_lote_pint").jqxDropDownList('clear');
            $("#pintor_gene_lote_pint").jqxDropDownList('checkIndex', 0);
            $("#pintor_gene_lote_pint").val('');

        }

    }
});

// BUSCAR LA PINTURA 
$("#btn_busc_repo_lote_pint").click(function () {
    let proyecto = $("#txt_ot_repo_lote_pint").val();
    let elemento = $("#tipo_elem_repo_lote_pint").val();
    let zona_pint = $("#zona_repo_lote_pint").val();
    let programa_pint = $("#programa_repo_lote_pint").val();
    let sis_pint = $("#repor_lote_sis_pintura").val();

    if (proyecto === "") {
        mensaje(false, "SELECCIONE LA OT", "no");
    } else {
        if (elemento === "") {
            mensaje(false, "SELECCIONE EL TIPO ELEMENTO", "no");
        } else {
            if (zona_pint === "") {
                mensaje(false, "SELECCIONE LA ZONA", "no");
            } else {
                if (programa_pint === "") {
                    mensaje(false, "SELECCIONE LA PROGRAMA", "no");
                } else {
                    if (sis_pint === "") {
                        mensaje(false, "SELECCIONE SISTEMA DE PINTURA", "no");
                    } else {
                        mostrar_grilla_pintura(proyecto, elemento, zona_pint, programa_pint, sis_pint);
                    }
                }
            }
        }
    }
});
function mostrar_grilla_pintura(proyecto2, elemento2, zona_pint2, programa_pint2, sis_pint2) {


    $("#modal-cargar-lote_pint").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_metrado_pintura',
        dataType: 'json',
        data: {
            intIdProy: proyecto2,
            intIdTipoProducto: elemento2,
            intIdProyZona: zona_pint2,
            intIdProyTarea: programa_pint2,
            varValo1: sis_pint2

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                $("#mostrar_boton_generar_lote").removeClass('hidde_grid');
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'varCodiElemento', type: 'String'},
                        {name: 'nombre', type: 'String'},
                        {name: 'Canti', type: 'number'},
                        {name: 'intRevision', type: 'number'},
                        {name: 'intCantRepro', type: 'number'},
                        {name: 'Zona', type: 'String'},
                        {name: 'Programa', type: 'String'},
                        {name: 'Grupo', type: 'String'},
                        {name: 'Contratista', type: 'String'},
                        {name: 'deciPrec', type: 'String'},
                        {name: 'deciPesoNeto', type: 'String'},
                        {name: 'deciPesoBruto', type: 'String'},
                        {name: 'deciArea', type: 'String'},
                        {name: 'deciLong', type: 'String'},
                        {name: 'deciAncho', type: 'String'},
                        {name: 'etapa_anterior', type: 'String'},
                        {name: 'etapa_siguiente', type: 'String'},
                        {name: 'varPerfil', type: 'String'},
                        {name: 'varModelo', type: 'String'},
                        {name: 'varCodVal', type: 'String'},
                        {name: 'intIdProyZona', type: 'number'},
                        {name: 'intIdProyPaquete', type: 'number'},
                        {name: 'intIdEtapaAnte', type: 'number'},

                        {name: 'intIdEtapaSiguiente', type: 'number'},
                        {name: 'intIdContr', type: 'number'},
                        {name: 'intidetapa', type: 'number'},
                        {name: 'intIdProyTarea', type: 'number'},
                        {name: 'intIdRuta', type: 'number'},
                        {name: 'ContratistaAnt', type: 'String'},
                        {name: 'FechaAvanAnt', type: 'String'},
                        {name: 'DocEnvioTS', type: 'String'},
                        {name: 'Pintura', type: 'string'},
                        {name: 'bulto', type: 'String'},
                        {name: 'Obs1', type: 'String'},
                        {name: 'obs2', type: 'String'},
                        {name: 'obs3', type: 'String'},
                        {name: 'obs4', type: 'number'},
                        {name: 'estado', type: 'String'},
                        {name: 'IdContraAnt', type: 'number'},
                        {name: 'intIdEsta', type: 'number'},
                        {name: 'TotalPesoNeto', type: 'String'},
                        {name: 'TotalPesoBruto', type: 'String'},
                        {name: 'TotalArea', type: 'String'},
                        {name: 'deciAreaPintura', type: 'String'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };

                var dataAdapter = new $.jqx.dataAdapter(source);

                var editrow = -1;

                $("#grid_repor_lote_pint").jqxGrid('clear');
                $("#grid_repor_lote_pint").jqxGrid('clearSelection');

                window.setTimeout(function () {

                    $("#modal-cargar-lote_pint").modal('hide'); // COLOCO ANDY 
                }, 1000);

                $("#grid_repor_lote_pint").jqxGrid({
                    width: '100%',
                    height: '100%',
                    source: dataAdapter,
                    columnsresize: true,
                    altrows: true,
                    showfilterrow: true,
                    filterable: true,
                    selectionmode: 'checkbox',
                    sortable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    enabletooltips: true,
                    columns: [

                        {text: 'Codigo', datafield: 'varCodiElemento', width: '8%', aggregates:
                                    [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record)
                                                    {
                                                        var count = $("#grid_repor_lote_pint").jqxGrid('getrows');
                                                        return count.length;
                                                    }
                                        }]},
                        {text: 'Nombre', datafield: 'nombre', width: '15%'},
                        {text: 'Cant.', datafield: 'Canti', width: '5%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['Canti']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total);
                                                return total;
                                            }
                                }]},
                        {text: 'Rev.', datafield: 'intRevision', width: '5%'},
                        {text: 'Repro', datafield: 'intCantRepro', width: '5%'},
                        {text: 'Zona', datafield: 'Zona', width: '10%'},
                        {text: 'Programa', datafield: 'Programa', width: '10%'},
                        {text: 'Grupo', datafield: 'Grupo', width: '10%'},
                        {text: 'Contratista', datafield: 'Contratista', width: '10%'},
                        {text: 'Deci.Precio', datafield: 'deciPrec', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['deciPrec']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Peso Neto', datafield: 'deciPesoNeto', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Area', datafield: 'deciArea', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Longitud', datafield: 'deciLong', width: '10%'},
                        {text: 'Ancho', datafield: 'deciAncho', width: '10%'},
                        {text: 'Etapa Anterior', datafield: 'etapa_anterior', width: '20%'},

                        {text: 'Etapa Siguiente', datafield: 'etapa_siguiente', width: '10%'},
                        {text: 'Perfil', datafield: 'varPerfil', width: '10%'},
                        {text: 'varModelo', datafield: 'varModelo', width: '10%'},
                        {text: 'Codigo.Val', datafield: 'varCodVal', width: '10%'},
                        {text: 'ProyZona_id', datafield: 'intIdProyZona', width: '10%', hidden: true},
                        {text: 'ProyPaquete', datafield: 'intIdProyPaquete', width: '10%', hidden: true},
                        {text: 'IdEtapaAnte', datafield: 'intIdEtapaAnte', width: '10%', hidden: true},

                        {text: 'EtapaSiguiente', datafield: 'intIdEtapaSiguiente', width: '10%', hidden: true},
                        {text: 'id_contra', datafield: 'intIdContr', width: '10%', hidden: true},
                        {text: 'idetapa', datafield: 'intidetapa', width: '10%', hidden: true},
                        {text: 'IdProyTarea', datafield: 'intIdProyTarea', width: '10%', hidden: true},
                        {text: 'IdRuta', datafield: 'intIdRuta', width: '10%', hidden: true},
                        {text: 'Contratista Anterior', datafield: 'ContratistaAnt', width: '15%'},
                        {text: 'Fecha Avance Anterior', datafield: 'FechaAvanAnt', width: '10%'},
                        {text: 'Documento', datafield: 'DocEnvioTS', width: '10%'},
                        {text: 'Pintura', datafield: 'Pintura', width: '25%'},
                        {text: 'Observacion 1', datafield: 'Obs1', width: '10%'},
                        {text: 'Observacion 2', datafield: 'Obs2', width: '10%'},
                        {text: 'Observacion 3', datafield: 'Obs3', width: '10%'},
                        {text: 'Observacion 4', datafield: 'Obs4', width: '10%'},
                        {text: 'Estado', datafield: 'estado', width: '10%'},
                        {text: 'Contrata Anterior', datafield: 'IdContraAnt', width: '10%', hidden: true},
                        {text: 'ID_estado', datafield: 'intIdEsta', width: '10%', hidden: true},
                        {text: 'Total Peso Neto', datafield: 'TotalPesoNeto', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['TotalPesoNeto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Total Peso Bruto', datafield: 'TotalPesoBruto', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['TotalPesoBruto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Total Area', datafield: 'TotalArea', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['TotalArea']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Total Pintura', datafield: 'deciAreaPintura', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['deciAreaPintura']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]
                        },
                    ]
                });
            } else {

                mensaje(false, "NO HAY DATOS A MOSTRAR", "no");
                window.setTimeout(function () {

                    $("#modal-cargar-lote_pint").modal('hide'); // COLOCO ANDY 
                }, 1000);
            }


        }
    });
}
function combo_pintor() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_personas_por_tipo_etapa',
        dataType: 'json',
        data: {
            intIdTipoEtap: parseInt(26),
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
          //  console.log(responses);
            var new_pinto = [];
            responses.data.forEach(dato => {
                if (dato.varDescEsta === "ACTIVO") {
                    new_pinto.push(dato);
                }
            });

            var source =
                    {
                        localdata: new_pinto,
                        datatype: "array",
                        datafields: [
                            {name: 'Nombres'},
                            {name: 'intIdColaborador'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#pintor_gene_lote_pint").jqxDropDownList({
                checkboxes: true,
                source: dataAdapter,
                width: '218px',
                height: '23px',

                displayMember: "Nombres",
                valueMember: "intIdColaborador"
            });
            $("#pintor_gene_lote_pint").jqxDropDownList('checkIndex', 0);
            $("#pintor_gene_lote_pint").jqxDropDownList('focus');


        }
    });
}
$("#pintor_gene_lote_pint").on('checkChange', function (event) {
    check_items_pintor_value = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {

            var items = $("#pintor_gene_lote_pint").jqxDropDownList('getCheckedItems');
            var checkedItems = "";
            $.each(items, function (index) {
                check_items_pintor_value += this.value + ",";
            });
          //  console.log(check_items_pintor_value);

        }
    }


});
function combo_cabina() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/listar_cabina',
        dataType: 'json',

        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            var new_cabina = [];
            responses.data.forEach(element => {
                if (element.intIdEsta === 3) {
                    //console.log(element.varCabina);  
                    new_cabina.push(element);
                }

            });
            var source =
                    {
                        localdata: new_cabina,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdCabina'},
                            {name: 'varCabina'},
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#cabi_gene_lote_pint").jqxDropDownList({source: dataAdapter, displayMember: "varCabina", valueMember: "intIdCabina", placeHolder: "Seleccione", width: '218px', height: '23px'});
            $("#cabi_gene_lote_pint").jqxDropDownList('focus');
            $("#cabi_gene_lote_pint").jqxDropDownList('selectIndex', 0);
        }
    });
}
$("#generar_lote_pintura").click(function () {

    var rowindex_pregunta = $("#grid_repor_lote_pint").jqxGrid("getselectedrowindexes");
    if (rowindex_pregunta.length > 0) {
        $("#modal-pregunta-pintura").modal('show');
    } else {
        mensaje(false, "NO HA SELECCIONADO UN FILA", "no");
    }
});
//NO MODIFICAR 
$("#modificar_no_lote_pintura").click(function () {
    
    $("#modal-pregunta-pintura").modal('hide');
    var rowindex = $("#grid_repor_lote_pint").jqxGrid("getselectedrowindexes");
    var textData_lote_pint = "";
    var deciTotaPesoNeto = 0;
    var deciTotalAreaPintura = 0;
    var deciTotaArea = 0;
    var cantidadtotal = 0;

    var array_avance = [];
    myJsonString = "";

    if (rowindex.length > 0) {
        for (var i = 0; i < rowindex.length; i++) {
            textData_lote_pint = $('#grid_repor_lote_pint').jqxGrid('getrowdata', rowindex[i]);

            var row = {Canti: textData_lote_pint['Canti'], varCodiElemento: textData_lote_pint['varCodiElemento'], nombre: textData_lote_pint['nombre'],
                varCodVal: textData_lote_pint['varCodVal'], varModelo: textData_lote_pint['varModelo'], varPerfil: textData_lote_pint['varPerfil'],
                intRevision: textData_lote_pint['intRevision'], intCantRepro: textData_lote_pint['intCantRepro'], Zona: textData_lote_pint['Zona'],
                Programa: textData_lote_pint['Programa'], Grupo: textData_lote_pint['Grupo'], Contratista: textData_lote_pint['Contratista'],
                deciPrec: textData_lote_pint['deciPrec'], deciPesoNeto: textData_lote_pint['deciPesoNeto'], deciPesoBruto: textData_lote_pint['deciPesoBruto'],
                deciLong: textData_lote_pint['deciLong'], deciArea: textData_lote_pint['deciArea'], deciAncho: textData_lote_pint['deciAncho'], etapa_anterior: textData_lote_pint['etapa_anterior'],
                etapa_siguiente: textData_lote_pint['etapa_siguiente'], intIdContr: textData_lote_pint['intIdContr'], intIdRuta: textData_lote_pint['intIdRuta'],
                intIdEtapaAnte: textData_lote_pint['intIdEtapaAnte'], intIdEtapaSiguiente: textData_lote_pint['intIdEtapaSiguiente'], intIdProyPaquete: textData_lote_pint['intIdProyPaquete'],
                intIdProyTarea: textData_lote_pint['intIdProyTarea'], intIdProyZona: textData_lote_pint['intIdProyZona'], intidetapa: textData_lote_pint['intidetapa'], varcodelement: textData_lote_pint['data_seriales'],
                ContratistaAnt: textData_lote_pint['ContratistaAnt'], FechaAvanAnt: textData_lote_pint['FechaAvanAnt'], Doc_Ant: textData_lote_pint['Doc_Ant'], Pintura: textData_lote_pint['Pintura'], IdContrAnt: textData_lote_pint['IdContrAnt'], intIdEsta: textData_lote_pint['intIdEsta'],
                tipo_reporte: 1, DocEnvioTS: textData_lote_pint['DocEnvioTS'], Obs1: textData_lote_pint['Obs1'], obs2: textData_lote_pint['obs2'], obs3: textData_lote_pint['obs3'], obs4: textData_lote_pint['obs4']
            };
            array_avance.push(row);

            deciTotaPesoNeto = parseFloat(textData_lote_pint['TotalPesoNeto']) + deciTotaPesoNeto;
            deciTotalAreaPintura = parseFloat(textData_lote_pint['deciAreaPintura']) + deciTotalAreaPintura;
            deciTotaArea = parseFloat(textData_lote_pint['TotalArea']) + deciTotaArea;
            cantidadtotal = textData_lote_pint['Canti'] + cantidadtotal;

        }
        myJsonString = JSON.stringify(array_avance);


        $("#pintura_gene_lole").val(lote_sis_pintura_value);
        $("#peso_neto_tota_gene_lote_pint").val(deciTotaPesoNeto.toFixed(3));
        $("#area_pint_gene_lote").val(deciTotalAreaPintura.toFixed(3));
        $("#area_tota_lote").val(deciTotaArea.toFixed(3));
        $("#cant_total_lote_pint").val(cantidadtotal);
        $("#fecha_inicio_gene_lote").val(today);
        $("#proy_ot_gene_lote_pint_value").val(codigoot_reporta_pint_value);
        $("#tipo_elem_gene_lote_pint_value").val(tipo_elemento_reporta_pint_value);
        $("#proy_ot_gene_lote_pint").val(codigoot_reporta_pint_label);
        $("#tipo_elem_gene_lote_pint").val(tipo_elemento_report_pint_label);
        comboc_contratista(id_etapa_cont);
        combo_cabina();
        listar_lote_pintura_codigo();
        $("#modal-gene-lote-pintura").modal('show');
    }
});
function listar_lote_pintura_codigo(){
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/lote_pintura_serie',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            $("#lote_pintura").val(responses.data);
        }
    });
}
function limpiar_campo_Generar_lote_pintura() {
    $("#cant_total_lote_pint").val('');
    $("#proy_ot_gene_lote_pint_value").val('');
    $("#tipo_elem_gene_lote_pint_value").val('');
    $("#peso_neto_tota_gene_lote_pint").val('');
    $("#area_pint_gene_lote").val('');
    $("#area_tota_lote").val('');
    $("#proy_ot_gene_lote_pint").val('');
    $("#tipo_elem_gene_lote_pint").val('');
    $("#pintor_gene_lote_pint").jqxDropDownList('clear');
    $("#pintor_gene_lote_pint").jqxDropDownList('checkIndex', 0);
    check_items_pintor_value = "";
    $("#cabi_gene_lote_pint").jqxDropDownList('selectIndex', 0);
    $("#fecha_inicio_gene_lote").val('');
    $("#fecha_final_gene_lote").val('');
    $("#obse_gene_lote").val('');
    $("#pintura_gene_lole").val('');


}
$("#btn_cerrar_gene_pint").click(function () {
    limpiar_campo_Generar_lote_pintura();
});
$("#guardar_gene_lote_pint").click(function () {
    let ot_gene_lote_pint = $("#proy_ot_gene_lote_pint_value").val();
    let elem_gene_lote_pint = $("#tipo_elem_gene_lote_pint_value").val();
    let peso_neto_lote_pint = $("#peso_neto_tota_gene_lote_pint").val();
    let area_opintura = $("#area_pint_gene_lote").val();
    let area_total = $("#area_tota_lote").val();
    let contra_id = $("#contratista_avance_lote_pint").val();

    // let pintor_gene = $("#pintor_gene_lote_pint").val();
    let cabina_gene = $("#cabi_gene_lote_pint").val();
    let fech_inic = $("#fecha_inicio_gene_lote").val();
    let fech_fina = $("#fecha_final_gene_lote").val();
    let obse_gene = $("#obse_gene_lote").val();
    let lote_pintura = $("#pintura_gene_lole").val();
    let cantidad = $("#cant_total_lote_pint").val();



    if (ot_gene_lote_pint === "") {
        mensaje(false, "INGRESE LA OT", "no");
    } else {
        if (elem_gene_lote_pint === "") {
            mensaje(false, "INGRESE EL TIPO ELEMENTO", "no");
        } else {
            if (peso_neto_lote_pint === "") {
                mensaje(false, "INGRESE EL PESO NETO", "no");
            } else {
                if (area_opintura === "") {
                    mensaje(false, "INGRESE LA AREA PINTURA", "no");
                } else {
                    if (area_total === "") {
                        mensaje(false, "INGRESE EL AREA TOTAL", "no");
                    } else {
                        if (contra_id === "") {
                            mensaje(false, "INGRESE EL CONTRATISTA", "no");
                        } else {
                            if (cabina_gene === "") {
                                mensaje(false, "INGRESE LA CABINA", "no");
                            } else {
                                if (fech_inic === "") {
                                    mensaje(false, "INGRESE LA FECHA INICIO", "no");
                                } else {
                                    if (fech_fina === "") {
                                        mensaje(false, "INGRESE LA FECHA FINAL", "no");
                                    } else {
                                        if (fech_inic > fech_fina) {
                                            mensaje(false, "LA FECHA DE INICIO DEBE SER MENOR A LA FECHA FINAL", "no");
                                        } else {
                                      //      console.log(myJsonString, ot_gene_lote_pint, elem_gene_lote_pint, peso_neto_lote_pint, area_opintura, area_total, check_items_pintor_value, cabina_gene, fech_inic, fech_fina, obse_gene, contra_id);

                                            gene_lote_pintura(myJsonString, ot_gene_lote_pint, elem_gene_lote_pint, peso_neto_lote_pint, area_opintura, area_total, check_items_pintor_value, cabina_gene, fech_inic, fech_fina, obse_gene, lote_pintura, cantidad, contra_id);
                                        }

                                    }

                                }
                            }
                        }
                    }
                }
            }
        }
    }

});
function periodo_valorizacion(id_etapa) {
    let user = obtener_user();
    var periodo = "";
    var id_perido = "";
    var id_etapa_valo = id_etapa;
    per_valo = "";
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_obte_peri_valo',
        dataType: 'json',
        data: {
            acti_usua: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {

            per_valo = responses.data[0]['@v_estado'];
            cod_per_valo = responses.data[0]['@v_idPeriodo'];
            if (per_valo === "ACTIVO") {
                /*SI EL PERIODO DE VALORIZACIÓN ESTA ACTIVO ENTONCES BUSCAREMOS SI SE VALORIZA O NO*/
                valoriza(id_etapa_valo, id_perido);
            } else {
                mensaje(false, "No se puede asignar avances, No hay perido de valorización", "no");
            }
        }
    });
}
function valoriza(id_etapa, id_perido) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/envi_valo_cod',
        dataType: 'json',
        data: {
            intIdEtapa: id_etapa,
            intIdProy: codigoot_reporta_pint_value,
            intIdTipoProducto: tipo_elemento_reporta_pint_value
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
                bool_despacho = "";
                id_etapa_cont = "";
                cod_tipo_etapa = responses.data[0]['varCodiTipoEtap'];
                bool_despacho = responses.data[0]['boolDesp'];
                idasig_etapa = responses.data[0]['intIdAsigEtapProy'];
                var_valo = responses.data[0]['varValoEtapa'];
                id_etapa_cont = responses.data[0]['intIdEtapa'];
               // console.log(id_etapa_cont);

            }

        }
    });

}
function gene_lote_pintura(array_avance, ot_gene_lote_pint2, elem_gene_lote_pint2, peso_neto_lote_pint2, area_opintura2, area_total2, pintor_gene2, cabina_gene2, fech_inic2, fech_fina2, obse_gene2, lote_pintura2, cantidad2, contra_id2) {
    let usuario = obtener_user();



//    console.log(ot_gene_lote_pint2, elem_gene_lote_pint2, peso_neto_lote_pint2, area_opintura2, area_total2, pintor_gene2, cabina_gene2, fech_inic2, fech_fina2, obse_gene2, lote_pintura2,cantidad2);
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/crear_pintura',
        dataType: 'json',
        data: {
            intIdProy: ot_gene_lote_pint2,
            intIdTipoProducto: elem_gene_lote_pint2,
            varLotePintura: lote_pintura2,
            intIdCabina: cabina_gene2,
            intIdCont: contra_id2,
            varPintor: pintor_gene2,
            dateFechInic: fech_inic2,
            dateFechFin: fech_fina2,
            intCantidad: cantidad2,
            deciPesoNeto: peso_neto_lote_pint2,
            deciAreaPintura: area_opintura2,
            deciAreaTotal: area_total2,
            varObservacion: obse_gene2,
            acti_usua: usuario,
            //store avance
            v_intIdproy: parseInt(codigoot_reporta_pint_value),
            v_intIdTipoProducto: parseInt(tipo_elemento_reporta_pint_value),
            v_strDeObser: obse_gene2,
            v_intIdMaqui: 0,
            v_strBulto: '', //
            v_intIdPeriValo: parseInt(cod_per_valo),
            v_usuario: usuario,
            v_intIdInspe: 0,
            v_varValoEtapa: var_valo,
            v_varCodiTipoEtap: cod_tipo_etapa,
            v_boolDesp: bool_despacho,
            v_intIdAsigEtapProy: parseInt(idasig_etapa),
            v_informacion: array_avance,
            v_varNumeroGuia: '', //
            v_intIdSuper: 0,
            v_intIdContr: parseInt(21),
            v_tinFlgConforForzosa: 0,
            v_strDefecto: '',
            v_strCausa: '',
            strEstadoInspe: '',
            v_intIdDespa: 0,

            deciTotaPesoNeto: peso_neto_lote_pint2,
            deciTotaPesoBruto: '',
            deciTotaArea: area_total2,
            cantidadtotal: cantidad2

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {

            }
        },
        success: function (responses) {
            //console.log
            if (responses.data.mensaje_alternativo === "sin error") {
                //mensaje(true, "Se asigno correctamen(responses);te", "no");
                mensaje_noti(true, 'Se asigno correctamente', "modal-gene-lote-pintura");
                array_avance = [];
                $("#grid_repor_lote_pint").jqxGrid('clearSelection');
                // listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, modelo_combo, bulto_combo, codigo_combo);
                mostrar_grilla_pintura(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value, zona_reporta_pint_value, programa_reporta_pint_value, lote_sis_pintura_value);
                limpiar_contra_id();
                $("#fecha_final_gene_lote").val('');
                $("#obse_gene_lote").val('');
            } else {
                array_avance = [];
                $("#grid_repor_lote_pint").jqxGrid('clearSelection');
                mensaje(false, "Hay errores al Asignar Avance.", "modal-gene-lote-pintura");
                limpiar_contra_id();
                listar_errores(responses.data.mensaje);
                $("#fecha_final_gene_lote").val('');
                $("#obse_gene_lote").val('');
                mostrar_grilla_pintura(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value, zona_reporta_pint_value, programa_reporta_pint_value, lote_sis_pintura_value);

            }

        }
    });


}
function listar_errores(data) {

    var new_errores = [];
    var new_list_errores = [];
    for (var i = 0; data.length > i; i++) {
        new_list_errores['mensaje'] = data[i];
        new_errores.push(new_list_errores);
    }
    var source =
            {
                localdata: new_errores,
                datatype: "array",
                datafields: [
                    {name: 'mensaje', type: 'string'}
                ],
                async: false
            };
    var dataAdapter2 = new $.jqx.dataAdapter(source);
    $("#griderrores").jqxGrid({
        width: '100%',
        height: '200',
        source: dataAdapter2,
        columnsresize: true,
        altrows: true,
        enabletooltips: true,
        theme: 'darkblue',
        columns: [
            {text: 'Mensajes', datafield: 'mensaje'}

        ]
    });
    $("#griderrores").jqxGrid('localizestrings', localizationobj);
    $("#modal-errores-asignar-avance-pintura").modal('show');
}
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}
function comb_lote_pintura(idpintura) {
    //console.log(idpintura);
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/combo_pintura',
        dataType: 'json',
        data: {
            varLotePintura: idpintura,
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",

                        datafields: [
                            {name: 'Codigo'},
                            {name: 'intIdLotePintura'},
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#combo_lote_pintura").jqxDropDownList({template: "primary", placeHolder: "LOTE DE PINTURA : ", source: dataAdapter, displayMember: "Codigo", valueMember: "intIdLotePintura", width: '8%', height: '30'});
            $("#combo_lote_pintura").jqxDropDownList('clearSelection');
            $("#combo_lote_pintura").jqxDropDownList('selectedIndex', -1);


        }
    });
}
$("#modificar_si_lote_pintura").click(function () {

    $("#modificar_si_lote_pintura").addClass('hidde_grid');
    $("#modificar_no_lote_pintura").addClass('hidde_grid');

    comb_lote_pintura(lote_sis_pintura_value);
    $("#modificar_acepta_lote_pintura").removeClass('hidde_grid');
    $("#modificar_salir_lote_pintura").removeClass('hidde_grid');
    $("#mostrar_combo_lote_pintura").removeClass('hidde_grid');
});
$("#modificar_salir_lote_pintura").click(function () {
    $("#modificar_si_lote_pintura").removeClass('hidde_grid');
    $("#modificar_no_lote_pintura").removeClass('hidde_grid');
    $("#modificar_acepta_lote_pintura").addClass('hidde_grid');
    $("#modificar_salir_lote_pintura").addClass('hidde_grid');
    $("#mostrar_combo_lote_pintura").addClass('hidde_grid');

    $("#combo_lote_pintura").jqxDropDownList('clearSelection');
    $("#combo_lote_pintura").jqxDropDownList('selectedIndex', -1);
    $("#modal-pregunta-pintura").modal('hide');
});
function limpiar_interfaz_pregunta() {
    $("#modificar_si_lote_pintura").removeClass('hidde_grid');
    $("#modificar_no_lote_pintura").removeClass('hidde_grid');
    $("#modificar_acepta_lote_pintura").addClass('hidde_grid');
    $("#modificar_salir_lote_pintura").addClass('hidde_grid');
    $("#mostrar_combo_lote_pintura").addClass('hidde_grid');

    $("#combo_lote_pintura").jqxDropDownList('clearSelection');
    $("#combo_lote_pintura").jqxDropDownList('selectedIndex', -1);
    $("#modal-pregunta-pintura").modal('hide');
}
// SI ACEPTA EDITAR  

function comboc_contratista_edit(id_tipo_etapa) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionCostos/public/index.php/comb_cont',
        dataType: 'json',
        data: {
            intIdEtapa: id_tipo_etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
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
            $("#contratista_avance_lote_pint_edit").jqxDropDownList({
                placeHolder: "Seleccione",
                source: dataAdapter,
                width: '218px',
                height: '23px',

                displayMember: "varRazCont",
                valueMember: "intIdCont"
            });
           // console.log("asdas", edit_contra_pint);
            $("#contratista_avance_lote_pint_edit").jqxDropDownList('focus');
            $("#contratista_avance_lote_pint_edit").val(edit_contra_pint);
            $("#contratista_avance_lote_pint_edit").jqxDropDownList({disabled: true});
        }
    });
}
function combo_pintor_edit() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_personas_por_tipo_etapa',
        dataType: 'json',
        data: {
            intIdTipoEtap: parseInt(26),
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            var new_pinto = [];
            responses.data.forEach(dato => {
                if (dato.varDescEsta === "ACTIVO") {
                    new_pinto.push(dato);
                }
            });

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'Nombres'},
                            {name: 'intIdColaborador'},
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#pintor_gene_lote_pint_edit").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '27px',

                displayMember: "Nombres",
                valueMember: "intIdColaborador"
            });


            $("#pintor_gene_lote_pint_edit").jqxDropDownList('focus');
            $("#pintor_gene_lote_pint_edit").val(cadena_pintor[0]);
            $("#pintor_gene_lote_pint_edit").jqxDropDownList({disabled: true});


        }
    });
}
function combo_cabina_edit() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/listar_cabina',
        dataType: 'json',

        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            var new_cabina = [];
            responses.data.forEach(element => {
                if (element.intIdEsta === 3) {
                    //console.log(element.varCabina);  
                    new_cabina.push(element);
                }

            });
            var source =
                    {
                        localdata: new_cabina,
                        datatype: "array",
                        datafields: [
                            {name: 'varCabina'},
                            {name: 'intIdCabina'},
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#cabi_gene_lote_pint_edit").jqxDropDownList({source: dataAdapter, displayMember: "varCabina", valueMember: "intIdCabina", placeHolder: "Seleccione", width: 210, height: 23});
            $("#cabi_gene_lote_pint_edit").jqxDropDownList('focus');
            $("#cabi_gene_lote_pint_edit").val(edit_cabina);
            $("#cabi_gene_lote_pint_edit").jqxDropDownList({disabled: true});
        }
    });
}
//ON CHANGE COMBO_LOTE_PINTURA 
$("#contratista_avance_lote_pint_edit").on('change', function (event) {

    contr_pint_value_edit = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            contr_pint_value_edit = item.value;

          //  console.log(contr_pint_value_edit);
        }
        if (contr_pint_value_edit == "21") {
            $("#mostrar_pintor_edit").removeClass('hidde_grid');
            $("#pintor_gene_lote_pint_edit").css("border-color", "#aaa");
            combo_pintor_edit();
        } else {
            $("#mostrar_pintor_edit").addClass('hidde_grid');
            $("#pintor_gene_lote_pint_edit").jqxDropDownList('clear');
            $("#pintor_gene_lote_pint_edit").jqxDropDownList('checkIndex', 0);
            $("#pintor_gene_lote_pint_edit").val('');

        }

    }
});


$("#combo_lote_pintura").on('change', function (event) {
    $('#combo_lote_pintura').jqxDropDownList('clearFilter');
    combo_lote_pintura_value = "";
    combo_lote_pintura_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            combo_lote_pintura_value = item.value;
            combo_lote_pintura_label = item.label;
        }
    }
});
$("#modificar_acepta_lote_pintura").click(function () {
    let id_lote_pint = $("#combo_lote_pintura").val();

    if (id_lote_pint === "") {
        mensaje(false, "SELECCIONE EL LOTE DE PINTURA", "no");
    } else {
        codigo_lote_pintura(id_lote_pint);
    }

});
function codigo_lote_pintura(idlotepint) {

    $("#modal-pregunta-pintura").modal('hide');

    var rowindex_edit = $("#grid_repor_lote_pint").jqxGrid("getselectedrowindexes");

    var textData_lote_pint_edit = "";
    var deciTotaPesoNeto_edit = 0;
    var deciTotalAreaPintura_edit = 0;
    var deciTotaArea_edit = 0;
    var cantidadtotal_edit = 0;

    var array_avance_edit = [];
    myJsonString_edit = "";
    edit_pintor = "";
    edit_cabina = "";
    edit_cantidad_total = 0;
    cadena_pintor = [];
    edit_contra_pint = "";

    if (rowindex_edit.length > 0) {
        for (var i = 0; i < rowindex_edit.length; i++) {
            textData_lote_pint_edit = $('#grid_repor_lote_pint').jqxGrid('getrowdata', rowindex_edit[i]);
            // console.log(textData_lote_pint_edit);
            var row = {Canti: textData_lote_pint_edit['Canti'], varCodiElemento: textData_lote_pint_edit['varCodiElemento'], nombre: textData_lote_pint_edit['nombre'],
                varCodVal: textData_lote_pint_edit['varCodVal'], varModelo: textData_lote_pint_edit['varModelo'], varPerfil: textData_lote_pint_edit['varPerfil'],
                intRevision: textData_lote_pint_edit['intRevision'], intCantRepro: textData_lote_pint_edit['intCantRepro'], Zona: textData_lote_pint_edit['Zona'],
                Programa: textData_lote_pint_edit['Programa'], Grupo: textData_lote_pint_edit['Grupo'], Contratista: textData_lote_pint_edit['Contratista'],
                deciPrec: textData_lote_pint_edit['deciPrec'], deciPesoNeto: textData_lote_pint_edit['deciPesoNeto'], deciPesoBruto: textData_lote_pint_edit['deciPesoBruto'],
                deciLong: textData_lote_pint_edit['deciLong'], deciArea: textData_lote_pint_edit['deciArea'], deciAncho: textData_lote_pint_edit['deciAncho'], etapa_anterior: textData_lote_pint_edit['etapa_anterior'],
                etapa_siguiente: textData_lote_pint_edit['etapa_siguiente'], intIdContr: textData_lote_pint_edit['intIdContr'], intIdRuta: textData_lote_pint_edit['intIdRuta'],
                intIdEtapaAnte: textData_lote_pint_edit['intIdEtapaAnte'], intIdEtapaSiguiente: textData_lote_pint_edit['intIdEtapaSiguiente'], intIdProyPaquete: textData_lote_pint_edit['intIdProyPaquete'],
                intIdProyTarea: textData_lote_pint_edit['intIdProyTarea'], intIdProyZona: textData_lote_pint_edit['intIdProyZona'], intidetapa: textData_lote_pint_edit['intidetapa'], varcodelement: textData_lote_pint_edit['data_seriales'],
                ContratistaAnt: textData_lote_pint_edit['ContratistaAnt'], FechaAvanAnt: textData_lote_pint_edit['FechaAvanAnt'], Doc_Ant: textData_lote_pint_edit['Doc_Ant'], Pintura: textData_lote_pint_edit['Pintura'], IdContrAnt: textData_lote_pint_edit['IdContrAnt'], intIdEsta: textData_lote_pint_edit['intIdEsta'],
                tipo_reporte: 1, DocEnvioTS: textData_lote_pint_edit['DocEnvioTS'], Obs1: textData_lote_pint_edit['Obs1'], obs2: textData_lote_pint_edit['obs2'], obs3: textData_lote_pint_edit['obs3'], obs4: textData_lote_pint_edit['obs4']
            };
            array_avance_edit.push(row);
            deciTotaPesoNeto_edit = parseFloat(textData_lote_pint_edit['TotalPesoNeto']) + deciTotaPesoNeto_edit;
            deciTotalAreaPintura_edit = parseFloat(textData_lote_pint_edit['deciAreaPintura']) + deciTotalAreaPintura_edit;
            deciTotaArea_edit = parseFloat(textData_lote_pint_edit['TotalArea']) + deciTotaArea_edit;
            cantidadtotal_edit = textData_lote_pint_edit['Canti'] + cantidadtotal_edit;

        }
        myJsonString_edit = JSON.stringify(array_avance_edit);
        //  console.log(deciTotaPesoNeto_edit, deciTotalAreaPintura_edit, deciTotaArea_edit, cantidadtotal_edit);

    }



    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_tab_pintura_id',
        dataType: 'json',
        data: {
            intIdLotePintura: idlotepint,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {

            edit_pintor = responses.data[0].varPintor;
            cadena_pintor = edit_pintor.split(",");
            edit_cabina = responses.data[0].intIdCabina;
            edit_cantidad_total = responses.data[0].intCantidad + cantidadtotal_edit;
            edit_contra_pint = responses.data[0].intIdCont;

            //combo_pintor_edit();
            comboc_contratista_edit(id_etapa_cont);
            combo_cabina_edit();
            $("#id_lote_pintura_label").val(combo_lote_pintura_label);
            $("#id_lote_pintura").val(responses.data[0].intIdLotePintura);
            $("#proy_ot_gene_lote_pint_value_edit").val(responses.data[0].intIdProy);
            $("#proy_ot_gene_lote_pint_edit").val(responses.data[0].varCodiProy);
            $("#tipo_elem_gene_lote_pint_value_edit").val(responses.data[0].intIdTipoProducto);
            $("#tipo_elem_gene_lote_pint_edit").val(responses.data[0].varDescTipoProd);
            $("#peso_neto_tota_gene_lote_pint_edit").val(deciTotaPesoNeto_edit + parseFloat(responses.data[0].deciPesoNeto));
            $("#pintura_gene_lole_edit").val(responses.data[0].varLotePintura);//.parseFloat(x).toFixed(2);
            $("#area_pint_gene_lote_edit").val(deciTotalAreaPintura_edit + parseFloat(responses.data[0].deciAreaPintura));
            $("#area_tota_lote_edit").val(deciTotaArea_edit + parseFloat(responses.data[0].deciAreaTotal));
            $("#fecha_inicio_gene_lote_edit").val(responses.data[0].dateFechInic);
            $("#fecha_final_gene_lote_edit").val(responses.data[0].dateFechFin);
            $("#obse_gene_lote_edit").val(responses.data[0].varObservacion);

            $("#modal-gene-lote-pintura-edit").modal('show');
        }
    });


}
$("#guardar_gene_lote_pint_edit").click(function () {
    let cant_total_edit = edit_cantidad_total;

    let idlotep = $("#id_lote_pintura").val();
    let proy_edit = $("#proy_ot_gene_lote_pint_value_edit").val();
    let elem_edit = $("#tipo_elem_gene_lote_pint_value_edit").val();
    let peso_neto_total_edit = Number.parseFloat($("#peso_neto_tota_gene_lote_pint_edit").val()).toFixed(3);
    let pintura_edit = $("#pintura_gene_lole_edit").val();
    let area_pintura_edit = Number.parseFloat($("#area_pint_gene_lote_edit").val()).toFixed(3);
    let area_total_edit = Number.parseFloat($("#area_tota_lote_edit").val()).toFixed(3);
    let pintor_edit = $("#pintor_gene_lote_pint_edit").val();
    let cabina_edit = $("#cabi_gene_lote_pint_edit").val();
    let fech_ini = $("#fecha_inicio_gene_lote_edit").val();
    let fech_final = $("#fecha_final_gene_lote_edit").val();
    let obser_edit = $("#obse_gene_lote_edit").val();

    // console.log(myJsonString_edit, idlotep, proy_edit, elem_edit, peso_neto_total_edit, pintura_edit, area_pintura_edit, area_total_edit, pintor_edit, cabina_edit, fech_ini, fech_final, obser_edit, cant_total_edit);
    agregar_edit_lote_pintura(myJsonString_edit, idlotep, proy_edit, elem_edit, peso_neto_total_edit, pintura_edit, area_pintura_edit, area_total_edit, pintor_edit, cabina_edit, fech_ini, fech_final, obser_edit, cant_total_edit);
});
function agregar_edit_lote_pintura(array_avance_edit, idlotep2, proy_edit2, elem_edit2, peso_neto_total_edit2, pintura_edit2, area_pintura_edit2, area_total_edit2, pintor_edit2, cabina_edit2, fech_ini2, fech_final2, obser_edit2, cant_total_edit2) {



    let user_modi = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/editar_pintura',
        dataType: 'json',
        data: {
            intIdLotePintura: idlotep2,
            deciPesoNeto: peso_neto_total_edit2,
            deciAreaPintura: area_pintura_edit2,
            deciAreaTotal: area_total_edit2,
            usua_modi: user_modi,
            //store avance
            v_intIdproy: parseInt(proy_edit2),
            v_intIdTipoProducto: parseInt(elem_edit2),
            v_strDeObser: obser_edit2,
            v_intIdMaqui: 0,
            v_strBulto: '', //
            v_intIdPeriValo: parseInt(cod_per_valo),
            v_usuario: user_modi,
            v_intIdInspe: 0,
            v_varValoEtapa: var_valo,
            v_varCodiTipoEtap: cod_tipo_etapa,
            v_boolDesp: bool_despacho,
            v_intIdAsigEtapProy: parseInt(idasig_etapa),
            v_informacion: array_avance_edit,
            v_varNumeroGuia: '', //
            v_intIdSuper: 0,
            v_intIdContr: parseInt(21),
            v_tinFlgConforForzosa: 0,
            v_strDefecto: '',
            v_strCausa: '',
            strEstadoInspe: '',
            v_intIdDespa: 0,

            deciTotaPesoNeto: peso_neto_total_edit2,
            deciTotaPesoBruto: '',
            deciTotaArea: area_pintura_edit2,
            intCantidad: cant_total_edit2,
            varObservacion: obser_edit2,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data.mensaje_alternativo === "sin error") {
                //mensaje(true, "Se asigno correctamente", "no");
                mensaje_noti(true, 'Se asigno correctamente', "modal-gene-lote-pintura-edit");
                array_avance_edit = [];
                $("#grid_repor_lote_pint").jqxGrid('clearSelection');
                // listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, modelo_combo, bulto_combo, codigo_combo);
                mostrar_grilla_pintura(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value, zona_reporta_pint_value, programa_reporta_pint_value, lote_sis_pintura_value);
                limpiar_contra_id();
                limpiar_interfaz_pregunta();
            } else {
                array_avance_edit = [];
                $("#grid_repor_lote_pint").jqxGrid('clearSelection');
                mensaje(false, "Hay errores al Asignar Avance.", "modal-gene-lote-pintura-edit");
                mostrar_grilla_pintura(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value, zona_reporta_pint_value, programa_reporta_pint_value, lote_sis_pintura_value);
                limpiar_contra_id();
                listar_errores(responses.data.mensaje);
                limpiar_interfaz_pregunta();
            }

        }
    });

}
function limpiar_modal_edit() {
    $("#id_lote_pintura").val();
    $("#proy_ot_gene_lote_pint_value_edit").val();
    $("#tipo_elem_gene_lote_pint_value_edit").val();
    $("#peso_neto_tota_gene_lote_pint_edit").val();
    $("#pintura_gene_lole_edit").val();
    $("#area_pint_gene_lote_edit").val();
    $("#area_tota_lote_edit").val();
    $("#pintor_gene_lote_pint_edit").val();
    $("#cabi_gene_lote_pint_edit").val();
    $("#fecha_final_gene_lote_edit").val();
    $("#obse_gene_lote_edit").val();

    edit_pintor = "";
    edit_cabina = "";
    edit_cantidad_total = "";
    cadena_pintor = [];
    edit_contra_pint = "";
}
$("#btn_cerrar_gene_pint_edit").click(function () {

    limpiar_interfaz_pregunta();
    limpiar_modal_edit();
    mostrar_grilla_pintura(codigoot_reporta_pint_value, tipo_elemento_reporta_pint_value, zona_reporta_pint_value, programa_reporta_pint_value, lote_sis_pintura_value);

});
// cerrar  interfaz de mensajes de error 
$("#cerrar_modal_asig_avan_errores_pintura").click(function () {
    $("#modal-errores-asignar-avance-pintura").modal('hide');
});

function limpiar_contra_id() {
    $("#mostrar_pintor_edit").addClass('hidde_grid');
    $("#pintor_gene_lote_pint").jqxDropDownList('clear');
    $("#pintor_gene_lote_pint").jqxDropDownList('checkIndex', -1);
    $("#contratista_avance_lote_pint").jqxDropDownList('selectIndex', -1);
    $("#contratista_avance_lote_pint").val('');
    $("#pintor_gene_lote_pint").val('');

}