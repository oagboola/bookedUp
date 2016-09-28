var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var password = require('../password');

var usersSchema = Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  firstname: String,
  lastname: String,
  provider: String
});

usersSchema.plugin(uniqueValidator);

//method to validate password before login
usersSchema.methods.validPassword = function(userPassword){
  //decrypt password and compare with user's entry
  return password.decrypt(userPassword, this.password);
};

module.exports = mongoose.model('Users', usersSchema);