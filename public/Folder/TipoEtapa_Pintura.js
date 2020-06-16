/* global array_avance */
var id_tipoEtapa;
var id_tipoEtapa_2;
var array_colaborador = [];
var codigo_usuario = "";

$('#btncerrar_tipoetapa').click(function () {
    limpiar();
});

$('#btnguardar_colaborador').click(function () {
    var textdata = "";
    array_colaborador = [];
    var rowindex = $("#trabajadores").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {
        for (var i = 0; i < rowindex.length; i++) {
            textdata = $('#trabajadores').jqxGrid('getrowdata', rowindex[i]);
            var row = {idcolaborador: textdata['intIdColaborador'], idetapa: id_tipoEtapa_2};
            array_colaborador.push(row);
        }
        var myJsonString = JSON.stringify(array_colaborador);
        guardar_colaborador(myJsonString, id_tipoEtapa_2);
    } else {
        mensaje(false, "NO HA SELECCIONADO NINGUN COLABORADOR", "no");
    }
});
function limpiar() {
    $("#modaltipoetapa").val('SELECCIONE');
    $("#trabajadores").jqxGrid("clearSelection");
}

$("#btn_buscar").click(function () {
    id_tipoEtapa = $("#tipoetapa_pintura").val();
    listar_tipoetapa_pintura(id_tipoEtapa); //buscar
});

$("#btnNuevoidtipoetapa").click(function () {
    id_tipoEtapa_2 = $("#tipoetapa_pintura").val();
    if (id_tipoEtapa_2 === "") {
        mensaje(false, "Seleccione Tipo Etapa", "");
    } else {
        listar_tipoetapa_colaborador(id_tipoEtapa_2);
    }
});

$("#excel").click(function () {
    var data = $("#grid_idtipoetapa").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Listar Tipo Etapa", true);
});

function cmb_tipoetapa() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_etap',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                cmb_tipoetapa();
            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdTipoEtap'},
                            {name: 'varDescTipoEtap'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#tipoetapa_pintura").jqxDropDownList({placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "varDescTipoEtap", valueMember: "intIdTipoEtap", width: 350, height: 30});
            $("#tipoetapa_pintura").jqxDropDownList('focus');
            $("#tipoetapa_pintura").jqxDropDownList('selectIndex', -1);
            $("#modaltipoetapa").jqxDropDownList({placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "varDescTipoEtap", valueMember: "intIdTipoEtap", width: 350, height: 30});
            $("#modaltipoetapa").jqxDropDownList('focus');
        }
    });
}

function listar_tipoetapa_pintura(id_tipoEtapa) {
    //alert(id_tipoEtapa);
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_personas_por_tipo_etapa',
        data: {intIdTipoEtap: id_tipoEtapa},
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_tipoetapa_pintura();
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    //cargo los campos que quiero visualizar
                    datafields: [{name: 'intIdColaborador', type: 'number'},
                        {name: 'varDescEsta', type: 'string'},
                        {name: 'Nombres', type: 'string'},
                        {name: 'varNumeIden', type: 'string'},
                        {name: 'varDescTipoEtap', type: 'string'},
                        {name: 'intIdTipoEtap', type: 'string'},
                        {name: 'acti_usua', type: 'string'},
                        {name: 'acti_hora', type: 'string'},
                        {name: 'usua_modi', type: 'string'},
                        {name: 'hora_modi', type: 'string'}
                    ]
                };
                //console.log(source);
                var dataAdapter = new $.jqx.dataAdapter(source);
               // console.log(source);
                var anular_colaborador_tipoetapa = function (row) {
                    var editrow = row;
                    var html = "";
                    var xidrow = $('#grid_idtipoetapa').jqxGrid('getrowdata', editrow);
                    var xcodestado = xidrow.varDescEsta;
                    //alert(xcodestado);
                    if (xcodestado === "ACTIVO") {
                        html = '<center><button class="btn btn-danger btn-sm" onClick=anular_colaborador("' + editrow + '"); style="margin-center: 2px;color: #001255;background-color: white;" ><i class="far fa-trash-alt"></i></button></center>';
                    } else
                    {
                        html = '<center><button class="btn btn-danger btn-sm" onClick=anular_colaborador("' + editrow + '"); style="margin-center: 2px;color: #001255;background-color: white;" ><i class="fas fa-edit"></i></button></center>';
                    }
                    return html;
                };
                // var editrow = -1;
                // aca empieza la grilla
                $("#grid_idtipoetapa").jqxGrid({
                    width: '100%', //750
                    height: '300',
                    source: dataAdapter,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    altrows: true,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        {text: 'OPCIONES', datafield: 'opc', width: 79, cellsrenderer: anular_colaborador_tipoetapa},
                        {text: 'APELLIDOS Y NOMBRES', width: 500, datafield: 'Nombres', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_idtipoetapa").jqxGrid('getrows');
                                                return count.length;
                                            }
                                }]},
                        {text: 'DNI', datafield: 'varNumeIden', width: 150},
                        {text: 'ESTADO', datafield: 'varDescEsta', width: 230, cellsalign: 'left'},
                        {text: 'CREADO POR', datafield: 'acti_usua', width: 150},
                        {text: 'CREADO EL', datafield: 'acti_hora', width: 150},
                        {text: 'MODIFICADO POR', datafield: 'usua_modi', width: 150},
                        {text: 'MODIFICADO EL', datafield: 'hora_modi', width: 150}
                    ]
                });
            } else {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    //cargo los campos que quiero visualizar
                    datafields: [{name: 'intIdColaborador', type: 'number'},
                        {name: 'varDescEsta', type: 'string'},
                        {name: 'Nombres', type: 'string'},
                        {name: 'varNumeIden', type: 'string'},
                        {name: 'varDescTipoEtap', type: 'string'},
                        {name: 'acti_usua', type: 'string'},
                        {name: 'acti_hora', type: 'string'},
                        {name: 'usua_modi', type: 'string'},
                        {name: 'hora_modi', type: 'string'}
                    ]
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                //var editrow = -1;
                // aca construyo la grilla
                $("#grid_idtipoetapa").jqxGrid({
                    width: '100%',
                    height: '300',
                    source: dataAdapter,
                    showfilterrow: true,
                    filterable: true,
                    sortable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    altrows: true,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        {text: 'OPCIONES', datafield: 'opc', width: 79, cellsrenderer: anular_colaborador_tipoetapa, cellsalign: 'center'},
                        {text: 'APELLIDOS Y NOMBRES', datafield: 'Nombres', width: 500, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_idtipoetapa").jqxGrid('getrows');
                                                return count.length;
                                            }
                                }]},
                        {text: 'DNI', datafield: 'varNumeIden', width: 150},
                        {text: 'ESTADO', datafield: 'VarDescEsta', width: 230},
                        {text: 'CREADO POR', datafield: 'acti_usua', width: 150},
                        {text: 'CREADO EL', datafield: 'acti_hora', width: 150},
                        {text: 'MODIFICADO POR', datafield: 'usua_modi', width: 150},
                        {text: 'MODIFICADO EL', datafield: 'hora_modi', width: 150}
                    ]
                });
            }
        }
    });
}

function listar_tipoetapa_colaborador(id_tipoEtapa_2) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_colaborador_tipo_etapa',
        data: {intIdTipoEtap: id_tipoEtapa_2},
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_tipoetapa_colaborador();
            }
        },

        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [{name: 'Nombres', type: 'string'},
                            {name: 'varNumeIden', type: 'string'},
                            {name: 'intIdColaborador', type: 'number'}
                        ]
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#trabajadores").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                showfilterrow: true,
                filterable: true,
                sortable: true,
                theme: 'darkblue',
                selectionmode: 'checkbox',
                showstatusbar: true,
                statusbarheight: 25,
                altrows: true,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: 'APELLIDOS Y NOMBRES', width: 550, datafield: 'Nombres'},
                    {text: 'DNI', width: 150, datafield: 'varNumeIden'}
                ]
            });
            $('#modaltipoetapa').val(id_tipoEtapa_2);
            $('#modaltipoetapa').jqxDropDownList({'disabled': true});
            $('#modal-agregar-tipoetapa_pintura').modal('show');
        }
    });
}

function anular_colaborador(idrow) {
    var textarray = $('#grid_idtipoetapa').jqxGrid('getrowdata', idrow);
    var idtipetapa = textarray.intIdTipoEtap;
    var idtipcolaborador = textarray.intIdColaborador;
    var estado = textarray.varDescEsta;
    // alert(estado);
    if (estado === "ACTIVO")
    {
        $.ajax({
            type: 'POST',
            url: url + '/GestionProyectos/public/index.php/actualizar_personas_por_tipo_etapa',
            dataType: 'json',
            data: {
                intIdTipoEtap: idtipetapa,
                intIdColaborador: idtipcolaborador,
                intIdEsta: 14,
                acti_usua: codigo_usuario
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError === "Internal Server Error") {
                }
            },
            success: function (responses) {
                if (responses.data === "") {
                    mensaje_noti(true, 'Registro anulado correctamente', "");
                    listar_tipoetapa_pintura(id_tipoEtapa);
                } else {
                    mensaje(false, "No se puede anular el Registro", "");
                    listar_errores(responses.data.mensaje);
                }
            }
        });
    } else {
        //mensaje(false, "El Registro se encuentra Anulado", "");
        //listar_tipoetapa_pintura(id_tipoEtapa);        
        $.ajax({
            type: 'POST',
            url: url + '/GestionProyectos/public/index.php/actualizar_personas_por_tipo_etapa',
            dataType: 'json',
            data: {
                intIdTipoEtap: idtipetapa,
                intIdColaborador: idtipcolaborador,
                intIdEsta: 3,
                acti_usua: codigo_usuario
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError === "Internal Server Error") {
                }
            },
            success: function (responses) {
                if (responses.data === "") {
                    mensaje_noti(true, 'Registro Activado correctamente', "");
                    listar_tipoetapa_pintura(id_tipoEtapa);
                } else {
                    mensaje(false, "No se puede Activar el Registro", "");
                    listar_errores(responses.data.mensaje);
                }
            }
        });

    }
}

function guardar_colaborador(array_colaborador, id_tipoEtapa_2) {
//console.log(array_colaborador);
    let idtipoetapa = id_tipoEtapa_2;
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/crear_personas_por_tipo_etapa',
        dataType: 'json',
        data: {
            acti_usua: user,
            informacion: array_colaborador
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
            }
        },
        success: function (responses) {

            if (responses.data === "") {
                mensaje_noti(true, 'Se asigno correctamente', "");
                array_avance = [];
                $("#trabajadores").jqxGrid('clearSelection');
                $("#btn_cerrar_modal").trigger('click');
                listar_tipoetapa_pintura(idtipoetapa);
            } else {
                array_avance = [];
                $("#trabajadores").jqxGrid('clearSelection');
                mensaje(false, "Hay errores al Asignar Avance.", "");
                listar_errores(responses.data.mensaje);
            }
        }
    });
}

function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    codigo_usuario = cod_user[0].codigo_usuario;
    return codigo_usuario;
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