const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const login = document.getElementById("login-form");
const rememberUserButton = document.getElementById("rememberUser");
const logInButton = document.getElementById("logIn");

document.addEventListener("DOMContentLoaded", function () {
  // Evento DOMLoaded para que cargue todo en la pagina y luego guarade los datos

  logInButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto

    const username = usernameInput.value.trim(); // Guarda los datos del usuario en una constante
    const password = passwordInput.value.trim();

    // Verificar que los campos no estén vacíos, si no lo estan, guarda los datos en el localStorage
    // y redirecciona al index.html
    // si no hay datos, tira un alert

    // Define una expresion regular que valida email
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (validEmail.test(username) && password) {
      localStorage.setItem("username", username); // (nombre, el contenido)
      localStorage.setItem("password", password);
      window.location.href = "index.html";
    } else {

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
    }
  });
  });
