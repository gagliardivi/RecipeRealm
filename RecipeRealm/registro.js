function ValidarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var fecha = document.getElementById("fecha").value;

    var validador = true;

    if (nombre.trim().length > 0) {
        document.getElementById("ErrorNombre").style.visibility = "hidden";
    } else {
        validador = false;
        document.getElementById("ErrorNombre").style.visibility = "visible";
    }

    if (apellido.trim().length > 0) {
        document.getElementById("ErrorApellido").style.visibility = "hidden";
    } else {
        validador = false;
        document.getElementById("ErrorApellido").style.visibility = "visible";
    }

    if (fecha) {
        document.getElementById("ErrorFecha").style.visibility = "hidden";
    } else {
        validador = false;
        document.getElementById("ErrorFecha").style.visibility = "visible";
    }

    return validador;
}

document.addEventListener('DOMContentLoaded', () => {
});

function ValidarFormulario() {
    var usuario = document.getElementById("usuario").value;
    var email = document.getElementById("email").value;
    var contraseña = document.getElementById("password").value;

    var validador = true;

    if (usuario.length > 1) {
        document.getElementById("ErrorUsuario").style.visibility = "hidden";
    } else {
        validador = false;
        document.getElementById("ErrorUsuario").style.visibility = "visible";
    }

    if (email.length > 1) {
        document.getElementById("ErrorEmail").style.visibility = "hidden";
    } else {
        validador = false;
        document.getElementById("ErrorEmail").style.visibility = "visible";
    }

    // Validar la contraseña antes de enviar el formulario
    const lengthRequirement = document.getElementById('length');
    const uppercaseRequirement = document.getElementById('uppercase');
    const numberRequirement = document.getElementById('number');

    if (
        contraseña.length > 8 &&
        /[A-Z]/.test(contraseña) &&
        /\d/.test(contraseña)
    ) {
        lengthRequirement.classList.remove('invalid');
        lengthRequirement.classList.add('valid');
        uppercaseRequirement.classList.remove('invalid');
        uppercaseRequirement.classList.add('valid');
        numberRequirement.classList.remove('invalid');
        numberRequirement.classList.add('valid');
    } else {
        validador = false;
        if (contraseña.length <= 8) {
            lengthRequirement.classList.remove('valid');
            lengthRequirement.classList.add('invalid');
        }
        if (!/[A-Z]/.test(contraseña)) {
            uppercaseRequirement.classList.remove('valid');
            uppercaseRequirement.classList.add('invalid');
        }
        if (!/\d/.test(contraseña)) {
            numberRequirement.classList.remove('valid');
            numberRequirement.classList.add('invalid');
        }
    }

    return validador;
}

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const lengthRequirement = document.getElementById('length');
    const uppercaseRequirement = document.getElementById('uppercase');
    const numberRequirement = document.getElementById('number');

    passwordInput.addEventListener('input', () => {
        const contraseña = passwordInput.value;

        // Validar longitud
        if (contraseña.length > 8) {
            lengthRequirement.classList.remove('invalid');
            lengthRequirement.classList.add('valid');
        } else {
            lengthRequirement.classList.remove('valid');
            lengthRequirement.classList.add('invalid');
        }

        // Validar mayúscula
        if (/[A-Z]/.test(contraseña)) {
            uppercaseRequirement.classList.remove('invalid');
            uppercaseRequirement.classList.add('valid');
        } else {
            uppercaseRequirement.classList.remove('valid');
            uppercaseRequirement.classList.add('invalid');
        }

        // Validar número
        if (/\d/.test(contraseña)) {
            numberRequirement.classList.remove('invalid');
            numberRequirement.classList.add('valid');
        } else {
            numberRequirement.classList.remove('valid');
            numberRequirement.classList.add('invalid');
        }
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();
    
    // Redirigir al usuario a la página deseada
    window.location.href = '/home';
});




//Aca empieza lo del profe//
function loadPage(pageUrl) {
    // Usamos fetch para hacer una solicitud GET
    fetch(pageUrl)
        .then(response => {
            // Verificamos si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            // Convertimos la respuesta a texto
            return response.text();
        })
        .then(html => {
            // Insertamos el contenido HTML dentro del contenedor
            document.getElementById('contentContainer').innerHTML = html;
        })
        .catch(error => {
            // Mostramos cualquier error en la consola
            console.error('Hubo un problema al cargar la página:', error);
        });
}

// Agregamos eventos a los botones // elemento - acción - función
document.getElementById('RegistroUsuario').addEventListener('click', function() {
    loadPage('RegistroUsuario.html');
});

document.getElementById('RegistroEnvios').addEventListener('click', function() {
    loadPage('RegistroEnvios.html');
});

document.getElementById('loadPage3').addEventListener('click', function() {
    loadPage('page3.html');
});
