<div class="modal fade bd-example-modal-xl" id="modal-anular-reproceso" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header"  id="close">
                <h5 class="modal-title" id="exampleModalLabel">ANULAR REPROCESO</h5>
            </div>
            <div class="modal-body" >
                <div class="row">
                    <input type="text" id="anular_reproceso_fecha_inicio"  class="form-control" name="anular_reproceso_fecha_inicio" disabled="true" class="col-11" style="display:none">
                    <input type="text" id="anular_reproceso_fecha_final"  class="form-control" name="anular_reproceso_fecha_final" disabled="true" class="col-11" style="display:none">

                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">NUMERO DOCUMENTO</label>
                            <input type="text" id="anular_reproceso_documento"  class="form-control" name="anular_reproceso_documento" disabled="true" class="col-11">
                        </div>                       

                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group">
                            <input type="text" id="anular_reproceso_ot"  class="form-control" name="anular_reproceso_ot" disabled="true" class="col-11" style="display:none">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">O.T</label>
                            <input type="text" id="anular_reproceso_ot_label"  class="form-control" name="anular_reproceso_ot_label" disabled="true" class="col-11">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group">
                            <input type="text" id="anular_reproceso_tipoelemento"  class="form-control" name="anular_reproceso_tipoelemento" disabled="true" class="col-11"  style="display:none">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO ELEMENTO</label>
                            <input type="text" id="anular_reproceso_tipoelemento_label"  class="form-control" name="anular_reproceso_tipoelemento_label" disabled="true" class="col-11">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-12 col-sm-6 col-6">
                        <div class="form-group ">
                            <input type="text" id="anular_reproceso_origen"  class="form-control" name="anular_reproceso_origen" disabled="true" class="col-11" style="display:none" >
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ETAPA ORIGEN</label>
                            <input type="text" id="anular_reproceso_origen_label"  class="form-control" name="anular_reproceso_origen_label" disabled="true" class="col-11">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <input type="text" id="anular_reproceso_destino"  class="form-control" name="anular_reproceso_destino" disabled="true" class="col-11" style="display:none">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ETAPA DESTINO</label>
                            <input type="text" id="anular_reproceso_destino_label"  class="form-control" name="anular_reproceso_destino_label" disabled="true" class="col-11">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">FECHA</label>
                            <input type="text" id="anular_reproceso_fecha_label"  class="form-control" name="anular_reproceso_fecha_label" disabled="true" class="col-11">

                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">USUARIO</label>
                            <input type="text" id="anular_reproceso_usuario_label"  class="form-control" name="anular_reproceso_usuario_label" disabled="true" class="col-11">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <input type="text" id="anular_reproceso_motivo"  class="form-control" name="anular_reproceso_motivo" disabled="true" class="col-11" style="display:none">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">MOTIVO</label>
                            <input type="text" id="anular_reproceso_motivo_label"  class="form-control" name="anular_reproceso_motivo_label" disabled="true" class="col-11">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO ANULAR</label>

                            <div style="float: left;" id='combo_anulacion' class="form-control" name="combo_anulacion" disabled="true" class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-8 col-sm-8 col-8" style="width:100%">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">OBSERVACION</label>
                            <textarea type="text" id="anular_reproceso_observacion_label"  class="form-control" name="anular_reproceso_observacion_label" disabled="true" class="col-11" style="height: 20%"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">

                </div>
                <div id='jqxWidget' style="margin-top:20px !important"> 
                    <div id="grid_anular_reproceso"></div>
                </div>
            </div>
            <div class="modal-footer" >
                <button type="button" class="btn btn-danger"  id="anular_todo_reproceso" >
                    <i class="fas fa-ban"></i>
                    ANULAR</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="close_registrar_reproceso_anul" >
                    <i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>