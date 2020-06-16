<div class="modal fade bd-example-modal-xl" id="modal-deta-galv" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true"  data-backdrop="static" data-keyboard="false" >
    <!--<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      modal-dialog modal-dialog-centered modal-md -->
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">

            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-2 col-md-8 col-sm-3 col-6">
                        <div class="form-group ">
                            <input type="text" class="form-control" id="idgalva_deta_galv" style="height: 28px;line-height: 1rem !important;display:none" disabled="true">
                            <label for="inputPassword3"  id="mostrar_ot_galv" style="font-weight:500 !important">O.T</label>
                            <label for="inputPassword3"  id="mostrar_os_galv" style="font-weight:500 !important">O.S</label>
                            <input type="text" class="form-control" id="proy_ot_galv" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important">CLIENTE</label>
                            <input type="text" class="form-control" id="cliente_galv" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-4 col-6" id="most_camp_num_guia_galv">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important">NUMERO DE GUIA</label>
                            <input type="text" class="form-control" id="numero_guia_galv" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important">DESCRIPCION</label>
                            <input type="text" class="form-control" id="descripcion_galv" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-4 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important">CANTIDAD TOTAL</label>
                            <input type="text" class="form-control" id="cant_total_deta_galv" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-8 col-sm-3 col-6  mb-2 ">
                        <button type="button" class="btn btn-danger float-right"  id="agregar_detalle_galvanizado" >
                            <i class="fas fa-plus-circle"></i>Nuevo</button>
                    </div>
                </div>

                <div id='jqxWidget'>
                    <div id="grid_deta_galv"></div>
                    <div style="margin-top:10px;">
                        <div id="cellbegineditevent"></div>
                        <div style="margin-top: 5px;" id="cellendeditevent"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer mb-2">
                <button type="button" class="btn btn-danger"  data-dismiss="modal"  id="btn_cerrar_detalle_galvanizado_abajo"><i class="far fa-times-circle"></i>Cerrar</button>
            </div> 
        </div>
    </div>
</div>