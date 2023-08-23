document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");

   // PARTE 2
/*
    Por lo que entendí del ejercicio, al elegir una categoría dentro de index.html (Autos, Juguetes, Muebles) se carga en localStorage un valor (101 si accedemos a autos, 102 para juguetes y 103 para muebles).

    Modifiqué el código para que en vez de utilizar una URL fija "https://japceibal.github.io/emercado-api/cats_products/101.json", esta sea dinámica y cambie según la categoría que seleccionemos:
    
    "https://japceibal.github.io/emercado-api/cats_products/101.json" para categoría Autos.
    "https://japceibal.github.io/emercado-api/cats_products/102.json" para categoría Juguetes.
    "https://japceibal.github.io/emercado-api/cats_products/103.json" para categoría Muebles.
*/

    const catID = localStorage.getItem("catID"); // obtener la clave de localStorage

    console.log(catID); // prueba, para no acceder a applicartion...

    if (catID) { // si catID es distinto del vacio entonces es true y con ese notenido arma la URL
        const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    // pasa a estar dentro del if
    // Realizar la petición GET usando Fetch API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Iterar a través de los productos en el JSON
            data.products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                const divTexto = document.createElement("div");
                divTexto.classList.add("divParaTexto");

                const divImg = document.createElement("div");
                divImg.classList.add("divParaImg");

                // Crear elementos para cada propiedad del producto
                const productName = document.createElement("h4");
                productName.textContent = product.name;

                const productDescription = document.createElement("p");
                productDescription.textContent = product.description;

                const productPrice = document.createElement("h5");
                productPrice.textContent = `Precio: USD ${product.cost}`;

                const productSold = document.createElement("p");
                productSold.textContent = ` ${product.soldCount} vendidos`;

                const productImage = document.createElement("img");
                productImage.src = product.image;
                productImage.alt = product.name;

                productDiv.appendChild(divTexto);
                productDiv.appendChild(divImg);
                
                // Agregar elementos al contenedor del producto
                divTexto.appendChild(productName);
                divTexto.appendChild(productDescription);
                divTexto.appendChild(productPrice);
                divTexto.appendChild(productSold);
                divImg.appendChild(productImage);

                // Agregar el contenedor del producto a la lista de productos
                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
}
});
