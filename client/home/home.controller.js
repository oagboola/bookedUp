(function(){
  angular.module('bookedUpApp')
          .controller('HomeController', HomeController);

  HomeController.$inject = ['authenticationService', '$location'];

  function HomeController(authenticationService, $location){
    $('ul.tabs').tabs();
    var home = this;
    home.userSignup = {};
    home.userLogin = {};

    home.userSignup.email = 'laide@b.com';
    home.userSignup.password = 'laide';

    home.userLogin.email = 'laide@b.com';
    home.userLogin.password = 'laide';

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