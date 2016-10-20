(function(){
  angular.module('bookedUpApp').controller('ContactController', ContactController);

  ContactController.$inject = ['$http'];

  function ContactController($http){
    var contact = this;
    contact.message = {};

    contact.sendMail = function(){
      contact.loading = true;
      $http.post('/api/contact', contact.message).then(function(response){
        contact.loading = false;
        Materialize.toast('Message Sent Successfully', 5000)
        contact.message = {};
      }).catch(function(error){
        Materialize.toast('Message Not Sent', 5000)
        console.log('error', error);
      })
    }
  }
})();