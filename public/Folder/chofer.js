var data = [];
var dataAdapter = "";
$('#actualizar_chofer').click(function () {
    let id_chofer = $("#idchofer").val();
    let nomb_chofer = $('#NombChofer_upda').val().toUpperCase().trim();
    let estado = $('#id_estado_chofer_edit').val();
    let trans_edit =  $('#id_transportista_edit').val();
    if (nomb_chofer == "") {
        mensaje(false, "INGRESE EL NOMBRE DEL CHOFER", "no");
    } else {
        actualizar_chofer(id_chofer, nomb_chofer, estado,trans_edit);
    }
});
$('#excel').click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Series", true);
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
        alert("Invalid data");
        return;
    }

//Generate a file name
    var fileName = "Mi_Reporte_chofer";
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



$('#create_chofer').click(function () {
    campo_vacio();
    
    $('#modal-create-chofer').modal('show');
});

$('#guardar_chofer').click(function () {
    let num_iden = $('#NumeIden_crea').val().toUpperCase().trim();
    let nombchofe = $('#NombChofer_crea').val().toUpperCase().trim();
    let numelicen = $('#varNumeLicen_crea').val().toUpperCase().trim();
    //let id_estado = $('#id_estado_chofer_create').val();
    let id_trans = $('#id_transportista_create').val();
   
    if (num_iden == "") {
        mensaje(false, "INGRESE EL NUMERO DE IDENTIDAD", "no");
    } else {
        if (nombchofe == "") {
            mensaje(false, "INGRESE NOMBRE DEL CHOFER", "no");
        } else {
            if (numelicen == "") {
                mensaje(false, "INGRESE NUMERO DE LICENCIA", "no");
            } else {
                if (id_trans == null) {
                        mensaje(false, "INGRESE EL TRANSPORTISTA", "no");
                } else {
                 

                        registrar_chofer(num_iden, nombchofe, numelicen,id_trans);
                    
                }

            }
        }
    }
});
function listar_chofer() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_chof',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_chofer();
            }
        },
        success: function (responses) {
           
            var source = {

                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdChofer', type: 'String'},
                    {name: 'varNombChofer', type: 'String'},
                    {name: 'intIdTrans', type: 'String'},
                    {name: 'varRazonSoci', type: 'String'},
                    {name: 'varNumeIden', type: 'String'},
                    {name: 'varNumeLicen', type: 'String'},
                    {name: 'intIdEsta', type: 'String'},
                    {name: 'varDescEsta', type: 'String'},
                    {name: 'acti_usua', type: 'String'},
                    {name: 'acti_hora', type: 'String'},
                    {name: 'usua_modi', type: 'String'},
                    {name: 'hora_modi', type: 'String'},
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
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: 90, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                        
                            editrow = row;
                           
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                                console.log(dataRecord);
                            $("#idchofer").val(dataRecord.intIdChofer);
                            
                            $("#NumeIden_upda").val(dataRecord.varNumeIden);
                            $("#NombChofer_upda").val(dataRecord.varNombChofer);

                            $("#varNumeLicen_upda").val(dataRecord.varNumeLicen);
                            $("#id_estado_chofer_edit").val(dataRecord.intIdEsta);
                            $("#id_transportista_edit").val(dataRecord.intIdTrans);
                            $('#modal-edit-chofer').modal('show');
                        }
                    },
                    {
                        text: 'Eliminar', datafield: 'Eliminar', cellclassname: "special", columntype: 'button', width: 90, cellsrenderer: function () {
                            return "Eliminar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            eliminar_chofer(dataRecord.intIdChofer);

                        }
                    },
                    {text: 'Número', datafield: 'intIdChofer', width: 60, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Nombre Completo', datafield: 'varNombChofer', width: 180},
                    {text: 'Id_trans', datafield: 'intIdTrans', width: 180,hidden:true},
                    {text: 'Transportista', datafield: 'varRazonSoci', width: 180},
                    
                    {text: 'Num.Identidad', datafield: 'varNumeIden', width: 130},
                    {text: 'Licencia', datafield: 'varNumeLicen', width: 150},
                    {text: 'id_estado', datafield: 'intIdEsta', cellsalign: 'left', width: 190, hidden: true},
                    {text: 'Estado', datafield: 'varDescEsta', cellsalign: 'left', width: 80},
                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'left', width: 150},
                    {text: 'Creado el', datafield: 'acti_hora', cellsalign: 'left', width: 180},
                    {text: 'Modificado por', datafield: 'usua_modi', width: 150},
                    {text: 'Modificado el', datafield: 'hora_modi', width: 180},
                ]
            });
        }

    });
}
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
                $("#id_estado_chofer_edit").html(va);
                //$("#id_estado_chofer_create").html(va);
            }
        }
    });
}

function actualizar_chofer(id_chofer2, nomb_chofer2, estado2,trans_edit2) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/actu_chof',
        dataType: 'json',
        data: {
            intIdChofer: id_chofer2,
            intIdTrans:trans_edit2,
            varNombChofer: nomb_chofer2,
            intIdEsta: estado2,
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_chofer();
            }
        },
        success: function (responses) {
            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Actualizacion Satisfactoria.") {
               
                 mensaje_noti(true, mensaje_alert, "modal-edit-chofer");
               // mensaje_noti(true, mensaje_alert, "modal-anular-reproceso");
            } else {
                mensaje(false, mensaje_alert, "no");
            }
            listar_chofer();
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
function eliminar_chofer(idchofer) {
    let user = obtener_user();

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/elim_chof',
        dataType: 'json',

        data: {
            intIdChofer: parseInt(idchofer),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                eliminar_chofer();
            }
        },
        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Se ha eliminado.") {
                mensaje(true, mensaje_alert, "no");

            } else {
                mensaje(false, mensaje_alert, "no");
            }

            listar_chofer();
        }

    });


}


function registrar_chofer(num_iden2, nombchofe2, numelicen2,id_trans2) {

    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/regi_chof',
        dataType: 'json',
        data: {
            intIdTrans:id_trans2,
            varNumeIden: num_iden2,
            varNombChofer: nombchofe2,
            varNumeLicen: numelicen2,
            intIdEsta: 3,
            acti_usua: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                registrar_motivo(num_iden2, nombchofe2, numelicen2, id_estado2);
            }
        },
        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Registro Satisfactorio.") {
                mensaje_noti(true, mensaje_alert, "modal-create-chofer");
            } else {
                mensaje(false, mensaje_alert, "no");
            }
            listar_chofer();
        }
    });

}
function campo_vacio() {
    $("#NumeIden_crea").val("");
    $("#NombChofer_crea").val("");
    $("#varNumeLicen_crea").val("");
    $("#id_estado_chofer_create").val("");
    $("#id_transportista_create").val('');
}




function cmbx_listar_transportista() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tran_activo',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                cmbx_listar_transportista();
            }
        },
        success: function (responses) {
            //  console.log(responses);
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdTrans + '">' + responses.data[c]
                        .varRazonSoci + '</option>';
                $("#id_transportista_create").html(va);
                $('#id_transportista_edit').html(va);
            }
        }
    });
}