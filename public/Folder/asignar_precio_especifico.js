var data = [];
var dataAdapter = "";
var numero_ot = "";
var ot_excel = "";
var export_data = "";
$("#buscar_precios").on('click', function () {
    export_data = 1;
    let nro_ot = $("#txt_ot").val();
    let id_producto = $("#producto2").val();
    
    if (nro_ot !== "") {
        if (id_producto !== null) {
            cargar_precio_especifico();
        } else {
            mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
        }
    } else {
        mensaje(false, "Ingrese el numero de O.T", "no");
    }

});
$("#excel2").click(function () {
    var data = $("#grid2").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Errores", true);
});
$("#excel").click(function () {
    if (export_data === 1) {
        var data = $("#grid").jqxGrid('exportdata', 'json');
        JSONToCSVConvertor(data, "Errores", true);
    } else {
        mensaje(false,'No hay data para exportar',"no");
    }

});
$("#subir_archivo_icon").click(function () {
    $("#subir_archivo").trigger('click');
});
document.getElementById("subir_archivo").onchange = function () {
    document.getElementById("nombre_archivo").value = this.value;
};
$("#txt_ot_2").on('change', function (event) {
    numero_ot = "";
    $("#ot").val('');
    if (event.args) {
        var item = event.args.item;
        if (item) {
            numero_ot = item.label;
            $("#ot").val(numero_ot);
        }
    }
});
$("#limpiar_campos").on('click', function () {
    $("#txt_ot_2").jqxComboBox('clearSelection');
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
function limpiar_campos() {
    $("#txt_ot_2").jqxComboBox('clearSelection');
    $("#producto").val('');
    $("#carga").val('');
    $("#descripcion").val('');
    $("#subir_archivo").val('');
    $("#nombre_archivo").val('');
    $("#subir_archivo_icon").val('');
}
$("#form_register").on('submit', function (e) {
    e.preventDefault();
    if ($("#ot").val() !== "") {
        if ($("#producto").val() !== null) {
            if ($("#nombre_archivo").val() !== "") {
                $('#modal-cargar-partlist').modal('show');
                $.ajax({
                    url: 'VALIDAR_PRECIO',
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: new FormData(this),
                    contentType: false,
                    cache: false,
                    processData: false,
                    dataType: 'json',
                    success: function (responses) {

                        if (responses.validacion.length > 0) {
                            mensaje(false, "Hay Erroes en el EXCEL", "modal-cargar-partlist");
                            $('#profile').fadeIn();
                            let valdaciones = [];
                            valdaciones = responses.validacion;
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
                            if (responses.mensaje === "ok") {
                                limpiar_campos();
                                $('#modal-cargar-partlist').modal('hide');
                                mensaje(true, "Se registro Satisfactoriamente", "modal-cargar-partlist");
                            } else {
                                limpiar_campos();
                                $('#modal-cargar-partlist').modal('hide');
                                mensaje(false, responses.mensaje, "modal-cargar-partlist");
                            }
                        }
                    }
                });
            } else {
                mensaje(false, "Ingrese un archivo", "no");
            }
        } else {
            mensaje(false, "Seleccione un TIPO ELEMENTO", "no");
        }
    } else {
        mensaje(false, "Ingrese la O.T", "no");
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
            }
            $("#producto").val('1');
            $("#producto2").val('1');
        }
    });
}
function listar_data_list_proyectos() {
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
                list_data();
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
                placeHolder: "O,T",
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

        }
    });
}
function listar_precio_especifico() {
    $("#grid").jqxGrid({
        width: '100%',
        height: '100',
        showfilterrow: true,
        filterable: true,
        selectionmode: 'multiplecellsextended',
        sortable: true,
        theme: 'darkblue',
        columns: [
            {text: 'Número', width: 65, cellsalign: 'center'},
            {text: 'Codigo', width: 75},
            {text: 'Serie', cellsalign: 'left', width: 75},
            {text: 'Etapa', width: 180},
            {text: 'Cant Repro', width: 100},
            {text: 'Precio', width: 100},
            {text: 'Creado Por', width: 150},
            {text: 'Fecha Creación', width: 150},
            {text: 'Modificado Por', width: 150},
            {text: 'Fecha Modifación', width: 150}
        ]
    });
    $("#grid").jqxGrid('localizestrings', localizationobj);
}
function cargar_precio_especifico() {
    let nro_ot = $("#txt_ot").val().trim();
    let id_producto = $("#producto2").val().trim();
    $.ajax({
        type: 'POST',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_agru',
        url: url + '/GestionCostos/public/index.php/list_cost_espe',
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
            if(responses.data.length>0){
                export_data=1;
            }else{
                export_data=0;
            }
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'acti_hora', type: 'date', format: 'dd/MM/yyyy'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'idcostoespecifico', type: 'number'},
                    {name: 'intIdEleme', type: 'number'},
                    {name: 'intIdEtapa', type: 'number'},
                    {name: 'intIdProy', type: 'number'},
                    {name: 'intIdTipoProducto', type: 'number'},
                    {name: 'intSerie', type: 'string'},
                    {name: 'numPrecio', type: 'float'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'date'},
                    {name: 'varCodiElemento', type: 'string'},
                    {name: 'varDescEtap', type: 'string'},
                    {name: 'intCantRepro', type: 'number'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                showfilterrow: true,
                source: dataAdapter,
                filterable: true,
                columnsresize: true,
                altrows: true,
                enabletooltips: true,
                selectionmode: 'multiplecellsextended',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,

                columns: [
                    {text: 'Número', datafield: 'idcostoespecifico', width: 65, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Codigo', datafield: 'varCodiElemento', width: 75, cellsalign: 'center'},
                    {text: 'Serie', datafield: 'intSerie', width: 75, cellsalign: 'center'},
                    {text: 'Etapa', datafield: 'varDescEtap', width: 180, cellsalign: 'center'},
                    {text: 'Cant Repro', datafield: 'intCantRepro', width: 100, cellsalign: 'center'},
                    {text: 'Precio', datafield: 'numPrecio', width: 100, cellsalign: 'center'},
                    {text: 'Creado Por', datafield: 'acti_usua', width: 150, cellsalign: 'center'},
                    {text: 'Fecha Creación', datafield: 'acti_hora', width: 150, cellsalign: 'center', cellsformat: 'dd/MM/yyyy HH:mm:ss'},
                    {text: 'Modificado Por', datafield: 'usua_modi', width: 150, cellsalign: 'center'},
                    {text: 'Fecha Modifación', datafield: 'hora_modi', width: 150, cellsalign: 'center', cellsformat: 'dd/MM/yyyy HH:mm:ss'}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });
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