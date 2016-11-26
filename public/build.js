
var bookedUpApp = angular.module("bookedUpApp", ['ngRoute', 'ngFileUpload', 'ui.materialize'])

bookedUpApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/books', {
    templateUrl: 'allBooks/allBooks.html'
  })
  .when('/books/new', {
    templateUrl: 'newBook/newBook.html'
  })
  .when('/books/:bookId', {
    templateUrl: 'book/book.html'
  })
  .when('/books/donor/:donorId', {
    templateUrl: 'donorBooks/donorBooks.html'
  })
  .when('/books/:bookId/edit', {
    templateUrl: 'editBook/editBook.html'
  })
  .when('/contact', {
    templateUrl: 'contact/contact.html'
  })
  .otherwise({
    redirectTo: '/'
  });

  //use the HTML5 History API (get rid of the # in the urls)
  $locationProvider.html5Mode(true);
}]);

bookedUpApp.run(['$rootScope', 'authenticationService','$location', function($rootScope, authenticationService, $location){
  $rootScope.$on('$routeChangeStart', function(){
    authenticationService.currentUser().then(function(resp){
      if($location.path() == '/'){
        $location.path('/books');
      }
    }).catch(function(error){
      $location.path('/')
    })

  })
}]);
(function(){
  angular.module('bookedUpApp').controller('IndexController', IndexController);

  IndexController.$inject = ['authenticationService', '$location', '$http', '$rootScope'];

  function IndexController(authenticationService, $location, $http, $rootScope){
    var index = this;
    index.user = {};

    authenticationService.currentUser().then(function(user){
      index.user = user.data;
    })

    index.logout = function(){
      $http.get('/logout').then(function(response){
        index.user = {};
        $location.path('/');
      })
    }
  }
})();
(function(){
  angular.module('bookedUpApp').controller('booksListController', booksListController);

  booksListController.$inject = ['booksService']

  function booksListController(booksService){
    var books = this;

    booksService.getBooks().then(function(response){
      books.bookCollection = response.data
    });
  }
})();
(function(){
  angular.module('bookedUpApp').controller('BookController', BookController)

  BookController.$inject = ['booksService', '$routeParams']

  function BookController(booksService,  $routeParams){
    var book = this;

    booksService.getBookById($routeParams.bookId).then(function(response){
      book.currentBook = response.data;
    })
  }
})();
(function(){
  angular.module('bookedUpApp').controller('ContactController', ContactController);

  ContactController.$inject = ['$http'];

  function ContactController($http){
    var contact = this;
    contact.message = {};

    contact.sendMail = function(){
      contact.loading = true;
      $http.post('/api/contact', contact.message).then(function(response){
        contact.loading = false;
        Materialize.toast('Message Sent Successfully', 5000)
        contact.message = {};
      }).catch(function(error){
        Materialize.toast('Message Not Sent', 5000)
        console.log('error', error);
      })
    }
  }
})();
(function(){
  angular.module('bookedUpApp').controller('DonorBooksController', DonorBooksController);

  DonorBooksController.$inject = ['booksService', '$routeParams']

  function DonorBooksController(booksService, $routeParams){
    $('.tooltipped').tooltip({delay: 50});
    var donorBooks = this;
    donorBooks.books = {}

    var getBooks = function(){
      booksService.getBooksByDonor($routeParams.donorId).then(function(response){
        donorBooks.books = response.data;
      });
    }

    getBooks();

    donorBooks.deleteBook = function(bookId){
      var decision = confirm('Delete book? Action cannot be reversed');
      if(decision){
        booksService.deleteBook(bookId).then(function(response){
          getBooks();
        })
      }
    }
  }
})();
(function(){
  angular.module('bookedUpApp')
          .controller('HomeController', HomeController);

  HomeController.$inject = ['authenticationService', '$location'];

  function HomeController(authenticationService, $location){

    //enable materialisecss tabs
    $('ul.tabs').tabs();

    var home = this;
    home.userSignup = {};
    home.userLogin = {};

    home.signup = function(){
      authenticationService.signup(home.userSignup).then(function(user){
        if(user){
          $location.path('/books');
        }
      }).catch(function(err){
        if(err.data.errors.email.kind == 'user defined'){
          alert('email already exists');
        }
        else {
          alert('Error with signup');
        }
      })
    }

    home.login = function(){
      authenticationService.login(home.userLogin).then(function(user){
        $location.path('/books');
      }).catch(function(err){
        alert('Email or password incorrect');
      });
    }
  }

})();
(function(){
  angular.module('bookedUpApp').controller('EditBookController', EditBookController);

  EditBookController.$inject = ['booksService','$routeParams', 'Upload', '$location']

  function EditBookController(booksService, $routeParams, Upload, $location){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    var bookToEdit = this;
    bookToEdit.details = {}

    booksService.getBookById($routeParams.bookId).then(function(response){
      bookToEdit.details = response.data;
    })

    bookToEdit.updateBookCover = function(file){
      bookToEdit.newBookCover = file
    }

    bookToEdit.update = function(){
      var url = '/api/books/'+$routeParams.bookId;
      if(bookToEdit.newBookCover){
        Upload.upload({
          url: url,
          data: {bookCover: bookToEdit.newBookCover, bookInfo: bookToEdit.details},
          method: 'PUT'
        }).then(function (resp) {
          $location.path('/books/'+resp.data._id);
        }, function (error) {
          console.log('Error:', error)
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
      }
      else {
        booksService.updateBook($routeParams.bookId, bookToEdit.details).then(function(response){})
      }
    }
  }
})();

(function(){
  angular.module('bookedUpApp').controller('NewBookController', NewBookController)

  NewBookController.$inject = ['Upload', 'authenticationService', '$location'];

  function NewBookController (Upload, authenticationService, $location){

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });

    var newBook = this;

    var currentUser = {};
    newBook.book = {};
    newBook.bookCover = {};
    newBook.showLoader = false;

    authenticationService.currentUser().then(function(user){
      currentUser = user;
    });

    newBook.upload = function(file){
      newBook.showLoader = true;
      newBook.bookCover = file
      newBook.showLoader = false;
    }

    newBook.create = function () {
      newBook.showLoader = true;
      Upload.upload({
          url: '/api/books',
          data: {bookCover: newBook.bookCover, bookInfo: newBook.book}
      }).then(function (resp) {
          newBook.showLoader = false;
          $location.path('/books');
      }, function (error) {
          console.log('Error:', error)
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }
  }
})();
(function(){
  angular.module('bookedUpApp')
        .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$http']

  function authenticationService($http){
    return{
      signup: function(user){
        return $http.post('/signup', user);
      },
      login: function(user){
        return $http.post('/signin', user);
      },
      currentUser: function(){
        return $http.get('/user');
      },
      logout: function(){
        return $http.get('/logout');
      }
    }
  }
})();
(function(){
  angular.module('bookedUpApp').factory('booksService', booksService)

  booksService.$inject = ['$http']

  function booksService($http){
    return {
      getBooks: function(){
        return $http.get('/api/books')
      },
      getBookById: function(id){
        return $http.get('/api/books/' + id)
      },
      getBooksByDonor: function(donorId){
        return $http.get('/api/books/donor/' + donorId);
      },
      updateBook: function(bookId, book){
        return $http.put('/api/books/'+bookId, book);
      },
      deleteBook: function(bookId){
        return $http.delete('/api/books/' + bookId);
      }
    }
  }
})();