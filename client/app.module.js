var bookedUpApp = angular.module("bookedUpApp", ['ngRoute'])

bookedUpApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
}]);