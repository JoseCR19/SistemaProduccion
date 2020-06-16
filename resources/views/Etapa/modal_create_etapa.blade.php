<div class="modal fade bd-example-modal-md" id="modal-create-etapa" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Crear Etapa</h5>
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
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group ">
                            <label for="inputPassword3">NOMBRE</label>
                            <div class="col-sm-12">
                                <input type="text" class="form-control" id="descripcion2" placeholder="NOMBRE" require>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group ">
                            <label for="inputPassword3">TIPO ETAPA</label>
                            <div class="col-sm-12">
                                <select name="subtipo" id="tipo_etapa2" class="custom-select">
                                    <option value="" disabled="" selected="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group ">
                            <label for="inputPassword3">VALORIZAR</label>
                            <div class="col-sm-12">
                                <select class="form-control" id="valoriza2">
                                    <option value="SI">SE VALORIZA</option>
                                    <option value="NO">NO SE VALORIZA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group ">
                            <label for="inputPassword3">PROCESO</label>
                            <div class="col-sm-12">
                                <select name="subtipo" id="proceso2" class="custom-select">
                                    <option value="" disabled="" selected="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group ">
                            <label for="inputPassword3">TIPO ELEMENTO</label>
                            <div class="col-sm-12">
                                <select name="subtipo" id="producto2" class="custom-select">
                                    <option value="" disabled="" selected="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group ">
                            <label for="inputPassword3">UNIDAD MEDIDA</label>
                            <div class="col-sm-12">
                                <select name="subtipo" id="unidad_medida2" class="custom-select">
                                    <option value="" disabled="" selected="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group ">
                            <label for="inputPassword3">PLANTA</label>
                            <div class="col-sm-12">
                                <select name="subtipo" id="planta2" class="custom-select">
                                    <option value="" disabled="" selected="">Seleccione</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
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
                </div>
                <div class="row">
                    <div class="form-check float-left mr-2">
                        <input type="checkbox" class="form-check-input" id="despacho2">
                        <label class="form-check-label" for="exampleCheck1">Despacho</label>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 0.5px !important" >
                    <label for="exampleCheck1" id="title_valo">TIPO VALORIZACIÓN:</label>
                </div>
                <div class="row" id="detalle_valo">
                    <div class="form-check float-left mr-2">
                        <input type="checkbox" class="form-check-input" id="porcodigo">
                        <label class="form-check-label" for="exampleCheck1">Por Codigo</label>
                    </div>
                    <div class="form-check float-left mr-2">
                        <input type="checkbox" class="form-check-input" id="materia_prima">
                        <label class="form-check-label" for="exampleCheck1">Materia Prima</label>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 0.5px !important">
                    <label for="">CONFIGURACIÓN</label>
                </div>
                <div class="row">
                    <div class="form-check float-left mr-2">
                        <input type="checkbox" class="form-check-input" id="maquina2">
                        <label class="form-check-label" for="exampleCheck1">Mostrar Máquina</label>
                    </div>
                    <div class="form-check float-left mr-2">
                        <input type="checkbox" class="form-check-input" id="supervisor2">
                        <label class="form-check-label" for="exampleCheck1">Mostrar Supervisor</label>
                    </div>
                    <div class="form-check float-left mr-2">
                        <input type="checkbox" class="form-check-input" id="contratista2">
                        <label class="form-check-label" for="exampleCheck1">Mostrar Contratista</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="agregar"><i class="far fa-save"></i> Registrar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>