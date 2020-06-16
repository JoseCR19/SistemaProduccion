<div class="modal fade bd-example-modal-md" data-backdrop="static" data-keyboard="false"  id="modal-edit-chofer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Chofer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group " style="display:none">
                    <label for="inputEmail3">id</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="idchofer" placeholder="codigo" require disabled=true>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">Numero de Identidad:</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="NumeIden_upda" placeholder="NUMERO DE IDENTIDAD" require disabled=true>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">Nombre Completo:</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="NombChofer_upda" placeholder="NOMBRE CHOFER" require>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">Licencia:</label>
                    <div class="col-sm-12">
                        <input type="text" class="form-control" id="varNumeLicen_upda" placeholder="LICENCIA" require disabled=true>
                    </div>
                </div>
                <div class="form-group ">
                    <label for="inputPassword3">Transportista</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="id_transportista_edit" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>

                <div class="form-group ">
                    <label for="inputPassword3">Estado</label>
                    <div class="col-sm-12">
                        <select name="subtipo" id="id_estado_chofer_edit" class="custom-select">
                            <option value="" disabled="" selected="">Seleccione</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="actualizar_chofer"><i class="far fa-save"></i>Actualizar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>