

<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <!--<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        -->
    </head>
    <style type="text/css"> 
        .clearfix:after 
        {
            content: "";
            display: table;
            clear: both;
        }  
        th.cotizacion
        {
            color: white;
            border-radius: 10px;
        } 
        th.cotizacion div.proforma
        {
            border-radius: 5px;
            border: 1px inset black;
            background-color:#00709A;
            padding: 2.5px;
            margin-top: 6px;
            margin-bottom: 6px;
        }
        .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
            position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
        }
        .datos
        {
            display: table;
            height: auto;
            width: 100%;
        }
        #company {
            float: right;
            width: 50%;
        }
        #company span {
            color: #5D6975;
            text-align: left;
            width: 110px;
            margin-right: 10px;
            display: inline-block;
            font-size: 9px;
        }
        #project span {
            color: #5D6975;
            text-align: left;
            width: 60px;
            margin-right: 10px;
            display: inline-block;
            font-size: 9px;
        }
        #project span.direccion
        {
            color: #5D6975;
            text-align: left;
            width: 300px;
            margin-right: 10px;
            display: inline-block;
            font-size: 9px;
        }
        #project span.cliente
        {
            color: #5D6975;
            text-align: left;
            width: 200px;
            margin-right: 10px;
            display: inline-block;
            font-size: 9px;
        }
        #company span.cliente
        {
            color: #5D6975;
            text-align: left;
            width: 230px;
            margin-right: 10px;
            display: inline-block;
            font-size: 9px;
        }
        #project {
            float: left;
            text-align: left;
            width: 50%;
        }
        #main-container{
            margin-top: 0px;
        }
        #project div,
        #company div {   

        }
        table.principal{
            background-color: white;
            text-align: left;
            border-collapse: collapse;
            width: 100%;
        }
        th.principal{
            padding: 2px;
        }
        th.principal
        {
            font-size: 10px !important;
            font-weight: 100;
        }
        td.principal
        {
            border-bottom:  1px solid #7D7D7D;
            font-size: 11px !important;
        }
        table tfoot td {
            background: #FFFFFF;
            border-bottom: none;
            border-top: 1px solid #323639; 
            padding: 2px;
            font-size: 11px !important;
        }
        thead.principal{
            background-color: #212131;
            border-bottom: solid 5px #323639;
            color: white;
            text-align: center;
        }
        td.foot
        {
            background-color: #072F3E;
            border-bottom: solid 5px #323639;
            color: white;
            text-align: center;
        }
        footer {
            color: black;
            width: 100%;
            height: 80px !important;
            position: absolute;
            bottom: 0;
            border-top: 1px solid #C1CED9;
            padding: 2px 0;

        }
        .box {
            position: relative;
            border-radius: 3px;
            background: #ffffff;
            border-top: 3px solid #d2d6de;
            margin-bottom: 20px;
            width: 100%;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        }
        .box-header.with-border {
            border-bottom: 1px solid #f4f4f4;
        }
        .box-header {
            color: #444;
            display: block;
            padding: 20px;
            position: relative;
        }
        p {
            margin: 0 0 10px;
        }
        .box-body {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 3px;
            border-bottom-left-radius: 3px;
            padding: 10px;
        }
        .row {
            margin-right: -20px;
            margin-left: -20px;
        }
        .col-xs-6 {
            width: 50%;
        }
        .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
            float: left;
        }
        .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
            position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
        }
        .lead {
            font-size: 21px;
        }
        .lead {
            margin-bottom: 20px;
            font-size: 16px;
            font-weight: 300;
            line-height: 1.4;
        }
        .table-responsive {
            min-height: .01%;
            overflow-x: auto;
        }
        .table {
            width: 100%;
            max-width: 100%;
            margin-bottom: 20px;
        }
        table {
            background-color: transparent;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
        img.print-logo {border: 0;}
    </style>
    <body>
        <header class="clearfix" style="margin-bottom: 20px">  
            <table width="100%" > 
                <tr align="center" valign="middle" > 
                    <th align="left" width="70%">
                        <div class="print-logo">
                            <img src="file:///var/www/html/SistemaProduccion/public/imagenes-mimco/logo_mimco_sac.png" alt="thre" width="80px" height="80px"/>
                        </div> 
                    </th>
                    <th align="right" width="30%">
                        <div >
                            <span style="color: black !important;font-weight: bold;font-size: 12px;font-family: serif;align-content: flex-start">Proyecto :</span> 
                            <span style="font-size: 11px !important;font-weight: 100">{{$id_ot}}</span>
                        </div>
                        <div>
                            <span style="color: black !important;font-weight: bold;font-size: 12px;font-family: serif;align-content:flex-start ">Programa :</span> 
                            <span style="font-size: 11px !important;font-weight: 100">{{$cod_tarea}}</span>
                        </div>
                    </th>
                </tr>    
            </table>
        </header> 
        <div  style="margin-bottom: 5px; border-top: 1px solid #7D7D7D !important ;">    
            <center>
                <span  style="font-size: 12px !important; color: black !important;font-weight: bold;">LISTADOS DE COMPONENTES </span> 
                <span class="direccion" style="font-size: 13px !important;color: black"></span>
                <center>
                    <center>
                        <span  style="font-size:12px !important; color: black !important;font-weight: bold;">GRUPO </span> 
                        <span class="direccion" style="font-size: 13px !important;color: black">{{$cod_paquete}}</span>
                    </center>
                    </div>
                    <main> 
                        <div id="main-container"> 
                            <table class="principal" width="100%"> 
                                <thead class="principal"> 
                                    <tr class="principal"> 
                                        <th class="principal">Codigo</th>
                                        <th class="principal" >Rev.</th>
                                        <th class="principal" >Peso Neto.</th>
                                        <th class="principal" >Peso Bruto.</th>
                                        <th class="principal" >Area</th>
                                        <th class="principal" >Long.</th>
                                        <th class="principal" >Cantidad</th>
                                        <th class="principal" >Perfil</th>
                                        <th class="principal" >Material</th>
                                    </tr>
                                </thead>
                                @for($j=0;count($cabecera)>$j;$j++)
                                <tr style="background-color: #84CEEF">
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$cabecera[$j]['Cod_elemento']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$cabecera[$j]['intRevision']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$cabecera[$j]['PesoNetoElemento']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$cabecera[$j]['PesoBrutoElemento']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$cabecera[$j]['AreaElemento']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$cabecera[$j]['deciLong']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$cabecera[$j]['canti']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$cabecera[$j]['varPerfil']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;"></td>
                                </tr>
                                @for($i=0;count($data)>$i;$i++)
                                @if($cabecera[$j]['Cod_elemento']==$data[$i]['Cod_elemento'])
                                <tr>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['Cod_Componente']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['intRevision']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['PesoNetoCompo']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['PesoBrutoCompo']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['AreaCompo']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['Longitud']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['Cant_Componente']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['Perfil']}}</td>
                                    <td colspan="1" style="border: 1px solid black;font-size: 11px;text-align: center;">{{$data[$i]['Material']}}</td>
                                </tr>
                                @endif
                                @endfor
                                @endfor
                                <tr>
                                    <td colspan="9"  style="border: 1px solid black;font-size: 11px;text-align: center;height: 10px"></td>
                                </tr>
                                <tr>
                                    <td colspan="4"  style="border: 1px solid black;font-size: 11px;text-align: left;height: 10px">
                                        TOTAL DE ELEMENTOS: {{$cantidad_elementos}}
                                    </td>
                                    <td colspan="5"  style="border: 1px solid black;font-size: 11px;text-align: left;height: 10px">
                                        TOTAL DE COMPONENTES: {{$cantidad_componentes}}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </main>

                    </body>
                    </html>