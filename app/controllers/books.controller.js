var Books = require('../models/books.model'),
    multer = require('multer'),
    cloudinary = require('cloudinary');

module.exports = {
  createBook: function(req, res){
    var body = req.body;
    body.bookInfo.donor= req.user._id;

    Books.create(body.bookInfo, function(err, book){
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
    Books.remove({_id: req.params.bookId}, function(err, response){
      if (err) {
        res.json(err);
      }
      else{
        res.json(response);
      }
    });
  },
  booksByDonor: function(req, res){
    Books.find({donor: req.params.donorId}, function(err, books){
      if(err){
        res.json(err);
      }
      else{
        res.json(books);
      }
    });
  },
  update: function(req, res){
    var body = req.body;
    Books.findByIdAndUpdate(req.params.bookId, body.bookInfo, function(err, book){
      if(err){
        res.json(err);
      }
      else {
        res.json(book);
      }
    });
  },
  uploadBookCover: function(req, res, next){
    if(req.file){
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

      cloudinary.uploader.upload(req.file.path, function(result){
        req.body.bookInfo.bookCover = result.url;
        next();
      })
    }
    else {
      next()
    }
  }
}