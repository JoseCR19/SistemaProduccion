<div class="modal fade bd-example-modal-lg" id="modal-editar-proyecto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Proyecto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form action="" id="form_register_detalle_proyecto" enctype="multipart/form-data" method="POST">
                <input type="text" id="codigo"  class="form-control" name="codigo_proyecto_detalle" style="display:none" >
                <input type="text" id="user_proyecto"  class="form-control" name="user_proyecto" style="display:none" >

                <div class="modal-body card-body">
                    <div class="form-group row" style="display:none">
                        <label for="inputEmail3" class="col-sm-2 control-label">Codigo</label>
                        <div class="col-sm-10">

                            <input type="text" class="form-control" id="guardar_termino_final_proyecto"  name="guardar_termino_final_proyecto" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 control-label">AÑO</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="anio" placeholder="AÑO" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">NRO PROYECTO</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="nrproyecto" placeholder="NRO PROYECTO">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">PROYECTO</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="proyecto" placeholder="PROYECTO" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">ALIAS</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="alias" name="alias_proyecto" placeholder="ALIAS" >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">CLIENTE</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="cliente" placeholder="CLIENTE">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">Descripción</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="descripcion" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="form-group row"> 
                        <div class="hidde_grid" id="cambiar_fecha">      
                            <div>
                                <label for="inputPassword3" class="col-sm-8 control-label">Cambiar fecha de termino</label>                           
                                <input type="checkbox" class="form-check-input" id="camb_fecha_termino_proyecto" name="camb_fecha_termino_proyecto"  style="margin-left: 0.3rem !important;">
                                <input type="text" class="form-control"  id="cambio_fecha" name="cambio_fecha" style="display:none">                            
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <label for="inputPassword4" class="mr-5">Uso de Orden Trabajo</label>                            
                            <input type="checkbox" class="form-check-input" id="check_ot" name="check_ot" style="margin-left: -40px">
                            <input type="text" class="form-control"  id="act_check" name="act_check" style="display:none" >
                        </div>
                    </div>

                    <div class="form-group row" id="bloq_fecha" >
                        <label for="inputPassword3" class="col-sm-2 control-label">Fecha de Termino</label>
                        <div class="col-sm-6">
                            <input type="date" class="form-control"  id="fecha_termino" name="fecha_termino">
                        </div>                       
                    </div>                      
                    <div class="form-group row" id="loquear_obser_proy">
                        <label for="inputPassword3" class="col-sm-2 control-label">OBSERVACION</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" id="observacion_proyecto" name="observacion_proyecto" ></textarea>
                        </div>
                    </div>

                    <div class="row" id="loquear_archivo_proy">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="exampleFormControlFile1">Subir Archivo</label>
                                <div class="row">
                                    <div class="col-lg-8 col-md-8 col-sm-8 col-8">
                                        <input type="text" id="nombre_archivo_detalle_proyecto" name="nombre_archivo_detalle_proyecto" class="form-control" placeholder="ARCHIVO" disabled="true">
                                    </div>
                                    <div class="col-lg-1 col-md-1 col-sm-1 col-1">
                                        <img src="iconos-svg/outbox.svg" alt="" id="subir_archivo_icon_detalle_proyecto" width="30" style="cursor:pointer">
                                        <input type="file" id="subir_archivo_proyecto"  name="subir_archivo_proyecto" style="display: none">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" id="actualizar_proyecto"><i class="far fa-save"></i> Actualizar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                        Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>