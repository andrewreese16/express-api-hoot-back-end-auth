const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  // 1 to many relationship between user and comments
  // 1 user has many comments, comments belongs to a user
  // We are setting relationship on the many side!
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const hootSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enums: ["News", "Sports", "Games", "Movies", "Music", "Television"],
  },
  // 1 to many relationship between user and hoots
  // 1 user has many hoots, hoot belongs to a user
  // We are setting relationship on the many side!
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [commentSchema],
});

module.exports = mongoose.model("Hoot", hootSchema);
