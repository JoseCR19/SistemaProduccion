
var data = [];
var dataAdapter = "";


$('#actualizar_motivo').click(function () {
    let idmotivo = $("#idmotivo").val();
    let descripcion = $("#descr_motivo").val().toUpperCase().trim();
    let tipomotivo = $("#id_tipomotivoedit").val();
    let idestado = $("#id_estado_motivo_edit").val();

    if (descripcion == "") {

        mensaje(false, "INGRESE LA DESCRIPCION", "no");
    } else {
        actualizar_motivo(idmotivo, descripcion, tipomotivo, idestado);
    }


});

$('#createmotivo').click(function () {
    limpiar_campo();
    $('#modal-create-motivo').modal('show');
});

$('#registrarmotivo').click(function () {


    let descripcion = $("#descrp_motivo").val().toUpperCase().trim();
    let id_tipo_motivo = $("#id_tipomotivocreate").val();
    let id_estado_crea = $("#id_estado_motivo_create").val();

    if (descripcion == "") {
        mensaje(false, "INGRESE UNA DESCRIPCION", "no");
    } else {
        if (id_tipo_motivo == null) {
            mensaje(false, "SELECCIONE UN TIPO DE MOTIVO", "no");
        } else {
            if (id_estado_crea == null) {
                mensaje(false, "SELECCIONE UN ESTADO", "no");
            } else {
                registrar_motivo(descripcion, id_tipo_motivo, id_estado_crea);
            }
        }
    }
});


$('#excel_motivo').click(function () {

    var data_info = "";
    var data_rows = "";
    var data_info = jQuery('#grid').jqxGrid('getdatainformation');

    data_rows = data_info.rowscount;

    //jQuery("#repo_ries_suce_vers_acci_lbl_mens").html("");
    if (data_rows === 0) {
        mensaje(false, "No hay datos que exportar", "no");
    } else {

        var rows = $("#grid").jqxGrid("exportData",'json');

        expo_arch_exce(rows, "REPORTE MOTIVO", true);

    }

});




function listar_motivo() {

    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_moti',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_motivo();
            }
        },
        success: function (responses) {

            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdMoti', type: 'String'},
                    {name: 'intIdTipoMoti', type: 'String'},
                    {name: 'DescpTipomotivo', type: 'String'},
                    {name: 'varDescripcion', type: 'String'},
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
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: 90, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.


                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                            $("#idmotivo").val(dataRecord.intIdMoti);
                            $("#descr_motivo").val(dataRecord.varDescripcion);
                            $("#id_tipomotivoedit").val(dataRecord.intIdTipoMoti);
                            $("#id_estado_motivo_edit").val(dataRecord.intIdEsta);
                            $('#modal-edit-motivo').modal('show');

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
                            eliminar_motivo(dataRecord.intIdMoti);

                        }
                    },
                    

                    {text: 'Número', datafield: 'intIdMoti', width: 60, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'id_TipoMotivo', datafield: 'intIdTipoMoti', width: 180, hidden: true},
                    {text: 'Tipo Motivo', datafield: 'DescpTipomotivo', width: 150},
                    {text: 'Descripcion', datafield: 'varDescripcion', width: 250},
                    {text: 'id_estado', datafield: 'intIdEsta', cellsalign: 'left', width: 190, hidden: true},
                    {text: 'Estado', datafield: 'varDescEsta', cellsalign: 'left', width: 80},
                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'left', width: 160},
                    {text: 'Creado el', datafield: 'acti_hora', cellsalign: 'left', width: 180},
                    {text: 'Modificado por', datafield: 'usua_modi', width: 150},
                    {text: 'Modificado el', datafield: 'hora_modi', width: 180},
                ]
            });

            $("#grid").jqxGrid('localizestrings', localizationobj);
            var dataCount = $('#grid').jqxGrid('getrows');

            var len = dataCount.length;
            $("#contador").val(len);
        }
    });

}

function listar_combox_tipo_motivo() {

    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_moti_act',
        dataType: 'json',

        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                listar_combox_tipo_motivo();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdTipoMoti + '">' + responses.data[c]
                        .varDescripcion + '</option>';
                $("#id_tipomotivoedit").html(va);
                $("#id_tipomotivocreate").html(va);

            }

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
                $("#id_estado_motivo_edit").html(va);
                $("#id_estado_motivo_create").html(va);
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

function registrar_motivo(descripcion, id_tipo_motivo, id_estado_crea) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/regi_moti',
        dataType: 'json',
        data: {
            intIdTipoMoti: id_tipo_motivo,
            varDescripcion: descripcion,
            intIdEsta: parseInt(id_estado_crea),
            acti_usua: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                registrar_motivo(descripcion, id_tipo_motivo, id_estado_crea);
            }
        },
        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Registro Satisfactorio.") {
                mensaje(true, mensaje_alert, "modal-create-motivo");
            } else {
                mensaje(false, mensaje_alert, "modal-create-motivo");
            }
            listar_motivo();
        }
    });

}

function actualizar_motivo(idmotivo2, descripcion2, tipomotivo2, idestado) {
    let user = obtener_user();

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/actu_moti',
        dataType: 'json',

        data: {
            intIdMoti: parseInt(idmotivo2),
            intIdTipoMoti: parseInt(tipomotivo2),
            varDescripcion: descripcion2,
            intIdEsta: parseInt(idestado),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                actualizar_motivo();
            }
        },

        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Actualizacion Satisfactoria") {
                mensaje(true, mensaje_alert, "modal-edit-motivo");

            } else {
                mensaje(false, mensaje_alert, "modal-edit-motivo");
            }

            listar_motivo();
        }
    });

}

function eliminar_motivo(idmotivo) {
    let user = obtener_user();

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/elim_mot',
        dataType: 'json',

        data: {
            intIdMoti: parseInt(idmotivo),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                eliminar_motivo();
            }
        },
        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Se ha eliminado.") {
                mensaje(true, mensaje_alert, "no");

            } else {
                mensaje(false, mensaje_alert, "no");
            }

            listar_motivo();
        }

    });


}

function limpiar_campo() {
    $("#descrp_motivo").val("");
    $("#id_tipomotivocreate").val("");
    $("#id_estado_motivo_create").val("");

}

function expo_arch_exce(JSONData, ReportTitle, ShowLabel) {

    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
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

    if (CSV === '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "";
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
