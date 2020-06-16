var editrow = 0;
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    codigo_usuario = cod_user[0].codigo_usuario;
    return codigo_usuario;
}

function listar_estados_tipogrupo() {
    var estados = [{codgru: 3, descgru: 'ACTIVO'}, {codgru: 14, descgru: 'INACTIVO'}];
    var source = {localdata: estados, datatype: "array"};
    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#estgru').jqxDropDownList({selectedIndex: -1, placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "descgru", valueMember: "codgru", itemHeight: 20, height: 35, width: 250, dropDownHeight: 50});
}

function listar_estados_tipogrupo_Editar() {
    var estados = [{codgru: 3, descgru: 'ACTIVO'}, {codgru: 14, descgru: 'INACTIVO'}];
    var source = {localdata: estados, datatype: "array"};
    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#edt').jqxDropDownList({selectedIndex: -1, placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "descgru", valueMember: "codgru", itemHeight: 20, height: 35, width: 250, dropDownHeight: 50});
}

function limpiar() {
    $("#idg").val('');
    $("#desgru").val('');
    $('#estgru').jqxDropDownList({selectedIndex: 0, disabled: true});
}
$('#create').click(function () {
    //alert("hola");
    limpiar();
    $('#modal-create-tipogrupo').modal('show');
});

$('#agregar').click(function () {
    registrar_tipo_grupo();
});

$("#actualedit").on('click', function () {
    if (editrow >= 0) {
        var row = {
            intIdTipoGrupo: $("#idt").val(),
            varCodiTipoGrupo: $("#idge").val().toUpperCase(),
            varDescTipoGrupo: $("#desgrue").val().toUpperCase(),
            intIdEsta: $("#edt").val()
        };
        actualizar_tipo_grupo(row.intIdTipoGrupo, row.varCodiTipoGrupo, row.varDescTipoGrupo, row.intIdEsta);
    }
});

$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Tipo Grupo", true);
});

function listar_tipogrupo() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/listar_tipo_grupo',
        dataType: 'json',
        error: function (thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_tipogrupo();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdTipoGrupo', type: 'number'},
                    {name: 'varCodiTipoGrupo', type: 'string'},
                    {name: 'varDescTipoGrupo', type: 'string'},
                    {name: 'intIdEsta', type: 'number'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'datetime'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'datetime'},
                    {name: 'varDescEsta', type: 'string'},
                    {name: 'codEstado', type: 'string'},
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
                            listar_estados_tipogrupo_Editar();
                            editrow = row;
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $('#modal-edit-tipogrupo').modal('show');
                            //alert(dataRecord.intIdTipoGrupo);
                            $("#idt").val(dataRecord.intIdTipoGrupo);
                            $("#idge").val(dataRecord.varCodiTipoGrupo);
                            $("#desgrue").val(dataRecord.varDescTipoGrupo);
                            $("#edt").val(dataRecord.intIdEsta);
                            //$("#nomusu").val(dataRecord.acti_usua);
                            //$("#acthora").val(dataRecord.acti_hora);
                        }
                    },
                    {text: 'ID', datafield: 'intIdTipoGrupo', width: 52, cellsalign: 'center', aggregates: [{
                                '<b>N°</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'CODIGO', datafield: 'varCodiTipoGrupo', width: 130},
                    {text: 'DESCRIPCIÓN', datafield: 'varDescTipoGrupo', cellsalign: 'left', width: 410},
                    {text: 'ESTADO', datafield: 'varDescEsta', width: 90},
                    {text: 'CREADO POR', datafield: 'acti_usua', width: 145},
                    {text: 'CREADO EL', datafield: 'acti_hora', width: 175},
                    {text: 'MODIFICADO POR', datafield: 'usua_modi', width: 160},
                    {text: 'MODIFICADO EL', datafield: 'hora_modi', width: 205}
                ]
            });
            //$("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });
}


function registrar_tipo_grupo() {
    let codigo = $('#idg').val().toUpperCase();
    let descripcion = $('#desgru').val().toUpperCase();
    let estado = $('#estgru').val().toUpperCase();
    let user = obtener_user();
    if (codigo !== "") {
        if (descripcion !== "") {
            if (estado !== "") {
                $.ajax({
                    type: 'POST',
                    url: url + '/GestionProyectos/public/index.php/registrar_tipo_grupo',
                    dataType: 'json',
                    data: {
                        varCodiTipoGrupo: codigo,
                        varDescTipoGrupo: descripcion,
                        //varDescEsta: estado,
                        acti_usua: user
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        if (thrownError === "Internal Server Error") {
                            registrar_tipo_grupo();
                        }
                    },
                    success: function (responses) {
                        let mensaje_alert = responses.data.mensaje;
                        if (mensaje_alert === "Guardado con exito.") {
                            limpiar();
                            mensaje(true, mensaje_alert, "modal-create-tipogrupo");
                            listar_tipogrupo();
                        } else {
                            mensaje(false, mensaje_alert, "no");
                        }
                        listar_tipogrupo();
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

function actualizar_tipo_grupo(id, codigo, descripcion, idest) {
    if (codigo !== "") {
        if (descripcion !== "") {
            var user = obtener_user();
            $.ajax({
                type: 'POST',
                url: url + '/GestionProyectos/public/index.php/actualizar_tipo_grupo',
                dataType: 'json',
                data: {
                    intIdTipoGrupo: id,
                    varCodiTipoGrupo: codigo,
                    varDescTipoGrupo: descripcion,
                    intIdEsta: idest,
                    usua_modi: user
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError == "Internal Server Error") {
                        actualizar_tipo_grupo();
                    }
                },
                success: function (responses) {
                    let mensaje_alert = responses.data.mensaje;
                    if (mensaje_alert == "Actualizacion Satisfactoria.") {
                        mensaje(true, mensaje_alert, "modal-edit-tipogrupo");

                    } else {
                        mensaje(false, mensaje_alert, "no");
                        var element2 = document.getElementById("codigo4");
                        element2.classList.add("is-invalid");
                    }
                    //alert("hola");
                    $('#modal-edit-tipogrupo').modal('hide');
                    listar_tipogrupo();
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