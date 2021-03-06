var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var User = new mongoose.Schema({
  name: { type: String },
  email: { type: String, index: true, trim: true },
  password: { type: String },
  boards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Board'}],
  image:{type: String}
});

// User.pre('save', function(next) {
// 	var user = this;
// 	if (!user.isModified('password'))	return next();
//   var salt = bcrypt.genSaltSync(10);
//   var hash = bcrypt.hashSync(user.password, salt);
//   user.password = hash;
//   return next(null, user);
// });

User.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
    next();
});


User.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', User);
