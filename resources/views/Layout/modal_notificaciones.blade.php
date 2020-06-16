<div class="modal fade bd-example-modal-lg" id="modal-crear-notificacion" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Crear Notifación</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="" id="guardar_notificacion" enctype="multipart/form-data" method="POST">
                <div class="modal-body card-body">
                    <section class="content">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card card-primary card-outline">
                                            <div class="card-body box-profile">
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="form-group ">
                                                        <input id="para_noti" type="text" style="display: none"></input>
                                                        <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">GRUPO</label>
                                                        <div style='float: left;' id='tag_noti' class="col-11">
                                                        </div>
                                                        <button type="button" id="agregar_grupos" class="btn btn-danger" style="width: 30px !important;height: 30px !important;padding: 0px !important;margin-left: 2px !important"><center><i class="far fa-plus-square"></i></center> 
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <div class="form-group ">
                                                        <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">PERSONAL</label>
                                                        <div style='float: left;' id='tag_noti_personal' class="col-11">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="card card-primary card-outline">
                                            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                                <div class="form-group">
                                                    <label for="exampleFormControlFile1">Subir Archivo</label>
                                                    <div class="row">
                                                        <div class="col-lg-10 col-md-8 col-sm-8 col-8">
                                                            <input type="text" id="nombre_archivo_2" class="form-control" placeholder="ARCHIVO" disabled="true">
                                                        </div>
                                                        <div class="col-lg-1 col-md-1 col-sm-1 col-1">
                                                            <img src="iconos-svg/outbox.svg" alt="" id="subir_archivo_icon_2" width="30" style="cursor:pointer">
                                                            <input type="file" id="subir_archivo_2" accept="*" name="subir_archivo" style="display:none">
                                                        </div>
                                                    </div>
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
                                                <b>PARA: </b> <a class="float-center" id="tag_lista_noti" name="tag_lista_noti"></a>
                                            </li>
                                            <li class="list-group-item"  class="lead emoji-picker-container">
                                                <b>ASUNTO: </b> <input type="text" class="form-control" id="asunto" name="asunto" data-emojiable="true"> 
                                            </li>
                                            <li class="list-group-item">
                                                <b>OBSERVACIÓN: </b>
                                            </li>
                                        </ul>
                                        <div class="col-md-12">
                                            <textarea class="form-control" id="text_observacion" rows="3" name="text_observacion"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="modal-footer">
                    <button type="submit" id="" class="btn btn-danger"><i class="far fa-save"></i>
                        Enviar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                        Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>