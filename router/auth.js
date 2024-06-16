const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validarAuth } = require('../helpers/validar-auth');
const bycript = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const router = Router();

router.post('/', async function(req, res){
    
    try{
        const validaciones = validarAuth(req);
        
        if (validaciones.length > 0) { //validaciones.length > 0)
            return res.status(400).send(validaciones);
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if(!usuario) {
            return res.status(400).send('User no found');
        }
        
        const esIgual = bycript.compareSync(req.body.password, usuario.password);
        if(!esIgual) {
            return res.status(400).json({ mensaje : "USER not found" });
        }

        const token = generarJWT(usuario);
                
        res.json({
            _id: usuario._id, nombre: usuario.nombre,
            rol: usuario.rol, email: usuario.email, access_token: token       
        
        });
        
    } catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }

});



module.exports = router;