(function(){
  angular.module('bookedUpApp').controller('booksListController', booksListController);

  booksListController.$inject = ['booksService']

  function booksListController(booksService){
    var books = this;

    booksService.getBooks().then(function(response){
      books.bookCollection = response.data
    });
  }
})();