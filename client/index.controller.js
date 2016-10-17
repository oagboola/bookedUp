(function(){
  angular.module('bookedUpApp').controller('IndexController', IndexController);

  IndexController.$inject = ['authenticationService', '$location', '$http'];

  function IndexController(authenticationService, $location, $http){
    var index = this;

    index.user = {}

    authenticationService.currentUser().then(function(user){
      index.user = user.data;
      if($location.path() == '/'){
        $location.path('/books');
      }
    }).catch(function(error){
      $location.path('/')
    });

    index.logout = function(){
      $http.get('/logout').then(function(response){
        index.user = {};
        $location.path('/');
      })
    }
  }
})();