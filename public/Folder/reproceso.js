var codigoproducto = "";
var codigoot_label = "";
var codigoproducto_label = "";
var codigoot = "";
var check_items_zona = [];
var check_zona = "";
var check_programa = "";
var descrip_origen_reproceso = "";
var descrip_destino_reproceso = "";
var codigo_reproceso_reproceso = "";
var fech_inicio_reproceso = "";
var fech_fin_reprocesos = "";
var rango_fechas = 0;
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var day_next = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia = moment(firstDay).format('YYYY-MM-DD');
$('#fech_inic_reproceso').val(primerdia);
$('#fech_fin_reproceso').val(today);
/*ULTIMO DIA DEL MES ***
 var today_2 = new Date();
 var lastDayOfMonth = new Date(today_2.getFullYear(), today_2.getMonth()+1, 0);
 var asd = moment(lastDayOfMonth).format('DD/MM/YYYY');
 console.log(moment(lastDayOfMonth).format('DD/MM/YYYY'));
 */
//REGISTRAR NUEVO 
var codigoot_modal_nuevo = "";
var codigoproducto_modal_nuevo = "";
//var check_items_zona_modal_nuevo = [];
var check_zona_modal_nuevo = "";
var check_programa_modal_nuevo = "";
var rango_fechas_modal_nuevo = 0;
var checkedItems_idelemento = "";

//ruta id
var desc_ruta_nuevo = "";
var orig_repro_nuevo = "";
var descrip_origen = "";
var valor_origen = "";

//obtener el id del reproceso  
var idnum_Doc_doubleclick = "";

// check para anular 
var check_anular = "";
var checkedItems_idelemento_anular = "";

function validar2() {
    listar_data_list_proyectos();
    combo_producto_repro();



}

$("#buscar_reproceso").click(function () {
    rango_fechas = 0;
    var fechas_diferentes = 0;
    var fech_fin_repr = $("#fech_fin_reproceso").val();
    var fech_inic_repr = $("#fech_inic_reproceso").val();

    var codigoelemento = $("#codigo_reproceso").val();
    var orig_repro = $("#origen_reproceso").val();
    var desti_repro = $("#destino_reproceso").val();

    if (fech_fin_repr !== "" && fech_inic_repr !== "") {
        if (fech_inic_repr > fech_fin_repr) {
            $("#grid").jqxGrid('clear');
            fechas_diferentes = 1;
            mensaje(false, "Fecha inicio debe ser menor a la fecha final", "no");
        } else {
            rango_fechas = 1;
        }
    }

    //console.log(descrip_origen_reproceso, descrip_destino_reproceso, codigoelemento);

    if (fechas_diferentes === 0) {
        if (codigoot) {

            if (codigoproducto) {

                if (check_zona) {

                    if (check_programa) {

                        if (descrip_origen_reproceso) {

                            if (descrip_destino_reproceso) {
                                if (codigoelemento) {
                                    if (fech_inic_repr === "") {
                                        mensaje(false, "Ingrese la fecha de inicio", "no");
                                    } else {
                                        if (fech_fin_repr === "") {
                                            mensaje(false, "Ingrese la fecha de final", "no");
                                        } else {
                                            /* consultar_reproceso(codigoot, codigoproducto, check_zona, check_programa, orig_repro, desti_repro,
                                             codigoelemento, fech_inic_repr, fech_fin_repr);*/
                                            $("#modal-cargar-reproceso").modal('show');
                                            consultar_reproceso(codigoot, codigoproducto, check_zona, check_programa, descrip_origen_reproceso, descrip_destino_reproceso,
                                                    codigoelemento, fech_inic_repr, fech_fin_repr);
                                        }

                                    }
                                } else {
                                    mensaje(false, "Ingrese el CODIGO", "no");
                                }

                            } else {
                                mensaje(false, "Ingrese la ETAPA DESTINO", "no");
                            }

                        } else {
                            mensaje(false, "Ingrese la ETAPA ORIGEN", "no");
                        }



                    } else {
                        mensaje(false, "Ingrese EL PROGRAMA", "no");
                    }
                } else {

                    mensaje(false, "Ingrese la ZONA", "no");
                }
            } else {
                mensaje(false, "Ingrese TIPO PRODUCTO", "no");
            }

        } else {
            mensaje(false, "Ingrese una OT", "no");
        }
    }



});
$("#txt_ot_reproceso").on('change', function (event) {

    codigoot = "";
    codigoot_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            codigoot_label = item.label;
            //$("#producto").jqxDropDownList('selectIndex', 0);
            // check_items_zona = [];
        }
    }
    if (codigoot) {

        $("#zona_reproceso").jqxDropDownList('clear');
        $("#programa_reproceso").jqxDropDownList('clear');
        $("#origen_reproceso").jqxDropDownList('clear');
        $("#destino_reproceso").jqxDropDownList('clear');
        $("#codigo_reproceso").jqxComboBox('clear');
        $("#producto_reproceso").jqxDropDownList('selectIndex', -1);
        $("#producto_reproceso").jqxDropDownList('selectIndex', 0);
        $("#zona_reproceso").jqxDropDownList('selectIndex', -1);
        $("#programa_reproceso").jqxDropDownList('selectIndex', -1);
        $("#origen_reproceso").jqxDropDownList('selectIndex', -1);
        $("#destino_reproceso").jqxDropDownList('selectIndex', -1);
        $("#codigo_reproceso").jqxComboBox('selectIndex', -1);

    }
});
$("#producto_reproceso").unbind();
$("#producto_reproceso").change(function (event) {
    event.stopImmediatePropagation();
    codigoproducto = "";
    codigoproducto_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
            codigoproducto_label = item.label;

            etapas_origen_destino(codigoot, codigoproducto);
            listar_zona(codigoot, codigoproducto);
        }
    }

    $("#zona_reproceso").jqxDropDownList('clear');
    $("#programa_reproceso").jqxDropDownList('clear');
    $("#origen_reproceso").jqxDropDownList('clear');
    $("#destino_reproceso").jqxDropDownList('clear');
    $("#codigo_reproceso").jqxComboBox('clear');


    $("#zona_reproceso").jqxDropDownList('selectIndex', -1);
    $("#programa_reproceso").jqxDropDownList('selectIndex', -1);
    $("#origen_reproceso").jqxDropDownList('selectIndex', -1);
    $("#destino_reproceso").jqxDropDownList('selectIndex', -1);
    $("#codigo_reproceso").jqxComboBox('selectIndex', -1);


});
$("#zona_reproceso").unbind();
$("#zona_reproceso").change(function (event) {

    event.stopImmediatePropagation();
    check_zona = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_zona = item.value;

            listar_tarea(codigoproducto, codigoot, check_zona);
        }
    }

    $("#programa_reproceso").jqxDropDownList('clear');
    $("#codigo_reproceso").jqxComboBox('clear');

    $("#programa_reproceso").jqxDropDownList('selectIndex', -1);
    $("#codigo_reproceso").jqxComboBox('selectIndex', -1);


});
$("#programa_reproceso").unbind();
$("#programa_reproceso").on('change', function (event) {

    check_programa = "";
    check_programa_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            // check_items_zona.push(parseInt(item.value));
            check_programa = item.value;
            codi_varelemento(codigoot, codigoproducto, check_zona, check_programa);
        } else {
            $("#codigo_reproceso").jqxComboBox('selectIndex', -1);
            $("#codigo_reproceso").jqxComboBox('clear');
        }
    }



});


$("#origen_reproceso").on('change', function (event) {
    descrip_origen_reproceso = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            descrip_origen_reproceso = item.value;

        }
    }
});
$("#destino_reproceso").on('change', function (event) {
    descrip_destino_reproceso = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            descrip_destino_reproceso = item.value;

        }
    }
});
$("#codigo_reproceso").on('change', function (event) {
    codigo_reproceso_reproceso = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_reproceso_reproceso = item.value;

        }
    }
});
//PRUEBA
$("#fech_inic_reproceso").on('change', function (event) {
    fech_inicio_reproceso = "";
    var item = event.target;
    if (item) {
        fech_inicio_reproceso = item.value;
    }
});
$("#fech_fin_reproceso").on('change', function (event) {
    fech_fin_reprocesos = "";
    var item = event.target;

    if (item) {
        fech_fin_reprocesos = item.value;
    }
});
function combo_producto_repro() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_prod',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto_repro();
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
            //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});
            $("#producto_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
            // Focus the jqxDropDownList
            $("#producto_reproceso").jqxDropDownList('selectIndex', 0);
            $("#producto_reproceso").jqxDropDownList('focus');
        }
    });
}
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
            $("#txt_ot_reproceso").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '30px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varCodiProy", valueMember: "intIdproy", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
            $("#txt_ot_reproceso").jqxComboBox('focus');
            $("#txt_ot_reproceso").jqxDropDownList('selectIndex', 0);

        }

    });
}
function listar_zona(codigoot, codigo_producto) {
//    alert("entre");
//    alert (codigoot,codigo_producto);

    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_zona_asoc_proy',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // listar_zona();
            }
        },
        success: function (responses) {
            if (responses.data.mensaje == "Error.") {
                $("#zona_reproceso").jqxDropDownList('clear');
                //  $("#tarea").jqxDropDownList('clear');
            } else {
                var new_tarea = [];
                var arra_new2 = [];
                for (let j = 0; j < responses.data.length - 1; j++) {
                    arra_new2.push(responses.data[j]);
                }
                new_tarea = arra_new2.reverse();
                var source =
                        {
                            localdata: new_tarea,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdProyZona'},
                                {name: 'varDescrip'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#zona_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                $("#zona_reproceso").jqxDropDownList('selectIndex', 0);
                $("#zona_reproceso").jqxDropDownList('focus');
            }
        }
    });
}
function listar_tarea(codigo_producto, codigo_ot, zona) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_tare_asoc_proy_sin_array',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            intIdProyZona: zona
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // listar_tarea();
            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "Error.") {
                $("#programa_reproceso").jqxDropDownList('clear');
            } else {


                responses.data.pop();
                //responses.data.push({varDescripTarea:'TODOS',intIdProyTarea:-1});
                //responses.data.pop();
                if (responses.data.length > 0) {
                    var source =
                            {
                                localdata: responses.data,
                                datatype: "array",
                                datafields: [
                                    {name: 'intIdProyTarea'},
                                    {name: 'varDescripTarea'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#programa_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                    $("#programa_reproceso").jqxDropDownList('selectIndex', 0);
                    $("#programa_reproceso").jqxDropDownList('focus');
                }
            }
        }
    });
}
function etapas_origen_destino(codigoot, codigo_producto) {
    let user = obtener_user();
    array_asignaciones = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/List_Etap_actu',
        dataType: 'json',
        data: {
            intIdTipoEtap: -1,
            intIdProy: codigoot,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                etapas_origen_destino();
            }
        },
        success: function (responses) {

            if (responses.data.mensaje == "Error.") {
                $("#origen_reproceso").jqxDropDownList('clear');
                $("#destino_reproceso").jqxDropDownList('clear');
            } else {
                if (responses.data.length > 0) {
                    var source =
                            {
                                localdata: responses.data.reverse(),
                                datatype: "array",
                                datafields: [
                                    {name: 'intIdEtapa'},
                                    {name: 'varDescEtap'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#origen_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 280, height: 30, placeHolder: "SELECCIONAR:"});
                    $("#origen_reproceso").jqxDropDownList('focus');
                    $("#origen_reproceso").jqxDropDownList('selectIndex', 0);

                    $("#destino_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 280, height: 30, placeHolder: "SELECCIONAR:"});
                    $("#destino_reproceso").jqxDropDownList('focus');
                    $("#destino_reproceso").jqxDropDownList('selectIndex', 0);
                }

            }
        }
    });
}
function codi_varelemento(codigoot, codigo_producto, zona, programa) {
    let codigoot2 = codigoot;
    let codigo_producto2 = codigo_producto;
    let zona2 = zona;
    let programa2 = programa;
    $.ajax({
        type: 'POST',
        url: url + '/GestionReprocesos/public/index.php/comb_codi',
        dataType: 'json',
        data: {
            intIdProy: codigoot2,
            intIdTipoProducto: codigo_producto2,
            intIdProyZona: zona2,
            intIdProyTarea: programa2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // codi_varelemento();
            }
        },
        success: function (responses) {


            if (responses.data.mensaje === "Error.") {
                $("#codigo_reproceso").jqxComboBox('clear');
            } else {

                if (responses.data.length > 0) {
                    responses.data.push({varCodiElemento: 'TODOS'});
                    //responses.data.pop();
                    responses.data.reverse();
                    var source =
                            {
                                localdata: responses.data,
                                datatype: "array",
                                datafields: [

                                    {name: 'varCodiElemento'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#codigo_reproceso").jqxComboBox({selectionMode: 'dropDownList', source: dataAdapter, displayMember: "varCodiElemento", valueMember: "varCodiElemento", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                    $("#codigo_reproceso").jqxComboBox('focus');
                    $("#codigo_reproceso").jqxComboBox('selectIndex', 0);
                }

            }
        }
    });
}

$("#Descargar").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Reproceso", true);
});

function consultar_reproceso(codigoot, codigoproducto, zona, programa, orig_repro, desti_repro, varelemento, fecha_inicio, fecha_final) {
    // console.log(codigoot, codigoproducto, zona, programa, orig_repro, desti_repro, varelemento, fecha_inicio, fecha_final);

    $("#modal-cargar-reproceso").modal('show');

    $.ajax({
        type: 'POST',
        url: url + '/GestionReprocesos/public/index.php/list_repr',
        dataType: 'json',
        data: {
            v_intIdproy: codigoot,
            v_intIdTipoProducto: codigoproducto,
            v_intIdZona: zona,
            v_intPrograma: programa,
            v_intIdEtapaOrigen: orig_repro,
            v_intIdEtapaDestino: desti_repro,
            v_varCodiElemento: varelemento,
            v_FechaInicio: fecha_inicio,
            v_FechaFin: fecha_final

        },
        beforeSend: function () {

        },

        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

                consultar_reproceso();

            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {

                window.setTimeout(function () {

                    $("#modal-cargar-reproceso").modal('hide');
                }, 1000);

                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'num_Doc', type: 'string'},
                                {name: 'EtapaOrigen', type: 'string'},
                                {name: 'EtapaDestino', type: 'string'},
                                {name: 'Fecha', type: 'string'},
                                {name: 'intCantiTotal', type: 'number'},
                                {name: 'numPesoNetoTotal', type: 'string'},
                                {name: 'Motivo', type: 'string'},
                                {name: 'varObservacion', type: 'string'},
                                {name: 'Estado', type: 'string'},
                                {name: 'acti_usua', type: 'string'},
                                {name: 'acti_hora', type: 'string'},
                                {name: 'usua_modi', type: 'string'},
                                {name: 'hora_modi', type: 'string'},
                                {name: 'varArchivo', type: 'string'},
                                {name: 'intIdEtapaOrigen', type: 'number'},
                                {name: 'intIdEtapaDestino', type: 'number'},
                                {name: 'intIdMoti', type: 'number'},
                            ],
                            updaterow: function (rowid, rowdata, commit) {
                                commit(true);
                            }
                        };

                var descargar_archivo = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                    var archivo = url + '/Documentos/Reproceso/' + dataRecord.varArchivo;
                    var html = "";

                    if (dataRecord.varArchivo == null) {
                        html = '<button class="btn btn-danger btn-sm" onClick=validar_documento("' + archivo + '"); style="margin-left: 3px;color: white;background-color: #001255;" ><i class="fas fa-download"></i></button>';
                        //'<button class="btn btn-danger btn-sm" onClick=generar_pdf("' + editrow + '"); style="margin-left: 3px;color: white;background-color: #001255;" ><i class="far fa-file-pdf" ></i></button>' +
                        //'<button class="btn btn-danger btn-sm" onClick=anular_reproceso("' + editrow + '"); style="margin-left: 3px;color: white;background-color: #001255;" ><i class="fas fa-ban"></i></button>';
                    } else {
                        html = '<button class="btn btn-danger btn-sm" onClick=validar_documento("' + archivo + '"); style="margin-left: 3px;color: white;background-color: green;" ><i class="fas fa-download"></i></button>';

                    }

                    html += '<button class="btn btn-danger btn-sm" onClick=generar_pdf("' + editrow + '"); style="margin-left: 3px;color: white;background-color: #001255;" ><i class="far fa-file-pdf" ></i></button>' +
                            '<button class="btn btn-danger btn-sm" onClick=anular_reproceso("' + editrow + '"); style="margin-left: 3px;color: white;background-color: #001255;" ><i class="fas fa-ban"></i></button>';


                    return html;
                };

                $("#grid").jqxGrid('clear');
                window.setTimeout(function () {

                    $("#modal-cargar-reproceso").modal('hide'); // COLOCO ANDY 
                }, 1000);



                var dataAdapter = new $.jqx.dataAdapter(source);

                $("#grid").jqxGrid({
                    width: '100%',
                    height: '400',
                    source: dataAdapter,
                    selectionmode: 'multiplecellsextended',
                    theme: 'darkblue',
                    showfilterrow: true,
                    filterable: true,
                    groupable: true,
                    showstatusbar: true,
                    statusbarheight: 25,
                    altrows: true,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        /* {
                         text: 'Descargar', datafield: 'Descargar', columntype: 'button', width: '8%', cellsrenderer: function () {
                         return "DESCARGAR";
                         }, buttonclick: function (row) {
                         
                         editrow = row;
                         var offset = $("#grid").offset();
                         var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                         var archivo = url + '/Documentos/Reproceso/' + dataRecord.varArchivo;
                         
                         //window.location.href = url + '/Documentos/Reproceso/' + dataRecord.varArchivo;
                         validar_documento(archivo);
                         
                         }
                         },*/
                        {text: 'OPCIONES', width: 110, datafield: 'Descargar', cellsrenderer: descargar_archivo, cellsalign: 'center', groupable: true},
                        // {text: 'PDF', width: 60, datafield: 'generar', cellsrenderer: generar_pdf, cellsalign: 'center', groupable: true},
                        // {text: 'ANULAR', width: 90, datafield: 'anular', cellsrenderer: anular_proceso, cellsalign: 'center', groupable: true},
                        {text: 'Num.Documento', datafield: 'num_Doc', width: 100, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid").jqxGrid('getrows');
                                                return count.length;



                                            }


                                }]},
                        {text: 'Etapa Origen', datafield: 'EtapaOrigen', width: 250},
                        {text: 'Etapa Destino', datafield: 'EtapaDestino', width: 250},
                        {text: 'Fecha', datafield: 'Fecha', width: 100},

                        {text: 'Cantidad', datafield: 'intCantiTotal', width: 60, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['intCantiTotal']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(0);
                                                return total;
                                            }
                                }]},
                        {text: 'Peso Neto Total', datafield: 'numPesoNetoTotal', width: 150, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['numPesoNetoTotal']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},

                        {text: 'Motivo', datafield: 'Motivo', width: 120},
                        {text: 'Observacion', datafield: 'varObservacion', width: 250},

                        {text: 'Estado', datafield: 'Estado', width: 120},
                        {text: 'Creado por', datafield: 'acti_usua', width: 180},
                        {text: 'Hora creada', datafield: 'acti_hora', width: 180},
                        {text: 'Modificado por', datafield: 'usua_modi', width: 180},
                        {text: 'Hora modificado', datafield: 'hora_modi', width: 180},
                        {text: 'idEtapa_Origen', datafield: 'intIdEtapaOrigen', width: 250, hidden: true},
                        {text: 'idEtapa_Destino', datafield: 'intIdEtapaDestino', width: 250, hidden: true},
                        {text: 'Id_motivo', datafield: 'intIdMoti', width: 250, hidden: true},
                    ]
                });
                $("#grid").jqxGrid('localizestrings', localizationobj);
            } else {

                window.setTimeout(function () {



                    $("#modal-cargar-reproceso").modal('hide');
                }, 1000);
                $("#grid").jqxGrid('clear');
            }

        }


    });

}

//GENERAR PDF
function generar_pdf(id_numero_documento) {

    var dataRecord = $("#grid").jqxGrid('getrowdata', id_numero_documento);
    console.log(dataRecord);

    $(location).attr('href', "reproceso/pdf/" + codigoot_label + '/' + codigoproducto_label + '/' + dataRecord.num_Doc + '/' + dataRecord.intCantiTotal + '/' + dataRecord.EtapaOrigen + '/' + dataRecord.EtapaDestino + '/' + dataRecord.numPesoNetoTotal + '/' + dataRecord.Motivo + '/' + dataRecord.varObservacion + '/' + dataRecord.acti_usua + '/' + dataRecord.acti_hora + '/' + dataRecord.Estado + '/' + obtener_user());


}

function validar_documento(url) {

    var res = url.indexOf("null");

    if (res === -1) {
        $.ajax({
            url: url,
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            success: function () {

                window.location.href = url;
            }
        });
    } else {


        mensaje(false, "No hay archivo adjunto", "no");

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

//---------- EL REGISTRAR EN EL MODAL DE REPROCESO ---------------------//

//cerrar modal de registrar en reproces
$("#close_registrar_reproceso").click(function () {

    limpiar_modal_registrar_reproceso();
});
$("#close_registrar_reproceso_anul").click(function () {

    limpiar_modal_registrar_reproceso();
});


//MODAL DE NUEVO REPROCESO 


$("#nuevo_reproceso").click(function () {
    limpiar_modal_registrar_reproceso();
    $("#grid_nuevo_reproceso").jqxGrid('clearSelection');
    grilla();
    //para que se mueva con toda tranquilidad el modal
    $('#modal-registrar-reproceso').css('overflow-y', 'auto');
    $("#modal-registrar-reproceso").modal('show');
    listar_data_list_proyectos_modal_nuevo();
    combo_producto_repro_modal_nuevo();

    // codi_varelemento_modal_nuevo(codigoot_modal_nuevo, codigoproducto_modal_nuevo, check_zona_modal_nuevo, check_programa_modal_nuevo);

});
$("#nuevo_ot_reproceso").on('change', function (event) {
    codigoot_modal_nuevo = "";
    codigoot_modal_nuevo_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot_modal_nuevo = item.value;
            codigoot_modal_nuevo_label = item.label;
        }
    }
    if (codigoot_modal_nuevo) {

        $("#nuevo_zona_reproceso").jqxDropDownList('clear');
        $("#nuevo_programa_reproceso").jqxDropDownList('clear');
        $("#nuevo_origen_reproceso").jqxDropDownList('clear');
        // $("#reprocesar_elemento_nuevo").jqxDropDownList('clear');
        $("#nuevo_ruta_reproceso").jqxDropDownList('clear'); // RUTA
        $("#nuevo_codigo_reproceso").jqxComboBox('clear');
        $("#nuevo_producto_reproceso").jqxDropDownList('selectIndex', -1);
        $("#nuevo_producto_reproceso").jqxDropDownList('selectIndex', 0);
        $("#nuevo_zona_reproceso").jqxDropDownList('selectIndex', -1);
        $("#nuevo_programa_reproceso").jqxDropDownList('selectIndex', -1);
        $("#nuevo_origen_reproceso").jqxDropDownList('selectIndex', -1);
        //  $("#reprocesar_elemento_nuevo").jqxDropDownList('selectIndex', -1);
        $("#nuevo_ruta_reproceso").jqxDropDownList('selectIndex', -1); // RUTA
        $("#nuevo_codigo_reproceso").jqxComboBox('selectIndex', -1);

    }
});
$("#nuevo_producto_reproceso").on('change', function (event) {
    codigoproducto_modal_nuevo = "";
    codigoproducto_modal_nuevo_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto_modal_nuevo = item.value;
            codigoproducto_modal_nuevo_label = item.label;
        }
    }
    if (codigoproducto_modal_nuevo) {


        etapas_origen_destino_modal_nuevo(codigoot_modal_nuevo, codigoproducto_modal_nuevo);
        listar_zona_modal_nuevo(codigoot_modal_nuevo, codigoproducto_modal_nuevo);
        ruta_modal_nuevo(codigoot_modal_nuevo, codigoproducto_modal_nuevo);
    }

    $("#nuevo_zona_reproceso").jqxDropDownList('clear');
    $("#nuevo_programa_reproceso").jqxDropDownList('clear');
    $("#nuevo_origen_reproceso").jqxDropDownList('clear');
    //$("#reprocesar_elemento_nuevo").jqxDropDownList('clear');
    $("#nuevo_ruta_reproceso").jqxDropDownList('clear'); // RUTA
    $("#nuevo_codigo_reproceso").jqxComboBox('clear');

    $("#nuevo_zona_reproceso").jqxDropDownList('selectIndex', -1);
    $("#nuevo_programa_reproceso").jqxDropDownList('selectIndex', -1);
    $("#nuevo_origen_reproceso").jqxDropDownList('selectIndex', -1);
    //$("#reprocesar_elemento_nuevo").jqxDropDownList('selectIndex', -1);
    $("#nuevo_ruta_reproceso").jqxDropDownList('selectIndex', -1);
    $("#nuevo_codigo_reproceso").jqxComboBox('selectIndex', -1);


});
$("#nuevo_zona_reproceso").on('change', function (event) {

    check_zona_modal_nuevo = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {

            check_zona_modal_nuevo = item.value;

        }
    }
    if (check_zona_modal_nuevo) {

        listar_tarea_modal_nuevo(codigoot_modal_nuevo, codigoproducto_modal_nuevo, check_zona_modal_nuevo);
    }

    $("#nuevo_programa_reproceso").jqxDropDownList('clear');
    // $("#reprocesar_elemento_nuevo").jqxDropDownList('clear');
    $("#nuevo_programa_reproceso").jqxDropDownList('selectIndex', -1);
    //  $("#reprocesar_elemento_nuevo").jqxDropDownList('selectIndex', -1);

});
$("#nuevo_programa_reproceso").on('change', function (event) {

    check_programa_modal_nuevo = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_programa_modal_nuevo = item.value;

            codi_varelemento_modal_nuevo(codigoot_modal_nuevo, codigoproducto_modal_nuevo, check_zona_modal_nuevo, check_programa_modal_nuevo);
        } else {
            //   $("#reprocesar_elemento_nuevo").jqxDropDownList('selectIndex', -1);
            //  $("#reprocesar_elemento_nuevo").jqxDropDownList('clear');
        }
    }

});

$("#nuevo_origen_reproceso").on('change', function (event) {
    descrip_origen = "";
    valor_origen = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            valor_origen = item.value;
            descrip_origen = item.label;
        }
    }
});

$("#reprocesar_elemento_nuevo_boton").click(function () {

    limpiar_modal_detalle_reproceso();

    checkedItems_idelemento = "";
    var textData_nuevo_reproceso = "";
    var rowindex_2_nuevo_reproceso = "";

    rowindex_2_nuevo_reproceso = $("#grid_nuevo_reproceso").jqxGrid("getselectedrowindexes");

    // console.log(rowindex_2_nuevo_reproceso);

    if (rowindex_2_nuevo_reproceso == "" || rowindex_2_nuevo_reproceso == null) {
        mensaje(false, "Debe seleccionar si quiera un elemento", "no");
        $("#grid_nuevo_reproceso").jqxGrid('clearSelection');
    } else {
        for (var i = 0; i < rowindex_2_nuevo_reproceso.length; i++) {
            textData_nuevo_reproceso = $('#grid_nuevo_reproceso').jqxGrid('getrowdata', rowindex_2_nuevo_reproceso[i]);
            //  console.log(textData_nuevo_reproceso);
            checkedItems_idelemento += textData_nuevo_reproceso['intIdEleme'] + ",";
        }
        //console.log(checkedItems_idelemento);

        //console.log(desc_ruta_nuevo);
        $("#ot_detalle_reproceso_nuevo").val(codigoot_modal_nuevo);
        $("#tipo_producto_detalle_reproceso").val(codigoproducto_modal_nuevo);
        $("#zona_detalle_reproceso").val(check_zona_modal_nuevo);
        $("#programa_detalle_reproceso").val(check_programa_modal_nuevo);
        $("#ruta_detalle_reproceso").val(desc_ruta_nuevo);
        $("#idelemento_detalle_reproceso").val(checkedItems_idelemento);
        $("#user_detalle_reproceso").val(obtener_user());
        $("#descripcion_etapa_origen").val(orig_repro_nuevo);
        $("#nuevo_detalle_reproceso_etapa_origen_php").val(valor_origen);
        $("#descripcion_etapa_origen").val(descrip_origen);

        $("#modal-detalle-reproceso").modal('show');

        etapas_origen_destino_modal_nuevo_detalle(desc_ruta_nuevo);
        //etapas_origen_destino_modal_nuevo_detalle(codigoot_modal_nuevo, codigoproducto_modal_nuevo);
        listar_motivo_detalle_reproceso();
    }





});

$("#nuevo_buscar_reproceso").click(function () {



    rango_fechas_modal_nuevo = 0;
    desc_ruta_nuevo = "";
    orig_repro_nuevo = "";

    let  nueva_ot = $("#nuevo_ot_reproceso").val();
    let tipo_produ = $("#nuevo_producto_reproceso").val();
    let zona_nuevo = $("#nuevo_zona_reproceso").val();
    let programa_nuevo = $("#nuevo_programa_reproceso").val();
    let origen_nuevo = $("#nuevo_origen_reproceso").val();
    let codigo_nuevo = $("#nuevo_codigo_reproceso").val();
    let ruta_nuevo = $("#nuevo_ruta_reproceso").val();


    orig_repro_nuevo = $("#nuevo_origen_reproceso").val();
    desc_ruta_nuevo = $("#nuevo_ruta_reproceso").val();





    //console.log(codigoot_modal_nuevo,codigoproducto_modal_nuevo,check_zona_modal_nuevo,check_programa_modal_nuevo,orig_repro_nuevo,desc_ruta_nuevo);

    if (nueva_ot) {
        if (tipo_produ) {
            if (zona_nuevo) {
                if (programa_nuevo) {
                    if (origen_nuevo !== "") {
                        if (ruta_nuevo !== "") {
                            if (codigo_nuevo !== "") {
                                //$("#ver_reprocesar_elemento").css("display", "block");

                                registrar_nuevo_reproceso(nueva_ot, tipo_produ, zona_nuevo, programa_nuevo, origen_nuevo, ruta_nuevo, codigo_nuevo);

                            } else {
                                mensaje(false, "Ingrese el CODIGO", "no");
                            }
                        } else {
                            mensaje(false, "Ingrese la RUTA", "no");
                        }
                    } else {
                        mensaje(false, "Ingrese la ETAPA ORIGEN", "no");
                    }
                } else {
                    mensaje(false, "Ingrese la PROGRAMA", "no");
                }
            } else {
                mensaje(false, "Ingrese la ZONA", "no");
            }
        } else {
            mensaje(false, "Ingrese el TIPO ELEMENTO", "no");
        }

    } else {
        mensaje(false, "Ingrese la OT", "no");
    }



});


function listar_data_list_proyectos_modal_nuevo() {
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
                listar_data_list_proyectos_modal_nuevo();
            }
        },
        success: function (responses) {

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
            $("#nuevo_ot_reproceso").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '30px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            // $("#nuevo_ot_reproceso").jqxComboBox('focus');
            $("#nuevo_ot_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varCodiProy", valueMember: "intIdproy", width: 200, height: 30, });
            $("#nuevo_ot_reproceso").jqxComboBox('focus');
            $("#nuevo_ot_reproceso").jqxDropDownList('selectIndex', 0);

        }

    });
}

function combo_producto_repro_modal_nuevo() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_prod',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto_repro_modal_nuevo();
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


            $("#nuevo_producto_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
            // Focus the jqxDropDownList
            $("#nuevo_producto_reproceso").jqxDropDownList('selectIndex', 0);
            $("#nuevo_producto_reproceso").jqxDropDownList('focus');

        }
    });
}

function listar_zona_modal_nuevo(codigoot, codigo_producto) {
//    alert("entre");
//    alert (codigoot,codigo_producto);

    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_zona_asoc_proy',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_zona_modal_nuevo();
            }
        },
        success: function (responses) {

            if (responses.data.mensaje == "Error.") {
                $("#nuevo_zona_reproceso").jqxDropDownList('clear');
                //  $("#tarea").jqxDropDownList('clear');
            } else {

                if (responses.data.length > 0) {


                    responses.data.pop();


                    var source =
                            {
                                localdata: responses.data.reverse(),
                                datatype: "array",
                                datafields: [
                                    {name: 'intIdProyZona'},
                                    {name: 'varDescrip'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#nuevo_zona_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                    $("#nuevo_zona_reproceso").jqxDropDownList('selectIndex', 0);
                    $("#nuevo_zona_reproceso").jqxDropDownList('focus');
                }



            }
        }
    });
}

function listar_tarea_modal_nuevo(codigo_ot, codigo_producto, zona_nuevo) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_tare_asoc_proy_sin_array',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            intIdProyZona: zona_nuevo
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_tarea_modal_nuevo();
            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "Error.") {
                $("#nuevo_programa_reproceso").jqxDropDownList('clear');
            } else {

                if (responses.data.length > 0) {

                    responses.data.pop();

                    var source =
                            {

                                localdata: responses.data.reverse(),
                                datatype: "array",
                                datafields: [
                                    {name: 'intIdProyTarea'},
                                    {name: 'varDescripTarea'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);

                    $("#nuevo_programa_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                    $("#nuevo_programa_reproceso").jqxDropDownList('selectIndex', 0);
                    $("#nuevo_programa_reproceso").jqxDropDownList('focus');
                }




            }
        }
    });
}

function etapas_origen_destino_modal_nuevo(codigoot, codigo_producto) {
    let user = obtener_user();
    array_asignaciones = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/List_Etap_actu',
        dataType: 'json',
        data: {
            intIdTipoEtap: -1,
            intIdProy: codigoot,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                etapas_origen_destino();
            }
        },
        success: function (responses) {
            if (responses.data.mensaje == "Error.") {
                $("#nuevo_origen_reproceso").jqxDropDownList('clear');
            } else {
                responses.data.pop();
                var source =
                        {
                            localdata: responses.data.reverse(),
                            datatype: "array",
                            datafields: [
                                {name: 'intIdEtapa'},
                                {name: 'varDescEtap'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#nuevo_origen_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 280, height: 30, placeHolder: "SELECCIONAR:"});
                $("#nuevo_origen_reproceso").jqxDropDownList('focus');
                $("#nuevo_origen_reproceso").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}

function codi_varelemento_modal_nuevo(codigoot, codigo_producto, zona, programa) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionReprocesos/public/index.php/comb_codi',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigo_producto,
            intIdProyZona: zona,
            intIdProyTarea: programa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // codi_varelemento_modal_nuevo();
            }
        },
        success: function (responses) {
            //console.log(responses);

            if (responses.data.mensaje === "Error.") {
                $("#nuevo_codigo_reproceso").jqxComboBox('clear');
            } else {
                if (responses.data.length > 0) {
                    responses.data.push({varCodiElemento: 'TODOS'});
                    responses.data.reverse();
                    var source =
                            {
                                localdata: responses.data,
                                datatype: "array",
                                datafields: [

                                    {name: 'varCodiElemento'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);

                    $("#nuevo_codigo_reproceso").jqxComboBox({selectionMode: 'dropDownList', source: dataAdapter, displayMember: "varCodiElemento", valueMember: "varCodiElemento", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                    $("#nuevo_codigo_reproceso").jqxComboBox('focus');
                    $("#nuevo_codigo_reproceso").jqxComboBox('selectIndex', 0);
                }


            }
        }
    });
}

function ruta_modal_nuevo(codigoot, codigo_producto) {


    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/mues_ruta_asoc_tipo_prod',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                ruta_modal_nuevo();
            }
        },
        success: function (responses) {


            if (responses.data.mensaje == "Error.") {
                $("#nuevo_ruta_reproceso").jqxDropDownList('clear');
                //  $("#tarea").jqxDropDownList('clear');
            } else {
                if (responses.data.length > 0) {
                    responses.data.pop();
                    var source =
                            {
                                localdata: responses.data,
                                datatype: "array",
                                datafields: [
                                    {name: 'intIdRuta'},
                                    {name: 'varNombre'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);

                    $("#nuevo_ruta_reproceso").jqxDropDownList({source: dataAdapter, displayMember: "varNombre", valueMember: "intIdRuta", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                    $("#nuevo_ruta_reproceso").jqxDropDownList('focus');
                    $("#nuevo_ruta_reproceso").jqxDropDownList('selectIndex', 0);

                }


            }
        }
    });
}

function grilla() {

    var repo_ries_segu_suce_data = new Array();
    var source =
            {
                localdata: repo_ries_segu_suce_data,
                datatype: "array",
                datafields: [
                    {name: 'intIdEleme', type: 'string'},
                    {name: 'varCodiElemento', type: 'string'},
                    {name: 'varDescripcion', type: 'string'},
                    {name: 'intSerie', type: 'string'},
                    {name: 'intRevision', type: 'number'},
                    {name: 'intCantRepro', type: 'string'},
                    {name: 'zona', type: 'string'},
                    {name: 'programa', type: 'string'},
                    {name: 'grupo', type: 'string'},
                    {name: 'varModelo', type: 'string'},
                    {name: 'varPerfil', type: 'string'},
                    {name: 'deciPesoNeto', type: 'string'},
                    {name: 'deciPesoBruto', type: 'string'},
                    {name: 'deciArea', type: 'string'},
                    {name: 'deciLong', type: 'string'},
                    {name: 'varModelo', type: 'string'},
                    {name: 'intIdRuta', type: 'number'},
                    {name: 'RUTA', type: 'string'},
                    {name: 'DescripcionRuta', type: 'string'},
                ],
            };
    var repo_ries_segu_suce_adap = new jQuery.jqx.dataAdapter(source);
    $("#grid_nuevo_reproceso").jqxGrid({
        width: '100%',
        height: '350',
        source: repo_ries_segu_suce_adap,
        selectionmode: 'checkbox',
        theme: 'darkblue',
        showfilterrow: true,
        filterable: true,

        showstatusbar: true,
        statusbarheight: 25,
        altrows: true,
        showaggregates: true,
        showgroupaggregates: true,
        columns: [
            {text: 'id', datafield: 'intIdEleme', width: '10%', hidden: true},
            {text: 'Series', datafield: 'intSerie', width: '10%'},
            {text: 'Codigo', datafield: 'varCodiElemento', width: '10%'},
            {text: 'Descripcion', datafield: 'varDescripcion', width: '10%'},
            {text: 'Rev.', datafield: 'intRevision', width: '5%'},
            {text: 'Repro.', datafield: 'intCantRepro', width: '5%'},
            {text: 'Zona', datafield: 'zona', width: '15%'},
            {text: 'Programa', datafield: 'programa', width: '10%'},
            {text: 'Grupo', datafield: 'grupo', width: '10%'},
            {text: 'Modelo', datafield: 'varModelo', width: '10%'},
            {text: 'Ruta', datafield: 'RUTA', width: '20%'},
            {text: 'Peso Neto', datafield: 'deciPesoNeto', width: '10%'},

            {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: '10%'},
            {text: 'Peso Area', datafield: 'deciArea', width: '10%'}
        ]
    });
}


function registrar_nuevo_reproceso(codigo_ot, codigoproducto, zona, programa, orig_repro_nuevo, desc_ruta, codigoelem) {

    $("#modal-cargar-reproceso").modal('show');

    $.ajax({
        type: 'POST',
        url: url + '/GestionReprocesos/public/index.php/list_elem',
        dataType: 'json',
        data: {
            v_intIdproy: codigo_ot,
            v_intIdTipoProducto: codigoproducto,
            v_intIdZona: zona,
            v_intPrograma: programa,
            v_intIdEtapaActual: orig_repro_nuevo,
            v_intIdRuta: desc_ruta,
            v_varCodiElemento: codigoelem
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                registrar_nuevo_reproceso();
            }
        },
        success: function (responses) {


            if (responses.data.length > 0) {
                window.setTimeout(function () {

                    $("#modal-cargar-reproceso").modal('hide');
                }, 1000);

                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdEleme', type: 'string'},
                                {name: 'varCodiElemento', type: 'string'},
                                {name: 'varDescripcion', type: 'string'},
                                {name: 'intSerie', type: 'string'},
                                {name: 'intRevision', type: 'number'},
                                {name: 'intCantRepro', type: 'string'},
                                {name: 'zona', type: 'string'},
                                {name: 'programa', type: 'string'},
                                {name: 'grupo', type: 'string'},
                                {name: 'varModelo', type: 'string'},
                                {name: 'varPerfil', type: 'string'},
                                {name: 'deciPesoNeto', type: 'string'},
                                {name: 'deciPesoBruto', type: 'string'},
                                {name: 'deciArea', type: 'string'},
                                {name: 'deciLong', type: 'string'},
                                {name: 'varModelo', type: 'string'},
                                {name: 'intIdRuta', type: 'number'},
                                {name: 'RUTA', type: 'string'},
                                {name: 'DescripcionRuta', type: 'string'},
                            ],
                            updaterow: function (rowid, rowdata, commit) {
                                commit(true);
                            }
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid_nuevo_reproceso").jqxGrid('clearSelection');
                $("#grid_nuevo_reproceso").jqxGrid('clear');

                $("#grid_nuevo_reproceso").jqxGrid({
                    width: '100%',
                    height: '300',
                    source: dataAdapter,
                    selectionmode: 'checkbox',
                    theme: 'darkblue',
                    showfilterrow: true,
                    filterable: true,

                    showstatusbar: true,
                    statusbarheight: 25,
                    altrows: true,
                    showaggregates: true,
                    showgroupaggregates: true,
                    columns: [
                        {text: 'id', datafield: 'intIdEleme', width: '10%', hidden: true},
                        {text: 'Series', datafield: 'intSerie', width: '10%', aggregates:
                                    [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record)
                                                    {
                                                        var count = $("#grid_nuevo_reproceso").jqxGrid('getrows');
                                                        return count.length;
                                                    }
                                        }]},
                        {text: 'Codigo', datafield: 'varCodiElemento', width: '10%'},
                        {text: 'Descripcion', datafield: 'varDescripcion', width: '10%'},
                        {text: 'Rev.', datafield: 'intRevision', width: '5%'},
                        {text: 'Repro.', datafield: 'intCantRepro', width: '5%'},
                        {text: 'Zona', datafield: 'zona', width: '15%'},
                        {text: 'Programa', datafield: 'programa', width: '10%'},
                        {text: 'Grupo', datafield: 'grupo', width: '10%'},
                        {text: 'Modelo', datafield: 'varModelo', width: '10%'},
                        {text: 'idRuta', datafield: 'intIdRuta', width: '20%', hidden: true},
                        {text: 'Ruta', datafield: 'RUTA', width: '20%'},
                        {text: 'Peso Neto', datafield: 'deciPesoNeto', width: '10%', aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]
                        },

                        {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: '10%', aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]
                        },
                        {text: 'Peso Area', datafield: 'deciArea', width: '10%', aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                    ]
                });

            } else {
                window.setTimeout(function () {



                    $("#modal-cargar-reproceso").modal('hide');
                }, 1000);
                $("#grid_nuevo_reproceso").jqxGrid('clear');
            }

        }
    });


}




//MODAL DEL DETALLE REPROCESO
//cerrar modal de detalle de reproceso
$('#btn_cerrar_detalle_reproceso').click(function () {
    // $('#btn_cerrar_detalle_reproceso').modal().hide();
    limpiar_modal_detalle_reproceso();

});

function etapas_origen_destino_modal_nuevo_detalle(idRuta) {
    let user = obtener_user();
    array_asignaciones = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/obte_etapa_medi_ruta',
        dataType: 'json',
        data: {
            intIdRuta: idRuta

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                etapas_origen_destino();
            }
        },
        success: function (responses) {

            if (responses.data.mensaje == "Error.") {

                $("#nuevo_detalle_reproceso_etapa_destino").jqxDropDownList('clear');
            } else {

                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdEtapa'},
                                {name: 'varDescEtap'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);


                $("#nuevo_detalle_reproceso_etapa_destino").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 280, height: 30});
                $("#nuevo_detalle_reproceso_etapa_destino").jqxDropDownList('focus');
                $("#nuevo_detalle_reproceso_etapa_destino").jqxDropDownList('selectIndex', 0);


            }
        }
    });
}

function listar_motivo_detalle_reproceso() {
    
        $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_motivo_id',
        dataType: 'json',
        data: {
            intIdTipoMoti: 3
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
            $("#nuevo_detalle_reproceso_motivo").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdMoti", width: 200, height: 30, });
            $("#nuevo_detalle_reproceso_motivo").jqxDropDownList('selectIndex', 0);
            $("#nuevo_detalle_reproceso_motivo").jqxDropDownList('focus');
        }
    });
    

}


// SUBIR ARCHIVOS  y cambia el nombre 
$("#subir_archivo_icon_detalle_reproceso").click(function () {
    $("#subir_archivo_reproceso").trigger('click');
});

document.getElementById("subir_archivo_reproceso").onchange = function () {
    document.getElementById("nombre_archivo_detalle_reproceso").value = this.value;
};



$("#nuevo_detalle_reproceso_etapa_destino").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            $("#nuevo_detalle_reproceso_etapa_destino_php").val(item.value);
        }
    }
});

$("#nuevo_detalle_reproceso_motivo").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            $("#nuevo_detalle_reproceso_motivo_php").val(item.value);
        }
    }
});


//finalmente vamos  guardar 

$("#form_register_detalle_reproceso").on('submit', function (e) {

    e.preventDefault();
    var serie = new Array();
    var descripcion_data = "";
    var rowindex = $("#grid_nuevo_reproceso").jqxGrid("getselectedrowindexes");
    var index_etapa = [];
    descripcion_data = 'PROYECTO: ' + codigoot_modal_nuevo_label + ': ';

    for (var i = 0; i < rowindex.length; i++) {
        serie[i] = $('#grid_nuevo_reproceso').jqxGrid('getrowdata', rowindex[i]);

        console.log(serie[i]['varCodiElemento'], serie[i]['intSerie']);
        descripcion_data += 'CODIGO ELEMENTO: ' + serie[i]['varCodiElemento'] + ',' + 'SERIE: ' + serie[i]['intSerie'] + ',';
        //index_etapa.push(serie[i]['intIdEleme']);
    }





    $.ajax({
        url: 'GUARDAR_DETALLE_REPROCESO',
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

            let mensaje_alert = html.mensaje;

            if (html.mensaje == "") {

                let pdf_id_nume_docu = html.dato[0]['num_Doc'];
                let  pdf_intCantiTotal = html.dato[0]['intCantiTotal'];
                let pdf_EtapaOrigen = html.dato[0]['EtapaOrigen'];
                let pdf_EtapaDestino = html.dato[0]['EtapaDestino'];
                let pdf_numPesoNetoTotal = html.dato[0]['numPesoNetoTotal'];
                let pdf_Motivo = html.dato[0]['Motivo'];
                let pdf_Estado = html.dato[0]['Estado'];
                let pdf_varObservacion = html.dato[0]['varObservacion'];
                let pdf_acti_usua = html.dato[0]['acti_usua'];
                let pdf_acti_hora = html.dato[0]['acti_hora'];


                $('#modal-detalle-reproceso').modal('hide');
                generar_pdf_regi(pdf_id_nume_docu, pdf_intCantiTotal, pdf_EtapaOrigen, pdf_EtapaDestino, pdf_numPesoNetoTotal, pdf_Motivo, pdf_varObservacion, pdf_acti_usua, pdf_acti_hora, pdf_Estado);
                comentario_series = descripcion_data;

                mensaje_noti(true, "GUARDADO CON EXITO", "modal-registrar-reproceso");
                //$('#modal-registrar-reproceso').modal('hide');
                limpiar();


            } else {

                mensaje(false, html.mensaje, "no");
                //   $("#btn_cerr_reproceso").trigger('click');
            }

        }
    });


});


function generar_pdf_regi(pdf_id_nume_docu2, pdf_intCantiTotal2, pdf_EtapaOrigen2, pdf_EtapaDestino2, pdf_numPesoNetoTotal2, pdf_Motivo2, pdf_varObservacion2, pdf_acti_usua2, pdf_acti_hora2, pdf_Estado2, user2) {
    let user = obtener_user();
    $(location).attr('href', "reproceso/pdf/" + codigoot_modal_nuevo_label + '/' + codigoproducto_modal_nuevo_label + '/' + pdf_id_nume_docu2 + '/' + pdf_intCantiTotal2 + '/' + pdf_EtapaOrigen2 + '/' + pdf_EtapaDestino2 + '/' + pdf_numPesoNetoTotal2 + '/' + pdf_Motivo2 + '/' + pdf_varObservacion2 + '/' + pdf_acti_usua2 + '/' + pdf_acti_hora2 + '/' + pdf_Estado2 + '/' + obtener_user());


}

//ANUALAR REPROCESO 

combo_anular();
function anular_reproceso(id_documento) {
    var dataRecord = $("#grid").jqxGrid('getrowdata', id_documento);

    // console.log(dataRecord);

    $("#anular_reproceso_documento").val(dataRecord.num_Doc); // numero de documento 
    $("#anular_reproceso_ot").val(codigoot); // id del proyecto
    $("#anular_reproceso_ot_label").val(codigoot_label);// label del proyecto
    $("#anular_reproceso_tipoelemento").val(codigoproducto);// id del tipo elemento
    $("#anular_reproceso_tipoelemento_label").val(codigoproducto_label); // del tipo elemento
    $("#anular_reproceso_origen").val(dataRecord.intIdEtapaOrigen);// id origen
    $("#anular_reproceso_origen_label").val(dataRecord.EtapaOrigen);// label origen
    $("#anular_reproceso_destino").val(dataRecord.intIdEtapaDestino);// id destino
    $("#anular_reproceso_destino_label").val(dataRecord.EtapaDestino);// label origen
    $("#anular_reproceso_fecha_label").val(dataRecord.Fecha); // fecha label
    $("#anular_reproceso_usuario_label").val(dataRecord.acti_usua);// usuario label
    $("#anular_reproceso_motivo").val(dataRecord.intIdMoti);// motivo label
    $("#anular_reproceso_motivo_label").val(dataRecord.Motivo);// id motivo
    $("#anular_reproceso_observacion_label").val(dataRecord.varObservacion);// observacion
    //condicion

    if (fech_inicio_reproceso == "") {// fecha incio
        $("#anular_reproceso_fecha_inicio").val(primerdia);
    } else {
        $("#anular_reproceso_fecha_inicio").val(fech_inicio_reproceso);
    }

    if (fech_fin_reprocesos == "") {// fecha final
        $("#anular_reproceso_fecha_final").val(today);
    } else {
        $("#anular_reproceso_fecha_final").val(fech_fin_reprocesos);
    }




    $('#modal-anular-reproceso').modal('show');
    grilla_anular(dataRecord.num_Doc);
    $("#combo_anulacion").jqxDropDownList('selectIndex', 0);

}

function combo_anular() {
    var tipo_anulacion = [{'value_anulacion': 1, 'label': 'ANULAR TODO'}, {'value_anulacion': 2, 'label': 'ANULAR PARCIAL'}];

    var source =
            {
                localdata: tipo_anulacion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_anulacion'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#combo_anulacion").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_anulacion", width: 130, height: 28});
    // Focus the jqxDropDownList

    $("#combo_anulacion").jqxDropDownList('focus');




}


$("#combo_anulacion").on('change', function (event) {

    check_anular = "";
    let documento_numero = "";
    var item = event.args.item;
    documento_numero = $("#anular_reproceso_documento").val();
    if (item) {
        check_anular = item.value;


        if (check_anular === "1") {


            grilla_anular(documento_numero);

            $("#grid_anular_reproceso").jqxGrid({selectionmode: 'multiplecellsextended'});

        } else {


            grilla_anular(documento_numero);
            $("#grid_anular_reproceso").jqxGrid({selectionmode: 'checkbox'});
            $("#grid_anular_reproceso").jqxGrid('clearSelection');

        }
    }

});

function grilla_anular(numerodocumento, tipoanulado) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionReprocesos/public/index.php/repr_deta',
        dataType: 'json',
        data: {
            intIdreproceso: numerodocumento

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //grilla_anular();
            }
        },
        success: function (responses) {




            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdEleme', type: 'number'},
                            {name: 'varCodiElemento', type: 'string'},
                            {name: 'varDescripcion', type: 'string'},
                            {name: 'intSerie', type: 'number'},

                            {name: 'varDescrip', type: 'string'}, // zona 
                            {name: 'varDescripTarea', type: 'string'},
                            {name: 'varCodigoPaquete', type: 'string'},

                            {name: 'deciPesoNeto', type: 'string'},
                            {name: 'deciPesoBruto', type: 'string'},
                            {name: 'deciArea', type: 'string'},

                            {name: 'intIdEsta', type: 'number'},
                            {name: 'varDescEsta', type: 'string'},
                            {name: 'acti_usua', type: 'string'},
                            {name: 'acti_hora', type: 'string'},
                        ],
                        updaterow: function (rowid, rowdata, commit) {
                            commit(true);
                        }
                    };


            $("#grid_nuevo_reproceso").jqxGrid('clear');
            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#grid_anular_reproceso").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                theme: 'darkblue',
                showfilterrow: true,
                filterable: true,
                groupable: true,
                showstatusbar: true,
                statusbarheight: 25,
                altrows: true,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [

                    {text: 'ID', datafield: 'intIdEleme', width: 50, hidden: true},
                    {text: 'Codigo', datafield: 'varCodiElemento', width: 120, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid_anular_reproceso").jqxGrid('getrows');
                                            return count.length;
                                        }


                            }]},
                    {text: 'Descripcion', datafield: 'varDescripcion', width: 120},

                    {text: 'Serie', datafield: 'intSerie', width: 50},
                    {text: 'Zona', datafield: 'varDescrip', width: 100},
                    {text: 'Programa', datafield: 'varDescripTarea', width: 80},
                    {text: 'Grupo', datafield: 'varCodigoPaquete', width: 80},

                    {text: 'Peso Neto', datafield: 'deciPesoNeto', width: 80},
                    {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: 80},
                    {text: 'Area', datafield: 'deciArea', width: 90, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;

                                            total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'id_estado', datafield: 'intIdEsta', width: 80, hidden: true},
                    {text: 'Estado', datafield: 'varDescEsta', width: 130},
                    {text: 'Creado por', datafield: 'acti_usua', width: 100},
                    {text: 'Hora', datafield: 'acti_hora', width: 100},
                ]
            });

            $("#grid_anular_reproceso").jqxGrid('localizestrings', localizationobj);



        }


    });


}


$("#anular_todo_reproceso").click(function () {


    //CABECERA
    let number_doc = $("#anular_reproceso_documento").val(); // numero de documento 
    let proyectoot = $("#anular_reproceso_ot").val(); // id del proyecto
    let tipo_elemento = $("#anular_reproceso_tipoelemento").val();// id del tipo elemento
    let origen_etapa = $("#anular_reproceso_origen").val();// id origen
    let destino_etapa = $("#anular_reproceso_destino").val();// id destino

    let fecha_inicio = $("#anular_reproceso_fecha_inicio").val(); //fecha incio
    let fecha_final = $("#anular_reproceso_fecha_final").val(); //fecha final

    let tipo_anulado = "";
    var textData_anular_reproceso = "";
    var rowindex_2_anular_reproceso = "";
    checkedItems_idelemento_anular = ""


    tipo_anulado = $("#combo_anulacion").val();


    if (tipo_anulado == "1") {
        checkedItems_idelemento_anular = "";
        textData_anular_reproceso = $('#grid_anular_reproceso').jqxGrid('getrowdata', rowindex_2_anular_reproceso[i]);

        //console.log(proyectoot, tipo_elemento, number_doc, origen_etapa, destino_etapa, checkedItems_idelemento_anular, tipo_anulado);
        guardar_anular_reproceso(proyectoot, tipo_elemento, number_doc, origen_etapa, destino_etapa, checkedItems_idelemento_anular, tipo_anulado, fecha_inicio, fecha_final);

    } else {
        rowindex_2_anular_reproceso = $("#grid_anular_reproceso").jqxGrid("getselectedrowindexes");


        if (rowindex_2_anular_reproceso == "" || rowindex_2_anular_reproceso == null) {
            mensaje(false, "Debe seleccionar si quiera un elemento", "no");
            $("#grid_anular_reproceso").jqxGrid('clearSelection');
        } else {

            for (var i = 0; i < rowindex_2_anular_reproceso.length; i++) {
                textData_anular_reproceso = $('#grid_anular_reproceso').jqxGrid('getrowdata', rowindex_2_anular_reproceso[i]);
                //  console.log(textData_nuevo_reproceso);
                checkedItems_idelemento_anular += textData_anular_reproceso['intIdEleme'] + ",";
            }

            console.log(checkedItems_idelemento_anular);
            // console.log(proyectoot, tipo_elemento, number_doc, origen_etapa, destino_etapa, checkedItems_idelemento_anular, tipo_anulado);
            guardar_anular_reproceso(proyectoot, tipo_elemento, number_doc, origen_etapa, destino_etapa, checkedItems_idelemento_anular, tipo_anulado, fecha_inicio, fecha_final);

        }

    }






});


function  guardar_anular_reproceso(proyectoot2, tipo_elemento2, number_doc2, origen_etapa2, destino_etapa2, checkedItems_idelemento_anular2, tipo_anulado2, inicio, final) {
    $('#modal-cargar-reproceso').modal('show');

    let user = obtener_user();
    let proyectoot2_anular = proyectoot2;
    let tipo_elemento2_anular = tipo_elemento2;
    let number_doc2_anular = number_doc2;
    let origen_etapa2_anular = origen_etapa2;
    let destino_etapa2_anular = destino_etapa2;
    let checkedItems_idelemento_anular2_anular = checkedItems_idelemento_anular2;
    let tipo_anulado2_anular = tipo_anulado2;


    $.ajax({
        type: 'POST',
        url: url + '/GestionReprocesos/public/index.php/anular_reproceso',
        dataType: 'json',
        data: {
            v_intIdproy: proyectoot2_anular,
            v_intIdTipoProducto: tipo_elemento2_anular,
            v_intIdreproceso: number_doc2_anular,
            v_intIdEtapaOrigen: origen_etapa2_anular,
            v_intIdEtapaDestino: destino_etapa2,
            v_IdElementos: checkedItems_idelemento_anular2,
            v_tipoAnulacion: tipo_anulado2,
            v_usuario: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                // guardar_anular_reproceso();
            }
        },
        success: function (responses) {

            //console.log();
            let mensaje_alert = responses.data[0]['mensaje'];
            if (responses.data[0]['mensaje'] == "" || responses.data[0]['mensaje'] == null) {
                // mensaje(true, "GUARDADO CON EXITO", "no");
                $('#modal-cargar-reproceso').modal('hide');
                // $('#modal-anular-reproceso').modal('hide');
                mensaje_noti(true, "GUARDADO CON EXITO", "modal-anular-reproceso");
                consultar_reproceso(codigoot, codigoproducto, check_zona, check_programa, descrip_origen_reproceso, descrip_destino_reproceso, codigo_reproceso_reproceso, inicio, final);
                //console.log(codigoot, codigoproducto, check_zona, check_programa, descrip_origen_reproceso, descrip_destino_reproceso, codigo_reproceso_reproceso, inicio, final);

            } else {

                mensaje(false, responses.data[0]['mensaje'], "no");
                //$('#modal-cargar-reproceso').modal('hide');
                // consultar_reproceso(codigoot, codigoproducto, check_zona, check_programa, descrip_origen_reproceso, descrip_destino_reproceso, codigo_reproceso_reproceso, inicio, final);

            }



        }
    });

}
$("#limpiar_proceso").click(function () {

    limpiar();
});



function limpiar_modal_registrar_reproceso() {
    $("#nuevo_ot_reproceso").jqxDropDownList('checkIndex', 0);
    $("#nuevo_producto_reproceso").jqxDropDownList('checkIndex', 0);
    $("#nuevo_zona_reproceso").jqxDropDownList('checkIndex', 0);
    $("#nuevo_programa_reproceso").jqxDropDownList('checkIndex', 0);
    $("#nuevo_origen_reproceso").jqxDropDownList('checkIndex', 0);
    $("#nuevo_codigo_reproceso").jqxComboBox('checkIndex', 0);
    $("#nuevo_ruta_reproceso").jqxDropDownList('checkIndex', 0);

    $("#grid_nuevo_reproceso").jqxGrid('clear');
    $("#grid_nuevo_reproceso").jqxGrid('clearSelection');
}
function limpiar_modal_detalle_reproceso() {
    $("#nuevo_reproceso_observacion").val('');
    $("#nuevo_detalle_reproceso_motivo").jqxDropDownList('checkIndex', 0);
    $("#nuevo_detalle_reproceso_etapa_destino").jqxDropDownList('checkIndex', 0);

    $("#subir_archivo_detalle_reproceso").val('');
    $("#nombre_archivo_detalle_reproceso").val('');
    $("#subir_archivo_icon_detalle_reproceso").val('');
    $("#subir_archivo_reproceso").val('');
    $("#subir_archivo_icon_detalle_reproceso").val('');

    $("#nuevo_detalle_reproceso_etapa_origen_php").val('');
    $("#descripcion_etapa_origen").val('');
}

function limpiar() {

    $("#zona_reproceso").jqxDropDownList('selectIndex', -1);

    $("#programa_reproceso").jqxDropDownList('selectIndex', -1);
    $("#origen_reproceso").jqxDropDownList('selectIndex', -1);
    $("#destino_reproceso").jqxDropDownList('selectIndex', -1);
    $('#fech_inic_reproceso').val(primerdia);
    $('#fech_fin_reproceso').val(today);
    $("#grid").jqxGrid('clear');

}


