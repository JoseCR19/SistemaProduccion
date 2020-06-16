<div class="modal fade" id="modal-contrato-nuevo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tipo_control">Nuevo Contrato</h5>              
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                            <div style="float:left;" id='txt_ot_nuevo' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Tipo Producto</label>
                             <!--<input type="text" class="form-control form-control-sm" id="iddetagalv_cont_metro" disabled="true" style="display:none">-->
                            <div style="float:left;" id='producto' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Contratista</label>
                            <div style="float:left;" id='txt_contratista' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-1">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Contrato</label>
                            <input type="text" class="form-control form-control-sm" id="nro_contrto">
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Fecha Inicio</label>
                            <input type="date" class="form-control form-control-sm" id="fech_cont_inicio" >
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Fecha Fin</label>
                            <input type="date" class="form-control form-control-sm" id="fech_cont_fin" >
                        </div>
                    </div>
                    <div class="col-6 col-md-1">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">N.O.Servicio</label>
                            <input type="text" class="form-control form-control-sm" id="ordern_servicio">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 col-sm-3">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Descripciòn</label>
                            <input type="text" class="form-control form-control-sm" id="descripcion_contrato">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Importe Total</label>
                            <input type="number" class="form-control form-control-sm"   id="importe_total" onkeyup="importe_saldo()"  onKeyPress="return soloNumerospunto(event)">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Importe Valorizado</label>
                            <input type="number" class="form-control form-control-sm"   id="importe_valorizado" disabled="false">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Saldo</label>
                            <input type="number" class="form-control form-control-sm" id="saldo" disabled="false">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Unidad Valorizado</label>
                            <div style="float:left;" id='unidad_valorizar' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Peso Total</label>
                            <input type="number" class="form-control form-control-sm" id="peso_total" disabled="false" onkeyup="saldo_peso()"  onKeyPress="return soloNumerospunto(event)">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Peso Valorizado</label>
                            <input type="number" class="form-control form-control-sm" id="peso_valorizado" disabled="false">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Saldo Peso</label>
                            <input type="number" class="form-control form-control-sm" id="peso_saldo" disabled="false" >
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Area Total</label>
                            <input type="number" class="form-control form-control-sm" id="area_total" disabled="false" onkeyup="saldo_area()"  onKeyPress="return soloNumerospunto(event)">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Area Valorizado</label>
                            <input type="number" class="form-control form-control-sm" id="area_valorizado" disabled="false">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Saldo Area</label>
                            <input type="number" class="form-control form-control-sm" id="saldo_area" disabled="false">
                        </div>
                    </div>
                    <div class="col-6 col-sm-10">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Observaciones</label>
                            
                            <textarea  type="text" class="form-control form-control-sm" id="observaciones"></textarea>
                        </div>
                    </div>
                </div>
                <div id='jqxWidget' style="margin-top: 10px">
                    <div id="grid_det_insp_galv"></div>
                    <div style="margin-top: 30px;">
                        <div id="cellbegineditevent"></div>
                        <div style="margin-top: 10px;" id="cellendeditevent"></div>
                    </div>
                </div>
            </div>


            <div class="modal-footer">

                <button type="button" class="btn btn-primary ml-6" id="save_contrato"><i class="fas fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btn_cerrar_cont_met"><i class="fas fa-times-circle"></i>cerrar</button>
            </div>
        </div>
    </div>
</div>