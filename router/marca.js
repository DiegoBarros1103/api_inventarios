const { Router } = require('express');
const Marca = require('../models/Marca');
const { validarMarca } = require('../helpers/validar-marca');
const { validarJWT } = require("..//middleware/validar-jwt");
const { validacionRolAdmin } = require("..//middleware/validar-rol-admin");

const router = Router();

router.post('/',[ validarJWT, validacionRolAdmin ],async function(req, res){

    try {
        const validaciones = validarMarca(req);
        
        if (validaciones.length < 0) { //validaciones.length < 0)
            return res.status(400).send(validaciones);
        }

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear la marca')
    }

});

router.get('/',[ validarJWT, validacionRolAdmin ],async function(req, res){
    try {

        const marcas = await Marca.find();
        res.send(marcas);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:marcaId',[ validarJWT, validacionRolAdmin ],async function(req, res){
    
    try {
        const validaciones = validarMarca(req);
        
        if (validaciones.length < 0) { //validaciones.length < 0)
            return res.status(400).send(validaciones);
        }

        let marca = await Marca.findById(req.params.marcaId);
        if(!marca) {
            return re.status(400).send('Marca no existe');
        }

        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        res.send(marca);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar la marca')
    }

});

module.exports = router;




