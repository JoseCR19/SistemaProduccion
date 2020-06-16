<div class="modal fade" id="modal-observacion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">OBSERVACION</h5>              
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-3 col-sm-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="inlineRadioOptionsmodal" id="inlineRadio11" value="1" checked>
                            <label class="form-check-label">No conforme</label>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="inlineRadioOptionsmodal" id="inlineRadio22" value="2" >
                            <label class="form-check-label">Observación Menor</label>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 col-sm-6 mt-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">REPONSABLE</label>
                            <div id="idrespo_obser" class="form-control form-control-sm"></div>
                        </div>
                    </div>
                    <div class="col-3  col-sm-3 mt-2">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">FECHA</label>
                            <input type="date" class="form-control form-control-sm" id="fecha_inicio_obser">
                        </div>
                    </div>
                    <div class="col-3 col-sm-3 mt-1">
                        <label for="exampleFormControlInput1" id="mostrar_ot">OT</label>
                        <label for="exampleFormControlInput1" id="mostrar_os">OS</label>
                        <div class="form-group">  
                            <input type="text" class="form-control form-control-sm" id="ot_os_obsev_value" disabled="true" style="display:none">
                            <input type="text" class="form-control form-control-sm" id="ot_os_obsev" disabled="true" >
                        </div>
                    </div>


                </div>
                <div class="row">
                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">CLIENTE</label>
                            <input type="text" class="form-control form-control-sm" id="clie_obser" disabled="true">
                        </div>
                    </div>
                    <div class="col-3 col-sm-3" id="mostrar_guia_observ">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">GUIA</label>
                            <input type="text" class="form-control form-control-sm" id="guia_obser" disabled="true" >

                        </div>
                    </div>

                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">Ganchera</label>                       
                            <input type="number" class="form-control form-control-sm" id="num_ganch" disabled="true">
                        </div>
                    </div>
                    <div class="col-3  col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">TIPO MATERIAL</label>
                            <input type="text" class="form-control form-control-sm" id="tipo_mate_insp_obse" disabled="true">
                        </div>
                    </div>


                </div>
                <div class="row">
                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">MATERIA</label>
                            <input type="text" class="form-control form-control-sm" id="mate_insp_obse">
                        </div>
                    </div>
                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">CANTIDAD</label>
                            <input type="number" class="form-control form-control-sm" id="canti_insp_obse" disabled="true">
                        </div>
                    </div>
                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1" class="text-nowrap" id="cantidad_"></label>
                            <input type="number" class="form-control form-control-sm" id="canti_no_confo">
                        </div>
                    </div>
                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1" id="peso_"></label>
                            <input type="number" class="form-control form-control-sm" id="peso_observado" >
                        </div>      
                    </div>



                </div>
                <div class="row">
                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">DEFECTO</label>
                            <div id="idefecto_obser" class="form-control form-control-sm"></div>
                        </div>
                    </div>
                    <div class="col-3 col-sm-3">
                        <div class="form-group col-sm-3">
                            <label for="exampleFormControlInput1">CAUSA</label>
                            <div id="idcausa_obser" class="form-control form-control-sm"></div>
                        </div>
                    </div>
                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">ACCION</label>
                            <input type="text" class="form-control form-control-sm" id="accion_insp">
                        </div>      
                    </div>
                    <div class="col-3 col-sm-3">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">ORIGEN FALLA</label>
                            <input type="text" class="form-control form-control-sm" id="orig_fall">
                        </div>      
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">OBSERVACION</label>
                            <textarea type="text" class="form-control form-control-sm" id="obse_gene_lote"></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary ml-6" id="guardar_observ"><i class="fas fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btn_cerrar_obser"><i class="fas fa-times-circle"></i>cerrar</button>
            </div>
        </div>
    </div>
</div>