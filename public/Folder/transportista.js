var data = [];
var dataAdapter = "";
$('#create_transportista').click(function () {
    limpiar();
    $('#modal-create-transportista').modal('show');
});
$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Transportistas", true);

});
$("#actualizar_transportista").click(function () {
    let idtransportista = $("#idtransportista").val();
    let razonsocial = $("#RazonSoci").val().toUpperCase();
    let ructransportista = $("#RucvarNumeIden").val();
    let direccion = $("#dire").val().toUpperCase();
    let idestado = $("#IdEstado").val();


    if (razonsocial !== "") {

        if (ructransportista !== "") {

            if (direccion !== "") {
                actualizar_transportista(idtransportista, ructransportista, razonsocial, direccion, idestado);
            } else {
                mensaje(false, "INGRESE LA DIRECCION", "no");
            }
        } else {
            mensaje(false, "INGRESE EL RUC", "no");
        }
    } else {

        mensaje(false, "INGRESE LA RAZON SOCIAL", "no");
    }

});

$('#registrar_transportista').click(function () {
    let razonSocial = $("#razon_social_transportista").val();
    let ruc = $("#ruc_transportista").val();
    let dire = $("#dire_transportista").val();
    //let idesta = $("#IdEstadocreate").val();

    if (razonSocial !== "") {

        if (ruc !== "") {

            if (dire !== "") {
                
                    registrar_transportista();
                
            } else {
                mensaje(false, "INGRESE LA DIRECCION", "no");
            }
        } else {
            mensaje(false, "INGRESE EL RUC", "no");
        }
    } else {

        mensaje(false, "INGRESE LA RAZON SOCIAL", "no");
    }

    //registrar_transportista();
});



function listar_transportista() {


    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tran',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_transportista();
            }
        },
        success: function (responses) {


            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdTrans', type: 'number'},
                    {name: 'varNumeIden', type: 'string'},
                    {name: 'varRazonSoci', type: 'string'},
                    {name: 'varDirec', type: 'string'},
                    {name: 'intIdEsta', type: 'number'},
                    {name: 'varDescEsta', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'string'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'string'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };


            dataAdapter = new $.jqx.dataAdapter(source);

            var editrow = -1;

            /**
             * SE DIBUJA LA TABLA
             */
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
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: 70, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.

                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                            $("#idtransportista").val(dataRecord.intIdTrans);
                            $("#RucvarNumeIden").val(dataRecord.varNumeIden);
                            $("#RazonSoci").val(dataRecord.varRazonSoci);
                            $("#dire").val(dataRecord.varDirec);
                            $("#IdEstado").val(dataRecord.intIdEsta);
                            $('#modal-edit-transportista').modal('show');


                        }
                    },
                    {
                        text: 'Eliminar', datafield: 'Eliminar', cellclassname: "special", columntype: 'button', width: 70, cellsrenderer: function () {
                            return "Eliminar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            eliminar_transportista(dataRecord.intIdTrans);
                        }
                    },
                    {text: 'Número', datafield: 'intIdTrans', width: 60, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'RUC', datafield: 'varNumeIden', width: 180},
                    {text: 'Razon Social', datafield: 'varRazonSoci', cellsalign: 'left', width: 230},
                    {text: 'Direccion', datafield: 'varDirec', cellsalign: 'left', width: 230},
                    {text: 'Estado', datafield: 'varDescEsta', cellsalign: 'left', width: 80},
                    {text: 'id_Estado', datafield: 'intIdEsta', cellsalign: 'left', width: 230, hidden: true},

                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'left', width: 200},
                    {text: 'Creado el', datafield: 'acti_hora', cellsalign: 'left', width: 200},
                    {text: 'Modificado por', datafield: 'usua_modi', cellsalign: 'left', width: 200},
                    {text: 'Modificado el', datafield: 'hora_modi', cellsalign: 'left', width: 230},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
            var dataCount = $('#grid').jqxGrid('getrows');
            var len = dataCount.length;
            $("#contador").val(len);



        }
    });
}


function actualizar_transportista(intIdTrans2, varNumeIden2, varRazonSoci2, varDirec2, intIdEsta2) {



    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/actu_tran',
        dataType: 'json',

        data: {
            intIdTrans: parseInt(intIdTrans2),
            varNumeIden: varNumeIden2,
            varRazonSoci: varRazonSoci2,
            varDirec: varDirec2,
            intIdEsta: parseInt(intIdEsta2),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                actualizar_transportista();
            }
        },

        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Actualizacion Satisfactoria.") {
                mensaje(true, mensaje_alert, "modal-edit-transportista");

            } else {
                mensaje(false, mensaje_alert, "modal-edit-transportista");
            }
            //$('#modal-edit-agrupacion').modal('hide');
            listar_transportista();
        }
    });
}
;

function registrar_transportista() {
    let razonsocial = $("#razon_social_transportista").val().toUpperCase();
    let ruc = $("#ruc_transportista").val().toUpperCase();
    let direccion = $("#dire_transportista").val().toUpperCase();
   // let estado = $("#IdEstadocreate").val();
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/regi_tran',
        dataType: 'json',
        data: {
            varNumeIden: ruc,
            varRazonSoci: razonsocial,
            varDirec: direccion,
            intIdEsta: parseInt(3),
            acti_usua: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                registrar_transportista();
            }
        },
        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Registro Satisfactorio.") {
                mensaje(true, mensaje_alert, "modal-create-transportista");
            } else {
                mensaje(false, mensaje_alert, "modal-create-transportista");
            }
            listar_transportista();
        }
    });
}
;

function eliminar_transportista(idtransportista) {
    let user = obtener_user();

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/elim_tran',
        dataType: 'json',
        data: {
            intIdTrans: parseInt(idtransportista),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                eliminar_armadores();
            }
        },
        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Se ha eliminado.") {
                mensaje(true, mensaje_alert, "no");

            } else {
                mensaje(false, mensaje_alert, "no");
            }
            //$('#modal-edit-agrupacion').modal('hide');
            listar_transportista();
        }

    });
}
;
function cmbx_listar_estado() {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/eleg_proc_estado',
        dataType: 'json',
        data: {
            intIdProcEsta: parseInt(5),

        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                cmbx_listar_estado();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdEsta + '">' + responses.data[c]
                        .varDescEsta + '</option>';
                $("#IdEstado").html(va);
                //$("#IdEstadocreate").html(va);


            }

        }
    });
}
;

function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}
;

function limpiar() {
    $("#razon_social_transportista").val("");
    $("#ruc_transportista").val("");
    $("#dire_transportista").val("");
    $("#IdEstadocreate").val("");
}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    console.log(arrData);
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