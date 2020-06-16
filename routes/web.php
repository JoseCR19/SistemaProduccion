<?php

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
 */

Route::get('/', ['as' => 'login', 'uses' => 'Login@index']);
Route::get('Principal', ['as' => 'principal_dashboard', 'uses' => 'Main@index']);
Route::get('Recuperar_contrasena');
Route::get('Olvidar_contrasena', ['as' => 'recuperar_pass', 'uses' => 'UserController@recuperarcontrasena']);
Route::get('clave/{id?}', 'UserController@valiurlrecucontra')->where('id', '(.*)');
Route::get('Redireccionar', ['as' => 'redireccionar', 'uses' => 'UserController@redireccionar']);
Route::get('MANT_ENTI', ['as' => 'MANT_ENTI', 'uses' => 'Main@entidad']);
Route::get('ASIG_PROY', ['as' => 'ASIG_PROY', 'uses' => 'Main@proyecto']);
Route::get('CLIENTES', ['as' => 'clientes', 'uses' => 'Sincronizar@listar_cliente']);
Route::get('MANT_AGRUP', ['as' => 'MANT_AGRUP', 'uses' => 'Main@agrupacion']);
Route::get('MANT_PART', ['as' => 'MANT_PART', 'uses' => 'Main@partlist']);
Route::get('MANT_TIP_ETP', ['as' => 'MANT_TIP_ETP', 'uses' => 'Main@tipo_etapa']);
Route::get('MANT_ETP', ['as' => 'MANT_ETP', 'uses' => 'Main@etapa']);
Route::get('MANT_ARM', ['as' => 'MANT_ARM', 'uses' => 'Main@armadores']);
Route::get('ASIG_ETAP_PROY', ['as' => 'ASIG_ETAP_PROY', 'uses' => 'Main@asignar_etapa']);
Route::post('VALIDAR', ['as' => 'VALIDAR', 'uses' => 'Part_listController@validar_part_list']);
Route::post('ACTUALIZAR', ['as' => 'ACTUALIZAR', 'uses' => 'Part_listController@actualizar_ot']);
Route::post('REGISTRAR_COMPONENTE', ['as' => 'REGISTRAR_COMPONENTE', 'uses' => 'Part_listController@registrar_componente']);
Route::post('ACTUALIZAR_COMPONENTE', ['as' => 'ACTUALIZAR_COMPONENTE', 'uses' => 'Part_listController@actualizar_componente']);
Route::post('VALIDAR_CAMPOS', ['as' => 'VALIDAR_CAMPOS', 'uses' => 'Part_listController@validar_campos']);
Route::get('MANT_COLA_AGRU', ['as' => 'MANT_COLA_AGRU', 'uses' => 'Colaborador@list_cola_agru']);
Route::get('ASIG_LIST_OT', ['as' => 'ASIG_LIST_OT', 'uses' => 'Main@listar_ot']);
Route::get('ASIG_ETAP_RUTA', ['as' => 'ASIG_ETAP_RUTA', 'uses' => 'Main@listar_rutas_etapas']);
Route::get('ASIG_RUTA_PROD', ['as' => 'ASIG_RUTA_PROD', 'uses' => 'Main@asignar_ruta_produccion']);
Route::get('ASIG_LIST_OT_PIVO', ['as' => 'ASIG_LIST_OT_PIVO', 'uses' => 'Pivot@listar_ot_pivot']);
Route::get('MANT_PERI_VALO', ['as' => 'MANT_PERI_VALO', 'uses' => 'Periodo@crea_peri_valo']);
Route::get('MANT_CONT_AGRU', ['as' => 'MANT_CONT_AGRU', 'uses' => 'Contratista@list_cont_agru']);
Route::get('ASIG_PREC_ESPE', ['as' => 'ASIG_PREC_ESPE', 'uses' => 'Main@asingar_precio_especifico']);
Route::get('ASIG_PREC_ESPE', ['as' => 'ASIG_PREC_ESPE', 'uses' => 'Main@asingar_precio_especifico']);
Route::get('ASIG_COST', ['as' => 'ASIG_COST', 'uses' => 'Main@asignar_costos']);
Route::post('VALIDAR_PRECIO', ['as' => 'VALIDAR_PRECIO', 'uses' => 'Precio_Especifico@validar_precio_especifico']);
Route::post('VALIDAR_PRECIO_COSTO', ['as' => 'VALIDAR_PRECIO_COSTO', 'uses' => 'Precio_Costo@validar_precio_costo']);
Route::get('REPO_SEGU_GRUP', ['as' => 'REPO_SEGU_GRUP', 'uses' => 'Grupo@segu_grup']);
Route::get('ASIG_GRUP', ['as' => 'ASIG_GRUP', 'uses' => 'Main@asignar_grupos']);
Route::get('proforma/tablero/pdf/{idProforma}/{idPaquete}/{idProducto}/{cod_proyecto}/{cod_tarea}/{cod_grup}/{user}', ['as' => 'PDF', 'uses' => 'Generar_pdf@pdf_componentes']);
Route::get('valorizacion/contratista/{id_ot}/{producto}/{etapa}/{planta}/{etapa_actual}/{codigo_elemento}/{contratista}/{semana_inicio}/{semana_final}/{tipo_reporte}/{user}/{semana_inicio_label}/{semana_fin_label}', ['as' => 'PDF_CONTRATISTA', 'uses' => 'Generar_pdf@pdf_contratista']);

Route::post('planos', ['as' => 'planos', 'uses' => 'Generar_pdf@pdf_planos']);
Route::get('MANT_CHOF', ['as' => 'MANT_CHOF', 'uses' => 'Chofer@list_chofer']);
Route::get('PROD_REPO_AVAN', ['as' => 'PROD_REPO_AVAN', 'uses' => 'Avance@repo_avan']);

Route::get('MANT_TRAN', ['as' => 'MANT_TRAN', 'uses' => 'Transportista@list_tran']);
Route::get('MANT_MOTI', ['as' => 'MANT_MOTI', 'uses' => 'Motivo@list_moti']);
Route::get('REPO_WIP', ['as' => 'REPO_WIP', 'uses' => 'Main@wip']);
Route::get('MANT_MAQU', ['as' => 'MANT_MAQU', 'uses' => 'Maquina@list_maqu']);
Route::get('REPO_VAL', ['as' => 'REPO_VAL', 'uses' => 'Main@valorizacion']);
route::get('VER_NOTI', ['as' => 'VER_NOTI', 'uses' => 'Main@notificacion']);
Route::get('PROD_VALO', ['as' => 'PROD_VALO', 'uses' => 'Valorizacion@list_valo']);
Route::get('MANT_TIPO_ESTR', ['as' => 'MANT_TIPO_ESTR', 'uses' => 'TipoEstructura@list_ViewTipoEstructura']);
Route::post('GUARDAR_FOTO_PERFIL', ['as' => 'GUARDAR_FOTO_PERFIL', 'uses' => 'Foto_PerfilController@guardar_foto_perfil']);
Route::get('MANT_TIPO_ESTRUCT', ['as' => 'MANT_TIPO_ESTRUCT', 'uses' => 'TipoEstructurado@list_ViewTipoEstructurado']);
Route::get('MANT_TIPO_GRUPO', ['as' => 'MANT_TIPO_GRUPO', 'uses' => 'TipoGrupo@list_ViewTipoGrupo']);
Route::get('LIBE_LIBE', ['as' => 'LIBE_LIBE', 'uses' => 'Main@liberacion']);
Route::get('REPO_SEGU_PINT', ['as' => 'REPO_SEGU_PINT', 'uses' => 'Main@Reporte_seguimiento_pintura']);
//mis rutas
Route::get('REPR_REPR', ['as' => 'REPR_REPR', 'uses' => 'Reproceso@regi_reproceso']);
Route::post('GUARDAR_DETALLE_REPROCESO', ['as' => 'GUARDAR_DETALLE_REPROCESO', 'uses' => 'Reproceso@guardar_detalle_reproceso']);
Route::get('reproceso/pdf/{ot}/{codigoproducto}/{idreproceso}/{canti}/{etapaorigen}/{etapadestino}/{pesos}/{motivo}/{observacion}/{acti_usua}/{acti_hora}/{estado}/{user}', ['as' => 'PDF_REPROCESO', 'uses' => 'Generar_pdf@pdf_reproceso'])->where('ot', '(.*)');
Route::get('MANT_TAB_DEFEC', ['as' => 'MANT_TAB_DEFEC', 'uses' => 'Defecto@list_ViewDefecto']);
//CAUSA
Route::get('MANT_CAUSA',['as'=>'MANT_CAUSA','uses'=>'Causa@list_caus']);



Route::get('LECTOR_QR', ['as' => 'LECTOR_QR', 'uses' => 'Main@qr']);

Route::get('DESP_DESP',['as'=>'DESP_DESP','uses'=>'Main@rotulo']);
Route::get('generacion/pdf/{data}/{tipo_reporte}/{tipo_rotulo}', ['as' => 'PDF_QR', 'uses' => 'Generar_pdf@pdf_qr'])->where('data', '(.*)');


Route::post('GUARDAR_DETALLE_PROYECTO', ['as' => 'GUARDAR_DETALLE_PROYECTO', 'uses' => 'Proyecto@guardar_detalle_detalle']);
Route::get('generacion/pdf_qr_portatil/{proyecto}/{intIdTipoProducto}/{intIdProyZona}/{intIdProyTarea}/{varModelo}/{varBulto}/{tipo}', ['as' => 'PDF_QR_2', 'uses' => 'Generar_pdf@pdf_qr_2'])->where('data', '(.*)');
Route::get('GENE_DESP',['as'=>'GENE_DESP','uses'=>'Main@generar_despacho']);
Route::get('GENE_GUIA',['as'=>'GENE_GUIA','uses'=>'Main@generar_guia']);

//REPORTE LIBERACION 
Route::get('REPO_LIBE', ['as' => 'REPO_LIBE', 'uses' => 'Main@Reporte_liberacion']);
Route::get('guias/pdf/{id_guia}/{tipo_reporte}', ['as' => 'PDF_GUIA', 'uses' => 'Generar_pdf@generar_guia_remision'])->where('id_guia', '(.*)');


//



//LISTAR GUIA EMITIDA
Route::get('LIST_GUIA', ['as' => 'LIST_GUIA', 'uses' => 'Guia@listar_guia']);
Route::post('GUARDAR_GUIA_EMITIDA', ['as' => 'GUARDAR_GUIA_EMITIDA', 'uses' => 'Guia@guardar_guia_emitida']);

//LISTAR GUIA RECIBIDA
Route::post('GUARDAR_GUIA_RECIBIDA', ['as' => 'GUARDAR_GUIA_RECIBIDA', 'uses' => 'Guia@guardar_guia_recibida']);

//pdf de la guia emitida
Route::post('pdf_guia_emitida', ['as' => 'pdf_guia_emitida', 'uses' => 'Guia@pdf_guia_emitida']);
Route::post('pdf_guia_recepcionada', ['as' => 'pdf_guia_recepcionada', 'uses' => 'Guia@pdf_guia_recepcionada']);


// SUBIR  DESPACHO EMIT  y RECEPCIONADO ANDY

Route::post('GUARDAR_DESPA_EMIT', ['as' => 'GUARDAR_DESPA_EMIT', 'uses' => 'Guia@guardar_despa_emit']);
Route::post('GUARDAR_DESPA_RECEP', ['as' => 'GUARDAR_DESPA_RECEP', 'uses' => 'Guia@guardar_despa_recep']);

//SUBIR ARCHIVO CONTRATO
Route::post('GUARDAR_CONTRATO', ['as' => 'GUARDAR_CONTRATO', 'uses' => 'Guia@contrato']);
Route::post('VALIDAR_CONTRATO', ['as' => 'VALIDAR_CONTRATO', 'uses' => 'Guia@validar_documento']);
// GALVANIZADO 
Route::get('GALV_REGI', ['as' => 'GALV_REGI', 'uses' => 'Galvanizado@listar_galvanizado']);
Route::get('REPO_GALV', ['as' => 'REPO_GALV', 'uses' => 'Galvanizado@reporte_galvanizado']);

Route::get('MANT_ETAPA_PINT', ['as' => 'MANT_ETAPA_PINT', 'uses' => 'TipoEtapa_Pintura@list_tipoetapa_pintura']);
Route::get('MANT_ESPECIF', ['as' => 'MANT_ESPECIF', 'uses' => 'Especificacion@list_Especificacion']);

Route::get('LOTE_PINT', ['as' => 'LOTE_PINT', 'uses' => 'Lote_pintura@list_lote_pintura']);
Route::get('REPO_PINT', ['as' => 'REPO_PINT', 'uses' => 'Lote_pintura@reportar_lote_pintura']);
Route::get('REPO_GALV_SEMA', ['as' => 'REPO_GALV_SEMA', 'uses' => 'Main@Reportar_galvanizado_turno']);

//PDF 
Route::get('REPO_PINT', ['as' => 'REPO_PINT', 'uses' => 'Lote_pintura@reportar_lote_pintura']);
//Route::get('valorizacion/contratista/{id_lotepintura}/{codigo_lotepintura}/{codi_proy}/{id_proy}/{usuarios_c}/{user_conectado}/{pintura}/{cabina}/{elemento}/{usua_hora}/{fech_inicio}/{fech_final}/{observacion}', ['as' => 'PDF_IDLOTEPINTURA', 'uses' => 'Lote_pintura@pdf_idlotepintura'])->where('pintura', '(.*)');
Route::get('REPO_DETA_GALVA',['as'=>'REPO_DETA_GALVA','uses'=>'Detalle_Galvanizado@listar_Detalle_Galvanizado']);
Route::get('valorizacion/contratista/{usuario}/{unidad}/{sema_inicio}/{sema_fin}/{unidad_label}', ['as' => 'PDF_IDGALVANIZADO', 'uses' => 'Galvanizado@pdf_galvanizado']);

Route::post('validar_pdf_contratista', ['as' => 'validar_pdf_contratista', 'uses' => 'Generar_pdf@validar_pdf_contratista']);

Route::get('lotepintura/pdf/{data}/{user_conectado}', ['as' => 'PDF_IDLOTEPINTURA', 'uses' => 'Lote_pintura@pdf_idlotepintura'])->where('data','(.*)');
//INSPECCION DE GALVANIZADO 
Route::get('INSPE_GAL', ['as' => 'INSPE_GAL', 'uses' => 'Galvanizado@insp_galvanizado']);
//REPORTES INSPECCION GALVANIZADO 
Route::get('REPO_INSP_GALV',['as'=>'REPO_INSP_GALV','uses'=>'Galvanizado@reporte_insp_galvanizado']);

//REPORTES INSPECCION GALVANIZADO 
Route::get('REPO_PESO',['as'=>'REPO_PESO','uses'=>'Reporte_Peso@repo_list_peso']);
Route::get('VAL_RRO',['as'=>'VAL_RRO','uses'=>'Main@Contrato']);

Route::get('contrato/pdf/{idcontrato}/{id_user}', ['as' => 'PDF_C', 'uses' => 'Generar_pdf@pdf_contrato_valorizacion'])->where('data', '(.*)');