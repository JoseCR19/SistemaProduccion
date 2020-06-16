<div class="modal fade bd-example-modal-xl"  data-backdrop="static" data-keyboard="false"  id="modal-registrar-reproceso" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header"  id="close">
                <h5 class="modal-title" id="exampleModalLabel">REGISTRAR REPROCESO</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" >
                <div class="row">
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group">
                            <input type="text" id="nuevo_ot_reproceso_label"  class="form-control" name="nuevo_ot_reproceso_label" style="display:none">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">O.T</label>
                            <div  id='nuevo_ot_reproceso' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group">
                            <input type="text" id="nuevo_producto_reproceso_label"  class="form-control" name="nuevo_producto_reproceso_label" style="display:none">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO ELEMENTO</label>
                            <div  id='nuevo_producto_reproceso' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ZONA</label>
                            <div  id='nuevo_zona_reproceso' class="col-11" >
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">PROGRAMA</label>
                            <div  id='nuevo_programa_reproceso'  class="col-11" >
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">ETAPA ORIGEN</label>
                            <div  id='nuevo_origen_reproceso' class="col-11 ">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">CODIGO</label>
                            <div  id='nuevo_codigo_reproceso' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">RUTA</label>
                            <div id='nuevo_ruta_reproceso' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-1 col-sm-3 col-3">
                        <div class="float-left" >
                            <button class="btn btn-block btn-primary btn-sm" type="button" id="nuevo_buscar_reproceso" style="margin-top: 30px;">
                                <i class="fas fa-search icon-buscar"></i> Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div id='jqxWidget' style="margin-top:20px !important"> 
                    <div id="grid_nuevo_reproceso"></div>
                </div>
            </div>
            <div class="modal-footer" >

                <button type="button" class="btn btn-danger mr-2"  id="reprocesar_elemento_nuevo_boton" >
                    <i class="fas fa-check-circle"></i>
                    Reprocesar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="close_registrar_reproceso">
                    <i class="far fa-times-circle"></i>
                    Cerrar</button>

            </div>
        </div>
    </div>
</div>