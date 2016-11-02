var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = Schema({
  title: {
    type: String,
    required: true
  },
  donor: {
    type: Schema.Types.ObjectId,
    ref:  'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required:  true
  },
  dateOfPublication: Date,
  publisher: String,
  purchaseDate: Date,
  pageNumber: Number,
  edition: String,
  bookCover: String
});

module.exports = mongoose.model('Books', booksSchema);