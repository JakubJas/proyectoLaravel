<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    use HasFactory;

    public static function cargarCarrito()
    {
        // Obtener el carrito desde la sesión
        $carrito = session('carrito', []);

        return $carrito;
    }

    public static function añadirAlCarrito($isbn, $titulo, $escritores, $genero, $numpaginas, $imagen, $cantidad){
        // Verificar si la cantidad es mayor que 0
    if ($cantidad <= 0 || !isset($cantidad)) {

        return ['error' => 'Numero negativo'];
    }
        $carrito = session('carrito', []);

        // Verificar si el libro ya está en el carrito
        if (array_key_exists($isbn, $carrito)) {
            // Actualizar la cantidad si ya existe
            $carrito[$isbn]['cantidad'] += $cantidad;
        } else {
            // Agregar el libro al carrito con todas las propiedades
            $carrito[$isbn] = [
                'titulo' => $titulo,
                'escritores' => $escritores,
                'genero' => $genero,
                'numpaginas' => $numpaginas,
                'imagen' => $imagen,
                'cantidad' => $cantidad,
            ];
        }

        // Guardar el carrito en la sesión
        session(['carrito' => $carrito]);

        return true;
    }

    public static function eliminarDelCarrito($isbn, $cantidadmen){

        $carrito = session('carrito', []);

        if (array_key_exists($isbn, $carrito)) {
            // Verificar si $cantidadmen es menor que la cantidad
            if ($cantidadmen <= $carrito[$isbn]) {
                $carrito[$isbn]['cantidad'] -= $cantidadmen;
                //Si la cantidad es menor que 0 elimina el libro del carrito
                if ($carrito[$isbn]['cantidad'] <= 0) {
                    unset($carrito[$isbn]);
                    session(['carrito' => $carrito]);
                }
                // Actualizar la sesión con el carrito modificado
                session(['carrito' => $carrito]);
                return true;
            }else {
                // Si la cantidad a eliminar es mayor que la cantidad en el carrito, simplemente eliminar el libro
                unset($carrito[$isbn]);
                // Guardar el carrito actualizado en la sesión
                session(['carrito' => $carrito]);
                return true;
            }
        }

        return false;

    }

    public static function procesarPedido(){
        // Obtener el carrito desde la sesión
    $carrito = session('carrito', []);
    // Verificar si el carrito está vacío
    if (empty($carrito)) {
        return false; // Indicar que el carrito está vacío
    }
    // Limpiar el carrito
    session(['carrito' => []]);
    return true; // Indicar que se ha procesado el pedido
    }

}
