var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
  title: {type:String},
  board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
  cards: [{
    content: {type:String}
  }]
});

module.exports = mongoose.model('list', listSchema);
