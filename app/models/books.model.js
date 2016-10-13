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
  dateOfPublication: Date,
  publisher: String,
  purchaseDate: Date,
  description: String,
  pageNumber: Number,
  author: String,
  edition: String,
  bookCover: String
});

module.exports = mongoose.model('Books', booksSchema);