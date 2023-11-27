document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("container");
  const subtotalPrice = document.getElementById("subtotalPrice");
  const shippingPrice = document.getElementById("shippingPrice");
  const finalPrice = document.getElementById("totalPrice");
  const radioButtons = document.querySelectorAll('input[name="exampleRadios"]');

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const JSONProduct = cart.some((product) => product.name === "Peugeot 208");

  // Recorre los productos en el carrito y los muestra con la funcion createCartItem
  cart.forEach((product) => {
    const article = createCartItem(product);
    cont.appendChild(article);
  });

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

      if (!JSONProduct) {
        cart.push(newProduct);

        const article = createCartItem(newProduct);
        cont.appendChild(article);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchAndDisplayProduct(CART_INFO_URL);

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
    cPrice.setAttribute("class", "precio");

    const cCount = document.createElement("input");
    cCount.type = "number";
    cCount.min = "0";
    cCount.value = product.count || 1;
    article.appendChild(cCount);
    cCount.addEventListener("input", () => {
      const newCount = parseFloat(cCount.value); // guarda la nueva cantidad indicada en el input

      const productToUpdate = cart.find(
        (product) => product.name === cName.innerHTML
      ); // busca el producto por el nombre

      if (productToUpdate) {
        productToUpdate.count = newCount; // actualiza su valor

        localStorage.setItem("cart", JSON.stringify(cart)); // guarda los cambios en el localStorage
      }
    });

    const individualSubtotal = document.createElement("p");
    article.appendChild(individualSubtotal);

    const trash = document.createElement("span");
    trash.innerHTML = `<button type="button" class="btn btn-outline-danger ">
    <i class="bi bi-trash3 "></i></button>`;

    article.appendChild(trash);

    trash.addEventListener("click", () => {
      const index = cart.findIndex((prod) => prod.name === cName.innerHTML); // busca el índice del artículo con su nombre

      if (index !== -1) {
        cart.splice(index, 1); // elimina el artículo del carrito
        localStorage.setItem("cart", JSON.stringify(cart)); // actualiza el almacenamiento local
        article.remove(); // elimina el elemento de la interfaz
        updateSubtotal(); // actualiza los totales
      }
    });

    // Función para actualizar el subtotal individual y total cuando cambia la cantidad
    function updateSubtotal() {
      const unitCost = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      const count = parseFloat(cCount.value) || 0;
      let subtotal = unitCost * count; // Inicializar el subtotal

      individualSubtotal.innerHTML = `<b>${product.price.substring(
        0,
        4
      )} ${subtotal.toFixed(2)}</b>`; // calcula el total de cada producto

      let total = 0;

      // calcula subtotal general

      cart.forEach((product) => {
        // recorre los objetos guardados en el localStorage

        if (product.price.includes("USD")) {
          const unitCost = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
          const count = parseFloat(product.count);
          const subtotal = unitCost * count;

          total += subtotal;
        } else {
          const unitCost = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
          const count = parseFloat(product.count);
          const subtotal = (unitCost / 40) * count;

          total += subtotal;
        }
      });

      // muestra el subtotal de costo
      subtotalPrice.textContent = `USD ${total.toFixed(2)}`;

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

  // Validaciones formulario

  // Constantes para elementos del DOM
  const forms = document.querySelectorAll(".needs-validation");
  const validationText = document.getElementById("paymentValidation");
  const saveBtn = document.getElementById("saveBtn");
  const cancel = document.getElementById("cancel");
  const creditCardRadio = document.getElementById("creditCard");
  const transferRadio = document.getElementById("transfer");
  const cardNumber = document.getElementById("cardNumber");
  const cardCvv = document.getElementById("cardCvv");
  const cardExpiration = document.getElementById("cardExpiration");
  const accountNumber = document.getElementById("accountNumber");
  const formaPagoP = document.getElementById("formaPagoP");
  const modalForm = document.getElementById("modalForm");
  const street = document.getElementById("street");
  const addressNumber = document.getElementById("number");
  const corner = document.getElementById("corner");

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
      validationText.textContent = "Por favor, seleccione un método de pago.";
      validationText.style.display = "block";
      modalForm.classList.remove("was-validated");
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
        validationText.textContent =
          "Por favor, complete los campos de tarjeta de crédito.";
        validationText.style.display = "block";
        return false;
      }
    } else if (transferRadio.checked) {
      if (accountNumber.value.trim() === "") {
        validationText.textContent =
          "Por favor, complete el campo de número de cuenta.";
        validationText.style.display = "block";
        return false;
      }
    }
    return true; // Todos los campos necesarios están completos
  }

  let hasZeroArticles = false;

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");

      // Verifica si ninguno de los checkboxes está seleccionado
      if (!creditCardRadio.checked && !transferRadio.checked) {
        creditCardRadio.classList.add("is-invalid");
        transferRadio.classList.add("is-invalid");
        validationText.style.display = "block";
        return; // Detener la ejecución si no se seleccionó un método de pago
      } else {
        creditCardRadio.classList.remove("is-invalid");
        transferRadio.classList.remove("is-invalid");
        validationText.style.display = "none";
      }

      // Validacion productos con cantidad 0
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].count == 0) {
          hasZeroArticles = false; // si encuentra 0, indica que no cumple la condición
          event.preventDefault();
          event.stopPropagation();
          alert(
            "Error al realizar la compra. No puedes tener un articulo con cantidad 0. Actualiza e intenta nuevamente"
          );
          break; // detiene la ejecución, sin esto daría por valido un form si el ultimo valor es distinto de 0
        } else {
          hasZeroArticles = true; // al comprobar que no hay productos 0, lo da por valido
        }
      }

      // Si todo esta bien, mostrar el mensaje de éxito y resetear el formulario

      if (
        validatePaymentFields() &&
        street.value.trim() !== "" &&
        addressNumber.value.trim() !== "" &&
        corner.value.trim() !== "" &&
        hasZeroArticles
      ) {
        const fetchBody = {
          user: localStorage.getItem('username'),
          cartItems: JSON.parse(localStorage.getItem('cart'))
        }
        fetch(CART_BUY_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'access': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzAxMDM0ODk3fQ.cc44E8Ns0bOZeMQSx-0QX7j-3xPrN6xxI-FhRoE2R7g'
          },
          body: JSON.stringify(fetchBody)
        })
        // Alerta modal con bootstrap
        document.getElementById("exampleModal").classList.add("fade");
        document.getElementById("exampleModal").style.display = "block";
        setTimeout(function () {
          document.getElementById("exampleModal").classList.add("show");
        }, 80);

        document
          .querySelectorAll('[data-mdb-dismiss="modal"]')
          .forEach(function (element) {
            element.addEventListener("click", function () {
              document.getElementById("exampleModal").classList.remove("show");
              document.getElementById("exampleModal").style.display = "none";
            });
          });

        // resetear todo
        form.reset();
        form.classList.remove("was-validated");
        modalForm.classList.remove("was-validated");
        updateFeedbackClasses();
        formaPagoP.textContent = "No ha seleccionado";
      }
    });
  });

  saveBtn.addEventListener("click", () => {
    const selected = document.querySelector(
      'input[name="paymentMethod"]:checked'
    );
    if (selected && validatePaymentFields()) {
      formaPagoP.textContent = selected.value;
      validationText.style.display = "none";
    }
  });

  cancel.addEventListener("click", function () {
    cardNumber.value = "";
    cardCvv.value = "";
    cardExpiration.value = "";
    accountNumber.value = "";
    modalForm.classList.remove("was-validated");
    formaPagoP.textContent = "No ha seleccionado";
  });

  creditCardRadio.addEventListener("change", function () {
    updatePaymentMethod(creditCardRadio.checked);
    formaPagoP.textContent = creditCardRadio.checked
      ? "Tarjeta de Crédito"
      : "No ha seleccionado";
    accountNumber.value = "";
  });

  transferRadio.addEventListener("change", function () {
    updatePaymentMethod(!transferRadio.checked);
    formaPagoP.textContent = transferRadio.checked
      ? "Transferencia Bancaria"
      : "No ha seleccionado";
    cardNumber.value = "";
    cardCvv.value = "";
    cardExpiration.value = "";
  });
});
