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