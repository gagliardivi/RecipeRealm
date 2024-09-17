document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario es admin
    const esAdmin = true; // Cambiar según la autenticación real

    if (!esAdmin) {
        document.body.innerHTML = '<h1>No tienes permisos para acceder a esta página.</h1>';
        return;
    }

    // Referencias a los elementos del DOM
    const agregarRecetaForm = document.getElementById('agregar-receta-form');
    const nombreRecetaInput = document.getElementById('nombre-receta');
    const urlImagenInput = document.getElementById('url-imagen');
    const busquedaRecetaInput = document.getElementById('busqueda-receta');
    const listaRecetasAdmin = document.getElementById('lista-recetas-admin');

    // Función para cargar todas las recetas (predeterminadas + LocalStorage)
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
        });
    }

    // Función para agregar nueva receta
    function agregarReceta(event) {
        event.preventDefault();

        // Validar campos
        if (!nombreRecetaInput.value || !urlImagenInput.value) {
            alert('Por favor, completa todos los campos requeridos.');
            return;
        }

        const receta = {
            nombre: nombreRecetaInput.value,
            imagen: urlImagenInput.value
        };

        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        recetasGuardadas.push(receta);
        localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));
        nombreRecetaInput.value = '';
        urlImagenInput.value = '';
        agregarRecetaForm.reset();
        cargarRecetas();
    }

    // Función para editar receta
    function editarReceta(index) {
        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        const receta = recetasGuardadas[index];
        
        nombreRecetaInput.value = receta.nombre;
        urlImagenInput.value = receta.imagen;

        // Reemplazar receta en el LocalStorage
        agregarRecetaForm.onsubmit = function(event) {
            event.preventDefault();
            receta.nombre = nombreRecetaInput.value;
            receta.imagen = urlImagenInput.value;

            recetasGuardadas[index] = receta;
            localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));
            nombreRecetaInput.value = '';
            urlImagenInput.value = '';
            agregarRecetaForm.reset();
            cargarRecetas();
        };
    }

    // Función para eliminar receta
    function eliminarReceta(index) {
        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        recetasGuardadas.splice(index, 1);
        localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));
        cargarRecetas();
    }

    // Función para buscar recetas
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

    // Event Listeners
    agregarRecetaForm.addEventListener('submit', agregarReceta);
    busquedaRecetaInput.addEventListener('input', buscarRecetas);

    // Inicializar la carga de recetas al cargar la página
    cargarRecetas();
});
