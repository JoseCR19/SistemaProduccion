<div class="modal fade bd-example-modal-md" id="modal-guia-opciones" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-body card-body">

                <p class="mx-auto text-center">Elija la Guia</p>
                <input type="text" id="check_id_guia_emitida"  class="form-control" name="check_id_guia_emitida" style="display:none">
                <input type="text" id="check_id_guia_recibida"  class="form-control" name="check_id_guia_recibida" style="display:none">
                <input type="text" id="check_id_documento"  class="form-control" name="check_id_documento" style="display:none" >
               
                <center>
                    <button type="submit" class="btn btn-success" id="opciones_guia_emitida"><i class="far fa-clipboard"></i> Guia Emitida</button>
                    <button type="submit" class="btn btn-success" id="opciones_guia_recibida"><i class="far fa-clipboard"></i> Guia Recibida</button>
                    <button type="button" class="btn btn-danger"  data-dismiss="modal"  id="close_btn_opciones"><i class="far fa-times-circle"></i>Cerrar</button>
                </center>
            </div>
        </div>
    </div>
</div>