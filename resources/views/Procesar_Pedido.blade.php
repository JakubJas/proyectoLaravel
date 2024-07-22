<!-- resources/views/Procesar_Pedido.blade.php -->

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ asset('bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/Procesar_Pedido.css') }}">
    <title>Procesar Pedido</title>
</head>
<body>
    <h1>Librería</h1>
    <hr>

    @csrf

    <div class="mensaje">
        {{ $mensaje }}
    </div>

    <a href="/Principal" class="back" >Volver</a>

</body>
</html>
