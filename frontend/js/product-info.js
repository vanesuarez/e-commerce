document.addEventListener("DOMContentLoaded", function () {
  const productID = localStorage.getItem("productID");
  const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

  // si "productID" es vacío nos re envia a product.html

  if (!productID) {
    window.location.href = "products.html";
  }

  // Fetch para mostrar info de cada producto

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Agregamos las propiedades a cada producto
      document.getElementById("productName").innerHTML = data.name;
      document.getElementById(
        "productPrice"
      ).innerHTML = `<br> ${data.currency} ${data.cost}`;
      document.getElementById(
        "productDescription"
      ).innerHTML = `<b>Descripción</b> <br>${data.description}`;
      document.getElementById(
        "productCategory"
      ).innerHTML = `<b>Categoría</b> <br>${data.category}`;
      document.getElementById(
        "productSoldCount"
      ).innerHTML = `<b>Vendidos</b> <br>${data.soldCount}`;

      // CAROUSEL BOOTSTRAP

      const carouselInner = document.querySelector(".carousel-inner");

      // Itera sobre las img y le agrega la clase del boostrap
      data.images.forEach((image, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.classList.add("carousel-item");

        // La primera imagen debe tener la clase "active" para mostrarla al cargar el carrusel
        if (index === 0) {
          carouselItem.classList.add("active");
        }

        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.classList.add("d-block", "w-100"); // agrega clase de boostrap

        carouselItem.appendChild(imgElement);
        carouselInner.appendChild(carouselItem);
      });

      // Productos relacionados
      const related = document.getElementById("related");

      data.relatedProducts.forEach((product) => {
        const divProdRel = document.createElement("div");

        const imgProdRel = document.createElement("img");
        imgProdRel.src = product.image;
        related.appendChild(divProdRel);
        divProdRel.appendChild(imgProdRel);

        divProdRel.innerHTML += `<br>${product.name}`;

        // Reutilice el código de products.js
        divProdRel.addEventListener("click", function () {
          window.location.href = "product-info.html";

          localStorage.setItem("productID", product.id);
        });
      });
    })
    .catch((error) => {
      console.error("Error al cargar los datos:", error);
    });

  // Fetch para los comentarios

  const commentsDiv = document.getElementById("productComments");
  const urlComments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

  fetch(urlComments)
    .then((response) => response.json())
    .then((commentsData) => {
      // Itera sobre la lista de comentarios y crea elementos HTML para mostrarlos
      commentsData.forEach((comment) => {
        const commentElement = document.createElement("div"); // creamos un div para cada elemento
        commentElement.classList.add("comment");

        const commentUser = document.createElement("p");
        commentUser.textContent = `${comment.user}`; // mostrar usuario

        //  Bucle for para mostrar las estrellas en cada comentario (.checked estrellas pintadas)
        let stars = "";
        for (let i = 1; i < 6; i++) {
          if (i <= comment.score) {
            stars += '<span class="fa fa-star checked"></span>';
          } else {
            stars += '<span class="fa fa-star"></span>';
          }
        }
        const commentScore = document.createElement("p");
        commentScore.innerHTML = `${stars} `;

        const commentDate = document.createElement("p");
        commentDate.textContent = ` ${comment.dateTime}`; // mostrar fecha

        const commentText = document.createElement("p");
        commentText.textContent = `${comment.description}`; // mostrar texto del comentario

        // Agregamos cada elemento al div padre para cada elemento
        commentElement.appendChild(commentUser);
        commentElement.appendChild(commentScore);
        commentElement.appendChild(commentDate);
        commentElement.appendChild(commentText);

        // Agregamos los div de cada elemento al div padre contenedor
        commentsDiv.appendChild(commentElement);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los comentarios:", error);
    });

  // Agregar un nuevo comentario al enviar el formulario
  const form = document.getElementById("formComments");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Obtiene los datos del formulario
    const comment = document.getElementById("comment").value;
    const punctuation = document.getElementById("punctuation").value;

    // Crea un nuevo comentario
    const newComment = document.createElement("div");
    newComment.classList.add("comment");

    // Muestra el nombre del usuario guardado en el localstorage
    const commentUser = document.createElement("p");
    commentUser.textContent = savedUsername;

    // Agrega el puntaje
    let stars = "";
    for (let i = 1; i < 6; i++) {
      if (i <= punctuation) {
        stars += '<span class="fa fa-star checked"></span>';
      } else {
        stars += '<span class="fa fa-star"></span>';
      }
    }
    const commentScore = document.createElement("p");
    commentScore.innerHTML = `${stars}`;

    const currentDate = new Date();
    const commentDate = document.createElement("p");
    commentDate.textContent = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate
      .getDate()
      .toString()
      .padStart(2, "0")} ${currentDate
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    const commentText = document.createElement("p");
    commentText.textContent = ` ${comment}`;

    // Agrega los elementos del comentario al div del comentario
    newComment.appendChild(commentUser);
    newComment.appendChild(commentScore);
    newComment.appendChild(commentDate);
    newComment.appendChild(commentText);

    // Agrega el nuevo comentario al div de comentarios
    commentsDiv.appendChild(newComment);

    // Limpia el formulario
    form.reset();
  });

  // Argega al carrito nuevos productos

  document.getElementById("buyBtn").addEventListener("click", function () {
    const name = document.getElementById("productName").textContent;
    const price = document.getElementById("productPrice").textContent;
    const img = document.querySelector(".carousel-inner img").src;

    // llama el carrito actual del almacenamiento local o crea uno vacio si no existe
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((product) => product.name === name);

    if (exists) {
      exists.count += 1;
    } else {
      cart.push({
        name: name,
        price: price,
        img: img,
        count: 1,
      });
    }

    // Guarda el carrito actualizado en el almacenamiento local
    localStorage.setItem("cart", JSON.stringify(cart));

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
  });
});
