<div class="modal fade bd-example-modal-lg" id="modal-create-especificacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrar Tipo Especificación</h5>
                <button type="button" id="cerrar_modal_infe" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group row" style="display:none">
                    <label for="inputEmail3" class="col-sm-2 control-label">id</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="id2" placeholder="codigo">
                    </div>
                </div>               
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">Especificación</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="idespecif" onkeyup="multiplica()" placeholder="0" value="" onKeyPress="return soloNumeros(event)" >
                    </div>
                </div>                
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">Factor</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="factor" onkeyup="multiplica()" placeholder="0" value="" onKeyPress="return soloNumerospunto(event)">
                    </div>
                </div>                
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">Tipo Material</label>
                    <div class="col-sm-10">
                        <div id='tipomaterial'>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">Especificación Maxima</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="maxima" onkeyup="multiplica()" placeholder="0" readonly="readonly">
                    </div>
                </div>  
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="agregar">
                    <i class="far fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="cerrar_modal_registrar">
                    <i class="far fa-times-circle"></i>Cerrar</button>
            </div>
        </div>
    </div>
</div>