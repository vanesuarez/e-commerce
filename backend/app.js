const express = require("express");
const cors = require("cors"); // middleware cors para ver el frontend, permite hacer solicitud desde dominios diferentes
const app = express();
const port = 3000;
const fs = require('fs');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE SECRETA";

app.use(express.json());
app.use(cors());

// Categorias
app.get("/cats", (req, res) => {

  const filePath = __dirname + "/jsonFiles/cats/cat.json"; //dirname es variable global de node.js que representa el directorio del archivo actual
  res.sendFile(filePath);
});

// Productos dentro de la categoria
app.get("/cats/:id", (req, res) => {

  const id = req.params.id;
  const filePath = __dirname + `/jsonFiles/cats_products/${id}.json`;

    res.sendFile(filePath);
});

// Producto info
app.get("/products/:id", (req, res) => {

  const id = req.params.id;
  const filePath = __dirname + `/jsonFiles/products/${id}.json`;

    res.sendFile(filePath);
});

// Producto info comments
app.get("/products_comments/:id", (req, res) => {

  const id = req.params.id;
  const filePath = __dirname + `/jsonFiles/products_comments/${id}.json`;

    res.sendFile(filePath);
});

// Cart item (default - Peugeot)
app.get("/user_cart/", (req, res) => {

  const filePath = __dirname + "/jsonFiles/user_cart/25801.json";

    res.sendFile(filePath);
});

// Cart acceso
app.use("/cart", (req, res, next)=>{
  try {
    const decoded = jwt.verify(req.headers["access"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch(err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.get("/cart/", (req, res) => {

  const filePath = __dirname + "/jsonFiles/cart/buy.json";

    res.sendFile(filePath);

});

// Sell - Publish
app.get("/sell/", (req, res) => {

  const filePath = __dirname + "/jsonFiles/sell/publish.json";

    res.sendFile(filePath);

});

// Parte 2 - Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecta" });
  }
});

//parte 3 - /cart


//Desafiate
app.post("/cart", (req, res) => {
  const newArticle = req.body;

  // Especifica el nombre del archivo y la ruta en donde vamos a guardar
  const dataFile = 'dataCartItems.json';

  // Lee el contenido actual del archivo (si existe)
  fs.readFile(dataFile, 'utf8', (err, currentData) => {
    if (err) {
      // Si el archivo no existe o hay un error al leerlo, simplemente escribe los nuevos datos en el archivo
      writeInFile([newArticle]);
    } else {
      console.log('entra acá', currentData);
      // Si el archivo existe y tiene datos, combina los datos existentes con los nuevos datos
      const existingData = currentData ? JSON.parse(currentData) : [];
      const allData = [...existingData, newArticle];

      // Escribe los datos combinados en el archivo
      writeInFile(allData);
    }
  });

  function writeInFile(data) {
    const jsonData = JSON.stringify(data);

    fs.writeFile(dataFile, jsonData, 'utf8', (err) => {
      if (err) {
        res.send("Error al guardar los datos");
      } else {
        res.send("Los datos se han guardado correctamente");
      }
    });
  }
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

