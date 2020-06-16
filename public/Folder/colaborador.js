var data = [];
var dataAdapter = "";
var id_agru_onch = "";
var id_agru_labl = "";
var id_cont_onch = "";
var id_cont_labl = "";
var reporte = "";
//var mant_cont_agru_data = new Array();

$('#guar_super').click(function () {

    data_info = jQuery('#grid_super_agru').jqxGrid('getdatainformation');
    data_rows = data_info.rowscount;
    if (data_rows == 0) {
        mensaje(false, "Detalle Supervisor se encuentra vacio", "no");
    } else {
        registrar_colaborador();
    }
});
$("#excel").click(function () {
    if (reporte === "1") {
        var data = $("#grid_super").jqxGrid('exportdata', 'json');
        JSONToCSVConvertor(data, "Lista Contratistas", true);
    }else{
        mensaje(false,"No hay data para exportar");
    }

});
$('#busc_super').click(function () {
    reporte = "1";
    let agru_supe = $('#agrupador_supe').val();

    if (agru_supe == null) {


        mensaje(false, "Obligatorio seleccionar un agrupador", "no");
    } else {

        list_supe(agru_supe);
    }
});

jQuery('#grid_super_agru').on('rowdoubleclick', function (event)
{
    var args = event.args;
    var row = args.rowindex;
    var dataRecord = jQuery("#grid_super_agru").jqxGrid('getrowdata', row);
    var indexRecord = jQuery("#grid_super_agru").jqxGrid('getrowid', row);
    //   jQuery("#proc_cali_insp_txt_codi_prod_rech").val(dataRecord.codi_prod);
    //   jQuery("#proc_cali_insp_txt_nomb_prod_rech").val(dataRecord.nomb_prod);
    if (jQuery('#grid_super_agru').jqxGrid('getrows').length > 0) {
        jQuery("#grid_super_agru").jqxGrid('deleterow', indexRecord);
    }
});



$("#sele_agru_agre").on('change', function (event) {
    id_agru_onch = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            id_agru_onch = item.value;
            id_agru_labl = item.label;
        }
    }
});

$("#sele_agru_super").on('select', function (event) {
    id_cont_onch = "";

    if (event.args) {
        var item = event.args.item;
        if (item) {
            id_cont_onch = item.value;
            id_cont_labl = item.label;

        }
    }

});


$('#agre_super_agru').click(function () {

    let agru_cont = $('#sele_agru_super').val();
    let agru = $('#sele_agru_agre').val();
//sele_agru_agre


    if (agru_cont == null) {

        mensaje(false, "Obligatorio seleccionar un contratista", "no");
    } else {

        agre_grid_cont(id_cont_onch, id_cont_labl, id_agru_onch, id_agru_labl);
    }

});



function agre_grid_cont(id_cont_onch, id_cont_labl, id_agru_onch, id_agru_labl) {

    var mant_agre_grid = 0;


    var id_cont_valu = id_cont_onch;
    var id_cont_text = id_cont_labl;
    var id_agru_valu = id_agru_onch;
    var id_agru_text = id_agru_labl;


    if (jQuery('#grid_super_agru').jqxGrid('getrows').length > 0) {
        deta_json = jQuery("#grid_super_agru").jqxGrid('exportdata', 'json');
        jQuery.each(jQuery.parseJSON(deta_json), function (idx, obj) {

            if (obj.Id === jQuery.trim(id_cont_valu)) {
                mant_agre_grid = 1;
            }
        });
    }

    if (mant_agre_grid == 0) {
        if (id_cont_valu == '' && id_cont_text == '' && id_agru_valu != '' && id_agru_text != '') {
            mensaje(false, "Error Supervisor es obligatorio antes de agregar.", "no");

        } else {

            var cont_deta_data = {};
            cont_deta_data["intIdAgru"] = id_agru_valu;
            cont_deta_data["varDescAgru"] = id_agru_text;
            cont_deta_data["intIdColaborador"] = id_cont_valu;
            cont_deta_data["varNombColabo"] = id_cont_text;

            jQuery("#grid_super_agru").jqxGrid('addrow', null, cont_deta_data);

            $('#sele_agru_super').val(jQuery("#sele_agru_super option:first").val());


        }
    } else {
        mensaje(false, "Contratista ya se encuentra agregado", "no");
    }
}

$('#btn_cerr_super_crea').click(function () {
    limp_form_cont();


});
function limp_form_cont() {

    jQuery('#grid_super_agru').jqxGrid('clearselection');
    $('#sele_agru_super').val(jQuery("#sele_agru_super option:first").val());
}

$('#sele_agru_super').click(function () {
    let agru_super = $('#agrupador_supe').val();

    if (agru_super == null) {


        mensaje(false, "Obligatorio seleccionar un agrupador", "no");
    } else {


        $('#sele_agru_super').val(agru_super);
        $('#modal-create-colaborador').modal('show');
    }

});

function list_supe(agru_supe) {
    var listar_supe = agru_supe;

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_cola_segun_id_agru',
        dataType: 'json',
        data: {
            intIdAgru: listar_supe

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                list_supe();
            }
        },
        success: function (listacliente) {
            if (listacliente.data.length > 0) {
                var source = {
                    localdata: listacliente.data,
                    datatype: "array",
                    datafields: [
                        {name: 'intIdColaborador', type: 'number'},
                        {name: 'varNumeIden', type: 'string'},
                        {name: 'varNombColabo', type: 'string'},
                        {name: 'acti_usua', type: 'string'},
                        {name: 'acti_hora', type: 'date'},
                    ], updaterow: function (rowid, rowdata, commit) {
                        commit(true);
                    }
                };

                dataAdapter = new $.jqx.dataAdapter(source);
                var editrow = -1;
                $("#grid_super").jqxGrid({
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
                        {text: 'N°', datafield: 'intIdColaborador', width: 60, aggregates: [{
                                    '<b>#</b>':
                                            function (aggregatedValue, currentValue, column, record)
                                            {
                                                var count = $("#grid_super").jqxGrid('getrows');
                                                return count.length;

                                            }
                                }]},

                        {text: 'Numero Identificacion', datafield: 'varNumeIden', width: 110},
                        {text: 'Nombre completo', datafield: 'varNombColabo', width: 500},

                        {text: 'Creado por', datafield: 'acti_usua', columntype: 'datetimeinput', filtertype: 'string', cellsalign: 'right', cellsformat: 'dd/MM/yyyy HH:mm:ss'},
                        {text: 'Fecha creada', datafield: 'acti_hora', cellsalign: 'right', filtertype: 'date', cellsformat: 'dd/MM/yyyy HH:mm:ss'},
                    ]
                });
                $("#grid_super").jqxGrid('localizestrings', localizationobj);
            } else {
                mensaje(false,"No hay datos para mostrar","no");
                $("#grid_super").jqxGrid('clear');
                reporte = "0";
            }
        }
    });
}
function listar_supervisor_modal(agru_supe) {
    var listar_supe = agru_supe;
    $('#grid_super_agru').jqxGrid('clear');
    $('#grid_super_agru').jqxGrid('clearselection');
    $('#grid_super_agru').jqxGrid('showloadelement');
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/list_cola_segun_id_agru',
        dataType: 'json',
        data: {
            intIdAgru: listar_supe

        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                list_supe();
            }
        },
        success: function (listacliente) {

            var source = {
                localdata: listacliente.data,
                datatype: "array",
                datafields:
                        [
                            {name: 'intIdAgru', type: 'string'},
                            {name: 'varDescAgru', type: 'string'},
                            {name: 'intIdColaborador', type: 'string'},
                            {name: 'varNombColabo', type: 'string'}

                        ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };

            dataAdapter = new $.jqx.dataAdapter(source);
            var editrow = -1;
            $("#grid_super_agru").jqxGrid({
                width: "100%",
                height: "300px",
                theme: 'darkblue',
                source: dataAdapter,
                columnsresize: true,
                sortable: true,
                filterable: true,
                altrows: true,
                showemptyrow: false,

                columns: [
                    {text: 'IdAgrupador', dataField: 'intIdAgru', width: 100},
                    {text: 'Agrupador', dataField: 'varDescAgru', width: 200},
                    {text: 'Id', dataField: 'intIdColaborador', width: 40},
                    {text: 'Nombre', dataField: 'varNombColabo'}


                ]
            });
            $("#grid_super_agru").jqxGrid('localizestrings', localizationobj);
        }
    });
}
$('#crea_cont_super').click(function () {
    let agru_supe = $('#agrupador_supe').val();
    $("#sele_agru_super").jqxComboBox('clearSelection');
    if (agru_supe == null) {


        mensaje(false, "Obligatorio seleccionar un agrupador", "no");
    } else {

        listar_supervisor_modal(agru_supe);
        $('#sele_agru_agre').val(agru_supe);
        $('#modal-create-colaborador').modal('show');
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


function listar_agrupadores() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_agru',
        dataType: 'json',

        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                listar_agrupadores();
            }
        },
        success: function (responses) {

            va = '<option value="" disabled="" selected="">Supervisor</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdAgru + '">' + responses.data[c]
                        .varDescAgru + '</option>';
                $("#agrupador_supe").html(va);
            }
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varDescAgru'},
                            {name: 'intIdAgru'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#sele_agru_agre").jqxComboBox({
                source: dataAdapter,
                width: '200px',
                height: '30px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varDescAgru",
                valueMember: "intIdAgru",
                disabled: true
            });

            $("#sele_agru_agre").jqxComboBox('focus');

        }
    });


}

function list_cola_agrup() {

    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_cola',
        dataType: 'json',

        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                list_cola_agrup();
            }
        },
        success: function (responses) {


            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varNombColabo'},
                            {name: 'intIdColaborador'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#sele_agru_super").jqxComboBox({
                source: dataAdapter,
                width: '350px',
                height: '30px',
                selectionMode: 'dropDownList',
                placeHolder: "Seleccione",
                displayMember: "varNombColabo",
                valueMember: "intIdColaborador"
            });
            $("#sele_agru_super").jqxComboBox('focus');
        }
    });
}

function registrar_colaborador() {

    let user = obtener_user();

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/asig_cola_aun_agru_jquery',
        dataType: 'json',
        data: {
            intIdAgru: id_agru_onch,
            acti_usua: user,
            intIdColaborador: jQuery("#grid_super_agru").jqxGrid('exportdata', 'json')
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                //   registrar_contratista();
            }
        },

        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;

            if (mensaje_alert != "") {
                mensaje(true, mensaje_alert, "modal-create-colaborador");

                limp_form_cont();
                list_supe(id_agru_onch);
            } else {
                mensaje(false, mensaje_alert, "no");

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
            row += '' + arrData[i][index] + ',';
        }

        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {

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