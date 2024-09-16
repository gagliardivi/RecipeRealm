var receta = [{
    "paso": "1. Pelar las papas y cortarlas en pedazos grandes. Cocinarlas en agua caliente, salada, hasta que estén blandas.",
    "imagen": "https://img.freepik.com/foto-gratis/mujer-pelando-algunas-papas-crudas-cerca_23-2148501661.jpg?size=626&ext=jpg&ga=GA1.1.933601817.1717545600&semt=ais_user"
}, {
    "paso": "2. Retirar del agua y aplastar la papa mientras agregas la leche tibia.",
    "imagen": "https://blog.marianlaquecocina.com/wp-content/uploads/2015/08/sam_6656.jpg"
}, {
    "paso": "3. Agregar crema, mantequilla y sal.",
    "imagen": "https://recetasdecocina.elmundo.es/wp-content/uploads/2015/10/como-hacer-pure-de-patatas-ligero.jpg"
}, {
    "paso": "4. En una sartén, calentar el aceite.",
    "imagen": "https://estaticos-cdn.prensaiberica.es/clip/3bde5467-ce16-4403-aaf0-c7a78caccc6a_16-9-discover-aspect-ratio_default_0.jpg"
}, {
    "paso": "5. Agregar la carne y cocinar hasta dorar.",
    "imagen": "https://www.recetasnestle.cl/sites/default/files/2022-05/recetas-carne-molida-sarten.jpg.jpg"
}, {
    "paso": "6. Agregar la cebolla junto al ajo y el caldo de carne.",
    "imagen": "https://www.wikihow.com/images_en/thumb/c/c7/Cook-Mince-Step-16-Version-2.jpg/550px-nowatermark-Cook-Mince-Step-16-Version-2.jpg"
}, {
    "paso": "7. Cocinar hasta que la cebolla esté cocida y la mezcla jugosa.",
    "imagen": "https://www.wikihow.com/images_en/thumb/a/aa/Cook-Mince-Step-17-Version-2.jpg/550px-nowatermark-Cook-Mince-Step-17-Version-2.jpg"
}];

var numeropaso = 0;

window.onload = function() {
    updateStep();
}

function PasarAlSiguiente() {
    if (numeropaso < receta.length - 1) {
        numeropaso++;
        updateStep();
    }
}

function VolverAlAnterior() {
    if (numeropaso > 0) {
        numeropaso--;
        updateStep();
    }
}

function updateStep() {
    var paso = document.getElementById("paso");
    var imagen = document.getElementById("paso-imagen");

    paso.textContent = receta[numeropaso].paso;
    imagen.src = receta[numeropaso].imagen;
    imagen.alt = "Imagen del paso " + (numeropaso + 1);
}



