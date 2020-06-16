<div class="modal fade bd-example-modal-md" id="modal-create-armadores" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrar Armadores</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group " style="display:none">
                    <label for="inputEmail3">id</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="id2" placeholder="codigo" require disabled=true>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">NOMBRES</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="armador_nombre2" placeholder="NOMBRES" require>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">APELLIDOS</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="armador_apellidos2" placeholder="APELLIDOS" require>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">ETAPA</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="etapa2" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">EMPRESA</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="empresa2" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">ESTADO</label>
                    <div class="col-sm-12">
                        <select class="form-control" id="estado2">
                            <option value="ACT">ACTIVO</option>
                            <option value="INA">INACTIVO</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="registrar"><i class="far fa-save"></i> Registrar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="cerrar_modal_nuevo"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>