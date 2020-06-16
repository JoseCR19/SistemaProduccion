<div class="modal fade bd-example-modal-md" id="modal-modificar-costo" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Modificar Precio</h5>
            </div>
            <div class="modal-body card-body">
                <p class="mx-auto text-center">Precio</p>
                <input type="number" class="form-control" value="0.00" id='precio_temp' style="display: none" />
                <input type="number" class="form-control" value="0.00" id='precio'/>
                <input type="text" id='id_row' class="form-control" style="display: none" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="guardar_modi_costo" style="margin-top: 8px;">
                    <i class="fas fa-save"></i> Guardar</button>
                <button type="button" class="btn btn-danger"  id="close_modificar" style="margin-top: 8px;">
                    <i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>