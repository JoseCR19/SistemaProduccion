<div class="modal fade bd-example-modal-md" data-backdrop="static" data-keyboard="false"  id="modal-create-chofer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Crear Chofer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
               
                <div class="form-group ">
                    <label for="inputPassword3">Numero de Identidad:</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="NumeIden_crea" placeholder="NUMERO DE IDENTIDAD" require >
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">Nombre Completo:</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="NombChofer_crea" placeholder="NOMBRE CHOFER" require>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">Licencia:</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="varNumeLicen_crea" placeholder="LICENCIA" require >
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">Transportista</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="id_transportista_create" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">Estado</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="id_estado_chofer_create" class="custom-select" disabled="">
                            <option value="" disabled="" selected="">ACTIVO</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="guardar_chofer"><i class="far fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>