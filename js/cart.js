document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("container");
  const subtotalPrice = document.getElementById('subtotalPrice');

  // Llamamos el carrito desde almacenamiento local
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Recorre los productos en el carrito y muéstralos en la página del carrito
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

      const newProduct = {
        img: img,
        name: name,
        price: cost,
        count: count,
      };

      cart.push(newProduct); // agrega el producto del fetch al carrito

      const article = createCartItem(newProduct);
      cont.appendChild(article);

      updateSubtotal(); // Actualizamos el subtotal después de agregar el producto del fetch

    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchAndDisplayProduct(url);

  // Función para crear un elemento de carrito de compra.
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
    cCount.value = product.quantity || 1; // Establece el valor en 1 si no se proporciona una cantidad
    article.appendChild(cCount);

    const cSubTotal = document.createElement("p");
    article.appendChild(cSubTotal);

    // Función para actualizar el subtotal cuando cambia la cantidad
    function updateSubtotal() {
      let total = 0;

      // Recorre el carrito para calcular el subtotal y la suma total
      cart.forEach((product) => {
        const unitCost = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
        const count = parseFloat(cCount.value) || 0;
        const subtotal = unitCost * count;
        total += subtotal;

        // Actualiza el contenido de cSubTotal con el subtotal calculado
        cSubTotal.innerHTML = `<b>${product.price.substring(0, 4)} ${subtotal.toFixed(2)}</b>`;
      });

      subtotalPrice.textContent = `USD ${total.toFixed(2)}`;
    }

    // Llama a la función updateSubtotal cuando cambia la cantidad y actualiza en tiempo real
    cCount.addEventListener("input", updateSubtotal);

    // Calcula el subtotal inicial
    updateSubtotal();

    return article;
  }
});


// const shippingPrice = document.getElementById('shippingPrice');
// const totalPrice = document.getElementById('totalPrice');