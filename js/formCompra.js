document.addEventListener('DOMContentLoaded', () => {
    contact_form_validations()
})

function contact_form_validations() {
    const form = document.querySelector(".contact-form"),
        inputs = document.querySelectorAll(".contact-form [required]");

    //Mensaje de error 
    inputs.forEach((input) => {
        const span = document.createElement("span");
        span.id = input.name;
        span.textContent = input.title;
        span.classList.add("contact-form-error", "none")
        input.insertAdjacentElement("afterend", span);
    });

    //Validación inputs - Evento keyup
    document.addEventListener("keyup", (e) => {
        if (e.target.matches('.contact-form [required]')) {
            let input = e.target,
                pattern = input.pattern || input.dataset.pattern;

            //Si tiene patrón
            if (pattern && input.value !== "") {
                let regex = new RegExp(pattern);
                return !regex.exec(input.value)
                    ? document.getElementById(input.name).classList.add("is-active")
                    : document.getElementById(input.name).classList.remove("is-active")
            }

            //Si no tiene patrón
            if (!pattern) {
                return input.value === ""
                    ? document.getElementById(input.name).classList.add("is-active")
                    : document.getElementById(input.name).classList.remove("is-active")
            }
        }
    });

    //Envío de formulario
    document.addEventListener("submit", (e) => {
        e.preventDefault();

        const loader = document.querySelector(".contact-form-loader"),
            response = document.querySelector(".contact-form-response");

        //loader.classList.remove("none");


        // ---FETCH-----

        fetch("https://formsubmit.co/ajax/pato.atanasoff0815@gmail.com", {
            method: "POST",
            body: new FormData(e.target)
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada exitosamente, en breve le será enviado su pedido',
            showConfirmButton: true,
        })
            .then(json => {
                console.log(json);
                loader.classList.add("none");
                response.classList.remove("none");
                response.innerHTML = `<p>${json.message}</p>`;

                form.reset();
            })
            .catch(err => {
                console.log(err);
                let message = err.statusText || "Error al enviar, intenta nuevamente";
                response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
            })
            .finally(() => setTimeout(() => {
                response.classList.add("none");
                response.innerHTML = "";
            }, 3000));
    });
}

