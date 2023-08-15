document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    // REDIRECCIONAR AL LOGIN SI NO SE ENCUENTRAN DATOS EN EL SESSIONSTORAGE

    const savedUsername = sessionStorage.getItem("username");
    const savedPassword = sessionStorage.getItem("password");

    if (!savedUsername || !savedPassword) { //SI NO ENCUENTRA NINGUN VALOR (ES FALSE, POR ESO !), REDIRECCIONA
      window.location.href = "login.html";
    }

});

