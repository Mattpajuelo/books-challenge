const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");
const { validationResult } = require('express-validator')

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    // Implement look for details in the database
    let id = +req.params.id

    db.Book.findByPk(id,
      {

        include: [{ association: 'authors' }]
      }
    )
      .then((books) => {

        return res.render('bookDetail', { books });
      })
      .catch((error) => console.log(error));


  },
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: (req, res) => {
    // Implement search by title
    let elemento = req.body.title
    let resultados = db.Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.substring]: elemento } },

        ]
      }
    })
    Promise.all([resultados])
      .then(([books]) => {

        return res.render('search', { books })
      })

    //res.render('search');
  },
  deleteBook: (req, res) => {
    // Implement delete book

    let id = req.params.id;

    db.Booksauthors.destroy({
      where: {
        BookId: id
      }
      , force: true
    })
      .then(() => {
        db.Book.destroy({ where: { id: id } })
        return res.redirect('/')
      })
      .catch(error => res.send(error))



    //return res.redirect('/')


  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    db.Author.findAll({


      where: { id: +req.params.id },
      include: [{ association: 'books' }]


    })

      .then((author) => {

        // return res.send()

        return res.render('authorBooks', { author });
      })
      .catch((error) => console.log(error));

  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
       db.User.create({
        Name: req.body.name,
        Email: req.body.email,
        Country: req.body.country,
        Pass: bcryptjs.hashSync(req.body.password, 10),
        CategoryId: req.body.category
      })
        .then(() => {
          res.redirect('/users/login');
        })
        .catch((error) => console.log(error));
    } else {
      return res.render('register', { errors: errors.mapped(), old: req.body })
    }
    
    
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      const { email, recordame } = req.body;
      db.User.findOne({
        where: {
          email
        }
      })
        .then(usuario => {
          /* console.log(usuario) */
          req.session.sessionuser = {
            id: usuario.id,
            nombre: usuario.Name,
            email: usuario.Email,

            rol: usuario.CategoryId

          }
          if (recordame) {
            res.cookie('session', req.session.sessionuser, { maxAge: 1000 * 60 * 60 * 24 })
          }

          //return res.send(req.session.sessionuser)
          return res.redirect('/')
        })
        .catch(error => {
          return res.send(error)
        })
    }
    else {
      // return res.send(errors)
      return res.render('login', { errors: errors.mapped(), old: req.body })
    }



  },
  edit: (req, res) => {
    // Implement edit book
    let id = +req.params.id

    db.Book.findByPk(id)
      .then((book) => {

        //return res.send(book)
        return res.render('editBook', { book });
      })
      .catch((error) => console.log(error));


  },
  processEdit: (req, res) => {
    // Implement edit book
    let errors = validationResult(req)
    let id = +req.params.id
    if (errors.isEmpty()) {
      let { title, cover, description } = req.body;
      db.Book.update(
        {
          title: title,
          cover: cover,
          description: description,


        },
        {
          where: {
            id: id
          }
        }
      )
        .then((productos) => {

          return res.redirect('/books/detail/' + id)


        })
    }
    else {
      let id = +req.params.id

      db.Book.findByPk(id)
        .then((book) => {

          //return res.send(book)
          return res.render('editBook', { book, errors: errors.mapped(), old: req.body });
        })
        .catch((error) => console.log(error));



    }

    //return res.redirect('/books/detail/'+id)

  },
  cerrar: (req, res) => {
    // Implement edit book
    req.session.destroy();
    if (req.cookies.session) {
      res.cookie('session', '', { maxAge: -1 })
    }

    return res.redirect('/')

  }
};

module.exports = mainController;
