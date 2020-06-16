<div class="modal fade bd-example-modal-lg" id="modal-create-colaborador" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrar Supervisor</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Agrupador</label>
                            <div style="float:left;" id='sele_agru_agre'>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">

                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">Supervisor</label>
                            <div style="float:left;" id='sele_agru_super'>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important;color: white">.</label>
                            <button class="btn btn-block btn-success btn-sm  " id="agre_super_agru">
                                <i class="far fa-file-excel"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div id='jqxWidget'>
                            <div id="grid_super_agru"></div>
                            <div style="margin-top: 30px;">
                                <div id="cellbegineditevent"></div>
                                <div style="margin-top: 10px;" id="cellendeditevent"></div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="guar_super">
                    <i class="far fa-save"></i> Guardar</button>
                <button type="button" class="btn btn-danger" id="btn_cerr_cont_crea"data-dismiss="modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>