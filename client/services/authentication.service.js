(function(){
  angular.module('bookedUpApp')
        .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$http']

  function authenticationService($http){
    return{
      signup: function(user){
        return $http.post('/signup', user)
      },
      login: function(user){
        return $http.post('/signin', user)
      },
      isLoggedIn: function(){
        return $http.get('/user')
      }
    }
  }
})();