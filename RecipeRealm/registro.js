// Validar el formulario antes de enviar
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Si la validación es exitosa, guarda los datos en LocalStorage y redirige
    if (ValidarFormulario()) {
        // Obtén los valores de los campos del formulario
        const usuario = document.getElementById('usuario').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const tarjeta = document.getElementById('tarjeta').value;
        const cvv = document.getElementById('cvv').value;

        // Guarda los datos en LocalStorage
        const datosUsuario = {
            usuario: usuario,
            email: email,
            password: password,
            direccion: direccion,
            telefono: telefono,
            tarjeta: tarjeta,
            cvv: cvv
        };

        localStorage.setItem('usuario', JSON.stringify(datosUsuario)); // Guarda los datos en LocalStorage

        // Redirige al inicio de sesión
        window.location.href = 'login.html';
    }
});

// Función para validar el formulario
function ValidarFormulario() {
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const tarjeta = document.getElementById('tarjeta').value;
    const cvv = document.getElementById('cvv').value;

    let esValido = true;

    // Validar campos vacíos
    if (!usuario) {
        document.getElementById('ErrorUsuario').style.visibility = 'visible';
        esValido = false;
    } else {
        document.getElementById('ErrorUsuario').style.visibility = 'hidden';
    }

    if (!email) {
        document.getElementById('ErrorEmail').style.visibility = 'visible';
        esValido = false;
    } else {
        document.getElementById('ErrorEmail').style.visibility = 'hidden';
    }

    // Validar contraseña
    if (!validarPassword(password)) {
        esValido = false;
    }

    // Validar campos adicionales
    if (!direccion || !telefono || !tarjeta || !cvv) {
        alert("Todos los campos deben estar completos.");
        esValido = false;
    }

    return esValido;
}

// Validación de contraseña
function validarPassword(password) {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);

    document.getElementById('length').className = length ? 'valid' : 'invalid';
    document.getElementById('uppercase').className = uppercase ? 'valid' : 'invalid';
    document.getElementById('number').className = number ? 'valid' : 'invalid';

    return length && uppercase && number;
}

// Mostrar/ocultar contraseña
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}
