var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
    content: {type: String}
    // lists: [{
    //   title: {type:String}
    // }]
});

module.exports = mongoose.model('card', cardSchema);
