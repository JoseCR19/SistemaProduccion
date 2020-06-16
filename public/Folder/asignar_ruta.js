/* global checkedItems_codigo, checkedItems_zona */
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
var exportar_data = 0;
$("#excel_lista_ruta").click(function () {
    if (exportar_data === 0) {
        mensaje(false, "No hay data para exportar", "no");
    } else {
        var data = $("#grid").jqxGrid('exportdata', 'json');
        JSONToCSVConvertor(data, "Lista Rutas", true);
    }
});
function dropDownlist() {
    $("#tarea").jqxDropDownList({checkboxes: true, width: 200, height: 30});
    $("#paquete").jqxDropDownList({checkboxes: true, width: 200, height: 30});
    $("#ruta_combo").jqxDropDownList({checkboxes: true, width: 200, height: 30});
    $("#ruta_combo_2").jqxComboBox({width: 200, height: 30});
    $("#zona").jqxDropDownList({width: 200, height: 30});
}
$("#txt_ot").on('change', function (event) {
    $("#codigo").jqxDropDownList('clear');
    $("#tarea").jqxDropDownList('clear');
    $("#ruta_combo").jqxDropDownList('clear');
    $("#zona").jqxDropDownList('clear');
    $("#paquete").jqxDropDownList('clear');
    codigoot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
        }
    }
    if (codigoproducto) {
        listar_zona(codigoproducto, codigoot);
        listar_ruta(codigoproducto, codigoot);
    } else {

    }
});
$("#asiganar_ruta").on('click', function () {
    $("#ruta_combo_2").jqxComboBox('clearSelection', true);
    document.getElementById('ruta_descripcion').innerHTML = "";
    $("#grid2").jqxGrid('clear');
    $("#grid2").jqxGrid('refresh');
    $("#grid3").jqxGrid('clearselection');
    $("#grid3").jqxGrid('clear');

    $("#grid3").jqxGrid('refresh');
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {
        var index_etapa = [];
        var etapa_actual = [];
        var situacion = [];
        var textData = new Array();
        for (var i = 0; i < rowindex.length; i++) {
            textData[i] = $('#grid').jqxGrid('getrowdata', rowindex[i]);
            index_etapa.push(textData[i]['intIdRuta']);
            etapa_actual.push(textData[i]['EtapaActual']);
            situacion.push(textData[i]['estado']);
        }
        Array.prototype.unique = function (a) {
            return function () {
                return this.filter(a)
            }
        }(function (a, b, c) {
            return c.indexOf(a, b + 1) < 0
        });
        var despacho = etapa_actual.unique();
        var estado = situacion.unique();
        if (index_etapa.unique().length === 1) {
            if (despacho[0] !== "DESPACHO") {
                listar_grid_para_asignar(textData, index_etapa);
            } else {
                if (estado.length === 1) {
                    if (estado[0] !== "TERMINADO" || estado[0] !== "ANULADO") {
                        listar_grid_para_asignar(textData, index_etapa);
                    } else {
                        mensaje(false, "La etapa actual del elemento es despacho y la situación es Terminado no se puede modificar la ruta.");
                    }
                } else {
                    mensaje(false, "Uno o más Elementos seleccionados tienen diferente situación", "no");
                }
            }
        } else {
            mensaje(false, "Uno o más Elementos seleccionados tienen una ruta direferente.");
        }
    } else {
        mensaje(false, "Debe Seleccionar antes de Asignar.", "no");
    }
});
$("#ruta_combo_2").on('change', function (event) {
    id_ruta = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            id_ruta = item.value;
        }
    }
    if (id_ruta) {
        listar_ruta_descripcion(id_ruta);
    } else {

    }
});
$("#producto").on('change', function (event) {
    $("#codigo").jqxDropDownList('clear');
    $("#tarea").jqxDropDownList('clear');
    $("#ruta_combo").jqxDropDownList('clear');
    $("#zona").jqxDropDownList('clear');
    $("#paquete").jqxDropDownList('clear');
    codigoproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
        }
    }
    if (codigoot) {
        listar_zona(codigoproducto, codigoot);
        listar_ruta(codigoproducto, codigoot);
    } else {
    }
});
$("#ruta_combo").on('checkChange', function (event) {
    ruta_combo = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_ruta = item.value;
            var items = $("#ruta_combo").jqxDropDownList('getCheckedItems');
            ruta_combo = "";
            $.each(items, function (index) {
                ruta_combo += this.value + ",";
            });
        }
    }
});
$("#zona").on('change', function (event) {
    zona_ruta = "";
    /*
     if (event.args) {
     var item = event.args.item;
     if (item) {
     var items = $("#zona").jqxDropDownList('getCheckedItems');
     check_items_zona = [];
     $.each(items, function (index) {
     zona_ruta = "";
     check_items_zona.push(parseInt(this.value.trim()));
     zona_ruta += this.value + ",";
     });
     }
     }*/
    if (event.args) {
        var item = event.args.item;
        if (item) {
            zona_ruta = item.value;
        }
    }
    if (zona_ruta) {
        listar_tarea(codigoproducto, codigoot, zona_ruta);
    }
});
$("#tarea").on('checkChange', function (event) {
    $("#paquete").jqxDropDownList('clear');
    codigo_tarea = "";
    tarea_array = [];
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_tarea = item.value;
            var items = $("#tarea").jqxDropDownList('getCheckedItems');
            checkedItems_tarea = "";
            tarea_array = [];
            $.each(items, function (index) {
                checkedItems_tarea += this.value + ",";
                tarea_array.push(this.value);
            });
        }
    }
    if (tarea_array) {

        listar_paquete(codigoproducto, codigoot, tarea_array);
    }
});
$("#paquete").on('checkChange', function (event) {
    codigopaquete = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigopaquete = item.value;
            var items = $("#paquete").jqxDropDownList('getCheckedItems');
            checkedItems_paquete = "";
            $.each(items, function (index) {
                checkedItems_paquete += this.value + ",";
            });
        }
    }
});
$("#limpiar").on('click', function () {
    limpiar();
});
$("#buscar_lista_rutas").click(function () {
    $("#ruta_combo_2").jqxDropDownList('clear');
    var codigo_elemento = $("#codigo").val().trim().toUpperCase();
    var codigo_elemento_final = "";
    if (codigo_elemento === "") {
        codigo_elemento_final = -1;
    } else {
        separador = ",";
        arregloDeSubCadenas = codigo_elemento.split(separador);
        for (var i = 0; i < arregloDeSubCadenas.length; i++) {
            codigo_elemento_final += arregloDeSubCadenas[i].trim() + ",";
        }
    }
    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
    var zona = "";
    var ruta = "";
    var tarea = "";
    var paquete = "";
    var zona = "";
    var ruta = "";
    var tarea = "";
    var paquete = "";
    if (zona_ruta === '-1,') {
        zona = -1;
    } else if (zona_ruta === '') {
        zona = -1;
    } else {
        zona = zona_ruta.replace(/ /g, "");
    }
    if (ruta_combo === '-1,') {
        ruta = -1;
    } else if (ruta_combo === '') {
        ruta = -1;
    } else {
        ruta = ruta_combo.replace(/ /g, "");
    }
    if (checkedItems_tarea === '-1,') {
        tarea = -1;
    } else if (checkedItems_tarea === '') {
        tarea = -1;
    } else {
        tarea = checkedItems_tarea.replace(/ /g, "");
    }
    if (checkedItems_paquete === '-1,') {
        paquete = -1;
    } else if (checkedItems_paquete === '') {
        paquete = -1;
    } else {
        paquete = checkedItems_paquete.replace(/ /g, "");
    }
    if (codigoot) {
        if (codigoproducto) {
            listar_rutas_asignadas(codigoproducto, codigoot, zona, tarea, paquete, ruta, codigo_elemento_final, reporte);
        } else {
            mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
        }
    } else {
        mensaje(false, "Seleccione una O.T", "no");
    }

});
$("#registrar_rutas_asignadas").click(function () {

    if (id_ruta) {

        var data = $("#grid3").jqxGrid('exportdata', 'json');

        asignar_ruta_elementos(data, id_ruta, codigoot, codigoproducto);
    } else {
        mensaje(false, "Debe seleccionar una ruta", "no");
    }
});
$("#cerrar_inferior").on('click', function () {
    $("#modal-asignar-ruta").modal('hide');

});
$("#cerrar_modal_asig_ruta").on('click', function () {
    $("#modal-asignar-ruta").modal('hide');
});
$("#cerrar_inferior_errores").on('click', function () {
    $("#modal-errores-asignar-ruta").modal('hide');
});
$("#cerrar_modal_asig_ruta_errores").on('click', function () {
    $("#modal-errores-asignar-ruta").modal('hide');
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
            if (thrownError == "Internal Server Error") {

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

            }
        },
        success: function (responses) {
            if (responses.data.mensaje == "Error.") {
                $("#zona").jqxDropDownList('clear');
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
        url: url + '/GestionPartList/public/index.php/list_tare_asoc_proy_sin_array',
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
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#tarea").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30});
                $("#tarea").jqxDropDownList('checkIndex', 0);
                $("#tarea").jqxDropDownList('focus');
            }
        }
    });
}
function listar_ruta(codigo_producto, codigo) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/mues_ruta_asoc_tipo_prod',
        dataType: 'json',
        data: {
            intIdProy: codigo,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "Error.") {
                $("#ruta_combo").jqxDropDownList('clear');
                $("#ruta_combo_2").jqxComboBox('clear');
            } else {
                var jsonN1 = "";
                var result1 = [];

                for (const i in responses.data) {
                    result1.push(responses.data[i]);
                }
                jsonN1 = result1.reverse();
                var removed = jsonN1.splice(2);

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
                                {name: 'intIdRuta'},
                                {name: 'varNombre'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                var source2 =
                        {
                            localdata: removed,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdRuta'},
                                {name: 'varNombre'}
                            ],
                            async: false
                        };
                var dataAdapter2 = new $.jqx.dataAdapter(source2);
                $("#ruta_combo").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varNombre", valueMember: "intIdRuta", width: 200, height: 30});
                $("#ruta_combo_2").jqxComboBox({source: dataAdapter2, selectionMode: 'dropDownList', displayMember: "varNombre", valueMember: "intIdRuta", width: 200, height: 30});
                $("#ruta_combo_2").jqxComboBox('focus');
                $("#ruta_combo").jqxDropDownList('checkIndex', 0);
                $("#ruta_combo").jqxDropDownList('focus');
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

            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "Error.") {
                $("#paquete").jqxDropDownList('clear');
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
function listar_rutas_asignadas(codigo_producto, codigo_ot, cod_zona, cod_tarea, cod_paquete, cod_ruta, cod_elementos, tipo_ruta) {
    $('#grid').jqxGrid('clear');
    $('#grid').jqxGrid('clearselection');
    $("#grid").jqxGrid('refresh');
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_elem_asig_ruta',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            intIdProyZona: cod_zona,
            intIdProyTarea: cod_tarea,
            intIdProyPaquete: cod_paquete,
            intIdRuta: cod_ruta,
            strCodigos: cod_elementos,
            Tiporuta: tipo_ruta
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
                exportar_data = 1;
            } else {
                exportar_data = 0;
            }
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'Area', type: 'float'},
                            {name: 'Cod_Val', type: 'string'},
                            {name: 'Codigo', type: 'string'},
                            {name: 'EtapaActual', type: 'string'},
                            {name: 'EtapaAnterior', type: 'string'},
                            {name: 'EtapaSiguiente', type: 'string'},
                            {name: 'IdPaquete', type: 'number'},
                            {name: 'IdTarea', type: 'number'},
                            {name: 'IdZona', type: 'number'},
                            {name: 'Longitud', type: 'float'},
                            {name: 'Modelo', type: 'string'},
                            {name: 'Nombre', type: 'string'},
                            {name: 'Paquete', type: 'string'},
                            {name: 'Perfil', type: 'string'},
                            {name: 'Peso_Bruto', type: 'float'},
                            {name: 'Peso_Contr', type: 'float'},
                            {name: 'Peso_Neto', type: 'float'},
                            {name: 'Precio', type: 'float'},
                            {name: 'Reproc', type: 'number'},
                            {name: 'Rev', type: 'number'},
                            {name: 'Ruta', type: 'string'},
                            {name: 'Serie', type: 'number'},
                            {name: 'Tarea', type: 'string'},
                            {name: 'Zona', type: 'string'},
                            {name: 'estado', type: 'string'},
                            {name: 'flg_Despacho', type: 'string'},
                            {name: 'intIdRuta', type: 'number'},
                            {name: 'IDEelemento', type: 'number'},
                            {name: 'intIdEtapa', type: 'number'},
                            {name: 'intIdEtapaAnte', type: 'number'},
                            {name: 'intIdEtapaSiguiente', type: 'number'},
                            {name: 'NombreRuta', type: 'string'},
                            {name: 'tipoEstructurado', type: 'string'}
                        ],
                        async: false
                    };
            dataAdapter = new $.jqx.dataAdapter(source);


            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                selectionmode: 'checkbox',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: 'Grupo', datafield: 'Paquete', width: 80, aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Codigo', datafield: 'Codigo', width: 90},
                    {text: 'Serie', datafield: 'Serie', width: 70},
                    {text: 'Nombre', datafield: 'Nombre', width: 90},
                    {text: 'Zona', datafield: 'Zona', width: 120},
                    {text: 'Programa', datafield: 'Tarea', width: 70},
                    {text: 'Perfil', datafield: 'Perfil', width: 250},
                    {text: 'Modelo', datafield: 'Modelo', width: 250},
                    {text: 'Etapa Actual', datafield: 'EtapaActual', width: 250},
                    {text: 'Etapa Siguiente', datafield: 'EtapaSiguiente', width: 250},
                    {text: 'Etapa Anterior', datafield: 'EtapaAnterior', width: 250},
                    {text: 'Ruta', datafield: 'NombreRuta', width: 200},
                    {text: 'Descripcion Ruta', datafield: 'Ruta', width: 600},
                    {text: 'Tipo Estructura', datafield: 'tipoEstructurado', width: 250},
                    {text: 'Estado', datafield: 'estado', width: 250},
                    {text: 'Ruta', datafield: 'intIdRuta', width: '1%', hidden: true},
                    {text: 'Elemento', datafield: 'IDEelemento', width: '1%', hidden: true},
                    {text: 'actual', datafield: 'intIdEtapa', width: '1%', hidden: true},
                    {text: 'anterior', datafield: 'intIdEtapaAnte', width: '1%', hidden: true},
                    {text: 'siguiente', datafield: 'intIdEtapaSiguiente', width: '1%', hidden: true}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });
}
function listar_ruta_descripcion(id) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_desc_ruta',
        dataType: 'json',
        data: {
            intIdRuta: id
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            if (responses.data === null) {
                $("#id_ruta").val('');
                document.getElementById('ruta_descripcion').innerHTML = "";
            } else {
                $("#id_ruta").val(responses.data.intIdRuta);
                document.getElementById('ruta_descripcion').innerHTML = responses.data.varDescrip;
            }
        }
    });
}
function listar_grid_para_asignar(lista_etapa, id_ruta) {
    var source =
            {
                localdata: lista_etapa,
                datatype: "array",
                datafields: [
                    {name: 'Area', type: 'float'},
                    {name: 'Cod_Val', type: 'string'},
                    {name: 'Codigo', type: 'string'},
                    {name: 'EtapaActual', type: 'string'},
                    {name: 'EtapaAnterior', type: 'string'},
                    {name: 'EtapaSiguiente', type: 'string'},
                    {name: 'IdPaquete', type: 'number'},
                    {name: 'IdTarea', type: 'number'},
                    {name: 'IdZona', type: 'number'},
                    {name: 'Longitud', type: 'float'},
                    {name: 'Modelo', type: 'string'},
                    {name: 'Nombre', type: 'string'},
                    {name: 'Paquete', type: 'string'},
                    {name: 'Perfil', type: 'string'},
                    {name: 'Peso_Bruto', type: 'float'},
                    {name: 'Peso_Contr', type: 'float'},
                    {name: 'Peso_Neto', type: 'float'},
                    {name: 'Precio', type: 'float'},
                    {name: 'Reproc', type: 'number'},
                    {name: 'Rev', type: 'number'},
                    {name: 'Ruta', type: 'string'},
                    {name: 'Serie', type: 'string'},
                    {name: 'Tarea', type: 'string'},
                    {name: 'Zona', type: 'string'},
                    {name: 'estado', type: 'string'},
                    {name: 'flg_Despacho', type: 'string'},
                    {name: 'intIdRuta', type: 'string'},
                    {name: 'IDEelemento', type: 'string'},
                    {name: 'intIdEtapa', type: 'string'},
                    {name: 'intIdEtapaAnte', type: 'string'},
                    {name: 'intIdEtapaSiguiente', type: 'string'}
                ],
                async: false
            };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid3").jqxGrid({
        width: '100%',
        height: '200',
        source: dataAdapter,
        columnsresize: true,
        altrows: true,
        enabletooltips: true,
        theme: 'darkblue',
        showstatusbar: true,
        statusbarheight: 25,
        showaggregates: true,
        showgroupaggregates: true,
        columns: [
            {text: 'Id', datafield: 'IDEelemento', width: 70},
            {text: 'Codigo', datafield: 'Codigo', width: 90},
            {text: 'Serie', datafield: 'Serie', width: 70},
            {text: 'IdActual', datafield: 'intIdEtapa', width: 80},
            {text: 'Etapa Actual', datafield: 'EtapaActual', width: 265},
            {text: 'IdAnterior', datafield: 'intIdEtapaAnte', width: 80},
            {text: 'Etapa Anterior', datafield: 'EtapaAnterior', width: 265}

        ]
    });
    $("#grid3").jqxGrid('localizestrings', localizationobj);
    $("#ruta_combo_2").val(id_ruta[0]);
    $("#modal-asignar-ruta").modal('show');
}
function asignar_ruta_elementos(lista_elementos, ruta, ot, prod) {

    //$("#modal-cargar-ruta").modal('show');
    $.ajax({
        beforeSend: function () {
            $("#modal-cargar-ruta").modal('show');
        },
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/store_asig_ruta',
        dataType: 'json',
        data: {
            intIdProy: ot,
            intIdEleme: lista_elementos,
            intIdTipoProducto: prod,
            v_IdNuevaRuta: ruta
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data.length === 0) {
                mensaje(true, "Se asigno una Ruta al o los Elementos", "modal-cargar-ruta");
                $("#grid").jqxGrid('clearSelection');
                $("#buscar_lista_rutas").trigger('click');
                $("#cerrar_modal_asig_ruta").trigger('click');
            } else {
                mensaje(false, "Se encontró errores al Asignar una ruta al o los elementos", "modal-cargar-ruta");
                listar_errores(responses.data);
                //$("#grid").jqxGrid('clearSelection');
                $("#buscar_lista_rutas").trigger('click');
                $("#cerrar_modal_asig_ruta").trigger('click');
                //$("#modal-cargar-ruta").modal('hide');
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
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid2").jqxGrid({
        width: '100%',
        height: '200',
        source: dataAdapter,
        columnsresize: true,
        altrows: true,
        enabletooltips: true,
        theme: 'darkblue',
        columns: [
            {text: 'Mensajes', datafield: 'mensaje'}

        ]
    });
    $("#grid2").jqxGrid('localizestrings', localizationobj);
    $("#modal-errores-asignar-ruta").modal('show');
}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel)
{
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
function ExportToExcel(mytblId) {
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(mytblId));
}
function limpiar() {
    $("#grid").jqxGrid('clear');
    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#txt_ot").jqxComboBox('selectIndex', 0);
    //deseleccionamos todo
    $("#zona").jqxDropDownList('uncheckAll');
    //seleccionamos el primero por defecto
    $("#zona").jqxDropDownList('selectIndex', 0);
    $("#tarea").jqxDropDownList('uncheckAll');
    $("#tarea").jqxDropDownList('checkIndex', 0);
    $("#paquete").jqxDropDownList('uncheckAll');
    $("#paquete").jqxDropDownList('checkIndex', 0);
    $("#codigo").val('');
    $("#ruta_combo").jqxDropDownList('uncheckAll');
    $("#ruta_combo").jqxDropDownList('checkIndex', 0);
    document.getElementById("inlineRadio").checked = true;
    exportar_data = 0;

}