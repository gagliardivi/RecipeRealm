const binId = '670ee9e6acd3cb34a8979feb'; // Tu binId de JSONBin
const apiKey = '$2a$10$C70KU/CxBpkg.8y88oqrzu51YZipxjkv2TNQiTruV2IhEM2qZ3Nv6'; // Tu apiKey de JSONBin

window.onload = async function() {
    const url = `https://api.jsonbin.io/v3/b/${binId}/latest`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Master-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        console.log(data.record);  // Para verificar los datos en la consola

        const listaRecetas = document.getElementById("lista-recetas");

        // Generar botones de recetas y agregar eventos
        data.record.forEach((recetaObj, index) => {
            const recetaBtn = document.createElement("button");
            recetaBtn.textContent = recetaObj.receta;
            recetaBtn.classList.add("receta");

            // Evento para mostrar detalles al hacer clic
            recetaBtn.addEventListener('click', () => mostrarDetallesReceta(recetaObj));
            listaRecetas.appendChild(recetaBtn);
        });
    } catch (error) {
        console.error('Error al obtener las recetas:', error);
    }
}

// Función para mostrar detalles de la receta seleccionada
function mostrarDetallesReceta(receta) {
    const detallesReceta = document.getElementById("detalles-receta");
    detallesReceta.innerHTML = `
        <h2>${receta.receta}</h2>
        <p><strong>Chef:</strong> ${receta.chef}</p>
        <img src="${receta.imagen}" alt="${receta.receta}" style="max-width: 100%; height: auto;">
        <h3>Ingredientes:</h3>
        <ul>
            ${receta.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
        </ul>
    `;
}
