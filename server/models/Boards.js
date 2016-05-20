var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({

    title: String,
    backgroundcolor: {type:String,
     default: "water"}

});

module.exports = mongoose.model('Board', boardSchema);
