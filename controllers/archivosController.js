const multer = require("multer");
const shortid = require("shortid");
const fs = require('fs');
const Enlaces = require("../models/Enlace");
exports.subirArchivo = async (req, res,next) => {

    const configuracionMulter = {
        limits: { filesSize: req.usuario ? 1024 *1024 *10 :1024 *1024  },
        storage: (fileStorage = multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, __dirname + "/../uploads");
          },
          filename: (req, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      
            cb(null, `${shortid.generate()}${extension}`);
          },
          // fileFilter : (req,file,cb) => {
          //     if(file.mimetype === 'application/pdf') {
          //         return cb(null, true)
          //     }
          // }
        })),
      };

      const upload = multer(configuracionMulter).single('archivo')

    upload(req,res, async (error)=> {

            if(!error) {
                res.json({archivo: req.file.filename})
            } else {
                console.log(error);
                return next()
            }
    }) 
};

exports.eliminarArchivo = async (req, res) => {


try {
    fs.unlinkSync(__dirname+`/../uploads/${req.archivo}`)

    await Enlaces.findOneAndRemove(req.params.url)
} catch (error) {
        console.log(error)
}
};



//descarga un archivo

exports.descargar = async(req,res,next) => { 

    const {archivo} = req.params;

  //obtiene el enlace
    const enlace = await Enlaces.findOne({nombre: archivo})
 
  const archivoDescarga = __dirname + '/../uploads/' +archivo

    res.download(archivoDescarga)

    //eliminar el archivo y la entrada

    //si las descargas son iguales a 1 Borrar la entrad y bborrar el archivo

    if(enlace) {
      const {descargas, nombre} = enlace;
    
      if(descargas === 1) {
    
        //eliminar el archivo
        req.archivo = nombre
    
        //eliminar la entrada de la bd
          await Enlaces.findOneAndRemove(enlace.id)
        next()
    } else {
      enlace.descargas--;
      await enlace.save()
    }


  } 
 }