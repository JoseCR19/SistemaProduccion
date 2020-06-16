<div class="modal fade bd-example-modal-xl" id="modal-ver-lotes" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
            <div class="modal-body" >
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                            <input class="form-control" id="ot_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">TIPO PRODUCTO</label>
                            <input class="form-control" id="pro_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">CONTRATA</label>
                            <input class="form-control" id="contrata_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">LOTE</label>
                            <input class="form-control" id="lote_ver" disabled="true">
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">CABINA</label>
                            <input class="form-control" id="cabina_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-3 hidde_grid" id="ocultar_pintor">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">PINTORES</label>
                            <div style="float:left;" id='pintores' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">SISTEMA PINTURA</label>
                            <input class="form-control" id="sistema_ver" disabled="true">
                        </div>
                    </div>

                    <div class="col-md-1">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">PESO</label>
                            <input class="form-control" id="peso_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-1">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">CANTIDAD</label>
                            <input class="form-control" id="cant_elem_ver" disabled="true">
                        </div>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid4"></div>

                </div>
            </div>
            <div class="modal-footer" style="justify-content: flex-start !important">
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="inputPassword3" style="font-weight:500 !important">FECHA INICIO</label>
                        <input type="text" class="form-control" id="fech_inic_ver"  require disabled="true" >
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="inputPassword3" style="font-weight:500 !important">FECHA TERMINO</label>
                        <input type="text" class="form-control" id="fech_fin_ver"  require disabled="true" >
                    </div>
                </div>
                <div class="col-md-2" >
                    <div class="form-group" id="fecha_termino">
                        <label for="inputPassword3" style="font-weight:500 !important">FECHA TERMINO REAL</label>
                        <input type="text" class="form-control" id="fech_term_ver"  require disabled="true" >
                    </div>
                </div>
                <div class="form-group mt-4">
                    <label for="inputPassword3" style="font-weight:500 !important;color: white !important">.</label>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" id="close" style="margin-top: 8px;">
                        <i class="far fa-times-circle"></i>
                        Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>