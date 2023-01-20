const multer = require("multer");
const shortid = require("shortid");
const fs = require('fs');
const Enlace = require("../models/Enlace");
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

console.log(req.archivo)

try {
    fs.unlinkSync(__dirname+`/../uploads/${req.archivo}`)

    await Enlace.findOneAndRemove(req.params.url)
} catch (error) {
        console.log(error)
}
};
