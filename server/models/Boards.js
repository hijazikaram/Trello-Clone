var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({

    title: String,
    backgroundcolor: {type:String,
     default: "blue"}

});

module.exports = mongoose.model('Board', boardSchema);
