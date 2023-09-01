const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const login = document.getElementById("login-form");
const rememberUserButton = document.getElementById("rememberUser");
const logInButton = document.getElementById("logIn");


document.addEventListener("DOMContentLoaded", function() { // Evento DOMLoaded para que cargue todo en la pagina y luego guarade los datos
  
  logInButton.addEventListener("click", function(event) {
      event.preventDefault(); // Prevenir el comportamiento por defecto

      const username = usernameInput.value.trim(); // Guarda los datos del usuario en una constante
      const password = passwordInput.value.trim(); 
  
      // Verificar que los campos no estén vacíos, si no lo estan, guarda los datos en una localStorage
      // y redirecciona al index.html
      // si no hay datos, tira un alert

      if (username && password) {
        localStorage.setItem("username", username); // (nombre, el contenido)
        localStorage.setItem("password", password);
        window.location.href = "index.html";

      } else {
        alert("Ingresa datos en ambos campos para continuar");
      }

  });
  });