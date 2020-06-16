var data = [];
var dataAdapter = "";
var numero_ot = "";
var ot_excel = "";
var ot = "";
var ot_2 = "";
var producto = "";
var producto_2 = "";
var etapa = "";
var etapa2 = "";
var data_precios = "";
var boton = "";
var label_contratista = "";
var contrata = "";
var id_costocontratista = "";
var int_IdAsigEtapProy = "";
var boton_accion = "";
var id_contrata = "";
var export_data = 0;
var precio_modificado = 0;
function combos_inicio() {
    $("#etapa").jqxComboBox({width: '300px', height: '38px', placeHolder: "Seleccione"});
    $("#etapa2").jqxComboBox({width: '300px', height: '38px', placeHolder: "Seleccione"});
    $("#contrata").jqxComboBox({width: '350px', height: '38px', placeHolder: "Seleccione"});
    $("#modificar_precio").addClass('hidde_grid');
    $("#eliminar_precio").addClass('hidde_grid');
    $("#guardar_precio").addClass('hidde_grid');
}
$("#subir_archivo_icon").click(function () {
    $("#subir_archivo").trigger('click');
});
$("#close_modificar").on('click', function () {
    limpiar_campos_modal();
    $("#modal-modificar-costo").modal('hide');
});

$("#guardar_modi_costo").on('click', function () {
    var id = $("#id_row").val();
    var precio = $("#precio").val();
    var temp = $("#precio_temp").val();
    if (parseFloat(precio) > 0) {
        var dataRecord = $("#grid3").jqxGrid('getrowdata', id);
        guardar_modificar(dataRecord, precio);
    } else {
        $("#precio").val(temp);
        mensaje(false, "Campo precio debe ser Númerico", "no");
    }
});
function guardar_modificar(data, cash) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionCostos/public/index.php/actu_prec_cost_elem',
        dataType: 'json',
        data: {
            intIdProy: data.intIdProy,
            intIdTipoProducto: data.intIdTipoProducto,
            intIdAsigEtapProy: data.intIdAsigEtapProy,
            idcostoelemento: data.idcostoelemento,
            intIdEtapa: data.intIdEtapa,
            varCodiElemento: data.varCodiElemento,
            decPrecio: cash,
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "") {
                mensaje(true, "Se actualizó correctamente", "modal-modificar-costo");
                limpiar_campos_modal();
                listar_etapa_precios(ot_2, producto_2, etapa2);
            } else {
                mensaje(false, responses.data.mensaje, "no");
                var temp = $("#precio_temp").val();
                limpiar_campos_modal();
                $("#precio").val(temp);
                listar_etapa_precios(ot_2, producto_2, etapa2);
            }
        }

    });
}
function eliminar_costo(data) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionCostos/public/index.php/camb_esta_cost_elem',
        dataType: 'json',
        data: {
            intIdProy: data.intIdProy,
            intIdTipoProducto: data.intIdTipoProducto,
            idcostoelemento: data.idcostoelemento,
            intIdEtapa: data.intIdEtapa,
            varCodiElemento: data.varCodiElemento,
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "") {
                mensaje(true, "Se Elimino correctamente", "no");
                listar_etapa_precios(ot_2, producto_2, etapa2);
            } else {
                mensaje(false, responses.data.mensaje, "no");
                listar_etapa_precios(ot_2, producto_2, etapa2);
            }
        }
    });
}
function limpiar_campos_modal() {
    $("#precio").val('');
    $("#id_row").val('');
}
$("#excel2").click(function () {
    var data = $("#grid2").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Errores", true);
});
$("#excel").click(function () {
    if (export_data === 1) {
        var data = $("#grid").jqxGrid('exportdata', 'json');
        JSONToCSVConvertor(data, "Costos", true);
    } else {
        mensaje(false, 'No hay data para exportar', "no");
    }
});
document.getElementById("subir_archivo").onchange = function () {
    document.getElementById("nombre_archivo").value = this.value;
};
$("#limpiar_campos").on('click', function () {
    $("#txt_ot_2").jqxComboBox('clearSelection');
    $("#etapa_name").val('');
    $("#etapa2").jqxComboBox('clear');
    $("#producto").val(1);
    $("#subir_archivo").val('');
    $("#nombre_archivo").val('');
    $("#subir_archivo_icon").val('');
    $("#ot").val('');
});
$("#reload").click(function () {
    limpiar_campos();
    $('#home-tab').removeClass('disabled');
    $('#home-tab').addClass('active');
    $('#profile-tab').removeClass('active');
    $('#profile-tab').addClass('disabled');
    $('#home').fadeIn();
    $('#profile').fadeOut();
});
$("#buscar_precios").on('click', function () {
    export_data = 1;
    let nro_ot = $("#txt_ot").val();
    let id_producto = $("#producto2").val();

    if (nro_ot !== "") {
        if (id_producto !== null) {
            cargar_precio_costos();
        } else {
            mensaje(false, "Ingrese un produco", "no");
        }
    } else {
        mensaje(false, "Ingrese el numero de Ot", "no");
    }

});
$("#guardar_precio_costo_elemento").on('click', function () {
    var data_json = $("#grid").jqxGrid('exportdata', 'json');
    registrar_precio_etapa(data_json);
    /*var data_final=JSON.parse(data_json);
     
     for(var i=0;data_final.length>i;i++){
     
     }*/
});
$("#txt_ot_3").on('change', function (event) {
    ot = "";
    producto = "";
    producto = $("#producto3").val();
    if (event.args) {
        var item = event.args.item;
        if (item) {
            ot = item.value;
        }
    }
    if (producto) {
        listar_etapa(ot, producto, 2);
    }
});
$("#txt_ot_2").on('change', function (event) {
    ot_2 = "";
    numero_ot = "";
    producto_2 = "";
    producto_2 = $("#producto").val();
    $("#ot").val('');
    if (event.args) {
        var item = event.args.item;
        if (item) {
            ot_2 = item.value;
            numero_ot = item.label;
            $("#ot").val(numero_ot);
        }
    }
    if (producto_2) {
        listar_etapa(ot_2, producto_2, 1);
    }
});
$("#etapa2").on('change', function (event) {
    $("#contrata").jqxComboBox('clear');
    $("#etapa_name").val('');
    if (event.args) {
        var item = event.args.item;
        if (item) {
            etapa2 = item.value;
            $("#etapa_name").val(item.value);
        }
    }
    if (etapa2) {
        listar_etapa_precios(ot_2, producto_2, etapa2);
    }
});
$("#etapa").on('change', function (event) {
    $("#contrata").jqxComboBox('clear');
    etapa = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            etapa = item.value;
        }
    }
    if (etapa) {
        listar_contrata(etapa);
        listar_contrata_grid(ot, producto, etapa);
    }
});
$("#producto").on('change', function (event) {
    producto_2 = "";
    producto_2 = $("#producto").val();
    if (ot_2) {
        listar_etapa(ot_2, producto_2, 1);
    }
});
$("#producto3").on('change', function (event) {
    producto = "";
    producto = $("#producto3").val();
    if (ot) {
        listar_etapa(ot, producto, 2);
    }
});
$("#modificar_precio").on('click', function () {
    modificar_elemento();
});
$("#eliminar_precio").on('click', function () {
    eliminar_elemento()();
});
$("#guardar_precio").on('click', function () {
    if (boton === "") {
        mensaje(false, "No ha realizado ninguna acción (MODIFICAR o ELIMINAR)");
    } else {
        if (boton === "1") {
            guardar_precio();
        } else if (boton === "2") {
            guardar_precio();
        }
    }
});
$("#contrata").on('change', function (event) {
    label_contratista = "";
    contrata = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            label_contratista = item.label;
            contrata = item.value;
        }
    }
});
$("#form_register").on('submit', function (e) {
    e.preventDefault();
    if ($("#ot").val() !== "") {
        if ($("#producto").val() !== null) {
            if (etapa2) {
                if ($("#nombre_archivo").val() !== "") {
                    $('#modal-cargar-partlist').modal('show');
                    $.ajax({
                        url: 'VALIDAR_PRECIO_COSTO',
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        data: new FormData(this),
                        contentType: false,
                        cache: false,
                        processData: false,
                        dataType: 'json',
                        success: function (html) {
                            if (html.validacion.length > 0) {
                                //alert("adsda");
                                $('#profile').fadeIn();
                                mensaje(false, "Hay Erroes en el EXCEL", "modal-cargar-partlist");
                                let valdaciones = [];
                                valdaciones = html.validacion;
                                var data = new Array();
                                for (var i = 0; i < valdaciones.length; i++) {
                                    var row = {};
                                    var data_new = valdaciones[i];
                                    row["esta_mens"] = jQuery.trim(data_new);

                                    data[i] = row;
                                }
                                limpiar_campos();
                                $('#home-tab').removeClass('active');
                                $('#home-tab').addClass('disabled');
                                $('#profile-tab').removeClass('disabled');
                                $('#profile-tab').addClass('active');
                                $("#home").hide();
                                var source = {
                                    localdata: data,
                                    datatype: "array",
                                    datafields: [
                                        {name: 'esta_mens', type: 'string'},
                                    ]
                                };
                                dataAdapter = new $.jqx.dataAdapter(source);
                                $("#grid2").jqxGrid({
                                    width: '100%',
                                    height: '300',
                                    showfilterrow: true,
                                    source: dataAdapter,
                                    filterable: true,
                                    theme: 'darkblue',
                                    selectionmode: 'multiplecellsextended',
                                    sortable: true,
                                    columns: [
                                        {text: 'MENSAJE', datafield: 'esta_mens', width: '100%'},
                                    ]
                                });
                                $("#grid2").jqxGrid('localizestrings', localizationobj);
                            } else {
                                if (html.mensaje === "OK") {
                                    limpiar_campos();
                                    mensaje(true, "Se registro Satisfactoriamente", "modal-cargar-partlist");
                                } else {
                                    mensaje(false, html.mensaje, "modal-cargar-partlist");
                                }
                            }
                        }
                    });
                } else {
                    mensaje(false, "Ingrese un archivo", "no");
                }
            } else {
                mensaje(false, "Ingrese un Etapa ", "no");
            }
        } else {
            mensaje(false, "Ingrese un producto", "no");
        }
    } else {
        mensaje(false, "Ingrese la ot", "no");
    }
});
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
            va = '<option value="" disabled="" selected="">TIPO ELEMENTO</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdTipoProducto + '">' + responses.data[c]
                        .varDescTipoProd + '</option>';
                $("#producto").html(va);
                $("#producto2").html(va);
                $("#producto3").html(va);
            }
            $("#producto").val("1");
            $("#producto2").val("1");
            $("#producto3").val("1");
        }
    });
}
function listar_precio_costos() {
    $("#grid").jqxGrid({
        width: '100%',
        height: '100',
        selectionmode: 'multiplecellsextended',
        theme: 'darkblue',
        columns: [
            {text: 'Etapa', width: '40%', cellsalign: 'center'},
            {text: 'Valorización', width: '40%'},
            {text: 'Precio', cellsalign: 'left', width: '20%'}
        ]
    });
    $("#grid").jqxGrid('localizestrings', localizationobj);
}
function cargardata_user() {
    let usuario = JSON.parse(localStorage.getItem("nombre"));
    for (const i in usuario) {
        id = usuario[i]['codigo_usuario'];
        va +=
                usuario[i]['nombre_usuario'] + ' ' +
                usuario[i]['apellido_usuario'];
    }
    $("#nombre_user").val(id);
}
function listar_data_list_proyectos() {
    $.ajax({
        type: 'GET',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionPartList/public/index.php/List_proy_vige',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
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
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#txt_ot").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '38px',
                selectionMode: 'dropDownList',
                placeHolder: "O.T",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_2").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '38px',
                selectionMode: 'dropDownList',
                placeHolder: "O.T",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#txt_ot_3").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '38px',
                selectionMode: 'dropDownList',
                placeHolder: "O.T",
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });

        }
    });
}
function listar_etapa(cod_ot, cod_pro, id) {

    $.ajax({
        type: 'POST',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionCostos/public/index.php/comb_etapa',
        dataType: 'json',
        data: {
            intIdProy: cod_ot,
            intIdTipoProducto: cod_pro
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            var array_nuevo = [];
            for (var i = 0; responses.data.length > i; i++) {
                if (responses.data[i].varValoEtapa === "SI") {
                    var row = {'varDescEtap': responses.data[i].varDescEtap, 'intIdEtapa': responses.data[i].intIdEtapa};
                    array_nuevo.push(row);
                }
            }
            var source =
                    {
                        localdata: array_nuevo,
                        datatype: "array",
                        datafields: [
                            {name: 'varDescEtap'},
                            {name: 'intIdEtapa'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            if (id === 2) {

                $("#etapa").jqxComboBox({
                    source: dataAdapter,
                    width: '300px',
                    height: '38px',
                    placeHolder: "Seleccione",
                    displayMember: "varDescEtap",
                    valueMember: "intIdEtapa"
                });
            } else {
                $("#etapa2").jqxComboBox({
                    source: dataAdapter,
                    width: '300px',
                    height: '38px',
                    placeHolder: "Seleccione",
                    displayMember: "varDescEtap",
                    valueMember: "intIdEtapa"
                });
            }

        }
    });
}
function listar_contrata(etapa) {
    $.ajax({
        type: 'POST',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_proy',
        url: url + '/GestionCostos/public/index.php/comb_cont',
        dataType: 'json',
        data: {
            intIdEtapa: etapa
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "No hay dato.") {
                $("#contrata").jqxComboBox('clear');
            } else {
                var source =
                        {
                            localdata: responses.data,
                            datatype: "array",
                            datafields: [
                                {name: 'varRazCont'},
                                {name: 'intIdCont'}
                            ],
                            async: false
                        };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $("#contrata").jqxComboBox({
                    source: dataAdapter,
                    width: '350px',
                    height: '38px',
                    placeHolder: "Seleccione",
                    displayMember: "varRazCont",
                    valueMember: "intIdCont"
                });
            }
        }
    });
}
function cargar_precio_costos() {
    let nro_ot = $("#txt_ot").val().trim();
    let id_producto = $("#producto2").val().trim();
    $.ajax({
        type: 'POST',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionCostos/public/index.php/list_prec_etap',
        dataType: 'json',
        data: {
            intIdProy: parseInt(nro_ot),
            intIdTipoProducto: parseInt(id_producto)
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_agrupacion();
            }
        },
        success: function (responses) {

            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'decPrecio', type: 'float'},
                    {name: 'intIdEtapa', type: 'number'},
                    {name: 'intIdProy', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'intOrden', type: 'number'},
                    {name: 'varDescEtap', type: 'string'},
                    {name: 'varValoEtapa', type: 'string'},
                    {name: 'intIdAsigEtapProy', type: 'string'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            var cellbeginedit = function (row, datafield, columntype, value) {
                var valor = $("#grid").jqxGrid('getrowdata', row);
                if (valor['varValoEtapa'] === "NO") {
                    return false;
                } else {
                    return true;
                }
            };
            var cellsrenderer = function (row, column, value, defaultHtml) {
                var valor = $("#grid").jqxGrid('getrowdata', row);
                if (valor['varValoEtapa'] === "NO") {
                    var element = $(defaultHtml);
                    element.css('color', '#999');
                    return element[0].outerHTML;
                }
                return defaultHtml;
            };

            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                editable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                selectionmode: 'singlecell',
                columns: [
                    {text: 'Etapa', datafield: 'varDescEtap', width: '60%', cellsalign: 'left', editable: false, cellsrenderer: cellsrenderer, cellbeginedit: cellbeginedit, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;
                                        }
                            }]},
                    {text: 'Valorizacion', datafield: 'varValoEtapa', width: '20%', cellsalign: 'center', editable: false, cellsrenderer: cellsrenderer, cellbeginedit: cellbeginedit},
                    {text: 'Precio', datafield: 'decPrecio', width: '20%', cellsalign: 'center', cellsformat: 'c3', /*columntype: 'numberinput',*/
                        cellsrenderer: cellsrenderer, cellbeginedit: cellbeginedit, validation: function (cell, value) {
                            if (value < 0) {
                                return {result: false, message: "El precio no puede ser negativo"};
                            }
                            return true;
                        }},
                    {text: 'Id_Asig', datafield: 'intIdAsigEtapProy', width: '13%', cellsalign: 'center', editable: false, cellsrenderer: cellsrenderer},
                    {text: 'idetapa', datafield: 'intIdEtapa', width: '13%', cellsalign: 'center', hidden: true},
                    {text: 'proyecto', datafield: 'intIdProy', width: '6%', cellsalign: 'center', hidden: true},
                    {text: 'producto', datafield: 'intIdTipoProducto', width: '8%', cellsalign: 'center', hidden: true},
                    {text: 'orden', datafield: 'intOrden', width: '12%', cellsalign: 'center', hidden: true}

                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });
}
function registrar_precio_etapa(data) {

    var user = obtener_user();
    $.ajax({
        type: 'POST',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionCostos/public/index.php/regi_cada_prec_etap',
        dataType: 'json',
        data: {
            idcostoelemento: data,
            usua_modi: user
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_agrupacion();
            }
        },
        success: function (responses) {

            if (responses.data.mensaje === "") {
                mensaje(true, "Registro Satisfactorio", "no");
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
function limpiar_campos() {
    $("#txt_ot_2").jqxComboBox('clearSelection');
    $("#etapa2").jqxComboBox('clearSelection');
    $("#grid3").jqxGrid('clear');
    $("#visible").addClass('hidde_grid');
    $("#producto").val('');
    $("#carga").val('');
    $("#descripcion").val('');
    $("#subir_archivo").val('');
    $("#nombre_archivo").val('');
    $("#subir_archivo_icon").val('');
    $("#precio_contrata").val('');
}
function listar_etapa_precios(cod_ot, cod_pro, cod_eta) {
    $.ajax({
        type: 'POST',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionCostos/public/index.php/list_prec_elem',
        dataType: 'json',
        data: {
            intIdProy: cod_ot,
            intIdTipoProducto: cod_pro,
            intIdEtapa: cod_eta
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_agrupacion();
            }
        },
        success: function (responses) {
            
            if (responses.data.length > 0) {
                data_precios = responses.data;
                /*$("#modificar_precio").removeClass('hidde_grid');
                 $("#eliminar_precio").removeClass('hidde_grid');
                 $("#guardar_precio").removeClass('hidde_grid');*/
                $("#visible").removeClass('hidde_grid');
                $("#grid3").jqxGrid('clear');
                //mensaje(true, "Hay precios asociados a la Etapa");
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'decPrecio', type: 'float'},
                        {name: 'idcostoelemento', type: 'number'},
                        {name: 'intIdAsigEtapProy', type: 'number'},
                        {name: 'intIdEtapa', type: 'number'},
                        {name: 'intIdProy', type: 'number'},
                        {name: 'intIdTipoProducto', type: 'number'},
                        {name: 'intOrden', type: 'number'},
                        {name: 'varCodiElemento', type: 'string'},
                        {name: 'varDescEtap', type: 'string'},
                        {name: 'acti_hora', type: 'date'},
                        {name: 'acti_usua', type: 'string'},
                        {name: 'hora_modi', type: 'date'},
                        {name: 'usua_modi', type: 'string'}
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid3").jqxGrid({
                    width: '100%',
                    height: '300',
                    source: dataAdapter,
                    columnsresize: true,
                    altrows: true,
                    enabletooltips: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    selectionmode: 'singlecell',
                    columns: [
                        {text: 'Codigo', datafield: 'varCodiElemento', width: 100, cellsalign: 'left', editable: false, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid3").jqxGrid('getrows');
                                                return count.length;
                                            }
                                }]},
                        {text: 'Etapa', datafield: 'varDescEtap', width: 200, cellsalign: 'center', editable: false},
                        {text: 'Precio', datafield: 'decPrecio', width: 100, cellsalign: 'center', cellsformat: 'c3'/*, columntype: 'numberinput'*/, editable: false},
                        {text: 'Usuario Creación', datafield: 'acti_usua', width: 150, cellsalign: 'center', editable: false},
                        {text: 'Creado el', datafield: 'acti_hora', width: 150, cellsalign: 'center', cellsformat: 'dd/MM/yyyy', editable: false},
                        {text: 'Usuario Modificación', datafield: 'usua_modi', width: 150, cellsalign: 'center', editable: false},
                        {text: 'Modificado el', datafield: 'hora_modi', width: 150, cellsalign: 'center', cellsformat: 'dd/MM/yyyy', editable: false},
                        {
                            text: 'Modificar', datafield: 'Modificar', columntype: 'button', width: 80, cellsrenderer: function () {
                                return "Modificar";
                            }, buttonclick: function (row) {
                                editrow = row;
                                var dataRecord = $("#grid3").jqxGrid('getrowdata', editrow);
                                $("#precio_temp").val(dataRecord.decPrecio);
                                $("#id_row").val(editrow);
                                $("#precio").val(dataRecord.decPrecio);
                                $("#modal-modificar-costo").modal('show');
                            }
                        },
                        {
                            text: 'Eliminar', datafield: 'Eliminar', columntype: 'button', width: 80, cellsrenderer: function () {
                                return "Eliminar";
                            }, buttonclick: function (row) {
                                editrow = row;
                                var dataRecord = $("#grid3").jqxGrid('getrowdata', editrow);
                                eliminar_costo(dataRecord);
                            }
                        },
                        {text: 'id', datafield: 'idcostoelemento', width: 150, cellsalign: 'center', editable: false, hidden: true},
                        {text: 'id', datafield: 'intIdProy', width: 150, cellsalign: 'center', editable: false, hidden: true},
                        {text: 'id', datafield: 'intIdTipoProducto', width: 150, cellsalign: 'center', editable: false, hidden: true},
                        {text: 'id', datafield: 'intIdAsigEtapProy', width: 150, cellsalign: 'center', editable: false, hidden: true},
                        {text: 'id', datafield: 'intIdEtapa', width: 150, cellsalign: 'center', editable: false, hidden: true},
                    ]
                });
                $("#grid3").jqxGrid('localizestrings', localizationobj);
            } else {
                $("#visible").addClass('hidde_grid');
                $("#grid3").jqxGrid('clear');
            }
        }
    });
}
function modificar_elemento() {
    boton = "1";
    var source = {
        localdata: data_precios,
        datatype: "array",
        datafields: [
            {name: 'decPrecio', type: 'float'},
            {name: 'idcostoelemento', type: 'number'},
            {name: 'intIdAsigEtapProy', type: 'number'},
            {name: 'intIdEtapa', type: 'string'},
            {name: 'intIdProy', type: 'number'},
            {name: 'intIdTipoProducto', type: 'number'},
            {name: 'intOrden', type: 'number'},
            {name: 'varCodiElemento', type: 'string'},
            {name: 'varDescEtap', type: 'string'},
            {name: 'acti_hora', type: 'date'},
            {name: 'acti_usua', type: 'string'},
            {name: 'hora_modi', type: 'date'},
            {name: 'usua_modi', type: 'string'}
        ], updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid3").jqxGrid({
        width: '100%',
        height: '300',
        source: dataAdapter,
        columnsresize: true,
        altrows: true,
        editable: true,
        enabletooltips: true,
        theme: 'darkblue',
        showstatusbar: true,
        statusbarheight: 25,
        showaggregates: true,
        showgroupaggregates: true,
        selectionmode: 'singlecell',
        columns: [
            {text: 'Codigo', datafield: 'varCodiElemento', width: '10%', cellsalign: 'left', editable: false, aggregates: [{
                        '<b>#</b>':
                                function (aggregatedValue, currentValue, column, record)
                                {
                                    var count = $("#grid3").jqxGrid('getrows');
                                    return count.length;
                                }
                    }]},
            {text: 'Id Etapa', datafield: 'intIdEtapa', width: '10%', cellsalign: 'center', editable: false},
            {text: 'Precio', datafield: 'decPrecio', width: '10%', cellsalign: 'center', cellsformat: 'c3', columntype: 'numberinput'},
            {text: 'Usuario Creación', datafield: 'acti_usua', width: '15%', cellsalign: 'center', editable: false},
            {text: 'Creado el', datafield: 'acti_hora', width: '15%', cellsalign: 'center', cellsformat: 'dd/MM/yyyy hh:mm:ss', editable: false},
            {text: 'Usuario Modificación', datafield: 'usua_modi', width: '15%', cellsalign: 'center', editable: false},
            {text: 'Modificado el', datafield: 'hora_modi', width: '15%', cellsalign: 'center', cellsformat: 'dd/MM/yyyy hh:mm:ss', editable: false}
        ]
    });
    $("#grid3").jqxGrid('localizestrings', localizationobj);
}
function eliminar_elemento() {
    boton = "2";
    var source = {
        localdata: data_precios,
        datatype: "array",
        datafields: [
            {name: 'decPrecio', type: 'float'},
            {name: 'idcostoelemento', type: 'number'},
            {name: 'intIdAsigEtapProy', type: 'number'},
            {name: 'intIdEtapa', type: 'number'},
            {name: 'intIdProy', type: 'number'},
            {name: 'intIdTipoProducto', type: 'number'},
            {name: 'intOrden', type: 'number'},
            {name: 'varCodiElemento', type: 'string'},
            {name: 'varDescEtap', type: 'string'},
            {name: 'acti_hora', type: 'date'},
            {name: 'acti_usua', type: 'string'},
            {name: 'hora_modi', type: 'date'},
            {name: 'usua_modi', type: 'string'}
        ], updaterow: function (rowid, rowdata, commit) {
            commit(true);
        }
    };
    dataAdapter = new $.jqx.dataAdapter(source);
    $("#grid3").jqxGrid({
        width: '100%',
        height: '300',
        source: dataAdapter,
        columnsresize: true,
        altrows: true,
        enabletooltips: true,
        theme: 'darkblue',
        showstatusbar: true,
        statusbarheight: 25,
        showaggregates: true,
        showgroupaggregates: true,
        selectionmode: 'checkbox',
        columns: [
            {text: 'Codigo', datafield: 'varCodiElemento', width: '10%', cellsalign: 'left', editable: false, aggregates: [{
                        '<b>#</b>':
                                function (aggregatedValue, currentValue, column, record)
                                {
                                    var count = $("#grid3").jqxGrid('getrows');
                                    return count.length;
                                }
                    }]},
            {text: 'Id Etapa', datafield: 'intIdEtapa', width: '10%', cellsalign: 'center', editable: false},
            {text: 'Precio', datafield: 'decPrecio', width: '10%', cellsalign: 'center', cellsformat: 'c3', columntype: 'numberinput', editable: false},
            {text: 'Usuario Creación', datafield: 'acti_usua', width: '15%', cellsalign: 'center', editable: false},
            {text: 'Creado el', datafield: 'acti_hora', width: '15%', cellsalign: 'center', cellsformat: 'dd/MM/yyyy hh:mm:ss', editable: false},
            {text: 'Usuario Modificación', datafield: 'usua_modi', width: '15%', cellsalign: 'center', editable: false},
            {text: 'Modificado el', datafield: 'hora_modi', width: '15%', cellsalign: 'center', cellsformat: 'dd/MM/yyyy hh:mm:ss', editable: false}
        ]
    });
    $("#grid3").jqxGrid('localizestrings', localizationobj);
}
function guardar_precio() {
    var array_modificar = "";

    if (boton === "1") {
        var data_temporal = $("#grid3").jqxGrid('exportdata', 'json');
        var data_array = JSON.parse(data_temporal);
        for (var i = 0; data_array.length > i; i++) {

            if (data_array[i]['Id Etapa'] !== "") {
                array_modificar = data_array[i]['Id Etapa'];


            } else {

            }
        }
    } else if (boton === "2") {

    }
}
function registrar_precio(data_id_etapa) {

}
function listar_contrata_grid(cod_proy, cod_prod, cod_etap) {
    id_costocontratista = "";
    int_IdAsigEtapProy = "";
    boton_accion = "";
    id_contrata = "";
    $("#precio_contrata").val('');
    $.ajax({
        type: 'POST',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionCostos/public/index.php/list_prec_cont',
        dataType: 'json',
        data: {
            intIdProy: cod_proy,
            intIdTipoProducto: cod_prod,
            intIdEtapa: cod_etap
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_agrupacion();
            }
        },
        success: function (responses) {

            $("#grid4").jqxGrid('clear');
            if (responses.data.length > 0) {
                $("#grid4").jqxGrid('clear');
                //mensaje(true, "Hay precios asociados a la Etapa");
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    datafields: [
                        {name: 'acti_hora', type: 'date'},
                        {name: 'acti_usua', type: 'string'},
                        {name: 'decPrecio', type: 'float'},
                        {name: 'hora_modi', type: 'date'},
                        {name: 'idcostocontratista', type: 'number'},
                        {name: 'intIdCont', type: 'number'},
                        {name: 'intIdAsigEtapProy', type: 'number'},
                        {name: 'usua_modi', type: 'string'},
                        {name: 'varRazCont', type: 'string'}
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid4").jqxGrid({
                    width: '100%',
                    height: '300',
                    source: dataAdapter,
                    columnsresize: true,
                    altrows: true,
                    enabletooltips: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    selectionmode: 'singlecell',
                    columns: [
                        {text: 'Contratista', datafield: 'varRazCont', width: '25%', cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid4").jqxGrid('getrows');
                                                return count.length;
                                            }
                                }]},
                        {text: 'Id', datafield: 'intIdAsigEtapProy', width: '7%', cellsalign: 'center', hidden: true},
                        {text: 'Id', datafield: 'idcostocontratista', width: '7%', cellsalign: 'center', hidden: true},
                        {text: 'Id', datafield: 'intIdCont', width: '5%', cellsalign: 'center'},
                        {text: 'Precio', datafield: 'decPrecio', width: '10%', cellsalign: 'center', cellsformat: 'c3', columntype: 'numberinput'},
                        {text: 'Usuario Creación', datafield: 'acti_usua', width: '10%', cellsalign: 'center'},
                        {text: 'Creado el', datafield: 'acti_hora', width: '12%', cellsalign: 'center', cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                        {text: 'Usuario Modificación', datafield: 'usua_modi', width: '10%', cellsalign: 'center'},
                        {text: 'Modificado el', datafield: 'hora_modi', width: '12%', cellsalign: 'center', cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                        {text: 'Opción', datafield: 'Modificar', columntype: 'button', width: '7%', cellsrenderer: function () {
                                return "Modificar";
                            }, buttonclick: function (row) {
                                precio_modificado = 0;
                                editrow = row;
                                var offset = $("#grid3").offset();
                                $('#grid4').jqxGrid('selectrow', editrow);
                                var dataRecord = $("#grid4").jqxGrid('getrowdata', editrow);
                                boton_accion = "M";

                                $('#agregar_precio_contrata').html('<i class="far fa-file-excel"></i> Modificar Precio');
                                $('#contrata').val(dataRecord.varRazCont);
                                $('#precio_contrata').val(dataRecord.decPrecio);
                                precio_modificado = dataRecord.decPrecio;
                                $("#txt_ot_3").jqxComboBox('disabled', true);
                                $("#etapa").jqxComboBox('disabled', true);
                                document.getElementById("producto3").disabled = true;
                                $("#contrata").jqxComboBox('disabled', true);
                                id_costocontratista = dataRecord.idcostocontratista;
                                int_IdAsigEtapProy = dataRecord.intIdAsigEtapProy;
                                id_contrata = dataRecord.intIdCont;
                            }
                        },
                        {text: 'Opción', datafield: 'Eliminar', columntype: 'button', width: '7%', cellsrenderer: function () {
                                return "Eliminar";
                            }, buttonclick: function (row) {
                                editrow = row;
                                var offset = $("#grid3").offset();
                                $('#grid4').jqxGrid('selectrow', editrow);
                                var dataRecord = $("#grid4").jqxGrid('getrowdata', editrow);
                                eliminar(dataRecord.idcostocontratista);

                            }
                        }
                    ]
                });
                $("#grid4").jqxGrid('localizestrings', localizationobj);
            } else {
                var source = {

                    datatype: "array",
                    datafields: [
                        {name: 'acti_hora', type: 'date'},
                        {name: 'acti_usua', type: 'string'},
                        {name: 'decPrecio', type: 'float'},
                        {name: 'hora_modi', type: 'date'},
                        {name: 'idcostocontratista', type: 'number'},
                        {name: 'intIdAsigEtapProy', type: 'number'},
                        {name: 'usua_modi', type: 'string'},
                        {name: 'varRazCont', type: 'string'}
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };
                dataAdapter = new $.jqx.dataAdapter(source);
                $("#grid4").jqxGrid({
                    width: '100%',
                    height: '300',
                    source: dataAdapter,
                    columnsresize: true,
                    altrows: true,
                    enabletooltips: true,
                    theme: 'darkblue',
                    showstatusbar: true,
                    statusbarheight: 25,
                    showaggregates: true,
                    showgroupaggregates: true,
                    selectionmode: 'singlecell',
                    columns: [
                        {text: 'Contratista', datafield: 'varRazCont', width: '25%', cellsalign: 'left', aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid4").jqxGrid('getrows');
                                                return count.length;
                                            }
                                }]},
                        {text: 'Id', datafield: 'idcostocontratista', width: '7%', cellsalign: 'center', hidden: true},
                        {text: 'Id', datafield: 'intIdCont', width: '5%', cellsalign: 'center'},
                        {text: 'Precio', datafield: 'decPrecio', width: '10%', cellsalign: 'center', cellsformat: 'c3', columntype: 'numberinput'},
                        {text: 'Usuario Creación', datafield: 'acti_usua', width: '10%', cellsalign: 'center'},
                        {text: 'Creado el', datafield: 'acti_hora', width: '12%', cellsalign: 'center', cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                        {text: 'Usuario Modificación', datafield: 'usua_modi', width: '10%', cellsalign: 'center'},
                        {text: 'Modificado el', datafield: 'hora_modi', width: '12%', cellsalign: 'center', cellsformat: 'dd/MM/yyyy hh:mm:ss'},
                        {text: 'Opción', datafield: 'Modificar', width: '7%'},
                        {text: 'Opción', datafield: 'eliminar', width: '7%'}
                    ]
                });
                $("#grid4").jqxGrid('localizestrings', localizationobj);
            }
        }
    });
}
/*
 $("#grid4").on('rowdoubleclick', function (event) {
 var args = event.args;
 var row = args.rowindex;
 var dataRecord = $("#grid4").jqxGrid('getrowdata', row);
 $('#contrata').val(dataRecord.varRazCont);
 $('#precio_contrata').val(dataRecord.decPrecio);
 });*/
$("#agregar_precio_contrata").on('click', function () {


    if (boton_accion === "M") {
        let precio_contrata = $('#precio_contrata').val();

        if (id_contrata === null) {
            mensaje(false, "Obligatorio seleccionar un contratista", "no");
        } else {
            modificar(precio_contrata, etapa, id_contrata);
        }
    } else {
        let precio_contrata = $('#precio_contrata').val();

        if (contrata === null) {
            mensaje(false, "Obligatorio seleccionar un contratista", "no");
        } else {
            agregar_precio_contra(precio_contrata, contrata, label_contratista);
        }
    }

});
function agregar_precio_contra(precios, contrata, label_contrata) {


    var id_cont_valu = parseInt(contrata);

    let user = obtener_user();
    var mant_agre_grid = 0;
    if ($('#grid4').jqxGrid('getrows').length > 0) {
        deta_json = $("#grid4").jqxGrid('exportdata', 'json');
        $.each($.parseJSON(deta_json), function (idx, obj) {
            if (parseInt(obj.Id) === id_cont_valu) {
                mant_agre_grid = 1;
            }
        });
    }
    if (mant_agre_grid === 0) {
        if (id_cont_valu) {
            if (precios) {
                var cont_deta_data = {};
                cont_deta_data["varRazCont"] = label_contrata;
                cont_deta_data["idcostocontratista"] = parseInt(contrata);
                cont_deta_data["decPrecio"] = parseFloat(precios);
                $.ajax({
                    type: 'POST',
                    //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
                    url: url + '/GestionCostos/public/index.php/regi_prec_cont',
                    dataType: 'json',
                    data: {
                        intIdProy: ot,
                        intIdTipoProducto: producto,
                        intIdEtapa: etapa,
                        intIdContr: parseInt(contrata),
                        decPrecio: parseFloat(precios),
                        acti_usua: user
                    },
                    /*beforeSend: function (xhr) {
                     xhr.setRequestHeader('Authorization', access_token);
                     },*/
                    error: function (xhr, ajaxOptions, thrownError) {
                        if (thrownError == "Internal Server Error") {
                            listar_agrupacion();
                        }
                    },
                    success: function (responses) {

                        if (responses.data.mensaje === "") {
                            $("#contrata").jqxComboBox('clearSelection');
                            $("#precio_contrata").val('');
                            listar_contrata_grid(ot, producto, etapa);

                        } else {

                        }
                    }
                });
            } else {
                mensaje(false, "Campo PRECIO vacio", "no");
            }
        } else {
            mensaje(false, "Seleccione un Contratista", "no");
        }
    } else {
        $("#contrata").jqxComboBox('clearSelection');
        $("#precio_contrata").val('');
        mensaje(false, "Contratista ya se encuentra agregado", "no");

    }
}
function eliminar(idcostcontratista) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionCostos/public/index.php/elim_prec_cont',
        dataType: 'json',
        data: {
            idcostocontratista: idcostcontratista,
            usua_modi: user
        },
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_agrupacion();
            }
        },
        success: function (responses) {
            if (responses.data.mensaje === "") {
                $("#contrata").jqxComboBox('clearSelection');
                $("#precio_contrata").val('');
                listar_contrata_grid(ot, producto, etapa);
                mensaje(true, "Se eliminó correctamente", "no");
            } else {
                mensaje(false, responses.data.mensaje, "no");
            }
        }
    });
}
function modificar(precio, etapa, contrata) {
    let user = obtener_user();
    if ((parseFloat(precio) > 0)) {
        if (etapa) {
            if (contrata) {
                $.ajax({
                    type: 'POST',
                    //url: 'http://' + url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
                    url: url + '/GestionCostos/public/index.php/actu_cost_cont',
                    dataType: 'json',
                    data: {
                        idcostocontratista: id_costocontratista,
                        intIdAsigEtapProy: int_IdAsigEtapProy,
                        intIdContr: contrata,
                        decPrecio: precio,
                        usua_modi: user
                    },
                    /*beforeSend: function (xhr) {
                     xhr.setRequestHeader('Authorization', access_token);
                     },*/
                    error: function (xhr, ajaxOptions, thrownError) {
                        if (thrownError == "Internal Server Error") {
                            listar_agrupacion();
                        }
                    },
                    success: function (responses) {
                        if (responses.data.mensaje === "") {
                            listar_contrata_grid(ot, producto, etapa);
                            boton_accion = "";
                            $("#contrata").jqxComboBox('clearSelection');
                            $("#precio_contrata").val('');
                            $('#agregar_precio_contrata').html('<i class="far fa-file-excel"></i> Agregar');
                            $("#txt_ot_3").jqxComboBox('disabled', false);
                            $("#etapa").jqxComboBox('disabled', false);
                            document.getElementById("producto3").disabled = false;
                            $("#contrata").jqxComboBox('disabled', false);
                            mensaje(true, "Se Actualizó correctamente", "no");
                        } else {
                            $('#agregar_precio_contrata').html('<i class="far fa-file-excel"></i> Agregar');
                            $("#txt_ot_3").jqxComboBox('disabled', false);
                            $("#etapa").jqxComboBox('disabled', false);
                            document.getElementById("producto3").disabled = false;
                            $("#contrata").jqxComboBox('disabled', false);
                            $("#contrata").jqxComboBox('clearSelection');
                            $("#precio_contrata").val('');
                            mensaje(false, responses.data.mensaje, "no");
                        }
                    }
                });
            } else {

            }
        } else {

        }
    } else {
        $("#precio_contrata").val(precio_modificado);
        mensaje(false, "El campo PRECIO solo admite números positivos", "no");
    }
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
