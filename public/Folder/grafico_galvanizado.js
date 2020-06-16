var now = new Date();

var day_galv = ("0" + now.getDate()).slice(-2);
var month_galv = ("0" + (now.getMonth() + 1)).slice(-2);
var diaactual = now.getFullYear() + "-" + (month_galv) + "-" + (day_galv);
var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia = moment(firstDay).format('YYYY-MM-DD');

var fech_inic_report = "";
var fech_final_report = "";

$('#fech_inic_report_galv').val(primerdia);
$('#fech_fin_report_galv').val(diaactual);
var grafico_1 = "";
var grafico_2 = "";
var grafico_3 = "";



$("#btn_busc_report_galv").click(function () {

    fech_inic_report = "";
    fech_final_report = "";

    let fechainicio = $('#fech_inic_report_galv').val();
    let fechafinal = $('#fech_fin_report_galv').val();
    if (fechainicio === "") {
        mensaje(false, "INGRESE LA FECHA DE INICIO", "no");
    } else {
        if (fechafinal === "") {
            mensaje(false, "INGRESE LA FECHA DE FINAL", "no");
        } else {
            if (fechainicio <= fechafinal) {
                fech_inic_report = fechainicio;
                fech_final_report = fechafinal;

                $("#mostrar_diagrama").removeClass('hidde_grid');
                $("#mostrar_excel_galv").removeClass('hidde_grid');
                $("#mostrar_pdf_galv").removeClass('hidde_grid');
                diagrama_numero1(fechainicio, fechafinal);
                diagrama_numero2(fechainicio, fechafinal);
                diagrama_numero3(fechainicio, fechafinal);
            } else {

                mensaje(false, "LA FECHA FINAL: " + fechafinal + " DEBE SER MAYOR QUE LA FECHA INICIO: " + fechainicio, "no");
            }
        }
    }

});

function diagrama_numero1(fechainicio, fechafinal) {
    grafico_1 = "";
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/listar_peso_galvanizado',
        dataType: 'json',
        data: {
            dateFechIngr: fechainicio,
            dateFechSali: fechafinal

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {

            grafico_1 = JSON.stringify(responses.data);
            $('#chartContainer').jqxChart('clear');
            $('#chartContainer').jqxChart('refresh');

            if (responses.data.length > 0) {
                $("#chartContainer").removeClass('hidde_grid');
                $('#chartContainer').jqxChart({backgroundColor: '#fcfafa'});

                var source =
                        {
                            datatype: "array",
                            localdata: responses.data,
                            datafields: [
                                {name: 'tipo'},
                                {name: 'peso'},
                                {name: 'zinc'},
                            ],

                        };

                var dataAdapter = new $.jqx.dataAdapter(source);

                fnLabelsClass = function (value, itemIndex, serie, group) {
                    if (value > 100)
                        return 'redLabel';
                    return 'greenLabel';
                },
                        fnLabelsBorderColor = function (value, itemIndex, serie, group) {
                            if (value > 100)
                                return '#FF0000';
                            return '#89A54E';
                        }

                fnFormatLabel = function (value, itemIndex, serie, group) {
                    return value;
                }
                var dataAdapter = new $.jqx.dataAdapter(source, {async: false, autoBind: true, loadError: function (xhr, status, error) {
                        alert('Error loading "' + source.url + '" : ' + error);
                    }});
                // prepare jqxChart settings
                var settings = {
                    title: "Peso Galvanizado",
                    description: "MIMCO-TERCERO",
                    showLegend: true,
                    enableAnimations: true,
                    padding: {left: 5, top: 5, right: 5, bottom: 5},
                    titlePadding: {left: 90, top: 0, right: 0, bottom: 10},
                    source: dataAdapter,
                    xAxis:
                            {
                                dataField: 'tipo'
                            },
                    colorScheme: 'scheme01',
                    seriesGroups:
                            [
                                {
                                    type: 'column',
                                    columnsGapPercent: 100,
                                    valueAxis:
                                            {
                                                unitInterval: 400,
                                                title: {text: 'Peso Galvanizado'}
                                            },
                                    series: [
                                        {dataField: 'peso', displayText: 'Peso Galvanizado', showLabels: true},
                                    ]
                                },
                                {
                                    type: 'column',
                                    columnsGapPercent: 100,
                                    valueAxis:
                                            {
                                                unitInterval: 150,
                                                title: {text: 'Consumo Zinc (%)'},
                                                position: 'right',
                                                gridLines: {visible: true}
                                            },
                                    series: [
                                        {dataField: 'zinc', displayText: 'Zinc(%)', showLabels: true, cellsformat: 'c3'}
                                    ]
                                }
                            ]
                };
                $('#chartContainer').jqxChart(settings);

            } else {
                $("#chartContainer").addClass('hidde_grid');
            }
        }

    });


}

function diagrama_numero2(fechainicio2, fechafinal2) {
    grafico_2 = "";
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/listar_peso_negro',
        dataType: 'json',
        data: {
            dateFechIngr: fechainicio2,
            dateFechSali: fechafinal2

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            grafico_2 = JSON.stringify(responses.data);

            $('#chartContainer2').jqxChart('clear');
            if (responses.data.length > 0) {
                $("#chartContainer2").removeClass('hidde_grid');
                $('#chartContainer2').jqxChart({backgroundColor: '#fcfafa'});
                var source =
                        {
                            datatype: "array",
                            localdata: responses.data,
                            datafields: [
                                {name: 'varTipoOrden'},
                                {name: 'PesoLiviano', type: "float"},
                                {name: 'PesoPesado', type: "float"},
                                {name: 'PesoSemiPesado', type: "float"},
                            ],

                        };
                var dataAdapter = new $.jqx.dataAdapter(source);

                var settings = {
                    title: "Peso Negro",
                    description: "MIMCO - TERCERO",
                    enableAnimations: true,
                    showLegend: true,
                    padding: {left: 5, top: 5, right: 5, bottom: 5},
                    titlePadding: {left: 90, top: 0, right: 0, bottom: 10},
                    source: dataAdapter,
                    xAxis:
                            {
                                dataField: 'varTipoOrden',
                                displayText: 'TIPO ORDEN',
                                showGridLines: true
                            },
                    colorScheme: 'scheme01',
                    seriesGroups:
                            [
                                {
                                    type: 'column',
                                    columnsGapPercent: 50,
                                    seriesGapPercent: 0,
                                    valueAxis:
                                            {
                                                unitInterval: 100,
                                                displayValueAxis: true,

                                                axisSize: 'auto',
                                                tickMarksColor: '#888888'
                                            },
                                    series: [
                                        {dataField: 'PesoLiviano', displayText: 'LIVIANO', showLabels: true, cellsformat: "c3"},
                                        {dataField: 'PesoPesado', displayText: 'PESADO', showLabels: true, cellsformat: "c3"},
                                        {dataField: 'PesoSemiPesado', displayText: 'SEMIPESADO', showLabels: true, cellsformat: "c3"}
                                    ]
                                }
                            ]
                };

                // setup the chart
                $('#chartContainer2').jqxChart(settings);

            } else {
                $("#chartContainer2").addClass('hidde_grid');
            }



        }
    });
}

function diagrama_numero3(fechainicio3, fechafinal3) {
    grafico_3 = "";
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/repo_consumo_zinc',
        dataType: 'json',
        data: {
            dateFechIngr: fechainicio3,
            dateFechSali: fechafinal3

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            console.log(responses);
            grafico_3 = JSON.stringify(responses.data);
            $('#chartContainer3').jqxChart('clear');
            $('#chartContainer3').jqxChart('refresh');
            if (responses.data.length > 0) {
                $("#chartContainer3").removeClass('hidde_grid');
                $('#chartContainer3').jqxChart({backgroundColor: '#fcfafa'});
                var source =
                        {
                            datatype: "array",
                            localdata: responses.data,
                            datafields: [
                                {name: 'varTipoOrden'},
                                {name: 'PesoLiviano', type: "float"},
                                {name: 'PesoPesado', type: "float"},
                                {name: 'PesoSemiPesado', type: "float"},
                            ],

                        };

                var dataAdapter = new $.jqx.dataAdapter(source);

                var settings = {
                    title: "Porcentaje de consumo Zinc(%)",
                    description: "MIMCO - TERCERO",
                    enableAnimations: true,
                    showLegend: true,
                    padding: {left: 5, top: 5, right: 5, bottom: 5},
                    titlePadding: {left: 90, top: 0, right: 0, bottom: 10},
                    source: dataAdapter,
                    xAxis:
                            {
                                dataField: 'varTipoOrden',
                                displayText: 'TIPO ORDEN',
                                showGridLines: true
                            },
                    colorScheme: 'scheme01',
                    seriesGroups:
                            [
                                {
                                    type: 'column',
                                    columnsGapPercent: 50,
                                    seriesGapPercent: 0,
                                    valueAxis:
                                            {
                                                unitInterval: 100,
                                                displayValueAxis: true,
                                                description: 'Zinc(%)',
                                                axisSize: 'auto',
                                                tickMarksColor: '#888888'
                                            },
                                    series: [
                                        {dataField: 'PesoLiviano', displayText: 'LIVIANO', showLabels: true, cellsformat: "c3"},
                                        {dataField: 'PesoPesado', displayText: 'PESADO', showLabels: true, cellsformat: "c3"},
                                        {dataField: 'PesoSemiPesado', displayText: 'SEMIPESADO', showLabels: true, cellsformat: "c3"}
                                    ]
                                }
                            ]
                };
                $('#chartContainer3').jqxChart(settings);
            } else {
                $("#chartContainer3").addClass('hidde_grid');
            }
        }

    });
}

function combo_reporte() {

    var tipo_reporte = [{'valor': 1, 'label': 'PESO GALVANIZADO'}, {'valor': 2, 'label': 'PESO NEGRO'}, {'valor': 3, 'label': 'CONSUMO ZINC(%)'}];
    var source =
            {
                localdata: tipo_reporte,
                datatype: "array",
                height: '50%',
                datafields: [
                    {name: 'valor'},
                    {name: 'label'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#export_excel_galva").jqxDropDownList({placeHolder: "SELECCIONE: ", animationType: 'fade', template: "success", source: dataAdapter, displayMember: "label", valueMember: "valor", width: 170, height: 27});

    $("#export_excel_galva").jqxDropDownList('focus');
    $("#export_excel_galva").jqxDropDownList('selectIndex', -1);
    
    $("#export_excel_galva_pdf").jqxDropDownList({placeHolder: "SELECCIONE: ", animationType: 'fade', template: "success", source: dataAdapter, displayMember: "label", valueMember: "valor", width: 170, height: 27});

    $("#export_excel_galva_pdf").jqxDropDownList('focus');
    $("#export_excel_galva_pdf").jqxDropDownList('selectIndex', -1);
}

$("#export_galv").click(function () {
    combo_reporte();
    $("#modal-galv-pregunta").modal('show');
});
$("#export_galv_pdf").click(function () {
    combo_reporte();
    $("#modal-galv-pregunta_pdf").modal('show');
});
$("#opci_export_excel").click(function () {
    let numb_opcion = $("#export_excel_galva").val();
    if (numb_opcion == "") {
        mensaje(false, "SELECCIONE UNA OPCION", "no");
    } else if (numb_opcion === "1") {
       
        JSONToCSVConvertor(grafico_1, "PesoGalvanizado", true);

    } else if (numb_opcion === "2") {
        JSONToCSVConvertor(grafico_2, "PesoNegro", true);
    } else if (numb_opcion === "3") {
        JSONToCSVConvertor(grafico_3, "Consumo", true);

    }
});
$("#opci_export_pdf").click(function () {
    let numb_opcion = $("#export_excel_galva_pdf").val();
    if (numb_opcion == "") {
        mensaje(false, "SELECCIONE UNA OPCION", "no");
    } else if (numb_opcion === "1") {
        $('#chartContainer').jqxChart('saveAsPDF', 'peso_galvanizado.pdf', 'http://www.jqwidgets.com/export_server/export.php');
    } else if (numb_opcion === "2") {
        $('#chartContainer2').jqxChart('saveAsPDF', 'peso_negro.pdf', 'http://www.jqwidgets.com/export_server/export.php');
    } else if (numb_opcion === "3") {
        $('#chartContainer3').jqxChart('saveAsPDF', 'consumo.pdf', 'http://www.jqwidgets.com/export_server/export.php');

    }
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

$("#close_btn_clear").click(function () {
    $("#export_excel_galva").jqxDropDownList('clearSelection');
    $("#export_excel_galva").jqxDropDownList('clear');
});