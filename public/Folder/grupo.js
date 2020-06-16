var data = [];
var dataAdapter = "";
var codigoot = "";
var codigoproducto = "";
var codigopaquete = "";
var codigo_tipo_etapa = "";
var codigo_tarea = "";
var codigoarmadores = "";
var codigo_etapa = "";
var codigo_elemento = "";
var checkedItems = "";
var checkedItems_paquete = "";
var checkedItems_tarea = "";
var checkedItems_tipo_etapa = "";
var checkedItems_etapa = "";
var labelcodot = "";
var labelcodproducto = "";
function dropDownlist() {
    $("#tarea").jqxDropDownList({checkboxes: true, width: 200, height: 30, placeHolder: "Seleccione", });
    $("#paquete").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione", });
    $("#armador").jqxComboBox({width: 200, height: 30, placeHolder: "Seleccione", });
}
$("#txt_ot").on('change', function (event) {
    codigoot = "";
    labelcodot = "";
    //$("#tarea").jqxDropDownList({checkboxes: true, width: 200, height: 30, placeHolder: "Seleccione" });
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            labelcodot = item.label;
        }
    }
    if (codigoproducto) {
        listar_tarea(codigoproducto, codigoot);
    }
});
$("#producto").on('change', function (event) {
    codigoproducto = "";
    labelcodproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
            labelcodproducto = item.label;
        }
    }
    if (codigoot) {
        listar_tarea(codigoproducto, codigoot);
        $("#tarea").jqxDropDownList({
            selectedIndex: -1
        });
    }
});
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
        }
    }
    if (checkedItems_tarea) {
        listar_paquete(codigoot, codigoproducto, codigo_tarea);
    }
});
$("#paquete").on('change', function (event) {
    codigopaquete = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigopaquete = item.value;
        }
    }
    if (codigopaquete) {
        listar_armador(codigoot, codigoproducto, item.value);
    } else {
        $("#paquete").jqxComboBox({
            selectedIndex: -1
        });
    }
});
$("#armador").on('change', function (event) {
    codigoarmadores = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoarmadores = item.value;
        }
    }
    if (codigoarmadores) {
        codigoarmadores = "";
    } else {

    }
});
$("#btn_busc").on('click', function () {
    buscar('1');
});
$("#close").click(function () {
    $('#modal-lista-series-ot').modal('hide');
    listar_limpiar_serie();
});
$("#limpiar").click(function () {
    $("#tarea").jqxDropDownList('uncheckAll');
    $("#tarea").jqxDropDownList('checkIndex', 0);
    $("#armador").jqxDropDownList('clear');
    //$("#tarea").jqxDropDownList('selectIndex', 0);
    $("#paquete").jqxDropDownList('selectIndex', 0);
    $("#producto").jqxDropDownList('selectIndex', 0);
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
            //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

            $("#producto").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30, });
            // Focus the jqxDropDownList
            $("#producto").jqxDropDownList('focus');
            $("#producto").jqxDropDownList('selectIndex', 0);
            /*
             va = '<option value="" disabled="" selected="" class="form-control-sm">Seleccione</option>'
             for (var c = 0; c < responses.data.length; c++) {
             //Seleccionamos el select
             va += '<option value="' + responses.data[c].intIdTipoProducto + '">' + responses.data[c]
             .varDescTipoProd + '</option>';
             $("#producto").html(va);
             }*/
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
                $("#paquete").jqxComboBox('clear');
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
                if (responses.data.mensaje === "error") {
                    alert('ingresa');
                    $("#paquete").jqxComboBox('clear');
                } else {
                    responses.data.push({intIdProyPaquete: -1, varCodigoPaquete: "TODOS"});
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
                    $("#paquete").jqxComboBox({source: dataAdapter, selectionMode: 'dropDownList', displayMember: "varCodigoPaquete", valueMember: "intIdProyPaquete", width: 200, height: 30});
                    $("#paquete").jqxComboBox('selectIndex', 0);
                }
            }
        });
    }
}
function listar_armador(id_proyecto, id_producto, id_paquete) {
    var array_codigo_elmento = new Array();
    if (id_proyecto != "" && id_producto != "", id_paquete != "") {

        $.ajax({
            type: 'POST',
            url: url + '/Asignaciones/public/index.php/vali_arma_con_proy_paqu',
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
                    $("#armador").jqxDropDownList('clear');
                } else {
                    $("#armador").jqxDropDownList('clear'); //modifico andy 
                    if (responses.data.length > 0) {
                        codigoarmadores = responses.data.intIdArmadores;
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
                                        {name: 'intIdArmadores'},
                                        {name: 'nombre'}
                                    ],
                                    async: false
                                };
                        var dataAdapter = new $.jqx.dataAdapter(source);
                        $("#armador").jqxDropDownList({source: dataAdapter, displayMember: "nombre", valueMember: "intIdArmadores", width: 200, height: 30});
                    } else {
                        codigoarmadores = "";
                        $("#armador").jqxDropDownList({
                            selectedIndex: -1
                        });
                    }

                }

            }
        });
    }
}
function color(val) {
    buscar(val);
}
function buscar(colors) {
    var arma = $("#armador").val();


    if (codigo_tarea === "" || codigo_tarea === null) {
        codigo_tarea = "-1";
    }
    if (codigopaquete === "" || codigopaquete === null) {
        codigopaquete = "-1";
    }
    if (codigoarmadores === "" || codigoarmadores === null || arma === "") {
        codigoarmadores = "-1";
    }
    if (codigoot) {
        if (codigoproducto) {
            if (codigo_tarea) {
                if (codigopaquete) {
                    if (codigoarmadores) {
                        if (colors) {
                            $.ajax({
                                type: 'POST',
                                url: url + '/GestionReportes/public/index.php/segu_grup',
                                dataType: 'json',
                                data: {
                                    intIdProy: codigoot,
                                    intIdTipoProducto: codigoproducto,
                                    intIdProyTarea: codigo_tarea,
                                    intIdProyPaquete: codigopaquete,
                                    intIdArmadores: codigoarmadores,
                                    color_busqueda: colors
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    if (thrownError == "Internal Server Error") {
                                        // listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte);
                                    }
                                },
                                success: function (responses) {
                                    if (responses.data.data.length > 0) {
                                        $("#gantt_here").removeClass('hidde_grid');
                                        gantt.config.work_time = true;
                                        gantt.config.scale_unit = "day";
                                        gantt.config.date_scale = "%D, %d";
                                        gantt.config.min_column_width = 60;
                                        gantt.config.duration_unit = "day";
                                        gantt.config.scale_height = 20 * 3;
                                        gantt.config.row_height = 30;
                                        gantt.config.date_format = "%Y-%m-%d";
                                        gantt.config.readonly = true;
                                        gantt.templates.grid_header_class = function (columnName, column) {
                                            return "";
                                        };

                                        function getDropdownNode() {
                                            return document.querySelector("#gantt_dropdown");
                                        }

                                        gantt.$showDropdown = function (node) {
                                            var position = node.getBoundingClientRect();
                                            var dropDown = getDropdownNode();
                                            dropDown.style.top = position.bottom + "px";
                                            dropDown.style.left = position.left + "px";
                                            dropDown.style.display = "block";
                                            dropDown.keep = true;
                                            setTimeout(function () {
                                                dropDown.keep = false;
                                            })
                                        }
                                        gantt.$hideDropdown = function () {
                                            var dropDown = getDropdownNode();
                                            dropDown.style.display = "none";
                                        }
                                        /*
                                         window.addEventListener("click", function (event) {
                                         if (!event.target.closest("#gantt_dropdown") && !getDropdownNode().keep) {
                                         gantt.$hideDropdown();
                                         }
                                         })*/

                                        var colHeader = '<div class="gantt_grid_head_cell gantt_grid_head_add" onclick="gantt.createTask()"></div><div class="gantt-dropdown" onclick="gantt.$showDropdown(this)">&#9660;</div>';

                                        gantt.config.columns = [
                                            {name: "nomb_paqu", width: 60, resize: true, label: "Grupos"},
                                            {name: "contratistas", align: "center", width: 250, resize: true, label: "Contratistas"}

                                        ];
                                        gantt.init("gantt_here");
                                        gantt.clearAll();
                                        gantt.parse(responses.data);
                                    } else {
                                        gantt_here
                                        $("#gantt_here").addClass('hidde_grid');
                                        //destroyer();
                                    }

                                }
                            });
                        }
                    } else {
                        mensaje(false, "Seleccione un Armador");
                    }
                } else {
                    mensaje(false, "Seleccione un GRUPO");
                }
            } else {
                mensaje(false, "Seleccione una PROGRAMA");
            }
        } else {
            mensaje(false, "Seleccione un TIPO ELEMENTO");
        }
    } else {
        mensaje(false, "Seleccione una OT");
    }

}
gantt.attachEvent("onTaskClick", function (id, e) {
    $("#ot_ver").val(labelcodot);
    $("#pro_ver").val(labelcodproducto);
    listar_elementos(id);
    ver_reporte_grupo(codigoot, codigoproducto, id);
    $("#modal-ver-grupos").modal('show');
});
function ver_reporte_grupo(ot, pro, paq) {

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
                $("#inicio").addClass('hidde_grid');
                $("#fech_inic_grup_ver").val(año + '-' + mes_inicio + '-' + dia_ultimo);
            } else {
                $("#inicio").removeClass('hidde_grid');
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
                $("#termino").addClass('hidde_grid');
                $("#fech_fin_grup_ver").val(año_fin + '-' + mes_ultimo + '-' + dia_ultimo_fin);

            } else {
                $("#termino").removeClass('hidde_grid');
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
                height: '300',
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

$("#exportar_execel_grupos").on('click', function () {
    var json = gantt.serialize();
    if (json.data.length > 0) {
        var array_export = [];
        for (var i = 0; json.data.length > i; i++) {
            if (json.data[i].Estaod === 'TERMINADO CON DEMORA' || json.data[i].Estaod === 'ATRASADO') {
                var row = {'CONTRATISTA': json.data[i].contratistas, 'GRUPO': json.data[i].nomb_paqu, 'FECHA INICIO': json.data[i].start_date, 'FECHA FINAL': json.data[i].debi_fina, 'FECHA TERMINO REAL': json.data[i].Fecha_final, 'ESTADO': json.data[i].Estaod};
            } else {
                var row = {'CONTRATISTA': json.data[i].contratistas, 'GRUPO': json.data[i].nomb_paqu, 'FECHA INICIO': json.data[i].start_date, 'FECHA FINAL': json.data[i].Fecha_final, 'FECHA TERMINO REAL': json.data[i].debi_fina, 'ESTADO': json.data[i].Estaod};
            }
            array_export.push(row);
        }
        var json_ifnal = JSON.stringify(array_export);
        JSONToCSVConvertor(json_ifnal, "REPORTE DE SEGUIMIENTO DE GRUPOS", true);
    } else {
        mensaje(false,"No hay data para exportar","no");
    }
});