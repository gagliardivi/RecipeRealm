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

// Función para formatear el número de tarjeta con guiones
function formatearTarjeta(value) {
    // Eliminar todos los caracteres no numéricos
    value = value.replace(/\D/g, '');

    // Agregar guiones después de cada 4 dígitos
    const partes = [];
    for (let i = 0; i < value.length; i += 4) {
        partes.push(value.substring(i, i + 4));
    }

    return partes.join('-');
}

// Función para manejar el evento de entrada en el campo de tarjeta
function manejarInputTarjeta(event) {
    const input = event.target;
    input.value = formatearTarjeta(input.value);
}

// Función para guardar los datos de registro
function guardarDatosRegistro(usuario, email, contraseña, esAdmin) {
    // Creamos un objeto con los datos del usuario
    const datosUsuario = {
        usuario: usuario,
        email: email,
        contraseña: contraseña,
        esAdmin: esAdmin
    };

    // Almacenamos el objeto en localStorage (puede usarse sessionStorage también si se prefiere)
    localStorage.setItem(email, JSON.stringify(datosUsuario));
}

// Función para guardar la información adicional del modal
function guardarInformacionAdicional() {
    const direccion = document.getElementById('direccion').value.trim();
    const telefonoClub = document.getElementById('telefonoClub').value.trim();
    const tarjeta = document.getElementById('tarjeta').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    // Validar el formato del número de tarjeta y CVV
    const tarjetaRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    const cvvRegex = /^\d{3}$/;

    if (!tarjetaRegex.test(tarjeta)) {
        alert('Número de tarjeta inválido. Debe tener el formato XXXX-XXXX-XXXX-XXXX.');
        return;
    }

    if (!cvvRegex.test(cvv)) {
        alert('CVV inválido. Debe tener exactamente 3 dígitos.');
        return;
    }

    if (direccion && telefonoClub) {
        // Obtener el usuario actual (debe definirse cómo obtener este dato)
        const usuarioEmail = document.getElementById('email').value.trim();
        
        // Recuperar los datos del usuario del localStorage
        const datosUsuario = JSON.parse(localStorage.getItem(usuarioEmail));
        if (datosUsuario) {
            // Agregar la información adicional
            datosUsuario.direccion = direccion;
            datosUsuario.telefono = telefonoClub;
            datosUsuario.tarjeta = tarjeta;
            datosUsuario.cvv = cvv;

            // Guardar de nuevo en localStorage
            localStorage.setItem(usuarioEmail, JSON.stringify(datosUsuario));

            // Cerrar el modal
            closeModal();
            alert('Información adicional guardada exitosamente.');
        } else {
            alert('No se encontraron datos para este usuario.');
        }
    } else {
        alert('Por favor complete todos los campos.');
    }
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
        guardarDatosRegistro(usuario, email, contraseña, esAdmin);

        // Abrir el modal para información adicional
        openModal();
    }
}

// Asignamos la función al evento de submit del formulario
document.getElementById("registroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario
    manejarRegistro();
});

// Asignamos el formato automático del número de tarjeta al campo correspondiente
document.getElementById('tarjeta').addEventListener('input', manejarInputTarjeta);

// Asignar la función al botón de guardar información adicional en el modal
document.getElementById('guardarInformacion').addEventListener('click', guardarInformacionAdicional);
