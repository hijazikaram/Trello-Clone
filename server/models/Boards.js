var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({

    title: String,


});

module.exports = mongoose.model('Board', boardSchema);
