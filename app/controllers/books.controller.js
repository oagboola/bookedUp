var Books = require('../models/books.model');

module.exports = {
  createBook: function(req, res){
    var body = req.body;
    Books.create(body, function(err, book){
      if(err){
        res.json(err);
      }
      else{
        res.json(book)
      }
    });
  },
  listBooks: function(req, res){
    Books.find({}, function(err, books){
      if(err){
        res.json(err)
      }
      else {
        res.json(books)
      }
    });
  },
  findBook: function(req, res){
    Books.findById(req.params.bookId, function(err, book){
      if(err){
        res.json(err);
      }
      else {
        res.json(book);
      }
    });
  },
  deleteBook: function(req, res){
    Books.remove({_id: req.params.bookId}, function(err, book){
      if (err) {
        res.json(err);
      }
      else{
        res.json(book);
      }
    });
  },
  booksByDonor: function(req, res){
    Books.find({donor: req.params.donor}, function(err, books){
      if(err){
        res.json(err);
      }
      else{
        res.json(books);
      }
    });
  },
  update: function(req, res){
    var book = req.body;
    Books.findByIdAndUpdate(req.params.bookId, book, function(err, book){
      if(err){
        res.json(err);
      }
      else {
        res.json(book);
      }
    });
  }
}