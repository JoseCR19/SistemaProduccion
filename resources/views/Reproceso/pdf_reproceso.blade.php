<?php
ini_set('memory_limit', '1024M');
set_time_limit(0);
?>

<!doctype html>
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    <style type="text/css"> 
        .clearfix:after 
        {
            content: "";
            display: table;
            clear: both;
            margin: 0;
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
            /*padding: 2px;/*/
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
        table th.principal{
            background-color:  #366799 ;
            border-bottom: solid 5px #366799;
            color: white;
            font-weight: bold;
            text-align: center;
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
            /*margin-bottom: 20px;*/
        }
        table {
            background-color: transparent;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
        .page-break {
            page-break-after: auto;
        }
        img.print-logo {border: 0;}
        tfoot { display:table-footer-group;font-size: 10px ; } 
        table { page-break-inside:auto; }
        tr    { page-break-inside:avoid; page-break-after:auto; }
        thead { display:table-header-group;   } 

        #company {
            float: left;
            width: 50%;
        }
        #company_right {
            float: right;
            width: 50%;

        }
    </style>
    <body>
        <header class="clearfix">  
            <table width="100%"> 
                <tr align="center" valign="middle" > 
                    <th align="left" width="70%">
                        <div class="print-logo">
                            <img src="file:///var/www/html/SistemaProduccion/public/imagenes-mimco/logo_mimco_sac.png" alt="thre" width="90px" height="90px"/>
                        </div> 
                    </th>
                    <th align="right" width="30%">
                        <div >
                            <span style="color: black !important;font-weight: bold;font-size: 12px;font-family: serif;align-content: flex-start">Usuario :<?php echo $acti_usua ?></span> 
                        </div>
                        <div>
                            <span style="color: black !important;font-weight: bold;font-size: 12px;font-family: serif;align-content:flex-start ">Fecha y hora : <?php echo $fecha_hora ?></span> 
                        </div>
                    </th>
                </tr>    
            </table>


        </header> 
        <div  style="margin-bottom: 10px !important; border-top: 1px solid #7D7D7D !important;">    
            <center>
                <span  style="font-size: 20px !important; color: black !important;font-weight: bold;">REPROCESO N° <?php echo $idreproceso ?> </span>
            </center>
        </div>
        <div style="width: 100%;height: 80px;">
            <div style="width: 50%;height: 100%;float: left">
                <div><span style="  font-size: 14px !important;  color: black !important;font-weight: 600"> PROYECTO:</span> <span style=" font-size: 13px !important; color: black"><?php echo $codigo_ot ?></span></div>
                <div><span style="  font-size: 14px !important;  color: black !important;font-weight: 600"> ETAPA ORIGEN:</span> <span style=" font-size: 13px !important; color: black"><?php echo $origen ?></span></div>
                <div><span style="  font-size: 14px !important;  color: black !important;font-weight: 600"> ETAPA DESTINO:</span> <span style="font-size: 13px !important; color: black"><?php echo $destino ?></span></div>
                <div><span style=" font-size: 14px !important;  color: black !important;font-weight: 600"> CANTIDAD:</span> <span style="font-size: 13px !important; color: black"><?php echo $cantidad ?></span></div>
            </div>
            <div style="width: 50%;height: 100%;float: left">
                <div><span style="color: black !important;font-weight: 600;font-size: 14px !important;"> TIPO ELEMENTO:</span> <span style="color: black;font-size: 13px !important;"><?php echo $codigo_producto ?></span></div>
                <div><span style="color: black !important;font-weight: 600;font-size: 14px !important;"> PESO NETO TOTAL:</span> <span style="color: black;font-size: 13px !important;"><?php echo $pesos ?></span></div>
                <div><span style="color: black !important;font-weight: 600;font-size: 14px !important;"> MOTIVO:</span> <span style="color: black;font-size: 13px !important;"><?php echo $motivo ?></span></div>
                  <div><span style="color: black !important;font-weight: 600;font-size: 14px !important;"> ESTADO:</span> <span style="color: black;font-size: 13px !important;"><?php echo $estado ?></span></div>
            </div>
        </div>
        <div style="width: 100%">
            <span style="color: black !important;font-weight: 600;font-size: 14px !important;"> OBSERVACION: </span> <span style="color: black;font-size: 13px !important;"><?php echo $observacion ?></span>
        </div>
        <div style="width: 100%;display:none ">
            <?php echo $pesonetobruto = 0 ?>
            <?php echo $areatotal = 0 ?>
        </div>
        <main> 



            <div id="main-container" style="margin-top:20px !important;"> 
                <table class="principal" width="100%"> 
                    <thead class="principal"> 
                        <tr class="principal"> 
                            <th class="principal">CODIGO</th>
                            <th class="principal" >NOMBRE</th>
                            <th class="principal" >SERIE</th>
                            <th class="principal" >MODELO</th>
                            <th class="principal" >PROGRAMA</th>
                            <th class="principal" >GRUPO</th>
                            <th class="principal" >PESO NETO</th>
                            <th class="principal" >PESO BRUTO</th>
                            <th class="principal" >PESO AREA</th>
                             <th class="principal" >ESTADO</th>
                        </tr>
                    </thead>

                    <?php for ($j = 0; count($detalle) > $j; $j++) { ?>
                        <div style="display:none">
                            <?php echo $pesonetobruto = $pesonetobruto + $detalle[$j]['deciPesoBruto'] ?>
                            <?php echo $areatotal = $areatotal + $detalle[$j]['deciArea'] ?>
                        </div>
                        <tr>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['varCodiElemento'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['varDescripcion'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['intSerie'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['varDescrip'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['varDescripTarea'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['varCodigoPaquete'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['deciPesoNeto'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['deciPesoBruto'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['deciArea'] ?></td>
                            <td colspan="1" style="font-size: 11px;text-align: center;border-bottom: 1px solid black"><?php echo $detalle[$j]['varDescEsta'] ?></td>
                        </tr>


                    <?php } ?>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>

                        <td></td>
                        <td></td>
                        <td></td>
                        <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $pesos ?></td>
                        <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $pesonetobruto ?></td>
                        <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $areatotal ?></td>
                    <tr>

                </table>



            </div>

        </main>

    </body>
</html>