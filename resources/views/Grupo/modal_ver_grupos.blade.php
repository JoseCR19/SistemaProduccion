<div class="modal fade bd-example-modal-xl" id="modal-ver-grupos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content card-info card">
             <div class="modal-header card-header">
                <h5 class="modal-title" id="exampleModalLabel"></h5>
                <button type="button" class="close"  id="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" >
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">PLANTA</label>
                            <input class="form-control" id="planta_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">ARMADOR</label>
                            <input class="form-control" id="armador_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">CONTRATA</label>
                            <input class="form-control" id="contrata_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">ETAPA</label>
                            <input class="form-control" id="etapa_ver" disabled="true">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">

                            <label for="inputPassword3" style="font-weight:500 !important">O.T</label>
                            <input class="form-control" id="ot_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">

                            <label for="inputPassword3" style="font-weight:500 !important">TIPO PRODUCTO</label>
                            <input class="form-control" id="pro_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">

                            <label for="inputPassword3" style="font-weight:500 !important">ZONA</label>
                            <input class="form-control" id="zon_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">

                            <label for="inputPassword3" style="font-weight:500 !important">PROGRAMA</label>
                            <input class="form-control" id="prog_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">

                            <label for="inputPassword3" style="font-weight:500 !important">GRUPO</label>
                            <input class="form-control" id="grup_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-1">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">PESO</label>
                            <input class="form-control" id="prec_ver" disabled="true">
                        </div>
                    </div>
                    <div class="col-md-1">
                        <div class="form-group">
                            <label for="inputPassword3" style="font-weight:500 !important">CANT.ELEM.</label>
                            <input class="form-control" id="cant_elem_ver" disabled="true">
                        </div>
                    </div>
                </div>
                <div id='jqxWidget'>
                    <div id="grid4"></div>

                </div>
            </div>
            <div class="modal-footer" style="justify-content: flex-start !important">
                <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                    <div class="form-group">
                        <label for="inputPassword3" style="font-weight:500 !important">FECHA INICIO</label>
                        <input type="date" class="form-control" id="fech_inic_grup_ver"  require disabled="true" value="">
                        <code  id="inicio">NO TIENE</code>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                    <div class="form-group">
                        <label for="inputPassword3" style="font-weight:500 !important">FECHA TERMINO</label>
                        <input type="date" class="form-control" id="fech_fin_grup_ver"  require disabled="true" value="">
                        <code  id="termino">NO TIENE </code>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" >
                    <div class="form-group" id="fecha_termino">
                        <label for="inputPassword3" style="font-weight:500 !important">FECHA TERMINO REAL</label>
                        <input type="date" class="form-control" id="fech_term_grup_ver"  require disabled="true" value="">
                        <code  id="real">NO TIENE </code>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-md-4 col-sm-4 col-5" >
                   
                </div>
                
               <div class="col-lg-2 col-md-3 col-md-3 col-sm-4 col-2">
                  
                        <label for="inputPassword3" style="font-weight:500 !important;color: white !important">.</label>
                        <button type="button" class="btn btn-danger" data-dismiss="modal" id="close" style="margin-top: 8px;">
                            <i class="far fa-times-circle"></i>
                            Cerrar</button>
                    
                </div>
            </div>
        </div>
    </div>
</div>