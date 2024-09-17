document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    if (ValidarFormulario()) {
        
        const usuario = document.getElementById('usuario').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const tarjeta = document.getElementById('tarjeta').value;
        const cvv = document.getElementById('cvv').value;

      
        const registros = localStorage.getItem('registros');
        const usuariosRegistrados = registros ? JSON.parse(registros) : { usuarios: [] };

       
        if (!Array.isArray(usuariosRegistrados.usuarios)) {
            usuariosRegistrados.usuarios = [];
        }

        
        usuariosRegistrados.usuarios.push({
            usuario: usuario,
            email: email,
            password: password, // Guarda la contraseña tal cual
            direccion: direccion,
            telefono: telefono,
            tarjeta: tarjeta,
            cvv: cvv,
            rol: 'usuario' 
        });

       
        localStorage.setItem('registros', JSON.stringify(usuariosRegistrados));

      
        window.location.href = 'Iniciosesion.html';
    }
});


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


function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}
