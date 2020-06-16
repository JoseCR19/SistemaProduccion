var checkedItems_ruta = "";
var zona_ruta = "";
var ruta_combo = "";
var codigo_ruta = "";
var codigo_elemento = "";
var checkedItems = "";
var data = [];
var codigo_tarea = "";
var zona_ruta_array = [];
var tarea_array = [];
var checkedItems_tarea = "";
var dataAdapter = "";
var codigoot = "";
var codigoproducto = "";
var data_codigos = "";
var codigopaquete = "";
var checkedItems_paquete = "";
var id_ruta = "";
var codigo_paquete = "";
var codigo_planta = "";
var codigo_estados = "";
var label_codot = "";
var label_producto = "";
var label_zona = "";
var label_prog = "";
var label_grup = "";
var label_cant_elem = "";
var label_peso_neto = "";
var cod_cont = "";
var boton_accion = "";
var export_data = 0;
var ot_pdf = "";
var zona_pdf = "";
var user_pdf = "";
$("#excel_asignacion_grupo").click(function () {
    if (export_data === 0) {
        mensaje(false, "No hay data que exportar", "no");
    } else {
        var data = $("#grid").jqxGrid('exportdata', 'json');
        JSONToCSVConvertor(data, "Grupos", true);
        //$("#grid").jqxGrid('exportdata', 'xls', 'data');
    }
});
$("#txt_ot").on('change', function (event) {
    $("#tarea").jqxDropDownList('clear');
    $("#zona").jqxDropDownList('clear');
    $("#paquete").jqxDropDownList('clear');
    codigoot = "";
    label_codot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            label_codot = item.label;
        }
    }
    if (codigoproducto) {
        listar_zona(codigoproducto, codigoot);
    } else {

    }
});
$("#close_editar").on('click', function () {

    $("#modal-editar-grupos").modal('hide');
});
$("#producto").on('change', function (event) {
    $("#tarea").jqxDropDownList('clear');
    $("#zona").jqxDropDownList('clear');
    $("#paquete").jqxDropDownList('clear');
    codigoproducto = "";
    label_producto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
            label_producto = item.label;
        }
    }
    if (codigoot) {
        listar_zona(codigoproducto, codigoot);
    } else {
    }
});
$("#zona").on('change', function (event) {
    zona_ruta = "";
    check_items_zona = [];
    if (event.args) {
        var item = event.args.item;
        if (item) {
            zona_ruta = item.value;
            check_items_zona.push(parseInt(item.value));
        }
    }
    if (check_items_zona) {
        listar_tarea(codigoproducto, codigoot, check_items_zona);
    }
});
$("#tarea").on('change', function (event) {
    $("#paquete").jqxDropDownList('clear');
    codigo_tarea = "";
    tarea_array = [];
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_tarea = item.value;
            tarea_array.push(item.value);
        }
    }
    if (tarea_array) {
        listar_paquete(codigoproducto, codigoot, tarea_array);
    }
});
$("#paquete").on('change', function (event) {
    codigo_paquete = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_paquete = item.value;
        }
    }
});
$("#planta").on('change', function (event) {
    codigo_planta = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_planta = item.value;
        }
    }
});
$("#estados").on('change', function (event) {
    codigo_estados = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_estados = item.value;
        }
    }
});
$("#arma_editar").on('change', function (event) {
    cod_cont = "";

    if (event.args) {

        var item = event.args.item;
        cod_cont = "";
        if (item) {
            cod_cont = item.value;
        }
    }
    if (cod_cont) {
        contratista(cod_cont);
    }
});
$("#buscar_lista_grupos").on('click', function () {
    export_data = 1;
    if (codigoot !== "") {
        if (codigoproducto !== "") {
            if (zona_ruta !== "") {
                if (codigo_tarea !== "") {
                    if (codigo_paquete !== "") {
                        if (codigo_planta !== "") {
                            if (codigo_estados !== "") {
                                listar_agrupadores(codigoot, codigoproducto, zona_ruta, codigo_tarea, codigo_paquete, codigo_planta, codigo_estados);
                            } else {
                                mensaje(false, "Seleccione el Estado  a buscar");
                            }
                        } else {
                            mensaje(false, "Seleccione la Planta a buscar");
                        }
                    } else {
                        mensaje(false, "Seleccione el Grupo a buscar");
                    }
                } else {
                    mensaje(false, "Seleccione el Programa a buscar");
                }
            } else {
                mensaje(false, "Seleccione la Ruta a buscar");
            }
        } else {
            mensaje(false, "Seleccione el Producto a buscar");
        }
    } else {
        mensaje(false, "Seleccione la OT a buscar");
    }
});
$("#guardar_asig_grup").on('click', function () {
    var ot = $("#cod_ot_editar").val();
    var producto = $("#cod_prod_editar").val();
    var paquete = $("#cod_grup_editar").val();
    var fecha_inicio = $("#fech_inic_grup").val();
    var fecha_final = $("#fech_fin_grup").val();
    var id_armador = $("#arma_editar").val();

    if (ot) {
        if (producto) {
            if (paquete) {
                if (id_armador) {
                    if (fecha_inicio) {
                        if (fecha_final) {
                            guardar_asig_grup(ot, producto, id_armador, fecha_inicio, fecha_final, paquete);
                        } else {
                            mensaje(false, "No hay seleccionado una Fecha de final", "no");
                        }
                    } else {
                        mensaje(false, "No hay seleccionado una Fecha de inicio", "no");
                    }
                } else {
                    mensaje(false, "No hay seleccionado una Armador", "no");
                }
            } else {
                mensaje(false, "No hay seleccionado una Grupo", "no");
            }
        } else {
            mensaje(false, "No hay seleccionado una Tipo Producto", "no");
        }
    } else {
        mensaje(false, "No hay seleccionado una OT", "no");
    }
});
$("#ver_planos").on('click', function () {
    var rowindex = $("#grid3").jqxGrid("getselectedrowindexes");
    var index_etapa = [];
    var textData = new Array();
    var cod_zona = $("#zona_ver_plano").val();
    console.log(rowindex);
    if (rowindex.length > 0) {
        for (var i = 0; i < rowindex.length; i++) {
            textData[i] = $('#grid3').jqxGrid('getrowdata', rowindex[i]);
            index_etapa.push(textData[i]['Codigo']);
        }
        planos(index_etapa, label_codot, cod_zona);
    } else {
        mensaje(false, "No ha seleccionado ningún plano", "no");
    }

});
$("#cerrar_modal_pdf").on('click', function () {
    $("#grid3").jqxGrid('clearselection');
    $("#modal-pdf").modal('hide');
});
$("#cerrar_planos").on('click', function () {
    $("#grid3").jqxGrid('clearselection');
    $("#grid3").jqxGrid('clear');
    $("#modal-ver-planos").modal('hide');
});
$("#limpiar").on('click', function () {
    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#zona").jqxDropDownList('selectIndex', 0);
    $("#tarea").jqxDropDownList('selectIndex', 0);
    $("#paquete").jqxDropDownList('selectIndex', 0);
    $("#planta").jqxDropDownList('selectIndex', 0);
    $("#estados").jqxDropDownList('selectIndex', 0);
    $("#grid").jqxGrid('clear');
    export_data = 0;
});
/*
 $("#ver_full_screem_pdf").on('click', function () {
 window.location.href = url + '/Planos/Proyecto/' + ot_pdf + '/Zonas/' + zona_pdf + '/GLOBALES' + '/' + user_pdf + '.pdf';
 });*/
function dropDownlist() {
    $("#tarea").jqxDropDownList({width: 200, height: 30});
    $("#paquete").jqxDropDownList({width: 200, height: 30});
    $("#zona").jqxDropDownList({width: 200, height: 30});
    $("#planta").jqxDropDownList({width: 200, height: 30});
    $("#estados").jqxDropDownList({width: 200, height: 30});
}
function listar_data_list_proyectos() {
    var array_ot = new Array();
    $.ajax({
        type: 'GET',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
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
            $("#producto").jqxDropDownList('selectIndex', 0);
            $("#producto").jqxDropDownList('focus');
        }
    });
}
function listar_zona(codigo_producto, codigo_ot) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_zona_asoc_proy',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_zona(codigo_producto, codigo_ot);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "Error.") {
                $("#zona").jqxDropDownList('clear');
            } else {
                var new_tarea = [];
                new_tarea = responses.data.reverse();
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
                $("#zona").jqxDropDownList({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30, });
                $("#zona").jqxDropDownList('selectIndex', 0);
                $("#zona").jqxDropDownList('focus');
            }
        }
    });
}
function listar_tarea(codigo_producto, codigo_ot, zona) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_tare_asoc_proy',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            intIdProyZona: zona
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.mensaje == "Error.") {
                $("#tarea").jqxDropDownList('clear');
            } else {

                var new_tarea = [];
                new_tarea = responses.data.reverse();
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
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#tarea").jqxDropDownList({source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30});
                $("#tarea").jqxDropDownList('selectIndex', 0);
                $("#tarea").jqxDropDownList('focus');
            }
        }
    });
}
function listar_paquete(codigo_producto, codigo_ot, tarea_paquete) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_paqu_asoc_proy',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            intIdProyTarea: tarea_paquete
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_paquete(codigo_producto, codigo_ot, tarea_paquete);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "Error.") {
                $("#paquete").jqxDropDownList('clear');
            } else {
                var jsonN1 = "";
                var result1 = [];
                responses.data.push({intIdProyPaquete: -1, varCodigoPaquete: 'TODOS'});
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
                $("#paquete").jqxDropDownList({source: dataAdapter, displayMember: "varCodigoPaquete", valueMember: "intIdProyPaquete", width: 200, height: 30, });
                $("#paquete").jqxDropDownList('selectIndex', 0);
                $("#paquete").jqxDropDownList('focus');
            }
        }
    });
}
function listar_planta() {
    var planta = new Array();
    var planta_como = [];
    var tempData = {};
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_plan',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {

            responses.data.push({intIdPlanta: -1, varDescPlanta: 'TODOS'});
            planta_como = responses.data.reverse();
            var source =
                    {
                        localdata: planta_como,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdPlanta'},
                            {name: 'varDescPlanta'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#planta").jqxDropDownList({source: dataAdapter, displayMember: "varDescPlanta", valueMember: "intIdPlanta", width: 200, height: 30});
            $("#planta").jqxDropDownList('selectIndex', 0);
            $("#planta").jqxDropDownList('focus');
        }
    });
}
function listar_estado() {
    $.ajax({
        type: 'GET',
        url: url + '/Asignaciones/public/index.php/esta_paqu',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            var estados = [];
            estados = responses.data.reverse();
            var source =
                    {
                        localdata: estados,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdEsta'},
                            {name: 'varDescEsta'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#estados").jqxDropDownList({source: dataAdapter, displayMember: "varDescEsta", valueMember: "intIdEsta", width: 200, height: 30});
            $("#estados").jqxDropDownList('selectIndex', 0);
            $("#estados").jqxDropDownList('focus');
        }
    });
}
function listar_agrupadores(cod_ot, cod_pro, cod_zon, cod_tar, cod_paq, cod_pla, cod_est) {
    boton_accion = "";
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/most_filt_asig_grup',
        dataType: 'json',
        data: {
            v_intIdproy: cod_ot,
            v_intIdTipoProducto: cod_pro,
            v_intIdPlanta: cod_pla,
            v_intIdZona: cod_zon,
            v_intIdTarea: cod_tar,
            v_intIdPaque: cod_paq,
            v_intIdEstado: cod_est
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
                            {name: 'Armador', type: 'string'},
                            {name: 'CodPaquete', type: 'string'},
                            {name: 'Contratista', type: 'string'},
                            {name: 'Elementos', type: 'number'},
                            {name: 'Estado', type: 'string'},
                            {name: 'Etapa', type: 'string'},
                            {name: 'PesoNeto', type: 'float'},
                            {name: 'Planta', type: 'string'},
                            {name: 'Tarea', type: 'string'},
                            {name: 'Zona', type: 'string'},
                            {name: 'fecha_Fin', type: 'date'},
                            {name: 'fecha_Inicio', type: 'date'},
                            {name: 'fecha_TerminoReal', type: 'date'},
                            {name: 'intIdProy', type: 'number'},
                            {name: 'intIdProyPaquete', type: 'number'},
                            {name: 'intIdTipoProducto', type: 'number'},
                            {name: 'IdZona', type: 'number'},
                            {name: 'IdTarea', type: 'number'},
                            {name: 'IdEtapa', type: 'number'},
                            {name: 'intIdPlanta', type: 'number'},
                            {name: 'intIdArmadores', type: 'number'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
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
                    {
                        text: 'Ver', datafield: 'ver', columntype: 'button', width: 60, cellsrenderer: function () {
                            return "Ver";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $("#grid4").jqxGrid('clear');
                            $("#grid4").jqxGrid('refresh');
                            var planta = dataRecord.Planta;
                            var armador = dataRecord.Armador;
                            var contratista = dataRecord.Contratista;
                            var etapa = dataRecord.Etapa;
                            var ot = label_codot;
                            var producto = label_producto;
                            var zona = dataRecord.Zona;
                            var tarea = dataRecord.Tarea;
                            var paquete = dataRecord.CodPaquete;
                            var elementos = dataRecord.Elementos;
                            var peso = dataRecord.PesoNeto;
                            $("#planta_ver").val(planta);
                            $("#armador_ver").val(armador);
                            $("#contrata_ver").val(contratista);
                            $("#etapa_ver").val(etapa);
                            $("#ot_ver").val(ot);
                            $("#pro_ver").val(producto);
                            $("#zon_ver").val(zona);
                            $("#prog_ver").val(tarea);
                            $("#grup_ver").val(paquete);
                            $("#prec_ver").val(peso);
                            $("#cant_elem_ver").val(elementos);

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
                            if (dataRecord.fecha_Inicio !== null) {
                                var año = new Date(dataRecord.fecha_Inicio).getFullYear();
                                var dia = new Date(dataRecord.fecha_Inicio).getDate();
                                var mes = new Date(dataRecord.fecha_Inicio).getMonth() + 1;
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

                            if (dataRecord.fecha_Fin !== null) {
                                var año_fin = new Date(dataRecord.fecha_Fin).getFullYear();
                                var dia_fin = new Date(dataRecord.fecha_Fin).getDate();
                                var mes_fin = new Date(dataRecord.fecha_Fin).getMonth() + 1;

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

                            if (dataRecord.fecha_TerminoReal !== null) {
                                var año_fin_ter = new Date(dataRecord.fecha_TerminoReal).getFullYear();
                                var dia_fin_ter = new Date(dataRecord.fecha_TerminoReal).getDate();
                                var mes_fin_ter = new Date(dataRecord.fecha_TerminoReal).getMonth() + 1;
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
                                $("#real").removeClass('hidde_grid');
                                $("#fech_term_grup_ver").val(año_fin_ter + '-' + mes_ultimo + '-' + dia_ultimo_fin);

                            } else {
                                $("#real").addClass('hidde_grid');
                                $("#fech_term_grup_ver").val(fecha_actual);
                            }
                            $("#modal-ver-grupos").modal('show');
                            ver_listar_elementos(dataRecord.intIdProyPaquete);

                        }
                    },
                    {
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: 60, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            label_zona = "";
                            label_grup = "";
                            label_prog = "";
                            label_peso_neto = "";
                            label_cant_elem = "";
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                            label_zona = dataRecord.Zona;
                            label_grup = dataRecord.CodPaquete;
                            label_prog = dataRecord.Tarea;
                            label_peso_neto = dataRecord.PesoNeto;
                            label_cant_elem = dataRecord.Elementos;
                            editar_grupo(dataRecord.intIdProy, dataRecord.intIdTipoProducto, dataRecord.intIdProyPaquete, dataRecord.IdZona, dataRecord.IdTarea, dataRecord.IdEtapa, dataRecord.intIdPlanta, dataRecord.intIdArmadores, 2);
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

                            if (dataRecord.fecha_Inicio !== null) {
                                var año = new Date(dataRecord.fecha_Inicio).getFullYear();
                                var dia = new Date(dataRecord.fecha_Inicio).getDate();
                                var mes = new Date(dataRecord.fecha_Inicio).getMonth() + 1;
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

                                $("#fech_inic_grup").val(año + '-' + mes_inicio + '-' + dia_ultimo);
                            } else {
                                $("#fech_inic_grup").val(fecha_actual);
                            }
                            if (dataRecord.fecha_Fin !== null) {
                                var año_fin = new Date(dataRecord.fecha_Fin).getFullYear();
                                var dia_fin = new Date(dataRecord.fecha_Fin).getDate();
                                var mes_fin = new Date(dataRecord.fecha_Fin).getMonth() + 1;

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
                                $("#fech_fin_grup").val(año_fin + '-' + mes_ultimo + '-' + dia_ultimo_fin);
                            } else {
                                $("#fech_fin_grup").val(fecha_actual);
                            }
                            if (dataRecord.fecha_TerminoReal !== null) {
                                var año_fin_ter = new Date(dataRecord.fecha_TerminoReal).getFullYear();
                                var dia_fin_ter = new Date(dataRecord.fecha_TerminoReal).getDate();
                                var mes_fin_ter = new Date(dataRecord.fecha_TerminoReal).getMonth() + 1;
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
                                $("#fecha_termino").removeClass('hidde_grid');
                                $("#fech_term_grup").val(año_fin_ter + '-' + mes_ultimo + '-' + dia_ultimo_fin);
                            } else {
                                $("#fecha_termino").addClass('hidde_grid');
                            }
                        }
                    },
                    {
                        text: 'Componentes', datafield: 'Componentes', columntype: 'button', width: 50, cellsrenderer: function () {
                            return "Componentes";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            var divisiones = label_codot.split(" /");
                            let user = obtener_user();
                            console.log(user);
                            $(location).attr('href', "proforma/tablero/pdf/" + dataRecord.intIdProy + '/' + dataRecord.intIdProyPaquete + '/' + dataRecord.intIdTipoProducto + '/' + divisiones[0] + '/' + dataRecord.Tarea + '/' + dataRecord.CodPaquete + '/' + user);

                            /*
                             listar_componentes(dataRecord.intIdProy, dataRecord.intIdProyPaquete, dataRecord.intIdTipoProducto);*/
                        }
                    },
                    {
                        text: 'Planos', datafield: 'Planos', columntype: 'button', width: 50, cellsrenderer: function () {
                            return "Planos";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $("#cod_ot_ver_plano").val(dataRecord.intIdProy);
                            $("#ot_ver_plano").val(label_codot);
                            $("#cod_prod_ver_plano").val(dataRecord.intIdTipoProducto);
                            $("#pro_ver_plano").val(label_producto);
                            $("#cod_prog_ver_plano").val(dataRecord.IdEtapa);
                            $("#pro_ver_plano").val(label_producto);
                            $("#cod_prog_ver_plano").val(dataRecord.IdEtapa);
                            $("#prog_ver_plano").val(dataRecord.Tarea);
                            $("#cod_zona_ver_plano").val(dataRecord.IdZona);
                            $("#zona_ver_plano").val(dataRecord.Zona);
                            listar_elementos_planos(dataRecord.intIdProyPaquete);
                            $("#modal-ver-planos").modal('show');
                        }
                    },
                    {text: 'Zona', datafield: 'Zona', width: 130, aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Programa', datafield: 'Tarea', width: 100},
                    {text: 'Grupo', datafield: 'CodPaquete', width: 100},

                    {text: 'Cant. Elemnt', datafield: 'Elementos', width: 100, cellsalign: 'right', aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {

                                                    var total = parseFloat(record['Elementos']);
                                                    return aggregatedValue + total;
                                                }
                                    }]},
                    {text: 'Peso Neto', datafield: 'PesoNeto', width: 120, cellsalign: 'right', aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    subtotal = parseFloat(record['PesoNeto']);
                                                    total = subtotal + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                }
                                    }]

                    },
                    {text: 'Armador', datafield: 'Armador', width: 250},
                    {text: 'Etapa', datafield: 'Etapa', width: 250},
                    {text: 'Fecha Inicio', datafield: 'fecha_Inicio', width: 180, cellsformat: 'dd/MM/yyyy hh:mm:ssss'},
                    {text: 'Fecha fin', datafield: 'fecha_Fin', width: 180, cellsformat: 'dd/MM/yyyy hh:mm:ssss'},
                    {text: 'Fecha Termino', datafield: 'fecha_TerminoReal', width: 180, cellsformat: 'dd/MM/yyyy hh:mm:ssss'},
                    {text: 'Planta', datafield: 'Planta', width: 130},

                    {text: 'idproyecto', datafield: 'intIdProy', width: '1%', hidden: true},
                    {text: 'idproyectopaquete', datafield: 'intIdProyPaquete', width: '1%', hidden: true},
                    {text: 'idproduto', datafield: 'intIdTipoProducto', width: '1%', hidden: true},
                    {text: 'idzona', datafield: 'IdZona', width: '1%', hidden: true},
                    {text: 'idtarea', datafield: 'IdTarea', width: '1%', hidden: true},
                    {text: 'idetapa', datafield: 'IdEtapa', width: '1%', hidden: true},
                    {text: 'idplanta', datafield: 'intIdPlanta', width: '1%', hidden: true},
                    {text: 'idarmadores', datafield: 'intIdArmadores', width: '1%', hidden: true}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });
}
function editar_grupo(cod_ot, cod_pro, cod_paq, cod_zon, cpd_tar, cod_eta, cod_pla, cod_arm, operacion) {

    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/vali_ante_edit',
        dataType: 'json',
        data: {
            v_intIdproy: cod_ot,
            v_intIdPaque: cod_paq,
            v_intIdTipoProducto: cod_pro
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {

            if (responses.data[0].mensaje === null) {

                listar_elementos(cod_paq);
                listar_planta_2(responses.data[0].intIdEtapa, cod_pla);
                listar_armadores(responses.data[0].intIdEtapa, cod_arm);
                $("#cod_etap_editar").val(responses.data[0].intIdEtapa);
                $("#etap_editar").val(responses.data[0].desEtapa);
                $("#cod_ot_editar").val(cod_ot);
                $("#ot_editar").val(label_codot);
                $("#cod_prod_editar").val(cod_pro);
                $("#pro_editar").val(label_producto);
                $("#cod_zon_editar").val(cod_zon);
                $("#zon_editar").val(label_zona);
                $("#cod_prog_editar").val(cod_zon);
                $("#prog_editar").val(label_prog);
                $("#cod_grup_editar").val(cod_paq);
                $("#grup_editar").val(label_grup);
                $("#prec_editar").val(label_peso_neto);
                $("#cant_elem_editar").val(label_cant_elem);
                document.getElementById("guardar_asig_grup").style.display = 'inline';
                $("#modal-editar-grupos").modal('show');
            } else {
                mensaje(false, responses.data[0].mensaje, "no");
            }

        }
    });

}
function listar_armadores(id_etapa, armador) {

    if (armador === null) {
        $("#arma_editar").jqxDropDownList('clear');
        $("#cod_cont_editar").val("");
        $("#contrata_editar").val("");
    }
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/vali_arma_id_etap',
        dataType: 'json',
        data: {
            intIdEtapa: id_etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            var armadores = [];
            armadores = responses.data.reverse();
            var source =
                    {
                        localdata: armadores,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdArmadores'},
                            {name: 'nombre'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#arma_editar").jqxDropDownList({source: dataAdapter, displayMember: "nombre", valueMember: "intIdArmadores", width: 180, height: 30});

            if (armador !== null) {
                $("#arma_editar").val(armador);
            } else {

            }
        }
    });

}
function listar_planta_2(id_etapa, cod_etapa) {

    if (id_etapa === 0) {

    } else {
        $.ajax({
            type: 'POST',
            url: url + '/Asignaciones/public/index.php/vali_plan_id_etap',
            dataType: 'json',
            data: {
                intIdEtapa: id_etapa
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {

                }
            },
            success: function (responses) {
                console.log(responses);

                var armadores = [];
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
                $("#plan_editar").jqxDropDownList({source: dataAdapter, displayMember: "varDescPlanta", valueMember: "intIdPlanta", width: 180, height: 30});
                if (cod_etapa) {
                    $("#plan_editar").val(cod_etapa);
                    $("#plan_editar").jqxDropDownList('disabled', true);
                    $("#plan_editar").jqxDropDownList('focus');
                } else {
                    $("#plan_editar").jqxDropDownList('selectIndex', 0);
                    $("#plan_editar").jqxDropDownList('disabled', true);
                    $("#plan_editar").jqxDropDownList('focus');
                }

            }
        });
    }

}
function contratista(id_arm) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/vali_cont_id_arma',
        dataType: 'json',
        data: {
            intIdArmadores: parseInt(id_arm)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            $("#cod_cont_editar").val(responses.data[0].intIdCont);
            $("#contrata_editar").val(responses.data[0].varRazCont);
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
            $('#grid2').jqxGrid('showloadelement');
            $("#grid2").jqxGrid({
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
                                                    var count = $("#grid2").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Descripción', datafield: 'varDescripcion', width: '12%'},
                    {text: 'Cantidad', datafield: 'Cantidad', width: '7%'},
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
function ver_listar_elementos(cod_paq) {
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
function listar_elementos_planos(cod_paq) {

    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_list_codi_grup_sele_visu_plan',

        dataType: 'json',
        data: {
            intIdProyPaquete: parseInt(cod_paq)
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
                            {name: 'deciArea', type: 'float'},
                            {name: 'deciPesoNeto', type: 'float'},
                            {name: 'deciPesoBruto', type: 'float'},
                            {name: 'varDescripcion', type: 'string'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid3").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                editable: true,
                selectionmode: 'checkbox',
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: 'Elemento', datafield: 'Codigo', width: '15%', aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid3").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Descripción', datafield: 'varDescripcion', width: '27%'},
                    {text: 'Cantidad', datafield: 'Cantidad', width: '7%'},
                    {text: 'Peso Neto', datafield: 'deciPesoNeto', width: '15%'},
                    {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: '15%'},
                    {text: 'Area', datafield: 'deciArea', width: '18%'}

                ]
            });
            $("#grid3").jqxGrid('localizestrings', localizationobj);
        }
    });
}
function guardar_asig_grup(cod_ot, cod_pro, cod_cont, fecha_ini, fecha_fin, cod_paq) {

    let user = obtener_user();
    if (fecha_ini > fecha_fin)
    {
        mensaje(false, "La fecha inicio no debe ser mayor a la fecha de termino", "no");
    } else {
        $("#modal-cargar-partlist").modal('show');
        $.ajax({
            type: 'POST',
            url: url + '/Asignaciones/public/index.php/guar_asig_grupo',
            dataType: 'json',
            data: {
                v_intIdproy: parseInt(cod_ot),
                v_intIdTipoProducto: parseInt(cod_pro),
                v_intIdPaque: parseInt(cod_paq),
                v_intIdArmad: parseInt(cod_cont),
                v_dttFeInici: fecha_ini,
                v_dttFeFin: fecha_fin,
                v_Usuario: user
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                }
            },
            success: function (responses) {
                if (responses.data.mensaje === "") {
                    listar_agrupadores(codigoot, codigoproducto, zona_ruta, codigo_tarea, codigo_paquete, codigo_planta, codigo_estados);
                    mensaje(true, "Se guardo correctamente", "modal-cargar-partlist");
                    $("#close_editar").trigger('click');
                } else {
                    mensaje(false, responses.data.mensaje, "no");
                }
            }
        });
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
function planos(elementos, cod_ot, zona) {
    ot_pdf = "";
    zona_pdf = "";
    user_pdf = "";
    let user = obtener_user();
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'POST',
        url: 'planos',
        dataType: 'json',
        data: {
            elementos: elementos,
            cod_ot: cod_ot,
            zona: zona,
            user: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            console.log(responses);
            ot_pdf = responses.ot;
            zona_pdf = responses.zona;
            user_pdf = responses.user;
            if (responses.mensaje === "ERROR") {
                $("#url").attr('src', url + '/Planos/Proyecto/' + responses.ot + '/Zonas/' + responses.zona + '/GLOBALES' + '/' + responses.user + '.pdf');
                $("#link").attr('target', '_blank').attr('href', url + '/Planos/Proyecto/' + responses.ot + '/Zonas/' + responses.zona + '/GLOBALES' + '/' + responses.user + '.pdf');
                mensaje(false, "No se encuentran " + responses.elementos, "no");
                $("#modal-pdf").modal('show');
            } else {
                $("#link").attr('target', '_blank').attr('href', url + '/Planos/Proyecto/' + responses.ot + '/Zonas/' + responses.zona + '/GLOBALES' + '/' + responses.user + '.pdf');
                $("#url").attr('src', url + '/Planos/Proyecto/' + responses.ot + '/Zonas/' + responses.zona + '/GLOBALES' + '/' + responses.user + '.pdf');
                $("#modal-pdf").modal('show');
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
