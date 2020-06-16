<div class="modal fade bd-example-modal-lg" id="modal-asignar-avance" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Asignar Avance</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btn_cerr">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="row">
                    <div class="col-md-4 hidde_grid"   id='contratista'>
                        <label for="inputPassword3">Contratista</label>

                        <div style='float: left;' id='contratista_avance'>
                        </div>
                    </div>
                    <div class="col-md-4 hidde_grid" id='supervisor'>
                        <label for="inputPassword3">Supervisor</label>
                        <div style='float: left;' id='supervisor_avance'>
                        </div>
                    </div>
                    <div class="col-md-4 hidde_grid" id="maquina">
                        <label for="inputPassword3">Máquinas</label>
                        <div style='float: left;' id='maquinas_avance'>
                        </div>
                    </div>
                    <div class="col-md-3 hidde_grid" id="bulto">
                        <label for="inputPassword3">Nr. Bulto</label>
                        <input type="text" class="form-control" id="nr_bulto" placeholder="Nr° Bulto" require  style="height: 30px !important">
                    </div>
                    <div class="col-md-1 hidde_grid" id="chec_bulto">
                        <label for="inputPassword3" style="font-weight:500 !important;color:white">.</label>
                        <div class="form-check"  >
                            <input type="checkbox" class="form-check-input" id="check_bulto">
                            <label class="form-check-label" for="exampleCheck1"></label>
                        </div>
                    </div>
                    <div class="col-md-4 hidde_grid" id="guia">
                        <label for="inputPassword3">Nr. Documento</label>
                        <input type="text" class="form-control" id="nr_guia" placeholder="Nr° Documento" require >
                    </div>

                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="form-group ">
                            <label for="inputEmail3">Observación</label>
                            <input type="text" class="form-control" id="observacion" placeholder="Observación" require >
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="registrar_avance_modal"><i class="far fa-save"></i> Registrar</button>
                <button type="button" class="btn btn-danger"   id="btn_cerr_asig_2"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>