var codigoot_guia = "";
var producto_guia = "";
var dataAdapter = "";
var estado_guia = "";
var fecha_inicio_global = "";
var checkedItems_Guia_emitida = "";
var checkedItems_Guia_recibida = "";
var checkedItems_docu = "";
var codtransportista_guia_edit = "";
var transportista_guia_array = [];
var coddepartamento_llegada_edit = "";
var coddepartamento_sql_edit = "";
var coddistrito_sql = "";
var provincia_guia_edit = "";
var distrito_partida_edit = "";
var cod_motivo_edit = "";


//VISUALIZAR 
var transportista_guia_array_visual = [];
var codtransportista_guia_visual = "";
var coddepartamento_llegada_visual = "";
var provincia_guia_visual = "";
var distrito_partida_visual = "";

var now = new Date();
var day_guia = ("0" + now.getDate()).slice(-2);
var day_next_guia = ("0" + now.getDate()).slice(-2);
var month_guia = ("0" + (now.getMonth() + 1)).slice(-2);
var today_guia = now.getFullYear() + "-" + (month_guia) + "-" + (day_guia);
//var today_next = now.getFullYear() + "-" + (month) + "-" + (day_next);
var firstDay_guia = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia_guia = moment(firstDay_guia).format('YYYY-MM-DD');

$('#fech_inic_guia').val(primerdia_guia);
$('#fech_fin_guia').val(today_guia);

// FUNCION DE FECHA 

// funciones hover


$("#txt_ot_guia").on('change', function (event) {
    codigoot_guia = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot_guia = item.value;

        }
    }
    if (codigoot_guia) {
        $("#grid_guia").jqxGrid('clearSelection');
        $("#grid_guia").jqxGrid('clear');
    }

});
$("#producto_guia").on('change', function (event) {
    producto_guia = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            producto_guia = item.value;
            //console.log(producto_guia);
        }
    }
    if (producto_guia) {
        $("#grid_guia").jqxGrid('clearSelection');
        $("#grid_guia").jqxGrid('clear');
    }

});

$("#estados_ot_guia").on('change', function (event) {
    estado_guia = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            estado_guia = item.value;
            //console.log(estado_guia);
        }
    }
    if (estado_guia) {
        $("#grid_guia").jqxGrid('clearSelection');
        $("#grid_guia").jqxGrid('clear');
    }
});



$("#buscar_guia").click(function () {
    let fecha_inicial_guia = $("#fech_inic_guia").val();
    let fecha_final_guia = $("#fech_fin_guia").val();

    if (codigoot_guia) {
        if (producto_guia) {
            if (fecha_inicial_guia) {
                if (fecha_final_guia) {
                    if (estado_guia) {
                        grilla_listar_guia(codigoot_guia, producto_guia, fecha_inicial_guia, fecha_final_guia, estado_guia);
                    } else {
                        mensaje(false, "INGRESE EL ESTADO", "no");
                    }
                } else {
                    mensaje(false, "INGRESE LA FECHA DE FINAL", "no");
                }
            } else {
                mensaje(false, "INGRESE LA FECHA DE INICIO", "no");
            }
        } else {
            mensaje(false, "INGRESE TIPO ELEMENTO", "no");
        }
    } else {
        mensaje(false, "INGRESE LA OT", "no");
    }


});


function listar_data_list_proyectos() {
    var array_ot = new Array();
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionPartList/public/index.php/List_proy_vige',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_data_list_proyectos();
            }
        },
        success: function (responses) {
            // console.log(responses);
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_ot_guia").jqxDropDownList({
                placeHolder: "Seleccione",
                filterPlaceHolder: "Buscar", 
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_guia").jqxDropDownList('focus');
             $("#txt_ot_guia").jqxDropDownList('selectIndex',-1);
        }
    });
}
function combo_producto() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_prod',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdTipoProducto'},
                            {name: 'varDescTipoProd'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#producto_guia").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 180, height: 30});
            // Focus the jqxDropDownList
            $("#producto_guia").jqxDropDownList('focus');
            $("#producto_guia").jqxDropDownList('selectIndex', 0);
        }
    });
}


function combo_estados() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/eleg_proc_estado',
        dataType: 'json',
        data: {
            intIdProcEsta: 11
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {

            responses.data.push({intIdEsta: -1, varDescEsta: 'TODOS'});

            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'intIdEsta'},
                            {name: 'varDescEsta'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);


            $("#estados_ot_guia").jqxDropDownList({source: dataAdapter, displayMember: "varDescEsta", valueMember: "intIdEsta", width: 150, height: 30});
            $("#estados_ot_guia").jqxDropDownList('selectIndex', 0);
            $("#estados_ot_guia").jqxDropDownList('focus');
        }
    });
}


function grilla_listar_guia(codigo_ot2, pro_guia2, fecha_inicial_guia2, fecha_final_guia2, estado2) {

    $("#modal-cargar-guia").modal('show');


    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_guias',
        dataType: 'json',
        data: {
            intIdProy: parseInt(codigo_ot2),
            intIdTipoProducto: parseInt(pro_guia2),
            fecha_inicio: fecha_inicial_guia2,
            fecha_final: fecha_final_guia2,
            intIdEsta: parseInt(estado2)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                window.setTimeout(function () {

                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);
            }
        },
        success: function (responses) {
            //   console.log(responses);

            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdGuia', type: 'number'},
                    {name: 'intIdDesp', type: 'number'},
                    {name: 'varContaDocu', type: 'String'},
                    {name: 'deciPesoNeto', type: 'String'},
                    {name: 'cantidad', type: 'string'},
                    {name: 'varRefe', type: 'String'},
                    {name: 'varEsta', type: 'String'},
                    {name: 'acti_usua', type: 'String'},
                    {name: 'acti_hora', type: 'String'},
                    {name: 'tipodocumento', type: 'String'},
                    {name: 'varTipoGuia', type: 'String'},
                    {name: 'varArchEmit', type: 'String'},
                    {name: 'varArchRecep', type: 'String'},
                    {name: 'varDescripcion', type: 'String'},
                    
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            if (estado2 == "-1") {
                var descargar_archivo = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);

                    // var archivo = url + '/Documentos/Reproceso/' + dataRecord.varArchivo;
                    var html = "";


                    html +=
                            '<button class="btn btn-danger btn-sm" onClick=generar_guia_pdf("' + editrow + '"); style="margin-left: 3px;color: red;background-color:white;" ><i class="far fa-file-pdf" ></i></button>' +
                            '<button class="btn btn-danger btn-sm" onClick=anular_guia("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-trash"></i></button>' +
                            '<button class="btn btn-danger btn-sm" onClick=editar_guia("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-edit"></i></button>';
                    if (dataRecord.varEsta === "IMPRESO") {
                        html += '<button class="btn btn-danger btn-sm" onClick=eyes_guia("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-eye"></i></button>';
                    } else {
                        html += '<button class="btn btn-danger btn-sm" onClick=eyes_guia("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-eye-slash"></i></button>';
                    }

                    return html;
                };

                var guia_emitida = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);
                    var archivo = url + '/Documentos/GuiasRemision/' + dataRecord.varContaDocu + '/' + dataRecord.varArchEmit;
                    var emitida = "";

                    if (dataRecord.varArchEmit === null || dataRecord.varArchEmit === "") {
                        emitida = '<center><button class="btn btn-danger btn-sm" onClick=generar_guia_emitida("' + editrow + '"); style="margin-left: 3px;color: #dc3545;background-color: white;" ><i class="fas fa-window-minimize"></i></button></center>';

                    } else {
                        emitida = '<center><button class="btn btn-danger btn-sm" onClick=validar_archivo("' + editrow + '","' + archivo + '"); style="margin-left: 3px;color: #28a745;background-color: white;" ><i class="fas fa-check"></i></button></center>';
                        // html = '<button class="btn btn-danger btn-sm" onClick=validar_documento("' + archivo + '"); style="margin-left: 3px;color: white;background-color: green;" ><i class="fas fa-download"></i></button>';
                    }

                    return emitida;
                };

                var guia_recibida = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);
                    var archivo_recibida = url + '/Documentos/GuiasRemision/' + dataRecord.varContaDocu + '/' + dataRecord.varArchRecep;
                    var recibida = "";

                    if (dataRecord.varArchRecep === null || dataRecord.varArchRecep === "") {
                        recibida = '<center><button class="btn btn-danger btn-sm" onClick=generar_guia_recibida("' + editrow + '"); style="margin-left: 3px;color: #dc3545;background-color: white;"><i class="fas fa-upload"></i></button></center>';
                    } else {
                        recibida = '<center><button class="btn btn-danger btn-sm" onClick=validar_archivo("' + editrow + '","' + archivo_recibida + '"); style="margin-left: 3px;color: #28a745;background-color: white;"><i class="fas fa-download"></i></button></center>';
                    }



                    return recibida;
                };


                dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_guia").jqxGrid('clearSelection');
                $("#grid_guia").jqxGrid('clear');

                window.setTimeout(function () {

                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);



                var editrow = -1;
                /**
                 * SE DIBUJA LA TABLA
                 */
                $("#grid_guia").jqxGrid({
                    width: '100%',
                    height: '100%',
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

                        {text: 'Opciones',width: '13%', datafield: 'Descargar', cellsrenderer: descargar_archivo, cellsalign: 'center'},
                        {text: 'G.Emitida',width: '8%', datafield: 'emitida', cellsrenderer: guia_emitida, cellsalign: 'center'},
                        {text: 'G.Recibida',width: '8%', datafield: 'recibida', cellsrenderer: guia_recibida, cellsalign: 'center'},
                        {text: 'Id', datafield: 'intIdGuia', cellsalign: 'left', hidden: true},
                        {text: 'Despacho', datafield: 'intIdDesp',width:'7%', cellsalign: 'center'},
                        {text: 'Numero Guia', datafield: 'varContaDocu',width:'11%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_guia").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }]},
                        {text: 'Peso Neto', datafield: 'deciPesoNeto',width:'9%'},
                        {text: 'Cantidad', datafield: 'cantidad',width:'7%', cellsalign: 'left', columntype: 'button', buttonclick: function (row) {

                                editrow = row;
                                var offset_guia = $("#grid_guia").offset();
                                var dataRecord_guia = $("#grid_guia").jqxGrid('getrowdata', editrow);
                                //    console.log(dataRecord_guia.tipodocumento, dataRecord_guia.intIdGuia, dataRecord_guia.varEsta);

                                most_info_guia(dataRecord_guia.intIdGuia, dataRecord_guia.tipodocumento, dataRecord_guia.varEsta);
                                //intIdProy, intIdTipoProducto, intIdEsta, intIdProyZona, varBulto, intIdDesp, intIdTipoGrupo

                            },
                        },
                        {text: 'Referencia', datafield: 'varRefe',width:'15%', cellsalign: 'left'},
                        {text: 'Estado', datafield: 'varEsta',width:'10%', cellsalign: 'left'},
                        {text: 'Creador por', datafield: 'acti_usua',width:'10%', cellsalign: 'left', width: 180},
                        {text: 'Creador el', datafield: 'acti_hora',width:'10%'},
                        {text: 'Tip.Documento', datafield: 'tipodocumento',width:'10%'},
                        {text: 'Tipo Guia', datafield: 'varTipoGuia', hidden: true},
                        {text: 'Guia Emitida', datafield: 'varArchEmit', hidden: true},
                        {text: 'Guia Recibida', datafield: 'varArchRecep', hidden: true},
                         {text: 'Motivo', datafield: 'varDescripcion',width:'20%'},
                    ]
                });
            } else if (estado2 == "29") {

                dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_guia").jqxGrid('clear');

                window.setTimeout(function () {

                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);



                var editrow = -1;
                /**
                 * SE DIBUJA LA TABLA
                 */
                $("#grid_guia").jqxGrid({
                    width: '100%',
                    height: '100%',
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
                        {text: 'Id', datafield: 'intIdGuia', width:'7%', cellsalign: 'left', hidden: true},
                        {text: 'Despacho', datafield: 'intIdDesp', width:'7%', width: 80, cellsalign: 'center'},
                         {text: 'Motivo', datafield: 'varDescripcion',width:'20%'},
                        {text: 'Numero Guia', datafield: 'varContaDocu',width:'11%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_guia").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }]},
                        {text: 'Peso Neto', datafield: 'deciPesoNeto', width:'10%'},
                        {text: 'Cantidad', datafield: 'cantidad', cellsalign: 'left',width:'10%'},
                        {text: 'Referencia', datafield: 'varRefe', cellsalign: 'left',width:'15%'},
                        {text: 'Estado', datafield: 'varEsta', cellsalign: 'left',width:'15%'},
                        {text: 'Creador por', datafield: 'acti_usua', cellsalign: 'left', width:'15%'},
                        {text: 'Creador el', datafield: 'acti_hora',width:'15%'},
                        {text: 'Tip.Documento', datafield: 'tipodocumento', width:'15%'},
                        {text: 'Tipo Guia', datafield: 'varTipoGuia', width: 80, hidden: true},
                        {text: 'Guia Emitida', datafield: 'varArchEmit', width: 80, hidden: true},
                        {text: 'Guia Recibida', datafield: 'varArchRecep', width: 80, hidden: true},
                    ]
                });
            } else if (estado2 == "30") {
                var descargar_archivo = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);

                    // var archivo = url + '/Documentos/Reproceso/' + dataRecord.varArchivo;
                    var html = "";

                    html +=
                            '<button class="btn btn-danger btn-sm" onClick=generar_guia_pdf("' + editrow + '"); style="margin-left: 3px;color: red;background-color:white;" ><i class="far fa-file-pdf" ></i></button>' +
                            '<button class="btn btn-danger btn-sm" onClick=anular_guia("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-trash"></i></button>' +
                            '<button class="btn btn-danger btn-sm" onClick=eyes_guia("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-eye"></i></button>';


                    return html;
                };

                var guia_emitida = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);
                    var archivo = url + '/Documentos/GuiasRemision/' + dataRecord.varContaDocu + '/' + dataRecord.varArchEmit;
                    var emitida = "";

                    if (dataRecord.varArchEmit === null || dataRecord.varArchEmit === "") {
                        emitida = '<center><button class="btn btn-danger btn-sm" onClick=generar_guia_emitida("' + editrow + '"); style="margin-left: 3px;color: #dc3545;background-color: white;" ><i class="fas fa-window-minimize"></i></button></center>';

                    } else {
                        emitida = '<center><button class="btn btn-danger btn-sm" onClick=validar_archivo("' + editrow + '","' + archivo + '"); style="margin-left: 3px;color: #28a745;background-color: white;" ><i class="fas fa-check"></i></button></center>';
                        // html = '<button class="btn btn-danger btn-sm" onClick=validar_documento("' + archivo + '"); style="margin-left: 3px;color: white;background-color: green;" ><i class="fas fa-download"></i></button>';
                    }

                    return emitida;
                };

                var guia_recibida = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);
                    var archivo_recibida = url + '/Documentos/GuiasRemision/' + dataRecord.varContaDocu + '/' + dataRecord.varArchRecep;
                    var recibida = "";

                    if (dataRecord.varArchRecep === null || dataRecord.varArchRecep === "") {
                        recibida = '<center><button class="btn btn-danger btn-sm" onClick=generar_guia_recibida("' + editrow + '"); style="margin-left: 3px;color: #dc3545;background-color: white;"><i class="fas fa-upload"></i></button></center>';
                    } else {
                        recibida = '<center><button class="btn btn-danger btn-sm" onClick=validar_archivo("' + editrow + '","' + archivo_recibida + '"); style="margin-left: 3px;color: #28a745;background-color: white;"><i class="fas fa-download"></i></button></center>';
                    }



                    return recibida;
                };


                dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_guia").jqxGrid('clearSelection');
                $("#grid_guia").jqxGrid('clear');

                window.setTimeout(function () {

                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);



                var editrow = -1;
                /**
                 * SE DIBUJA LA TABLA
                 */
                $("#grid_guia").jqxGrid({
                    width: '100%',
                    height: '100%',
                    source: dataAdapter,
                    columnsresize: true,
                    altrows: true,
                    showfilterrow: true,
                    filterable: true,
                    selectionmode: 'checkbox',
                    sortable: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [

                        {text: 'Opciones', width: '13%', datafield: 'Descargar', cellsrenderer: descargar_archivo, cellsalign: 'center'},
                        {text: 'G.Emitida', width: '8%', datafield: 'emitida', cellsrenderer: guia_emitida, cellsalign: 'center'},
                        {text: 'G.Recibida', width: '8%', datafield: 'recibida', cellsrenderer: guia_recibida, cellsalign: 'center'},
                        {text: 'Id', datafield: 'intIdGuia', width: 60, cellsalign: 'left', hidden: true},
                        {text: 'Despacho', datafield: 'intIdDesp',width:'7%', cellsalign: 'center'},
                        {text: 'Numero Guia', datafield: 'varContaDocu', width: '10%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_guia").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }]
                        },
                        {text: 'Peso Neto', datafield: 'deciPesoNeto',width: '10%'},
                        {text: 'Cantidad', datafield: 'cantidad', cellsalign: 'left',width: '9%', columntype: 'button', buttonclick: function (row) {

                                editrow = row;
                                var offset_guia = $("#grid_guia").offset();
                                var dataRecord_guia = $("#grid_guia").jqxGrid('getrowdata', editrow);


                                most_info_guia(dataRecord_guia.intIdGuia, dataRecord_guia.tipodocumento, dataRecord_guia.varEsta);

                            },
                        },
                        {text: 'Referencia', datafield: 'varRefe', cellsalign: 'left',width: '15%'},
                        {text: 'Estado', datafield: 'varEsta', cellsalign: 'left', width: '10%'},
                        {text: 'Creador por', datafield: 'acti_usua', cellsalign: 'left', width: '15%'},
                        {text: 'Creador el', datafield: 'acti_hora', width: '15%'},
                        {text: 'Tip.Documento', datafield: 'tipodocumento', width: '10%'},
                        {text: 'Tipo Guia', datafield: 'varTipoGuia', width: 80, hidden: true},
                        {text: 'Guia Emitida', datafield: 'varArchEmit', width: 80, hidden: true},
                        {text: 'Guia Recibida', datafield: 'varArchRecep', width: 80, hidden: true},
                    ]
                });
            } else if (estado2 == "31") {
                var descargar_archivo = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);

                    // var archivo = url + '/Documentos/Reproceso/' + dataRecord.varArchivo;
                    var html = "";

                    html +=
                            '<button class="btn btn-danger btn-sm" onClick=generar_guia_pdf("' + editrow + '"); style="margin-left: 3px;color: red;background-color:white;" ><i class="far fa-file-pdf" ></i></button>' +
                            '<button class="btn btn-danger btn-sm" onClick=editar_guia("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-edit"></i></button>';


                    return html;
                };

                var guia_emitida = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);
                    var archivo = url + '/Documentos/GuiasRemision/' + dataRecord.varContaDocu + '/' + dataRecord.varArchEmit;
                    var emitida = "";
                        console.log(dataRecord);
                    if (dataRecord.varArchEmit === null || dataRecord.varArchEmit === "") {
                        emitida = '<center><button class="btn btn-danger btn-sm" onClick=generar_guia_emitida("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-upload"></i></button></center>';

                    } else {
                        emitida = '<center><button class="btn btn-danger btn-sm" onClick=validar_archivo("' + editrow + '","' + archivo + '"); style="margin-left: 3px;color: white;background-color: #001255;" ><i class="fas fa-download"></i></i></button></center>';
                        // html = '<button class="btn btn-danger btn-sm" onClick=validar_documento("' + archivo + '"); style="margin-left: 3px;color: white;background-color: green;" ><i class="fas fa-download"></i></button>';
                    }

                    return emitida;
                };

                var guia_recibida = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', editrow);
                    var archivo_recibida = url + '/Documentos/GuiasRemision/' + dataRecord.varContaDocu + '/' + dataRecord.varArchRecep;
                    var recibida = "";
                    console.log(dataRecord);
                    if (dataRecord.varArchRecep === null || dataRecord.varArchRecep === "") {
                        recibida = '<center><button class="btn btn-danger btn-sm" onClick=generar_guia_recibida("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;"><i class="fas fa-upload"></i></button></center>';
                    } else {
                        recibida = '<center><button class="btn btn-danger btn-sm" onClick=validar_archivo("' + editrow + '","' + archivo_recibida + '"); style="margin-left: 3px;color: white;background-color: #001255;"><i class="fas fa-download"></i></button></center>';
                    }



                    return recibida;
                };


                dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_guia").jqxGrid('clearSelection');
                $("#grid_guia").jqxGrid('clear');

                window.setTimeout(function () {

                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);



                var editrow = -1;
                /**
                 * SE DIBUJA LA TABLA
                 */
                $("#grid_guia").jqxGrid({
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

                        {text: 'Opciones', width: '13%', datafield: 'Descargar', cellsrenderer: descargar_archivo, cellsalign: 'center'},
                        {text: 'G.Emitida', width: '8%', datafield: 'emitida', cellsrenderer: guia_emitida, cellsalign: 'center', hidden: true},
                        {text: 'G.Recibida', width: '8%', datafield: 'recibida', cellsrenderer: guia_recibida, cellsalign: 'center', hidden: true},
                        {text: 'Id', datafield: 'intIdGuia', width: 60, cellsalign: 'left', hidden: true},
                        {text: 'Despacho', datafield: 'intIdDesp', width: '8%', cellsalign: 'center'},
                        {text: 'Numero Guia', datafield: 'varContaDocu',width:'7%', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_guia").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }]},
                        {text: 'Peso Neto', datafield: 'deciPesoNeto', width:'10%'},
                        {text: 'Cantidad', datafield: 'cantidad', cellsalign: 'left', width:'10%', columntype: 'button', buttonclick: function (row) {

                                editrow = row;
                                var offset_guia = $("#grid_guia").offset();
                                var dataRecord_guia = $("#grid_guia").jqxGrid('getrowdata', editrow);


                                most_info_guia(dataRecord_guia.intIdGuia, dataRecord_guia.tipodocumento, dataRecord_guia.varEsta);

                            },
                        },
                        {text: 'Referencia', datafield: 'varRefe', cellsalign: 'left', width:'15%'},
                        {text: 'Estado', datafield: 'varEsta', cellsalign: 'left', width:'10%'},
                        {text: 'Creador por', datafield: 'acti_usua', cellsalign: 'left', width:'15%'},
                        {text: 'Creador el', datafield: 'acti_hora', width:'15%'},
                        {text: 'Tip.Documento', datafield: 'tipodocumento', width:'10%'},
                        {text: 'Tipo Guia', datafield: 'varTipoGuia', width: 80, hidden: true},
                        {text: 'Guia Emitida', datafield: 'varArchEmit', width: 80, hidden: true},
                        {text: 'Guia Recibida', datafield: 'varArchRecep', width: 80, hidden: true},
                    ]
                });
            }


            $("#grid_guia").jqxGrid('localizestrings', localizationobj);
            var dataCount = $('#grid_guia').jqxGrid('getrows');

        }
    });



}


function generar_guia_emitida(idGuia_emitida) {
    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', idGuia_emitida);
    console.log(dataRecord);
    if (dataRecord.varEsta === "ANULADO") {
        mensaje(false, "LA GUIA DE REMISION ESTA ANULADA", "no");
    } else if (dataRecord.varEsta === "SIN IMPRESION") {
        mensaje(false, "LA GUIA DE REMISION ESTA SIN IMPRESION", "no");
    } else {
        $("#id_guia_emitida").val(dataRecord.intIdGuia);
        $("#nombre_carpeta_emitida").val(dataRecord.varContaDocu);
        $("#usuario_guia_emitida").val(obtener_user());
        $("#modal-guia-emitida").modal('show');
    }

}

function generar_guia_pdf(idGuiapdf) {
    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', idGuiapdf);
    // console.log(dataRecord.intIdGuia);
    let fecha_inicio_pdf = $("#fech_inic_guia").val();
    let fecha_final_pdf = $('#fech_fin_guia').val();

    var array_id = [];
    var row = {id: dataRecord.intIdGuia};
    array_id.push(row);
    var myJsonString = JSON.stringify(array_id);



    if (dataRecord.varEsta === "ANULADO") {
        mensaje(false, "LA GUIA DE REMISION ESTA ANULADA", "no");
    } else if (dataRecord.varEsta === "IMPRESO") {

        $(location).attr('href', "guias/pdf/" + myJsonString + '/' + dataRecord.varTipoGuia);
    } else {
        let user = obtener_user();
        $.ajax({
            type: 'POST',
            url: url + '/GestionProyectos/public/index.php/guia_imprimir',
            dataType: 'json',
            data: {
                data: myJsonString,
                user: user
            },
            success: function (responses) {
                grilla_listar_guia(codigoot_guia, producto_guia, fecha_inicio_pdf, fecha_final_pdf, estado_guia);
                $(location).attr('href', "guias/pdf/" + myJsonString + '/' + dataRecord.varTipoGuia);

            }
        });



    }


}

// SUBIR ARCHIVOS  y cambia el nombre 
$("#subir_archivo_icon_guia_emitida").click(function () {
    $("#subir_archivo_guiaemitida").trigger('click');
});

document.getElementById("subir_archivo_guiaemitida").onchange = function () {
    document.getElementById("nombre_archivo_guiaemitida").value = this.value;
};


$("#form_register_guia_emitida").on('submit', function (e) {
    // console.log(e);
    $("#modal-cargar-guia").modal('show');
    let fech_inicial_guia_emitida = $('#fech_inic_guia').val();
    let fech_final_guia_emitida = $('#fech_fin_guia').val();
    e.preventDefault();

    $.ajax({
        url: 'GUARDAR_GUIA_EMITIDA',
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
            // console.log(html.mensaje);
            window.setTimeout(function () {

                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);
            if (html.mensaje == "") {
                mensaje(true, "GUARDADO CON EXITO", "modal-guia-emitida");
                limpiar_campos();
                grilla_listar_guia(codigoot_guia, producto_guia, fech_inicial_guia_emitida, fech_final_guia_emitida, estado_guia);
            } else {
                mensaje(false, html.mensaje, "no");
            }
            // grilla_listar_guia()

        }
    });

});

//limpiar campos 
function limpiar_campos() {
    $("#id_guia_emitida").val('');
    document.getElementsByName('id_guia_emitida').value = '';
    $("#nombre_carpeta_emitida").val('');
    document.getElementsByName('nombre_carpeta_emitida').value = '';
    //ARCHIVO
    $("#nombre_archivo_guiaemitida").val('');
    document.getElementsByName('nombre_archivo_guiaemitida').value = '';

    $("#subir_archivo_icon_guia_emitida").val('');
    $("#subir_archivo_guiaemitida").val('');
    document.getElementsByName('subir_archivo_guiaemitida').value = '';

    $("#usuario_guia_emitida").val('');
    document.getElementsByName('usuario_guia_emitida').value = '';
}

$("#btn_cerrar_guia_emitida").click(function () {
    limpiar_campos();
});

function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}

function validar_archivo(idguiaArchivo, url) {
    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', idguiaArchivo);
    // var archivo_recibida = url + '/Documentos/GuiasRemision/' + dataRecord.varContaDocu + '/' + dataRecord.varArchRecep;

    if (dataRecord.varEsta === "ANULADO") {
        mensaje(false, "LA GUIA DE REMISION ESTA ANULADA", "no");
    } else if (dataRecord.varEsta === "SIN IMPRESION") {
        mensaje(false, "LA GUIA DE REMISION ESTA SIN IMPRESION", "no");
    } else {

        /*$.ajax({
         url: url,
         headers: {
         'Cache-Control': 'no-cache, no-store, must-revalidate',
         'Pragma': 'no-cache',
         'Expires': '0'
         },
         success: function () {
         
         window.location.href = url;
         
         
         }
         });*/
        window.open(url, 'Download');
    }


}



//GUIA RECIBIDA
function generar_guia_recibida(idGuia_recibida) {
    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', idGuia_recibida);
    if (dataRecord.varEsta === "ANULADO") {
        mensaje(false, "LA GUIA DE REMISION ESTA ANULADA", "no");
    } else if (dataRecord.varEsta === "SIN IMPRESION") {
        mensaje(false, "LA GUIA DE REMISION ESTA SIN IMPRESION", "no");
    } else {
        $("#id_guia_recibida").val(dataRecord.intIdGuia);
        $("#nombre_carpeta_recibida").val(dataRecord.varContaDocu);
        $("#usuario_guia_recibida").val(obtener_user);

        $("#modal-guia-recibida").modal('show');
    }

}

// SUBIR ARCHIVOS  y cambia el nombre 
$("#subir_archivo_icon_guia_recibida").click(function () {
    $("#subir_archivo_guia_recibida").trigger('click');
});

document.getElementById("subir_archivo_guia_recibida").onchange = function () {
    document.getElementById("nombre_archivo_guiarecibida").value = this.value;
};

//BOTON CERRAR 
$("#btn_cerrar_guia_recibida").click(function () {

    $("#id_guia_recibida").val('');
    document.getElementsByName('id_guia_recibida').value = '';
    $("#nombre_carpeta_recibida").val('');
    document.getElementsByName('nombre_carpeta_recibida').value = '';
    //ARCHIVO
    $("#nombre_archivo_guiarecibida").val('');
    document.getElementsByName('nombre_archivo_guiarecibida').value = '';

    $("#subir_archivo_icon_guia_recibida").val('');
    $("#subir_archivo_guia_recibida").val('');
    document.getElementsByName('subir_archivo_guia_recibida').value = '';

    $("#usuario_guia_recibida").val('');
    document.getElementsByName('usuario_guia_recibida').value = '';
});

// REGISTRAR GUIA RECIBIDA 
$("#form_register_guia_recibida").on('submit', function (e) {
    // console.log(e);
    $("#modal-cargar-guia").modal('show');
    let fech_inicial_guia_recibida = $('#fech_inic_guia').val();
    let fech_final_guia_recibida = $('#fech_fin_guia').val();
    e.preventDefault();


    $.ajax({
        url: 'GUARDAR_GUIA_RECIBIDA',
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
            //console.log(html);
            window.setTimeout(function () {

                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);

            if (html.mensaje == "") {
                mensaje(true, "GUARDADO CON EXITO", "modal-guia-recibida");
                limpia_campo_recibida();
                grilla_listar_guia(codigoot_guia, producto_guia, fech_inicial_guia_recibida, fech_final_guia_recibida, estado_guia);
            } else {
                mensaje(false, html.mensaje, "no");
            }

        }
    });

});

//LIMPIAR RECIBIDA
function limpia_campo_recibida() {
    $("#id_guia_recibida").val('');
    document.getElementsByName('id_guia_recibida').value = '';
    $("#nombre_carpeta_recibida").val('');
    document.getElementsByName('nombre_carpeta_recibida').value = '';
    //ARCHIVO
    $("#nombre_archivo_guiarecibida").val('');
    document.getElementsByName('nombre_archivo_guiarecibida').value = '';

    $("#subir_archivo_icon_guia_recibida").val('');
    $("#subir_archivo_guia_recibida").val('');
    document.getElementsByName('subir_archivo_guia_recibida').value = '';

    $("#usuario_guia_recibida").val('');
    document.getElementsByName('usuario_guia_recibida').value = '';
}

//ANULAR GUIA 



function combo_motivo_anular() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_motivo_id',
        dataType: 'json',
        data: {
            intIdTipoMoti: 5
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            console.log(responses);
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        //template: "warning",
                        datafields: [
                            {name: 'intIdMoti'},
                            {name: 'varDescripcion'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#motivo_anular_guia").jqxDropDownList({template: "primary", placeHolder: "MOTIVO :", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdMoti", width: 200, height: 25});
            //Focus the jqxDropDownList
            $("#motivo_anular_guia").jqxDropDownList('focus');
            // $("#motivo_anular_guia").jqxDropDownList('selectIndex', 0);

        }
    });
}


function anular_guia(idguia_anulado) {
    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', idguia_anulado);

    let ot_proyecto = codigoot_guia;
    let codigo_producto = producto_guia;
    let id_despacho = dataRecord.intIdDesp;
    let intIdGuia = dataRecord.intIdGuia;
    var fecha_inicio_anular = $('#fech_inic_guia').val();
    var fecha_final_anular = $('#fech_fin_guia').val();
    var estado_preg = $('#estados_ot_guia').val();

    //console.log(ot_proyecto, codigo_producto, id_despacho, intIdGuia, fecha_inicio_anular, fecha_final_anular);

    if (dataRecord.varEsta === "ANULADO") {
        mensaje(false, "LA GUIA DE REMISION ESTA ANULADA", "no");
    } else if (dataRecord.varEsta === "SIN IMPRESION") {
        mensaje(false, "NO SE PUEDE ANULAR PORQUE ESTA SIN IMPRESION", "no");
    } else {
        combo_motivo_anular();
        $("#preg_ot").val(ot_proyecto);
        $("#preg_documento_guia").val(dataRecord.varContaDocu);
        $("#preg_prod_codi").val(codigo_producto);
        $("#preg_iddespacho").val(id_despacho);
        $("#preg_idguia").val(intIdGuia);
        $("#preg_fech_inicio").val(fecha_inicio_anular);
        $("#preg_fech_final").val(fecha_final_anular);
        $("#preg_estado").val(estado_preg);
        $("#modal-guia-pregunta").modal('show');


    }


}
//anular guia 
$("#anular_preguntar_guia_si").click(function () {
  
    let ot_preg = $("#preg_ot").val();
    let prod_codi_preg = $("#preg_prod_codi").val();
    let preg_iddespa = $("#preg_iddespacho").val();
    let idguia_preg = $("#preg_idguia").val();
    let fech_inicio_preg = $("#preg_fech_inicio").val();
    let fech_final_preg = $("#preg_fech_final").val();
    let estado_pregu = $("#preg_estado").val();
    let motivo_anular = $("#motivo_anular_guia").val();
    let usuario_anular = obtener_user();
    
    if (motivo_anular === "") {
        mensaje(false, "INGRESE EL MOTIVO", "no");
    } else {
          $("#modal-cargar-guia").modal('show');
        $.ajax({
            type: 'POST',
            url: url + '/GestionProyectos/public/index.php/anular_guias',
            dataType: 'json',
            data: {
                intIdGuia: parseInt(idguia_preg),
                intIdDesp: parseInt(preg_iddespa),
                intIdProy: parseInt(ot_preg),
                intIdTipoProducto: parseInt(prod_codi_preg),
                intIdMotiAnul:parseInt(motivo_anular),
                usua_anul:usuario_anular,
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    window.setTimeout(function () {

                        $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                    }, 1000);

                }
            },
            success: function (responses) {
                if (responses.data == "") {
                    $("#modal-guia-pregunta").modal('hide');
                    mensaje(true, "ELIMINADO CON EXITO", "no");
                    window.setTimeout(function () {

                        $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                    }, 1000);
                  $("#motivo_anular_guia").jqxDropDownList('selectIndex', -1);
                    // console.log(ot_proyecto,codigo_producto);
                    //  console.log(ot_preg, prod_codi_preg, fech_inicio_preg, fech_final_preg, estado_pregu);
                    grilla_listar_guia(ot_preg, prod_codi_preg, fech_inicio_preg, fech_final_preg, estado_pregu);
                } else {
                    mensaje(false, responses.data, "no");
                }

            }
        });

    }

});


$("#close_btn_pregunta").click(function (){
   
    $("#motivo_anular_guia").jqxDropDownList('selectIndex', -1);
});
//generar guia
$("#pdf_lista_guia").click(function () {


    checkedItems_Guia_emitida = "";
    checkedItems_Guia_recibida = "";
    checkedItems_docu = "";
    var textData_guia = "";
    var rowindex_guia = "";

    rowindex_guia = $("#grid_guia").jqxGrid("getselectedrowindexes");


    if (rowindex_guia == "" || rowindex_guia == null) {
        mensaje(false, "Debe seleccionar algunas GUIAS", "no");
        $("#grid_guia").jqxGrid('clearSelection');
    } else {
        for (var i = 0; i < rowindex_guia.length; i++) {
            textData_guia = $('#grid_guia').jqxGrid('getrowdata', rowindex_guia[i]);

            // console.log(textData_guia);
            checkedItems_Guia_emitida += textData_guia['varArchEmit'] + ",";
            checkedItems_Guia_recibida += textData_guia['varArchRecep'] + ",";
            checkedItems_docu += textData_guia['varContaDocu'] + ",";
        }
//        console.log(checkedItems_Guia_emitida);
//        console.log(checkedItems_Guia_recibida);
//        console.log(checkedItems_docu);

        $("#check_id_guia_emitida").val(checkedItems_Guia_emitida);
        $("#check_id_guia_recibida").val(checkedItems_Guia_recibida);
        $("#check_id_documento").val(checkedItems_docu);
        $("#modal-guia-opciones").modal('show');


    }
});


//BOTON DE GUIA EMITIDA

$("#opciones_guia_emitida").click(function () {
    let obte_id_guia_emit = $("#check_id_guia_emitida").val();
    let obte_id_documen = $("#check_id_documento").val();

    visu_guia_emit(obte_id_guia_emit, obte_id_documen);
});

function visu_guia_emit(obte_id_guia_emit2, obte_id_documen2) {
    $("#modal-cargar-guia").modal('show');


    let user = obtener_user();
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'POST',
        url: 'pdf_guia_emitida',
        dataType: 'json',
        data: {
            idguia_emitida: obte_id_guia_emit2,
            obte_documen: obte_id_documen2,
            usuarios: user,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            // console.log(responses);

            window.setTimeout(function () {

                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 

            }, 1000);



            if (responses.mensaje === "") {
                //console.log($("#url_guia").val());
                $("#modal-guia-opciones").modal('hide');
                //$("#url_guia").attr('src', url + '/Documentos/GuiasRemision/Globales/' + responses.user + '.pdf');
                $("#link_guia").attr('target', '_blank').attr('href', url + '/Documentos/GuiasRemision/Globales/' + responses.user + '.pdf');
                $("#modal-guia-pdf").modal('show');
            }


        }
    });
}

$("#cerrar_modal_guia_pdf").click(function () {

    $("#modal-guia-pdf").modal('hide');
    $("#grid_guia").jqxGrid('clearSelection');
    $("#pdf").val("");
    $("#url_guia").attr('src', '');
    $("#url_guia").val('');

    $("#link_guia").attr('target', '_blank').attr('href', '');

});


// BOTON DE GUIA RECEPCIONADA opciones_guia_recibida

$("#opciones_guia_recibida").click(function () {
    let obte_id_guia_recp = $("#check_id_guia_recibida").val();
    let obte_id_documen_recp = $("#check_id_documento").val();
    //console.log(obte_id_guia_recp, obte_id_documen_recp);
    visu_guia_recep(obte_id_guia_recp, obte_id_documen_recp);
});

function visu_guia_recep(obte_id_guia_recp2, obte_id_documen_recp2) {
    $("#modal-cargar-guia").modal('show');

    let user_recp = obtener_user();
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        type: 'POST',
        url: 'pdf_guia_recepcionada',
        dataType: 'json',
        data: {
            idguia_recep: obte_id_guia_recp2,
            obte_documen_recep: obte_id_documen_recp2,
            usuarios_recep: user_recp,

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            // console.log(responses);

            window.setTimeout(function () {

                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 

            }, 1000);



            if (responses.mensaje === "") {
                //console.log($("#url_guia").val());
                $("#modal-guia-opciones").modal('hide');
                //$("#url_guia").attr('src', url + '/Documentos/GuiasRemision/Globales/' + responses.user + '.pdf');
                $("#link_guia").attr('target', '_blank').attr('href', url + '/Documentos/GuiasRemision/Globales/' + responses.user + '.pdf');
                $("#modal-guia-pdf").modal('show');
            }


        }
    });


}




// INFORMACION DE LA GRILLA 

/*
 function most_info_serie(idguiaserie) {
 console.log(idguiaserie);
 $.ajax({
 type: 'POST',
 url: url + '/GestionProyectos/public/index.php/list_serie_list_guia',
 dataType: 'json',
 data: {
 intIdGuia: parseInt(idguiaserie),
 
 },
 error: function (xhr, ajaxOptions, thrownError) {
 if (thrownError == "Internal Server Error") {
 
 }
 },
 success: function (responses) {
 if (responses.data.length > 0) {
 $("#modal-info-guia").modal('show');
 var source =
 {
 localdata: responses.data,
 datatype: "array",
 datafields: [
 {name: 'intSerie', type: 'number'},
 {name: 'varCodiElemento', type: 'number'},
 {name: 'varDescripcion', type: 'string'},
 {name: 'varDescripTarea', type: 'string'},
 {name: 'varDescrip', type: 'string'},
 {name: 'deciPesoNeto', type: 'float'},
 {name: 'deciPesoBruto', type: 'float'},
 {name: 'deciArea', type: 'float'}
 ],
 async: false
 };
 //grid_info_guia
 dataAdapter = new $.jqx.dataAdapter(source);
 
 $("#grid_info_guia").jqxGrid('clear');
 
 
 var editrow = -1;
 $("#grid_info_guia").jqxGrid({
 width: '100%',
 height: '300',
 showfilterrow: true,
 source: dataAdapter,
 filterable: true,
 columnsresize: true,
 altrows: true,
 enabletooltips: true,
 sortable: true,
 selectionmode: 'multiplecellsextended',
 theme: 'darkblue',
 showstatusbar: true,
 statusbarheight: 25,
 showaggregates: true,
 showgroupaggregates: true,
 columns: [
 {text: 'Serie', datafield: 'intSerie', width: 50, aggregates: [{
 '<b>#</b>':
 function (aggregatedValue, currentValue, column, record) {
 var count = $("#grid_info_guia").jqxGrid('getrows');
 return count.length;
 }
 }]},
 {text: 'Codigo', datafield: 'varCodiElemento', width: 120},
 {text: 'Descripcion', datafield: 'varDescripcion', width: 110},
 {text: 'Tarea', datafield: 'varDescripTarea', width: 120},
 {text: 'Zona', datafield: 'varDescrip', width: 120},
 {text: 'Peso Neto', datafield: 'deciPesoNeto', width: 120, aggregates: [{
 '<b>#</b>':
 function (aggregatedValue, currentValue, column, record) {
 
 var total = parseFloat(record['deciPesoNeto']);
 //return final;
 return aggregatedValue + total;
 },
 }]},
 {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: 120, aggregates: [{
 '<b>#</b>':
 function (aggregatedValue, currentValue, column, record) {
 
 var total = parseFloat(record['deciPesoBruto']);
 //return final;
 return aggregatedValue + total;
 },
 }]},
 
 {text: 'Area', datafield: 'deciArea', width: 120, aggregates: [{
 '<b>#</b>':
 function (aggregatedValue, currentValue, column, record) {
 
 var total = parseFloat(record['deciArea']);
 //return final;
 return aggregatedValue + total;
 },
 }]},
 ]
 });
 $("#grid_info_guia").jqxGrid('localizestrings', localizationobj);
 
 
 
 } else {
 mensaje(false, "NO HAY DATOS QUE MOSTRAR", "no");
 }
 
 }
 });
 }
 */
function most_info_guia(idguiacantidad, tipoguia, estadoguia) {
    //  console.log(idguiacantidad, tipoguia, estadoguia);
    if (estadoguia == "ANULADO") {
        mensaje(false, "LA GUIA DE REMISION ESTA ANULADA", "no");
    } else {
        if (tipoguia === "CANTIDAD") {
            $.ajax({
                type: 'POST',
                url: url + '/GestionProyectos/public/index.php/list_cantidad_list_guia',
                dataType: 'json',
                data: {
                    intIdGuia: parseInt(idguiacantidad),
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError == "Internal Server Error") {
                    }
                },
                success: function (responses) {
                    //  console.log(responses.data);
                    if (responses.data.length > 0) {
                        $("#modal-info-guia").modal('show');
                        var source =
                                {
                                    localdata: responses.data,
                                    datatype: "array",
                                    datafields: [
                                        {name: 'cant', type: 'number'},
                                        {name: 'varCodiElemento', type: 'string'},
                                        {name: 'varDescripcion', type: 'string'},
                                        {name: 'varDescripTarea', type: 'string'},
                                        {name: 'varDescrip', type: 'string'},
                                        {name: 'deciPesoNeto', type: 'string'},
                                        {name: 'deciPesoBruto', type: 'string'},
                                        {name: 'deciArea', type: 'string'}
                                    ],
                                    async: false
                                };
                        //grid_info_guia
                        dataAdapter = new $.jqx.dataAdapter(source);

                        $("#grid_info_guia").jqxGrid('clear');


                        var editrow = -1;
                        $("#grid_info_guia").jqxGrid({
                            width: '100%',
                            height: '300',
                            showfilterrow: true,
                            source: dataAdapter,
                            filterable: true,
                            columnsresize: true,
                            altrows: true,
                            enabletooltips: true,
                            sortable: true,
                            selectionmode: 'multiplecellsextended',
                            theme: 'darkblue',
                            showstatusbar: true,
                            statusbarheight: 25,
                            showaggregates: true,
                            showgroupaggregates: true,
                            columns: [
                                {text: 'Cantidad', datafield: 'cant', width: 50, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {

                                                        var total = parseInt(record['cant']);
                                                        //return final;
                                                        return aggregatedValue + total;
                                                    },
                                        }]},
                                {text: 'Codigo', datafield: 'varCodiElemento', width: 110, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {
                                                        var count = $("#grid_info_guia").jqxGrid('getrows');
                                                        return count.length;
                                                    }
                                        }]},
                                {text: 'Descripcion', datafield: 'varDescripcion', width: 200},
                                {text: 'Tarea', datafield: 'varDescripTarea', width: 100},
                                {text: 'Zona', datafield: 'varDescrip', width: 100},
                                {text: 'Peso Neto', datafield: 'deciPesoNeto', width: 120, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {

                                                        var total = parseFloat(record['deciPesoNeto']).toFixed(3) * parseInt(record['cant']);
                                                        //return final;
                                                        return aggregatedValue + total;
                                                    },
                                        }]},
                                {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: 120, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {

                                                        var total = parseFloat(record['deciPesoBruto']).toFixed(3) * parseInt(record['cant']);
                                                        //return final;
                                                        return aggregatedValue + total;
                                                    },
                                        }]},

                                {text: 'Area', datafield: 'deciArea', width: 120, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {

                                                        var total = parseFloat(record['deciArea']).toFixed(3) * parseInt(record['cant']);
                                                        //return final;
                                                        return aggregatedValue + total;
                                                    },
                                        }]},
                            ]
                        });
                        $("#grid_info_guia").jqxGrid('localizestrings', localizationobj);


                    } else {
                        mensaje(false, "NO HAY DATOS QUE MOSTRAR", "no");
                    }
                }
            });
        } else if (tipoguia === "SERIE") {
            $.ajax({
                type: 'POST',
                url: url + '/GestionProyectos/public/index.php/list_serie_list_guia',
                dataType: 'json',
                data: {
                    intIdGuia: parseInt(idguiacantidad),

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (thrownError == "Internal Server Error") {

                    }
                },
                success: function (responses) {
                    //console.log(responses.data);
                    if (responses.data.length > 0) {
                        $("#modal-info-guia").modal('show');
                        var source =
                                {
                                    localdata: responses.data,
                                    datatype: "array",
                                    datafields: [
                                        {name: 'intSerie', type: 'number'},
                                        {name: 'varCodiElemento', type: 'number'},
                                        {name: 'varDescripcion', type: 'string'},
                                        {name: 'varDescripTarea', type: 'string'},
                                        {name: 'varDescrip', type: 'string'},
                                        {name: 'deciPesoNeto', type: 'string'},
                                        {name: 'deciPesoBruto', type: 'string'},
                                        {name: 'deciArea', type: 'string'}
                                    ],
                                    async: false
                                };
                        //grid_info_guia
                        dataAdapter = new $.jqx.dataAdapter(source);

                        $("#grid_info_guia").jqxGrid('clear');


                        var editrow = -1;
                        $("#grid_info_guia").jqxGrid({
                            width: '100%',
                            height: '300',
                            showfilterrow: true,
                            source: dataAdapter,
                            filterable: true,
                            columnsresize: true,
                            altrows: true,
                            enabletooltips: true,
                            sortable: true,
                            selectionmode: 'multiplecellsextended',
                            theme: 'darkblue',
                            showstatusbar: true,
                            statusbarheight: 25,
                            showaggregates: true,
                            showgroupaggregates: true,
                            columns: [
                                {text: 'Serie', datafield: 'intSerie', width: 50, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {
                                                        var count = $("#grid_info_guia").jqxGrid('getrows');
                                                        return count.length;
                                                    }
                                        }]},
                                {text: 'Codigo', datafield: 'varCodiElemento', width: 120},
                                {text: 'Descripcion', datafield: 'varDescripcion', width: 110},
                                {text: 'Tarea', datafield: 'varDescripTarea', width: 120},
                                {text: 'Zona', datafield: 'varDescrip', width: 120},
                                {text: 'Peso Neto', datafield: 'deciPesoNeto', width: 120, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {
                                                        var total = 0;

                                                        total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                        total = parseFloat(total).toFixed(3);
                                                        return total;


                                                    },
                                        }]},
                                {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: 120, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {

                                                        var total = 0;
                                                        total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                        total = parseFloat(total).toFixed(3);
                                                        return total;
                                                    },
                                        }]},

                                {text: 'Area', datafield: 'deciArea', width: 120, aggregates: [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record) {

                                                        var total = 0;
                                                        total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                        total = parseFloat(total).toFixed(3);
                                                        return total;
                                                    },
                                        }]},
                            ]
                        });
                        $("#grid_info_guia").jqxGrid('localizestrings', localizationobj);



                    } else {
                        mensaje(false, "NO HAY DATOS QUE MOSTRAR", "no");
                    }

                }
            });
        }
    }

    /* 
     */
}

//borrar 
$("#btn_cerrar_info_guia").click(function () {
    $("#grid_info_guia").jqxGrid('clear');
});


// edita la guia

function editar_guia(idGuia_edit) {
    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', idGuia_edit);
    if (dataRecord.varEsta === "ANULADO") {
        mensaje(false, "LA GUIA DE REMISION ESTA ANULADA", "no");
    } else if (dataRecord.varEsta === "IMPRESO") {
        mensaje(false, "NO SE PUEDE EDITAR YA QUE LA GUIA DE REMISION YA ESTA GENERADA", "no");
    } else {
        transportista();
        combo_motivo();
        visualizar_dato_edit(dataRecord.intIdGuia);

    }
}
//EDITAR GUIA

function combo_motivo() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_motivo_id',
        dataType: 'json',
        data: {
            intIdTipoMoti: 4
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdMoti'},
                            {name: 'varDescripcion'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#motivo_edit_guia").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdMoti", width: 200, height: 30, });
            //Focus the jqxDropDownList
            $("#motivo_edit_guia").jqxDropDownList('focus');


        }
    });
}
$("#motivo_edit_guia").on('change', function (event) {
    cod_motivo_edit = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            cod_motivo_edit = item.value;
            if (item.label === "OTROS") {
                document.getElementById('otros_input_edit_guia').disabled = false;
            } else {
                document.getElementById('otros_input_edit_guia').disabled = true;
                $("#otros_input_edit_guia").val('');
            }
        }
    }
});


//VISUALIZAR MODAL 
function combo_motivo_visual() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_motivo_id',
        dataType: 'json',
        data: {
            intIdTipoMoti: 4
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdMoti'},
                            {name: 'varDescripcion'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#motivo_visual").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdMoti", width: 200, height: 30, });
            //Focus the jqxDropDownList
            $("#motivo_visual").jqxDropDownList('focus');
            $("#motivo_visual").jqxDropDownList({disabled: true});

        }
    });
}



function transportista() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tran',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            transportista_guia_array = [];
            if (responses.data.length > 0) {
                for (var i = 0; responses.data.length > i; i++) {
                    var row = {'intIdTrans': responses.data[i].intIdTrans, 'varNumeIden': responses.data[i].varNumeIden};
                    transportista_guia_array.push(row);
                }
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdTrans'},
                                {name: 'varRazonSoci'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#transportista_guia_edit").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varRazonSoci", valueMember: "intIdTrans", width: 200, height: 30, });
                //Focus the jqxDropDownList
                $("#transportista_guia_edit").jqxDropDownList('selectIndex', 0);
                $("#transportista_guia_edit").jqxDropDownList('focus');
            } else {
                $("#transportista_guia_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varRazonSoci", valueMember: "intIdTrans", width: 200, height: 30, });
            }

        }
    });
}


//VISUALIZAR 
function transportista_visual() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tran',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            transportista_guia_array_visual = [];
            if (responses.data.length > 0) {
                for (var i = 0; responses.data.length > i; i++) {
                    var row = {'intIdTrans': responses.data[i].intIdTrans, 'varNumeIden': responses.data[i].varNumeIden};
                    transportista_guia_array_visual.push(row);
                }
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdTrans'},
                                {name: 'varRazonSoci'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#transportista_guia_visual").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varRazonSoci", valueMember: "intIdTrans", width: 200, height: 30, });
                //Focus the jqxDropDownList
                $("#transportista_guia_visual").jqxDropDownList('selectIndex', 0);
                $("#transportista_guia_visual").jqxDropDownList('focus');

                $("#transportista_guia_visual").jqxDropDownList({disabled: true});
            } else {
                $("#transportista_guia_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varRazonSoci", valueMember: "intIdTrans", width: 200, height: 30, });
            }

        }
    });
}

$("#transportista_guia_edit").on('change', function (event) {
    codtransportista_guia_edit = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codtransportista_guia_edit = item.value;
            // console.log(codtransportista_guia_edit);
            ruc_transportista(codtransportista_guia_edit);
        }
    }
});

//VISUALIZAR
$("#transportista_guia_visual").on('change', function (event) {
    codtransportista_guia_visual = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codtransportista_guia_visual = item.value;
            // console.log(codtransportista_guia_edit);
            ruc_transportista_visual(codtransportista_guia_visual);
        }
    }
});


//VISUALIZAR 
function ruc_transportista_visual(cod) {
    for (var i = 0; transportista_guia_array_visual.length > i; i++) {
        if (transportista_guia_array_visual[i].intIdTrans === parseInt(cod)) {
            $("#ruc_transportista_visual").val(transportista_guia_array_visual[i].varNumeIden);
        }
    }
}


function ruc_transportista(cod) {
    for (var i = 0; transportista_guia_array.length > i; i++) {
        if (transportista_guia_array[i].intIdTrans === parseInt(cod)) {
            $("#ruc_transportista_edit").val(transportista_guia_array[i].varNumeIden);
        }
    }
}


function listar_departamento() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_departamento',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                $("#provincia_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#distrito_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlDepa'},
                                {name: 'varNombDepa'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#departamento_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombDepa", valueMember: "varIdSqlDepa", width: 200, height: 30, });
                $("#departamento_llegada_edit").jqxDropDownList('focus');



            } else {

                $("#departamento_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDepa", valueMember: "varIdSqlDepa", width: 200, height: 30});
                $("#provincia_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#distrito_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});


            }
        }
    });
}


//VISUALIZAR 
function listar_departamento_visual() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_departamento',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                $("#provincia_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#distrito_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlDepa'},
                                {name: 'varNombDepa'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#departamento_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombDepa", valueMember: "varIdSqlDepa", width: 200, height: 30, });
                $("#departamento_llegada_visual").jqxDropDownList('focus');
                $("#departamento_llegada_visual").jqxDropDownList({disabled: true});


            } else {

                $("#departamento_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDepa", valueMember: "varIdSqlDepa", width: 200, height: 30});
                $("#provincia_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#distrito_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});


            }
        }
    });
}
//VISUAL
$("#departamento_llegada_visual").on('change', function (event) {
    coddepartamento_llegada_visual = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            coddepartamento_llegada_visual = item.value;
            //console.log(coddepartamento_llegada_edit);
            provincia_visual(coddepartamento_llegada_visual);
        }
    }
});



$("#departamento_llegada_edit").on('change', function (event) {
    coddepartamento_llegada_edit = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            coddepartamento_llegada_edit = item.value;
            //console.log(coddepartamento_llegada_edit);
            provincia(coddepartamento_llegada_edit);
        }
    }
});





function provincia(cod) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_provincia',
        dataType: 'json',
        data: {varIdSqlDepa: cod},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
                $("#distrito_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlProv'},
                                {name: 'varNombProv'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#provincia_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#provincia_llegada_edit").jqxDropDownList('focus');
                $("#provincia_llegada_edit").val(coddepartamento_sql_edit);



            } else {
                $("#distrito_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                $("#provincia_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});


            }
        }
    });
}

//VISUALIZAR 
function provincia_visual(cod) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_provincia',
        dataType: 'json',
        data: {varIdSqlDepa: cod},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {
                $("#distrito_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlProv'},
                                {name: 'varNombProv'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#provincia_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});
                $("#provincia_llegada_visual").jqxDropDownList('focus');
                $("#provincia_llegada_visual").val(coddepartamento_sql_visual);
                $("#provincia_llegada_visual").jqxDropDownList({disabled: true});


            } else {
                $("#distrito_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                $("#provincia_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombProv", valueMember: "varIdSqlProv", width: 200, height: 30});


            }
        }
    });
}


//VISUALIZAR
$("#provincia_llegada_visual").on('change', function (event) {
    provincia_guia_visual = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            provincia_guia_visual = item.value;
            distrito_visual(coddepartamento_llegada_visual, provincia_guia_visual);
        }
    }
});


$("#provincia_llegada_edit").on('change', function (event) {
    provincia_guia_edit = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            provincia_guia_edit = item.value;
            distrito(coddepartamento_llegada_edit, provincia_guia_edit);
        }
    }
});


//VISUALIZAR 
function distrito_visual(codde, codpro) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_distrito',
        dataType: 'json',
        data: {varIdSqlProv: codpro, varIdSqlDepa: codde},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {

                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlDist'},
                                {name: 'varNombDist'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#distrito_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                $("#distrito_llegada_visual").jqxDropDownList('focus');
                $("#distrito_llegada_visual").val(coddistrito_sql_visual);
                $("#distrito_llegada_visual").jqxDropDownList({disabled: true});

            } else {

                $("#distrito_llegada_visual").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});



            }
        }
    });
}



function distrito(codde, codpro) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_distrito',
        dataType: 'json',
        data: {varIdSqlProv: codpro, varIdSqlDepa: codde},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {

                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varIdSqlDist'},
                                {name: 'varNombDist'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#distrito_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});
                $("#distrito_llegada_edit").jqxDropDownList('focus');
                $("#distrito_llegada_edit").val(coddistrito_sql);



            } else {

                $("#distrito_llegada_edit").jqxDropDownList({placeHolder: "Seleccione", displayMember: "varNombDist", valueMember: "varIdSqlDist", width: 200, height: 30});



            }
        }
    });
}


//VISUALIZAR 
$("#distrito_llegada_visual").on('change', function (event) {
    distrito_partida_visual = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            distrito_partida_visual = item.value;
        }
    }
});




$("#distrito_llegada_edit").on('change', function (event) {
    distrito_partida_edit = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            distrito_partida_edit = item.value;
        }
    }
});


function visualizar_dato_edit(idguia_edit) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/obtn_info_idGuia',
        dataType: 'json',
        data: {
            intIdGuia: parseInt(idguia_edit),

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            //console.log(responses);
            $("#documento_idGuia").val(responses.data.intIdGuia);
            $("#documento_edit").val(responses.data.varContaDocu);
            $("#fech_emision_edit_guia").val(responses.data.dateFechEmis);
            $("#fech_fin_edit_guia").val(responses.data.dateFechTras);
            $("#tipo_reporte_edit_guia").val(responses.data.varTipoGuia);
            $("#motivo_edit_guia").val(responses.data.intIdMoti);
            $("#otros_input_edit_guia").val(responses.data.varMotiCome);
            $("#codigo_referencia_guia_edit").val(responses.data.varRefe);
            $("#id_despacho_guia_edit").val(responses.data.intIdDesp);
            $("#id_ot_guia_edit").val(responses.data.Proyecto);
            $("#id_tipoelem_guia_edit").val(responses.data.varDescTipoProd);
            $("#id_ruc_guia_edit").val(responses.data.varRucClie);
            $("#id_raz_guia_edit").val(responses.data.varRazClie);
            $("#departamento_part_guia_edit").val(responses.data.varNombDepa);
            $("#provincia_part_guia_edit").val(responses.data.varNombProv);
            $("#distrito_part_guia_edit").val(responses.data.varNombDist);
            $("#punto_partida_guia_edit").val(responses.data.varPuntSali);

            $("#punto_llegada_guia_edit").val(responses.data.varPuntLleg);
            $("#transportista_guia_edit").val(responses.data.intIdTrans);

            $("#chofer_guia_edit").val(responses.data.varNombChof);
            $("#ruc_chofer_guia_edit").val(responses.data.varNumeChof);
            $("#licencia_guia_edit").val(responses.data.varNumeLicen);
            $("#placa_guia_edit").val(responses.data.varPlaca);
            $("#departamento_llegada_edit").val(responses.data.varIdDepa);
            coddepartamento_sql_edit = responses.data.varIdProvincia;
            coddistrito_sql = responses.data.varIdDistrito;

            $("#modal-guia-edit").modal('show');
        }
    });


}


$("#btn_actualizar_guia_edit").click(function () {
    var idguia_edit = $("#documento_idGuia").val();

    var documento_edit = $("#documento_edit").val();
    var fecha_translado_edit = $("#fech_fin_edit_guia").val();
    var idmotivo_edit = $("#motivo_edit_guia").val();
    var otroinput_edit = $("#otros_input_edit_guia").val();
    var refe_edit = $("#codigo_referencia_guia_edit").val();
    var departament_llegada = $("#departamento_llegada_edit").val();
    var provincia_llegada = $("#provincia_llegada_edit").val();
    var distrito_llegada = $("#distrito_llegada_edit").val();
    var punto_llegada = $("#punto_llegada_guia_edit").val();
    var idtrans_edit = $("#transportista_guia_edit").val();
    var ruc_trans_edit = $("#ruc_transportista_edit").val();
    var chofer_guia_edit = $("#chofer_guia_edit").val();
    var ruc_chofer_edit = $("#ruc_chofer_guia_edit").val();
    var lice_guia_edit = $("#licencia_guia_edit").val();
    var placa_edit = $("#placa_guia_edit").val();


    if (idmotivo_edit == "13" && otroinput_edit == "") {
        mensaje(false, "INGRESE EL MOTIVO", "no");
    } else {
        if (fecha_translado_edit == "") {
            mensaje(false, "INGRESE LA FECHA DE TRASLADO", "no");
        } else {

            if (departament_llegada == "") {
                mensaje(false, "INGRESE EL DEPARTAMENTO", "no");
            } else {
                if (provincia_llegada == "") {
                    mensaje(false, "INGRESE EL PROVINCIA", "no");
                } else {
                    if (distrito_llegada == "") {
                        mensaje(false, "INGRESE EL DISTRINCIO", "no");
                    } else {
                        if (punto_llegada == "") {
                            mensaje(false, "INGRESE LA LLEGADA", "no");
                        } else {
                            if (ruc_trans_edit == "") {
                                mensaje(false, "INGRESE EL RUC DEL TRANSPORTISTA", "no");
                            } else {
                                if (chofer_guia_edit == "") {
                                    mensaje(false, "INGRESE EL CHOFER", "no");
                                } else {
                                    if (ruc_chofer_edit == "") {
                                        mensaje(false, "INGRESE EL RUC DEL CHOFER", "no");
                                    } else {
                                        if (lice_guia_edit == "") {
                                            mensaje(false, "INGRESE LA LICENCIA", "no");
                                        } else {
                                            if (placa_edit == "") {
                                                mensaje(false, "INGRESE LA PLACA", "no");
                                            } else {
                                                guardar_edit(idguia_edit, documento_edit, fecha_translado_edit, idmotivo_edit, otroinput_edit, refe_edit, departament_llegada, provincia_llegada,
                                                        distrito_llegada, punto_llegada, idtrans_edit, ruc_trans_edit, chofer_guia_edit, ruc_chofer_edit, lice_guia_edit, placa_edit);
//                                                    console.log(idguia_edit, documento_edit, fecha_translado_edit, idmotivo_edit, otroinput_edit, refe_edit, departament_llegada, provincia_llegada,
//                                                            distrito_llegada, punto_llegada, idtrans_edit, ruc_trans_edit, chofer_guia_edit, ruc_chofer_edit, lice_guia_edit, placa_edit);
                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                }

            }



        }

    }

});

function guardar_edit(idguia_edit2, documento_edit2, fecha_translado_edit2, idmotivo_edit2, otroinput_edit2, refe_edit2, departament_llegada2, provincia_llegada2,
        distrito_llegada2, punto_llegada2, idtrans_edit2, ruc_trans_edit2, chofer_guia_edit2, ruc_chofer_edit2, lice_guia_edit2, placa_edit2) {
    let user = obtener_user();
    //console.log(departament_llegada2, provincia_llegada2, distrito_llegada2)
//  console.log(idguia_edit2, documento_edit2, fecha_translado_edit2, idmotivo_edit2, otroinput_edit2, refe_edit2, departament_llegada2, provincia_llegada2,
//          distrito_llegada2, punto_llegada2, idtrans_edit2, ruc_trans_edit2, chofer_guia_edit2, ruc_chofer_edit2, lice_guia_edit2, placa_edit2);
    $("#modal-cargar-guia").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/editar_idguia',
        dataType: 'json',
        data: {
            intIdGuia: parseInt(idguia_edit2),
            dateFechTras: fecha_translado_edit2,
            intIdMoti: parseInt(idmotivo_edit2),
            varMotiCome: otroinput_edit2,
            varRefe: refe_edit2,
            varIdDistrito: distrito_llegada2,
            varIdProvincia: provincia_llegada2,
            varIdDepa: departament_llegada2,
            varPuntLleg: punto_llegada2,
            intIdTrans: idtrans_edit2,
            varNombChof: chofer_guia_edit2,
            varNumeChof: ruc_chofer_edit2,
            varNumeLicen: lice_guia_edit2,
            varPlaca: placa_edit2,
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                window.setTimeout(function () {

                    $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
                }, 1000);

            }
        },
        success: function (responses) {
            window.setTimeout(function () {

                $("#modal-cargar-guia").modal('hide'); // COLOCO ANDY 
            }, 1000);
            if (responses.data.mensaje === "") {
                $("#modal-guia-edit").modal('hide');
                mensaje(true, "GUARDADO CON EXITO", "no");
                $("#grid_guia").jqxGrid('clear');

            } else {
                mensaje(false, responses.data.mensaje, "no");
            }

        }
    });

}


$("#cerrar_modal_edit").click(function () {
    $("#documento_edit").val('');
    $("#fech_fin_edit_guia").val('');
    $("#motivo_edit_guia").val('');
    $("#otros_input_edit_guia").val('');
    $("#codigo_referencia_guia_edit").val('');
    $("#departamento_llegada_edit").val('');
    $("#provincia_llegada_edit").val('');
    $("#distrito_llegada_edit").val('');
    $("#punto_llegada_guia_edit").val('');
    $("#transportista_guia_edit").val('');
    $("#ruc_transportista_edit").val('');
    $("#chofer_guia_edit").val('');
    $("#ruc_chofer_guia_edit").val('');
    $("#licencia_guia_edit").val('');
    $("#placa_guia_edit").val('');
    $("#modal-guia-edit").modal('hide');

});


function eyes_guia(idgua_eyes) {
    var dataRecord = $("#grid_guia").jqxGrid('getrowdata', idgua_eyes);
    console.log(dataRecord.varEsta);
    if (dataRecord.varEsta === "IMPRESO") {
        transportista_visual();
        combo_motivo_visual();
        visualizar_dato(dataRecord.intIdGuia);
    } else {
        mensaje(false, "NO PUEDE VISUALIZAR", "no");
    }


}
function visualizar_dato(idguia_visual) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/obtn_info_idGuia',
        dataType: 'json',
        data: {
            intIdGuia: parseInt(idguia_visual),

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            //console.log(responses);
            $("#documento_idGuia_visual").val(responses.data.intIdGuia);
            $("#documento_visual").val(responses.data.varContaDocu);
            $("#fech_emision_visual").val(responses.data.dateFechEmis);
            $("#fech_fin_visual").val(responses.data.dateFechTras);
            $("#tipo_reporte_visual").val(responses.data.varTipoGuia);
            $("#motivo_visual").val(responses.data.intIdMoti);
            $("#otros_input_visual").val(responses.data.varMotiCome);
            $("#codigo_referencia_visual").val(responses.data.varRefe);
            $("#id_despacho_visual").val(responses.data.intIdDesp);
            $("#id_ot_guia_visual").val(responses.data.Proyecto);
            $("#id_tipoelem_guia_visual").val(responses.data.varDescTipoProd);
            $("#id_ruc_guia_visual").val(responses.data.varRucClie);
            $("#id_raz_guia_visual").val(responses.data.varRazClie);
            $("#departamento_part_guia_visual").val(responses.data.varNombDepa);
            $("#provincia_part_guia_visual").val(responses.data.varNombProv);
            $("#distrito_part_guia_visual").val(responses.data.varNombDist);
            $("#punto_partida_guia_visual").val(responses.data.varPuntSali);

            $("#punto_llegada_guia_visual").val(responses.data.varPuntLleg);
            $("#transportista_guia_visual").val(responses.data.intIdTrans);

            $("#chofer_guia_visual").val(responses.data.varNombChof);
            $("#ruc_chofer_guia_visual").val(responses.data.varNumeChof);
            $("#licencia_guia_visual").val(responses.data.varNumeLicen);
            $("#placa_guia_visual").val(responses.data.varPlaca);
            $("#departamento_llegada_visual").val(responses.data.varIdDepa);
            coddepartamento_sql_visual = responses.data.varIdProvincia;
            coddistrito_sql_visual = responses.data.varIdDistrito;

            $("#modal-guia-ver").modal('show');
        }
    });



}


$("#cerrar_ver_guia").click(() => $("#modal-guia-ver").modal('hide'));


//