const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const login = document.getElementById("login-form");
const recordarme = document.getElementById("recordarusuario");
const entrarBoton = document.getElementById("acceder");


document.addEventListener("DOMContentLoaded", function() { // Evento DOMLoaded para que cargue todo en la pagina y luego guarade los datos
  
    entrarBoton.addEventListener("click", function(event) {
      event.preventDefault(); // Prevenir el comportamiento por defecto

      const username = usernameInput.value.trim(); // Guarda los datos del usuario en una constante
      const password = passwordInput.value.trim(); 
  
      // Verificar que los campos no estén vacíos, si no lo estan, guarda los datos en una sessionStorage
      // y redirecciona al index.html
      // si no hay datos, tira un alert

      if (username && password) {
        sessionStorage.setItem("username", username); // (nombre, el contenido)
        sessionStorage.setItem("password", password);
        window.location.href = "index.html";

      } else {
        alert("Ingresa datos en ambos campos para continuar");
      }

  });
  });