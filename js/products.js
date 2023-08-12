document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");

    // URL del JSON de productos
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    // Realizar la petición GET usando Fetch API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Iterar a través de los productos en el JSON
            data.products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                // Crear elementos para cada propiedad del producto
                const productName = document.createElement("p");
                productName.textContent = product.name;

                const productDescription = document.createElement("p");
                productDescription.textContent = product.description;

                const productPrice = document.createElement("p");
                productPrice.textContent = `Precio: USD ${product.cost}`;

                const productSold = document.createElement("p");
                productSold.textContent = ` ${product.soldCount} vendidos`;

                const productImage = document.createElement("img");
                productImage.src = product.image;
                productImage.alt = product.name;

                // Agregar elementos al contenedor del producto
                productDiv.appendChild(productName);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productSold);
                productDiv.appendChild(productImage);

                // Agregar el contenedor del producto a la lista de productos
                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
});