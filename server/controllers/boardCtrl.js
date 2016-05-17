var Board = require('../models/Boards');
var User = require('../models/UserModel')
module.exports = {

  createBoard: function(req, res) {
    var newBoard = new Board(req.body);
    newBoard.save(function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
          User.findByIdAndUpdate(req.user._id, {$addToSet:{boards:result._id}},function (err, user) {
            if (err) {
              return res.status(500).send(err);
            } else {
              res.status(200).send(result);
            }
          })
      }
    });
  },

  readBoard: function(req, res) {
    User
      .findById(req.user._id)
      .populate("boards")
      .exec(function(err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(result.boards);
        }
      });
  },

  update: function(req, res) {
    Board.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  },

  deleteBoard: function(req, res) {
    console.log(req.params)
    Board.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  }
};
