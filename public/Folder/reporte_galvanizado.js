var unidad_value = "";
var semana_inicio_value = "";
var semana_fin_value = "";
var unidad_label = "";

$("#tipo_ot").on('change', function (event) {
    unidad_value = "";
    unidad_label = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            unidad_value = item.value;
            unidad_label = item.label;
            $("#grid").jqxGrid('clear');
            $("#mostrar_pdf_repo").addClass('hidde_grid');
        }
    }

});
$("#semana_inicio").on('change', function (event) {
    semana_inicio_value = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            semana_inicio_value = item.value;
            $("#grid").jqxGrid('clear');
            $("#mostrar_pdf_repo").addClass('hidde_grid');
        }
    }

});
$("#semana_fin").on('change', function (event) {
    semana_fin_value = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            semana_fin_value = item.value;
            $("#grid").jqxGrid('clear');
            $("#mostrar_pdf_repo").addClass('hidde_grid');
        }
    }
});


function tipo_ot() {
    var tipo_ot = [{'Tipo_Ot': 'PESON', 'VarOt': 'PESO NEGRO'}, {'Tipo_Ot': 'PESOG', 'VarOt': 'PESO GALVANIZADO'}, {'Tipo_Ot': 'CANT', 'VarOt': 'CANTIDAD'}];
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
    $("#tipo_ot").jqxDropDownList('selectIndex', 0);
    $("#tipo_ot").jqxDropDownList('focus');
}
function combo_inicio_valo() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_peri_valo',
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
        url: url + '/GestionProyectos/public/index.php/list_peri_valo',
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
$("#btn_busc").on('click', function () {
    var tipo_reporte = $("#tipo_ot").val();
    var semana_inicio = $("#semana_inicio").val();
    var semana_fin = $("#semana_fin").val();
    if (tipo_reporte) {
        if (semana_inicio) {
            if (semana_fin) {
                listar_valorizacion_grilla(tipo_reporte, semana_inicio, semana_fin);
            } else {
                mensaje(false, "No ha seleccionado una SEMANA FIN", "no");
            }
        } else {
            mensaje(false, "No ha seleccionado un SEMANA INICIO", "no");
        }
    } else {
        mensaje(false, "No ha seleccionado una UNIDAD", "no");
    }
});
function listar_valorizacion_grilla(tipo_reporte, semana_inicio, semana_fin) {

    if (parseInt(semana_fin) < parseInt(semana_inicio)) {
        mensaje(false, "La semana Inicio no puede ser mayor a la semana final", "no");

    } else {
        $.ajax({
            type: 'POST',
            url: url + '/GestionReportes/public/index.php/reporte_galvanizado_turno',
            dataType: 'json',
            data: {
                dateFechIngr: semana_inicio,
                dateFechSali: semana_fin,
                tipo_reporte: tipo_reporte
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError == "Internal Server Error") {
                    //listar_valorizacion_grilla(ot, producto, tipoetapa, planta, etapa, codigos, contrata, iniciosemana, finsemana);
                }
            },
            success: function (responses) {

                if (responses.data.length > 0) {
                    $("#mostrar_pdf_repo").removeClass('hidde_grid');
                    grafico_1 = JSON.stringify(responses.data);

                    var cellClass1 = function (row, dataField, cellText, rowData) {

                        if (rowData.ntipo === '4') {
                            return "total";
                        } else if (rowData.ntipo === '3') {
                            return "subtotal";
                        } else {
                            return "resto";
                        }

                    };
                    var source =
                            {
                                localdata: responses.data,
                                datatype: "array",
                                datafields: [
                                    {name: 'Fecha', type: 'string'},
                                    {name: 'T1mimco', type: 'string'},
                                    {name: 'T1tercero', type: 'string'},
                                    {name: 'T2mimco', type: 'string'},
                                    {name: 'T2tercero', type: 'string'},
                                    {name: 'TotalT1', type: 'string'},
                                    {name: 'TotalT2', type: 'string'},
                                    {name: 'TotalUnidad', type: 'string'},
                                    {name: 'UnidadMimco', type: 'string'},
                                    {name: 'UnidadTercero', type: 'string'},
                                    {name: 'ntipo', type: 'string'},
                                    {name: 'strSemana', type: 'string'}
                                ],
                                async: false
                            };
                    var dataAdapter = new $.jqx.dataAdapter(source);

                    $("#grid").jqxGrid({
                        width: '100%',
                        height: '100%',
                        columnsresize: true,
                        altrows: true,
                        source: dataAdapter,
                        enabletooltips: true,
                        showfilterrow: true,
                        filterable: true,
                        // sortable: true,

                        theme: 'darkblue',
                        showstatusbar: true,
                        statusbarheight: 25,
                        showaggregates: true,
                        showgroupaggregates: true,

                        columns: [
                            {text: 'SEMANA', align: 'center', datafield: 'strSemana', width: 150, groupable: true, cellClassName: cellClass1},
                            {text: 'FECHA', align: 'center', datafield: 'Fecha', width: 100, groupable: true, cellClassName: cellClass1},
                            {text: 'MIMCO', align: 'center', datafield: 'UnidadMimco', width: 100, groupable: true, cellClassName: cellClass1},
                            {text: 'TERCERO', align: 'center', datafield: 'UnidadTercero', width: 100, groupable: true, cellClassName: cellClass1},
                            {text: 'TOTAL', align: 'center', datafield: 'TotalUnidad', width: 120, groupable: true, cellClassName: cellClass1},
                            {text: 'T1 Mimco', align: 'center', columngroup: 'MIMCO', datafield: 'T1mimco', width: 100, groupable: true, cellClassName: cellClass1},
                            {text: 'T1 Tercero', align: 'center', columngroup: 'MIMCO', datafield: 'T1tercero', width: 100, groupable: true, cellClassName: cellClass1},
                            {text: 'TOTAL', align: 'center', columngroup: 'MIMCO', datafield: 'TotalT1', width: 120, groupable: true, cellClassName: cellClass1},
                            {text: 'T2 Mimco', align: 'center', columngroup: 'TERCERO', datafield: 'T2mimco', width: 100, groupable: true, cellClassName: cellClass1},
                            {text: 'T2 Tercero', align: 'center', columngroup: 'TERCERO', datafield: 'T2tercero', width: 100, groupable: true, cellClassName: cellClass1},
                            {text: 'TOTAL', align: 'center', columngroup: 'TERCERO', datafield: 'TotalT2', width: 120, groupable: true, cellClassName: cellClass1}
                        ],
                        columngroups: [
                            {text: 'TURNO 1', align: 'center', name: 'MIMCO'},
                            {text: 'TURNO 2', align: 'center', name: 'TERCERO'}
                        ]
                    });
                    $("#grid").jqxGrid('localizestrings', localizationobj);

                } else {
                    mensaje(false, "NO HAY DATO A MOSTRAR", "no");
                }

            }
        });
    }

}
$("#reporte_galv_excel").click(function () {
    JSONToCSVConvertor(grafico_1, "Reporte", true);
});
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

$("#pdf_repo_uni").click(function () {
    if (unidad_value) {
        if (semana_inicio_value) {
            if (semana_fin_value) {
                let usuario_conectado = obtener_user();

                $(location).attr('href', "valorizacion/contratista/" + usuario_conectado + '/' + unidad_value + '/' + semana_inicio_value + '/' + semana_fin_value + '/' + unidad_label);
            } else {
                mensaje(false, "NO HA SELECCIONADO UN SEMANA INICIO", "no");
            }
        } else {
            mensaje(false, "NO HA SELECCIONADO UN SEMANA INICIO", "no");
        }
    } else {
        mensaje(false, "NO HA SELECCIONADO UNA UNIDAD", "no");

    }


});


function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}
