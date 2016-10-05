(function(){
  angular.module('bookedUpApp').controller('IndexController', IndexController);

  IndexController.$inject = ['authenticationService', '$location', '$http'];

  function IndexController(authenticationService, $location, $http){
    var index = this;

    index.user = {};

    authenticationService.currentUser().then(function(user){
     index.user.email = user.data.email;
    }).catch(function(error){});

    index.logout = function(){
      $http.get('/logout').then(function(response){
        $location.path('/')
      })
    }
  }
})();