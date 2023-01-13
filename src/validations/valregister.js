const { check, body } = require('express-validator');
const db = require('../database/models');

module.exports = [

    // Nombre
    check('name').notEmpty().withMessage('Este campo es obligatorio').bail()
        .matches(/^[a-zA-Z0-9\sñáéíóúü ]*$/).withMessage("El nombre no debe contener datos numéricos ni especiales")
        .isLength({ min: 5 }).withMessage('Debe haber por lo menos 5 letras'),

    // Email
    check('email').notEmpty().withMessage('Este campo es obligatorio').bail()
        .isEmail().withMessage('Debe ingresar un email valido'),
      /*  .custom((value, { req }) => {
            return db.User.findOne({
                where: { email: req.body.email }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject("este correo ya esta en uso")
                    }
                })
                .catch(() => {
                    return Promise.reject()
                })
        }),*/

    // Pass
    check('password').notEmpty().withMessage('Este campo es obligatorio').bail(),
        

    check('country').notEmpty().withMessage('Este campo es obligatorio').bail(),
    check('category').notEmpty().withMessage('Este campo es obligatorio').bail(),
    
    
      
]
