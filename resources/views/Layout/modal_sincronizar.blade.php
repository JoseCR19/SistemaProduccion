<div class="modal fade bd-example-modal-md" id="modal-sincronizar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Sincronizar </h5>

            </div>
            <div class="modal-body card-body sincronizacion-next" id="sinc2">
                <p class="mx-auto text-center">Inicio de la sincronización</p>
            </div>
            <div class="modal-body card-body sincronizacion-inicio" id="sinc">
                <p class="mx-auto text-center">Sincronizando ...</p>
                <img src="iconos-svg/syncronise_2_orig.gif" alt="" class="rounded mx-auto d-block" width="60">
            </div>
            <div class="modal-body card-body sincronizacion-inicio" id="sinc3">
                <p class="mx-auto text-center">La sincronización fue exitosa</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="sincronizar_total">
                    <i class="fas fa-sync"></i> Sincronizar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="close"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>