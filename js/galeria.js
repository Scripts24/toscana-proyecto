
const btn_cierra = document.querySelector('#btn-cierra');
const btn_adelanta = document.querySelector('#btn-adelanta');
const btn_retrocede = document.querySelector('#btn-retrocede');
const imagenes = document.querySelectorAll('#galeria img');
const lightbox = document.querySelector('#contenedor-principal');
const imagen_activa = document.querySelector('#img-activa');
let indice_imagen = 0;

/*Abrir Lightbox*/

const abrir_lightbox = (event) => {
    imagen_activa.src = event.target.src;
    lightbox.style.display = 'flex';
    indice_imagen = Array.from(imagenes).indexOf(event.target);
};

imagenes.forEach((imagen) => {
    imagen.addEventListener('click', abrir_lightbox);
});

/*Cerrar Lightbox */

btn_cierra.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

/* Adelantar la imagen*/

const adelantar_imagen = () => {
    if (indice_imagen === imagenes.length - 1) {
        indice_imagen = -1;
    }
    imagen_activa.src = imagenes[indice_imagen + 1].src;
    indice_imagen++;
};

btn_adelanta.addEventListener('click', adelantar_imagen);

/*Retroceder la Imagen*/

const retroceder_imagen = () => {
    if (indice_imagen === 0) {
        indice_imagen = imagenes.length;
    }
    imagen_activa.src = imagenes[indice_imagen - 1].src;
    indice_imagen--;
};

btn_retrocede.addEventListener('click', retroceder_imagen);
