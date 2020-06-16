<div class="modal fade bd-example-modal-lg" id="modal-create-tipo-etapa" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrar Tipo Etapa</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close_modal_2">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group row" style="display:none">
                    <label for="inputEmail3" class="col-sm-2 control-label">id</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="id2" placeholder="codigo" require disabled=true>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 control-label">CÓDIGO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="codigo2" placeholder="CODIGO" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">DESCRIPCION</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="descripcion2" placeholder="DESCRIPCION" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">AGRUPADOR</label>
                    <div class="col-sm-10">
                        <select name="subtipo" id="agrupador2" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">ESTADO</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="estado2">
                            <option value="ACT">ACTIVO</option>
                            <option value="INA">INACTIVO</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="agregar"><i
                        class="fas fa-save"></i> Registrar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="close_modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>
