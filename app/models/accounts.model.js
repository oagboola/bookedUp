var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = Schema({
  domain: String,
  uid: String,
  tokens: []
});

module.exports = mongoose.model('Accounts', accountSchema);