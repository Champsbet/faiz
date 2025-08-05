const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: String,
  imageUrl: String,
  likes: Number,
});

module.exports = mongoose.model('Post', postSchema);
