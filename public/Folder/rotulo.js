var codigoproducto = "";
var codigoot = "";
var check_zona = "";
var check_tarea = "";
var check_etapa = "";
var editrow = -1;
var elemento_id = "";
var modelo_combo = "";
var bulto_combo = "";
function dropDownlist() {
    $("#zona").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#tarea").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
}
$("#excel_lista_ot").click(function () {
    var errores = $("#grid4").jqxGrid('exportdata', 'html');
    ExportToExcel(errores);
});
$("#producto").on('change', function (event) {
    codigoproducto = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
        }
    }
    if (codigoproducto) {
        listar_zona(codigoproducto, codigoot);
        listar_modelo(codigoot, codigoproducto);
        listar_bulto(codigoot, codigoproducto);
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

});
$("#generar_pdf").on('click', function () {
    var textData = "";
    var array_bulto = [];
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {
        $("#modal-pregunta").modal('show');
    } else {
        mensaje(false, "No ha seleccionado ningun bulto.", "no");
    }
});
$("#generar_rotulo").on('click', function () {
    $("#modal-pregunta").modal('hide');
    var textData = "";
    var array_bulto = [];
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {
        for (var i = 0; i < rowindex.length; i++) {
            textData = $('#grid').jqxGrid('getrowdata', rowindex[i]);
            console.log(textData);
            var row = {intIdProy: textData['intIdProy'],
                intIdTipoProducto: textData['intIdTipoProducto'],
                intIdProyTarea: textData['intIdProyTarea'],
                intIdProyZona: textData['intIdProyZona'],
                varBulto: textData['varBulto'],
                varModelo: textData['varModelo']
            };
            array_bulto.push(row);
        }
        //console.log(array_bulto);
        var myJsonString = JSON.stringify(array_bulto);
        var tipo_rotulado = 1;
        var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
        $(location).attr('href', "generacion/pdf/" + myJsonString + '/' + reporte + '/' + tipo_rotulado);
    } else {
        mensaje(false, "No ha seleccionado ningun bulto.", "no");
    }

});
$("#generar_rotulo2").on('click', function () {
    $("#modal-pregunta").modal('hide');
    var textData = "";
    var array_bulto = [];
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {
        for (var i = 0; i < rowindex.length; i++) {
            textData = $('#grid').jqxGrid('getrowdata', rowindex[i]);
            console.log(textData);
            var row = {intIdProy: textData['intIdProy'],
                intIdTipoProducto: textData['intIdTipoProducto'],
                intIdProyTarea: textData['intIdProyTarea'],
                intIdProyZona: textData['intIdProyZona'],
                varBulto: textData['varBulto'],
                varModelo: textData['varModelo']
            };
            array_bulto.push(row);
        }
        //console.log(array_bulto);
        var myJsonString = JSON.stringify(array_bulto);
        var tipo_rotulado = 2;
        var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();
        $(location).attr('href', "generacion/pdf/" + myJsonString + '/' + reporte + '/' + tipo_rotulado);
    } else {
        mensaje(false, "No ha seleccionado ningun bulto.", "no");
    }

});
$("#excel_despacho").on('click', function () {
    var data = $("#grid").jqxGrid('exportData', 'json');
    JSONToCSVConvertor(data, "Lista Despacho", true);
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
$("#limpiar").on('click', function () {
    $("#txt_ot").jqxDropDownList('clearSelection');
    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#zona").jqxDropDownList('selectIndex', 0);
    $("#tarea").jqxDropDownList('selectIndex', 0);
    $("#modelo").jqxDropDownList('uncheckAll');
    $("#modelo").jqxDropDownList('checkIndex', 0);
    $("#bulto").jqxDropDownList('uncheckAll');
    $("#bulto").jqxDropDownList('checkIndex', 0);
    $("#grid").jqxGrid('clear');
});
$("#cerrar_modal_asig_avan_errores").on('click', function () {
    array_errores = [];
    $("#modal-errores-asignar-avance").modal('hide');
});
$("#cerrar_no_conforme").on('click', function () {
    $("#causa").jqxDropDownList('clearSelection');
    $("#defecto").jqxDropDownList('clearSelection');
    $("#observacion_no_conforme").val('');
    $("#modal-no-conforme").modal('hide');
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
        url: url + '/GestionProyectos/public/index.php/list_modelo',
        dataType: 'json',
        data: {
            intIdProy: cod_ot,
            intIdTipoProducto: cod_pro
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_modelo(cod_ot, cod_pro);
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
                $("#modelo").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varModelo", valueMember: "varModelo", width: 200, height: 30});
                $("#modelo").jqxDropDownList('focus');
            }

        }
    });
}
function listar_bulto(cod_ot, cod_pro) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_bulto',
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
                $("#bulto").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varBulto", valueMember: "varBulto", width: 200, height: 30});
                $("#bulto").jqxDropDownList('focus');
                $("#bulto").jqxDropDownList('checkIndex', 0);
            } else {
                $("#bulto").jqxDropDownList('clear');
                $("#bulto").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varBulto", valueMember: "varBulto", width: 200, height: 30});
                $("#bulto").jqxDropDownList('focus');
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
                            listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, modelo_combo, bulto_combo);
                        } else {
                            mensaje(false, "Ingrese una Modelo", "no");
                        }
                    } else {
                        mensaje(false, "Ingrese una Modelo", "no");
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

function listar_bultos(codigoproducto, codigoot, check_zona, check_tarea, check_modelo, check_bulto) {

    $('#grid').jqxGrid('clear');
    $("#grid").jqxGrid('refresh');
    $('#grid').jqxGrid('showloadelement');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_bulto_total',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigoproducto,
            intIdProyZona: check_zona,
            intIdProyTarea: check_tarea,
            varCodiElemento: check_modelo,
            varBulto: check_bulto
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
                            {name: 'intIdProy', type: 'number'},
                            {name: 'intIdTipoProducto', type: 'number'},
                            {name: 'intIdProyZona', type: 'number'},
                            {name: 'intIdProyTarea', type: 'number'},
                            {name: 'varBulto', type: 'string'},
                            {name: 'varModelo', type: 'string'},
                            {name: 'deciPesoNeto', type: 'string'},
                            {name: 'deciPesoBruto', type: 'string'},
                            {name: 'deciArea', type: 'string'},
                            {name: 'cantidad', type: 'string'},
                            {name: 'varDescrip', type: 'string'},
                            {name: 'varDescripTarea', type: 'string'},
                            {name: 'nomb_proyecto', type: 'string'},
                            {name: 'varDescTipoProd', type: 'string'}
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
                enabletooltips: true,
                sortable: true,
                theme: 'darkblue',
                selectionmode: 'checkbox',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    //{text: 'Pdf', dataField: 'opciones', width: 50, cellsrenderer: linkrenderer_accounts, cellsalign: 'center'},
                    {text: 'CodProyecto', datafield: 'intIdProy', width: 100, hidden: true},
                    {text: 'CodElemento', datafield: 'intIdTipoProducto', width: 100, hidden: true},
                    {text: 'CodZona', datafield: 'intIdProyZona', width: 100, hidden: true},
                    {text: 'CodTarea', datafield: 'intIdProyTarea', width: 100, hidden: true},
                    {text: 'Proyecto', datafield: 'nomb_proyecto', hidden: true, width: 200, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        },
                            }]},
                    {text: 'Tipo Elemento', datafield: 'varDescTipoProd', width: 100, hidden: true},
                    {text: 'Bulto', datafield: 'varBulto', width: 300, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        },
                            }]},
                    {text: 'Cantidad', datafield: 'cantidad', width: 80, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['cantidad']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }], columntype: 'button', buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            listar_bultos_detalle(dataRecord.intIdProy, dataRecord.intIdTipoProducto, dataRecord.varBulto);
                            $("#modal-lista_bulto_detalle").modal('show');
                        }},
                    {text: 'Peso Neto', datafield: 'deciPesoNeto', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Area', datafield: 'deciArea', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Zona', datafield: 'varDescrip', width: 200},
                    {text: 'Programa', datafield: 'varDescripTarea', width: 100},
                    {text: 'Modelo', datafield: 'varModelo', width: 200},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    }
    );
}

function listar_bultos_detalle(cod_ot, cod_pro, cod_bul) {
    $('#grid2').jqxGrid('clear');
    $('#grid2').jqxGrid('showloadelement');
    $("#grid2").jqxGrid('refresh');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_bulto_detalle',
        dataType: 'json',
        data: {
            intIdProy: cod_ot,
            intIdTipoProducto: cod_pro,
            varBulto: cod_bul
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
                            {name: 'varCodiElemento', type: 'number'},
                            {name: 'varDescripcion', type: 'number'},
                            {name: 'intRevision', type: 'number'},
                            {name: 'intCantRepro', type: 'number'},
                            {name: 'intSerie', type: 'string'},
                            {name: 'varModelo', type: 'string'},
                            {name: 'varPerfil', type: 'string'},
                            {name: 'zona', type: 'string'},
                            {name: 'varDescripTarea', type: 'string'},
                            {name: 'varCodigoPaquete', type: 'number'},
                            {name: 'deciPesoNeto', type: 'string'},
                            {name: 'deciPesoBruto', type: 'string'},
                            {name: 'deciArea', type: 'string'}
                        ],
                        async: false
                    };
            dataAdapter = new $.jqx.dataAdapter(source);
            $('#grid2').jqxGrid('showloadelement');
            $("#grid2").jqxGrid({
                width: '100%',
                height: '300',
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
                    //{text: 'Pdf', dataField: 'opciones', width: 50, cellsrenderer: linkrenderer_accounts, cellsalign: 'center'},
                    {text: 'Codigo', datafield: 'varCodiElemento', width: 80, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var count = $("#grid2").jqxGrid('getrows');
                                            return count.length;
                                        },
                            }]},
                    {text: 'Nombre', datafield: 'varDescripcion', width: 120},
                    {text: 'Revisión', datafield: 'intRevision', width: 80},
                    {text: 'Reproceso', datafield: 'intCantRepro', width: 80},
                    {text: 'Serie', datafield: 'intSerie', width: 50},
                    {text: 'Modelo', datafield: 'varModelo', width: 100},
                    {text: 'Perfil', datafield: 'varPerfil', width: 180},
                    {text: 'Zona', datafield: 'zona', width: 200},
                    {text: 'Programa', datafield: 'varDescripTarea', width: 100},
                    {text: 'Grupo', datafield: 'varCodigoPaquete', width: 100},
                    {text: 'Peso Neto', datafield: 'deciPesoNeto', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Area', datafield: 'deciArea', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]}
                ]
            });
            $("#grid2").jqxGrid('localizestrings', localizationobj);
        }
    });
}

