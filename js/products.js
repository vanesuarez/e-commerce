document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
    const inputFilter = document.getElementById("inputFilter");
    const filterButton = document.getElementById("rangeFilterCount");
    const minPriceInput = document.getElementById("rangeFilterCountMin");
    const maxPriceInput = document.getElementById("rangeFilterCountMax");

// Función para crear elementos de producto
function createProductElement(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const divText = document.createElement("div");
    divText.classList.add("divForText");

    const divImg = document.createElement("div");
    divImg.classList.add("divForImg");

    const productName = document.createElement("h4");
    productName.textContent = product.name;

    const productDescription = document.createElement("p");
    productDescription.textContent = product.description;

    const productPrice = document.createElement("h5");
    productPrice.textContent = `Precio: USD ${product.cost}`;

    const productSold = document.createElement("p");
    productSold.textContent = `${product.soldCount} vendidos`;

    const productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.name;

    productDiv.appendChild(divText);
    productDiv.appendChild(divImg);

    divText.appendChild(productName);
    divText.appendChild(productDescription);
    divText.appendChild(productPrice); // Colocamos el precio dentro del contenedor del producto actual
    divText.appendChild(productSold);
    divImg.appendChild(productImage);

    return productDiv;
}

    // Función para mostrar productos
    function displayProducts(products) {
        productList.innerHTML = "";
        products.forEach((product) => {
            productList.appendChild(createProductElement(product));
        });
    }

    // Realizar la petición GET usando Fetch API
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const products = data.products;

            // Mostrar productos iniciales
            displayProducts(products);

            // Filtrar productos por nombre o descripción en tiempo real
            inputFilter.addEventListener("input", function () {
                const filterText = inputFilter.value.toLowerCase().trim();
                const filteredProducts = products.filter((product) =>
                    product.name.toLowerCase().includes(filterText) ||
                    product.description.toLowerCase().includes(filterText)
                );
                displayProducts(filteredProducts);
            });

            // Filtrar productos por precio
            filterButton.addEventListener("click", function () {
                const minPrice = parseFloat(minPriceInput.value);
                const maxPrice = parseFloat(maxPriceInput.value);

                const filteredProducts = products.filter((product) =>
                    (isNaN(minPrice) || product.cost >= minPrice) &&
                    (isNaN(maxPrice) || product.cost <= maxPrice)
                );
                displayProducts(filteredProducts);
            });

            // ENTREGA 2 - ORDENAR ALFABÉTICAMENTE ASCENDENTE
            document.getElementById("sortAsc").addEventListener("click", function () {
                const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
                displayProducts(sortedProducts);
            });

            // ENTREGA 2 - ORDENAR ALFABÉTICAMENTE DESCENDENTE
            document.getElementById("sortDesc").addEventListener("click", function () {
                const sortedProducts = [...products].sort((a, b) => b.name.localeCompare(a.name));
                displayProducts(sortedProducts);
            });

            // ENTREGA 2 - ORDENAR POR PRECIO
            document.getElementById("sortByCount").addEventListener("click", function () {
                const sortedProducts = [...products].sort((a, b) => b.soldCount - a.soldCount);
                displayProducts(sortedProducts);
            });

            // LIMPIAR FILTROS DE PRECIO
            document.getElementById("clearRangeFilter").addEventListener("click", function () {
                minPriceInput.value = "";
                maxPriceInput.value = "";
                displayProducts(products);
            });
        })
        .catch((error) => {
            console.error("Error al cargar los productos:", error);
        });
}); 