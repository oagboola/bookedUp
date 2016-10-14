(function(){
  angular.module('bookedUpApp').controller('BookController', BookController)

  BookController.$inject = ['booksService', '$routeParams']

  function BookController(booksService,  $routeParams){
    var book = this;

    booksService.getBookById($routeParams.bookId).then(function(response){
      book.currentBook = response.data;
    })
  }
})();