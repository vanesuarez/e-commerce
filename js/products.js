document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");

    const catID = localStorage.getItem("catID"); // obtener la clave de localStorage

    if (catID) { // si catID es distinto del vacio entonces es true y con ese contenido crea la URL
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

// para arreglar la descripción de cada producto

const pDet = document.getElementById("detalle"); // llama al párrafo que aparece debajo de Productos.

if (catID == 101) { // si catID es 101, accedimos a la categoría autos.
    pDet.textContent = "Veras aqui todos los productos de la categoria autos."
} else if (catID == 102) { // si catID es 102, accedimos a la categoría juguetes.
    pDet.textContent = "Veras aqui todos los productos de la categoria jueguetes."
} else { // si no es ninguna de las anteriores es porque accedimos a la categoría muebles.
    pDet.textContent = "Veras aqui todos los productos de la categoria muebles."
}

});
