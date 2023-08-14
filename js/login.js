
const username = document.getElementById("username")
const passwoord = document.getElementById("passwoord")
const login = document.getElementById("login-form")
console.log('tamo aca');

login.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    //Redireccionamos al usuario a la portada silas credenciales son validas
    if(username.value.trim() !== "" && passwoord.value.trim() !== "") {
            window.location.href = "index.html";
    }
    else {
        window.location.href = "login.html";
    }
})

// localStorage.setItem("user", JSON.stringify(user)); 
// sessionStorage.getItem("user", JSON.stringify(user));