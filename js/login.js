const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = Users.find(user => user.email === email && user.password === password)
    if (!validUser) {
        return Toastify({
            text: `Usuario y/o contraseña incorrectos`,
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
    }

    Toastify({
        text: `Bienvenido ${validUser.name}`,
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
    localStorage.setItem('login_success', JSON.stringify(validUser))
    setTimeout(() => (window.location.href = "../index.html"), 5000);

})


