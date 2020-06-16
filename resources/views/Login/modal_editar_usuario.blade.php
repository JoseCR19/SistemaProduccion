<div class="modal fade bd-example-modal-lg" id="modal-editar-usuario" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 control-label">DNI</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="dni" placeholder="DNI" require disabled=true>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">NOMBRES</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="nombres" placeholder="NOMBRES" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">APELLIDOS</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="apellidos" placeholder="APELLIDOS" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">USUARIO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="usuario" placeholder="USUARIO" require
                            disabled=true>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">CLAVE</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="clave" placeholder="CLAVE" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">CORREO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="correo"  placeholder="CORREO" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">TELÉFONO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="telefono" placeholder="TELEFONO">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">ESTADO</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="estado">
                            <option value="ACT">ACTIVO</option>
                            <option value="INA">INACTIVO</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="actualizar"><i class="fas fa-sync-alt"></i> Actualizar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>