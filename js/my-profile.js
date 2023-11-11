document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const saveButton = document.getElementById("save-button");

  // Usar el nombre de usuario como valor inicial
  document.getElementById("email").value = savedUsername;

  // Agrega un controlador de eventos para el envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtiene los valores de los campos del formulario
    const firstName = document.getElementById("firstName").value;
    const firstSurname = document.getElementById("firstSurname").value;
    const email = document.getElementById("email").value;
    const secondName = document.getElementById("secondName").value;
    const secondSurname = document.getElementById("secondSurname").value;
    const phone = document.getElementById("phone").value;

    // Verifica que los campos obligatorios (*) tengan valor
    if (firstName && firstSurname && email) {
      // Si los campos están completos, guarda los datos en el almacenamiento local
      const userData = {
        firstName,
        firstSurname,
        email,
        secondName,
        secondSurname,
        phone,
      };

      // Convierte los datos a cadena JSON y guárdalos en el almacenamiento local
      localStorage.setItem("userData", JSON.stringify(userData));

      // Mostrar la alerta de éxito
      document.getElementById("sucessAlert").style.display = "block";

      setTimeout(function () {
        document.getElementById("sucessAlert").style.display = "none";
    }, 10000);
    }
  });

  // Carga los datos del almacenamiento local cuando se cargue la página
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    document.getElementById("firstName").value = userData.firstName;
    document.getElementById("firstSurname").value = userData.firstSurname;
    document.getElementById("email").value = userData.email;
    document.getElementById("secondName").value = userData.secondName;
    document.getElementById("secondSurname").value = userData.secondSurname;
    document.getElementById("phone").value = userData.phone;
  }

  // Desafiate

  const inputPicture = document.getElementById("profilePicture");
  const defaultImage = document.getElementById("defaultImage");

  // Funcion que actualiza la vista previa de la imagen que subimos
  function updateImage() {
    if (inputPicture.files && inputPicture.files[0]) {
      // verifica si hay archivos seleccionados
      const reader = new FileReader(); // el objeto FileReader lee archivos y accede a su contenido

      reader.onload = function (e) {
        // controlador para el evento load, cuando se completa la carga, se actualiza
        defaultImage.src = e.target.result; // target.result contiene los datos de la imagen
      };

      reader.readAsDataURL(inputPicture.files[0]); // readAsDataURL lee el archivo en formato de datos URL y muestra la img
    }
  }

  // Evento change para cambiar la imagen cuando se sube una nueva
  inputPicture.addEventListener("change", function () {
    updateImage();
  });

  // Evento click para guardar la imagen en el LocalStorage
  saveButton.addEventListener("click", () => {
    const imageSrc = document.getElementById("defaultImage").src;
    localStorage.setItem("profileImage", imageSrc);
  });

  // Mostar imagen si esta guardada en el local storage
  const savedImage = localStorage.getItem("profileImage");

  if (savedImage) {
    defaultImage.src = savedImage;
  }
});
