var codigo_etapa = "";
var checkedItems_etapa = "";
var dataAdapter = "";
var semana_inicio_label = "";
var semana_fin_label = "";
var select_producto = "";
var cod_ot = "";
var semana_inicio_value="";
var semana_fin_value="";


$("#producto").on('change', function (event) {
    select_producto = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            select_producto = item.value;
        }
    }
    if (cod_ot) {
        lista_etapa(cod_ot, select_producto);
    }
});
$("#excel_lista_valo").click(function () {

    var errores = $("#grid").jqxGrid('exportdata', 'json');

    JSONToCSVConvertor(errores, "Valorizacion", true);
});
$("#txt_ot").on('change', function (event) {
    cod_ot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            cod_ot = item.value;
        }
    }
    if (select_producto) {
        lista_etapa(cod_ot, select_producto);
    }
});
$("#etapa").on('change', function (event) {
    codigo_etapa = "";
    checkedItems_etapa = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            codigo_etapa = item.value;
            checkedItems_etapa = item.value;
            listar_tipo_etapa(codigo_etapa);
            listar_contratista_etapa(item.value);
        }
    }
});
$("#semana_inicio").on('change', function (event) {
    semana_inicio_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            semana_inicio_label = item.label;
          
        }
    }
});
$("#semana_fin").on('change', function (event) {
    semana_fin_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            semana_fin_label = item.label;
             
        }
    }
});
$("#pdf_contratista_etapa_codigo").on('click', function () {
    var unidad_negocio = $("#unidad_negocio").val();
    var txt_ot = $("#txt_ot").val();
    var producto = $("#producto").val();
    var semana_inicio = $("#semana_inicio").val();
    var semana_fin = $("#semana_fin").val();
    var planta = $("#planta").val();
    var etapa = $("#etapa").val();
    var etapa_actual = $("#etapa_actual").val();
    var contratista = $("#contratista").val();
    var codigo_elemento = $("#codigo").val().trim().toUpperCase();
    var tipo_reporte = 1;
    let user = obtener_user();
    var codigo_elemento_final = "";
    if (codigo_elemento === "") {
        codigo_elemento_final = ",";
    } else {
        separador = ",";
        arregloDeSubCadenas = codigo_elemento.split(separador);
        for (var i = 0; i < arregloDeSubCadenas.length; i++) {
            codigo_elemento_final += arregloDeSubCadenas[i].trim() + ",";
        }
    }
    if (txt_ot) {
        if (producto) {
            if (etapa) {
                if (planta) {
                    if (etapa_actual) {
                        if (codigo_elemento_final) {
                            if (contratista) {
                                if (semana_inicio) {
                                    if (semana_fin) {
                                        if (tipo_reporte) {
                                            if (user) {
                                                if (semana_inicio_label) {
                                                    if (semana_fin_label) {
                                                         validar_pdf_valorizaciones(txt_ot, producto ,etapa,planta , etapa_actual , codigo_elemento_final , contratista , semana_inicio, semana_fin , tipo_reporte,user , semana_inicio_label,semana_fin_label);
                                                        
                                                    }
                                                }
                                            }
                                        } else {
                                            mensaje(false, "No ha seleccionado un TIPO REPORTE", "no");
                                        }
                                    } else {
                                        mensaje(false, "No ha seleccionado una SEMANA FINAL", "no");
                                    }
                                } else {
                                    mensaje(false, "No ha seleccionado una SEMANA INICIO", "no");
                                }
                            } else {
                                mensaje(false, "No ha seleccionado un CONTRATISTA", "no");
                            }
                        }
                    } else {
                        mensaje(false, "No ha seleccionado una ETAPA ACTUAL", "no");
                    }
                } else {
                    mensaje(false, "No ha seleccionado una PLANTA", "no");
                }
            } else {
                mensaje(false, "No ha seleccionado una ETAPA", "no");
            }
        } else {
            mensaje(false, "No ha seleccionado un TIPO ELEMENTO", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado una O.T", "no");
    }
});
function validar_pdf_valorizaciones(txt_ot, producto ,etapa,planta , etapa_actual , codigo_elemento_final , contratista , semana_inicio, semana_fin , tipo_reporte,user , semana_inicio_label,semana_fin_label){
    $.ajax({
        url: 'validar_pdf_contratista',
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: {
            txt_ot:txt_ot,
            producto:producto,
            etapa:etapa,
            planta:planta,
            etapa_actual:etapa_actual,
            codigo_elemento_final:codigo_elemento_final,
            contratista:contratista,
            semana_inicio:semana_inicio,
            semana_fin:semana_fin,
            tipo_reporte:tipo_reporte,
            user:user,
            semana_inicio_label:semana_inicio_label,
            semana_fin_label:semana_fin_label
        },
        dataType: 'json',
        success: function (html) {
            if (html.mensaje == "") {
                $(location).attr('href', "valorizacion/contratista/" + txt_ot + '/' + producto + '/' + etapa + '/' + planta + '/' + etapa_actual + '/' + codigo_elemento_final + '/' + contratista + '/' + semana_inicio + '/' + semana_fin + '/' + tipo_reporte + '/' + user + '/' + semana_inicio_label + '/' + semana_fin_label);
            } else {
                mensaje(false, html.mensaje, "no");
            }
        }
    });
    
}
$("#pdf_contratista_etapa").on('click', function () {
    var unidad_negocio = $("#unidad_negocio").val();
    var txt_ot = $("#txt_ot").val();
    var producto = $("#producto").val();
    var semana_inicio = $("#semana_inicio").val();
    var semana_fin = $("#semana_fin").val();
    var planta = $("#planta").val();
    var etapa = $("#etapa").val();
    var etapa_actual = $("#etapa_actual").val();
    var contratista = $("#contratista").val();
    var codigo_elemento = $("#codigo").val().trim().toUpperCase();
    var tipo_reporte = 3;
    let user = obtener_user();
    var codigo_elemento_final = "";
    if (codigo_elemento === "") {
        codigo_elemento_final = ",";
    } else {
        separador = ",";
        arregloDeSubCadenas = codigo_elemento.split(separador);
        for (var i = 0; i < arregloDeSubCadenas.length; i++) {
            codigo_elemento_final += arregloDeSubCadenas[i].trim() + ",";
        }
    }
    if (txt_ot) {
        if (producto) {
            if (etapa) {
                if (planta) {
                    if (etapa_actual) {
                        if (codigo_elemento_final) {
                            if (contratista) {
                                if (semana_inicio) {
                                    if (semana_fin) {
                                        if (tipo_reporte) {
                                            if (user) {
                                                if (semana_inicio_label) {
                                                    if (semana_fin_label) {
                                                        $(location).attr('href', "valorizacion/contratista/" + txt_ot + '/' + producto + '/' + etapa + '/' + planta + '/' + etapa_actual + '/' + codigo_elemento_final + '/' + contratista + '/' + semana_inicio + '/' + semana_fin + '/' + tipo_reporte + '/' + user + '/' + semana_inicio_label + '/' + semana_fin_label);
                                                    }
                                                }
                                            }
                                        } else {
                                            mensaje(false, "No ha seleccionado un TIPO REPORTE", "no");
                                        }
                                    } else {
                                        mensaje(false, "No ha seleccionado una SEMANA FINAL", "no");
                                    }
                                } else {
                                    mensaje(false, "No ha seleccionado una SEMANA INICIO", "no");
                                }
                            } else {
                                mensaje(false, "No ha seleccionado un CONTRATISTA", "no");
                            }
                        }
                    } else {
                        mensaje(false, "No ha seleccionado una ETAPA ACTUAL", "no");
                    }
                } else {
                    mensaje(false, "No ha seleccionado una PLANTA", "no");
                }
            } else {
                mensaje(false, "No ha seleccionado una ETAPA", "no");
            }
        } else {
            mensaje(false, "No ha seleccionado un TIPO ELEMENTO", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado una O.T", "no");
    }
});
$("#pdf_contratista").on('click', function () {
    var unidad_negocio = $("#unidad_negocio").val();
    var txt_ot = $("#txt_ot").val();
    var producto = $("#producto").val();
    var semana_inicio = $("#semana_inicio").val();
    var semana_fin = $("#semana_fin").val();
    var planta = $("#planta").val();
    var etapa = $("#etapa").val();
    var etapa_actual = $("#etapa_actual").val();
    var contratista = $("#contratista").val();
    var codigo_elemento = $("#codigo").val().trim().toUpperCase();
    var tipo_reporte = 2;
    let user = obtener_user();
    var codigo_elemento_final = "";
    if (codigo_elemento === "") {
        codigo_elemento_final = ",";
    } else {
        separador = ",";
        arregloDeSubCadenas = codigo_elemento.split(separador);
        for (var i = 0; i < arregloDeSubCadenas.length; i++) {
            codigo_elemento_final += arregloDeSubCadenas[i].trim() + ",";
        }
    }
    if (txt_ot) {
        if (producto) {
            if (etapa) {
                if (planta) {
                    if (etapa_actual) {
                        if (codigo_elemento_final) {
                            if (contratista) {
                                if (semana_inicio) {
                                    if (semana_fin) {
                                        if (tipo_reporte) {
                                            if (user) {
                                                if (semana_inicio_label) {
                                                    if (semana_fin_label) {
                                                        $(location).attr('href', "valorizacion/contratista/" + txt_ot + '/' + producto + '/' + etapa + '/' + planta + '/' + etapa_actual + '/' + codigo_elemento_final + '/' + contratista + '/' + semana_inicio + '/' + semana_fin + '/' + tipo_reporte + '/' + user + '/' + semana_inicio_label + '/' + semana_fin_label);
                                                    }
                                                }
                                            }
                                        } else {
                                            mensaje(false, "No ha seleccionado un TIPO REPORTE", "no");
                                        }
                                    } else {
                                        mensaje(false, "No ha seleccionado una SEMANA FINAL", "no");
                                    }
                                } else {
                                    mensaje(false, "No ha seleccionado una SEMANA INICIO", "no");
                                }
                            } else {
                                mensaje(false, "No ha seleccionado un CONTRATISTA", "no");
                            }
                        }
                    } else {
                        mensaje(false, "No ha seleccionado una ETAPA ACTUAL", "no");
                    }
                } else {
                    mensaje(false, "No ha seleccionado una PLANTA", "no");
                }
            } else {
                mensaje(false, "No ha seleccionado una ETAPA", "no");
            }
        } else {
            mensaje(false, "No ha seleccionado un TIPO ELEMENTO", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado una O.T", "no");
    }
});
$("#btn_busc").on('click', function () {
    var unidad_negocio = $("#unidad_negocio").val();
    var txt_ot = $("#txt_ot").val();
    var producto = $("#producto").val();
    var semana_inicio = $("#semana_inicio").val();
    var semana_fin = $("#semana_fin").val();
  console.log(semana_inicio,semana_fin);
    var planta = $("#planta").val();
    var etapa = $("#etapa").val();
    var etapa_actual = $("#etapa_actual").val();
    var contratista = $("#contratista").val();
    var codigo_elemento = $("#codigo").val().trim().toUpperCase();
    var codigo_elemento_final = "";
    if (codigo_elemento === "") {
        codigo_elemento_final = "";
    } else {
        separador = ",";
        arregloDeSubCadenas = codigo_elemento.split(separador);
        for (var i = 0; i < arregloDeSubCadenas.length; i++) {
            codigo_elemento_final += arregloDeSubCadenas[i].trim() + ",";
        }
    }
    if (txt_ot) {
        if (producto) {
            if (semana_inicio) {
                if (semana_fin) {
                    if (planta) {
                        if (etapa) {
                            if (etapa_actual) {
                                if (contratista) {
                                    listar_valorizacion_grilla(txt_ot, producto, etapa, planta, etapa_actual, codigo_elemento_final, contratista, semana_inicio, semana_fin);
                                } else {
                                    mensaje(false, "No ha seleccionado una CONTRATISTA", "no");
                                }
                            } else {
                                mensaje(false, "No ha seleccionado una ETAPA", "no");
                            }
                        } else {
                            mensaje(false, "No ha seleccionado una TIPO ETAPA", "no");
                        }
                    } else {
                        mensaje(false, "No ha seleccionado una PLANTA", "no");
                    }
                } else {
                    mensaje(false, "No ha seleccionado una SEMANA FIN", "no");
                }
            } else {
                mensaje(false, "No ha seleccionado una SEMANA INICIO", "no");
            }
        } else {
            mensaje(false, "No ha seleccionado un TIPO ELEMENTO", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado una OT", "no");
    }
});
function unidad_negocio() {
    var negocio = [];
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_unid_nego_acti',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {
            responses.data.push({intIdUniNego: -1, varDescripcion: 'TODOS'});
            negocio = responses.data.reverse();
            var source =
                    {
                        localdata: negocio,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdUniNego'},
                            {name: 'varDescripcion'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#unidad_negocio").jqxDropDownList({placeHolder: "Seleccione", source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdUniNego", width: 200, height: 30});
            // Focus the jqxDropDownList
            $("#unidad_negocio").jqxDropDownList('focus');
            $("#unidad_negocio").jqxDropDownList('selectIndex', 0);
        }
    });
}
function ot_1() {
    var ot = [];
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
            responses.data.push({intIdproy: -1, varCodiProy: 'TODOS'});
            ot = responses.data.reverse();
            var source =
                    {
                        localdata: ot,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_ot").jqxDropDownList({source: dataAdapter, displayMember: "varCodiProy", valueMember: "intIdproy", width: 200, height: 30, });
            $("#txt_ot").jqxDropDownList('selectIndex', 0);
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
function listar_planta() {
    var planta = new Array();
    var planta_como = [];
    var tempData = {};
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_plan',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_producto();
            }
        },
        success: function (responses) {

            responses.data.push({intIdPlanta: -1, varDescPlanta: 'TODOS'});
            planta_como = responses.data.reverse();
            var source =
                    {
                        localdata: planta_como,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdPlanta'},
                            {name: 'varDescPlanta'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#planta").jqxDropDownList({source: dataAdapter, displayMember: "varDescPlanta", valueMember: "intIdPlanta", width: 200, height: 30});
            $("#planta").jqxDropDownList('selectIndex', 0);
            $("#planta").jqxDropDownList('focus');
        }
    });
}
function lista_etapa(cod_ot, cod_pro) {
    var jsonN = "";
    var resultado = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_t_etap_repo_valo',
        dataType: 'json',
        data: {intIdProy: cod_ot, intIdTipoProducto: cod_pro},
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                lista_etapa(cod_ot, cod_pro);
            }
        },
        success: function (responses) {
            responses.data.push({intIdTipoEtap: -1, varDescTipoEtap: 'TODOS'});
            resultado = responses.data.reverse();
            var source =
                    {
                        localdata: resultado,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdTipoEtap'},
                            {name: 'varDescTipoEtap'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#etapa").jqxDropDownList({source: dataAdapter, displayMember: "varDescTipoEtap", valueMember: "intIdTipoEtap", width: 200, height: 30});
            $("#etapa").jqxDropDownList('selectIndex', 0);
            $("#etapa").jqxDropDownList('focus');
            /*
             
             va = '<option value="-1"  >TODOS</option>'
             for (var c = 0; c < responses.data.length; c++) {
             //Seleccionamos el select
             va += '<option value="' + responses.data[c].intIdTipoEtap + '">' + responses.data[c].varDescTipoEtap + '</option>';
             $("#etapa").html(va);
             }*/
        }
    });
}
function listar_tipo_etapa(etapa) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/etap_actu_repo_valo',
        dataType: 'json',
        data: {
            intIdTipoEtap: etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_tipo_etapa(etapa);
            }
        },
        success: function (responses) {

            if (responses.data.mensaje == "error") {
                $("#etapa_actual").jqxDropDownList('clear');
            } else {
                responses.data.push({intIdEtapa: -1, varDescEtap: 'TODOS'});
                responses.data.reverse();
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdEtapa'},
                                {name: 'varDescEtap'}
                            ]
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#etapa_actual").jqxDropDownList({source: dataAdapter, displayMember: "varDescEtap", valueMember: "intIdEtapa", width: 200, height: 30, });
                $("#etapa_actual").jqxDropDownList('selectIndex', 0);
                $("#etapa_actual").jqxDropDownList('focus');
            }
        }
    });
}
function listar_contratista_etapa(id_etapa) {

    var contratista = [];
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_cont_segun_tipo_etapa',
        dataType: 'json',
        data: {
            intIdTipoEtap: id_etapa
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_contratista_etapa(id_etapa);
            }
        },
        success: function (responses) {


            if (responses.data.mensaje === "error") {
                //$("#contratista").jqxDropDownList('clear');
            } else {
                responses.data.push({intIdCont: -1, varRazCont: 'TODOS'});
                contratista = responses.data.reverse();
                var source =
                        {
                            localdata: contratista,
                            datatype: "array",
                            datafields: [
                                {name: 'intIdCont'},
                                {name: 'varRazCont'}
                            ]
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#contratista").jqxDropDownList({source: dataAdapter, displayMember: "varRazCont", valueMember: "intIdCont", width: 200, height: 30, });
                $("#contratista").jqxDropDownList('selectIndex', 0);
                $("#contratista").jqxDropDownList('focus');
            }
        }
    });
}
function combo_inicio_valo() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_peri_valo_cerr',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_inicio_valo();
            }
        },
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdPeriValo'},
                            {name: 'varCodiPeriValo'}
                        ]
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#semana_inicio").jqxDropDownList({source: dataAdapter, displayMember: "varCodiPeriValo", valueMember: "intIdPeriValo", width: 200, height: 30, });
            $("#semana_inicio").jqxDropDownList('selectIndex', 0);
            $("#semana_inicio").jqxDropDownList('focus');
        }
    });
}
function combo_fin_valo() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_peri_valo_cerr',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                combo_fin_valo();
            }
        },
        success: function (responses) {

            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'intIdPeriValo'},
                            {name: 'varCodiPeriValo'}
                        ]
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#semana_fin").jqxDropDownList({source: dataAdapter, displayMember: "varCodiPeriValo", valueMember: "intIdPeriValo", width: 200, height: 30, });
            $("#semana_fin").jqxDropDownList('selectIndex', 0);
            $("#semana_fin").jqxDropDownList('focus');
        }
    });
}
function listar_valorizacion_grilla(ot, producto, tipoetapa, planta, etapa, codigos, contrata, iniciosemana, finsemana) {

       
    if (parseInt(finsemana) < parseInt(iniciosemana)) {
        mensaje(false, "La semana Inicio no puede ser mayor a la semana final", "no");
     
    } else {
        $.ajax({
            type: 'POST',
            url: url + '/GestionReportes/public/index.php/gsrepo_store_valor',
            dataType: 'json',
            data: {
                v_intIdproy: ot,
                v_intIdTipoProducto: producto,
                v_intIdTipoEtapa: tipoetapa,
                v_intIdPlanta: planta,
                v_intIdEtapa: etapa,
                v_strCodigos: codigos,
                v_intIdContra: contrata,
                v_intIdSemaIni: iniciosemana,
                v_intIdSemaFin: finsemana,
                v_TipoReporte: 1
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    //listar_valorizacion_grilla(ot, producto, tipoetapa, planta, etapa, codigos, contrata, iniciosemana, finsemana);
                }
            },
            success: function (responses) {
             
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'periodo', type: 'float'},
                                {name: 'proyecto', type: 'string'},
                                {name: 'Zona', type: 'string'},
                                {name: 'Tarea', type: 'string'},
                                {name: 'Paquete', type: 'string'},
                                {name: 'planta', type: 'string'},
                                {name: 'etapa', type: 'string'},
                                {name: 'codigo', type: 'string'},
                                {name: 'nombre', type: 'string'},
                                {name: 'contaRepro', type: 'float'},
                                {name: 'revision', type: 'string'},
                                {name: 'Fechaavance', type: 'date'},
                                {name: 'ruc', type: 'string'},
                                {name: 'contratista', type: 'string'},
                                {name: 'Canti', type: 'string'},
                                {name: 'pesonetounit', type: 'string'},
                                {name: 'pesobrutounit', type: 'string'},
                                {name: 'areaunit', type: 'string'},
                                {name: 'preciounit', type: 'string'},
                                {name: 'importetotal', type: 'string'},
                                {name: 'pesonetotal', type: 'string'},
                                {name: 'areatotal', type: 'string'},
                                {name: 'maquina', type: 'string'},
                                {name: 'bulto', type: 'string'},
                                {name: 'documento', type: 'string'},
                                {name: 'supervisor', type: 'string'},
                                {name: 'usuarioregistro', type: 'string'},
                                {name: 'intIdEtapa', type: 'number'},
                                {name: 'intIdPlan', type: 'number'},
                                {name: 'intIdProyZona', type: 'number'},
                                {name: 'intIdProyTarea', type: 'number'},
                                {name: 'intIdProyPaquete', type: 'number'},
                                {name: 'intIdPeriValo', type: 'number'},
                                {name: 'intIdContr', type: 'number'},
                                {name: 'intIdSuper', type: 'number'},
                                {name: 'intIdMaqui', type: 'number'}
                            ],
                            async: false
                        };
                dataAdapter = new $.jqx.dataAdapter(source);

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
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    groupable: true,
                    columns: [
                        {text: 'Semana', datafield: 'periodo', width: 90, groupable: true, aggregates:
                                    [{
                                            '<b>#</b>':
                                                    function (aggregatedValue, currentValue, column, record)
                                                    {
                                                        var count = $("#grid").jqxGrid('getrows');
                                                        return count.length;
                                                    }
                                        }]},
                        {text: 'OT/ Alias', datafield: 'proyecto', width: 170, groupable: true},
                        {text: 'Zona', datafield: 'Zona', width: 150, groupable: true},
                        {text: 'Programa', datafield: 'Tarea', width: 75, groupable: true},
                        {text: 'Grupo', datafield: 'Paquete', width: 75, groupable: true},
                        {text: 'Planta', datafield: 'planta', width: 150, groupable: true},
                        {text: 'Etapa', datafield: 'etapa', width: 180, groupable: true},
                        {text: 'Codigo', datafield: 'codigo', width: 60, groupable: true},
                        {text: 'Nombre', datafield: 'nombre', width: 110, groupable: true},
                        {text: 'Repro', datafield: 'contaRepro', width: 50, groupable: true},
                        {text: 'Rev', datafield: 'revision', width: 50, groupable: true},
                        {text: 'Fecha Avance', datafield: 'Fechaavance', width: 120, cellsformat: 'dd/MM/yyyy', groupable: true},
                        {text: 'Ruc', datafield: 'ruc', width: 110, groupable: true},
                        {text: 'Contratista', datafield: 'contratista', width: 300, groupable: true},
                        {text: 'Cant.', datafield: 'Canti', width: 70, cellsalign: 'right', groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = parseFloat(record['Canti']);
                                                //return final;
                                                return aggregatedValue + total;
                                            },
                                }]},
                        {text: 'P.Neto.Uni.', datafield: 'pesonetounit', width: 100, cellsalign: 'right', groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                subtotal = parseFloat(record['pesonetounit']) * parseFloat(record['Canti']);
                                                subtotal = parseFloat(subtotal).toFixed(3);
                                                subtotal = parseFloat(subtotal);

                                                total = subtotal + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'P.Bruto.Uni.', datafield: 'pesobrutounit', width: 100, cellsalign: 'right', groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {
                                                var total = 0;

                                                subtotal = parseFloat(record['pesobrutounit']) * parseFloat(record['Canti']);
                                                subtotal = parseFloat(subtotal).toFixed(3);
                                                subtotal = parseFloat(subtotal);

                                                total = subtotal + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Area Uni.', datafield: 'areaunit', width: 100, cellsalign: 'right', groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                subtotal = parseFloat(record['areaunit']) * parseFloat(record['Canti']);
                                                subtotal = parseFloat(subtotal).toFixed(3);
                                                subtotal = parseFloat(subtotal);

                                                total = subtotal + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Prec.Uni.', datafield: 'preciounit', width: 100, cellsalign: 'right', groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                subtotal = parseFloat(record['preciounit']) * parseFloat(record['Canti']);
                                                subtotal = parseFloat(subtotal).toFixed(3);
                                                subtotal = parseFloat(subtotal);

                                                total = subtotal + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Importe Total', datafield: 'importetotal', width: 100, cellsalign: 'right', groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['importetotal']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'P.Neto Total.', datafield: 'pesonetotal', width: 100, cellsalign: 'right', groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                subtotal = parseFloat(record['pesonetotal']) * parseFloat(record['Canti']);
                                                subtotal = parseFloat(subtotal).toFixed(3);
                                                subtotal = parseFloat(subtotal);

                                                total = subtotal + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        /*{text: 'P.Bruto Total.', datafield: 'pesobrutototal', width: 100, cellsalign: 'right', groupable: true, aggregates: [{
                         '<b>#</b>':
                         function (aggregatedValue, currentValue, column, record) {
                         
                         var total = 0;
                         subtotal = parseFloat(record['pesobrutototal']) * parseFloat(record['Canti']);
                         subtotal = parseFloat(subtotal).toFixed(3);
                         subtotal = parseFloat(subtotal);
                         
                         total = subtotal + parseFloat(aggregatedValue);
                         total = parseFloat(total).toFixed(3);
                         return total;
                         }
                         }]},*/
                        {text: 'Area Total.', datafield: 'areatotal', width: 100, cellsalign: 'right', groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                subtotal = parseFloat(record['areatotal']) * parseFloat(record['Canti']);
                                                subtotal = parseFloat(subtotal).toFixed(3);
                                                subtotal = parseFloat(subtotal);

                                                total = subtotal + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            }
                                }]},
                        {text: 'Maquina', datafield: 'maquina', width: 120, cellsalign: 'center', groupable: true},
                        {text: 'Bulto', datafield: 'bulto', width: 120, cellsalign: 'center', groupable: true},
                        {text: 'Guia', datafield: 'documento', width: 120, cellsalign: 'center', groupable: true},
                        {text: 'Supervisor', datafield: 'supervisor', width: 280, groupable: true},
                        {text: 'Usuario Repoorte', datafield: 'usuarioregistro', width: 140, groupable: true},
                        {text: 'intIdEtapa', datafield: 'intIdEtapa', width: '2%', hidden: true},
                        {text: 'intIdPlan', datafield: 'intIdPlan', width: '2%', hidden: true},
                        {text: 'intIdProyZona', datafield: 'intIdProyZona', width: '2%', hidden: true},
                        {text: 'intIdProyTarea', datafield: 'intIdProyTarea', width: '2%', hidden: true},
                        {text: 'intIdProyPaquete', datafield: 'intIdProyPaquete', width: '2%', hidden: true},
                        {text: 'intIdPeriValo', datafield: 'intIdPeriValo', width: '2%', hidden: true},
                        {text: 'intIdContr', datafield: 'intIdContr', width: '2%', hidden: true},
                        {text: 'intIdSuper', datafield: 'intIdSuper', width: '2%', hidden: true},
                        {text: 'intIdMaqui', datafield: 'intIdMaqui', width: '2%', hidden: true}
                    ]
                });
                $("#grid").jqxGrid('localizestrings', localizationobj);
            }
        });
    }

}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel)
{
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
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];

    }
    return codigo_usuario;
}