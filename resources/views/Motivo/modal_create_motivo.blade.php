<div class="modal fade bd-example-modal-md" data-backdrop="static" data-keyboard="false"  id="modal-create-motivo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrar Motivo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
        
                <div class="form-group ">
                    <label for="inputPassword3">DESCRIPCION</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="descrp_motivo" placeholder="DESCRIPCION" require>
                    </div>
                </div>
               <div class="form-group ">
                    <label for="inputPassword3">TIPO MOTIVO</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="id_tipomotivocreate" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">ESTADO</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="id_estado_motivo_create" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="registrarmotivo"><i class="far fa-save"></i> Registrar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>