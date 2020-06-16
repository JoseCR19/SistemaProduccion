var data = [];
var dataAdapter = "";
$('#create').click(function () {
    limpiar();
    $('#modal-create-agrupacion').modal('show');
});
$('#agregar').click(function () {
    registrar_agrupacion();
});
$("#codigo2").keypress(function () {
    var element2 = document.getElementById("codigo2");
    element2.classList.remove("is-invalid");
});
$("#codigo").keypress(function () {
    var element = document.getElementById("codigo");
    element.classList.remove("is-invalid");
});
$("#cerrar_modal_registrar").on('click', function () {
    limpiar();
});
$("#cerrar_modal_infe").on('click', function () {
    limpiar();
});
$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Agrupación", true);
});
function listar_agrupacion() {
    //access_token = obtener_access_token();
    $.ajax({
        type: 'GET',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionProyectos/public/index.php/list_agru',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_agrupacion();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdAgru', type: 'number'},
                    {name: 'varCodiAgru', type: 'string'},
                    {name: 'varDescAgru', type: 'string'},
                    {name: 'varEstaAgru', type: 'string'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };


            dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;

            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                showfilterrow: true,
                filterable: true,
                selectionmode: 'multiplecellsextended',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                altrows: true,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: 100, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            $('#modal-edit-agrupacion').modal('show');
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $("#id").val(dataRecord.intIdAgru);
                            $("#codigo").val(dataRecord.varCodiAgru);
                            $("#descripcion_edit_agrupador").val(dataRecord.varDescAgru);
                            $("#estado_agrupador").val(dataRecord.varEstaAgru);
                          
                        }
                    },
                    {text: 'Número', datafield: 'intIdAgru', width: 55, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Código', datafield: 'varCodiAgru', width: 150},
                    {text: 'Descripción', datafield: 'varDescAgru', width: 800},
                    {text: 'Estado', datafield: 'varEstaAgru', width: 120}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
            $("#actualizar_agrupacion").click(function () {
                if (editrow >= 0) {
                    var row = {
                        intIdAgru: $("#id").val(),
                        varCodiAgru: $("#codigo").val().toUpperCase(),
                        varDescAgru: $("#descripcion_edit_agrupador").val().toUpperCase(),
                        varEstaAgru: $("#estado_agrupador").val(),
                    };
                    actualizar_agrupacion(row.intIdAgru, row.varCodiAgru, row.varDescAgru, row.varEstaAgru);

                }
            });
        }

    });
}
function actualizar_agrupacion(id, codigo, descripcion, estado) {
    //access_token = obtener_access_token();
  
    if (codigo !== "") {
        if (descripcion !== "") {
            var user = obtener_user();
            $.ajax({
                type: 'POST',
                //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/actu_agru',
                url: url + '/GestionProyectos/public/index.php/actu_agru',
                dataType: 'json',
                data: {
                    intIdAgru: id,
                    varCodiAgru: codigo,
                    varDescAgru: descripcion,
                    varEstaAgru: estado,
                    usua_modi: user
                },
                /*beforeSend: function (xhr) {
                 xhr.setRequestHeader('Authorization', access_token);
                 }*/
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError == "Internal Server Error") {
                        actualizar_agrupacion();
                    }
                },
                success: function (responses) {
                    let mensaje_alert = responses.data.mensaje;
                    if (mensaje_alert == "Actualizacion Satisfactoria.") {
                        mensaje(true, mensaje_alert, "modal-edit-agrupacion");

                    } else {
                        mensaje(false, mensaje_alert, "no");
                        var element2 = document.getElementById("codigo");
                        element2.classList.add("is-invalid");
                    }
                    //$('#modal-edit-agrupacion').modal('hide');
                    listar_agrupacion();
                }
            });
        } else {
            mensaje(false, "Campo DESCRIPCIÓN vacio.", "no");
        }
    } else {
        mensaje(false, "Campo CODIGO vacio.", "no");
    }

}
function registrar_agrupacion() {
    //access_token = obtener_access_token();
    let codigo = $('#codigo2').val().toUpperCase();
    let descripcion = $('#descripcion2').val().toUpperCase();
    let user = obtener_user();

    if (codigo !== "") {
        if (descripcion !== "") {
            $.ajax({
                type: 'POST',
                //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/regi_agru',
                url: url + '/GestionProyectos/public/index.php/regi_agru',
                dataType: 'json',
                data: {
                    varCodiAgru: codigo,
                    varDescAgru: descripcion,
                    acti_usua: user
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError == "Internal Server Error") {
                        registrar_agrupacion();
                    }
                },
                /*beforeSend: function (xhr) {
                 xhr.setRequestHeader('Authorization', access_token);
                 }*/
                success: function (responses) {

                    let mensaje_alert = responses.data.mensaje;
                    if (mensaje_alert == "Guardado con exito.") {
                        limpiar();
                        mensaje(true, mensaje_alert, "modal-create-agrupacion");
                    } else {
                        mensaje(false, mensaje_alert, "no");
                        var element2 = document.getElementById("codigo2");
                        element2.classList.add("is-invalid");
                    }
                    listar_agrupacion();
                }
            });
        } else {
            mensaje(false, "Campo DESCRIPCIÓN vacio.", "no");
        }
    } else {
        mensaje(false, "Campo CODIGO vacio.", "no");
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
function limpiar() {
    $("#codigo2").val('');
    $("#descripcion2").val('');
    $("#estado2").val('ACT');
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