<!-- Principal.blade.php -->

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Principal</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="{{ asset('js/cargarDatos.js') }}" defer></script>
    <link rel="stylesheet" href="{{ asset('bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/principal.css') }}">

</head>

<body>

    @include('Cabecera')
    

    @csrf

    <div id="tituloLibros">
        <h1></h1>
    </div>

    <ul display="hide" id="contenedorGeneros"></ul>

    <table display="hide" id="tablaLibros">

    </table>

    <div display="none" id="contenedorCarrito">

    </div>

    <table id="tablaCarrito">

    </table>

    <div id="finComp">
        <h1></h1>
    </div>

</body>

</html>
