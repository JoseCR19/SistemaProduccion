//DECLARACION DE VARIABLE
var editrow = 0;
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    codigo_usuario = cod_user[0].codigo_usuario;
    return codigo_usuario;
}
//LIMPIAR 
function limpiar() {
    $("#codigo2").val('');
    $("#descripcion2").val('');
    $('#estado4').jqxDropDownList({selectedIndex: 0, disabled: true});
    $("#codigo").val('');
    $("#descripcion6").val('');
    $("#codigo2").focus();
}
//INVOCA Y LLAMA AL MODAL DE LA PAGINA
$('#create').click(function () {
    limpiar();
    $('#modal-create-tipoestructura').modal('show');
});
//REGISTRA LOS DATOS DEL MODAL
$('#agregar').click(function () {
    registrar_tipo_estructura();
});

//EXPORTAR A EXCEL
$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Tipo Estructura", true);
})

$("#actualizar1").on('click', function () {
    if (editrow >= 0) {
        //alert("hola");
        var row = {
            intIdTipoEstru: $("#id").val(),
            varCodiEstru: $("#codigo").val().toUpperCase(),
            varDescrip: $("#descripcion6").val().toUpperCase(),
            varEstaEstru: $("#estado6").val(),
        };
        actualizar_tipo_estructura(row.intIdTipoEstru, row.varCodiEstru, row.varDescrip, row.varEstaEstru);
    }
});


function listar_estados() {
    //var estados = [];
    var estados = [{vad_cod: 'ACT', var_codigo: 'ACTIVO'}, {vad_cod: 'INA', var_codigo: 'INACTIVO'}];
    //estados.push(act);
    //var inc = {vad_cod: 'INA', var_codigo: 'INACTIVO'};
//    /*ARRAY CON ESTADOS*/
    //estados.push(inc);
//    /*SOURCE ES PARA EL jqxDropDownList jqxComboBox*/
    //console.log(estados);
    var source =
            {
                localdata: estados,
                datatype: "array"
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#estado4').jqxDropDownList({selectedIndex: -1, placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "var_codigo", valueMember: "vad_cod", itemHeight: 20, height: 35, width: 250, dropDownHeight: 50});
}

function listar_estados_Editar() {
    // var estados = [];
    var estados = [{vad_cod: 'ACT', var_codigo: 'ACTIVO'}, {vad_cod: 'INA', var_codigo: 'INACTIVO'}];
    //estados.push(act);
    //var inc = {vad_cod: 'INA', var_codigo: 'INACTIVO'};
//    /*ARRAY CON ESTADOS*/
    //estados.push(inc);
//    /*SOURCE ES PARA EL jqxDropDownList jqxComboBox*/
    // console.log(estados);
    var source =
            {
                localdata: estados,
                datatype: "array"
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#estado6').jqxDropDownList({placeHolder: "", source: dataAdapter, displayMember: "var_codigo", valueMember: "vad_cod", itemHeight: 20, height: 35, width: 250, dropDownHeight: 50});
}

function listar_tipoestructura() {
    //access_token = obtener_access_token();
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/listar_tipo_Estructura',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_tipoestructura();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdTipoEstru', type: 'number'},
                    {name: 'varCodiEstru', type: 'string'},
                    {name: 'varDescrip', type: 'string'},
                    {name: 'varEstaEstru', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'datetime'}, //time
                    {name: 'varEstado', type: 'string'},
                    {name: 'acti_hora', type: 'datetime'},
                ], updaterow: function (rowid, rowdata, commit) {
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
                //autoheight: true,
                //pageable: true,
                showgroupaggregates: true,
                columns: [
                    {
                        text: 'EDITAR', datafield: 'Editar', columntype: 'button', width: 100, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            listar_estados_Editar();
                            editrow = row;
                            //var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $('#modal-edit-tipoestructura').modal('show');
                            $("#id").val(dataRecord.intIdTipoEstru);
                            $("#codigo").val(dataRecord.varCodiEstru);
                            //alert(dataRecord.varDescrip);
                            $("#descripcion6").val(dataRecord.varDescrip);
                            $("#estado6").val(dataRecord.varEstado);
                            $("#usuario").val(dataRecord.acti_usua);
                            $("#usuariomod").val(dataRecord.usua_modi);
                            $("#horamod").val(dataRecord.hora_modi);
                        }
                    },
                    {text: 'ID', datafield: 'intIdTipoEstru', width: 52, cellsalign: 'center', aggregates: [{
                                '<b>N°</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'CODIGO', datafield: 'varCodiEstru', width: 130},
                    {text: 'DESCRIPCIÓN', datafield: 'varDescrip', cellsalign: 'left', width: 410},
                    {text: 'ESTADO', datafield: 'varEstaEstru', width: 90},
                    {text: 'CREADO POR', datafield: 'acti_usua', width: 145},
                    {text: 'CREADO EL', datafield: 'acti_hora', width: 175},
                    {text: 'MODIFICADO POR', datafield: 'usua_modi', width: 160},
                    {text: 'MODIFICADO EL', datafield: 'hora_modi', width: 205}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });
}
//REGISTRA TIPOS ESTRUCTURA
function registrar_tipo_estructura() {
    //access_token = obtener_access_token();
    let codigo = $('#codigo2').val().toUpperCase();
    let descripcion = $('#descripcion2').val().toUpperCase();
    let estado = $('#estado4').val().toUpperCase();
    let user = obtener_user();
    if (codigo !== "") {
        if (descripcion !== "") {
            if (estado !== "") {
                $.ajax({
                    type: 'POST',
                    url: url + '/GestionProyectos/public/index.php/registrar_tipo_estructura',
                    dataType: 'json',
                    data: {
                        varCodiEstru: codigo,
                        varDescrip: descripcion,
                        varEstaEstru: estado,
                        acti_usua: user
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        if (thrownError == "Internal Server Error") {
                            registrar_tipo_estructura();
                        }
                    },
                    success: function (responses) {
                        let mensaje_alert = responses.data.mensaje;
                        if (mensaje_alert == "Guardado con exito.") {
                            limpiar();
                            mensaje(true, mensaje_alert, "modal-create-tipoestructura");
                            listar_tipoestructura();
                        } else {
                            mensaje(false, mensaje_alert, "no");
                            //var element2 = document.getElementById("codigo4");
                            //element2.classList.add("is-invalid");
                        }
                        listar_tipoestructura();
                    }
                });
            } else
            {
                mensaje(false, "CAMPO ESTADO VACIO.", "NO");
            }
        } else {
            mensaje(false, "CAMPO DESCRIPCIÓN VACIO.", "NO");
        }
    } else {
        mensaje(false, "CAMPO CODIGO VACIO.", "NO");
    }
}

function actualizar_tipo_estructura(id, codigo, descripcion, estado) {
    //access_token = obtener_access_token();
    //alert(estado);
    if (codigo !== "") {
        if (descripcion !== "") {
            var user = obtener_user();
            $.ajax({
                type: 'POST',
                url: url + '/GestionProyectos/public/index.php/actualizar_tipo_estructura',
                dataType: 'json',
                data: {
                    intIdTipoEstru: id,
                    varCodiEstru: codigo,
                    varDescrip: descripcion,
                    varEstaEstru: estado,
                    usua_modi: user
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError == "Internal Server Error") {
                        actualizar_tipo_estructura();
                    }
                },
                success: function (responses) {
                    let mensaje_alert = responses.data.mensaje;
                    if (mensaje_alert == "Actualizacion Satisfactoria.") {
                        mensaje(true, mensaje_alert, "modal-edit-tipoestructura");

                    } else {
                        mensaje(false, mensaje_alert, "no");
                        var element2 = document.getElementById("codigo4");
                        element2.classList.add("is-invalid");
                    }
                    //alert("hola");
                    $('#modal-edit-tipoestructura').modal('hide');
                    listar_tipoestructura();
                }
            });
        } else {
            mensaje(false, "CAMPO DESCRIPCIÓN VACIO.", "NO");
        }
    } else {
        mensaje(false, "CAMPO CODIGO VACIO.", "NO");
    }

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


