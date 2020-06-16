<div class="modal fade bd-example-modal-lg" id="modal-lista-series-historico" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header"  id="close">
                <h5 class="modal-title" id="exampleModalLabel">SERIES HISTORICOS</h5>
                <!--<button type="button" class="close"  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>-->
            </div>

            <div class="modal-body card-body">
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <input class="form-control" id="cod_planta_editar" style="display: none">
                            <label for="inputPassword3" style="font-weight:500 !important">codigo</label>
                            <input type="text" class="form-control" id="codigo_historico" placeholder="codigo" require disabled=true>
                        </div>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid5"></div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="float-right mr-3" id="cerrar_modal_3"  style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-danger" ><i class="far fa-times-circle"></i>
                                Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>