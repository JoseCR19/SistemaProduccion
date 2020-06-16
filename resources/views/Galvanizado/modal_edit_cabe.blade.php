<div class="modal fade bd-example-modal-xl"  data-backdrop="static" data-keyboard="false"  id="modal-edit-cabe" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header"  id="close">
                <h5 class="modal-title" id="exampleModalLabel">MODIFICAR CABECERA GALVANIZADO</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" >
                <div class="row">
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group"> 
                             <input type="text" class="form-control" id="id_galv_edit_cabe" style="height: 28px;line-height: 1rem !important;display:none" disabled="true"> 
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO ORDEN</label>
                              <input type="text" class="form-control" id="tipo_orden_galv_edit_cabe" style="height: 28px;line-height: 1rem !important;" disabled="true">                         
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">O.T/O.S</label>
                             <input type="text" class="form-control" id="os_ot_galv_edit_cabe" style="height: 28px;line-height: 1rem !important;" disabled="true">                          
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group md-3 mb-sm-0">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">DESCRIPCION</label>
                             <input type="text" class="form-control" id="descrip_galv_edit_cabe" style="height: 28px;line-height: 1rem !important;">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-8 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">CANTIDAD TOTAL</label>
                            <input type="text" class="form-control" id="canti_total_edit_cabe" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">PESO NETO TOTAL</label>
                            <input type="text" class="form-control" id="peso_neto_total_galva_edit_cabe" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">PESO BRUTO TOTAL</label>
                         <input type="text" class="form-control" id="peso_bruto_total_galva_edit_cabe" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    
                    <div class="col-lg-2 col-md-4 col-sm-6 col-6" style="display:none">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">RAZON SOCIAL</label>
                         <input type="text" class="form-control" id="razon_social_galva_edit_cabe" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="modal-footer" >

                <button type="button" class="btn btn-danger mr-2"  id="edit_cabecera_galv" >
                   <i class="fas fa-edit"></i>
                    Editar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="close_galv_edit_cabecera">
                    <i class="far fa-times-circle"></i>
                    Cerrar</button>

            </div>
        </div>
    </div>
</div>