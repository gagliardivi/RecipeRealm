const API_URL = 'https://api.jsonbin.io/v3/b/670ee6c8e41b4d34e443669f'; // Reemplaza con tu ID de bin en Jsonbin
const API_KEY = '$2a$10$C70KU/CxBpkg.8y88oqrzu51YZipxjkv2TNQiTruV2IhEM2qZ3Nv6'; // Reemplaza con tu clave de API de Jsonbin

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const usuarioIngresado = document.getElementById('usuario').value.trim();
    const passwordIngresada = document.getElementById('password').value;

    // Obtén la lista de usuarios desde Jsonbin
    const usuariosRegistrados = await obtenerUsuarios();

    if (usuariosRegistrados.length === 0) {
        alert('No se han registrado usuarios.');
        return;
    }

    // Buscar el usuario y validar la contraseña
    const usuarioValido = usuariosRegistrados.find(user => 
        user.usuario === usuarioIngresado && user.password === passwordIngresada
    );

    if (usuarioValido) {
        // Redirigir según el rol del usuario
        if (usuarioValido.rol === 'admin') {
            // Redirige a admin.html si el usuario es admin
            window.location.href = 'admin.html';
        } else {
            // Redirige a Home.html si el usuario es regular
            window.location.href = 'Home.html';
        }
    } else {
        alert('Usuario o contraseña incorrectos.');
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
