var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var day_next = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia = moment(firstDay).format('YYYY-MM-DD');
$('#fech_inic_lote_pint').val(primerdia);
$('#fech_fin_lote_pint').val(today);
var codigoot_lote_pint_value = "";
var tipo_elemento_lote_pint_value = "";
var txt_ot_nuev_lote_pint_value = "";
var rango_fecha_inicio = "";



$("#txt_ot_lote_pint").on('change', function (event) {
    $('#txt_ot_lote_pint').jqxDropDownList('clearFilter');
    codigoot_lote_pint_value = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot_lote_pint_value = item.value;
            $("#grid_lote_pint").jqxGrid('clear');

        }
    }


});

$("#tipo_elem_lote_pint").on('change', function (event) {
    $('#tipo_elem_lote_pint').jqxDropDownList('clearFilter');
    tipo_elemento_lote_pint_value = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            tipo_elemento_lote_pint_value = item.value;
            $("#grid_lote_pint").jqxGrid('clear');

        }
    }
});

$("#fech_inic_lote_pint").on('change', function (event) {
    rango_fecha_inicio = "";
    var item = event.target;
    if (item) {
        rango_fecha_inicio = item.value;

        $("#grid_lote_pint").jqxGrid('clear');
    }
});
$("#fech_fin_lote_pint").on('change', function (event) {
    rango_fecha_final = "";
    var item = event.target;
    if (item) {
        rango_fecha_final = item.value;

        $("#grid_lote_pint").jqxGrid('clear');
    }
});



function listar_data_list_proyectos_lote_pint_ot() {
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
            $("#txt_ot_lote_pint").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',

                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_lote_pint").jqxDropDownList('selectIndex', 0);
            $("#txt_ot_lote_pint").jqxDropDownList('focus');

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


            $("#tipo_elem_lote_pint").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30});
            $("#tipo_elem_lote_pint").jqxDropDownList('focus');
            $("#tipo_elem_lote_pint").jqxDropDownList('selectIndex', 0);
        }
    });
}

$("#btn_busc_lote_pint").click(function () {
    let id_proy_lote_pint = $("#txt_ot_lote_pint").val();
    let id_eleme_lote_pint = $("#tipo_elem_lote_pint").val();
    let fech_inicio = $("#fech_inic_lote_pint").val();
    let fech_final = $("#fech_fin_lote_pint").val();


    if (id_proy_lote_pint === "") {
        mensaje(false, "INGRESE LA OT", "no");
    } else {
        if (id_eleme_lote_pint === "") {
            mensaje(false, "INGRESE LA OT", "no");
        } else {
            if (fech_inicio > fech_final) {
                mensaje(false, "LA FECHA DE INICIO DEBE SER MENOR A LA FECHA FINAL", "no");
            } else if (fech_inicio < fech_final || fech_inicio == fech_final) {
                // console.log(myJsonString, ot_gene_lote_pint, elem_gene_lote_pint, peso_neto_lote_pint, area_opintura, area_total, pintor_gene, cabina_gene, fech_inic, fech_fina, obse_gene);
                //console.log(id_proy_lote_pint, id_eleme_lote_pint, fech_inicio, fech_final);
                mostrar_grilla_lote_pintura(id_proy_lote_pint, id_eleme_lote_pint, fech_inicio, fech_final);
            }
        }
    }

});

function mostrar_grilla_lote_pintura(id_proy_lote_pint2, id_eleme_lote_pint2, fech_inicio2, fech_final2) {
    $("#modal-cargar-lote-pint").modal('show'); // COLOCO ANDYs
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_pintura',
        dataType: 'json',
        data: {
            intIdProy: id_proy_lote_pint2,
            intIdTipoProducto: id_eleme_lote_pint2,
            fecha_inicio: fech_inicio2,
            fecha_fin: fech_final2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                //  console.log(responses);
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'intIdLotePintura', type: 'number'},
                        {name: 'intIdProy', type: 'number'},
                        {name: 'Codigo', type: 'string'},
                        {name: 'intIdTipoProducto', type: 'number'},
                        {name: 'varLotePintura', type: 'string'},
                        {name: 'intIdCabina', type: 'number'},
                        {name: 'varCabina', type: 'string'},
                        {name: 'varPintor', type: 'String'},
                        {name: 'dateFechInic', type: 'String'},
                        {name: 'dateFechFin', type: 'String'},
                        {name: 'dateFechFinReal', type: 'String'},
                        {name: 'varObservacion', type: 'String'},
                        {name: 'intCantidad', type: 'String'},
                        {name: 'deciPesoNeto', type: 'String'},
                        {name: 'deciAreaPintura', type: 'String'},
                        {name: 'deciAreaTotal', type: 'String'},
                        {name: 'intIdEsta', type: 'String'},
                        {name: 'acti_usua', type: 'String'},
                        {name: 'acti_hora', type: 'String'},
                        {name: 'usua_modi', type: 'String'},
                        {name: 'hora_modi', type: 'String'},
                        {name: 'varCodiProy', type: 'String'},
                        {name: 'varDescTipoProd', type: 'string'},
                        {name: 'varDescEsta', type: 'string'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };

                window.setTimeout(function () {

                    $("#modal-cargar-lote-pint").modal('hide'); // COLOCO ANDY 
                }, 1000);

                var dataAdapter = new $.jqx.dataAdapter(source);
                var editrow = -1;

                var pdf_descarga = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_lote_pint").jqxGrid('getrowdata', editrow);
                    var html = "";
                    html = '<center><button class="btn btn-danger btn-sm" onClick=mostrar_pdf("' + editrow + '");><i class="fas fa-file-pdf"></i></button></center>';
                    ;

                    return html;
                };
                var lote_pintura = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_lote_pint").jqxGrid('getrowdata', editrow);
                    var html = "";
                    html = '<center><button class="btn btn-danger btn-sm" onClick=lote_pintura_infor("' + editrow + '");><i class="fas fa-fill"></i>' + value + '</button></center>';
                    ;

                    return html;
                };
                var pintor_cola = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_lote_pint").jqxGrid('getrowdata', editrow);
                    var html = "";
                    html = '<center><button class="btn btn-danger btn-sm" id="filmPicture' + dataRecord.intIdLotePintura + '" onClick=mostrar_pintor("' + editrow + '");><i class="fas fa-id-badge"></i></button></center>';
                    ;

                    return html;
                };



                $("#grid_lote_pint").jqxGrid('clear');
                $("#grid_lote_pint").jqxGrid({
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
                        {text: 'PDF', datafield: 'descarga_pdf', width: '5%', cellsrenderer: pdf_descarga},
                        {text: 'Codigo', datafield: 'Codigo', width: '7%', aggregates:
                                    [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record)
                                                    {
                                                        var count = $("#grid_lote_pint").jqxGrid('getrows');
                                                        return count.length;
                                                    }
                                        }]},
                        {text: '#', datafield: 'intIdLotePintura', width: '5%', hidden: true},
                        {text: 'IdProyecto', datafield: 'intIdProy', width: '7%', hidden: true},
                        {text: 'Proyecto', datafield: 'varCodiProy', width: '7%', hidden: true},
                        {text: 'IdTipoProducto', datafield: 'intIdTipoProducto', width: '7%', hidden: true},
                        {text: 'Tipo Elemen', datafield: 'varDescTipoProd', width: '7%', hidden: true},
                        {text: 'Lote Pintura', datafield: 'varLotePintura', width: '35%', cellsrenderer: lote_pintura},
                        {text: 'Cantidad', datafield: 'intCantidad', width: '7%', cellsalign: 'center', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['intCantidad']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total);
                                                return total;
                                            }
                                }]},
                        {text: 'Cabina', datafield: 'varCabina', width: '12%'},
                        {text: 'Cabina_id', datafield: 'intIdCabina', width: '12%', hidden: true},
                        {text: 'Pintor', datafield: 'varPintor', width: '7%', cellsrenderer: pintor_cola},
                        {text: 'Fecha Inicio', datafield: 'dateFechInic', width: '10%'},
                        {text: 'Fecha Final', datafield: 'dateFechFin', width: '10%'},
                        {text: 'Fecha Real', datafield: 'dateFechFinReal', width: '10%'},
                        {text: 'Observacion', datafield: 'varObservacion', width: '20%'},
                        {text: 'Peso Neto', datafield: 'deciPesoNeto', width: '8%', aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Area Pintura', datafield: 'deciAreaPintura', width: '8%',
                            aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciAreaPintura']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Area Total', datafield: 'deciAreaTotal', width: '8%',
                            aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciAreaTotal']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'IdEstado', datafield: 'intIdEsta', width: '8%', hidden: true},
                        {text: 'Estado', datafield: 'varDescEsta', width: '8%'},
                        {text: 'creado por', datafield: 'acti_usua', width: '15%'},
                        {text: 'creado el', datafield: 'acti_hora', width: '15%'},
                        {text: 'modificado por', datafield: 'usua_modi', width: '15%'},
                        {text: 'hora modificada', datafield: 'hora_modi', width: '15%'},
                    ]
                });


            } else {
                mensaje(false, "NO HAY DATOS A MOSTRAR", "no");
                window.setTimeout(function () {

                    $("#modal-cargar-lote-pint").modal('hide'); // COLOCO ANDY 
                }, 1000);
            }

        }
    });
}


function lote_pintura_infor(idlotepintura) {
    var dataRecord = $("#grid_lote_pint").jqxGrid('getrowdata', idlotepintura);

    $("#idlotepintura_color").val(dataRecord.varLotePintura);
    detalle_pintura(dataRecord.intIdLotePintura);
    $("#modal-lote-pintura-info").modal('show');
}

function detalle_pintura(idpintura) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_detalle_pintura',
        dataType: 'json',
        data: {
            intIdLotePintura: parseInt(idpintura),

        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            var source = {

                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'varCodiElemento', type: 'String'},
                    {name: 'cant', type: 'String'},

                    {name: 'varDescripcion', type: 'String'},
                    {name: 'varDescripTarea', type: 'String'},
                    {name: 'varDescrip', type: 'String'},
                    {name: 'deciPesoNeto', type: 'String'},
                    {name: 'deciPesoBruto', type: 'String'},
                    {name: 'deciArea', type: 'String'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            $("#grid_lote_info").jqxGrid('clear');
            var dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;

            $("#grid_lote_info").jqxGrid({
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
                    {text: 'Elemento', datafield: 'varCodiElemento', width: '18%', aggregates: [{
                                '<b>Fila</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var count = $("#grid_lote_info").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Cant', datafield: 'cant', width: '7%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var total = 0;
                                            total = parseFloat(record['cant']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total);
                                            return total;
                                        }
                            }]
                    },

                    {text: 'Descripcion', datafield: 'varDescripcion', width: '18%'},

                    {text: 'Tarea', datafield: 'varDescripTarea', width: '18%'},
                    {text: 'Modelo', datafield: 'varDescrip', width: '18%'},
                    {text: 'Peso Neto', datafield: 'deciPesoNeto', cellsalign: 'left', width: '18%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var total = 0;
                                            total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Bruto', datafield: 'deciPesoBruto', cellsalign: 'left', width: '18%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {
                                            var total = 0;
                                            total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Area', datafield: 'deciArea', cellsalign: 'left', width: '18%', aggregates: [{
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




        }
    });

}


$("#btn_cerr_lote_pint_info").click(function () {


    $("#idlotepintura_color").val('');
    $("#grid_lote_info").jqxGrid('clear');
    $("#modal-lote-pintura-info").modal('hide');
});


function mostrar_pintor(idpersona) {
    var dataRecord_persona = $("#grid_lote_pint").jqxGrid('getrowdata', idpersona);




    dato_pintor(dataRecord_persona.varPintor, dataRecord_persona.intIdLotePintura);



}

function dato_pintor(idpintor, idlote) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_pintores',
        dataType: 'json',
        data: {
            colaboradores: idpintor,

        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data.length > 0) {

                let acumulador = "";
                let quitarcomar = "";
                for (var i = 0; i < responses.data.length; i++) {
                    
                    acumulador += responses.data[i]["varNumeIden"] + "/";

                }
                $("#filmPicture" + idlote + "").jqxTooltip({content: '<b>DNI: </b>' + acumulador + '</i>', position: 'mouse', name: 'movieTooltip'});


                var source = {

                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'intIdColaborador', type: 'String'},
                        {name: 'varNumeIden', type: 'String'},
                        {name: 'varNombColabo', type: 'String'},
                        {name: 'varApelColabo', type: 'String'},
                        {name: 'acti_usua', type: 'String'},
                        {name: 'acti_hora', type: 'String'},
                        {name: 'usua_modi', type: 'String'},
                        {name: 'hora_modi', type: 'String'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                $("#grid_contratista_info").jqxGrid('clear');
                var dataAdapter = new $.jqx.dataAdapter(source);
                var editrow = -1;

                $("#grid_contratista_info").jqxGrid({
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

                        {text: '#', datafield: 'intIdColaborador', width: '18%', hidden: true},
                        {text: 'N. Identificacion', datafield: 'varNumeIden', width: '18%'},
                        {text: 'Nombre', datafield: 'varNombColabo', width: '25%'},
                        {text: 'Apellido', datafield: 'varApelColabo', width: '25%'},
                        {text: 'Creado por', datafield: 'acti_usua', width: '18%'},
                        {text: 'Creado el', datafield: 'acti_hora', width: '25%'},
                        {text: 'Modificado por', datafield: 'usua_modi', width: '18%'},
                        {text: 'Modificado el', datafield: 'hora_modi', width: '25%'},
                    ]
                });

                $("#modal-muest-contra-perso").modal('show');
            } else {
                mensaje(false, "NO HAY DATO A MOSTRAR", "no");
            }
            
        }
    });

}

//MOSTRAR PDF 
function mostrar_pdf(idpdf) {
    var dataRecord_pdf = $("#grid_lote_pint").jqxGrid('getrowdata', idpdf);
    var array_lote_pintura = [];
    let row = {intIdLotePintura:dataRecord_pdf.intIdLotePintura,
            Codigo:dataRecord_pdf.Codigo,
            varCodiProy : dataRecord_pdf.varCodiProy,
            intIdProy:dataRecord_pdf.intIdProy,
            acti_usua: dataRecord_pdf.acti_usua,
           
            varLotePintura:dataRecord_pdf.varLotePintura,
            varCabina:dataRecord_pdf.varCabina,
            varDescTipoProd:dataRecord_pdf.varDescTipoProd,
            acti_hora:dataRecord_pdf.acti_hora,
            dateFechInic:dataRecord_pdf.dateFechInic,
            dateFechFin:dataRecord_pdf.dateFechFin,
            varObservacion:dataRecord_pdf.varObservacion
    }
    
    let usuario_conectado = obtener_user();
    
    array_lote_pintura.push(row);
      var myJsonString = JSON.stringify(array_lote_pintura);
      console.log(myJsonString);
      
    $(location).attr('href', "lotepintura/pdf/" + myJsonString + '/' + usuario_conectado);

}

