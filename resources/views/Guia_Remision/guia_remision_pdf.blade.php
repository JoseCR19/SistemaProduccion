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
    <style>
        .page-break {
            page-break-before: always;
        }
        
    </style>
    <body>
        <?php for ($j = 0; count($cabecera) > $j; $j++) { ?>
            <div class="page-break">
                <div style="width: 100%;height: 200px">
                    <div style="width: 54.0%;float: left;height: 100%;">
                        <div style="width:100%;height: 93%;">

                        </div>
                        <div style="width: 100%;height: 7%;">
                            <div style="width: 49.5%;height: 100%;float: left;">
                                <div style="width: 100%;height: 100%;float: left;margin-left: 50px">
                                    <div style="width: 17%;height: 100%;float: left;line-height:50px;display: flex;justify-content: center;align-items: center;">
                                        <center>
                                            <?php echo $cabecera[$j]['Dia_emision'] ?>
                                        </center>
                                    </div>
                                    <div style="width: 20%;height: 100%;float: left;line-height:50px;vertical-align: middle;justify-content: center;display: table-cell;">
                                        <center>
                                            <?php echo $cabecera[$j]['Mes_emision'] ?>
                                        </center>
                                    </div>
                                    <div style="width: 20%;height: 100%;margin-left: 5px;float: left;line-height:50px;vertical-align: middle;justify-content: center;display: table-cell;">
                                        <center>
                                            <?php echo $cabecera[$j]['Anio_emision'] ?>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div style="width: 49.5%;height: 100%;float: left;">
                                <div style="width: 79.0%;height: 100%;float: left;margin-left: 50px;">
                                    <div style="width: 31%;height: 100%;margin-left: 5px;float: left;line-height:50px;display: flex;justify-content: center;align-items: center;">
                                        <center>
                                            <?php echo $cabecera[$j]['Dia_Traslado'] ?>
                                        </center>
                                    </div>
                                    <div style="width: 31%;height: 100%;float: left;line-height:50px;vertical-align: middle;justify-content: center;display: table-cell;">
                                        <center>
                                            <?php echo $cabecera[$j]['Mes_Traslado'] ?>
                                        </center>
                                    </div>
                                    <div style="width: 31%;height: 100%;float: left;line-height:50px;vertical-align: middle;justify-content: center;display: table-cell;">
                                        <center>
                                            <?php echo $cabecera[$j]['Anio_Traslado'] ?>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="width: 45.5%;float: left;height: 100%;">
                        <div style="width:100%;height: 100%;">
                        </div>
                        <div style="width: 100%;font-size: 14px;margin-top: 14px;margin-left: 50px">
                            <?php echo $cabecera[$j]['Serie_Codigo'] ?>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;height: 60px;margin-top: 50px">
                    <div style="width: 50%;float: left;height: 100%">
                        <div style="width: 100%;height: 12px;">
                        </div>
                        <div style="width: 100%;height: 15px;margin-bottom: 12px;font-size: 13px">
                            <?php echo $cabecera[$j]['Direccion_Salida'] ?>
                        </div>
                        <div style="width: 28%;float: left;padding-left: 70px;font-size: 13px">
                            <?php echo $cabecera[$j]['Distrito_Salida'] ?>
                        </div>
                        <div style="width: 25%;float: left;padding-left: 20px;font-size: 13px">
                            <?php echo $cabecera[$j]['Provincia_Salida'] ?>
                        </div>
                        <div style="width:25%;float: left;padding-left: 10px;font-size: 13px">
                            <?php echo $cabecera[$j]['Departamento_Salida'] ?>
                        </div>
                    </div>
                    <div style="width: 50%;float: left;height: 100%">
                        <div style="width: 100%;height: 12px;">
                        </div>
                        <div style="width: 100%;height: 15px;margin-bottom: 12px;font-size: 13px">
                            <?php echo $cabecera[$j]['Direccion_Llegada'] ?>
                        </div>
                        <div style="width: 28%;float: left;margin-left: 70px;font-size: 13px">
                            <?php echo $cabecera[$j]['Distrito_Llegada'] ?>
                        </div>
                        <div style="width: 25%;float: left;padding-left: 20px;font-size: 13px">
                            <?php echo $cabecera[$j]['Provincia_Llegada'] ?>
                        </div>
                        <div style="width: 25%;float: left;padding-left: 15px;font-size: 13px">
                            <?php echo $cabecera[$j]['Departamento_Llegada'] ?>
                        </div>
                    </div>
                </div>
                <div style="width: 100%;height: 80px;margin-top: 18px;">
                    <div style="width: 50%;height: 100%;float: left">
                        <div style="width: 100%;height: 10px;">
                        </div>
                        <div style="width: 62%;float: left;margin-left: 48%;font-size: 11px;font-weight: 100">
                            <?php echo $cabecera[$j]['Razon_Social_Cliente'] ?>
                        </div>
                        <div style="width: 60%;float: left;margin-left: 52%;font-size: 11px;font-weight: 100">
                            <?php echo $cabecera[$j]['Ruc_Cliente'] ?>
                        </div>
                    </div>
                    <div style="width: 50%;height: 100%;float: left">
                        <div style="width: 100%;height: 10px;">
                        </div>
                        <div style="width: 53%;float: left;margin-left: 49%;font-weight: 100;font-size: 13px">
                            <?php echo $cabecera[$j]['Nombre_Chofer'] ?>
                        </div>
                        <div style="width: 55%;float: left;margin-left: 45%;font-weight: 100;font-size: 13px">
                            <?php echo $cabecera[$j]['Licencia_Documento'] ?>
                        </div>
                    </div>
                </div>
                <div style="width:100%;height: 40px;margin-top: 10px">
                    <div style="width: 25%;height: 100%;float: left">
                    </div>
                    <div style="width: 25%;height: 100%;float: left">
                    </div>
                    <div style="width: 25%;height: 100%;float: left">
                        <center>
                            <?php echo $cabecera[$j]['varCodiProy'] ?>
                        </center>
                    </div>
                    <div style="width: 25%;height: 100%;float: left">
                        <center>
                            <?php echo $cabecera[$j]['Referencia'] ?>
                        </center>
                    </div>
                </div>
                <main>
                    <div style="width: 100%;height: 100%;float: right;font-size: 15px;margin-top:25px">
                        
                            <?php echo $cabecera[$j]['varTituGuia'] ?>
                        
                    </div>
                    <div style="width: 100%;height: 730px;margin-top: 40px">
                        <table style="width: 100%">
                            <?php $item = 1; ?>
                            <?php for ($g = 0; count($detalle) > $g; $g++) { ?>
                                <?php if ((int) $cabecera[$j]['intIdGuia'] === (int) $detalle[$g]['varGuia']) { ?>
                                    <tr>
                                        <td colspan="1" style="font-family: sans-serif; font-size: 15px;text-align: left;width: 50px;"><?php echo $item++ ?></td>
                                        <td colspan="1" style="font-family: sans-serif;font-size: 15px;text-align: left;width: 80px;"><?php echo $detalle[$g]['varCodiElemento'] ?></td>
                                        <td colspan="1" style="font-family: sans-serif;font-size: 15px;text-align: left;width: 40px;"><?php echo $detalle[$g]['cantidad'] ?></td>
                                        <td colspan="1" style="font-family: sans-serif;font-size: 15px;text-align: center;width: 35px;"><?php echo $detalle[$g]['varValo5'] ?> </td>
                                        <?php if ($detalle[$g]['varDescTipoGrupo'] !== "ESTRUCTURA") { ?>
                                            <td colspan="1" style="font-family: sans-serif;font-size: 15px;text-align: left;"><?php echo $detalle[$g]['varDescripcion'] . ' / ' . $detalle[$g]['varPerfil'] ?></td>
                                        <?php } else { ?>
                                            <td colspan="1" style="font-family: sans-serif;font-size: 15px;text-align: left;"><?php echo $detalle[$g]['varDescripcion'] . ' / ' . $detalle[$g]['varPerfil'] . ' / ' . $detalle[$g]['deciLong'] ?></td>
                                        <?php } ?>
                                    </tr>
                                <?php } ?>
                            <?php } ?>
                        </table>
                    </div>
                </main>
                <div style="width: 100%;height: 90px;margin-top: 25px">
                    <div style="width: 30%;height: 100%;float: left">
                        <div style="width: 100%;height: 40px;">
                        </div>
                        <div style="width: 100%;height: 30px">
                            <div style="width: 80%;margin-left: 20%;font-weight: 100;font-size: 12px">
                                <?php echo $cabecera[$j]['Razon_Social_Transportista'] ?>
                            </div>
                        </div>
                        <div style="width: 100%;height: 20px">
                            <div style="width: 80%;margin-left: 20%;font-weight: 100;font-size: 12px">
                                <?php echo $cabecera[$j]['Documento_Transportista'] ?>
                            </div>
                        </div>
                    </div>
                    <div style="width: 30%;height: 100%;float: left">
                        <div style="width: 100%;height: 80px;">
                        </div>
                        <div style="width: 100%;height: 20px;margin-top: 60px;">
                            <div style="width: 50%;margin-left: 50%;font-weight: 100;font-size: 8px">
                                
                                <?php if ($cabecera[$j]['Motivo'] === 13) { ?>
                                    <?php echo $cabecera[$j]['varMotiCome'] ?>
                                <?php } else { ?>
                                    <?php echo $cabecera[$j]['Motivo'] ?>
                                <?php } ?>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php } ?>
    </body>
</html>