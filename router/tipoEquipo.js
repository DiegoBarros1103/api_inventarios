const { Router } = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const { validarTipoEquipo } = require('../helpers/validar-tipoEquipo');
const { validarJWT } = require("..//middleware/validar-jwt");
const { validacionRolAdmin } = require("..//middleware/validar-rol-admin");

const router = Router();

router.post('/',[ validarJWT, validacionRolAdmin ],async function(req, res){

    try {
        const validaciones = validarTipoEquipo(req);
        
        if (validaciones.length < 0) { //validaciones.length < 0)
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear tipo de equipo')
    }

});

router.get('/',[ validarJWT, validacionRolAdmin ],async function(req, res){

    try {

        const tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }

});

router.put('/:tipoEquipoId',[ validarJWT, validacionRolAdmin ],async function(req, res){

    try {
        const validaciones = validarTipoEquipo(req);
        
        if (validaciones.length < 0) { 
            return res.status(400).send(validaciones);
        }

        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo) {
            return res.status(400).send('No existe tipo Equipo');
        }
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar tipo de equipo')
    }

});


router.get('/:tipoEquipoId',[ validarJWT, validacionRolAdmin ],async function(req, res){
    try {
        const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo) {
            return res.status(404).send('No existe tipo Equipo');
        }
        res.send(tipoEquipo);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al consultar inventario');
    }
}) 

module.exports = router;