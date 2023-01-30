
/* Activa menú hamburguesa*/

const ham = document.querySelector('.ham');
const enlaces = document.querySelector('.enlaces-menu');
const barras = document.querySelectorAll('.ham span');

ham.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    barras.forEach(child =>  {child.classList.toggle('animado')});
});


/*Indica página activa*/

const seleccionado = location.href;
const menu_item = document.querySelectorAll('a');
const menu_length = menu_item.length;

for (let i = 0; i < menu_length; i++){
    if(menu_item[i].href === seleccionado){
        menu_item[i].className = "active"
    }
}

