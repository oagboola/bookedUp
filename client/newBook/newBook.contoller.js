(function(){
  angular.module('bookedUpApp').controller('NewBookController', NewBookController)

  NewBookController.$inject = ['Upload', 'authenticationService', '$location'];

  function NewBookController (Upload, authenticationService, $location){

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });

    var newBook = this;

    var currentUser = {};
    newBook.book = {};
    newBook.bookCover = {};

    authenticationService.currentUser().then(function(user){
      currentUser = user;
    });

    newBook.upload = function(file){
      newBook.bookCover = file
    }

    newBook.create = function () {

      Upload.upload({
          url: '/api/books',
          data: {bookCover: newBook.bookCover, bookInfo: newBook.book}
      }).then(function (resp) {
          $location.path('/books');
      }, function (error) {
          console.log('Error:', error)
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }
  }
})();