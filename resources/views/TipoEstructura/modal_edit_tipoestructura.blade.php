<div class="modal fade bd-example-modal-lg" id="modal-edit-tipoestructura" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Tipo Estructura</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group row" style="display:none">
                    <label for="inputEmail3" class="col-sm-2 control-label">ID</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="id" placeholder="codigo" require disabled=true>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 control-label">CÓDIGO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="codigo" onkeyup="javascript:this.value = this.value.toUpperCase();" placeholder="CODIGO" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">DESCRIPCIÓN</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="descripcion6" onkeyup="javascript:this.value = this.value.toUpperCase();" placeholder="DESCRIPCION" require>
                    </div>
                </div>                        
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">ESTADO</label>
                    <div class="col-sm-10">
                        <div id='estado6'>
                        </div>
                    </div>
                </div>                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="actualizar1"><i class="far fa-save"></i> Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>Cerrar</button>
            </div>
        </div>
    </div>
</div>