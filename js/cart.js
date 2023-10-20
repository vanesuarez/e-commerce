document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("container");

  // Llamamos el carrito desde almacenamiento local
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Recorre los productos en el carrito y muéstralos en la página del carrito
  cart.forEach((product) => {
    const article = createCartItem(product);
    cont.appendChild(article);
  });

  const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const img = `${data.articles[0].image}`;
      const name = `${data.articles[0].name}`;
      const cost = `${data.articles[0].currency} ${data.articles[0].unitCost}`;
      const count = `${data.articles[0].count}`;

      const article = createCartItem({
        img: img,
        name: name,
        price: cost,
        count: count,
      });

      cont.appendChild(article);
    });

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
    console.log(cPrice);

    const cCount = document.createElement("input");
    cCount.type = "number";
    cCount.min = "0";
    cCount.value = product.quantity || 1; // Establece el valor en 1 si no se proporciona una cantidad
    article.appendChild(cCount);

    const cSubTotal = document.createElement("p");
    article.appendChild(cSubTotal);

    // Función para actualizar el subtotal cuando cambia la cantidad
    function updateSubtotal() {
      const currency = product.price.substring(0, 4);
      const unitCost = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      const count = parseFloat(cCount.value) || 0;
      const subtotal = `${currency} ${unitCost * count}`;

      // Actualiza el contenido de cSubTotal con el subtotal calculado
      cSubTotal.innerHTML = `<b>${subtotal}</b>`;
    }

    // Llama a la función updateSubtotal cuando cambia la cantidad y actualiza en tiempo real
    cCount.addEventListener("input", updateSubtotal);

    // Calcula el subtotal inicial
    updateSubtotal();

    return article;
  }
});

// Entrega 6 - Parte 2:

document.addEventListener('DOMContentLoaded', function () {
  const saveBtn = document.getElementById('saveBtn');
  const formPay = document.querySelector('.centrar p');

  saveBtn.addEventListener('click',  ()=> {
      const selected = document.querySelector('input[name="paymentMethod"]:checked');
      if (selected) {
          formPay.textContent = selected.nextElementSibling.textContent;
      }
  });
});

// Obtén los elementos de radio para tarjeta de crédito y transferencia bancaria
const creditCardRadio = document.getElementById("creditCard");
const transferRadio = document.getElementById("transfer");

// Obtén los campos relacionados a la tarjeta de crédito
const cardNumber = document.getElementById("cardNumber");
const cardCvv = document.getElementById("cardCvv");
const cardExpiration = document.getElementById("cardExpiration");

// Obtén el campo relacionado a la transferencia bancaria
const accountNumber = document.getElementById("accountNumber");

creditCardRadio.addEventListener("change", function () {
  if (creditCardRadio.checked) {
    cardNumber.disabled = false;
    cardCvv.disabled = false;
    cardExpiration.disabled = false;
    accountNumber.disabled = true;
  }
});

transferRadio.addEventListener("change", function () {
  if (transferRadio.checked) {
    cardNumber.disabled = true;
    cardCvv.disabled = true;
    cardExpiration.disabled = true;
    accountNumber.disabled = false;
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".needs-validation");
  const checkbox = document.querySelector("#cardNumber, #transfer");
  const termsButton = document.getElementById("termsFeedbackText");
  const validationText = document.getElementById("termsValidation");
  const form = document.getElementById("form1");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } 
      form.classList.add("was-validated");

      // Validaciones del checkbox al enviar el formulario
      if (!checkbox.checked) {
        checkbox.classList.add("is-invalid");
        termsButton.classList.add("text-danger");
        validationText.style.display = "block";
      }

      // Validaciones del checkbox junto con el resto del formulario para resetearlo
      if (form.checkValidity()) {
        form.reset();
        updateFeedbackClasses(); // Llamar a la función para quitar las clases de validación
      }
    });

    // Evento para darle reset al formulario
    form.addEventListener("reset", function () {
      form.classList.remove("was-validated"); // quita las clases de validación al restablecer el formulario
    });

  });

    // Funcion para el modal
  function updateFeedbackClasses() {
    if (checkbox.checked) {
      checkbox.classList.remove("is-invalid");
      checkbox.classList.add("is-valid");
      termsButton.classList.remove("text-danger");
      validationText.style.display = "none";
    } else {
      checkbox.classList.remove("is-valid");
      checkbox.classList.add("is-invalid");
      termsButton.classList.add("text-danger");
      validationText.style.display = "block";
    }
  }

  checkbox.addEventListener("change", updateFeedbackClasses);

});






