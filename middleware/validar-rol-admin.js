const jwt = require("jsonwebtoken");

const validacionRolAdmin = (req, res, next) =>{
    if (req.payload.rol !="Administrador") {
       return res.status(401).json({ mensaje: "Error unauthorized"});
    }

    next();

    
    }



module.exports = {
    validacionRolAdmin
}