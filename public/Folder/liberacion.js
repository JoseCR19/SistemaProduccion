var codigoproducto = "";
var index = "";
var codigoot = "";
var check_zona = "";
var check_tarea = "";
var check_etapa = "";
var check_items_zona = [];
var editrow = -1;
var check_etapa = "";
var array_avance = [];
var checkedItems_etapa = "";
var cod_contratista_mimco = "";
var contrata = "";
var maquina = "";
var supervisor = "";
var cod_valorizacion = "";
var per_valo = "";
var cod_per_valo = "";
var var_valo = "";
var cod_tipo_etapa = "";
var bool_despacho = "";
var idasig_etapa = "";
var contador = 0;
var elemento_id = "";
var array_contratas = [];
var array_completo = [];
var variable_max = 0;
var array_errores = [];
var admi_asig_perm_data_json = {};
var row_errores = "";
var hay_mensaje = "";
var bool_contrata = "";
var bool_despacho = "";
var bool_maquina = "";
var bool_supervisor = "";
var array_asignaciones = [];
var val_contratista = "";
var val_bulto = "";
var val_maquina = "";
var val_guia = "";
var val_supervisor = "";
var array_errores_i = [];
var select_inspe = "";
var defecto_id = "";
var causa_id = "";
var supervisor__primer_modal = "";
var supervisor__segundo_modal = "";
function dropDownlist() {
    $("#zona").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#tarea").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#etapa").jqxDropDownList({width: 280, height: 30, placeHolder: "Seleccione"});
}
$("#excel_lista_ot").click(function () {
    var errores = $("#grid4").jqxGrid('exportdata', 'html');
    ExportToExcel(errores);
});
$("#producto").on('change', function (event) {
    ocultar();
    codigoproducto = "";
    $("#grid").jqxGrid('clear');
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoproducto = item.value;
        }
    }
    if (codigoproducto) {
        listar_zona(codigoproducto, codigoot);
        listar_etap_usua(codigoproducto, codigoot);

    }
});
$("#txt_ot").on('change', function (event) {
    ocultar();
    codigoot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            //$("#producto").jqxDropDownList('selectIndex', 0);
            check_items_zona = [];
        }
    }
    if (codigoot) {
        listar_etap_usua(codigoproducto, codigoot);
        listar_zona(codigoproducto, codigoot);
    }
});
$("#zona").on('change', function (event) {
    check_items_zona = [];
    check_zona = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_items_zona.push(parseInt(item.value));
            check_zona = item.value;
        }
    }
    if (check_items_zona) {
        listar_tarea(codigoproducto, codigoot, check_items_zona);
    } else {
        $("#tarea").jqxDropDownList('clear');
    }
});
$("#tarea").on('change', function (event) {
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_tarea = item.value;
        }
    }
});
$("#etapa").on('change', function (event) {
    ocultar();
    check_etapa = "";
    bool_contrata = "";
    bool_maquina = "";
    bool_supervisor = "";
    bool_despacho = "";
    $("#grid").jqxGrid('clear');
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_etapa = item.value;
        }
    }
});
$("#supervisor_avance_inspeccionar").on('change', function (event) {
    supervisor__segundo_modal = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            supervisor__segundo_modal = item.value;
        }
    }
});

$("#btn_cerr_asig_2").on('click', function () {
    limpiar_segundo_modal();
});
$("#btn_cerr_elem").on('click', function () {
    limpiar_primer_modal();
});
function limpiar_segundo_modal() {
    $("#observacion").val('');
    $("#modal-conforme").modal('hide');
    $("#supervisor_avance").jqxDropDownList('clearSelection');
}
$("#asignar_conforme").on('click', function () {
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {
        listar_modal();
    } else {
        mensaje(false, "No ha seleccionado ningun elemento.", "no");
    }
});
function limpiar_primer_modal()
{
    $("#nombre").val('');
    $("#varCodVal").val('');
    $("#varModelo").val('');
    $("#varPerfil").val('');
    $("#Zona").val('');
    $("#Programa").val('');
    $("#Grupo").val('');
    $("#Contratista").val('');
    $("#deciPrec").val('');
    $("#deciPesoNeto").val('');
    $("#deciPesoBruto").val('');
    $("#deciLong").val('');
    $("#deciArea").val('');
    $("#deciAncho").val('');
    $("#etapa_anterior").val('');
    $("#etapa_siguiente").val('');
    $("#grup_elem").val('');
    $("#intIdEtapaAnte").val('');
    $("#intIdEtapaSiguiente").val('');
    $("#intIdProyTarea").val('');
    $("#intIdRuta").val('');
    $("#intRevision").val('');
    $("#intidetapa").val('');
    $("#intCantRepro").val('');
    $("#intIdProyZona").val('');
    $("#intIdContr").val('');
    $("#intIdProyPaquete").val('');
    $("#cant").val('');
    $("ContratistaAnt").val('');
    $("#FechaAvanAnt").val('');
    $("#Doc_Ant").val('');
    $("#Pintura").val('');
    $("#IdContrAnt").val('');
    $("#Obs1").val('');
    $("#obs2").val('');
    $("#obs3").val('');
    $("#obs4").val('');
    $("#modal-elementos").modal('hide');
    $("#intIdEsta_elementos").val('');
    $("#supervisor_avance_inspeccionar").jqxDropDownList('clearSelection');
    $("#grid4").jqxGrid('clearSelection');
}

$("#limpiar").on('click', function () {
    
    
    $("#txt_ot").jqxComboBox('selectIndex',0);
    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#zona").jqxDropDownList('selectIndex', 0);
    $("#tarea").jqxDropDownList('selectIndex', 0);
    $("#etapa").jqxDropDownList('selectIndex', 0);
    $("#grid").jqxGrid('clearSelection');
});
$("#cerrar_modal_asig_avan_errores").on('click', function () {
    array_errores = [];
    $("#modal-errores-asignar-avance").modal('hide');
});
$("#cerrar_no_conforme").on('click', function () {
    $("#causa").jqxDropDownList('clearSelection');
    $("#defecto").jqxDropDownList('clearSelection');
    $("#observacion_no_conforme").val('');
    $("#modal-no-conforme").modal('hide');
});
$("#registrar_liberacion").on('click', function () {
    var array_avance = [];
    var textData = "";
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    if (rowindex.length > 0) {
        for (var i = 0; i < rowindex.length; i++) {
            textData = $('#grid').jqxGrid('getrowdata', rowindex[i]);
            var row = {Canti: textData['Canti'], varCodiElemento: textData['varCodiElemento'], nombre: textData['nombre'],
                varCodVal: textData['varCodVal'], varModelo: textData['varModelo'], varPerfil: textData['varPerfil'],
                intRevision: textData['intRevision'], intCantRepro: textData['intCantRepro'], Zona: textData['Zona'],
                Programa: textData['Programa'], Grupo: textData['Grupo'], Contratista: textData['Contratista'],
                deciPrec: textData['deciPrec'], deciPesoNeto: textData['deciPesoNeto'], deciPesoBruto: textData['deciPesoBruto'],
                deciLong: textData['deciLong'], deciArea: textData['deciArea'], deciAncho: textData['deciAncho'], etapa_anterior: textData['etapa_anterior'],
                etapa_siguiente: textData['etapa_siguiente'], intIdContr: textData['intIdContr'], intIdRuta: textData['intIdRuta'],
                intIdEtapaAnte: textData['intIdEtapaAnte'], intIdEtapaSiguiente: textData['intIdEtapaSiguiente'], intIdProyPaquete: textData['intIdProyPaquete'],
                intIdProyTarea: textData['intIdProyTarea'], intIdProyZona: textData['intIdProyZona'], intidetapa: textData['intidetapa'], varcodelement: textData['data_seriales'],
                ContratistaAnt: textData['ContratistaAnt'], FechaAvanAnt: textData['FechaAvanAnt'], Doc_Ant: textData['Doc_Ant'], Pintura: textData['Pintura'], IdContraAnt: textData['IdContraAnt'], intIdEsta: textData['intIdEsta'], tipo_reporte: 2,
                DocEnvioTS: textData['DocEnvioTS'], bulto: textData['var_bulto'], Obs1: textData['Obs1'], obs2: textData['obs2'], obs3: textData['obs3'],obs4: textData['obs4'], intIdLotePintura: textData['intIdLotePintura'], LotePintura: textData['LotePintura']
            };
            array_avance.push(row);
        }
        var myJsonString = JSON.stringify(array_avance);
        if ($("#supervisor_avance").val()) {
            store_registro_avance(myJsonString);
        } else {
            mensaje(false, "NO ha seleccionado un Supervisor", "no");
        }
    } else {
        mensaje(false, "NO ha seleccionado un Elemento", "no");
    }
});

function periodo_valorizacion(id_etapa) {
    let user = obtener_user();
    var periodo = "";
    var id_perido = "";
    per_valo = "";
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_obte_peri_valo',
        dataType: 'json',
        data: {
            acti_usua: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            per_valo = responses.data[0]['@v_estado'];
            cod_per_valo = responses.data[0]['@v_idPeriodo'];
            if (per_valo === "ACTIVO") {
                /*SI EL PERIODO DE VALORIZACIÓN ESTA ACTIVO ENTONCES BUSCAREMOS SI SE VALORIZA O NO*/
                valoriza(id_etapa, id_perido);
            } else {
                mensaje(false, "No se puede asignar avances, No hay perido de valorización", "no");
            }
        }
    });
}
/*VALIDAMOS SI LA ETAPA ESTA VALORIZADA,  SI ESTA VALORIZADA MOSTRAR EL COMBO DE LOS CONTRATISTAS SI NO SE ENCUENTRA VALORIZADA MOSTRAR
 * EL COMOBO POR DEFECTO MIMCO PERSONAL */
function valoriza(id_etapa, id_perido) {
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/envi_valo_cod',
        dataType: 'json',
        data: {
            intIdEtapa: id_etapa,
            intIdProy: codigoot,
            intIdTipoProducto: codigoproducto
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            bool_despacho = "";
            cod_tipo_etapa = responses.data[0]['varCodiTipoEtap'];
            bool_despacho = responses.data[0]['boolDesp'];
            idasig_etapa = responses.data[0]['intIdAsigEtapProy'];
            var_valo = responses.data[0]['varValoEtapa'];
        }
    });
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");

    if (rowindex.length > 0) {
        $("#modal-conforme").modal('show');

    } else {
        $("#modal-elementos").modal('show');
    }

    // $("#modal-asignar-avance").modal('show');
}
function store_registro_avance(array_avance) {
    var observacion = $("#observacion").val();
    //var check = document.getElementById('conformidad_forzosa').checked;
    var bulto = '';
    var guia = '';
    let user = obtener_user();
    var check = "";

    var rowindex_grilla = $("#grid").jqxGrid("getselectedrowindexes");

    if (rowindex_grilla.length > 0) {
        if (document.getElementById('conformidad_forzosa').checked == true) {
            check = 1;
        } else {
            check = 0;
        }
    } else {
        check = 0;
    }
    $("#modal-cargar-avance").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_regi_avance',
        dataType: 'json',
        data: {
            v_intIdproy: parseInt(codigoot),
            v_intIdTipoProducto: parseInt(codigoproducto),
            v_strDeObser: observacion,
            v_intIdMaqui: 0,
            v_strBulto: bulto,
            v_intIdPeriValo: parseInt(cod_per_valo),
            v_usuario: user,
            v_intIdInspe: 0,
            v_varValoEtapa: var_valo,
            v_varCodiTipoEtap: cod_tipo_etapa,
            v_boolDesp: bool_despacho,
            v_intIdAsigEtapProy: parseInt(idasig_etapa),
            v_informacion: array_avance,
            v_varNumeroGuia: guia,
            v_intIdSuper: supervisor__primer_modal,
            v_intIdContr: parseInt(21),
            v_tinFlgConforForzosa: check,
            v_strDefecto: '',
            v_strCausa: '',
            strEstadoInspe: 'C',
            v_intIdDespa: 0
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje_alternativo === "sin error") {
                $("#modal-conforme").modal('hide');
                mensaje(true, "Se asigno correctamente", "modal-cargar-avance");
                limpiar_segundo_modal();
                limpiar_primer_modal();
                array_avance = [];
                $("#grid").jqxGrid('clearSelection');
                supervisor__primer_modal = "";
                listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            } else {
                $("#modal-conforme").modal('hide');
                mensaje(false, "Hay errores al Asignar Avance.", "modal-cargar-avance");
                limpiar_segundo_modal();
                limpiar_primer_modal();
                $("#grid").jqxGrid('clearSelection');
                listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
                listar_errores(responses.data.mensaje);
            }
        }
    });
}
function store_registro_avance_3(array_avance) {
    var observacion = $("#observacion").val();
    //var check = document.getElementById('conformidad_forzosa').checked;
    var bulto = '';
    var guia = '';
    let user = obtener_user();
    var check = "";

    var rowindex_grilla = $("#grid").jqxGrid("getselectedrowindexes");

    if (rowindex_grilla.length > 0) {
        if (document.getElementById('conformidad_forzosa').checked == true) {
            check = 1;
        } else {
            check = 0;
        }
    } else {
        check = 0;
    }
    $("#modal-cargar-avance").modal('show');

    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_regi_avance',
        dataType: 'json',
        data: {
            v_intIdproy: parseInt(codigoot),
            v_intIdTipoProducto: parseInt(codigoproducto),
            v_strDeObser: observacion,
            v_intIdMaqui: 0,
            v_strBulto: bulto,
            v_intIdPeriValo: parseInt(cod_per_valo),
            v_usuario: user,
            v_intIdInspe: 0,
            v_varValoEtapa: var_valo,
            v_varCodiTipoEtap: cod_tipo_etapa,
            v_boolDesp: bool_despacho,
            v_intIdAsigEtapProy: parseInt(idasig_etapa),
            v_informacion: array_avance,
            v_varNumeroGuia: guia,
            v_intIdSuper: supervisor__segundo_modal,
            v_intIdContr: parseInt(21),
            v_tinFlgConforForzosa: check,
            v_strDefecto: '',
            v_strCausa: '',
            strEstadoInspe: 'C',
            v_intIdDespa: 0
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje_alternativo === "sin error") {
                $("#modal-conforme").modal('hide');
                mensaje(true, "Se asigno correctamente", "modal-cargar-avance");
                limpiar_segundo_modal();
                limpiar_primer_modal();
                array_avance = [];
                $("#grid").jqxGrid('clearSelection');
                supervisor__segundo_modal = "";
                listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            } else {
                $("#modal-conforme").modal('hide');
                mensaje(false, "Hay errores al Asignar Avance.", "modal-cargar-avance");
                limpiar_segundo_modal();
                limpiar_primer_modal();
                $("#grid").jqxGrid('clearSelection');
                listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
                listar_errores(responses.data.mensaje);
            }
        }
    });

}
function store_registro_avance_2(array_avance) {
    var observacion = $("#observacion_no_conforme").val();
    // var check = document.getElementById('conformidad_forzosa').checked;
    var check = 0;
    var defecto = $("#defecto").val();
    var causa = $("#causa").val();
    var bulto = '';
    var guia = '';
    let user = obtener_user();
    $("#modal-cargar-avance").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_regi_avance',
        dataType: 'json',
        data: {
            v_intIdproy: parseInt(codigoot),
            v_intIdTipoProducto: parseInt(codigoproducto),
            v_strDeObser: observacion,
            v_intIdMaqui: 0,
            v_strBulto: bulto,
            v_intIdPeriValo: parseInt(cod_per_valo),
            v_usuario: user,
            v_intIdInspe: 0,
            v_varValoEtapa: var_valo,
            v_varCodiTipoEtap: cod_tipo_etapa,
            v_boolDesp: bool_despacho,
            v_intIdAsigEtapProy: parseInt(idasig_etapa),
            v_informacion: array_avance,
            v_varNumeroGuia: guia,
            v_intIdSuper: supervisor__segundo_modal,
            v_intIdContr: parseInt(21),
            v_tinFlgConforForzosa: check,
            v_strDefecto: defecto_id,
            v_strCausa: causa_id,
            strEstadoInspe: 'N',
            v_intIdDespa: 0
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje_alternativo === "sin error") {
                $("#modal-conforme").modal('hide');
                $("#modal-no-conforme").modal('hide');
                $("#observacion_no_conforme").val('');
                mensaje(true, "Se asigno correctamente", "modal-cargar-avance");
                limpiar_segundo_modal();
                limpiar_primer_modal();
                array_avance = [];
                $("#grid").jqxGrid('clearSelection');
                supervisor__segundo_modal = "";
                listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            } else {
                $("#modal-conforme").modal('hide');
                $("#modal-no-conforme").modal('hide');
                $("#observacion_no_conforme").val('');
                mensaje(false, "Hay errores al Asignar Reproceso.", "modal-cargar-avance");
                limpiar_segundo_modal();
                limpiar_primer_modal();
                $("#grid").jqxGrid('clearSelection');
                listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
                listar_errores(responses.data.mensaje);
            }
        }
    });
}
function listar_errores(data) {
    var new_errores = [];
    var new_list_errores = [];
    for (var i = 0; data.length > i; i++) {
        new_list_errores['mensaje'] = data[i];
        new_errores.push(new_list_errores);
    }
    var source =
            {
                localdata: new_errores,
                datatype: "array",
                datafields: [
                    {name: 'mensaje', type: 'string'}
                ],
                async: false
            };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid2").jqxGrid({
        width: '100%',
        height: '200',
        source: dataAdapter,
        columnsresize: true,
        altrows: true,
        enabletooltips: true,
        theme: 'darkblue',
        columns: [
            {text: 'Mensajes', datafield: 'mensaje'}

        ]
    });
    $("#grid2").jqxGrid('localizestrings', localizationobj);
    $("#modal-errores-asignar-ruta").modal('show');
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
            $("#txt_ot").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '30px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot").jqxComboBox('focus');
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
            //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

            $("#producto").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescTipoProd", valueMember: "intIdTipoProducto", width: 200, height: 30, });
            // Focus the jqxDropDownList
            $("#producto").jqxDropDownList('focus');
            $("#producto").jqxDropDownList('selectIndex', 0);
        }
    });
}
function listar_zona(codigo_producto, codigo_ot) {
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
                listar_zona(codigo_producto, codigo_ot);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje == "Error.") {
                $("#zona").jqxDropDownList('clear');
                $("#tarea").jqxDropDownList('clear');
            } else {
                var new_tarea = [];
                var arra_new2 = [];
                for (let j = 0; j < responses.data.length; j++) {
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
                $("#zona").jqxDropDownList({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30, });
                $("#zona").jqxDropDownList('focus');
                $("#zona").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}
function listar_tarea(codigo_producto, codigo_ot, zona) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionPartList/public/index.php/list_tare_asoc_proy',
        dataType: 'json',
        data: {
            intIdProy: codigo_ot,
            intIdTipoProducto: codigo_producto,
            intIdProyZona: zona
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_tarea(codigo_producto, codigo_ot, zona);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "Error.") {
                $("#tarea").jqxDropDownList('clear');
            } else {
                //responses.data.push({varDescripTarea:'TODOS',intIdProyTarea:-1});
                //responses.data.pop();
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
                $("#tarea").jqxDropDownList({source: dataAdapter, displayMember: "varDescripTarea", valueMember: "intIdProyTarea", width: 200, height: 30});
                $("#tarea").jqxDropDownList('focus');
                $("#tarea").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}
function removeItemFromArr(arr, item) {

    return arr.filter(function (e) {

        return e !== item;
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
function listar_etap_usua(producto, ot) {
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
                $("#etapa").jqxDropDownList('clear');
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
                $("#etapa").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 280, height: 30});
                $("#etapa").jqxDropDownList('focus');
                $("#etapa").jqxDropDownList('selectIndex', 0);
            }
        }
    });
}
$("#btn_busc").click(function () {
    if (codigoproducto) {
        if (codigoot) {
            if (check_zona) {
                if (check_tarea) {
                    if (check_etapa) {
                        listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
                    } else {
                        mensaje(false, "Ingrese una Etapa", "no");
                    }
                } else {
                    mensaje(false, "Ingrese una Tarea", "no");
                }
            } else {
                mensaje(false, "Ingrese una Zona", "no");
            }
        } else {
            mensaje(false, "Ingrese una Ot", "no");
        }
    } else {
        mensaje(false, "Ingrese una Producto", "no");
    }

});

function listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa) {

    $('#grid').jqxGrid('clearSelection');
    $("#grid").jqxGrid('refresh');
    $('#grid').jqxGrid('showloadelement');
    $("#modal-cargar-avance").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_avan',
        dataType: 'json',
        data: {
            v_intIdproy: codigoot,
            v_intIdTipoProducto: codigoproducto,
            v_intIdZona: check_zona,
            v_intIdTarea: check_tarea,
            v_intIdEtapa: check_etapa

        },
        beforeSend: function () {
            $("#btn_busc").prop("disabled", false);
            window.setTimeout(function () {

                $("#modal-cargar-avance").modal('hide'); // COLOCO ANDY 
            }, 1000);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                $("#btn_busc").prop("disabled", false);
                window.setTimeout(function () {

                    $("#modal-cargar-avance").modal('hide'); // COLOCO ANDY 
                }, 1000);
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                visualizar();
            } else {
                ocultar();
            }
            $("#modal-cargar-avance").modal('hide');
            window.setTimeout(function () {

                $("#modal-cargar-avance").modal('hide'); // COLOCO ANDY 
            }, 1000);


            $("#btn_busc").prop("disabled", false);
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiElemento', type: 'string'},
                            {name: 'nombre', type: 'string'},
                            {name: 'varCodVal', type: 'string'},
                            {name: 'varModelo', type: 'string'},
                            {name: 'varPerfil', type: 'string'},
                            {name: 'intRevision', type: 'number'},
                            {name: 'intCantRepro', type: 'number'},
                            {name: 'Canti', type: 'number'},
                            {name: 'Canti_real', type: 'number'},
                            {name: 'Zona', type: 'string'},
                            {name: 'Programa', type: 'string'},
                            {name: 'Grupo', type: 'string'},
                            {name: 'Contratista', type: 'string'},
                            {name: 'deciPrec', type: 'float'},
                            {name: 'deciPesoNeto', type: 'string'},
                            {name: 'deciPesoBruto', type: 'string'},
                            {name: 'deciLong', type: 'float'},
                            {name: 'deciArea', type: 'string'},
                            {name: 'deciAncho', type: 'float'},
                            {name: 'etapa_anterior', type: 'string'},
                            {name: 'etapa_siguiente', type: 'string'},
                            {name: 'intIdContr', type: 'number'},
                            {name: 'intIdRuta', type: 'number'},
                            {name: 'intIdEtapaAnte', type: 'number'},
                            {name: 'intIdEtapaSiguiente', type: 'number'},
                            {name: 'intIdProyPaquete', type: 'number'},
                            {name: 'intIdProyTarea', type: 'number'},
                            {name: 'intIdProyZona', type: 'number'},
                            {name: 'intidetapa', type: 'number'},
                            {name: 'data_seriales', type: 'string'},
                            {name: 'ContratistaAnt', type: 'string'},
                            {name: 'FechaAvanAnt', type: 'string'},
                            {name: 'DocEnvioTS', type: 'string'},
                            {name: 'Pintura', type: 'string'},
                            {name: 'IdContraAnt', type: 'number'},
                            {name: 'intIdTipoGrupo', type: 'number'},
                            {name: 'varDescTipoGrupo', type: 'string'},
                            {name: 'bulto', type: 'string'},
                            {name: 'Obs1', type: 'string'},
                            {name: 'obs2', type: 'string'},
                            {name: 'obs3', type: 'string'},
                            {name: 'obs4', type: 'string'},
                            {name: 'intIdEsta', type: 'number'},
                            {name: 'estado', type: 'string'},
                            {name: 'LotePintura', type: 'string'},
                            {name: 'intIdLotePintura', type: 'string'}
                        ],
                        async: false
                    };
            dataAdapter = new $.jqx.dataAdapter(source);



            var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {

                var html = /*'<button class="btn btn-danger btn-sm" onClick="listar_modal()"><i class="fas fa-check"></i></button> ' + */'<button class="btn btn-danger btn-sm" onClick=listar_inspeccion("' + row + '");><i class="fas fa-search"></i></button> ';
                //var html = "<a href=\"?module=accounts\&applettype\=baseview\&ret_module=accounts\&ret_applettype\=listview\&record=" + href + "\">" + value + "</a>";
                return html;
            };

            $('#grid').jqxGrid('showloadelement');

            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                sortable: true,
                theme: 'darkblue',
                selectionmode: 'checkbox',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: '', dataField: 'opción', width: 35, cellsrenderer: linkrenderer_accounts, cellsalign: 'center'},
                    {text: 'Codigo', datafield: 'varCodiElemento', width: '10%', aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Nombre', datafield: 'nombre', width: 150},
                    {text: 'Estado', datafield: 'estado', width: 120},
                    {text: 'Codigo Val.', datafield: 'varCodVal', width: '8%'},
                    {text: 'Modelo', datafield: 'varModelo', width: '8%'},
                    {text: 'Perfil', datafield: 'varPerfil', width: '10%'},
                    {text: 'Rev.', datafield: 'intRevision', width: '4%'},
                    {text: 'Cant Repr.', datafield: 'intCantRepro', width: '8%'},
                    {text: 'Cant real.', datafield: 'Canti_real', width: '8%', hidden: true},
                    {text: 'Cantidad', datafield: 'Canti', width: '8%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            total = parseFloat(record['Canti']) + parseFloat(aggregatedValue);
                                            total = parseFloat(total);
                                            return total;
                                        }
                            }]},
                    {text: 'seriales', datafield: 'data_seriales', width: '18%', hidden: true},
                    {text: 'Zona', datafield: 'Zona', width: '8%'},
                    {text: 'Programa', datafield: 'Programa', width: '8%'},
                    {text: 'Grupo', datafield: 'Grupo', width: '8%'},
                    {text: 'Contratista', datafield: 'Contratista', width: '15%'},
                    {text: 'Precio', datafield: 'deciPrec'},
                    {text: 'Peso Neto', datafield: 'deciPesoNeto', width: '7%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            subtotal = parseFloat(record['deciPesoNeto']) * parseFloat(record['Canti']);
                                            subtotal = parseFloat(subtotal).toFixed(3);
                                            subtotal = parseFloat(subtotal);

                                            total = subtotal + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: '7%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            subtotal = parseFloat(record['deciPesoBruto']) * parseFloat(record['Canti']);
                                            subtotal = parseFloat(subtotal).toFixed(3);
                                            subtotal = parseFloat(subtotal);

                                            total = subtotal + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Longitud', datafield: 'deciLong', width: '8%'},
                    {text: 'Area', datafield: 'deciArea', width: '6%', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record) {

                                            var total = 0;
                                            subtotal = parseFloat(record['deciArea']) * parseFloat(record['Canti']);
                                            subtotal = parseFloat(subtotal).toFixed(3);
                                            subtotal = parseFloat(subtotal);

                                            total = subtotal + parseFloat(aggregatedValue);
                                            total = parseFloat(total).toFixed(3);
                                            return total;
                                        }
                            }]},
                    {text: 'Ancho', datafield: 'deciAncho', width: '5%'},
                    {text: 'Etapa Anterior', datafield: 'etapa_anterior', width: '18%'},
                    {text: 'Etapa Siguiente', datafield: 'etapa_siguiente', width: '18%'},
                    {text: 'Contratista Anterior', datafield: 'ContratistaAnt', width: '18%'},
                    {text: 'Fecha Avance Anterior', datafield: 'FechaAvanAnt', width: '18%', format: 'dd/MM/yyyy'},
                    {text: 'Documento Transferencia', datafield: 'DocEnvioTS', width: '18%'},
                    {text: 'Pintura', datafield: 'Pintura', width: '18%'},
                    {text: 'Lote Pintura', datafield: 'LotePintura', width: '18%'},
                    {text: 'Tipo Grupo Estructura', datafield: 'varDescTipoGrupo', width: 250},
                    {text: 'Bulto', datafield: 'bulto', width: 250},
                    {text: 'Observación 1', datafield: 'Obs1', width: 250},
                    {text: 'Observación 2', datafield: 'obs2', width: 250},
                    {text: 'Observación 3', datafield: 'obs3', width: 250},
                    {text: 'Observación 4', datafield: 'obs4', width: 250},
                    {text: 'id_grupo_tipo_estructura', width: 140, datafield: 'intIdTipoGrupo', hidden: true},
                    {text: 'IdContrAnt', datafield: 'IdContraAnt', width: '18%', hidden: true},
                    {text: 'intIdEtapa', datafield: 'intIdEtapa', width: '18%', hidden: true},
                    {text: 'intIdEtapaAnte', datafield: 'intIdEtapaAnte', width: '18%', hidden: true},
                    {text: 'intIdEtapaSiguiente', datafield: 'intIdEtapaSiguiente', width: '18%', hidden: true},
                    {text: 'intIdProyTarea', datafield: 'intIdProyTarea', width: '18%', hidden: true},
                    {text: 'intIdProyZona', datafield: 'intIdProyZona', width: '18%', hidden: true},
                    {text: 'intIdRuta', datafield: 'intIdRuta', width: '18%', hidden: true},
                    {text: 'intIdContr', datafield: 'intIdContr', width: '18%', hidden: true},
                    {text: 'intIdEsta', datafield: 'intIdEsta', width: '18%', hidden: true},
                    {text: 'intIdLotePintura', datafield: 'intIdLotePintura', width: '18%', hidden: true},
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    }
    );
}
function visualizar() {
    var deciTotaPesoNeto = 0;
    var deciTotaPesoBruto = 0;
    var deciTotaArea = 0;
    var cantidadtotal = 0;
    var textData = "";
    var cantidad = 0;
    $("#pesos").removeClass('hidde_grid');
    $("#select").val(cantidad);
    $("#cant_su").val(cantidadtotal);
    $("#peso_neto").val(deciTotaPesoNeto.toFixed(3));
    $("#peso_bruto").val(deciTotaPesoBruto.toFixed(3));
    $("#area").val(deciTotaArea.toFixed(3));
}
function ocultar() {
    var deciTotaPesoNeto = 0;
    var deciTotaPesoBruto = 0;
    var deciTotaArea = 0;
    var cantidadtotal = 0;
    var textData = "";
    var cantidad = 0;
    $("#pesos").addClass('hidde_grid');
    $("#select").val(cantidad);
    $("#cant_su").val(cantidadtotal);
    $("#peso_neto").val(deciTotaPesoNeto.toFixed(3));
    $("#peso_bruto").val(deciTotaPesoBruto.toFixed(3));
    $("#area").val(deciTotaArea.toFixed(3));
}
$("#grid").click(function () {
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    var deciTotaPesoNeto = 0;
    var deciTotaPesoBruto = 0;
    var deciTotaArea = 0;
    var cantidadtotal = 0;
    var textData = "";
    var cantidad = 0;
    var array_bulto = [];

    if (rowindex.length > 0) {
        for (var i = 0; i < rowindex.length; i++) {
            cantidad++;
            textData = $('#grid').jqxGrid('getrowdata', rowindex[i]);

            deciTotaPesoNeto = (parseFloat(textData['deciPesoNeto']) * parseFloat(textData['Canti']) + deciTotaPesoNeto);
            deciTotaPesoBruto = (parseFloat(textData['deciPesoBruto']) * parseFloat(textData['Canti']) + deciTotaPesoBruto);
            deciTotaArea = (parseFloat(textData['deciArea']) * parseFloat(textData['Canti']) + deciTotaArea);
            cantidadtotal = textData['Canti'] + cantidadtotal;
        }
        $("#select").val(cantidad);
        $("#cant_su").val(cantidadtotal);
        $("#peso_neto").val(deciTotaPesoNeto.toFixed(3));
        $("#peso_bruto").val(deciTotaPesoBruto.toFixed(3));
        $("#area").val(deciTotaArea.toFixed(3));
    } else {
        $("#select").val(cantidad);
        $("#cant_su").val(cantidadtotal);
        $("#peso_neto").val(deciTotaPesoNeto.toFixed(3));
        $("#peso_bruto").val(deciTotaPesoBruto.toFixed(3));
        $("#area").val(deciTotaArea.toFixed(3));
    }
});
function most_seri_elem() {
    $('#grid4').jqxGrid('clear');
    $('#grid4').jqxGrid('showloadelement');
    $("#grid4").jqxGrid('refresh');
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/repo_avance_serie',
        dataType: 'json',
        data: {
            intIdProy: codigoot,
            intIdTipoProducto: codigoproducto,
            intIdProyPaquete: $("#grup_elem").val(),
            varCodiElemento: $("#id_codigo").val(),
            intIdEtapaAnte: $("#intIdEtapaAnte").val(),
            intIdEtapaSiguiente: $("#intIdEtapaSiguiente").val(),
            intIdProyTarea: $("#intIdProyTarea").val(),
            intIdRuta: $("#intIdRuta").val(),
            intRevision: $("#intRevision").val(),
            intIdEtapa: $("#intidetapa").val(),
            intIdContr: $("#intIdContr").val(),
            intCantRepro: $("#intCantRepro").val(),
            intIdProyZona: $("#intIdProyZona").val(),
            varDescripcion: $("#nombre").val(),
            deciPesoNeto: $("#deciPesoNeto").val(),
            deciPesoBruto: $("#deciPesoBruto").val(),
            deciArea: $("#deciArea").val(),
            deciLong: $("#deciLong").val(),
            varPerfil: $("#varPerfil").val(),
            varModelo: $("#varModelo").val(),
            deciPrec: $("#deciPrec").val(),
            FechaAvanAnt: $("#FechaAvanAnt").val(),
            Doc_Ant: $("#Doc_Ant").val(),
            Pintura: $("#Pintura").val(),
            IdContrAnt: $("#IdContrAnt").val(),
            DocEnvioTS: $("#doc_trans").val(),
            intIdEsta: $("#intIdEsta_elementos").val(),
            bulto: $("#var_bulto").val(),
            Obs1: $("#Obs1").val(),
            obs2: $("#obs2").val(),
            obs3: $("#obs3").val(),
            obs4: $("#obs4").val()
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
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
                            {name: 'intSerie', type: 'string'},
                            {name: 'acti_usua', type: 'string'},
                            {name: 'acti_hora', type: 'date'},
                            {name: 'varDescEtap', type: 'string'},
                            {name: 'deciArea', type: 'string'},
                            {name: 'deciPesoBruto', type: 'string'},
                            {name: 'deciPesoNeto', type: 'string'},
                            {name: 'FechaUltimAvan', type: 'string'},
                            {name: 'intCantRepro', type: 'string'},
                            {name: 'intRevision', type: 'string'},
                        ],
                        async: false
                    };
            dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid4").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                sortable: true,
                selectionmode: 'checkbox',
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: 'intIdEleme', datafield: 'intIdEleme', width: 100, hidden: true},
                    {text: 'Codigo', datafield: 'varCodiElemento', width: 80, aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid4").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Nombre', datafield: 'varDescripcion', width: 80},
                    {text: 'Serie', datafield: 'intSerie', width: 50},
                    {text: 'Revi.', datafield: 'intRevision', width: 50},
                    {text: 'Repro.', datafield: 'intCantRepro', width: 50},
                    {text: 'Peso Neto', datafield: 'deciPesoNeto', width: 120},
                    {text: 'Peso Bruto', datafield: 'deciPesoBruto', width: 120},
                    {text: 'Area', datafield: 'deciArea', width: 120},
                    {text: 'Fecha Termino', datafield: 'FechaUltimAvan', width: 120},
                    {text: 'Etapa', datafield: 'varDescEtap', width: 120},
                    {text: 'Creado por', datafield: 'acti_usua', width: '1%', hidden: true},
                    {text: 'Creado el', datafield: 'acti_hora', width: '1%', cellsformat: 'dd/MM/yyyy', hidden: true}
                ]
            });
        }
    }
    );
}
function mostar_json() {
    admi_asig_perm_data_json = {};
    admi_asig_perm_data_json = $("#grid4").jqxGrid('exportdata', 'json');
}
function combo_supervisor(id_etapa) {
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
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdColaborador'},
                            {name: 'nombre'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#supervisor_avance").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "nombre", valueMember: "intIdColaborador", width: 300, height: 30});
            $("#supervisor_avance").jqxDropDownList('focus');
            for (var i = 0; responses.data.length > i; i++) {
                if (user === responses.data[i].varCodiUsua) {
                    $("#supervisor_avance").val(responses.data[i].intIdColaborador);
                }
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
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdColaborador'},
                            {name: 'nombre'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#supervisor_avance_inspeccionar").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "nombre", valueMember: "intIdColaborador", width: 300, height: 30, });
            $("#supervisor_avance_inspeccionar").jqxDropDownList('focus');
            for (var i = 0; responses.data.length > i; i++) {
                if (user === responses.data[i].varCodiUsua) {
                    $("#supervisor_avance_inspeccionar").val(responses.data[i].intIdColaborador);
                }
            }
        }
    });
}
$("#supervisor_avance").on('change', function (event) {
    supervisor__primer_modal = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            supervisor__primer_modal = item.value;
        }
    }
});
$("#defecto").on('checkChange', function (event) {
    defecto_id = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            var items = $("#defecto").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
                defecto_id += this.value + ",";
            });
        }
    }
});
$("#causa").on('checkChange', function (event) {
    causa_id = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            var items = $("#causa").jqxDropDownList('getCheckedItems');
            $.each(items, function (index) {
                causa_id += this.value + ",";
            });
        }
    }
});
function combo_defecto(id_etapa) {

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/lista_defecto_etapa',
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

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdDefe'},
                            {name: 'varDescDefe'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#defecto").jqxDropDownList({checkboxes: true, placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescDefe", valueMember: "intIdDefe", width: 200, height: 30, });
            $("#defecto").jqxDropDownList('focus');
        }
    });
}
function combo_causa() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_causa',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiCausa'},
                            {name: 'varDescCausa'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#causa").jqxDropDownList({checkboxes: true, placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescCausa", valueMember: "varCodiCausa", width: 200, height: 30});
            $("#causa").jqxDropDownList('focus');
        }
    });
}
function listar_modal() {
    combo_supervisor(check_etapa);
    periodo_valorizacion(check_etapa);
    document.getElementById('conformidad_forzosa').checked = false;
    //$("#modal-conforme").modal('show');
}
$("#conforme_inspeccionar").on('click', function () {
    var array_avance = [];
    combo_supervisor_inspeccionar(check_etapa);
    var rowindex_2 = $("#grid4").jqxGrid("getselectedrowindexes");
    if (rowindex_2.length > 0) {
        var checkedItems_etapa = "";
        for (var i = 0; i < rowindex_2.length; i++) {
            textData = $('#grid4').jqxGrid('getrowdata', rowindex_2[i]);
            checkedItems_etapa += textData['intSerie'] + ",";
        }
        var dataRecord = $("#grid").jqxGrid('getrowdata', index);
        var row = {Canti: dataRecord['Canti'], varCodiElemento: dataRecord['varCodiElemento'], nombre: dataRecord['nombre'],
            varCodVal: dataRecord['varCodVal'], varModelo: dataRecord['varModelo'], varPerfil: dataRecord['varPerfil'],
            intRevision: dataRecord['intRevision'], intCantRepro: dataRecord['intCantRepro'], Zona: dataRecord['Zona'],
            Programa: dataRecord['Programa'], Grupo: dataRecord['Grupo'], Contratista: dataRecord['Contratista'],
            deciPrec: dataRecord['deciPrec'], deciPesoNeto: dataRecord['deciPesoNeto'], deciPesoBruto: dataRecord['deciPesoBruto'],
            deciLong: dataRecord['deciLong'], deciArea: dataRecord['deciArea'], deciAncho: dataRecord['deciAncho'], etapa_anterior: dataRecord['etapa_anterior'],
            etapa_siguiente: dataRecord['etapa_siguiente'], intIdContr: dataRecord['intIdContr'], intIdRuta: dataRecord['intIdRuta'],
            intIdEtapaAnte: dataRecord['intIdEtapaAnte'], intIdEtapaSiguiente: dataRecord['intIdEtapaSiguiente'], intIdProyPaquete: dataRecord['intIdProyPaquete'],
            intIdProyTarea: dataRecord['intIdProyTarea'], intIdProyZona: dataRecord['intIdProyZona'], intidetapa: dataRecord['intidetapa'], varcodelement: checkedItems_etapa,
            ContratistaAnt: dataRecord['ContratistaAnt'], FechaAvanAnt: dataRecord['FechaAvanAnt'], Doc_Ant: dataRecord['Doc_Ant'], Pintura: dataRecord['Pintura'], IdContrAnt: dataRecord['IdContraAnt'], intIdEsta: dataRecord['intIdEsta'], tipo_reporte: 2,
            DocEnvioTS: dataRecord['DocEnvioTS'], bulto: dataRecord['var_bulto'], Obs1: dataRecord['Obs1'], obs2: dataRecord['obs2'], obs3: dataRecord['obs3'], obs4: dataRecord['obs4'],LotePintura: dataRecord['LotePintura'],intIdLotePintura: dataRecord['intIdLotePintura']
        };
        array_avance.push(row);
        var myJsonString = JSON.stringify(array_avance);
        if ($("#supervisor_avance_inspeccionar").val()) {
            store_registro_avance_3(myJsonString);
        } else {
            mensaje(false, "No ha seleccionado un Supervisor", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado un Elemento", "no");
    }
});

function listar_inspeccion(data) {
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");//coloco andy
    if (rowindex.length > 0) { //coloco andy
        mensaje(false, "Debe ir al boton CONFORME");
    } else {//coloco andy
        periodo_valorizacion(check_etapa);
        index = data;
        combo_supervisor_inspeccionar(check_etapa);
        var dataRecord = $("#grid").jqxGrid('getrowdata', data);
        $("#doc_trans").val(dataRecord.DocEnvioTS);
        $("#id_codigo").val(dataRecord.varCodiElemento);
        $("#ContratistaAnt").val(dataRecord.ContratistaAnt);
        $("#FechaAvanAnt").val(dataRecord.FechaAvanAnt);
        $("#Doc_Ant").val(dataRecord.Doc_Ant);
        $("#Pintura").val(dataRecord.Pintura);
        $("#IdContrAnt").val(dataRecord.IdContraAnt);
        $("#nombre").val(dataRecord.nombre);
        $("#varCodVal").val(dataRecord.varCodVal);
        $("#varModelo").val(dataRecord.varModelo);
        $("#varPerfil").val(dataRecord.varPerfil);
        $("#intRevision").val(dataRecord.intRevision);
        $("#intCantRepro").val(dataRecord.intCantRepro);
        $("#Zona").val(dataRecord.Zona);
        $("#Programa").val(dataRecord.Programa);
        $("#Grupo").val(dataRecord.Grupo);
        $("#Contratista").val(dataRecord.Contratista);
        $("#deciPrec").val(dataRecord.deciPrec);
        $("#deciPesoNeto").val(dataRecord.deciPesoNeto);
        $("#deciPesoBruto").val(dataRecord.deciPesoBruto);
        $("#deciLong").val(dataRecord.deciLong);
        $("#deciArea").val(dataRecord.deciArea);
        $("#deciAncho").val(dataRecord.deciAncho);
        $("#etapa_anterior").val(dataRecord.etapa_anterior);
        $("#etapa_siguiente").val(dataRecord.etapa_siguiente);
        $("#cant").val(dataRecord.Canti);
        $("#grup_elem").val(dataRecord.intIdProyPaquete);
        $("#intIdEtapaAnte").val(dataRecord.intIdEtapaAnte);
        $("#intIdEtapaSiguiente").val(dataRecord.intIdEtapaSiguiente);
        $("#intIdProyTarea").val(dataRecord.intIdProyTarea);
        $("#intIdProyZona").val(dataRecord.intIdProyZona);
        $("#intIdRuta").val(dataRecord.intIdRuta);
        $("#intIdContr").val(dataRecord.intIdContr);
        $("#intidetapa").val(dataRecord.intidetapa);
        $("#intIdProyPaquete").val(dataRecord.intIdProyPaquete);
        $("#intIdEsta_elementos").val(dataRecord.intIdEsta);
        $("#var_bulto").val(dataRecord.bulto);
        $("#Obs1").val(dataRecord.Obs1);
        $("#obs2").val(dataRecord.obs2);
        $("#obs3").val(dataRecord.obs3);
        $("#obs4").val(dataRecord.obs4);
        most_seri_elem();
    }//coloco andy


    // $('#modal-elementos').modal('show');
}
$("#no_conforme_inspeccionar").on('click', function () {
    var rowindex = $("#grid4").jqxGrid("getselectedrowindexes");
    var data = $("#grid").jqxGrid('getrowdata', index);
    if (rowindex.length > 0) {
        if ($("#supervisor_avance_inspeccionar").val()) {
            combo_defecto(data.intIdEtapaAnte);
            combo_causa();
            $("#modal-no-conforme").modal('show');
        } else {
            mensaje(false, "No ha seleccionado un inspector.", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado ningún elemento.", "no");
    }
});
$("#registrar_no_conforme_1").on('click', function () {
    var array_avance = [];
    var checkedItems_etapa = "";
    var textData = "";
    combo_supervisor_inspeccionar(check_etapa);
    var rowindex_2 = $("#grid4").jqxGrid("getselectedrowindexes");
    if (rowindex_2.length > 0) {
        for (var i = 0; i < rowindex_2.length; i++) {
            textData = $('#grid4').jqxGrid('getrowdata', rowindex_2[i]);
            checkedItems_etapa += textData['intSerie'] + ",";
        }
        var dataRecord = $("#grid").jqxGrid('getrowdata', index);
        var row = {Canti: dataRecord['Canti'], varCodiElemento: dataRecord['varCodiElemento'], nombre: dataRecord['nombre'],
            varCodVal: dataRecord['varCodVal'], varModelo: dataRecord['varModelo'], varPerfil: dataRecord['varPerfil'],
            intRevision: dataRecord['intRevision'], intCantRepro: dataRecord['intCantRepro'], Zona: dataRecord['Zona'],
            Programa: dataRecord['Programa'], Grupo: dataRecord['Grupo'], Contratista: dataRecord['Contratista'],
            deciPrec: dataRecord['deciPrec'], deciPesoNeto: dataRecord['deciPesoNeto'], deciPesoBruto: dataRecord['deciPesoBruto'],
            deciLong: dataRecord['deciLong'], deciArea: dataRecord['deciArea'], deciAncho: dataRecord['deciAncho'], etapa_anterior: dataRecord['etapa_anterior'],
            etapa_siguiente: dataRecord['etapa_siguiente'], intIdContr: dataRecord['intIdContr'], intIdRuta: dataRecord['intIdRuta'],
            intIdEtapaAnte: dataRecord['intIdEtapaAnte'], intIdEtapaSiguiente: dataRecord['intIdEtapaSiguiente'], intIdProyPaquete: dataRecord['intIdProyPaquete'],
            intIdProyTarea: dataRecord['intIdProyTarea'], intIdProyZona: dataRecord['intIdProyZona'], intidetapa: dataRecord['intidetapa'], varcodelement: checkedItems_etapa,
            ContratistaAnt: dataRecord['ContratistaAnt'], FechaAvanAnt: dataRecord['FechaAvanAnt'], Doc_Ant: dataRecord['Doc_Ant'], Pintura: dataRecord['Pintura'], IdContrAnt: dataRecord['IdContraAnt'], intIdEsta: dataRecord['intIdEsta'], tipo_reporte: 2,
            DocEnvioTS: dataRecord['DocEnvioTS'], bulto: dataRecord['var_bulto'], Obs1: dataRecord['Obs1'], obs2: dataRecord['obs2'], obs3: dataRecord['obs3'], obs4: dataRecord['obs4'],LotePintura: dataRecord['LotePintura'],intIdLotePintura: dataRecord['intIdLotePintura']
        };
        array_avance.push(row);
        var myJsonString = JSON.stringify(array_avance);
        if ($("#supervisor_avance_inspeccionar").val()) {
            if ($("#defecto").val()) {
                if ($("#causa").val()) {
                    store_registro_avance_2(myJsonString);
                } else {
                    mensaje(false, "No ha seleccionado ninguna causa", "no");
                }
            } else {
                mensaje(false, "No ha seleccionado ningun defecto", "no");
            }
        } else {
            mensaje(false, "No ha seleccionado ningun supervisor", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado un elemento", "no");
    }
});
