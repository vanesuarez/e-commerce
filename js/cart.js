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
