<div class="modal fade" id="modal-gene-lote-pintura" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"  data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content card-info card">
            <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel">Generar Lote</h5>
                <div class="col-lg-10 col-md-10 col-sm-12 col-12">
                    <div style="float: right;margin-left: 5px" >
                        <input type="text" class="form-control" id="lote_pintura" style="width: 100px;height: 30px;line-height: 1rem !important;" disabled="true">
                    </div>
                </div> 
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">O.T</label>
                            <input type="text" class="form-control form-control-sm" id="proy_ot_gene_lote_pint_value" disabled="true" style="display:none">
                            <input type="text" class="form-control form-control-sm" id="proy_ot_gene_lote_pint" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">ELEMENTO</label>
                            <input type="text" class="form-control form-control-sm" id="tipo_elem_gene_lote_pint_value" disabled="true" style="display:none">
                            <input type="text" class="form-control form-control-sm" id="tipo_elem_gene_lote_pint" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">PESO NETO TOTAL</label>
                            <input type="text" class="form-control form-control-sm" id="peso_neto_tota_gene_lote_pint" disabled="true">
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">AREA PINTURA</label>
                            <input type="text" class="form-control form-control-sm" id="pintura_gene_lole" disabled="true" style="display:none">
                            <input type="text" class="form-control form-control-sm" id="area_pint_gene_lote" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">AREA TOTAL</label>
                            <input type="text" class="form-control form-control-sm" id="area_tota_lote" disabled="true">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">CABINA</label>
                            <div id="cabi_gene_lote_pint" class="form-control form-control-sm"></div>
                        </div>    

                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">FECHA INICIO</label>
                            <input type="date" class="form-control form-control-sm" id="fecha_inicio_gene_lote">
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">FECHA FINAL</label>
                            <input type="date" class="form-control form-control-sm" id="fecha_final_gene_lote">
                            <input type="text" class="form-control form-control-sm" id="cant_total_lote_pint" disabled="true" style="display:none">
                        </div>      
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">CONTRATISTA</label>
                            <div id="contratista_avance_lote_pint" class="form-control form-control-sm"></div>
                        </div>        

                    </div>

                </div>
                <div class="row">

                    <div class="col-lg-4 hidde_grid" id="mostrar_pintor">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">PINTOR</label>                         
                            <div id="pintor_gene_lote_pint" class="form-control form-control-sm"></div>
                        </div>   
                    </div>

                    <div class="col">
                        <div class="form-group">
                            <label for="exampleFormControlInput1">OBSERVACION</label>
                            <textarea type="text" class="form-control form-control-sm" id="obse_gene_lote"></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">

                <button type="button" class="btn btn-primary ml-6" id="guardar_gene_lote_pint"><i class="fas fa-save"></i>Guardar</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" id="btn_cerrar_gene_pint"><i class="fas fa-times-circle"></i>cerrar</button>
            </div>
        </div>
    </div>
</div>