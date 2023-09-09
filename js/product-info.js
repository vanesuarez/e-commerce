document.addEventListener("DOMContentLoaded", function () {
    const productID = localStorage.getItem("productID");
    const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

    // Fetch para cada producto

    fetch(url)
        .then((response) => {
          console.log(response);
          return response.json()
        })
        .then((data) => {
          console.log(data);
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
              commentUser.textContent = `Usuario: ${comment.user}`;

            //   AGREGAR ACA PUNTAJE CON ESTRELLAS
              //hago una variable que se llame stars, no constante porque va a variar, x eso variable
              //no utilice for each porque me parece es una  iteracion para los arrays
              let stars= ""
              for(let i =1;i<6;i++){
                if (i<=comment.score){
                  stars+='<span class="fa fa-star checked"></span>'
                } else {
                  stars+='<span class="fa fa-star"></span>'
                }
              }
              const commentScore = document.createElement("p");
              commentScore.innerHTML = `${stars} 
              Puntuación: ${comment.score}`;
              
            // -- 

              const commentDate = document.createElement("p");
              commentDate.textContent = `Fecha: ${comment.dateTime}`;
        
              const commentText = document.createElement("p");
              commentText.textContent = `Comentario: ${comment.description}`;

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

});

