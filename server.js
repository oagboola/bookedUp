var mongoose = require('mongoose'),
  express = require('express'),
  bodyParser = require('body-parser'),
  dbConfig = require('./app/dbConfig'),
  routes = require('./app/routes'),
  session = require('express-session')
  passport = require('passport'),
  passportConfig = require('./app/passportConfig'),
  mongoStore = require('connect-mongo')({session: session});;

var app = express();
var port = process.env.port || '5000';

mongoose.connect(dbConfig.developmentDb);

app.use(bodyParser.json());

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'bookedup',
  store: new mongoStore({
    url: dbConfig.developmentDb
  })
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

routes(app);

passportConfig();

app.listen(port, function(){
  console.log('app running on ', port);
});