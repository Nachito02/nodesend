const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivosController.js')
const enlacesController = require('../controllers/enlacesController.js')

const auth = require('../middleware/auth')

//subida de archivos

router.post('/', auth, archivosController.subirArchivo)

router.get('/:archivo', archivosController.descargar,archivosController.eliminarArchivo)
module.exports = router




