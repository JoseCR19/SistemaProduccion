<div class="modal fade bd-example-modal-md" id="modal-visualizar-notificacion" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Notificación</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body card-body">
                <div class="row">
                    <div class="col-md-3">
                        <div class="text-center">
                            <img class="profile-user-img img-responsive img-circle img-bordered-sm" id="img_profile_noti" width="120" height="100">
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="post">
                            <div class="user-block">
                                <span class="username">
                                    <a href="#"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" id="usuario_noti"></font></font></a>
                                    <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                                </span>
                                <span class="description"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" id="nom_fecha"></font></font></span>
                                <span class="description">
                                    <font style="vertical-align: inherit;">MODULO:
                                    <font style="vertical-align: inherit;font-weight: bold" id="modulo"></font>
                                    </font>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="text-center">
                            <font style="vertical-align: inherit;font-weight: bold" id="titulo">
                            </font>
                        </div>
                        <p><font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;" id="descripcion">
                            </font>
                            </font>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3" id="descargar_noti_modal">
                        <a class="link-black text-sm" id="url_descarga_modal">
                            <i class="fas fa-download"></i>
                            <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;"> Descargar</font>
                            </font>
                        </a>
                    </div>
                    <div class="col-md-3" id="redireccionar_noti_modal">
                        <a href="#" class="link-black text-sm">
                            <i class="fas fa-share mr-1"></i>
                            <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;"> Redireccionar</font>
                            </font>
                        </a>
                    </div>
                    <div class="col-md-3" id="compartir_noti_modal">
                        <a href="#" class="link-black text-sm">
                            <i class="fas fa-share-alt-square"></i>
                            <font style="vertical-align: inherit;">
                            <font style="vertical-align: inherit;"> Compartir</font>
                            </font>
                        </a>
                    </div>
                    <div class="col-md-3" id="comentarios_noti_modal">
                        <span class="float-right">
                            <a href="#" class="link-black text-sm">
                                <i class="far fa-comments mr-1">
                                </i>
                                <font style="vertical-align: inherit;">
                                <font style="vertical-align: inherit;"> Comentarios
                                </font>
                                </font>
                            </a>
                        </span>
                    </div>
                    <!--<div class="col-md-12">
                        <input class="form-control form-control-sm" type="text" placeholder="Escribe un comntario">
                    </div>-->
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>