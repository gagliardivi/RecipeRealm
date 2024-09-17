function ValidarFormulario() {
    const usuario = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("password").value;
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const tarjeta = document.getElementById("tarjeta").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    let validador = true;

    if (usuario.length > 1) {
        document.getElementById("ErrorUsuario").style.visibility = "hidden";
    } else {
        document.getElementById("ErrorUsuario").style.visibility = "visible";
        validador = false;
    }

    if (email.includes("@") && email.includes(".")) {
        document.getElementById("ErrorEmail").style.visibility = "hidden";
    } else {
        document.getElementById("ErrorEmail").style.visibility = "visible";
        validador = false;
    }

    // Validar otros campos según sea necesario

    if (validador) {
        guardarDatosLocalStorage(usuario, email, contraseña, direccion, telefono, tarjeta, cvv);
    }

    return false; // Para evitar el envío del formulario hasta que todos los datos estén validados
}

function guardarDatosLocalStorage(usuario, email, contraseña, direccion, telefono, tarjeta, cvv) {
    const datosUsuario = {
        usuario: usuario,
        email: email,
        contraseña: contraseña,
        direccion: direccion,
        telefono: telefono,
        tarjeta: tarjeta,
        cvv: cvv
    };
    localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
    alert("Datos guardados correctamente");
}
