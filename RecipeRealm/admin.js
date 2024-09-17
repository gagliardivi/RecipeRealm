document.addEventListener('DOMContentLoaded', () => {
    const esAdmin = true; // Cambiar según la autenticación real

    if (!esAdmin) {
        document.body.innerHTML = '<h1>No tienes permisos para acceder a esta página.</h1>';
        return;
    }

    const agregarRecetaForm = document.getElementById('agregar-receta-form');
    const nombreRecetaInput = document.getElementById('nombre-receta');
    const urlImagenInput = document.getElementById('url-imagen');
    const busquedaRecetaInput = document.getElementById('busqueda-receta');
    const listaRecetasAdmin = document.getElementById('lista-recetas-admin');

    let modoEdicionIndex = null; // Para controlar el índice de la receta en edición

    function cargarRecetas() {
        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        listaRecetasAdmin.innerHTML = '';

        recetasGuardadas.forEach((receta, index) => {
            const elemento = document.createElement('li');
            elemento.classList.add('receta');
            
            const titulo = document.createElement('h1');
            titulo.textContent = receta.nombre;

            const foto = document.createElement('img');
            foto.classList.add('foto');
            foto.src = receta.imagen; // Verifica que esta URL sea correcta

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.classList.add('editar-btn');
            editarBtn.onclick = () => editarReceta(index);

            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.classList.add('eliminar-btn');
            eliminarBtn.onclick = () => eliminarReceta(index);

            elemento.appendChild(titulo);
            elemento.appendChild(foto);
            elemento.appendChild(editarBtn);
            elemento.appendChild(eliminarBtn);
            listaRecetasAdmin.appendChild(elemento);
        });
    }

    function agregarReceta(event) {
        event.preventDefault();

        if (!nombreRecetaInput.value || !urlImagenInput.value) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        const receta = {
            nombre: nombreRecetaInput.value,
            imagen: urlImagenInput.value
        };

        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        
        if (modoEdicionIndex !== null) {
            // Editar receta existente
            recetasGuardadas[modoEdicionIndex] = receta;
            modoEdicionIndex = null; // Reseteamos el índice de edición
        } else {
            // Agregar nueva receta
            recetasGuardadas.push(receta);
        }

        localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));

        // Limpiar campos y recargar recetas
        nombreRecetaInput.value = '';
        urlImagenInput.value = '';
        agregarRecetaForm.reset();
        cargarRecetas();
    }

    function editarReceta(index) {
        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        const receta = recetasGuardadas[index];
        
        nombreRecetaInput.value = receta.nombre;
        urlImagenInput.value = receta.imagen;

        // Cambiar el índice de edición
        modoEdicionIndex = index;
    }

    function eliminarReceta(index) {
        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        recetasGuardadas.splice(index, 1);
        localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));
        cargarRecetas();
    }

    function buscarRecetas() {
        const terminoBusqueda = busquedaRecetaInput.value.toLowerCase();
        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        listaRecetasAdmin.innerHTML = '';

        recetasGuardadas.forEach((receta, index) => {
            if (receta.nombre.toLowerCase().includes(terminoBusqueda)) {
                const elemento = document.createElement('li');
                elemento.classList.add('receta');
                const titulo = document.createElement('h1');
                titulo.textContent = receta.nombre;
                const foto = document.createElement('img');
                foto.classList.add('foto');
                foto.src = receta.imagen;
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.classList.add('editar-btn');
                editarBtn.onclick = () => editarReceta(index);
                const eliminarBtn = document.createElement('button');
                eliminarBtn.textContent = 'Eliminar';
                eliminarBtn.classList.add('eliminar-btn');
                eliminarBtn.onclick = () => eliminarReceta(index);

                elemento.appendChild(titulo);
                elemento.appendChild(foto);
                elemento.appendChild(editarBtn);
                elemento.appendChild(eliminarBtn);
                listaRecetasAdmin.appendChild(elemento);
            }
        });
    }

    agregarRecetaForm.addEventListener('submit', agregarReceta);
    busquedaRecetaInput.addEventListener('input', buscarRecetas);

    cargarRecetas();
});
