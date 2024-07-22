<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{
    use HasFactory;

    protected $fillable = ['isbn', 'titulo', 'escritores', 'genero', 'numpaginas', 'imagen'];

    public static function obtenerTodos()
    {
        $rutaArchivo = storage_path('app/Info/libros.xml');

        if (file_exists($rutaArchivo)) {
            $contenidoXml = file_get_contents($rutaArchivo);
            $libros = simplexml_load_string($contenidoXml);

            // Convertir SimpleXMLElement a array
            $librosArray = json_decode(json_encode($libros), true);

            return $librosArray;
        } else {
            return ['error' => 'El archivo no fue encontrado'];
        }
    }

    public static function obtenerPorGenero($genero)
    {
        $rutaArchivoXML = storage_path('app/Info/libros.xml');

        $xml = simplexml_load_file($rutaArchivoXML);

        $librosPorGenero = [];
        foreach ($xml->libro as $libro) {
            if (strtolower((string)$libro->genero) === strtolower($genero)) {
                $librosPorGenero[] = [
                    'isbn' => (string)$libro->isbn,
                    'titulo' => (string)$libro->titulo,
                    'escritores' => (string)$libro->escritores,
                    'genero' => (string)$libro->genero,
                    'numpaginas' => (string)$libro->numpaginas,
                    'imagen' => (string)$libro->imagen,
                ];
            }
        }
        return $librosPorGenero;
    }
}


