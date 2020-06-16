<div class="modal fade bd-example-modal-lg" id="modal-modificar-asignar-ruta" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">MODIFICAR RUTA</h5>
            </div>
            <div class="modal-body card-body">
                <div class="row">
                    <input type="text" class="form-control form-control-sm hidde_grid" id="idruta" placeholder="OT" require disabled=true>
                    <input type="text" class="form-control form-control-sm hidde_grid" id="idproyecto" placeholder="OT" require disabled=true>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">OT</label>
                            <input type="text" class="form-control form-control-sm" id="OT3" placeholder="OT" require disabled=true>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">PRODUCTO</label>
                            <input type="text" class="form-control form-control-sm" id="DESPRO2" placeholder="DESPRO" require disabled=true>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">NOMBRE</label>
                            <input type="text" class="form-control form-control-sm" id="NOMBRE2" placeholder="NOMBRE RUTA" require disabled=true>
                        </div>
                    </div>
                    <div style="float: right;margin-left: 5px;"  >
                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;color: white" class="col-lg-12 col-md-12 col-sm-12 col-12">.</label>
                        <button class="btn btn-block btn-primary btn-sm" type="button"  id="numero_documento">
                            <i class="far fa-edit"></i>
                        </button>
                        <button class="btn  btn-block btn-primary btn-sm hidde_grid" style="margin-top: 0px" type="button"  id="guardar_documento">
                            <i class="far fa-save"></i>
                        </button>
                    </div>
                    <div style="float: right;margin-left: 5px;"  >
                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;color: white" class="col-lg-12 col-md-12 col-sm-12 col-12">.</label>
                        <button class="btn btn-block btn-primary btn-sm" type="button"  id="close_documento">
                            <i class="far fa-times-circle"></i>
                        </button>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid3"></div>
                    <div style="margin-top: 30px;">
                        <div id="cellendeditevent"></div>
                        <div style="margin-top: 10px;" id="evento"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="float-right mr-3" id="cerrar_modal_3" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-danger"><i class="far fa-times-circle"></i>
                                Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
