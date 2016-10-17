(function(){
  angular.module('bookedUpApp').controller('DonorBooksController', DonorBooksController);

  DonorBooksController.$inject = ['booksService', '$routeParams']

  function DonorBooksController(booksService, $routeParams){
    $('.tooltipped').tooltip({delay: 50});
    var donorBooks = this;
    donorBooks.books = {}

    booksService.getBooksByDonor($routeParams.donorId).then(function(response){
      donorBooks.books = response.data;
    });
  }
})();