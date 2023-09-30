document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });


      //   ENTREGA 4.3
  
      const moonButton = document.getElementById("moonButton");
      const mode = localStorage.getItem("mode");
  
  
      const darkMode = () => {
        document.querySelector("body").setAttribute("data-bs-theme", "dark");
        document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill"); //  cambia el icono 
        localStorage.setItem("mode", "dark");
      };
    
      const lightMode = () => {
        document.querySelector("body").setAttribute("data-bs-theme", "light");
        document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");
        localStorage.setItem("mode", "light");
      };
    
      const changeTheme = () => {
        const theme = document.querySelector("body").getAttribute("data-bs-theme");
        if (theme === "light") {
          darkMode();
        } else {
          lightMode();
        }
      };
  
      if (mode === "dark") {
        darkMode();
      } else {
        lightMode();
      };
    
      moonButton.addEventListener("click", changeTheme);
      
});
