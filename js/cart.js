document.addEventListener("DOMContentLoaded", ()=> {

    const cont = document.getElementById("container");
    const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const img = `${data.articles[0].image}`;
        const name = `${data.articles[0].name}`;
        const cost = `${data.articles[0].currency} ${data.articles[0].unitCost}`;
        const count = `${data.articles[0].count}`;

        const articulo = document.createElement("div");
        articulo.classList.add("divCartN");
        cont.appendChild(articulo);

        const cImg = document.createElement("img");
        cImg.src = img;
        articulo.appendChild(cImg);
        const cName = document.createElement("p");
        articulo.appendChild(cName);
        cName.innerHTML = name;
        const cCost = document.createElement("p");
        articulo.appendChild(cCost);
        cCost.innerHTML = cost;
        const cCount = document.createElement("input");
        articulo.appendChild(cCount);
        cCount.value = count;
        const cSubTotal = document.createElement("p");
        articulo.appendChild(cSubTotal); 
        cSubTotal.innerHTML = `<b>${data.articles[0].currency} ${data.articles[0].unitCost * data.articles[0].count}</b>`;
    })
})
//Entrega 5 desafiate
document.getElementById("buyBtn").addEventListener("click", function (){
       
    window.location.href = "cart.html";
    });
