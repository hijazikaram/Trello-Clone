var mongoose = require('mongoose');

var listSchema = new mongoose.Schema({
  lists: [{
    title: {type:String}
  }]
});

module.exports = mongoose.model('list', listSchema);
