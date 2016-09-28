var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = Schema({
  title: {
    type: String,
    required: true
  },
  donor: {
    type: Schema.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: String,
  edition: String,
});

module.exports = mongoose.model('Books', booksSchema);