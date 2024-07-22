<?php

namespace App\Http\Controllers;

use App\Models\Libro;

class LibroController extends Controller
{
    public function obtenerLibros()
    {
        $libros = Libro::obtenerTodos();
        return response()->json($libros);
    }

    public function obtenerLibrosPorGenero($genero)
    {
        $librosPorGenero = Libro::obtenerPorGenero($genero);
        return response()->json($librosPorGenero);
    }
}
