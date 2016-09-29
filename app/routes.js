var books = require('./controllers/books.controller'),
    users = require('./controllers/users.controller');

module.exports = function(app){

  //landing page
  app.get('/', function(req, res){
    res.sendfile('public/index.html');
  });

  app.route('/signup')
      .post(users.signup);

  app.route('/signin')
      .post(users.login);

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook',
      {
        successRedirect: '/books',
        failureRedirect: '/',
        scope: ['email', 'public_profile']
      }
    )
  );

  app.route('/logout')
      .get(users.logout);

  //books
  app.route('/books')
    .get(users.authenticate, books.listBooks)
    .post(books.createBook);

  app.route('/books/:bookId')
    .get(users.authenticate, users.authenticate, books.findBook)
    .delete(users.authenticate, books.deleteBook)
    .put(users.authenticate, books.update);
}