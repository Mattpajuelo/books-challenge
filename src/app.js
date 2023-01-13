const express = require('express');
const mainRouter = require('./routes/main');
const session = require('express-session')
const path = require('path');
const cookie = require('cookie-parser')
const userlocal = require('./middlewares/locallogin.js');
const tecuerdo = require('./middlewares/checkcoockie');
const { authorBooks } = require('./controllers/main');
const methodOverrive= require('method-override')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(session({
  secret: "session"
}))
app.use(cookie())
app.use(tecuerdo)
app.use(userlocal)

app.use(methodOverrive('_method'))

app.use('/', mainRouter);
app.use(express.static(path.join(__dirname,'..', 'public')));

app.listen(3000, () => {
  console.log('listening in http://localhost:3000');
});
