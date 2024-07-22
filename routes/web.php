<?php

use App\Http\Controllers\CarritoController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\LibroController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Login
Route::get('/', function () {
    return view('login');
})->name('login');

Route::post('/login', [UsuarioController::class, 'login']);

// Logout
Route::get('/logout', [UsuarioController::class, 'logout']);

// Principal
Route::get('/Principal', [GeneroController::class, 'showPrincipal']);
Route::get('/obtener-generos', [GeneroController::class, 'obtenerGeneros']);
Route::get('/obtener-libros-por-genero/{codGenero}', [LibroController::class, 'obtenerLibrosPorGenero']);
Route::get('/obtener-libros', [LibroController::class, 'obtenerLibros']);
Route::get('/obtener-carrito', [CarritoController::class, 'obtenerCarrito']);

//Carrito
Route::get('/cargar-carrito', [CarritoController::class, 'cargarCarrito']);
Route::post('/añadir-al-carrito', [CarritoController::class, 'añadirAlCarrito']);
Route::post('/eliminar-del-carrito', [CarritoController::class, 'eliminarDelCarrito']);

//Realizar pedido
Route::get('/Procesar_Pedido', [CarritoController::class, 'procesarPedido']);




