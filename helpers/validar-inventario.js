const validarInventario = (req) =>{
    const validaciones = [];

    if (!req.body.serial) {
        validaciones.push('Serial es requerido');
    }

    if (!req.body.modelo) {
        validaciones.push('Modelo es requerido');
    }

    
    if (!req.body.descripcion) {
        validaciones.push('Descripcion es requerida');
    }

    if (!req.body.color) {
        validaciones.push('color es requerida');
    }

    
    if (!req.body.fotoEquipo) {
        validaciones.push('Foto es requerido');
    }

    if (!req.body.fechaCompra) {
        validaciones.push('Fecha compra es requerida');
    }

    
    if (!req.body.precio) {
        validaciones.push('Precio es requerido');
    }

    if (!req.body.usuario) {
        validaciones.push('Usuario es requerido');
    }

    
    if (!req.body.marca) {
        validaciones.push('Marca es requerida');
    }

    if (!req.body.tipoEquipo) {
        validaciones.push('Tipo equipo es requerido');
    }

    if (!req.body.estadoEquipo) {
        validaciones.push('Estado equipo es requerido');
    }

    return validaciones;
}

module.exports = {
    validarInventario,
}