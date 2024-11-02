document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuarioIngresado = document.getElementById('usuario').value.trim();
    const passwordIngresada = document.getElementById('password').value;

    const registros = localStorage.getItem('registros');
    if (!registros) {
        alert('No se han registrado usuarios.');
        return;
    }

    const usuariosRegistrados = JSON.parse(registros);

    // Buscar el usuario y validar la contraseña
    const usuarioValido = usuariosRegistrados.usuarios.find(user => 
        user.usuario === usuarioIngresado && user.password === passwordIngresada
    );

    if (usuarioValido) {
        // Redirigir según el rol del usuario
        if (usuarioValido.rol === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'Home.html';
        }
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});
