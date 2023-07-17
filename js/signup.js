const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if(isUserRegistered){
        return Toastify({
            text: `El usuario ya esta registrado!`,
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

    Users.push({name: name, email: email, password: password})
    localStorage.setItem('users', JSON.stringify(Users))
    Toastify({
        text: `Registro Exitoso!`,
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
    setTimeout(() => (window.location.href = "../login.html"), 5000);

})





