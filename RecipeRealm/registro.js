// Función para alternar la visibilidad del formulario del Club de Socios
function toggleClubForm() {
    const clubForm = document.getElementById('clubForm');
    clubForm.style.display = clubForm.style.display === 'none' ? 'block' : 'none';
}

// Función para alternar la visibilidad de la contraseña
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const toggleText = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleText.textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        toggleText.textContent = 'Mostrar';
    }
}

// Función de validación del formulario
function ValidarFormulario() {
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("password").value;
    const suscripcionClub = document.getElementById("suscripcionClub")?.checked;
    const telefono = document.getElementById("telefono")?.value.trim();
    let validador = true;

    // Validar el usuario
    if (usuario.length > 1) {
        document.getElementById("ErrorUsuario").style.visibility = "hidden";
    } else {
        validador = false;
        document.getElementById("ErrorUsuario").style.visibility = "visible";
    }

    // Validar el correo
    if (email.length > 1) {
        document.getElementById("ErrorEmail").style.visibility = "hidden";
    } else {
        validador = false;
        document.getElementById("ErrorEmail").style.visibility = "visible";
    }

    // Validar la contraseña
    const lengthRequirement = document.getElementById('length');
    const uppercaseRequirement = document.getElementById('uppercase');
    const numberRequirement = document.getElementById('number');

    if (contraseña.length > 8 && /[A-Z]/.test(contraseña) && /\d/.test(contraseña)) {
        lengthRequirement.classList.remove('invalid');
        lengthRequirement.classList.add('valid');
        uppercaseRequirement.classList.remove('invalid');
        uppercaseRequirement.classList.add('valid');
        numberRequirement.classList.remove('invalid');
        numberRequirement.classList.add('valid');
    } else {
        validador = false;
        lengthRequirement.classList.toggle('valid', contraseña.length > 8);
        lengthRequirement.classList.toggle('invalid', contraseña.length <= 8);
        uppercaseRequirement.classList.toggle('valid', /[A-Z]/.test(contraseña));
        uppercaseRequirement.classList.toggle('invalid', !/[A-Z]/.test(contraseña));
        numberRequirement.classList.toggle('valid', /\d/.test(contraseña));
        numberRequirement.classList.toggle('invalid', !/\d/.test(contraseña));
    }

    // Validar teléfono si se selecciona la suscripción al Club
    if (suscripcionClub) {
        const telefonoRegex = /^(11|15)\d{8}$/;
        if (!telefonoRegex.test(telefono)) {
            validador = false;
            document.getElementById("ErrorTelefono").style.visibility = "visible";
        } else {
            document.getElementById("ErrorTelefono").style.visibility = "hidden";
        }
    }

    if (validador) {
        // Redirige al inicio de sesión si el formulario es válido
        window.location.href = 'Iniciosesion.html';
    }

    return false; // Previene el envío del formulario para manejar la redirección manualmente
}

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const lengthRequirement = document.getElementById('length');
    const uppercaseRequirement = document.getElementById('uppercase');
    const numberRequirement = document.getElementById('number');

    passwordInput.addEventListener('input', () => {
        const contraseña = passwordInput.value;

        // Validar longitud
        lengthRequirement.classList.toggle('valid', contraseña.length > 8);
        lengthRequirement.classList.toggle('invalid', contraseña.length <= 8);

        // Validar mayúscula
        uppercaseRequirement.classList.toggle('valid', /[A-Z]/.test(contraseña));
        uppercaseRequirement.classList.toggle('invalid', !/[A-Z]/.test(contraseña));

        // Validar número
        numberRequirement.classList.toggle('valid', /\d/.test(contraseña));
        numberRequirement.classList.toggle('invalid', !/\d/.test(contraseña));
    });
});

// Función para abrir el modal
function openModal() {
    const modal = document.getElementById('clubModal');
    modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('clubModal');
    modal.style.display = 'none';
}
