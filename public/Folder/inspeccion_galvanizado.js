var now = new Date();
var day_galv = ("0" + now.getDate()).slice(-2);
var month_galv = ("0" + (now.getMonth() + 1)).slice(-2);
var diaactual = now.getFullYear() + "-" + (month_galv) + "-" + (day_galv);
var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia = moment(firstDay).format('YYYY-MM-DD');
var fech_inic_report = "";
var fech_final_report = "";
$('#fech_inic_insp_galv').val(primerdia);
$('#fech_fin_insp_galv').val(diaactual);

var estado_value = "";
var idturno_value = 0;
var idresponsable_value = 0;
var fecha_inicio_value = "";
var fecha_final_value = "";
var cantidad_original = 0;
//----------------------------------
var valor_idturno = 0;
var valor_idrespon = 0;
var valor_fecha_inci = "";
var valor_fecha_final = "";
var valor_idesta = 0;
var valor_check = "";

//PROMEDIO CONCRAJE 
var al_1_value = 0;
var al_2_value = 0;
var a2_1_value = 0;
var a2_2_value = 0;
var a3_1_value = 0;
var a3_2_value = 0;
var a4_1_value = 0;
var a4_2_value = 0;
var a5_1_value = 0;
var a5_2_value = 0;
var exceso = 0;
var promedio = 0;
var tolerancia = 0;
var espec_cont_value = "";
var total_max_total = 0;
var consumo_zinc = 0;
var esp_max_cont_metr_value = 0;
//VARIABLES GLOBALES 
var idproy = 0;
var codiproy = "";
var tipoorden = "";
var turno = "";
var fecha_inicio = "";
var hora_entr = "";
var razon = "";
var num_guia = "";
var cantidad = "";
var tipo_mate = "";
var peso_negro = "";
var peso_galvanizado = "";
var consu_zinc = "";
var porce_zinc = "";
var iddetagalv = 0;
var id_insp_galv = 0;
var hijo = 0;
var dato_exportar = "";
var descripcion = "";
var fechafin = '';
var hora_salida = '';
var intGanchera = '';
var observacion = 0;
function tipo_material() {
    var tipo_anulacion = [{'value_tipo_material': 'LIVIANO', 'label': 'LIVIANO'}, {'value_tipo_material': 'SEMIPESADO', 'label': 'SEMIPESADO'}, {'value_tipo_material': 'PESADO', 'label': 'PESADO'}];

    var source =
            {
                localdata: tipo_anulacion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_tipo_material'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#tipo_mate_cont_metro").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_tipo_material", width: 150, height: 27});
    // Focus the jqxDropDownList

    $("#tipo_mate_cont_metro").jqxDropDownList('focus');
}
//combo de  turnos
$("#idturno_insp_galv").on('change', function (event) {
    idturno_value = 0;
    dato_exportar = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            idturno_value = item.value;
            //   console.log(idturno_value);
        }
    }
    $("#grid_insp_galv").jqxGrid('clear');
});
//combo responsable
$("#idresponsable_insp_galv").on('change', function (event) {

    idresponsable_value = 0;
    dato_exportar = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            idresponsable_value = item.value;
            //  console.log(idresponsable_value);
        }
    }
    $("#grid_insp_galv").jqxGrid('clear');
});
//fecha de inicio
$("#fech_inic_insp_galv").on('change', function (event) {
    fecha_inicio_value = "";
    dato_exportar = "";
    var item = event.target;
    if (item) {
        fecha_inicio_value = item.value;
        //   console.log(fecha_inicio_value);
    }

    $("#grid_insp_galv").jqxGrid('clear');
});
//frecha final  
$("#fech_fin_insp_galv").on('change', function (event) {
    // console.log(event);
    fecha_final_value = "";
    dato_exportar = "";
    var item = event.target;
    if (item) {
        fecha_final_value = item.value;
        //console.log(fecha_final_value);
    }


    $("#grid_insp_galv").jqxGrid('clear');
});
$("#idestado_insp_galv").on('change', function (event) {
    estado_value = "";
    dato_exportar = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            estado_value = item.value;
            //  console.log(estado_value);
            $("#grid_insp_galv").jqxGrid('clear');
        }
    }
    if (estado_value === "42") {

        $("#mostrar_respon").removeClass("hidde_grid");
        $("#mostrar_radio1").removeClass("hidde_grid");
        $("#mostrar_radio2").removeClass("hidde_grid");
        document.getElementById("inlineRadio1").checked = true;
        combo_responsable();
    } else {
        $("#mostrar_radio1").addClass("hidde_grid");
        $("#mostrar_radio2").addClass("hidde_grid");
        $("#mostrar_respon").addClass("hidde_grid");
        document.getElementById("inlineRadio1").checked = false;
        $("#idresponsable_insp_galv").jqxDropDownList('clear');
        $("#idresponsable_insp_galv").jqxDropDownList('selectIndex', -1);

    }

});

function combo_turno() {
    var tipo_anulacion = [{'value_turno': 'TURNO 2', 'label': 'TURNO 2'}, {'value_turno': 'TURNO 1', 'label': 'TURNO 1'}, {'value_turno': 'TODOS', 'label': 'TODOS'}];

    var source =
            {
                localdata: tipo_anulacion.reverse(),
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_turno'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#idturno_insp_galv").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_turno", width: 170, height: 27});
    // Focus the jqxDropDownList

    $("#idturno_insp_galv").jqxDropDownList('focus');
    $("#idturno_insp_galv").jqxDropDownList('selectIndex', 0);


}
function combo_estado() {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/eleg_proc_estado',
        dataType: 'json',
        data: {
            intIdProcEsta: parseInt(15),

        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                // cmbx_listar_estado();
            }
        },
        success: function (responses) {
            //   console.log(responses);
            if (responses.data.length > 0) {
                var source =
                        {
                            localdata: responses.data.reverse(),
                            datatype: "array",
                            height: '50%',
                            datafields: [
                                {name: 'intIdEsta'},
                                {name: 'varDescEsta'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

                $("#idestado_insp_galv").jqxDropDownList({source: dataAdapter, displayMember: "varDescEsta", valueMember: "intIdEsta", width: 170, height: 27});
                // Focus the jqxDropDownList

                $("#idestado_insp_galv").jqxDropDownList('focus');
                $("#idestado_insp_galv").jqxDropDownList('selectIndex', 0);
            } else {
                //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});
                $("#idestado_insp_galv").jqxDropDownList({placeHolder: "SELECCIONAR:", width: 170, height: 27});
                // Focus the jqxDropDownList

                $("#idestado_insp_galv").jqxDropDownList('focus');
                $("#idestado_insp_galv").jqxDropDownList('selectIndex', -1);

            }


        }
    });
}
function combo_responsable() {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/obte_supe_con_id_etap',
        dataType: 'json',
        data: {
            intIdEtapa: parseInt(6)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            //  console.log(responses);
            let array_respon = [];

            responses.data.forEach(element => {
                array_respon.push(element);
            });


            let cmbo_todo = {intIdColaborador: -1, nombre: 'TODOS'};
            array_respon.push(cmbo_todo);

            var source =
                    {
                        localdata: array_respon.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'intIdColaborador'},
                            {name: 'nombre'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#idresponsable_insp_galv").jqxDropDownList({placeHolder: "SELECCIONE:", source: dataAdapter, displayMember: "nombre", valueMember: "intIdColaborador", width: 300, height: 30});
            $("#idresponsable_insp_galv").jqxDropDownList('focus');
            $("#idresponsable_insp_galv").jqxDropDownList('selectIndex', 0);
        }
    });
}
$("#btn_busc_insp_galv").click(function () {
    //variables globales 
    valor_idturno = 0;
    valor_idrespon = 0;
    valor_fecha_inci = "";
    valor_fecha_final = "";
    valor_idesta = 0;
    valor_check = "";

    valor_idturno = $("#idturno_insp_galv").val();
    valor_idrespon = $("#idresponsable_insp_galv").val();
    valor_fecha_inci = $("#fech_inic_insp_galv").val();
    valor_fecha_final = $("#fech_fin_insp_galv").val();
    valor_idesta = $("#idestado_insp_galv").val();
    valor_check = $("#idestado_insp_galv").val();

    let idTurno = $("#idturno_insp_galv").val();
    let idrespon = $("#idresponsable_insp_galv").val();
    let fecha_incio = $("#fech_inic_insp_galv").val();
    let fecha_final = $("#fech_fin_insp_galv").val();
    let data_fech_inic = new Date(fecha_incio);
    let data_fech_fin = new Date(fecha_final);
    let idesta = $("#idestado_insp_galv").val();
    let check = $("input:checked").val();




    if (fecha_incio === "") {
        mensaje(false, "SELECCIONE LA FECHA DE INICIO", "no");
    } else {
        if (fecha_final === "") {
            mensaje(false, "SELECCIONE LA FECHA FINAL", "no");
        } else {
            if (data_fech_inic <= data_fech_fin) {
                if (idesta === "") {
                    mensaje(false, "SELECCIONE  ESTADO", "no");
                } else {
                    if (idesta === "41") {
                        grilla_insp_galv(idTurno, idrespon, fecha_incio, fecha_final, idesta, '');
                    } else {
                        if (idrespon === "") {
                            mensaje(false, "SELECCIONE EL RESPONSABLE", "no");
                        } else {
                            grilla_insp_galv(idTurno, idrespon, fecha_incio, fecha_final, idesta, check);
                        }
                    }
                }

            } else {
                mensaje(false, "LA FECHA FINAL DEBE SER MAYOR A LA FECHA DE INICIO", "no");
            }
        }

    }
});
$("#inlineRadio1").on("click", function () {
    dato_exportar = "";
    $("#grid_insp_galv").jqxGrid('clear');
});
$("#inlineRadio2").on("click", function () {
    //limpiar la grilla
    dato_exportar = "";
    $("#grid_insp_galv").jqxGrid('clear');

});
function grilla_insp_galv(idTurno2, idrespon2, fecha_incio2, fecha_final2, idesta2, check2) {
    // console.log(idTurno2, idrespon2, fecha_incio2, fecha_final2, idesta2, check2);
    $("#modal-cargar-insp-galv").modal('show');
    $("#grid_insp_galv").jqxGrid('clear');
    dato_exportar = "";
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/lista_insp_galvanizado',
        dataType: 'json',
        data: {
            varTurno: idTurno2,
            intIdEsta: idesta2,
            intIdEspeci: idrespon2,
            fechaInicio: fecha_incio2,
            fechaFin: fecha_final2,
            intTipo: check2,
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            //  console.log(responses);
            dato_exportar = JSON.stringify(responses.data);
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdGalva', type: 'number'},
                    {name: 'intIdDetaGalv', type: 'number'},
                    {name: 'intIdPeriValo', type: 'String'},
                    {name: 'varTipoGalv', type: 'String'},
                    {name: 'intGanchera', type: 'number'},
                    {name: 'varTurno', type: 'String'},
                    {name: 'varHoraEntr', type: 'String'},
                    {name: 'varHoraSali', type: 'String'},
                    {name: 'intCantidad', type: 'number'},
                    {name: 'varTipoMate', type: 'String'},
                    {name: 'deciPesoNegro', type: 'String'},
                    {name: 'deciPesoGalv', type: 'String'},
                    {name: 'deciConsumoZinc', type: 'String'},
                    {name: 'varPorcZinc', type: 'String'},
                    {name: 'dateFechInic', type: 'String'},
                    {name: 'dateFechSali', type: 'String'},
                    {name: 'acti_usua', type: 'String'},
                    {name: 'acti_hora', type: 'String'},
                    {name: 'usua_modi', type: 'String'},
                    {name: 'hora_modi', type: 'String'},
                    {name: 'intIdEsta', type: 'String'},
                    {name: 'intIdUniNego', type: 'String'},
                    {name: 'varTipoOrden', type: 'String'},
                    {name: 'intIdProy', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'varRazoSoci', type: 'String'},
                    {name: 'varOrdenServi', type: 'String'},
                    {name: 'varDescripcion', type: 'string'},
                    {name: 'dateFechIngr', type: 'string'},
                    {name: 'dateFechIntern', type: 'string'},
                    {name: 'varNumeGuia', type: 'string'},
                    {name: 'intCantTota', type: 'number'},
                    {name: 'intCantRegi', type: 'number'},
                    {name: 'deciPesoInge', type: 'string'},
                    {name: 'deciPesoBruto', type: 'string'},
                    {name: 'varCodiProy', type: 'string'},
                    {name: 'varDescTipoProd', type: 'string'},

                    {name: 'intIdInspGalv', type: 'number'},
                    {name: 'intIdEspeci', type: 'number'},
                    {name: 'deciMuesA1_1', type: 'string'},
                    {name: 'deciMuesA1_2', type: 'string'},
                    {name: 'deciMuesA2_1', type: 'string'},
                    {name: 'deciMuesA2_2', type: 'string'},
                    {name: 'deciMuesA3_1', type: 'string'},
                    {name: 'deciMuesA3_2', type: 'string'},
                    {name: 'deciMuesA4_1', type: 'string'},
                    {name: 'deciMuesA4_2', type: 'string'},
                    {name: 'deciMuesA5_1', type: 'string'},
                    {name: 'deciMuesA5_2', type: 'string'},
                    {name: 'deciPromedio', type: 'string'},
                    {name: 'deciMaxiTota', type: 'string'},
                    {name: 'varTipoMaterial', type: 'string'},
                    {name: 'varMaterial', type: 'string'},
                    {name: 'intIdSuper', type: 'string'},
                    {name: 'deciTolerancia', type: 'string'},
                    {name: 'deciPesoExceso', type: 'string'},
                    {name: 'intEsHijo', type: 'number'},
                    {name: 'Especi', type: 'string'},

                    //OBSERVACION ALGUNOS CAMPOS QUE FALTA PARA MOSTRAR LA GRILLA DE OBSERVACION CON EL ESTADO TERMINADO 

                    {name: 'varTipo', type: 'string'},
                    {name: 'deciPesoObse', type: 'string'},
                    {name: 'intIdDefe', type: 'string'},
                    {name: 'varDescDefe', type: 'string'},
                    {name: 'intIdCausa', type: 'number'},
                    {name: 'varDescCausa', type: 'string'},
                    {name: 'varAccion', type: 'string'},
                    {name: 'varOrigFalla', type: 'string'},
                    {name: 'varObse', type: 'string'},
                    {name: 'varMaterial', type: 'string'},
                    {name: 'intIdSuper', type: 'string'},
                    {name: 'fechaInsp', type: 'string'},
                    {name: 'IntCantNoConf', type: 'number'},
                    {name: 'Nombre', type: 'string'},
                    {name: 'TieneObs', type: 'string'},
                    {name: 'ConsumoPesoG', type: 'string'},
                    {name: 'ConsumoPesoN', type: 'string'},
                    {name: 'intCantTota_1', type: 'string'},
                    {name: 'intCantRegi_1', type: 'string'},
                    {name: 'deciPesoBruto_1', type: 'string'},
                    {name: 'deciPesoInge_1', type: 'string'},
                    {name: 'intIdObse', type: 'string'},
                    {name: 'intCantReg', type: 'string'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid_insp_galv").jqxGrid('clear');
            window.setTimeout(function () {

                $("#modal-cargar-insp-galv").modal('hide'); // COLOCO ANDY 
            }, 1000);

            if (idesta2 === "42") {
                if (check2 === "1") {

                    var opcion_archivo_2 = function (row, column, value, rowKey, rowData) {
                        var editrow = row;
                        var dataRecord = $("#grid_insp_galv").jqxGrid('getrowdata', editrow);
                        var archivo = "";

                        if (dataRecord.TieneObs === '1' && dataRecord.intIdObse === '0') {
                            archivo = '<center><button class="btn btn-danger btn-sm" onClick=observacion_1("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-file-alt"></i></button></center>';
                        } else if (dataRecord.intIdObse !== '0' && dataRecord.TieneObs === '0') {
                            archivo = '<center>SI</center>';
                        } else {
                            archivo = '<center>NO</center>';
                        }
                        return archivo;
                    };
                    $("#grid_insp_galv").jqxGrid({
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
                            {text: 'Observacion', width: '10%', datafield: 'Descargar', cellsrenderer: opcion_archivo_2, cellsalign: 'center'},
                            {text: 'IdGalva', datafield: 'intIdGalva', width: '10%', cellsalign: 'left', hidden: true},
                            {text: 'IdDetaGalva', datafield: 'intIdDetaGalv', width: '10%', cellsalign: 'left', hidden: true},
                            {text: 'IdPeriValor', datafield: 'intIdPeriValo', width: '10%', cellsalign: 'left', hidden: true},
                            {text: 'IdProy', datafield: 'intIdProy', width: '10%', cellsalign: 'left', hidden: true},
                            {text: 'IdTipoProducto', datafield: 'intIdTipoProducto', width: '10%', cellsalign: 'left', hidden: true},
                            {text: 'Tipo Orden', datafield: 'varTipoOrden', width: '10%', cellsalign: 'left'},
                            {text: 'Orden Servicio', datafield: 'varOrdenServi', width: '10%', cellsalign: 'left'},
                            {text: 'Proyecto', datafield: 'varCodiProy', width: '10%', cellsalign: 'left'},
                            {text: 'Elemento', datafield: 'varDescTipoProd', width: '10%', cellsalign: 'left'},
                            {text: 'Razo Social', datafield: 'varRazoSoci', width: '10%', cellsalign: 'left'},
                            {text: 'Tipo Galvanizado', datafield: 'varTipoGalv', width: '10%', cellsalign: 'left'},
                            {text: 'Numero Guia', datafield: 'varNumeGuia', width: '10%', cellsalign: 'left'},
                            {text: 'Ganchera', datafield: 'intGanchera', width: '10%', cellsalign: 'left'},
                            {text: 'Turno', datafield: 'varTurno', width: '10%', cellsalign: 'left'},
                            {text: 'Hora Entrada', datafield: 'varHoraEntr', width: '10%', cellsalign: 'left'},
                            {text: 'Hora Salida', datafield: 'varHoraSali', width: '10%', cellsalign: 'left'},
                            {text: 'Tipo Material', datafield: 'varTipoMate', width: '10%', cellsalign: 'left'},
                            {text: 'Material', datafield: 'varMaterial', width: '10%', cellsalign: 'left'},
                            {text: 'Cant', datafield: 'intCantidad', width: '10%', cellsalign: 'left'},
                            {text: 'Cant.Regi', datafield: 'intCantRegi', width: '10%', cellsalign: 'left'},
                            {text: 'A1-1', datafield: 'deciMuesA1_1', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA1_1']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]
                            },
                            {text: 'A1-2', datafield: 'deciMuesA1_2', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA1_2']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'A2-1', datafield: 'deciMuesA2_1', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA2_1']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'A2-2', datafield: 'deciMuesA2_2', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA2_2']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'A3-1', datafield: 'deciMuesA3_1', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA3_1']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'A3-2', datafield: 'deciMuesA3_2', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA3_2']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'A4-1', datafield: 'deciMuesA4_1', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA4_1']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'A4-2', datafield: 'deciMuesA4_2', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA4_2']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'A5-1', datafield: 'deciMuesA5_1', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA5_1']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'A5-2', datafield: 'deciMuesA5_2', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciMuesA5_2']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'Promedio', datafield: 'deciPromedio', width: '8%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciPromedio']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'Especificacion', datafield: 'Especi', width: '15%', cellsalign: 'left'}, //duda
                            //{text: 'Esp. Maximo', datafield: 'deciMaxiTota',width:'8%', cellsalign: 'left'},// en duda
                            {text: 'Peso Negro', datafield: 'deciPesoNegro', width: '10%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['ConsumoPesoG']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'Peso Galvanizado', datafield: 'deciPesoGalv', width: '10%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['ConsumoPesoN']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'Consumo Zinc', datafield: 'deciConsumoZinc', width: '10%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseFloat(record['deciConsumoZinc']) + parseFloat(aggregatedValue);
                                                    total = parseFloat(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'Zinc(%)', datafield: 'varPorcZinc', width: '10%', cellsalign: 'left', aggregatesrenderer: function (aggregates, column, element, record) {

                                    var sumQuantity = $("#grid_insp_galv").jqxGrid('getcolumnaggregateddata', 'deciConsumoZinc', ['sum']);
                                    var sumPrice = $("#grid_insp_galv").jqxGrid('getcolumnaggregateddata', 'ConsumoPesoG', ['sum']);

                                    sum = (sumQuantity.sum / sumPrice.sum) * 100;
                                    if (sum === 'NaN' | sum == 'Infinity') {
                                        return 0;
                                    } else {
                                        total = parseFloat(sum).toFixed(3);
                                        return total;
                                    }
                                }},
                            {text: 'Peso Esp Max', datafield: 'deciMaxiTota', width: '10%', cellsalign: 'left'},
                            {text: 'ConsumoPesoG', datafield: 'ConsumoPesoG', width: '10%', cellsalign: 'left', hidden: true},
                            {text: 'Peso Excesivo', datafield: 'deciPesoExceso', width: '10%', cellsalign: 'left'},
                            {text: 'Tolerancia', datafield: 'deciTolerancia', width: '10%', cellsalign: 'left'},
                            {text: 'Responsable', datafield: 'Nombre', width: '20%', cellsalign: 'left'}, //no envia el nombre del responsable
                            {text: 'Creado Por', datafield: 'acti_usua', width: '10%', cellsalign: 'left'},
                            {text: 'Creado el', datafield: 'acti_hora', width: '10%', cellsalign: 'left'},
                        ]
                    });
                } else if (check2 === "2") {

                    $("#grid_insp_galv").jqxGrid({
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

                            {text: 'Tipo Orden', datafield: 'varTipoOrden', width: '10%', cellsalign: 'left'},
                            {text: 'IdProy', datafield: 'intIdProy', width: '10%', cellsalign: 'left', hidden: true},
                            {text: 'IdTipoProducto', datafield: 'intIdTipoProducto', width: '10%', cellsalign: 'left', hidden: true},
                            {text: 'Orden Servicio', datafield: 'varOrdenServi', width: '10%', cellsalign: 'left'},
                            {text: 'Proyecto', datafield: 'varCodiProy', width: '10%', cellsalign: 'left'},
                            {text: 'Elemento', datafield: 'varDescTipoProd', width: '10%', cellsalign: 'left'},
                            {text: 'Numero Guia', datafield: 'varNumeGuia', width: '10%', cellsalign: 'left'},
                            {text: 'Ganchera', datafield: 'intGanchera', width: '10%', cellsalign: 'left'},
                            {text: 'Cant', datafield: 'intCantidad', width: '10%', cellsalign: 'left', aggregates: [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record) {

                                                    var total = 0;
                                                    total = parseInt(record['intCantidad']) + parseInt(aggregatedValue);
                                                    total = parseInt(total).toFixed(3);
                                                    return total;
                                                },
                                    }]},
                            {text: 'Tipo Observ', datafield: 'varTipo', width: '10%', cellsalign: 'left'},

                            {text: 'Cant. no confor', datafield: 'IntCantNoConf', width: '10%', cellsalign: 'left'}, //cantidad conforme
                            {text: 'Peso no confor', datafield: 'deciPesoObse', width: '10%', cellsalign: 'left'},
                            {text: 'Defecto', datafield: 'varDescDefe', width: '15%', cellsalign: 'left'},
                            {txt: 'Causa', datafield: 'varDescCausa', width: '15%', cellsalign: 'left'},
                            {txt: 'Accion', datafield: 'varAccion', width: '10%', cellsalign: 'left'},
                            {txt: 'Origen F', datafield: 'varOrigFalla', width: '10%', cellsalign: 'left'},
                            {txt: 'Observacion', datafield: 'varObse', width: '20%', cellsalign: 'left'},
                            {txt: 'Responsable', datafield: 'Nombre', width: '20%', cellsalign: 'left'},
                        ]
                    });
                }

            } else if (idesta2 === "41") {

                var opcion_archivo = function (row, column, value, rowKey, rowData) {
                    var editrow = row;
                    var dataRecord = $("#grid_insp_galv").jqxGrid('getrowdata', editrow);
                    var archivo = "";

                    archivo = '<center><button class="btn btn-danger btn-sm" onClick=desca_archi("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-file-alt"></i></button></center>';

                    return archivo;
                };
                $("#grid_insp_galv").jqxGrid({
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
                        {text: 'Opcion', width: '5%', datafield: 'Descargar', cellsrenderer: opcion_archivo, cellsalign: 'center'},
                        {text: 'Tipo Orden', datafield: 'varTipoOrden', width: '10%', cellsalign: 'left'},
                        {text: 'Proyecto', datafield: 'varCodiProy', width: '10%', cellsalign: 'left'},
                        {text: 'Elemento', datafield: 'varDescTipoProd', width: '10%', cellsalign: 'left'},
                        {text: 'Razo Social', datafield: 'varRazoSoci', width: '15%', cellsalign: 'left'},
                        {text: 'Orden Servicio', datafield: 'varOrdenServi', width: '10%', cellsalign: 'left'},
                        {text: 'Tipo Galvanizado', datafield: 'varTipoGalv', width: '10%', cellsalign: 'left'},
                        {text: 'Nùmero Guia', datafield: 'varNumeGuia', width: '10%', cellsalign: 'left'},
                        {text: 'Nùmero Ganchera', datafield: 'intGanchera', width: '10%', cellsalign: 'left'},
                        {text: 'Cant. Total', datafield: 'intCantidad', width: '10%', cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['intCantidad']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'Cant. Registro', datafield: 'intCantReg', width: '10%', cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['intCantReg']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'Tipo Material', datafield: 'varTipoMate', width: '10%', cellsalign: 'left'},
                        {text: 'Descripcion', datafield: 'varDescripcion', width: '10%', cellsalign: 'left'},
                        {text: 'Turno', datafield: 'varTurno', width: '10%', cellsalign: 'left'},
                        {text: 'Peso Negro', datafield: 'deciPesoNegro', width: '10%', cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total0;

                                                total = parseFloat(record['ConsumoPesoG']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);


                                                return total;
                                            },
                                }]},
                        {text: 'Peso Galvanizado', datafield: 'deciPesoGalv', width: '10%', cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total0;

                                                total = parseFloat(record['ConsumoPesoN']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);


                                                return total;




                                            },
                                }]},
                        {text: 'Consumo Zinc', datafield: 'deciConsumoZinc', width: '10%', cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;
                                                total = parseFloat(record['deciConsumoZinc']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'Zinc(%)', datafield: 'varPorcZinc', width: '10%', cellsalign: 'left', aggregatesrenderer: function (aggregates, column, element, record) {

                                var sumQuantity = $("#grid_insp_galv").jqxGrid('getcolumnaggregateddata', 'deciConsumoZinc', ['sum']);
                                var sumPrice = $("#grid_insp_galv").jqxGrid('getcolumnaggregateddata', 'ConsumoPesoG', ['sum']);
                                sum = (sumQuantity.sum / sumPrice.sum) * 100;
                                if (sum === 'NaN' | sum == 'Infinity') {
                                    return 0;
                                } else {
                                    total = parseFloat(sum).toFixed(3);
                                    return total;
                                }
                            }},

                        {text: 'Hora Entrada', datafield: 'varHoraEntr', width: '10%', cellsalign: 'left'},
                        {text: 'Hora Salida', datafield: 'varHoraSali', width: '10%', cellsalign: 'left'},

                        {text: 'Fecha Inicio', datafield: 'dateFechInic', width: '10%', cellsalign: 'left'},
                        {text: 'Fecha Final', datafield: 'dateFechSali', width: '10%', cellsalign: 'left'},
                        {text: 'Creado Por', datafield: 'acti_usua', width: '10%', cellsalign: 'left'},
                        {text: 'creado el', datafield: 'acti_hora', width: '10%', cellsalign: 'left'},
                        {text: 'Modificado Por', datafield: 'usua_modi', width: '10%', cellsalign: 'left'},
                        {text: 'Modificado el', datafield: 'hora_modi', width: '10%', cellsalign: 'left'},
                        {text: 'Fecha Ingreso', datafield: 'dateFechIngr', width: '10%', cellsalign: 'left'},
                        {text: 'Fecha Internamiento', datafield: 'dateFechIntern', width: '10%', cellsalign: 'left'},
                        {text: 'Peso Ingreso', datafield: 'deciPesoInge', width: '10%', cellsalign: 'left', hidden: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoInge_1']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'Cantidad', datafield: 'a', width: '10%', cellsalign: 'left', hidden: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['intCantidad']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'ConsumoPesoG', datafield: 'ConsumoPesoG', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'Hijo', datafield: 'intEsHijo', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'IdGalva', datafield: 'intIdGalva', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'IdDetaGalva', datafield: 'intIdDetaGalv', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'IdPeriValor', datafield: 'intIdPeriValo', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'IdEsta', datafield: 'intIdEsta', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'IdUniNego', datafield: 'intIdUniNego', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'IdProy', datafield: 'intIdProy', width: '10%', cellsalign: 'left', hidden: true},
                        {text: 'IdTipoProducto', datafield: 'intIdTipoProducto', width: '10%', cellsalign: 'left', hidden: true},
                    ]
                });

            }

        }
    });
}
function combo_opcion() {
    var tipo_opcion = [{'value': '1', 'label': 'CONTROL DE MICRAJE SIN OBSERVACION'}, {'value': '2', 'label': 'CONTROL DE MICRAJE CON OBSERVACION'}];
    var source =
            {
                localdata: tipo_opcion,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#ideleccion").jqxDropDownList({template: "primary", placeHolder: "SELECCIONE:", source: dataAdapter, displayMember: "label", valueMember: "value", width: 170, height: 27});
    // Focus the jqxDropDownList

    $("#ideleccion").jqxDropDownList('focus');
    $("#ideleccion").jqxDropDownList('selectIndex', -1);

}
function combo_defecto() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/lista_defecto_etapa',
        dataType: 'json',
        data: {
            intIdEtapa: parseInt(6)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        }, //contratista_avance_lote_pint
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        height: '50%',
                        datafields: [
                            {name: 'intIdDefe'},
                            {name: 'varDescDefe'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#idefecto_obser").jqxDropDownList({source: dataAdapter, displayMember: "varDescDefe", valueMember: "intIdDefe", width: 170, height: 21});
            $("#idefecto_obser").jqxDropDownList('focus');
            $("#idefecto_obser").jqxDropDownList('selectIndex', 0);
        }
    });
}
function causa() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_causa',
        dataType: 'json',

        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        }, //contratista_avance_lote_pint
        success: function (responses) {
            //console.log(responses);
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        height: '50%',
                        datafields: [
                            {name: 'intIdCausa'},
                            {name: 'varDescCausa'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#idcausa_obser").jqxDropDownList({source: dataAdapter, displayMember: "varDescCausa", valueMember: "intIdCausa", width: 150, height: 21});
            $("#idcausa_obser").jqxDropDownList('focus');
            $("#idcausa_obser").jqxDropDownList('selectIndex', 0);
        }
    });
}
function combo_responsable_metraje() {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/obte_supe_con_id_etap',
        dataType: 'json',
        data: {
            intIdEtapa: parseInt(6)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            //  console.log(responses);
            let array_respon = [];

            responses.data.forEach(element => {
                array_respon.push(element);
            });

            var source =
                    {
                        localdata: array_respon.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'intIdColaborador'},
                            {name: 'nombre'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#idrespo_cont_metr").jqxDropDownList({placeHolder: "SELECCIONE:", source: dataAdapter, displayMember: "nombre", valueMember: "intIdColaborador", width: 240, height: 21});
            $("#idrespo_cont_metr").jqxDropDownList('focus');
            $("#idrespo_cont_metr").jqxDropDownList('selectIndex', -1);
        }
    });
}
//COMBO DE OBSERVACION 
function combo_responsable_observ() {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/obte_supe_con_id_etap',
        dataType: 'json',
        data: {
            intIdEtapa: parseInt(6)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            //  console.log(responses);
            let array_respon = [];

            responses.data.forEach(element => {
                array_respon.push(element);
            });

            var source =
                    {
                        localdata: array_respon.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'intIdColaborador'},
                            {name: 'nombre'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#idrespo_obser").jqxDropDownList({placeHolder: "SELECCIONE:", source: dataAdapter, displayMember: "nombre", valueMember: "intIdColaborador", width: 300, height: 21});
            $("#idrespo_obser").jqxDropDownList('focus');
            $("#idrespo_obser").jqxDropDownList('selectIndex', -1);
        }
    });
}
//COMBO ESPECIFICACION
function combo_especificacion() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/listar_especificaciones_lista',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            let new_espe = [];

            responses.data.forEach(element => {
                if (element.intIdEsta !== 14) {
                    new_espe.push(element)
                }

            });

            var source =
                    {
                        localdata: new_espe,
                        datatype: "array",
                        height: '50%',
                        datafields: [
                            {name: 'intIdEspeci'},
                            {name: 'varTipoMate'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#espec_cont_metr").jqxDropDownList({placeHolder: "SELECCIONE:", source: dataAdapter, displayMember: "varTipoMate", valueMember: "intIdEspeci", width: 150, height: 21});
            $("#espec_cont_metr").jqxDropDownList('focus');
            $("#espec_cont_metr").jqxDropDownList('selectIndex', -1);
        }
    });
}
function obtener_especificacion(idespecificacion) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/get_especificacion',
        dataType: 'json',
        data: {
            intIdEspeci: parseInt(idespecificacion)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        }, //contratista_avance_lote_pint
        success: function (responses) {

            esp_max_cont_metr_value = 0;
            esp_max_cont_metr_value = parseFloat(responses.data[0].deciEspeciMax);

            $("#esp_max_cont_metr").val(esp_max_cont_metr_value);

            tolerancia = parseFloat((promedio / esp_max_cont_metr_value) * 100);
            total_max_total = (consumo_zinc * esp_max_cont_metr_value) / promedio;

            $("#tole_cont_metr").val(tolerancia.toFixed(3));
            $("#esp_max_total_cont_metr").val(total_max_total.toFixed(3));
        }
    });
}
//espectacular  esp_max_cont_metr
$("#espec_cont_metr").on('change', function (event) {
    espec_cont_value = "";

    if (event.args) {
        let item = event.args.item;
        if (item) {
            espec_cont_value = parseFloat(item.value);
            obtener_especificacion(espec_cont_value);
        }
        if (espec_cont_value) {
            document.getElementById("a1_1_cont_metr").disabled = false;
            document.getElementById("a1_2_cont_metr").disabled = false;
            document.getElementById("a2_1_cont_metr").disabled = false;
            document.getElementById("a2_2_cont_metr").disabled = false;
            document.getElementById("a3_1_cont_metr").disabled = false;
            document.getElementById("a3_2_cont_metr").disabled = false;
            document.getElementById("a4_1_cont_metr").disabled = false;
            document.getElementById("a4_2_cont_metr").disabled = false;
            document.getElementById("a5_1_cont_metr").disabled = false;
            document.getElementById("a5_2_cont_metr").disabled = false;



        }


        // $("#tole_cont_metr").val(tolerancia.toFixed(3));
        // $("#esp_max_total_cont_metr").val(total_max_total.toFixed(3));

    }



});
function desca_archi(idgalv) {
    fecha_inicio = "";
    hora_entr = "";
    consumo_zinc = 0;
    orden_servi = "";
    idproy = 0;
    codiproy = "";
    tipoorden = "";
    turno = "";
    razon = "";
    num_guia = "";
    cantidad = "";
    tipo_mate = "";
    peso_negro = "";
    peso_galvanizado = "";
    consu_zinc = "";
    porce_zinc = "";
    iddetagalv = 0;
    id_insp_galv = 0;
    hijo = 0;
    descripcion = "";
    cantidad_original = 0;
    var dataRecord = $("#grid_insp_galv").jqxGrid('getrowdata', idgalv);

    let opciones = $("input:checked").val();
    let ot_os = "";
    //console.log(dataRecord);
    consumo_zinc = parseFloat(dataRecord.deciConsumoZinc);
    //VARIALBES GLOBALES
    id_insp_galv = dataRecord.intIdInspGalv;
    hijo = dataRecord.intEsHijo;
    iddetagalv = dataRecord.intIdDetaGalv;
    cantidad_inspeccion(iddetagalv);

    orden_servi = dataRecord.varOrdenServi;
    idproy = dataRecord.intIdProy;
    codiproy = dataRecord.varCodiProy;
    tipoorden = dataRecord.varTipoOrden;
    turno = dataRecord.varTurno;
    /*fecha de ingreso  */
    fecha_inicio = dataRecord.dateFechInic;
    hora_entr = dataRecord.varHoraEntr;
    fechafin = dataRecord.dateFechSali;
    hora_salida = dataRecord.varHoraSali;
    intGanchera = dataRecord.intGanchera;
    cantidad_original = dataRecord.intCantReg;
    razon = dataRecord.varRazoSoci;
    num_guia = dataRecord.varNumeGuia;

    tipo_mate = dataRecord.varTipoMate;
    peso_negro = dataRecord.deciPesoNegro;
    peso_galvanizado = dataRecord.deciPesoGalv;
    consu_zinc = dataRecord.deciConsumoZinc;
    porce_zinc = dataRecord.varPorcZinc + "%";
    ganchera = dataRecord.intGanchera;
    descripcion = dataRecord.varDescripcion;
    combo_opcion();
    $("#modal-pregunta-opcion").modal('show');
}

function observacion_1(idgalv) {
    fecha_inicio = "";
    hora_entr = "";
    consumo_zinc = 0;
    orden_servi = "";
    idproy = 0;
    codiproy = "";
    tipoorden = "";
    turno = "";
    razon = "";
    num_guia = "";
    cantidad = "";
    tipo_mate = "";
    peso_negro = "";
    peso_galvanizado = "";
    consu_zinc = "";
    porce_zinc = "";
    iddetagalv = 0;
    id_insp_galv = 0;
    hijo = 0;
    descripcion = "";

    var dataRecord = $("#grid_insp_galv").jqxGrid('getrowdata', idgalv);

    let opciones = $("input:checked").val();
    let ot_os = "";
    //console.log(dataRecord);
    consumo_zinc = parseFloat(dataRecord.deciConsumoZinc);
    //VARIALBES GLOBALES
    id_insp_galv = dataRecord.intIdInspGalv;
    hijo = dataRecord.intEsHijo;
    iddetagalv = dataRecord.intIdDetaGalv;
    cantidad_inspeccion(iddetagalv);

    orden_servi = dataRecord.varOrdenServi;
    idproy = dataRecord.intIdProy;
    codiproy = dataRecord.varCodiProy;
    tipoorden = dataRecord.varTipoOrden;
    turno = dataRecord.varTurno;
    cantidad = dataRecord.intCantidad;
    cantidad_original = dataRecord.intCantReg;
    /*fecha de ingreso  */
    fecha_inicio = dataRecord.dateFechInic;
    hora_entr = dataRecord.varHoraEntr;
    fechafin = dataRecord.dateFechSali;
    hora_salida = dataRecord.varHoraSali;
    intGanchera = dataRecord.intGanchera;

    razon = dataRecord.varRazoSoci;
    num_guia = dataRecord.varNumeGuia;

    tipo_mate = dataRecord.varTipoMate;
    peso_negro = dataRecord.deciPesoNegro;
    peso_galvanizado = dataRecord.deciPesoGalv;
    consu_zinc = dataRecord.deciConsumoZinc;
    porce_zinc = dataRecord.varPorcZinc + "%";
    ganchera = dataRecord.intGanchera;
    descripcion = dataRecord.varDescripcion;
    combo_opcion();
    if (orden_servi === null) {
        //hidde_grid
        //OBSERVACION
        $("#mostrar_ot").removeClass('hidde_grid');
        $("#mostrar_os").addClass('hidde_grid');
        $("#ot_os_obsev_value").val(idproy);
        $("#ot_os_obsev").val(codiproy);
        $("#mostrar_guia_observ").removeClass('hidde_grid');

    } else {
        //OBSERVACION
        $("#mostrar_os").removeClass('hidde_grid');
        $("#mostrar_ot").addClass('hidde_grid');
        $("#ot_os_obsev_value").val(orden_servi);
        $("#ot_os_obsev").val(orden_servi);
        $("#mostrar_guia_observ").addClass('hidde_grid');

    }
    document.getElementById('inlineRadio11').checked = true;
    combo_responsable_observ();
    causa();
    combo_defecto();
    capturar_incio_check();
    $("#clie_obser").val(razon);
    $("#guia_obser").val(num_guia);
    $("#num_ganch").val(ganchera);
    $("#tipo_mate_insp_obse").val(tipo_mate);
    $("#canti_insp_obse").val(cantidad);
    $("#modal-observacion").modal('show');

}

function cantidad_inspeccion(id) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/cantidad_inspeccion',
        dataType: 'json',
        data: {
            intIdDetaGalv: id

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        }, //contratista_avance_lote_pint
        success: function (responses) {
            cantidad = responses.data;
            cntidad_inspeccionar = responses.data;
        }
    });
}
function listar_detalle(id) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/detalle_inspeccion',
        dataType: 'json',
        data: {
            intIdDetaGalv: id

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        }, //contratista_avance_lote_pint
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'deciPesoNegro', type: 'string'},
                    {name: 'deciPesoGalv', type: 'string'},
                    {name: 'deciConsumoZinc', type: 'string'},
                    {name: 'varPorcZinc', type: 'string'},
                    {name: 'varPorcZinc', type: 'string'},
                    {name: 'especificacion', type: 'string'},
                    {name: 'deciEspeciMax', type: 'string'},
                    {name: 'deciPromedio', type: 'string'},
                    {name: 'deciMaxiTota', type: 'string'},
                    {name: 'deciTolerancia', type: 'string'},
                    {name: 'deciPesoExceso', type: 'string'},
                    {name: 'deciMuesA1_1', type: 'string'},
                    {name: 'deciMuesA1_2', type: 'string'},
                    {name: 'deciMuesA2_1', type: 'string'},
                    {name: 'deciMuesA2_2', type: 'string'},
                    {name: 'deciMuesA3_1', type: 'string'},
                    {name: 'deciMuesA3_2', type: 'string'},
                    {name: 'deciMuesA4_1', type: 'string'},
                    {name: 'deciMuesA4_2', type: 'string'},
                    {name: 'deciMuesA5_1', type: 'string'},
                    {name: 'deciMuesA5_2', type: 'string'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            var dataAdapter = new $.jqx.dataAdapter(source);


            $("#grid_det_insp_galv").jqxGrid({
                width: '100%',
                height: '200',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                showfilterrow: true,
                filterable: true,
                selectionmode: 'multiplecellsextended',
                sortable: true,
                theme: 'darkblue',
                columns: [

                    {text: 'Peso Negro', datafield: 'deciPesoNegro', width: '10%', cellsalign: 'left'},
                    {text: 'Peso Galva.', datafield: 'deciPesoGalv', width: '10%', cellsalign: 'left'},
                    {text: 'Consumo', datafield: 'deciConsumoZinc', width: '10%', cellsalign: 'left'},
                    {text: 'Zinc(%)', datafield: 'varPorcZinc', width: '10%', cellsalign: 'left'},
                    {text: 'Especificaciòn', datafield: 'especificacion', width: '10%', cellsalign: 'left'},
                    {text: 'Esp. Max.', datafield: 'deciEspeciMax', width: '10%', cellsalign: 'left'},
                    {text: 'Promedio', datafield: 'deciPromedio', width: '10%', cellsalign: 'left'},
                    {text: 'Peso Max. Total', datafield: 'deciMaxiTota', width: '10%', cellsalign: 'left'},
                    {text: 'Tolerancia', datafield: 'deciTolerancia', width: '10%', cellsalign: 'left'},
                    {text: 'Exceso', datafield: 'deciPesoExceso', width: '10%', cellsalign: 'left'},
                    {text: 'A1-1', datafield: 'deciMuesA1_1', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA1_1']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]
                    },
                    {text: 'A1-2', datafield: 'deciMuesA1_2', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA1_2']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'A2-1', datafield: 'deciMuesA2_1', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA2_1']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'A2-2', datafield: 'deciMuesA2_2', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA2_2']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'A3-1', datafield: 'deciMuesA3_1', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA3_1']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'A3-2', datafield: 'deciMuesA3_2', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA3_2']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'A4-1', datafield: 'deciMuesA4_1', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA4_1']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'A4-2', datafield: 'deciMuesA4_2', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA4_2']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'A5-1', datafield: 'deciMuesA5_1', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA5_1']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                    {text: 'A5-2', datafield: 'deciMuesA5_2', width: '8%', cellsalign: 'left', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['deciMuesA5_2']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        },
                            }]},
                ]
            });
        }
    });
}
//ELEGIR LA OPCION ACEPTAR 
$("#opci_acep").click(function () {
    let elegir = $("#ideleccion").val();
    //console.log(elegir);
    if (elegir === "") {
        mensaje(false, "ELIGA UNA OPCION", "no");
    } else if (elegir === "1") {
        observacion = 0;
        document.querySelector('#tipo_control').innerText = 'CONTROL DE MICRAJE SIN OBSERVACION';
    } else if (elegir === "2") {
        observacion = 1;
        document.querySelector('#tipo_control').innerText = 'CONTROL DE MICRAJE CON OBSERVACION';
    }
    $("#modal-pregunta-opcion").modal('hide');

    if (orden_servi === null) {
        //hidde_grid
        //CONTROL DE METRAJE mostrar_ot_contr_metr //  mostrar_os_contr_metr
        $("#mostrar_ot_contr_metr").removeClass('hidde_grid');
        $("#mostrar_os_contr_metr").addClass('hidde_grid');
        $("#ot_os_cont_metr_value").val(idproy);
        $("#ot_os_cont_metr").val(codiproy);
        $("#mostrar_guia").removeClass("hidde_grid");
        document.getElementById('canti_cont_metro').disabled = true;
        document.getElementById('peso_negr_cont_metro').disabled = true;
        document.getElementById('peso_galv_cont_metro').disabled = true;
        document.getElementById('consu_cont_metro').disabled = true;
        document.getElementById('zinc_cont_metro').disabled = true;
    } else {
        //CONTROL DE METRAJE
        $("#mostrar_ot_contr_metr").addClass('hidde_grid');
        $("#mostrar_os_contr_metr").removeClass('hidde_grid');
        $("#ot_os_cont_metr_value").val(orden_servi);
        $("#ot_os_cont_metr").val(orden_servi);
        $("#mostrar_guia").addClass("hidde_grid");
        document.getElementById('canti_cont_metro').disabled = true;
        document.getElementById('peso_negr_cont_metro').disabled = true;
        document.getElementById('peso_galv_cont_metro').disabled = true;
        document.getElementById('consu_cont_metro').disabled = true;
        document.getElementById('zinc_cont_metro').disabled = true;
    }
    tipo_material();
    combo_responsable_metraje();
    combo_especificacion();
    $("#tipo_orde_cont_metro").val(tipoorden);
    $("#turn_cont_metro").val(turno);
    $("#fech_cont_metro").val(fecha_inicio);
    $("#hora_cont_metro").val(hora_entr);
    $("#fech_fin_cont_metro").val(fechafin);
    $("#hora_fin_cont_metro").val(hora_salida);
    $("#cli_cont_metro").val(razon);
    $("#guia_cont_metro").val(num_guia);
    $("#canti_cont_metro").val(cantidad);
    $("#canti_cont_metro_insp").val(cntidad_inspeccionar);
    $("#tipo_mate_cont_metro").val(tipo_mate);
    $("#tipo_mate_cont_metro").jqxDropDownList({disabled: true});
    $("#int_ganchera").val(intGanchera);
    $("#peso_negr_cont_metro").val(peso_negro);
    $("#peso_galv_cont_metro").val(peso_galvanizado);
    $("#consu_cont_metro").val(consu_zinc);
    $("#zinc_cont_metro").val(porce_zinc);
    $("#mate_cont_metro").val(descripcion);
    $("#espec_cont_metr").val('0');
    $("#prome_cont_metr").val('0');
    $("#esp_max_total_cont_metr").val('0');
    $("#tole_cont_metr").val('0');
    $("#exce_cont_metr").val('0');
    $("#esp_max_cont_metr").val('0');
    $("#a1_1_cont_metr").val('0');
    $("#a1_2_cont_metr").val('0');
    $("#a2_1_cont_metr").val('0');
    $("#a2_2_cont_metr").val('0');
    $("#a3_1_cont_metr").val('0');
    $("#a3_2_cont_metr").val('0');
    $("#a4_1_cont_metr").val('0');
    $("#a4_2_cont_metr").val('0');
    $("#a5_1_cont_metr").val('0');
    $("#a5_2_cont_metr").val('0');
    listar_detalle(iddetagalv);
    if (cantidad_original === '0') {

    } else {
        $("#editar_cantidades").trigger("click");
    }
    $("#modal-control-metraje").modal('show');

});
function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}
function soloNumerospunto(e) {

    var key = window.Event ? e.which : e.keyCode

    return (key >= 48 && key <= 57) || key == 46
}
var promedio = 0;
function sumar_promedios() {
    var promedio = 0;
    var tolerancia = 0;
    var total_max_total = 0;
    var valor1_1 = document.getElementById("a1_1_cont_metr").value;
    var valor1_2 = document.getElementById("a1_2_cont_metr").value;
    var valor2_1 = document.getElementById("a2_1_cont_metr").value;
    var valor2_2 = document.getElementById("a2_2_cont_metr").value;
    var valor3_1 = document.getElementById("a3_1_cont_metr").value;
    var valor3_2 = document.getElementById("a3_2_cont_metr").value;
    var valor4_1 = document.getElementById("a4_1_cont_metr").value;
    var valor4_2 = document.getElementById("a4_2_cont_metr").value;
    var valor5_1 = document.getElementById("a5_1_cont_metr").value;
    var valor5_2 = document.getElementById("a5_2_cont_metr").value;

    if (valor1_1 === "") {
        valor1_1 = 0;
    } else {
        valor1_1 = valor1_1;
    }
    if (valor1_2 === "") {
        valor1_2 = 0;
    } else {
        valor1_2 = valor1_2;
    }
    if (valor2_1 === "") {
        valor2_1 = 0;
    } else {
        valor2_1 = valor2_1;
    }
    if (valor2_1 === "") {
        valor2_1 = 0;
    } else {
        valor2_1 = valor2_1;
    }
    if (valor2_2 === "") {
        valor2_2 = 0;
    } else {
        valor2_2 = valor2_2;
    }
    if (valor3_1 === "") {
        valor3_1 = 0;
    } else {
        valor3_1 = valor3_1;
    }
    if (valor3_2 === "") {
        valor3_2 = 0;
    } else {
        valor3_2 = valor3_2;
    }
    if (valor4_1 === "") {
        valor4_1 = 0;
    } else {
        valor4_1 = valor4_1;
    }
    if (valor4_2 === "") {
        valor4_2 = 0;
    } else {
        valor4_2 = valor4_2;
    }
    if (valor5_1 === "") {
        valor5_1 = 0;
    } else {
        valor5_1 = valor5_1;
    }
    if (valor5_2 === "") {
        valor5_2 = 0;
    } else {
        valor5_2 = valor5_2;
    }



    promedio = (parseFloat(valor1_1) + parseFloat(valor1_2) + parseFloat(valor2_1) + parseFloat(valor2_2) + parseFloat(valor3_1) + parseFloat(valor3_2) + parseFloat(valor4_1) + parseFloat(valor4_2) + parseFloat(valor5_1) + parseFloat(valor5_2)) / 10;

    total_max_total = (consumo_zinc * esp_max_cont_metr_value) / promedio;
    exceso = total_max_total.toFixed(3) - consumo_zinc;
    if (exceso > 0) {
        exceso = 0;
        document.getElementById("exce_cont_metr").value = exceso.toFixed(3);
    } else {
        document.getElementById("exce_cont_metr").value = exceso.toFixed(3) * -1;
    }
    tolerancia = parseFloat((promedio / esp_max_cont_metr_value) * 100);
    document.getElementById("prome_cont_metr").value = promedio.toFixed(3);
    document.getElementById("esp_max_total_cont_metr").value = total_max_total.toFixed(3);
    document.getElementById("tole_cont_metr").value = tolerancia.toFixed(3);
}
// FORMULA PARA EL PROMEDIO 

function limpiar_control_mecraje() {
    $("#idrespo_cont_metr").val('');
    $("#idrespo_cont_metr").jqxDropDownList('clear');
    $("#idrespo_cont_metr").jqxDropDownList('selectIndex', -1);
    $("#espec_cont_metr").val('');
    $("#espec_cont_metr").jqxDropDownList('clear');
    $("#espec_cont_metr").jqxDropDownList('selectIndex', -1);
    $("#mate_cont_metro").val('');
    $("#esp_max_cont_metr").val('');
    $("#prome_cont_metr").val('');
    $("#esp_max_total_cont_metr").val('');
    $("#tole_cont_metr").val('');
    $("#a1_1_cont_metr").val('');
    $("#a1_2_cont_metr").val('');
    $("#a2_1_cont_metr").val('');
    $("#a2_2_cont_metr").val('');
    $("#a3_1_cont_metr").val('');
    $("#a3_2_cont_metr").val('');
    $("#a4_1_cont_metr").val('');
    $("#a4_2_cont_metr").val('');
    $("#a5_1_cont_metr").val('');
    $("#a15_2_cont_metr").val('');

    document.getElementById("a1_1_cont_metr").disabled = true;
    document.getElementById("a1_2_cont_metr").disabled = true;
    document.getElementById("a2_1_cont_metr").disabled = true;
    document.getElementById("a2_2_cont_metr").disabled = true;
    document.getElementById("a3_1_cont_metr").disabled = true;
    document.getElementById("a3_2_cont_metr").disabled = true;
    document.getElementById("a4_1_cont_metr").disabled = true;
    document.getElementById("a4_2_cont_metr").disabled = true;
    document.getElementById("a5_1_cont_metr").disabled = true;
    document.getElementById("a5_2_cont_metr").disabled = true;


}
$("#btn_cerrar_cont_met").click(function () {
    limpiar_control_mecraje();
});
//cerrar pregunta
$("#close_btn_clear").click(function () {
    $("#ideleccion").val('');
    $("#ideleccion").jqxDropDownList('clear');
    $("#ideleccion").jqxDropDownList('selectIndex', -1);
    $("#modal-pregunta-opcion").modal('hide');
});
//GUARDAR EL METRAJE  
$("#grab_cont_met").click(function () {
    let idresponsable = $("#idrespo_cont_metr").val();
    let especificacion = $("#espec_cont_metr").val();
    let material = $("#mate_cont_metro").val();
    let promedio = $("#prome_cont_metr").val();
    let pes_max = $("#exce_cont_metr").val();
    let peso_max_total = $("#esp_max_total_cont_metr").val();
    let tipo_mate = $("#tipo_mate_cont_metro").val();
    let tole = $("#tole_cont_metr").val();
    let canti = $("#canti_cont_metro").val();
    let pesonegro = $("#peso_negr_cont_metro").val();
    let peso_galvanizado = $("#peso_galv_cont_metro").val();
    let consum = $("#consu_cont_metro").val();
    let zinc_por = $("#zinc_cont_metro").val();
    let valor1_1 = $("#a1_1_cont_metr").val();
    let valor1_2 = $("#a1_2_cont_metr").val();
    let valor2_1 = $("#a2_1_cont_metr").val();
    let valor2_2 = $("#a2_2_cont_metr").val();
    let valor3_1 = $("#a3_1_cont_metr").val();
    let valor3_2 = $("#a3_2_cont_metr").val();
    let valor4_1 = $("#a4_1_cont_metr").val();
    let valor4_2 = $("#a4_2_cont_metr").val();
    let valor5_1 = $("#a5_1_cont_metr").val();
    let valor5_2 = $("#a5_2_cont_metr").val();

    if (idresponsable === "") {
        mensaje(false, "Selecciones el responsable", "no");
    } else {
        if (material === "") {
            mensaje(false, "Ingrese el Material", "no");
        } else {
            if (especificacion === "") {
                mensaje(false, "Seleccione la especificacion", "no");
            } else {
                if ( pesonegro === "" || pesonegro=== "0") {
                    mensaje(false, "Ingrese peso Negro", "no");
                } else {
                    if (peso_galvanizado=== "" || peso_galvanizado=== "0") {
                        mensaje(false, "Ingrese peso Galvanizado", "no");
                    } else {
                        if (valor1_1 === "" || valor1_1 === "0") {
                            mensaje(false, "Ingrese el Primer campo del Grupo a A1", "no");
                        } else {
                            if (valor1_2 === "" || valor1_2 === "0") {
                                mensaje(false, "Ingrese el Segundo campo del Grupo a A1", "no");
                            } else {
                                if (valor2_1 === "" || valor2_1 === "0") {
                                    mensaje(false, "Ingrese el Primer campo del Grupo a A2", "no");
                                } else {
                                    if (valor2_2 === "" || valor2_2 === "0") {
                                        mensaje(false, "Ingrese el Segundo campo del Grupo a A2", "no");
                                    } else {
                                        if (valor3_1 === "" || valor3_1 === "0") {
                                            mensaje(false, "Ingrese el Primer campo del Grupo a A3", "no");
                                        } else {
                                            if (valor3_2 === "" || valor3_2 === "0") {
                                                mensaje(false, "Ingrese el Segundo campo del Grupo a A3", "no");
                                            } else {
                                                if (valor4_1 === "" || valor4_1 === "0") {
                                                    mensaje(false, "Ingrese el Primer campo del Grupo a A4", "no");
                                                } else {
                                                    if (valor4_2 === "" || valor4_2 === "0") {
                                                        mensaje(false, "Ingrese el Segundo campo del Grupo a A4", "no");
                                                    } else {
                                                        if (valor5_1 === "" || valor5_1 === "0") {
                                                            mensaje(false, "Ingrese el Primer campo del Grupo a A5", "no");
                                                        } else {
                                                            if (valor5_2 === "" || valor5_2 === "0") {
                                                                mensaje(false, "Ingrese el Segundo campo del Grupo a A5", "no");
                                                            } else {
                                                                // console.log(idresponsable,material,especificacion,valor1_1,valor1_2,valor2_1,valor2_2,valor3_1,valor3_2,valor3_2,valor4_1,valor4_2,valor5_1,valor5_2,promedio,iddetagalv,id_insp_galv,hijo);
                                                                guardar_micraje(iddetagalv, especificacion, valor1_1, valor1_2, valor2_1, valor2_2, valor3_1, valor3_2, valor4_1, valor4_2, valor5_1, valor5_2, promedio, peso_max_total, tipo_mate, idresponsable, tole, pes_max, canti, pesonegro, peso_galvanizado, consum, zinc_por, material);

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
                }

            }
        }
    }


});
//GUARDAR OBSERVACION

$("#guardar_observ").click(function () {
    let supervi = $("#idrespo_obser").val();
    let fecha_inici = $("#fecha_inicio_obser").val();
    let tipo_mate_obser = $("#tipo_mate_insp_obse").val();
    let material = $("#mate_insp_obse").val();
    let cant_noconfor = $("#canti_no_confo").val();
    let cantidades = $("#canti_insp_obse").val();
    let pesoobserv = $("#peso_observado").val();
    let accion = $("#accion_insp").val();
    let origen = $("#orig_fall").val();
    let defecto = $("#idefecto_obser").val();
    let causa = $("#idcausa_obser").val();
    let check_obse = $("input:checked").val();
    let obse_gene = $("#obse_gene_lote").val();
    let label_cheked = "";
    // console.log(fecha_inici,material,cant_noconfor,pesoobserv,accion,origen,defecto,causa,check_obse,obse_gene);
    if (check_obse === "1") {

    } else if (check_obse === "2") {

    }
    if (supervi === "") {

        mensaje(false, "SELECCIONE EL RESPONSABLE", "no");
    } else {
        if (fecha_inici === "") {
            mensaje(false, "INGRESE LA FECHA", "no");
        } else {
            if (material === "") {
                mensaje(false, "INGRESE EL MATERIAL", "no");
            } else {
                if (cant_noconfor === "") {
                    mensaje(false, "INGRESE LA CANTIDAD NO CONFORME", "no");
                } else if (parseInt(cant_noconfor) > parseInt(cantidades)) {
                    mensaje(false, "LA CANTIDAD NO CONFORME ES MAYOR A LA CANTIDAD: " + cantidades, "no");
                } else {
                    if (pesoobserv === "") {
                        mensaje(false, "INGRESE PESO OBSERVADO", "no");
                    } else {
                        if (accion === "") {
                            mensaje(false, "INGRESE LA ACCION", "no");
                        } else {
                            if (origen === "") {
                                mensaje(false, "INGRESE EL ORIGEN FALLA", "no");
                            } else {
                                if (defecto === "") {
                                    mensaje(false, "SELECCIONE EL DEFECTO", "no");
                                } else {
                                    if (causa === "") {
                                        mensaje(false, "SELECCIONE LA CAUSA", "no");
                                    } else {
                                        // console.log(supervi,fecha_inici,material,cant_noconfor,pesoobserv,accion,origen,defecto,causa,check_obse,obse_gene);
                                        //  console.log(iddetagalv,tipo_mate_obser,cantidades,pesoobserv,defecto,causa,accion,origen,obse_gene,tipo_mate_obser,material,supervi,fecha_inici,check_obse);
                                        guardar_obser(iddetagalv, tipo_mate_obser, cantidades, pesoobserv, defecto, causa, accion, origen, obse_gene, tipo_mate_obser, material, supervi, fecha_inici, check_obse, cant_noconfor);
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
$("#btn_cerrar_obser").click(function () {
    limpiar_observacion();
    $("#modal-observacion").modal('hide');
});
function limpiar_observacion() {
    document.getElementById("inlineRadio11").checked = true;
    document.getElementById("inlineRadio22").checked = false;
    $("#fecha_inicio_obser").val('');
    $("#mate_insp_obse").val('');
    $("#canti_no_confo").val('');
    $("#peso_observado").val('');
    $("#accion_insp").val('');
    $("#orig_fall").val('');
    $("#obse_gene_lote").val('');
}
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}
//function para micraje 
function guardar_micraje(iddetagalv2, especificacion2, valor1_12, valor1_22, valor2_12, valor2_22, valor3_12, valor3_22, valor4_12, valor4_22, valor5_12, valor5_22, promedio2, peso_max_total2, tipo_mate2, idresponsable2, tole2, pes_max2, canti2, pesonegro2, peso_galvanizado2, consum2, zinc_por2, material2) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/crear_inspeccion_galvanizado',
        dataType: 'json',
        data: {
            intIdDetaGalv: iddetagalv2,
            intIdEspeci: especificacion2,
            deciMuesA1_1: valor1_12,
            deciMuesA1_2: valor1_22,
            deciMuesA2_1: valor2_12,
            deciMuesA2_2: valor2_22,
            deciMuesA3_1: valor3_12,
            deciMuesA3_2: valor3_22,
            deciMuesA4_1: valor4_12,
            deciMuesA4_2: valor4_22,
            deciMuesA5_1: valor5_12,
            deciMuesA5_2: valor5_22,
            deciPromedio: promedio2,
            deciMaxiTota: peso_max_total2,
            varTipoMaterial: tipo_mate2,
            intIdSuper: idresponsable2,
            deciTolerancia: tole2,
            deciPesoExceso: pes_max2,
            intCantidad: canti2,
            deciPesoNegro: pesonegro2,
            deciPesoGalv: peso_galvanizado2,
            deciConsumoZinc: consum2,
            varPorcZinc: zinc_por2,
            intEsHijo: 0,
            acti_usua: user,
            TieneObs: observacion,
            varMaterial: material2

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        }, //contratista_avance_lote_pint
        success: function (responses) {
            // console.log(responses);
            if (responses.data === "") {
                mensaje(true, "GUARDADO EXITOSAMENTE", "no");
                $("#modal-control-metraje").modal("hide");
                iddetagalv = 0;
                id_insp_galv = 0;
                hijo = 0;
                limpiar_control_mecraje();

                grilla_insp_galv(valor_idturno, '', valor_fecha_inci, valor_fecha_final, valor_idesta, '');
            } else {
                mensaje(true, responses.data, "no");
            }
        }
    });
}
function guardar_obser(iddetagalv2, tipo_mate_obser2, cantidades2, pesoobserv2, defecto2, causa2, accion2, origen2, obse_gene2, tipo_mate_obser2, material2, supervi2, fecha_inici2, check_obse, cant_noconfor2) {
    let usuario = obtener_user();
    let varCheck = "";

    if (check_obse === "1") {
        varCheck = "NO CONFORME";
    } else {
        varCheck = "OBSERVACION";
    }
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/crear_observacion_galvanizado',
        dataType: 'json',
        data: {
            intIdDetaGalv: iddetagalv2,
            varTipo: varCheck,
            intCantidad: cantidades2,
            deciPesoObse: pesoobserv2,
            intIdDefe: defecto2,
            intIdCausa: causa2,
            varAccion: accion2,
            varOrigFalla: origen2,
            varObse: obse_gene2,
            acti_usua: usuario,
            varTipoMate: tipo_mate_obser2,
            varMaterial: material2,
            intIdSuper: supervi2,
            fechaInsp: fecha_inici2,
            IntCantNoConf: cant_noconfor2,
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        }, //contratista_avance_lote_pint
        success: function (responses) {

            if (responses.data === "") {
                mensaje(true, "GUARDADO EXITOSAMENTE", "no");
                $("#modal-observacion").modal("hide");
                iddetagalv = 0;
                limpiar_observacion();
                $("#btn_busc_insp_galv").trigger("click");
                //grilla_insp_galv(valor_idturno, '', valor_fecha_inci, valor_fecha_final, valor_idesta, '');
            } else {
                mensaje(true, responses.data, "no");
            }

        }
    });


}


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

$("#export_insp_galv").click(function () {
    JSONToCSVConvertor(dato_exportar, "Inspeccion_Galvanizado", true);
})
function capturar_incio_check() {
    var reporte = $('input:radio[name=inlineRadioOptionsmodal]:checked').val();
    if (reporte === "1") {
        document.querySelector('#cantidad_').innerText = 'Cantidad No Conforme';
        document.querySelector('#peso_').innerText = 'Peso No Conforme';
    } else {
        document.querySelector('#cantidad_').innerText = 'Cantidad Obs. Menor';
        document.querySelector('#peso_').innerText = 'Peso Obs. Menor';
    }
}
$("input[name=inlineRadioOptionsmodal]:radio").change(function () {

    if (this.value === "1") {
        document.querySelector('#cantidad_').innerText = 'Cantidad No Conforme';
        document.querySelector('#peso_').innerText = 'Peso No Conforme';
    } else {
        document.querySelector('#cantidad_').innerText = '';
        document.querySelector('#peso_').innerText = ''
        document.querySelector('#cantidad_').innerText = 'Cantidad Obs. Menor';
        document.querySelector('#peso_').innerText = 'Peso Obs. Menor';
    }
});
$("#editar_cantidades").on('click', function () {
    document.getElementById('canti_cont_metro').disabled = false;
    document.getElementById('peso_negr_cont_metro').disabled = false;
    document.getElementById('peso_galv_cont_metro').disabled = false;
    document.getElementById('consu_cont_metro').value = 0;
    document.getElementById('peso_negr_cont_metro').value = 0;
    document.getElementById('peso_galv_cont_metro').value = 0;
    document.getElementById('zinc_cont_metro').value = 0;
    $("#tipo_mate_cont_metro").jqxDropDownList({disabled: false});
});
function por_zinc() {
    var peso_negro = document.getElementById('peso_negr_cont_metro').value;
    var peso_galva = document.getElementById('peso_galv_cont_metro').value;
    var consumo = 0;
    var por_consumo = 0;
    if (peso_negro === "") {
        peso_negro = 0;
    } else {
        peso_negro = peso_negro;
    }
    if (peso_galva === "") {
        peso_galva = 0;
    } else {
        peso_galva = peso_galva;
    }

    if (parseFloat(peso_galva) > parseFloat(peso_negro)) {
        consumo = parseFloat(peso_galva) - parseFloat(peso_negro);
        por_consumo = (consumo / parseFloat(peso_negro)) * 100;
        document.getElementById('consu_cont_metro').value = consumo.toFixed(3);
        document.getElementById('zinc_cont_metro').value = por_consumo.toFixed(3);
    } else {
        document.getElementById('consu_cont_metro').value = 0;
        document.getElementById('zinc_cont_metro').value = 0;
    }
}
function validar() {
    var cantidad = 0;
    var cantidad_inspesc = 0;
    cantidad_inspesc = document.getElementById('canti_cont_metro').value;
    cantidad = document.getElementById('canti_cont_metro_insp').value;
    if (cantidad_inspesc === "") {
        cantidad_inspesc = 0;
    } else {
        cantidad_inspesc = cantidad_inspesc;
    }
    if (parseInt(cantidad_inspesc) > parseInt(cantidad)) {
        document.getElementById('canti_cont_metro').value = cantidad;
    }
}
