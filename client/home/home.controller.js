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