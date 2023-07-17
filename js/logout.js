const user = JSON.parse(localStorage.getItem('login_success')) || false
/*if(!user){
    setTimeout(() => (window.location.href = "../login.html"), 5000);
}*/

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    Toastify({
        text: `Hasta pronto!`,
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "#F2D95C",
            color: "black",
            marginTop: "150px",
            padding: "30px",
            fontSize: "22px",
            borderRadius: "8px"
        },
    }).showToast();
    localStorage.removeItem('login_success')
    
})




