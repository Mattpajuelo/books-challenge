const express = require('express');
const mainController = require('../controllers/main');
const vallogin = require('../validations/vallogin');
const valregister= require('../validations/valregister');
const valbook=require('../validations/valbook');
const valadmin=require('../middlewares/veradmin');

const router = express.Router();

router.get('/', mainController.home);
router.get('/books/detail/:id', mainController.bookDetail);
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);
router.get('/users/register', mainController.register);
router.post('/users/register',valregister, mainController.processRegister);
router.get('/users/login', mainController.login);
router.post('/users/login',vallogin, mainController.processLogin);
router.get('/users/cerrar',mainController.cerrar)
router.delete('/books/:id',valadmin, mainController.deleteBook);
router.get('/books/edit/:id',valadmin, mainController.edit);
router.put('/books/edit/:id',valadmin,valbook, mainController.processEdit);

module.exports = router;
