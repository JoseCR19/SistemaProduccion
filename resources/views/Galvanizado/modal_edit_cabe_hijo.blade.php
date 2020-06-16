<div class="modal fade bd-example-modal-lg"  data-backdrop="static" data-keyboard="false"  id="modal-edit-cabe-hijo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header"  id="close">
                <h5 class="modal-title" id="exampleModalLabel">EDITAR GALVANIZADO HIJOS</h5>

            </div>
            <div class="modal-body" >
                <div class="row">
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group">                        
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">SEMANA PERIODO</label>
                            <input type="text" class="form-control" id="nomb_peri_valor" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group">                        
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO GALVANIZADO</label>
                            <input type="text" class="form-control" id="tipo_galv_agre_edit"  style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <input type="text" class="form-control" id="idGalv_edit_hijo" style="height: 28px;line-height: 1rem !important;display:none" disabled="true">
                        <input type="text" class="form-control" id="idGalv_deta_edit_hijo" style="height: 28px;line-height: 1rem !important;display:none" disabled="true">
                        <div class="form-group md-3 mb-sm-0">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">N°GANCHERA</label>
                            <input type="number" class="form-control" id="ganch_edit_hijo" style="height: 28px;line-height: 1rem !important;">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group">                        
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TIPO MATERIAL</label>                           

                            <div  id='tipo_mate_edit_hijo' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group">                        
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">TURNO</label>
                            <div  id='turno_edit_hijo' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">FECHA INGRESO</label>
                            <input type="date" class="form-control" id="fecha_ingr_agre_edit_hijo" style="height: 28px;line-height: 1rem !important;">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">FECHA SALIDA</label>
                            <input type="date" class="form-control" id="fecha_salida_agre_edit_hijo" style="height: 28px;line-height: 1rem !important;">
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">HORA ENTRADA</label>
                         
                              <div  id='hora_entra_agre_edit_hijo' class="col-11">
                            </div>
                        
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">HORA SALIDA</label>
                         
                          <div  id='hora_sali_agre_edit_hijo' class="col-11">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12" id="mostrar_nombre_gal_edit">PESO NEGRO</label>
                             <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12" id="mostrar_nombre_flu_edit">PESO GALVANIZADO</label>
                            <input type="number" class="form-control" id="peso_negr_agre_edit_hijo" style="height: 28px;line-height: 1rem !important;">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12" id="mostrar_nombre_gal_edit_2">PESO GALVANIZADO</label>
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12" id="mostrar_nombre_flu_edit_2">PESO FLUXADO</label>
                            <input type="number" class="form-control" id="peso_galv_agre_edit_hijo" style="height: 28px;line-height: 1rem !important;">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6 hidde_grid">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">CONSUMO ZINC</label>
                            <input type="text" class="form-control" id="consu_zinc_agre_edit_hijo" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-8 col-sm-5 col-6 hidde_grid">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12"> CONSUMO(%)</label>
                            <input type="text" class="form-control" id="consu_porc_agre_edit_hijo" style="height: 28px;line-height: 1rem !important;" disabled="true">
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-8 col-sm-5 col-6">
                        <div class="form-group ">
                            <label for="inputPassword3" style="font-weight:500 !important" class="col-lg-12 col-md-12 col-sm-6 col-12">CANTIDAD</label>
                            <input type="number" class="form-control" id="canti_galv_agre_edit_hijo" style="height: 28px;line-height: 1rem !important;">
                            <input type="number" class="form-control" id="canti_galv_alma_edit_hijo" style="height: 28px;line-height: 1rem !important;display:none">
                            <input type="number" class="form-control" id="canti_hijo_alma_edit_hijo" style="height: 28px;line-height: 1rem !important;display:none">
                        </div>
                    </div>


                </div>

            </div>
            <div class="modal-footer" >

                <button type="button" class="btn btn-danger mr-2"  id="agre_galv_boton_edit_hijo" >
                    <i class="far fa-save"></i>
                    Guardar</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="close_galv_agre_edit_hijo">
                    <i class="far fa-times-circle"></i>
                    Cerrar</button>

            </div>
        </div>
    </div>
</div>