const { Router } = require('express');
const EstadoEquipo = require ('../models/EstadoEquipo');
const { validarEstadoEquipo } = require('../helpers/validar-estadoEquipo');
const { validarJWT } = require("..//middleware/validar-jwt");
const { validacionRolAdmin } = require("..//middleware/validar-rol-admin");

const router = Router();

router.post('/',[ validarJWT, validacionRolAdmin ],async function(req, res){
    
    try {
        const validaciones = validarEstadoEquipo(req);
        
        if (validaciones.length < 0) { //validaciones.length < 0)
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al crear estado de equipo')
    }

});

router.get('/',[ validarJWT, validacionRolAdmin ],async function(req, res){
    
    try {

        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }

});

router.put('/:estadoEquipoId',[ validarJWT, validacionRolAdmin ], async function(req, res){
    
    try {
        const validaciones = validarEstadoEquipo(req);
        
        if (validaciones.length < 0) { //validaciones.length < 0)
            return res.status(400).send(validaciones);
        }

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo) {
            return res.status(400).send('No existe estado Equipo');
        }
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);

    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar estado de equipo')
    }

});

module.exports = router;