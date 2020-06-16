<div class="modal fade" id="modal-editar-tarifa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tipo_control">Editar Tarifa</h5>              
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Etapa</label>
                            <div style="float:left;" id='etapa_editar' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Descripciòn</label>
                            <input type="text" class="form-control form-control-sm" id="descripcioin_tarifa_editar">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Cod.Valorizacion</label>
                            <input type="text" class="form-control form-control-sm" id="cod_valorizacion_tarifa_editar">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Tarifa</label>
                            <input type="number" class="form-control form-control-sm" id="tarifa_editar">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary ml-6" id="save_tarifa_editar"><i class="fas fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btn_cerrar_cont_met"><i class="fas fa-times-circle"></i>cerrar</button>
            </div>
        </div>
    </div>
</div>