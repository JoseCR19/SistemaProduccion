var codigoproducto = "";
var labelproducto = "";
var codigoot = "";
var labelot = "";
var check_programa = "";
var check_zona = "";
var id_combo_cabina = "";
var id_lote_pintura = "";
var id_contratista = "";
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var day_next = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia = moment(firstDay).format('YYYY-MM-DD');
$('#fech_inic_lote_pint').val(primerdia);
$('#fech_fin_lote_pint').val(today);

$("#txt_ot").on('change', function (event) {
    $('#txt_ot').jqxDropDownList('clearFilter');
    codigoot = "";
    labelot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            labelot = item.label;
            sistema_pintura(codigoot, codigoproducto);
        }
    }
});
$("#producto").on('change', function (event) {
    codigoproducto = "";
    labelproducto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
            labelproducto = item.label;
            sistema_pintura(codigoot, codigoproducto);
        }
    }
});
$("#tipo_ot").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            listar_data_list_proyectos(item.value);
        }
    }
});

$("#cabina_segui_pintura").on('change', function (event) {
    id_combo_cabina = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            id_combo_cabina = item.value;
        }
    }
});
$("#contratista").on('change', function (event) {
    id_contratista = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            id_contratista = item.value;
        }
    }
});
$("#lote_pintura").on('change', function (event) {
    id_lote_pintura = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            id_lote_pintura = item.value;
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
            responses.data.push({'varCodiProy': 'TODOS', 'intIdproy': -1});
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
function combo_cabina() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/listar_cabina',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            responses.data.push({'intIdCabina': -1, 'varCabina': 'TODOS'});
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "json",
                        datafields: [
                            {name: 'intIdCabina'},
                            {name: 'varCabina'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#cabina_segui_pintura").jqxDropDownList({source: dataAdapter, displayMember: "varCabina", valueMember: "intIdCabina", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
            $("#cabina_segui_pintura").jqxDropDownList('focus');
            $("#cabina_segui_pintura").jqxDropDownList('selectIndex', 0);


        }
    });
}
function combo_cantratista() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/combo_contratista',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            responses.data.push({'intIdCont': -1, 'varRazCont': 'TODOS'});
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "json",
                        datafields: [
                            {name: 'intIdCont'},
                            {name: 'varRazCont'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#contratista").jqxDropDownList({source: dataAdapter, displayMember: "varRazCont", valueMember: "intIdCont", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
            $("#contratista").jqxDropDownList('focus');
            $("#contratista").jqxDropDownList('selectIndex', 0);
        }
    });
}
function sistema_pintura(ot, pro) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_pintura',
        dataType: 'json',
        data: {intIdProy: ot, intIdTipoProducto: pro},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if ($("#txt_ot").val() === '-1') {
                responses.data.push({'intIdLotePintura': -1, 'Codigo': 'TODOS'});
            } else if (responses.data.length > 0) {
                responses.data.push({'intIdLotePintura': -1, 'Codigo': 'TODOS'});
            }
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "json",
                        datafields: [
                            {name: 'intIdLotePintura'},
                            {name: 'Codigo'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#lote_pintura").jqxDropDownList({source: dataAdapter, displayMember: "Codigo", valueMember: "intIdLotePintura", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
            $("#lote_pintura").jqxDropDownList('focus');
            $("#lote_pintura").jqxDropDownList('selectIndex', 0);
        }
    });
}
$("#btn_busc").on('click', function () {
    buscar('1');
});
$("#limpiar").click(function () {

    $("#txt_ot").jqxDropDownList('clearFilter');
    $("#txt_ot").jqxDropDownList('selectIndex', 0);
    $("#tipo_ot").jqxDropDownList('selectIndex', 0);
    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#cabina_segui_pintura").jqxDropDownList('selectIndex', 0);
    $("#lote_pintura").jqxDropDownList('selectIndex', 0);
    $("#contratista").jqxDropDownList('selectIndex', 0);
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var day_next = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    var primerdia = moment(firstDay).format('YYYY-MM-DD');
    $('#fech_inic_lote_pint').val(primerdia);
    $('#fech_fin_lote_pint').val(today);
    $("#gantt_here").addClass('hidde_grid');

});
function color(val) {
    buscar(val);
}
function buscar(colors) {
    var arma = $("#armador").val();
    var fecha_inicio = $("#fech_inic_lote_pint").val();
    var fecha_fin = $("#fech_fin_lote_pint").val();
    if (codigoot) {
        if (codigoproducto) {
            if (id_combo_cabina) {
                if (id_lote_pintura) {
                    if (id_contratista) {
                        if (fecha_inicio) {
                            if (fecha_fin) {
                                if (fecha_inicio < fecha_fin) {
                                    if (colors) {
                                        $.ajax({
                                            type: 'POST',
                                            url: url + '/GestionReportes/public/index.php/segui_pintura',
                                            dataType: 'json',
                                            data: {
                                                intIdProy: codigoot,
                                                intIdTipoProducto: codigoproducto,
                                                intIdCabina: id_combo_cabina,
                                                intIdLotePintura: id_lote_pintura,
                                                intIdCont: id_contratista,
                                                fechainicio: fecha_inicio,
                                                fechafin: fecha_fin,
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
                                                        {name: "ot", width: 60, resize: true, label: "OT"},
                                                        {name: "nomb_paqu", width: 60, resize: true, label: "Lote Pintura"},
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
                                    mensaje(false, "La fecha fin no debe ser menor a la fecha inicio");
                                }
                            } else {
                                mensaje(false, "Seleccione un FECHA FIN");
                            }
                        } else {
                            mensaje(false, "Seleccione un FECHA INICIO");
                        }
                    } else {
                        mensaje(false, "Seleccione un CONTRATISTA");
                    }

                } else {
                    mensaje(false, "Seleccione un LOTE PINTURA");
                }
            } else {
                mensaje(false, "Seleccione una CABINA");
            }
        } else {
            mensaje(false, "Seleccione un TIPO ELEMENTO");
        }
    } else {
        mensaje(false, "Seleccione una OT");
    }
}
gantt.attachEvent("onTaskClick", function (id, e) {
    listar_cabecera(id)
    listar_elementos(id);
    $("#modal-ver-lotes").modal('show');
});
function listar_cabecera(id) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/cabecera_seguimiento',

        dataType: 'json',
        data: {
            intIdLotePintura: id
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte);
            }
        },
        success: function (responses) {
            $("#lote_ver").val(responses.data[0].Codigo);
            $("#sistema_ver").val(responses.data[0].varLotePintura);
            $("#ot_ver").val(responses.data[0].varCodiProy);
            $("#pro_ver").val(responses.data[0].varDescTipoProd);
            $("#contrata_ver").val(responses.data[0].varRazCont);
            $("#cabina_ver").val(responses.data[0].varCabina);
            $("#cant_elem_ver").val(responses.data[0].intCantidad);
            $("#peso_ver").val(responses.data[0].deciPesoNeto);
            $("#fech_inic_ver").val(responses.data[0].dateFechInic);
            $("#fech_fin_ver").val(responses.data[0].dateFechFin);
            $("#fech_term_ver").val(responses.data[0].dateFechFinReal);
            listar_pintores(responses.data[0].varPintor);
        }
    });
}
function listar_pintores(id) {
    var pintores = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_pintores',
        dataType: 'json',
        data: {
            colaboradores: id

        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                $("#ocultar_pintor").removeClass('hidde_grid');
                for (var i = 0; responses.data.length > i; i++) {
                    var row = {'intIdColaborador': responses.data[i]['intIdColaborador'], 'Nombre': responses.data[i]['varNombColabo'] + ' ' + responses.data[i]['varApelColabo']};
                    pintores.push(row);
                }
                var source =
                        {
                            localdata: pintores,
                            datatype: "json",
                            datafields: [
                                {name: 'intIdColaborador'},
                                {name: 'Nombre'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#pintores").jqxDropDownList({source: dataAdapter, displayMember: "Nombre", valueMember: "intIdColaborador", width: 250, height: 37, placeHolder: "SELECCIONAR:"});
                $("#pintores").jqxDropDownList('focus');
                $("#pintores").jqxDropDownList('selectIndex', 0);
            } else {
                $("#ocultar_pintor").addClass('hidde_grid');
            }

        }
    });
}
function listar_elementos(id) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/detalle_pintura',
        dataType: 'json',
        data: {
            intIdLotePintura: id
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
                                                    total = parseFloat(record['TotalPesoNeto']) + parseFloat(aggregatedValue);
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
                                                    total = parseFloat(record['TotalPesoBruto']) + parseFloat(aggregatedValue);
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
$("#exportar_execel_grupos").on('click', function () {
    var json = gantt.serialize();
    if (json.data.length > 0) {
        var array_export = [];
        for (var i = 0; json.data.length > i; i++) {
            if (json.data[i].Estaod === 'TERMINADO CON DEMORA' || json.data[i].Estaod === 'ATRASADO') {
                var row = {'CONTRATISTA': json.data[i].contratistas, 'LOTE PINTURA': json.data[i].nomb_paqu, 'FECHA INICIO': json.data[i].start_date, 'FECHA FINAL': json.data[i].debi_fina, 'FECHA TERMINO REAL': json.data[i].Fecha_final, 'ESTADO': json.data[i].Estaod};
            } else {
                var row = {'CONTRATISTA': json.data[i].contratistas, 'LOTE PINTURA': json.data[i].nomb_paqu, 'FECHA INICIO': json.data[i].start_date, 'FECHA FINAL': json.data[i].Fecha_final, 'FECHA TERMINO REAL': json.data[i].debi_fina, 'ESTADO': json.data[i].Estaod};
            }
            array_export.push(row);
        }
        var json_ifnal = JSON.stringify(array_export);
        JSONToCSVConvertor(json_ifnal, "REPORTE DE SEGUIMIENTO DE PINTURA", true);
    } else {
        mensaje(false, "No hay data para exportar", "no");
    }
});
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