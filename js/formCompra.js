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

    const DateTime = luxon.DateTime;

    const now = DateTime.now();
    const llegada = DateTime.fromObject({ day: now.day + 0 });

    //Envío de formulario
    document.addEventListener("submit", (e) => {

        const name = document.querySelector("#nombre").value;

        e.preventDefault();

        const response = document.querySelector(".contact-form-response");

        // ---FETCH-----

        fetch("https://formsubmit.co/ajax/pato.atanasoff0815@gmail.com", {
            method: "POST",
            body: new FormData(e.target)
        })
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then(json => {
                console.log(json);
                response.classList.remove("none");
                response.innerHTML = `<p>${json.message}</p>`;
                form.reset();
            })
        Swal.fire({
            title: `Gracias por su compra ${name}, en breve le será enviado su pedido`,
            html: `<span class="sweet-fechas">Fecha actual: ${now.toLocaleString()}</span>
                    <span class="sweet-fechas pt-2">Te enviamos un correo electronico con el detalle de tu compra.</span>
                    <span class="sweet-fechas pt-3">Fecha de entrega: ${llegada.toLocaleString()}</span>`,
            position: 'center',
            color: "#ffde59e0",
            icon: 'success',
            background: "black",
            showConfirmButton: true,
            confirmButtonColor: "#ffde59e0"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../index.html";
            }
        });
        setTimeout(() => (window.location.href = "../index.html"), 10000);
    });
}
