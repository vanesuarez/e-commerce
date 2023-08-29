document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // URL del JSON de productos

  // Función inicial para mostrar los productos en la página
  function displayProducts(products) {
    productList.innerHTML = ""; // limpia la lista de productos existente

    // Iterar a través de los productos y crear elementos HTML para cada uno
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

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
      productPrice.textContent = `Precio: USD ${product.cost}`;

      const productSold = document.createElement("p");
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

  // Realizar la petición GET usando Fetch API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data.products);

      // ENTREGA 2 - ORDENAR ALFABÉTICAMENTE ASCENDENTE
      document.getElementById("sortAsc").addEventListener("click", function () {
        let asc = data.products.sort((x, y) => x.name.localeCompare(y.name));
        displayProducts(asc);
      });

      // ENTREGA 2 - ORDENAR ALFABÉTICAMENTE DESCENDENTE
      document.getElementById("sortDesc").addEventListener("click", function () {
          let desc = data.products.sort((x, y) => y.name.localeCompare(x.name));
          displayProducts(desc);
        });

      // ENTREGA 2 - ORDENAR POR PRECIO
      document.getElementById("sortByCount").addEventListener("click", function () {
          let sortCount = data.products.sort((x, y) => parseInt(y.soldCount) - parseInt(x.soldCount));
          displayProducts(sortCount);
        });

      // ENTREGA 2 - FILTRAR POR PRECIO


      // LIMPIAR
      document.getElementById("clearRangeFilter").addEventListener("click", function () {
          document.getElementById("rangeFilterCountMin").value = "";
          document.getElementById("rangeFilterCountMax").value = "";
        });
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
    });
});
