<div class="modal fade bd-example-modal-lg" id="modal-agregar-asignar-ruta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">CREAR RUTA</h5>
            </div>
            <div class="modal-body card-body">
                <div class="row mt-3">
                    <div class="col-md-3" style="display:none">
                        <div class="form-group">
                            <label for="exampleInputEmail1">CODIGO OT</label>
                            <input type="text" class="form-control form-control-sm" id="CODIGOOT2" placeholder="CODIGOOT" require disabled=true>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="exampleInputEmail1">OT</label>
                            <input type="text" class="form-control form-control-sm" id="OT2" placeholder="OT" require disabled=true>
                        </div>
                    </div>
                    <div class="col-md-3" style="display:none">
                        <div class="form-group">
                            <label for="exampleInputEmail1">CODIGO PRODUCTO</label>
                            <input type="text" class="form-control form-control-sm" id="IDPRODUCTO" placeholder="IDPRODUCTO" require disabled=true>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="exampleInputEmail1">PRODUCTO</label>
                            <input type="text" class="form-control form-control-sm" id="DESPRO" placeholder="DESPRO" require disabled=true>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1">NOMBRE</label>
                            <input type="text" class="form-control form-control-sm" id="NOMBRE" placeholder="NOMBRE RUTA" require >
                        </div>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid2"></div>
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
                            <button type="button" class="btn btn-danger"><i class="far fa-times-circle"></i>
                                Cerrar</button>
                        </div>
                        <div class="float-right mr-3" id="registrar_rutas" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-primary"><i class="far fa-save"></i>
                                GUARDAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>