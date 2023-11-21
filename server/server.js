const express = require("express");
const app = express();
const port = 3000;
const path = require('path');

app.use(express.json());

// Rutas estáticas para los archivos JSON
app.use('/public', express.static(path.join(__dirname, 'public')));



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
