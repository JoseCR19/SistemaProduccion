var data = [];
var dataAdapter = "";
$('#create').click(function () {
    $("#descripcion2").val('');
    $("#tipo_etapa2").val('');
    $("#valoriza2").val('SI');
    $("#proceso2").val('');
    $("#producto2").val('1');
    $("#unidad_medida2").val('');
    $("#planta2").val('');
    $("#estado2").val('ACT');
    $('#despacho2').prop('checked', false);
    $('#maquina2').prop('checked', false);
    $("#supervisor2").prop('checked', false);
    $("#contratista2").prop('checked', true);
    document.getElementById('contratista2').disabled = true;
    $('#modal-create-etapa').modal('show');
    var valoriza = $("#valoriza2").val();
    
    if (valoriza === "SI") {
        document.getElementById('title_valo').style = '';
        document.getElementById('detalle_valo').style = '';
        $("#porcodigo").prop('checked', true);
        $("#materia_prima").prop('checked', false);
        $("#porcodigo").prop('checked', true);
        $("#materia_prima").prop('checked', false);
    } else {
        document.getElementById('title_valo').style = 'display:none';
        document.getElementById('detalle_valo').style = 'display:none';
        $("#porcodigo").prop('checked', false);
        $("#materia_prima").prop('checked', false);
    }
});
$("#valoriza2").on('change', function (event) {
    
    if (this.value === "SI") {
        document.getElementById('title_valo').style = '';
        document.getElementById('detalle_valo').style = '';
        $("#porcodigo").prop('checked', true);
        $("#materia_prima").prop('checked', false);
    } else {
        document.getElementById('title_valo').style = 'display:none';
        document.getElementById('detalle_valo').style = 'display:none';
        $("#porcodigo").prop('checked', false);
        $("#materia_prima").prop('checked', false);
    }
});
$("#porcodigo").on('change', function (event) {
    var isChecked = document.getElementById('porcodigo').checked;
    if (isChecked) {
        $("#materia_prima").prop('checked', false);
    }
});
$("#materia_prima").on('change', function (event) {
    var isChecked = document.getElementById('materia_prima').checked;
    if (isChecked) {
        $("#porcodigo").prop('checked', false);
    }
});
$("#valoriza_edit").on('change', function (event) {
    
    if (this.value === "SI") {
        document.getElementById('title_valo_edit').style = '';
        document.getElementById('detalle_valo_edit').style = '';
        $("#porcodigo_edit").prop('checked', true);
        $("#materia_prima_edit").prop('checked', false);
    } else {
        document.getElementById('title_valo_edit').style = 'display:none';
        document.getElementById('detalle_valo_edit').style = 'display:none';
        $("#porcodigo_edit").prop('checked', false);
        $("#materia_prima_edit").prop('checked', false);
    }
});
$("#porcodigo_edit").on('change', function (event) {
    var isChecked = document.getElementById('porcodigo_edit').checked;
    if (isChecked) {
        $("#materia_prima_edit").prop('checked', false);
    }
});
$("#materia_prima_edit").on('change', function (event) {
    var isChecked = document.getElementById('materia_prima_edit').checked;
    if (isChecked) {
        $("#porcodigo_edit").prop('checked', false);
    }
});
$('#agregar').click(function () {
    registrar_etapa();
});
$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Lista Etapa", true);
});
function listar_etapa() {
    //access_token = obtener_access_token();
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/lis_etap',
        dataType: 'json',
        //beforeSend: function (xhr) {
        //     xhr.setRequestHeader('Authorization', access_token);
        // },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_etapa();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'acti_hora', type: 'date', format: 'dd/MM/yyyy'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'hora_modi', type: 'date', format: 'dd/MM/yyyy'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'intIdEtapa', type: 'number'},
                    {name: 'intIdPlanta', type: 'number'},
                    {name: 'intIdTipoEtap', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'intIdUniMedi', type: 'number'},
                    {name: 'intIdProc', type: 'number'},
                    {name: 'varDescEtap', type: 'string'},
                    {name: 'varDescMedi', type: 'string'},
                    {name: 'varDescPlanta', type: 'string'},
                    {name: 'varDescProc', type: 'string'},
                    {name: 'varDescTipoEtap', type: 'string'},
                    {name: 'varDescTipoProd', type: 'string'},
                    {name: 'boolDesp', type: 'bool'},
                    {name: 'varEstaEtap', type: 'string'},
                    {name: 'boolMostCont', type: 'bool'},
                    {name: 'boolMostMaqu', type: 'bool'},
                    {name: 'boolMostSupe', type: 'bool'},
                    {name: 'boolMostSupe', type: 'bool'},
                    {name: 'BoolTipoValorizacion', type: 'bool'},
                    {name: 'varValoEtapa', type: 'string'},
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
                theme: 'darkblue',
                selectionmode: 'multiplecellsextended',
                sortable: true,
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
                            
                            $("#porcodigo_edit").prop('checked', false);
                            $("#materia_prima_edit").prop('checked', false);
                            $("#valoriza_edit").val('');
                            $('#modal-edit-etapa').modal('show');
                            $("#id").val(dataRecord.intIdEtapa);
                            $("#descripcion_edit").val(dataRecord.varDescEtap);
                            $("#tipo_etapa").val(dataRecord.intIdTipoEtap);
                            $("#valoriza_edit").val(dataRecord.varValoEtapa);
                            $("#proceso").val(dataRecord.intIdProc);
                            $("#producto").val(dataRecord.intIdTipoProducto);
                            $("#unidad_medida").val(dataRecord.intIdUniMedi);
                            $("#planta").val(dataRecord.intIdPlanta);
                            $("#estado_edit").val(dataRecord.varEstaEtap);
                            $("#contratista").prop('checked', dataRecord.boolMostCont);
                            document.getElementById('contratista').disabled = true;
                            $('#despacho').prop('checked', dataRecord.boolDesp);
                            $('#maquina').prop('checked', dataRecord.boolMostMaqu);
                            $("#supervisor").prop('checked', dataRecord.boolMostSupe);
                            if ($("#valoriza_edit").val() === "SI") {
                                document.getElementById('title_valo').style = '';
                                document.getElementById('detalle_valo').style = '';
                                $("#porcodigo").prop('checked', true);
                                $("#materia_prima").prop('checked', false);
                            } else {
                                document.getElementById('title_valo').style = 'display:none';
                                document.getElementById('detalle_valo').style = 'display:none';
                                $("#porcodigo").prop('checked', false);
                                $("#materia_prima").prop('checked', false);
                            }
                            if (dataRecord.BoolTipoValorizacion === null) {
                                document.getElementById('title_valo_edit').style = 'display:none';
                                document.getElementById('detalle_valo_edit').style = 'display:none';
                            } else if (dataRecord.BoolTipoValorizacion === true) {
                                $("#porcodigo_edit").prop('checked', true);
                                document.getElementById('title_valo_edit').style = '';
                                document.getElementById('detalle_valo_edit').style = '';
                            } else if (dataRecord.BoolTipoValorizacion === false) {
                                $("#materia_prima_edit").prop('checked', true);
                                document.getElementById('title_valo_edit').style = '';
                                document.getElementById('detalle_valo_edit').style = '';
                            }
                        }
                    },
                    {
                        text: 'Eliminar', datafield: 'Eliminar', columntype: 'button', width: 70, cellsrenderer: function () {
                            return "Eliminar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            eliminar(dataRecord.intIdEtapa);
                        }
                    },
                    {text: 'Número', datafield: 'intIdEtapa', width: 60, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Etapa', datafield: 'varDescEtap', width: 300},
                    {text: 'Tipo Etapa', datafield: 'varDescTipoEtap', cellsalign: 'left', width: 190},
                    {text: 'idtipetapa', datafield: 'intIdTipoEtap', cellsalign: 'left', width: 90, hidden: true},
                    {text: 'idproce', datafield: 'intIdProc', width: 90, hidden: true},
                    {text: 'Proceso', datafield: 'varDescProc', width: 190},
                    {text: 'idunidadmedida', datafield: 'intIdUniMedi', width: 10, hidden: true},
                    {text: 'Tipo Elemento', datafield: 'varDescTipoProd', width: 190},
                    {text: 'idtipoElemento', datafield: 'intIdTipoProducto', width: 190, hidden: true},
                    {text: 'Unidad Medida', datafield: 'varDescMedi', width: 105},
                    {text: 'idplanta', datafield: 'intIdPlanta', width: 90, hidden: true},
                    {text: 'Planta', datafield: 'varDescPlanta', width: 90},
                    {text: 'Valorización', datafield: 'varValoEtapa', width: 90},
                    {text: 'Despacho', datafield: 'boolDesp', width: 90, columntype: 'checkbox'},
                    {text: 'Mostrar Contratista', width: 120, columntype: 'checkbox', datafield: 'boolMostCont'},
                    {text: 'Mostrar Máquina', width: 120, columntype: 'checkbox', datafield: 'boolMostMaqu'},
                    {text: 'Mostrar Supervisor', width: 120, columntype: 'checkbox', datafield: 'boolMostSupe'},
                    {text: 'Estado', width: 90, datafield: 'varEstaEtap'},
                    {text: 'Usuario Creación', width: 150, datafield: 'acti_usua'},
                    {text: 'Fecha Creación', width: 120, datafield: 'acti_hora', cellsformat: 'dd/MM/yyyy'},
                    {text: 'Usuario Modificado', width: 150, datafield: 'usua_modi'},
                    {text: 'Fecha Modificado', width: 120, datafield: 'hora_modi', cellsformat: 'dd/MM/yyyy'},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
            var dataCount = $('#grid').jqxGrid('getrows');
            var len = dataCount.length;
            $("#contador").val(len);
            $("#actualizar_etapa").click(function () {
                if (editrow >= 0) {
                    var row = {
                        intIdEtapa: $("#id").val(),
                        varDescEtap: $("#descripcion_edit").val(),
                        intIdTipoEtap: $("#tipo_etapa").val(),
                        intIdProc: $("#proceso").val(),
                        varValoEtapa: $("#valoriza_edit").val(),
                        intIdTipoProducto: $("#producto").val(),
                        intIdUniMedi: $("#unidad_medida").val(),
                        intIdPlanta: $("#planta").val(),
                        varEstaEtap: $("#estado_edit").val(),
                        boolDesp: $('#despacho').prop('checked'),
                        boolMostMaqu: $('#maquina').prop('checked'),
                        boolMostSupe: $("#supervisor").prop('checked'),
                        boolMostCont: $("#contratista").prop('checked'),
                    };
                    if (row.boolDesp === true) {
                        var despacho = 1;
                    } else {
                        var despacho = 0;
                    }
                    if (row.boolMostMaqu === true) {
                        var maquina = 1;
                    } else {
                        var maquina = 0;
                    }
                    if (row.boolMostSupe === true) {
                        var supervisor = 1;
                    } else {
                        var supervisor = 0;
                    }
                    if (row.boolMostCont === true) {
                        var contratista = 1;
                    } else {
                        var contratista = 0;
                    }
                    actualizar_etapa(despacho, row.varDescEtap, row.intIdTipoEtap, row.varValoEtapa, row.intIdProc, row.intIdTipoProducto,
                            row.intIdUniMedi, row.intIdPlanta, row.varEstaEtap, maquina, supervisor, contratista, row.intIdEtapa);
                    //actualizar_tipo_etapa(row.intIdTipoEtap, row.varCodiTipoEtap, row.varDescTipoEtap, row.intIdAgru, row.varEstaTipoEtap);
                }
            });
        }
    });
}
function actualizar_etapa(despacho2, varDescEtap2, intIdTipoEtap2, varValoEtapa2, intIdProce2, intIdTipoProducto2, intIdUniMedi2, intIdPlan2,
        varEstaEtap2, maquina2, supervisor2, contratista2, intIdEtapa2) {
    var tipo_valorizacion;
    boolPorCodigo_edit = $("#porcodigo_edit").prop('checked');
    boolPorMateriaPrima_edit = $("#materia_prima_edit").prop('checked');
    if (boolPorMateriaPrima_edit === true) {
        tipo_valorizacion = 0;
    } else if (boolPorCodigo_edit === true) {
        tipo_valorizacion = 1;
    } else {
        tipo_valorizacion = 'no';
    }
    
    let user = obtener_user();
    if (varDescEtap2 !== "") {
        if (intIdTipoEtap2 !== null) {
            if (varValoEtapa2 !== null) {
                if (intIdProce2 !== null) {
                    if (intIdTipoProducto2 !== null) {
                        if (intIdUniMedi2 !== null) {
                            if (intIdPlan2 !== null) {
                                if (varEstaEtap2 !== null) {
                                    if (intIdEtapa2 !== null) {
                                        $.ajax({
                                            type: 'POST',
                                            url: url + '/GestionProyectos/public/index.php/actu_etap',
                                            dataType: 'json',
                                            data: {
                                                boolDesp: despacho2,
                                                varDescEtap: varDescEtap2,
                                                intIdTipoEtap: parseInt(intIdTipoEtap2),
                                                varValoEtapa: varValoEtapa2,
                                                intIdProc: parseInt(intIdProce2),
                                                intIdTipoProducto: parseInt(intIdTipoProducto2),
                                                intIdUniMedi: parseInt(intIdUniMedi2),
                                                intIdPlan: parseInt(intIdPlan2),
                                                varEstaEtap: varEstaEtap2,
                                                boolMostMaqu: maquina2,
                                                boolMostSupe: supervisor2,
                                                boolMostCont: contratista2,
                                                intIdEtapa: parseInt(intIdEtapa2),
                                                BoolTipoValorizacion: tipo_valorizacion,
                                                usua_modi: user
                                            },
                                            success: function (responses) {

                                                let mensaje_alert = responses.data.mensaje;
                                                if (mensaje_alert === "Actualizacion exitosa.") {
                                                    mensaje(true, mensaje_alert, "modal-edit-etapa");

                                                } else {
                                                    mensaje(false, mensaje_alert, "modal-edit-etapa");
                                                }
                                                //$('#modal-edit-agrupacion').modal('hide');
                                                listar_etapa();
                                            }, error: function (xhr, ajaxOptions, thrownError) {
                                            }
                                        });
                                    } else {
                                        mensaje(false, "Campo ETAPA vacio.", "no");
                                    }
                                } else {
                                    mensaje(false, "Campo ESTADO vacio.", "no");
                                }
                            } else {
                                mensaje(false, "Campo PLANTA vacio.", "no");
                            }
                        } else {
                            mensaje(false, "Campo UNIDAD DE MEDIDA vacio.", "no");
                        }
                    } else {
                        mensaje(false, "Campo TIPO ELEMENTO vacio.", "no");
                    }
                } else {
                    mensaje(false, "Campo PROCESO vacio.", "no");
                }
            } else {
                mensaje(false, "Campo ETAPA vacio.", "no");
            }
        } else {
            mensaje(false, "Campo TIPO ETAPA vacio.", "no");
        }
    } else {
        mensaje(false, "Campo NOMBRE vacio.", "no");
    }
}
function registrar_etapa() {
    varDescEtap2 = $("#descripcion2").val().toUpperCase();
    intIdTipoEtap2 = $("#tipo_etapa2").val();
    varValoEtapa2 = $("#valoriza2").val();
    intIdProc2 = $("#proceso2").val();
    intIdTipoProducto2 = $("#producto2").val();
    intIdUniMedi2 = $("#unidad_medida2").val();
    intIdPlanta2 = $("#planta2").val();
    varEstaEtap2 = $("#estado2").val();
    boolDesp2 = $('#despacho2').prop('checked');
    boolMostMaqu2 = $('#maquina2').prop('checked');
    boolMostSupe2 = $("#supervisor2").prop('checked');
    boolMostCont2 = $("#contratista2").prop('checked');
    boolPorCodigo = $("#porcodigo").prop('checked');
    boolPorMateriaPrima = $("#materia_prima").prop('checked');
    var tipo_valorizacion;
    if (boolDesp2 === true) {
        var despacho = 1;
    } else {
        var despacho = 0;
    }
    if (boolMostMaqu2 === true) {
        var maquina = 1;
    } else {
        var maquina = 0;
    }
    if (boolMostSupe2 === true) {
        var supervisor = 1;
    } else {
        var supervisor = 0;
    }
    if (boolMostCont2 === true) {
        var contratista = 1;
    } else {
        var contratista = 0;
    }
    if (boolPorMateriaPrima === true) {
        tipo_valorizacion = 0;
    } else if (boolPorCodigo === true) {
        tipo_valorizacion = 1;
    } else {
        tipo_valorizacion = 'no';
    }
    let user = obtener_user();
    if (varDescEtap2 !== "") {
        if (intIdTipoEtap2 !== null) {
            if (varValoEtapa2 !== null) {
                if (intIdProc2 !== null) {
                    if (intIdTipoProducto2 !== null) {
                        if (intIdUniMedi2 !== null) {
                            if (intIdPlanta2 !== null) {
                                if (varEstaEtap2 !== null) {
                                    $.ajax({
                                        type: 'POST',
                                        url: url + '/GestionProyectos/public/index.php/regi_etap',
                                        dataType: 'json',
                                        data: {
                                            boolDesp: despacho,
                                            varDescEtap: varDescEtap2,
                                            intIdTipoEtap: parseInt(intIdTipoEtap2),
                                            varValoEtapa: varValoEtapa2,
                                            intIdProc: parseInt(intIdProc2),
                                            intIdTipoProducto: parseInt(intIdTipoProducto2),
                                            intIdUniMedi: parseInt(intIdUniMedi2),
                                            intIdPlan: parseInt(intIdPlanta2),
                                            BoolTipoValorizacion: tipo_valorizacion,
                                            boolMostMaqu: maquina,
                                            boolMostSupe: supervisor,
                                            boolMostCont: contratista,
                                            acti_usua: user
                                        },
                                        error: function (xhr, ajaxOptions, thrownError) {
                                        },
                                        success: function (responses) {

                                            let mensaje_alert = responses.data.mensaje;
                                            if (mensaje_alert === "Guardado con exito.") {
                                                mensaje(true, mensaje_alert, "modal-create-etapa");
                                            } else {
                                                mensaje(false, mensaje_alert, "modal-create-etapa");
                                            }
                                            listar_etapa();
                                        }
                                    });
                                } else {
                                    mensaje(false, "Campo ESTADO vacio.", "no");
                                }
                            } else {
                                mensaje(false, "Campo PLANTA vacio.", "no");
                            }
                        } else {
                            mensaje(false, "Campo UNIDAD DE MEDIDA vacio.", "no");
                        }
                    } else {
                        mensaje(false, "Campo TIPO ELEMENTOP vacio.", "no");
                    }
                } else {
                    mensaje(false, "Campo PROCESO vacio.", "no");
                }
            } else {
                mensaje(false, "Campo ETAPA vacio.", "no");
            }
        } else {
            mensaje(false, "Campo TIPO ETAPA vacio.", "no");
        }
    } else {
        mensaje(false, "Campo NOMBRE vacio.", "no");
    }
}
function combo_tipo_etapa() {
    // access_token = "";
    // access_token = obtener_access_token();
    //if (access_token) {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_t_etap',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError === "Internal Server Error") {
                combo_tipo_etapa();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdTipoEtap + '">' + responses.data[c]
                        .varDescTipoEtap + '</option>';
                $("#tipo_etapa").html(va);
                $("#tipo_etapa2").html(va);
            }
        }
    });
}
function combo_proceso() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_proc',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError === "Internal Server Error") {
                combo_proceso();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdProc + '">' + responses.data[c]
                        .varDescProc + '</option>';
                $("#proceso").html(va);
                $("#proceso2").html(va);
            }
        }
    });
}
function combo_producto() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_tipo_prod',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            va = '';
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdTipoProducto + '">' + responses.data[c]
                        .varDescTipoProd + '</option>';
                $("#producto").html(va);
                $("#producto2").html(va);
            }
        }
    });
}
function combo_unidad_medida() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_unid_medi',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_unidad_medida();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdUniMedi + '">' + responses.data[c]
                        .varDescMedi + '</option>';
                $("#unidad_medida").html(va);
                $("#unidad_medida2").html(va);
            }
        }
    });
}
function combo_planta() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_plan',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_planta();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdPlanta + '">' + responses.data[c]
                        .varDescPlanta + '</option>';
                $("#planta").html(va);
                $("#planta2").html(va);
            }
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
function eliminar(id) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/elim_etap',
        dataType: 'json',
        data: {
            intIdEtapa: parseInt(id),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        success: function (responses) {
            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert === "Se ha eliminado.") {
                mensaje(true, mensaje_alert, "no");
            } else {
                mensaje(false, mensaje_alert, "no");
            }
            listar_etapa();
        }
    });
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