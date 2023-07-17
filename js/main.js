let productos = [];

fetch("../products.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargar_productos(productos);
        inicializarZoomImagen(); //ElevateZoom
    });

const contenedor_productos = document.querySelector("#contenedor-productos");
const botones_categorias = document.querySelectorAll('.boton-categoria');
const titulo_principal = document.querySelector('#titulo-principal');
let botones_agregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


/*---Función para inyectar productos en el HTML--- */
/*---Parámetro para que carguen solo los productos de la categoría elegida--- */
function cargar_productos(productos_elegidos) {

    contenedor_productos.innerHTML = "";/*---Vaciar el contenedor_productos antes de realizar el forEach del array, sino c/ vez que cliqueemos los productos se duplican--- */

    productos_elegidos.forEach(producto => {
        const div = document.createElement("div");/*---Creamos un div con la class producto--- */
        div.classList.add("producto");
        div.innerHTML = `
                    <img class="producto-imagen"  src="${producto.imagen}" alt="${producto.titulo}">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">$${producto.precio}</p>
                    <button class="producto-agregar" id= "${producto.id}"> Agregar</button>
                    `;

        contenedor_productos.append(div);

    })

    actualizar_botones_agregar()
}

/*---Elevate Zoom--- */
function inicializarZoomImagen() {
    $('.producto-imagen').elevateZoom({
        zoomType: "inner",
        cursor: "crosshair",
        scrollZoom: true,
        responsive: true,
        easing: true,
    });
}

/*---Llamado a la función--- */
cargar_productos(productos);/*---Parámetro para que al cargar por primera vez la página se cargue el array completo--- */


/*---Evento click para activar el botón seleccionado--- */
botones_categorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botones_categorias.forEach(boton => boton.classList.remove("active"));/*---Le saca la clase active al botón que la tiene por defecto--- */
        e.currentTarget.classList.add("active"); /*---Le agrega la clase active al botón clickeado--- */

        /*---Condicional para que cuando hagamos click en Todos los productos, vuelvan a aparecer--- */
        /*---Entonces el filtro se ejecuta cuando se selecciona una categoría diferente a "Todos los productos"--- */
        if (e.currentTarget.id != "todos") {

            const producto_categoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            titulo_principal.innerText = producto_categoria.categoria.nombre;/*---Para que cambie el Título y aparezca el nombre correspondiente a la categoría seleccionada--- */

            const productos_boton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)/*---Hacemos un filtro en el array para que solo carguen los productos de la categoría clickeada--- */
            cargar_productos(productos_boton);/*---Parámetro para que carguen solo los productos de la categoría seleccionada--- */
            inicializarZoomImagen();/*---Llamado a la función zoom al cargar por categoría--- */
        } else {
            titulo_principal.innerText = "Todos los productos";
            cargar_productos(productos);
            inicializarZoomImagen();/*---Llamado a la función zoom al cargar todo--- */
        }
    })
});


/*---Función para actualizar los botones---*/
/*---Llamado a la función dentro de la función cargar_productos--- */
function actualizar_botones_agregar() {
    botones_agregar = document.querySelectorAll(".producto-agregar");

    botones_agregar.forEach(boton => {
        boton.addEventListener("click", agregar_al_carrito) /*---Evento para llamar a la función agregar_al-carrito---*/
    });
}


/*---Si hay productos en carrito entonces el carrito será igual a lo que traiga del Local Storage, sino arranca como un array vacío---*/

let productos_en_carrito;

let productos_en_carrito_LS = localStorage.getItem("productos-en-carrito");

if (productos_en_carrito_LS) {
    productos_en_carrito = JSON.parse(productos_en_carrito_LS);
    actualizar_numerito();
} else {
    productos_en_carrito = []; /*---Sino arranca como un array vacío---*/
}


let usuarioLogueado = false; // Variable que indica si el usuario ha iniciado sesión o no

function iniciarSesion() {
    usuarioLogueado = true;
    localStorage.setItem('login_success', JSON.stringify(true));
}

function agregar_al_carrito(e) {

    if (!usuarioHaIniciadoSesion()) {

        mostrarMensaje("Para comprar, debes iniciar sesión");

        redirigirALogin();

        return;
    }

    Toastify({
        text: `Se ha agregado al carrito ✔`,
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "#F2D95C",
            color: "black",
            marginTop: "70px",
            padding: "20px",
            fontSize: "22px",
            borderRadius: "8px"
        },
    }).showToast();

    const id_boton = e.currentTarget.id;
    const producto_agregado = productos.find(producto => producto.id === id_boton)

    /*---Chequear con some si el producto ya fue agregado para que no se duplique---*/
    /*---Si está subimos la cantidad, sino simplemente pusheamos---*/
    if (productos_en_carrito.some(producto => producto.id === id_boton)) {
        const index = productos_en_carrito.findIndex(producto => producto.id === id_boton)/*---Busca el índice de un producto---*/
        productos_en_carrito[index].cantidad++

    } else {
        producto_agregado.cantidad = 1;
        productos_en_carrito.push(producto_agregado);
    }
    actualizar_numerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productos_en_carrito))
}

function usuarioHaIniciadoSesion() {
    const user = JSON.parse(localStorage.getItem('login_success'));
    return user !== null;
}

function mostrarMensaje(mensaje) {
    Swal.fire({
        title: mensaje,
        position: 'center',
        color: "#ffde59e0",
        icon: 'warning',
        background: "black",
        showConfirmButton: true,
        confirmButtonColor: "#ffde59e0"
    }).then((result) => {
        if (result.isConfirmed) {
            redirigirALogin();
        }
    });
};

function redirigirALogin() {
    setTimeout(() => (window.location.href = "../login.html"), 5000);
}

/*---Función para que al agregar un producto al carrito se actualice el número de productos en el mismo---*/
/*---Esta función se ejecuta cada vez que agregamos un producto al carrito---*/
function actualizar_numerito() {
    let nuevo_numerito = productos_en_carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevo_numerito;
}

//Bloquea la redirección a la página de compra si no hay productos agregados

document.querySelector(".nav-cart-icon").addEventListener("click", (e) => {
    if (productos_en_carrito.length === 0) {
        e.preventDefault(); // Evita redirigir a la página de compra

        Toastify({
            text: `Tu carrito se encuentra vacío, agrega algún producto`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "#F2D95C",
                color: "black",
                marginTop: "90px",
                padding: "20px",
                fontSize: "22px",
                borderRadius: "8px"
            },
        }).showToast();
    }
});




















