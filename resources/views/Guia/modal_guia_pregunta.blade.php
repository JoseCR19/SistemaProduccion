<div class="modal fade bd-example-modal-md" id="modal-guia-pregunta" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-body card-body">
                <center>
                    <img src="iconos-svg/delete_guia.svg" width="60px" class="mr-2">
                    <p class="mx-auto text-center">¿DESEA ANULAR? </p>
                </center>
                

                <div class="row" style="align-content: center !important;margin-left: 139px;margin-top: -9px;margin-bottom: 8px;">

                    <div class="col-sm-2">
                        <label>N.Guia: </label>
                    </div>
                    <div class="col-sm-6">
                        <input type="text" id="preg_documento_guia"  class="form-control" style="border:0px;background: white;margin-top: -6px;" disabled="true">
                    </div>

                </div>
                <div class="row" style="float:center;margin-top: -12px;margin-bottom: 11px;">
                    <div class="col-lg-3 col-md-4 col-sm-8 col-6">
                    </div>
                    <div style="float:center;" id='motivo_anular_guia' class="col-lg-6 col-md-8 col-sm-6 col-6" >
                    </div>
                </div>

                <input type="text" id="preg_ot"  class="form-control" name="pregunta_ot" style="display:none">
                <input type="text" id="preg_prod_codi"  class="form-control" name="producto_codigo" style="display:none">
                <input type="text" id="preg_iddespacho"  class="form-control" name="preg_iddespacho" style="display:none" >
                <input type="text" id="preg_idguia"  class="form-control" name="preg_idguia" style="display:none" >
                <input type="text" id="preg_fech_inicio"  class="form-control" name="preg_fech_inicio" style="display:none" >
                <input type="text" id="preg_fech_final"  class="form-control" name="preg_fech_final" style="display:none" >
                <input type="text" id="preg_estado"  class="form-control" name="preg_estado" style="display:none" >
                
                
                
                <center>
                    <button type="submit" class="btn btn-success" id="anular_preguntar_guia_si" style="margin-left: -8px;margin-right: 17px;" onmouseover="this.style.backgroundColor = '#4CAF50'" onmouseout="this.style.backgroundColor = ''"><i class="far fa-check-circle"></i> Si</button>

                    <button type="button" class="btn btn-danger"  data-dismiss="modal"  id="close_btn_pregunta" onmouseover="this.style.backgroundColor = '#ff4d4d'" onmouseout="this.style.backgroundColor = ''"><i class="far fa-times-circle"></i>No</button>
                </center>
            </div>
        </div>
    </div>
</div>