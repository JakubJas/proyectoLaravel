<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genero extends Model
{
    use HasFactory;

    public function cargar_generos()
    {
        $gen1 = ["cod" => 1, "nombre" => "Comedia"];
        $gen2 = ["cod" => 2, "nombre" => "Ciencia Ficción"];
        $gen3 = ["cod" => 3, "nombre" => "Histórica"];
        $gen4 = ["cod" => 4, "nombre" => "Distopía"];
        $gen5 = ["cod" => 5, "nombre" => "Terror"];
        $gen6 = ["cod" => 6, "nombre" => "Drama"];

        $arrayGeneros = [$gen1, $gen2, $gen3, $gen4, $gen5, $gen6];
        return $arrayGeneros;
    }

    public function cargar_genero($codGen)
    {
        $generos = $this->cargar_generos();

        foreach ($generos as $genero) {
            if ($genero["cod"] == $codGen) {
                return $genero;
            }
        }

        return null;
    }

    public function toGeneroJson()
    {
        return json_encode($this->cargar_generos(), JSON_PRETTY_PRINT);
    }
}
