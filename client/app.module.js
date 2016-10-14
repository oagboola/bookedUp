var bookedUpApp = angular.module("bookedUpApp", ['ngRoute', 'ngFileUpload'])

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
  .otherwise({
    redirectTo: '/'
  });

  //use the HTML5 History API (get rid of the # in the urls)
  $locationProvider.html5Mode(true);
}]);