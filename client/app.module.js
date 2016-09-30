var bookedUpApp = angular.module("bookedUpApp", ['ngRoute'])

bookedUpApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  });

  //use the HTML5 History API (get rid of the # in the urls)
  // $locationProvider.html5Mode(true);
}]);