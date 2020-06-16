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
        for ($j = 0; count($array_temporal_2) > $j; $j++) {
            ?>
            <div class="page-break">
                <?php if ($rotulo === '1') { ?>

                <?php } else { ?>
                    <header class="clearfix">  
                        <table width="100%"> 
                            <tr align="center" valign="middle" > 
                                <th align="left" width="50%">
                                    <div class="print-logo">

                                        <img src="file:///var/www/html/SistemaProduccion/public/imagenes-mimco/logo_mimco_sac.png" alt="thre" width="80px" height="80px"/>

                                    </div> 
                                </th>
                                <th align="right" width="50%">
                                    <div class="print-logo">

                                        <img src="file:///var/www/html/SistemaProduccion/public/imagenes-mimco/logo_mimco_sac.png" alt="thre" width="80px" height="80px"/>

                                    </div> 
                                </th>
                            </tr>    
                        </table>
                    </header> 
                <?php } ?>
                <div  style="margin-bottom: 5px; border-top: 2px solid #DBDBDB !important;padding-top: 20px;">    
                    <center>
                        <span  style="font-size: 30px !important; color: #0D1F40 !important;font-weight: 700;"><?php echo $array_temporal_2[$j]['varBulto'] ?></span> 
                        <span class="direccion" style="font-size: 13px !important;color: black"></span>
                    </center>
                </div>
                <?php if ($rotulo === '1') { ?>


                <?php } else { ?>
                    <center>
                        <img src="data:image/png;base64, {!! base64_encode(QrCode::format('png')->size(200)->generate('https://mimcoapps.mimco.com.pe/SistemaProduccion/generacion/pdf_qr_portatil/'.$array_temporal_2[$j]['intIdProy'].'/'.$array_temporal_2[$j]['intIdTipoProducto'].'/'.$array_temporal_2[$j]['intIdProyZona'].'/'.$array_temporal_2[$j]['intIdProyTarea'].'/'.urlencode($array_temporal_2[$j]['varModelo']).'/'.urlencode($array_temporal_2[$j]['varBulto']).'/'.$array_temporal_2[$j]['tipo'])) !!} ">
                    </center>
                    <main > 
                        <div id="main-container" > 
                            <div style="width:100%;border:1px solid red;">
                                <div style="width:20%;padding: 10px;float: left">
                                    <img src="file:///var/www/html/SistemaProduccion/public/iconos-svg/scan.svg" alt="thre" width="50px" height="30px"/>
                                </div>
                                <div style="width:80%;padding: 10px">
                                    <p style="text-align: center;font-size: 11px !important">
                                        Captura la imagen con la camara de su celular para poder visualizar los elementos que contiene el bulto.
                                    </p>
                                </div>
                            </div>
                            <div style="width:100%;margin-top: 20px !important;">
                                <div style="width:49%;padding: 10px;float: left;border-right: 1px dashed #0D1F40;border-bottom:1px dashed #0D1F40;height: 130px !important;border-top:1px dashed #0D1F40;margin-bottom: 20px !important ">
                                    <p style="font-size: 20px !important; color: #0D1F40">Descripción</p>
                                    <ul style="font-size: 15px !important">
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important ">
                                            <div style="width: 50%;float: left">
                                                PROYECTO : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['nomb_proyecto'] ?>
                                            </div>
                                        </li>
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important ">
                                            <div style="width: 50%;float: left">
                                                ELEMENTO : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['varDescTipoProd'] ?>
                                            </div>
                                        </li>
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important ">
                                            <div style="width: 50%;float: left">
                                                ZONA : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['varDescrip'] ?>
                                            </div>
                                        </li>
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important ">
                                            <div style="width: 50%;float: left">
                                                PROGRAMA : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['varDescripTarea'] ?>
                                            </div>
                                        </li>
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important">
                                            <div style="width: 50%;float: left">
                                                MODELO : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['varModelo'] ?>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div style="width:46.5%;padding: 10px;float: left;border-bottom:1px dashed #0D1F40;height: 130px !important;border-top:1px dashed #0D1F40;margin-bottom: 20px !important">
                                    <p style="font-size: 20px !important; color: #0D1F40">Totales</p>
                                    <ul style="font-size: 15px !important">
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important ">
                                            <div style="width: 50%;float: left">
                                                PESO AREA : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['deciArea'] ?>
                                            </div>
                                        </li>
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important ">
                                            <div style="width: 50%;float: left">
                                                PESO NETO : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['deciPesoNeto'] ?>
                                            </div>
                                        </li>
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important ">
                                            <div style="width: 50%;float: left">
                                                PESO BRUTO : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['deciPesoBruto'] ?>
                                            </div>
                                        </li>
                                        <li style="list-style:none;width: 100%!important;height: 20px !important;padding: 0.5px !important ">
                                            <div style="width: 50%;float: left">
                                                CANTIDAD : 
                                            </div>
                                            <div style="width: 50%;float: right">
                                                <?php echo $array_temporal_2[$j]['cantidad'] ?>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    <?php } ?>
                    <table class="principal" width="100%" >
                        <thead class="principal"> 
                            <tr class="principal"> 
                                <th class="principal">#</th>
                                <th class="principal">Codigo</th>
                                <th class="principal" >Nombre</th>
                                <?php if ($tipo === "1") { ?>
                                    <th class="principal">Cantidad</th>
                                <?php } ?>
                                <th class="principal" >Revisión</th>
                                <th class="principal" >Reproceso</th>
                                <th class="principal" >Grupo</th>
                                <th class="principal" >Peso área</th>
                                <th class="principal" >Peso neto</th>
                                <th class="principal" >Peso bruto</th>
                                <th class="principal" >Ancho</th>
                                <th class="principal" >Alto</th>
                                <th class="principal" >Longitud</th>
                            </tr>
                        </thead>
                        <?php $contador = 0 ?>
                        <?php for ($i = 0; count($array_temporal_detalle) > $i; $i++) { ?>
                            <?php
                            if ($array_temporal_detalle[$i]['varBulto'] == $array_temporal_2[$j]['varBulto']) {
                                $contador++;
                                ?>
                                <tr >
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $contador ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['varCodiElemento'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['varDescripcion'] ?></td>
                                    <?php if ($tipo === "1") { ?>
                                        <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['cantidad'] ?></td>
                                    <?php } ?>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['intRevision'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['intCantRepro'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['varCodigoPaquete'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['deciArea'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['deciPesoNeto'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['deciPesoBruto'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['deciAlto'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['deciAncho'] ?></td>
                                    <td colspan="1" style="font-size: 11px;text-align: center;"><?php echo $array_temporal_detalle[$i]['deciLong'] ?></td>
                                </tr>
                            <?php } ?>

                        <?php } ?>
                    </table>
                </main>
            </div>

        <?php } ?>
    </body>
</html>