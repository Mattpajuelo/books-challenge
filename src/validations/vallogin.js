const { check, body } = require('express-validator');
const db = require('../database/models');
const bcryptjs = require('bcryptjs');

module.exports = [
    check('email').notEmpty().withMessage('Debe ingresar su email').bail()
        .isEmail().withMessage('No es un email valido'),

    check('password').notEmpty().withMessage('Debe ingresar su contraseña'),
        

    body('password')
        .custom((value, { req }) => {
            return db.User.findOne({
                where: { email: req.body.email }
            })
                .then(user => {
                    if (!bcryptjs.compareSync(value, user.dataValues.Pass)) {
                        return Promise.reject()
                    }
                })
                .catch(() => {
                    return Promise.reject("Email o contraseña incorrecta")
                })
        })
]