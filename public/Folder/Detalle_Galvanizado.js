var inicio = "";
var fin = "";
var tipo = "";

$("#btn_search_detgalva").click(function () {
    inicio = $('#fech_inic_galv').val();
    fin = $('#fech_fin_galv').val();
    tipo = $('#tipo_detalle_galv').val();
    listar_detalle_galvanizado(tipo, inicio, fin);
});

$("#btn_exportar_excel").click(function () {
      var data = $("#grid_detalle_galv").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Detalle_Galvanizado", true);
});

function cbo_tipo_orden() {
    var tipo_orden = [{codtipo: 'MIMCO', desctipo: 'MIMCO'}, {codtipo: 'TERCERO', desctipo: 'TERCERO'}];
    var source =
            {
                localdata: tipo_orden,
                datatype: "array"
            };
    var dataAdapter = new jQuery.jqx.dataAdapter(source);
    $('#tipo_detalle_galv').jqxDropDownList({placeHolder: "", source: dataAdapter, displayMember: "desctipo", valueMember: "codtipo", itemHeight: 20, height: 30, width: 180, dropDownHeight: 45});
    $("#tipo_detalle_galv").jqxDropDownList('focus');
    $("#tipo_detalle_galv").jqxDropDownList('selectIndex', 0);
    //fecha actual
    var now = new Date();
    var fechaactual = moment(now).format('YYYY-MM-DD');
    fin = $('#fech_fin_galv').val(fechaactual);
    //fecha hace 3 meses   
    //now.setDate(now.getMonth() - 3);
    //primer dia del año now.getMonth()
    var pdanio = new Date(now.getFullYear(), 0, 1)
    var fechapast = moment(pdanio).format('YYYY-MM-DD');
    inicio = $('#fech_inic_galv').val(fechapast);
}

function listar_detalle_galvanizado(tipo, inicio, fin) {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/reporte_galvanizado_cabecera_detalle',
        data: {varTipoOrden: tipo,
            fecha_inicio: inicio,
            fecha_fin: fin},
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_detalle_galvanizado();
            }
        },
        success: function (responses) {            
            if (responses.data.length > 0) {
                var source = {
                    localdata: responses.data,
                    datatype: "array",
                    //cargo los campos que quiero visualizar
                    datafields: [{name: 'intIdGalva', type: 'number'},
                        {name: 'orden', type: 'string'},
                        {name: 'Cliente', type: 'string'},
                        {name: 'varDescripcion', type: 'string'},
                        {name: 'Guia', type: 'string'},
                        {name: 'intCantTota', type: 'number'},
                        {name: 'dateFechIngrCabecera', type: 'string'},
                        {name: 'dateFechSaliCabecera', type: 'string'},
                        {name: 'dateFechInternCabecera', type: 'string'},
                        {name: 'intIdDetaGalv', type: 'number'},
                        {name: 'varDescPeriValo', type: 'string'},
                        {name: 'varTipoGalv', type: 'string'},
                        {name: 'intGanchera', type: 'number'},
                        {name: 'varTurno', type: 'string'},
                        {name: 'dateFechInic', type: 'string'},
                        {name: 'dateFechSali', type: 'string'},
                        {name: 'varHoraEntr', type: 'string'},
                        {name: 'varHoraSali', type: 'string'},
                        {name: 'varTipoMate', type: 'string'},
                        {name: 'deciPesoNegro', type: 'string'},
                        {name: 'deciPesoGalv', type: 'string'},
                        {name: 'deciConsumoZinc', type: 'string'},
                        {name: 'varPorcZinc', type: 'string'},
                        {name: 'varDescEsta', type: 'string'}]
                };
                var dataAdapter = new $.jqx.dataAdapter(source);
                if (tipo === 'MIMCO')
                {
                    $("#grid_detalle_galv").jqxGrid({
                        width: '100%',
                        height: '100%',
                        source: dataAdapter,
                        showfilterrow: true,
                        filterable: true,
                        sortable: true,
                        theme: 'darkblue',
                         enabletooltips: true,
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {text: 'OT', datafield: 'orden', width: 79, pinned: true},
                            {text: 'CLIENTE', datafield: 'Cliente', width: 195, pinned: true},
                            {text: 'DESCRIPCION', datafield: 'varDescripcion', width: 150, pinned: true},
                            {text: 'GUIA', datafield: 'Guia', width: 95, cellsalign: 'left', pinned: true},
                            {text: 'CANTIDAD TOTAL', datafield: 'intCantTota', width: 135, cellsaling: 'center'},
                            {text: 'FECHA INGRESO', datafield: 'dateFechIngrCabecera', width: 120},
                            {text: 'FECHA SALIDA', datafield: 'dateFechSaliCabecera', width: 120},
                            {text: 'SEMANA', datafield: 'varDescPeriValo', width: 115},
                            {text: 'TIPO GALVANIZADO', datafield: 'varTipoGalv', width: 155, cellsalign: ''},
                            {text: 'GANCHERA', datafield: 'intGanchera', width: 95, cellsalign: ''},
                            {text: 'TURNO', datafield: 'varTurno', width: 105, cellsalign: ''},
                            {text: 'FECHA INICIO', datafield: 'dateFechInic', width: 105, cellsalign: ''},
                            {text: 'FECHA FIN', datafield: 'dateFechSali', width: 95, cellsalign: ''},
                            {text: 'HORA ENTRADA', datafield: 'varHoraEntr', width: 120, cellsalign: ''},
                            {text: 'HORA SALIDA', datafield: 'varHoraSali', width: 120, cellsalign: ''},
                            {text: 'TIPO MATERIAL', datafield: 'varTipoMate', width: 135, cellsalign: ''},
                            {text: 'PESO NEGRO', datafield: 'deciPesoNegro', width: 105, cellsalign: 'center'},
                            {text: 'PESO GALVANIZADO', datafield: 'deciPesoGalv', width: 150, cellsalign: 'center'},
                            {text: 'CONSUMO ZINC', datafield: 'deciConsumoZinc', width: 115, cellsalign: 'center'},
                            {text: '% ZINC', datafield: 'varPorcZinc', width: 75, cellsalign: 'center'},
                            {text: 'ESTADO', datafield: 'varDescEsta', width: 95}
                        ]
                    });
                } else
                {
                    //console.log(source);
                    $("#grid_detalle_galv").jqxGrid('clear');
                    //mensaje(false, "OS", "");
                    //listar_errores(responses.data.mensaje);                    
                    $("#grid_detalle_galv").jqxGrid({
                        width: '100%',
                        height: '100%',
                        source: dataAdapter,
                        showfilterrow: true,
                        filterable: true,
                        sortable: true,
                        theme: 'darkblue',
                        showstatusbar: true,
                        statusbarheight: 25,
                        altrows: true,
                        showaggregates: true,
                        showgroupaggregates: true,
                        columns: [
                            {text: 'OS', datafield: 'orden', width: 79, pinned: true},
                            {text: 'CLIENTE', datafield: 'Cliente', width: 195, pinned: true},
                            {text: 'DESCRIPCION', datafield: 'varDescripcion', width: 150, pinned: true},
                            //{text: 'GUIA', datafield: 'Guia', width: 95, cellsalign: 'left', pinned: true},                            
                            {text: 'FECHA INGRESO', datafield: 'dateFechIngrCabecera', width: 120, pinned: true},
                            {text: 'FECHA SALIDA', datafield: 'dateFechSaliCabecera', width: 120, pinned: true},
                            {text: 'CANTIDAD TOTAL', datafield: 'intCantTota', width: 135, cellsaling: 'center'},
                            //{text: 'SEMANA', datafield: 'varDescPeriValo', width: 115, pinned: true},
                            {text: 'TIPO GALVANIZADO', datafield: 'varTipoGalv', width: 155, cellsalign: ''},
                            {text: 'GANCHERA', datafield: 'intGanchera', width: 95, cellsalign: ''},
                            {text: 'TURNO', datafield: 'varTurno', width: 105, cellsalign: ''},
                            {text: 'FECHA INICIO', datafield: 'dateFechInic', width: 105, cellsalign: ''},
                            {text: 'FECHA FIN', datafield: 'dateFechSali', width: 95, cellsalign: ''},
                            {text: 'HORA ENTRADA', datafield: 'varHoraEntr', width: 120, cellsalign: ''},
                            {text: 'HORA SALIDA', datafield: 'varHoraSali', width: 120, cellsalign: ''},
                            {text: 'TIPO MATERIAL', datafield: 'varTipoMate', width: 135, cellsalign: ''},
                            {text: 'PESO NEGRO', datafield: 'deciPesoNegro', width: 105, cellsalign: 'center'},
                            {text: 'PESO GALVANIZADO', datafield: 'deciPesoGalv', width: 150, cellsalign: 'center'},
                            {text: 'CONSUMO ZINC', datafield: 'deciConsumoZinc', width: 115, cellsalign: 'center'},
                            {text: '% ZINC', datafield: 'varPorcZinc', width: 75, cellsalign: 'center'},
                            {text: 'ESTADO', datafield: 'varDescEsta', width: 95}
                        ]
                    });
                }
            }
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
            if (index !== 'EDITAR') {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
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
            if (index !== 'EDITAR') {
                row += '"' + arrData[i][index] + '",';
            }
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
    var fileName = "Mi_Reporte";
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