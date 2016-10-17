(function(){
  angular.module('bookedUpApp').controller('DonorBooksController', DonorBooksController);

  DonorBooksController.$inject = ['booksService', '$routeParams']

  function DonorBooksController(booksService, $routeParams){
    $('.tooltipped').tooltip({delay: 50});
    var donorBooks = this;
    donorBooks.books = {}

    var getBooks = function(){
      booksService.getBooksByDonor($routeParams.donorId).then(function(response){
        donorBooks.books = response.data;
      });
    }

    getBooks();

    donorBooks.deleteBook = function(bookId){
      var decision = confirm('Delete book? Action cannot be reversed');
      if(decision){
        booksService.deleteBook(bookId).then(function(response){
          getBooks();
        })
      }
    }
  }
})();