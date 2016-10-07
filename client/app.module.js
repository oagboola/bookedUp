var bookedUpApp = angular.module("bookedUpApp", ['ngRoute'])

bookedUpApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/books', {
    templateUrl: 'allBooks/allBooks.html'
  })
  .otherwise({
    redirectTo: '/'
  });

  //use the HTML5 History API (get rid of the # in the urls)
  $locationProvider.html5Mode(true);
}]);