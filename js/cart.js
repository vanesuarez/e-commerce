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
    cCount.value = product.quantity || 1; // Establece el valor en 1 si no se proporciona una cantidad
    article.appendChild(cCount);

    const individualSubtotal = document.createElement("p");
    article.appendChild(individualSubtotal);

    // Función para actualizar el subtotal individual y total cuando cambia la cantidad
    function updateSubtotal() {
      const unitCost = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      const count = parseFloat(cCount.value) || 0;
      const subtotal = unitCost * count;

      individualSubtotal.innerHTML = `<b>${product.price.substring(
        0,
        4
      )} ${subtotal.toFixed(2)}</b>`;

      let total = 0;

      // Recorrer el carrito para calcular la suma total y el envio
      cart.forEach((item) => {
        const unitCost = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        const subtotal = unitCost * count;
        total += subtotal;

        subtotalPrice.textContent = `USD ${total.toFixed(2)}`;
      });

      function updateShippingPrice() {
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

      radioButtons.forEach((radio) => {
        radio.addEventListener("change", updateShippingPrice);
        radio.addEventListener("change", updateSubtotal);
      });

      updateShippingPrice();

      finalPrice.textContent = `USD ${(
        parseFloat(subtotalPrice.textContent.split(" ")[1]) +
        parseFloat(shippingPrice.textContent.split(" ")[1])
      ).toFixed(2)}`;
    }

    cCount.addEventListener("input", updateSubtotal);

    updateSubtotal();

    return article;
  }

  ////////////////////////////////////////////////////

  // Entrega 6 - Parte 2:

  // Variables para elementos del DOM
  const forms = document.querySelectorAll(".needs-validation");
  const checkbox = document.querySelector("#creditCard, #transfer");
  const validationText = document.getElementById("paymentValidation");
  const compraExitosaDiv = document.getElementById("compraExitosa");
  const saveBtn = document.getElementById("saveBtn");
  const formPay = document.querySelector(".centrar p");
  const cancel = document.getElementById("cancel");
  const creditCardRadio = document.getElementById("creditCard");
  const transferRadio = document.getElementById("transfer");
  const cardNumber = document.getElementById("cardNumber");
  const cardCvv = document.getElementById("cardCvv");
  const cardExpiration = document.getElementById("cardExpiration");
  const accountNumber = document.getElementById("accountNumber");
  const formaPagoP = document.getElementById("formaPagoP");
  const modalForm = document.getElementById("modalForm");

  // Función para deshabilitar los campos dependiendo de cual seleccione
  function updatePaymentMethod(creditCardChecked) {
    cardCvv.disabled = !creditCardChecked;
    cardNumber.disabled = !creditCardChecked;
    cardExpiration.disabled = !creditCardChecked;
    accountNumber.disabled = creditCardChecked;
  }

  // Función para actualizar el feedback
  function updateFeedbackClasses() {
    const termsModal = document.getElementById("termsModal");
    if (creditCardRadio.checked || transferRadio.checked) {
      termsModal.classList.remove("text-danger");
      validationText.style.display = "none";
      modalForm.classList.remove("is-valid");
    } else {
      modalForm.classList.remove("was-validated");
      validationText.style.display = "block";
    }
  }

  // Función para validar campos según el método de pago seleccionado
  function validatePaymentFields() {
    if (creditCardRadio.checked) {
      if (
        cardNumber.value.trim() === "" ||
        cardCvv.value.trim() === "" ||
        cardExpiration.value.trim() === ""
      ) {
        // Al menos uno de los campos de la tarjeta de crédito está vacío
        validationText.textContent =
          "Por favor, complete los campos de tarjeta de crédito.";
        validationText.style.display = "block";
        return false;
      }
    } else if (transferRadio.checked) {
      if (accountNumber.value.trim() === "") {
        // El campo de número de cuenta para transferencia está vacío
        validationText.textContent =
          "Por favor, complete el campo de número de cuenta.";
        validationText.style.display = "block";
        return false;
      }
    }
    return true; // Todos los campos necesarios están completos
  }

  // Manejadores de eventos y validaciones
  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        compraExitosaDiv.style.display = "none";
      }

      form.classList.add("was-validated");

      if (!checkbox.checked) {
        checkbox.classList.add("is-invalid");
        validationText.style.display = "block";
      }

      if (validatePaymentFields() && form.checkValidity()) {
        form.reset();
        updateFeedbackClasses();
        compraExitosaDiv.style.display = "block";
      }
    });

    form.addEventListener("reset", function () {
      form.classList.remove("was-validated");
    });
  });

  saveBtn.addEventListener("click", () => {
    const selected = document.querySelector(
      'input[name="paymentMethod"]:checked'
    );
    if (selected && validatePaymentFields()) {
      formPay.textContent = selected.nextElementSibling.textContent;
      validationText.style.display = "none";
    }
  });

  cancel.addEventListener("click", function () {
    modalForm.reset();
    modalForm.classList.remove("was-validated");
    formaPagoP.textContent = "No ha seleccionado";
  });

  creditCardRadio.addEventListener("change", function () {
    updatePaymentMethod(creditCardRadio.checked);
    formaPagoP.textContent = creditCardRadio.checked
      ? "Tarjeta de Crédito"
      : "No ha seleccionado";
  });

  transferRadio.addEventListener("change", function () {
    updatePaymentMethod(!transferRadio.checked);
    formaPagoP.textContent = transferRadio.checked
      ? "Transferencia"
      : "No ha seleccionado";
  });
});
