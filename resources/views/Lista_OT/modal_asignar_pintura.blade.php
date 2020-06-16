<div class="modal fade bd-example-modal-md" id="modal-asignar-pintura" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Asignar Pintura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn_cerr">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="row">
                    <div class="col-md-8" id='caja_text'>
                        <div class="form-group ">
                            <label for="inputEmail3">Codigo Pintura</label>
                            <input type="text" class="form-control" id="codigo_pintura" placeholder="Codigo Pintura" require >
                        </div>
                    </div>
                    <div class="col-md-4 col-4 hidde_grid" id="series">
                        <div>
                            <label for="inputPassword3" style="color : white">Cantidad</label>
                            <button type="button" class="btn btn-success btn-sm" id="especificar"><i class="far fa-question-circle"></i>Especificar</button>
                        </div>
                    </div>
                </div>
                <div class="row hidde_grid" id='grilla_seriales'>
                    <div id='jqxWidget'>
                        <div id="grid_serial"></div>
                        <div style="margin-top: 30px;">
                            <div id="cellbegineditevent"></div>
                            <div style="margin-top: 10px;" id="evento"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="registrar_pintura"><i class="far fa-save"></i> Registrar</button>
                <button type="button" class="btn btn-danger"   id="btn_cerr_pintura"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>