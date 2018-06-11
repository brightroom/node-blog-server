var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    author: String,
    content: String,
    title: String
});

module.exports = mongoose.model('Post', PostSchema);