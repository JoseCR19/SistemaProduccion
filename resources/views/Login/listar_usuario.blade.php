@extends('layout.admin')
@section('contenido')
@push('style')
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css">
@endpush
<div class="card">
    <div class="card-header">
        <h3 class="card-title">
            Listar Usuarios Mimco
        </h3>
        <div class="float-right">
            <a data-target="#modal-create-usuario" data-toggle="modal" href="" style="text-decoration: none !important">
                <button type="button" class="btn btn-block bg-gradient-success">
                    <i class="fas fa-user-plus"></i> Agregar Usuario
                </button>
            </a>
        </div>
    </div>
    <div class="card-body">
        <table id="usuario_cabecera" class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th class="text-center">
                        Número
                    </th>
                    <th class="text-center">
                        DNI
                    </th>
                    <th class="text-center">
                        Nombre
                    </th>
                    <th class="text-center">
                        Apellido
                    </th>
                    <th class="text-center">
                        Usuario
                    </th>
                    <th class="text-center">
                        Estado
                    </th>
                    <th class="text-center">
                        Opciones
                    </th>
                </tr>
            </thead>
            <tbody id="detalle_usuario">
            </tbody>
            @include('Usuario.modal_editar_usuario')
        </table>
    </div>
</div>
@include('Usuario.modal_registrar_usuario')

@push('scripts')
<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<script src="funciones/listar_usuario.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    listar_usario_ajax();
});
</script>
@endpush
@endsection