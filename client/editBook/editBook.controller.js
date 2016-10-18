(function(){
  angular.module('bookedUpApp').controller('EditBookController', EditBookController);

  EditBookController.$inject = ['booksService','$routeParams', 'Upload', '$location']

  function EditBookController(booksService, $routeParams, Upload, $location){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    var bookToEdit = this;
    bookToEdit.details = {}

    booksService.getBookById($routeParams.bookId).then(function(response){
      bookToEdit.details = response.data;
    })

    bookToEdit.updateBookCover = function(file){
      bookToEdit.newBookCover = file
    }

    bookToEdit.update = function(){
      var url = '/api/books/'+$routeParams.bookId;
      if(bookToEdit.newBookCover){
        Upload.upload({
          url: url,
          data: {bookCover: bookToEdit.newBookCover, bookInfo: bookToEdit.details},
          method: 'PUT'
        }).then(function (resp) {
          $location.path('/books/'+resp.data._id);
        }, function (error) {
          console.log('Error:', error)
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        });
      }
      else {
        booksService.updateBook($routeParams.bookId, bookToEdit.details).then(function(response){})
      }
    }
  }
})();