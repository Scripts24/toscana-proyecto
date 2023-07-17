const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    setTimeout(() => (window.location.href = "../login.html"), 5000);
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
})


