<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use App\Models\Genero;

class GeneroController extends Controller
{
    public function showPrincipal()
    {
        if (Usuario::comprobarSesion()) {
            $genero = new Genero();
            $generos = $genero->cargar_generos();
            return view('Principal', compact('generos'));
        } else {
            return redirect('/');
        }
    }

    public function obtenerGeneros()
        {
            $genero = new Genero();
            $generos = $genero->cargar_generos();

            return response()->json($generos);
        }

}
