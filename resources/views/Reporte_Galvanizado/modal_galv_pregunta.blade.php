<div class="modal fade bd-example-modal-md" id="modal-galv-pregunta" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-body card-body">
                <center>
                    <img src="iconos-svg/xls_galv.svg" width="60px" class="mr-2">
                    <p class="mx-auto text-center">¿SELECCIONE UN REPORTE GRAFICO? </p>
                </center>
                
                <div class="row" style="float:center;margin-top: -12px;margin-bottom: 11px;">
                    <div class="col-lg-3 col-md-4 col-sm-8 col-6">
                    </div>
                    <div style="float:center;" id='export_excel_galva' class="col-lg-6 col-md-8 col-sm-6 col-6" >
                    </div>
                </div>
                <center>
                    <button type="submit" class="btn btn-success" id="opci_export_excel" style="margin-left: -8px;margin-right: 17px;" onmouseover="this.style.backgroundColor = '#4CAF50'" onmouseout="this.style.backgroundColor = ''"><i class="far fa-check-circle"></i>Aceptar</button>

                    <button type="button" class="btn btn-danger"  data-dismiss="modal"  id="close_btn_clear" onmouseover="this.style.backgroundColor = '#ff4d4d'" onmouseout="this.style.backgroundColor = ''"><i class="far fa-times-circle"></i>Cancel</button>
                </center>
            </div>
        </div>
    </div>
</div>