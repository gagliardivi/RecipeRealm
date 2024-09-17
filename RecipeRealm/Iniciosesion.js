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

    
    const usuarioValido = Object.values(usuariosRegistrados).find(user => 
        user.usuario === usuarioIngresado && user.contraseña === passwordIngresada
    );

    if (usuarioValido) {
        
        if (usuarioValido.esAdmin) {
            
            window.location.href = 'admin.html';
        } else {
            
            window.location.href = 'Home.html';
        }
    } else {
        
        alert('Usuario o contraseña incorrectos.');
    }
});
