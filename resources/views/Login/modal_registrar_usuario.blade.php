<div class="modal fade bd-example-modal-lg" id="modal-create-usuario" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrar Usuario</h5>
                 
            </div>
            <div class="modal-body card-body">
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 control-label">DNI</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="dni_usuario" placeholder="DNI" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">NOMBRES</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="nombres_usuario" placeholder="NOMBRES" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">APELLIDOS</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="apellidos_usuario" placeholder="APELLIDOS" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">USUARIO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="usuario_usuario" placeholder="USUARIO" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label" >CLAVE</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="clave_usuario" placeholder="CLAVE" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">CORREO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="correo_usuario" onkeypress="return runScript(event)" placeholder="CORREO" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">TELÉFONO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="telefono_usuario" placeholder="TELEFONO" >
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="registrar_usuario"><i class="fas fa-user-plus"></i>Registrar</button>
                <button type="button" class="btn btn-warning" id="limpiar"><i class="fas fa-broom"></i> Limpiar</button>
                <button type="button" class="btn btn-danger" id="cerr_moda" data-dismiss="modal"><i class="far fa-times-circle"></i>  Cerrar</button>
            </div>
        </div>
    </div>
</div>