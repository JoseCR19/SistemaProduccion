<?php
ini_set('memory_limit', '1024M');
set_time_limit(0);
?>
<!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <meta charset="utf-8">
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
            page-break-before: always;
        }
        img.print-logo {border: 0;}
        tfoot { display:table-footer-group;font-size: 10px ; } 
        table { page-break-inside:auto; }
        tr    { page-break-inside:avoid; page-break-after:auto; }
        thead { display:table-header-group;   } 
    </style>
    <body>
        <?php
        for ($j = 0; count($cabecera) > $j; $j++) {
            $paginacion = 0;
            ?>
            <div class="page-break" >
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
                                    <span style="color: black !important;font-weight: bold;font-size: 12px;font-family: serif;align-content: flex-start">Usuario :<?php echo $user ?></span> 
                                </div>
                                <div>
                                    <span style="color: black !important;font-weight: bold;font-size: 12px;font-family: serif;align-content:flex-start ">Fecha y hora : <?php echo $fecha_hora ?></span> 
                                </div>
                            </th>
                        </tr>    
                    </table>
                </header> 
                <div  style="margin-bottom: 5px; border-top: 1px solid #7D7D7D !important ;">    
                    <center>
                        <span  style="font-size: 12px !important; color: black !important;font-weight: bold;">VALORIZACIÓN POR CONTRATISTA POR ETAPA Y CODIGO </span> 
                        <span class="direccion" style="font-size: 13px !important;color: black"></span>
                    </center>
                    <center>
                        <span  style="font-size:12px !important; color: black !important;font-weight: bold;">SEMANA INICIO: <?php echo $semana_inicio ?> - SEMANA FIN: <?php echo $semana_fin ?></span> 
                        <span class="direccion" style="font-size: 13px !important;color: black"></span>
                    </center>
                </div>
                <table width="100%"> 
                    <tr  align="center" valign="middle" >
                        <th align="left" width="100%">
                            <div >
                                <span style="color: black !important;font-weight: bold;font-size: 12px;font-family: serif;align-content: flex-start">RUC :<?php echo $cabecera[$j]['ruc'] ?></span> 
                            </div>
                            <div>
                                <span style="color: black !important;font-weight: bold;font-size: 12px;font-family: serif;align-content:flex-start ">RAZON SOCIAL :<?php echo $cabecera[$j]['contratista'] ?></span> 
                            </div>
                        </th>
                    </tr>
                </table>
                <main> 
                    <div id="main-container"> 
                        <table class="principal" width="100%" cellspacing="7" cellpadding="7"> 
                            <thead class="principal" > 
                            <th class="principal">Etapa</th>
                            <th class="principal" >Proyecto</th>
                            <th class="principal" >Codigo</th>
                            <th class="principal" >Nombre</th>
                            <th class="principal" >Zona</th>
                            <th class="principal" >Programa</th>
                            <th class="principal" >Grupo</th>
                            <th class="principal" >Cantidad</th>
                            <th class="principal" >Peso Neto Unit</th>
                            <th class="principal" >Area Unit</th>
                            <th class="principal" >Precio Unit</th>
                            <th class="principal" >Peso Neto Total</th>
                            <th class="principal" >Area Total</th>
                            <th class="principal" >Importe Total</th>
                            </thead>
                            <tbody>
                                <?php
                                $importe_total_T = 0;
                                $peso_unitario_neto_T = 0;
                                $area_unitaria_T = 0;
                                $precio_unitaria_T = 0;
                                $peso_neto_total_T = 0;
                                $area_total_T = 0;
                                $peso_total_T = 0;
                                $area_total_T = 0;
                                $cantidad_T = 0;
                                ?>
                                <?php
                                for ($e = 0; count($etapa) > $e; $e++) {
                                    $importe_total = 0;
                                    $peso_unitario_neto = 0;
                                    $area_unitaria = 0;
                                    $precio_unitaria = 0;
                                    $peso_neto_total = 0;
                                    $area_total = 0;
                                    $peso_total = 0;
                                    $area_total = 0;
                                    $cantidad = 0;
                                    ?>
                                    <?php
                                    for ($d = 0; count($detalle) > $d; $d++) {
                                        ?>
                                        <?php if ($detalle[$d]['etapa'] == $etapa[$e]['etapa'] && $cabecera[$j]['ruc'] == $detalle[$d]['ruc']) {
                                            ?>
                                            <tr>
                                                <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $detalle[$d]['etapa'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $detalle[$d]['proyecto'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $detalle[$d]['codigo'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $detalle[$d]['nombre'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $detalle[$d]['Zona'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $detalle[$d]['Tarea'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $detalle[$d]['Paquete'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: right;"><?php echo $detalle[$d]['Canti'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: right;"><?php echo $detalle[$d]['pesonetounit'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: right;"><?php echo $detalle[$d]['areaunit'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: right;"><?php echo $detalle[$d]['preciounit'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: right;"><?php echo $detalle[$d]['pesonetotal'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: right;"><?php echo $detalle[$d]['areatotal'] ?></td>
                                                <td colspan="1" style="font-size: 11px;text-align: right;"><?php echo $detalle[$d]['importetotal'] ?></td>
                                            </tr>
                                            <?php
                                            $importe_total += $detalle[$d]['importetotal'];
                                            $peso_total += $detalle[$d]['pesonetotal'];
                                            $area_total += $detalle[$d]['areatotal'];
                                            $cantidad += $detalle[$d]['Canti'];
                                            $peso_unitario_neto += $detalle[$d]['pesonetounit'];
                                            $area_unitaria += $detalle[$d]['areaunit'];
                                            $precio_unitaria += $detalle[$d]['preciounit'];
                                            $peso_neto_total += $detalle[$d]['pesonetotal'];

                                            $importe_total_T += $detalle[$d]['importetotal'];
                                            $peso_total += $detalle[$d]['pesonetotal'];
                                            $area_total_T += $detalle[$d]['areatotal'];
                                            $cantidad_T += $detalle[$d]['Canti'];
                                            $peso_unitario_neto_T += $detalle[$d]['pesonetounit'];
                                            $area_unitaria_T += $detalle[$d]['areaunit'];
                                            $precio_unitaria_T += $detalle[$d]['preciounit'];
                                            $peso_neto_total_T += $detalle[$d]['pesonetotal'];
                                            $area_total_T += $detalle[$d]['areatotal'];
                                            ?>
                                        <?php } ?>
                                    <?php } ?>

                                    <?php if ($cantidad > 0) { ?>
                                        <tr style = "background-color: #FFE699;font-weight: bold">
                                            <td colspan = "6" ></td>
                                            <td colspan = "1" style = "text-align: center;font-size: 12px">
                                                SUBTOTAL
                                            </td>
                                            <td colspan = "1" style = "text-align: right;font-size: 11px">
                                                <?php echo $cantidad ?>
                                            </td>
                                            <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                                <?php echo $peso_unitario_neto ?>
                                            </td>
                                            <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                                <?php echo $area_unitaria ?>
                                            </td>
                                            <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                                <?php echo $precio_unitaria ?>
                                            </td>
                                            <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                                <?php echo $peso_neto_total ?>
                                            </td>
                                            <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                                <?php echo $area_total ?>
                                            </td>
                                            <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                                <?php echo $importe_total ?>
                                            </td>
                                        </tr>
                                    <?php } ?>
                                <?php } ?>
                                <tr style = "background-color: #9BC2E6;font-weight: bold">
                                    <td colspan = "6" ></td>
                                    <td colspan = "1" style = "text-align: center;font-size: 12px">
                                        TOTAL
                                    </td>
                                    <td colspan = "1" style = "text-align: right;font-size: 11px">
                                        <?php echo $cantidad_T ?>
                                    </td>
                                    <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                        <?php echo $peso_unitario_neto_T ?>
                                    </td>
                                    <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                        <?php echo $area_unitaria_T ?>
                                    </td>
                                    <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                        <?php echo $precio_unitaria_T ?>
                                    </td>
                                    <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                        <?php echo $peso_neto_total_T ?>
                                    </td>
                                    <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                        <?php echo $area_total_T ?>
                                    </td>
                                    <td colspan = "1" style = "text-align: right;font-size: 11px;">
                                        <?php echo $importe_total_T ?>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot style="border-top: 1px solid #7D7D7D !important ;">

                            <td colspan = "14" ><?php echo $cabecera[$j]['contratista'] ?></td>

                            </tfoot> 
                        </table>
                    </div>
                </main>
            </div>
            <div style="width: 100%;margin-top: 50px">
                <div style="float: left;width: 20%;margin-right: 5%;margin-left: 10%">
                    <center>
                        <hr>
                        <p>
                            <span style="font-size: 14px;font-weight: bold;color: black">
                                JUAN DE DIOS CHAVEZ MORALES
                            </span>
                        </p>
                        <span style="font-size: 12px;font-weight: bold;color: black">
                            Jefe de Proyectos
                        </span>
                    </center>
                </div>
                <div style="float: left;width: 20%;margin-left: 5%;margin-right: 5%">
                    <center>
                        <hr>
                        <p>
                            <span style="font-size: 14px;font-weight: bold;color: black">
                                EMILIO MELILLO
                            </span> 
                        </p>

                        <span style="font-size: 12px;font-weight: bold;color: black">
                            Gerente de Proyectos
                        </span>
                    </center>
                </div>
                <div style="float: left;width: 20%;margin-left: 5%;margin-right: 10%">
                    <center>
                        <hr>
                        <p>
                            <span style="font-size: 14px;font-weight: bold;color: black">
                                MAX MORENO RYSENBELGUE
                            </span>
                        </p>

                        <span style="font-size: 12px;font-weight: bold;color: black">
                            Jefe de Costos
                        </span>
                    </center>
                </div>
            </div>
        <?php }
        ?>
    </body>
</html>