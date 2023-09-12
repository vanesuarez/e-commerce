document.addEventListener("DOMContentLoaded", function () {
    const productID = localStorage.getItem("productID");
    const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

   // si "productID" es vacío nos re envia a product.html
    
   if (!localStorage.getItem("productID")) {
    window.location.href = "products.html"
   }
    
    // Fetch para mostrar info de cada producto

    fetch(url)
        .then((response) => {
          console.log(response);
          return response.json()
        })
        .then((data) => {
          console.log(data);
          // Agreggamos las propiedades a cada producto
            document.getElementById("productName").innerHTML = data.name;
            document.getElementById("productPrice").innerHTML = `<b>Precio</b> <br>${data.currency} ${data.cost}`;
            document.getElementById("productDescription").innerHTML = `<b>Descripción</b> <br>${data.description}`;
            document.getElementById("productCategory").innerHTML = `<b>Categoría</b> <br>${data.category}`;
            document.getElementById("productSoldCount").innerHTML = `<b>Vendidos</b> <br>${data.soldCount}`;

            const imagesDiv = document.getElementById("productImages");
            imagesDiv.innerHTML = `<b>Imágenes ilustrativas</b><br>`;
            
            data.images.forEach((image) => {
                const imgElement = document.createElement("img");
                imgElement.src = image;
                imagesDiv.appendChild(imgElement);
            });
        })
        .catch((error) => {
            console.error("Error al cargar los datos:", error);
        });

        // Fetch para los comentarios

        const commentsDiv = document.getElementById("productComments");
        const urlComments = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
        
        fetch(urlComments)
          .then(response => response.json())
          .then(commentsData => {

            // Itera sobre la lista de comentarios y crea elementos HTML para mostrarlos
            commentsData.forEach(comment => {

              const commentElement = document.createElement("div"); // creamos un div para cada elemento
              commentElement.classList.add("comment");
        
              const commentUser = document.createElement("p");
              commentUser.textContent = `${comment.user}`; // mostrar usuario

            //  Bucle for para mostrar las estrellas en cada comentario
              let stars= ""
              for(let i =1;i<6;i++){
                if (i<=comment.score){
                  stars+='<span class="fa fa-star checked"></span>' //  clase de estrellas pintadas
                } else {
                  stars+='<span class="fa fa-star"></span>' //  clase de estellas sin pintar
                }
              }
              const commentScore = document.createElement("p");
              commentScore.innerHTML = `${stars} `; 
              
            // -- 

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
          .catch(error => {
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
              commentDate.textContent = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")} ${currentDate.getHours().toString().padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}:${currentDate.getSeconds().toString().padStart(2, "0")}`;
      
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
});
