/*---Traer la información del Local storage ---*/
let productos_en_carrito = localStorage.getItem("productos-en-carrito");
productos_en_carrito = JSON.parse(productos_en_carrito);



const contenedor_carrito_vacio = document.querySelector("#carrito-vacio");
const contenedor_carrito_productos = document.querySelector("#carrito-productos");
const contenedor_carrito_acciones = document.querySelector("#carrito-acciones");
const contenedor_carrito_comprado = document.querySelector("#carrito-comprado");
let botones_eliminar = document.querySelectorAll(".carrito-producto-eliminar");
const boton_vaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedor_total = document.querySelector("#total");
const boton_comprar = document.querySelector("#carrito-acciones-comprar");


/*---Esta función se ejecuta cada vez que se carga la página y cada vez que se elimina un producto---*/
function cargar_productos_carrito() {

    /*---Activar o desactivar mensaje Carrito vacío según haya o no productos agregados ---*/
    /*---La página carga con los mensajes según el Else ---*/
    if (productos_en_carrito && productos_en_carrito.length > 0) {

        contenedor_carrito_vacio.classList.add("disabled");
        contenedor_carrito_productos.classList.remove("disabled");
        contenedor_carrito_acciones.classList.remove("disabled");
        contenedor_carrito_comprado.classList.add("disabled");

        contenedor_carrito_productos.innerHTML = "";

        productos_en_carrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                        <img src="${producto.imagen}" alt="${producto.titulo}" class="carrito-producto-imagen">
                        <div class="carrito-producto-titulo">
                            <small>Título</small>
                            <h3>${producto.titulo}</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Precio</small>
                            <p>$${producto.precio}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
                `
            contenedor_carrito_productos.append(div);
        });
        actualizar_botones_eliminar();
        actualizar_total();

    } else {
        contenedor_carrito_vacio.classList.remove("disabled");
        contenedor_carrito_productos.classList.add("disabled");
        contenedor_carrito_acciones.classList.add("disabled");
        contenedor_carrito_comprado.classList.add("disabled");
    }

}

cargar_productos_carrito();


function actualizar_botones_eliminar() {
    botones_eliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botones_eliminar.forEach(boton => {
        boton.addEventListener("click", eliminar_del_carrito);
    });
}

function eliminar_del_carrito(e) {
    const id_boton = e.currentTarget.id;
    const index = productos_en_carrito.findIndex(producto => producto.id === id_boton);
    Swal.fire({
        title: 'Está seguro?',
        icon: 'warning',
        background: 'black',
        color: '#ffde59e0',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        width: 400,
        confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Producto eliminado ✔',
                background: '#F2D95C',
                color: 'black',
                timer: 2000,
                showConfirmButton: false
            })

            productos_en_carrito.splice(index, 1);
            cargar_productos_carrito();

            localStorage.setItem("productos-en-carrito", JSON.stringify(productos_en_carrito));
        }
    })
}


boton_vaciar.addEventListener("click", vaciar_carrito);

function vaciar_carrito() {
    Swal.fire({
        title: 'Estás seguro? ',
        html: `Se van a borrar ${productos_en_carrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos ❗❗`,
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: `No`,
        confirmButtonColor: "green",
        cancelButtonColor: "red",
        width: 400,
        heightAuto: false,
        color: '#ffde59e0',
        background: 'black',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            productos_en_carrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productos_en_carrito));
            cargar_productos_carrito();

            let timerInterval
            Swal.fire({
                title: 'Vaciando carrito',
                timer: 1500,
                timerProgressBar: true,
                color: '#ffde59e0',
                background: 'black',
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        }
    })
}


function actualizar_total() {
    const total_calculado = productos_en_carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${total_calculado}`;
}


//boton_comprar.addEventListener("click", comprar_carrito);
function comprar_carrito() {

    //productos_en_carrito.length = 0;
    //localStorage.setItem("productos-en-carrito", JSON.stringify(productos_en_carrito));

    contenedor_carrito_vacio.classList.add("disabled");
    contenedor_carrito_productos.classList.add("disabled");
    contenedor_carrito_acciones.classList.add("disabled");
    contenedor_carrito_comprado.classList.remove("disabled");
}

