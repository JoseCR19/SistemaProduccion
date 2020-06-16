<div class="modal fade bd-example-modal-lg" id="modal-create-periodo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrar Periodo Valorización</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="cerrar_periodo">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="form-group row" style="display:none">
                    <label for="inputEmail3" class="col-sm-2 control-label">id</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="id_valo_crea" placeholder="id_valo_crea" require disabled=true>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-2 control-label">CÓDIGO</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="codi_valo" placeholder="CODIGO" require>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">DESCRIPCION</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="desc_valo" placeholder="DESCRIPCION" require>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">FECHA INICIO</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="fech_inic"  require>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 control-label">FECHA FIN</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="fech_fina"  require>
                    </div>
                </div>
                


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" id="agregar">
                    <i class="far fa-save"></i> Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="btn_cerr_moda_crea"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>