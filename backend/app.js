const express = require("express");
const cors = require("cors"); // middleware cors para ver el frontend, permite hacer solicitud desde dominios diferentes
const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

// Categorias
app.get("/cats", (req, res) => {

  const filePath = __dirname + "/jsonFiles/cats/cat.json"; //dirname es variable global de node.js que representa el directorio del archivo actual

  res.sendFile(filePath);
});

// Productos
app.get("/cats/:id", (req, res) => {

  const id = req.params.id;
  const filePath = __dirname + "/jsonFiles/cats_products/" + id + ".json";

    res.sendFile(filePath);
});

// Producto info
app.get("/cats/:id", (req, res) => {

  const id = req.params.id;
  const filePath = __dirname + "/jsonFiles/cats_products/" + id + ".json";

    res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

