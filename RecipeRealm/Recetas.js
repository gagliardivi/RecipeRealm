document.addEventListener('DOMContentLoaded', () => {
    const listaRecetas = document.getElementById('lista-recetas');

    // Recetas predeterminadas
    const recetasPredeterminadas = [
        { Receta: 'Pastel de papa', foto: 'Imágenes/pasteldepapa.jpg' },
        { Receta: 'Guiso de lentejas', foto: 'https://content-cocina.lecturas.com/medio/2023/03/22/paso_a_paso_para_realizar_guiso_de_lentejas_con_arroz_y_verduras_resultado_final_957b3be1_1200x1200.jpg' },
        { Receta: 'Risotto', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaLrBtQ3kmRQSiYeP3c9qMR-K--8bfrvRBzQ&s' },
        { Receta: 'Pasta carbonara', foto: 'https://www.infobae.com/new-resizer/ruQGdueW65wv2fFWr2KKDxpDmiA=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/Y2XDVW2ZCNGR5IZKNPR6N4H7B4.png' }
    ];

    // Función para cargar las recetas (predeterminadas + las de LocalStorage)
    function cargarRecetas() {
        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
        
        // Combinamos las recetas predeterminadas con las del LocalStorage
        const recetasCompletas = [...recetasPredeterminadas, ...recetasGuardadas];
        
        // Limpiamos la lista antes de renderizar
        listaRecetas.innerHTML = '';

        // Recorremos todas las recetas y las mostramos
        recetasCompletas.forEach((receta) => {
            const elemento = document.createElement('li');
            elemento.classList.add('receta');

            const titulo = document.createElement('h1');
            titulo.textContent = receta.Receta;

            const foto = document.createElement('img');
            foto.classList.add('foto');
            foto.src = receta.foto;

            // Crear botón "Ver receta"
            const boton = document.createElement('a');
            boton.textContent = "Ver receta";
            boton.href = "Receta.html"; // Cambia este enlace según el destino adecuado
            boton.classList.add('boton');

            // Añadir los elementos al contenedor
            elemento.appendChild(titulo);
            elemento.appendChild(foto);
            elemento.appendChild(boton); // Agregamos el botón

            listaRecetas.appendChild(elemento);
        });
    }

    // Cargar las recetas al cargar la página
    cargarRecetas();
});
