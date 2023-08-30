


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

            // ENTREGA 2 - DESAFIATE

            // Almacenamos todos los elementos de producto en un array
            const products = Array.from(document.querySelectorAll(".product")); // se seleccionan todos los elementos con la clase products y lo convertimos en un array utilizando array.from()
            
            // Manejamos el evento de filtro en tiempo real
            const inputFilter = document.getElementById("inputFilter");
            inputFilter.addEventListener("input", function () { // agregamos evento de escucha , cuando el usuario escribe en el tecelado el codigo se ejecutara
                const filterText = inputFilter.value.toLowerCase().trim(); // accedemos al texto que escribio el usuario y le hacemos validaciones 
                products.forEach(product => {  // recorremos el array que creamos en la linea 54 
                    const productName = product.querySelector("h4").textContent.toLowerCase().trim(); // obtenemos el nombre del producto y le hacemos sus validaciones (convertir texto en minuscula y eliminar espacios)
                    const productDescription = product.querySelector("p").textContent.toLowerCase().trim(); // obtenemos la descripcion del producto y le hacemos sus validaciones (convertir texto en minuscula y eliminar espacios)
                    
                    if (productName.includes(filterText) || productDescription.includes(filterText)) { // utilizamos includes y verificamos si hay texto ingresado relacionado con el titulo o || la descripcion del producto
                        product.style.display = "block";  // si se cumple va a mostrar los productos 
                    } else {
                        product.style.display = "none"; // va a ocultar los productos que no cumplan
                    }
                });
            });
            
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });

});

// Filtrar productos por precio
const filterButton = document.getElementById("rangeFilterCount");
filterButton.addEventListener("click", filterProducts);

function filterProducts() {
    const minPriceInput = document.getElementById("rangeFilterCountMin");
    const maxPriceInput = document.getElementById("rangeFilterCountMax");

    const minPrice = parseFloat(minPriceInput.value);
    const maxPrice = parseFloat(maxPriceInput.value);

    // Obtén todos los productos
    const products = document.querySelectorAll(".product");

    // Itera sobre los productos y muestra solo los que están en el rango de precio
    products.forEach(product => {
        const productPrice = product.querySelector("h5");
        const productPriceValue = parseFloat(productPrice.textContent.replace("Precio: USD ", ""));

        if ((isNaN(minPrice) || productPriceValue >= minPrice) && (isNaN(maxPrice) || productPriceValue <= maxPrice)) {
            product.style.display = "block"; // Muestra el producto
        } else {
            product.style.display = "none"; // Oculta el producto
        }
    });
}