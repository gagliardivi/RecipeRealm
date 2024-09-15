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

    return validador;
}

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

// Función para guardar los datos de registro en localStorage
function guardarRegistro(email, usuario, contraseña, esAdmin = false) {
    // Obtener los registros existentes de localStorage
    let registros = localStorage.getItem('registros');

    // Si no hay registros, inicializamos como un objeto vacío
    if (!registros) {
        registros = {};
    } else {
        // Parseamos los registros existentes de JSON a objeto
        registros = JSON.parse(registros);
    }

    // Crear el objeto de usuario
    const nuevoUsuario = {
        usuario: usuario,
        contraseña: contraseña,
        esAdmin: esAdmin // Esto indica si el usuario es un administrador
    };

    // Agregar el nuevo usuario al objeto de registros
    registros[email] = nuevoUsuario;

    // Guardar de nuevo en localStorage en formato JSON
    localStorage.setItem('registros', JSON.stringify(registros));

    console.log("Registro guardado exitosamente.");
}

// Función para manejar el registro
function manejarRegistro() {
    if (ValidarFormulario()) {
        const usuario = document.getElementById("usuario").value.trim();
        const email = document.getElementById("email").value.trim();
        const contraseña = document.getElementById("password").value;

        // Diferenciar si es admin o no
        let esAdmin = false;
        if (email === "admin@gmail.com") {
            esAdmin = true;
        }

        // Guardamos los datos en localStorage
        guardarRegistro(email, usuario, contraseña, esAdmin);

        // Redirigir al inicio de sesión
        window.location.href = "Iniciosesion.html";
    }
}

// Asignamos la función al evento de submit del formulario
document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario
    manejarRegistro();
});
