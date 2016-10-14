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
      }
    }
  }
})();