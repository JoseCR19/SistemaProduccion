var exportar_data = 0;
$('#buscar_entidades').click(function () {
    select = document.getElementById('entidad').value;
    if (select === "Cliente") {
        exportar_data = 1;
        list_clie();
    } else if (select === "Empresas") {
        exportar_data = 1;
        list_empr();
    } else if (select === "Contratista") {
        exportar_data = 1;
        list_cont();
    } else if (select === "") {
        mensaje(false, "Seleccione una entidad", "no");
    }
});
$("#excel").click(function () {
    if (exportar_data === 0) {
        mensaje(false, "No hay data para exportar", "no");
    } else {
        var data = $("#grid").jqxGrid('exportdata', 'json');
        JSONToCSVConvertor(data, "Lista Entidades", true);
    }

});
/**
 * Funcion para listar clientes
 */
function list_clie() {
    var listar_clientes = " ";
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_clie',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                list_clie();
            }
        },
        success: function (listacliente) {
            
            var source = {
                localdata: listacliente.data,
                datatype: "array",
                datafields: [
                    {name: 'acti_hora', type: 'date'}, {name: 'acti_usua', type: 'string'}, {name: 'hora_modi', type: 'date'},
                    {name: 'intIdClie', type: 'number'}, {name: 'usua_modi', type: 'string'}, {name: 'varEstaClie', type: 'string'},
                    {name: 'varIdCliesql', type: 'string'}, {name: 'varRazClie', type: 'string'}, {name: 'varRucClie', type: 'string'}
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
                showfilterrow: true,
                filterable: true,
                theme: 'darkblue',
                selectionmode: 'multiplecellsextended',
                sortable: true,
                groupable: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                //pageable: true,
                columns: [
                    {text: 'N°', datafield: 'intIdClie', width: 60, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},

                    {text: 'RUC', datafield: 'varRucClie', width: 110},
                    {text: 'Descripción', datafield: 'varRazClie', width: 450},
                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'left', width: 150},
                    {text: 'Fecha creado', datafield: 'acti_hora', columntype: 'datetimeinput', filtertype: 'date', width: 170, cellsalign: 'right', cellsformat: 'dd/MM/yyyy HH:mm:ss'},
                    {text: 'Modificado por', datafield: 'usua_modi', cellsalign: 'right', width: 120},
                    {text: 'Fecha Modificado', datafield: 'hora_modi', filtertype: 'date', cellsalign: 'center', width: 150, cellsformat: 'dd/MM/yyyy HH:mm:ss'}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });
}
/**
 * Funcion para listar empresas
 */
function list_empr() {
    var listar_empresas = "";
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_empr',//microseervicio lista empresa
        url: url + '/GestionProyectos/public/index.php/list_empr', //microseervicio lista empresa
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                list_empr();
            }
        },
        success: function (listaempresas) {
            var source = {
                localdata: listaempresas.data,
                datatype: "array",
                datafields: [
                    {name: 'acti_hora', type: 'date'}, {name: 'acti_usua', type: 'string'}, {name: 'hora_modi', type: 'date'},
                    {name: 'intIdEmpr', type: 'number'}, {name: 'usua_modi', type: 'string'}, {name: 'varEstaEmpr', type: 'string'},
                    {name: 'varIdCliesql', type: 'string'}, {name: 'varRazEmpr', type: 'string'}, {name: 'varRucEmpr', type: 'string'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                showfilterrow: true,
                filterable: true,
                theme: 'darkblue',
                selectionmode: 'multiplecellsextended',
                sortable: true,
                groupable: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                //pageable: true,
                columns: [
                    {text: 'N°', datafield: 'intIdEmpr', width: 60, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            
                                            return count.length;

                                        }
                            }]},
                    {text: 'RUC', datafield: 'varRucEmpr', width: 110},
                    {text: 'Descripción', datafield: 'varRazEmpr', width: 450},
                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'left', width: 150},
                    {text: 'Fecha creado', datafield: 'acti_hora', filtertype: 'date', cellsalign: 'right', width: 170, cellsformat: 'dd/MM/yyyy HH:mm:ss'},
                    {text: 'Modificado por', datafield: 'usua_modi', cellsalign: 'right', width: 120},
                    {text: 'Fecha Modificado', datafield: 'hora_modi', filtertype: 'date', cellsalign: 'center', width: 150, cellsformat: 'dd/MM/yyyy HH:mm:ss'}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
        }

    });
}
/**
 * Funcion para listar contratas
 */
function list_cont() {
    var listar_contratista = "";
    $.ajax({
        type: 'GET',
        //url:  url + '/MimcoSeguridad/public/index.php/mantenimiento/list_cont',
        url: url + '/GestionProyectos/public/index.php/list_cont',
        dataType: 'json',
        /*beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', access_token);
         },*/
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                list_cont();
            }
        },
        success: function (listacontrata) {
            
            var source = {
                localdata: listacontrata.data,
                datatype: "array",
                datafields: [
                    {name: 'acti_hora', type: 'date'}, {name: 'acti_usua', type: 'string'}, {name: 'hora_modi', type: 'date'},
                    {name: 'intIdCont', type: 'number'}, {name: 'usua_modi', type: 'string'}, {name: 'varEstaCont', type: 'string'},
                    {name: 'varIdContsql', type: 'string'}, {name: 'varRazCont', type: 'string'}, {name: 'varRucCont', type: 'string'}
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                showfilterrow: true,
                filterable: true,
                theme: 'darkblue',
                selectionmode: 'multiplecellsextended',
                sortable: true,
                groupable: true,
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                //pageable: true,
                columns: [
                    {text: 'N°', datafield: 'intIdCont', width: 60, aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'RUC', datafield: 'varRucCont', width: 110},
                    {text: 'Descripción', datafield: 'varRazCont', width: 450},
                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'left', width: 150},
                    {text: 'Fecha creado', datafield: 'acti_hora', cellsalign: 'right', filtertype: 'date', width: 170, cellsformat: 'dd/MM/yyyy HH:mm:ss'},
                    {text: 'Modificado por', datafield: 'usua_modi', cellsalign: 'right', width: 120},
                    {text: 'Fecha Modificado', datafield: 'hora_modi', cellsalign: 'center', filtertype: 'date', width: 150, cellsformat: 'dd/MM/yyyy HH:mm:ss'}
                ]
            });
            $("#grid").jqxGrid('localizestrings', localizationobj);
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