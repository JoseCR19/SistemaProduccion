<div class="modal fade bd-example-modal-lg" id="modal-asignar-ruta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document" >
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Asignar Ruta</h5>
                <button type="button" class="close" id="cerrar_inferior" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="progress"></div>
            <div class="modal-body card-body">
                <div class="row mt-3">
                    <div class="col-md-3 ml-3">
                        <div class="form-group ">
                            <label style="font-weight:500 !important">RUTA</label>
                            <div style='float: left;' id='ruta_combo_2'>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12 ml-3">
                        <div class="form-group ">
                            <input id="id_ruta" style="display: none">
                            <label style="font-weight:500 !important">DESCRIPCIÓN</label>
                            <br/>
                            <label style="font-weight:500 !important;font-size: 14px !important" id="ruta_descripcion"></label>
                        </div>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid3"></div>
                    <div style="margin-top: 30px;">
                        <div id="cellbegineditevent"></div>
                        <div style="margin-top: 10px;" id="evento"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="float-right mr-3" id="cerrar_modal_asig_ruta" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-danger"><i class="far fa-times-circle"></i>
                                CERRAR</button>
                        </div>
                        <div class="float-right mr-3" id="registrar_rutas_asignadas" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-primary"><i class="fas fa-plus"></i>
                                AGREGAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>