
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
module.exports = (req, res,next) => {

    const autHeader = req.get("Authorization");

  if (autHeader) {
    //obtener el token
    const token = autHeader.split(" ")[1];

    // comprobar el JWT

    try {
      const usuario = jwt.verify(token, process.env.SECRETA);

      req.usuario = usuario
    } catch (error) {
      console.log(error);
    }
  }

    return next()

}