const validarUsuario = (req) => {
    const validaciones = [];

    if (!req.body.nombre) {
        validaciones.push('nombre es requerido');
    }

    if (!req.body.email) {
        validaciones.push('email es requerido');
    }

    if (!req.body.estado) {
        validaciones.push('Estado es requerido');
    }

    if (!req.body.password) {
        validaciones.push('Password es requerido');
    }

    if (!req.body.rol) {
        validaciones.push('Rol es requerido');
    }

    return validaciones;
}

module.exports = {
    validarUsuario,
}