const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validarUsuario } = require('../helpers/validar-usuario');
const bycript = require("bcryptjs");
const { validarJWT } = require("..//middleware/validar-jwt");
const { validacionRolAdmin } = require("..//middleware/validar-rol-admin");


const router = Router();

router.post('/', [ validarJWT, validacionRolAdmin ],async function(req, res){
    
    try{
        const validaciones = validarUsuario(req);
        
        if (validaciones.length < 0) { //validaciones.length > 0)
            return res.status(400).send(validaciones);
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if(existeUsuario) {
            return res.status(400).send('Email ya existe');
        }
        console.log(req.body);
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;

        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password;
       
        usuario.rol = req.body.rol;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save(); 
        
        res.send(usuario);
        console.log(usuario);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al crear usuario');
    }

});

router.get('/',[ validarJWT, validacionRolAdmin ], async function(req, res){
    
    try{
        const usuarios = await Usuario.find();
        res.send(usuarios); 
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }

});

router.put('/:usuarioId',[ validarJWT, validacionRolAdmin ], async function(req, res){
   
    try{
        const validaciones = validarUsuario(req);
        
        if (validaciones.length < 0) { //validaciones.length > 0)
            return res.status(400).send(validaciones);
        }
        
        let usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario) {
            return res.status(400).send('usuario no existe');
        }

        const existeUsuario = await Usuario.
        findOne({ email: req.body.email, _id: { $ne: usuario._id } });
        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.password = req.body.password;
        usuario.rol = req.body.rol;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        
        res.send(usuario);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar el usuario');
    }

});

module.exports = router;