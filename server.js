var mongoose = require('mongoose'),
  express = require('express'),
  bodyParser = require('body-parser'),
  dbConfig = require('./app/dbConfig'),
  routes = require('./app/routes'),
  session = require('express-session')
  passport = require('passport'),
  passportConfig = require('./app/passportConfig'),
  morgan = require('morgan'),
  mongoStore = require('connect-mongo')({session: session});

var app = express();
var port = process.env.PORT || '5000';

var env = process.env.NODE_ENV || 'development'

var dbUrlMappings = {
  development: dbConfig.developmentDb,
  test: dbConfig.testDB,
  production: dbConfig.productionDb
}

var dbUrl = dbUrlMappings[env];

mongoose.connect(dbUrl);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'bookedup',
  store: new mongoStore({
    url: dbUrl
  })
}));

app.use(passport.initialize());

app.use(passport.session());

passportConfig();

routes(app);

app.listen(port, function(){
  console.log('app running on ', port);
});

module.exports = app;