<div class="modal fade bd-example-modal-xl" id="modal-editar-grupos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
            <div class="modal-body" >
                <div class="row">
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_planta_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">PLANTA</label>
                            <div style="float:left;" id='plan_editar' class="col-lg-11 col-md-11 col-sm-11 col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-11 col-md-11 col-sm-11 col-11">ARMADOR</label>
                            <div style="float:left;" id='arma_editar' class="col-lg-11 col-md-11 col-sm-11 col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-12 col-sm-6 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_cont_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">CONTRATA</label>
                            <input class="form-control" id="contrata_editar" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_etap_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">ETAPA</label>
                            <input class="form-control" id="etap_editar" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_ot_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                            <input class="form-control" id="ot_editar" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_prod_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">TIPO ELEMENTO</label>
                            <input class="form-control" id="pro_editar" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_zon_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">ZONA</label>
                            <input class="form-control" id="zon_editar" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_prog_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">PROGRAMA</label>
                            <input class="form-control" id="prog_editar" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group">
                            <input class="form-control" id="cod_grup_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">GRUPO</label>
                            <input class="form-control" id="grup_editar" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-1 col-md-3 col-sm-3 col-3">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">PRECIO</label>
                            <input class="form-control" id="prec_editar" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-1 col-md-3 col-sm-3 col-3">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">CANT.ELEM.</label>
                            <input class="form-control" id="cant_elem_editar" disabled="true">
                        </div>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid2"></div>

                </div>
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">FECHA INICIO</label>
                            <input type="date" class="form-control" id="fech_inic_grup"  require>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">FECHA TERMINO</label>
                            <input type="date" class="form-control" id="fech_fin_grup"  require>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6 col-6">
                        <div class="form-group" id="fecha_termino">
                            <label for="inputPassword3" style="font-weight:500 !important">FECHA TERMINO REAL</label>
                            <input type="date" class="form-control" id="fech_term_grup"  require>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="guardar_asig_grup" style="margin-top: 8px;">
                    <i class="fas fa-save"></i> Guardar</button>
                <button type="button" class="btn btn-danger"  id="close_editar" style="margin-top: 8px;">
                    <i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>