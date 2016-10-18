(function(){
  angular.module('bookedUpApp').factory('booksService', booksService)

  booksService.$inject = ['$http']

  function booksService($http){
    return {
      getBooks: function(){
        return $http.get('/api/books')
      },
      getBookById: function(id){
        return $http.get('/api/books/' + id)
      },
      getBooksByDonor: function(donorId){
        return $http.get('/api/books/donor/' + donorId);
      },
      updateBook: function(bookId, book){
        return $http.put('/api/books/'+bookId, book);
      },
      deleteBook: function(bookId){
        return $http.delete('/api/books/' + bookId);
      }
    }
  }
})();