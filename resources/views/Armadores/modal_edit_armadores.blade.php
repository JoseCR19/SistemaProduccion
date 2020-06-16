<div class="modal fade bd-example-modal-md" id="modal-edit-armadores" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Armadores</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group " style="display:none">
                    <label for="inputEmail3">id</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="id" placeholder="codigo" require disabled=true>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">NOMBRES</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="armador_nombre" placeholder="NOMBRES" require>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">APELLIDOS</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="armador_apellidos" placeholder="APELLIDOS" require>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">ETAPA</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="etapa" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">EMPRESA</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="empresa" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>

                <div class="form-group ">
                    <label for="inputPassword3">ESTADO</label>
                    <div class="col-sm-12">
                        <select class="form-control" id="estado_id" >
                            <option value="ACT">ACTIVO</option>
                            <option value="INA">INACTIVO</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="actualizar_armadores"><i class="far fa-save"></i> Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>