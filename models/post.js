var mongoose = require("mongoose");

//creating mongodb database structure
var postStruc = mongoose.Schema({
  title:{
    type: String,
    required: true},
  auther:{
    type: String,
    required: true},
  post:{
    type: String,
    required: true},
  timestamp:{
    type: Date,
    required: true}
});

var Post = module.exports = mongoose.model("Post", postStruc);
