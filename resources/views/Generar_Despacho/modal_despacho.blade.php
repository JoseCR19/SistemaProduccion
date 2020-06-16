<div class="modal fade bd-example-modal-md" id="modal-despacho" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">ASIGNAR AVANCE</h5>

            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-6 col-md-5 col-lg-5 col-sm-5" >
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">OT</label>
                            <input type="text" id="ot_detalle"  class="form-control"  disabled="true">
                            <input type="text" id="ot_detalle_valor"  class="form-control"  disabled="true" style="display: none">
                        </div>
                    </div>
                    <div class="col-6 col-md-4 col-lg-4 col-sm-4" >
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Elemento</label>
                            <input type="text" id="elemento"  class="form-control"  disabled="true">
                              <input type="text" id="elemento_valor"  class="form-control"  disabled="true" style="display: none">
                        </div>
                    </div>
                    <div class="col-6 col-md-3 col-lg-3 col-sm-3" >
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Cantidad</label>
                            <input type="text" id="cantidad_despacho"  class="form-control"  disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-md-4 col-lg-4 col-sm-4" >
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Total Peso Neto</label>
                            <input type="text" id="total_peso_neto"  class="form-control"  disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-md-4 col-lg-4 col-sm-4" >
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Total Peso Bruto</label>
                            <input type="text" id="total_peso_bruto"  class="form-control"  disabled="true">
                        </div>
                    </div>
                    <div class="col-6 col-md-4 col-lg-4 col-sm-4" >
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">Total Area</label>
                            <input type="text" id="total_peso_area"  class="form-control"  disabled="true">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-success" id="generar_avance_despacho"><i class="far fa-save"></i> Registrar</button>
                <button type="button" class="btn btn-danger"  data-dismiss="modal"  id="close_registrar_avance"><i class="far fa-times-circle"></i>Cerrar</button>
            </div>
        </div>
    </div>
</div>