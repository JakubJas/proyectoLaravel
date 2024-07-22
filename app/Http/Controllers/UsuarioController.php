<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(
            [
                'usuario' => 'required',
                'clave' => 'required'
            ]
        );

        $user = new Usuario();

        $datosUsuario = $user->comprobar_usuario($request->usuario,  $request->clave);
        if ($datosUsuario === false || !isset($datosUsuario)) {
            $mensaje = "Usuario y contraseña inválidos";
            return view('login', Compact("mensaje"));
        } else {
            // si todo va correctamente iniciamos sesión y accedemos a la aplicación
            session_start();

            $_SESSION['usuario'] = $_POST['usuario'];
            $_SESSION['carrito'] = [];
            return redirect('Principal');
        }
    }

    public function logout()
    {
        $user = new Usuario();
        return $user->logout();
    }
}
