const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};

// REDIRECCIONAR AL LOGIN SI NO SE ENCUENTRAN DATOS EN EL SESSIONSTORAGE

const savedUsername = localStorage.getItem("username"); // Llamamos al contenido guardado en login.js
const savedPassword = localStorage.getItem("password");

if (!savedUsername || !savedPassword) {
  //SI NO ENCUENTRA NINGUN VALOR (ES FALSE, POR ESO !), REDIRECCIONA
  window.location.href = "login.html";
}

// MOSTRAR USUARIO EN LA BARRA DE NAVEGACION

// ENTREGA 4.2 DROPDOWN

// Agregar usuario como boton
const userInfo = document.createElement("a"); 
const dropdownMenu = document.getElementById("dropdownMenuButton1");
dropdownMenu.innerHTML = savedUsername; 

// Cerrar sesion y eliminar el usuario del localStorage
const session = document.getElementById('closeSession');

session.addEventListener('click', function() {

  localStorage.removeItem('username');
  localStorage.removeItem('password');
  window.location.href = "login.html";

})

// ENTREGA 4.2 DROPDOWN

// // Creo link, agrego la calse y guardo la info de savedusername
// const userInfo = document.createElement("a"); 
// userInfo.classList.add("nav-link");
// userInfo.innerHTML = savedUsername; 

// Creo un li y le agrego clase y luego agrego el a creado antes al li
// const li = document.createElement("li"); 
// li.classList.add("nav-item"); 
// li.appendChild(userInfo);

// // Obtengo los datos de la barra de navegacion y obtengo la lista dentro, finalmente agrego el li al ul
// const navbar = document.getElementById("navbarNav"); 
// const ul = navbar.querySelector(".navbar-nav"); 

// ul.appendChild(li); 







