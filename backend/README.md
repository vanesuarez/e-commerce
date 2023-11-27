# Instrucciones para probar el servidor 

Para probar este proyecto en Postman, se debe realizar lo siguiente:
1- Abre la terminal y ejecuta el comando `npm install`, el cual instalará todas las dependencias del proyecto.
2- A continuación ejecuta el comando `npm run dev`, el cual inicia el servidor en "modo desarrollo" utilizando nodemon.
3- Abrir Postman y realizar las pruebas utilizando la url http://localhost:3000/ seguido del endpoint necesario siguiendo la estructura creada en el archivo app.js. Agregar en el body la informacion necesaria (si es una solicitud post).

El archivo init.js tiene los cambios realizados en los endpoint para dirigir a los JSON del localhost. Todos los archivos se visualizaran en el frontend correctamente utilizando Liver Server debido a la dependencia "cors" agregada.





