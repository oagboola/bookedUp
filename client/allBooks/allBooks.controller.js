(function(){
  angular.module('bookedUpApp').controller('booksListController', booksListController);

  booksListController.$inject = ['booksService']

  function booksListController(booksService){
    var books = this;

    //placeholder for summary
    books.summary = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus et tortor eu imperdiet. Nam imperdiet elit ut augue ultricies, quis sagittis arcu semper. Vestibulum eu lectus vitae est faucibus porttitor. Pellentesque eget nunc lectus. Donec tempus hendrerit urna, et condimentum mauris.';

    booksService.getBooks().then(function(response){
      books.bookCollection = response.data
    });
  }
})();