// Validar el formulario antes de enviar
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
