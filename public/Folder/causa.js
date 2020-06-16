



$('#createcausa').click(function () {
    limpiar();
    $('#modal-create-causa').modal('show');
});

$("#registrar_causa_crea").click(function () {


    let codi_causa_crea = document.getElementById("codi_causa_mant").value;
    let descr_causa_crea = document.getElementById("descripcion_causa_mant").value;

    if (codi_causa_crea.length <= 5) {

        if (codi_causa_crea !== "") {
            if (descr_causa_crea !== "") {
                registrar_causa(codi_causa_crea, descr_causa_crea);
            } else {
                mensaje(false, "INGRESE DESCRIPCION", "no");
            }
        } else {
            mensaje(false, "INGRESE CODIGO", "no");
        }
    } else {
        mensaje(false, "EL CODIGO SOLO EXIGE 5 CARACTERES", "no");
    }


});


$("#actualizar_causa_edit").click(function () {
    let codi_causa_edi = document.getElementById("codigo_causa_edit").value;
    let descr_causa_editar = document.getElementById("descr_causa_edit").value;
    let estado_causa_editar = document.getElementById("id_estado_causa_edit").value;
    let id_causa_editar = document.getElementById("id_causa_edit").value;


    if (codi_causa_edi.length <= 5) {
        if (codi_causa_edi !== "") {
            if (descr_causa_editar !== "") {
                if (estado_causa_editar == null || estado_causa_editar == "") {
                    mensaje(false, "INGRESE EL ESTADDO", "no");
                } else {
                    actualizar_causa(id_causa_editar, codi_causa_edi, descr_causa_editar, estado_causa_editar);
                }
            } else {
                mensaje(false, "INGRESE EL DESCRIPCION", "no");
            }
        } else {
            mensaje(false, "INGRESE EL CODIGO", "no");
        }
    } else {
        mensaje(false, "EL CODIGO SOLO EXIGE 5 CARACTERES", "no");
    }



});
//FUNCION DE REGISTRAR CAUSA

function registrar_causa(codigo_causa_mant, descr_causa_mant) {
    let user = obtener_user();
    let codigo_causa_mant2 = codigo_causa_mant.toUpperCase().trim();
    let descr_causa_mant2 = descr_causa_mant;

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/regi_caus',
        dataType: 'json',
        data: {
            varCodiCausa: codigo_causa_mant2,
            varDescCausa: descr_causa_mant2,
            acti_usua: user,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                registrar_causa();
            }
        },
        success: function (responses) {

            if (responses.data == "") {

                mensaje(true, "GUARDADO CON EXITO", "modal-create-causa");

                listar_causa();
            } else {
                mensaje(false, responses.data, "modal-create-causa");
            }
        }
    });

}

function actualizar_causa(id_causa_edit, codi_causa_editar, descr_causa_edit, estado_causa_edit) {

    let user = obtener_user();
    let id_causa_edit2 = id_causa_edit;
    let codi_causa_editar2 = codi_causa_editar.toUpperCase().trim();
    ;
    let descr_causa_edit2 = descr_causa_edit;
    let estado_causa_edit2 = estado_causa_edit;


    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/edit_caus',
        dataType: 'json',
        data: {
            varCodiCausa: codi_causa_editar2,
            varDescCausa: descr_causa_edit2,
            usua_modi: user,
            intIdCausa: id_causa_edit2,
            intIdEsta: parseInt(estado_causa_edit2)

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // actualizar_causa();
            }
        },
        success: function (responses) {
            if (responses.data == "") {

                mensaje(true, "ACTUALIZACION CON EXITO", "modal-edit-causa");

                listar_causa();
            } else {
                mensaje(false, responses.data, "modal-edit-causa");
            }

        }
    });
}

function eliminar_causa(ideliminar_causa) {
    let user = obtener_user();

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/dele_caus',
        dataType: 'json',
        data: {
            intIdCausa: parseInt(ideliminar_causa),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                eliminar_causa();
            }
        },
        success: function (responses) {

            if (responses.data == "") {

                mensaje(true, "ELIMINACION CON EXITO", "no");

                listar_causa();
            } else {
                mensaje(false, responses.data, "no");
            }
        }
    });
}

function combox_estado() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/eleg_proc_estado',
        dataType: 'json',
        data: {
            intIdProcEsta: parseInt(5),

        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                // combox_estado();
            }
        },
        success: function (responses) {

            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdEsta + '">' + responses.data[c]
                        .varDescEsta + '</option>';

                $("#id_estado_causa_edit").html(va);
            }


        }
    });
}
function listar_causa() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_caus',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_causa();
            }
        },
        success: function (responses) {


            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdCausa', type: 'number'},
                    {name: 'varCodiCausa', type: 'string'},
                    {name: 'varDescCausa', type: 'string'},
                    {name: 'varDescEsta', type: 'string'},
                    {name: 'intIdEsta', type: 'number'},
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

            $("#grid_causa").jqxGrid('clear');

            /* var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
             if (value === "ACTIVO") {
             return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
             } else {
             return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0051;">' + value + '</span>';
             }
             }*/

            $("#grid_causa").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                showfilterrow: true,
                filterable: true,
                selectionmode: 'singlecell',
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
                            var offset = $("#grid_causa").offset();
                            var dataRecord = $("#grid_causa").jqxGrid('getrowdata', editrow);


                            $("#id_causa_edit").val(dataRecord.intIdCausa);
                            $("#codigo_causa_edit").val(dataRecord.varCodiCausa);
                            $("#descr_causa_edit").val(dataRecord.varDescCausa);
                            $("#id_estado_causa_edit").val(dataRecord.intIdEsta);

                            $('#modal-edit-causa').modal('show');

                        }
                    },

                    {text: 'Eliminar', datafield: 'Eliminar', cellclassname: "special", columntype: 'button', width: 90, cellsrenderer: function () {
                            return "Eliminar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid_causa").offset();
                            var dataRecord = $("#grid_causa").jqxGrid('getrowdata', editrow);

                            eliminar_causa(dataRecord.intIdCausa);

                        }
                    },
                    {text: 'ID', datafield: 'intIdCausa', width: 60, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid_causa").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Codigo', datafield: 'varCodiCausa', width: 130},
                    {text: 'Descripcion', datafield: 'varDescCausa', width: 250},
                    // {text: 'Estado', datafield: 'varDescEsta', cellsalign: 'left', width: 100, cellsrenderer: cellsrenderer},
                    {text: 'Estado', datafield: 'varDescEsta', cellsalign: 'left', width: 100},
                    {text: 'id_estado', datafield: 'intIdEsta', cellsalign: 'left', width: 190, hidden: true},
                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'left', width: 150},
                    {text: 'Creado el', datafield: 'acti_hora', cellsalign: 'left', width: 180},
                    {text: 'Modificado por', datafield: 'usua_modi', width: 150},
                    {text: 'Modificado el', datafield: 'hora_modi', width: 180},
                ]
            });
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

function limpiar() {
    document.getElementById("codi_causa_mant").value = '';
    document.getElementById("descripcion_causa_mant").value = '';

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


$('#excel_causa').click(function () {

    var data_info = "";
    var data_rows = "";
    var data_info = jQuery('#grid_causa').jqxGrid('getdatainformation');

    data_rows = data_info.rowscount;

    //jQuery("#repo_ries_suce_vers_acci_lbl_mens").html("");
    if (data_rows === 0) {
        mensaje(false, "No hay datos que exportar", "no");
    } else {

        var rows = $("#grid_causa").jqxGrid("exportData", 'json');

        expo_arch_exce(rows, "REPORTE CAUSA", true);

    }

});