<div class="modal fade bd-example-modal-xl" id="modal-ver-planos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
            <div class="modal-body" >
                <div class="row">
                    <div class="col-lg-2 col-md-6 col-sm-4 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_ot_ver_plano" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                            <input class="form-control" id="ot_ver_plano" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-4 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_prod_ver_plano" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">TIPO ELEMENTO</label>
                            <input class="form-control" id="pro_ver_plano" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-4 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_prog_ver_plano" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">PROGRAMA</label>
                            <input class="form-control" id="prog_ver_plano" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-4 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_zona_ver_plano" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">ZONA</label>
                            <input class="form-control" id="zona_ver_plano" disabled="true">
                        </div>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid3"></div>
                </div>

            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="float-right mr-3" id="cerrar_planos" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-danger"><i class="far fa-times-circle"></i>
                                Cerrar</button>
                        </div>
                        <div class="float-right mr-3" id="ver_planos" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button class="btn  btn-success">
                                <i class="far fa-eye"></i>Ver Planos 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>