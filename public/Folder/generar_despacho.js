var codigoproducto = "";
var codigoot = "";
var check_zona = "";
var check_tarea = "";
var check_etapa = "";
var editrow = -1;
var elemento_id = "";
var modelo_combo = "";
var bulto_combo = "";
var codigo_combo = "";
var array_avance = [];
var var_valo = "";
var per_valo = "";
var cod_per_valo = "";
var bool_despacho = "";
var cod_tipo_etapa = "";
var idasig_etapa = "";
var exportar_data = 0;
var codigo_ot_label = "";
var cod_elemento = "";
function dropDownlist() {
    $("#zona").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#tarea").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#modelo").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#bulto").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#codigo_despacho").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
}
$("#excel_despacho").click(function () {

    if (exportar_data === 0) {
        mensaje(false, "No hay data para exportar", "no");
    } else {
        //var data = $("#grid").jqxGrid('getrows');
        var data = $("#grid").jqxGrid('exportData', 'json');

        JSONToCSVConvertor(data, "Lista Elementos", true);
    }
});
$("#producto").on('change', function (event) {
    codigoproducto = "";
    cod_elemento = "";
    console.log(event);
    if (event.args) {
        var item = event.args.item;
        console.log(item);

        if (item) {
            codigoproducto = item.value;
            cod_elemento = item.label;
        }
    }
    if (codigoproducto) {
        listar_zona(codigoproducto, codigoot);
        listar_modelo(codigoot, codigoproducto);
        listar_bulto(codigoot, codigoproducto);
    }
});
$("#codigo_despacho").on('checkChange', function (event) {
    codigo_combo = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            var items = $("#codigo_despacho").jqxDropDownList('getCheckedItems');
            codigo_combo = "";
            $.each(items, function (index) {
                codigo_combo += "'" + this.value + "',";
            });
        }
    }
});
$("#txt_ot").on('change', function (event) {
    codigoot = "";
    codigo_ot_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            periodo_valorizacion(32);
            codigoot = item.value;
            codigo_ot_label = item.label;
            //$("#producto").jqxDropDownList('selectIndex', 0);
            check_items_zona = [];
        }
    }
    if (codigoot) {
        listar_zona(codigoproducto, codigoot);
        listar_modelo(codigoot, codigoproducto);
        listar_bulto(codigoot, codigoproducto);
    }
});
$("#zona").on('change', function (event) {
    check_items_zona = [];
    check_zona = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_items_zona.push(parseInt(item.value));
            check_zona = item.value;
        }
    }
    if (check_items_zona) {
        listar_tarea(codigoproducto, codigoot, check_items_zona);
    } else {
        $("#tarea").jqxDropDownList('clear');
    }
});
$("#tarea").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_tarea = item.value;
        }
    }
});
$("#modelo").on('checkChange', function (event) {
    modelo_combo = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            var items = $("#modelo").jqxDropDownList('getCheckedItems');
            modelo_combo = "";
            $.each(items, function (index) {
                modelo_combo += "'" + this.value + "',";
            });
        }
    }
});
$("#bulto").on('checkChange', function (event) {
    bulto_combo = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            var items = $("#bulto").jqxDropDownList('getCheckedItems');
            bulto_combo = "";
            $.each(items, function (index) {
                bulto_combo += "'" + this.value + "',";
            });

        }
    }
    if (event.args.checked) {
        combo_despacho(codigoot, codigoproducto, bulto_combo);
    } else if (bulto_combo) {
        $("#codigo_despacho").jqxDropDownList('clear');
        combo_despacho(codigoot, codigoproducto, bulto_combo);
    } else {
        $("#codigo_despacho").jqxDropDownList('clear');
    }
});
$("#limpiar").on('click', function () {
    $("#txt_ot").jqxDropDownList('clearSelection');
    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#zona").jqxDropDownList('selectIndex', 0);
    $("#tarea").jqxDropDownList('selectIndex', 0);
    $("#modelo").jqxDropDownList('uncheckAll');
    $("#modelo").jqxDropDownList('checkIndex', 0);
    $("#bulto").jqxDropDownList('uncheckAll');
    $("#bulto").jqxDropDownList('checkIndex', 0);
    $("#codigo_despacho").jqxDropDownList('uncheckAll');
    $("#codigo_despacho").jqxDropDownList('checkIndex', 0);
    $("#grid").jqxGrid('clearSelection');
    $("#grid").jqxGrid('clear');
    export_data = 0;
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
            row += '' + arrData[i][index] + ',';
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
function listar_data_list_proyectos() {
    var array_ot = new Array();
    proyectos = [];
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
            for (var i = 0; responses.data.length > i; i++) {
                proyectos.push({intIdproy: responses.data[i]['intIdproy'], varRucClie: responses.data[i]['varRucClie']});
            }

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
            //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

            $("#producto").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30, });
            // Focus the jqxDropDownList
            $("#producto").jqxDropDownList('focus');
            $("#producto").jqxDropDownList('selectIndex', 0);
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

            if (responses.data.mensaje == "Error.") {
                $("#zona").jqxDropDownList('clear');
                $("#tarea").jqxDropDownList('clear');
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
                $("#zona").jqxDropDownList({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30, });
                $("#zona").jqxDropDownList('focus');
                $("#zona").jqxDropDownList('selectIndex', 0);
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
                listar_tarea(codigo_producto, codigo_ot, zona);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "Error.") {
                $("#tarea").jqxDropDownList('clear');
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
                $("#tarea").jqxDropDownList({source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30});
                $("#tarea").jqxDropDownList('focus');
                $("#tarea").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}
function listar_modelo(cod_ot, cod_pro) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_modelo_2',
        dataType: 'json',
        data: {
            intIdProy: cod_ot,
            intIdTipoProducto: cod_pro
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
                responses.data.push({varModelo: 'TODOS'});
                //responses.data.pop();
                responses.data.reverse();
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varModelo'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#modelo").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varModelo", valueMember: "varModelo", width: 200, height: 30});
                $("#modelo").jqxDropDownList('focus');
                $("#modelo").jqxDropDownList('checkIndex', 0);

            } else {
                modelo_combo = '';
                $("#modelo").jqxDropDownList('clear');
                $("#modelo").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
                $("#codigo_despacho").jqxDropDownList('clear');
                $("#codigo_despacho").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
            }
        }
    });
}
function listar_bulto(cod_ot, cod_pro) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_bulto_2',
        dataType: 'json',
        data: {
            intIdProy: cod_ot,
            intIdTipoProducto: cod_pro
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_bulto(cod_ot, cod_pro);
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                responses.data.push({varBulto: 'TODOS'});
                //responses.data.pop();
                responses.data.reverse();
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varBulto'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#bulto").jqxDropDownList({filterPlaceHolder: "Buscar", checkboxes: true, filterable: true, autoOpen: true, source: dataAdapter, displayMember: "varBulto", valueMember: "varBulto", width: 200, height: 30});
                $("#bulto").jqxDropDownList('focus');
                $("#bulto").jqxDropDownList('checkIndex', 0);

            } else {
                bulto_combo = '';
                $("#bulto").jqxDropDownList('clear');
                $("#bulto").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
            }
        }
    });
}
function combo_despacho(codigo_ot, codigo_producto, cod_bulto) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_codigo',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            varBulto: cod_bulto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
                responses.data.push({varCodiElemento: 'TODOS'});
                //responses.data.pop();
                responses.data.reverse();
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varCodiElemento'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#codigo_despacho").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varCodiElemento", valueMember: "varCodiElemento", width: 200, height: 30});
                $("#codigo_despacho").jqxDropDownList('focus');
                $("#codigo_despacho").jqxDropDownList('checkIndex', 0);
            } else {
                codigo_combo = '';
                $("#codigo_despacho").jqxDropDownList('clear');
                $("#codigo_despacho").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
            }
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
$("#btn_busc").click(function () {
    if (codigoproducto) {
        if (codigoot) {
            if (check_zona) {
                if (check_tarea) {
                    if (modelo_combo) {
                        if (bulto_combo) {
                            if (codigo_combo) {
                                listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, modelo_combo, bulto_combo, codigo_combo);
                            } else {
                                mensaje(false, "Ingrese un Codigo", "no");
                            }
                        } else {
                            mensaje(false, "Ingrese una Bulto", "no");
                        }
                    } else {
                        mensaje(false, "Ingrese un Modelo", "no");
                    }
                } else {
                    mensaje(false, "Ingrese una Tarea", "no");
                }
            } else {
                mensaje(false, "Ingrese una Zona", "no");
            }
        } else {
            mensaje(false, "Ingrese una Ot", "no");
        }
    } else {
        mensaje(false, "Ingrese una Producto", "no");
    }
});
function listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, check_modelo, check_bulto, check_codigo) {
    $('#grid').jqxGrid('clear');
    $('#grid').jqxGrid('clearselection');
    $("#grid").jqxGrid('refresh');
    $('#grid').jqxGrid('showloadelement');
    var array_temporal = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_bulto_total_despacho',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigoproducto,
            intIdProyZona: check_zona,
            intIdProyTarea: check_tarea,
            varModelo: check_modelo,
            varBulto: check_bulto,
            varCodiElemento: check_codigo
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                array_temporal.push(responses.data);
                exportar_data = 1;
            } else {
                exportar_data = 0;
            }
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiElemento', type: 'string'},
                            {name: 'nombre', type: 'string'},
                            {name: 'varCodVal', type: 'string'},
                            {name: 'varModelo', type: 'string'},
                            {name: 'varPerfil', type: 'string'},
                            {name: 'intRevision', type: 'number'},
                            {name: 'intCantRepro', type: 'number'},
                            {name: 'Canti', type: 'number'},
                            {name: 'CantiReal', type: 'number'},
                            {name: 'Canti_real', type: 'number'},
                            {name: 'Zona', type: 'string'},
                            {name: 'Programa', type: 'string'},
                            {name: 'Grupo', type: 'string'},
                            {name: 'Contratista', type: 'string'},
                            {name: 'deciPrec', type: 'float'},
                            {name: 'deciPesoNeto', type: 'string'},
                            {name: 'deciPesoBruto', type: 'string'},
                            {name: 'deciLong', type: 'float'},
                            {name: 'deciArea', type: 'string'},
                            {name: 'deciAncho', type: 'float'},
                            {name: 'etapa_anterior', type: 'string'},
                            {name: 'etapa_siguiente', type: 'string'},
                            {name: 'intIdContr', type: 'number'},
                            {name: 'intIdRuta', type: 'number'},
                            {name: 'intIdEtapaAnte', type: 'number'},
                            {name: 'intIdEtapaSiguiente', type: 'number'},
                            {name: 'intIdProyPaquete', type: 'number'},
                            {name: 'intIdProyTarea', type: 'number'},
                            {name: 'intIdProyZona', type: 'number'},
                            {name: 'intidetapa', type: 'number'},
                            {name: 'data_seriales', type: 'string'},
                            {name: 'ContratistaAnt', type: 'string'},
                            {name: 'FechaAvanAnt', type: 'string'},
                            {name: 'DocEnvioTS', type: 'string'},
                            {name: 'Pintura', type: 'string'},
                            {name: 'IdContraAnt', type: 'number'},
                            {name: 'intIdTipoGrupo', type: 'number'},
                            {name: 'varDescTipoGrupo', type: 'string'},
                            {name: 'bulto', type: 'string'},
                            {name: 'Obs1', type: 'string'},
                            {name: 'obs2', type: 'string'},
                            {name: 'obs3', type: 'string'},
                            {name: 'obs4', type: 'string'},
                            {name: 'intIdEsta', type: 'number'},
                            {name: 'estado', type: 'string'},
                            {name: 'TotalPesoNeto', type: 'string'},
                            {name: 'TotalPesoBruto', type: 'string'},
                            {name: 'TotalArea', type: 'string'}
                        ],
                        async: false
                    };
            dataAdapter = new $.jqx.dataAdapter(source);

            var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {
                var html = '<button class="btn btn-danger btn-sm" onClick="listar_modal()"><i class="far fa-file-pdf"></i></button>';
                //var html = "<a href=\"?module=accounts\&applettype\=baseview\&ret_module=accounts\&ret_applettype\=listview\&record=" + href + "\">" + value + "</a>";
                return html;
            };

            $('#grid').jqxGrid('showloadelement');
            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                editable: true,
                enabletooltips: true,
                selectionmode: 'checkbox',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [

                    {text: 'Codigo', datafield: 'varCodiElemento', editable: false, width: 120, aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Nombre', datafield: 'nombre', editable: false, width: 270},
                    {text: 'Nombre', datafield: 'CantiReal', editable: false, width: 270, hidden: true},
                    {text: 'Cantidad', datafield: 'Canti', width: 70, editable: true, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['Canti']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total);
                                            return total;
                                        }
                            }]
                    },
                    {text: 'Perfil', datafield: 'varPerfil', editable: false, width: '10%', hidden: false},
                    {text: 'Bulto', datafield: 'bulto', editable: false, width: 250},
                    {text: 'Zona', datafield: 'Zona', editable: false, width: 200},
                    {text: 'Programa', datafield: 'Programa', editable: false, width: '8%'},
                    {text: 'Grupo', datafield: 'Grupo', editable: false, width: '8%'},
                    {text: 'Peso Neto', datafield: 'deciPesoNeto', editable: false, width: '7%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Neto Total', datafield: 'TotalPesoNeto', editable: false, width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['TotalPesoNeto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Bruto', datafield: 'deciPesoBruto', editable: false, width: '7%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Bruto Total', datafield: 'TotalPesoBruto', editable: false, width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['TotalPesoBruto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Longitud', datafield: 'deciLong', editable: false, width: '8%', hidden: true},
                    {text: 'Area', datafield: 'deciArea', editable: false, width: '6%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Area Total', datafield: 'TotalArea', editable: false, width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['TotalArea']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Estado', datafield: 'estado', editable: false, width: 120, hidden: true},
                    {text: 'Codigo Val.', datafield: 'varCodVal', editable: false, width: '8%', hidden: true},
                    {text: 'Modelo', datafield: 'varModelo', editable: false, width: '8%', hidden: true},

                    {text: 'Rev.', datafield: 'intRevision', editable: false, width: '4%', hidden: true},
                    {text: 'Cant Repr.', datafield: 'intCantRepro', editable: false, width: '8%', hidden: true},
                    {text: 'Cant real.', datafield: 'Canti_real', editable: false, width: '8%', hidden: true},

                    {text: 'seriales', datafield: 'data_seriales', editable: false, width: '18%', hidden: true},

                    {text: 'Contratista', datafield: 'Contratista', editable: false, width: '15%', hidden: true},
                    {text: 'Precio', datafield: 'deciPrec', editable: false, hidden: true},

                    {text: 'Ancho', datafield: 'deciAncho', editable: false, width: '5%', hidden: true},
                    {text: 'Etapa Anterior', datafield: 'etapa_anterior', editable: false, width: '18%', hidden: true},
                    {text: 'Etapa Siguiente', datafield: 'etapa_siguiente', editable: false, width: '18%', hidden: true},
                    {text: 'Contratista Anterior', datafield: 'ContratistaAnt', editable: false, width: '18%', hidden: true},
                    {text: 'Fecha Avance Anterior', datafield: 'FechaAvanAnt', editable: false, width: '18%', format: 'dd/MM/yyyy', hidden: true},
                    {text: 'Documento Transferencia', datafield: 'DocEnvioTS', editable: false, width: '18%', hidden: true},
                    {text: 'Pintura', datafield: 'Pintura', width: '18%', editable: false, hidden: true},
                    {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', editable: false, width: 250, hidden: true},

                    {text: 'Observación 1', datafield: 'Obs1', editable: false, width: 250, hidden: true},
                    {text: 'Observación 2', datafield: 'obs2', editable: false, width: 250, hidden: true},
                    {text: 'Observación 3', datafield: 'obs3', editable: false, width: 250, hidden: true},
                    {text: 'Observación 4', datafield: 'obs4', editable: false, width: 250, hidden: true},

                    {text: 'id_grupo_tipo_estructura', width: 140, editable: false, datafield: 'intIdTipoGrupo', hidden: true},
                    {text: 'IdContrAnt', datafield: 'IdContraAnt', editable: false, width: '18%', hidden: true},
                    {text: 'intIdEtapa', datafield: 'intIdEtapa', editable: false, width: '18%', hidden: true},
                    {text: 'intIdEtapaAnte', datafield: 'intIdEtapaAnte', editable: false, width: '18%', hidden: true},
                    {text: 'intIdEtapaSiguiente', datafield: 'intIdEtapaSiguiente', editable: false, width: '18%', hidden: true},
                    {text: 'intIdProyTarea', datafield: 'intIdProyTarea', editable: false, width: '18%', hidden: true},
                    {text: 'intIdProyZona', datafield: 'intIdProyZona', editable: false, width: '18%', hidden: true},
                    {text: 'intIdRuta', datafield: 'intIdRuta', width: '18%', editable: false, hidden: true},
                    {text: 'intIdContr', datafield: 'intIdContr', width: '18%', editable: false, hidden: true},
                    {text: 'intIdEsta', datafield: 'intIdEsta', width: '18%', editable: false, hidden: true},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    }
    );
}

$("#grid").on('cellendedit', function (event) {
    var value = event.args.value;
    var args = event.args.row;
    if (parseInt(value) > args.CantiReal) {
        mensaje(false, "La cantidad ingresada es mayor a la cantidad registrada." +" Cantidad registrada es :"+args.CantiReal, "no");
    } else if (parseInt(value) < 0) {
        mensaje(false, "La cantidad ingresada no puede ser negativo."+" Cantidad registrada es :"+args.CantiReal, "no");
    }else if(parseInt(value) === 0){
        mensaje(false, "La cantidad ingresada no puede ser 0 ."+" Cantidad registrada es :"+args.CantiReal, "no");
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
/*VALIDAMOS SI LA ETAPA ESTA VALORIZADA,  SI ESTA VALORIZADA MOSTRAR EL COMBO DE LOS CONTRATISTAS SI NO SE ENCUENTRA VALORIZADA MOSTRAR
 * EL COMOBO POR DEFECTO MIMCO PERSONAL */
function valoriza(id_etapa, id_perido) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/envi_valo_cod',
        dataType: 'json',
        data: {
            intIdEtapa: id_etapa,
            intIdProy: codigoot,
            intIdTipoProducto: codigoproducto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {

            bool_despacho = "";
            cod_tipo_etapa = responses.data[0]['varCodiTipoEtap'];
            bool_despacho = responses.data[0]['boolDesp'];
            idasig_etapa = responses.data[0]['intIdAsigEtapProy'];
            var_valo = responses.data[0]['varValoEtapa'];
        }
    });

}
$("#generar_despacho").on('click', function () {
    //  $("#modal-despacho-pregunta").modal('show');

    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    var deciTotaPesoNeto = 0;
    var deciTotaPesoBruto = 0;
    var deciTotaArea = 0;
    var cantidadtotal = 0;
    var textData = "";
    var array_bulto = [];
    if (rowindex.length > 0) {
        for (var i = 0; i < rowindex.length; i++) {
            textData = $('#grid').jqxGrid('getrowdata', rowindex[i]);
            deciTotaPesoNeto = parseFloat(textData['TotalPesoNeto']) + deciTotaPesoNeto;
            deciTotaPesoBruto = parseFloat(textData['TotalPesoBruto']) + deciTotaPesoBruto;
            deciTotaArea = parseFloat(textData['TotalArea']) + deciTotaArea;
            cantidadtotal = textData['Canti'] + cantidadtotal;
        }
        $("#total_peso_neto").val(deciTotaPesoNeto.toFixed(3));
        $("#total_peso_bruto").val(deciTotaPesoBruto.toFixed(3));
        $("#total_peso_area").val(deciTotaArea.toFixed(3));
        $("#ot_detalle").val(codigo_ot_label);
        $("#elemento").val(cod_elemento);
        $("#ot_detalle_valor").val(codigoot);
        $("#elemento_valor").val(codigoproducto);
        $("#cantidad_despacho").val(cantidadtotal);
        $("#modal-despacho").modal('show');
    } else {
        mensaje(false, "No ha seleccionado ningun elemento", "no");
    }
});


//CERRAR
$("#cerrar_modal_pregunta_despacho").click(() => $("#modal-despacho-pregunta").modal('hide'));




$("#generar_avance_despacho").on('click', function () {
    let ot_project = $("#ot_detalle_valor").val();
    let codi_producto = $("#elemento_valor").val();
    $("#mostrar_combo_despacho").jqxDropDownList('clearSelection');
    $("#mostrar_combo_despacho").jqxDropDownList('selectedIndex', -1);
    cmb_despacho(ot_project, codi_producto);
    $("#modal-despacho-pregunta").modal('show');


});


$("#close_registrar_avance").on('click', function () {
    $("#modal-despacho").modal('hide');
});
function store_registro_avance(array_avance, decitotalneto, decitotalbruto, decitotalarea, cantitotal) {
    var observacion = $("#observacion").val();
    var bulto = $("#nr_bulto").val();
    var guia = $("#nr_guia").val();
    let user = obtener_user();
    $("#modal-cargar-avance").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/create_despacho',
        dataType: 'json',
        data: {
            v_intIdproy: parseInt(codigoot),
            v_intIdTipoProducto: parseInt(codigoproducto),
            v_strDeObser: observacion,
            v_intIdMaqui: 0,
            v_strBulto: bulto,
            v_intIdPeriValo: parseInt(cod_per_valo),
            v_usuario: user,
            v_intIdInspe: 0,
            v_varValoEtapa: var_valo,
            v_varCodiTipoEtap: cod_tipo_etapa,
            v_boolDesp: bool_despacho,
            v_intIdAsigEtapProy: parseInt(idasig_etapa),
            v_informacion: array_avance,
            v_varNumeroGuia: guia,
            v_intIdSuper: 0,
            v_intIdContr: parseInt(21),
            v_tinFlgConforForzosa: 0,
            v_strDefecto: '',
            v_strCausa: '',
            strEstadoInspe: '',
            v_intIdDespa: 0,
            deciTotaPesoNeto: decitotalneto,
            deciTotaPesoBruto: decitotalbruto,
            deciTotaArea: decitotalarea,
            cantidadtotal: cantitotal
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje_alternativo === "sin error") {
                //mensaje(true, "Se asigno correctamente", "no");
                mensaje_noti(true, 'Se asigno correctamente', "modal-cargar-avance");
                array_avance = [];
                $("#grid").jqxGrid('clearSelection');
                listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, modelo_combo, bulto_combo, codigo_combo);
            } else {
                array_avance = [];
                $("#grid").jqxGrid('clearSelection');
                mensaje(false, "Hay errores al Asignar Avance.", "modal-cargar-avance");
                listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, modelo_combo, bulto_combo, codigo_combo);

                listar_errores(responses.data.mensaje);
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
    $("#griderrores").jqxGrid({
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
    $("#griderrores").jqxGrid('localizestrings', localizationobj);
    $("#modal-errores-asignar-avance").modal('show');
}
$("#cerrar_modal_asig_avan_errores").on('click', function () {
    $("#modal-errores-asignar-avance").modal('hide');
});


// MODAL DE PREGUNTA DE UPDATE 

$("#modificar_si").click(() => {

    $("#modificar_si").addClass('hidde_grid');
    $("#modificar_no").addClass('hidde_grid');

    $("#modificar_acepta").removeClass('hidde_grid');
    $("#modificar_salir").removeClass('hidde_grid');
    $("#mostrar_combo_despacho").removeClass('hidde_grid');


});

$("#modificar_salir").click(() => {
    $("#modificar_salir").addClass('hidde_grid');
    $("#modificar_acepta").addClass('hidde_grid');
    $("#mostrar_combo_despacho").addClass('hidde_grid');
    $("#combo_despacho").jqxDropDownList('clearSelection');
    $("#combo_despacho").jqxDropDownList('selectedIndex', -1);

    $("#modificar_si").removeClass('hidde_grid');
    $("#modificar_no").removeClass('hidde_grid');
    $("#modal-despacho-pregunta").modal('hide');



});

function modal_grilla_ocultar() {
    $("#modificar_salir").addClass('hidde_grid');
    $("#modificar_acepta").addClass('hidde_grid');
    $("#mostrar_combo_despacho").addClass('hidde_grid');
    $("#combo_despacho").jqxDropDownList('clearSelection');
    $("#combo_despacho").jqxDropDownList('selectedIndex', -1);

    $("#modificar_si").removeClass('hidde_grid');
    $("#modificar_no").removeClass('hidde_grid');
    $("#modal-despacho-pregunta").modal('hide');
}

$("#modificar_no").click(function () {


    var deciTotaPesoNeto = 0;
    var deciTotaPesoBruto = 0;
    var deciTotaArea = 0;
    var cantidadtotal = 0;
    var textData = "";
    var array_bulto = [];
    var array_avance = [];
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {

        $("#modal-despacho").modal('hide');
        $("#modal-despacho-pregunta").modal('hide');
        for (var i = 0; i < rowindex.length; i++) {
            textData = $('#grid').jqxGrid('getrowdata', rowindex[i]);

            var row = {Canti: textData['Canti'], varCodiElemento: textData['varCodiElemento'], nombre: textData['nombre'],
                varCodVal: textData['varCodVal'], varModelo: textData['varModelo'], varPerfil: textData['varPerfil'],
                intRevision: textData['intRevision'], intCantRepro: textData['intCantRepro'], Zona: textData['Zona'],
                Programa: textData['Programa'], Grupo: textData['Grupo'], Contratista: textData['Contratista'],
                deciPrec: textData['deciPrec'], deciPesoNeto: textData['deciPesoNeto'], deciPesoBruto: textData['deciPesoBruto'],
                deciLong: textData['deciLong'], deciArea: textData['deciArea'], deciAncho: textData['deciAncho'], etapa_anterior: textData['etapa_anterior'],
                etapa_siguiente: textData['etapa_siguiente'], intIdContr: textData['intIdContr'], intIdRuta: textData['intIdRuta'],
                intIdEtapaAnte: textData['intIdEtapaAnte'], intIdEtapaSiguiente: textData['intIdEtapaSiguiente'], intIdProyPaquete: textData['intIdProyPaquete'],
                intIdProyTarea: textData['intIdProyTarea'], intIdProyZona: textData['intIdProyZona'], intidetapa: textData['intidetapa'], varcodelement: textData['data_seriales'],
                ContratistaAnt: textData['ContratistaAnt'], FechaAvanAnt: textData['FechaAvanAnt'], Doc_Ant: textData['Doc_Ant'], Pintura: textData['Pintura'], IdContrAnt: textData['IdContrAnt'], intIdEsta: textData['intIdEsta'],
                tipo_reporte: 1, DocEnvioTS: textData['DocEnvioTS'], Obs1: textData['Obs1'], obs2: textData['obs2'], obs3: textData['obs3'], obs4: textData['obs4']
            };
            deciTotaPesoNeto = parseFloat(textData['TotalPesoNeto']) + deciTotaPesoNeto;
            deciTotaPesoBruto = parseFloat(textData['TotalPesoBruto']) + deciTotaPesoBruto;
            deciTotaArea = parseFloat(textData['TotalArea']) + deciTotaArea;
            cantidadtotal = textData['Canti'] + cantidadtotal;
            array_avance.push(row);
        }
    } else {
        mensaje(false, "No ha seleccionado ningun elemento", "no");
    }
    var myJsonString = JSON.stringify(array_avance);
    store_registro_avance(myJsonString, deciTotaPesoNeto.toFixed(3), deciTotaPesoBruto.toFixed(3), deciTotaArea.toFixed(3), cantidadtotal);

});


function cmb_despacho(ot_despacho, eleme_despacho) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/comb_despacho',
        dataType: 'json',
        data: {
            intIdProy: ot_despacho,
            intIdTipoProducto: eleme_despacho,

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
                            {name: 'intIdDesp'},
                            {name: 'name'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#combo_despacho").jqxDropDownList({template: "primary", placeHolder: "DESPACHO : ", source: dataAdapter, displayMember: "name", valueMember: "intIdDesp", width: '8%', height: '30'});
            $("#combo_despacho").jqxDropDownList('clearSelection');
            $("#combo_despacho").jqxDropDownList('selectedIndex', -1);


        }
    });
}


$("#modificar_acepta").click(function () {

    var deciTotaPesoNeto_up = 0;
    var deciTotaPesoBruto_up = 0;
    var deciTotaArea_up = 0;
    var cantidadtotal_up = 0;
    var textData_up = "";
    var array_bulto_up = [];
    var array_avance_up = [];

    var iddespacho = $("#combo_despacho").val();

    if (iddespacho === "") {
        mensaje(false, "Seleccione el despacho", "no");
    } else {
        var rowindex_up = $("#grid").jqxGrid("getselectedrowindexes");
        if (rowindex_up.length > 0) {

            $("#modal-despacho").modal('hide');
            $("#modal-despacho-pregunta").modal('hide');
            for (var i = 0; i < rowindex_up.length; i++) {
                textData_up = $('#grid').jqxGrid('getrowdata', rowindex_up[i]);

                var row = {Canti: textData_up['Canti'], varCodiElemento: textData_up['varCodiElemento'], nombre: textData_up['nombre'],
                    varCodVal: textData_up['varCodVal'], varModelo: textData_up['varModelo'], varPerfil: textData_up['varPerfil'],
                    intRevision: textData_up['intRevision'], intCantRepro: textData_up['intCantRepro'], Zona: textData_up['Zona'],
                    Programa: textData_up['Programa'], Grupo: textData_up['Grupo'], Contratista: textData_up['Contratista'],
                    deciPrec: textData_up['deciPrec'], deciPesoNeto: textData_up['deciPesoNeto'], deciPesoBruto: textData_up['deciPesoBruto'],
                    deciLong: textData_up['deciLong'], deciArea: textData_up['deciArea'], deciAncho: textData_up['deciAncho'], etapa_anterior: textData_up['etapa_anterior'],
                    etapa_siguiente: textData_up['etapa_siguiente'], intIdContr: textData_up['intIdContr'], intIdRuta: textData_up['intIdRuta'],
                    intIdEtapaAnte: textData_up['intIdEtapaAnte'], intIdEtapaSiguiente: textData_up['intIdEtapaSiguiente'], intIdProyPaquete: textData_up['intIdProyPaquete'],
                    intIdProyTarea: textData_up['intIdProyTarea'], intIdProyZona: textData_up['intIdProyZona'], intidetapa: textData_up['intidetapa'], varcodelement: textData_up['data_seriales'],
                    ContratistaAnt: textData_up['ContratistaAnt'], FechaAvanAnt: textData_up['FechaAvanAnt'], Doc_Ant: textData_up['Doc_Ant'], Pintura: textData_up['Pintura'], IdContrAnt: textData_up['IdContrAnt'], intIdEsta: textData_up['intIdEsta'],
                    tipo_reporte: 1, DocEnvioTS: textData_up['DocEnvioTS'], Obs1: textData_up['Obs1'], obs2: textData_up['obs2'], obs3: textData_up['obs3'], obs4: textData_up['obs4']
                };
                deciTotaPesoNeto_up = parseFloat(textData_up['TotalPesoNeto']) + deciTotaPesoNeto_up;
                deciTotaPesoBruto_up = parseFloat(textData_up['TotalPesoBruto']) + deciTotaPesoBruto_up;
                deciTotaArea_up = parseFloat(textData_up['TotalArea']) + deciTotaArea_up;
                cantidadtotal_up = textData_up['Canti'] + cantidadtotal_up;
                array_avance_up.push(row);
            }
        } else {
            mensaje(false, "No ha seleccionado ningun elemento", "no");
        }
        var myJsonString_up = JSON.stringify(array_avance_up);
        store_actualizar_avance(myJsonString_up, deciTotaPesoNeto_up.toFixed(3), deciTotaPesoBruto_up.toFixed(3), deciTotaArea_up.toFixed(3), cantidadtotal_up, iddespacho);

    }


});

$("#modificar_salir").click(function () {
    $("#combo_despacho").jqxDropDownList('clearSelection');
    $("#combo_despacho").jqxDropDownList('selectedIndex', -1);
});

// STORE PARA ACTUALIZAR EL DESPACHO

function store_actualizar_avance(array_avance_up2, decitotalneto_up2, decitotalbruto_up2, decitotalarea_up2, cantitotal_up2, despachoid2) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/update_despacho',
        dataType: 'json',
        data: {
            v_intIdproy: parseInt(codigoot),
            v_intIdTipoProducto: parseInt(codigoproducto),
            v_strDeObser: '',
            v_intIdMaqui: 0,
            v_strBulto: '',
            v_intIdPeriValo: parseInt(cod_per_valo),
            v_usuario: user,
            v_intIdInspe: 0,
            v_varValoEtapa: var_valo,
            v_varCodiTipoEtap: cod_tipo_etapa,
            v_boolDesp: bool_despacho,
            v_intIdAsigEtapProy: parseInt(idasig_etapa),
            v_informacion: array_avance_up2,
            v_varNumeroGuia: '',
            v_intIdSuper: 0,
            v_intIdContr: parseInt(21),
            v_tinFlgConforForzosa: 0,
            v_strDefecto: '',
            v_strCausa: '',
            strEstadoInspe: '',
            v_intIdDespa: despachoid2,
            deciTotaPesoNeto: decitotalneto_up2,
            deciTotaPesoBruto: decitotalbruto_up2,
            deciTotaArea: decitotalarea_up2,
            cantidadtotal: cantitotal_up2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje_alternativo === "sin error") {
                //mensaje(true, "Se asigno correctamente", "no");
                mensaje_noti(true, 'Actualizacion correctamente', "modal-cargar-avance");
                array_avance = [];
                $("#grid").jqxGrid('clearSelection');
                listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, modelo_combo, bulto_combo, codigo_combo);
                modal_grilla_ocultar();
            } else {
                array_avance = [];
                $("#grid").jqxGrid('clearSelection');
                mensaje(false, "Hay errores al Asignar Avance.", "modal-cargar-avance");
                listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, modelo_combo, bulto_combo, codigo_combo);

                listar_errores(responses.data.mensaje);
                modal_grilla_ocultar();
            }
        }
    });
}

