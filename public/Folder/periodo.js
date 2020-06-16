var data = [];
var dataAdapter = "";
$('#create').click(function () {
    $('#modal-create-periodo').modal('show');
});
$('#agregar').click(function () {
    registrar_periodo();
});
$('#btn_cerr_moda_crea').click(function () {
    limp_form();
});
$("#cerrar_periodo").on('click', function () {
    limp_form();
});
$("#codi_valo").keypress(function () {
    var element2 = document.getElementById("codi_valo");
    element2.classList.remove("is-invalid");
});
$("#codi_valo_peri").keypress(function () {
    var element = document.getElementById("codi_valo_peri");
    element.classList.remove("is-invalid");
});
$("#excel").click(function () {
    var data=$("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Periodo Valorizacion", true);
});
function listar_periodo() {
    
    //access_token = obtener_access_token();
    $.ajax({
        type: 'GET',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionProyectos/public/index.php/list_peri_valo',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_periodo();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdPeriValo', type: 'number'},
                    {name: 'varCodiPeriValo', type: 'string'},
                    {name: 'varDescPeriValo', type: 'string'},
                    {name: 'dateFechaInic', type: 'string'},
                    {name: 'dateFechaFina', type: 'string'},
                    {name: 'intIdEsta', type: 'string'},
                    {name: 'varDescEsta', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'string'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'string'}
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
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                theme: 'darkblue',
                columns: [
                    {
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: 90, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {

                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            $('#modal-edit-periodo').modal('show');
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            /*var año = new Date(dataRecord.dateFechaInic).getFullYear();
                            var dia = new Date(dataRecord.dateFechaInic).getDate();
                            var mes = new Date(dataRecord.dateFechaInic).getMonth() + 1;
                            if (mes <= 9) {
                                var mes_inicio = '0' + mes;
                            } else {
                                var mes_inicio = mes;
                            }
                            if (dia <= 9) {
                                var dia_ultimo = '0' + dia;
                            } else {
                                var dia_ultimo = dia;
                            }

                            var año_fin = new Date(dataRecord.dateFechaFina).getFullYear();
                            var dia_fin = new Date(dataRecord.dateFechaFina).getDate();
                            var mes_fin = new Date(dataRecord.dateFechaFina).getMonth() + 1;

                            if (dia_fin <= 9) {
                                var dia_ultimo_fin = '0' + dia_fin;
                            } else {
                                var dia_ultimo_fin = dia_fin;
                            }
                            if (mes_fin <= 9) {
                                var mes_ultimo = '0' + mes_fin;
                            } else {
                                var mes_ultimo = mes_fin;
                            }*/
                            $("#id_valo").val(dataRecord.intIdPeriValo);
                            $("#codi_valo_peri").val(dataRecord.varCodiPeriValo);
                            $("#desc_valo_peri").val(dataRecord.varDescPeriValo);
                            $("#fech_inic_valo").val(dataRecord.dateFechaInic);
                            $("#fech_fina_valo").val(dataRecord.dateFechaFina);
                            $("#sele_esta").val(dataRecord.intIdEsta);
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
                            elimiar_periodo(dataRecord.intIdPeriValo);
                            //eliminar_motivo(dataRecord.intIdMoti);
                        }
                    },
                    {text: 'Estado', datafield: 'varDescEsta', width: '10%'},
                    {text: 'Número', datafield: 'intIdPeriValo', width: '6%', cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Código', datafield: 'varCodiPeriValo', width: '18%'},
                    {text: 'Descripción', datafield: 'varDescPeriValo', cellsalign: 'left', width: '28%'},
                    {text: 'Fecha Inicio', datafield: 'dateFechaInic', width: '12%', cellsformat: 'yyyy-MM-dd'},
                    {text: 'Fecha Final', datafield: 'dateFechaFina', width: '12%', cellsformat: 'yyyy-MM-dd'},
                    {text: 'Usua. Crea', datafield: 'acti_usua', width: '12%'},
                    {text: 'Fech. Crea', datafield: 'acti_hora', width: '12%', cellsformat: 'yyyy-MM-dd'},
                    {text: 'Usua. Modi', datafield: 'usua_modi', width: '12%'},
                    {text: 'Fech. Modi', datafield: 'hora_modi', width: '12%', cellsformat: 'yyyy-MM-dd'}
                ]
            });
            $("#grid").jqxGrid('refresh');
            $("#grid").jqxGrid('localizestrings', localizationobj);
            $("#actualizar_periodo").click(function () {
                if (editrow >= 0) {
                    var row = {
                        intIdPeriValo: $("#id_valo").val(),
                        varCodiPeriValo: $("#codi_valo_peri").val().toUpperCase(),
                        varDescPeriValo: $("#desc_valo_peri").val().toUpperCase(),
                        dateFechaInic: $("#fech_inic_valo").val().toUpperCase(),
                        dateFechaFina: $("#fech_fina_valo").val().toUpperCase(),
                        intIdEsta: $("#sele_esta").val()
                    };

                    actualizar_periodo(row.intIdPeriValo, row.varCodiPeriValo, row.varDescPeriValo, row.dateFechaInic, row.dateFechaFina, row.intIdEsta);
                }
            });
        }

    });
}

function actualizar_periodo(id, codigo, descripcion, fechainicio, fechafinal, estado) {
    //access_token = obtener_access_token();
    var user = obtener_user();
    if (id == "") {
        mensaje(false, "Campo codigo obligatorio", "no");
    } else {
        if (codigo == "") {
            mensaje(false, "Campo codigo obligatorio", "no");
        } else {
            if (descripcion == "") {
                mensaje(false, "Campo descripcion obligatorio", "no");
            } else {
                if (fechainicio == "") {
                    mensaje(false, "Campo fecha inicio obligatorio", "no");
                } else {
                    if (fechafinal == "") {
                        mensaje(false, "Campo fecha fin obligatorio", "no");
                    } else {
                        if (estado == "") {
                            mensaje(false, "Campo estado obligatorio", "no");
                        } else {
                            if (user == "") {
                                mensaje(false, "Por favor de cerrar sesion y ingresar al sistema", "no");
                            } else {
                                if (new Date(fechainicio) > new Date(fechafinal)) {
                                    mensaje(false, "La fecha inicial no puede ser mayor a la fecha fin", "no");
                                } else {
                                    $.ajax({
                                        type: 'POST',
                                        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/actu_agru',
                                        url: url + '/GestionProyectos/public/index.php/actu_peri_valo',
                                        dataType: 'json',
                                        data: {
                                            intIdPeriValo: id,
                                            varCodiPeriValo: codigo,
                                            varDescPeriValo: descripcion,
                                            dateFechaInic: fechainicio,
                                            dateFechaFina: fechafinal,
                                            intIdEsta: estado,
                                            usua_modi: user
                                        },
                                        error: function (xhr, ajaxOptions, thrownError) {
                                            if (thrownError == "Internal Server Error") {
                                                actualizar_periodo();
                                            }
                                        },
                                        success: function (responses) {
                                            let mensaje_alert = responses.data.mensaje;
                                            
                                            if (mensaje_alert === "") {

                                                mensaje(true, "Actualizacion Satisfactoria.", "modal-edit-periodo");
                                                limp_form();
                                                //location.reload();
                                                listar_periodo();

                                            } else {

                                                mensaje(false, mensaje_alert, "no");
                                                var element2 = document.getElementById("codi_valo");
                                                element2.classList.add("is-invalid");
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
;
function registrar_periodo() {
    //validaciones falta.
    //access_token = obtener_access_token();
    let codigo = $('#codi_valo').val().toUpperCase().trim();
    let descripcion = $('#desc_valo').val().toUpperCase().trim();
    let fech_inic = $('#fech_inic').val();
    console.log(fech_inic);
    let fech_fina = $('#fech_fina').val();
    let esta = $('#sele_esta_crea').val();
    let user = obtener_user();
    if (codigo == "") {
        mensaje(false, "Campo codigo obligatorio", "no");
    } else {
        if (descripcion == "") {
            mensaje(false, "Campo descripcion obligatorio", "no");
        } else {
            if (fech_inic == "") {
                mensaje(false, "Campo fecha inicio obligatorio", "no");
            } else {
                if (fech_fina == "") {
                    mensaje(false, "Campo fecha final obligatorio", "no");
                } else {
                    /*if (esta === null) {
                     mensaje(false, "Campo estado obligatorio", "no");
                     } else {*/
                    //validar fechas
                    if (new Date(fech_inic) > new Date(fech_fina)) {
                        mensaje(false, "La fecha inicial no puede ser mayor a la fecha final", "no");
                    } else {
                        $.ajax({
                            type: 'POST',
                            //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/regi_agru',
                            url: url + '/GestionProyectos/public/index.php/regi_peri_valo',
                            dataType: 'json',
                            data: {
                                varCodiPeriValo: codigo,
                                varDescPeriValo: descripcion,
                                dateFechaInic: fech_inic,
                                dateFechaFina: fech_fina,
                                //  intIdEsta: esta,
                                acti_usua: user
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                if (thrownError == "Internal Server Error") {
                                    registrar_periodo();
                                }
                            },
                            /*beforeSend: function (xhr) {
                             xhr.setRequestHeader('Authorization', access_token);
                             }*/
                            success: function (responses) {

                                let mensaje_alert = responses.data.mensaje;

                                if (mensaje_alert != "") {
                                    mensaje(false, mensaje_alert, "no");
                                    var element2 = document.getElementById("codi_valo");
                                    element2.classList.add("is-invalid");
                                } else {
                                    mensaje(true, "Registro Satisfactorio.", "modal-create-periodo");
                                    //location.reload();
                                    listar_periodo();
                                    limp_form();
                                }
                            }
                        });
                    }
                }
            }
        }
    }

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
function limp_form() {
    $('#codi_valo').val('');
    $('#desc_valo').val('');
    $('#fech_inic').val('');
    $('#fech_fina').val('');
    $('#sele_esta_crea').val(jQuery("#sele_esta_crea option:first").val());
    $("#codi_valo").removeClass('is-invalid');
    
}
function combo_esta_peri() {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/eleg_proc_estado',
        dataType: 'json',
        data: {
            intIdProcEsta: 4
        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                combo_esta_peri();
            }
        },
        success: function (responses) {

            va = '<option value=" " disabled selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdEsta + '">' + responses.data[c]
                        .varDescEsta + '</option>';

                // $("#sele_esta_crea").html(va);
                $("#sele_esta").html(va);
            }
        }
    });
}
function elimiar_periodo(id_periodo) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/elim_pedi_valor',
        dataType: 'json',
        data: {
            intIdPeriValo: id_periodo
        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {



            let mensaje_alert = responses.data.mensaje;

            if (mensaje_alert != "") {
                mensaje(false, mensaje_alert, "no");

            } else {
                mensaje(true, "Se elimino Satisfactoriamente.", "modal-create-periodo");
                limp_form();
                listar_periodo();
            }

        }
    });
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