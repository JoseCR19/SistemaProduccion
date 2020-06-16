<div class="modal fade bd-example-modal-lg" id="modal-contrato-recibida" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Contrato</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn_cerr">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="" id="form_register_guia_recibida" enctype="multipart/form-data" method="POST">
                <input type="text" id="id_contrto"  class="form-control" name="id_contrto" style="display:none" >
                <div class="modal-body card-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="exampleFormControlFile1">Subir Archivo</label>
                                <div class="row">
                                    <div class="col-lg-8 col-md-8 col-sm-8 col-6">
                                        <input type="text" id="nombre_archivo_guiarecibida" name="nombre_archivo_guiarecibida" class="form-control" placeholder="ARCHIVO" disabled="true">
                                    </div>
                                    <div class="col-lg-1 col-md-1 col-sm-1 col-1">
                                        <img src="iconos-svg/outbox.svg" alt="" id="subir_archivo_icon_guia_recibida" width="30" style="cursor:pointer">
                                        <input type="file" id="subir_archivo_guia_recibida"  name="subir_archivo_guia_recibida" style="display: none">
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" id="guardar_guia_recibida"><i class="far fa-save"></i> Registrar</button>
                    <button type="button" class="btn btn-danger"  data-dismiss="modal"  id="btn_cerrar_guia_recibida"><i class="far fa-times-circle"></i>Cerrar</button>
                </div>

            </form>
        </div>
    </div>
</div>