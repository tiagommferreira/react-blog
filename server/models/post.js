// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true,
      unique: true
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    }
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Post', postSchema);