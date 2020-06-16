var codigoproducto = "";
var codigoot = "";
var check_zona = "";
var check_tarea = "";
var check_etapa = "";
var check_items_zona = [];
var editrow = -1;
var check_etapa = "";
var array_avance = [];
var especificar = 0;
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
var array_temp = [];
var reproceso = "";
// CHECK PARA GRID  COLOCADO EN LA GRILLA COLOCO ANDY
// 
$("#mostrar_inform_avance").css("display", "none");
$("#btn_busc").prop("disabled", false);
function dropDownlist() {
    $("#zona").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#tarea").jqxDropDownList({width: 200, height: 30, placeHolder: "Seleccione"});
    $("#etapa").jqxDropDownList({width: 280, height: 30, placeHolder: "Seleccione"});
}
$("#excel_lista_ot").click(function () {
    var errores = $("#grid3").jqxGrid('exportdata', 'html');
    ExportToExcel(errores);
});
$("#producto").on('change', function (event) {
    codigoproducto = "";

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
    codigoot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigoot = item.value;
            check_items_zona = [];
        }
    }
    if (codigoot) {
        listar_etap_usua(codigoproducto, codigoot);
        listar_zona(codigoproducto, codigoot);
    }
    $("#grid").jqxGrid('clear');
    $("#mostrar_inform_avance").css("display", "none");
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
    check_etapa = "";
    bool_contrata = "";
    bool_maquina = "";
    bool_supervisor = "";
    bool_despacho = "";
    $("#mostrar_inform_avance").css("display", "none");
    $("#grid").jqxGrid('clear');
    if (event.args) {
        var item = event.args.item;
        if (item) {
            check_etapa = item.value;
            comboc_contratista(check_etapa, 'no');

            for (var i = 0; array_asignaciones.length > i; i++) {
                if (array_asignaciones[i].intIdEtapa === parseInt(check_etapa)) {
                    bool_contrata = array_asignaciones[i].boolMostCont;
                    bool_maquina = array_asignaciones[i].boolMostMaqu;
                    bool_supervisor = array_asignaciones[i].boolMostSupe;
                    bool_despacho = array_asignaciones[i].boolDespacho;
                }
            }
            elemento_id_etapa(check_etapa);
        }
    }
});
$("#contratista_avance").on('change', function (event) {
    contrata = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            contrata = item.value;
        }
    }
});
$("#maquinas_avance").on('change', function (event) {
    maquina = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            maquina = item.value;
        }
    }
});
$("#supervisor_avance").on('change', function (event) {
    supervisor = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            supervisor = item.value;
        }
    }
});
$("#btn_cerr_asig_2").on('click', function () {
    limpiar_segundo_modal();
});
$("#btn_cerr_asig").on('click', function () {
    limpiar_primer_modal();
    variable_max = 0;
});
$("#cant").on('change', function (event) {
    var num = this.value;
    num = parseInt(num);
    var item = event.target;
    var item_max = item.max;
    item_max = parseInt(item_max);
    variable_max = item_max;
    if (num === "") {
        $("#cant").val(item_max);
    } else if (num > item_max) {
        mensaje(false, "El número ingresado es mayor a la cantidad que tiene ese elemento", "no");
        $("#cant").val(item_max);
    } else if (num === 0) {
        $("#cant").val(item_max);
        mensaje(false, "El número ingresado no puede ser cero", "no");
    }
});
function limpiar_segundo_modal() {
    $("#nr_bulto").val('');
    $("#nr_guia").val('');
    $("#observacion").val('');
    $("#check_bulto").prop("checked", false);
    document.getElementById('nr_bulto').disabled = false;
    $("#modal-asignar-avance").modal('hide');
    $("#contratista_avance").jqxDropDownList('clearSelection');
    $("#supervisor_avance").jqxDropDownList('clearSelection');
    $("#maquinas_avance").jqxDropDownList('clearSelection');
}
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
    $("#estado").val('');
    $("#intIdEsta").val('');
    $("ContratistaAnt").val('');
    $("#FechaAvanAnt").val('');
    $("#Doc_Ant").val('');
    $("#Pintura").val('');
    $("#IdContrAnt").val('');
    $("#Obs1").val('');
    $("#obs2").val('');
    $("#obs3").val('');
    $("#obs4").val('');
    $("#LotePintura").val('');
    $("#intLotePintura").val('');
    document.getElementById('cant').disabled = false;
    jQuery('#grilla').hide();
    $("#grid3").jqxGrid('clearSelection');
    $("#modal-create-avance").modal('hide');
}
$('#especificar').click(function (event) {
    var item = event.target;
    var item_text = item.innerText;
    if (item_text === "Especificar") {
        especificar = 1;
        $('#especificar').html('<i class="far fa-question-circle"></i>Cantidad');
        most_seri_elem(1);
        document.getElementById('cant').disabled = true;
    } else {
        especificar = 0;
        $('#especificar').html('<i class="far fa-question-circle"></i>Especificar');
        document.getElementById('cant').disabled = false;
        $("#grid3").jqxGrid('clear');
        $('#grilla').hide();
    }
});
$("#registrar").on('click', function () {
    checkedItems_etapa = "";
    var textData = "";
    var rowindex_2 = "";
    var cantidad = $("#cant").val();
    $("#mostrar_inform_avance").css("display", "flex");//COLOCO 
    if (cantidad) {
        if (especificar === 1) {
            rowindex_2 = $("#grid3").jqxGrid("getselectedrowindexes");
            $("#cant").val(rowindex_2.length);
            for (var i = 0; i < rowindex_2.length; i++) {
                textData = $('#grid3').jqxGrid('getrowdata', rowindex_2[i]);
                checkedItems_etapa += textData['intSerie'] + ",";
            }
            if (checkedItems_etapa) {
                var row = {Canti: $("#cant").val(), varCodiElemento: $("#id_codigo").val(), nombre: $("#nombre").val(),
                    varCodVal: $("#varCodVal").val(), varModelo: $("#varModelo").val(), varPerfil: $("#varPerfil").val(),
                    intRevision: $("#intRevision").val(), intCantRepro: $("#intCantRepro").val(), Zona: $("#Zona").val(),
                    Programa: $("#Programa").val(), Grupo: $("#Grupo").val(), Contratista: $("#Contratista").val(),
                    deciPrec: $("#deciPrec").val(), deciPesoNeto: $("#deciPesoNeto").val(), deciPesoBruto: $("#deciPesoBruto").val(),
                    deciLong: $("#deciLong").val(), deciArea: $("#deciArea").val(), deciAncho: $("#deciAncho").val(), etapa_anterior: $("#etapa_anterior").val(),
                    etapa_siguiente: $("#etapa_siguiente").val(), intIdContr: $("#intIdContr").val(), intIdRuta: $("#intIdRuta").val(),
                    intIdEtapaAnte: $("#intIdEtapaAnte").val(), intIdEtapaSiguiente: $("#intIdEtapaSiguiente").val(), intIdProyPaquete: $("#intIdProyPaquete").val(),
                    intIdProyTarea: $("#intIdProyTarea").val(), intIdProyZona: $("#intIdProyZona").val(), intidetapa: $("#intidetapa").val(), data_seriales: checkedItems_etapa,
                    Canti_real: $("#canti_real").val(), ContratistaAnt: $("#ContratistaAnt").val(), FechaAvanAnt: $("#FechaAvanAnt").val(), Doc_Ant: $("#Doc_Ant").val(), Pintura: $("#Pintura").val(),
                    IdContrAnt: $("#IdContrAnt").val(), intIdEsta: $("#intIdEsta").val(), estado: $("#estado_create_avance").val(), DocEnvioTS: $("#doc_trans").val(), bulto: $("#var_bulto").val(),
                    Obs1: $("#Obs1").val(), obs2: $("#obs2").val(), obs3: $("#obs3").val(), obs4: $("#obs4").val(), LotePintura: $("#LotePintura").val(), intIdLotePintura: $("#intLotePintura").val()
                };
                var rowID = $('#grid').jqxGrid('getrowid', editrow);
                $('#grid').jqxGrid('updaterow', rowID, row);
                $("#grid").jqxGrid('selectrow', editrow);
                contar();
                limpiar_primer_modal();
            }
        } else {
            especificar === 0;
            if (editrow >= 0) {
                var row = {Canti: $("#cant").val(), varCodiElemento: $("#id_codigo").val(), nombre: $("#nombre").val(),
                    varCodVal: $("#varCodVal").val(), varModelo: $("#varModelo").val(), varPerfil: $("#varPerfil").val(),
                    intRevision: $("#intRevision").val(), intCantRepro: $("#intCantRepro").val(), Zona: $("#Zona").val(),
                    Programa: $("#Programa").val(), Grupo: $("#Grupo").val(), Contratista: $("#Contratista").val(),
                    deciPrec: $("#deciPrec").val(), deciPesoNeto: $("#deciPesoNeto").val(), deciPesoBruto: $("#deciPesoBruto").val(),
                    deciLong: $("#deciLong").val(), deciArea: $("#deciArea").val(), deciAncho: $("#deciAncho").val(), etapa_anterior: $("#etapa_anterior").val(),
                    etapa_siguiente: $("#etapa_siguiente").val(), intIdContr: $("#intIdContr").val(), intIdRuta: $("#intIdRuta").val(),
                    intIdEtapaAnte: $("#intIdEtapaAnte").val(), intIdEtapaSiguiente: $("#intIdEtapaSiguiente").val(), intIdProyPaquete: $("#intIdProyPaquete").val(),
                    intIdProyTarea: $("#intIdProyTarea").val(), intIdProyZona: $("#intIdProyZona").val(), intidetapa: $("#intidetapa").val(), data_seriales: '',
                    Canti_real: $("#canti_real").val(), ContratistaAnt: $("#ContratistaAnt").val(), FechaAvanAnt: $("#FechaAvanAnt").val(), Doc_Ant: $("#Doc_Ant").val(), Pintura: $("#Pintura").val(),
                    IdContrAnt: $("#IdContrAnt").val(), intIdEsta: $("#intIdEsta").val(), estado: $("#estado_create_avance").val(), DocEnvioTS: $("#doc_trans").val(), bulto: $("#var_bulto").val(),
                    Obs1: $("#Obs1").val(), obs2: $("#obs2").val(), obs3: $("#obs3").val(), obs4: $("#obs4").val(), LotePintura: $("#LotePintura").val(), intIdLotePintura: $("#intLotePintura").val()
                };
                var rowID = $('#grid').jqxGrid('getrowid', editrow);
                $('#grid').jqxGrid('updaterow', rowID, row);
                $("#grid").jqxGrid('selectrow', editrow);
                contar();
                limpiar_primer_modal();
            }
        }
    } else {
        mensaje(false, "Campo CANTIDAD vacio", "no");
        $("#cant").val(variable_max);
    }
});
$("#asignar_avance").on('click', function () {
    document.getElementById('registrar_avance_modal').disabled = false;
    array_avance = [];
    array_contratas = [];
    reproceso = "";
    $("#check_bulto").prop("checked", false);
    document.getElementById('nr_bulto').disabled = false;
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    for (var i = 0; i < rowindex.length; i++) {
        var textData = $('#grid').jqxGrid('getrowdata', rowindex[i]);
        var row = {Canti: textData['Canti'], varCodiElemento: textData['varCodiElemento'], nombre: textData['nombre'],
            varCodVal: textData['varCodVal'], varModelo: textData['varModelo'], varPerfil: textData['varPerfil'],
            intRevision: textData['intRevision'], intCantRepro: textData['intCantRepro'], Zona: textData['Zona'],
            Programa: textData['Programa'], Grupo: textData['Grupo'], Contratista: textData['Contratista'],
            deciPrec: textData['deciPrec'], deciPesoNeto: textData['deciPesoNeto'], deciPesoBruto: textData['deciPesoBruto'],
            deciLong: textData['deciLong'], deciArea: textData['deciArea'], deciAncho: textData['deciAncho'], etapa_anterior: textData['etapa_anterior'],
            etapa_siguiente: textData['etapa_siguiente'], intIdContr: textData['intIdContr'], intIdRuta: textData['intIdRuta'],
            intIdEtapaAnte: textData['intIdEtapaAnte'], intIdEtapaSiguiente: textData['intIdEtapaSiguiente'], intIdProyPaquete: textData['intIdProyPaquete'],
            intIdProyTarea: textData['intIdProyTarea'], intIdProyZona: textData['intIdProyZona'], intidetapa: textData['intidetapa'], varcodelement: textData['data_seriales'],
            ContratistaAnt: textData['ContratistaAnt'], FechaAvanAnt: textData['FechaAvanAnt'], Doc_Ant: textData['Doc_Ant'], Pintura: textData['Pintura'], IdContrAnt: textData['IdContrAnt'], intIdEsta: textData['intIdEsta'],
            tipo_reporte: 1, DocEnvioTS: textData['DocEnvioTS'], bulto: textData['var_bulto'], Obs1: textData['Obs1'], obs2: textData['obs2'], obs3: textData['obs3'], obs4: textData['obs4'], LotePintura: textData['LotePintura'], intIdLotePintura: textData['intIdLotePintura']
        };
        array_avance.push(row);
    }
    if (array_avance.length > 0) {
        if (elemento_id === "ESTRUCTURADO") {
            array_contratas = [];
            array_completo = [];
            var contar_nulos = 0;
            var contador_array = array_avance.length;
            for (var i = 0; array_avance.length > i; i++) {

                if (array_avance[i]['Contratista'] === "" || array_avance[i]['Contratista'] === null) {
                    console.log(array_avance[i]['intCantRepro']);
                    if (parseInt(array_avance[i]['intCantRepro']) === 0) {
                        contar_nulos++;
                    } else {
                        reproceso = "si";
                    }

                } else {
                    array_completo.push(array_avance[i]['intIdContr']);
                    array_contratas.push(array_avance[i]['Contratista']);
                }

            }

            if (contar_nulos > 0) {
                mensaje(false, "Uno o muchos elementos no tienen asignado una contrata", "no");
                $("#grid").jqxGrid('clearSelection');
                $("#mostrar_inform_avance").css("display", "none");
                array_avance = [];
            } else {

                if (reproceso == "si") {
                    periodo_valorizacion(check_etapa);
                    combo_supervisor(check_etapa);
                    combo_maquinas();
                } else {
                    Array.prototype.unique = function (a) {
                        return function () {
                            return this.filter(a)
                        }
                    }(function (a, b, c) {
                        return c.indexOf(a, b + 1) < 0
                    });
                    array_completo = array_completo.unique();
                    if (array_contratas.unique().length === 1) {
                        periodo_valorizacion(check_etapa);
                        combo_supervisor(check_etapa);
                        combo_maquinas();
                    } else {
                        mensaje(false, "Debe seleccionar un mismo Contratista", "no");
                        $("#grid").jqxGrid('clearSelection');
                        array_avance = [];
                        array_contratas = [];
                    }
                }

            }
        } else {
            periodo_valorizacion(check_etapa);
            combo_supervisor(check_etapa);
            combo_maquinas();
        }
    } else {
        mensaje(false, "No a seleccionado ningún paquete para reportar avance", "no");
        array_avance = [];
    }
});
$("#registrar_avance_modal").on('click', function () {
    array_errores_i = [];
    if (val_contratista === "si") {
        var cont = $("#contratista_avance").val();
        if (cont) {
        } else {
            array_errores_i.push('si');
        }
    }
    if (val_bulto === "si") {
        var bul = $("#nr_bulto").val();
        if (bul) {
        } else {
            array_errores_i.push('si');
        }
    }
    if (val_supervisor === "si") {
        var sup = $("#supervisor_avance").val();
        if (sup) {
        } else {
            array_errores_i.push('si');
        }
    }
    if (val_maquina === "si") {
        var maq = $("#maquinas_avance").val();
        if (maq) {
        } else {
            array_errores_i.push('si');
        }
    }
    if (val_guia === "si") {
        var gui = $("#nr_guia").val();
        if (gui) {
        } else {
            array_errores_i.push('si');
        }
    }
    if (array_errores_i.length > 0) {
        mensaje(false, "Uno o varios Campos son Obligatorios", "no");
    } else {
        registrar_avance();
    }
});
$("#limpiar").on('click', function () {
    $("#txt_ot").jqxDropDownList('clearSelection');
    $("#producto").jqxDropDownList('selectIndex', 0);
    $("#zona").jqxDropDownList('selectIndex', 0);
    $("#tarea").jqxDropDownList('selectIndex', 0);
    $("#etapa").jqxDropDownList('selectIndex', 0);
    $("#grid").jqxGrid('clearSelection');
    $("#grid").jqxGrid('clear');
    $("#mostrar_inform_avance").css("display", "none");

});
$("#cerrar_modal_asig_avan_errores").on('click', function () {
    array_errores = [];
    $("#modal-errores-asignar-avance").modal('hide');
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
            if (thrownError === "Internal Server Error") {
                listar_zona(codigo_producto, codigo_ot);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "Error.") {
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
                $("#zona").jqxDropDownList({source: dataAdapter, displayMember: "varDescrip", valueMember: "intIdProyZona", width: 200, height: 30});
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
            if (thrownError === "Internal Server Error") {
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

                    if (responses.data[i].varCodiAgru === "CAL" || responses.data[i].varCodiTipoEtap === "CARGA" || responses.data[i].varCodiTipoEtap === "DESP") {
                    } else {
                        new_data.push({'intIdEtapa': responses.data[i].intIdEtapa, 'varDescEtap': responses.data[i].varDescEtap});
                        var row = {'intIdEtapa': responses.data[i].intIdEtapa, 'boolMostMaqu': responses.data[i].boolMostMaqu,
                            'boolMostSupe': responses.data[i].boolMostSupe, 'boolMostCont': responses.data[i].boolMostCont, 'boolDespacho': responses.data[i].boolDesp};
                        array_asignaciones.push(row);
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
    $("#btn_busc").prop("disabled", true);
    $('#grid').jqxGrid('clear');
    $('#grid').jqxGrid('clearselection');
    $("#grid").jqxGrid('refresh');
    $('#grid').jqxGrid('showloadelement');
    $("#mostrar_inform_avance").css("display", "none");
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
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
                $("#btn_busc").prop("disabled", false);
                window.setTimeout(function () {

                    $("#modal-cargar-avance").modal('hide'); // COLOCO ANDY 
                }, 1000);


            }
        },
        success: function (responses) {

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
                            {name: 'intIdLotePintura', type: 'number'},
                            {name: 'LotePintura', type: 'string'}
                        ],
                        async: false
                    };
            dataAdapter = new $.jqx.dataAdapter(source);
            $("#excel_lista_ot").click(function () {
                var errores = $("#grid").jqxGrid('exportdata', 'html');
                ExportToExcel(errores);
            });
            window.setTimeout(function () {

                $("#modal-cargar-avance").modal('hide'); // COLOCO ANDY 
            }, 1000);


            $("#btn_busc").prop("disabled", false);

            $('#grid').jqxGrid('showloadelement');
            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                columnsreorder: true,
                altrows: true,
                enabletooltips: true,
                selectionmode: 'checkbox',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [

                    {text: 'Codigo', datafield: 'varCodiElemento', width: '10%', aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Nombre', datafield: 'nombre', width: 250},
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
                            }], columntype: 'button', buttonclick: function (row) {
                            // open the popup window when the user clicks a button.

                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            if (codigoproducto === "1") {

                                $("#componente").removeClass('hidde_grid');
                                if (dataRecord.data_seriales) {
                                    $('#especificar').html('<i class="far fa-question-circle"></i>Cantidad');
                                    especificar = 1;
                                } else {
                                    $('#especificar').html('<i class="far fa-question-circle"></i>Especificar');
                                    especificar = 0;
                                }
                                if (dataRecord.Canti_real) {
                                    $("#canti_real").val(dataRecord.Canti_real);
                                    document.getElementById("cant").max = dataRecord.Canti_real;
                                } else {
                                    $("#canti_real").val(dataRecord.Canti);
                                    document.getElementById("cant").max = dataRecord.Canti;
                                }
                            } else {
                                $("#componente").addClass('hidde_grid');
                            }
                            $("#doc_trans").val(dataRecord.DocEnvioTS);
                            $("#var_bulto").val(dataRecord.bulto);
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
                            $("#intIdEsta").val(dataRecord.intIdEsta);
                            $("#estado_create_avance").val(dataRecord.estado);
                            $("#Obs1").val(dataRecord.Obs1);
                            $("#obs2").val(dataRecord.obs2);
                            $("#obs3").val(dataRecord.obs3);
                            $("#obs4").val(dataRecord.obs4);
                            $("#LotePintura").val(dataRecord.LotePintura);
                            $("#intLotePintura").val(dataRecord.intIdLotePintura);
                            $('#modal-create-avance').modal('show');
                            if (dataRecord.data_seriales) {
                                document.getElementById('cant').disabled = true;
                                var seriales = dataRecord.data_seriales.split(",");
                                most_seri_elem(seriales);
                                seriales = "";
                                admi_asig_perm_data_json = "";
                            } else {

                            }
                        }},
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
function most_seri_elem(seriales) {
    $('#grilla').show();
    $('#grid3').jqxGrid('clear');
    $('#grid3').jqxGrid('clearselection');
    $('#grid3').jqxGrid('showloadelement');
    $("#grid3").jqxGrid('refresh');
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
            intIdEsta: $("#intIdEsta").val(),
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
                            {name: 'acti_hora', type: 'date'}


                        ],
                        async: false
                    };
            dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid3").jqxGrid({
                width: '480px',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                selectionmode: 'checkbox',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {text: 'intIdEleme', datafield: 'intIdEleme', width: '35%', hidden: true},
                    {text: 'Codigo', datafield: 'varCodiElemento', width: '35%', aggregates:
                                [{
                                        '<b>#</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid3").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                    {text: 'Nombre', datafield: 'varDescripcion', width: '35%'},
                    {text: 'Serie', datafield: 'intSerie'},
                    {text: 'Creado por', datafield: 'acti_usua', width: '1%', hidden: true},
                    {text: 'Creado el', datafield: 'acti_hora', width: '1%', cellsformat: 'dd/MM/yyyy', hidden: true}
                ]
            });
            if (seriales === 1) {

            } else {

                var data = $('#grid3').jqxGrid('getrows');
                for (var j = 0; j < seriales.length; j++) {
                    jQuery.each((data), function (idx, obj) {
                        if (seriales[j] === jQuery.trim(obj.intSerie)) {
                            $('#grid3').jqxGrid('selectrow', idx);
                            $('#especificar').html('<i class="far fa-question-circle"></i> Cantidad');
                        }
                    });
                }
            }

        }
    }
    );
}
function mostar_json() {
    admi_asig_perm_data_json = {};
    admi_asig_perm_data_json = $("#grid3").jqxGrid('exportdata', 'json');
}
/*VALIDAMOS SI LA ETAPA ESTA VALORIZADA,  SI ESTA VALORIZADA MOSTRAR EL COMBO DE LOS CONTRATISTAS SI NO SE ENCUENTRA VALORIZADA MOSTRAR
 * EL COMOBO POR DEFECTO MIMCO PERSONAL */
function valoriza(id_etapa, id_perido) {
    if (array_avance.length > 0) {
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
                cod_valorizacion = responses.data[0]['varDescTipoEtap'];

                validar_insp(responses.data[0]['intIdTipoEtap'], responses.data[0]['varDescTipoEtap'], responses.data[0]['varValoEtapa']);
            }
        });
        $("#modal-asignar-avance").modal('show');
    } else {
        mensaje(false, "No ha seleccionado ningun Programa", "no");
    }
}
function validar_insp(tipo_etapa, var_tipo_etapa, se_valoriza) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_tipo_etapa_segun_agru',
        dataType: 'json',
        data: {
            intIdTipoEtap: tipo_etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            $("#contratista_avance").jqxDropDownList('disabled', false);
            $("#contratista").removeClass('hidde_grid');
            if (bool_contrata === 1) {
                val_contratista = "si";
                $("#contratista").removeClass('hidde_grid');
                if (se_valoriza === "NO") {
                    if (reproceso === "si") {
                        $("#contratista").removeClass('hidde_grid');
                        $("#contratista_avance").val(21);
                        $("#contratista_avance").jqxDropDownList('disabled', false);
                    } else {
                        $("#contratista_avance").val(21);
                        $("#contratista_avance").jqxDropDownList('disabled', true);
                    }

                } else if (elemento_id === "ESTRUCTURADO") {
                    if (valoriza === "NO") {
                        if (reproceso === "si") {
                            $("#contratista").removeClass('hidde_grid');
                            $("#contratista_avance").val(21);
                            $("#contratista_avance").jqxDropDownList('disabled', false);
                        } else {
                            $("#contratista_avance").val(21);
                            $("#contratista_avance").jqxDropDownList('disabled', true);
                        }
                    } else {
                        if (reproceso === "si") {
                            $("#contratista").removeClass('hidde_grid');
                            $("#contratista_avance").val(21);
                            $("#contratista_avance").jqxDropDownList('disabled', false);
                        } else {
                            $("#contratista_avance").val(array_completo[0]);
                            $("#contratista_avance").jqxDropDownList('disabled', true);
                        }
                    }
                } else {
                    $("#contratista").removeClass('hidde_grid');
                    $("#contratista_avance").jqxDropDownList('disabled', false);
                }
            } else if (elemento_id === "ESTRUCTURADO" && reproceso === "") {
                val_contratista = "si";
                if (valoriza === "NO") {
                    if (reproceso === "si") {
                        $("#contratista").removeClass('hidde_grid');
                        $("#contratista_avance").val(21);
                        $("#contratista_avance").jqxDropDownList('disabled', false);
                    } else {
                        $("#contratista_avance").val(21);
                        $("#contratista_avance").jqxDropDownList('disabled', true);
                    }
                } else {
                    if (reproceso === "si") {
                        $("#contratista").removeClass('hidde_grid');
                        $("#contratista_avance").val(21);
                        $("#contratista_avance").jqxDropDownList('disabled', false);
                    } else {
                        $("#contratista_avance").val(array_completo[0]);
                        $("#contratista_avance").jqxDropDownList('disabled', true);
                    }

                }
            } else {
                val_contratista = "no";
                $("#contratista").addClass('hidde_grid');
                $("#contratista_avance").jqxDropDownList('disabled', false);
            }


            if (bool_maquina === 1) {
                val_maquina = "si";
                $("#maquina").removeClass('hidde_grid');
            } else {
                val_maquina = "no";
                $("#maquina").addClass('hidde_grid');
            }
            if (bool_supervisor === 1) {
                val_supervisor = "si";
                $("#supervisor").removeClass('hidde_grid');
            } else {
                val_supervisor = "no";
                $("#supervisor").addClass('hidde_grid');
            }
            if (bool_despacho === 1) {
                val_guia = "si";
                $("#guia").removeClass('hidde_grid');
            } else if (responses.data[0]['varCodiAgru'] === "TRASINT") {
                val_guia = "si";
                $("#guia").removeClass('hidde_grid');
            } else if (responses.data[0]['varCodiAgru'] === "TRASEXT") {
                val_guia = "si";
                $("#guia").removeClass('hidde_grid');
            } else {
                val_guia = "no";
                $("#guia").addClass('hidde_grid');
            }
            if (elemento_id === "EMPAQUE") {
                val_bulto = "si";

                $("#bulto").removeClass('hidde_grid');
                $("#chec_bulto").removeClass('hidde_grid');
            } else {
                val_bulto = "no";
                $("#bulto").addClass('hidde_grid');
                $("#chec_bulto").addClass('hidde_grid');
            }
        }
    });
}
/*LA PRIMERA VALIDACIÓN ES CUANDO EXITE UN PERIODO DE VALORIZACIÓN ASIGNADO A ESA ETAPA*/
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
function combo_supervisor(id_etapa) {
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
            $("#supervisor_avance").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "nombre", valueMember: "intIdColaborador", width: 200, height: 30, });
            $("#supervisor_avance").jqxDropDownList('focus');
        }
    });
}
function combo_maquinas() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_maqu_acti',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdMaquinas'},
                                {name: 'varDescripcion'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#maquinas_avance").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdMaquinas", width: 200, height: 30, });
                $("#maquinas_avance").jqxDropDownList('focus');
            }

        }
    });
}
function comboc_contratista(id_tipo_etapa, valoriza) {
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
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdCont'},
                            {name: 'varRazCont'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#contratista_avance").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varRazCont", valueMember: "intIdCont", width: 200, height: 30});
        }
    });
}
function registrar_avance() {
    document.getElementById('registrar_avance_modal').disabled = true;
    contador = 0;
    var myJsonString = JSON.stringify(array_avance);
    store_registro_avance(myJsonString);
}
function store_registro_avance(array_avance) {
    var observacion = $("#observacion").val();
    var bulto = $("#nr_bulto").val();
    var guia = $("#nr_guia").val();
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
            v_intIdMaqui: parseInt(maquina),
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
            v_intIdSuper: supervisor,
            v_intIdContr: contrata,
            v_tinFlgConforForzosa: 0,
            v_strDefecto: '',
            v_strCausa: '',
            strEstadoInspe: '',
            v_intIdDespa: 0
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            if (responses.data.mensaje_alternativo === "sin error") {
                $("#modal-asignar-avance").modal('hide');
                mensaje(true, "Se asigno correctamente", "modal-cargar-avance");
                limpiar_segundo_modal();
                limpiar_primer_modal();
                array_avance = [];
                $("#mostrar_inform_avance").css("display", "none");

                $("#CantidadElemento_Proyecto_avance").val(0);
                $("#Cantidad_Proyecto_avance").val(0);
                $("#ToTalPesoNeto_Proyecto_avance").val(0);
                $("#deciTotaPesoBruto_Proyecto_avance").val(0);
                $("#AreaTotal_Proyecto_avance").val(0);

                // listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
                listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);


            } else {
                $("#modal-asignar-avance").modal('hide');
                mensaje(false, "Hay errores al Asignar Avance.", "modal-cargar-avance");
                limpiar_segundo_modal();
                limpiar_primer_modal();

                $("#mostrar_inform_avance").css("display", "none");

                $("#CantidadElemento_Proyecto_avance").val(0);
                $("#Cantidad_Proyecto_avance").val(0);
                $("#ToTalPesoNeto_Proyecto_avance").val(0);
                $("#deciTotaPesoBruto_Proyecto_avance").val(0);
                $("#AreaTotal_Proyecto_avance").val(0);

                listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
                listar_errores(responses.data.mensaje);

            }
        }
    });
}
function validar_mensaje(cont) {

    if (cont === array_avance.length) {
        $("#modal-asignar-avance").modal('hide');
        mensaje(true, "Se asigno correctamente", "modal-cargar-avance");
        limpiar_segundo_modal();
        limpiar_primer_modal();
        array_avance = [];

        listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);//coloco andy

    } else if (contador === 0) {
        $("#modal-asignar-avance").modal('hide');
        mensaje(false, "Hay errores al Asignar Avance.", "modal-cargar-avance");
        limpiar_segundo_modal();
        limpiar_primer_modal();

        listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);//coloco andy

    }
}
function validar_proceso_terminado(paquete) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/Asignaciones/public/index.php/store_camb_esta_proc_term',
        dataType: 'json',
        data: {
            v_intIdproy: codigoot,
            v_intIdTipoProducto: codigoproducto,
            v_intIdPaque: paquete,
            v_usuario: user

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
        }
    });
}
function elemento_id_etapa(id_etapa) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/obte_desc_tipo_etapa_acue_etap',
        dataType: 'json',
        data: {intIdEtapa: id_etapa},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            elemento_id = responses.data[0].varDescTipoEtap;
        }
    });
}
$("#check_bulto").on('click', function (event) {

    var check = document.getElementById('check_bulto').checked;
    console.log(check);
    if (check) {
        $("#nr_bulto").val('A GRANEL');
        document.getElementById('nr_bulto').disabled = true;
    } else {
        $("#nr_bulto").val('');
        document.getElementById('nr_bulto').disabled = false;
    }
});
function listar_errores(data) {
    var array_errores = [];
    for (var i = 0; data.length > i; i++) {
        var row = {'nombre': data[i]};
        array_errores.push(row);
    }
    var source =
            {
                localdata: array_errores,
                datatype: "array",
                datafields: [
                    {name: 'nombre', type: 'string'}
                ],
                async: false
            };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#griderrores").jqxGrid({
        width: '100%',
        height: '200',
        source: dataAdapter,
        columnsresize: true,
        altrows: true,
        enabletooltips: true,
        theme: 'darkblue',
        columns: [
            {text: 'Mensajes', datafield: 'nombre'}

        ]
    });
    $("#griderrores").jqxGrid('localizestrings', localizationobj);
    $("#modal-errores-asignar-avance").modal('show');
}




//COLOCAR EL TOTAL 
/*
 * Mostrar el número de elementos,
 *  cantidad , peso neto , peso bruto ,
 *  área seleccionados.(Modulo Reportar Avance)
 * 
 * 
 */
function contar() {
    var rowindex = $("#grid").jqxGrid("getselectedrowindexes");
    var seleccionarGrilla = "";
    var deciTotaPesoNeto = 0;
    var deciTotaPesoBruto = 0;
    var deciTotaArea = 0;
    var CantidadElemento = rowindex.length;
    var Cantidad = 0;

    $("#pesos_avance").addClass('hidde_grid');

    if (rowindex.length > 0) {
        $("#mostrar_inform_avance").css("display", "flex");

        for (var i = 0; i < rowindex.length; i++) {
            seleccionarGrilla = $('#grid').jqxGrid('getrowdata', rowindex[i]);
            deciTotaPesoNeto = (parseFloat(seleccionarGrilla['deciPesoNeto']) * parseFloat(seleccionarGrilla['Canti']) + deciTotaPesoNeto);
            deciTotaPesoBruto = (parseFloat(seleccionarGrilla['deciPesoBruto']) * parseFloat(seleccionarGrilla['Canti']) + deciTotaPesoBruto);
            deciTotaArea = (parseFloat(seleccionarGrilla['deciArea']) * parseFloat(seleccionarGrilla['Canti']) + deciTotaArea);
            Cantidad = parseInt(seleccionarGrilla['Canti']) + Cantidad;
        }
        $("#CantidadElemento_Proyecto_avance").val(CantidadElemento);
        $("#ToTalPesoNeto_Proyecto_avance").val(deciTotaPesoNeto);
        $("#deciTotaPesoBruto_Proyecto_avance").val(deciTotaPesoBruto);
        $("#AreaTotal_Proyecto_avance").val(deciTotaArea);
        $("#Cantidad_Proyecto_avance").val(Cantidad);
    } else {
        $("#mostrar_inform_avance").css("display", "none");
        $("#CantidadElemento_Proyecto_avance").val(CantidadElemento);
        $("#ToTalPesoNeto_Proyecto_avance").val(deciTotaPesoNeto);
        $("#deciTotaPesoBruto_Proyecto_avance").val(deciTotaPesoBruto);
        $("#AreaTotal_Proyecto_avance").val(deciTotaArea);
        $("#Cantidad_Proyecto_avance").val(Cantidad);
    }
}
$("#grid").on('click', function () {
    contar();
});
