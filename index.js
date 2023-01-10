const express = require('express');
const conectarDB = require('./config/db')

//crear servidor
const app = express();


//conectar a la base de datos

conectarDB()

// habilitar leer los valores del body

app.use(express.json())

// puerto de lapp

const port = process.env.PORT || 4000;


//rutas de la app

app.use('/api/usuarios', require('./routes/usuarios'));


// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log('el servidor esta funconando en el puerto'+port)
})