<div class="modal fade" id="modal-contrato-edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tipo_control">Editar Contrato</h5>              
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                            <div style="float:left;" id='txt_ot_edit' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Tipo Producto</label>
                             <!--<input type="text" class="form-control form-control-sm" id="iddetagalv_cont_metro" disabled="true" style="display:none">-->
                            <div style="float:left;" id='producto_edit' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Contratista</label>
                            <div style="float:left;" id='txt_contratista_edit' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-1">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Contrato</label>
                            <input type="text" class="form-control form-control-sm" id="nro_contrto_edit">
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Fecha Inicio</label>
                            <input type="date" class="form-control form-control-sm" id="fech_cont_inicio_edit" >
                        </div>
                    </div>
                    <div class="col-6 col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Fecha Fin</label>
                            <input type="date" class="form-control form-control-sm" id="fech_cont_fin_edit" >
                        </div>
                    </div>
                    <div class="col-6 col-md-1">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">N.O.Servicio</label>
                            <input type="text" class="form-control form-control-sm" id="ordern_servicio_edit">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6 col-sm-3">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Descripciòn</label>
                            <input type="text" class="form-control form-control-sm" id="descripcion_contrato_edit">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Importe Total</label>
                            <input type="number" class="form-control form-control-sm"   id="importe_total_edit" onkeyup="importe_saldo_editar()"  onKeyPress="return soloNumerospunto(event)">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Importe Valorizado</label>
                            <input type="number" class="form-control form-control-sm"   id="importe_valorizado_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Saldo</label>
                            <input type="number" class="form-control form-control-sm" id="saldo_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Unidad Valorizado</label>
                            <div style="float:left;" id='unidad_valorizar_edit' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Peso Total</label>
                            <input type="number" class="form-control form-control-sm" id="peso_total_edit" onkeyup="importe_valorizado_editar_peso()"  onKeyPress="return soloNumerospunto(event)">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Peso Valorizado</label>
                            <input type="number" class="form-control form-control-sm" id="peso_valorizado_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Saldo Peso</label>
                            <input type="number" class="form-control form-control-sm" id="peso_saldo_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Area Total</label>
                            <input type="number" class="form-control form-control-sm" id="area_total_edit" onkeyup="importe_valorizado_editar_area()"  onKeyPress="return soloNumerospunto(event)">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Area Valorizado</label>
                            <input type="number" class="form-control form-control-sm" id="area_valorizado_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-sm-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Saldo Area</label>
                            <input type="number" class="form-control form-control-sm" id="saldo_area_edit" disabled="true">
                        </div>
                    </div>
                   
                </div>
                 <div class="row">
                        <div class="col-lg-10">
                            <div class="form-group">
                                <label for="inputPassword3" style="font-weight:500 !important">Observaciones</label>

                                <textarea  type="text" class="form-control form-control-sm" id="observaciones_edit"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <button class="btn btn-danger btn-sm" id="editar_cantidades" style="color: #001255;background-color: white;margin-top: 30px" >
                                 <i class="fas fa-plus"></i> Nueva Tarifa
                            </button>
                        </div>
                    </div>
                <div class="row">
                    <div class="col-md-6">
                        <div id='jqxWidget' style="margin-top: 10px">
                            <div id="grid_valorizaciones"></div>
                            <div style="margin-top: 30px;">
                                <div id="cellbegineditevent"></div>
                                <div style="margin-top: 10px;" id="cellendeditevent"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id='jqxWidget' style="margin-top: 10px">
                            <div id="grid_tarifas"></div>
                            <div style="margin-top: 30px;">
                                <div id="cellbegineditevent"></div>
                                <div style="margin-top: 10px;" id="cellendeditevent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-6" id="edit_contrato"><i class="fas fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btn_cerrar_cont_met"><i class="fas fa-times-circle"></i>cerrar</button>
            </div>
        </div>
    </div>
</div>