<div class="modal fade bd-example-modal-md" id="modal-despacho-pregunta" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <button type="button" class="close btn-success" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="modal-body card-body">

                <center>
                    <img src="iconos-svg/stock_despacho.svg" width="60px" class="mr-2">
                    <p class="mx-auto text-center">¿DESEA AGREGAR ELEMENTOS A UN DESPACHO EXISTENTE? </p>
                </center>



                <div class="row hidde_grid" style="float:center;margin-top: -12px;margin-bottom: 11px;" id="mostrar_combo_despacho">
                    <div class="col-lg-3 col-md-4 col-sm-8 col-6">
                    </div>
                    <div style="float:center;" id='combo_despacho' class="col-lg-6 col-sm-6" >
                    </div>
                </div>

              <!--  <input type="text" id="preg_ot"  class="form-control" name="pregunta_ot" style="display:none">
                -->              
                <div class="col-lg-12 col-sm-8">
                    <center>
                    <button type="submit" class="btn btn-success col-lg-6 col-md-6 col-sm-6 col-6 m-2" id="modificar_si"  ><i class="far fa-check-circle"></i> Si</button>
                    <button type="submit" class="btn btn-success hidde_grid col-lg-6 col-md-6 col-sm-6 col-6 m-2" id="modificar_acepta" onmouseover="this.style.backgroundColor = '#4CAF50'" onmouseout="this.style.backgroundColor = ''"><i class="far fa-check-circle"></i> Aceptar</button>
                    
                   
                    <button type="button" class="btn btn-danger col-lg-6 col-md-6 col-sm-6 col-6 "   id="modificar_no"><i class="far fa-times-circle"></i>No</button>
                    <button type="button" class="btn btn-danger hidde_grid col-lg-6 col-md-6 col-sm-6 col-6"   id="modificar_salir" onmouseover="this.style.backgroundColor = '#ff4d4d'" onmouseout="this.style.backgroundColor = ''"><i class="far fa-times-circle"></i>Salir</button>
                    <center>
                </div>

            </div>
        </div>
    </div>
</div>