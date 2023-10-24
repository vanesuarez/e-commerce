document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("container");
  const subtotalPrice = document.getElementById("subtotalPrice");
  const shippingPrice = document.getElementById("shippingPrice");
  const finalPrice = document.getElementById("totalPrice");
  const radioButtons = document.querySelectorAll('input[name="exampleRadios"]');

  // Llamamos el carrito desde almacenamiento local o crea un carrito vacio si no existe
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Recorre los productos en el carrito y los muestra con la funcion createCartItem
  cart.forEach((product) => {
    const article = createCartItem(product);
    cont.appendChild(article);
  });

  const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  // Mostrar el producto por defecto con el Fetch
  async function fetchAndDisplayProduct(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const img = `${data.articles[0].image}`;
      const name = `${data.articles[0].name}`;
      const cost = `${data.articles[0].currency} ${data.articles[0].unitCost}`;
      const count = `${data.articles[0].count}`;

      // Crear un objeto para el producto del fetch
      const newProduct = {
        img: img,
        name: name,
        price: cost,
        count: count,
      };

      // Agregar el producto del fetch al carrito
      cart.push(newProduct);

      const article = createCartItem(newProduct);
      cont.appendChild(article);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchAndDisplayProduct(url);

  // Función para crear un elemento de carrito de compra
  function createCartItem(product) {
    const article = document.createElement("div");
    article.classList.add("divCartN");

    const cImg = document.createElement("img");
    cImg.src = product.img;
    article.appendChild(cImg);

    const cName = document.createElement("p");
    cName.innerHTML = product.name;
    article.appendChild(cName);

    const cPrice = document.createElement("p");
    cPrice.innerHTML = product.price;
    article.appendChild(cPrice);

    const cCount = document.createElement("input");
    cCount.type = "number";
    cCount.min = "0";
    cCount.value = product.quantity || 1; // Establecer el valor en 1 si no se proporciona una cantidad
    article.appendChild(cCount);

    const individualSubtotal = document.createElement("p");
    article.appendChild(individualSubtotal);

    const trash = document.createElement("div");
    trash.innerHTML = `<button type="button" class="btn btn-outline-danger">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
</svg></button>`;

    article.appendChild(trash);

    trash.addEventListener("click", () => {
      // Encuentra el índice del artículo en el carrito según su nombre
      const index = cart.findIndex((prod) => prod.name === cName.innerHTML);
    
      if (index !== -1) {
        cart.splice(index, 1); // Elimina el artículo del carrito
        localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza el almacenamiento local
        article.remove(); // Elimina el elemento de la interfaz
        updateSubtotal(); // Actualiza los totales
      }
    });

    // Función para actualizar el subtotal individual y total cuando cambia la cantidad
    function updateSubtotal() {
      let total = 0;

      // Recorrer el carrito para calcular el subtotal individual y la suma total
      cart.forEach((product) => {
        const unitCost = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        const count = parseFloat(cCount.value) || 0;
        const subtotal = unitCost * count;
        total += subtotal;

        // Actualiza el subtotal individual tomando la moneda y el precio
        individualSubtotal.innerHTML = `<b>${product.price.substring(
          0,
          4
        )} ${subtotal.toFixed(2)}</b>`;

        // Actualizar el precio subtotal total en la sección de Costos
        subtotalPrice.textContent = `USD ${total.toFixed(2)}`;

        // Función para obtener y actualizar el costo de envio en tiempo real
        function updateShippingPrice() {
          // Obtenemos la opcion de envio seleccionada
          const selectedShippingOption = document.querySelector(
            'input[name="exampleRadios"]:checked'
          );

          if (selectedShippingOption) {
            const shippingPercentage =
              parseFloat(selectedShippingOption.value) / 100;
            shippingPrice.textContent = `USD ${(
              total * shippingPercentage
            ).toFixed(2)}`;
          } 
        }

        // Agregamos eventos change a los radio buttons con la funcion creada
        radioButtons.forEach((radio) => {
          radio.addEventListener("change", updateShippingPrice);
        });

        // Llamamos la funcion updateShippingPrice al cargar la pagina para establecer el precio de envio inicial
        updateShippingPrice();

        // Actualiza el precio total en tiempo real
        finalPrice.textContent = `USD ${(
          total + parseFloat(shippingPrice.textContent.split(" ")[1])
        ).toFixed(2)}`;
      });
    }

    // Llamar a la función updateSubtotal cuando cambia la cantidad y actualizar en tiempo real el subtotal individual
    cCount.addEventListener("input", updateSubtotal);

    // Calcular el subtotal inicial
    updateSubtotal();

    return article;
  }
});
