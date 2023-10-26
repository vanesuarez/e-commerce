document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("container");
  const subtotalPrice = document.getElementById("subtotalPrice");
  const shippingPrice = document.getElementById("shippingPrice");
  const finalPrice = document.getElementById("totalPrice");
  const radioButtons = document.querySelectorAll('input[name="exampleRadios"]');

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Recorre los productos en el carrito y los muestra con la funcion createCartItem
  cart.forEach((product) => {
    const article = createCartItem(product);
    cont.appendChild(article);
  });

  const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

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

      cart.push(newProduct);

      const article = createCartItem(newProduct);
      cont.appendChild(article);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchAndDisplayProduct(url);

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
    cCount.value = product.quantity || 1;
    article.appendChild(cCount);

    const individualSubtotal = document.createElement("p");
    article.appendChild(individualSubtotal);

    // Función para actualizar el subtotal individual y total cuando cambia la cantidad
    function updateSubtotal() {
      const unitCost = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      const count = parseFloat(cCount.value) || 0;
      const subtotal = unitCost * count;

      individualSubtotal.innerHTML = `<b>${product.price.substring(0, 4)} ${subtotal.toFixed(2)}</b>`;

      let total = 0;

      // Recorrer el carrito para calcular la suma total
      cart.forEach((item) => {
        const itemUnitCost = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        const itemCount = parseFloat(item.count);
        total += itemUnitCost * count;
      });

      subtotalPrice.textContent = `USD ${total.toFixed(2)}`;

      function updateShippingPrice() {
        const selectedShippingOption = document.querySelector('input[name="exampleRadios"]:checked');

        if (selectedShippingOption) {
          const shippingPercentage = parseFloat(selectedShippingOption.value) / 100;
          shippingPrice.textContent = `USD ${(total * shippingPercentage).toFixed(2)}`;
        }
      }

      radioButtons.forEach((radio) => {
        radio.addEventListener("change", updateShippingPrice);
        radio.addEventListener("change", updateSubtotal);
      });

      updateShippingPrice();

      finalPrice.textContent = `USD ${(parseFloat(subtotalPrice.textContent.split(" ")[1]) + parseFloat(shippingPrice.textContent.split(" ")[1])).toFixed(2)}`;
    }

    cCount.addEventListener("input", updateSubtotal);
    updateSubtotal();

    return article;
  }
});



