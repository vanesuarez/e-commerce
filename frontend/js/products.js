document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");

  // Función inicial para mostrar los productos en la página
  function displayProducts(products) {
    productList.innerHTML = ""; // limpia la lista de productos existente

    // Iterar a través de los productos y crear elementos HTML para cada uno
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      // ENTREGA 3 IDENTIFICADOR

      productDiv.setAttribute("id", `${product.id}`); // agrega id con el id del producto

      productDiv.addEventListener("click", function () {
        window.location.href = "product-info.html";

        localStorage.setItem("productID", product.id);
      });

      const divText = document.createElement("div");
      divText.classList.add("divForText");

      const divImg = document.createElement("div");
      divImg.classList.add("divForImg");

      // Crear elementos para cada propiedad del producto
      const productName = document.createElement("h4");
      productName.textContent = product.name;

      const productDescription = document.createElement("p");
      productDescription.textContent = product.description;

      const productPrice = document.createElement("h5");
      productPrice.setAttribute("id", "priceText");
      productPrice.textContent = ` ${product.currency} ${product.cost}`;

      const productSold = document.createElement("p");
      productSold.setAttribute("id", "soldText");
      productSold.textContent = ` ${product.soldCount} vendidos`;

      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;

      productDiv.appendChild(divText);
      productDiv.appendChild(divImg);

      // Agregar elementos al contenedor del producto
      divText.appendChild(productName);
      divText.appendChild(productDescription);
      divText.appendChild(productPrice);
      divText.appendChild(productSold);
      divImg.appendChild(productImage);

      // Agregar el contenedor del producto a la lista de productos
      productList.appendChild(productDiv);
    });
  }

  const catID = localStorage.getItem("catID");

  if (catID) {
    // si catID es distinto del vacio entonces es true y con ese contenido crea la URL
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    // para arreglar la descripción de cada producto

    const pDet = document.getElementById("detalle"); // llama al párrafo que aparece debajo de Productos.

    // Realizar la petición GET usando Fetch API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        displayProducts(data.products);

        pDet.textContent = `Veras aqui todos los productos de la categoria ${data.catName}.`;

        // ORDENAR ALFABÉTICAMENTE ASCENDENTE
        document
          .getElementById("sortAsc")
          .addEventListener("click", function () {
            let asc = data.products.sort(
              (x, y) => parseInt(x.cost) - parseInt(y.cost)
            );
            displayProducts(asc);
          });

        // ORDENAR ALFABÉTICAMENTE DESCENDENTE
        document
          .getElementById("sortDesc")
          .addEventListener("click", function () {
            let desc = data.products.sort(
              (x, y) => parseInt(y.cost) - parseInt(x.cost)
            );
            displayProducts(desc);
          });

        // ORDENAR POR CANTIDAD
        document
          .getElementById("sortByCount")
          .addEventListener("click", function () {
            let sortCount = data.products.sort(
              (x, y) => parseInt(y.soldCount) - parseInt(x.soldCount)
            );
            displayProducts(sortCount);
          });

        // FILTRAR POR PRECIO
        document
          .getElementById("rangeFilterCount")
          .addEventListener("click", function () {
            const minPriceInput = document.getElementById(
              "rangeFilterCountMin"
            );
            const maxPriceInput = document.getElementById(
              "rangeFilterCountMax"
            );
            const minPrice = parseFloat(minPriceInput.value);
            const maxPrice = parseFloat(maxPriceInput.value);

            const filteredProducts = data.products.filter(function (product) {
              const productPriceValue = parseFloat(product.cost);
              return (
                (isNaN(minPrice) || productPriceValue >= minPrice) &&
                (isNaN(maxPrice) || productPriceValue <= maxPrice)
              );
            });

            displayProducts(filteredProducts);
          });

          // Buscador

        const inputFilter = document.getElementById("inputFilter");

        inputFilter.addEventListener("input", function () {
          const filterText = inputFilter.value.toLowerCase().trim(); // Accedemos al texto que escribió el usuario y le aplicamos validaciones

          const searchFilter = data.products.filter(function (product) {
            return (
              product.name.toLowerCase().includes(filterText) || // Verificamos si el nombre del producto incluye el texto de búsqueda
              product.description.toLowerCase().includes(filterText) // Verificamos si la descripción del producto incluye el texto de búsqueda
            );
          });

          displayProducts(searchFilter);
        });

        // LIMPIAR
        document
          .getElementById("clearRangeFilter")
          .addEventListener("click", function () {
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
            displayProducts(data.products);
          });
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
      });
  }
});
