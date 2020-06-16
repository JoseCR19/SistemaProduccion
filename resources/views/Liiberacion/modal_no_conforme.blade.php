<div class="modal fade bd-example-modal-md" id="modal-no-conforme" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">No Conforme</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn_cerr">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="row">
                    <div class="col-md-6" >
                        <label for="inputPassword3">Defecto</label>
                        <div style='float: left;' id='defecto'>
                        </div>
                    </div>
                    <div class="col-md-6">
                       <label for="inputPassword3">Causa</label>
                        <div style='float: left;' id='causa'>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group ">
                            <label for="inputEmail3">Observación</label>
                            <input type="text" class="form-control" id="observacion_no_conforme" placeholder="Observación" require >
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="registrar_no_conforme_1"><i class="far fa-save"></i> Registrar</button>
                <button type="button" class="btn btn-danger"   id="cerrar_no_conforme"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>