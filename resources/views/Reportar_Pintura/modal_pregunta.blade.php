<div class="modal fade bd-example-modal-md" id="modal-pregunta-pintura" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
           
            <div class="modal-body card-body">

                <center>
                    <img src="iconos-svg/pintura_agregar.svg" width="60px" class="mr-2">
                    <p class="mx-auto text-center">¿DESEA AGREGAR ELEMENTOS A UN LOTE DE PINTURA EXISTENTE? </p>
                </center>

                <div class="row hidde_grid" style="float:center;margin-top: -12px;margin-bottom: 11px;" id="mostrar_combo_lote_pintura">
                    <div class="col-lg-3 col-md-4 col-sm-8 col-6">
                    </div>
                    <div style="float:center;" id='combo_lote_pintura' class="col-lg-6 col-sm-6" >
                    </div>
                </div>    
                
                <div class="col-lg-12 col-sm-8">
                    <center>
                        <button type="submit" class="btn btn-success col-lg-6 col-md-6 col-sm-6 col-6 m-2" id="modificar_si_lote_pintura"  ><i class="far fa-check-circle"></i> Si</button>
                        <button type="submit" class="btn btn-success hidde_grid col-lg-6 col-md-6 col-sm-6 col-6 m-2" id="modificar_acepta_lote_pintura" onmouseover="this.style.backgroundColor = '#4CAF50'" onmouseout="this.style.backgroundColor = ''"><i class="far fa-check-circle"></i> Aceptar</button>


                        <button type="button" class="btn btn-danger col-lg-6 col-md-6 col-sm-6 col-6 "   id="modificar_no_lote_pintura"><i class="far fa-times-circle"></i>No</button>
                        <button type="button" class="btn btn-danger hidde_grid col-lg-6 col-md-6 col-sm-6 col-6"   id="modificar_salir_lote_pintura" onmouseover="this.style.backgroundColor = '#ff4d4d'" onmouseout="this.style.backgroundColor = ''"><i class="far fa-times-circle"></i>Salir</button>
                        <center>
                            </div>

            </div>
            </div>
            </div>
            </div>