<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de login</title>
    <link rel="stylesheet" href="{{ asset('bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>

<body>

    @if(isset($mensaje))
        <div class="alert alert-danger">
            {{ $mensaje }}
        </div>
    @endif

    <div class="login-form-container">
        <h1 class="text-center">Libros</h1>
        <form action="/login" method="POST" class="login-form">
            @csrf
            <div class="mb-3">
                <label for="usuario" class="form-label">Usuario</label>
                <input id="usuario" name="usuario" type="text" class="form-control">
            </div>
            <div class="mb-3">
                <label for="clave" class="form-label">Clave</label>
                <input id="clave" name="clave" type="password" class="form-control">
            </div>
            <button type="submit" id="loginBtn" class="btn btn-primary btn-lg btn-block">Iniciar Sesión</button>
        </form>
    </div>
</body>

</html>
