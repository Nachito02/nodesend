const Enlaces = require("../models/Enlace");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.nuevoEnlace = async (req, res, next) => {
  //revisar si hay errores

  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre_original } = req.body;

  //creara objeto enlace
  const enlace = new Enlaces();
  enlace.url = shortid.generate();
  enlace.nombre = shortid.generate();
  enlace.nombre_original = nombre_original;

  //si el usuario esta autenticado

  if (req.usuario) {
    const { password, descargas } = req.body;

    //asignar al enlace en numero de descargas

    if (descargas) {
      enlace.descargas = descargas;
    }

    //asignar un password
    if (password) {
      const salt = await bcrypt.genSalt(10);

      enlace.password = await bcrypt.hash(password, salt);
    }

    //asignar el autor

    enlace.autor = req.usuario.id;
  }
  //almacenar enlace en la base de datos

  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};


// obtener enlce

exports.obtenerEnlace = async (req,res,next) => { 


  //verificar si existe el enlace

  const enlace = await Enlaces.findOne({url : req.params.url})


 if(!enlace) {
  res.status(404).json({msg: 'ese mensaje no existe'})

  return next()
 }

 // si el enlace existe 

 res.json({archivo: enlace.nombre})

 //si las descargas son iguales a 1 Borrar la entrad y bborrar el archivo

  const {descargas, nombre} = enlace;

  if(descargas === 1) {
    console.log('solo 1')

    //eliminar el archivo
    req.archivo = nombre

    //eliminar la entrada de la bd
    next()


  } else {
    enlace.descargas--;
    await enlace.save()
  }

 // si las descargas son > a 1 restar 1
}