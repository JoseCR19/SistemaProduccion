<div class="modal fade bd-example-modal-lg" id="modal-crear-grupos_notificacion" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Crear Grupos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <section class="content">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="card card-primary card-outline">
                                <div class="card-body box-profile">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="form-group ">
                                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">GRUPO</label>
                                            <button   type="button" id="agregar_nuevo_tag" class="btn btn-danger" style="width: 30px !important;height: 30px !important;padding: 0px !important;margin-left: 2px !important;float: right;"><center><i class="far fa-plus-square"></i></center> 
                                            </button>
                                            <div style='float: left;' id='tag_noti_grupos' class="col-11">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="card card-primary card-outline">
                                <div class="card-body box-profile">
                                    <ul class="list-group list-group-unbordered mb-3">
                                        <li class="list-group-item">
                                            <b>GRUPO: </b> 
                                            <input type="text" class="form-control" id="tag_crear_noti_grupos">
                                        </li>
                                        <li class="list-group-item">
                                            <b>INTEGRANTES: </b>
                                            <button   type="button" id="agregar_integrantes_grupo" class="btn btn-danger" style="width: 30px !important;height: 30px !important;padding: 0px !important;margin-left: 2px !important;float: right;"><center><i class="far fa-plus-square"></i></center> 
                                            </button>
                                            <div style='float: right;' id='list_noti_usuario' class="col-12">
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="col-md-12">
                                        <div id='jqxWidget'>
                                            <div id="grid_list_user_tags"></div>
                                            <div style="margin-top: 30px;">
                                                <div id="cellbegineditevent"></div>
                                                <div style="margin-top: 10px;" id="cellendeditevent"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" id="guardar_lista_integrantes" class="btn btn-danger" ><i class="far fa-save"></i>
                    Guardar</button>
                <button type="button" class="btn btn-danger" id="close_modal_crear_grupos"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>