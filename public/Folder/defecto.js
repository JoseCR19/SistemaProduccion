var editrow = 0;
var codagrupador = 0;
var updcodagrupador = 0;
var updintest = 0;

function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    codigo_usuario = cod_user[0].codigo_usuario;
    return codigo_usuario;
}

function listar_estados_defecto() {
    var estados = [{codgru: 3, descgru: 'ACTIVO'}, {codgru: 14, descgru: 'INACTIVO'}];
    var source = {localdata: estados, datatype: "array"};
    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#estdef').jqxDropDownList({selectedIndex: -1, placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "descgru", valueMember: "codgru", itemHeight: 20, height: 35, width: 250, dropDownHeight: 50});
}

$("#estdef").on('change', function (event) {
    updintest = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            updintest = item.value;
        }
    }
});

function limpiar() {
    $("#coddef").val('');
    $("#descdef").val('');
}

$('#create').click(function () {
    limpiar();
    cboAgrupador();
    $('#modal-create-defecto').modal('show');
});

$('#agregar').click(function () {
    registrar_defecto();
});

$("#updagrup").on('change', function (event) {
    updcodagrupador = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            updcodagrupador = item.value;
        }
    }
});

$("#agrup").on('change', function (event) {
    codagrupador = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codagrupador = item.value;
        }
    }
});

$("#upddefecto").on('click', function () {
    if (editrow >= 0) {
        var row = {
            intIdDefe: $("#updintid").val(),
            intIdAgru: updcodagrupador,
            varCodiDefe: $("#updcoddef").val().toUpperCase(),
            varDescDefe: $("#upddescdef").val().toUpperCase()
        };
        actualizar_defecto(row.intIdDefe, row.intIdAgru, row.varCodiDefe, row.varDescDefe);
    }
});

$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Defectos", true);
});

function listar_defecto() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/lista_defecto',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_defecto();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdDefe', type: 'number'},
                    {name: 'intIdAgru', type: 'number'},
                    {name: 'varDescAgru', type: 'string'},
                    {name: 'varCodiDefe', type: 'string'},
                    {name: 'varDescDefe', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'datetime'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'datetime'},
                    {name: 'varDescEsta', type: 'string'},
                    {name: 'intIdEsta', type: 'number'}
                ], updaterow: function (commit) {
                    commit(true);
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            editrow = -1;
            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                showfilterrow: true,
                filterable: true,
                selectionmode: 'multiplecellsextended',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {
                        text: 'EDITAR', datafield: 'Editar', columntype: 'button', width: 85, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            cboAgrupador();
                            editrow = row;
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $('#modal-edit-defecto').modal('show');
                            $("#updintid").val(dataRecord.intIdDefe);
                            $("#updagrup").val(dataRecord.intIdAgru);
                            $("#updcoddef").val(dataRecord.varCodiDefe);
                            $("#upddescdef").val(dataRecord.varDescDefe);
                            $("#estdef").val(dataRecord.intIdEsta);
                        }
                    },
                    {text: 'ID', datafield: 'intIdDefe', width: 48, cellsalign: 'center', aggregates: [{
                                '<b>N°</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'AGRUPADOR', datafield: 'varDescAgru', width: 265},
                    {text: 'CODIGO', datafield: 'varCodiDefe', cellsalign: 'left', width: 60},
                    {text: 'DESCRIPCION', datafield: 'varDescDefe', width: 315},
                    {text: 'CREADO POR', datafield: 'acti_usua', width: 138},
                    {text: 'CREADO EL', datafield: 'acti_hora', width: 155},
                    {text: 'MODIFICADO POR', datafield: 'usua_modi', width: 140},
                    {text: 'MODIFICADO EL', datafield: 'hora_modi', width: 155},
                    {text: 'ESTADO', datafield: 'varDescEsta', width: 105}
                ]
            });
        }
    });
}

function cboAgrupador() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_agru',
        dataType: 'json',
        error: function (thrownError) {
            if (thrownError === "Internal Server Error") {
                cboAgrupador();
            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdAgru'},
                            {name: 'varDescAgru'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#agrup").jqxDropDownList({placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "varDescAgru", valueMember: "intIdAgru", width: 250, height: 30});
            $("#agrup").jqxDropDownList('focus');
            $("#agrup").jqxDropDownList('selectIndex', -1);
        }
    });
}

function cboAgrupador_update() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_agru',
        dataType: 'json',
        error: function (thrownError) {
            if (thrownError === "Internal Server Error") {
                cboAgrupador_update();
            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdAgru'},
                            {name: 'varDescAgru'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#updagrup").jqxDropDownList({placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "varDescAgru", valueMember: "intIdAgru", width: 250, height: 30});
            $("#updagrup").jqxDropDownList('focus');
            $("#updagrup").jqxDropDownList('selectIndex', -1);
        }
    });
}

function registrar_defecto() {
    let codagru = $('#agrup').val().toUpperCase().trim();
    let coddefe = $('#coddef').val().toUpperCase().trim();
    let desdefe = $('#descdef').val().toUpperCase().trim();
    let user = obtener_user();
    if (codagru !== "") {
        if (coddefe !== "") {            
            if (coddefe.length <= 5) {
                if (desdefe !== "") {
                    $.ajax({
                        type: 'POST',
                        url: url + '/GestionProyectos/public/index.php/registrar_defecto',
                        dataType: 'json',
                        data: {
                            intIdAgru: codagrupador,
                            varCodiDefe: coddefe,
                            varDescDefe: desdefe,
                            acti_usua: user
                        },
                        //xhr, ajaxOptions,
                        error: function (thrownError) {
                            if (thrownError === "Internal Server Error") {

                            }
                        },
                        success: function (responses) {
                            let mensaje_alert = responses.data.mensaje;
                            if (mensaje_alert === "Guardado con exito.") {
                                limpiar();
                                mensaje(true, mensaje_alert, "modal-create-defecto");
                                listar_defecto();
                            } else {
                                mensaje(false, mensaje_alert, "no");
                            }
                        }
                    });
                } else
                {
                    mensaje(false, "CAMPO DESCRIPCIÓN VACIO.", "NO");
                }

            } else {
                mensaje(false, "CODIGO INCOHERENTE", "no");
            }
        } else {
            mensaje(false, "CAMPO CODIGO VACIO.", "NO");
        }
    } else {
        mensaje(false, "CAMPO AGRUPADOR VACIO.", "NO");
    }
}

function actualizar_defecto(intid, intidag, descoddef, descdef) {
    if (descoddef !== "") {        
        if (descoddef.length <= 5) {
            if (descdef !== "") {
                var user = obtener_user();
                $.ajax({
                    type: 'POST',
                    url: url + '/GestionProyectos/public/index.php/actualizar_defecto',
                    dataType: 'json',
                    data: {
                        intIdDefe: intid,
                        intIdAgru: intidag,
                        varCodiDefe: descoddef,
                        varDescDefe: descdef,
                        usua_modi: user,
                        intIdEsta: updintest
                    },
                    error: function (thrownError) {
                        if (thrownError === "Internal Server Error") {
                            actualizar_defecto();
                        }
                    },
                    success: function (responses) {
                        let mensaje_alert = responses.data.mensaje;
                        if (mensaje_alert === "Actualizacion Satisfactoria.") {
                            mensaje(true, mensaje_alert, "modal-edit-defecto");
                        } else {
                            mensaje(false, mensaje_alert, "no");
                        }
                        $('#modal-edit-defecto').modal('hide');
                        listar_defecto();
                    }
                });
            } else {
                mensaje(false, "CAMPO DESCRIPCIÓN VACIO.", "NO");
            }
        } else
        {
            mensaje(false, "CODIGO INCOHERENTE", "no");
        }
    } else {
        mensaje(false, "CAMPO CODIGO VACIO.", "NO");
    }

}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        //console.log(arrData[0]);
        for (var index in arrData[0]) {
            if (index !== 'EDITAR') {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
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
            if (index !== 'EDITAR') {
                row += '"' + arrData[i][index] + '",';
            }
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }
    if (CSV === '') {
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


