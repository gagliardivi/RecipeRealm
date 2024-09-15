document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Evitar que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtener los datos ingresados por el usuario
    const usuarioIngresado = document.getElementById('usuario').value.trim();
    const passwordIngresada = document.getElementById('password').value;

    // Leer los datos de los usuarios desde localStorage
    const registros = localStorage.getItem('registros');
    if (!registros) {
        alert('No se han registrado usuarios.');
        return;
    }

    // Parsear los datos de registros a objeto
    const usuariosRegistrados = JSON.parse(registros);

    // Buscar si el usuario existe en los registros
    const usuarioValido = Object.values(usuariosRegistrados).find(user => 
        user.usuario === usuarioIngresado && user.contraseña === passwordIngresada
    );

    if (usuarioValido) {
        // Verificar si el usuario es admin o regular
        if (usuarioValido.esAdmin) {
            // Redirigir a la página de admin
            window.location.href = 'admin.html';
        } else {
            // Redirigir a la página de usuario regular
            window.location.href = 'Home.html';
        }
    } else {
        // Mostrar mensaje de error si el usuario o la contraseña son incorrectos
        alert('Usuario o contraseña incorrectos.');
    }
});
