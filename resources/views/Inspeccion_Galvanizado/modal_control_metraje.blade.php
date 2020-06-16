<div class="modal fade" id="modal-control-metraje" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tipo_control"></h5>              
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 col-md-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Responsable</label>
                            <div id="idrespo_cont_metr" class="form-control form-control-sm"></div>
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Tipo Orden</label>
                             <!--<input type="text" class="form-control form-control-sm" id="iddetagalv_cont_metro" disabled="true" style="display:none">-->
                            <input type="text" class="form-control form-control-sm" id="tipo_orde_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-md-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Turno</label>
                            <input type="text" class="form-control form-control-sm" id="turn_cont_metro" disabled="true">
                        </div>
                    </div>

                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Fecha Inicio</label>
                            <input type="date" class="form-control form-control-sm" id="fech_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-md-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Hora Inicio</label>
                            <input type="text" class="form-control form-control-sm" id="hora_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Fecha Fin</label>
                            <input type="date" class="form-control form-control-sm" id="fech_fin_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-md-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Hora Fin</label>
                            <input type="text" class="form-control form-control-sm" id="hora_fin_cont_metro" disabled="true">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Cliente</label>
                            <input type="text" class="form-control form-control-sm" id="cli_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <label for="exampleFormControlInput1" id="mostrar_ot_contr_metr">OT</label>
                        <label for="exampleFormControlInput1" id="mostrar_os_contr_metr">OS</label>
                        <div class="form-group">  
                            <input type="text" class="form-control form-control-sm" id="ot_os_cont_metr_value" disabled="true" style="display:none">
                            <input type="text" class="form-control form-control-sm" id="ot_os_cont_metr" disabled="true" >
                        </div>
                    </div>
                    <div class="col-6 col-sm-1" id="mostrar_guia">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Guìa</label>
                            <input type="text" class="form-control form-control-sm" id="guia_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Tipo Material</label>
                            <div id="tipo_mate_cont_metro">

                            </div>

                        </div>
                    </div>
                    <div class="col-6 col-sm-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Ganchera</label>
                            <input type="text" class="form-control form-control-sm" id="int_ganchera" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-1">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Cant</label>
                            <input type="number" class="form-control form-control-sm" id="canti_cont_metro_insp" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-6">
                                    <label for="exampleFormControlInput1">Cant.Insp</label>
                                    <input type="number" class="form-control form-control-sm" id="canti_cont_metro" onKeyPress="return soloNumeros(event)"  onkeyup="validar()" disabled="true">
                                </div>
                                <div class="col-6">

                                    <button class="btn btn-danger btn-sm" id="editar_cantidades" style="color: #001255;background-color: white;margin-top: 30px" >
                                        <i class="far fa-edit"></i>
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-6 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Descripciòn</label>
                            <input type="text" class="form-control form-control-sm" id="mate_cont_metro">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Peso Negro</label>
                            <input type="number" class="form-control form-control-sm" onkeyup="por_zinc()" onKeyPress="return soloNumerospunto(event)" id="peso_negr_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Peso Galvanizado</label>
                            <input type="number" class="form-control form-control-sm" onkeyup="por_zinc()" onKeyPress="return soloNumerospunto(event)" id="peso_galv_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Consumo</label>
                            <input type="text" class="form-control form-control-sm" id="consu_cont_metro" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Zinc</label>
                            <input type="text" class="form-control form-control-sm" id="zinc_cont_metro" disabled="true">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Especificaciòn</label>
                            <div id="espec_cont_metr" class="form-control form-control-sm"></div>
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Esp Max</label>
                            <input type="number" class="form-control form-control-sm" id="esp_max_cont_metr" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Promedio</label>
                            <input type="number" class="form-control form-control-sm" id="prome_cont_metr" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Peso Max Total</label>
                            <input type="number" class="form-control form-control-sm" id="esp_max_total_cont_metr" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Tolerancia</label>
                            <input type="number" class="form-control form-control-sm" id="tole_cont_metr" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Exceso</label>
                            <input type="number" class="form-control form-control-sm" id="exce_cont_metr" disabled="true">
                        </div>
                    </div>
                </div>

                <fieldset style="border: 1px solid #648be052; padding: 6px;border-radius: 3px;">
                    <legend class="col-1">LECTURA</legend>
                    <div class="row">
                        <div class="col-6 col-sm-2 ml-3">
                            <label for="exampleFormControlInput1" class="ml-5">A1</label>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="number" class="form-control form-control-sm" id="a1_1_cont_metr" placeholder="0" onKeyPress="return soloNumerospunto(event)" onkeyup="sumar_promedios()"   pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos"  disabled="true">
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control form-control-sm" id="a1_2_cont_metr" placeholder="0" onKeyPress="return soloNumerospunto(event)" onkeyup="sumar_promedios()"  pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">  
                                </div>                                                 
                            </div>
                        </div>

                        <div class="col-6 col-sm-2 ml-3">
                            <label for="exampleFormControlInput1" class="ml-5">A2</label>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="number" class="form-control form-control-sm" id="a2_1_cont_metr"  placeholder="0" onKeyPress="return soloNumerospunto(event)" onkeyup="sumar_promedios()" pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control form-control-sm" id="a2_2_cont_metr" placeholder="0"  onKeyPress="return soloNumerospunto(event)" onkeyup="sumar_promedios()" pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">  
                                </div>                                                 
                            </div>
                        </div>

                        <div class="col-6 col-sm-2 ml-3">
                            <label for="exampleFormControlInput1" class="ml-5">A3</label>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="number" class="form-control form-control-sm" id="a3_1_cont_metr" placeholder="0" onKeyPress="return soloNumerospunto(event)" onkeyup="sumar_promedios()"  pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control form-control-sm" id="a3_2_cont_metr"  placeholder="0" onKeyPress="return soloNumerospunto(event)" onkeyup="sumar_promedios()" pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">  
                                </div>                                                 
                            </div>
                        </div>

                        <div class="col-6 col-sm-2 ml-3">
                            <label for="exampleFormControlInput1" class="ml-5">A4</label>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="number" class="form-control form-control-sm" id="a4_1_cont_metr" onKeyPress="return soloNumerospunto(event)" placeholder="0" onkeyup="sumar_promedios()" pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control form-control-sm" id="a4_2_cont_metr" onKeyPress="return soloNumerospunto(event)" placeholder="0" onkeyup="sumar_promedios()" pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">  
                                </div>                                                 
                            </div>
                        </div>

                        <div class="col-6 col-sm-2 ml-3">
                            <label for="exampleFormControlInput1" class="ml-5">A5</label>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="number" class="form-control form-control-sm" id="a5_1_cont_metr" onKeyPress="return soloNumerospunto(event)" placeholder="0" onkeyup="sumar_promedios()" pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">
                                    <span class="input-group-addon">-</span>
                                    <input type="number" class="form-control form-control-sm" id="a5_2_cont_metr" onKeyPress="return soloNumerospunto(event)" placeholder="0" onkeyup="sumar_promedios()"  pattern="[0-9]+([\,|\.][0-9]+)?"  title="Numeros Positivos" disabled="true">  
                                </div>                                                 
                            </div>
                        </div>
                    </div>
                </fieldset> 
                <div id='jqxWidget' style="margin-top: 10px">
                    <div id="grid_det_insp_galv"></div>
                    <div style="margin-top: 30px;">
                        <div id="cellbegineditevent"></div>
                        <div style="margin-top: 10px;" id="cellendeditevent"></div>
                    </div>
                </div>
            </div>


            <div class="modal-footer">

                <button type="button" class="btn btn-primary ml-6" id="grab_cont_met"><i class="fas fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btn_cerrar_cont_met"><i class="fas fa-times-circle"></i>cerrar</button>
            </div>
        </div>
    </div>
</div>