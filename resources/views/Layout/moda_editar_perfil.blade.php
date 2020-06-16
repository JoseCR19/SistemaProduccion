<div class="modal fade bd-example-modal-lg" id="modal-editar-usuario" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true">
    
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
       
            <div class="modal-content card-info card">
                <form action="" id="form_actualizar_perfil" enctype="multipart/form-data" method="POST">
               
                <div class="modal-header card-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar Perfil</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body card-body">
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <br>
                            <center>
                                <img id="img" class="profile-user-img img-fluid img-circle" src='imagenes-mimco/perfil.png' style="height: 120px;width: 120px"/>
                                <img src="iconos-svg/photo-camera.svg" alt="" id="subir_archivo_icon_2" width="30" style="cursor:pointer;margin-top: 60px;margin-left: -10px" >
                                 
                                <input type="file" name="varImage"   id="file" accept="image/*" onchange="mostrar()" style="display:none">
                            </center>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 control-label">DNI</label>
                        <div class="col-sm-10">
                             <input type="text" name="varNumeDni"   id="dni" placeholder="DNI" class="form-control" readonly >
                        
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">NOMBRES</label>
                        <div class="col-sm-10">
                              <input type="text" name="varNombUsua"   id="nombres" placeholder="NOMBRES" class="form-control" >
                             
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">APELLIDOS</label>
                        <div class="col-sm-10">
                             <input type="text" name="varApelUsua"   id="apellidos" placeholder="APELLIDOS" class="form-control" >
                           
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">USUARIO</label>
                        <div class="col-sm-10">
                          
                            <input type="text" name="varUsuario"   id="usuario" placeholder="USUARIO" class="form-control"   readonly>
                          
                        </div>
                    </div>
                    <div class="form-group row" style="display: none">
                        <label for="inputPassword3" class="col-sm-2 control-label">CLAVE</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="clave" placeholder="CLAVE" require>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">CORREO</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="correo"  placeholder="CORREO" require disabled=true >
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPassword3" class="col-sm-2 control-label">TELÉFONO</label>
                        <div class="col-sm-10">
                              <input type="text" name="varTelfUsua"   id="telefono" placeholder="TELEFONO" class="form-control" >
                            
                        </div>
                    </div>

                    <div class="form-group  row" style="display: none">
                        <label for="inputPassword3" class="col-sm-2 control-label">ESTADO</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="estado">
                                <option value="ACT">ACTIVO</option>
                                <option value="INA">INACTIVO</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-success" id="actualizar"><i class="fas fa-sync-alt"></i> Actualizar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="far fa-times-circle"></i>
                        Cerrar</button>
                </div>
                    </form>
            </div>
        
    </div>
</div>