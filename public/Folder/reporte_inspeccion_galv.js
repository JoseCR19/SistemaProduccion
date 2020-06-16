var now = new Date();
var day_galv = ("0" + now.getDate()).slice(-2);
var month_galv = ("0" + (now.getMonth() + 1)).slice(-2);
var diaactual = now.getFullYear() + "-" + (month_galv) + "-" + (day_galv);
var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
var primerdia = moment(firstDay).format('YYYY-MM-DD');
var fech_inic_report = "";
var fech_final_report = "";
$('#fech_inic_repo_insp_galv').val(primerdia);
$('#fech_fin_repo_insp_galv').val(diaactual);
var dato_exportar="";

$("#fech_inic_repo_insp_galv").on('change', function (event) {
      dato_exportar="";
    $("#grid_repo_insp_galv").jqxGrid('clear');
});
$("#fech_fin_repo_insp_galv").on('change', function (event) {
    dato_exportar="";
    $("#grid_repo_insp_galv").jqxGrid('clear');
});

$("#inlineRadio1").on("click", function () {
    dato_exportar = "";
    $("#grid_repo_insp_galv").jqxGrid('clear');
});
$("#inlineRadio2").on("click", function () {
    //limpiar la grilla
    dato_exportar = "";
    $("#grid_repo_insp_galv").jqxGrid('clear');

});


$("#btn_busc_repo_insp_galv").click(function () {
    let fecha_inicio = $("#fech_inic_repo_insp_galv").val();
    let fecha_final = $("#fech_fin_repo_insp_galv").val();
    let check = $("input:checked").val();
//    console.log(fecha_inicio,fecha_final,check);

    if (fecha_inicio > fecha_final) {
        mensaje(false, "LA FECHA FINAL DEBE SER MAYOR A LA FECHA DE INICIO", "no");
    } else {
        grilla_insp_galv(fecha_inicio, fecha_final, check);
    }
});

function grilla_insp_galv(fecha_inicio2, fecha_final2, check2) {
      dato_exportar = "";
      $("#modal-cargar-repo-insp-galv").modal('show');
    $.ajax({
        type: 'POST',
        url: url + '/GestionReportes/public/index.php/reporte_inspeccion_glavanizado',
        dataType: 'json',
        data: {
            dateFechIngr: fecha_inicio2,
            dateFechSali: fecha_final2,
            tipoReporte: check2,
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //listar_avance(codigoproducto, codigoot, check_zona, check_tarea, check_etapa);
            }
        },
        success: function (responses) {
            console.log(responses);
          dato_exportar= JSON.stringify(responses.data);
          
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [

                            //Inspeccion por especificacion

                            {name: 'varEspecificacion', type: 'string'},
                            {name: 'TolMimco', type: 'string'},
                            {name: 'TolTercero', type: 'string'},
                            {name: 'TotalTol', type: 'string'},
                            {name: 'ExcesoPMimco', type: 'string'},
                            {name: 'ExcesoPTercero', type: 'string'},
                            {name: 'ExcesoTotal', type: 'string'},
                            {name: 'GalvanizadoMimco', type: 'string'},
                            {name: 'GalvanizadoTercero', type: 'string'},
                            {name: 'GalvanizadoTotal', type: 'string'},
                            {name: 'ConsumoMimco', type: 'string'},
                            {name: 'ConsumoTercero', type: 'string'},
                            {name: 'ConsumoTotal', type: 'string'},

                            //Inspeccion en exceso,consumo y turno
                            {name: 'fecha', type: 'string'},
                            {name: 'Pesonegro', type: 'string'},
                            {name: 'Pesogalvanizado', type: 'string'},
                            {name: 'ExcDiaMimco', type: 'string'},
                            {name: 'ExcDiaTercero', type: 'string'},
                            {name: 'ExcDiaTotal', type: 'string'},
                            {name: 'ExcNocheMimco', type: 'string'},
                            {name: 'ExcNocheTercero', type: 'string'},
                            {name: 'ExcNocheTotal', type: 'string'},
                            {name: 'ExcTotal', type: 'string'},
                            {name: 'ConsumoDMimco', type: 'string'},
                            {name: 'ConsumoDTercero', type: 'string'},
                            {name: 'ConsumoDTotal', type: 'string'},
                            {name: 'ConsumoNMimco', type: 'string'},
                            {name: 'ConsumoNTercero', type: 'string'},
                            {name: 'ConsumoNTotal', type: 'string'},
                            {name: 'ConsumoTotal', type: 'string'}

                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#grid_repo_insp_galv").jqxGrid('clear');
            
               window.setTimeout(function () {
                    $("#modal-cargar-repo-insp-galv").modal('hide'); // COLOCO ANDY 
                }, 1000);
                
            if (check2 === "1") {
                $("#grid_repo_insp_galv").jqxGrid({
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
                        {text: 'ASTM 123', align: 'center', datafield: 'varEspecificacion', columngroup: 'GrupoEsp', width: 150, groupable: true, aggregates: [{
                                    '<b>TOTALES</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_repo_insp_galv").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }]},
                        {text: 'MIMCO', align: 'center', datafield: 'TolMimco', columngroup: 'Tolera', width: 100, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['TolMimco']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'TERCERO', align: 'center', datafield: 'TolTercero', columngroup: 'Tolera', width: 100, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['TolTercero']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'TOTAL', align: 'center', datafield: 'TotalTol', columngroup: 'Tolera', width: 120, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['TotalTol']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'EXC.MIMCO', align: 'center', columngroup: 'Exceso', datafield: 'ExcesoPMimco', width: 120, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ExcesoPMimco']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'EXC.TERCERO', align: 'center', columngroup: 'Exceso', datafield: 'ExcesoPTercero', width: 100, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ExcesoPTercero']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'EXC.TOTAL', align: 'center', columngroup: 'Exceso', datafield: 'ExcesoTotal', width: 100, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ExcesoTotal']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'GALV.MIMCO', align: 'center', columngroup: 'Galva', datafield: 'GalvanizadoMimco', width: 120, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['GalvanizadoMimco']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'GALV.TERCERO', align: 'center', columngroup: 'Galva', datafield: 'GalvanizadoTercero', width: 100, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['GalvanizadoTercero']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'GALV.TOTAL', align: 'center', columngroup: 'Galva', datafield: 'GalvanizadoTotal', width: 100, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['GalvanizadoTotal']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'CONS.MIMCO', align: 'center', columngroup: 'Consu', datafield: 'ConsumoMimco', width: 120, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ConsumoMimco']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'CONS.TERCERO', align: 'center', columngroup: 'Consu', datafield: 'ConsumoTercero', width: 100, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ConsumoTercero']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'CONS.TOTAL', align: 'center', columngroup: 'Consu', datafield: 'ConsumoTotal', width: 100, groupable: true, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ConsumoTotal']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                    ],
                    columngroups: [
                        {text: 'ESPEC.NORMA', align: 'center', name: 'GrupoEsp'},
                        {text: 'TOLERANCIA', align: 'center', name: 'Tolera'},
                        {text: 'KG.PESO EXCESO', align: 'center', name: 'Exceso'},
                        {text: 'GALVANIZADO', align: 'center', name: 'Galva'},
                        {text: 'CONSUMO ZINC', align: 'center', name: 'Consu'}
                    ]
                });
                $("#grid_repo_insp_galv").jqxGrid('localizestrings', localizationobj);
            } else if (check2 === "2") {
                $("#grid_repo_insp_galv").jqxGrid({
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
                        {text: 'FECHA', cellsalign: 'left', align: 'center', datafield: 'fecha', width: '10%',aggregates: [{
                                    '<b>TOTALES</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_repo_insp_galv").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }]},
                        {text: 'PESO NEGRO', cellsalign: 'left', align: 'center', datafield: 'Pesonegro', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['Pesonegro']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'PESO GALVANIZADO', cellsalign: 'left', align: 'center', datafield: 'Pesogalvanizado', width: '15%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['Pesogalvanizado']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'MIMCO', columngroup: 'OrderDetails', datafield: 'ExcDiaMimco',align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ExcDiaMimco']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'TERCERO', columngroup: 'OrderDetails', datafield: 'ExcDiaTercero', align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ExcDiaTercero']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'TOTAL', columngroup: 'OrderDetails', datafield: 'ExcDiaTotal', align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                total = parseFloat(record['ExcDiaTotal']) + parseFloat(aggregatedValue);
                                                total = parseFloat(total).toFixed(3);
                                                return total;
                                            },
                                }]},
                        {text: 'MIMCO', columngroup: 'OrderDetails2', datafield: 'ExcNocheMimco',align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                
                                                if(record['ExcNocheMimco']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ExcNocheMimco']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                               
                                                return total;
                                            },
                                }]},
                        {text: 'TERCERO', columngroup: 'OrderDetails2', datafield: 'ExcNocheTercero', align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                
                                                 if(record['ExcNocheTercero']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ExcNocheTercero']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                        {text: 'TOTAL', columngroup: 'OrderDetails2', datafield: 'ExcNocheTotal', align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                 if(record['ExcNocheTotal']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ExcNocheTotal']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                        {text: 'TOTAL',cellsalign: 'left', align: 'center', columngroup: 'ProductDetails', datafield: 'ExcTotal',  width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                 if(record['ExcTotal']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ExcTotal']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                        {text: 'MIMCO', columngroup: 'OrderDetails3', datafield: 'ConsumoDMimco',align: 'center', width:'10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                 if(record['ConsumoDMimco']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ConsumoDMimco']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                        {text: 'TERCERO', columngroup: 'OrderDetails3', datafield: 'ConsumoDTercero', align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                               if(record['ConsumoDTercero']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ConsumoDTercero']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                        {text: 'TOTAL', columngroup: 'OrderDetails3', datafield: 'ConsumoDTotal', align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                if(record['ConsumoDTotal']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ConsumoDTotal']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},    
                        {text: 'MIMCO', columngroup: 'OrderDetails4', datafield: 'ConsumoNMimco',align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                if(record['ConsumoNMimco']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ConsumoNMimco']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                        {text: 'TERCERO', columngroup: 'OrderDetails4', datafield: 'ConsumoNTercero', align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                if(record['ConsumoNTercero']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ConsumoNTercero']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                        {text: 'TOTAL', columngroup: 'OrderDetails4', datafield: 'ConsumoNTotal', align: 'center', width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                if(record['ConsumoNTotal']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ConsumoNTotal']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                        
                        {text: 'TOTAL',cellsalign: 'left', align: 'center', columngroup: 'ProductDetails2', datafield: 'ConsumoTotal',  width: '10%',aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record) {

                                                var total = 0;
                                                if(record['ConsumoTotal']===null){
                                                     total = parseFloat(0) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }else{
                                                     total = parseFloat(record['ConsumoTotal']) + parseFloat(aggregatedValue);
                                                     total = parseFloat(total).toFixed(3);
                                                }
                                                return total;
                                            },
                                }]},
                       
                    ],
                    columngroups:
                            [
                                {text: 'RECUBRIMIENTO PESO EXCESO', align: 'center', name: 'ProductDetails'},
                                {text: 'DIA', parentgroup: 'ProductDetails', align: 'center', name: 'OrderDetails'},
                                {text: 'NOCHE', parentgroup: 'ProductDetails', align: 'center', name: 'OrderDetails2'},
                                
                                 {text: 'CONSUMO DE ZINC', align: 'center', name: 'ProductDetails2'},
                                {text: 'DIA CONSUMO', parentgroup: 'ProductDetails2', align: 'center', name: 'OrderDetails3'},
                                {text: 'NOCHE CONSUMO', parentgroup: 'ProductDetails2', align: 'center', name: 'OrderDetails4'}
                                
                            ]
                });
                $("#grid_repo_insp_galv").jqxGrid('localizestrings', localizationobj);
            }



        }
    });
}
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

$("#export_repo_insp_galv").click(function(){
     JSONToCSVConvertor(dato_exportar, "Reporte_insp", true);
})