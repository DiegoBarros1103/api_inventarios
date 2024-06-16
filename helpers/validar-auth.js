const validarAuth= (req) => {
    const validaciones = [];


    if (!req.body.email) {
        validaciones.push('email es requerido');
    }


    if (!req.body.password) {
        validaciones.push('Password es requerido');
    }

   

    return validaciones;
}

module.exports = {
    validarAuth,
}