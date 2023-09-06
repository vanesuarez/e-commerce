document.addEventListener("DOMContentLoaded", function(){

    /* por ahora la URL es estática, cuando tengamos el código de la parte 1, podremos crear la URL dinámica, ya que lo único que cambia es el número final.
    const pID = localStorage.getItem("pID"); */

    const url = "https://japceibal.github.io/emercado-api/products/50921.json";

        fetch(url)
            .then(response => response.json())
            .then(data => {

                document.getElementById("productName").innerHTML = data.name;
                document.getElementById("productPrice").innerHTML = `<b>Precio</b> <br>${data.currency} ${data.cost}`;
                document.getElementById("productDescription").innerHTML = `<b>Descripción</b> <br>${data.description}`;
                document.getElementById("productCategory").innerHTML = `<b>Categoría</b> <br>${data.category}`;
                document.getElementById("productSoldCount").innerHTML = `<b>Vendidos</b> <br>${data.soldCount}`;

                const imagesDiv = document.getElementById("productImages");
                imagesDiv.innerHTML = `<b>Imágenes ilustrativas</b><br>`
                data.images.forEach(image => {
                    const imgElement = document.createElement("img");
                    imgElement.src = image;
                    imagesDiv.appendChild(imgElement);
                });
            })
            .catch(error => {
                console.error("Error al cargar los datos:", error);
            });

})
