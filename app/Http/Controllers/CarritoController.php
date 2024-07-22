<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carrito;

class CarritoController extends Controller{

    public function cargarCarrito(){

        $carrito = Carrito::cargarCarrito();

        return response()->json(['carrito' => $carrito]);
    }

    public function añadirAlCarrito(Request $request){

        $isbn = $request->input('isbn');
        $titulo = $request->input('titulo');
        $escritores = $request->input('escritores');
        $genero = $request->input('genero');
        $numpaginas = $request->input('numpaginas');
        $imagen = $request->input('imagen');
        $cantidad = $request->input('cantidad');

        $resultado = Carrito::añadirAlCarrito($isbn, $titulo, $escritores, $genero, $numpaginas, $imagen, $cantidad);

        return response()->json(['success' => $resultado]);

    }

    public function eliminarDelCarrito(Request $request){
        // Obtén el ISBN del libro a eliminar
        $isbn = $request->input('isbn');
        $cantidadmen = $request->input('cantidad');

        if(!empty($isbn) && is_numeric($cantidadmen) && $cantidadmen > 0){
            $cantidadEliminada = Carrito::eliminarDelCarrito($isbn, $cantidadmen);
            return response()->json(['success' => true, 'cantidadEliminada' => $cantidadEliminada]);
        } else {
            return response()->json(['success' => false, 'message' => 'Datos de entrada inválidos']);
        }
    }


    public function procesarPedido()
    {
        $mensaje = Carrito::procesarPedido() ? "Pedido realizado con exito. Se enviará un correo de confirmación" : "El pedido no se puede realizar. El carrito esta vacio...";
    return view('Procesar_Pedido', compact('mensaje'));
    }

}

