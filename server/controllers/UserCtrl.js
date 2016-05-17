  var User = require('../models/UserModel');

module.exports = {

  register: function(req, res, next) {
    User.create(req.body, function(err, result) {
      if(err) return res.status(500).send(err);
      newUser = result.toObject();
      delete newUser.password
      res.status(200).json(newUser);
    });
  },

  me: function(req, res, next) {
    if (!req.user) return res.status(401).send('current user not defined');
    var info = req.user.toObject();
    delete info.password;
    return res.status(200).json(info);
  },

  update: function(req, res, next) {
    User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
      if (err) next(err);
      else {
        result.password = req.body.password;
        result.save(function(err, result){
          if (err) next(err);
          else res.status(200).send('user updated');
        })
      }
    });
  }
};
