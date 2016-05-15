var List = require('../models/List'); 
module.exports = {

  createList: function(req, res) {
    var newList = new List(req.body);
    newList.save(function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  },

  readList: function(req, res) {
    List
      .find(req.query)
      .exec(function(err, result) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(result);
        }
      });
  },

  updateList: function(req, res) {
    List.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  },

  createCard: function(req, res) {
    List.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  },

  deleteList: function(req, res) {
    console.log(req.params)
    List.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  },
  deleteCard: function(req, res) {
    console.log(req.params)
    List.findByIdAndUpdate(req.params.id, function(err, result) {
      console.log(result);
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  }
};
