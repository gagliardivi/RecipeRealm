var recetas = JSON.parse(localStorage.getItem('recetas')) || [
    {
        "Receta":"Pastel de papa",
        "foto": "Imágenes/pasteldepapa.jpg"
    },
    {
        "Receta":"Guiso de lentejas",
        "foto":"https://content-cocina.lecturas.com/medio/2023/03/22/paso_a_paso_para_realizar_guiso_de_lentejas_con_arroz_y_verduras_resultado_final_957b3be1_1200x1200.jpg"
    },
    {
        "Receta":"Risotto",
        "foto":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaLrBtQ3kmRQSiYeP3c9qMR-K--8bfrvRBzQ&s"
    },
    {
        "Receta":"Pasta carbonara",
        "foto":"https://www.infobae.com/new-resizer/ruQGdueW65wv2fFWr2KKDxpDmiA=/1200x900/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/Y2XDVW2ZCNGR5IZKNPR6N4H7B4.png"
    }
];

window.onload = function() {
    var lista = document.getElementById("lista");
    for (let index = 0; index < recetas.length; index++) {
        var elemento = document.createElement("li");
        elemento.classList.add("receta");

        var titulo = document.createElement("h1");
        titulo.textContent = recetas[index].Receta;

        var boton = document.createElement("a");
        boton.textContent = "Ver receta";
        boton.href = "Receta.html";
        boton.classList.add("boton");

        var foto = document.createElement("img");
        foto.classList.add("foto");
        foto.src = recetas[index].foto;

        elemento.appendChild(titulo);
        elemento.appendChild(foto);
        elemento.appendChild(boton);
        lista.appendChild(elemento);
    }
}
