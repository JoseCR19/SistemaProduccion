<div class="modal fade bd-example-modal-xl" id="modal-guia-edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" style="overflow-y: scroll;">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header"  id="close">
                <h5 class="modal-title" id="exampleModalLabel">Editar Guia</h5>
                <div class="col-lg-10" >
                 
                    <div style="float: right; margin-left: 5px" >
                        <input type="text" class="form-control" id="documento_edit" style="width: 140px;height: 30px;line-height: 1rem !important;" disabled="true">
                        
                    </div>
                </div>
            </div>
            <div class="modal-body card-body">
                <div class="row">
                     <input type="text" class="form-control" id="documento_idGuia" style="width: 140px;height: 30px;line-height: 1rem !important; display:none" disabled="true">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <fieldset style="border: 1px solid #648be052; padding: 6px;border-radius: 3px;">
                            <legend style="border-radius: 2px;font-size: 18px;font-weight: inherit;padding: 3px 5px 3px 7px;width: auto;margin-bottom: 0px !important">Datos</legend>
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6" >
                                    <div class="form-group" id="fecha_i_reproceso" style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">F.Emisión</label>
                                        <div class="col-12">
                                            <input type="date" class="form-control" id="fech_emision_edit_guia" style="width: 106%;height: 30px;line-height: 1rem !important;" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6" >
                                    <div class="form-group" id="fecha_f_reproceso" style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">F.Traslado</label>
                                        <div class="col-12">
                                            <input type="date" class="form-control" id="fech_fin_edit_guia" style="width: 100%;height: 30px;line-height: 1rem !important;">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">T.Reporte</label>
                                        <input type="text" class="form-control" id="tipo_reporte_edit_guia" style="width: 80%;height: 30px;line-height: 1rem !important;" disabled="true">                                
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 2px !important" >
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Motivo</label>
                                        <div style='float: left;' id='motivo_edit_guia' class="col-11">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="form-group" style="margin-bottom: 2px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Otros:</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control" id="otros_input_edit_guia" placeholder="Otros" require style="width: 100%;height: 30px;line-height: 1rem !important;">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="form-group" style="margin-bottom: 2px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Referencia:</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="codigo_referencia_guia_edit" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12" style="margin-top: 5px !important">
                        <fieldset style="border: 1px solid #648be052; padding: 6px;border-radius: 3px">
                            <legend style="border-radius: 2px;font-size: 18px;font-weight: inherit;padding: 3px 5px 3px 7px;width: auto;margin-bottom: 0px !important">Datos Despacho</legend>
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Nro. Despacho</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_despacho_guia_edit" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">O.T</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_ot_guia_edit" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">T.Elemento</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_tipoelem_guia_edit" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">RUC</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_ruc_guia_edit" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Razón Social</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_raz_guia_edit" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                               
                                <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                    <div class="form-group"  style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;color: white" class="col-lg-12 col-md-12 col-sm-12 col-12">.</label>
                                        <div class="row">
                                            <div class="col-md-4">
                                                  <input type="text" class="form-control " id="departamento_part_guia_edit" placeholder="Referencia"  style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                            </div>
                                            <div class="col-md-4">
                                                 <input type="text" class="form-control " id="provincia_part_guia_edit" placeholder="Referencia" style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control " id="distrito_part_guia_edit" placeholder="Referencia" style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;color: white" class="col-lg-12 col-md-12 col-sm-12 col-12">.</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="punto_partida_guia_edit" placeholder="Punto de Partida" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-4 col-sm-4 col-6">
                                    <div class="form-group"  style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Punto de llegada</label>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <div style='float: left;' id='departamento_llegada_edit' class="col-11">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div style='float: left;' id='provincia_llegada_edit' class="col-11">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div style='float: left;' id='distrito_llegada_edit' class="col-11">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;color: white" class="col-lg-12 col-md-12 col-sm-12 col-12">.</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="punto_llegada_guia_edit" placeholder="Punto de Partida" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12" style="margin-top: 5px !important">
                        <fieldset style="border: 1px solid #648be052; padding: 6px;border-radius: 3px">
                            <legend style="border-radius: 2px;font-size: 18px;font-weight: inherit;padding: 3px 5px 3px 7px;width: auto;margin-bottom: 0px !important">Transportista</legend>
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group"  style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Transportista</label>
                                        <div style='float: left;' id='transportista_guia_edit' class="col-11">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;color: white" class="col-lg-12 col-md-12 col-sm-12 col-12">.</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="ruc_transportista_edit" placeholder="RUC" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Chofer</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="chofer_guia_edit" placeholder="Chofer" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Documento Identidad</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="ruc_chofer_guia_edit" placeholder="Documento" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" maxlength="12">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Licencia</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="licencia_guia_edit" placeholder="Licencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" maxlength="12" >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Placa</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="placa_guia_edit" placeholder="Placa" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
               
                
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="float-right mr-3" id="cerrar_modal_edit" >
                            <button type="button" class="btn btn-block btn-primary btn-sm" style="margin-top:8px;">
                                <i class="far fa-times-circle" ></i>
                                Cerrar</button>
                        </div>
                        <div class="float-right mr-3" >
                            <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_actualizar_guia_edit" style="margin-top:8px;">
                                <i class="fas fa-save"></i> Actualizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>