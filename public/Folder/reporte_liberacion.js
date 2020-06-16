
var exportar_data = 0;
var codigoot = "";
var codigoproducto = "";
var check_zona = "";
var check_tarea = "";
var check_programa = "";
var check_etapa = "";
var check_codi_elem = "";

var cod_tipo_guia = "";
//FECHAS
var rango_fechas = 0;
var rango_fechas_radio = 0;


var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var day_next = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear() + "-" + (month) + "-" + (day);
//var today_next = now.getFullYear() + "-" + (month) + "-" + (day_next);

var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia = moment(firstDay).format('YYYY-MM-DD');

$('#fech_inic_repo_libe').val(primerdia);
$('#fech_fin_repo_libe').val(today);



function tipo_ot() {
    var tipo_ot = [{'Tipo_Ot': 1, 'VarOt': 'ABIERTOS'}, {'Tipo_Ot': 2, 'VarOt': 'CERRADOS'}];
    var source =
            {
                localdata: tipo_ot,
                datatype: "array",
                datafields: [
                    {name: 'Tipo_Ot'},
                    {name: 'VarOt'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#tipo_ot").jqxDropDownList({source: dataAdapter, displayMember: "VarOt", valueMember: "Tipo_Ot", width: 200, height: 30});
    // Focus the jqxDropDownList
    //$("#tipo_ot").jqxDropDownList('selectIndex', 1);
    $("#tipo_ot").val('1');
    $("#tipo_ot").jqxDropDownList('focus');
}
$("#tipo_ot").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            listar_data_list_proyectos(item.value);
        }
    }
});
//PROYECTO OT 
$("#txt_ot_repo_libe").on('change', function (event) {
    $('#txt_ot_repo_libe').jqxDropDownList('clearFilter');
    codigoot = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;

            listar_zona(codigoot, codigoproducto);
            listar_etap_usua(codigoot, codigoproducto);
            codi_varelemento(codigoot, codigoproducto, check_zona, check_programa);
        }
    }

    $("#zona_repo_libe").jqxDropDownList('clear');
    $("#tarea_repo_libe").jqxDropDownList('clear');
    $("#etapa_repo_libe").jqxDropDownList('clear');

    $("#inspe_repo_libe").jqxDropDownList('clear');
    $("#contra_repo_libe").jqxDropDownList('clear');
    $("#codi_elem_repo_libe").jqxComboBox('clear');

    $("#producto_repo_libe").jqxDropDownList('selectIndex', 0);
    $("#zona_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#tarea_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#etapa_repo_libe").jqxDropDownList('selectIndex', -1);

    $("#inspe_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#contra_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#codi_elem_repo_libe").jqxComboBox('selectIndex', -1);
});
//TIPO ELEMENTO
$("#producto_repo_libe").on('change', function (event) {
    codigoproducto = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;

            listar_zona(codigoot, codigoproducto);
            listar_etap_usua(codigoot, codigoproducto);
            codi_varelemento(codigoot, codigoproducto, check_zona, check_programa);
        }
    }
    $("#zona_repo_libe").jqxDropDownList('clear');
    $("#tarea_repo_libe").jqxDropDownList('clear');

    $("#inspe_repo_libe").jqxDropDownList('clear');
    $("#contra_repo_libe").jqxDropDownList('clear');
    $("#codi_elem_repo_libe").jqxComboBox('clear');


    $("#zona_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#tarea_repo_libe").jqxDropDownList('selectIndex', -1);

    $("#inspe_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#contra_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#codi_elem_repo_libe").jqxComboBox('selectIndex', -1);



});
// ZONA 
$("#zona_repo_libe").on('change', function (event) {

    check_zona = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {

            check_zona = item.value;

        }
    }
    if (check_zona) {

        listar_tarea(codigoot, codigoproducto, check_zona);
        codi_varelemento(codigoot, codigoproducto, check_zona, check_programa);
    }
});
//TAREA
$("tarea_repo_libe").unbind();
$("#tarea_repo_libe").on('change', function (event) {
    check_programa = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {

            check_programa = item.value;

        }
    }
    if (check_programa) {
        codi_varelemento(codigoot, codigoproducto, check_zona, check_programa);
    }


});
//ETAPA INSPECTOR
$("#etapa_repo_libe").on('change', function (event) {
    check_etapa = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_etapa = item.value;
            combo_supervisor_inspeccionar(check_etapa);
            comboc_contratista(check_etapa);

        }
    }
    $("#inspe_repo_libe").jqxDropDownList('clear');
    $("#contra_repo_libe").jqxDropDownList('clear');


    $("#inspe_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#contra_repo_libe").jqxDropDownList('selectIndex', -1);

});
//CODIGO ELEMENTO 
$("#codi_elem_repo_libe").on('change', function (event) {
    $('#codi_elem_repo_libe').jqxDropDownList('clearFilter');
    check_codi_elem = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {

            check_codi_elem = item.value;
        }
    }

});

//limpiar 
$("#limpiar_repor_libe").click(function () {
    $("#zona_repo_libe").jqxDropDownList('clear');
    $("#tarea_repo_libe").jqxDropDownList('clear');
    $("#etapa_repo_libe").jqxDropDownList('clear');

    $("#inspe_repo_libe").jqxDropDownList('clear');
    $("#contra_repo_libe").jqxDropDownList('clear');
    $("#codi_elem_repo_libe").jqxComboBox('clear');

    $("#txt_ot_repo_libe").jqxDropDownList('selectIndex', 0);
    $("#producto_repo_libe").jqxDropDownList('selectIndex', 0);
    $("#zona_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#tarea_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#etapa_repo_libe").jqxDropDownList('selectIndex', -1);

    $("#inspe_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#contra_repo_libe").jqxDropDownList('selectIndex', -1);
    $("#codi_elem_repo_libe").jqxComboBox('selectIndex', -1);

    $("#combo_tipo_repo").jqxDropDownList('selectIndex', 0);
    $("#combo_tipo_inspe").jqxDropDownList('selectIndex', 0);

    $('#fech_inic_repo_libe').val(primerdia);
    $('#fech_fin_repo_libe').val(today);

    $("#grid_repo_libe").jqxGrid('clear');
    exportar_data = 0;
});


//BOTON BUSCAR 

$("#buscar_repor_libe").click(function () {
    rango_fechas = 0;
    var fechas_diferentes = 0;

    let ot_proye = $("#txt_ot_repo_libe").val();
    let codi_tipo_elem = $("#producto_repo_libe").val();
    let zona = $("#zona_repo_libe").val();
    let tarea = $("#tarea_repo_libe").val();
    let etapa = $("#etapa_repo_libe").val();
    let inspe = $("#inspe_repo_libe").val();
    let contra = $("#contra_repo_libe").val();
    let codi_elem = $("#codi_elem_repo_libe").val();

    let fecha_inicio = $("#fech_inic_repo_libe").val();
    let fecha_final = $("#fech_fin_repo_libe").val();

    let tipo_repo = $("#combo_tipo_repo").val();
    let tipo_inspe = $("#combo_tipo_inspe").val();
    var reporte = $('input:radio[name=inlineRadioOptions]:checked').val();


    if (fecha_inicio !== "" && fecha_final !== "") {

        if (fecha_inicio > fecha_final) {
            $("#grid_repo_libe").jqxGrid('clear');
            fechas_diferentes = 1;
            mensaje(false, "Fecha inicio debe ser menor a la fecha final", "no");
        } else {
            rango_fechas = 1;
        }
    } else {
        fechas_diferentes = 1;
        mensaje(false, "Ingrese el rango de fecha(inicio/final)", "no");
    }


    if (fechas_diferentes === 0) {
        if (ot_proye) {//validamos la ot
            if (codi_tipo_elem) {//VALIDAR EL TIPO ELEMENTO
                if (zona) {   //VALIDAR LA ZONA
                    if (tarea) {// VALIDAR EL PROGRAMA
                        if (etapa) {
                            if (inspe) {
                                if (contra) {
                                    if (codi_elem) {
                                        if (tipo_repo) {
                                            if (tipo_inspe) {

                                                //console.log(ot_proye, codi_tipo_elem, zona, tarea, etapa, inspe, contra, codi_elem, fecha_inicio, fecha_final, tipo_repo, tipo_inspe);
                                                grilla_reportar_liberacion(ot_proye, codi_tipo_elem, zona, tarea, etapa, inspe, contra, codi_elem, fecha_inicio, fecha_final, tipo_repo, reporte, tipo_inspe);
                                                indicador(ot_proye, codi_tipo_elem, zona, tarea, etapa, inspe, contra, codi_elem, fecha_inicio, fecha_final, tipo_repo, reporte, tipo_inspe);
                                            } else {
                                                mensaje(false, "INGRESE EL TIPO INSPECCION", "no");
                                            }
                                        } else {
                                            mensaje(false, "INGRESE EL TIPO REPORTE", "no");
                                        }
                                    } else {
                                        mensaje(false, "INGRESE EL CODIGO ELEMENTO", "no");
                                    }
                                } else {
                                    mensaje(false, "INGRESE EL CONTRATISTA", "no");
                                }
                            } else {
                                mensaje(false, "INGRESE LA ETAPA", "no");
                            }
                        } else {
                            mensaje(false, "INGRESE EL ETAPA", "no");
                        }
                    } else {
                        mensaje(false, "INGRESE EL PROGRAMA", "no");
                    }
                } else {
                    mensaje(false, "INGRESE LA ZONA", "no");
                }
            } else {
                mensaje(false, "INGRESE LA TIPO ELEMENTO", "no");
            }

        } else {
            mensaje(false, "INGRESE LA O.T", "no");
        }
    }

});

function listar_data_list_proyectos(codigo) {
    var array_ot = new Array();
    $.ajax({
        type: 'POST',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionPartList/public/index.php/List_proy',
        dataType: 'json',
        data: {tipo_ot: codigo},
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_data_list_proyectos(codigo);
            }
        },
        success: function (responses) {
            responses.data.push({varCodiProy: 'TODOS', intIdproy: -1});
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_ot_repo_libe").jqxDropDownList({
                filterPlaceHolder: "Buscar", 
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_repo_libe").jqxDropDownList('selectIndex',0);
            $("#txt_ot_repo_libe").jqxDropDownList('focus');
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


            $("#producto_repo_libe").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30});
            $("#producto_repo_libe").jqxDropDownList('focus');
            $("#producto_repo_libe").jqxDropDownList('selectIndex', 0);
        }
    });
}
function listar_zona(codigo_ot, codigo_producto) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_zona_asoc_proy',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_zona(codigo_ot, codigo_producto);
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                var new_tarea = [];
                var arra_new2 = [];
                for (let j = 0; j < responses.data.length; j++) {
                    arra_new2.push(responses.data[j]);
                }
                new_tarea = arra_new2.reverse();
                $("#zona_repo_libe").jqxDropDownList({disabled: false});
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
                $("#zona_repo_libe").jqxDropDownList({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                $("#zona_repo_libe").jqxDropDownList('selectIndex', 0);
                $("#zona_repo_libe").jqxDropDownList('focus');

            } else {
                var data = {'intIdProyZona': -1, 'varDescrip': 'TODOS'};
                var source =
                        {
                            localdata: data,
                            datatype: "json",
                            datafields: [
                                {name: 'intIdProyZona'},
                                {name: 'varDescrip'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#zona_repo_libe").jqxDropDownList({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                $("#zona_repo_libe").jqxDropDownList('selectIndex', 0);
                $("#zona_repo_libe").jqxDropDownList('focus');
                $("#zona_repo_libe").jqxDropDownList({disabled: true});
            }

        }
    });
}
function listar_tarea(codigo_ot, codigo_producto, codigo_zona) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_tare_asoc_proy_sin_array',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            intIdProyZona: codigo_zona
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_tarea(codigo_ot, codigo_producto, codigo_zona);
            }
        },
        success: function (responses) {
            console.log(responses);
            if (responses.data.mensaje === "Error.") {
                $("#tarea_repo_libe").jqxDropDownList('clear');
            } else {
                responses.data.reverse();
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
                $("#tarea_repo_libe").jqxDropDownList({source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                $("#tarea_repo_libe").jqxDropDownList('focus');
                $("#tarea_repo_libe").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}
function listar_etap_usua(ot, producto) {
    let user = obtener_user();
    array_asignaciones = [];
    var new_data = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionUsuarios/public/index.php/comb_asig_etapa_actu_proy',
        dataType: 'json',
        data: {
            varCodiUsua: user,
            intIdProy: ot,
            intIdTipoProducto: producto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_etap_usua();
            }
        },
        success: function (responses) {
            if (responses.data.mensaje == "Error.") {
                $("#etapa_repo_libe").jqxDropDownList('clear');
            } else {

                for (var i = 0; responses.data.length > i; i++) {

                    if (responses.data[i].varCodiAgru === "CAL") {
                        new_data.push({'intIdEtapa': responses.data[i].intIdEtapa, 'varDescEtap': responses.data[i].varDescEtap});
                    } else {
                    }
                }
                var source =
                        {
                            localdata: new_data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdEtapa'},
                                {name: 'varDescEtap'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#etapa_repo_libe").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 280, height: 30, placeHolder: "SELECCIONAR:"});
                $("#etapa_repo_libe").jqxDropDownList('focus');
                $("#etapa_repo_libe").jqxDropDownList('selectIndex', 0);
                $("#etapa_repo_libe").jqxDropDownList({disabled: false});

            }
        }
    });
}
function combo_supervisor_inspeccionar(id_etapa) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/obte_supe_con_id_etap',
        dataType: 'json',
        data: {
            intIdEtapa: id_etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {


            responses.data.push({intIdColaborador: -1, nombre: 'TODOS', varCodiUsua: ""});

            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'intIdColaborador'},
                            {name: 'nombre'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#inspe_repo_libe").jqxDropDownList({filterPlaceHolder: "Buscar", filterable: true, source: dataAdapter, displayMember: "nombre", valueMember: "intIdColaborador", width: 300, height: 30, placeHolder: "SELECCIONAR:"});
            $("#inspe_repo_libe").jqxDropDownList('focus');
            $("#inspe_repo_libe").jqxDropDownList('selectIndex', 0);
            for (var i = 0; responses.data.length > i; i++) {
                if (user === responses.data[i].varCodiUsua) {
                    $("#inspe_repo_libe").val(responses.data[i].intIdColaborador);
                }
            }
        }
    });
}
function comboc_contratista(id_tipo_etapa) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionCostos/public/index.php/comb_cont',
        dataType: 'json',
        data: {
            intIdEtapa: id_tipo_etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "No hay dato.") {
                var data = {intIdCont: -1, varRazCont: 'TODOS', intIdEtapa: ""};
                var source =
                        {
                            localdata: data,
                            datatype: "json",
                            datafields: [
                                {name: 'intIdCont'},
                                {name: 'varRazCont'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#contra_repo_libe").jqxDropDownList({source: dataAdapter, displayMember: "varRazCont", valueMember: "intIdCont", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                $("#contra_repo_libe").jqxDropDownList('focus');
                $("#contra_repo_libe").jqxDropDownList('selectIndex', 0);
                $("#contra_repo_libe").jqxDropDownList({disabled: true});
            } else {
                responses.data.push({intIdCont: -1, varRazCont: 'TODOS', intIdEtapa: ""});
                var source =
                        {
                            localdata: responses.data.reverse(),
                            datatype: "array",
                            datafields: [
                                {name: 'intIdCont'},
                                {name: 'varRazCont'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#contra_repo_libe").jqxDropDownList({source: dataAdapter, displayMember: "varRazCont", valueMember: "intIdCont", width: 200, height: 30, placeHolder: "SELECCIONAR:"});
                $("#contra_repo_libe").jqxDropDownList('focus');
                $("#contra_repo_libe").jqxDropDownList('selectIndex', 0);
                $("#contra_repo_libe").jqxDropDownList({disabled: false});
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
                $("#codi_elem_repo_libe").jqxDropDownList('clear');
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
                    $("#codi_elem_repo_libe").jqxDropDownList({
                        filterPlaceHolder: "Buscar",
                        filterable: true,
                        source: dataAdapter,

                        width: 200, height: 30,
                        displayMember: "varCodiElemento",
                        valueMember: "varCodiElemento",
                        placeHolder: "SELECCIONAR:"
                    });

                    $("#codi_elem_repo_libe").jqxDropDownList('focus');
                    $("#codi_elem_repo_libe").jqxDropDownList('selectIndex', 0);
                    $("#codi_elem_repo_libe").jqxDropDownList({disabled: false});
                } else {
                    var data = {'varCodiElemento': 'TODOS'};
                    var source =
                            {
                                localdata: data,
                                datatype: "json",
                                datafields: [

                                    {name: 'varCodiElemento'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    $("#codi_elem_repo_libe").jqxDropDownList({
                        filterPlaceHolder: "Buscar",
                        filterable: true,
                        source: dataAdapter,

                        width: 200, height: 30,
                        displayMember: "varCodiElemento",
                        valueMember: "varCodiElemento",
                        placeHolder: "SELECCIONAR:"
                    });
                    $("#codi_elem_repo_libe").jqxDropDownList('focus');
                    $("#codi_elem_repo_libe").jqxDropDownList('selectIndex', 0);
                    $("#codi_elem_repo_libe").jqxDropDownList({disabled: true});
                }
            }
        }
    });
}
function combo_tipo_reporte() {
    var tipo_reporte = [{'value_tipo_reporte': 1, 'label': 'DETALLADO'}, {'value_tipo_reporte': 2, 'label': 'RESUMEN'}];
    var source =
            {
                localdata: tipo_reporte,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_tipo_reporte'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#combo_tipo_repo").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_tipo_reporte", width: 180, height: 28});

    $("#combo_tipo_repo").jqxDropDownList('selectIndex', 0);
    $("#combo_tipo_repo").jqxDropDownList('focus');


}
function combo_tipo_inspe() {
    var tipo_inspecc = [{'value_tipo_inspeccion': -1, 'label': 'TODOS'}, {'value_tipo_inspeccion': 1, 'label': 'CONFORME '}, {'value_tipo_inspeccion': 2, 'label': 'RECHAZO '}];
    var source =
            {
                localdata: tipo_inspecc,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'value_tipo_inspeccion'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#combo_tipo_inspe").jqxDropDownList({source: dataAdapter, displayMember: "label", valueMember: "value_tipo_inspeccion", width: 180, height: 28});

    $("#combo_tipo_inspe").jqxDropDownList('selectIndex', 0);
    $("#combo_tipo_inspe").jqxDropDownList('focus');


}
function indicador(ot_proye2, codi_tipo_elem2, zona2, tarea2, etapa2, inspe2, contra2, codi_elem2, fecha_inicio2, fecha_final2, tipo_repo2, reporte2, tipo_inspe2) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/store_repo_libe_reporte',
        dataType: 'json',

        data: {
            v_intIdproy: parseInt(ot_proye2),
            v_intIdTipoProducto: parseInt(codi_tipo_elem2),
            v_intIdZona: parseInt(zona2),
            v_intIdTarea: parseInt(tarea2),
            v_intIdEtapaInspeccion: parseInt(etapa2),
            v_strCodigo: codi_elem2,
            v_intIdInspector: parseInt(inspe2),
            v_dttFechaIni: fecha_inicio2,
            v_dttFechaFin: fecha_final2,
            v_TipoInspec: parseInt(tipo_inspe2),
            v_Contratista: parseInt(contra2),
            v_Filtro: parseInt(reporte2),
            v_TipoReporte: parseInt(tipo_repo2),
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //grilla_reportar_liberacion();
            }
        },
        success: function (responses) {

            $("#valor_inspeccion").val(responses.data[0]['@v_valor']);
            $("#valor_produccion").val(responses.data[0]['@v_producido']);
            $("#indicador").val(responses.data[0]['@v_indicador'] + ' %');
        }
    });
}

function grilla_reportar_liberacion(ot_proye2, codi_tipo_elem2, zona2, tarea2, etapa2, inspe2, contra2, codi_elem2, fecha_inicio2, fecha_final2, tipo_repo2, reporte2, tipo_inspe2) {
    $("#modal-cargar-reporlibe").modal('show');


    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/store_repo_libe',
        dataType: 'json',

        data: {
            v_intIdproy: parseInt(ot_proye2),
            v_intIdTipoProducto: parseInt(codi_tipo_elem2),
            v_intIdZona: parseInt(zona2),
            v_intIdTarea: parseInt(tarea2),
            v_intIdEtapaInspeccion: parseInt(etapa2),
            v_strCodigo: codi_elem2,
            v_intIdInspector: parseInt(inspe2),
            v_dttFechaIni: fecha_inicio2,
            v_dttFechaFin: fecha_final2,
            v_TipoInspec: parseInt(tipo_inspe2),
            v_Contratista: parseInt(contra2),
            v_Filtro: parseInt(reporte2),
            v_TipoReporte: parseInt(tipo_repo2),
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //grilla_reportar_liberacion();
            }
        },

        success: function (responses) {

            if (responses.data.length > 0) {
                exportar_data = 1;
                $("#datos_reporte").removeClass('hidde_grid');
            } else {
                $("#datos_reporte").addClass('hidde_grid');
                exportar_data = 0;
            }

            $("#grid_repo_libe").jqxGrid('clear');

            var visualizar_defectos = function (row, column, value, rowKey, rowData) {
                var editrow = row;
                var dataRecord = $("#grid_repo_libe").jqxGrid('getrowdata', editrow);
                var html = "";
                if (dataRecord.strCausa !== "") {
                    html = '<center><button class="btn btn-danger btn-sm" onClick=ver_defecto("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-eye"></i></button></center>';
                } else {
                    html = '<center><button class="btn btn-danger btn-sm" onClick=ver_defecto("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-eye-slash"></i></button></center>';
                }
                return html;
            };
            var visualizar_causas = function (row, column, value, rowKey, rowData) {
                var editrow = row;
                var dataRecord = $("#grid_repo_libe").jqxGrid('getrowdata', editrow);
                var html = "";
                if (dataRecord.strCausa !== "") {
                    html = '<center><button class="btn btn-danger btn-sm" onClick=ver_causas("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-eye"></i></button></center>';
                } else {
                    html = '<center><button class="btn btn-danger btn-sm" onClick=ver_causas("' + editrow + '"); style="margin-left: 3px;color: #001255;background-color: white;" ><i class="fas fa-eye-slash"></i></button></center>';
                }
                return html;
            };

            if (reporte2 == 1) {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'varCodiElemento', type: 'String'},
                        {name: 'nombre', type: 'String'},
                        {name: 'Canti', type: 'String'},
                        {name: 'intNuRevis', type: 'String'},
                        {name: 'intNuConta', type: 'String'},
                        {name: 'Zona', type: 'String'},
                        {name: 'Programa', type: 'String'},
                        {name: 'Grupo', type: 'String'},
                        {name: 'deciPesoNeto', type: 'String'},
                        {name: 'deciPesoNetoTota', type: 'String'},
                        {name: 'deciPesoBruto', type: 'String'},
                        {name: 'deciPesoBrutoTota', type: 'String'},
                        {name: 'deciArea', type: 'String'},
                        {name: 'deciPesoAreaTota', type: 'String'},
                        {name: 'deciLong', type: 'String'},
                        {name: 'deciAncho', type: 'String'},
                        {name: 'Etapa', type: 'String'},
                        {name: 'Etapa_Inspeccionada', type: 'String'},
                        {name: 'varPerfil', type: 'String'},
                        {name: 'varModelo', type: 'String'},
                        {name: 'contratista', type: 'String'},
                        {name: 'Supervisor', type: 'String'},
                        {name: 'fech_avan', type: 'String'},
                        {name: 'obse_avan', type: 'String'},
                        {name: 'acti_usua', type: 'String'},
                        {name: 'strEstadoInspe', type: 'String'},
                        {name: 'tinFlgConforForzosa', type: 'number'},
                        {name: 'strDefecto', type: 'String'},
                        {name: 'strCausa', type: 'String'},
                        {name: 'varCodiProy', type: 'String'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);

                var editrow = -1;

                $("#grid_repo_libe").jqxGrid('clear');

                window.setTimeout(function () {

                    $("#modal-cargar-reporlibe").modal('hide'); // COLOCO ANDY 
                }, 1000);

                $("#grid_repo_libe").jqxGrid({
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
                        {text: 'O.T', datafield: 'varCodiProy', width: 130, pinned: true},
                        {text: 'Codigo', datafield: 'varCodiElemento', width: 100, cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_repo_libe").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }], pinned: true},
                        {text: 'Nombre', datafield: 'nombre', width: 130, pinned: true},
                        {text: 'Cantidad', datafield: 'Canti', width: 80, pinned: true, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['Canti']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total);
                                                return total;
                                            }
                                }]},
                        {text: 'Rev.', datafield: 'intNuRevis', width: 80, pinned: true},
                        {text: 'Repro.', datafield: 'intNuConta', cellsalign: 'left', width: 80,pinned: true},
                        {text: 'Zonas', datafield: 'Zona', cellsalign: 'left', width: 140},
                        {text: 'Pogramas', datafield: 'Programa', cellsalign: 'left', width: 140},
                        {text: 'Grupos', datafield: 'Grupo', cellsalign: 'left', width: 100},
                        {text: 'Peso Neto', datafield: 'deciPesoNeto', cellsalign: 'left', width: 100, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Peso Neto Total', datafield: 'deciPesoNetoTota', cellsalign: 'left', width: 130, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoNetoTota']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Peso Bruto', datafield: 'deciPesoBruto', cellsalign: 'left', width: 100, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Peso Bruto Total', datafield: 'deciPesoBrutoTota', cellsalign: 'left', width: 130, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoBrutoTota']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Area', datafield: 'deciArea', width: 100, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Area Total', datafield: 'deciPesoAreaTota', width: 130, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoAreaTota']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Long.', datafield: 'deciLong', width: 100},

                        {text: 'Ancho', datafield: 'deciAncho', width: 100},
                        {text: 'Etapa', datafield: 'Etapa', width: 220},
                        {text: 'Etp.Inspeccion', datafield: 'Etapa_Inspeccionada', width: 100},
                        {text: 'Perfil', datafield: 'varPerfil', width: 150},

                        {text: 'Modelo', datafield: 'varModelo', width: 100},
                        {text: 'Contratista', datafield: 'contratista', width: 180},
                        {text: 'Supervisor', datafield: 'Supervisor', width: 180},
                        {text: 'fech. Avance', datafield: 'fech_avan', width: 100},

                        {text: 'Observacion', datafield: 'obse_avan', width: 220},
                        {text: 'Creador por', datafield: 'acti_usua', width: 100},
                        {text: 'Estado Insp.', datafield: 'strEstadoInspe', width: 100},
                        {text: 'C.F', width: 35, columntype: 'checkbox', datafield: 'tinFlgConforForzosa'},
                        {text: 'Defecto', datafield: 'Data', cellsrenderer: visualizar_defectos, width: 70},
                        {text: 'Causa', datafield: 'Data2', width: 70, cellsrenderer: visualizar_causas}
                    ]
                });

            } else {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'varCodiElemento', type: 'String'},
                        {name: 'nombre', type: 'String'},
                        {name: 'intSerie', type: 'String'},
                        {name: 'intNuRevis', type: 'String'},
                        {name: 'intNuConta', type: 'String'},
                        {name: 'Zona', type: 'String'},
                        {name: 'Programa', type: 'String'},
                        {name: 'Grupo', type: 'String'},
                        {name: 'deciPesoNeto', type: 'String'},
                        {name: 'deciPesoBruto', type: 'String'},
                        {name: 'deciArea', type: 'String'},
                        {name: 'deciLong', type: 'String'},
                        {name: 'deciAncho', type: 'String'},

                        {name: 'Etapa', type: 'String'},
                        {name: 'Etapa_Inspeccionada', type: 'String'},
                        {name: 'varPerfil', type: 'String'},
                        {name: 'varModelo', type: 'String'},
                        {name: 'contratista', type: 'String'},
                        {name: 'Supervisor', type: 'String'},

                        {name: 'fech_avan', type: 'String'},
                        {name: 'obse_avan', type: 'String'},
                        {name: 'acti_usua', type: 'String'},
                        {name: 'strEstadoInspe', type: 'String'},
                        {name: 'tinFlgConforForzosa', type: 'number'},

                        {name: 'strDefecto', type: 'String'},
                        {name: 'strCausa', type: 'String'},
                        {name: 'varCodiProy', type: 'String'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);

                var editrow = -1;


                $("#grid_repo_libe").jqxGrid('clear');
                window.setTimeout(function () {

                    $("#modal-cargar-reporlibe").modal('hide'); // COLOCO ANDY 
                }, 1000);

                $("#grid_repo_libe").jqxGrid({
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
                        {text: 'O.T', datafield: 'varCodiProy', width: 130, pinned: true},
                        {text: 'Codigo', datafield: 'varCodiElemento', width: 100, cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_repo_libe").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }], pinned: true},
                        {text: 'Nombre', datafield: 'nombre', width: 130, pinned: true},
                        {text: 'Serie', datafield: 'intSerie', width: 80, pinned: true, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['intSerie']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total);
                                                return total;
                                            }
                                }]},
                        {text: 'Rev.', datafield: 'intNuRevis', width: 80, pinned: true},
                        {text: 'Repro.', datafield: 'intNuConta', cellsalign: 'left', width: 80,pinned: true},
                        {text: 'Zonas', datafield: 'Zona', cellsalign: 'left', width: 140},
                        {text: 'Pogramas', datafield: 'Programa', cellsalign: 'left', width: 140},
                        {text: 'Grupos', datafield: 'Grupo', cellsalign: 'left', width: 100},
                        {text: 'Peso Neto', datafield: 'deciPesoNeto', cellsalign: 'left', width: 100, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoNeto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Peso Bruto', datafield: 'deciPesoBruto', cellsalign: 'left', width: 100, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciPesoBruto']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Area', datafield: 'deciArea', width: 100, aggregates: [{

                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['deciArea']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Long.', datafield: 'deciLong', width: 100},

                        {text: 'Ancho', datafield: 'deciAncho', width: 100},
                        {text: 'Etapa', datafield: 'Etapa', width: 220},
                        {text: 'Etp.Inspeccion', datafield: 'Etapa_Inspeccionada', width: 100},
                        {text: 'Perfil', datafield: 'varPerfil', width: 150},

                        {text: 'Modelo', datafield: 'varModelo', width: 100},
                        {text: 'Contratista', datafield: 'contratista', width: 180},
                        {text: 'Supervisor', datafield: 'Supervisor', width: 180},
                        {text: 'fech. Avance', datafield: 'fech_avan', width: 100},

                        {text: 'Observacion', datafield: 'obse_avan', width: 220},
                        {text: 'Creador por', datafield: 'acti_usua', width: 100},
                        {text: 'Estado Insp.', datafield: 'strEstadoInspe', width: 100},
                        {text: 'C.F', width: 35, columntype: 'checkbox', datafield: 'tinFlgConforForzosa'},
                        {text: 'Defecto', datafield: 'Data', cellsrenderer: visualizar_defectos, width: 70},
                        {text: 'Causa', datafield: 'Data2', width: 70, cellsrenderer: visualizar_causas}
                    ]
                });

            }



            $("#grid_repo_libe").jqxGrid('localizestrings', localizationobj);
            var dataCount = $('#grid_repo_libe').jqxGrid('getrows');




        }
    });
}

$("#exportar_repor_libe").click(function () {
    if (exportar_data === 0) {
        mensaje(false, "No hay data para exportar", "no");
    } else {
        //var data = $("#grid").jqxGrid('getrows');
        var data = $("#grid_repo_libe").jqxGrid('exportData', 'json');

        JSONToCSVConvertor(data, "Reporte Liberacion", true);
    }
});

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


function handleClick(myRadio) {


    rango_fechas_radio = 0;
    var fechas_diferentes = 0;
    let contra_radio = $("#contra_repo_libe").val();
    let inspe_radio = $("#inspe_repo_libe").val();
    let tipo_repo_radio = $("#combo_tipo_repo").val();
    let tipo_inspe_radio = $("#combo_tipo_inspe").val();

    let fecha_inicio_radio = $("#fech_inic_repo_libe").val();
    let fecha_final_radio = $("#fech_fin_repo_libe").val();
    let radio_check = myRadio.value;

    //console.log(codigoot, codigoproducto, check_zona, check_programa, check_etapa, check_codi_elem, contra_radio, inspe_radio, tipo_repo_radio, tipo_inspe_radio);


    if (fecha_inicio_radio !== "" && fecha_final_radio !== "") {

        if (fecha_inicio_radio > fecha_final_radio) {
            $("#grid_repo_libe").jqxGrid('clear');
            fechas_diferentes = 1;
            mensaje(false, "Fecha inicio debe ser menor a la fecha final", "no");
        } else {
            rango_fechas = 1;
        }
    } else {
        fechas_diferentes = 1;
        mensaje(false, "Ingrese el rango de fecha(inicio/final)", "no");
    }





    if (fechas_diferentes === 0) {
        if (codigoot) {//validamos la ot
            if (codigoproducto) {//VALIDAR EL TIPO ELEMENTO
                if (check_zona) {   //VALIDAR LA ZONA
                    if (check_programa) {// VALIDAR EL PROGRAMA
                        if (check_etapa) {
                            if (inspe_radio) {
                                if (contra_radio) {
                                    if (check_codi_elem) {
                                        if (tipo_repo_radio) {
                                            if (tipo_inspe_radio) {
                                                console.log(radio_check);
                                                //console.log(ot_proye, codi_tipo_elem, zona, tarea, etapa, inspe, contra, codi_elem, fecha_inicio, fecha_final, tipo_repo, tipo_inspe);
                                                grilla_reportar_liberacion(codigoot, codigoproducto, check_zona, check_programa, check_etapa, inspe_radio, contra_radio, check_codi_elem, fecha_inicio_radio, fecha_final_radio, tipo_repo_radio, radio_check, tipo_inspe_radio);
                                                indicador(codigoot, codigoproducto, check_zona, check_programa, check_etapa, inspe_radio, contra_radio, check_codi_elem, fecha_inicio_radio, fecha_final_radio, tipo_repo_radio, radio_check, tipo_inspe_radio);
                                            } else {
                                                mensaje(false, "INGRESE EL TIPO INSPECCION", "no");
                                            }
                                        } else {
                                            mensaje(false, "INGRESE EL TIPO REPORTE", "no");
                                        }
                                    } else {
                                        mensaje(false, "INGRESE EL CODIGO ELEMENTO", "no");
                                    }
                                } else {
                                    mensaje(false, "INGRESE EL CONTRATISTA", "no");
                                }
                            } else {
                                mensaje(false, "INGRESE LA ETAPA", "no");
                            }
                        } else {
                            mensaje(false, "INGRESE EL ETAPA", "no");
                        }
                    } else {
                        mensaje(false, "INGRESE EL PROGRAMA", "no");
                    }
                } else {
                    mensaje(false, "INGRESE LA ZONA", "no");
                }
            } else {
                mensaje(false, "INGRESE LA TIPO ELEMENTO", "no");
            }

        } else {
            mensaje(false, "INGRESE LA O.T", "no");
        }
    }
}
function ver_defecto(id_row) {
    var dataRecord = $("#grid_repo_libe").jqxGrid('getrowdata', id_row);
    if (dataRecord.strDefecto === "") {
        mensaje(false, "No hay defectos para Mostrar", "no");
    } else {
        var arrayDeCadenas = dataRecord.strDefecto.split(',');
        console.log(arrayDeCadenas);
        var codigo_combo = "";
        $.each(arrayDeCadenas, function (index) {
            codigo_combo += "'" + parseInt(arrayDeCadenas[index]) + "',";
        });
        obtener_defectos(codigo_combo);
    }
}
function ver_causas(id_row) {
    var dataRecord = $("#grid_repo_libe").jqxGrid('getrowdata', id_row);
    if (dataRecord.strCausa === "") {
        mensaje(false, "No hay causas para Mostrar", "no");
    } else {
        var arrayDeCadenas = dataRecord.strCausa.split(',');
        var codigo_combo = "";
        $.each(arrayDeCadenas, function (index) {
            codigo_combo += "'" + parseInt(arrayDeCadenas[index]) + "',";
        });
        obtener_causas(codigo_combo);
    }
}
function obtener_defectos(defectos) {
    $("#grid_info_defecto").jqxGrid('clear');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_detalle_inspeccion',
        dataType: 'json',
        data: {
            strDefecto: defectos
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //grilla_reportar_liberacion();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'acti_hora', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'hora_modi', type: 'string'},
                    {name: 'intIdAgru', type: 'string'},
                    {name: 'intIdDefe', type: 'string'},
                    {name: 'intIdEsta', type: 'string'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'varCodiDefe', type: 'string'},
                    {name: 'varDescDefe', type: 'string'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid_info_defecto").jqxGrid({
                width: '100%',
                height: 300,
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                selectionmode: 'multiplecellsextended',
                sortable: true,
                theme: 'darkblue',
                columns: [
                    {text: 'Defecto', width: '100%', datafield: 'varDescDefe', cellsalign: 'center'}
                ]
            });

        }
    });
    $("#modal-info-defecto").modal('show');
}
function obtener_causas(defectos) {
    $("#grid_info_defecto").jqxGrid('clear');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_detalle_causas',
        dataType: 'json',
        data: {
            strCausa: defectos
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //grilla_reportar_liberacion();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdCausa', type: 'string'},
                    {name: 'varCodiCausa', type: 'string'},
                    {name: 'varDescCausa', type: 'string'},
                    {name: 'intIdEsta', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'string'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'string'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid_info_defecto").jqxGrid({
                width: '100%',
                height: 300,
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                selectionmode: 'multiplecellsextended',
                sortable: true,
                theme: 'darkblue',
                columns: [
                    {text: 'Causa', width: '100%', datafield: 'varDescCausa', cellsalign: 'center'}
                ]
            });

        }
    });
    $("#modal-info-defecto").modal('show');
}