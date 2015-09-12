var mongoose = require('mongoose');
var UserSchema= mongoose.model('User', new mongoose.Schema({
  id : mongoose.Schema.ObjectId,
  name: String,
  email: {unique: true, type: String},
  password: String
}));

module.exports = mongoose.model('User', UserSchema);