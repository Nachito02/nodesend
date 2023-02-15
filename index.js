const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors');


//crear servidor
const app = express();
 

//conectar a la base de datos

conectarDB()

//habilitar cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}

app.use(cors(opcionesCors))

// habilitar leer los valores del body

app.use(express.json())

//habilitar carpeta publica

app.use(express.static('uploads'))

// puerto de lapp

const port = process.env.PORT || 4000;



//rutas de la app


app.use('/api/usuarios', require('./routes/usuarios'));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));



// arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log('el servidor esta funconando en el puerto'+port)
})