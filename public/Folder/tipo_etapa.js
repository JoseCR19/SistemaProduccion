var data = [];
var dataAdapter = "";

$('#create').click(function () {
    $('#modal-create-tipo-etapa').modal('show');
});
$('#agregar').click(function () {
    registrar_tipo_etapa();
});
$("#close_modal").on('click', function () {
    limpiar_campos();
});
$("#close_modal_2").on('click', function () {
    limpiar_campos();
});
$("#excel").click(function () {
    var data=$("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Tipo Etapa", true);
});
function agrupadro_select() {
    //access_token = obtener_access_token();
    var va = "";
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionProyectos/public/index.php/list_agru',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                agrupadro_select();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                if (responses.data[c].varEstaAgru == "ACT") {
                    //Seleccionamos el select
                    va += '<option value="' + responses.data[c].intIdAgru + '">' + responses.data[c]
                            .varDescAgru + '</option>';
                    $("#agrupador").html(va);
                    $("#agrupador2").html(va);
                }
            }
            
        }

    });
}
;
function listar_etapa() {
    //access_token = obtener_access_token();
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_tipo_etap',
        url: url + '/GestionProyectos/public/index.php/list_tipo_etap',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_etapa();
            }
        },
        success: function (responses) {
            

            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdTipoEtap', type: 'number'},
                    {name: 'varCodiAgru', type: 'string'},
                    {name: 'varCodiTipoEtap', type: 'string'},
                    {name: 'varDescTipoEtap', type: 'string'},
                    {name: 'varEstaTipoEtap', type: 'string'},
                    {name: 'intIdAgru', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'date'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'date'}
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
                theme: 'darkblue',
                selectionmode: 'multiplecellsextended',
                sortable: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: '8%', cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            $('#modal-edit-tipo-etapa').modal('show');
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $("#id").val(dataRecord.intIdTipoEtap);
                            $("#codigo").val(dataRecord.varCodiTipoEtap);
                            $("#descripcion_tipo_etapa").val(dataRecord.varDescTipoEtap);
                            $("#estado_edit").val(dataRecord.varEstaTipoEtap);
                            $("#agrupador").val(dataRecord.intIdAgru);
                        }
                    },
                    {text: 'Número', datafield: 'intIdTipoEtap', width: '5%', cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Agrupador', datafield: 'varCodiAgru', width: '8%'},
                    {text: 'Codigo', datafield: 'varCodiTipoEtap', cellsalign: 'left', width: '9%'},
                    {text: 'Tipo Etapa', datafield: 'varDescTipoEtap', width: '20%'},
                    {text: 'Estado', datafield: 'varEstaTipoEtap', width: '5%'},
                    {text: 'Usu.Crea', datafield: 'acti_usua', width: '10%'},
                    {text: 'Fech.Crea.', datafield: 'acti_hora', width: '13%', cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                    {text: 'Usu.Modi.', datafield: 'usua_modi', width: '10%'},
                    {text: 'Fech.Modi.', datafield: 'hora_modi', width: '13%', cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                    {text: 'id group', datafield: 'intIdAgru', width: '2%', hidden: true},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
            $("#actualizar_tipo_etapa").click(function () {
                if (editrow >= 0) {
                    var row = {
                        intIdTipoEtap: $("#id").val(),
                        varCodiTipoEtap: $("#codigo").val().toUpperCase(),
                        varDescTipoEtap: $("#descripcion_tipo_etapa").val().toUpperCase(),
                        intIdAgru: $("#agrupador").val().toUpperCase(),
                        varEstaTipoEtap: $("#estado_edit").val(),
                    };
                    actualizar_tipo_etapa(row.intIdTipoEtap, row.varCodiTipoEtap, row.varDescTipoEtap, row.intIdAgru, row.varEstaTipoEtap);

                }
            });
        }
    });
}
;
function actualizar_tipo_etapa(intIdTipoEtap2, varCodiTipoEtap2, varDescTipoEtap2, intIdAgru2, varEstaTipoEtap2) {
    //access_token = obtener_access_token();
    let user = obtener_user();
    if (intIdTipoEtap2) {
        if (varCodiTipoEtap2) {
            if (varDescTipoEtap2) {
                if (intIdAgru2) {
                    if (varEstaTipoEtap2) {
                        $.ajax({
                            type: 'POST',
                            //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/actu_tipo_etap',
                            url: url + '/GestionProyectos/public/index.php/actu_tipo_etap',
                            dataType: 'json',
                            data: {
                                intIdTipoEtap: intIdTipoEtap2,
                                varCodiTipoEtap: varCodiTipoEtap2,
                                intIdAgru: intIdAgru2,
                                varDescTipoEtap: varDescTipoEtap2,
                                varEstaTipoEtap: varEstaTipoEtap2,
                                usua_modi: user
                            },
                            /*beforeSend: function (xhr) {
                             xhr.setRequestHeader('Authorization', access_token);
                             },*/
                            error: function (xhr, ajaxOptions, thrownError) {
                                if (thrownError == "Internal Server Error") {
                                    actualizar_tipo_etapa();
                                }
                            },
                            success: function (responses) {
                                
                                let mensaje_alert = responses.data.mensaje;
                                if (mensaje_alert == "Actualizacion satisfactoria.") {
                                    mensaje(true, mensaje_alert, "modal-edit-tipo-etapa");

                                } else {
                                    mensaje(false, mensaje_alert, "modal-edit-tipo-etapa");
                                }
                                //$('#modal-edit-agrupacion').modal('hide');
                                listar_etapa();
                            }
                        });
                    } else {
                        mensaje(false, "SELECCIONE UN ESTADO", "no");
                    }
                } else {
                    mensaje(false, "SELECCIONE UN AGRUPADOR", "no");
                }
            } else {
                mensaje(false, "CAMPO DESCRIPCIÓN VACÍO", "no");
            }
        } else {
            mensaje(false, "CAMPO CODIGO VACÍO", "no");
        }
    } else {
        mensaje(false, "SELECCIONE UNA ETAPA", "no");
    }
}
function registrar_tipo_etapa() {
    let codigo2 = $('#codigo2').val().toUpperCase();
    let descripcion2 = $('#descripcion2').val().toUpperCase();
    let idagrupador = $('#agrupador2').val();
    let user = obtener_user();
    if (codigo2) {
        if (descripcion2) {
            if (idagrupador) {
                $.ajax({
                    type: 'POST',
                    //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/regi_tipo_etap',
                    url: url + '/GestionProyectos/public/index.php/regi_tipo_etap',
                    dataType: 'json',
                    data: {
                        intIdAgru: idagrupador,
                        varCodiTipoEtap: codigo2,
                        varDescTipoEtap: descripcion2,
                        acti_usua: user
                    },
                    /*beforeSend: function (xhr) {
                     xhr.setRequestHeader('Authorization', access_token);
                     }, */
                    error: function (xhr, ajaxOptions, thrownError) {
                        if (thrownError == "Internal Server Error") {
                            registrar_tipo_etapa();
                        }
                    },
                    success: function (responses) {
                        let mensaje_alert = responses.data.mensaje;
                        if (mensaje_alert === "Guardado con exito.") {
                            limpiar_campos();
                            mensaje(true, mensaje_alert, "modal-create-tipo-etapa");
                        } else {
                            limpiar_campos();
                            mensaje(false, mensaje_alert, "modal-create-tipo-etapa");
                        }
                        listar_etapa();
                    }
                });
            } else {
                mensaje(false, "Seleccione un AGRUPADOR ", "no");
            }
        } else {
            mensaje(false, "El campo DESCRIPCIÓN esta vacio", "no");
        }
    } else {
        mensaje(false, "El campo CODIGO esta vacío", "no");
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
function limpiar_campos() {
    $("#id2").val('');
    $("#codigo2").val('');
    $("#descripcion2").val('');
    $("#agrupador2").val('');
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
