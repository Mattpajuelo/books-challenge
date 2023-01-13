const { check } = require('express-validator');

module.exports = [
    check('title').notEmpty().withMessage('Debes ingresar un titulo').bail()
    .isLength({ min: 5 } ,{max : 100}).withMessage('El titulo debe tener minimo 5 letras y 100 maximo')
 ,

    check('cover').notEmpty().withMessage('Debes ingresar Debe ingresar la url de una imagen '),
    

    check('description').trim().notEmpty().withMessage('Debes ingresar una descripcion del libro').bail()
    .isLength({min:10}).withMessage('Debe contener minimo 10 caracteres y maximo 255')
    .isLength({max:1000}).withMessage('Debe contener maximo 255 caracteres'),

    

]