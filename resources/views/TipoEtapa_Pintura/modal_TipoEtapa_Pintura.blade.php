<div class="modal fade bd-example-modal-lg" id="modal-agregar-tipoetapa_pintura" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">CREAR TIPO ETAPA COLABORADOR</h5>
            </div>
            <div class="modal-body card-body">                
                <!--                <div class="float-left" data-intro="Permite seleccionar tipo etapa">  
                                    <label for="inputPassword3" style="font-weight:600 !important" class="col-lg-12 col-md-12">TIPO ETAPA</label>
                                    <div id="modaltipoetapa"></div>                                    
                                </div>-->                
                <div class="form-group row">
                    <div>
                        <label for="inputPassword3" style="font-weight:600 !important">TIPO ETAPA :</label>
                    </div>
                    <div class="col-sm-5">                        
                        <div id="modaltipoetapa"></div>
                    </div>
                </div>           
                <div id='jqxWidget'>
                    <div id="trabajadores"></div>
                    <div style="margin-top: 30px;">
                        <div id="cellbegineditevent"></div>
                        <div style="margin-top: 10px;" id="evento"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="float-right mr-3" id="btncerrar_tipoetapa" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" data-dismiss="modal" id="btn_cerrar_modal" class="btn btn-danger"><i class="far fa-times-circle"></i>
                                CERRAR</button>
                        </div>
                        <div class="float-right mr-3" id="btnguardar_colaborador" style="color:white;border-color:transparent !important;background:transparent !important">
                            <button type="button" class="btn btn-primary"><i class="far fa-save"></i>
                                GUARDAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>