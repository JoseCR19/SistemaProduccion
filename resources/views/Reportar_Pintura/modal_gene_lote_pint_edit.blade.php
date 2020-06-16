<div class="modal fade" id="modal-gene-lote-pintura-edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div class="col">
                    <h5>AGREGAR LOTE PINTURA :</h5>      
                </div>
                <div class="col">
                    <input type="text" class="form-control form-control-sm col-lg-4" id="id_lote_pintura" disabled="true" style="display: none;background: white;border: 0px;font-size: 22px;margin-top: -2px;">
                    <input type="text" class="form-control form-control-sm col-lg-8" id="id_lote_pintura_label" disabled="true" style="display: flex;background: white;border: 0px;font-size: 22px;margin-top: -2px;">
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">O.T</label>
                            <input type="text" class="form-control form-control-sm" id="proy_ot_gene_lote_pint_value_edit" disabled="true" style="display:none">
                            <input type="text" class="form-control form-control-sm" id="proy_ot_gene_lote_pint_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">ELEMENTO</label>
                            <input type="text" class="form-control form-control-sm" id="tipo_elem_gene_lote_pint_value_edit" disabled="true" style="display:none">
                            <input type="text" class="form-control form-control-sm" id="tipo_elem_gene_lote_pint_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">PESO NETO TOTAL</label>
                            <input type="number" class="form-control form-control-sm" id="peso_neto_tota_gene_lote_pint_edit" disabled="true">
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">AREA PINTURA</label>
                            <input type="text" class="form-control form-control-sm" id="pintura_gene_lole_edit" disabled="true" style="display:none">
                            <input type="number" class="form-control form-control-sm" id="area_pint_gene_lote_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">AREA TOTAL</label>
                            <input type="number" class="form-control form-control-sm" id="area_tota_lote_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">CABINA</label>
                            <div id="cabi_gene_lote_pint_edit" class="form-control form-control-sm" ></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">FECHA INICIO</label>
                                <input type="date" class="form-control form-control-sm" id="fecha_inicio_gene_lote_edit" disabled="true">
                            </div>

                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">FECHA FINAL</label>
                            <input type="date" class="form-control form-control-sm" id="fecha_final_gene_lote_edit" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <label for="exampleFormControlInput1">CONTRATISTA</label>
                        <div id="contratista_avance_lote_pint_edit" class="form-control form-control-sm" disabled="true"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 hidde_grid" id="mostrar_pintor_edit">
                        <label for="exampleFormControlInput1">PINTOR</label>
                        <div id="pintor_gene_lote_pint_edit" class="form-control form-control-sm"></div>
                    </div>
                    <div class="col">
                        <div class="col">
                            <div class="form-group">
                                <label for="exampleFormControlInput1">OBSERVACION</label>
                                <textarea type="text" class="form-control form-control-sm" id="obse_gene_lote_edit"></textarea>
                            </div>
                        </div>
    <!-- contratista_avance_lote_pint_edit <input type="text" class="form-control form-control-sm" id="cant_total_lote_pint_edit" disabled="true" style="display:none">-->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary ml-6" id="guardar_gene_lote_pint_edit"><i class="fas fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btn_cerrar_gene_pint_edit"><i class="fas fa-times-circle"></i>cerrar</button>
            </div>

        </div>
    </div>
</div>