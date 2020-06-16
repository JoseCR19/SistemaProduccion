var data = [];
var dataAdapter = "";
var global_termino = "";
var cambiar_fecha = "";
var idcheck = "";
var xobs = "";
function validar_permisos() {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/gsu_obte_prog_medi_idusu',
        dataType: 'json',
        data: {
            varCodiUsua: user,
            varCodiProg: 'ASIG_PROY'
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                //listar_ot(int_id_proyecto, int_IdTipo_Producto, int_IdTipo_Etap, int_Id_Etapa, int_Id_Proy_Tarea, int_Id_Proy_Paquete, var_Codi_Elemento, TipoReporte,rango_fecha,fecha_ini,fecha_fin);
            }
        },
        success: function (responses) {
            console.log(responses.data);
            if (responses.data.length > 0) {
                for (var i = 0; responses.data.length > i; i++) {
                    if (responses.data[i]['varDescBoto'] === 'CAMBIAR FECHA DE TERMINO') {
                        $("#cambiar_fecha").removeClass('hidde_grid');
                    }
                }
            }

        }
    });
}


function camb_fecha_termino_proyecto() {
    var check = document.getElementById('camb_fecha_termino_proyecto').checked;
    if (check) {
        document.getElementById('bloq_fecha').style = 'display:flex';
        document.getElementById('loquear_obser_proy').style = 'display:flex';
        document.getElementById('loquear_archivo_proy').style = 'display:flex';
        cambiar_fecha = "si";
        $("#cambio_fecha").val(cambiar_fecha);
    } else {
        document.getElementById('bloq_fecha').style = 'display:none';
        document.getElementById('loquear_obser_proy').style = 'display:none';
        document.getElementById('fecha_termino').value = $("#guardar_termino_final_proyecto").val();
        document.getElementById('observacion_proyecto').value = '';

        document.getElementById('loquear_archivo_proy').style = 'display:none';
        document.getElementById('nombre_archivo_detalle_proyecto').value = '';
        document.getElementById('subir_archivo_proyecto').value = '';
        cambiar_fecha = "no";
        $("#cambio_fecha").val(cambiar_fecha);
    }
}

$("#excel").on('click', function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Proyectos", true);
});
function list_data() {
    //access_token = obtener_access_token();
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_proy',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                list_data();
            }
        },
        success: function (responses) {
                
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'IntAnioProy', type: 'number'}, {name: 'acti_hora', type: 'string'}, {name: 'acti_usua', type: 'string'},
                    {name: 'dateFechFina', type: 'string'}, {name: 'dateFechInic', type: 'string'}, {name: 'hora_modi', type: 'string'},
                    {name: 'intIdProy', type: 'number'}, {name: 'usua_modi', type: 'string'}, {name: 'varCodiOt', type: 'string'},
                    {name: 'varCodiProy', type: 'string'}, {name: 'varEsta', type: 'string'}, {name: 'varRazClie', type: 'string'},
                    {name: 'varDescProy', type: 'string'}, {name: 'varAlias', type: 'string'}, {name: 'intIdProy', type: 'numeric'},
                    {name: 'status', type: 'number'}
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
                //pageable: true,
                columns: [
                    {
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: 80, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            var check = document.getElementById('camb_fecha_termino_proyecto').checked;
                            if (check) {
                                cambiar_fecha = "si";

                                $("#cambio_fecha").val(cambiar_fecha);
                            } else {
                                cambiar_fecha = "no";
                                $("#cambio_fecha").val(cambiar_fecha);
                            }
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            $("#fecha_termino").val('');
                            $("#observacion_proyecto").val('');
                            $('#modal-editar-proyecto').modal('show');
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            document.getElementById('nombre_archivo_detalle_proyecto').value = '';
                            document.getElementById('subir_archivo_proyecto').value = '';
                            console.log(dataRecord);
                            $("#anio").val(dataRecord.IntAnioProy);
                            $("#nrproyecto").val(dataRecord.varCodiOt);
                            $("#proyecto").val(dataRecord.varCodiProy);
                            $("#alias").val(dataRecord.varAlias);
                            $("#cliente").val(dataRecord.varRazClie);
                            $("#descripcion").val(dataRecord.varDescProy);
                            $("#codigo").val(dataRecord.intIdProy);
                            $("#fecha_termino").val(dataRecord.dateFechFina);
                            $("#guardar_termino_final_proyecto").val(dataRecord.dateFechFina);
                            $("#user_proyecto").val(obtener_user());
                            $('#status').prop('checked', dataRecord.status);
                            // $("#actcheck").value(dataRecord.status);                            
                            document.getElementById('camb_fecha_termino_proyecto').checked = false;
                            document.getElementById('bloq_fecha').style = 'display:none';
                            document.getElementById('loquear_obser_proy').style = 'display:none';
                            document.getElementById('loquear_archivo_proy').style = 'display:none';
                            var checkot = dataRecord.status;
                            if (checkot === 1) {
                                document.getElementById('check_ot').checked = true;
                                idcheck = "1";
                            } else
                            {
                                document.getElementById('check_ot').checked = false;
                                idcheck = "0";
                            }
                            $("#act_check").val(idcheck);
                            camb_fecha_termino_proyecto();
                        }
                    },
                    {
                        text: 'Detalle', datafield: 'Detalle', columntype: 'button', width: 80, cellsrenderer: function () {
                            return "Detalle";
                        }, buttonclick: function (row) {
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            $("#codigo_historico_proyecto").val(dataRecord.varCodiProy);
                            $("#numero_proyecto_detalle").val(dataRecord.varCodiOt);
                            detalle_proyecto(dataRecord.intIdProy);
                            $('#modal-detalle-proyecto').modal('show');
                        }
                    },
                    {text: ' ', width: 35, columntype: 'checkbox', datafield: 'status'},
                    {text: 'Año', datafield: 'IntAnioProy', width: 60, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Nro Proyecto', datafield: 'varCodiOt', width: 95},
                    {text: 'Proyecto', datafield: 'varCodiProy', cellsalign: 'left', width: 90},
                    {text: 'Alias', datafield: 'varAlias', width: 95},
                    {text: 'Cliente', datafield: 'varRazClie', cellsalign: 'left', width: 350},
                    {text: 'Inicio', datafield: 'dateFechInic', cellsalign: 'right', width: 100},
                    {text: 'Termino', datafield: 'dateFechFina', cellsalign: 'right', width: 100},
                    {text: 'Estado', datafield: 'varEsta', cellsalign: 'center', width: 60},
                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'right', width: 120},
                    {text: 'Fecha Creación.', datafield: 'acti_hora', cellsalign: 'right', width: 150},
                    {text: 'Modificado por.', datafield: 'usua_modi', cellsalign: 'right', width: 120},
                    {text: 'Fecha Modificado.', datafield: 'hora_modi', cellsalign: 'right', width: 150}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
            $("#actualizara").click(function () {
                if (editrow >= 0) {
                    var row = {
                        IntAnioProy: $("#anio").val(),
                        varCodiOt: $("#nrproyecto").val(),
                        varCodiProy: $("#proyecto").val(),
                        varRazClie: $("#cliente").val(),
                        varAlias: $("#alias").val().toUpperCase(),
                        varDescProy: $("#descripcion").val(),
                        intIdProy: parseInt($("#codigo").val()),
                        status: $("#status").prop('checked')
                    };
                }
            });
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
$("#actualizar_listar").click(function () {
    list_data();
});
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
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

    if (CSV === '') {
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

$("#camb_fecha_termino_proyecto").on('click', function (event) {
    var check = document.getElementById('camb_fecha_termino_proyecto').checked;
    if (check) {
        document.getElementById('bloq_fecha').style = 'display:flex';
        document.getElementById('loquear_obser_proy').style = 'display:flex';
        document.getElementById('loquear_archivo_proy').style = 'display:flex';
        cambiar_fecha = "si";
        $("#cambio_fecha").val(cambiar_fecha);
    } else {
        document.getElementById('bloq_fecha').style = 'display:none';
        document.getElementById('loquear_obser_proy').style = 'display:none';
        document.getElementById('fecha_termino').value = $("#guardar_termino_final_proyecto").val();
        document.getElementById('observacion_proyecto').value = '';

        document.getElementById('loquear_archivo_proy').style = 'display:none';
        document.getElementById('nombre_archivo_detalle_proyecto').value = '';
        document.getElementById('subir_archivo_proyecto').value = '';
        cambiar_fecha = "no";
        $("#cambio_fecha").val(cambiar_fecha);
    }
});

$("#check_ot").on('click', function (event) {
    var checkots = document.getElementById('check_ot').checked;
    if (checkots) {
        idcheck = "1";
    } else {
        idcheck = "0";
    }
    $("#act_check").val(idcheck);
    camb_fecha_termino_proyecto();
});

/*$("#camb_fecha_termino_proyecto").on('change', function (event) {
 
 //var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
 
 var isChecked_cambio_fecha = document.getElementById('camb_fecha_termino_proyecto').checked;
 if (isChecked_cambio_fecha) {
 
 document.getElementById('bloq_fecha').style = 'display:flex';
 document.getElementById('loquear_obser_proy').style = 'display:flex';
 document.getElementById('loquear_archivo_proy').style = 'display:flex';
 } else {
 document.getElementById('bloq_fecha').style = 'display:none';
 document.getElementById('loquear_obser_proy').style = 'display:none';
 document.getElementById('fecha_termino').value =  $("#guardar_termino_final_proyecto").val();
 document.getElementById('observacion_proyecto').value = '';
 
 document.getElementById('loquear_archivo_proy').style = 'display:none';
 document.getElementById('nombre_archivo_detalle_proyecto').value = '';
 document.getElementById('subir_archivo_proyecto').value = '';
 
 }
 
 
 });*/

$("#cerrar_modal_proyecto_detalle").click(function () {
    $('#modal-detalle-proyecto').modal('hide');
});

function  detalle_proyecto(idproyecto) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/detalle_proyecto',
        dataType: 'json',
        data: {
            intIdProy: parseInt(idproyecto),

        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        success: function (responses) {


            //grid_detalle_proyecto
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'FechaCambTerm', type: 'string'},
                    {name: 'dateFechaNuev', type: 'string'},
                    {name: 'varObservacion', type: 'string'},
                    {name: 'varNombArch', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'string'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            var descargar_archivo = function (row, column, value, rowKey, rowData) {
                var editrow = row;
                var dataRecord = $("#grid_detalle_proyecto").jqxGrid('getrowdata', editrow);


                var archivo = url + '/Documentos/ProyectoE/' + dataRecord.varNombArch;
                var vacio_url = "vacio";

                if (dataRecord.varNombArch == "" || dataRecord.varNombArch == null) {

                    var html = '<button class="btn btn-danger btn-sm" onClick=validar_documento_proyecto("' + vacio_url + '"); style="margin-left: 3px;" ><i class="fas fa-download"></i></button>';
                } else {
                    var html = '<button class="btn btn-danger btn-sm" onClick=validar_documento_proyecto("' + archivo + '"); style="margin-left: 3px; background-color:#354171;color:white" ><i class="fas fa-download"></i></button>';
                }


                return html;
            };

            dataAdapter = new $.jqx.dataAdapter(source);

            var editrow = -1;
            /**
             * SE DIBUJA LA TABLA
             */
            $("#grid_detalle_proyecto").jqxGrid('clear');
            $("#grid_detalle_proyecto").jqxGrid({
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

                    {text: 'OPCIONES', width: 50, datafield: 'Descargar', cellsrenderer: descargar_archivo, cellsalign: 'center', groupable: true},
                    {text: 'Fecha Termino', datafield: 'FechaCambTerm', width: 100, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid_detalle_proyecto").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Fecha nueva', datafield: 'dateFechaNuev', width: 100},
                    {text: 'Archivo', datafield: 'varNombArch', width: 100, hidden: true},
                    {text: 'Observacion', datafield: 'varObservacion', width: 350},
                    {text: 'Creado por ', datafield: 'acti_usua', width: 158},
                    {text: 'Hora', datafield: 'acti_hora', cellsalign: 'left', width: 158},
                ]
            });

        }
    });
}

/*
 $("#actualizar_proyecto").click(function () {
 var validar_cambio_fecha = document.getElementById('camb_fecha_termino_proyecto').checked;
 
 var date_term_proy = document.getElementById('fecha_termino').value;
 var obse_proyecto = document.getElementById('observacion_proyecto').value;
 var proyecto_alias = document.getElementById('alias').value;
 var codigo_proyecto = document.getElementById('codigo').value;
 console.log(proyecto_alias);
 if (validar_cambio_fecha) {
 if (date_term_proy !== "") {
 if (obse_proyecto == "") {
 mensaje(false, "Ingrese LA OBSERVACION", "no");
 } else {
 //actualizar_proyecto(codigo_proyecto, proyecto_alias, date_term_proy, obse_proyecto);
 }
 } else {
 mensaje(false, "Ingrese LA FECHA DE TERMINO", "no");
 }
 
 } else {
 if (proyecto_alias == "") {
 mensaje(false, "Ingrese EL ALIAS", "no");
 
 } else {
 // actualizar_proyecto(codigo_proyecto, proyecto_alias, date_term_proy, obse_proyecto);
 }
 
 
 }
 });
 */


/*
 function actualizar_proyecto(id, alias, term_proy, obse_proy) {
 //console.log(id, alias,term_proy,obse_proy);
 let alias2 = alias.toUpperCase().trim();
 let user = obtener_user();
 $.ajax({
 type: 'POST',
 //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/actu_proy',
 url: url + '/GestionProyectos/public/index.php/actu_proy',
 dataType: 'json',
 data: {
 intIdProy: id,
 varAlias: alias2,
 usua_modi: user,
 FechaCambTerm: term_proy,
 varObservacion: obse_proy,
 },
 error: function (xhr, ajaxOptions, thrownError) {
 if (thrownError == "Internal Server Error") {
 actualizar_proyecto();
 }
 },
 
 success: function (responses) {
 let mensaje_alert = responses.data.mensaje;
 if (mensaje_alert === "Se ha actualizado correctamente.") {
 $('#modal-editar-proyecto').modal('hide');
 mensaje(true, mensaje_alert, "no");
 } else {
 mensaje(false, mensaje_alert, "no");
 }
 list_data();
 
 }
 
 });
 }
 ;*/



$("#form_register_detalle_proyecto").on('submit', function (e) {

    e.preventDefault();

    $.ajax({
        url: 'GUARDAR_DETALLE_PROYECTO',
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        dataType: 'json',
        /* beforeSend: function () {
         $("#modal-cargar-reproceso").modal('show')
         },
         */
        success: function (html) {
            console.log(html.mensaje);
            let response = html.mensaje;

            if (response == "Ingrese la OBSERVACION  OBLIGATORIO") {
                mensaje(false, response, "no");
            } else if (response == "Ingrese la Fecha de cambio  OBLIGATORIO") {
                mensaje(false, response, "no");
            } else {
                let mensajeFinal = response.data;
                console.log(mensajeFinal.mensaje);
                if (mensajeFinal.mensaje == "") {
                    mensaje(true, "GUARDADO CON EXITO", "no");
                    $('#modal-editar-proyecto').modal('hide');
                    list_data();
                }else{
                    mensaje(false, mensajeFinal.mensaje, "no");
                }
            }



        }
    });


});




$("#subir_archivo_icon_detalle_proyecto").click(function () {
    $("#subir_archivo_proyecto").trigger('click');
});

document.getElementById("subir_archivo_proyecto").onchange = function () {
    document.getElementById("nombre_archivo_detalle_proyecto").value = this.value;
};





function validar_documento_proyecto(url) {

    if (url === "vacio") {
        mensaje(false, "No hay archivo adjunto", "no");
    } else {
        $.ajax({
            url: url,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            /* error: function ()
             {
             
             mensaje(false, "No hay archivo adjunto", "no");
             },*/
            success: function () {
                console.log(window.location.href);
                window.location.href = url;
            }
        });
    }

}