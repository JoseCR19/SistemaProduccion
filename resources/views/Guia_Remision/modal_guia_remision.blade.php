<div class="modal fade bd-example-modal-xl" id="modal-guia_remision" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static" style="overflow-y: scroll;">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header"  id="close">
                <h5 class="modal-title" id="exampleModalLabel">Guía de Remisión</h5>
                <div class="col-lg-10 col-md-10 col-sm-12 col-12">
                    <div style="float: right;margin-left: 5px"  >
                        <button class="btn btn-block btn-primary btn-sm" type="button"  id="close_documento">
                            <i class="far fa-times-circle"></i>
                        </button>
                    </div>
                    <div style="float: right;margin-left: 5px">
                        <button class="btn btn-block btn-primary btn-sm" type="button"  id="numero_documento">
                            <i class="far fa-edit"></i>
                        </button>
                        <button class="btn  btn-primary btn-sm hidde_grid" type="button"  id="guardar_documento">
                            <i class="far fa-save"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control hidde_grid" id="ot_adquirida" style="width: 100px;height: 30px;line-height: 1rem !important;">
                    <div style="float: right; margin-left: 5px" >
                        <input type="text" class="form-control" id="documento" style="width: 100px;height: 30px;line-height: 1rem !important;" disabled="true">
                    </div>
                    <div style="float: right;margin-left: 5px" >
                        <input type="text" class="form-control" id="serie" style="width: 100px;height: 30px;line-height: 1rem !important;" disabled="true">
                    </div>

                </div>
            </div>
            <div class="modal-body card-body">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <fieldset style="border: 1px solid #648be052; padding: 6px;border-radius: 3px;">
                            <legend style="border-radius: 2px;font-size: 18px;font-weight: inherit;padding: 3px 5px 3px 7px;width: auto;margin-bottom: 0px !important">Datos</legend>
                            <div class="row">
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6" >
                                    <div class="form-group" id="fecha_i_reproceso" style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">F.Emisión</label>
                                        <div class="col-12">
                                            <input type="date" class="form-control" id="fech_inic_reproceso" style="width: 100%;height: 30px;line-height: 1rem !important;" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6" >
                                    <div class="form-group" id="fecha_f_reproceso" style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">F.Traslado</label>
                                        <div class="col-12">
                                            <input type="date" class="form-control" id="fech_fin_reproceso" style="width: 100%;height: 30px;line-height: 1rem !important;">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">T.Reporte</label>
                                        <div style='float: left;' id='tipo_reporte' class="col-11">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 2px !important" >
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Motivo</label>
                                        <div style='float: left;' id='motivo' class="col-11">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="form-group" style="margin-bottom: 2px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Otros:</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control" id="otros_input" placeholder="Otros" require style="width: 100%;height: 30px;line-height: 1rem !important;" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                                    <div class="form-group" style="margin-bottom: 2px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Referencia:</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="codigo_referencia" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;">
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
                                            <input type="text" class="form-control " id="id_despacho" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">O.T</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_ot" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">T.Elemento</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_te" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">RUC</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_ruc" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-4">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Razón Social</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="id_raz" placeholder="Referencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group"  style="margin-bottom: 2px !important">
                                        <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Planta</label>
                                        <div style='float: left;' id='planta' class="col-11">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                                    <div class="form-group"  style="margin-bottom: 2px !important">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Departamento</label>
                                                <div style='float: left;' id='departamento_partida' class="col-11">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Provincia</label>
                                                <div style='float: left;' id='provincia_partida' class="col-11">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Distrito</label>
                                                <div style='float: left;' id='distrito_partida' class="col-11">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Punto Partida</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="punto_partida" placeholder="Punto de Partida" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-4 col-sm-4 col-6">
                                    <div class="form-group"  style="margin-bottom: 2px !important">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Departamento</label>
                                                <div style='float: left;' id='departamento' class="col-11">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Provincia</label>
                                                <div style='float: left;' id='provincia' class="col-11">
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Distrito</label>
                                                <div style='float: left;' id='distrito' class="col-11">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Punto de llegada</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="punto_llegada" placeholder="Punto de Partida" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" >
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
                                        <div style='float: left;' id='transportista' class="col-11">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">RUC</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="ruc_transportista" placeholder="RUC" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" disabled="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Chofer</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="chofer" placeholder="Chofer" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Documento Identidad</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="ruc_chofer" placeholder="Documento" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" maxlength="12">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Licencia</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="licencia" placeholder="Licencia" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" maxlength="12" >
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                                    <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                                        <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Placa</label>
                                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <input type="text" class="form-control " id="placa" placeholder="Placa" require style="width: 100%;height: 30px;line-height: 1rem !important;font-size: 12px !important" >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                        <div class="form-group"  style="margin-bottom: 2px !important">
                            <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Tipo Grupo</label>
                            <div style='float: left;' id='tipo_gupo_estructura' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                        <div class="form-group"  style="margin-bottom: 2px !important">
                            <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Zona</label>
                            <div style='float: left;' id='zona' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                        <div class="form-group"  style="margin-bottom: 2px !important">
                            <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Bulto</label>
                            <div style='float: left;' id='bulto' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                        <div class="form-group"  style="margin-bottom: 2px !important">
                            <label for="inputPassword3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important" class="col-lg-12 col-md-12 col-sm-12 col-12">Modelo</label>
                            <div style='float: left;' id='modelo_codigo' class="col-11">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2 col-6">
                        <div class="form-group" style="margin-bottom: 0px !important;margin-top: 0px !important">
                            <label for="inputEmail3" style="font-weight:500 !important;margin-bottom: 0px !important;font-size: 15px !important;" class="col-lg-12 col-md-12 col-sm-12 col-12">Titulo</label>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                                <input type="text" class="form-control " id="combinacion" placeholder="titulo" require style="width: 110%;height: 30px;line-height: 1rem !important;font-size: 12px !important" maxlength="60" >
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <div class="float-right  mt-4" >
                            <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_despachos">
                                <i class="fas fa-search "></i> Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="hidde_grid" id="grilla_despacho_detalle">
                    <div id='jqxWidget'  style="margin-top: 5px !important">
                        <div id="griddespacho"></div>
                        <!--<div id="grid4"></div>-->
                        <div style="margin-top: 30px;">
                            <div id="cellbegineditevent"></div>
                            <div style="margin-top: 10px;" id="despacho_detalle"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-12">
                        <div class="float-right mr-3" id="cerrar_modal_2" >
                            <button type="button" class="btn btn-block btn-primary btn-sm" style="margin-top:8px;">
                                <i class="far fa-times-circle" ></i>
                                Cerrar</button>
                        </div>
                        <div class="float-right mr-3" >
                            <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_registrar" style="margin-top:8px;">
                                <i class="fas fa-plus "></i> Registrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>