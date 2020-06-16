
<div class="modal fade bd-example-modal-lg" id="modal_modificar_pwd" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
   
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">MODIFICAR CONTRASEÑA</h5>
            </div>
            <div class="modal-body card-body">
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 control-label" >USUARIO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="coduser" require disabled=true>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">CONTRASEÑA ACTUAL</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="claveactual" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">NUEVA CONTRASEÑA</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="clavenuevo" placeholder="" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">CONFIRMAR CONTRASEÑA</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="claveconfirmar" placeholder="" require>
                    </div>
                </div>                                           
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="rest_clav"><i class="fas fa-sync-alt"></i>Actualizar</button>
                <button type="button" class="btn btn-danger"  id="close_clav" data-dismiss="modal"><i class="far fa-times-circle"></i>Cerrar</button> 
               
            </div>
        </div>
    </div>
</div>

