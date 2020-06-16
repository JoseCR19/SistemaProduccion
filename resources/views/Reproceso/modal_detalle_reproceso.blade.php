<div class="modal fade bd-example-modal-lg" id="modal-detalle-reproceso" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Detalle de Reproceso</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn_cerr">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="" id="form_register_detalle_reproceso" enctype="multipart/form-data" method="POST">
                <input type="text" id="ot_detalle_reproceso_nuevo"  class="form-control" name="ot_detalle_reproceso_nuevo" style="display:none" >
                <input type="text" id="tipo_producto_detalle_reproceso"  class="form-control" name="tipo_producto_detalle_reproceso" style="display:none">
                <input type="text" id="zona_detalle_reproceso"  class="form-control" name="zona_detalle_reproceso"  style="display:none">
                <input type="text" id="programa_detalle_reproceso"  class="form-control" name="programa_detalle_reproceso" style="display:none">
                <input type="text" id="ruta_detalle_reproceso"  class="form-control" name="ruta_detalle_reproceso" style="display:none">
                <input type="text" id="idelemento_detalle_reproceso"  class="form-control" name="idelemento_detalle_reproceso" style="display:none">
                <input type="text" id="user_detalle_reproceso"  class="form-control" name="user_detalle_reproceso" style="display:none">


                <div class="modal-body card-body">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-sm-8 col-10" >
                            <div class="form-group">
                                <input type="text" id="nuevo_detalle_reproceso_etapa_origen_php"  class="form-control" name="nuevo_detalle_reproceso_etapa_origen_php" style="display:none">
                                <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Etapa Origen</label>
                                <input type="text" id="descripcion_etapa_origen"  name="descripcion_etapa_origen" disabled="true" class="form-control col-11">
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-8 col-sm-8 col-10" >
                            <div class="form-group">
                                <input type="text" id="nuevo_detalle_reproceso_etapa_destino_php"  class="form-control" name="nuevo_detalle_reproceso_etapa_destino_php" style="display:none">
                                <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Etapa Destino</label>
                                <div  id='nuevo_detalle_reproceso_etapa_destino' class="form-control col-11">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-8 col-sm-8 col-6">
                            <div class="form-group">
                                <input type="text" id="nuevo_detalle_reproceso_motivo_php"  class="form-control" name="nuevo_detalle_reproceso_motivo_php" style="display:none">
                                <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-6">Motivo</label>
                                <div  id='nuevo_detalle_reproceso_motivo' class="form-control col-11" >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group ">
                                <label for="inputEmail3">Observación</label>
                                <input type="text" class="form-control" id="nuevo_reproceso_observacion" name="nuevo_reproceso_observacion" placeholder="Observación" require >
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="exampleFormControlFile1">Subir Archivo</label>
                                <div class="row">
                                    <div class="col-lg-8 col-md-8 col-sm-8 col-6">
                                        <input type="text" id="nombre_archivo_detalle_reproceso" name="nombre_archivo_detalle_reproceso" class="form-control" placeholder="ARCHIVO" disabled="true">
                                    </div>
                                    <div class="col-lg-1 col-md-1 col-sm-1 col-1">
                                        <img src="iconos-svg/outbox.svg" alt="" id="subir_archivo_icon_detalle_reproceso" width="30" style="cursor:pointer">
                                        <input type="file" id="subir_archivo_reproceso"  name="subir_archivo_reproceso" style="display: none">
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" id="guardar_nuevo_reproceso_detalle"><i class="far fa-save"></i> Registrar</button>
                    <button type="button" class="btn btn-danger"  data-dismiss="modal"  id="btn_cerrar_detalle_reproceso"><i class="far fa-times-circle"></i>Cerrar</button>
                </div>

            </form>
        </div>
    </div>
</div>