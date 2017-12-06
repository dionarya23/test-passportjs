const express      = require('express');
const app          = express();
const port         = process.env.PORT || 8080;
const passport     = require('passport');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const bcrypt       = require('bcrypt-nodejs');
const configDB     = require('./config/database.js');
const User         = require('./app/models/user');

const options = {
  saveUninitialized: true,
  resave: true,
  secret: "ini rahasia",
  };

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(session(options));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(User, passport, bcrypt);
require('./app/routes')(app, passport);
app.listen(port);
console.log('The magic happens on port ' + port);
