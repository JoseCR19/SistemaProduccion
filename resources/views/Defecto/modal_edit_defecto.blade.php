<div class="modal fade bd-example-modal-lg" id="modal-edit-defecto" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Defecto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close_modal_2">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group row" style="display:none">
                    <label for="inputEmail3" class="col-sm-2 control-label">ID</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="updintid" placeholder="ID">
                    </div>
                </div>                
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">AGRUPADOR</label>
                    <div class="col-sm-10">
                        <div id='updagrup'>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 control-label">CODIGO</label>
                    <div class="col-sm-2" >
                        <input type="text" class="form-control" id="updcoddef" onkeyup="javascript:this.value = this.value.toUpperCase();" placeholder="CODIGO" maxlength="5">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">DESCRIPCIÓN</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="upddescdef" onkeyup="javascript:this.value = this.value.toUpperCase();" placeholder="DESCRIPCION">
                    </div>
                </div>                
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">ESTADO</label>
                    <div class="col-sm-10">
                        <div id='estdef'>
                        </div>
                    </div>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="upddefecto"><i
                        class="fas fa-save"></i> Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="close_modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>