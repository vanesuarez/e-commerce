const productList = document.getElementById("product-list");

document.addEventListener("DOMContentLoaded", function () {

    // URL del JSON de productos
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    // Realizar la petición GET usando Fetch API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Iterar a través de los productos en el JSON
            data.products.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                const divTexto = document.createElement("div");
                divTexto.classList.add("divParaTexto");

                const divImg = document.createElement("div");
                divImg.classList.add("divParaImg");

                // Crear elementos para cada propiedad del producto
                const productName = document.createElement("h4");
                productName.textContent = product.name;

                const productDescription = document.createElement("p");
                productDescription.textContent = product.description;

                const productPrice = document.createElement("h5");
                productPrice.textContent = `Precio: USD ${product.cost}`;

                const productSold = document.createElement("p");
                productSold.textContent = ` ${product.soldCount} vendidos`;

                const productImage = document.createElement("img");
                productImage.src = product.image;
                productImage.alt = product.name;

                productDiv.appendChild(divTexto);
                productDiv.appendChild(divImg);
                
                // Agregar elementos al contenedor del producto
                divTexto.appendChild(productName);
                divTexto.appendChild(productDescription);
                divTexto.appendChild(productPrice);
                divTexto.appendChild(productSold);
                divImg.appendChild(productImage);

                // Agregar el contenedor del producto a la lista de productos
                productList.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);

        });

    
    // FILTRAR POR PRECIO (filter)

    const botonFiltrar = document.getElementById("rangeFilterCount");
    const minPrice = document.getElementById("rangeFilterCountMin").value;
    const maxPrice = document.getElementById("rangeFilterCountMax").value;

    botonFiltrar.addEventListener("click", () => { 
        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
            let filterMin = productList.filter( (product) => product.price === minPrice);
        }

        if  ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice); 
            let filterMax = productList.filter( (product) => product.price === maxPrice);
        }

    })


        
});

// ENTREGA 2

// FILTRAR POR PRECIO (filter)

let filterMin = productList.filter( (product) => product.price === minCount);

// // ORDENAR ALFABETICAMENTE (sort)

// let asc = productName.sort((x, y) => x.name.localeCompare(y.name));
//     console.log(asc);


// document.addEventListener("DOMContentLoaded", function(e){

//     document.getElementById("sortAsc").addEventListener("click", function(){
//         const orderedStrings = productList.sort((a, b) => a.localeCompare(b));;
//     });

// })


// LIMPIAR

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showCategoriesList();

})

