var Board = require('../models/Boards');

module.exports = {

  createBoard: function(req, res) {
    var newBoard = new Board(req.body);
    newBoard.save(function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  },

  readBoard: function(req, res) {
    Board
      .find(req.query)
      .exec(function(err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(result);
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
