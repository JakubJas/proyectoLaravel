function login() {
    const usuario = $('#usuario').val();
    const clave = $('#clave').val();

    // realiza la solicitud AJAX
    $.ajax({
        url: '/login',
        type: 'POST',
        data: {
            usuario: usuario,
            clave: clave,
            _token: $('meta[name="csrf-token"]').attr('content') // agrega el token CSRF
        },
        dataType: 'json',
        success: function (response) {
            // maneja la respuesta del servidor
            if (response.success) {
                // redirige al usuario después de iniciar sesión correctamente
                window.location.href = '/Principal';
            } else {
                // muestra un mensaje de error si la autenticación falla
                alert(response.message);
            }
        },
        error: function (error) {
            console.error('Error al intentar iniciar sesión:', error);
        }
    });
}

// asigna el evento al botón de inicio de sesión
$(document).ready(function () {
    $('#loginBtn').on('click', function (event) {
        event.preventDefault();
        login(); // llama a la función de inicio de sesión
    });
});

function logout() {
    // realiza la solicitud AJAX
    $.ajax({
        url: '/logout',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            // maneja la respuesta del servidor
            if (response.success) {
                // redirige al usuario después de cerrar sesión correctamente
                window.location.href = '/';
            } else {
                // muestra un mensaje de error si el cierre de sesión falla
                alert(response.message);
            }
        },
        error: function (error) {
            console.error('Error al intentar cerrar sesión:', error);
        }
    });
}

// asigna el evento al botón de cerrar sesión
$(document).ready(function () {
    $('#logoutBtn').on('click', function (event) {
        event.preventDefault();
        logout();
    });
});

function cargarGeneros(tipo) {

    // Oculta la tabla de libros
    $('#tablaLibros').hide();

    // Muestra la lista de géneros
    $('#contenedorGeneros').show();

    // Oculta el carrito
    $('#contenedorCarrito').hide();
    $('#tablaCarrito').hide();
    $('#finComp').hide();

    // Titulo
    $('#tituloLibros').html('<h1>Lista de Generos</h1>');

    const contenedor = (tipo === 'generos') ? $('#contenedorGeneros') : $('#tablaLibros');
    const url = (tipo === 'generos') ? '/obtener-generos' : '/obtener-libros-por-genero';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (datos) {
            contenedor.empty(); // Limpia el contenedor antes de agregar nuevos datos

            if (tipo === 'generos') {
                datos.forEach(genero => {
                    const enlace = $('<a>', {
                        href: `javascript:void(0);`, // Evitar que el enlace cambie la página
                        text: genero.nombre,
                        class: 'genero-enlace',
                        'data-genero': genero.nombre, // Añadir el atributo de datos con el nombre del género
                    });

                    const listItem = $('<li>').append(enlace);
                    contenedor.append(listItem);
                });
            }
        },
        error: function (error) {
            console.error(`Error al obtener ${tipo}:`, error);
        }
    });
}

$(document).on('click', '#menuGeneros', function (event) {
    event.preventDefault();
    cargarGeneros('generos');
});

function cargarLibrosPorGenero(genero) {

    $('#contenedorGeneros').hide();

    $('#tablaLibros').show();

    $('#contenedorCarrito').hide();
    $('#tablaCarrito').hide();
    $('#finComp').hide();

    const contenedor = $('#tablaLibros');
    $.ajax({
        url: `/obtener-libros-por-genero/${genero}`, // Utiliza una ruta específica para cargar libros por género
        type: 'GET',
        dataType: 'json',
        success: function (datos) {
            contenedor.empty(); // Limpia el contenedor antes de agregar nuevos datos

            if(datos.length == 0){
                // Si no existe un libro de tal genero que aparezca el siguiente mensaje
                contenedor.html('<p>Genero sin libros</p>');
            }else{
                // Construye la tabla con los datos de los libros
                let tabla = `<thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Titulo</th>
                                    <th>Escritores</th>
                                    <th>Género</th>
                                    <th>Núm. Páginas</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>`;

                datos.forEach(libro => {
                    const fila = `<tr>
                                    <td>${libro.isbn}</td>
                                    <td>${libro.titulo}</td>
                                    <td>${libro.escritores}</td>
                                    <td>${libro.genero}</td>
                                    <td>${libro.numpaginas}</td>
                                    <td><img src="${libro.imagen}" alt="${libro.titulo}" width="50" height="70"></td>
                                    <td><input type="number" min="1" id="addBook"><button id="addBtn" class="tambtn btn btn-primary btn-lg">Añadir</button></td>
                                </tr>`;
                    tabla += fila;
                });

                // Agrega la tabla al contenedor
                contenedor.html(tabla);

                // Actualiza el título
                $('#tituloLibros h1').text(`Libros de ${genero}`);
            }
        },
        error: function (error) {
            console.error('Error al obtener libros por género:', error);
        }
    });
}

$(document).on('click', '.genero-enlace', function () {
    const genero = $(this).data('genero'); // Obtiene el nombre del género desde el atributo de datos
    cargarLibrosPorGenero(genero);
});

function cargarLibros() {
    $.ajax({
        url: '/obtener-libros',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {

            $('#contenedorGeneros').hide();

            $('#tablaLibros').show();

            $('#contenedorCarrito').hide();
            $('#tablaCarrito').hide();
            $('#finComp').hide();

            //Titulo
            $('#tituloLibros').html('<h1>Tabla de Libros</h1>');


            // Verifica si libro es un array antes de usar forEach
            const libros = respuesta.libro;

            if (Array.isArray(libros)) {
                // Limpia el contenedor antes de agregar nuevos datos
                $('#tablaLibros').empty();

                // Construye la tabla con los datos de los libros
                const encabezado = `<thead>
                                    <tr>
                                        <th>ISBN</th>
                                        <th>Titulo</th>
                                        <th>Autor</th>
                                        <th>Genero</th>
                                        <th>Num. Paginas</th>
                                        <th>Portada</th>
                                    </tr>
                                </thead>`;
                $('#tablaLibros').append(encabezado);

                libros.forEach(libro => {
                    const fila = `<tr>
                                      <td>${libro.isbn}</td>
                                      <td>${libro.titulo}</td>
                                      <td>${libro.escritores}</td>
                                      <td>${libro.genero}</td>
                                      <td>${libro.numpaginas}</td>
                                      <td>${libro.imagen ? `<img src="/${libro.imagen}" alt="${libro.titulo}" width="50" height="70" >`: 'No disponible'}</td>
                                      <td><input type="number" min="1" id="addBook"><button id="addBtn" class="tambtn btn btn-primary btn-lg">Añadir</button></td>
                                  </tr>`;
                    $('#tablaLibros').append(fila);
                });
            } else {
                console.error('La propiedad "libro" no es un array:', libros);
            }
        },
        error: function (error) {
            console.error('Error al obtener libros:', error);
        }
    });
}

$(document).on('click', '#menuLibros', function (event) {
    event.preventDefault(); // Evita la recarga de la página al hacer clic en el enlace
    cargarLibros('libros');
});

function cargarCarrito() {

    $('#contenedorGeneros').hide();

    $('#tablaLibros').hide();

    $('#contenedorCarrito').show();

    $('#finComp').show();

    $('#tituloLibros').html('<h1>Carrito</h1>');

    $.ajax({
        url: '/cargar-carrito',
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            // Actualiza dinámicamente el listado de carrito en el interfaz gráfica
            const carritoContenedor = $('#contenedorCarrito');
            carritoContenedor.empty(); // Limpia el contenedor antes de agregar nuevos datos

            if (typeof respuesta.carrito !== 'object' || respuesta.carrito === null) {
                console.error('El carrito no es un objeto válido:', respuesta.carrito);
                return;
            }

            const keys = Object.keys(respuesta.carrito);

            if (keys.length === 0) {
                carritoContenedor.html('<p>El carrito está vacío</p>');
            } else {

                // Limpia el contenedor antes de agregar nuevos datos
                $('#tablaCarrito').empty();

                // Construye la tabla con los datos de los libros
                let tabla = `<thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Titulo</th>
                                    <th>Autor</th>
                                    <th>Genero</th>
                                    <th>Num. Paginas</th>
                                    <th>Imagen</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>`;

                keys.forEach(key => {

                    const titulo = respuesta.carrito[key].titulo;
                    const escritores = respuesta.carrito[key].escritores;
                    const genero = respuesta.carrito[key].genero;
                    const numpaginas = respuesta.carrito[key].numpaginas;
                    const imagen = respuesta.carrito[key].imagen;
                    const cantidad = respuesta.carrito[key].cantidad;

                    const fila = `<tr>
                                      <td>${key}</td>
                                      <td>${titulo}</td>
                                      <td>${escritores}</td>
                                      <td>${genero}</td>
                                      <td>${numpaginas}</td>
                                      <td>${imagen ? `<img src="${imagen}" alt="${titulo}" width="50" height="70">` : 'No disponible'}</td>
                                      <td>${cantidad}</td>

                                      <td><input type="number" id="eraseBook"><button id="eraseBtn" class="tambtn btn btn-primary btn-lg">Borrar</button></td>
                                  </tr>`;
                    tabla += fila;
                });

                // Agrega la tabla al contenedor
                $('#tablaCarrito').append(tabla);

                if (respuesta.carrito.length == null) {
                    // Si hay elementos en el carrito, muestra la tabla
                    $('#tablaCarrito').show();
                } else {
                    // Si no hay elementos en el carrito, oculta la tabla
                    $('#tablaCarrito').hide();
                }

                console.log(respuesta);

            }
        },
        error: function (error) {
            console.error('Error al cargar el carrito:', error);
        }
    });

    $('#finComp').html('<a href="Procesar_Pedido" id="finalizarCompraBtn" class="btn btn-primary">Finalizar Compra</a>');

}

$(document).on('click', '#menuCarrito', function (event) {
    event.preventDefault();
    cargarCarrito();
});

function añadirAlCarrito(isbn, titulo, escritores, genero, numpaginas, imagen, cantidad) {

    const token = $('meta[name="csrf-token"]').attr('content');

    console.log('ISBN:', isbn);
    console.log('Título:', titulo);

    $.ajax({
        url: '/añadir-al-carrito',
        type: 'POST',
        data: { isbn: isbn, titulo: titulo, escritores: escritores, genero: genero, numpaginas: numpaginas, imagen: imagen, cantidad: cantidad, _token: token },
        dataType: 'json',
        success: function (response) {
            if(cantidad > 0){
                if (response.success) {
                    console.log('Libro añadido al carrito');
                    alert("Libro agregado correctamente");
                } else {
                    console.error('Error al añadir el libro al carrito');
                }
            }else{
                alert("Solo valores mayores que 0");
            }
        },
        error: function (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    });
}

$(document).on('click', '#addBtn', function (event) {
    event.preventDefault();
    const isbn = $(this).closest('tr').find('td:first').text(); // Obtén el dato de la fila
    const titulo = $(this).closest('tr').find('td:eq(1)').text();
    const escritores = $(this).closest('tr').find('td:eq(2)').text();
    const genero = $(this).closest('tr').find('td:eq(3)').text();
    const numpaginas = $(this).closest('tr').find('td:eq(4)').text();
    const imagen = $(this).closest('tr').find('img').attr('src');
    const cantidad = $(this).closest('tr').find('#addBook').val(); // Obtén la cantidad del input

    añadirAlCarrito(isbn, titulo, escritores, genero, numpaginas, imagen, cantidad);
});

function eliminarDelCarrito(isbn, cantidadmen) {
    const token = $('meta[name="csrf-token"]').attr('content');

    console.log('ISBN:', isbn);

    $.ajax({
        url: '/eliminar-del-carrito',
        type: 'POST',
        data: { isbn: isbn, cantidad: cantidadmen, _token: token },
        dataType: 'json',
        success: function (response) {
            if(cantidadmen > 0){
                if (response.success) {
                    console.log('Libro(s) eliminado(s) del carrito');
                    cargarCarrito();

                    // Después de cargar el carrito, verifica la cantidad y elimina la fila si es necesario
                    const cantidadActualizada = parseInt(cantidadmen) - parseInt(response.cantidadEliminada);

                    if (cantidadActualizada <= 0) {
                        // Si la cantidad es 0 o menos, elimina la fila de la tabla
                        $(`#eraseBtn[data-isbn="${isbn}"]`).closest('tr').remove();
                    }
                } else {
                    console.error('Error al eliminar libro(s) del carrito');
                }
                alert("Libro eliminado correctamente");
            }else{
                alert("Solo se permiten valores mayores que 0");
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al realizar la solicitud:', xhr, status, error);
        }
    });
}


$(document).on('click', '#eraseBtn', function () {
    const isbn = $(this).closest('tr').find('td:first').text();
    const cantidadmen = $(this).closest('tr').find('#eraseBook').val();
    eliminarDelCarrito(isbn, cantidadmen);
});
