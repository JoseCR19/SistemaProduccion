<div class="modal fade bd-example-modal-lg" id="modal-agregar-asignar-etapa-proyecto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Etapa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close_modalasignar2">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="row mt-3">
                    <div class="" style="display:none">
                        <div class="form-group">
                            <label for="exampleInputEmail1">CODIGO OT</label>
                            <input type="text" class="form-control form-control-sm" id="CODIGOOT2" placeholder="CODIGOOT" require disabled=true>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1">OT</label>
                            <input type="text" class="form-control form-control-sm" id="OT2" placeholder="OT" require disabled=true>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1">TIPO ELEMENTO</label>
                            <select name="producto" id="producto2" class="form-control form-control-sm" disabled="">
                                <option value="" disabled="" selected="" class="form-control form-control-sm">Seleccione</option>
                            </select>
                        </div>
                        </select>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid3"></div>
                    <div style="margin-top: 30px;">
                        <div id="cellbegineditevent"></div>
                        <div style="margin-top: 10px;" id="evento"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="float-right mr-3" id="cerrar_modal_2" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-danger btn-sm"><i class="far fa-times-circle"></i>
                                Cerrar</button>
                        </div>
                        <div class="float-right mr-3" id="registrar_asignaciones" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-primary btn-sm"><i class="far fa-save"></i>
                                Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>