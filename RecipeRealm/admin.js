document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario es admin
    const esAdmin = true; // Cambiar según la autenticación real

    if (!esAdmin) {
        document.body.innerHTML = '<h1>No tienes permisos para acceder a esta página.</h1>';
        return;
    }

    const listaRecetasAdmin = document.getElementById('lista-recetas-admin');
    const agregarRecetaForm = document.getElementById('agregar-receta-form');
    const nombreRecetaInput = document.getElementById('nombre-receta');
    const urlImagenInput = document.getElementById('url-imagen');
    const busquedaRecetaInput = document.getElementById('busqueda-receta');

    function cargarRecetas() {
        const recetas = JSON.parse(localStorage.getItem('recetas')) || [];
        listaRecetasAdmin.innerHTML = '';

        recetas.forEach((receta, index) => {
            const elemento = document.createElement('li');
            elemento.classList.add('receta');
            const titulo = document.createElement('h1');
            titulo.textContent = receta.Receta;
            const foto = document.createElement('img');
            foto.classList.add('foto');
            foto.src = receta.foto;
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
        const recetas = JSON.parse(localStorage.getItem('recetas')) || [];
        recetas.push({
            Receta: nombreRecetaInput.value,
            foto: urlImagenInput.value
        });
        localStorage.setItem('recetas', JSON.stringify(recetas));
        nombreRecetaInput.value = '';
        urlImagenInput.value = '';
        cargarRecetas();
    }

    function editarReceta(index) {
        const recetas = JSON.parse(localStorage.getItem('recetas')) || [];
        const nuevaReceta = prompt('Ingrese el nuevo nombre de la receta:', recetas[index].Receta);
        const nuevaImagen = prompt('Ingrese la nueva URL de la imagen:', recetas[index].foto);
        
        if (nuevaReceta && nuevaImagen) {
            recetas[index] = {
                Receta: nuevaReceta,
                foto: nuevaImagen
            };
            localStorage.setItem('recetas', JSON.stringify(recetas));
            cargarRecetas();
        }
    }

    function eliminarReceta(index) {
        const recetas = JSON.parse(localStorage.getItem('recetas')) || [];
        recetas.splice(index, 1);
        localStorage.setItem('recetas', JSON.stringify(recetas));
        cargarRecetas();
    }

    function buscarRecetas() {
        const terminoBusqueda = busquedaRecetaInput.value.toLowerCase();
        const recetas = JSON.parse(localStorage.getItem('recetas')) || [];
        listaRecetasAdmin.innerHTML = '';

        recetas.forEach((receta, index) => {
            if (receta.Receta.toLowerCase().includes(terminoBusqueda)) {
                const elemento = document.createElement('li');
                elemento.classList.add('receta');
                const titulo = document.createElement('h1');
                titulo.textContent = receta.Receta;
                const foto = document.createElement('img');
                foto.classList.add('foto');
                foto.src = receta.foto;
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
