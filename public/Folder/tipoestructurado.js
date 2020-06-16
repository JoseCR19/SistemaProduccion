var editrow = 0;
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    codigo_usuario = cod_user[0].codigo_usuario;
    return codigo_usuario;
}

function limpiar() {
    $("#descripEstructurado").val('');
    $("#estadoEstructurado").jqxDropDownList({selectedIndex: 0, disabled: true});
}

$('#create').click(function () {
    $('#modal-create-tipoestructurado').modal('show');
    limpiar();
});

//REGISTRA LOS DATOS DEL MODAL
$('#agregar').click(function () {
    registrar_tipo_estructurado();
});

$("#update").on('click', function () {
    if (editrow >= 0) {
        var row = {
            intIdTipoEstructurado: $("#id").val(),
            varDescTipoEstru: $("#descestruc").val().toUpperCase(),
            varEstaTipoEstru: $("#estado9").val().toUpperCase(),
        };
        actualizar_tipo_estructurado(row.intIdTipoEstructurado, row.varDescTipoEstru, row.varEstaTipoEstru);
    }
});

function listar_estados() {
    var estados = [{cod_Estructurado: 'ACT', des_Estructurado: 'ACTIVO'}, {cod_Estructurado: 'INA', des_Estructurado: 'INACTIVO'}];
    var source =
            {
                localdata: estados,
                datatype: "array"
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#estadoEstructurado').jqxDropDownList({selectedIndex: -1, placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "des_Estructurado", valueMember: "cod_Estructurado", itemHeight: 20, height: 35, width: 250, dropDownHeight: 50});
}

function listar_estados_Editar() {
    var estados = [{cod_Estructurado: 'ACT', des_Estructurado: 'ACTIVO'}, {cod_Estructurado: 'INA', des_Estructurado: 'INACTIVO'}];
    var source =
            {
                localdata: estados,
                datatype: "array"
            };
    var dataAdapter = new jQuery.jqx.dataAdapter(source);
    $('#estado9').jqxDropDownList({placeHolder: "", source: dataAdapter, displayMember: "des_Estructurado", valueMember: "cod_Estructurado", itemHeight: 20, height: 35, width: 250, dropDownHeight: 50});
}
;

$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Tipo Estructurado", true);
});


function listar_tipoestructurado() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_estru',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_tipoestructurado();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdTipoEstructurado', type: 'number'},
                    {name: 'varDescTipoEstru', type: 'string'},
                    {name: 'varEstaTipoEstru', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'datetime'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'datetime'},
                    {name: 'desEstaTipoEstru', type: 'string'}
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
                columns:
                        [
                            {
                                text: 'EDITAR', datafield: 'Editar', columntype: 'button', width: 100, cellsrenderer: function () {
                                    return "Editar";
                                }, buttonclick: function (row) {
                                    // listar_estados_Editar();
                                    editrow = row;
                                    //var offset = $("#grid").offset();
                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                    $('#modal-edit-tipoestructurado').modal('show');
                                    $("#id").val(dataRecord.intIdTipoEstructurado);
                                    $("#descestruc").val(dataRecord.varDescTipoEstru);
                                    $("#estado9").val(dataRecord.varEstaTipoEstru);
                                    $("#usuario").val(dataRecord.acti_usua);
                                    $("#usuariomod").val(dataRecord.usua_modi);
                                    $("#horamod").val(dataRecord.hora_modi);
                                    $("#desEstaEstructurado").val(dataRecord.desEstaTipoEstru);
                                    //alert(dataRecord.desEstaTipoEstru);
                                }
                            },
                            {text: 'ID', datafield: 'intIdTipoEstructurado', width: 55, cellsalign: 'center', aggregates: [{
                                        '<b>N°</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                            {text: 'DESCRIPCIÓN', datafield: 'varDescTipoEstru', cellsalign: 'left', width: 455},
                            {text: 'ESTADO', datafield: 'desEstaTipoEstru', width: 125},
                            {text: 'CREADO POR', datafield: 'acti_usua', width: 155},
                            {text: 'CREADO EL', datafield: 'acti_hora', width: 175},
                            {text: 'MODIFICADO POR', datafield: 'usua_modi', width: 160},
                            {text: 'MODIFICADO EL', datafield: 'hora_modi', width: 205}
                        ]


            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });
}

//Registrar Tipo Estructurado.
function registrar_tipo_estructurado() {
    let descripcion = $('#descripEstructurado').val().toUpperCase();
    let estado = $('#estadoEstructurado').val().toUpperCase();
    let user = obtener_user();
    listar_estados();
    if (descripcion !== "") {
        if (estado !== "") {
            $.ajax({
                type: 'POST',
                url: url + '/GestionProyectos/public/index.php/regis_tipo_estru',
                dataType: 'json',
                data: {
                    varDescTipoEstru: descripcion,
                    varEstaTipoEstru: estado,
                    acti_usua: user
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError == "Internal Server Error") {
                        registrar_tipo_estructurado();
                    }
                },
                success: function (responses) {
                    let mensaje_alert = responses.data.mensaje;
                    if (mensaje_alert == "Guardado con exito.") {
                        mensaje(true, mensaje_alert, "modal-create-tipoestructurado");
                        listar_tipoestructurado();                       
                    } else {
                        mensaje(false, mensaje_alert, "no");
                        $("#estadoEstructurado").jqxDropDownList({selectedIndex: 0, disabled: true});
                      
                    }
                    $('#modal-create-tipoestructurado').modal('hide');
                }
            });
        } else
        {
            mensaje(false, "CAMPO ESTADO VACIO.", "NO");
            $('#modal-create-tipoestructurado').modal('hide');
        }
    } else {
        mensaje(false, "CAMPO DESCRIPCIÓN VACIO.", "NO");
        $('#modal-create-tipoestructurado').modal('hide');
        listar_tipoestructurado();
    }
}

function actualizar_tipo_estructurado(id, descripcion, estado) {
    //alert(id);    
    if (descripcion !== "") {
        var user = obtener_user();
        $.ajax({
            type: 'POST',
            url: url + '/GestionProyectos/public/index.php/actu_tipo_estru',
            dataType: 'json',
            data: {
                intIdTipoEstructurado: id,
                varDescTipoEstru: descripcion,
                varEstaTipoEstru: estado,
                usua_modi: user

            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    //actualizar_tipo_estructurado();
                }
            },
            success: function (responses) {
                let mensaje_alert = responses.data.mensaje;
//                console.log("entrea");
                //alert(mensaje_alert);
                listar_tipoestructurado();
                if (mensaje_alert == "Actualizacion Satisfactoria.") {
                    mensaje(true, mensaje_alert, "modal-edit-tipoestructurado");
                } else {
                    mensaje(false, mensaje_alert, "no");
                    //var element2 = document.getElementById("codigo4");
                    //element2.classList.add("is-invalid");
                }
                $('#modal-edit-tipoestructurado').modal('hide');
            }
        });
    } else {
        mensaje(false, "CAMPO DESCRIPCIÓN VACIO.", "NO");
        $('#modal-edit-tipoestructurado').modal('hide');
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
    var fileName = "Mi_Reporte";
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



