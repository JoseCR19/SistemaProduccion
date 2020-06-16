var data = [];
var dataAdapter = "";
$('#create').click(function () {
    $('#modal-create-armadores').modal('show');
});
$('#registrar').click(function () {
    registrar_armadores();
});
$("#cerrar_modal_nuevo").on('click', function () {
    limpiar_campos();
});
$("#etapa2").on('change', function () {
    cmbx_listar_empresa(this.value);
});
$("#etapa").on('change', function () {
    cmbx_listar_empresa_edit(this.value);
});
$("#excel_5").on('click', function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Armadores", true);
});
function listar_armadores() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_arma',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_armadores();
            }
        },
        success: function (responses) {
            
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdArmadores', type: 'number'},
                    {name: 'intIdCont', type: 'number'},
                    {name: 'intIdEtapa', type: 'number'},
                    {name: 'varApelArma', type: 'string'},
                    {name: 'varDescEtap', type: 'string'},
                    {name: 'varNombArma', type: 'string'},
                    {name: 'varRazCont', type: 'string'},
                    {name: 'varEstaArma', type: 'string'},
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
                            
                            $('#modal-edit-armadores').modal('show');
                            $("#id").val(dataRecord.intIdArmadores);
                            $("#armador_apellidos").val(dataRecord.varApelArma);
                            $("#armador_nombre").val(dataRecord.varNombArma);
                            $("#etapa").val(dataRecord.intIdEtapa);
                            /*document.getElementById('etapa').disabled=true;*/
                            /*document.getElementById('armador_nombre').disabled=true;
                            document.getElementById('armador_apellidos').disabled=true;*/
                            document.getElementById('id').disabled=true;
                            cmbx_listar_empresa_edit(dataRecord.intIdEtapa, dataRecord.intIdCont);
                            $("#estado_id").val(dataRecord.varEstaArma);
                        }
                    },
                    {
                        text: 'Eliminar', datafield: 'Eliminar', columntype: 'button', width: 70, cellsrenderer: function () {
                            return "Eliminar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            eliminar_armadores(dataRecord.intIdArmadores);
                        }
                    },
                    {text: 'Número', datafield: 'intIdArmadores', width: 60, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Nombres', datafield: 'varNombArma', width: 150},
                    {text: 'Apellidos', datafield: 'varApelArma', width: 150},
                    {text: 'Etapa', datafield: 'varDescEtap', cellsalign: 'left', width: 200},
                    {text: 'id_etapa', datafield: 'intIdEtapa', cellsalign: 'left', width: 190, hidden: true},
                    {text: 'Empresa', datafield: 'varRazCont', cellsalign: 'left', width: 500},
                    {text: 'Id', datafield: 'intIdCont', cellsalign: 'left', width: 90, hidden: true},
                    {text: 'Estado', datafield: 'varEstaArma', width: 80},
                    {text: 'Usu.Crea', datafield: 'acti_usua', width: '10%'},
                    {text: 'Fech.Crea.', datafield: 'acti_hora', width: '13%', cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                    {text: 'Usu.Modi.', datafield: 'usua_modi', width: '10%'},
                    {text: 'Fech.Modi.', datafield: 'hora_modi', width: '13%', cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
            var dataCount = $('#grid').jqxGrid('getrows');
            var len = dataCount.length;
            $("#contador").val(len);
            $("#actualizar_armadores").click(function () {
                if (editrow >= 0) {
                    var row = {
                        intIdArmadores: $("#id").val(),
                        varNombArma: $("#armador_nombre").val(),
                        varApelArma: $("#armador_apellidos").val(),
                        intIdEtapa: $("#etapa").val(),
                        intIdCont: $("#empresa").val(),
                        varEstaArma: $("#estado_id").val()
                    };
                    actualizar_armadores(row.intIdArmadores, row.varNombArma, row.varApelArma, row.intIdEtapa, row.intIdCont, row.varEstaArma);
                    //actualizar_tipo_etapa(row.intIdTipoEtap, row.varCodiTipoEtap, row.varDescTipoEtap, row.intIdAgru, row.varEstaTipoEtap);

                }
            });

        }
    });
}
;
function cmbx_listar_empresa(id_etap) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/obte_cont_con_id_etap',
        dataType: 'json',
        data: {
            intIdEtapa: id_etap
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdCont + '">' + responses.data[c]
                        .varRazCont + '</option>';
                $("#empresa2").html(va);
            }
        }
    });
}
function cmbx_listar_empresa_edit(id_etap, empresa) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/obte_cont_con_id_etap',
        dataType: 'json',
        data: {
            intIdEtapa: id_etap
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdCont + '">' + responses.data[c]
                        .varRazCont + '</option>';
                $("#empresa").html(va);
            }
            $("#empresa").val(empresa);
            //document.getElementById('empresa').disabled=true;
        }
    });
}
function cmbx_listar_etapa() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_etap_acue_agru',
        data: {intIdAgru: 1},
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                cmbx_listar_etapa();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdEtapa + '">' + responses.data[c]
                        .varDescEtap + '</option>';
                $("#etapa").html(va);
                $("#etapa2").html(va);
            }
        }
    });
}
function actualizar_armadores(intIdArmadores2, varNombArma2, varApelArma2, intIdEtapa2, intIdCont2, varEstaArma2) {

    let user = obtener_user();
    if (varNombArma2) {
        if (varApelArma2) {
            if (intIdEtapa2) {
                if (intIdCont2) {
                    if (varEstaArma2) {
                        $.ajax({
                            type: 'POST',
                            url: url + '/GestionProyectos/public/index.php/actu_arma',
                            dataType: 'json',
                            data: {
                                intIdArmadores: parseInt(intIdArmadores2),
                                varNombArma: varNombArma2,
                                varApelArma: varApelArma2,
                                intIdEtapa: parseInt(intIdEtapa2),
                                intIdCont: parseInt(intIdCont2),
                                varEstaArma: varEstaArma2,
                                usua_modi: user
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                if (thrownError == "Internal Server Error") {
                                    actualizar_armadores();
                                }
                            },
                            success: function (responses) {

                                let mensaje_alert = responses.data.mensaje;
                                if (mensaje_alert == "Actualizacion exitosa.") {
                                    mensaje(true, mensaje_alert, "modal-edit-armadores");

                                } else {
                                    mensaje(false, mensaje_alert, "modal-edit-armadores");
                                }
                                //$('#modal-edit-agrupacion').modal('hide');
                                listar_armadores();
                            }
                        });
                    } else {
                        mensaje(false, "Selecione un Estado", "no");
                    }
                } else {
                    mensaje(false, "Seleccione una Empresa", "no");
                }
            } else {
                mensaje(false, "Seleccione una Etapa", "no");
            }
        } else {
            mensaje(false, "Campo Apellido vacío", "no");
        }
    } else {
        mensaje(false, "Campo Nombre vacío", "no");
    }
}
function eliminar_armadores(id) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/elim_arma',
        dataType: 'json',
        data: {
            intIdArmadores: parseInt(id),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                eliminar_armadores();
            }
        },
        success: function (responses) {
            
            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "se ha eliminado.") {
                mensaje(true, mensaje_alert, "no");

            } else {
                mensaje(false, mensaje_alert, "no");
            }
            //$('#modal-edit-agrupacion').modal('hide');
            listar_armadores();
        }

    });
}
function registrar_armadores() {
    let nombre = $("#armador_nombre2").val().toUpperCase();
    let apellido = $("#armador_apellidos2").val().toUpperCase();
    let empresa = $("#empresa2").val();
    let etapa = $("#etapa2").val();
    let estado = $("#estado2").val();
    let user = obtener_user();
    if (nombre) {
        if (apellido) {
            if (empresa) {
                if (estado) {
                    if (etapa) {
                        $.ajax({
                            type: 'POST',
                            url: url + '/GestionProyectos/public/index.php/regi_arma',
                            dataType: 'json',
                            data: {
                                varNombArma: nombre,
                                varApelArma: apellido,
                                intIdEtapa: parseInt(etapa),
                                intIdCont: parseInt(empresa),
                                varEstaArma: estado,
                                acti_usua: user
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                if (thrownError == "Internal Server Error") {
                                    registrar_armadores();
                                }
                            },
                            success: function (responses) {

                                let mensaje_alert = responses.data.mensaje;
                                if (mensaje_alert == "Guardado con exito.") {
                                    mensaje(true, mensaje_alert, "modal-create-armadores");
                                    $("#id2").val('');
                                    $("#armador_nombre2").val('');
                                    $("#armador_apellidos2").val('');
                                    $("#etapa2").val('');
                                    $("#empresa2").val('');
                                    $("#estado2").val('');
                                } else {
                                    mensaje(false, mensaje_alert, "modal-create-armadores");
                                    $("#id2").val('');
                                    $("#armador_nombre2").val('');
                                    $("#armador_apellidos2").val('');
                                    $("#etapa2").val('');
                                    $("#empresa2").val('');
                                    $("#estado2").val('');
                                }
                                listar_armadores();
                            }
                        });
                    } else {
                        mensaje(false, "Seleccione una Etapa", "no");
                    }
                } else {
                    mensaje(false, "Seleccione un Estado", "no");
                }
            } else {
                mensaje(false, "Seleccione una Empresa", "no");
            }
        } else {
            mensaje(false, "Campo Apellido vacío", "no");
        }
    } else {
        mensaje(false, "Campo Nombre vacío", "no");
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
    $("#armador_nombre2").val('');
    $("#armador_apellidos2").val('');
    $("#empresa2").val('');
    $("#etapa2").val('');
    $("#estado2").val('');
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