
const ful_img_box = document.getElementById("ful-img-box"),
ful_img = document.getElementById("ful-img");

function open_ful_img(reference){
    ful_img_box.style.display = "flex";
    ful_img.src = reference
}
function close_img(){
    ful_img_box.style.display = "none";
}

