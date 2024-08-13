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