const API_URL = 'https://api.jsonbin.io/v3/b/670ee6c8e41b4d34e443669f'; // Reemplaza con tu ID de bin en Jsonbin
const API_KEY = '$2a$10$C70KU/CxBpkg.8y88oqrzu51YZipxjkv2TNQiTruV2IhEM2qZ3Nv6'; // Reemplaza con tu clave de API de Jsonbin

// Escuchar el evento de submit del formulario
document.getElementById('registroForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    if (ValidarFormulario()) {
        // Obtenemos los valores de los campos del formulario
        const usuario = document.getElementById('usuario').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const tarjeta = document.getElementById('tarjeta').value;
        const cvv = document.getElementById('cvv').value;

        // Obtenemos los usuarios ya registrados en Jsonbin
        const usuariosRegistrados = await obtenerUsuarios();

        // Lógica para definir el rol de admin basado en el email
        const rol = (email === 'admin@ejemplo.com') ? 'admin' : 'usuario';

        // Agregamos el nuevo usuario a la lista con el rol correspondiente
        usuariosRegistrados.push({
            usuario: usuario,
            email: email,
            password: password, // Guarda la contraseña tal cual (recomendado cifrar en producción)
            direccion: direccion,
            telefono: telefono,
            tarjeta: tarjeta,
            cvv: cvv,
            rol: rol
        });

        // Guardamos los usuarios actualizados en Jsonbin
        await actualizarUsuarios(usuariosRegistrados);

        // Redirige al usuario a la página de inicio de sesión
        window.location.href = 'Iniciosesion.html';
    }
});

// Función para obtener los usuarios de Jsonbin
async function obtenerUsuarios() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.record.usuarios || []; // Devuelve los usuarios o un arreglo vacío
        } else {
            console.error("Error al obtener los usuarios");
            return [];
        }
    } catch (error) {
        console.error("Hubo un problema al obtener los usuarios:", error);
        return [];
    }
}

// Función para actualizar los usuarios en Jsonbin
async function actualizarUsuarios(usuarios) {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ usuarios: usuarios })
        });

        if (!response.ok) {
            console.error("Error al actualizar los usuarios");
        }
    } catch (error) {
        console.error("Hubo un problema al actualizar los usuarios:", error);
    }
}

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

    if (!direccion || !telefono || !tarjeta || !cvv) {
        alert("Todos los campos deben estar completos.");
        esValido = false;
    }

    return esValido;
}

// Validación dinámica de la contraseña
document.getElementById('password').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    validarPassword(password);
});

function validarPassword(password) {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);

    document.getElementById('length').className = length ? 'valid' : 'invalid';
    document.getElementById('uppercase').className = uppercase ? 'valid' : 'invalid';
    document.getElementById('number').className = number ? 'valid' : 'invalid';
}

// Mostrar u ocultar la contraseña
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}
